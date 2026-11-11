/* ============================================================
   ANTONIO PENNINO · Video Editor & Visual Storyteller
   Vanilla JS leggero. Nessuna libreria esterna.
   ============================================================ */

// --- SCROLL REVEAL ---
(() => {
    /** @type {NodeListOf<HTMLElement>} */
    const revealables = document.querySelectorAll('.reveal');
    if (!revealables.length) return;

    if (!('IntersectionObserver' in window)) {
        revealables.forEach((el) => el.classList.add('active'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target); // rivela una sola volta
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    revealables.forEach((el) => observer.observe(el));
})();

// --- MODALE LAVORI: info + player (anche con più video) ---
(() => {
    const modal = document.getElementById('work-modal');
    const mediaSlot = document.getElementById('work-modal-media');
    const contentSlot = document.getElementById('work-modal-content');
    if (!modal || !mediaSlot || !contentSlot) return;

    const panel = modal.querySelector('.work-modal-panel');
    const closeBtn = modal.querySelector('.work-modal-close');
    const isEN = (document.documentElement.lang || '').toLowerCase().startsWith('en');
    const watchLabel = isEN ? 'Watch on YouTube ↗' : 'Guarda su YouTube ↗';

    /** @type {HTMLElement|null} elemento a cui restituire il focus alla chiusura */
    let lastFocused = null;

    /**
     * Carica un video YouTube nel player della modale.
     * @param {string} videoId
     * @param {string} title titolo accessibile dell'iframe
     */
    function setVideo(videoId, title) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1`;
        iframe.title = title;
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
        iframe.allowFullscreen = true;

        const frame = document.createElement('div');
        frame.className = 'modal-video';
        frame.append(iframe);

        // Se l'embed è bloccato (restrizioni lato spettatore) resta il link diretto
        const link = document.createElement('a');
        link.className = 'modal-youtube-link';
        link.href = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = watchLabel;

        mediaSlot.replaceChildren(frame, link);
        mediaSlot.hidden = false;
    }

    /** @param {string} id chiave del lavoro (es. "nikola") */
    function openWork(id) {
        const detail = document.getElementById('detail-' + id);
        if (!detail) return;

        lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const title = detail.getAttribute('data-title') || '';

        contentSlot.innerHTML = detail.innerHTML;

        const videoId = detail.getAttribute('data-video');
        if (videoId) {
            setVideo(videoId, title);
        } else {
            mediaSlot.replaceChildren();
            mediaSlot.hidden = true;
        }

        modal.setAttribute('aria-label', title);
        modal.classList.add('active');
        modal.removeAttribute('aria-hidden');
        document.body.style.overflow = 'hidden';
        panel.scrollTop = 0;
        requestAnimationFrame(() => { if (closeBtn) closeBtn.focus(); });
    }

    function closeWork() {
        if (!modal.classList.contains('active')) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        mediaSlot.replaceChildren(); // ferma la riproduzione
        contentSlot.replaceChildren();
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
    }

    // Apertura: card dei lavori e fotogrammi dell'hero
    document.querySelectorAll('[data-work]').forEach((trigger) => {
        trigger.addEventListener('click', () => openWork(trigger.getAttribute('data-work')));
    });

    // Cambio video dentro la modale
    contentSlot.addEventListener('click', (e) => {
        const item = e.target instanceof Element ? e.target.closest('.playlist-item') : null;
        if (!item) return;
        contentSlot.querySelectorAll('.playlist-item').forEach((el) => {
            el.setAttribute('aria-pressed', String(el === item));
        });
        setVideo(item.getAttribute('data-play'), item.textContent.trim());
        panel.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Chiusura: pulsante, sfondo, ESC
    modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeWork));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeWork();
    });

    // Focus trap: il TAB resta dentro la modale aperta
    modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !modal.classList.contains('active')) return;
        const focusables = modal.querySelectorAll('a[href], button, iframe');
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

    const setOpen = (open) => {
        document.body.classList.toggle('mobile-menu-active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', () => {
        setOpen(!document.body.classList.contains('mobile-menu-active'));
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => setOpen(false));
    });
})();
