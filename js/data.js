// Mock Data Source - Attached to Global Namespace
window.SP.Data = {
    siteTitle: "PRADAL",

    // ========================================
    // CONTATTI - Configurazione Email
    // ========================================
    contactConfig: {
        // Email VISUALIZZATA nella pagina Contatti (visibile ai visitatori)
        displayEmail: "valeriopradal@gmail.com",

        // Email DESTINAZIONE dove arriveranno i messaggi dal modulo
        // (può essere diversa da quella visualizzata)
        recipientEmail: "massimorossibn@gmail.com",  // 👈 CAMBIA QUI per ricevere i messaggi

        // Oggetto dell'email
        subject: "Nuovo messaggio dal sito web",

        // ========================================
        // EMAILJS - Configurazione per invio diretto
        // ========================================
        // IMPORTANTE: Per far funzionare l'invio, devi:
        // 1. Creare account gratuito su https://www.emailjs.com/
        // 2. Configurare un servizio email (Gmail, Outlook, ecc.)
        // 3. Creare un template email
        // 4. Inserire qui sotto le tue chiavi (le trovi nel Dashboard EmailJS)
        emailJS: {
            serviceID: "YOUR_SERVICE_ID",      // 👈 Sostituisci con il tuo Service ID
            templateID: "YOUR_TEMPLATE_ID",    // 👈 Sostituisci con il tuo Template ID
            publicKey: "YOUR_PUBLIC_KEY"       // 👈 Sostituisci con la tua Public Key
        }
    },

    landing: {},
    bio: {
        shortText: `<b>Architetto, Visionario, Regista della Comunicazione.</b>

Valerio Pradal non occupa un settore; occupa uno spazio di confine. Laureato in Architettura allo IUAV di Venezia, ha trasformato la disciplina del costruire in una metodologia per edificare l’immagine. La sua carriera è un paradosso armonico: la precisione millimetrica della filatelia mondiale che convive con la gestione monumentale di eventi da milioni di spettatori.

<b>La Micro-Architettura del Senso</b>

Considerato uno dei più prolifici autori filatelici contemporanei, Pradal ha ridefinito il concetto di "frammento di carta". Con oltre 50 emissioni realizzate per la Repubblica di San Marino, Poste Italiane e Deutsche Post, ha saputo sintetizzare in pochi centimetri quadrati la storia del mondo: dal Centenario FIFA (Medaglia d'Oro mondiale) alla riapertura del Teatro La Fenice, fino al Francobollo di Natale 2021 per il MISE. Ogni sua opera filatelica è un’architettura in miniatura, dove il rigore del design incontra la potenza del simbolo.

<b>La Psicologia delle Masse e lo Sport</b>

Il suo percorso è segnato da un’indagine profonda sulla psicologia della massa. Come Direttore Generale dei Campionati Mondiali di Ciclismo su Strada (1999) e consulente per grandi federazioni (Baseball, Pesistica, Ciclismo), ha coordinato la comunicazione per i colossi dell'industria veneta e internazionale (Benetton, Del Vecchio, Sony). Per Pradal, l'evento sportivo non è solo gestione, ma una forma di regia collettiva dove il marketing diventa narrazione sociale.

<b>Curatela e Impegno Civile</b>

L'arte di Pradal sconfina inevitabilmente nel sociale e nella grande istituzione. Già Curatore e Vice Commissario alla Biennale d'Arte di Venezia (Padiglione San Marino, 53ª e 54ª edizione), ha prestato la sua visione a campagne di sensibilizzazione cruciali: dalla lotta contro la violenza sulle donne alla prevenzione sanitaria (ULSS4 e ULSS10), fino alla gestione della comunicazione per l'emergenza Covid-19.

<i>"L'impossibile è semplicemente qualcosa che si realizza un attimo dopo."</i>

<b>Un Profilo Poliedrico</b>

Dalla regia teatrale in Germania con lo spettacolo Zucchero, alla progettazione di macchine elettromedicali; dalla curatela di collane editoriali alla creazione di oltre 270 etichette di prodotto. Valerio Pradal muove i fili di una creatività che non accetta barriere tra marketing, etica ed estetica.

Oggi, insignito del titolo di Cavaliere dell’Ordine di Sant’Agata, continua a tradurre la complessità del contemporaneo in segni grafici memorabili, mantenendo intatta la curiosità di chi sa che ogni superficie — sia essa un muro, una tela o un francobollo — è uno spazio bianco pronto a diventare storia.`,
        sections: [
            { id: 'francobolli', title: "Filatelia d'autore", type: 'grid' },
            { id: 'grandi-eventi', title: "Grandi Eventi", type: 'grid' },
            { id: 'design-brand', title: "Design & Brand", type: 'grid' },
            { id: 'campagne-sociali', title: "Campagne Sociali", type: 'grid' },
            { id: 'stampa-media', title: "Stampa & Media", type: 'list' }
        ]
    },

    // ========================================
    // CONTENUTI DINAMICI
    // ========================================
    // I contenuti (opere, eventi, etc.) vengono caricati da content.json
    // Questo permette di gestirli tramite il pannello admin senza modificare questo file

    // Questi verranno popolati automaticamente da content.json
    opere: [],
    eventi: [],
    media: [],
    francobolli: [],
    "grandi-eventi": [],
    "design-brand": [],
    "campagne-sociali": [],
    "anteprima": [],
    settings: {
        previewPassword: "artist-preview"
    }
};

// ========================================
// CARICAMENTO CONTENUTI DA JSON
// ========================================
// Funzione per caricare i contenuti da content.json
async function loadContent() {
    console.log('🚀 [Data] Avvio caricamento contenuti...');

    // 1. Tenta il caricamento da content.json (Base)
    try {
        const response = await fetch('content.json');
        if (response.ok) {
            const baseContent = await response.json();
            Object.assign(window.SP.Data, baseContent);
            console.log('📦 [Data] Dati base caricati da content.json');
        } else {
            console.warn('⚠️ [Data] content.json non trovato o non accessibile.');
        }
    } catch (error) {
        console.warn('⚠️ [Data] Errore caricamento content.json (probabile blocco CORS locale):', error.message);
    }

    // 2. Tenta SEMPRE l'unione con localStorage (Modifiche Admin)
    try {
        const localContentStr = localStorage.getItem('siteContent');
        if (localContentStr) {
            const localContent = JSON.parse(localContentStr);
            console.log('🔍 [Data] Unione con modifiche localStorage...');

            for (let key in localContent) {
                const val = localContent[key];
                if (!val) continue;

                if (Array.isArray(val)) {
                    if (val.length > 0) window.SP.Data[key] = val;
                } else if (typeof val === 'object') {
                    if (Object.keys(val).length > 0) {
                        window.SP.Data[key] = Object.assign(window.SP.Data[key] || {}, val);
                    }
                } else {
                    window.SP.Data[key] = val;
                }
            }
            console.log('✅ [Data] localStorage caricato con successo.');
        }
    } catch (e) {
        console.error('❌ [Data] Errore critico in localStorage merge:', e);
    }

    console.log('🏁 [Data] Caricamento completato.');
    return window.SP.Data;
}

// Esporta funzione per uso nel sito
window.SP.loadContent = loadContent;
