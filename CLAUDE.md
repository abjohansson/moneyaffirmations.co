# MoneyAffirmations.co — Project Brief

## What this is
Static HTML site at moneyaffirmations.co targeting $2k/month AdSense by Nov 2026.
GitHub repo: https://github.com/abjohansson/moneyaffirmations.co
Hosted on GitHub Pages, custom domain connected.

## Tech stack
- Pure static HTML/CSS/JS — no framework, no CMS, no backend
- One stylesheet: /assets/shared.css
- All affirmations data inline in each HTML file (never external JS files)
- GitHub Actions: .github/workflows/publish.yml handles scheduled blog post publishing

## Design system
- --gold: #C9A84C
- --gold-light: #E8C97A
- --dark: #0D0C0A (main bg)
- --dark-2: #1A1813 (card bg)
- --cream: #F8F2E4 (main text)
- --text-muted: #8A8070
- Fonts: Playfair Display (headings/affirmations) + DM Sans (UI) via Google Fonts
- Stylesheet: /assets/shared.css — never duplicate styles inline

## Favicon
- /favicon.ico at root — auto-served by browsers, no HTML tags needed
- /assets/apple-touch-icon.png — 180x180 for iOS

## Site structure (35 files)
```
index.html                          homepage (daily affirmation + canvas story generator)
404.html
CNAME                               moneyaffirmations.co
robots.txt
sitemap.xml
favicon.ico
assets/shared.css
assets/favicon.svg
assets/apple-touch-icon.png
.github/workflows/publish.yml

money-affirmations/index.html       100 affirmations, 5 groups
abundance-affirmations/index.html   80 affirmations, 4 groups
wealth-affirmations/index.html      80 affirmations, 4 groups
manifestation-affirmations/index.html  60 affirmations, 3 groups
prosperity-affirmations/index.html  60 affirmations, 3 groups

wallpapers/index.html
affirmation-cards/index.html        $9 Gumroad product

blog/index.html
blog/10-money-affirmations-that-really-work/index.html
blog/what-are-money-affirmations/index.html
blog/how-to-use-money-affirmations/index.html
blog/30-day-money-affirmation-journal/index.html
blog/daily-affirmations-for-money/index.html
blog/i-am-a-money-magnet/index.html
blog/money-affirmations-that-work-instantly/index.html
blog/morning-affirmations-for-abundance/index.html
blog/law-of-attraction-affirmations-for-money/index.html
blog/financial-freedom-affirmations/index.html
blog/7-most-powerful-money-affirmations/index.html
blog/louise-hay-abundance-affirmations/index.html
blog/how-to-write-money-affirmations/index.html
blog/bob-proctor-affirmations-for-money/index.html
blog/affirmations-for-entrepreneurs/index.html
blog/affirmations-for-freelancers/index.html
blog/money-affirmations-for-women/index.html
blog/affirmations-for-investing/index.html
blog/affirmations-for-sales-confidence/index.html
blog/affirmations-for-career-growth/index.html
```

## Language rules — CRITICAL
- NEVER say "pillar" — always say "collection"
- NEVER show dataset IDs in affirmation cards — CSS counter only
- All affirmations: first person, present tense, positive

## Blog post structure (follow exactly)
1. H1 — exact/close keyword match
2. Visible date line immediately after H1 — use exact format:
   - Scheduled post: `<p class="post-meta" style="color:#8A8070;font-size:.85rem;margin-top:-.75rem;margin-bottom:1.75rem">Scheduled for [Month D, YYYY] · 07:00 UTC</p>`
   - Already-live post: `<p class="post-meta" style="color:#8A8070;font-size:.85rem;margin-top:-.75rem;margin-bottom:1.75rem">Published [Month D, YYYY]</p>`
   - GitHub Action auto-swaps "Scheduled for…" → "Published…" on publish day
3. Intro 120–150 words
3. H2: What are [topic] affirmations? — 100–150 words
4. H2: [N] [topic] affirmations — full numbered list (ol.affirmation-list)
5. H2: How to use these affirmations — 150–200 words
6. H2: Tips to make them work faster — 3–5 bullets
7. H2: FAQ — 3 x <details><summary> items
8. Closing paragraph linking to parent collection

## Required <head> tags on every blog post — NEVER OMIT
Every blog post must include ALL of the following in <head>, filled in correctly:

