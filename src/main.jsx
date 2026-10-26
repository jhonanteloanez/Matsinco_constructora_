import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import Building2 from "lucide-react/dist/esm/icons/building-2.js";
import Check from "lucide-react/dist/esm/icons/check.js";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left.js";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right.js";
import ClipboardCheck from "lucide-react/dist/esm/icons/clipboard-check.js";
import BrickWall from "lucide-react/dist/esm/icons/brick-wall.js";
import CalendarClock from "lucide-react/dist/esm/icons/calendar-clock.js";
import CircleHelp from "lucide-react/dist/esm/icons/circle-help.js";
import ClipboardList from "lucide-react/dist/esm/icons/clipboard-list.js";
import Clock from "lucide-react/dist/esm/icons/clock.js";
import Download from "lucide-react/dist/esm/icons/download.js";
import DraftingCompass from "lucide-react/dist/esm/icons/drafting-compass.js";
import Factory from "lucide-react/dist/esm/icons/factory.js";
import FileText from "lucide-react/dist/esm/icons/file-text.js";
import Hammer from "lucide-react/dist/esm/icons/hammer.js";
import HardHat from "lucide-react/dist/esm/icons/hard-hat.js";
import Home from "lucide-react/dist/esm/icons/home.js";
import Image from "lucide-react/dist/esm/icons/image.js";
import LandPlot from "lucide-react/dist/esm/icons/land-plot.js";
import Layers from "lucide-react/dist/esm/icons/layers.js";
import MapPin from "lucide-react/dist/esm/icons/map-pin.js";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle.js";
import Phone from "lucide-react/dist/esm/icons/phone.js";
import Play from "lucide-react/dist/esm/icons/play.js";
import RotateCcw from "lucide-react/dist/esm/icons/rotate-ccw.js";
import Ruler from "lucide-react/dist/esm/icons/ruler.js";
import Send from "lucide-react/dist/esm/icons/send.js";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check.js";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.js";
import Warehouse from "lucide-react/dist/esm/icons/warehouse.js";
import Wrench from "lucide-react/dist/esm/icons/wrench.js";
import PortfolioIntro from "./PortfolioIntro.jsx";
import LeonardoDesk, { ScaleChoiceVisual } from "./LeonardoDesk.jsx";
import "./styles.css";
import "./portfolio.css";
import "./leonardo-desk.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projectTypes = [
  {
    id: "vivienda",
    icon: Home,
    title: "Vivienda",
    subtitle: "Casa familiar, residencia o ampliación",
    prompt: "Perfecto. Para vivienda conviene definir terreno, metros aproximados y estilo esperado.",
    avatar: "viviendaAction",
    holdAvatar: "viviendaHold",
  },
  {
    id: "edificio",
    icon: Building2,
    title: "Edificio",
    subtitle: "Departamentos, oficinas o locales",
    prompt: "Bien. En edificios primero ordenamos alcance, niveles, circulaciones y etapa documental.",
    avatar: "edificioAction",
    holdAvatar: "edificioHold",
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Industrial",
    subtitle: "Naves, galpones, plantas o almacenes",
    prompt: "Proyecto industrial detectado. Necesitamos uso, cargas, accesos y condiciones del predio.",
    avatar: "industrialAction",
    holdAvatar: "industrialHold",
  },
  {
    id: "remodelacion",
    icon: Wrench,
    title: "Remodelación",
    subtitle: "Refacción, ampliación o mejora",
    prompt: "Para remodelar, lo clave es conocer el estado actual y qué partes deben mantenerse operativas.",
    avatar: "remodelacionAction",
    holdAvatar: "remodelacionHold",
  },
];

const phases = [
  {
    id: "diseno",
    icon: Sparkles,
    title: "Diseño",
    subtitle: "Concepto, planos y propuesta visual",
    prompt: "Arrancamos con una propuesta clara para convertir la idea en planos y decisiones.",
    avatar: "welcome",
  },
  {
    id: "construccion",
    icon: Hammer,
    title: "Construcción",
    subtitle: "Ejecución completa de obra",
    prompt: "Aquí ya hablamos de cuadrillas, cronograma, materiales y control de avance.",
    avatar: "thinking",
  },
  {
    id: "supervision",
    icon: HardHat,
    title: "Supervisión",
    subtitle: "Control técnico y seguimiento",
    prompt: "La supervisión protege calidad, tiempos y decisiones técnicas durante la obra.",
    avatar: "inspect",
  },
  {
    id: "llave",
    icon: ShieldCheck,
    title: "Llave en mano",
    subtitle: "Gestión integral hasta entrega",
    prompt: "Muy bien. Matsinco puede ordenar el proceso completo hasta una entrega lista.",
    avatar: "complete",
  },
];

