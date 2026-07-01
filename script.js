// --- CUSTOM CURSOR LOGIC ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
    document.body.classList.add('custom-cursor-active');

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Il dot segue il cursore istantaneamente
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    const updateCursorOutline = () => {
        // Interpolazione lineare (LERP) per l'outline (ritardo fluido)
        const ease = 0.15;
        outlineX += (mouseX - outlineX) * ease;
        outlineY += (mouseY - outlineY) * ease;

        cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursorOutline);
    };
    requestAnimationFrame(updateCursorOutline);

    // Effetto Hover su elementi interattivi (inclusi i bottoni aria-role)
    document.querySelectorAll('a, .hover-target, .view-btn, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

// --- SCROLL REVEAL ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Chiudi con ESC
let activeTriggerElement = null;

function openLightbox(id) {
    activeTriggerElement = document.activeElement; // Salva l'elemento focalizzato prima dell'apertura
    lightbox.classList.add('active');
    const url = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&showinfo=0&modestbranding=1`;
    container.innerHTML = `<iframe src="${url}" title="Riproduttore video YouTube" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    document.body.style.overflow = 'hidden';
    
    // Sposta il focus sul pulsante di chiusura per consentire una facile navigazione
    setTimeout(() => {
        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) closeBtn.focus();
    }, 100);
}

function closeLightbox() {
    lightbox.classList.remove('active');
    container.innerHTML = '';
    document.body.style.overflow = '';
    if (activeTriggerElement) {
        activeTriggerElement.focus(); // Ritorna il focus alla card precedente
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});

// Supporto tastiera per le card video (invio / spazio)
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// --- ANIMAZIONE CONTATORE NUMERI (impact-section) ---
(() => {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats || stats.length === 0) return;

    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // Durata animazione in ms
                const increment = target / (duration / 16); // ~60fps

                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current).toLocaleString('it-IT');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString('it-IT');
                        if(target > 999999) {
                            counter.innerText = (target / 1000000).toFixed(1) + 'M';
                            counter.style.color = 'var(--neon-green)';
                        } else if (target > 999) {
                            counter.innerText = (target / 1000).toFixed(1) + 'K';
                        }
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    };

    const statObserver = new IntersectionObserver(animateStats, { threshold: 0.5 });
    stats.forEach(stat => statObserver.observe(stat));
})();