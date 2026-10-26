import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.js";
import ArrowDown from "lucide-react/dist/esm/icons/arrow-down.js";
import MoveHorizontal from "lucide-react/dist/esm/icons/move-horizontal.js";


gsap.registerPlugin(ScrollTrigger, useGSAP);

// Each project defines its own labels: chronology for the residence, viewpoints for the others.
export const showcaseProjects = [
  {
    id: "residencia", number: "01", category: "Arquitectura residencial",
    title: "Residencia con piscina", detail: "Espacios para vivir hacia afuera.",
    before: "/assets/projects/residencia-despues.webp",
    after: "/assets/projects/residencia-antes.webp",
    beforeLabel: "Antes", afterLabel: "Después",
    beforeAlt: "Vista del acceso de la residencia con pórtico blanco y revestimiento vertical",
    afterAlt: "Vista de la residencia hacia la piscina, con galería y balcones de vidrio",
  },
  {
    id: "vivienda", number: "02", category: "Vivienda",
    title: "La calidez del ladrillo", detail: "Materialidad que le da carácter al espacio.",
    before: "/assets/projects/vivienda-antes.webp",
    after: "/assets/projects/vivienda-despues.webp",
    beforeLabel: "Fachada de ladrillo", afterLabel: "Acceso y galería",
    beforeAlt: "Vista longitudinal de la vivienda de ladrillo visto y cubierta de teja",
    afterAlt: "Vista del acceso y la galería de la vivienda de ladrillo visto",
  },
  {
    id: "europa", number: "03", category: "Edificación residencial",
    title: "Jardín Europa", detail: "Una mirada a la escala urbana.",
    before: "/assets/projects/europa-antes.webp",
    after: "/assets/projects/europa-despues.webp",
    beforeLabel: "Vista frontal", afterLabel: "En perspectiva",
    beforeAlt: "Vista frontal del acceso y fachada del edificio Jardín Europa",
    afterAlt: "Vista de la fachada y los balcones del edificio Jardín Europa desde la calle",
  },
];

