import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "public/assets/casa-fondo-limpio.png",
  "public/assets/leonardo/vivienda.webp",
  "public/assets/leonardo/edificio.webp",
  "public/assets/leonardo/industrial.webp",
  "public/assets/leonardo/remodelacion.webp",
  "public/matsinco-favicon.svg",
  "src/main.jsx",
  "src/styles.css",
  "dist/index.html",
];

const requiredSourceMarkers = [
  "const companyWhatsAppNumber",
  "<LeonardoDesk",
  "const demoPreviewItems",
  "localStorage.setItem(storageKey",
  "Archivos de referencia",
  "Requisitos sugeridos",
  "Ruta sugerida",
  "Modo demo",
];

const requiredHtmlMarkers = [
  'name="description"',
  'property="og:title"',
  'name="theme-color"',
  'href="/matsinco-favicon.svg"',
];

const failures = [];

for (const file of requiredFiles) {
  const path = join(root, file);
  if (!existsSync(path)) {
    failures.push(`Missing file: ${file}`);
    continue;
  }
  if (statSync(path).size === 0) failures.push(`Empty file: ${file}`);
}

const source = readFileSync(join(root, "src/main.jsx"), "utf8");
for (const marker of requiredSourceMarkers) {
  if (!source.includes(marker)) failures.push(`Missing source marker: ${marker}`);
}

const html = readFileSync(join(root, "dist/index.html"), "utf8");
for (const marker of requiredHtmlMarkers) {
  if (!html.includes(marker)) failures.push(`Missing html marker: ${marker}`);
}

if (failures.length) {
  console.error("Matsinco demo validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Matsinco demo validation passed.");