const detailSteps = [
  {
    id: "tamano",
    label: "Tamaño estimado",
    cue: "Esto ayuda a estimar alcance, equipo y nivel de detalle.",
    options: ["Hasta 150 m²", "150 a 400 m²", "Más de 400 m²", "Aún no definido"],
  },
  {
    id: "estado",
    label: "Estado actual",
    cue: "Así sabemos si toca partir de concepto, planos o revisión de obra.",
    options: ["Solo idea", "Tengo terreno", "Tengo planos", "Obra iniciada"],
  },
  {
    id: "documentacion",
    label: "Documentación disponible",
    cue: "Esto define qué tan rápido se puede revisar el proyecto y preparar una respuesta.",
    options: ["Sin archivos", "Fotos", "Planos PDF/DWG", "Presupuesto previo"],
  },
  {
    id: "urgencia",
    label: "Tiempo esperado",
    cue: "El plazo cambia la prioridad de diseño, compras y planificación.",
    options: ["Este mes", "1 a 3 meses", "3 a 6 meses", "Sin apuro"],
  },
  {
    id: "ubicacion",
    label: "Ciudad o zona",
    cue: "La ubicación permite preparar una respuesta más realista.",
    options: ["Santa Cruz", "La Paz", "Cochabamba", "Otra ciudad"],
  },
  {
    id: "contacto",
    label: "Siguiente contacto",
    cue: "Elige cómo quieres continuar cuando el brief esté listo.",
    options: ["WhatsApp", "Llamada", "Visita técnica", "Aún no definido"],
  },
];

const avatarStates = {
  idle: "Listo para ayudarte a ordenar el proyecto.",
  welcome: "Ya tenemos el tipo de obra. Sigamos afinando el alcance.",
  thinking: "Voy armando la ruta técnica para que la cotización salga completa.",
  alert: "Atención: este tipo de obra necesita datos técnicos bien definidos.",
  inspect: "Vamos a mirar el estado actual y priorizar lo importante.",
  complete: "Con esto ya podemos preparar una consulta bastante sólida.",
};

function getQuoteProfile(project, phase, details) {
  const urgency = details.urgencia === "Este mes" ? "Alta" : details.urgencia === "Sin apuro" ? "Flexible" : "Media";
  const complexity =
    project?.id === "industrial" || details.tamano === "Más de 400 m²" || phase?.id === "llave"
      ? "Alta"
      : project?.id === "remodelacion" || details.estado === "Obra iniciada"
        ? "Media"
        : "Inicial";
  const nextStep =
    details.contacto === "Visita técnica"
      ? "Agendar visita técnica"
      : details.estado === "Tengo planos" || details.documentacion === "Planos PDF/DWG" || details.documentacion === "Presupuesto previo"
        ? "Revisar documentación"
        : "Levantar requerimientos";
  const requirements = new Set();

  if (project?.id === "vivienda") {
    requirements.add("Ubicación del terreno");
    requirements.add("Metros estimados");
    requirements.add("Referencias de estilo");
  }
  if (project?.id === "edificio") {
    requirements.add("Cantidad de niveles");
    requirements.add("Uso principal");
    requirements.add("Normativa o restricciones");
  }
  if (project?.id === "industrial") {
    requirements.add("Uso operativo");
    requirements.add("Dimensiones libres");
    requirements.add("Accesos y maniobras");
  }
  if (project?.id === "remodelacion") {
    requirements.add("Fotos del estado actual");
    requirements.add("Áreas a intervenir");
    requirements.add("Elementos a conservar");
  }

  if (phase?.id === "diseno") requirements.add("Idea base o referencias");
  if (phase?.id === "construccion") requirements.add("Planos o anteproyecto");
  if (phase?.id === "supervision") requirements.add("Cronograma o avance actual");
  if (phase?.id === "llave") requirements.add("Alcance esperado de entrega");
  if (details.estado === "Tengo planos") requirements.add("Archivos de planos");
  if (details.estado === "Obra iniciada") requirements.add("Reporte del avance");
  if (details.documentacion === "Fotos") requirements.add("Galería de fotos");
  if (details.documentacion === "Planos PDF/DWG") requirements.add("Planos en PDF o DWG");
  if (details.documentacion === "Presupuesto previo") requirements.add("Presupuesto de referencia");
  const planningWindow =
    urgency === "Alta"
      ? "Confirmar disponibilidad de inicio"
      : complexity === "Alta"
        ? "Revisión técnica ampliada"
        : details.documentacion === "Planos PDF/DWG" || details.documentacion === "Presupuesto previo"
          ? "Revisión documental"
          : "Levantamiento inicial";
  const route =
    phase?.id === "llave"
      ? "Brief > alcance > propuesta integral"
      : phase?.id === "supervision"
        ? "Brief > revisión > plan de control"
        : phase?.id === "construccion"
          ? "Brief > planos > presupuesto de obra"
          : "Brief > concepto > propuesta de diseño";

  return {
    urgency,
    complexity,
    nextStep,
    planningWindow,
    route,
    deliverables: ["Resumen del proyecto", "Ruta sugerida", "Requisitos de revisión"],
    requirements: Array.from(requirements).slice(0, 6),
  };
}

const stageNames = ["Obra", "Servicio", "Escala", "Estado", "Docs", "Tiempo", "Zona", "Contacto", "Datos"];
const detailAvatarModes = {
  tamano: "hold",
  estado: "hold",
  documentacion: "hold",
  urgencia: "hold",
  ubicacion: "hold",
  contacto: "hold",
};

