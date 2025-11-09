// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item affix "><a href="index.html">Introduction</a></li><li class="chapter-item "><a href="notes/index.html"><strong aria-hidden="true">1.</strong> Notes</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="notes/linux/index.html"><strong aria-hidden="true">1.1.</strong> Linux</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="notes/linux/permissions.html"><strong aria-hidden="true">1.1.1.</strong> Permissions</a></li><li class="chapter-item "><a href="notes/linux/networking.html"><strong aria-hidden="true">1.1.2.</strong> Networking</a></li><li class="chapter-item "><a href="notes/linux/hardening.html"><strong aria-hidden="true">1.1.3.</strong> Hardening</a></li></ol></li><li class="chapter-item "><a href="notes/web/index.html"><strong aria-hidden="true">1.2.</strong> Web</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="notes/web/sqli.html"><strong aria-hidden="true">1.2.1.</strong> SQL Injection</a></li><li class="chapter-item "><a href="notes/web/xss.html"><strong aria-hidden="true">1.2.2.</strong> XSS</a></li><li class="chapter-item "><a href="notes/web/jwt.html"><strong aria-hidden="true">1.2.3.</strong> JWT</a></li></ol></li><li class="chapter-item "><a href="notes/reverse/index.html"><strong aria-hidden="true">1.3.</strong> Reverse Engineering</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="notes/reverse/ghidra.html"><strong aria-hidden="true">1.3.1.</strong> Ghidra</a></li><li class="chapter-item "><a href="notes/reverse/pwntools.html"><strong aria-hidden="true">1.3.2.</strong> Pwntools</a></li><li class="chapter-item "><a href="notes/reverse/shellcode.html"><strong aria-hidden="true">1.3.3.</strong> Shellcode</a></li></ol></li></ol></li><li class="chapter-item "><a href="writeups/index.html"><strong aria-hidden="true">2.</strong> Writeups</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="writeups/tryhackme/index.html"><strong aria-hidden="true">2.1.</strong> TryHackMe</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="writeups/tryhackme/CTF collection Vol.1/index.html"><strong aria-hidden="true">2.1.1.</strong> CTF collection Vol.1</a></li><li class="chapter-item "><a href="writeups/tryhackme/CTF collection Vol.2/index.html"><strong aria-hidden="true">2.1.2.</strong> CTF collection Vol.2</a></li><li class="chapter-item "><a href="writeups/tryhackme/Wonderland/index.html"><strong aria-hidden="true">2.1.3.</strong> Wonderland</a></li></ol></li></ol></li><li class="chapter-item "><a href="references/index.html"><strong aria-hidden="true">3.</strong> References</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="references/tools.html"><strong aria-hidden="true">3.1.</strong> Tools</a></li><li class="chapter-item "><a href="references/commands.html"><strong aria-hidden="true">3.2.</strong> Command Cheatsheet</a></li><li class="chapter-item "><a href="references/bibliography.html"><strong aria-hidden="true">3.3.</strong> Bibliography</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
