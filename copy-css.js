const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');
const distDir = path.join(__dirname, 'dist');

function copyCssModules(fromDir, toDir) {
  fs.readdirSync(fromDir, { withFileTypes: true }).forEach((entry) => {
    const srcPath = path.join(fromDir, entry.name);
    const distPath = path.join(toDir, entry.name);

    if (entry.isDirectory()) {
      if (!fs.existsSync(distPath)) fs.mkdirSync(distPath);
      copyCssModules(srcPath, distPath);
    } else if (entry.name.endsWith('.module.css')) {
      if (!fs.existsSync(toDir)) fs.mkdirSync(toDir, { recursive: true });
      fs.copyFileSync(srcPath, distPath);
      console.log(`Copied: ${srcPath} -> ${distPath}`);
    }
  });
}

copyCssModules(srcDir, path.join(distDir, 'components'));