```html
<meta name="publish-date" content="YYYY-MM-DD">
<meta name="description" content="[150 chars max]">
<link rel="canonical" href="https://moneyaffirmations.co/blog/[slug]/">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:title" content="[Full post title]">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:url" content="https://moneyaffirmations.co/blog/[slug]/">
<meta property="og:site_name" content="MoneyAffirmations.co">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="[Full post title]">
<meta name="twitter:description" content="[Same as meta description]">

<!-- JSON-LD: Article schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Post title without site name]",
  "description": "[Same as meta description]",
  "url": "https://moneyaffirmations.co/blog/[slug]/",
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "author": { "@type": "Organization", "name": "MoneyAffirmations.co", "url": "https://moneyaffirmations.co" },
  "publisher": { "@type": "Organization", "name": "MoneyAffirmations.co", "url": "https://moneyaffirmations.co" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://moneyaffirmations.co/blog/[slug]/" }
}
</script>

<!-- JSON-LD: FAQPage schema — fill in from actual FAQ <details> items -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "[FAQ question 1]", "acceptedAnswer": { "@type": "Answer", "text": "[Answer 1]" } },
    { "@type": "Question", "name": "[FAQ question 2]", "acceptedAnswer": { "@type": "Answer", "text": "[Answer 2]" } },
    { "@type": "Question", "name": "[FAQ question 3]", "acceptedAnswer": { "@type": "Answer", "text": "[Answer 3]" } }
  ]
}
</script>
```

## Internal linking rules
- Money posts → /money-affirmations/
- Abundance/morning/LOA posts → /abundance-affirmations/ or /manifestation-affirmations/
- Wealth/investing/freedom posts → /wealth-affirmations/
- Prosperity/daily posts → /prosperity-affirmations/
- Every collection page links back to its blog posts

## Scheduling system
Each blog post has: <meta name="publish-date" content="YYYY-MM-DD">
GitHub Action runs 7am UTC daily, marks posts published, updates blog/index.html and sitemap.xml.

## Revenue
1. Google AdSense (primary — GA4 ID: TBD)
2. Affiliates: YNAB, Acorns, Coinbase, money mindset books
3. Gumroad card deck: $9 → https://gumroad.com/l/money-affirmation-cards
4. Pinterest traffic via canvas story generator on homepage

## Priority keywords
- money affirmations (50k/mo, comp 15)
- abundance affirmations (5k/mo)
- wealth affirmations (5k/mo)
- money affirmations that work instantly (5k/mo, comp 7)
- morning affirmations for abundance (500/mo)

## Next blog posts to write (priority order)
1. Gratitude Affirmations
2. Business Affirmations
3. Wednesday Affirmations
4. Weekend Affirmations
5. Positive Affirmations for Money
6. Affirmations for Debt-Free Living
7. Abundance Mindset Affirmations
8. Affirmations for Receiving Money

## Published scheduled posts (already in repo)
- monday-affirmations-for-money — 2026-04-28 ✅ published
- friday-affirmations-for-money — 2026-04-30
- sleep-affirmations-for-wealth — 2026-05-02
- the-secret-money-affirmations — 2026-05-04
- money-mindset — 2026-05-06
- tuesday-affirmations — 2026-05-08
- thursday-affirmations — 2026-05-10
- manifesting-affirmations-for-money — 2026-05-12
- money-comes-to-me-easily — 2026-05-14
- i-am-wealthy-affirmation — 2026-05-16

## SEO checklist — verify before every commit
- [ ] meta description present
- [ ] canonical URL correct
- [ ] og:title, og:description, og:type, og:url, og:site_name present
- [ ] twitter:card, twitter:title, twitter:description present
- [ ] Article JSON-LD with correct datePublished
- [ ] FAQPage JSON-LD matching actual FAQ items in post
- [ ] publish-date meta set
- [ ] data-published="true" on body (for already-live posts only)

## How to add a new blog post
1. Create /blog/[slug]/index.html following the blog post structure above
2. Set <meta name="publish-date" content="YYYY-MM-DD">
3. Set <body data-published="true">
4. Link to parent collection in closing paragraph
5. Commit and push — GitHub Pages rebuilds in ~2 min
6. GA4 tracking fires automatically (once GA is set up)

## Git
- Repo: https://github.com/abjohansson/moneyaffirmations.co
- Branch: main
- Push via HTTPS (credentials stored)