const projectHoldAvatars = {
  vivienda: "viviendaHold",
  edificio: "edificioHold",
  industrial: "industrialHold",
  remodelacion: "remodelacionHold",
};

const serviceHighlights = [
  {
    icon: Sparkles,
    title: "Diseño arquitectónico",
    copy: "Concepto, distribución, imagen del proyecto y documentación para tomar decisiones.",
  },
  {
    icon: Hammer,
    title: "Construcción",
    copy: "Ejecución ordenada con planificación, control de avance y coordinación de equipos.",
  },
  {
    icon: HardHat,
    title: "Supervisión",
    copy: "Seguimiento técnico para cuidar calidad, tiempos, materiales y detalles críticos.",
  },
  {
    icon: ShieldCheck,
    title: "Entrega",
    copy: "Cierre de obra con revisión final, prioridades claras y compromiso de cumplimiento.",
  },
];

const processSteps = [
  ["01", "Brief guiado", "Reunimos tipo de proyecto, escala, estado, tiempo, zona y contacto."],
  ["02", "Revisión técnica", "Matsinco evalúa alcance, condiciones iniciales y nivel de complejidad."],
  ["03", "Propuesta", "Se arma una ruta de trabajo con próximos pasos y estimación inicial."],
  ["04", "Inicio", "Se coordinan diseño, construcción o supervisión según el servicio elegido."],
];

const demoPreviewItems = [
  ...projectTypes.map((item) => ({ ...item, type: "project" })),
  ...phases.map((item) => ({ ...item, type: "phase" })),
  ...detailSteps.slice(0, 5).map((item) => ({ ...item, type: "detail" })),
];

const storageKey = "matsinco-interactive-brief";
const companyWhatsAppNumber = "";

function buildWhatsAppUrl(message) {
  const encodedMessage = encodeURIComponent(message);
  return companyWhatsAppNumber
    ? `https://wa.me/${companyWhatsAppNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;
}

function isValidPhone(value) {
  return /^[+()\d\s.-]+$/.test(value) && value.replace(/\D/g, "").length >= 7 && value.replace(/\D/g, "").length <= 15;
}

function readSavedBrief() {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return null;
    const data = JSON.parse(saved);
    const project = projectTypes.find((item) => item.id === data.project?.id) || null;
    const phase = phases.find((item) => item.id === data.phase?.id) || null;
    const details = Object.fromEntries(detailSteps.filter((step) => step.options.includes(data.details?.[step.id])).map((step) => [step.id, data.details[step.id]]));
    const lead = Object.fromEntries(["name", "phone", "note"].map((key) => [key, typeof data.lead?.[key] === "string" ? data.lead[key] : ""]));
    lead.files = Array.isArray(data.lead?.files) ? data.lead.files.filter((file) => typeof file === "string") : [];
    if (!project && !phase && !Object.keys(details).length && !lead.name && !lead.phone && !lead.note) return null;
    const firstMissing = !project ? 0 : !phase ? 1 : detailSteps.findIndex((step) => !details[step.id]);
    const stage = !project ? 0 : !phase ? 1 : firstMissing >= 0 ? firstMissing + 2 : stageNames.length - 1;
    return { project, phase, details, lead, stage, leadConfirmed: Boolean(data.leadConfirmed && lead.name.trim() && isValidPhone(lead.phone)), avatarMode: "idle" };
  } catch {
    return null;
  }
}

function Logo() {
  return <img className="brand-logo" src="/assets/brand/matsinco-logo.svg" alt="MATSINCO SRL. Constructora" width="568" height="520" />;
}

function ChoiceButton({ item, active, focused, onClick, onFocus, onPreview, onPreviewEnd }) {
  const Icon = item.icon;
  return (
    <button
      className={`choice ${active ? "is-active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={onPreview}
      onMouseLeave={onPreviewEnd}
    >
      <span className="choice-icon">
        <Icon size={25} strokeWidth={2.2} />
      </span>
      <span>
        <strong>{item.title}</strong>
        <small>{item.subtitle}</small>
      </span>
      {active ? <Check size={20} /> : <ChevronRight size={20} />}
    </button>
  );
}

function DetailSegment({ step, value, focusIndex, onFocusIndex, onSelect, onPreview, onPreviewEnd }) {
  return (
    <div className="segment">
      <p>{step.label}</p>
      <span className="segment-cue">{step.cue}</span>
      <div className={`segment-grid ${step.id === "tamano" ? "scale-options" : ""}`}>
        {step.options.map((option) => (
          <button
            key={option}
            className={value === option ? "selected" : ""}
            aria-pressed={value === option}
            onFocus={() => {
              onFocusIndex(step.options.indexOf(option));
              onPreview({ ...step, option, type: "detail" });
            }}
            onMouseEnter={() => onPreview({ ...step, option, type: "detail" })}
            onMouseLeave={onPreviewEnd}
            onClick={() => onSelect(step.id, option)}
          >
            {step.id === "tamano" ? <><ScaleChoiceVisual value={option} /><span className="scale-option-label">{option}</span></> : option}
          </button>
        ))}
      </div>
    </div>
  );
}

