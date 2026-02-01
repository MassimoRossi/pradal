// Contact Page
window.SP.Pages.renderContact = async function () {
    const section = document.createElement('section');
    section.className = 'page page-contact container fade-in';

    section.innerHTML = `
        <h2 class="section-title">Contatti</h2>
        <div class="contact-layout">
            <div class="contact-info">
                <p>Per informazioni, acquisti o collaborazioni:</p>
                <ul>
                    <li>&nbsp;</li>
                    <li><strong>Email:</strong> ${window.SP.Data.contactConfig.displayEmail}</li>
                    <!-- Temporaneamente nascosti -->
                    <!-- <li><strong>Telefono:</strong> +39 333 1234567</li> -->
                    <!-- <li><strong>Studio:</strong> Via dell'Arte 1, Roma</li> -->
                </ul>
            </div>
            <form class="contact-form" id="contactForm">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Messaggio</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="submit-btn">Invia Messaggio</button>
                <div class="form-feedback" id="formFeedback"></div>
            </form>
        </div>
    `;

    // Aggiungi event listener per il form
    const form = section.querySelector('#contactForm');
    form.addEventListener('submit', handleContactFormSubmit);

    return section;
};

// Gestione invio form con EmailJS
function handleContactFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const feedback = form.querySelector('#formFeedback');
    const submitBtn = form.querySelector('.submit-btn');

    // Raccogli i dati del form
    const formData = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        message: form.querySelector('#message').value.trim()
    };

    // Validazione base
    if (!formData.name || !formData.email || !formData.message) {
        showFeedback(feedback, 'Compila tutti i campi del form.', 'error');
        return;
    }

    // Disabilita pulsante durante invio
    submitBtn.disabled = true;
    submitBtn.textContent = 'Invio in corso...';

    const config = window.SP.Data.contactConfig.emailJS;

    // Parametri per il template EmailJS
    const templateParams = {
        to_email: window.SP.Data.contactConfig.recipientEmail,
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        subject: window.SP.Data.contactConfig.subject
    };

    // Invia email tramite EmailJS
    emailjs.send(config.serviceID, config.templateID, templateParams, config.publicKey)
        .then(function (response) {
            console.log('Email inviata con successo!', response.status, response.text);
            showFeedback(feedback, '✅ Messaggio inviato con successo!', 'success');

            // Reset form
            form.reset();

            // Riabilita pulsante
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Invia Messaggio';
                feedback.textContent = '';
                feedback.className = 'form-feedback';
            }, 5000);
        }, function (error) {
            console.error('Errore invio email:', error);

            // Messaggio di errore più dettagliato
            let errorMessage = '❌ Errore durante l\'invio. ';
            if (error.text && error.text.includes('not found')) {
                errorMessage += 'Configurazione EmailJS mancante o errata. Verifica le chiavi in data.js';
            } else {
                errorMessage += 'Riprova più tardi.';
            }

            showFeedback(feedback, errorMessage, 'error');

            // Riabilita pulsante
            submitBtn.disabled = false;
            submitBtn.textContent = 'Invia Messaggio';
        });
}

// Mostra messaggio di feedback
function showFeedback(element, message, type) {
    element.textContent = message;
    element.className = `form-feedback form-feedback--${type}`;
}
