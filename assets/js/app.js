const CFG = window.RONNIES_DATA.store;
const IMG = window.RONNIES_DATA.images;
const CATS = window.RONNIES_DATA.categories;
const DEFAULT_PRODUCTS = window.RONNIES_DATA.products;
const PRODUCT_STORAGE_KEY = 'ronnies-products-v1';
const TESTIMONIALS = window.RONNIES_DATA.testimonials;
const FAQ = window.RONNIES_DATA.faq;

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

function hasVariants(product) {
  return Array.isArray(product?.g) && product.g.length > 0;
}

function loadProducts() {
  try {
    const stored = JSON.parse(localStorage.getItem(PRODUCT_STORAGE_KEY) || 'null');
    if (Array.isArray(stored) && stored.length) {
      return stored.map(normalizeProduct);
    }
  } catch (error) {
    // ignore storage parsing errors and fall back to defaults
  }

  return DEFAULT_PRODUCTS.map(normalizeProduct);
}

function saveProducts(items) {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(items.map(normalizeProduct)));
}

let P = loadProducts();
let adminState = { editingId: null };
const ADMIN_PASSKEY = 'HendraFarmproductservice@1914?';
let adminUnlocked = false;

function showAdminPasskeyModal() {
  const modal = document.getElementById('admin-passkey-modal');
  const input = document.getElementById('admin-passkey-input');
  if (!modal || !input) return;

  modal.hidden = false;
  input.value = '';
  input.focus();
}

function hideAdminPasskeyModal() {
  const modal = document.getElementById('admin-passkey-modal');
  if (!modal) return;
  modal.hidden = true;
}

function handleAdminPasskeySubmit(event) {
  event.preventDefault();
  const input = document.getElementById('admin-passkey-input');
  const value = input ? input.value : '';

  if (value === ADMIN_PASSKEY) {
    adminUnlocked = true;
    hideAdminPasskeyModal();
    go('admin');
    return;
  }

  toast('Incorrect admin passkey');
  if (input) {
    input.value = '';
    input.focus();
  }
}

const $ = (selector) => document.querySelector(selector);
const fmt = (n) => '₦' + n.toLocaleString('en-US');
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

let S = {
  v: 'home',
  cat: '',
  pid: '',
  q: '',
  sort: '',
  min: '',
  max: '',
  tab: 'd',
  order: null
};

let cart = {};
let sel = {};
let qty1 = 1;

function syncSelectionState() {
  const nextState = {};
  P.forEach((product) => {
    if (hasVariants(product)) {
      const current = Array.isArray(sel[product.id]) ? sel[product.id] : [];
      nextState[product.id] = product.g.map((group, groupIndex) => {
        const prevValue = current[groupIndex];
        if (typeof prevValue === 'number' && prevValue >= 0 && prevValue < group.length) {
          return prevValue;
        }
        return 0;
      });
    }
  });
  sel = nextState;
}

syncSelectionState();

try {
  cart = JSON.parse(localStorage.getItem('ronnies-cart2') || '{}') || {};
} catch (error) {
  cart = {};
}

const save = () => {
  try {
    localStorage.setItem('ronnies-cart2', JSON.stringify(cart));
  } catch (error) {
    // ignore persistence errors in restricted environments
  }
};

const byId = (id) => P.find((product) => product.id === id);
const lbl = (product) => (hasVariants(product) ? sel[product.id].map((optionIndex, index) => product.g[index][optionIndex]).join('|') : '');
const priceOf = (product, label) => (hasVariants(product) ? product.pr[label] : product.p);
const nameOf = (product, label) => {
  if (!hasVariants(product)) return product.n;
  if (product.id === 'parts') return label;
  return `${product.sn} (${label.replace('|', ', ')})`;
};
const from = (product) => {
  if (hasVariants(product)) {
    const values = Object.values(product.pr || {});
    return values.length ? Math.min(...values) : Number(product.p || 0);
  }
  return Number(product.p || 0);
};

const items = () => Object.keys(cart)
  .map((key) => {
    const [id, label] = key.split('~');
    const product = byId(id);
    if (!product) return null;
    const price = priceOf(product, label);
    return price ? { k: key, p: product, q: cart[key], n: nameOf(product, label), pr: price, img: product.img } : null;
  })
  .filter(Boolean);

