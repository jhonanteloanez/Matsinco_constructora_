# Matsinco — Sitio web y consulta guiada

Sitio de MATSINCO SRL. Constructora, desarrollado con React, Vite y GSAP. Incluye una presentación de proyectos y un formulario de consulta con Leonardo como guía visual.

## Ejecutar localmente

Requiere Node.js 20.19+ o 22.12+ y npm.

```sh
npm ci
npm run dev -- --port 5174
```

Abre http://127.0.0.1:5174/.

## Compilar y comprobar

```sh
npm run validate
npm run preview -- --port 5174 --strictPort
```

`validate` compila el sitio y comprueba recursos y elementos requeridos de la demo. `npm run build` genera la versión estática en `dist/`. Esa carpeta se genera localmente y se excluye de Git junto con `node_modules/`.

## Experiencia actual

- Portada fotográfica, cabecera blanca y logo vectorial basado en la referencia suministrada.
- Tres tarjetas con botones y control deslizante accesible para comparar imágenes.
- Residencia con piscina: primero el acceso en obra y después la vista hacia la piscina.
- Casa de ladrillo: «Fachada de ladrillo» y «Acceso y galería».
- Jardín Europa: «Vista frontal» y «En perspectiva».
- Entrada animada al cotizador y respeto de la preferencia de movimiento reducido.
- Consulta de nueve pasos, resumen editable, recuperación del borrador local y confirmación antes de reiniciar.
- Validación básica de teléfono, copia y descarga del resumen, y enlace para compartirlo por WhatsApp.

## Estructura

- `src/main.jsx`: formulario, guía visual y estructura principal.
- `src/PortfolioIntro.jsx`: portada, catálogo y comparación de proyectos.
- `src/styles.css` y `src/portfolio.css`: estilos y adaptación a distintos tamaños.
- `public/assets/brand/`: logo vectorial.
- `public/assets/projects/`: fotografías optimizadas en WebP.
- `public/assets/`: recursos visuales y clips de Leonardo.
- `scripts/validate-demo.mjs`: comprobaciones de compilación y recursos.

Los nombres físicos de algunas fotos conservan los sufijos originales `antes` y `despues`; el orden y las etiquetas que ve el visitante se definen en `showcaseProjects`, dentro de `src/PortfolioIntro.jsx`.

## Configuración y límites de la demo

Configura el número oficial de WhatsApp en `companyWhatsAppNumber`, dentro de `src/main.jsx`. Mientras esté vacío, WhatsApp permite elegir el destinatario.

Las respuestas se guardan en el navegador del visitante. Los archivos seleccionados no se suben: solo se conservan sus nombres y deben adjuntarse al compartir la consulta. La demo no dispone de recepción en servidor, correo ni CRM. Leonardo es un asistente virtual y sus clips son referenciales.

## Publicación

Para un alojamiento estático usa `npm ci && npm run build` y publica el contenido de `dist/`. El sitio utiliza rutas de recursos desde `/`, por lo que está preparado para servirse en la raíz de un dominio. Un despliegue bajo una subcarpeta necesita adaptar esas rutas.

Subir este repositorio a GitHub guarda el código; la publicación del sitio se configura por separado.
