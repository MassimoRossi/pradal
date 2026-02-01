// Media List Component
window.SP.Components.MediaList = function (items) {
    const list = document.createElement('div');
    list.className = 'media-list';

    if (!items || items.length === 0) {
        list.innerHTML = '<p>Nessun articolo presente.</p>';
        return list;
    }

    items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'media-item';

        const icon = item.type === 'video' ? '▶' : '📄';

        const source = item.source || 'Fonte non specificata';
        const date = item.date || '';
        const meta = date ? `${source} — ${date}` : source;

        row.innerHTML = `
            <div class="media-icon">${icon}</div>
            <div class="media-info">
                <h4><a href="${item.link || '#'}" target="_blank">${item.title}</a></h4>
                <span class="media-meta">${meta}</span>
            </div>
        `;
        list.appendChild(row);
    });

    return list;
};