const sub = () => items().reduce((sum, item) => sum + item.pr * item.q, 0);
const count = () => items().reduce((sum, item) => sum + item.q, 0);
const catName = (category) => (CATS.find(([value]) => value === category) || [])[1] || '';
const wa = (message) => `https://wa.me/${CFG.wa}?text=${encodeURIComponent(message)}`;
const img = (product, className = '') => {
  if (product.img) {
    const imageMatch = IMG[product.img];
    const imageSource = imageMatch || (typeof product.img === 'string' && /^(https?:)?\/\//i.test(product.img) || product.img.startsWith('data:') || product.img.startsWith('/') ? product.img : '');

    if (imageSource) {
      return `<img src="${imageSource}" alt="${esc(product.n)}" loading="lazy" decoding="async" class="${className}">`;
    }
  }

  return `<span class="nm">${esc(product.n)}</span>`;
};

function card(product) {
  const priceLabel = hasVariants(product) ? `from ${fmt(from(product))}` : fmt(product.p);
  return `
    <article class="card">
      <button class="ph" data-prod="${product.id}" aria-label="${esc(product.n)}">${img(product)}</button>
      <div class="bd">
        <button class="c" data-cat="${product.c}">${catName(product.c)}</button>
        <h3>${esc(product.n)}</h3>
        ${product.u ? `<span class="u">${product.u}</span>` : ''}
        <span class="price">${priceLabel}</span>
        ${hasVariants(product) ? `<button class="btn ghost" data-prod="${product.id}">Select options</button>` : `<button class="btn" data-add="${product.id}~">Add to cart</button>`}
      </div>
    </article>
  `;
}

function home() {
  const tiles = [['meat', 'cow'], ['soup', 'egusi'], ['pep', 'tomato'], ['spice', 'ginger'], ['staple', 'rice']]
    .map(([category, key]) => {
      const list = P.filter((product) => product.c === category);
      return `<button class="tile" data-cat="${category}"><img src="${IMG[key]}" alt="" loading="lazy"><span><b>${catName(category)}</b>from ${fmt(Math.min(...list.map(from)))}</span></button>`;
    }).join('');

  const featuredProducts = P.filter((product) => product.c === 'soup' || product.id === 'tom' || product.id === 'gin').slice(0, 8).map(card).join('');

  return `
    <section class="hero">
      <h1>Hygienically processed. Fresh from farm to your door.</h1>
      <p>Fresh produce by the paint, and cow or goat meat by the share. Natural, no preservatives, handpicked.</p>
      <button class="btn" data-go="shop">Start shopping →</button>
    </section>
    <div class="tiles">${tiles}</div>
    <h2 class="sec">Start shopping now</h2>
    <div class="grid">${featuredProducts}</div>
    <p style="text-align:center"><button class="btn ghost" data-go="shop">See more</button></p>
    <h2 class="sec">Why Ronnie’s?</h2>
    <div class="why">
      <div><h3>Fresh &amp; hygienic</h3><p>Meat is hygienically processed and well packaged.</p></div>
      <div><h3>100% natural</h3><p>No preservatives. Every item is handpicked.</p></div>
      <div><h3>Fast &amp; reliable delivery</h3><p>Home and office delivery in Lagos. Delivery charges apply.</p></div>
    </div>
    <div class="banner">
      <h2>Reserve early, eat well.</h2>
      <p>Cow and goat shares fill up. Pick your slot and send your order on WhatsApp.</p>
      <button class="btn" data-cat="meat">See meat shares</button>
    </div>
  `;
}

function shop() {
  let products = P.filter((product) => {
    const matchesCategory = !S.cat || product.c === S.cat;
    const matchesQuery = product.n.toLowerCase().includes(S.q.toLowerCase());
    const matchesMin = !S.min || from(product) >= Number(S.min);
    const matchesMax = !S.max || from(product) <= Number(S.max);
    return matchesCategory && matchesQuery && matchesMin && matchesMax;
  });

  if (S.sort === 'lo') products.sort((a, b) => from(a) - from(b));
  else if (S.sort === 'hi') products.sort((a, b) => from(b) - from(a));
  else if (S.sort === 'az') products.sort((a, b) => a.n.localeCompare(b.n));

  return `
    <div class="crumb"><button data-go="home">Home</button> / ${S.cat ? `<button data-go="shop" data-clr="1">Shop</button> / ${catName(S.cat)}` : 'Shop'}</div>
    <div class="bar">
      <input id="q" type="search" placeholder="Search products…" value="${esc(S.q)}" aria-label="Search products">
      <select id="sort" aria-label="Sort">
        <option value="">Default sorting</option>
        <option value="lo" ${S.sort === 'lo' ? 'selected' : ''}>Price: low to high</option>
        <option value="hi" ${S.sort === 'hi' ? 'selected' : ''}>Price: high to low</option>
        <option value="az" ${S.sort === 'az' ? 'selected' : ''}>Name: A to Z</option>
      </select>
      <details class="f" ${S.min || S.max ? 'open' : ''}>
        <summary>Filter by price</summary>
        <div class="r">
          <label>Min ₦<input id="min" type="number" inputmode="numeric" value="${S.min}"></label>
          <label>Max ₦<input id="max" type="number" inputmode="numeric" value="${S.max}"></label>
        </div>
      </details>
    </div>
    <p class="cnt">Showing ${products.length} of ${P.length} results</p>
    ${products.length ? `<div class="grid">${products.map(card).join('')}</div>` : `<div class="empty"><h2>No products found</h2><p>Clear your search or price filter.</p><button class="btn" data-go="shop" data-clr="1">Clear filters</button></div>`}
  `;
}

function product() {
  const product = byId(S.pid);
  if (!product) return shop();

  const label = lbl(product);
  const price = hasVariants(product) ? priceOf(product, label) : product.p;
  const key = `${product.id}~${label}`;

  const selectors = (hasVariants(product) ? product.g : []).map((group, groupIndex) => `
    <div class="grp">
      <span class="gl">${product.gn[groupIndex]}</span>
      <div class="pills">
        ${group.map((option, optionIndex) => `<button class="pill ${sel[product.id][groupIndex] === optionIndex ? 'on' : ''}" data-sel="${product.id}:${groupIndex}:${optionIndex}" aria-pressed="${sel[product.id][groupIndex] === optionIndex}">${option}</button>`).join('')}
      </div>
    </div>
  `).join('');

  const hint = product.hint && hasVariants(product) ? `<p class="note">${product.hint[product.g[0][sel[product.id][0]]]}</p>` : '';
  const related = P.filter((item) => item.c === product.c && item.id !== product.id).slice(0, 4);
  const description = product.d || `${product.n}, sold by ${product.u.toLowerCase()}. Natural, no preservatives, handpicked quality.`;

  return `
    <div class="crumb"><button data-go="home">Home</button> / <button data-cat="${product.c}">${catName(product.c)}</button> / ${esc(product.n)}</div>
    <div class="pd">
      <div class="ph">${img(product)}</div>
      <div>
        <h1>${esc(product.n)}</h1>
        <span class="price">${fmt(price)}</span>
        ${product.u ? `<div class="note">per ${product.u}</div>` : ''}
        ${selectors}
        ${hint}
        <div class="buy">
          <div class="qty">
            <button data-q="-1" aria-label="Less">−</button>
            <input id="q1" type="number" min="1" value="${qty1}" inputmode="numeric" aria-label="Quantity">
            <button data-q="1" aria-label="More">+</button>
          </div>
          <button class="btn" data-addq="${key}">Add to cart</button>
        </div>
        <p class="note">Questions? <a href="${wa('Hello Ronnie’s Agro Foods, I have a question about ' + product.n)}" target="_blank" rel="noopener">Request a call back on WhatsApp</a></p>
      </div>
    </div>
    <div class="tabs">
      <button class="${S.tab === 'd' ? 'on' : ''}" data-tab="d">Description</button>
      <button class="${S.tab === 'r' ? 'on' : ''}" data-tab="r">Reviews (0)</button>
    </div>
    <div class="tp">${S.tab === 'd' ? esc(description) : 'There are no reviews yet.'}</div>
    ${related.length ? `<h2 class="sec">Related products</h2><div class="grid">${related.map(card).join('')}</div>` : ''}
  `;
}

function cartV() {
  const itemsList = items();

  if (!itemsList.length) {
    return `<div class="empty"><h2>Your cart is empty</h2><p>Add something fresh to get started.</p><button class="btn" data-go="shop">Return to shop</button></div>`;
  }

  return `
    <div class="crumb"><button data-go="home">Home</button> / Cart</div>
    <h1 style="margin:6px 0 12px">Cart</h1>
    <div class="rows">
      ${itemsList.map((item) => `
        <div class="row">
          <div class="th">${item.img && IMG[item.img] ? `<img class="th" src="${IMG[item.img]}" alt="${esc(item.n)}">` : esc(item.p.n.split(' ')[0])}</div>
          <div>
            <strong>${esc(item.n)}</strong>
            <div class="t">${fmt(item.pr)}${item.p.u ? ' / ' + item.p.u : ''}</div>
          </div>
          <strong>${fmt(item.pr * item.q)}</strong>
          <div class="x">
            <div class="qty">
              <button data-dec="${item.k}" aria-label="Less">−</button>
              <input value="${item.q}" readonly aria-label="Quantity">
              <button data-inc="${item.k}" aria-label="More">+</button>
            </div>
            <button class="rm" data-rm="${item.k}">Remove</button>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="box">
      <h3>Cart totals</h3>
      <div class="tot"><span>Subtotal</span><span>${fmt(sub())}</span></div>
      <div class="tot"><span>Delivery</span><span>Confirmed on WhatsApp</span></div>
      <div class="tot b"><span>Total</span><span>${fmt(sub())}</span></div>
    </div>
    <div class="buy">
      <button class="btn ghost" data-go="shop">Continue shopping</button>
      <button class="btn" data-go="checkout">Proceed to checkout</button>
    </div>
  `;
}

function checkout() {
  const list = items();
  if (!list.length) return cartV();

  return `
    <div class="crumb"><button data-go="home">Home</button> / <button data-go="cart">Cart</button> / Checkout</div>
    <h1 style="margin:6px 0 12px">Checkout</h1>
    <form id="co" class="co" novalidate>
      <div class="box" style="margin:0">
        <h3>Billing &amp; delivery details</h3>
        <label for="n">Full name *</label>
        <input id="n" name="name" autocomplete="name" required>
        <label for="ph">Phone number (WhatsApp) *</label>
        <input id="ph" name="phone" type="tel" inputmode="tel" autocomplete="tel" required>
        <label for="ar">Area in Lagos *</label>
        <input id="ar" name="area" placeholder="e.g. Ikeja, Lekki, Yaba" required>
        <label for="ad">Delivery address *</label>
        <textarea id="ad" name="addr" rows="3" autocomplete="street-address" required></textarea>
        <label for="nt">Order notes (optional)</label>
        <textarea id="nt" name="note" rows="2" placeholder="Preferred day, how to cut the meat, landmarks…"></textarea>
      </div>
      <div>
        <div class="box" style="margin-top:0">
          <h3>Your order</h3>
          ${list.map((item) => `<div class="tot"><span>${item.q} × ${esc(item.n)}</span><span>${fmt(item.pr * item.q)}</span></div>`).join('')}
          <div class="tot"><span>Delivery</span><span>Confirmed on WhatsApp</span></div>
          <div class="tot b"><span>Total</span><span>${fmt(sub())}</span></div>
          <label class="pay"><input type="radio" name="pay" value="Pay on delivery" checked><span><b>Pay on delivery</b><small>Pay when your order arrives.</small></span></label>
          <label class="pay"><input type="radio" name="pay" value="Bank transfer"><span><b>Bank transfer</b><small>Account details are sent on WhatsApp.</small></span></label>
          <p class="note">Your order is confirmed when Ronnie’s replies on WhatsApp.</p>
          <button class="btn wide" type="submit">Place order</button>
        </div>
      </div>
    </form>
  `;
}

function thanks() {
  const order = S.order;
  if (!order) return home();

  const message = `Hello Ronnie’s Agro Foods, I’d like to confirm my order ${order.id}:\n${order.lines.map((line) => `• ${line.q} × ${line.n} — ${fmt(line.pr * line.q)}`).join('\n')}\n\nTotal: ${fmt(order.total)} (delivery quoted separately)\nPayment: ${order.pay}\n\nName: ${order.name}\nPhone: ${order.phone}\nArea: ${order.area}\nAddress: ${order.addr}${order.note ? '\nNotes: ' + order.note : ''}`;

  return `
    <div class="crumb">Order received</div>
    <h1 style="margin:6px 0">Thank you, ${esc(order.name.split(' ')[0])}.</h1>
    <div class="ok">
      <strong>One last step:</strong> send your order to Ronnie’s on WhatsApp so it can be confirmed.
      <div style="margin-top:12px">
        <a class="btn wide" style="background:#1fa855;border-color:#1fa855" href="${wa(message)}" target="_blank" rel="noopener">Send order ${order.id} on WhatsApp</a>
      </div>
    </div>
    <div class="box">
      <h3>Order ${order.id}</h3>
      ${order.lines.map((line) => `<div class="tot"><span>${line.q} × ${esc(line.n)}</span><span>${fmt(line.pr * line.q)}</span></div>`).join('')}
      <div class="tot b"><span>Total</span><span>${fmt(order.total)}</span></div>
      <div class="note">Payment: ${order.pay} · Delivery fee confirmed on WhatsApp<br>${esc(order.addr)}, ${esc(order.area)}</div>
    </div>
    <p><button class="btn ghost" data-go="shop">Continue shopping</button></p>
  `;
}

function admin() {
  const editingProduct = P.find((product) => product.id === adminState.editingId) || null;
  const rows = P.map((product) => `
    <div class="row" style="grid-template-columns:1fr auto auto;">
      <div>
        <strong>${esc(product.n)}</strong>
        <div class="t">${esc(product.c)} · ${fmt(product.p || 0)} · ${product.u || 'No unit'}</div>
      </div>
      <button class="btn ghost" data-admin-edit="${product.id}">Edit</button>
      <button class="rm" data-admin-delete="${product.id}">Delete</button>
    </div>
  `).join('');

  return `
    <div class="crumb"><button data-go="home">Home</button> / Admin</div>
    <h1 style="margin:6px 0 12px">Product manager</h1>
    <div class="co">
      <div class="box">
        <h3>${editingProduct ? 'Edit product' : 'Add new product'}</h3>
        <form id="admin-form">
          <input type="hidden" name="id" value="${editingProduct ? esc(editingProduct.id) : ''}">
          <label>Name *</label>
          <input name="n" value="${editingProduct ? esc(editingProduct.n) : ''}" required>
          <label>Category *</label>
          <select name="c" required>
            ${CATS.map(([value, label]) => `<option value="${value}" ${editingProduct && editingProduct.c === value ? 'selected' : ''}>${label}</option>`).join('')}
          </select>
          <label>Unit</label>
          <input name="u" value="${editingProduct ? esc(editingProduct.u) : ''}" placeholder="e.g. 1 paint, 10kg bag">
          <label>Price *</label>
          <input type="number" name="p" min="0" value="${editingProduct ? Number(editingProduct.p || 0) : 0}" required>
          <label>Image URL</label>
          <input name="img" value="${editingProduct ? esc(editingProduct.img || '') : ''}" placeholder="https://example.com/image.jpg">
          <label>Description</label>
          <textarea name="d" rows="3" placeholder="Short product description">${editingProduct ? esc(editingProduct.d || '') : ''}</textarea>
          <div class="buy" style="margin-bottom:0">
            <button class="btn" type="submit">${editingProduct ? 'Save changes' : 'Add product'}</button>
            ${editingProduct ? '<button class="btn ghost" type="button" data-admin-cancel="1">Cancel</button>' : ''}
          </div>
        </form>
      </div>
      <div class="box">
        <h3>Current inventory</h3>
        <div class="rows">${rows}</div>
      </div>
    </div>
  `;
}

function help() {
  return `
    <div class="crumb"><button data-go="home">Home</button> / Customer help</div>
    <h1 style="margin:6px 0 4px">Customer help</h1>
    <p class="note">Our team is here to assist. Common questions answered.</p>
    <div class="faq">${FAQ.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('')}</div>
    <p><a class="btn" href="${wa('Hello Ronnie’s Agro Foods, I need help.') }" target="_blank" rel="noopener">Chat on WhatsApp</a></p>
  `;
}

function handleAdminFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const name = String(formData.get('n') || '').trim();
  const category = String(formData.get('c') || '').trim();
  const price = Number(formData.get('p') || 0);

  if (!name || !category || !Number.isFinite(price)) {
    toast('Please fill in the required product fields');
    return;
  }

  const payload = {
    id: String(formData.get('id') || slugify(name)),
    c: category,
    n: name,
    u: String(formData.get('u') || '').trim(),
    p: Math.max(0, price),
    img: String(formData.get('img') || '').trim(),
    d: String(formData.get('d') || '').trim()
  };

  const index = P.findIndex((product) => product.id === payload.id);
  if (index >= 0) {
    P[index] = { ...P[index], ...payload };
  } else {
    P.push(normalizeProduct(payload));
  }

  saveProducts(P);
  adminState.editingId = null;
  syncSelectionState();
  render();
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const requiredField = [...form.querySelectorAll('[required]')].find((field) => !field.value.trim());

  if (requiredField) {
    requiredField.focus();
    toast('Please fill in all required fields');
    return;
  }

  const formData = new FormData(form);
  const lines = items().map((item) => ({ n: item.n, q: item.q, pr: item.pr }));

  S.order = {
    id: 'RA-' + Math.floor(10000 + Math.random() * 90000),
    name: formData.get('name').trim(),
    phone: formData.get('phone').trim(),
    area: formData.get('area').trim(),
    addr: formData.get('addr').trim(),
    note: (formData.get('note') || '').trim(),
    pay: formData.get('pay'),
    lines,
    total: sub(),
    at: new Date().toISOString()
  };

  try {
    const orders = JSON.parse(localStorage.getItem('ronnies-orders') || '[]');
    orders.push(S.order);
    localStorage.setItem('ronnies-orders', JSON.stringify(orders));
  } catch (error) {
    // ignore persistence errors
  }

  cart = {};
  save();
  go('thanks');
}

function bindFormHandlers() {
  const adminForm = document.getElementById('admin-form');
  if (adminForm && !adminForm.dataset.boundSubmit) {
    adminForm.addEventListener('submit', handleAdminFormSubmit);
    adminForm.dataset.boundSubmit = 'true';
  }

  const adminPasskeyForm = document.getElementById('admin-passkey-form');
  if (adminPasskeyForm && !adminPasskeyForm.dataset.boundSubmit) {
    adminPasskeyForm.addEventListener('submit', handleAdminPasskeySubmit);
    adminPasskeyForm.dataset.boundSubmit = 'true';
  }

  const adminPasskeyCancelButton = document.getElementById('admin-passkey-cancel');
  if (adminPasskeyCancelButton && !adminPasskeyCancelButton.dataset.boundCancel) {
    adminPasskeyCancelButton.addEventListener('click', (event) => {
      event.preventDefault();
      hideAdminPasskeyModal();
      go('home');
    });
    adminPasskeyCancelButton.dataset.boundCancel = 'true';
  }

  const checkoutForm = document.getElementById('co');
  if (checkoutForm && !checkoutForm.dataset.boundSubmit) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    checkoutForm.dataset.boundSubmit = 'true';
  }
}

function render() {
  const view = $('#view');
  const cartButton = $('#cartBtn');
  const nav = $('#nav');

  if (view) {
    view.innerHTML = { home, shop, product, cart: cartV, checkout, thanks, admin, help }[S.v]();
    bindFormHandlers();
  }

  if (cartButton) {
    cartButton.textContent = '🛒 ' + count() + ' · ' + fmt(sub());
  }

  if (nav) {
    const primaryLinks = [['home', 'Home'], ['shop', 'Shop'], ['admin', 'Admin']]
      .map(([value, label]) => `<button class="chip ${S.v === value && !S.cat ? 'on' : ''}" data-go="${value}" data-clr="1">${label}</button>`)
      .join('');

    const categoryLinks = CATS
      .map(([value, label]) => `<button class="chip ${S.cat === value && S.v === 'shop' ? 'on' : ''}" data-cat="${value}">${label}</button>`)
      .join('');

    nav.innerHTML = `${primaryLinks}${categoryLinks}<button class="chip ${S.v === 'help' ? 'on' : ''}" data-go="help">Help</button>`;
  }
}

function go(view, options = {}) {
  if (view === 'admin' && !adminUnlocked) {
    showAdminPasskeyModal();
    return;
  }

  S.v = view;
  if (options.clr) {
    S.cat = '';
    S.q = '';
    S.min = '';
    S.max = '';
    S.sort = '';
  }

  Object.assign(S, options.s || {});
  render();
  window.scrollTo(0, 0);

  if (options.focus) {
    const searchBox = $('#q');
    if (searchBox) {
      searchBox.focus();
    }
  }
}

function toast(message) {
  $('#tmsg').textContent = message;
  const popup = $('#toast');
  popup.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => popup.classList.remove('show'), 3500);
}

function add(key, qty = 1) {
  cart[key] = (cart[key] || 0) + qty;
  save();
  const item = items().find((entry) => entry.k === key);
  toast(`“${item ? item.n : 'Item'}” added`);
  render();
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;

  const dataset = target.dataset;

  if (dataset.go) {
    if (dataset.go === 'shop' && S.v === 'shop' && dataset.clr) S.cat = '';
    go(dataset.go, { clr: !!dataset.clr, focus: !!dataset.focus });
  } else if (dataset.cat) {
    go('shop', { s: { cat: dataset.cat, q: '', min: '', max: '' } });
  } else if (dataset.prod) {
    qty1 = 1;
    S.tab = 'd';
    go('product', { s: { pid: dataset.prod } });
  } else if (dataset.add) {
    add(dataset.add);
  } else if (dataset.addq) {
    add(dataset.addq, Math.max(1, parseInt($('#q1').value || '1', 10)));
  } else if (dataset.q) {
    qty1 = Math.max(1, (parseInt($('#q1').value || '1', 10) + Number(dataset.q)));
    $('#q1').value = qty1;
  } else if (dataset.sel) {
    const [id, groupIndex, optionIndex] = dataset.sel.split(':');
    sel[id][Number(groupIndex)] = Number(optionIndex);
    render();
  } else if (dataset.tab) {
    S.tab = dataset.tab;
    render();
  } else if (dataset.inc) {
    cart[dataset.inc] += 1;
    save();
    render();
  } else if (dataset.dec) {
    cart[dataset.dec] -= 1;
    if (cart[dataset.dec] <= 0) delete cart[dataset.dec];
    save();
    render();
  } else if (dataset.rm) {
    delete cart[dataset.rm];
    save();
    render();
  } else if (dataset.adminEdit) {
    adminState.editingId = dataset.adminEdit;
    render();
  } else if (dataset.adminDelete) {
    const productId = dataset.adminDelete;
    P = P.filter((product) => product.id !== productId);
    saveProducts(P);
    syncSelectionState();
    if (adminState.editingId === productId) adminState.editingId = null;
    render();
  } else if (dataset.adminCancel) {
    adminState.editingId = null;
    render();
  } else if (target.hasAttribute('data-admin-passkey-close')) {
    hideAdminPasskeyModal();
    go('home');
  }
});

document.addEventListener('input', (event) => {
  const { id, value } = event.target;

  if (id === 'q') {
    S.q = value;
    const caret = event.target.selectionStart;
    render();
    const searchBox = $('#q');
    if (searchBox) {
      searchBox.focus();
      searchBox.setSelectionRange(caret, caret);
    }
  } else if (id === 'min' || id === 'max') {
    S[id] = value;
    render();
  }
});

document.addEventListener('change', (event) => {
  if (event.target.id === 'sort') {
    S.sort = event.target.value;
    render();
  }
});

['#t1', '#t2'].forEach((selector) => {
  const link = $(selector);
  if (!link) return;
  link.textContent = CFG.tel;
  link.href = 'tel:' + CFG.tel;
});

const fab = $('#fab');
if (fab) {
  fab.href = wa('Hello Ronnie’s Agro Foods, I’d like to place an order.');
}

(function initializeRouteFromHash() {
  const hash = (location.hash || '').slice(1);
  if (hash === 'shop') S.v = 'shop';
  else if (hash === 'cart') S.v = 'cart';
  else if (hash === 'admin') {
    if (!adminUnlocked) {
      showAdminPasskeyModal();
      S.v = 'home';
    } else {
      S.v = 'admin';
    }
  } else if (hash === 'help') S.v = 'help';
  else if (hash.startsWith('cat-') && CATS.some(([category]) => category === hash.slice(4))) {
    S.v = 'shop';
    S.cat = hash.slice(4);
  } else if (hash.startsWith('p-') && byId(hash.slice(2))) {
    S.v = 'product';
    S.pid = hash.slice(2);
  }
})();

render();
window.__appInitialized = true;
