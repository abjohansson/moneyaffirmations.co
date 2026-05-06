/**
 * add-publish-date.js
 * Adds a visible publish/scheduled date line below the H1 on every blog post.
 * Safe to re-run — skips posts that already have it.
 */

const fs   = require('fs');
const path = require('path');

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

function buildDateLine(dateStr, isPublished) {
  const formatted = formatDate(dateStr);
  const text = isPublished
    ? `Published ${formatted}`
    : `Scheduled for ${formatted} · 07:00 UTC`;
  return `  <p class="post-meta" style="color:#8A8070;font-size:.85rem;margin-top:-.75rem;margin-bottom:1.75rem">${text}</p>`;
}

const blogDir = path.join(__dirname, 'blog');
const dirs    = fs.readdirSync(blogDir)
  .filter(d => fs.statSync(path.join(blogDir, d)).isDirectory());

let added = 0, skipped = 0;

for (const dir of dirs) {
  const filePath = path.join(blogDir, dir, 'index.html');
  if (!fs.existsSync(filePath)) continue;

  let html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('class="post-meta"')) {
    console.log(`⏭  Already has date: ${dir}`);
    skipped++;
    continue;
  }

  const dateMatch = html.match(/name=["']publish-date["']\s+content=["']([^"']+)["']/i);
  if (!dateMatch) {
    console.log(`⚠️  No publish-date meta found: ${dir}`);
    continue;
  }

  const isPublished = /data-published=["']true["']/.test(html);
  const dateLine    = buildDateLine(dateMatch[1], isPublished);

  // Insert immediately after </h1>
  html = html.replace(/<\/h1>/, `</h1>\n${dateLine}`);
  fs.writeFileSync(filePath, html, 'utf8');

  const label = isPublished ? `Published ${dateMatch[1]}` : `Scheduled ${dateMatch[1]} · 07:00 UTC`;
  console.log(`✅ ${dir} — ${label}`);
  added++;
}

console.log(`\nDone. Added date to ${added} posts. Skipped ${skipped}.`);
