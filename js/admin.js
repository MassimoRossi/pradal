// Admin Panel JavaScript Logic
// ========================================
// GESTIONE CONTENUTI - localStorage + Export/Import
// ========================================

class AdminPanel {
    constructor() {
        this.currentCategory = 'opere';
        this.editingId = null;
        this.content = {
            'opere': [],
            'eventi': [],
            'media': [],
            'francobolli': [],
            'grandi-eventi': [],
            'design-brand': [],
            'campagne-sociali': [],
            'landing': {}
        };
        this.init();
    }

    // Inizializzazione asincrona
    async init() {
        const stored = localStorage.getItem('siteContent');
        if (stored) {
            try {
                this.content = JSON.parse(stored);
                console.log('📦 Contenuti caricati da localStorage');
            } catch (e) {
                console.error('Errore parsing localStorage, carico defaults', e);
                await this.loadFromJSON();
            }
        } else {
            await this.loadFromJSON();
        }

        this.setupEventListeners();
        this.renderList();
        this.updateFormTitle();
        this.updateConditionalFields();
    }

    async loadFromJSON() {
        try {
            const response = await fetch('content.json');
            if (response.ok) {
                const data = await response.json();
                this.content = data;
                console.log('📦 Contenuti caricati da content.json');
            }
        } catch (error) {
            console.error('Errore caricamento content.json:', error);
        }
    }

    // Salva in localStorage
    saveContent() {
        localStorage.setItem('siteContent', JSON.stringify(this.content));
        this.showFeedback('Contenuti salvati localmente!', 'success');
    }

