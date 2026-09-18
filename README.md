# Vitalita — Landing Page

## Descripción

Vitalita es una plataforma de seguimiento geriátrico en tiempo real, diseñada
para que cuidadoras y enfermeras independientes mantengan un registro
estructurado de la salud de sus pacientes, y para que las familias permanezcan
informadas y preparadas ante cualquier emergencia.

Este repositorio contiene únicamente el **Landing Page** (sitio estático) del
modelo de negocio, según lo definido en el Final Project Statement del curso
1ASI0730 Aplicaciones Web. La Web Application (Vue) y el RESTful API viven en
repositorios separados.

---

## Segmentos objetivo

**Enfermeras / Cuidadoras independientes**
Necesitan un registro digital rápido y profesional de la salud de sus pacientes.

**Familiares**
Necesitan visibilidad en tiempo real y un informe de emergencia listo en 1 clic.

---

## Estructura del proyecto

```
vitalita-landing/
├── index.html
├── terms.html          (placeholder — completar según código de ética ACM/IEEE)
├── privacy.html        (placeholder — completar según Ley N.º 29733)
├── assets/
│   ├── styles/
│   │   └── styles.css
│   ├── images/         (colocar aquí los assets exportados de Figma)
│   └── scripts/
│       └── main.js
└── README.md
```

---

## Tecnologías usadas

- HTML5 (semántico, con SEO/meta tags y atributos ARIA)
- CSS3 (Flexbox, CSS Custom Properties como design tokens, Media Queries)
- JavaScript vanilla (DOM, eventos, IntersectionObserver, sin frameworks)
- [Google Fonts](https://fonts.google.com/) — Inter (única tipografía del sitio)
- [Font Awesome 6](https://fontawesome.com/) — íconos de interfaz (navegación, redes sociales, indicadores). Las ilustraciones/fotos reales (héroe, feature panels, equipo, testimonios) se dejan como placeholders en blanco a propósito.

> Nota: el statement del curso especifica HTML5/CSS3/JavaScript para el
> Landing Page (Vue Framework se reserva para las Frontend Web Applications),
> por eso este proyecto no usa ningún framework de JS.

---

## Estilo visual (glassmorphism)

El diseño visual (`../../vitalita-reparto-equipo/persona1-base-repo/assets/styles/styles.css`) se reconstruyó copiando los valores
exactos del archivo real de Figma (vía Figma Dev Mode / MCP), no aproximados de
una captura de pantalla:

- Fondo plano `#69A7D6` en todas las secciones (NO gradient).
- Círculos de "glow" (`.glow-circle`) en color `#85C4E5` con blur pesado,
  superpuestos sobre el fondo plano — igual que el efecto agregado manualmente
  en Figma.
- Tipografía Inter en todo el sitio (logo, títulos, cuerpo), con los pesos
  ExtraLight/Light/Regular/Medium/Bold que usa cada elemento en el diseño.
- Tarjetas de vidrio sin borde (`rgba(255,255,255,0.1)` + `blur(2px)`) para
  beneficios, feature panels y precios; navbar y botones en pastillas
  translúcidas; panel de vidrio único para el footer
  (`rgba(255,255,255,0.19)` + `blur(10px)`); tarjetas de testimonios con
  borde blanco sutil (único elemento con borde).
- Logo con el ícono `fa-seedling` en blanco (no verde) + texto "Vitalita" en
  Inter ExtraLight blanco.

---

## Reparto de trabajo del equipo

División por secciones (corte vertical: HTML + CSS + JS de cada parte),
trabajada en ramas de feature independientes y mergeadas en orden vía Pull
Request:

| Integrante | Secciones a cargo | Rama |
|---|---|---|
| Integrante 1 | Setup del proyecto, Navbar, Hero | `feature/setup-navbar-hero` |
| Integrante 2 | Beneficios, Para Cuidadoras, Para Familias | `feature/benefits-features` |
| Integrante 3 | Precios y Planes (+ carrusel) | `feature/pricing` |
| Integrante 4 | Sobre Nosotros: Sobre Vitalita, Nuestra Startup, Testimonios (+ carruseles) | `feature/about-team-testimonials` |
| Integrante 5 | FAQ, Footer, páginas legales (`terms.html`, `privacy.html`) | `feature/faq-footer-legal` |

---

## Pendientes conocidos (ver comentarios `TODO(equipo)` en el código)

- [ ] Reemplazar los placeholders en blanco (recuadros punteados) por las
      ilustraciones/fotos reales exportadas de Figma: ilustración del Hero,
      imágenes de los feature panels (Cuidadoras/Familias), fotos del equipo
      y fotos de testimonios.
- [ ] Completar nombres, código de estudiante, carrera y foto real de cada
      integrante en la sección "Nuestra Startup".
- [ ] Redactar el contenido real de `terms.html` y `privacy.html`.
- [ ] Definir las rutas reales de la Web Application y reemplazar los
      `data-target-route` placeholder en los CTAs (login, registro por
      segmento, cada plan de precios).
- [ ] Confirmar con el docente si el idioma por defecto debe ser inglés
      (así lo exige el statement) o español (como está esta versión, por
      decisión del equipo). El mecanismo de i18n ya existe (`data-i18n-es`
      / `data-i18n-en` + botón EN/ES) pero solo cubre navbar, Hero y
      encabezados de sección; falta traducir el resto del copy.
- [ ] Diseñar formalmente el Mock-up Mobile en Figma (esta versión ya es
      responsive por CSS, pero no partió de un wireframe/mock-up mobile
      documentado, que el statement pide como artefacto propio).
- [ ] Configurar despliegue en GitHub Pages sobre el repositorio dedicado del
      Landing Page (independiente del repo de la Web Application) con
      GitFlow, Conventional Commits y Semantic Versioning.

---

## Curso

Ingeniería de Software — 1ASI0730 Aplicaciones Web — UPC — 2026-20
