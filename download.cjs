const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }

      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  try {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    console.log('Downloading logo...');
    await download('https://drive.google.com/uc?export=download&id=1JotOAEcgiN2VrslqqrQbOkC6nlGJqBxg', path.join('public', 'logo.png'));
    console.log('Downloading favicon...');
    await download('https://drive.google.com/uc?export=download&id=1V9tnp6uVpiGwvgllWFoZ8Yyl0S6tAvuX', path.join('public', 'favicon.png'));
    console.log('Downloads completed successfully.');
  } catch (error) {
    console.error('Error downloading files:', error);
    process.exit(1);
  }
}

run();