    // Event Listeners
    setupEventListeners() {
        // Category change
        document.getElementById('categorySelect').addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.resetForm();
            this.renderList();
            this.updateFormTitle();
            this.updateConditionalFields();
        });

        // Form submit
        document.getElementById('contentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveItem();
        });

        // Add new button
        document.getElementById('addNewBtn').addEventListener('click', () => {
            this.resetForm();
        });

        // Cancel button
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.resetForm();
        });

        // Gallery checkbox
        document.getElementById('enableGallery').addEventListener('change', (e) => {
            document.getElementById('galleryInputs').style.display = e.target.checked ? 'block' : 'none';
            if (e.target.checked && document.getElementById('galleryList').children.length === 0) {
                this.addGalleryInput();
            }
        });

        // Add gallery input
        document.getElementById('addGalleryItem').addEventListener('click', () => {
            this.addGalleryInput();
        });

        // Export/Import
        document.getElementById('exportBtn').addEventListener('click', () => this.exportContent());
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        document.getElementById('importFile').addEventListener('change', (e) => this.importContent(e));

        // Save Preview Password
        document.getElementById('savePasswordBtn').addEventListener('click', () => {
            const pwd = document.getElementById('previewPassword').value.trim();
            if (pwd) {
                if (!this.content.settings) this.content.settings = {};
                this.content.settings.previewPassword = pwd;
                this.saveContent();
                this.showFeedback('Password anteprima aggiornata!', 'success');
            }
        });

        // Live Preview for Image Src
        document.getElementById('itemSrc').addEventListener('input', (e) => {
            this.updateLivePreview(e.target.value);
        });

        // Toggle quote fields based on landing type
        document.getElementById('landingType').addEventListener('change', (e) => {
            this.updateLandingFieldsToggle(e.target.value);
        });

        // File Pickers triggers
        document.getElementById('srcFilePicker').addEventListener('change', (e) => {
            this.handleFileSelect(e, 'itemSrc');
        });

        document.getElementById('linkFilePicker').addEventListener('change', (e) => {
            this.handleFileSelect(e, 'itemLink');
        });
    }

    // Handle File Selection and Path Formatting
    handleFileSelect(event, targetElementOrId) {
        const file = event.target.files[0];
        if (!file) return;

        const fileName = file.name;
        let path = '';

        // Determina la cartella di destinazione in base alla categoria
        if (targetElementOrId === 'itemLink' && this.currentCategory === 'media') {
            path = `assets/media/${fileName}`;
        } else {
            // General rule: assets/[category]/[filename]
            path = `assets/${this.currentCategory}/${fileName}`;
        }

        // Update target input
        let input;
        if (typeof targetElementOrId === 'string') {
            input = document.getElementById(targetElementOrId);
        } else {
            input = targetElementOrId;
        }

        if (input) {
            input.value = path;
            // Trigger events if necessary (e.g., live preview)
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // Reset the file input so it can be used again for the same file if needed
        event.target.value = '';
    }

    updateLandingFieldsToggle(type) {
        const quoteFields = document.querySelectorAll('.landing-quote-fields');
        quoteFields.forEach(el => el.style.display = type === 'quote' ? 'block' : 'none');

        const imageSrcField = document.getElementById('imageSrcField');
        if (imageSrcField) {
            imageSrcField.style.display = type === 'image' ? 'block' : 'none';
        }
    }

    updateLivePreview(src) {
        let preview = document.getElementById('livePreview');
        if (!preview) {
            preview = document.createElement('div');
            preview.id = 'livePreview';
            preview.className = 'live-preview-box';
            document.getElementById('imageSrcField').appendChild(preview);
        }

        if (src && src.trim() !== '') {
            preview.innerHTML = `<img src="${src}" alt="Anteprima" onerror="this.parentElement.innerHTML='<span class=\"err\">⚠️ Immagine non trovata a questo percorso</span>'">`;
            preview.style.display = 'block';
        } else {
            preview.style.display = 'none';
        }
    }

    // Update form title based on category
    updateFormTitle() {
        const categoryNames = {
            'opere': 'Opera',
            'eventi': 'Evento',
            'media': 'Media / Stampa',
            'francobolli': "Filatelia d'autore",
            'grandi-eventi': 'Grande Evento',
            'design-brand': 'Progetto Design',
            'campagne-sociali': 'Campagna Sociale',
            'anteprima': 'Anteprima Privata',
            'landing': 'Landing Page'
        };

        const editMode = document.getElementById('editMode').value === 'true';
        const action = editMode ? 'Modifica' : 'Aggiungi Nuova/o';
        const name = categoryNames[this.currentCategory] || 'Elemento';
        document.getElementById('formTitle').textContent = `${action} ${name}`;

        const listHeaderTitle = document.getElementById('listTitle');
        if (listHeaderTitle) {
            listHeaderTitle.textContent = `${name} - Lista Esistente`;
        }
    }

    // Show/hide conditional fields based on category
    updateConditionalFields() {
        // Nascondi tutti i campi condizionali
        document.querySelectorAll('.conditional-fields').forEach(el => el.style.display = 'none');

        // Mostra campi specifici
        const classToShow = `.${this.currentCategory.replace('-', '')}-fields`;
        const specificFields = document.querySelector(classToShow);
        if (specificFields) {
            specificFields.style.display = 'block';
        }

        const isMedia = this.currentCategory === 'media';
        const isAnteprima = this.currentCategory === 'anteprima';
        const isLanding = this.currentCategory === 'landing';

        document.getElementById('imageSrcField').style.display = (isMedia || (isLanding && document.getElementById('landingType').value === 'quote')) ? 'none' : 'block';
        document.getElementById('gallerySection').style.display = (isMedia || isLanding) ? 'none' : 'block';

        // Show password settings only if in Anteprima category
        const settingsSection = document.getElementById('previewSettingsSection');
        if (settingsSection) {
            settingsSection.style.display = isAnteprima ? 'block' : 'none';
            if (isAnteprima && this.content.settings) {
                document.getElementById('previewPassword').value = this.content.settings.previewPassword || '';
            }
        }

        // Rendi src obbligatorio solo se non è media e non è anteprima
        const srcInput = document.getElementById('itemSrc');
        const srcRequiredLabel = document.getElementById('srcRequired');
        const isRequired = !isMedia && !isAnteprima;

        if (srcInput) srcInput.required = isRequired;
        if (srcRequiredLabel) srcRequiredLabel.style.display = isRequired ? 'inline' : 'none';

        // Update placeholder for description based on category
        const descField = document.getElementById('itemDescription');
        if (descField) {
            if (isMedia) {
                descField.placeholder = "Note aggiuntive...";
            } else if (isLanding) {
                descField.style.display = 'none';
                document.querySelector('label[for="itemDescription"]').style.display = 'none';
            } else {
                descField.style.display = 'block';
                document.querySelector('label[for="itemDescription"]').style.display = 'block';
                descField.placeholder = "Descrizione dettagliata...";
            }
        }

        // Setup base fields for landing
        const titleGroup = document.querySelector('.form-group:has(#itemTitle)');
        const yearGroup = document.querySelector('.form-group:has(#itemYear)');
        if (isLanding) {
            if (titleGroup) titleGroup.style.display = 'none';
            if (yearGroup) yearGroup.style.display = 'none';
            document.getElementById('itemTitle').required = false;
            document.getElementById('itemYear').required = false;

            // Populate landing data if exists
            const lData = this.content.landing || {};
            document.getElementById('landingType').value = lData.type || 'quote';
            document.getElementById('itemQuote').value = lData.quote || '';
            document.getElementById('itemAuthor').value = lData.author || '';
            document.getElementById('itemSrc').value = lData.imageSrc || '';
            this.updateLandingFieldsToggle(document.getElementById('landingType').value);
        } else {
            if (titleGroup) titleGroup.style.display = 'block';
            if (yearGroup) yearGroup.style.display = 'block';
            document.getElementById('itemTitle').required = true;
            document.getElementById('itemYear').required = true;
        }

        // Export section for landing list
        const addNewBtn = document.getElementById('addNewBtn');
        if (isLanding) {
            if (addNewBtn) addNewBtn.style.display = 'none';
        } else {
            if (addNewBtn) addNewBtn.style.display = 'block';
        }
    }

    // Add gallery input field
    addGalleryInput(value = '') {
        const galleryList = document.getElementById('galleryList');
        const div = document.createElement('div');
        div.className = 'gallery-item';

        // Genera un ID unico per il file picker della riga della galleria
        const uniqueId = 'gallery-picker-' + Date.now() + Math.floor(Math.random() * 1000);

        div.innerHTML = `
            <div class="input-with-picker" style="flex: 1;">
                <input type="text" placeholder="assets/${this.currentCategory}/immagine.jpg" value="${value}">
                <button type="button" class="btn-picker btn-small" onclick="document.getElementById('${uniqueId}').click()" title="Seleziona immagine">📂</button>
                <input type="file" id="${uniqueId}" accept="image/*" style="display: none;">
            </div>
            <button type="button" class="remove-gallery">🗑️</button>
        `;

        const textInput = div.querySelector('input[type="text"]');
        const fileInput = div.querySelector('input[type="file"]');

        fileInput.addEventListener('change', (e) => {
            this.handleFileSelect(e, textInput);
        });

        div.querySelector('.remove-gallery').addEventListener('click', () => {
            div.remove();
        });

        galleryList.appendChild(div);
    }

    // Get next ID for category
    getNextId() {
        const items = this.content[this.currentCategory] || [];
        if (items.length === 0) return 1;
        return Math.max(...items.map(item => parseInt(item.id) || 0)) + 1;
    }

    // Save item (add or update)
    saveItem() {
        if (this.currentCategory === 'landing') {
            this.content.landing = {
                type: document.getElementById('landingType').value,
                imageSrc: document.getElementById('itemSrc').value.trim(),
                quote: document.getElementById('itemQuote').value.trim(),
                author: document.getElementById('itemAuthor').value.trim()
            };
            this.saveContent();
            this.renderList();
            this.showFeedback('Landing Page aggiornata!', 'success');
            return;
        }

        const editMode = document.getElementById('editMode').value === 'true';
        const id = editMode ? parseInt(document.getElementById('itemId').value) : this.getNextId();

        // Get common form data
        const item = {
            id: id,
            title: document.getElementById('itemTitle').value.trim(),
            year: document.getElementById('itemYear').value.trim()
        };

        // Category-specific fields
        if (this.currentCategory === 'opere') {
            item.src = document.getElementById('itemSrc').value.trim();
            const size = document.getElementById('itemSize').value.trim();
            const technique = document.getElementById('itemTechnique').value.trim();
            if (size) item.size = size;
            if (technique) item.technique = technique;
        } else if (this.currentCategory === 'eventi') {
            item.src = document.getElementById('itemSrc').value.trim();
            const location = document.getElementById('itemLocation').value.trim();
            if (location) item.location = location;
        } else if (this.currentCategory === 'francobolli') {
            item.src = document.getElementById('itemSrc').value.trim();
            const issuedBy = document.getElementById('itemIssuedBy').value.trim();
            if (issuedBy) item.issuedBy = issuedBy;
        } else if (this.currentCategory === 'media') {
            item.source = document.getElementById('itemSource').value.trim();
            item.date = document.getElementById('itemDate').value.trim();
            item.link = document.getElementById('itemLink').value.trim();
            item.type = document.getElementById('itemType').value;
        } else {
            // Per le categorie "standard" (grandi eventi, design, campagne)
            item.src = document.getElementById('itemSrc').value.trim();
        }

        // Gallery (solo se non è media)
        if (this.currentCategory !== 'media' && document.getElementById('enableGallery').checked) {
            const galleryInputs = document.querySelectorAll('#galleryList input');
            const gallery = Array.from(galleryInputs).map(input => input.value.trim()).filter(v => v);
            if (gallery.length > 0) item.gallery = gallery;
        }

        // Description / infoText
        const description = document.getElementById('itemDescription').value.trim();
        if (description) {
            if (this.currentCategory === 'francobolli') {
                item.description = description;
            } else if (this.currentCategory === 'media') {
                item.info = description;
            } else {
                item.infoText = description;
            }
        }

        // Save to correct category
        if (!this.content[this.currentCategory]) {
            this.content[this.currentCategory] = [];
        }

        if (editMode) {
            const index = this.content[this.currentCategory].findIndex(i => i.id === id);
            if (index !== -1) {
                this.content[this.currentCategory][index] = item;
            }
        } else {
            // Aggiunge in alto (unshift) invece che in basso (push)
            this.content[this.currentCategory].unshift(item);
        }

        this.saveContent();
        this.renderList();
        this.resetForm();
        this.showFeedback(editMode ? 'Elemento aggiornato!' : 'Elemento aggiunto!', 'success');
    }

    // Reset form
    resetForm() {
        document.getElementById('contentForm').reset();
        document.getElementById('itemId').value = '';
        document.getElementById('editMode').value = 'false';
        document.getElementById('enableGallery').checked = false;
        document.getElementById('galleryInputs').style.display = 'none';
        document.getElementById('galleryList').innerHTML = '';
        this.updateFormTitle();
        this.updateConditionalFields();
        this.hideFeedback();
    }

    // Edit item
    editItem(id) {
        const item = this.content[this.currentCategory].find(i => i.id === id);
        if (!item) return;

        document.getElementById('itemId').value = item.id;
        document.getElementById('editMode').value = 'true';
        document.getElementById('itemTitle').value = item.title || '';
        document.getElementById('itemYear').value = item.year || '';

        if (this.currentCategory !== 'media') {
            const src = item.src || '';
            document.getElementById('itemSrc').value = src;
            this.updateLivePreview(src);
        }

        // Category-specific fields load
        if (this.currentCategory === 'opere') {
            document.getElementById('itemSize').value = item.size || '';
            document.getElementById('itemTechnique').value = item.technique || '';
        } else if (this.currentCategory === 'eventi') {
            document.getElementById('itemLocation').value = item.location || '';
        } else if (this.currentCategory === 'francobolli') {
            document.getElementById('itemIssuedBy').value = item.issuedBy || '';
        } else if (this.currentCategory === 'media') {
            document.getElementById('itemSource').value = item.source || '';
            document.getElementById('itemDate').value = item.date || '';
            document.getElementById('itemLink').value = item.link || '';
            document.getElementById('itemType').value = item.type || 'article';
        }

        // Description load
        document.getElementById('itemDescription').value = item.infoText || item.description || item.info || '';

        // Gallery load
        if (this.currentCategory !== 'media' && item.gallery && item.gallery.length > 0) {
            const enableGalleryCheckbox = document.getElementById('enableGallery');
            enableGalleryCheckbox.checked = true;
            document.getElementById('galleryInputs').style.display = 'block';
            document.getElementById('galleryList').innerHTML = '';
            item.gallery.forEach(img => this.addGalleryInput(img));
        }

        this.updateFormTitle();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Delete item
    deleteItem(id) {
        if (!confirm('Sei sicuro di voler eliminare questo elemento?')) return;

        this.content[this.currentCategory] = this.content[this.currentCategory].filter(i => i.id !== id);
        this.saveContent();
        this.renderList();
        this.showFeedback('Elemento eliminato!', 'success');
    }

    // Render list
    renderList() {
        const listContainer = document.getElementById('itemsList');

        if (this.currentCategory === 'landing') {
            const l = this.content.landing || {};
            listContainer.innerHTML = `
                <div class="item-card singleton-card">
                    <div class="item-info-wrapper">
                        <h3>Configurazione Attuale Landing</h3>
                        <div class="item-meta">
                            <span>Tipo: <b>${l.type === 'image' ? 'Immagine' : 'Citazione'}</b></span>
                            ${l.type === 'image' ? `<span>Percorso: ${l.imageSrc || '<i>Non impostato</i>'}</span>` : `<span>Citazione: "${l.quote || ''}" ${l.author ? ` - ${l.author}` : ''}</span>`}
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        const items = this.content[this.currentCategory] || [];

        if (items.length === 0) {
            listContainer.innerHTML = '<div class="empty-state">Nessun elemento presente in questa categoria.</div>';
            return;
        }

        listContainer.innerHTML = items.map(item => `
            <div class="item-card">
                <div class="item-preview-thumb">
                    ${item.src ? `<img src="${item.src}" alt="" onerror="this.src='https://via.placeholder.com/80x80?text=Err'">` : '<div class="no-img">N/A</div>'}
                </div>
                <div class="item-info-wrapper">
                    <h3>${item.title}</h3>
                    <div class="item-meta">
                        ${item.year ? `<span>📅 ${item.year}</span>` : ''}
                        ${this.currentCategory === 'media' ? `<span>🗞️ ${item.source || ''} ${item.date ? `(${item.date})` : ''}</span>` : ''}
                        ${item.location ? `<span>📍 ${item.location}</span>` : ''}
                        ${item.size ? `<span>📏 ${item.size}</span>` : ''}
                        ${item.technique ? `<span>🎨 ${item.technique}</span>` : ''}
                        ${item.gallery ? `<span>🖼️ +${item.gallery.length} foto</span>` : ''}
                    </div>
                </div>
                <div class="item-order-actions">
                    <button class="btn-icon" onclick="admin.moveUp(${item.id})" title="Sposta su">▲</button>
                    <button class="btn-icon" onclick="admin.moveDown(${item.id})" title="Sposta giù">▼</button>
                </div>
                <div class="item-actions">
                    <button class="btn btn-secondary btn-small" onclick="admin.editItem(${item.id})">✏️ Modifica</button>
                    <button class="btn btn-danger btn-small" onclick="admin.deleteItem(${item.id})">🗑️ Elimina</button>
                </div>
            </div>
        `).join('');
    }

    // Move item up
    moveUp(id) {
        const index = this.content[this.currentCategory].findIndex(i => i.id === id);
        if (index > 0) {
            const items = this.content[this.currentCategory];
            [items[index - 1], items[index]] = [items[index], items[index - 1]];
            this.saveContent();
            this.renderList();
        }
    }

    // Move item down
    moveDown(id) {
        const index = this.content[this.currentCategory].findIndex(i => i.id === id);
        const items = this.content[this.currentCategory];
        if (index < items.length - 1) {
            [items[index], items[index + 1]] = [items[index + 1], items[index]];
            this.saveContent();
            this.renderList();
        }
    }

    // Export content
    exportContent() {
        const dataStr = JSON.stringify(this.content, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `content.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showFeedback('Backup esportato con successo!', 'success');
    }

    // Import content
    importContent(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                // Verifica di base della struttura
                if (typeof data === 'object' && !Array.isArray(data)) {
                    this.content = data;
                    this.saveContent();
                    this.renderList();
                    this.showFeedback('Backup importato correttamente!', 'success');
                } else {
                    throw new Error('Formato non valido');
                }
            } catch (error) {
                this.showFeedback('Errore: file non valido o corrotto', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Show feedback
    showFeedback(message, type) {
        const feedback = document.getElementById('formFeedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.className = `form-feedback ${type}`;
            setTimeout(() => this.hideFeedback(), 5000);
        }
    }

    // Hide feedback
    hideFeedback() {
        const feedback = document.getElementById('formFeedback');
        if (feedback) {
            feedback.className = 'form-feedback';
            feedback.textContent = '';
        }
    }
}

// Initialize on load
let admin;
document.addEventListener('DOMContentLoaded', () => {
    admin = new AdminPanel();
});
