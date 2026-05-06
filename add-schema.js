/**
 * add-schema.js
 * Injects Article + FAQPage JSON-LD schema into every blog post.
 * Safe to re-run — skips posts that already have schema.
 */

const fs   = require('fs');
const path = require('path');

// Decode HTML entities for clean JSON output
function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function extractMeta(html) {
  const titleMatch    = html.match(/<title>([^<]+)<\/title>/i);
  const descMatch     = html.match(/name=["']description["']\s+content=["']([^"']+)["']/i);
  const canonicalMatch= html.match(/rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const dateMatch     = html.match(/name=["']publish-date["']\s+content=["']([^"']+)["']/i);
  const rawTitle      = titleMatch ? decodeEntities(titleMatch[1]) : '';
  // Strip site name suffix e.g. " | MoneyAffirmations.co"
  const headline      = rawTitle.replace(/\s*\|.*$/, '').trim();
  return {
    headline,
    description: descMatch    ? decodeEntities(descMatch[1])    : '',
    canonical:   canonicalMatch ? canonicalMatch[1]             : '',
    publishDate: dateMatch    ? dateMatch[1]                    : '2026-04-20',
  };
}

function extractFAQs(html) {
  const faqs = [];
  // Match each <details class="faq-item"> block
  const blockRe = /<details[^>]*class=["'][^"']*faq[^"']*["'][^>]*>([\s\S]*?)<\/details>/gi;
  let block;
  while ((block = blockRe.exec(html)) !== null) {
    const inner  = block[1];
    const qMatch = inner.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i);
    const aMatch = inner.match(/<\/summary>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
    if (qMatch && aMatch) {
      faqs.push({
        question: decodeEntities(qMatch[1].replace(/<[^>]+>/g, '')),
        answer:   decodeEntities(aMatch[1].replace(/<[^>]+>/g, '')),
      });
    }
  }
  return faqs;
}

function buildSchemaBlocks(meta, faqs) {
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": meta.headline,
    "description": meta.description,
    "url": meta.canonical,
    "datePublished": meta.publishDate,
    "dateModified": meta.publishDate,
    "author": {
      "@type": "Organization",
      "name": "MoneyAffirmations.co",
      "url": "https://moneyaffirmations.co"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MoneyAffirmations.co",
      "url": "https://moneyaffirmations.co"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": meta.canonical
    }
  };

  let blocks = `  <script type="application/ld+json">\n${JSON.stringify(article, null, 2)}\n  </script>`;

  if (faqs.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };
    blocks += `\n  <script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n  </script>`;
  }

  return blocks;
}

// ── Main ──────────────────────────────────────────────────────────────────────
const blogDir = path.join(__dirname, 'blog');
const dirs    = fs.readdirSync(blogDir)
  .filter(d => fs.statSync(path.join(blogDir, d)).isDirectory());

let added = 0, skipped = 0;

for (const dir of dirs) {
  const filePath = path.join(blogDir, dir, 'index.html');
  if (!fs.existsSync(filePath)) continue;

  let html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('application/ld+json')) {
    console.log(`⏭  Skipping (schema exists): ${dir}`);
    skipped++;
    continue;
  }

  const meta   = extractMeta(html);
  const faqs   = extractFAQs(html);
  const schema = buildSchemaBlocks(meta, faqs);

  // Inject immediately before </head>
  html = html.replace('</head>', `${schema}\n</head>`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ ${dir} — ${faqs.length} FAQ(s)`);
  added++;
}

console.log(`\nDone. Added schema to ${added} posts. Skipped ${skipped}.`);
