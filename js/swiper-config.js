/* ZIMAM POULTRY - swiper-config.js */

(function() {
    'use strict';

    /* ============================================
       SWIPER - TESTIMONIALS SLIDER
       ============================================ */
    function initSwipers() {
        // Testimonials slider
        const testimonialSlider = document.querySelector('.testimonials-slider');
        if (testimonialSlider && typeof Swiper !== 'undefined') {
            new Swiper('.testimonials-slider', {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
            });
        }

        // Future: Gallery slider for about page
        const gallerySlider = document.querySelector('.gallery-slider');
        if (gallerySlider && typeof Swiper !== 'undefined') {
            new Swiper('.gallery-slider', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.gallery-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
            });
        }

        // Future: Products carousel for products page
        const productsCarousel = document.querySelector('.products-carousel');
        if (productsCarousel && typeof Swiper !== 'undefined') {
            new Swiper('.products-carousel', {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.products-next',
                    prevEl: '.products-prev',
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                },
            });
        }
    }

    // Initialize after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSwipers);
    } else {
        initSwipers();
    }
})();
