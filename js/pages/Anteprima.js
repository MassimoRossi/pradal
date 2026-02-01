// Anteprima Page (Password Protected)
window.SP.Pages.renderAnteprima = async function () {
    const section = document.createElement('section');
    section.className = 'page page-anteprima container fade-in';

    const renderLogin = () => {
        section.innerHTML = `
            <div class="login-container">
                <h2 class="section-title">🔒 Area Riservata</h2>
                <p>Inserisci la password per accedere ai contenuti in anteprima.</p>
                <div class="login-form">
                    <input type="password" id="preview-pwd" placeholder="Password">
                    <button id="login-btn" class="btn btn-primary">Accedi</button>
                    <p id="login-error" class="error-text" style="display: none; color: #f44336; margin-top: 10px;">Password non corretta.</p>
                </div>
            </div>
        `;

        section.querySelector('#login-btn').addEventListener('click', handleLogin);
        section.querySelector('#preview-pwd').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });
    };

    const handleLogin = () => {
        const inputPwd = section.querySelector('#preview-pwd').value;
        const correctPwd = window.SP.Data.settings?.previewPassword || 'artist-preview';

        if (inputPwd === correctPwd) {
            sessionStorage.setItem('anteprima_access', 'true');
            renderContent();
        } else {
            section.querySelector('#login-error').style.display = 'block';
        }
    };

    const renderContent = () => {
        const appData = window.SP.Data;
        const items = appData.anteprima || [];

        if (items.length === 0) {
            section.innerHTML = '<div class="container" style="padding: 100px; text-align: center;"><p>Nessun contenuto in anteprima disponibile.</p></div>';
            return;
        }

        // We take the latest item for the main view
        const item = items[0];
        const images = item.gallery && item.gallery.length > 0 ? item.gallery : [item.src];
        let currentImgIndex = 0;

        section.innerHTML = `
            <div class="anteprima-split-container">
                <div class="anteprima-image-side" id="preview-image-container">
                    ${renderCarouselContent(images, currentImgIndex, item.title)}
                </div>
                
                <div class="anteprima-content-side">
                    <article class="anteprima-article">
                        <span class="article-meta">${item.year || 'Senza Data'} — COMUNICATO RISERVATO</span>
                        <h2>${item.title}</h2>
                        <div class="anteprima-text">
                            ${item.infoText || item.description || 'Nessun testo disponibile.'}
                        </div>
                    </article>
                </div>
            </div>
        `;

        // Attach carousel events if needed
        if (images.length > 1) {
            attachCarouselEvents(section, images, item.title);
        }
    };

    const renderCarouselContent = (images, index, title) => {
        const hasMultiple = images.length > 1;
        return `
            <div class="anteprima-carousel">
                <img src="${images[index]}" alt="${title}" id="main-preview-img">
                ${hasMultiple ? `
                    <button class="anteprima-carousel-nav prev">&#10094;</button>
                    <button class="anteprima-carousel-nav next">&#10095;</button>
                    <div class="anteprima-counter">${index + 1} / ${images.length}</div>
                ` : ''}
            </div>
        `;
    };

    const attachCarouselEvents = (container, images, title) => {
        let currentIndex = 0;
        const update = () => {
            const wrapper = container.querySelector('#preview-image-container');
            wrapper.innerHTML = renderCarouselContent(images, currentIndex, title);
            // Re-attach after re-render (or just update attributes to be smoother, but simple re-render for now)
            attachCarouselEvents(container, images, title);
        };

        const prev = container.querySelector('.anteprima-carousel-nav.prev');
        const next = container.querySelector('.anteprima-carousel-nav.next');

        if (prev && next) {
            prev.onclick = () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                update();
            };
            next.onclick = () => {
                currentIndex = (currentIndex + 1) % images.length;
                update();
            };
        }
    };

    // Check access
    if (sessionStorage.getItem('anteprima_access') === 'true') {
        renderContent();
    } else {
        renderLogin();
    }

    return section;
};
