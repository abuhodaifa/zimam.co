/* ZIMAM POULTRY - animations.js */

(function() {
    'use strict';

/* ============================================
   GSAP SCROLL ANIMATIONS
   ============================================ */
function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (!target || counter.dataset.animated) return;

        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // تسهيل خارجي
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            counter.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString();
                counter.dataset.animated = 'true';
            }
        }
        requestAnimationFrame(update);
    });
}

const animatedContentSelector = '.journey-item, .feature-card, .product-card, .sustain-card, .news-card, .stat-item, .quality-list-item';

function revealAnimatedContent() {
    document.documentElement.classList.remove('gsap-ready');
    document.querySelectorAll(animatedContentSelector).forEach(function(el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

function initAnimations() {
    // تحقق من توفر GSAP و ScrollTrigger
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded — showing all content without animations.');
        // أظهر جميع العناصر المخفية كـ fallback
        revealAnimatedContent();
        return;
    }

    try {
    gsap.registerPlugin(ScrollTrigger);

    // وضع علامة أن GSAP جاهز — يسمح بإخفاء العناصر للأنيميشن
    // Hero parallax
    gsap.to('.hero-bg img', {
        y: '20%',
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        },
    });

    // Hero content fade
    gsap.to('.hero-content', {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: '60% top',
            end: 'bottom top',
            scrub: 1,
        },
    });

    // عداد الأرقام
    ScrollTrigger.create({
        trigger: '.stats-section',
        start: 'top 80%',
        once: true,
        onEnter: animateCounters,
    });

    // Hero stats counter
    ScrollTrigger.create({
        trigger: '.hero-stats',
        start: 'top 90%',
        once: true,
        onEnter: animateCounters,
    });

    // Feature cards stagger
    gsap.from('.feature-card', {
        y: 40,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
        },
    });

    // Product cards stagger
    gsap.from('.product-card', {
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 80%',
        },
    });

    // Farm gallery cards stagger
    gsap.from('.farm-gallery-card', {
        y: 40,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.farm-gallery-grid',
            start: 'top 80%',
        },
    });

    // Sustain cards
    gsap.from('.sustain-card', {
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.sustain-grid',
            start: 'top 80%',
        },
    });

    // News cards
    gsap.from('.news-card', {
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.news-grid',
            start: 'top 80%',
        },
    });

    // Journey timeline items
    gsap.from('.journey-item', {
        x: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.journey-timeline',
            start: 'top 80%',
        },
    });

    // Stat items
    gsap.from('.stat-item', {
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 85%',
        },
    });

    // Quality list items
    gsap.from('.quality-list-item', {
        x: -30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.quality-list',
            start: 'top 80%',
        },
    });

    /* ============================================
       VANILLA TILT - FEATURE CARDS
       ============================================ */
    if (window.innerWidth > 768 && typeof VanillaTilt !== 'undefined') {
        document.querySelectorAll('.feature-card').forEach(card => {
            VanillaTilt.init(card, {
                max: 6,
                speed: 400,
                glare: true,
                'max-glare': 0.08,
                perspective: 1000,
            });
        });
    }

    document.documentElement.classList.add('gsap-ready');
    if (typeof ScrollTrigger.refresh === 'function') {
        ScrollTrigger.refresh();
    }
    } catch (error) {
        console.warn('Animations failed to initialize — showing all content:', error);
        revealAnimatedContent();
    }
}

// Expose to global scope
window.initAnimations = initAnimations;

})();
