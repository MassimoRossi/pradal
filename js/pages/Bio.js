// Bio Page
window.SP.Pages.renderBio = async function (subSectionId) {
    const section = document.createElement('section');
    section.className = 'page page-bio container fade-in';

    const appData = window.SP.Data;
    const GridGallery = window.SP.Components.GridGallery;
    const MediaList = window.SP.Components.MediaList; // Make sure this is defined
    const openLightbox = window.SP.Components.openLightbox;

    // If we are at the root of Bio (/bio)
    if (!subSectionId) {
        section.innerHTML = `
            <h2 class="section-title">Biografia</h2>
            
            <p class="section-quote">"Il mio lavoro non cerca risposte, ma tenta di formulare le domande corrette attraverso l’attrito tra linguaggi diversi."</p>

            <div class="bio-nav-grid">
                ${appData.bio.sections.map(sec => `
                    <a href="#/bio/${sec.id}" class="bio-nav-card">
                        <h3>${sec.title}</h3>
                    </a>
                `).join('')}
            </div>

            <div class="bio-intro">
                <p>${appData.bio.shortText}</p>
            </div>
        `;
    } else {
        const secConfig = appData.bio.sections.find(s => s.id === subSectionId);

        if (!secConfig) {
            section.innerHTML = `<h2>Sezione non trovata</h2><a href="#/bio">Torna alla Bio</a>`;
            return section;
        }

        const quotes = {
            'francobolli': '"Il francobollo come spazio artistico autonomo"',
            'grandi-eventi': '"L\'arte come infrastruttura temporanea"',
            'campagne-sociali': '"Comunicare significa assumersi una responsabilità"',
            'design-brand': '"Identità visive come sistemi di relazione"',
            'stampa-media': '"Selezione di articoli e video"'
        };
        const sectionQuote = quotes[secConfig.id] || '';

        const header = document.createElement('div');
        header.className = 'bio-subsection-header';
        header.innerHTML = `
            <h2>${secConfig.title}</h2>
            ${sectionQuote ? `<p class="section-quote">${sectionQuote}</p>` : ''}
        `;
        section.appendChild(header);

        let contentContainer;
        if (secConfig.id === 'stampa-media') {
            contentContainer = MediaList(appData.media);
        } else {
            // It's a grid
            const items = appData[secConfig.id] || [];
            contentContainer = GridGallery(items, (item, allItems) => openLightbox(item, allItems));
        }

        section.appendChild(contentContainer);
    }

    return section;
};
