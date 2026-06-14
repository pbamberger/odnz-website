/**
 * Scraper: donor.co.nz → Sanity
 *
 * Usage:
 *   node scripts/scrape.mjs                  # everything
 *   node scripts/scrape.mjs --dry-run        # parse only, no writes
 *   node scripts/scrape.mjs --stories-only
 *   node scripts/scrape.mjs --healthcare-only
 *   node scripts/scrape.mjs --pages-only
 *   node scripts/scrape.mjs --media-only
 */

import { readFileSync } from 'fs'
import { createClient } from '@sanity/client'
import { parse as parseHtml } from 'node-html-parser'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BASE = 'https://www.donor.co.nz'
const DRY_RUN = process.argv.includes('--dry-run')
const STORIES_ONLY = process.argv.includes('--stories-only')
const HEALTHCARE_ONLY = process.argv.includes('--healthcare-only')
const PAGES_ONLY = process.argv.includes('--pages-only')
const MEDIA_ONLY = process.argv.includes('--media-only')
const DELAY_MS = 500

const envText = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
const env = Object.fromEntries(
  envText.split('\n')
    .filter(l => l.trim() && !l.startsWith('#') && l.includes('='))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)

const sanity = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// URL lists
// ---------------------------------------------------------------------------

const FEATURED_STORIES = [
  '/donation-stories/featured-stories/wikitorias-story/',
  '/donation-stories/featured-stories/ambers-story/',
  '/donation-stories/featured-stories/ashleys-story/',
  '/donation-stories/featured-stories/jess-story/',
]

const RECIPIENT_STORIES = [
  '/donation-stories/donation-recipient-stories/stuarts-story/',
  '/donation-stories/donation-recipient-stories/a-life-changing-kidney/',
  '/donation-stories/donation-recipient-stories/coast-to-coaster-shares-her-heart-transplant-journey/',
  '/donation-stories/donation-recipient-stories/donation-makes-yesterday-today-and-tomorrow-possible-for-lung-transplant-recipient/',
  '/donation-stories/donation-recipient-stories/jacks-story/',
  '/donation-stories/donation-recipient-stories/lisas-story/',
  '/donation-stories/donation-recipient-stories/annettes-story/',
  '/donation-stories/donation-recipient-stories/martins-story/',
  '/donation-stories/donation-recipient-stories/chriss-story/',
  '/donation-stories/donation-recipient-stories/dorothys-story/',
  '/donation-stories/donation-recipient-stories/eions-story/',
  '/donation-stories/donation-recipient-stories/elizabeths-story/',
  '/donation-stories/donation-recipient-stories/braedons-story/',
  '/donation-stories/donation-recipient-stories/aylas-story/',
  '/donation-stories/donation-recipient-stories/christines-story/',
  '/donation-stories/donation-recipient-stories/jareds-story/',
  '/donation-stories/donation-recipient-stories/elliots-story/',
  '/donation-stories/donation-recipient-stories/ezras-story/',
  '/donation-stories/donation-recipient-stories/rubys-story/',
  '/donation-stories/donation-recipient-stories/joannas-story/',
  '/donation-stories/donation-recipient-stories/justins-story/',
  '/donation-stories/donation-recipient-stories/nevilles-story/',
  '/donation-stories/donation-recipient-stories/adeles-story/',
  '/donation-stories/donation-recipient-stories/teshs-story/',
  '/donation-stories/donation-recipient-stories/tracys-story/',
  '/donation-stories/donation-recipient-stories/susans-story/',
  '/donation-stories/donation-recipient-stories/jessicas-story/',
  '/donation-stories/donation-recipient-stories/helenas-story/',
  '/donation-stories/donation-recipient-stories/rochelles-story/',
  '/donation-stories/donation-recipient-stories/alans-story/',
  '/donation-stories/donation-recipient-stories/sues-story/',
  '/donation-stories/donation-recipient-stories/wiremus-story/',
  '/donation-stories/donation-recipient-stories/marcellas-story/',
  '/donation-stories/donation-recipient-stories/kerrys-story/',
  '/donation-stories/donation-recipient-stories/cliffords-story/',
  '/donation-stories/donation-recipient-stories/kidneys-25-years-life-saver-for-anita/',
  '/donation-stories/donation-recipient-stories/new-heart-new-outlook-on-life/',
  '/donation-stories/donation-recipient-stories/transplant-boosts-oscars-sight/',
  '/donation-stories/donation-recipient-stories/celebrating-ten-years-post-transplant/',
  '/donation-stories/donation-recipient-stories/slow-road-to-recovery/',
  '/donation-stories/donation-recipient-stories/the-precious-gift-of-time/',
  '/donation-stories/donation-recipient-stories/kirstys-story/',
  '/donation-stories/donation-recipient-stories/giving-the-gift-of-sight/',
  '/donation-stories/donation-recipient-stories/gabbys-story/',
  '/donation-stories/donation-recipient-stories/four-magical-words/',
  '/donation-stories/donation-recipient-stories/olivers/',
  '/donation-stories/donation-recipient-stories/donating-daughters-organs-an-expression-of-aroha/',
  '/donation-stories/donation-recipient-stories/if-you-cant-breathe-nothing-else-matters/',
  '/donation-stories/donation-recipient-stories/my-heart-transplant-experience/',
  '/donation-stories/donation-recipient-stories/new-years-honours-recipient-gets-second-chance-to-keep-serving-those-in-need/',
  '/donation-stories/donation-recipient-stories/how-strangers-gave-me-sight-dianas-story/',
]

