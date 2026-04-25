const fs = require('fs');
const path = require('path');

const logoPath = path.join('public', 'logo.png');
const faviconPath = path.join('public', 'favicon.png');

console.log('Logo size:', fs.statSync(logoPath).size);
console.log('Favicon size:', fs.statSync(faviconPath).size);

const logoBuffer = fs.readFileSync(logoPath);
console.log('Logo magic bytes:', logoBuffer.toString('hex', 0, 4));

const faviconBuffer = fs.readFileSync(faviconPath);
console.log('Favicon magic bytes:', faviconBuffer.toString('hex', 0, 4));
