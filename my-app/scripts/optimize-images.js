const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'assets', 'images');

async function optimizeImages() {
  if (!fs.existsSync(imagesDir)) {
    console.error(`Images directory not found: ${imagesDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir).filter((f) => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  console.log(`Found ${files.length} images to optimize in ${imagesDir}...`);

  let totalOrig = 0;
  let totalNew = 0;

  for (const f of files) {
    const filePath = path.join(imagesDir, f);
    const origStat = fs.statSync(filePath);
    totalOrig += origStat.size;

    let maxWidth = 1200;
    let quality = 80;

    if (f.startsWith('hero-') || f.startsWith('footer-banner')) {
      maxWidth = 1600;
      quality = 80;
    } else if (f.startsWith('team-') || f.startsWith('founder')) {
      maxWidth = 600;
      quality = 82;
    } else if (f.startsWith('client-')) {
      maxWidth = 300;
      quality = 82;
    } else if (f.startsWith('contact-')) {
      maxWidth = 800;
      quality = 80;
    } else if (f.startsWith('faq')) {
      maxWidth = 900;
      quality = 80;
    } else if (f.startsWith('about-gallery-') || f.startsWith('about-secondary')) {
      maxWidth = 1000;
      quality = 80;
    }

    const inputBuf = fs.readFileSync(filePath);
    const outputBuffer = await sharp(inputBuf)
      .resize({
        width: maxWidth,
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({
        quality,
        effort: 6,
        smartSubsample: true,
      })
      .toBuffer();

    fs.writeFileSync(filePath, outputBuffer);
    totalNew += outputBuffer.length;

    console.log(
      f.padEnd(28),
      (origStat.size / 1024).toFixed(0).padStart(6) + ' KB ->',
      (outputBuffer.length / 1024).toFixed(0).padStart(5) + ' KB',
      `(${Math.round((1 - outputBuffer.length / origStat.size) * 100)}% saved)`
    );
  }

  console.log('========================================================');
  console.log(`TOTAL BEFORE: ${(totalOrig / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`TOTAL AFTER:  ${(totalNew / (1024 * 1024)).toFixed(2)} MB`);
  console.log(
    `TOTAL SAVED:  ${((totalOrig - totalNew) / (1024 * 1024)).toFixed(2)} MB (${Math.round(
      (1 - totalNew / totalOrig) * 100
    )}%)`
  );
}

optimizeImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
