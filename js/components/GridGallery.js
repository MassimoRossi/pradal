// Grid Gallery Component
window.SP.Components.GridGallery = function (items, onItemClick) {
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';

    if (!items || items.length === 0) {
        grid.innerHTML = '<p class="no-items">Nessun elemento presente.</p>';
        return grid;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'gallery-item fade-in';

        const hasImg = item.src && item.src.trim() !== '';

        if (hasImg) {
            card.innerHTML = `
                <div class="img-wrapper">
                    <img src="${item.src}" alt="${item.title}" loading="lazy">
                    <div class="overlay">
                        <span class="view-label">Vedi Dettagli</span>
                    </div>
                </div>
                <div class="info">
                    <h3>${item.title}</h3>
                </div>
            `;
        } else {
            card.classList.add('text-only-card');
            card.innerHTML = `
                <div class="text-content">
                    <div class="text-icon">📝</div>
                    <h3>${item.title}</h3>
                    <p class="excerpt">${item.infoText || item.description || 'Clicca per leggere i dettagli'}</p>
                    <span class="read-more">Leggi tutto &rarr;</span>
                </div>
            `;
        }

        card.addEventListener('click', () => {
            if (onItemClick) onItemClick(item, items);
        });

        grid.appendChild(card);
    });

    return grid;
};
