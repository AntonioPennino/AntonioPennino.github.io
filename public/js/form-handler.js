// Contenuto di form-handler.js (preso da una precedente interazione)
// Esempio: gestisce la validazione e l'invio di form di contatto

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form'); // Assicurati che l'ID del form sia corretto

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Esempio di invio a un endpoint (es. Netlify Forms, Formspree, o un backend custom)
            // Sostituisci con la tua logica di invio effettiva
            try {
                // const response = await fetch('/.netlify/functions/submit-form', { // Esempio per Netlify
                // const response = await fetch('https://formspree.io/f/TUO_ID_FORMSPREE', { // Esempio per Formspree
                //     method: 'POST',
                //     body: JSON.stringify(data),
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // });

                // if (response.ok) {
                //     alert('Messaggio inviato con successo!');
                //     contactForm.reset();
                // } else {
                //     alert('Si è verificato un errore durante l'invio del messaggio.');
                // }
                alert('Invio form non implementato in questo esempio. Dati: ' + JSON.stringify(data));
                contactForm.reset();
            } catch (error) {
                console.error('Errore invio form:', error);
                alert('Si è verificato un errore critico.');
            }
        });
    }
});
