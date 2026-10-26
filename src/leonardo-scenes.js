const directory = "/assets/leonardo";

export const projectScenes = {
  vivienda: { src: `${directory}/vivienda.webp`, alt: "Leonardo en su mesa de trabajo frente a una vivienda moderna" },
  edificio: { src: `${directory}/edificio.webp`, alt: "Leonardo con una maqueta de edificio en su mesa de trabajo" },
  industrial: { src: `${directory}/industrial.webp`, alt: "Leonardo con una maqueta de galpón frente a una nave industrial" },
  remodelacion: { src: `${directory}/remodelacion.webp`, alt: "Leonardo preparando una remodelación en su mesa de trabajo" },
};

// Design uses each project's base scene; the other services show their own stage.
export const serviceScenes = {
  vivienda: {
    diseno: projectScenes.vivienda,
    construccion: { src: `${directory}/vivienda-construccion.webp`, alt: "Leonardo con casco, chaleco y planos frente a la vivienda en construcción" },
    supervision: { src: `${directory}/vivienda-supervision.webp`, alt: "Leonardo inspeccionando la vivienda con una tablet y herramientas de medición" },
    llave: { src: `${directory}/vivienda-llave.webp`, alt: "Leonardo presentando las llaves de una vivienda terminada" },
  },
  edificio: {
    diseno: projectScenes.edificio,
    construccion: { src: `${directory}/edificio-construccion.webp`, alt: "Leonardo con casco y planos frente a un edificio en construcción" },
    supervision: { src: `${directory}/edificio-supervision.webp`, alt: "Leonardo supervisando un edificio con tablet y equipo de medición" },
    llave: { src: `${directory}/edificio-llave.webp`, alt: "Leonardo entrega las llaves de un edificio terminado" },
  },
  industrial: {
    diseno: projectScenes.industrial,
    construccion: { src: `${directory}/industrial-construccion.webp`, alt: "Leonardo con casco y planos en una nave industrial en construcción" },
    supervision: { src: `${directory}/industrial-supervision.webp`, alt: "Leonardo inspecciona una nave industrial con tablet y medidor" },
    llave: { src: `${directory}/industrial-llave.webp`, alt: "Leonardo presenta las llaves de un galpón industrial terminado" },
  },
  remodelacion: {
    diseno: projectScenes.remodelacion,
    construccion: { src: `${directory}/remodelacion-construccion.webp`, alt: "Leonardo prepara la ejecución de una remodelación interior" },
    supervision: { src: `${directory}/remodelacion-supervision.webp`, alt: "Leonardo supervisa una remodelación con tablet y medidor" },
    llave: { src: `${directory}/remodelacion-llave.webp`, alt: "Leonardo entrega las llaves de un espacio remodelado" },
  },
};

export const scaleGadgets = {
  "Hasta 150 m²": { src: `${directory}/escala-hasta-150.webp`, transparent: true, label: "Hasta 150 m²", short: "Compacto" },
  "150 a 400 m²": { src: `${directory}/escala-150-400.webp`, label: "150 a 400 m²", short: "Medio" },
  "Más de 400 m²": { src: `${directory}/escala-mas-400.webp`, label: "Más de 400 m²", short: "Amplio" },
  "Aún no definido": { src: `${directory}/escala-por-definir.webp`, label: "Por definir", short: "Lo definimos juntos" },
};

// Add future Gemini cutouts here; absent assets use the illustrated desk objects.
export const detailGadgetAssets = { tamano: scaleGadgets, estado: {}, documentacion: {}, urgencia: {}, ubicacion: {}, contacto: {} };

export function resolveLeonardoScene(projectId, serviceId) {
  return serviceScenes[projectId]?.[serviceId] || projectScenes[projectId] || projectScenes.vivienda;
}

export function resolveDeskGadgets(details, steps) {
  return steps.flatMap((step, index) => {
    const value = details[step.id];
    if (!step.options.includes(value)) return [];
    return [{ id: step.id, value, label: step.label, stage: index + 2, asset: detailGadgetAssets[step.id]?.[value] }];
  });
}
