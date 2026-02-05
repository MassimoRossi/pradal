// Header Component
window.SP.Components.Header = function () {
    const header = document.createElement('div');
    header.className = 'header-inner container';

    const appData = window.SP.Data || {};
    const title = appData.siteTitle || "ARTISTA NAME";

    header.innerHTML = `
        <div class="logo">
            <a href="#/">${title}</a>
        </div>
       
        <div class="nav-drawer">
    <button class="nav-trigger" aria-label="Apri menu">
        <span></span><span></span><span></span>
    </button>
<div class="nav-hover-bridge"></div>

    <nav class="nav-panel" aria-label="Menu principale">
        <ul>
            <li><a href="#/opere">Opere</a></li>
            <li><a href="#/eventi">Eventi</a></li>
            <li class="has-dropdown">
                <a href="#/bio">Bio</a>
                <ul class="dropdown-menu">
                    <li><a href="#/bio">Biografia</a></li>
                    ${(appData.bio?.sections || []).map(sec => `
                        <li><a href="#/bio/${sec.id}">${sec.title}</a></li>
                    `).join('')}
                </ul>
            </li>
            <li><a href="#/contatti">Contatti</a></li>
        </ul>
    </nav>
</div>

        <div class="mobile-menu-toggle" id="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    // Close menu on link click or toggle dropdown on mobile
    header.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const nav = header.querySelector('.main-nav');
        const toggle = header.querySelector('.mobile-menu-toggle');
        const isMobile = window.innerWidth <= 768;
        const listItem = link.parentElement;
        const hasDropdown = listItem.classList.contains('has-dropdown');

        if (isMobile && hasDropdown) {
            // Se è mobile e ha un dropdown, gestiamo l'espansione
            e.preventDefault();
            e.stopPropagation();
            listItem.classList.toggle('open');
            return; // Non chiudere il menu principale
        }

        // Per tutti gli altri link, chiudi il menu
        if (nav) nav.classList.remove('active');
        if (toggle) toggle.classList.remove('active');


        // Force focus removal to close dropdowns triggered by :focus-within on desktop
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    });

   // Mobile toggle logic (safe)
const toggle = header.querySelector('#menu-toggle');
const nav = header.querySelector('.main-nav');

if (toggle && nav) {
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
}


    return header;
};
