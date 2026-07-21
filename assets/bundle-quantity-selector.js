class BundleQuantitySelector extends HTMLElement {
  constructor() {
    super();
    this.variants = JSON.parse(this.querySelector('[data-bundle-variants]').textContent);
    this.optionNames = this.variants.length ? this.variants[0].options.map((_, i) => i) : [];
    this.radios = Array.from(this.querySelectorAll('.bundle-quantity-selector__radio'));
    this.units = Array.from(this.querySelectorAll('[data-bundle-unit]'));
    this.addButton = this.querySelector('[data-bundle-add-button]');
    this.addLabel = this.querySelector('[data-bundle-add-label]');
    this.status = this.querySelector('[data-bundle-status]');
    this.cartAddUrl = this.dataset.cartAddUrl;

    this.radios.forEach((radio) => radio.addEventListener('change', () => this.onTierChange()));
    this.addButton.addEventListener('click', () => this.addBundleToCart());

    this.onTierChange();
  }

  get selectedTier() {
    const checked = this.radios.find((radio) => radio.checked);
    return checked ? parseInt(checked.value, 10) : 1;
  }

  onTierChange() {
    const tier = this.selectedTier;
    this.units.forEach((unitEl) => {
      const unitIndex = parseInt(unitEl.dataset.bundleUnit, 10);
      unitEl.hidden = unitIndex > tier;
    });
  }

  findVariantForUnit(unitEl) {
    const selects = Array.from(unitEl.querySelectorAll('[data-bundle-option]'));
    if (selects.length === 0) {
      // Product has no options (single variant) - just use the first/only variant.
      return this.variants[0];
    }
    const chosenValues = selects.map((select) => select.value);
    return this.variants.find((variant) =>
      chosenValues.every((value, index) => variant.options[index] === value)
    );
  }

  async addBundleToCart() {
    const tier = this.selectedTier;
    const items = [];

    for (const unitEl of this.units) {
      const unitIndex = parseInt(unitEl.dataset.bundleUnit, 10);
      if (unitIndex > tier) continue;
      const variant = this.findVariantForUnit(unitEl);
      if (!variant) {
        this.setStatus(window.celineBundleStrings?.variantUnavailable || 'One of the selected combinations is unavailable.');
        return;
      }
      items.push({ id: variant.id, quantity: 1 });
    }

    if (items.length === 0) return;

    this.addButton.setAttribute('aria-busy', 'true');
    this.addButton.disabled = true;

    try {
      const response = await fetch(this.cartAddUrl.replace('/cart/add', '/cart/add.js'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description || errorData.message || 'Cart error');
      }

      document.dispatchEvent(new CustomEvent('cart:refresh'));
      document.documentElement.dispatchEvent(
        new CustomEvent('cart:build', { bubbles: true, detail: { source: 'bundle-quantity-selector' } })
      );

      // Dawn's cart drawer listens for a page-level cart update via its own fetch pattern on
      // add; re-fetch the cart drawer/cart-icon-bubble sections so the count + drawer reflect
      // the new items without a full page reload.
      const cartIcon = document.querySelector('#cart-icon-bubble');
      if (cartIcon) {
        const sectionResponse = await fetch(`${window.location.pathname}?sections=cart-icon-bubble`);
        const sectionData = await sectionResponse.json();
        if (sectionData['cart-icon-bubble']) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(sectionData['cart-icon-bubble'], 'text/html');
          const newIcon = doc.querySelector('.shopify-section');
          if (newIcon) cartIcon.parentElement.innerHTML = newIcon.innerHTML;
        }
      }

      const cartDrawer = document.querySelector('cart-drawer');
      if (cartDrawer && typeof cartDrawer.open === 'function') {
        cartDrawer.open();
      }

      this.setStatus(window.celineBundleStrings?.added || 'Added to your cart.');
    } catch (error) {
      this.setStatus(error.message || 'Something went wrong adding this bundle to your cart.');
    } finally {
      this.addButton.removeAttribute('aria-busy');
      this.addButton.disabled = false;
    }
  }

  setStatus(message) {
    this.status.textContent = message;
    this.status.classList.remove('visually-hidden');
    window.setTimeout(() => this.status.classList.add('visually-hidden'), 6000);
  }
}

if (!customElements.get('bundle-quantity-selector')) {
  customElements.define('bundle-quantity-selector', BundleQuantitySelector);
}
