# Imágenes de Leonardo y mesa de cotización

Origen: archivos entregados por el usuario en `Desktop/Matsinco cot` (26 de octubre de 2026). Se convirtieron a WebP para la web sin alterar su contenido. Los originales se conservan en su carpeta.

## Correspondencia por contenido

| Archivo de la web | Original |
|---|---|
| vivienda.webp | Vivienda.jfif |
| edificio.webp | Edificios.jfif |
| industrial.webp | Industrial.jfif |
| remodelacion.webp | Remodelacion.jfif |
| vivienda-construccion.webp | vivienda/construccion.jfif |
| vivienda-supervision.webp | gadg tamaño/150.jfif (muestra a Leonardo con una tablet) |
| vivienda-llave.webp | vivienda/llave en mano.jfif |
| edificio-construccion.webp, edificio-supervision.webp, edificio-llave.webp | Imágenes generadas desde Edificios.jfif con las escenas de servicio de Vivienda como referencia de acción |
| industrial-construccion.webp, industrial-supervision.webp, industrial-llave.webp | Imágenes generadas desde Industrial.jfif con las escenas de servicio de Vivienda como referencia de acción |
| remodelacion-construccion.webp, remodelacion-supervision.webp, remodelacion-llave.webp | Imágenes generadas desde Remodelacion.jfif con las escenas de servicio de Vivienda como referencia de acción |
| escala-150-400.webp | gadg tamaño/150-400.jfif |
| escala-mas-400.webp | gadg tamaño/+400.jfif |
| escala-por-definir.webp | gadg tamaño/por definir.jfif |

Los archivos `vivienda/diseño.jfif` y `vivienda/supervision.jfif` también muestran a Leonardo entregando llaves. Se usa la escena base de vivienda, con lápiz y plano, para Diseño; para Supervisión se usa la foto de tablet indicada arriba.

La maqueta compacta de hasta 150 m² se generó con la herramienta integrada image_gen a partir de la maqueta mediana como referencia de estilo. Su archivo es `escala-hasta-150.webp`, conserva transparencia real y representa una vivienda de una planta. Sustituye el plano vectorial provisional.

Las nueve escenas adicionales de Edificio, Industrial y Remodelación también se generaron con imagegen. Cada proyecto usa su foto base para Diseño y una foto propia para Construcción, Supervisión y Llave en mano. Los PNG originales están en `Desktop/Matsinco cot/servicios generados`; estas copias WebP de 1440 px están optimizadas para el sitio. Los prompts completos están en `outputs/Matsinco-imagenes/servicios-prompts.md` del espacio de trabajo de esta tarea. En las imágenes generadas, el logotipo pequeño de la ropa puede diferir ligeramente del logo maestro.

## Añadir nuevas imágenes

1. Guardar las imágenes de servicio en esta carpeta y registrar la pareja proyecto/servicio en `serviceScenes` de `src/leonardo-scenes.js`.
2. Para nuevos gadgets, preferir WebP o PNG con transparencia, vista a tres cuartos e iluminación compatible con la mesa. Registrar la ruta bajo la pregunta y el texto exacto de la opción en `detailGadgetAssets`. Por ejemplo: `estado: { "Tengo planos": { src: "/assets/leonardo/estado-planos.webp" } }`.
3. Mientras no exista un gadget, la mesa muestra un objeto creado con HTML/CSS/SVG. Las maquetas actuales sobre blanco se integran sobre la madera mediante composición CSS; los próximos recortes transparentes preservarán mejor sus colores.
4. No incluir nombres, teléfonos ni otros datos privados en estas imágenes.

La mesa usa posiciones relativas para conservar la composición en móvil y escritorio. Cada objeto responde a una sola pregunta: cambiar su respuesta reemplaza ese objeto y conserva los demás. Tocar un objeto abre su pregunta para editarla.
