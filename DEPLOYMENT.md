# Deployment guide — Celine Beaumont theme

This is a Shopify Online Store 2.0 theme built on top of Shopify's Dawn reference
theme, heavily reskinned and extended for Celine Beaumont (celinebeaumont.com).

## 1. Preview and publish

### Option A — Shopify CLI (recommended for local iteration)

1. Install the Shopify CLI if you don't have it: `npm install -g @shopify/cli`
2. From the repo root, run a local preview against your store:
   ```
   shopify theme dev --store=<your-store>.myshopify.com
   ```
   Replace `<your-store>.myshopify.com` with the store's real `.myshopify.com`
   handle (not known at the time this theme was built). This opens a live
   preview that hot-reloads as you edit theme files.
3. When you're happy with it, push it to the store as a new, unpublished theme:
   ```
   shopify theme push --unpublished --store=<your-store>.myshopify.com
   ```
   This uploads a new theme in Admin > Online Store > Themes without touching
   the live theme. Preview it, then publish it from Admin when ready.

### Option B — Connect from GitHub (no local CLI needed)

In Shopify Admin, go to **Online Store > Themes > Add theme > Connect from
GitHub**, authorize access to this repository, and select the `main` branch.
Shopify will keep the connected theme in sync with this branch and let you
preview/publish from Admin directly.

## 2. Manual admin follow-ups (required before launch)

This theme is code-complete, but a number of things are store-configuration,
not theme code, and need to be done in Shopify Admin:

### Navigation
- Create a **Main menu** (handle `main-menu`) with: Home, Dresses, T-Shirts,
  Sweaters, Pants, Jackets, Shoes, Sale. The "Sale" item automatically renders
  in the gold accent color if its URL contains `/sale` or
  `/collections/sale`.
- Create three **footer menus** with these exact handles (the footer section
  is already wired to them):
  - `footer-shop` — Dresses / Jackets / Sweaters / Sale
  - `footer-help` — Shipping & returns / Size guide / Contact us
  - `footer-about` — Our story / Sustainability / Contact us
- The header's "Contact" and "Track your order" utility links point at
  `/pages/contact` and the customer account page by default — create a
  Contact page (handle `contact`) if one doesn't exist yet.

### French (Canadian) localization
- **Enable French as a published language**: Admin > Settings > Languages >
  Add language > French. The theme's native language switcher (in the
  announcement bar, powered by Dawn's built-in localization form) has nothing
  to switch to until this is done.
- `locales/fr.json` and `locales/fr.schema.json` contain complete French
  translations for every runtime string this theme adds (cart messages,
  accessibility labels, product page copy, trust strip, bundle selector,
  breadcrumb, etc.) — these work automatically once French is enabled, no
  further action needed.
