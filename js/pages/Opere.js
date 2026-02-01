// Opere Page
window.SP.Pages.renderOpere = async function () {
    const section = document.createElement('section');
    section.className = 'page page-opere container fade-in';

    section.innerHTML = `
        <h2 class="section-title">Opere</h2>
        <p class="section-quote">"Le opere non illustrano. Interrompono"</p>
        <div id="opere-grid-container"></div>
    `;

    const appData = window.SP.Data;
    const GridGallery = window.SP.Components.GridGallery;
    const openLightbox = window.SP.Components.openLightbox;

    console.log('🖼️ [Opere] Rendering avviato. Elementi trovati:', (appData.opere || []).length);

    const grid = GridGallery(appData.opere, (item, items) => {
        openLightbox(item, items);
    });

    section.querySelector('#opere-grid-container').appendChild(grid);

    return section;
};