function LeadForm({ lead, onChange, onFiles, onSubmit }) {
  const [phoneTouched, setPhoneTouched] = useState(false);
  const phoneError = phoneTouched && Boolean(lead.phone) && !isValidPhone(lead.phone);
  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="lead-name">Nombre</label>
        <input
          id="lead-name"
          required
          maxLength={80}
          value={lead.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="Tu nombre"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="lead-phone">Teléfono</label>
        <input
          id="lead-phone"
          type="tel"
          inputMode="tel"
          required
          aria-describedby="phone-hint"
          aria-invalid={phoneError}
          onBlur={() => setPhoneTouched(true)}
          value={lead.phone}
          onChange={(event) => onChange("phone", event.target.value)}
          placeholder="WhatsApp o celular"
          autoComplete="tel"
        />
        <small id="phone-hint" className={`field-hint ${phoneError ? "field-error" : ""}`}>{phoneError ? "Revisa el teléfono: usa de 7 a 15 dígitos y el código de país." : "Incluye el código de país. Ej.: +591 70000000"}</small>
      </div>
      <div className="wide">
        <label htmlFor="lead-note">Cuéntanos un poco más <small>Opcional</small></label>
        <textarea
          id="lead-note"
          maxLength={2000}
          value={lead.note}
          onChange={(event) => onChange("note", event.target.value)}
          placeholder="Ej: tengo terreno, quiero construir una casa de dos plantas..."
          rows={3}
        />
      </div>
      <div className="wide file-field">
        <label htmlFor="lead-files">Archivos de referencia <small>Opcional</small></label>
        <input
          id="lead-files"
          type="file"
          multiple
          accept="image/*,.pdf,.dwg,.dxf,.doc,.docx,.xls,.xlsx"
          aria-describedby="files-hint"
          onChange={(event) => onFiles(Array.from(event.target.files || []).map((file) => file.name))}
        />
        <span id="files-hint">{lead.files?.length ? `Referencias: ${lead.files.join(", ")}. ` : ""}Aquí solo se guardan los nombres. Adjunta los archivos al compartir la consulta por WhatsApp.</span>
      </div>
      <button className="primary full" disabled={!lead.name.trim() || !isValidPhone(lead.phone)}>
        Revisar mi consulta
        <ArrowRight size={19} />
      </button>
    </form>
  );
}

function StepRail({ stage, project, phase, details, onGo }) {
  return (
    <nav className="step-rail" aria-label="Pasos de la consulta">
      {stageNames.map((label, index) => {
        const answered = index === 0 ? Boolean(project) : index === 1 ? Boolean(phase) : index < 8 ? Boolean(details[detailSteps[index - 2].id]) : false;
        return <button type="button" key={label} className={`${answered ? "is-done" : ""} ${index === stage ? "is-current" : ""}`}
          disabled={!answered && index !== stage && !(index === 8 && project && phase && detailSteps.every((step) => details[step.id]))} aria-current={index === stage ? "step" : undefined}
          aria-label={`${index + 1}. ${label}${answered ? ", completado. Editar" : ""}`} onClick={() => onGo(index)}>
          <i>{answered && index !== stage ? <Check size={13} /> : index + 1}</i><b>{label}</b>
        </button>;
      })}
    </nav>
  );
}

function BriefPreview({ project, phase, details, onEdit }) {
  const rows = [
    ["Proyecto", project?.title || "Por definir"],
    ["Servicio", phase?.title || "Por definir"],
    ["Escala", details.tamano || "Pendiente"],
    ["Estado", details.estado || "Pendiente"],
    ["Docs", details.documentacion || "Pendiente"],
    ["Tiempo", details.urgencia || "Pendiente"],
    ["Zona", details.ubicacion || "Pendiente"],
    ["Contacto", details.contacto || "Pendiente"],
  ];

  return (
    <details className="brief-preview">
      <summary><span>Tu proyecto, en resumen</span><small>{rows.filter(([, value]) => !["Por definir", "Pendiente"].includes(value)).length}/8 respuestas</small><ChevronRight size={18} /></summary>
      <dl>{rows.map(([label, value], index) => (
        <div key={label}><dt>{label}</dt><dd>{value}</dd>
          {!["Por definir", "Pendiente"].includes(value) && <button type="button" onClick={() => onEdit(index)} aria-label={`Editar ${label}`}>Editar</button>}
        </div>
      ))}</dl>
    </details>
  );
}