- **Important distinction on JSON template content**: Shopify's `t:`
  translation-key mechanism only resolves inside `{% schema %}` blocks
  (setting labels and default values) and inside Liquid `{{ 'x' | t }}` calls
  in the theme's `.liquid` files — both of which this theme uses correctly
  and are fully bilingual out of the box. It does **not** resolve inside the
  literal content merchants/developers type directly into JSON templates
  (e.g. the homepage hero heading, FAQ answers, About page copy in
  `templates/index.json`, `templates/product.json`, `templates/page.about.json`,
  and the announcement bar / footer menu headings in
  `sections/header-group.json` / `sections/footer-group.json`). That content
  is currently English-only. To get it into French, use Shopify's built-in
  **Translate & Adapt** app (free, from the Shopify App Store) once French is
  enabled — it detects every translatable field in these templates and lets
  you paste in a translation. The complete French copy for all of this
  content is included below so it can be pasted straight in:

  <details>
  <summary>French copy for JSON template content (click to expand)</summary>

  **Homepage**
  - Hero eyebrow: "La collection automnale"
  - Hero heading: "Une élégance simple, au quotidien"
  - Hero subcopy: "Des pièces intemporelles, taillées pour durer — conçues et fabriquées à Toronto."
  - Hero CTA 1: "Découvrir la collection" · CTA 2: "Notre histoire"
  - USP strip: "Livraison gratuite au Canada" / "Sur toutes les commandes" ·
    "Matières durables" / "Sourcées de façon responsable" ·
    "Retours faciles sous 30 jours" / "Sans tracas" ·
    "4,9 / 5 · 2 400+ avis" / "Adorée par nos clientes"
  - Category grid eyebrow: "Magasiner par catégorie" · Heading: "La garde-robe"
  - Promise eyebrow: "Notre promesse" · Heading: "Une qualité que l'on ressent, une coupe qui reste"
  - Promise body: "Chaque pièce Celine Beaumont est fabriquée en petites séries, à partir de matières naturelles et sourcées de façon responsable, coupées et finies à la main dans notre atelier de Toronto. Nous croyons qu'un bon vêtement doit durer — dans sa confection, son confort et son style." · CTA: "En savoir plus"
  - New arrivals eyebrow: "Nouveautés" · Heading: "Les nouveautés de la semaine" · "View all" link: "Tout voir"
  - Reviews eyebrow: "Ce que disent nos clientes"
  - Newsletter heading: "Rejoignez le cercle Celine Beaumont" · Subcopy: "Inscrivez-vous pour un accès en avant-première aux nouvelles collections et 10 % de rabais sur votre première commande."
  - FAQ eyebrow: "Besoin d'aide?" · Heading: "Questions fréquentes"
  - FAQ footer: "Vous avez une autre question? Contactez-nous · info@celinebeaumont.com"
  - FAQ Q1: "Offrez-vous la livraison gratuite?" / "Oui — nous offrons la livraison gratuite sur toutes les commandes canadiennes, sans minimum d'achat. Les commandes sont expédiées sous 1 à 2 jours ouvrables."
  - FAQ Q2: "Quelle est votre politique de retour?" / "Nous acceptons les retours faciles sous 30 jours pour la plupart des articles. Quelques pièces en vente finale sont clairement indiquées avant l'achat."
  - FAQ Q3: "Comment puis-je suivre ma commande?" / "Dès que votre commande est expédiée, vous recevrez un courriel avec un lien de suivi pour la suivre à chaque étape."
  - FAQ Q4: "Quels modes de paiement acceptez-vous?" / "Nous acceptons toutes les grandes cartes de crédit, Apple Pay, Google Pay, PayPal, Shop Pay et plus — tout est traité en toute sécurité au moment du paiement."
  - FAQ Q5: "Comment trouver ma taille?" / "Chaque fiche produit comprend un guide des tailles avec des mesures détaillées. Si vous hésitez entre deux tailles, écrivez-nous à info@celinebeaumont.com — il nous fera plaisir de vous aider."

  **About page**
  - Hero eyebrow: "Notre histoire" · Heading: "Fabriqué à Toronto, avec intention"
  - Pull-quote: "Chaque femme mérite de se sentir belle — pas seulement lors d'occasions spéciales, mais chaque jour." · Attribution: "Celine Beaumont, fondatrice"
  - Founder story: "Celine Beaumont est née dans un petit atelier du quartier de la mode de Toronto, autour d'une idée toute simple : les vêtements du quotidien méritent autant de soin que ceux des grandes occasions. Vingt ans plus tard, cette idée n'a pas changé. Chacune de nos pièces commence par un tissu en lequel nous croyons — des fibres naturelles, sourcées de façon responsable, coupées et cousues par une petite équipe de patronnières et de couturières que nous connaissons par leur prénom. Nous produisons volontairement en petites quantités : plus de soin dans chaque point de couture, moins de gaspillage à chaque collection, des vêtements pensés pour durer des années, pas seulement une saison. De notre toute première robe à notre plus récente collection, nous sommes restées proches de nos racines — tout est conçu, coupé et fini ici, à Toronto, pour les femmes de tout le Canada qui veulent que leur garde-robe leur ressemble."
  - Stats: "12k+" / "Clientes fidèles" · "100 %" / "Conçu à Toronto" · "4,9★" / "Note moyenne"
  - Closing CTA heading: "Découvrez la collection" · Subcopy: "Des pièces intemporelles, livrées directement chez vous partout au Canada." · Button: "Découvrir la collection"

  **Product page**
  - Size guide link: "Guide des tailles" · Share label: "Partager"
  - Details band: "Une coupe flatteuse" / "Taillée pour vous accompagner" · "Matière durable" / "Matériaux sourcés de façon responsable" · "Fabriqué à Toronto" / "Conçu et fini localement"
  - "You may also like": "Vous aimerez aussi"

  **Announcement bar**
  - "Livraison gratuite sur toutes les commandes canadiennes"
  - "Retours faciles sous 30 jours · Fabriqué à Toronto"

  **Footer menu headings**
  - Shop → "Boutique" · Help → "Aide" · About → "À propos"

  Note: this is placeholder founder-story copy — the brief that generated
  this theme referenced "full French/English copy below" for the About page
  founder story but the copy itself wasn't actually supplied, so the
  paragraph above (and its English source in `templates/page.about.json`)
  was drafted in the established brand voice and should be reviewed/rewritten
  by the client before launch.
  </details>

### Products, discounts & reviews
- Replace placeholder collections in the homepage "Category grid" (Dresses,
  Jackets, Knitwear, Trousers) with the real collections in
  **Theme editor > Home page > The wardrobe**.
- Tag products `new` or `limited` (Shopify Admin > Products > tags) to make
  the "New"/"Limited" badges appear on product cards — this is driven by real
  product tags, not hardcoded.
- Optionally set a `custom.material` metafield (single line text) on
  products to show the material subtext line on product cards.
