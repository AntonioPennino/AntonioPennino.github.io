/* ============================================================
   ANTONIO PENNINO — Slow Media
   Vanilla JS leggero. Nessuna libreria esterna.
   ============================================================ */

// --- SCROLL REVEAL: fade-in lento e riflessivo ---
(() => {
    /** @type {NodeListOf<HTMLElement>} */
    const revealables = document.querySelectorAll('.reveal');
    if (!revealables.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target); // rivela una sola volta
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealables.forEach((el) => observer.observe(el));
})();

// --- LIGHTBOX VIDEO (YouTube) ---
(() => {
    const lightbox = document.getElementById('lightbox');
    const videoContainer = document.getElementById('video-container');
    const closeBtn = document.querySelector('.close-btn');
    if (!lightbox || !videoContainer) return;

    /** @type {HTMLElement|null} — elemento a cui restituire il focus alla chiusura */
    let lastFocused = null;

    /** @param {string} id — ID del video YouTube */
    function openLightbox(id) {
        lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const url = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&showinfo=0&modestbranding=1`;
        videoContainer.innerHTML =
            `<iframe src="${url}" title="Riproduttore video YouTube" width="100%" height="100%" ` +
            `frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (closeBtn) requestAnimationFrame(() => closeBtn.focus());
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        videoContainer.innerHTML = '';
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
    }

    // Esposizione minima per gli handler inline nell'HTML
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Chiusura cliccando sullo sfondo scuro
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Supporto tastiera (Invio / Spazio) per le card video
    document.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
})();

// --- MENU MOBILE ---
(() => {
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) return;
    const navLinks = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        const isActive = document.body.classList.toggle('mobile-menu-active');
        menuToggle.setAttribute('aria-expanded', String(isActive));
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            document.body.classList.remove('mobile-menu-active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
})();
