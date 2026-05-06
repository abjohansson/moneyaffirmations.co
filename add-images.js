/**
 * add-images.js
 * Generates a branded SVG card for every blog post, injects the <img> tag,
 * and adds og:image + twitter:image to <head>.
 * Safe to re-run — skips posts that already have card.svg.
 */

const fs   = require('fs');
const path = require('path');

const BASE = 'https://moneyaffirmations.co';

// ── Text wrapping ─────────────────────────────────────────────────────────────
function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line    = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (test.length <= maxChars) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ── SVG generation ────────────────────────────────────────────────────────────
function buildSVG(title) {
  const W = 1200, H = 630;

  // Pick font size + chars-per-line based on title length
  let fontSize, maxChars;
  if      (title.length <= 35) { fontSize = 62; maxChars = 28; }
  else if (title.length <= 55) { fontSize = 54; maxChars = 34; }
  else if (title.length <= 75) { fontSize = 46; maxChars = 40; }
  else                          { fontSize = 40; maxChars = 46; }

  const lines      = wrapText(title, maxChars);
  const lineHeight = fontSize * 1.35;
  const blockH     = lines.length * lineHeight;
  // Vertically centre text in the content zone (y 110 → 500)
  const startY     = 110 + (390 - blockH) / 2 + fontSize;

  const textLines = lines.map((l, i) =>
    `  <text x="600" y="${Math.round(startY + i * lineHeight)}" text-anchor="middle" fill="#F8F2E4" font-family="Georgia,'Times New Roman',serif" font-size="${fontSize}" font-weight="600">${escXml(l)}</text>`
  ).join('\n');

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#0D0C0A"/>

  <!-- Outer gold frame -->
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#C9A84C" stroke-width="1.5" opacity="0.5"/>
  <rect x="28" y="28" width="1144" height="574" fill="none" stroke="#C9A84C" stroke-width="0.5" opacity="0.2"/>

  <!-- Top decorative rule -->
  <line x1="80" y1="100" x2="1120" y2="100" stroke="#C9A84C" stroke-width="0.8" opacity="0.35"/>
  <!-- Top centre diamond -->
  <polygon points="600,88 608,100 600,112 592,100" fill="#C9A84C" opacity="0.7"/>

  <!-- Bottom decorative rule -->
  <line x1="80" y1="530" x2="1120" y2="530" stroke="#C9A84C" stroke-width="0.8" opacity="0.35"/>

  <!-- Title -->
${textLines}

  <!-- Branding -->
  <text x="600" y="575" text-anchor="middle" fill="#C9A84C" font-family="Georgia,'Times New Roman',serif" font-size="24" font-style="italic" opacity="0.9">MoneyAffirmations.co</text>
</svg>`;
}

function escXml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Head tag helpers ──────────────────────────────────────────────────────────
function injectOgImage(html, imageUrl) {
  // Update existing og:image or insert after og:url
  if (html.includes('og:image')) {
    return html.replace(
      /(<meta\s+property=["']og:image["'][^>]*>)/i,
      `<meta property="og:image" content="${imageUrl}">`
    );
  }
  // Insert after og:url line (or og:site_name, or og:description — whichever comes last)
  return html.replace(
    /(<meta\s+property=["']og:(?:url|site_name|description)["'][^>]*>)(?![\s\S]*<meta\s+property=["']og:(?:url|site_name|description)["'])/i,
    `$1\n  <meta property="og:image" content="${imageUrl}">`
  );
}

function injectTwitterImage(html, imageUrl) {
  if (html.includes('twitter:image')) {
    return html.replace(
      /(<meta\s+name=["']twitter:image["'][^>]*>)/i,
      `<meta name="twitter:image" content="${imageUrl}">`
    );
  }
  return html.replace(
    /(<meta\s+name=["']twitter:description["'][^>]*>)/i,
    `$1\n  <meta name="twitter:image" content="${imageUrl}">`
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const blogDir = path.join(__dirname, 'blog');
const dirs    = fs.readdirSync(blogDir)
  .filter(d => fs.statSync(path.join(blogDir, d)).isDirectory());

let added = 0, skipped = 0;

for (const dir of dirs) {
  const postDir  = path.join(blogDir, dir);
  const filePath = path.join(postDir, 'index.html');
  const svgPath  = path.join(postDir, 'card.svg');

  if (!fs.existsSync(filePath)) continue;

  let html = fs.readFileSync(filePath, 'utf8');

  if (fs.existsSync(svgPath) && html.includes('card.svg')) {
    console.log(`⏭  Skipping (already done): ${dir}`);
    skipped++;
    continue;
  }

  // Extract clean title (strip " | MoneyAffirmations.co")
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) { console.log(`⚠️  No title: ${dir}`); continue; }
  const title = titleMatch[1].replace(/\s*\|.*$/, '').trim()
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');

  // 1. Write SVG file
  fs.writeFileSync(svgPath, buildSVG(title), 'utf8');

  // 2. Inject <img> after post-meta date line (or after </h1> if no post-meta)
  const imgTag = `\n  <img src="card.svg" alt="${escXml(title)} affirmation card" width="100%" style="border-radius:8px;margin-bottom:2rem;display:block">`;
  if (html.includes('class="post-meta"')) {
    html = html.replace(/(<p class="post-meta"[^>]*>.*?<\/p>)/s, `$1${imgTag}`);
  } else {
    html = html.replace(/<\/h1>/, `</h1>${imgTag}`);
  }

  // 3. og:image + twitter:image
  const imageUrl = `${BASE}/blog/${dir}/card.svg`;
  html = injectOgImage(html, imageUrl);
  html = injectTwitterImage(html, imageUrl);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ ${dir}`);
  added++;
}

console.log(`\nDone. Generated images for ${added} posts. Skipped ${skipped}.`);
