// Main Entry Point
document.addEventListener('DOMContentLoaded', async () => {
    // 0. Carica contenuti da JSON/localStorage
    if (window.SP.loadContent) {
        await window.SP.loadContent();
    }

    // 1. Initialize Header
    const Header = window.SP.Components.Header;
    const headerContainer = document.getElementById('main-header');
    if (Header && headerContainer) {
        headerContainer.appendChild(Header());
    }

    // 2. Define Routes linking to Global Page functions
    const routes = {
        '/': window.SP.Pages.renderLanding,
        '/opere': window.SP.Pages.renderOpere,
        '/eventi': window.SP.Pages.renderEventi,
        '/bio': window.SP.Pages.renderBio,
        '/contatti': window.SP.Pages.renderContact,
        '/anteprima': window.SP.Pages.renderAnteprima
    };

    // 3. Initialize Router
    if (window.SP.Router) {
        new window.SP.Router(routes);
    }
});
