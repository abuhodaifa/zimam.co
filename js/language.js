/* ZIMAM POULTRY - language.js */

(function() {
    'use strict';

    const langToggle = document.getElementById('langToggle');
    const langLabel = document.getElementById('langLabel');
    const htmlEl = document.documentElement;

    // Shared state accessible globally
    window.ZimamLang = {
        current: 'ar',
        lenisInstance: null
    };

    function setLanguage(lang) {
        window.ZimamLang.current = lang;
        htmlEl.setAttribute('lang', lang);
        htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        htmlEl.setAttribute('data-lang', lang);

        // Switch text content
        document.querySelectorAll('[data-' + lang + ']').forEach(function(el) {
            el.textContent = el.getAttribute('data-' + lang);
        });

        // Show/hide language-specific elements
        document.querySelectorAll('[data-lang-show]').forEach(function(el) {
            el.style.display = el.getAttribute('data-lang-show') === lang ? '' : 'none';
        });

        // Update arrow directions
        document.querySelectorAll('[data-arrow-rtl]').forEach(function(arrow) {
            if (lang === 'ar') {
                arrow.classList.remove('fa-arrow-right');
                arrow.classList.add('fa-arrow-left');
            } else {
                arrow.classList.remove('fa-arrow-left');
                arrow.classList.add('fa-arrow-right');
            }
        });

        // Update language button label
        if (langLabel) {
            langLabel.textContent = lang === 'ar' ? 'EN' : 'عر';
        }

        // Update body font family
        document.body.style.fontFamily = lang === 'ar'
            ? "var(--font-ar)"
            : "var(--font-en)";

        // Lenis is initialized once by main.js. Changing text direction
        // does not require destroying and recreating the scroll controller.
    }

    window.setLanguage = setLanguage;

    // Language toggle click handler
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            setLanguage(window.ZimamLang.current === 'ar' ? 'en' : 'ar');
        });
    }
})();
