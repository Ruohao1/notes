#!/usr/bin/env bash
set -euo pipefail

# mdBook probes: "<cmd> supports <renderer>"
if [[ "${1:-}" == "supports" ]]; then
  # If you want to be strict: [[ "${2:-}" == "html" ]] && exit 0 || exit 1
  exit 0 # <-- no stdout here!
fi

# Main phase: read JSON from stdin, rewrite files on disk, write JSON back.
tmp_json="$(mktemp)"
cat >"$tmp_json"

# Side-effect rewrites (silence all output)
find src -name '*.md' -print0 |
  xargs -0 -I{} perl -0777 -i -pe '
  s/!\[\[([^|\]]+)\]\]/![]($1)/g;
  s/!\[\[([^|\]]+)\|([0-9]{2,4})\]\]/<img src="$1" alt="" width="$2">/g;
  s/!\[\[([^|\]]+)\|([^\]]+)\]\]/![$2]($1)/g;
  s/\[\[([^]|#\]]+)\]\]/[$1]($1.md)/g;
  s/\[\[([^|\]]+)\|([^\]]+)\]\]/[$2]($1.md)/g;
' {} >/dev/null 2>&1

cat "$tmp_json"
rm -f "$tmp_json"
