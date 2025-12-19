// --- CUSTOM CURSOR LOGIC ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot segue istantaneamente
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline segue con leggero ritardo (animazione CSS gestisce il resto)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Effetto Hover su elementi interattivi
document.querySelectorAll('a, .hover-target, .view-btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// --- SCROLL REVEAL ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- LIGHTBOX LOGIC ---
const lightbox = document.getElementById('lightbox');
const container = document.getElementById('video-container');

function openLightbox(id) {
    lightbox.classList.add('active');
    const url = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&showinfo=0&modestbranding=1`;
    container.innerHTML = `<iframe src="${url}" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    container.innerHTML = '';
    document.body.style.overflow = '';
}

// Chiudi con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});