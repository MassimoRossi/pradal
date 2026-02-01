// Lightbox Logic - Side-by-Side scrolling gallery with per-item carousels
window.SP.Components.openLightbox = function (initialItem, allItems) {
    const lightbox = document.getElementById('lightbox');
    const itemsToRender = allItems && allItems.length > 0 ? allItems : [initialItem];

    // Store carousel state for each item (index in itemsToRender -> image index)
    const carouselStates = itemsToRender.map(item => ({
        currentIndex: 0,
        images: item.gallery && item.gallery.length > 0 ? item.gallery : [item.src]
    }));

    const renderItemContent = (itemIndex) => {
        const item = itemsToRender[itemIndex];
        const state = carouselStates[itemIndex];
        const currentImg = state.images[state.currentIndex];
        const hasMultipleImgs = state.images.length > 1;

        return `
            <div class="direct-item-body">
                <div class="direct-item-image">
                    <img src="${currentImg}" alt="${item.title}" loading="lazy">
                    ${hasMultipleImgs ? `
                        <button class="item-carousel-nav prev" data-item="${itemIndex}">&#10094;</button>
                        <button class="item-carousel-nav next" data-item="${itemIndex}">&#10095;</button>
                        <div class="item-carousel-counter">${state.currentIndex + 1} / ${state.images.length}</div>
                    ` : ''}
                </div>
                
                <div class="direct-item-content">
                    <h3>${item.title}</h3>
                    ${(item.year || item.anno) ? `<span class="direct-item-year">${item.year || item.anno}</span>` : ''}
                    
                    <div class="item-meta">
                        ${item.size ? `<p class="item-meta-detail"><strong>Dimensioni:</strong> ${item.size}</p>` : ''}
                        ${item.technique ? `<p class="item-meta-detail"><strong>Tecnica:</strong> ${item.technique}</p>` : ''}
                        ${item.issuedBy ? `<p class="item-meta-detail"><strong>Emesso da:</strong> ${item.issuedBy}</p>` : ''}
                        ${item.location ? `<p class="item-meta-detail"><strong>Luogo:</strong> ${item.location}</p>` : ''}
                    </div>

                    <div class="item-text-body">
                        ${item.infoText || item.description || item.info || ''}
                    </div>
                </div>
            </div>
        `;
    };

    const updateItemDOM = (itemIndex) => {
        const itemEl = lightbox.querySelector(`#lightbox-item-${itemIndex}`);
        if (itemEl) {
            itemEl.innerHTML = renderItemContent(itemIndex);
            attachCarouselEvents(itemEl, itemIndex);
        }
    };

    const attachCarouselEvents = (container, itemIndex) => {
        const prev = container.querySelector('.item-carousel-nav.prev');
        const next = container.querySelector('.item-carousel-nav.next');

        if (prev && next) {
            prev.onclick = (e) => {
                e.stopPropagation();
                const state = carouselStates[itemIndex];
                state.currentIndex = (state.currentIndex - 1 + state.images.length) % state.images.length;
                updateItemDOM(itemIndex);
            };
            next.onclick = (e) => {
                e.stopPropagation();
                const state = carouselStates[itemIndex];
                state.currentIndex = (state.currentIndex + 1) % state.images.length;
                updateItemDOM(itemIndex);
            };
        }
    };

    // Initial render of the lightbox shell
    lightbox.innerHTML = `
        <button class="close-btn" title="Chiudi (ESC)">&times;</button>
        <div class="lightbox-content side-by-side-mode fade-in">
            <div id="lightbox-scroll-container">
                <!-- Items injected here -->
            </div>
        </div>
    `;

    const scrollContainer = lightbox.querySelector('#lightbox-scroll-container');

    itemsToRender.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'preview-direct-item';
        itemEl.id = `lightbox-item-${index}`;
        if (item.id === initialItem.id) itemEl.classList.add('initial-target');

        itemEl.innerHTML = renderItemContent(index);
        scrollContainer.appendChild(itemEl);
        attachCarouselEvents(itemEl, index);
    });

    // Close logic
    const closeBtn = lightbox.querySelector('.close-btn');
    closeBtn.onclick = () => window.SP.Components.closeLightbox();

    lightbox.onclick = (e) => {
        if (e.target === lightbox) window.SP.Components.closeLightbox();
    };

    const handleKey = (e) => {
        if (e.key === 'Escape') window.SP.Components.closeLightbox();
    };
    document.addEventListener('keydown', handleKey);
    lightbox._keyHandler = handleKey;

    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Auto-scroll to selected
    setTimeout(() => {
        const target = lightbox.querySelector('.initial-target');
        if (target) target.scrollIntoView({ behavior: 'auto', block: 'center' });
    }, 50);
};

window.SP.Components.closeLightbox = function () {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');

    // Clean up
    if (lightbox._keyHandler) {
        document.removeEventListener('keydown', lightbox._keyHandler);
        delete lightbox._keyHandler;
    }

    setTimeout(() => {
        lightbox.innerHTML = '';
        document.body.style.overflow = '';
    }, 300);
};
