// Vitalita landing page
// Código en inglés (variables, funciones, ids); el copy visible va en español.


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
// "Sobre Nosotros" agrupa tres sub-secciones dentro de <section id="about">.
// ============================================

var sectionsToObserve = document.querySelectorAll('main section[id]');

var scrollSpyObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var currentSectionId = entry.target.getAttribute('id');
                // Secciones sin link en el navbar (product, cta) no cambian el resaltado
                if (!document.querySelector('.nav-link[href="#' + currentSectionId + '"]')) return;
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
// LANGUAGE TOGGLE (es <-> en)
// Traduce todo nodo con data-i18n-es / data-i18n-en, sin importar la sección.
// Un nodo traducible no debe tener hijos con markup: textContent los borraría.
// Los textos largos con markup (páginas legales) van en bloques data-lang="es|en"
// y se muestra solo el del idioma activo.
// El idioma elegido se guarda para mantenerlo al pasar a terms.html / privacy.html.
// ============================================

var LANGUAGE_STORAGE_KEY = 'vitalita-lang';
var currentLanguage = 'en';
var translatableElements = document.querySelectorAll('[data-i18n-es]');
var languageBlocks = document.querySelectorAll('[data-lang]');
var languageOptions = document.querySelectorAll('.lang-option');
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
    languageBlocks.forEach(function (block) {
        block.hidden = block.getAttribute('data-lang') !== languageCode;
    });
    // Resalta en el botón el idioma activo
    languageOptions.forEach(function (option) {
        option.classList.toggle('active', option.getAttribute('data-lang-option') === languageCode);
    });
    document.documentElement.setAttribute('lang', languageCode);
    currentLanguage = languageCode;
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
    } catch (error) {
        // Sin acceso a localStorage (modo privado): el idioma solo dura esta página
    }
}

if (languageToggleButton) {
    languageToggleButton.addEventListener('click', function () {
        applyLanguage(currentLanguage === 'es' ? 'en' : 'es');
    });
}

var savedLanguage = null;
try {
    savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
} catch (error) {
    savedLanguage = null;
}
// Inglés por defecto; solo se usa español si el usuario ya lo había elegido
applyLanguage(savedLanguage === 'es' ? 'es' : currentLanguage);


// FAQ ACCORDION

var faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function (item) {
  var questionButton = item.querySelector('.faq-question');

  questionButton.addEventListener('click', function () {
    var isCurrentlyOpen = item.classList.contains('open');

    faqItems.forEach(function (otherItem) {
      otherItem.classList.remove('open');
      otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isCurrentlyOpen) {
      item.classList.add('open');
      questionButton.setAttribute('aria-expanded', 'true');
    }
  });
});



// PRICING CAROUSEL
// Resalta un plan a la vez y rota solo cada pocos segundos; las flechas mueven
// el resaltado y, en pantallas angostas, llevan la tarjeta a la vista.

var pricingGrid = document.querySelector('.pricing-grid');
var pricingArrowLeft = document.querySelector('.pricing-arrow-left');
var pricingArrowRight = document.querySelector('.pricing-arrow-right');
var pricingCards = document.querySelectorAll('.pricing-card');
var activePricingIndex = 1;
var pricingTimer = null;

function showPricingCard(index) {
  if (!pricingCards.length) return;
  activePricingIndex = (index + pricingCards.length) % pricingCards.length;
  pricingCards.forEach(function (card, cardIndex) {
    card.classList.toggle('is-active', cardIndex === activePricingIndex);
  });
}

function startPricingAutoplay() {
  clearInterval(pricingTimer);
  pricingTimer = setInterval(function () { showPricingCard(activePricingIndex + 1); }, 3500);
}

if (pricingCards.length) {
  showPricingCard(activePricingIndex);
  startPricingAutoplay();
  pricingGrid.addEventListener('mouseenter', function () { clearInterval(pricingTimer); });
  pricingGrid.addEventListener('mouseleave', startPricingAutoplay);
}

if (pricingArrowLeft) {
  pricingArrowLeft.addEventListener('click', function () { showPricingCard(activePricingIndex - 1); startPricingAutoplay(); });
}
if (pricingArrowRight) {
  pricingArrowRight.addEventListener('click', function () { showPricingCard(activePricingIndex + 1); startPricingAutoplay(); });
}

// TESTIMONIALS CAROUSEL + TEAM CAROUSEL

var testimonialsTrack = document.querySelector('.testimonials-track');
var testimonialsArrowLeft = document.querySelector('.testimonials-arrow-left');
var testimonialsArrowRight = document.querySelector('.testimonials-arrow-right');

function scrollTestimonialsCarousel(direction) {
  if (!testimonialsTrack) return;
  var scrollAmount = 284;
  testimonialsTrack.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

if (testimonialsArrowLeft) {
  testimonialsArrowLeft.addEventListener('click', function () { scrollTestimonialsCarousel(-1); });
}
if (testimonialsArrowRight) {
  testimonialsArrowRight.addEventListener('click', function () { scrollTestimonialsCarousel(1); });
}

var teamCarousel = document.getElementById('team-carousel');
var teamMembers = document.querySelectorAll('.team-member');
var teamDots = document.querySelectorAll('.team-dot');
var activeTeamIndex = 0;
var teamTimer = null;

// Un punto por posición: cada grupo es una ventana de 3 integrantes que avanza de a uno.
// El carrusel va de borde a borde, así que se centra al integrante del medio del grupo;
// el desplazamiento se calcula con el ancho real de la tarjeta, sin valores fijos.
function showTeamMember(index, behavior) {
  if (!teamCarousel || !teamMembers.length) return;
  var maxIndex = Math.min(teamDots.length, teamMembers.length) - 1;
  activeTeamIndex = index > maxIndex ? 0 : index;
  var centerMember = teamMembers[Math.min(activeTeamIndex + 1, teamMembers.length - 1)];
  teamCarousel.scrollTo({
    left: centerMember.offsetLeft - (teamCarousel.clientWidth - centerMember.offsetWidth) / 2,
    behavior: behavior || 'smooth'
  });
  teamDots.forEach(function (dot, dotIndex) {
    dot.classList.toggle('active', dotIndex === activeTeamIndex);
  });
}

function startTeamAutoplay() {
  clearInterval(teamTimer);
  teamTimer = setInterval(function () { showTeamMember(activeTeamIndex + 1); }, 3000);
}

teamDots.forEach(function (dot, dotIndex) {
  dot.addEventListener('click', function () {
    showTeamMember(dotIndex);
    startTeamAutoplay();
  });
});

if (teamCarousel) {
  showTeamMember(activeTeamIndex, 'auto');
  window.addEventListener('resize', function () { showTeamMember(activeTeamIndex, 'auto'); });
  startTeamAutoplay();
  teamCarousel.addEventListener('mouseenter', function () { clearInterval(teamTimer); });
  teamCarousel.addEventListener('mouseleave', startTeamAutoplay);
}
