// Router
window.SP.Router = class {
    constructor(routes) {
        this.routes = routes;
        this.appContainer = document.getElementById('app');
        window.addEventListener('hashchange', this.handleRoute.bind(this));

        // Esegui il routing iniziale immediatamente
        this.handleRoute();
    }

    async handleRoute() {
        const hash = window.location.hash.slice(1) || '/';

        const parts = hash.split('/').filter(p => p);
        const mainRoute = '/' + (parts[0] || '');
        const subRoute = parts[1] ? parts[1] : null;

        const routeHandler = this.routes[mainRoute];

        if (routeHandler) {
            this.appContainer.innerHTML = '';
            const element = await routeHandler(subRoute);
            this.appContainer.appendChild(element);
            window.scrollTo(0, 0);
        } else {
            this.appContainer.innerHTML = '<h2>404 - Pagina non trovata</h2>';
        }
    }
};
