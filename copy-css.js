// copy-css.js
const fs = require('fs');
const path = require('path');

const srcRoot = path.join(__dirname, 'src', 'components');
const distRoot = path.join(__dirname, 'dist', 'components');

// Crea recursivamente la carpeta destino
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Copia todos los .module.css recursivamente
function copyCssModules(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      // Crear subdirectorio antes de seguir
      ensureDir(destPath);
      copyCssModules(srcPath, destPath);
    } else if (entry.name.endsWith('.module.css')) {
      // Asegura que la carpeta destino existe antes de copiar
      ensureDir(destDir);
      fs.copyFileSync(srcPath, destPath);
      console.log(`[OK] Copiado: ${srcPath} -> ${destPath}`);
    }
  }
}

// Asegura la carpeta raíz destino
ensureDir(distRoot);

if (!fs.existsSync(srcRoot)) {
  console.error(`[ERROR] No existe la carpeta: ${srcRoot}`);
  process.exit(1);
}

copyCssModules(srcRoot, distRoot);

console.log(' Todos los CSS modules fueron copiados.');