function TransformationCard({ project }) {
  const [reveal, setReveal] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const afterImageRef = useRef(null);
  const imageReady = useRef(false);
  const revealRequest = useRef(0);
  const status = reveal === 0 ? project.beforeLabel : reveal === 100 ? project.afterLabel : "Comparando";
  const choose = async (value, animated = true) => {
    const request = ++revealRequest.current;
    setLoadError("");
    // A fully clipped, lazy image may not load or decode before the first reveal.
    // Request it eagerly and wait for decoded pixels before starting the transition.
    if (value > 0 && !imageReady.current) {
      setLoading(true);
      try {
        const image = afterImageRef.current;
        if (!image) throw new Error("Missing comparison image");
        await image.decode();
        imageReady.current = true;
      } catch {
        if (request === revealRequest.current) {
          setLoading(false);
          setLoadError("No se pudo cargar esta foto. Vuelve a intentarlo.");
        }
        return;
      }
    }
    if (request !== revealRequest.current) return;
    setLoading(false);
    setAnimate(animated);
    setReveal(value);
  };

  return (
    <article className="project-card" aria-busy={loading} aria-labelledby={`project-${project.id}`}>
      <div className="project-card-top"><span>{project.number} / 03</span><span>{project.category}</span></div>
      <div className={`comparison-frame ${animate ? "animate-reveal" : ""}`} style={{ "--reveal": `${reveal}%` }}>
        <img className="comparison-before" src={project.before} aria-hidden={reveal === 100} alt={project.beforeAlt} loading="lazy" decoding="async" width="960" height="640" />
        <img ref={afterImageRef} className="comparison-after" style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }} src={project.after} aria-hidden={reveal === 0} alt={project.afterAlt} loading="eager" fetchPriority="low" decoding="async" width="960" height="640" />
        <div className="comparison-shade" aria-hidden="true" />
        <span className="comparison-state" aria-live="polite">{loading ? "Cargando foto…" : status}</span>
        <div className={`comparison-divider ${reveal > 0 && reveal < 100 ? "is-visible" : ""}`} aria-hidden="true"><span><MoveHorizontal size={18} /></span></div>
        <div className="comparison-slider-wrap">
          <label htmlFor={`reveal-${project.id}`}><MoveHorizontal size={14} /> Arrastra para comparar</label>
          <input id={`reveal-${project.id}`} className="comparison-range" type="range" min="0" max="100" step="1" value={reveal}
            aria-label={`Comparar vistas de ${project.title}`} aria-valuetext={`${project.afterLabel}: ${reveal}% visible`}
            onChange={(event) => choose(Number(event.target.value), false)} />
        </div>
      </div>
      {loadError && <p className="comparison-error" role="alert">{loadError}</p>}
      <div className="project-card-caption">
        <div><h3 id={`project-${project.id}`}>{project.title}</h3><p>{project.detail}</p></div>
        <div className="comparison-buttons" role="group" aria-label={`Vistas de ${project.title}`}>
          <button type="button" aria-pressed={reveal === 0} onClick={() => choose(0)}>{project.beforeLabel}</button>
          <button type="button" aria-pressed={reveal === 100} onClick={() => choose(100)}>{project.afterLabel} <ArrowRight size={14} /></button>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioIntro() {
  const introRef = useRef(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".cover-kicker", { y: 16, opacity: 0, duration: 0.6 })
        .from(".cover-title > span", { y: 32, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.12)
        .from(".cover-description, .cover-actions", { y: 18, opacity: 0, duration: 0.65, stagger: 0.09 }, 0.36)
        .from(".cover-media img", { scale: 1.035, duration: 1.1 }, 0);

      gsap.utils.toArray(".project-card").forEach((card) => {
        gsap.from(card, { opacity: 0, y: 36, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 94%", once: true } });
      });
      gsap.timeline({ scrollTrigger: { trigger: ".quote-bridge", start: "top 85%", once: true } })
        .from(".bridge-rule", { scaleX: 0, transformOrigin: "left", duration: 0.7, ease: "power3.inOut" })
        .from(".bridge-title", { y: 28, opacity: 0, duration: 0.75, ease: "power3.out" }, 0.15)
        .from(".bridge-action", { y: 18, opacity: 0, duration: 0.5 }, 0.4);
    });
    return () => media.revert();
  }, { scope: introRef });

  return (
    <div className="presentation" ref={introRef}>
      <section id="inicio" className="cover" aria-labelledby="cover-title">
        <div className="cover-media" aria-hidden="true"><img src="/assets/projects/residencia-portada.webp" srcSet="/assets/projects/residencia-antes.webp 960w, /assets/projects/residencia-portada.webp 1920w" sizes="100vw" alt="" fetchPriority="high" width="1920" height="1082" /></div>
        <div className="cover-gradient" />
        <div className="cover-content">
          <div className="cover-kicker"><span /> Ingeniería y construcción · Bolivia</div>
          <h1 id="cover-title" className="cover-title"><span>Diseñamos ideas.</span><span>Construimos</span><span className="cover-accent">realidades.</span></h1>
          <p className="cover-description">Cada espacio empieza con una posibilidad.<br />En Matsinco, le damos forma.</p>
          <div className="cover-actions"><a className="cover-primary" href="#proyectos">Explorar proyectos <ArrowDown size={18} /></a><a className="cover-secondary" href="#cotizar">Tengo un proyecto <ArrowRight size={17} /></a></div>
        </div>
        <div className="cover-footer"><span>Diseño. Ingeniería. Ejecución.</span><a href="#proyectos">Desliza para descubrir <ArrowDown size={15} /></a><span>01 — Proyectos Matsinco</span></div>
      </section>

      <section id="proyectos" className="projects-section" aria-labelledby="projects-title">
        <div className="portfolio-section-head"><div><span className="portfolio-kicker">01 / Proyectos que hablan</span><h2 id="projects-title">Cada detalle <em>cuenta.</em></h2></div><p>Recorre nuestros proyectos.<br />Compara sus distintas vistas.</p></div>
        <div className="projects-grid">{showcaseProjects.map((project) => <TransformationCard project={project} key={project.id} />)}</div>
        <div className="projects-footnote"><span><MoveHorizontal size={15} /> Usa los botones o arrastra el control de cada tarjeta.</span><a href="#cotizar">Hablemos de tu proyecto <ArrowRight size={16} /></a></div>
      </section>

      <section className="quote-bridge" aria-labelledby="bridge-title">
        <div className="bridge-rule" aria-hidden="true" />
        <div className="bridge-copy"><span className="portfolio-kicker">02 / Ahora empieza el tuyo</span><h2 className="bridge-title" id="bridge-title">De la inspiración<br /><em>a tu proyecto.</em></h2></div>
        <div className="bridge-action"><p>Ya tienes una idea. El siguiente paso es darle dirección.</p><a href="#cotizar">Preparar mi consulta <ArrowDown size={20} /></a><span>Leonardo te acompaña · Aproximadamente 3 minutos</span></div>
      </section>
    </div>
  );
}


