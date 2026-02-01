# 📖 Guida Uso Pannello Amministrativo

## Accesso al Pannello

1. Apri il file **`admin.html`** con doppio clic
2. Si aprirà nel browser la pagina di amministrazione

---

## 🎨 Aggiungere una Nuova Opera (o Evento, Francobollo, etc.)

### Passo 1: Preparare le Immagini

**Prima di tutto**, copia le immagini nella cartella corretta:

- **Opere** → `assets/opere/`
- **Eventi** → `assets/eventi/`
- **Francobolli** → `assets/francobolli/`
- **Altri** → `assets/grandi-eventi/`, `assets/design-brand/`, etc.

**Esempio:** Se stai aggiungendo un'opera chiamata "Tramonto", copia le foto in `assets/opere/tramonto.jpg`

### Passo 2: Selezionare Categoria

Nel pannello admin, usa il menu a tendina per selezionare la categoria (es: Opere, Eventi, etc.)

### Passo 3: Cliccare "Aggiungi Nuovo"

Clicca il pulsante verde **"+ Aggiungi Nuovo"** in alto a destra della lista

### Passo 4: Compilare il Form

Il form cambierà automaticamente in base alla categoria selezionata:

**Campi Comuni**:
- **Titolo**: Nome dell'opera/evento/articolo
- **Anno**: Anno di realizzazione o pubblicazione

**Specifici per categoria**:
- **Opere**: 
  - **Dimensioni**: es: `80x100cm`
  - **Tecnica**: es: `Olio su tela`
- **Eventi**: 
  - **Luogo**: es: `Galleria Nazionale`
- **Francobolli**: 
  - **Emessa da**: es: `Poste Italiane`
- **Media (Stampa & Video)**:
  - **Fonte**: es: `ArtTribune` o `RAI 3`
  - **Tipo**: Seleziona tra "Articolo" o "Video"
  - **Link / Leggi qui**: Inserisci l'indirizzo web dell'articolo oppure il percorso di un video caricato (es: `assets/media/intervista.mp4`)

**Immagini e Galleria Carosello**:
(Nota: Questi campi sono nascosti per la categoria **Media**)
1. **Immagine Principale**: Percorso della foto, es: `assets/opere/quadro.jpg`
2. **Abilita Galleria Carosello**: Spunta ☑️ se vuoi mostrare più foto dell'opera/evento
3. Aggiungi i percorsi delle foto aggiuntive cliccando "+ Aggiungi Immagine"

**📝 Descrizione**:
Testo libero opzionale per fornire dettagli aggiuntivi.

### Passo 5: Salvare

Clicca il pulsante verde **"💾 Salva"**

✅ L'elemento è stato aggiunto! Ora apparirà nel sito quando apri `index.html`

---

## ✏️ Modificare un Elemento Esistente

1. Trova l'elemento nella lista a destra
2. Clicca **"✏️ Modifica"**
3. Il form si riempirà con i dati attuali
4. Modifica quello che vuoi
5. Clicca **"💾 Salva"**

## 🗑️ Eliminare un Elemento

1. Trova l'elemento nella lista
2. Clicca **"🗑️ Elimina"**
3. Conferma l'eliminazione

⚠️ **Attenzione**: L'eliminazione è permanente (a meno che tu non abbia un backup)

---

## Gestione Pagina Anteprima (Privata)

Questa funzione ti permette di mostrare contenuti esclusivi solo a persone selezionate.

1.  **Impostare la Password**: 
    - Scegli la categoria **"🔒 Anteprima (Privata)"**.
    - Apparirà un riquadro **"Impostazioni Anteprima"**.
    - Scrivi la password e clicca **"Aggiorna Password"**.
2.  **Aggiungere Contenuti**: 
    - Aggiungi opere o testi come faresti normalmente, assicurandoti che la categoria selezionata sia "Anteprima".
3.  **Condividere il link**: 
    - Manda ai tuoi contatti il link del sito aggiungendo `/index.html#/anteprima` alla fine (oppure clicca sul tasto Anteprima se lo hai aggiunto al menu).

---

## 💾 Backup e Sicurezza

### Esportare Backup

1. Clicca **"💾 Esporta Backup"** in alto
2. Si scaricherà un file `.json` con TUTTI i contenuti
3. **Salva questo file in un posto sicuro!**

### Importare Backup

1. Clicca **"📥 Importa Backup"**
2. Seleziona il file `.json` precedentemente esportato
3. Tutti i contenuti verranno ripristinati

**Consiglio**: Esporta un backup prima di fare modifiche importanti!

---

## 🚀 Pubblicare le modifiche su Netlify (o altri dispositivi)

**Importante**: Il Pannello Admin salva le modifiche **solo nel tuo browser**. Per far sì che le vedano tutti (su Netlify o sul tuo cellulare), segui questa procedura velocissima che hai impostato:

1.  Nel pannello admin, clicca **"💾 Esporta Backup"**.
2.  Nella finestra che si apre, seleziona la cartella del sito e scegli di **sovrascrivere** il file **`content.json`** esistente.
3.  **Ora carica la cartella su Netlify.**

Solo caricando il file `content.json` aggiornato su Netlify la modifica diventerà "globale" e visibile a chiunque acceda al sito!

---

## 👁️ Vedere le Modifiche nel Sito

1. Clicca **"👁️ Visualizza Sito"** in alto (o apri `index.html`)
2. Le modifiche saranno visibili immediatamente

---

## 📁 Organizzazione Immagini

### Struttura Consigliata

```
assets/
├── opere/
│   ├── money.jpg
│   ├── green.jpg
│   └── tramonto-1.jpg
├── eventi/
│   ├── mostra-roma.jpg
│   └── biennale.jpg
└── francobolli/
    └── commemorativo.jpg
```

### Regole per i Nomi File

- ✅ **Usa nomi semplici**: `tramonto.jpg`, `mostra-roma.jpg`
- ✅ **Solo lettere, numeri, trattini**
- ❌ **Evita spazi**: usa `-` al posto di spazi
- ❌ **Evita caratteri speciali**: `àèé#@!`

---

## ❓ Risoluzione Problemi

### L'immagine non appare nel sito

1. **Verifica percorso**: Assicurati che il percorso sia corretto (es: `assets/opere/immagine.jpg`)
2. **Controlla file**: Verifica che il file esista davvero nella cartella
3. **Estensione**: Usa `.jpg`, `.jpeg` o `.png` (minuscolo)

### Le modifiche non si vedono

1. **Ricarica pagina**: Premi `Ctrl+F5` nel browser per forzare il ricaric amento
2. **Controlla salvataggio**: Assicurati di aver cliccato "Salva" nel pannello admin

### Ho perso dati

1. **Importa backup**: Usa un file backup precedentemente esportato
2. **Nessun backup?**: I dati sono in `content.json` - controlla se esiste ancora

---

## 💡 Consigli Utili

1. **Fai backup regolari** (settimanali o prima di modifiche importanti)
2. **Testa le modifiche** subito dopo salvarle
3. **Usa nomi descrittivi** per immagini (es: `tramonto-2024.jpg` invece di `IMG001.jpg`)
4. **Mantieni ordine** nelle cartelle assets

---

## 🆘 Supporto

Se hai problemi:
1. Controlla questa guida
2. Esporta un backup dei tuoi dati
3. Contatta l'assistenza tecnica

**File Importanti**:
- `admin.html` → Pannello amministrativo
- `content.json` → Tutti i tuoi contenuti
- `assets/` → Tutte le immagini
