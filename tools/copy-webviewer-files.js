const fs = require('fs-extra');
const path = require('path');

const copyFiles = async () => {
  const sourcePath = path.resolve('./node_modules/@pdftron/webviewer/public');
  const destPath = path.resolve('./src/lib/');

  try {
    await fs.copy(sourcePath, destPath);
    console.log('WebViewer files copied over successfully');
  } catch (err) {
    console.error(err);
  }
};

copyFiles();