const ICU_GUIDELINES = [
  { path: '/healthcare-professionals/intensive-care-unit-guidelines/1-introduction/', chapter: 1 },
  { path: '/healthcare-professionals/intensive-care-unit-guidelines/2-organ-and-tissue-donation/', chapter: 2 },
  { path: '/healthcare-professionals/intensive-care-unit-guidelines/3-donation-after-brain-death-dbd/', chapter: 3 },
  { path: '/healthcare-professionals/intensive-care-unit-guidelines/4-physiological-support-after-brain-death/', chapter: 4 },
  { path: '/healthcare-professionals/intensive-care-unit-guidelines/5-donation-after-circulatory-death-dcd/', chapter: 5 },
  { path: '/healthcare-professionals/intensive-care-unit-guidelines/6-tissue-only-donation/', chapter: 6 },
  { path: '/healthcare-professionals/intensive-care-unit-guidelines/7-discussion-of-donation-with-the-family/', chapter: 7 },
  { path: '/healthcare-professionals/intensive-care-unit-guidelines/8-general-issues/', chapter: 8 },
  { path: '/healthcare-professionals/intensive-care-unit-guidelines/9-appendices/', chapter: 9 },
]

const ED_GUIDELINES = [
  { path: '/healthcare-professionals/emergency-department-guidelines/1-introduction/', chapter: 1 },
  { path: '/healthcare-professionals/emergency-department-guidelines/2-principles-of-icu-admission-for-organ-donation/', chapter: 2 },
  { path: '/healthcare-professionals/emergency-department-guidelines/3-identification-of-a-potential-donor/', chapter: 3 },
  { path: '/healthcare-professionals/emergency-department-guidelines/4-assessment-of-the-potential-for-organ-donation/', chapter: 4 },
  { path: '/healthcare-professionals/emergency-department-guidelines/5-discussion-with-the-family/', chapter: 5 },
  { path: '/healthcare-professionals/emergency-department-guidelines/6-tissue-only-donation/', chapter: 6 },
]

const OT_GUIDELINES = [
  { path: '/healthcare-professionals/operating-theatre-guidelines/1-introduction/', chapter: 1 },
  { path: '/healthcare-professionals/operating-theatre-guidelines/2-organ-and-tissue-donation/', chapter: 2 },
  { path: '/healthcare-professionals/operating-theatre-guidelines/3-donation-after-brain-death-dbd/', chapter: 3 },
  { path: '/healthcare-professionals/operating-theatre-guidelines/4-organ-and-tissue-dbd-operating-theatre-staff/', chapter: 4 },
  { path: '/healthcare-professionals/operating-theatre-guidelines/5-organ-and-tissue-dbd-anaesthetic-staff/', chapter: 5 },
  { path: '/healthcare-professionals/operating-theatre-guidelines/6-understanding-dcd/', chapter: 6 },
]