function App() {
  const rootRef = useRef(null);
  const initialStage = useRef(true);
  const [quoteEntered, setQuoteEntered] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const [motionPaused, setMotionPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const savedBrief = useMemo(() => readSavedBrief(), []);
  const [project, setProject] = useState(savedBrief?.project || null);
  const [phase, setPhase] = useState(savedBrief?.phase || null);
  const [details, setDetails] = useState(savedBrief?.details || {});
  const [lead, setLead] = useState(savedBrief?.lead || { name: "", phone: "", note: "", files: [] });
  const [leadConfirmed, setLeadConfirmed] = useState(Boolean(savedBrief?.leadConfirmed));
  const [briefAction, setBriefAction] = useState("");
  const [saveStatus, setSaveStatus] = useState(savedBrief ? "Brief restaurado" : "");
  const [stage, setStage] = useState(savedBrief?.stage || 0);
  const [avatarMode, setAvatarMode] = useState(savedBrief?.avatarMode || "idle");
  const [focusIndex, setFocusIndex] = useState(0);
  const [preview, setPreview] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const activeProject = projectTypes.find((item) => item.id === project?.id);
  const activePhase = phases.find((item) => item.id === phase?.id);
  const currentDetail = detailSteps[stage - 2];
  const leadReady = leadConfirmed && Boolean(lead.name.trim() && isValidPhone(lead.phone));
  const completedCount = (project ? 1 : 0) + (phase ? 1 : 0) + Object.keys(details).length + (leadReady ? 1 : 0);
  const ready = completedCount === detailSteps.length + 3 && stage === stageNames.length - 1;
  const stageTitle = ready ? "Revisa tu consulta" : stage === 0 ? "¿Qué quieres construir?" : stage === 1 ? "¿En qué te ayudamos?" : currentDetail?.label || "¿Cómo te contactamos?";
  const quoteProfile = useMemo(() => getQuoteProfile(activeProject, activePhase, details), [activePhase, activeProject, details]);
  const briefText = useMemo(() => {
    return [
      "Hola Matsinco, quiero cotizar un proyecto.",
      `Proyecto: ${activeProject?.title || "Por definir"}`,
      `Servicio: ${activePhase?.title || "Por definir"}`,
      `Tamaño: ${details.tamano || "Pendiente"}`,
      `Estado: ${details.estado || "Pendiente"}`,
      `Documentación disponible: ${details.documentacion || "Pendiente"}`,
      `Tiempo esperado: ${details.urgencia || "Pendiente"}`,
      `Ciudad/Zona: ${details.ubicacion || "Pendiente"}`,
      `Contacto preferido: ${details.contacto || "Pendiente"}`,
      `Nombre: ${lead.name || "Pendiente"}`,
      `Teléfono: ${lead.phone || "Pendiente"}`,
      `Detalle: ${lead.note || "Sin detalle adicional"}`,
      `Archivos de referencia: ${lead.files?.length ? lead.files.join(", ") : "No registrados"}`,
      `Prioridad: ${quoteProfile.urgency}`,
      `Complejidad: ${quoteProfile.complexity}`,
      `Siguiente paso sugerido: ${quoteProfile.nextStep}`,
      `Ruta sugerida: ${quoteProfile.route}`,
      `Planificación: ${quoteProfile.planningWindow}`,
      `Requisitos sugeridos: ${quoteProfile.requirements.length ? quoteProfile.requirements.join(", ") : "Por definir"}`,
    ].join("\n");
  }, [activePhase, activeProject, details, lead, quoteProfile]);
  const whatsappMessage = useMemo(() => buildWhatsAppUrl(briefText), [briefText]);

  const progress = useMemo(() => {
    const completed = (project ? 1 : 0) + (phase ? 1 : 0) + Object.keys(details).length + (leadReady ? 1 : 0);
    return Math.min(100, Math.round((completed / (detailSteps.length + 3)) * 100));
  }, [project, phase, details, leadReady]);

  const dialogue = useMemo(() => {
    if (ready) return avatarStates.complete;
    if (preview?.prompt) return preview.prompt;
    if (preview?.type === "detail") return preview.cue;
    if (stage === stageNames.length - 1) return "Solo falta tu nombre y teléfono para revisar la consulta completa.";
    if (stage >= 2 && currentDetail) return currentDetail.cue;
    if (activePhase) return activePhase.prompt;
    if (activeProject) return activeProject.prompt;
    return avatarStates[avatarMode] || avatarStates.idle;
  }, [activePhase, activeProject, avatarMode, currentDetail, preview, ready, stage]);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".quote-section", start: "top 84%", once: true },
      })
        .from(".quote-section .intro-copy > *", { y: 28, opacity: 0, duration: 0.7, stagger: 0.08 })
        .from(".quote-section .game-shell", { y: 48, opacity: 0, duration: 0.85 }, 0.12)
        .from(".quote-section .avatar-stage", { y: 28, scale: 0.98, opacity: 0, duration: 0.8 }, 0.28)
        .from(".quote-section .side-brief", { y: 18, opacity: 0, duration: 0.55 }, 0.45);
    });
    return () => media.revert();
  }, { scope: rootRef });

  useEffect(() => {
    const quote = rootRef.current?.querySelector(".quote-section");
    if (!quote) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setQuoteEntered(true); observer.disconnect(); }
    }, { rootMargin: "250px" });
    observer.observe(quote);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setFocusIndex(0);
    setPreview(null);
    if (initialStage.current) { initialStage.current = false; return; }
    const heading = rootRef.current?.querySelector("#question-title");
    heading?.focus({ preventScroll: true });
    if (window.innerWidth < 900) rootRef.current?.querySelector("#flujo")?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [stage, ready]);


  useEffect(() => {
    const payload = {
      project,
      phase,
      details,
      lead,
      leadConfirmed,
      stage,
      avatarMode,
    };
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch { setSaveStatus("Guardado local no disponible"); return; }
    if (project || phase || Object.keys(details).length || lead.name || lead.phone || lead.note) {
      setSaveStatus("Guardado en este equipo");
    }
  }, [avatarMode, details, lead, leadConfirmed, phase, project, stage]);

  useEffect(() => {
    if (!demoMode || project || phase || Object.keys(details).length || lead.name || lead.phone || lead.note) return undefined;

    let index = 0;
    setPreview(demoPreviewItems[index]);
    const timer = window.setInterval(() => {
      index = (index + 1) % demoPreviewItems.length;
      setPreview(demoPreviewItems[index]);
    }, 2200);

    return () => {
      window.clearInterval(timer);
      setPreview(null);
    };
  }, [demoMode, details, lead.name, lead.note, lead.phone, phase, project]);


  const handleChoiceKeys = (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
    const group = event.target.closest(".choice-row, .segment-grid");
    if (!group) return;
    const buttons = Array.from(group.querySelectorAll("button"));
    const index = buttons.indexOf(event.target);
    if (index < 0) return;
    event.preventDefault();
    const offset = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
    buttons[(index + offset + buttons.length) % buttons.length].focus();
  };

  const goToStage = (index) => { setStage(index); setDemoMode(false); setResetRequested(false); };
  const resetBrief = () => {
    setProject(null); setPhase(null); setDetails({});
    setLead({ name: "", phone: "", note: "", files: [] });
    setLeadConfirmed(false); setBriefAction(""); setSaveStatus("");
    try { window.localStorage.removeItem(storageKey); } catch {}
    setStage(0); setAvatarMode("idle"); setDemoMode(false); setResetRequested(false);
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".panel-body",
        { opacity: 0, x: 18 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        ".speech",
        { opacity: 0, y: 8, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "back.out(1.4)" }
      );
      const choices = rootRef.current?.querySelectorAll(".choice, .segment-grid button, .summary");
      if (choices?.length) gsap.fromTo(
        choices,
        { opacity: 0, x: 18 },
        { opacity: 1, x: 0, duration: 0.28, ease: "power2.out", stagger: 0.035 }
      );
    },
    { dependencies: [stage, project?.id, phase?.id, Object.keys(details).length], scope: rootRef }
  );


  const setDetail = (key, value) => {
    setLeadConfirmed(false);
    setDemoMode(false);
    setDetails((current) => ({ ...current, [key]: value }));
    setAvatarMode(projectHoldAvatars[activeProject?.id] || detailAvatarModes[key] || "thinking");
    setPreview(null);
  };

  const updateLead = (key, value) => {
    setLead((current) => ({ ...current, [key]: value }));
    setLeadConfirmed(false);
    setBriefAction("");
    setAvatarMode(projectHoldAvatars[activeProject?.id] || "thinking");
  };

  const updateLeadFiles = (files) => {
    setLead((current) => ({ ...current, files }));
    setLeadConfirmed(false);
    setBriefAction("");
    setAvatarMode(projectHoldAvatars[activeProject?.id] || "inspect");
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefText);
      setBriefAction("Brief copiado");
    } catch {
      setBriefAction("No se pudo copiar");
    }
  };

  const downloadBrief = () => {
    const blob = new Blob([briefText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "brief-matsinco.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setBriefAction("Brief descargado");
  };

  return (
    <main ref={rootRef} className="page">
      <a className="skip-link" href="#flujo">Ir al cotizador</a>
      <img className="house-bg" src="/assets/casa-fondo-limpio.png" alt="" />
      <div className="shade" />
      <header className="topbar">
        <a className="brand-home" href="#inicio" aria-label="Matsinco, volver al inicio"><Logo /></a>
        <nav aria-label="Secciones">
          <a href="#inicio">Inicio</a>
          <a href="#proyectos">Proyectos</a>
        </nav>
        <a className="whatsapp" href="#cotizar">
          <ClipboardList size={18} />
          Preparar consulta
        </a>
      </header>

      <PortfolioIntro />

      <section id="cotizar" className="hero quote-section" aria-labelledby="quote-title">
        <div className="intro-copy">
          <span className="eyebrow">Ingeniería · Diseño · Construcción</span>
          <h2 id="quote-title" className="quote-title">Tu proyecto.<br /><span>Un buen comienzo.</span></h2>
          <p>Cuéntanos qué necesitas. Leonardo te guía para preparar una consulta clara y dar el siguiente paso con Matsinco.</p>
          <div className="intro-meta"><span><Clock size={15} /> Aproximadamente 3 minutos</span><span><ShieldCheck size={15} /> Sin compromiso</span></div>
        </div>

        <div className="side-brief">
          <BriefPreview project={activeProject} phase={activePhase} details={details} onEdit={goToStage} />
          <p className="local-note"><ShieldCheck size={14} /> Tus respuestas se guardan en este navegador. Podrás retomarlas al volver.</p>
        </div>

        <LeonardoDesk
          project={demoMode && preview?.type === "project" ? preview : activeProject}
          phase={demoMode && preview?.type === "phase" ? preview : activePhase}
          details={details}
          steps={detailSteps}
          stage={stage}
          ready={ready}
          dialogue={dialogue}
          active={quoteEntered}
          paused={motionPaused}
          onToggleMotion={() => setMotionPaused((value) => !value)}
          onEdit={goToStage}
        />

        <aside id="flujo" className="game-shell" aria-labelledby="question-title" onKeyDown={handleChoiceKeys}>
          <div className="panel-head">
            <div>
              <small>{ready ? "Resumen de tu proyecto" : `Paso ${stage + 1} de ${stageNames.length} · ${stageNames[stage]}`}</small>
              <h2 id="question-title" tabIndex={-1}>{stageTitle}</h2>
              {saveStatus && <em><span />{saveStatus}</em>}
            </div>
            <span className="progress-number">{progress}%</span>
          </div>
          <div className="progress-track" role="progressbar" aria-label="Consulta completada" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <StepRail stage={stage} project={activeProject} phase={activePhase} details={details} onGo={goToStage} />


          <div className="panel-body">
            {stage === 0 && (
              <>
                <p className="panel-note">Primero definamos qué tipo de proyecto tienes en mente.</p>
                <div className="choice-row">
                  {projectTypes.map((item, index) => (
                    <ChoiceButton
                      key={item.id}
                      item={item}
                      active={project?.id === item.id}
                      focused={focusIndex === index}
                      onFocus={() => {
                        setFocusIndex(index);
                        setPreview({ ...item, type: "project" });
                      }}
                      onPreview={() => setPreview({ ...item, type: "project" })}
                      onPreviewEnd={() => setPreview(null)}
                    onClick={() => {
                      setProject(item);
                      setAvatarMode(item.holdAvatar || projectHoldAvatars[item.id] || item.avatar);
                      setDemoMode(false);
                      setPreview(null);
                      setLeadConfirmed(false);
                      }}
                    />
                  ))}
                </div>
                <button className="primary full continue-button" disabled={!activeProject} onClick={() => goToStage(1)}>Continuar con {activeProject?.title.toLowerCase() || "mi proyecto"}<ArrowRight size={18} /></button>
              </>
            )}

            {stage === 1 && (
              <>
                <p className="panel-note">Ahora selecciona en qué parte del proceso necesitas apoyo.</p>
                <div className="choice-row">
                  {phases.map((item, index) => (
                    <ChoiceButton
                      key={item.id}
                      item={item}
                      active={phase?.id === item.id}
                      focused={focusIndex === index}
                      onFocus={() => {
                        setFocusIndex(index);
                        setPreview({ ...item, type: "phase" });
                      }}
                      onPreview={() => setPreview({ ...item, type: "phase" })}
                      onPreviewEnd={() => setPreview(null)}
                    onClick={() => {
                      setPhase(item);
                      setAvatarMode(projectHoldAvatars[activeProject?.id] || "welcome");
                      setDemoMode(false);
                      setPreview(null);
                      setLeadConfirmed(false);
                      }}
                    />
                  ))}
                </div>
                <button className="primary full continue-button" disabled={!activePhase} onClick={() => goToStage(2)}>Continuar<ArrowRight size={18} /></button>
              </>
            )}

            {stage >= 2 && !ready && currentDetail && (
              <>
                <DetailSegment
                  step={currentDetail}
                  value={details[currentDetail.id]}
                  focusIndex={focusIndex}
                  onFocusIndex={setFocusIndex}
                  onSelect={setDetail}
                  onPreview={setPreview}
                  onPreviewEnd={() => setPreview(null)}
                />
                <button
                  className="primary full"
                  disabled={!details[currentDetail.id]}
                  onClick={() => setStage((value) => Math.min(value + 1, stageNames.length - 1))}
                >
                  Continuar
                  <ArrowRight size={19} />
                </button>
              </>
            )}

            {stage === stageNames.length - 1 && !ready && (
              <>
                <p className="panel-note">Para cerrar el brief, deja tus datos de contacto.</p>
                <LeadForm
                  lead={lead}
                  onChange={updateLead}
                  onFiles={updateLeadFiles}
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (lead.name.trim() && isValidPhone(lead.phone)) {
                      setLeadConfirmed(true);
                      setAvatarMode("complete");
                    }
                  }}
                />
              </>
            )}

            {ready && (
              <div id="resumen" className="summary">
                <div className="summary-ok">
                  <Check size={22} />
                </div>
                <h3>Tu consulta está preparada</h3>
                <p>Aún no se ha enviado. Revisa tus respuestas y comparte el brief para iniciar la conversación.</p>
                <div className="mission-result">
                  <span>
                    <small>Prioridad</small>
                    <strong>{quoteProfile.urgency}</strong>
                  </span>
                  <span>
                    <small>Complejidad</small>
                    <strong>{quoteProfile.complexity}</strong>
                  </span>
                  <span>
                    <small>Siguiente paso</small>
                    <strong>{quoteProfile.nextStep}</strong>
                  </span>
                </div>
                <div className="planning-card">
                  <small>Ruta sugerida</small>
                  <strong>{quoteProfile.route}</strong>
                  <span>{quoteProfile.planningWindow}</span>
                </div>
                <dl>
                  <div>
                    <dt>Proyecto</dt>
                    <dd>{activeProject?.title}</dd><button className="edit-link" aria-label="Editar proyecto" onClick={() => goToStage(0)}>Editar</button>
                  </div>
                  <div>
                    <dt>Servicio</dt>
                    <dd>{activePhase?.title}</dd><button className="edit-link" aria-label="Editar servicio" onClick={() => goToStage(1)}>Editar</button>
                  </div>
                  {detailSteps.map((item, index) => (
                    <div key={item.id}>
                    <dt>{item.label}</dt>
                    <dd>{details[item.id]}</dd><button className="edit-link" aria-label={`Editar ${item.label.toLowerCase()}`} onClick={() => goToStage(index + 2)}>Editar</button>
                  </div>
                  ))}
                  <div>
                    <dt>Nombre</dt>
                    <dd>{lead.name}</dd><button className="edit-link" aria-label="Editar nombre" onClick={() => setLeadConfirmed(false)}>Editar</button>
                  </div>
                  <div>
                    <dt>Teléfono</dt>
                    <dd>{lead.phone}</dd><button className="edit-link" aria-label="Editar teléfono" onClick={() => setLeadConfirmed(false)}>Editar</button>
                  </div>
                  {lead.note && <div><dt>Detalle</dt><dd>{lead.note}</dd><button className="edit-link" aria-label="Editar detalle" onClick={() => setLeadConfirmed(false)}>Editar</button></div>}
                  <div>
                    <dt>Archivos</dt>
                    <dd>{lead.files?.length ? lead.files.join(", ") : "No registrados"}</dd>
                  </div>
                </dl>
                <div className="deliverables">
                  {quoteProfile.deliverables.map((item) => (
                    <span key={item}>
                      <Check size={15} />
                      {item}
                    </span>
                  ))}
                </div>
                <div className="requirements">
                  <strong>Para cotizar mejor</strong>
                  {quoteProfile.requirements.map((item) => (
                    <span key={item}>
                      <Check size={15} />
                      {item}
                    </span>
                  ))}
                </div>
                <div className="brief-actions" aria-live="polite">
                  <button className="secondary-action" onClick={copyBrief}>
                    <ClipboardCheck size={17} />
                    Copiar brief
                  </button>
                  <button className="secondary-action" onClick={downloadBrief}>
                    <Download size={17} />
                    Descargar
                  </button>
                  {briefAction && <small>{briefAction}</small>}
                </div>
                <a className="primary full" href={whatsappMessage} target="_blank" rel="noreferrer">
                  {companyWhatsAppNumber ? "Enviar a Matsinco por WhatsApp" : "Compartir por WhatsApp"}
                  <Send size={19} />
                </a>
                <p className="share-note">{companyWhatsAppNumber ? "WhatsApp abrirá el mensaje para que confirmes el envío." : "En esta demo eliges el destinatario en WhatsApp. El número oficial de Matsinco está pendiente de configurar."} Los archivos se adjuntan allí por separado.</p>
              </div>
            )}
          </div>

          <div className="panel-controls">
            <button className="ghost back-button" onClick={() => goToStage(Math.max(0, stage - 1))} disabled={stage === 0}>
              <ChevronLeft size={18} /> Atrás
            </button>
            <button className={`ghost demo-button ${demoMode ? "is-on" : ""}`} disabled={Boolean(project || phase)} onClick={() => setDemoMode((value) => !value)} aria-pressed={demoMode} title="Explora los ejemplos visuales sin completar respuestas"><Play size={16} />{demoMode ? "Detener demo" : "Modo demo"}</button>
            <button className="ghost reset-button" onClick={() => setResetRequested(true)}><RotateCcw size={16} />Empezar de nuevo</button>
          </div>
          {resetRequested && <div className="reset-confirm" role="group" aria-label="Confirmar reinicio"><p>¿Empezar otra consulta? Se borrarán las respuestas de este navegador.</p><div><button className="secondary-action" onClick={() => setResetRequested(false)}>Conservar respuestas</button><button className="primary" onClick={resetBrief}>Sí, empezar de nuevo</button></div></div>}
          <p className="wizard-footnote"><ShieldCheck size={14} /> Preparar la consulta no envía tus datos.</p>
        </aside>
      </section>

      <section id="proceso" className="process-band">
        <div className="process-intro"><span className="eyebrow">Del primer dato al siguiente paso</span><h2>¿Qué pasa después?</h2><p>Una consulta clara es el inicio de una propuesta bien definida.</p></div>
        <div className="process-grid">
          {[["01", "Prepara tu consulta", "Elige tu proyecto y reúne los datos que ya tienes."], ["02", "Compártela con Matsinco", "El equipo revisa el alcance y la documentación disponible."], ["03", "Define el siguiente paso", "Coordina una revisión, una visita o una propuesta según tu caso."]].map(([number, title, copy]) => <article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <footer className="site-footer"><span>MATSINCO SRL. · Ingeniería y construcción</span><span>Proyectos fotografiados · Leonardo es un asistente virtual</span></footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

