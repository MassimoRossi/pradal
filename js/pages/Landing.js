// Landing Page
window.SP.Pages.renderLanding = async function () {
    const section = document.createElement('section');
    section.className = 'page landing-page fade-in';

    // Check config from global Data
    const appData = window.SP.Data || {};
    const landing = appData.landing || {};

    // Valori di default
    const type = landing.type || 'quote';
    const imageSrc = landing.imageSrc || '';
    const quote = landing.quote || '';
    const author = landing.author || '';

    console.log('🎨 [Landing] Rerender richiesto. Tipo:', type, '| Immagine:', imageSrc, '| Citazione:', quote);

    let content = '';

    if (type === 'image' && imageSrc) {
        content = `
            <div class="landing-visual" style="background-image: url('${imageSrc}');">
            </div>
        `;
    } else {
        content = `
            <div class="landing-quote">
                <blockquote>"${quote || "Fai in modo che ogni spazio bianco diventi Storia"}"</blockquote>
                ${author ? `<cite>${author}</cite>` : ''}
            </div>
        `;
    }

    section.innerHTML = content;
    // Optional: Clicking anywhere on the landing page takes you to Opere
    section.addEventListener('click', () => { window.location.hash = '/opere'; });

    return section;
};