const STANDARD_PAGES = [
  { path: '/about-odnz/', slug: 'about-odnz', title: 'About ODNZ' },
  { path: '/facts-and-myths/', slug: 'facts-and-myths', title: 'Facts and Myths' },
  { path: '/facts-and-myths/statistics/', slug: 'facts-and-myths-statistics', title: 'Statistics' },
  { path: '/facts-and-myths/myths/', slug: 'facts-and-myths-myths', title: 'Myths about Organ Donation' },
  { path: '/facts-and-myths/faqs/', slug: 'facts-and-myths-faqs', title: 'FAQs' },
  { path: '/have-the-conversation-today/', slug: 'have-the-conversation-today', title: 'Have the Conversation Today' },
  { path: '/thank-you-day/', slug: 'thank-you-day', title: 'Thank You Day' },
  { path: '/knowledge-centre/', slug: 'knowledge-centre', title: 'Knowledge Centre' },
  { path: '/knowledge-centre/guide-for-recipients-writing-to-the-donor-family/', slug: 'guide-for-recipients-writing-to-donor-family', title: 'Guide for Recipients Writing to the Donor Family' },
  { path: '/knowledge-centre/guide-for-donor-families-writing-to-recipients/', slug: 'guide-for-donor-families-writing-to-recipients', title: 'Guide for Donor Families Writing to Recipients' },
  { path: '/knowledge-centre/eye-tissue-donation-awareness-week/', slug: 'eye-tissue-donation-awareness-week', title: 'Eye Tissue Donation Awareness Week' },
  { path: '/national-kidney-month/', slug: 'national-kidney-month', title: 'National Kidney Month' },
  { path: '/contact-us/', slug: 'contact-us', title: 'Contact Us' },
  { path: '/privacy-policy/', slug: 'privacy-policy', title: 'Privacy Policy' },
  { path: '/healthcare-professionals/documents-and-forms/', slug: 'healthcare-documents-and-forms', title: 'Documents and Forms' },
  { path: '/healthcare-professionals/contact-us/', slug: 'healthcare-contact-us', title: 'Healthcare Contact Us' },
  { path: '/healthcare-professionals/how-do-i-bookmark/', slug: 'healthcare-how-do-i-bookmark', title: 'How Do I Bookmark?' },
]

const MEDIA_ARTICLES = [
  '/media-centre/dr-stephen-streat-its-crucial-to-get-process-right/',
  '/media-centre/organ-donation-faces-at-the-front-line/',
  '/media-centre/organ-donation-series-familys-gifts-of-life-bring-comfort-after-death/',
  '/media-centre/organ-donation-series-heartfelt-thanks-for-a-new-life/',
  '/media-centre/organ-donation-new-zealand-release-annual-report/',
  '/media-centre/grateful-for-the-gift-of-life/',
  '/media-centre/organ-recipients-spread-message/',
  '/media-centre/coffee-to-spark-talk-on-organ-donations/',
  '/media-centre/transplant-girls-tryathlon-triumph/',
  '/media-centre/recipients-relish-round-the-bays-milestone/',
  '/media-centre/living-life-on-high/',
  '/media-centre/one-familys-personal-journey/',
  '/media-centre/trelise-coopers-support-for-organ-donation-awareness/',
  '/media-centre/car-show-payback-for-lungs-recipient/',
  '/media-centre/donor-awareness-a-lifesaver/',
  '/media-centre/top-fashion-designer-says-thank-you-to-donor-families/',
  '/media-centre/high-flying-kidneys-a-historic-first/',
  '/media-centre/recipients-say-thanks-for-transplant-organs/',
  '/media-centre/new-resources-to-raise-awareness-of-organ-donation-in-schools/',
  '/media-centre/raising-awareness-at-stadium-stomp/',
  '/media-centre/annual-report-2016/',
  '/media-centre/organ-donations-doubled-in-last-five-years/',
  '/media-centre/annual-report-2017/',
  '/media-centre/annual-report-2018/',
  '/media-centre/kiwi-athletes-celebrating-second-chance-at-life-at-world-transplant-games/',
  '/media-centre/transplant-recipient-diane-remembered-at-auckland-marathon-event/',
  '/media-centre/thank-you-day-2018/',
  '/media-centre/annual-report-2019/',
  '/media-centre/deceased-organ-donation-on-the-rise-in-new-zealand/',
  '/media-centre/new-zealand-blood-service-welcomes-organ-donation-new-zealand/',
  '/media-centre/media-guidelines/',
  '/media-centre/annual-report-2020/',
  '/media-centre/the-significance-of-having-the-donation-conversation/',
  '/media-centre/annual-report-2021/',
  '/media-centre/thank-you-day-2022/',
  '/media-centre/national-kidney-month-2023/',
  '/media-centre/organ-donation-saved-184-lives-last-year-in-new-zealand/',
  '/media-centre/organ-and-tissue-donors-saved-hundreds-of-lives-in-2023/',
  '/media-centre/assisted-dying-donation/',
  '/media-centre/christchurch-thanksgiving-2025-livestream/',
  '/media-centre/annual-activity-report-2024/',
  '/media-centre/thanksgiving-services-2026/',
  '/media-centre/organ-donation-nz-calls-for-life-saving-conversations-during-kidney-awareness-month/',
  '/media-centre/odnz-annual-report-archive/',
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fetchHtml(path) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'ODNZ-Rebuild-Scraper/1.0 (content migration)' }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.text()
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const delay = ms => new Promise(r => setTimeout(r, ms))

