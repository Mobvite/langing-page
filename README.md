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
│   ├── images/
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
- [Font Awesome 6](https://fontawesome.com/) — íconos de interfaz (navegación, redes sociales, indicadores).

> Nota: el statement del curso especifica HTML5/CSS3/JavaScript para el
> Landing Page (Vue Framework se reserva para las Frontend Web Applications),
> por eso este proyecto no usa ningún framework de JS.

---

## Estilo visual (glassmorphism)

El diseño visual (`assets/styles/styles.css`) se reconstruyó copiando los valores
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

## Curso

Ingeniería de Software — 1ASI0730 Aplicaciones Web — UPC — 2026-20
