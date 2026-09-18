// ============================================
// VITALITA LANDING PAGE
// Nomenclatura en inglés (variables, funciones, ids) según Source Code Style
// Guide & Coding Conventions del statement. El copy visible permanece en
// español (idioma por defecto elegido para esta entrega).
// ============================================


// ============================================
// MOBILE HAMBURGER MENU
// ============================================

var hamburgerButton = document.getElementById('hamburger-menu');
var navLinksList = document.getElementById('nav-links');
var navButtonsGroup = document.getElementById('nav-buttons');

function toggleMobileMenu() {
    var isOpen = navLinksList.classList.toggle('open');
    navButtonsGroup.classList.toggle('open');
    hamburgerButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

if (hamburgerButton) {
    hamburgerButton.addEventListener('click', toggleMobileMenu);
}

// Cerramos el menú móvil al hacer clic en cualquier link de navegación
var allNavLinks = document.querySelectorAll('.nav-link');
allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        navLinksList.classList.remove('open');
        navButtonsGroup.classList.remove('open');
        hamburgerButton.setAttribute('aria-expanded', 'false');
    });
});


// ============================================
// SCROLLSPY: resalta el link del navbar según la sección visible
// "Sobre Nosotros" agrupa 3 sub-secciones (Sobre Vitalita, Nuestra Startup,
// Testimonios), todas dentro de <section id="about">, como en los mockups.
// ============================================

var sectionsToObserve = document.querySelectorAll('main section[id]');

var scrollSpyObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var currentSectionId = entry.target.getAttribute('id');
                allNavLinks.forEach(function (link) {
                    var linkTargetId = link.getAttribute('href').replace('#', '');
                    link.classList.toggle('active', linkTargetId === currentSectionId);
                });
            }
        });
    },
    {
        // Se activa cuando la sección ocupa la franja central de la pantalla
        rootMargin: '-45% 0px -45% 0px'
    }
);

sectionsToObserve.forEach(function (section) {
    scrollSpyObserver.observe(section);
});


// ============================================
// PLACEHOLDER: CTAs que dependen de la futura Web Application
// Los botones con data-target-route todavía no tienen una vista real a la que
// redirigir (la Web Application en Vue aún no existe). Por ahora evitamos la
// navegación y avisamos por consola cuál sería la ruta destino, para que sea
// fácil de encontrar y reemplazar cuando el equipo defina las rutas reales.
// ============================================

var placeholderRouteLinks = document.querySelectorAll('[data-target-route]');

placeholderRouteLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        var targetRoute = link.getAttribute('data-target-route');
        console.info('[Vitalita Landing] TODO: redirigir a la Web Application ->', targetRoute);
    });
});


// ============================================
// LANGUAGE TOGGLE (i18n básico: es_419 <-> en_US)
// Cumple el requisito de Internacionalización del statement. Por ahora cubre
// el navbar, el Hero y los títulos/subtítulos de cada sección (los textos con
// atributos data-i18n-es / data-i18n-en). El resto del copy queda pendiente de
// traducir cuando el equipo confirme el texto final en inglés.
// ============================================

var currentLanguage = 'es'; // Idioma por defecto de esta entrega, según decisión del equipo
var translatableElements = document.querySelectorAll('[data-i18n-es]');
var languageToggleButton = document.getElementById('lang-toggle');

function applyLanguage(languageCode) {
    translatableElements.forEach(function (element) {
        var text = languageCode === 'en'
            ? element.getAttribute('data-i18n-en')
            : element.getAttribute('data-i18n-es');
        if (text) {
            element.textContent = text;
        }
    });
    document.documentElement.setAttribute('lang', languageCode);
    currentLanguage = languageCode;
}

if (languageToggleButton) {
    languageToggleButton.addEventListener('click', function () {
        applyLanguage(currentLanguage === 'es' ? 'en' : 'es');
    });
}


// ============================================
// TODO(equipo): FAQ ACCORDION
// Implementar cuando exista la sección FAQ (id="faq") con .faq-item /
// .faq-question / .faq-answer.
// ============================================


// ============================================
// TODO(equipo): PRICING CAROUSEL (flechas izquierda/derecha)
// Implementar cuando exista la sección Precios (id="pricing") con
// .pricing-grid / .pricing-arrow-left / .pricing-arrow-right.
// ============================================


// ============================================
// TODO(equipo): TESTIMONIALS CAROUSEL + TEAM CAROUSEL DOTS
// Implementar cuando exista la sección Sobre Nosotros (id="about") con
// .testimonials-track / .testimonials-arrow-* y .team-dot.
// ============================================