function resolveImageUrl(src) {
  if (!src) return null
  const abs = src.startsWith('http') ? src : `${BASE}${src}`
  const clean = abs.replace(/__[A-Za-z]+[A-Za-z0-9+/=]*(\.[a-z]+)$/i, '$1')
  return clean !== abs ? clean : abs
}

async function downloadImage(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'ODNZ-Rebuild-Scraper/1.0' } })
    if (!res.ok) throw new Error(`${res.status}`)
    return { buffer: Buffer.from(await res.arrayBuffer()), url }
  } catch (err) {
    console.warn(`  ⚠ Image download failed (${url}): ${err.message}`)
    return null
  }
}

async function uploadImage(url, filename) {
  if (DRY_RUN) return { _type: 'reference', _ref: 'dry-run-asset' }
  // Try cleaned URL first, fall back to original
  const cleanUrl = resolveImageUrl(url)
  const originalUrl = url.startsWith('http') ? url : `${BASE}${url}`
  const result = await downloadImage(cleanUrl) || await downloadImage(originalUrl)
  if (!result) return null
  const ext = (result.url.split('.').pop()?.split('?')[0] || 'jpg').toLowerCase()
  const mime = ext === 'png' ? 'image/png' : ext === 'gif' ? 'image/gif' : 'image/jpeg'
  const asset = await sanity.assets.upload('image', result.buffer, {
    filename: filename || `image.${ext}`,
    contentType: mime,
  })
  return { _type: 'reference', _ref: asset._id }
}

function textToBlocks(paragraphs) {
  return paragraphs
    .filter(p => p.trim().length > 0)
    .map(text => ({
      _type: 'block',
      _key: Math.random().toString(36).slice(2, 10),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text: text.trim(), marks: [] }],
    }))
}

function extractContent(root) {
  // Try SilverStripe content containers in priority order
  const contentEl = root.querySelector('.typography') ||
    root.querySelector('[class*="content-body"]') ||
    root.querySelector('[class*="article"]') ||
    root.querySelector('article') ||
    root.querySelector('main') ||
    root

  const title = root.querySelector('h1')?.text.trim() || ''

  const quoteEl = root.querySelector('blockquote') ||
    root.querySelector('[class*="quote"]') ||
    root.querySelector('[class*="pullquote"]')
  const quote = quoteEl?.text.trim().replace(/^[""“”]|[""“”]$/g, '').trim() || ''

  // Hero image: first asset image that isn't a tiny thumbnail or logo
  const heroImg = root.querySelectorAll('img').find(img => {
    const src = img.getAttribute('src') || ''
    return src.includes('/assets/') && !src.includes('logo') && !src.includes('icon') && !src.includes('thumb')
  }) || root.querySelectorAll('img').find(img => (img.getAttribute('src') || '').includes('/assets/'))

  const imageSrc = heroImg?.getAttribute('src') || null
  const imageAlt = heroImg?.getAttribute('alt') || title

  const paragraphs = contentEl.querySelectorAll('p')
    .map(p => p.text.trim())
    .filter(t => t.length > 20 && !t.includes('Back to') && !t.includes('©') && !t.includes('bookmark'))

  return { title, quote, imageSrc, imageAlt, paragraphs }
}

