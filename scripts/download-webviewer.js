const download = require('download');
const decompress = require('decompress');
const fs = require('fs-extra');

let downloadedSize = 0;

process.stdout.write('\n');

download(`https://www.pdftron.com/downloads/WebViewer.zip`, '.')
  .on('data', data => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    downloadedSize += data.length;
    process.stdout.write(`Downloading WebViewer... ${(downloadedSize / 100000000 * 100).toFixed(1)}%`);
  })
  .then(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Downloading WebViewer... 100%\nDownload completed.\n\nExtracting WebViewer... `);
    fs.removeSync('src/lib')
    decompress('WebViewer.zip', 'src').then(() => {
      // Trim down office, pdf and ui-legacy
      // It's highly recommended to use XOD for cordova apps for highest performance
      fs.moveSync('src/WebViewer/lib', 'src/lib');
      fs.removeSync('src/WebViewer');
      fs.removeSync('src/lib/core/pdf/full');
      fs.removeSync('src/lib/ui-legacy');
      fs.removeSync('src/lib/package.json');
      fs.removeSync('src/lib/webviewer.js');
      fs.moveSync('src/lib/ui/build', 'src/lib/temp');
      fs.removeSync('src/lib/ui');
      fs.moveSync('src/lib/temp', 'src/lib/ui/build');
      fs.removeSync('WebViewer.zip');
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`Extracting WebViewer... 100%\nExtract completed.\n\n\n`);
    }).catch((err) => {
      console.log(err);
    });
  });