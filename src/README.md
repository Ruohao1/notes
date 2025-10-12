<!-- --- -->
<!-- # Keep front-matter minimal; tags here are optional if you use mdbook-tags -->
<!-- tags: ["notes", "writeups", "homelab", "cybersecurity"] -->
<!-- title: "Welcome" -->
<!-- --- -->
<!-- Hero / Title -->
<h1 align="center">🛡️ My Cyber Notebook</h1>
<p align="center">
  Notes, references, and CTF writeups — stitched together with curiosity, reproducibility, and a mildly unhealthy love for automation.
</p>

<!-- Badges -->
<p align="center">
  <a href="https://github.com/Ruohao1"><img alt="GitHub"
     src="https://img.shields.io/badge/GitHub-Ruohao1-black?logo=github"></a>
  <a href="https://tryhackme.com/p/ruohao"><img alt="TryHackMe"
     src="https://img.shields.io/badge/TryHackMe-ruohao-darkred?logo=tryhackme"></a>
  <a href="https://linkedin.com/in/ruohaolin"><img alt="LinkedIn"
     src="https://img.shields.io/badge/LinkedIn-ruohaolin-0A66C2?logo=linkedin"></a>
  <a href="https://ruohao.dev"><img alt="Portfolio"
     src="https://img.shields.io/badge/Portfolio-ruohao.dev-111111?logo=vercel"></a>
</p>

<!-- Quick links / CTA -->
<p align="center">
  <a href="./notes/README.md"><b>Browse Notes</b></a> •
  <a href="./writeups/README.md"><b>See Writeups</b></a> •
  <a href="./references/README.md"><b>Reference Hub</b></a>
</p>

---

## What this is

This book is a growing collection of **concise notes**, **repeatable configs**, and **step-by-step writeups** from my work in:

- Linux hardening & privesc, network forensics, web exploitation, and reversing.
- My homelab (Proxmox + LXC/Docker, segmented networks, Tailscale, TLS).
- Ansible roles/playbooks for CIS/ANSSI-style hardening and lab automation.

Where helpful, pages are tagged (e.g., `linux`, `privesc`, `web`, `pwn`, `ansible`). If you have `mdbook-tags` enabled, you’ll get automatic tag indexes under `/tags/…`.

> *“Document what you break, so you can break it better next time.”*

---

## Structure

- **Notes** — short, focused pages: theory, commands, gotchas.  
  Start here: **[notes/README.md](./notes/README.md)**
- **Writeups** — full walkthroughs for TryHackMe, Root-Me, FCSC, etc.  
  Start here: **[writeups/README.md](./writeups/README.md)**
- **References** — tools I reuse, shell snippets, bibliography.  
  Start here: **[references/README.md](./references/README.md)**

If search is enabled (`mdbook-search`), use the 🔍 bar to jump to commands or error strings.

---

## Homelab snapshot

<p align="center">
  <!-- Drop your diagram at: src/assets/homelab.png -->
  <img src="./assets/homelab.png" alt="Homelab diagram" width="720">
</p>

- Segmented services (Pi-hole, Vaultwarden, Nextcloud AIO, Jellyfin, SIEMini).
- LXC + Docker Compose + Ansible for repeatability.
- Logs routed to a mini-SIEM (Snort3, Syslog-NG, Elastic/Kibana).
