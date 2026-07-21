# Celine Beaumont — Shopify theme

The Shopify Online Store 2.0 theme for [celinebeaumont.com](https://celinebeaumont.com),
a Toronto-based women's clothing brand. Built on Shopify's official [Dawn](https://github.com/Shopify/dawn)
reference theme, heavily reskinned and extended with a bilingual (English /
Canadian French), accessible, premium editorial design.

## What's here

- Full OS2.0 theme structure: `assets/`, `config/`, `layout/`, `locales/`,
  `sections/`, `snippets/`, `templates/`.
- Custom sections built for this brand (Dawn has no equivalent):
  `icon-columns` (USP strip / product details band), `testimonials`,
  `product-reviews`, `quote`, `stats`, and the product page's
  `bundle-quantity-selector` (a real, working "buy more, save more" tiered
  quantity + per-unit color/size picker).
- Dawn's existing sections (header, footer, hero, collections, product page,
  cart drawer, FAQ accordion, newsletter, etc.) restyled to match the brand's
  design system: Tenor Sans / Outfit typefaces, warm-white/cream/ink/gold
  color palette, no-radius uppercase buttons, editorial 3:4 photography.
- Full English + Canadian French locale coverage for every runtime string
  and schema label this theme adds.

## Getting started

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for how to preview/push this theme
with the Shopify CLI (or connect this repo directly from Shopify Admin), the
manual admin setup still required (navigation menus, enabling French,
discounts, a reviews app, real product photography), and an accessibility
summary of what was built.
