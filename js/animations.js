// Enhanced Cinematic Animations for Antonio Pennino's Website
// Complete rewrite for maximum visual impact and SEO performance

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initLoadingScreen();
    initScrollAnimations();
    initParallaxEffects();
    initTypingAnimation();
    initCounterAnimations();
    initSmoothScrolling();
    initNavbarEffects();
    initInteractiveElements();
    initParticleEffects();
    initCinematicEffects();
});

// Dramatic loading screen
function initLoadingScreen() {
    const body = document.body;
    body.style.overflow = 'hidden';
    
    const loader = document.createElement('div');
    loader.className = 'cinematic-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="film-strip">
                <div class="frame"></div>
                <div class="frame"></div>
                <div class="frame"></div>
                <div class="frame"></div>
            </div>
            <h2 class="loading-text">🎬 Caricamento Esperienza Cinematografica...</h2>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    `;
    
    const loaderStyles = `
        .cinematic-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: all 1s ease;
        }
        
        .loader-content {
            text-align: center;
            color: white;
            max-width: 500px;
        }
        
        .film-strip {
            display: flex;
            justify-content: center;
            gap: 5px;
            margin-bottom: 30px;
        }
        
        .frame {
            width: 40px;
            height: 60px;
            background: linear-gradient(135deg, #00d4ff 0%, #ff6b35 50%, #ffd700 100%);
            border-radius: 5px;
            animation: filmRoll 1.5s ease-in-out infinite;
        }
        
        .frame:nth-child(2) { animation-delay: 0.2s; }
        .frame:nth-child(3) { animation-delay: 0.4s; }
        .frame:nth-child(4) { animation-delay: 0.6s; }
        
        @keyframes filmRoll {
            0%, 100% { transform: scale(1) rotateY(0deg); opacity: 0.7; }
            50% { transform: scale(1.2) rotateY(180deg); opacity: 1; }
        }
        
        .loading-text {
            font-size: 1.5rem;
            margin-bottom: 30px;
            background: linear-gradient(135deg, #00d4ff 0%, #ff6b35 50%, #ffd700 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: textGlow 2s ease-in-out infinite;
        }
        
        @keyframes textGlow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.3) drop-shadow(0 0 20px rgba(0, 212, 255, 0.5)); }
        }
        
        .progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00d4ff 0%, #ff6b35 50%, #ffd700 100%);
            width: 0;
            animation: progressFill 3s ease-out forwards;
        }
        
        @keyframes progressFill {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loaderStyles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(loader);
    
    // Remove loader with cinematic effect
    setTimeout(() => {
        loader.style.transform = 'scale(1.1)';
        loader.style.opacity = '0';
        loader.style.filter = 'blur(10px)';
        body.style.overflow = '';
        
        setTimeout(() => {
            loader.remove();
            styleSheet.remove();
            // Trigger hero animation
            initHeroEntrance();
        }, 1000);
    }, 3500);
}

// Cinematic hero entrance
function initHeroEntrance() {
    const heroContent = document.querySelector('.hero-content');
    const heroElements = heroContent?.querySelectorAll('h1, h2, p, .cta-button');
    
    if (heroElements) {
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.filter = 'blur(5px)';
            
            setTimeout(() => {
                el.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.filter = 'blur(0)';
            }, index * 300 + 500);
        });
    }
}

// Advanced scroll animations with intersection observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('visible');
                
                // Specific animations for different elements
                if (element.classList.contains('service-card')) {
                    animateServiceCard(element);
                } else if (element.classList.contains('testimonial-card')) {
                    animateTestimonialCard(element);
                } else if (element.classList.contains('stat-number')) {
                    animateCounter(element);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const elements = document.querySelectorAll(
        '.service-card, .testimonial-card, .skill-item, .stat-item, .about-text, h2, h3'
    );
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Service card animation
function animateServiceCard(card) {
    card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0) scale(1)';
    
    // Animate child elements
    const children = card.querySelectorAll('.service-icon, h3, p, .service-price');
    children.forEach((child, index) => {
        setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Testimonial card animation
function animateTestimonialCard(card) {
    card.style.transition = 'all 0.6s ease-out';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0) rotateY(0deg)';
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Enhanced counter animation
function animateCounter(element) {
    if (element.dataset.animated) return;
    
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(number * easeOut);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    element.dataset.animated = 'true';
    requestAnimationFrame(animate);
}

// Advanced parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-image, .about-image img');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrollTop * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Cinematic typing animation
function initTypingAnimation() {
    const titleElement = document.querySelector('.hero h1');
    if (!titleElement || titleElement.dataset.typed) return;

    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.dataset.typed = 'true';
    
    // Create cursor
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s infinite';
    cursor.className = 'typing-cursor';
    
    let charIndex = 0;
    const typeChar = () => {
        if (charIndex < originalText.length) {
            titleElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 100 + Math.random() * 100);
        } else {
            titleElement.appendChild(cursor);
            setTimeout(() => cursor.remove(), 3000);
        }
    };

    setTimeout(typeChar, 2000);
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                // Custom smooth scroll with easing
                const startY = window.pageYOffset;
                const targetY = offsetTop;
                const distance = targetY - startY;
                const duration = Math.abs(distance) * 0.5;
                let start = null;
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    
                    // Easing function
                    const ease = 1 - Math.pow(1 - progress, 3);
                    window.scrollTo(0, startY + distance * ease);
                    
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                }
                
                requestAnimationFrame(step);
            }
        });
    });
}

