/* ZIMAM POULTRY - main.js */

(function() {
    'use strict';

    /* ============================================
       LOADING SCREEN
       ============================================ */
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loaderBar');
    let loadProgress = 0;

    const loadInterval = setInterval(() => {
        loadProgress += Math.random() * 15 + 5;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadInterval);
            setTimeout(() => {
                loader.classList.add('is-hidden');
                document.body.style.overflow = '';
                if (typeof initAnimations === 'function') {
                    initAnimations();
                }
            }, 400);
        }
        loaderBar.style.width = loadProgress + '%';
    }, 120);

    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';

    /* ============================================
       SMOOTH SCROLL - LENIS
       ============================================ */
    let lenis = null;

    try {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time) {
            if (!lenis) return;
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Connect Lenis with ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
        }
    } catch(e) {
        console.warn('Lenis smooth scroll failed to initialize:', e);
    }

    // Store Lenis instance globally
    if (window.ZimamLang && lenis) {
        window.ZimamLang.lenisInstance = lenis;
    }

    /* ============================================
       HEADER SCROLL EFFECT
       ============================================ */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    }, { passive: true });

    /* ============================================
       MOBILE MENU
       ============================================ */
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavLinks = document.querySelectorAll('[data-mobile-nav]');

    function openMobileNav() {
        mobileNav.classList.add('is-open');
        menuToggle.classList.add('is-active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        mobileNav.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (mobileNav.classList.contains('is-open')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileNav);
    }
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileNav));

    /* ============================================
       AOS INIT
       ============================================ */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            disable: window.innerWidth < 768 ? 'phone' : false,
        });
    }

    /* ============================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                if (lenis && typeof lenis.scrollTo === 'function') {
                    lenis.scrollTo(target, { offset: -80 });
                } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    /* ============================================
       ACTIVE NAV LINK ON SCROLL
       ============================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('is-active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('is-active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    /* ============================================
       INITIALIZE TEXT CONTENT (Arabic as default)
       ============================================ */
    if (typeof setLanguage === 'function') {
        setLanguage('ar');
    }

})();
