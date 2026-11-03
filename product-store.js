(function () {
  const STORAGE_KEY = 'ronnies-products-v1';
  const DEFAULT_PRODUCTS = window.RONNIES_DATA && Array.isArray(window.RONNIES_DATA.products) ? window.RONNIES_DATA.products : [];

  function slugify(value = '') {
    return String(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'product';
  }

  function normalizeProduct(product = {}) {
    const next = { ...product };
    next.id = String(next.id || slugify(next.n || 'product'));
    next.c = next.c || 'meat';
    next.n = next.n || 'New product';
    next.u = next.u || '';
    next.p = Number(next.p || 0);
    next.img = next.img || '';
    next.d = next.d || '';
    next.gn = Array.isArray(next.gn) ? next.gn : [];
    next.g = Array.isArray(next.g) ? next.g.filter((group) => Array.isArray(group)) : [];
    next.pr = next.pr && typeof next.pr === 'object' ? next.pr : {};
    return next;
  }

  function readLocalProducts() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (Array.isArray(stored) && stored.length) {
        return stored.map(normalizeProduct);
      }
    } catch (error) {
      // Ignore storage parsing errors and fall back to defaults.
    }

    return DEFAULT_PRODUCTS.map(normalizeProduct);
  }

  function writeLocalProducts(items) {
    const normalized = (items || []).map(normalizeProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function getDatabaseURL() {
    const config = window.RONNIES_FIREBASE_CONFIG || {};
    if (!config.enabled || !config.databaseURL) return '';
    return String(config.databaseURL).replace(/\/+$/, '');
  }

  async function loadProducts() {
    const dbUrl = getDatabaseURL();

    if (dbUrl) {
      try {
        const response = await fetch(`${dbUrl}/products.json?ts=${Date.now()}`, {
          cache: 'no-store',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          const payload = await response.json();
          const list = Array.isArray(payload)
            ? payload
            : payload && typeof payload === 'object'
              ? Object.values(payload)
              : [];

          if (list.length) {
            const normalized = list.map(normalizeProduct);
            writeLocalProducts(normalized);
            return normalized;
          }
        }
      } catch (error) {
        console.warn('Unable to load products from the remote database. Falling back to local storage.', error);
      }
    }

    return readLocalProducts();
  }

  async function saveProducts(items) {
    const normalized = (items || []).map(normalizeProduct);
    writeLocalProducts(normalized);

    const dbUrl = getDatabaseURL();
    if (!dbUrl) return normalized;

    try {
      const response = await fetch(`${dbUrl}/products.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalized)
      });

      if (!response.ok) {
        throw new Error(`Remote save failed with status ${response.status}`);
      }
    } catch (error) {
      console.warn('Remote sync failed. The site remains updated locally on this device.', error);
    }

    return normalized;
  }

  window.ProductStore = {
    STORAGE_KEY,
    DEFAULT_PRODUCTS,
    normalizeProduct,
    readLocalProducts,
    writeLocalProducts,
    loadProducts,
    saveProducts,
    getDatabaseURL,
    hasRemoteDatabase: Boolean(getDatabaseURL())
  };
})();
