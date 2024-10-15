document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const header = document.querySelector('header');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            } else {
                header.style.backgroundColor = 'transparent';
            }
        });
    }

    // Verifica che GSAP sia caricato prima di utilizzarlo
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animazione hero
        gsap.from('.hero-content', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });

        // Animazione sezioni
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Animazione portfolio items
        gsap.utils.toArray('.portfolio-item').forEach(item => {
            gsap.from(item, {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Animazione skills
        gsap.from('.skills li', {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.skills',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Animazione form di contatto
        gsap.from('#contact-form', {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: '#contact-form',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Animazione campi del form
        gsap.from('.form-group', {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '#contact-form',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    } else {
        console.warn('GSAP or ScrollTrigger not loaded. Animations will not run.');
    }

    // Effetto parallasse per l'hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    }
});