function extractStructuredBlocks(root) {
  const contentEl = root.querySelector('.typography') ||
    root.querySelector('article') ||
    root.querySelector('main') ||
    root

  const blocks = []
  for (const node of contentEl.querySelectorAll('h2, h3, h4, p, li')) {
    const text = node.text.trim()
    if (!text || text.length < 5) continue
    if (text.includes('Back to') || text.includes('©') || text.includes('bookmark')) continue
    const tag = node.tagName?.toLowerCase()
    const style = tag === 'h2' ? 'h2' : tag === 'h3' ? 'h3' : tag === 'h4' ? 'h4' : 'normal'
    blocks.push({
      _type: 'block',
      _key: Math.random().toString(36).slice(2, 10),
      style,
      markDefs: [],
      children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
    })
  }
  return blocks
}

// ---------------------------------------------------------------------------
// Scrapers
// ---------------------------------------------------------------------------

async function scrapeStory(path, role) {
  console.log(`  Fetching ${path}`)
  const html = await fetchHtml(path)
  const root = parseHtml(html)
  const { title, quote, imageSrc, imageAlt, paragraphs } = extractContent(root)
  const slug = slugify(title.replace(/['']s Story$/i, '').replace(/['']s$/i, '') || path.split('/').filter(Boolean).pop())
  return { title: title || slug, slug, role, quote, imageSrc, imageAlt, paragraphs }
}

async function scrapeHealthcarePage(path, chapter, section) {
  console.log(`  Fetching ${path}`)
  const html = await fetchHtml(path)
  const root = parseHtml(html)
  const title = root.querySelector('h1')?.text.trim() || `Chapter ${chapter}`
  const blocks = extractStructuredBlocks(root)

  const contentEl = root.querySelector('.typography') || root.querySelector('main') || root
  const fileLinks = contentEl.querySelectorAll('a[href$=".pdf"], a[href$=".docx"], a[href$=".xlsx"]')
  const downloadableFiles = fileLinks.map(a => ({
    label: a.text.trim() || a.getAttribute('href').split('/').pop(),
    url: a.getAttribute('href').startsWith('http') ? a.getAttribute('href') : `${BASE}${a.getAttribute('href')}`,
  }))

  const slug = path.split('/').filter(Boolean).slice(-2).join('-')
  return { title, slug, chapter, section, blocks, downloadableFiles }
}

async function scrapePage(path, fallbackSlug, fallbackTitle) {
  console.log(`  Fetching ${path}`)
  const html = await fetchHtml(path)
  const root = parseHtml(html)
  const { title, paragraphs } = extractContent(root)
  const blocks = extractStructuredBlocks(root)
  const slug = fallbackSlug || slugify(title || path.split('/').filter(Boolean).pop())
  return { title: title || fallbackTitle || slug, slug, blocks }
}

// ---------------------------------------------------------------------------
// Sanity writes
// ---------------------------------------------------------------------------

async function upsertStory(data) {
  const { title, slug, role, quote, imageSrc, imageAlt, paragraphs } = data
  console.log(`  → "${title}" (${role})`)
  if (!quote) console.warn(`    ⚠ No quote found`)

  let portraitRef = null
  if (imageSrc) {
    const absUrl = imageSrc.startsWith('http') ? imageSrc : `${BASE}${imageSrc}`
    console.log(`    Uploading image: ${resolveImageUrl(absUrl)}`)
    portraitRef = await uploadImage(absUrl, absUrl.split('/').pop())
  }

  const doc = {
    _id: `story-${slug}`,
    _type: 'story',
    title,
    slug: { _type: 'slug', current: slug },
    role,
    quote: quote || `Read ${title}.`,
    publishedAt: new Date().toISOString(),
    body: textToBlocks(paragraphs),
    ...(portraitRef && {
      portrait: { _type: 'image', asset: portraitRef, hotspot: { x: 0.5, y: 0.3, height: 0.6, width: 1 } }
    }),
  }

  if (DRY_RUN) { console.log(`    [dry-run] story-${slug}`); return }
  await sanity.createOrReplace(doc)
  console.log(`    ✓ Saved story-${slug}`)
}

