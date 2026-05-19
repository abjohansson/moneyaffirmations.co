# MoneyAffirmations.co — Project Brief

## What this is
Static HTML site at moneyaffirmations.co targeting $2k/month AdSense by Nov 2026.
GitHub repo: https://github.com/abjohansson/moneyaffirmations.co
Hosted on GitHub Pages, custom domain connected.
Contact email: hello@moneyaffirmations.co

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

## Site structure
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

about/index.html
contact/index.html
privacy-policy/index.html
terms/index.html
sitemap/index.html                  HTML sitemap page

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
blog/monday-affirmations-for-money/index.html
blog/friday-affirmations-for-money/index.html
blog/sleep-affirmations-for-wealth/index.html
blog/the-secret-money-affirmations/index.html
blog/money-mindset/index.html
blog/tuesday-affirmations/index.html
blog/thursday-affirmations/index.html
blog/manifesting-affirmations-for-money/index.html
blog/money-comes-to-me-easily/index.html
blog/i-am-wealthy-affirmation/index.html
blog/money-and-abundance-affirmations/index.html
blog/prosperity-affirmations/index.html
blog/powerful-money-affirmations/index.html
```

## Language rules — CRITICAL
- NEVER say "pillar" — always say "collection"
- NEVER show dataset IDs in affirmation cards — CSS counter only
- All affirmations: first person, present tense, positive

## Footer structure — every page must have this exact two-row footer
```html
<footer class="site-footer">
  <div class="container">
    <p><a href="/">Home</a> · <a href="/money-affirmations/">Money Affirmations</a> · <a href="/abundance-affirmations/">Abundance</a> · <a href="/wealth-affirmations/">Wealth</a> · <a href="/blog/">Blog</a> · <a href="/affirmation-cards/">Card Deck</a></p>
    <p style="margin-top:.75rem"><a href="/about/">About</a> · <a href="/contact/">Contact</a> · <a href="/privacy-policy/">Privacy Policy</a> · <a href="/terms/">Terms</a> · <a href="/sitemap/">Sitemap</a></p>
    <p style="margin-top:1rem">© 2026 MoneyAffirmations.co</p>
  </div>
</footer>
```

## Blog post structure (follow exactly)
1. H1 — exact/close keyword match
2. Visible date line immediately after H1 — use exact format:
   - Scheduled post: `<p class="post-meta" style="color:#8A8070;font-size:.85rem;margin-top:-.75rem;margin-bottom:1.75rem">Scheduled for [Month D, YYYY] · 07:00 UTC</p>`
   - Already-live post: `<p class="post-meta" style="color:#8A8070;font-size:.85rem;margin-top:-.75rem;margin-bottom:1.75rem">Published [Month D, YYYY]</p>`
   - GitHub Action auto-swaps "Scheduled for…" → "Published…" on publish day
3. Featured image (card.svg) — immediately after date line
4. Intro 120–150 words
5. H2: What are [topic] affirmations? — 100–150 words
6. H2: [N] [topic] affirmations — full numbered list (ol.affirmation-list)
7. H2: How to use these affirmations — 150–200 words
8. H2: [Additional depth H2] — 180–220 words (neuroscience, psychology, why it works, etc.)
9. H2: Tips to make them work faster — 5 bullets with bold lead words
10. H2: FAQ — 3 x <details><summary> items
11. Closing paragraph linking to parent collection
12. Author box — REQUIRED, place immediately before </article>:
```html
  <div class="author-box" style="margin-top:3rem;padding:1.25rem 1.5rem;border:1px solid rgba(201,168,76,.2);border-radius:8px">
    <p style="margin:0 0 .35rem;font-weight:600;color:#F8F2E4;font-size:.95rem">MoneyAffirmations.co</p>
    <p style="margin:0;font-size:.875rem;color:#8A8070;line-height:1.7">A resource dedicated to helping people build a healthier relationship with money through daily mindset practice, science-backed affirmations, and practical financial confidence tools.</p>
  </div>