- **Tiered bundle discount** (Buy 2/3/4 = 10/15/20% off): the product page's
  "Choose your quantity & save" selector and the cart drawer's progress bar
  are both fully functional UI — the bundle selector genuinely posts each
  chosen variant to `/cart/add.js`, and the cart progress bar reads real
  `cart.item_count`. But the **discounted pricing itself** only applies at
  checkout once you create a matching **automatic discount** in Admin >
  Discounts (or a Shopify Function) with quantity thresholds of 2/3/4 items
  and 10%/15%/20% percentages. Until that's created, the prices shown in the
  selector/progress bar are a preview, not what checkout will charge.
- **Reviews**: `sections/product-reviews.liquid` (product page) and the
  homepage reviews section currently use static, editable placeholder
  content (theme editor blocks), not real customer reviews. Before launch,
  install a reviews app (Judge.me and Loox both integrate cleanly with
  Dawn-based themes) and either replace these sections with the app's
  embed block, or wire the app's rating metafields into the existing
  `rating` block on the product page (already reads
  `product.metafields.reviews.rating`, the standard namespace most review
  apps use).
- **Size guide**: the "Size guide" link on the product page opens an empty
  modal until you create a Page (e.g. handle `size-guide`) and select it on
  the `size_guide` block's Page setting in the theme editor.
- **Social links**: add real Instagram/Pinterest/Facebook URLs in
  **Theme settings > Social media** — the footer's social icons only render
  once a URL is present.
- **Store policies**: set up Privacy Policy and Terms of Service in
  Admin > Settings > Policies — the footer's "Privacy · Terms" links pull
  directly from `shop.policies` and stay empty otherwise.

### Logo
- `assets/logo.jpg` is wired up as the header logo's fallback so the header
  is never empty, but Shopify's native logo setting (Theme settings > Logo)
  can only reference a file uploaded through Admin, not a theme asset
  directly. Upload the real logo file there when ready; it will
  automatically replace the fallback with no code changes needed.

## 3. Accessibility summary

Built on top of Dawn's existing accessibility foundation (skip-to-content
link, landmark regions, keyboard-accessible mega menu/cart drawer,
`:focus-visible` styles, `aria-live` cart regions, native localization,
Theme Check-clean markup) and extended it:

- **Contrast fix vs. the raw mockup**: the mockup used `#8a837a` (muted gray)
  and `#b4894e` (champagne gold) as normal-size text/link colors directly on
  `#faf8f4`/white backgrounds. Both fail WCAG AA (`#8a837a` ≈ 3.5:1,
  `#b4894e` ≈ 3.0–3.2:1; AA needs ≥4.5:1 for normal text). This theme keeps
  `#8a837a` and `#b4894e` only for decorative/large use (icons, star ratings,
  progress dots, large headings), and introduces two darker, AA-passing
  variants for anything read as body-sized text or a functional link:
  `#726b62` (≈5.0:1 on the warm-white background) and `#8a6529` (≈4.6–4.9:1
  on warm-white/white). Functional links additionally get an underline so
  they're never conveyed by color alone (WCAG 1.4.1).
- Real `<input type="radio">` elements (not div+onclick) power the bundle
  quantity tiers, each wrapped in a `<label>`, inside a `<fieldset>`; the
  selected state is shown with both a filled dot **and** a stronger
  border/background, never color alone.
- Every new form control (bundle color/size selects, email signup) has a
  real associated `<label>` — Dawn's own patterns (variant picker, quantity
  input) already did this and were left untouched.
- All new icon-only interactive elements (wishlist button) carry an explicit
  `aria-label`; all decorative inline SVGs are `aria-hidden="true"`.
- Dawn's native color-swatch touch target is 4.4rem (44px) by default —
  already at the ≥44px target for an older audience, no change needed.
  Quantity steppers were bumped to a 4rem (40px) minimum.
  Accordion/FAQ rows are ≥44px tall.
- `prefers-reduced-motion` is respected: the cart progress bar's fill
  transition is disabled under `(prefers-reduced-motion: reduce)`; all new
  sections (icon columns, testimonials, quote, stats) render statically with
  no added motion, and none of the JS added (bundle selector show/hide,
  quantity handling) introduces animation.
- Every new `<img>`/`image_tag` uses real alt text from the underlying
  Shopify object; only genuinely decorative inline SVG icons are
  `aria-hidden`.
- `<html lang>` continues to follow `request.locale.iso_code` unchanged.
- Theme Check (`shopify theme check`) was run and returns **0 errors**. The
  11 remaining warnings are either pre-existing in stock Dawn (unrelated to
  this project's changes — `UndefinedObject: scheme_classes`, a couple of
  `VariableName`/`UnusedAssign` notices in untouched Dawn sections, one
  `OrphanedSnippet`) or expected/intentional (`RemoteAsset` ×3 on the Google
  Fonts `<link>` tags, which is the brief's explicit instruction to bypass
  Shopify's font-hosting system for Tenor Sans/Outfit).

## 4. What's out of scope here (by design)

Per the brief, this theme does not attempt to: create the Shopify automatic
discount, create navigation menus, enable French as a published language,
or upload real product photography. All of the above are covered as manual
follow-ups in section 2.
