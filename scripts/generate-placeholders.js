const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

// Reusable PNG generator
function createPng(width, height, r, g, b, a = 255, isHeroPortrait = false) {
  const rowSize = width * 4 + 1;
  const rawData = Buffer.alloc(rowSize * height);

  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }

  function crc32(buf) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ (-1)) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const typeAndData = Buffer.concat([typeBuf, data]);
    const crcVal = crc32(typeAndData);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crcVal, 0);
    return Buffer.concat([len, typeAndData, crcBuf]);
  }

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // filter: none

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      if (isHeroPortrait) {
        // Transparent portrait silhouette placeholder
        // Oval / stylized silhouette
        const cx = width / 2;
        const cy = height * 0.42;
        const rx = width * 0.28;
        const ry = height * 0.35;
        const dx = (x - cx) / rx;
        const dy = (y - cy) / ry;
        const dist = dx * dx + dy * dy;

        // Shoulder curve
        const shoulderY = height * 0.65;
        const shoulderRx = width * 0.45;
        const shoulderDist = ((x - cx) / shoulderRx) ** 2 + ((y - height * 0.9) / (height * 0.35)) ** 2;

        if (dist <= 1.0 || (y >= shoulderY && shoulderDist <= 1.0)) {
          // Silhouette fill with subtle gradient
          const grad = Math.floor(18 + (y / height) * 20);
          rawData[pxOffset] = grad;
          rawData[pxOffset + 1] = grad;
          rawData[pxOffset + 2] = grad + 4;
          rawData[pxOffset + 3] = 230; // semi-transparent
        } else {
          // Transparent background
          rawData[pxOffset] = 0;
          rawData[pxOffset + 1] = 0;
          rawData[pxOffset + 2] = 0;
          rawData[pxOffset + 3] = 0;
        }
      } else {
        // Standard photographic placeholder with subtle vignette / border
        const isBorder = (x < 2 || x >= width - 2 || y < 2 || y >= height - 2);
        const centerDistX = Math.abs(x - width / 2) / (width / 2);
        const centerDistY = Math.abs(y - height / 2) / (height / 2);
        const vignette = Math.floor((centerDistX * centerDistX + centerDistY * centerDistY) * 12);

        if (isBorder) {
          rawData[pxOffset] = Math.min(255, r + 45);
          rawData[pxOffset + 1] = Math.min(255, g + 45);
          rawData[pxOffset + 2] = Math.min(255, b + 45);
          rawData[pxOffset + 3] = a;
        } else {
          rawData[pxOffset] = Math.max(8, r - vignette);
          rawData[pxOffset + 1] = Math.max(8, g - vignette);
          rawData[pxOffset + 2] = Math.max(8, b - vignette);
          rawData[pxOffset + 3] = a;
        }
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

const baseDir = path.resolve(__dirname, '..', 'public', 'images');

// Ensure base directories
const dirs = [
  path.join(baseDir, 'hero'),
  path.join(baseDir, 'about'),
  path.join(baseDir, 'videography'),
];

const categories = [
  'corporate-events',
  'family-candid',
  'portraits',
  'classical-dance',
  'theatre-stage',
  'kids-childhood',
  'art-workshops',
  'fests-carnivals',
  'food-cafes-spaces',
  'live-music',
  'street',
  'travel-landscapes',
];

categories.forEach(slug => {
  dirs.push(path.join(baseDir, 'photography', slug));
});

dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

console.log('Generating hero portrait...');
// Hero portrait: transparent PNG (800x1000)
const heroPng = createPng(600, 800, 25, 25, 25, 255, true);
fs.writeFileSync(path.join(baseDir, 'hero', 'portrait.png'), heroPng);

console.log('Generating about portrait...');
// About portrait: (800x1000)
const aboutPng = createPng(600, 800, 28, 28, 28, 255, false);
fs.writeFileSync(path.join(baseDir, 'about', 'portrait.jpg'), aboutPng);

console.log('Generating OG image...');
// OG Image: (1200x630)
const ogPng = createPng(800, 420, 16, 16, 16, 255, false);
fs.writeFileSync(path.join(baseDir, 'og-image.jpg'), ogPng);

console.log('Generating category thumbnails and gallery images...');
// Category images
categories.forEach((slug, idx) => {
  const catDir = path.join(baseDir, 'photography', slug);
  // Color tint variation for distinction
  const r = 24 + (idx % 3) * 4;
  const g = 24 + ((idx + 1) % 3) * 4;
  const b = 28 + ((idx + 2) % 3) * 4;

  // Thumbnail
  const thumb = createPng(600, 400, r, g, b, 255, false);
  fs.writeFileSync(path.join(catDir, 'thumbnail.jpg'), thumb);

  // 6 images per category (varying aspect ratios)
  const dims = [
    [600, 400], // 01 landscape
    [400, 600], // 02 portrait
    [600, 400], // 03 landscape
    [500, 500], // 04 square
    [400, 600], // 05 portrait
    [600, 400], // 06 landscape
  ];

  for (let i = 1; i <= 6; i++) {
    const [w, h] = dims[i - 1];
    const imgData = createPng(w, h, r + i * 2, g + i * 2, b + i * 2, 255, false);
    fs.writeFileSync(path.join(catDir, `0${i}.jpg`), imgData);
  }
});

console.log('Generating videography thumbnails...');
const videoProjects = [
  'annual-gala-highlight',
  'hyderabad-mornings',
  'cafe-promo',
  'dance-rehearsal-bts',
  'music-fest-recap',
  'street-food-trail',
];

videoProjects.forEach((id, idx) => {
  const vidThumb = createPng(640, 360, 22 + idx * 3, 22 + idx * 2, 26 + idx * 3, 255, false);
  fs.writeFileSync(path.join(baseDir, 'videography', `${id}.jpg`), vidThumb);
});

console.log('All image placeholders generated successfully!');
