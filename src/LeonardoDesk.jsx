import React, { useEffect, useState } from "react";
import { Check, ClipboardCheck, DraftingCompass, FileText, FolderOpen, HardHat, Image as ImageIcon, LandPlot, Lightbulb, MapPin, MessageCircle, Phone, Ruler } from "lucide-react";
import { resolveDeskGadgets, resolveLeonardoScene, scaleGadgets } from "./leonardo-scenes.js";

export function Blueprint({ compact = false }) {
  return (
    <svg className="desk-blueprint" viewBox="0 0 200 122" aria-hidden="true">
      <rect x="2" y="2" width="196" height="118" rx="2" fill="#f4f2e9" />
      <g fill="none" stroke="#405d67" strokeWidth="2">
        <path d="M28 22h140v66H28zM88 22v40h80M28 62h60v26M124 62v26" />
        <path d="M28 42h28V22M88 41h34M49 88V72M98 88V75" strokeWidth="1" />
        <path d="M20 16v79m154-79v79M23 98h149M28 94v8m140-8v8" strokeWidth=".6" />
        <path d="M61 62a17 17 0 0 1 17 17M133 62a15 15 0 0 0 15 15" strokeWidth=".6" />
      </g>
      {!compact && <text x="100" y="114" textAnchor="middle" fill="#40515a" fontSize="11" fontFamily="sans-serif">Hasta 150 m²</text>}
    </svg>
  );
}

export function ScaleChoiceVisual({ value }) {
  const asset = scaleGadgets[value];
  if (!asset) return null;
  return <span className={`scale-choice-visual ${asset.transparent ? "is-cutout" : ""}`} aria-hidden="true">{asset.src ? <img src={asset.src} alt="" loading="lazy" /> : <Blueprint />}</span>;
}

function ScenePhoto({ scene, active }) {
  const [photos, setPhotos] = useState({ current: scene, previous: null });
  useEffect(() => {
    if (!active || photos.current.src === scene.src) return;
    let cancelled = false;
    const next = new window.Image();
    next.onload = () => {
      if (!cancelled) setPhotos((prior) => ({ previous: prior.current, current: scene }));
    };
    next.src = scene.src;
    return () => { cancelled = true; next.onload = null; };
  }, [active, scene, photos.current.src]);

  return <div className="desk-photo" data-scene={photos.current.src}>
    {photos.previous && <img className="desk-photo-previous" src={photos.previous.src} alt="" aria-hidden="true" />}
    <img key={photos.current.src} className="desk-photo-current" src={photos.current.src} alt={photos.current.alt} width="1600" height="900" loading={active ? "eager" : "lazy"} decoding="async" />
  </div>;
}

function PaperGadget({ id, value }) {
  if (id === "estado") {
    const Icon = { "Solo idea": Lightbulb, "Tengo terreno": LandPlot, "Tengo planos": DraftingCompass, "Obra iniciada": HardHat }[value];
    return <span className="desk-paper desk-state"><Icon /><span className="paper-lines" /><small>{value}</small></span>;
  }
  if (id === "documentacion") {
    const Icon = value === "Fotos" ? ImageIcon : value === "Presupuesto previo" ? ClipboardCheck : value === "Sin archivos" ? FolderOpen : FileText;
    return <span className="desk-folder"><span className="folder-tab" /><span className="folder-sheet"><Icon /><span className="paper-lines" /></span><small>{value === "Planos PDF/DWG" ? "Planos" : value}</small></span>;
  }
  if (id === "urgencia") {
    const count = { "Este mes": 1, "1 a 3 meses": 3, "3 a 6 meses": 6, "Sin apuro": 0 }[value];
    return <span className="desk-calendar"><span className="calendar-binding" /><span className="calendar-grid">{Array.from({ length: 12 }, (_, i) => <i key={i} className={i < count ? "marked" : ""} />)}</span><small>{value}</small></span>;
  }
  if (id === "ubicacion") {
    return <span className="desk-map"><span className="map-roads" /><MapPin /><small>{value}</small></span>;
  }
  const Icon = value === "WhatsApp" ? MessageCircle : value === "Visita técnica" ? HardHat : Phone;
  return <span className={`desk-phone ${value === "WhatsApp" ? "phone-whatsapp" : ""}`}><span className="phone-speaker" /><Icon /><small>{value === "Aún no definido" ? "Por definir" : value}</small></span>;
}

export default function LeonardoDesk({ project, phase, details, steps, stage, ready, dialogue, active, paused, onToggleMotion, onEdit }) {
  const scene = resolveLeonardoScene(project?.id, phase?.id);
  const gadgets = resolveDeskGadgets(details, steps);
  const deskVisible = stage >= 2;
  return (
    <div className={`avatar-stage leonardo-stage ${paused ? "effects-paused" : ""}`}>
      <div className={`leonardo-world ${deskVisible ? "has-desk" : ""}`}>
        <ScenePhoto scene={scene} active={active} />
        <div className="scene-label"><span /> Leonardo · {project?.title || "Tu guía de proyecto"}</div>
        {phase && <span className="scene-service">{phase.title}</span>}
        {deskVisible && <>
          <div className="desk-surface" aria-hidden="true"><span className="desk-drafting-grid" /></div>
          <div className="desk-objects" role="group" aria-label="Objetos de tu proyecto sobre la mesa de Leonardo">
            {gadgets.map((gadget) => <button type="button" key={`${gadget.id}:${gadget.value}`} className={`desk-object object-${gadget.id} ${gadget.asset?.transparent ? "is-cutout" : ""} ${stage === gadget.stage ? "is-current" : ""}`} aria-label={`Editar ${gadget.label}: ${gadget.value}`} title={`${gadget.label}: ${gadget.value}. Toca para editar.`} onClick={() => onEdit(gadget.stage)}>
              {gadget.asset?.src ? <span className={gadget.id === "tamano" ? "desk-scale-art" : "desk-uploaded-art"}><img src={gadget.asset.src} alt="" draggable="false" /></span> : gadget.id === "tamano" ? <span className="desk-scale-art"><Blueprint /></span> : <PaperGadget id={gadget.id} value={gadget.value} />}
            </button>)}
          </div>
          <span className="desk-edge-note">{gadgets.length ? "Toca un objeto para editarlo" : "Tus decisiones toman lugar en la mesa"}</span>
        </>}
        {ready && <span className="desk-ready"><Check size={14} /> Consulta preparada</span>}
      </div>
      <div className="desk-toolbar"><span><Ruler size={13} /><span className="desk-toolbar-normal">{deskVisible ? "Tu mesa de proyecto" : "Construyamos tu idea"}</span><span className="desk-toolbar-question">{ready ? "Consulta preparada" : steps[stage - 2]?.label || (stage === 8 ? "Tus datos de contacto" : stage === 1 ? "Elige el servicio" : "Elige tu proyecto")}</span></span><button type="button" onClick={onToggleMotion} aria-pressed={paused}>{paused ? "Activar efectos" : "Pausar efectos"}</button></div>
      <div className="speech"><strong>Una guía para cada decisión</strong><span>{dialogue}</span></div>
    </div>
  );
}
