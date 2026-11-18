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

// --- CAROSELLO DI CLIP NELL'HERO ---
// Scorre da solo in loop infinito e le clip partono in automatico (mute).
(() => {
    const marquee = document.querySelector('.marquee');
    if (!marquee) return;
    const track = marquee.querySelector('.marquee-track');
    const set = marquee.querySelector('.marquee-set');
    const toggle = document.querySelector('.marquee-toggle');
    if (!track || !set) return;

    // Secondo set identico per il loop infinito, nascosto a lettori di schermo e tastiera
    const clone = set.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('button').forEach((el) => el.setAttribute('tabindex', '-1'));
    track.append(clone);
    marquee.classList.add('is-running');

    /** @type {HTMLVideoElement[]} */
    const videos = Array.from(track.querySelectorAll('video'));
    /** @type {Set<HTMLVideoElement>} clip attualmente a schermo */
    const visible = new Set();
    let paused = false;

    const play = (v) => {
        v.muted = true; // necessario perché il browser consenta l'avvio automatico
        v.play().catch(() => {});
    };

    if ('IntersectionObserver' in window) {
        // Riproduce solo le clip visibili: le altre restano ferme e non consumano risorse
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = /** @type {HTMLVideoElement} */ (entry.target);
                if (entry.isIntersecting) {
                    visible.add(video);
                    if (!paused) play(video);
                } else {
                    visible.delete(video);
                    video.pause();
                }
            });
        }, { rootMargin: '0px 200px' });
        videos.forEach((v) => io.observe(v));
    } else {
        videos.forEach((v) => { visible.add(v); play(v); });
    }

    // Pulsante pausa: obbligatorio per i contenuti che si muovono da soli (WCAG 2.2.2)
    if (!toggle) return;
    const labels = {
        pause: toggle.getAttribute('data-label-pause') || 'Pause',
        play: toggle.getAttribute('data-label-play') || 'Play',
    };
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
        paused = !paused;
        marquee.classList.toggle('is-paused', paused);
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.querySelector('.marquee-toggle-label').textContent = paused ? labels.play : labels.pause;
        visible.forEach((v) => (paused ? v.pause() : play(v)));
    });
})();

// --- ANTEPRIMA VIDEO SULLE CARD AL PASSAGGIO DEL MOUSE ---
(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return;

    document.querySelectorAll('.work-card').forEach((card) => {
        /** @type {HTMLVideoElement|null} */
        const video = card.querySelector('.work-preview');
        if (!video) return;
        let stopTimer = 0;

        card.addEventListener('mouseenter', () => {
            clearTimeout(stopTimer);
            video.muted = true;
            video.play().then(() => card.classList.add('is-previewing')).catch(() => {});
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('is-previewing');
            // pausa dopo la dissolvenza
            stopTimer = window.setTimeout(() => video.pause(), 700);
        });
    });
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

    // Apertura: card dei lavori e clip dell'hero (anche quelle duplicate dal carosello)
    document.addEventListener('click', (e) => {
        const trigger = e.target instanceof Element ? e.target.closest('[data-work]') : null;
        if (trigger) openWork(trigger.getAttribute('data-work'));
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

// --- EMBED INSTAGRAM: lo script di Instagram si carica solo vicino alla sezione ---
(() => {
    const box = document.querySelector('[data-instagram-embeds]');
    if (!box) return;
    let loaded = false;

    const load = () => {
        if (loaded) return;
        loaded = true;
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        script.onload = () => {
            if (window.instgrm) window.instgrm.Embeds.process();
        };
        document.body.append(script);
    };

    if (!('IntersectionObserver' in window)) {
        load();
        return;
    }
    const io = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
            io.disconnect();
            load();
        }
    }, { rootMargin: '600px 0px' });
    io.observe(box);
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
