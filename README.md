# Kyvorn

A custom-built, headless Next.js storefront for Kyvorn — an apparel brand
built on a T-12 spinal fracture, a week of paralysis, and the walk back
through a sprint triathlon, a marathon, and an ultramarathon. Commerce is
powered by the Shopify Storefront API (GraphQL); this is not a Shopify
theme.

The site runs on **mock data out of the box** — every page, the cart, and
checkout flow are fully built and browsable with zero Shopify setup. Drop
real Storefront API credentials into `.env.local` and it switches to live
data automatically, no code changes required.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Shopify Storefront API via hand-rolled GraphQL queries (`graphql-request`)
- Cart mutations run through Next.js Server Actions; cart id (or, in mock
  mode, the whole mock cart) is persisted in a cookie
- `next/image` for all imagery, including Shopify CDN photos

## Project structure

```
app/                    Routes (App Router)
  page.tsx              Home
  shop/page.tsx          Shop (grid + filters)
  shop/[handle]/page.tsx  Product detail
  story/page.tsx          Brand story / timeline
  contact/page.tsx        Contact + shipping/returns FAQ
components/
  layout/                Header, footer, mobile nav
  cart/                   Cart context, drawer, line items
  home/                   Homepage sections
  shop/                   Product grid, cards, filters, skeletons
  product/                Gallery, variant/quantity picker, related products
  story/                  Timeline
  contact/                Contact form
  ui/                     Buttons, headings, icons, scroll-reveal, placeholders
lib/
  shopify/
    config.ts             Env var reads + isShopifyConfigured flag
    client.ts              graphql-request client
    queries.ts              GraphQL query/mutation strings
    types.ts                 Flattened Storefront API types
    reshape.ts                edges/node → flat array helpers
    products.ts                getProducts / getProductByHandle / getCollectionByHandle / getRelatedProducts
    cart.ts                     Real + mock cart transforms
    actions.ts                   Server Actions (cookie-backed) used by the client cart
    mock-data.ts                  Placeholder catalog, shaped exactly like the real types
  utils.ts                cn() + formatMoney()
  categories.ts           Category ↔ tag mapping for /shop filters
  nav.ts                  Shared nav link list
public/
  brand/                 Logo lockups and mark variants
  photos/                Stock-style atmosphere photography (hero, training)
  products/              Placeholder product art (swapped out by real Shopify photos)
  textures/               Grain/topo/grid SVG textures used in the design system
```

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. With no `.env.local`, the whole site — shop,
product pages, cart, checkout button state — runs on the mock catalog in
`lib/shopify/mock-data.ts`.

## Connecting a real Shopify store

1. **Create a Storefront API access token.**
   In your Shopify admin: **Settings → Apps and sales channels → Develop
   apps → Create an app**. Give it a name, then under **Configuration →
   Storefront API** enable at minimum:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_write_checkouts` / cart scopes (cart create/update)
   Install the app, then copy the **Storefront API access token** from the
   API credentials tab.

2. **Set up store data:**
   - Add products with the **Product type** or **tags** `t-shirt`, `hoodie`,
     or `hat` (lowercase, singular) — the `/shop` category filter reads
     these tags directly via `tag:` query filters.
   - Create a collection with the handle `featured` (or set
     `SHOPIFY_FEATURED_COLLECTION_HANDLE` to whatever handle you use) and
     add your best-sellers to it — this powers the homepage's featured grid.
   - Each product should have a `Size` option (and any others you want,
     e.g. `Color`) with variants for each combination, and product images
     uploaded per variant/product as usual.

3. **Fill in environment variables.** Copy `.env.example` to `.env.local`
   and set:
   ```
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxx...
   SHOPIFY_STOREFRONT_API_VERSION=2024-10
   SHOPIFY_FEATURED_COLLECTION_HANDLE=featured
   ```
   Restart the dev server. The site now reads and mutates real Shopify
   data — cart mutations create a real Shopify cart, and the drawer's
   Checkout button hands off to Shopify's hosted checkout URL.

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it in Vercel.
3. Add the same environment variables from `.env.example` in the Vercel
   project's **Settings → Environment Variables**.
4. Deploy. No build configuration changes are needed — it's a standard
   Next.js App Router project.

## Notes on placeholders

- **Product photography** (`public/products/*.svg`) is on-brand placeholder
  art, not real garments — each is clearly labeled "Sample — Photo Pending"
  in the corner. Real photos arrive automatically once products with
  Shopify-hosted images are connected.
- **Social proof photos** on the homepage (race/finisher shots) are styled
  placeholder blocks marked "Photo Pending" — swap `components/home/SocialProof.tsx`
  once real race photography exists.
- **Newsletter and contact forms** are functional client-side stubs (they
  confirm submission in the UI) but aren't wired to a real email service
  yet. Hook `components/layout/NewsletterForm.tsx` up to Shopify's
  `customerCreate` mutation or an ESP (Klaviyo, Mailchimp), and
  `components/contact/ContactForm.tsx` up to a form backend (a Next.js
  route handler that sends mail, Formspree, Resend, etc.) before launch.
- **Brand assets** in `public/brand/` are the real Kyvorn logo lockups
  supplied for this build (the spine/hardware "K" mark, the mountain-peak
  "K" mark, and wordmark variants) — no placeholder logos were used.

## Design system

- Palette: near-black (`ink` `#0a0a0a`) and charcoal surfaces, bone/off-white
  text (`#e8e6e0`), with a rust/blood-orange accent (`#c2410c`) reserved for
  CTAs and key emphasis.
- Headlines set in Bebas Neue, body copy in Inter, both loaded via
  `next/font/google`.
- Angular clip-path dividers, fine grid/topo-line textures, and a subtle
  grain overlay stand in for the "dark industrial / tactical" motifs called
  for in the brief — deliberately no rounded cards or soft shadows.
- Scroll reveals are a small custom `IntersectionObserver` wrapper
  (`components/ui/Reveal.tsx`) — no animation library — and respect
  `prefers-reduced-motion`.
