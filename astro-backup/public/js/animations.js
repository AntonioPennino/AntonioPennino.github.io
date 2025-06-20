// Contenuto di animations.js (preso da una precedente interazione)
// Esempio: gestisce animazioni allo scroll, effetti di hover, ecc.

document.addEventListener('DOMContentLoaded', () => {
    // Esempio: Animazione per elementi con classe .fade-in
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // Aggiungi qui altre animazioni JS necessarie
    // ...
});

// Smooth scroll per i link interni (già parzialmente gestito in Header.astro, ma potrebbe esserci altro qui)
// Gestione di eventuali altri effetti dinamici non coperti da Astro
