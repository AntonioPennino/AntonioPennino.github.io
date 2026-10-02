/* ============================================================
   ANTONIO PENNINO · Slow Media
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

// --- MODALE LAVORI: info + eventuali video in popup ---
(() => {
    const modal = document.getElementById('work-modal');
    const mediaSlot = document.getElementById('work-modal-media');
    const contentSlot = document.getElementById('work-modal-content');
    if (!modal || !mediaSlot || !contentSlot) return;

    const closeBtn = modal.querySelector('.work-modal-close');
    /** @type {HTMLElement|null} elemento a cui restituire il focus alla chiusura */
    let lastFocused = null;

    /** @param {string} id chiave del lavoro (es. "minidoc") */
    function openWork(id) {
        const detail = document.getElementById('detail-' + id);
        if (!detail) return;

        lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

        const videoId = detail.getAttribute('data-video');
        if (videoId) {
            const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            const isEN = (document.documentElement.lang || '').toLowerCase().startsWith('en');
            const watchLabel = isEN ? 'Watch on YouTube ↗' : 'Guarda su YouTube ↗';
            mediaSlot.innerHTML =
                `<div class="modal-video"><iframe src="${url}" title="Riproduttore video YouTube" ` +
                `allow="autoplay; encrypted-media" allowfullscreen></iframe></div>` +
                `<a class="modal-youtube-link" href="https://www.youtube.com/watch?v=${videoId}" ` +
                `target="_blank" rel="noopener noreferrer">${watchLabel}</a>`;
            mediaSlot.hidden = false;
        } else {
            mediaSlot.innerHTML = '';
            mediaSlot.hidden = true;
        }

        contentSlot.innerHTML = detail.innerHTML;
        modal.setAttribute('aria-label', detail.getAttribute('data-title') || 'Dettaglio lavoro');
        modal.classList.add('active');
        modal.removeAttribute('aria-hidden');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => { if (closeBtn) closeBtn.focus(); });
    }

    function closeWork() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        mediaSlot.innerHTML = ''; // ferma la riproduzione video
        contentSlot.innerHTML = '';
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
    }

    // Apertura da ogni card lavoro
    document.querySelectorAll('.work-card').forEach((card) => {
        const id = card.getAttribute('data-work');
        if (!id) return;
        card.addEventListener('click', () => openWork(id));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openWork(id);
            }
        });
    });

    // Chiusura: pulsante, overlay e tasto ESC
    modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeWork));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeWork();
    });

    // Focus trap: mantiene il TAB dentro la modale quando è aperta
    modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !modal.classList.contains('active')) return;
        const focusables = modal.querySelectorAll(
            'a[href], button, iframe, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
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