```

## Featured image — every blog post MUST have one
- File: `/blog/[slug]/card.svg` — SVG, 1200×630 viewBox
- Placed in HTML immediately after the post-meta date line
- `<img src="card.svg" alt="[Post title] affirmation card" width="100%" style="border-radius:8px;margin-bottom:2rem;display:block">` — no fixed height
- og:image and twitter:image must use absolute URL: `https://moneyaffirmations.co/blog/[slug]/card.svg`
- Design: dark bg (#0D0C0A), gold border frame (#C9A84C), cream title (#F8F2E4), gold italic branding
- SVG template (adapt title text and line breaks per post):
```svg
<svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0D0C0A"/>
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#C9A84C" stroke-width="1.5" opacity="0.5"/>
  <polygon points="600,82 609,96 600,110 591,96" fill="#C9A84C" opacity="0.7"/>
  <text x="600" y="[y1]" text-anchor="middle" fill="#F8F2E4" font-family="Georgia,'Times New Roman',serif" font-size="[size]" font-weight="600">[Title line 1]</text>
  <text x="600" y="[y2]" text-anchor="middle" fill="#F8F2E4" font-family="Georgia,'Times New Roman',serif" font-size="[size]" font-weight="600">[Title line 2 if needed]</text>
  <text x="600" y="575" text-anchor="middle" fill="#C9A84C" font-family="Georgia,'Times New Roman',serif" font-size="26" font-style="italic">MoneyAffirmations.co</text>
</svg>
```
- Font size guide: 62px (≤35 chars), 54px (≤55 chars), 46px (≤75 chars), 40px (>75 chars)
- For 2-line titles at 46px: y1=270, y2=335. For single line: y=315

## Required <head> tags on every blog post — NEVER OMIT
Every blog post must include ALL of the following in <head>, in this order:

```html
<meta name="publish-date" content="YYYY-MM-DD">
<meta name="description" content="[150 chars max]">
<link rel="canonical" href="https://moneyaffirmations.co/blog/[slug]/">

<!-- SCHEDULED posts only — remove this line on already-live posts -->
<meta name="robots" content="noindex,nofollow">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:title" content="[Full post title]">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:url" content="https://moneyaffirmations.co/blog/[slug]/">
<meta property="og:site_name" content="MoneyAffirmations.co">
<meta property="og:image" content="https://moneyaffirmations.co/blog/[slug]/card.svg">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Full post title]">
<meta name="twitter:description" content="[Same as meta description]">
<meta name="twitter:image" content="https://moneyaffirmations.co/blog/[slug]/card.svg">

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

<!-- JSON-LD: FAQPage schema — must match actual FAQ <details> items exactly -->
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

<!-- GA4 — always include on every page -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-45V37Y4KCX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-45V37Y4KCX');
</script>
```

## Internal linking rules
- Money posts → /money-affirmations/
- Abundance/morning/LOA posts → /abundance-affirmations/ or /manifestation-affirmations/
- Wealth/investing/freedom posts → /wealth-affirmations/
- Prosperity/daily posts → /prosperity-affirmations/
- Every collection page links back to its blog posts

## Scheduling system
Each blog post has: `<meta name="publish-date" content="YYYY-MM-DD">`
GitHub Action runs 07:00 UTC daily. On publish day it:
1. Adds `data-published="true"` to `<body>`
2. Swaps "Scheduled for X · 07:00 UTC" → "Published X" in visible date line
3. Removes `<meta name="robots" content="noindex,nofollow">` from `<head>`
4. Adds the blog card to blog/index.html
5. Adds the URL to sitemap.xml

### CRITICAL scheduling rules — never break these:
- NEVER manually add scheduled/future posts to blog/index.html — the Action does this on publish day
- NEVER manually add scheduled/future posts to sitemap.xml — the Action does this on publish day
- ALL unpublished/scheduled posts MUST have `<meta name="robots" content="noindex,nofollow">` in <head>
- Do NOT set `<body data-published="true">` on scheduled posts — only already-live posts get this
- When committing a new scheduled post, only commit: the post's index.html and card.svg — nothing else
- Schedule posts 2 days apart minimum — check existing schedule before assigning a date

### After each post publishes:
- Manually submit the URL in Google Search Console (URL Inspection → Request Indexing)
- This gets it indexed same day vs waiting for Googlebot to discover it

## Revenue
1. Google AdSense (primary — GA4 ID: G-45V37Y4KCX)
2. Affiliates: YNAB, Acorns, Coinbase, money mindset books
3. Gumroad card deck: $9 → https://gumroad.com/l/money-affirmation-cards
4. Pinterest traffic via canvas story generator on homepage

## Priority keywords
- money affirmations (50k/mo, comp 15)
- abundance affirmations (5k/mo)
- wealth affirmations (5k/mo)
- money affirmations that work instantly (5k/mo, comp 7)
- morning affirmations for abundance (500/mo)

## All blog posts — status and schedule
### Published ✅
- 10-money-affirmations-that-really-work — 2026-04-20
- 7-most-powerful-money-affirmations — 2026-04-20
- affirmations-for-career-growth — 2026-04-20
- bob-proctor-affirmations-for-money — 2026-04-20
- how-to-use-money-affirmations — 2026-04-20
- how-to-write-money-affirmations — 2026-04-20
- louise-hay-abundance-affirmations — 2026-04-20
- what-are-money-affirmations — 2026-04-20
- 30-day-money-affirmation-journal — 2026-04-21
- daily-affirmations-for-money — 2026-04-21
- i-am-a-money-magnet — 2026-04-22
- money-affirmations-that-work-instantly — 2026-04-22
- law-of-attraction-affirmations-for-money — 2026-04-23
- morning-affirmations-for-abundance — 2026-04-23
- financial-freedom-affirmations — 2026-04-24
- affirmations-for-entrepreneurs — 2026-04-26
- affirmations-for-freelancers — 2026-04-27
- money-affirmations-for-women — 2026-04-27
- affirmations-for-investing — 2026-04-28
- affirmations-for-sales-confidence — 2026-04-28
- monday-affirmations-for-money — 2026-04-28
- friday-affirmations-for-money — 2026-04-30
- sleep-affirmations-for-wealth — 2026-05-02
- the-secret-money-affirmations — 2026-05-04
- money-mindset — 2026-05-06

### Scheduled 🕐 (noindex, not in blog index or sitemap yet)
- tuesday-affirmations — 2026-05-08 (published, Action ran ✅)
- money-and-abundance-affirmations — 2026-05-09 (published ✅)
- thursday-affirmations — 2026-05-10 (published ✅)
- prosperity-affirmations — 2026-05-11 (published ✅)
- manifesting-affirmations-for-money — 2026-05-12 (published ✅)
- powerful-money-affirmations — 2026-05-13
- money-comes-to-me-easily — 2026-05-14
- i-am-wealthy-affirmation — 2026-05-16
- financial-abundance-affirmations — 2026-05-18
- wealth-manifestation-affirmations — 2026-05-20
- morning-affirmations — 2026-05-22
- louise-hay-morning-affirmations — 2026-05-24
- gratitude-affirmations — 2026-05-26
- business-affirmations — 2026-05-28
- florence-scovel-shinn-affirmations — 2026-05-30
- manifestation-affirmations — 2026-06-01
- saturday-affirmations — 2026-06-03
- monday-morning-affirmations — 2026-06-05
- friday-morning-affirmations — 2026-06-07
- affirmation-for-financial-freedom — 2026-06-09 (wealth)
- affirmations-for-career-success — 2026-06-11 (money)
- success-and-wealth-affirmations — 2026-06-13 (wealth)
- 111-money-affirmations — 2026-06-15 (money)
- real-estate-affirmations — 2026-06-17 (wealth)
- affirmations-for-business-success — 2026-06-19 (money)
- money-spell-affirmations — 2026-06-21 (manifestation)
- financially-free-affirmations — 2026-06-23 (wealth)
- i-am-a-money-magnet-affirmation — 2026-06-25 (money)
- 369-affirmations-for-money — 2026-06-27 (manifestation)
- morning-gratitude-affirmations — 2026-06-29 (prosperity)
- tuesday-morning-affirmations — 2026-07-01 (prosperity)
- thursday-morning-affirmations — 2026-07-03 (prosperity)
- positive-affirmations-for-wealth-and-success — 2026-07-05 (wealth)
- affirmations-for-wealth-and-abundance — 2026-07-07 (wealth)
- money-affirmations-for-wealth-and-prosperity — 2026-07-09 (wealth)
- affirmations-for-success-and-wealth — 2026-07-11 (wealth)
- powerful-gratitude-affirmations — 2026-07-13 (prosperity)
- abundance-manifestation-affirmations — 2026-07-15 (manifestation)
- gratitude-money-affirmations — 2026-07-17 (prosperity)
- financial-mindset — 2026-07-19 (money)
- new-month-affirmations — 2026-07-21 (prosperity)
- new-week-affirmations — 2026-07-23 (prosperity)
- i-am-affirmations-for-wealth — 2026-07-25 (wealth)
- positive-affirmations-attract-money — 2026-07-27 (money)
- sales-affirmations — 2026-07-29 (money)
- abundance-affirmations-louise-hay — 2026-07-31 (abundance)
- law-of-attraction-affirmations — 2026-08-02 (manifestation)
- miracle-affirmations — 2026-08-04 (manifestation)
- affirmations-for-good-luck — 2026-08-06 (abundance)
- luck-affirmations — 2026-08-08 (abundance)
- positive-money-mindset — 2026-08-10 (money)

## Next blog posts to write (priority order)
- Next available date: 2026-08-12
1. Wednesday Affirmations
2. Weekend Affirmations
3. Positive Affirmations for Money
4. Affirmations for Debt-Free Living
5. Abundance Mindset Affirmations
6. Affirmations for Receiving Money

## Sitemap maintenance — CRITICAL
- sitemap.xml must contain EVERY live page: homepage, all collection pages, blog index, wallpapers, affirmation-cards, all utility pages, and ALL published blog posts
- The GitHub Action only adds scheduled posts on their publish day — it does NOT add manually published posts
- Any post committed with data-published="true" must be manually added to sitemap.xml in the same commit
- After any batch of posts, verify sitemap.xml with: grep -c "<loc>" sitemap.xml — count must match total live pages

## SEO checklist — verify before every commit
- [ ] meta description present (max 150 chars)
- [ ] canonical URL correct
- [ ] og:type, og:title, og:description, og:url, og:site_name present
- [ ] og:image pointing to absolute card.svg URL (https://moneyaffirmations.co/blog/[slug]/card.svg)
- [ ] twitter:card = summary_large_image, twitter:title, twitter:description, twitter:image present (same absolute URL)
- [ ] Article JSON-LD with correct datePublished
- [ ] FAQPage JSON-LD matching actual FAQ items exactly
- [ ] publish-date meta set
- [ ] noindex,nofollow on scheduled posts (remove on live posts)
- [ ] data-published="true" on body — ONLY for already-live posts, never scheduled
- [ ] card.svg exists in post directory
- [ ] Author box present before </article>
- [ ] GA4 snippet present
- [ ] Two-row footer with legal links

## How to add a new blog post (correct process)
1. Create /blog/[slug]/index.html following the blog post structure above
2. Create /blog/[slug]/card.svg following the SVG template above
3. Set `<meta name="publish-date" content="YYYY-MM-DD">` — pick a date 2 days after the last scheduled post
4. Set `<meta name="robots" content="noindex,nofollow">` — REQUIRED for all scheduled posts
5. Do NOT set data-published="true" — leave body tag as `<body>`
6. Do NOT add to blog/index.html or sitemap.xml — the Action handles this on publish day
7. Add GA4 snippet to <head>
8. Commit and push ONLY the new post's index.html and card.svg
9. Update the "Scheduled" list in this CLAUDE.md
10. After it publishes: submit URL in Google Search Console → URL Inspection → Request Indexing

## Git
- Repo: https://github.com/abjohansson/moneyaffirmations.co
- Branch: main
- Push via HTTPS (credentials stored)
- Always git pull --rebase before pushing to avoid conflicts with the publish Action