// Advanced navbar effects
function initNavbarEffects() {
    const navbar = document.querySelector('.nav');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';
    let ticking = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        
        // Glassmorphism effect
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.borderBottom = 'none';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show on scroll
        if (scrollDirection === 'down' && currentScrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Interactive elements with advanced effects
function initInteractiveElements() {
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.cta-button, .service-cta');
    
    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', createRippleEffect);
        
        // Magnetic effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Card tilt effects
    const cards = document.querySelectorAll('.service-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Ripple effect function
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Particle effects for background
function initParticleEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    hero.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: float ${duration}s linear infinite ${delay}s,
                  twinkle 3s ease-in-out infinite;
    `;
    
    container.appendChild(particle);
}

// Advanced cinematic effects
function initCinematicEffects() {
    // Add film grain effect
    const filmGrain = document.createElement('div');
    filmGrain.className = 'film-grain';
    filmGrain.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.03;
        background-image: 
            radial-gradient(circle, #000 1px, transparent 1px),
            radial-gradient(circle, #000 1px, transparent 1px);
        background-size: 50px 50px, 25px 25px;
        background-position: 0 0, 25px 25px;
        animation: filmGrainMove 0.1s linear infinite;
    `;
    
    document.body.appendChild(filmGrain);
    
    // Add lens flare effect on mouse move
    let lensFlare = null;
    
    document.addEventListener('mousemove', (e) => {
        if (!lensFlare) {
            lensFlare = document.createElement('div');
            lensFlare.className = 'lens-flare';
            lensFlare.style.cssText = `
                position: fixed;
                width: 200px;
                height: 200px;
                border-radius: 50%;
                background: radial-gradient(circle, 
                    rgba(0, 212, 255, 0.1) 0%, 
                    rgba(255, 107, 53, 0.05) 50%, 
                    transparent 70%);
                pointer-events: none;
                z-index: 9997;
                transition: all 0.3s ease;
            `;
            document.body.appendChild(lensFlare);
        }
        
        lensFlare.style.left = (e.clientX - 100) + 'px';
        lensFlare.style.top = (e.clientY - 100) + 'px';
    });
}

// Add CSS animations
const cinematicStyles = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-10px); }
        75% { transform: translateY(-30px) translateX(5px); }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
    }
    
    @keyframes filmGrainMove {
        0% { transform: translate(0, 0); }
        10% { transform: translate(-5%, -5%); }
        20% { transform: translate(-10%, 5%); }
        30% { transform: translate(5%, -10%); }
        40% { transform: translate(-5%, 15%); }
        50% { transform: translate(-10%, 5%); }
        60% { transform: translate(15%, 0%); }
        70% { transform: translate(0%, 15%); }
        80% { transform: translate(-15%, 10%); }
        90% { transform: translate(10%, 5%); }
        100% { transform: translate(5%, 0%); }
    }
    
    .typing-cursor {
        font-weight: 100;
        color: #00d4ff;
        animation: blink 1s infinite;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = cinematicStyles;
document.head.appendChild(styleSheet);

// Performance optimization
let rafId = null;
function optimizedAnimationFrame(callback) {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(callback);
}

// Export functions for global access
window.CinematicEffects = {
    initLoadingScreen,
    initScrollAnimations,
    initParallaxEffects,
    initTypingAnimation,
    initCounterAnimations,
    initSmoothScrolling,
    initNavbarEffects,
    initInteractiveElements,
    initParticleEffects,
    initCinematicEffects
};
