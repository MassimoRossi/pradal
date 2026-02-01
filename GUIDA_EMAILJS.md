# 📧 Guida Configurazione EmailJS

## Cosa è EmailJS?

EmailJS è un servizio gratuito che ti permette di inviare email direttamente dal tuo sito web **senza bisogno di un server**. Quando un visitatore compila il modulo e clicca "Invia messaggio", riceverai l'email direttamente nella tua casella, e il visitatore vedrà solo il messaggio "✅ Messaggio inviato con successo!".

## Piano Gratuito

- ✅ **200 email al mese** gratuite
- ✅ Nessuna carta di credito richiesta
- ✅ Configurazione in 5 minuti

---

## Passo 1: Crea Account EmailJS

1. Vai su **https://www.emailjs.com/**
2. Clicca su **"Sign Up"** (in alto a destra)
3. Registrati con la tua email o Google
4. Conferma l'email che riceverai

---

## Passo 2: Aggiungi Servizio Email

1. Nel Dashboard EmailJS, vai su **"Email Services"** (menu a sinistra)
2. Clicca su **"Add New Service"**
3. Scegli il tuo provider email:
   - **Gmail** (consigliato se usi Gmail)
   - **Outlook/Hotmail**
   - Altri provider disponibili
4. Clicca **"Connect Account"** e segui le istruzioni per autorizzare EmailJS
5. Una volta connesso, copia il **Service ID** (es: `service_abc123`)

---

## Passo 3: Crea Template Email

1. Nel Dashboard, vai su **"Email Templates"**
2. Clicca su **"Create New Template"**
3. Configura il template:

   **Subject (Oggetto):**
   ```
   {{subject}}
   ```

   **Content (Contenuto):**
   ```
   Hai ricevuto un nuovo messaggio dal sito web!

   Nome: {{from_name}}
   Email mittente: {{from_email}}

   Messaggio:
   {{message}}
   ```

   **To Email (Destinatario):**
   ```
   {{to_email}}
   ```

4. Clicca **"Save"**
5. Copia il **Template ID** (es: `template_xyz789`)

---

## Passo 4: Ottieni Public Key

1. Nel Dashboard, vai su **"Account"** → **"General"**
2. Nella sezione **"API Keys"**, troverai la **Public Key**
3. Copia la **Public Key** (es: `abcDEF123GHI456`)

---

## Passo 5: Configura il Sito

Apri il file **`js/data.js`** e sostituisci i valori placeholder:

```javascript
emailJS: {
    serviceID: "service_abc123",      // 👈 Il tuo Service ID
    templateID: "template_xyz789",    // 👈 Il tuo Template ID  
    publicKey: "abcDEF123GHI456"      // 👈 La tua Public Key
}
```

**Salva il file** - il modulo è pronto! 🎉

---

## Test

1. Apri il sito nel browser
2. Vai alla pagina Contatti
3. Compila il form con dati di test
4. Clicca "Invia messaggio"
5. Dovresti vedere: **"✅ Messaggio inviato con successo!"**
6. Controlla la tua casella email (anche spam) - dovresti aver ricevuto l'email!

---

## Troubleshooting

### ❌ "Configurazione EmailJS mancante o errata"

- Verifica di aver inserito correttamente Service ID, Template ID e Public Key in `data.js`
- Controlla che non ci siano spazi extra o virgolette mancanti

### ❌ "Errore durante l'invio"

- Verifica la connessione internet
- Controlla che il servizio email sia attivo su EmailJS Dashboard
- Verifica che il template abbia i campi corretti: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_email}}`, `{{subject}}`

### 📧 Non ricevo l'email

- Controlla la cartella spam
- Verifica che l'email di destinazione in `recipientEmail` sia corretta
- Nel template EmailJS, verifica che il campo **To Email** sia impostato su `{{to_email}}`

---

## Limiti Piano Gratuito

- **200 email/mese** - Oltre questo limite, dovrai passare al piano a pagamento (~7$/mese)
- Se superi il limite, il form mostrerà un errore e non invierà più email

---

## Sicurezza

✅ **La tua Public Key è sicura**: può essere esposta nel codice JavaScript  
❌ **Non condividere**: Service ID e Template ID sono specifici del tuo account  
✅ **EmailJS protegge**: Previene spam automatico con rate limiting

---

## Link Utili

- **Dashboard EmailJS**: https://dashboard.emailjs.com/
- **Documentazione**: https://www.emailjs.com/docs/
- **Supporto**: support@emailjs.com
