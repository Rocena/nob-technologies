const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function run() {
  const src = 'C:/Users/PC/.gemini/antigravity/brain/36151cae-41bc-4030-8806-ce944ea22530/.user_uploaded/media_1791464465073_4357dad0.jpg';
  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const cx = 509.5, cy = 385.5;

  // Measure shield radius for every 0.25 degrees (1440 samples)
  const radii = new Float32Array(1440);
  for (let i = 0; i < 1440; i++) {
    const angle = (i * 0.25 * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    let edgeR = 310;
    for (let r = 260; r <= 335; r += 0.5) {
      const px = Math.round(cx + r * cos);
      const py = Math.round(cy + r * sin);
      if (px < 0 || px >= width || py < 0 || py >= height) break;
      const idx = (py * width + px) * 3;
      const red = data[idx], green = data[idx + 1], blue = data[idx + 2];
      if (red > 244 && green > 244 && blue > 244) {
        edgeR = r - 0.5;
        break;
      }
    }
    radii[i] = edgeR;
  }

  // Smooth radii table with gaussian filter to eliminate scan noise
  const smoothedRadii = new Float32Array(1440);
  for (let i = 0; i < 1440; i++) {
    let sum = 0, weight = 0;
    for (let k = -4; k <= 4; k++) {
      const idx = (i + k + 1440) % 1440;
      const w = Math.exp(-(k * k) / 4);
      sum += radii[idx] * w;
      weight += w;
    }
    smoothedRadii[i] = sum / weight;
  }

  // Create RGBA image
  const rgba = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const outIdx = (y * width + x) * 4;
      let r = data[idx], g = data[idx + 1], b = data[idx + 2];

      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.hypot(dx, dy);

      let angleDeg = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
      const bin = Math.floor(angleDeg / 0.25) % 1440;
      const edge = smoothedRadii[bin];

      // Anti-aliasing margin of 1.2px
      const diff = dist - edge;
      let alpha = 0;
      if (diff <= -0.7) {
        alpha = 255;
      } else if (diff >= 0.7) {
        alpha = 0;
      } else {
        alpha = Math.round(255 * (0.7 - diff) / 1.4);
      }

      // De-fringe: if pixel is close to outer edge, reduce background white tint
      if (alpha > 0 && alpha < 255) {
        const brightness = (r + g + b) / 3;
        if (brightness > 220) {
          // Pull color towards the neon gradient tone
          const factor = (255 - brightness) / 35;
          r = Math.min(255, Math.round(r * factor));
          g = Math.min(255, Math.round(g * factor));
          b = Math.min(255, Math.round(b * factor));
        }
      }

      rgba[outIdx] = r;
      rgba[outIdx + 1] = g;
      rgba[outIdx + 2] = b;
      rgba[outIdx + 3] = alpha;
    }
  }

  // Crop tight bounding box
  const left = 186;
  const top = 62;
  const size = 648;

  const publicDir = path.join(__dirname, '../public');

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: size, height: size })
    .resize(512, 512)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'images/nobtech-shield.png'));

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: size, height: size })
    .resize(256, 256)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'images/nobtech-shield-256.png'));

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: size, height: size })
    .resize(256, 256)
    .webp({ quality: 100 })
    .toFile(path.join(publicDir, 'images/nobtech-shield.webp'));

  // Update favicon files
  await sharp(path.join(publicDir, 'images/nobtech-shield.png')).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
  await sharp(path.join(publicDir, 'images/nobtech-shield.png')).resize(48, 48).png().toFile(path.join(publicDir, 'favicon-48x48.png'));
  await sharp(path.join(publicDir, 'images/nobtech-shield.png')).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));
  await sharp(path.join(publicDir, 'images/nobtech-shield.png')).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Update favicon.svg
  const buf32 = fs.readFileSync(path.join(publicDir, 'favicon-48x48.png'));
  const b64 = buf32.toString('base64');
  const favSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="#020617" />
  <rect width="62" height="62" x="1" y="1" rx="15" fill="none" stroke="#00D4FF" stroke-width="1.2" stroke-opacity="0.3" />
  <circle cx="32" cy="32" r="28" fill="url(#bgGrad)"/>
  <image href="data:image/png;base64,${b64}" x="6" y="6" width="52" height="52" preserveAspectRatio="xMidYMid meet" />
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), favSvg, 'utf8');

  console.log('Shield cutout perfected and written to public assets!');
}

run().catch(console.error);