async function upsertHealthcarePage(data) {
  const { title, slug, chapter, section, blocks, downloadableFiles } = data
  console.log(`  → [${section}] Ch.${chapter}: "${title}"`)

  const doc = {
    _id: `healthcare-${section}-${slug}`,
    _type: 'healthcarePage',
    title,
    slug: { _type: 'slug', current: `${section}-${slug}` },
    section,
    chapterOrder: chapter,
    body: blocks,
    downloadableFiles: downloadableFiles.map(f => ({
      _key: Math.random().toString(36).slice(2, 10),
      label: f.label,
      url: f.url,
    })),
  }

  if (DRY_RUN) { console.log(`    [dry-run] healthcare-${section}-${slug}`); return }
  await sanity.createOrReplace(doc)
  console.log(`    ✓ Saved healthcare-${section}-${slug}`)
}

async function upsertPage(data) {
  const { title, slug, blocks } = data
  console.log(`  → "${title}" → page-${slug}`)

  const doc = {
    _id: `page-${slug}`,
    _type: 'page',
    title,
    slug: { _type: 'slug', current: slug },
    body: blocks,
  }

  if (DRY_RUN) { console.log(`    [dry-run] page-${slug}`); return }
  await sanity.createOrReplace(doc)
  console.log(`    ✓ Saved page-${slug}`)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function run(label, items, fn) {
  console.log(`\n── ${label} (${items.length}) ──`)
  let errors = 0
  for (const item of items) {
    try { await fn(item) } catch (err) { console.error(`  ✗ ${JSON.stringify(item)}: ${err.message}`); errors++ }
    await delay(DELAY_MS)
  }
  return errors
}

async function main() {
  console.log(`\n🔄 ODNZ Scraper ${DRY_RUN ? '(DRY RUN)' : ''}`)
  console.log(`   Project: ${env.NEXT_PUBLIC_SANITY_PROJECT_ID} / ${env.NEXT_PUBLIC_SANITY_DATASET}\n`)

  let errors = 0

  if (!HEALTHCARE_ONLY && !PAGES_ONLY && !MEDIA_ONLY) {
    errors += await run('Featured stories', FEATURED_STORIES, async path => {
      await upsertStory(await scrapeStory(path, 'donor'))
    })
    errors += await run('Recipient stories', RECIPIENT_STORIES, async path => {
      await upsertStory(await scrapeStory(path, 'recipient'))
    })
  }

  if (!STORIES_ONLY && !PAGES_ONLY && !MEDIA_ONLY) {
    errors += await run('ICU Guidelines', ICU_GUIDELINES, async ({ path, chapter }) => {
      await upsertHealthcarePage(await scrapeHealthcarePage(path, chapter, 'icu-guidelines'))
    })
    errors += await run('Emergency Department Guidelines', ED_GUIDELINES, async ({ path, chapter }) => {
      await upsertHealthcarePage(await scrapeHealthcarePage(path, chapter, 'emergency-department'))
    })
    errors += await run('Operating Theatre Guidelines', OT_GUIDELINES, async ({ path, chapter }) => {
      await upsertHealthcarePage(await scrapeHealthcarePage(path, chapter, 'operating-theatre'))
    })
  }

  if (!STORIES_ONLY && !HEALTHCARE_ONLY && !MEDIA_ONLY) {
    errors += await run('Standard pages', STANDARD_PAGES, async ({ path, slug, title }) => {
      await upsertPage(await scrapePage(path, slug, title))
    })
  }

  if (!STORIES_ONLY && !HEALTHCARE_ONLY && !PAGES_ONLY) {
    errors += await run('Media Centre articles', MEDIA_ARTICLES, async path => {
      const data = await scrapePage(path, null, null)
      // Prefix slug to avoid collisions
      data.slug = `media-${data.slug}`
      data._id = `page-${data.slug}`
      await upsertPage(data)
    })
  }

  console.log(`\n✅ Done. ${errors} error(s).`)
}

main().catch(err => { console.error(err); process.exit(1) })
