// Eventi Page
window.SP.Pages.renderEventi = async function () {
    const section = document.createElement('section');
    section.className = 'page page-eventi container fade-in';

    section.innerHTML = `
        <h2 class="section-title">Mostre ed Eventi</h2>
        <p class="section-quote">"Intersezioni. Con persone, istituzioni, contesti."</p>
        <div id="eventi-grid-container"></div>
    `;

    const appData = window.SP.Data;
    const GridGallery = window.SP.Components.GridGallery;
    const openLightbox = window.SP.Components.openLightbox;

    console.log('📍 [Eventi] Rendering avviato. Elementi trovati:', (appData.eventi || []).length);

    const grid = GridGallery(appData.eventi, (item, items) => {
        openLightbox(item, items);
    });

    section.querySelector('#eventi-grid-container').appendChild(grid);

    return section;
};
