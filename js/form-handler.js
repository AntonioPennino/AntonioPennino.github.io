document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = form.querySelector('button[type="submit"]');
            const originalButtonText = button.textContent;
            button.textContent = 'Invio in corso...';
            button.disabled = true;

            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    form.reset();
                    showMessage('Grazie! Il tuo messaggio è stato inviato con successo.', 'success');
                } else {
                    showMessage('Oops! C\'è stato un problema con l\'invio del messaggio. Per favore, riprova più tardi.', 'error');
                }
            }).catch(error => {
                showMessage('Oops! C\'è stato un problema con l\'invio del messaggio. Per favore, riprova più tardi.', 'error');
            }).finally(() => {
                button.textContent = originalButtonText;
                button.disabled = false;
            });
        });
    }

    function showMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        form.appendChild(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
});

