import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { projectScenes, serviceScenes, scaleGadgets, detailGadgetAssets, resolveLeonardoScene, resolveDeskGadgets } from "../src/leonardo-scenes.js";

test("every registered photograph or gadget exists locally", () => {
  const assets = [...Object.values(projectScenes), ...Object.values(serviceScenes).flatMap(Object.values), ...Object.values(detailGadgetAssets).flatMap(Object.values)];
  for (const asset of assets) if (asset.src) assert.ok(existsSync(`public${asset.src}`), `Missing ${asset.src}`);
});

test("each project has distinct construction, supervision and handover scenes", () => {
  for (const projectId of ["vivienda", "edificio", "industrial", "remodelacion"]) {
    assert.equal(resolveLeonardoScene(projectId, "diseno"), projectScenes[projectId]);
    const scenes = ["construccion", "supervision", "llave"].map((serviceId) => resolveLeonardoScene(projectId, serviceId));
    assert.equal(new Set(scenes.map((scene) => scene.src)).size, 3);
    for (const scene of scenes) {
      assert.ok(existsSync(`public${scene.src}`));
      assert.match(scene.src, new RegExp(`/${projectId}-`));
    }
  }
});

test("all four scale answers have a visual without reusing the mislabeled source", () => {
  assert.deepEqual(Object.keys(scaleGadgets), ["Hasta 150 m²", "150 a 400 m²", "Más de 400 m²", "Aún no definido"]);
  assert.match(scaleGadgets["Hasta 150 m²"].src, /escala-hasta-150\.webp$/);
  assert.equal(scaleGadgets["Hasta 150 m²"].transparent, true);
});

test("desk accumulates answers, replaces an edited object, and ignores unknown saved values", () => {
  const steps = [
    { id: "tamano", label: "Escala", options: Object.keys(scaleGadgets) },
    { id: "estado", label: "Estado", options: ["Solo idea", "Tengo planos"] },
    { id: "documentacion", label: "Docs", options: ["Fotos"] },
  ];
  const details = { tamano: "150 a 400 m²", estado: "Tengo planos", documentacion: "Fotos" };
  const original = resolveDeskGadgets(details, steps);
  const changed = resolveDeskGadgets({ ...details, tamano: "Más de 400 m²" }, steps);
  assert.equal(original.length, 3);
  assert.equal(changed.length, 3);
  assert.equal(changed[0].value, "Más de 400 m²");
  assert.deepEqual(changed.slice(1), original.slice(1));
  assert.deepEqual(changed.map((item) => item.stage), [2, 3, 4]);
  assert.equal(resolveDeskGadgets({ tamano: "corrupted", estado: "Tengo planos" }, steps).length, 1);
  assert.deepEqual(resolveDeskGadgets({}, steps), []);
});
