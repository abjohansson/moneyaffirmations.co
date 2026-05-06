/**
 * add-og-tags.js
 * Adds full OG + Twitter Card tags to all blog posts and collection pages.
 * Skips posts that already have og:title. Safe to re-run.
 */

const fs   = require('fs');
const path = require('path');
const BASE = 'https://moneyaffirmations.co';

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").trim();
}

function escAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function extractMeta(html) {
  const titleMatch    = html.match(/<title>([^<]+)<\/title>/i);
  const descMatch     = html.match(/name=["']description["']\s+content=["']([^"']+)["']/i);
  const canonicalMatch= html.match(/rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const ogImageMatch  = html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i);
  return {
    title:     titleMatch     ? decodeEntities(titleMatch[1])    : '',
    desc:      descMatch      ? decodeEntities(descMatch[1])     : '',
    canonical: canonicalMatch ? canonicalMatch[1]                : '',
    ogImage:   ogImageMatch   ? ogImageMatch[1]                  : '',
  };
}

function buildOGBlock(meta) {
  const title = escAttr(meta.title.replace(/\s*\|.*$/, '').trim());
  const desc  = escAttr(meta.desc);
  const url   = meta.canonical;
  const img   = meta.ogImage;

  let tags = `  <meta property="og:type" content="article">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="MoneyAffirmations.co">`;

  if (img) {
    tags += `\n  <meta property="og:image" content="${img}">`;
  }

  tags += `
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">`;

  if (img) {
    tags += `\n  <meta name="twitter:image" content="${img}">`;
  }

  return tags;
}

function processFile(filePath, isCollection = false) {
  if (!fs.existsSync(filePath)) return false;

  let html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('og:title')) {
    // Already has og:title — but check if twitter:card is missing and add it
    if (!html.includes('twitter:card')) {
      const meta   = extractMeta(html);
      const title  = escAttr(meta.title.replace(/\s*\|.*$/, '').trim());
      const desc   = escAttr(meta.desc);
      const img    = meta.ogImage;
      let twitterTags = `\n  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">`;
      if (img) twitterTags += `\n  <meta name="twitter:image" content="${img}">`;
      // Insert after last og: tag
      html = html.replace(/((<meta\s+property=["']og:[^>]+>\s*)+)/, `$1${twitterTags}\n`);
      fs.writeFileSync(filePath, html, 'utf8');
      return 'twitter-only';
    }
    return 'skipped';
  }

  const meta  = extractMeta(html);
  if (!meta.title) return false;

  // For collection pages, override type to WebPage
  let ogBlock = buildOGBlock(meta);
  if (isCollection) {
    ogBlock = ogBlock.replace('content="article"', 'content="website"');
  }

  // Insert after the canonical tag
  html = html.replace(
    /(<link\s+rel=["']canonical["'][^>]+>)/i,
    `$1\n${ogBlock}`
  );

  fs.writeFileSync(filePath, html, 'utf8');
  return 'added';
}

// ── Blog posts ────────────────────────────────────────────────────────────────
const blogDir = path.join(__dirname, 'blog');
const dirs    = fs.readdirSync(blogDir)
  .filter(d => fs.statSync(path.join(blogDir, d)).isDirectory());

let added = 0, twitterOnly = 0, skipped = 0;

for (const dir of dirs) {
  const result = processFile(path.join(blogDir, dir, 'index.html'));
  if      (result === 'added')        { console.log(`✅ Full OG+Twitter: blog/${dir}`); added++; }
  else if (result === 'twitter-only') { console.log(`🐦 Twitter added:  blog/${dir}`); twitterOnly++; }
  else if (result === 'skipped')      { console.log(`⏭  Skipped:        blog/${dir}`); skipped++; }
}

// ── Collection + other pages ──────────────────────────────────────────────────
const collectionPages = [
  'money-affirmations', 'abundance-affirmations', 'wealth-affirmations',
  'manifestation-affirmations', 'prosperity-affirmations',
  'wallpapers', 'affirmation-cards', 'blog',
];
console.log('\n--- Collection / other pages ---');
for (const slug of collectionPages) {
  const filePath = path.join(__dirname, slug, 'index.html');
  const result   = processFile(filePath, true);
  if      (result === 'added')        { console.log(`✅ Full OG+Twitter: ${slug}`); added++; }
  else if (result === 'twitter-only') { console.log(`🐦 Twitter added:  ${slug}`); twitterOnly++; }
  else if (result === 'skipped')      { console.log(`⏭  Skipped:        ${slug}`); skipped++; }
}

// ── Homepage ──────────────────────────────────────────────────────────────────
console.log('\n--- Homepage ---');
const homeResult = processFile(path.join(__dirname, 'index.html'), true);
if (homeResult === 'added')        { console.log('✅ Full OG+Twitter: homepage'); added++; }
else if (homeResult === 'twitter-only') { console.log('🐦 Twitter added: homepage'); twitterOnly++; }
else if (homeResult === 'skipped') { console.log('⏭  Skipped: homepage'); skipped++; }

console.log(`\nDone. Added full OG+Twitter: ${added} | Twitter only: ${twitterOnly} | Skipped: ${skipped}`);
