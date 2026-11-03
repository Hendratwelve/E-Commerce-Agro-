# Building a Jumia-Style Marketplace for Agro Products
### A study of Jumia Nigeria + a step-by-step build plan

*Prepared 28 Oct 2026. Jumia's live site was inspected (Supermarket landing page, category pages, footer, help links); the rest comes from news, seller-policy pages and review sites. Older statistics are labelled with their year. Verify fees, policies and prices before you commit money.*

---

## How to use this document

| Part | What it is | Read it when |
|---|---|---|
| **Part 1** | Study of Jumia: business model, site structure, page anatomy, trust systems, weaknesses | You want to understand *why* Jumia works |
| **Part 2** | What to copy, adapt and skip for agro products | You are deciding scope |
| **Part 3** | The 14-step build plan (with data model, wireframes, timeline) | You are ready to build |
| **Part 4** | KPIs, risks, launch checklist, sources | Before and after launch |

---

# PART 1: STUDY OF JUMIA

## 1.1 What Jumia actually is

Jumia is not a shop. It is a **three-part system**:

1. **Marketplace**: thousands of third-party sellers plus brand "Official Stores" list products under one storefront.
2. **Logistics (Jumia Delivery / Jumia Express)**: its own delivery network, including pickup stations and vendor drop-off points. Reports put the network at 250+ pickup stations and 109+ cities across all 36 states.
3. **Payments (JumiaPay)**: wallet and card payments, alongside Pay on Delivery.

**Lesson:** the website is the visible 20%. Trust, delivery and payment are the other 80%. Your site design should make those three things obvious on every screen.

### Revenue model (how Jumia earns)
- Commission per sale, varying by category (sellers register free; no monthly fee in markets like Kenya).
- Logistics and delivery fees.
- Sponsored placement and campaign events (Black Friday, flash sales, anniversary sales).
- JumiaPay financial-service fees.

---

## 1.2 Global site structure (what appears on every page)

Observed on the live Supermarket page:

```
┌──────────────────────────────────────────────────────────────┐
│ UTILITY STRIP:  Sell on Jumia | JumiaPay | Jumia Delivery    │
├──────────────────────────────────────────────────────────────┤
│ CATEGORY BAR: Official Store · Appliances · Phones & Tablets │
│  · Health & Beauty · Home & Office · Electronics · Fashion · │
│  Supermarket · Computing · Baby Products · Gaming · Other    │
├──────────────────────────────────────────────────────────────┤
│ LOGO | SEARCH BAR (wide) | Account ▾ | Help ▾ | Cart          │
│   Account: Sign in, My Account, Orders, Wishlist             │
│   Help: Help Center, Place an order, Payment options,        │
│         Track an order, Cancel an order, Returns & Refunds   │
│   Live Chat (opens WhatsApp)                                 │
└──────────────────────────────────────────────────────────────┘
```

**Why it works**
- **Search is the largest element.** Most shoppers know what they want.
- **Help is in the header, not buried in the footer.** The five help topics map to the five moments people get anxious (placing, paying, tracking, cancelling, returning).
- **Live chat goes to WhatsApp**, which is where Nigerian customers already are.
- **"Sell on Jumia" is in the top strip**, so supply recruitment never stops.

### Footer anatomy
Newsletter signup (with a consent checkbox) → app download badges → Need help (Help Center, Contact) → Useful links (delivery timelines, how to return, corporate/bulk purchases, report a product, dispute resolution, pickup stations) → About → **"Make money with Jumia"** (Sell, Vendor Hub, become a sales consultant) → sister countries → social links → payment-method logos → contact address and WhatsApp number.

---

## 1.3 Page-by-page anatomy

### A. Homepage
Typical blocks, top to bottom:
1. Hero carousel (campaign banners) with side promo tiles.
2. Category shortcut icons.
3. **Flash Sales** with countdown timer.
4. Top deals by vertical.
5. Official Stores row (brand logos).
6. Recommended / recently viewed.
7. Trust strip (delivery, returns, payment).
8. Newsletter + app download.

### B. Category landing page (e.g. Supermarket)
- Sub-category tiles at the top (Food Cupboard, Breakfast, Drinks, Spices, Grains & Pasta, Household…).
- "Top Deals" rail, then Official Stores grouped by sub-vertical (Food & Beverages, Baby, Personal Care, Household).
- Then the full filtered product grid.

### C. Product listing page (grid)
**Filters (left sidebar on desktop, drawer on mobile):** Category · Express delivery · Brand · Price (₦ min-max with Apply) · Product rating (4★ & above, 3★ & above…) · Seller score (80%+, 60%+…) · Official stores only.

**Sort options:** Popularity (default) · Newest arrivals · Price low→high · Price high→low · Product rating.

**Other patterns:** result count ("913 products found"), numbered pagination, "Recently viewed" strip, filters encoded in the URL (`?sort=lowest-price`, `?rating=4-5`, `?page=2`) so every filtered view is shareable and crawlable.

### D. Product card (the most reusable component)

```
┌─────────────────────┐
│ [-25%]      [♡]     │  ← discount badge, wishlist
│                     │
│     product image   │  ← square, white background, ~300px
│                     │
│ Title (2 lines max) │
│ ₦7,670   ₦10,205    │  ← current price big, old price struck
│ ★ 4.3 (6,825)       │  ← rating + review count
│ [Pay on Delivery]   │  ← badges: Express, Official Store,
│ [Low Stock]         │     Non-returnable, Low Stock, campaign tag
│ [   ADD TO CART   ] │
└─────────────────────┘
```

Every card answers: *what is it, how much, is it good, can I trust it, can I pay on delivery, is it running out?*

### E. Product detail page (PDP)
- Image gallery (multi-image, zoom).
- Title, brand, rating summary, price block with discount.
- Variation pickers (size/colour/pack).
- **Delivery & returns box**: pickup-station vs door delivery, estimated date, shipping fee, return window.
- **Seller panel (right on desktop, "Seller Info" link on mobile):** seller name, score, follower count, shipping speed.
- Badges: Express (inspected product), Official Store.
- Description, specifications, "What's in the box".
- Ratings breakdown + verified-purchase reviews.
- "Customers also viewed" rail.

### F. Cart → Checkout
Observed flow (from help guides and the live site):
1. Add to cart (cart persists across devices when logged in).
2. Cart page shows items, quantities, subtotal, "Continue to checkout".
3. Address (new or saved).
4. **Delivery method:** door delivery or pickup station. Fee shown before commitment.
5. **Payment method:** Pay on Delivery (eligibility depends on location and order), card (Visa/Mastercard/Verve), JumiaPay, vouchers entered late, not at the start.
6. Confirm order → SMS/email confirmation → tracking.

### G. Account area
Orders (with status and cancel), returns, wishlist, saved addresses, vouchers, account settings.

### H. Help centre
Searchable topics: place an order, pay, track, cancel, return. Plus policy pages (returns, dispute resolution, pickup stations, delivery timelines).

### I. Seller side (Vendor Hub / Seller Center)
- Register → submit business/ID documents → complete mandatory seller training → activate Seller Center.
- Create listings one-by-one, via bulk templates, or with content-team help; **new listings and edits go through approval** before going live.
- Dashboard: orders waiting for shipment, shipped, returns, sales history, stock and price updates.
- **Seller score** drives visibility *and* cost: low scores incur surcharges on top of the commission (in the published schedule, from +20% up to +75%).
- Fulfilment choices: seller ships, or stock sits in Jumia's warehouse.

---

## 1.4 Trust and conversion systems (the real engine)

| Mechanism | What Jumia does | Why it converts |
|---|---|---|
| **Pay on Delivery** | Cash or card on arrival, per eligible area | Reaches people who distrust paying upfront or lack cards |
| **Express badge** | Seller sends stock for physical inspection; item gets faster/cheaper shipping | Visible quality guarantee |
| **Seller score + ratings** | Public scores; filter by score | Makes bad sellers expensive and invisible |
| **Verified-purchase reviews** | Reviews tied to orders | Social proof |
| **7-day return window** | Return from the Orders page, drop at pickup station | Lowers purchase risk (policy applies to eligible items) |
| **Pickup stations** | Cheaper than door delivery; reaches areas without reliable addresses | Cost and reach |
| **Scarcity cues** | "Low Stock", countdown flash sales | Urgency |
| **Official Stores** | Brand-run storefronts | Authenticity |
| **WhatsApp live chat** | Support where the customer already is | Fast resolution |

**Older data points worth knowing (dated):** in Jumia's 2017 Nigeria mobile report, roughly 63% of orders came from mobile (browser + app) and about 41% of mobile traffic ran through Opera Mini, so **performance on weak phones and slow networks is a core requirement, not a polish item.** A 2018 write-up estimated door delivery cost up to about 50% more than pickup.

---

## 1.5 Where Jumia struggles (your openings)

From public reviews and reporting:
- **Returns friction:** complaints about declined returns, "under review" limbo, and missed windows. *(Opening: simple, fast, photo-based resolution.)*
- **Misleading listings:** specifications that don't match what arrives. *(Opening: standard units and honest photos, which suits agro where you control the photos.)*
- **Cancelled orders after confirmation / stock mismatch.** *(Opening: real stock numbers, daily price and stock updates.)*
- **Delivery delays vs promised dates.** *(Opening: fixed delivery days and time windows.)*
- **Pay on Delivery risk:** a former Jumia co-founder estimated about half of Nigerian cash-on-delivery customers don't end up buying the product. *(Opening: confirmation call/WhatsApp, deposits for large orders.)*

---

## 1.6 Jumia's own lessons about groceries (critical for you)

- Grocery/FMCG is a low-value, high-frequency category that Jumia treats as an entry point that increases engagement and customer lifetime value, but it carries **high fulfilment cost**.
- In late 2022 Jumia said it would **scale back first-party grocery** where the category was sub-scale, to focus on profitability.
- It launched **Jumia Food Mart** (quick commerce, 20-minute delivery) from neighbourhood micro-fulfilment points in a handful of Lagos areas.
- Industry commentary (Techpoint) notes the website and payment gateway are the *easy* part; the hard part is **consistent delivery of fresh, good-quality produce at competitive prices**. An earlier online grocer (Gloo.ng) shut its e-commerce operation.

**Takeaway:** a Jumia-style *website* for agro is straightforward. The business is won or lost on **sourcing, freshness, delivery cost and repeat orders**. Plan operations as seriously as software.

---

# PART 2: COPY / ADAPT / SKIP

| Jumia feature | Verdict | Agro adaptation |
|---|---|---|
| Wide search + category bar | **Copy** | Search should understand local names: "tatashe/rodo/bell pepper", "ugu/pumpkin leaf", "egusi/melon" (synonyms table) |
| Product card (price, rating, badges) | **Copy** | Add **unit** ("1 paint", "50 kg bag", "per kg") and **price-updated date** |
| Filters + sort | **Adapt** | Category, price, unit, availability, delivery day, seller/farm. Drop "gender", "brand" for produce |
| Flash sales | **Adapt** | "Today's fresh arrivals" and "Market-day deals" (time-boxed, stock-limited) |
| Official Stores | **Adapt** | "Verified Farms / Vendors" with badge |
| Seller score | **Copy (phase 2)** | Freshness score, on-time score |
| Express inspection badge | **Adapt** | "Quality-checked" badge by your team before dispatch |
| Pickup stations | **Adapt** | Pickup hubs in market areas / partner shops, or scheduled neighbourhood drop points |
| Pay on Delivery | **Adapt** | Allowed for small orders in covered zones; deposit or prepay above a threshold |
| 7-day returns | **Skip → replace** | Perishables can't be returned. Use **Freshness Guarantee**: report within 24 h with a photo → replacement or credit |
| Vouchers / wallets | **Later** | Referral credit, reseller discounts |
| Reviews | **Copy** | Verified-purchase, with photo upload |
| Cart persistence | **Copy** | Plus "Reorder last basket", a major retention tool for groceries |
| **Not on Jumia: group buying** | **Add** | **Share slots** (cow/goat): progress bar, closing date, delivery day. This is your differentiator |
| **Not on Jumia: bulk / reseller pricing** | **Add** | Tiered prices and a WhatsApp "bulk quote" button |

---

# PART 3: THE BUILD PLAN (14 STEPS)

> **Working assumption:** start as a **single-vendor store** (your business) built so it can later become a **multi-vendor marketplace**. This avoids Jumia's hardest problem (seller quality control) until you have demand.

---

## STEP 1. Decide the model, scope and success target
**Output:** a one-page decision record.

Decide, in writing:
- **Model:** single vendor now; marketplace later (recommended). Multi-vendor from day one multiplies work: seller onboarding, payouts, disputes.
- **Where you deliver first:** one city/zones only (e.g. specific Lagos areas). Delivery radius is your biggest cost lever.
- **Order channel:** website cart → checkout → *also* a "Send order on WhatsApp" fallback.
- **What you sell in v1:** your current price list (soup staples, peppers & veg, ginger/garlic, cow/goat shares).
- **Success target for first 90 days**, for example: 100 orders, 30% repeat rate, under 5% failed deliveries.

**Done when:** you can state the model, zone, channel and target in four sentences.

---

## STEP 2. Operations before software
**Output:** an operations checklist.

Jumia's grocery history shows ops decide survival. Answer these first:
- **Sourcing:** who supplies each item, how often, minimum quality, backup supplier?
- **Price updates:** who updates prices, how often (daily?), and how do you show it?
- **Stock rule:** do you sell from stock, or buy to order after payment? (Buy-to-order is safest for perishables and for share slots.)
- **Cold chain / handling** for meat and fish: cooler boxes, packaging, cut-off times.
- **Delivery:** own riders vs third-party; delivery fee table by zone (see Step 9).
- **Order cut-off and delivery days**, e.g. order by 6 pm → next-day delivery; share-day deliveries on a fixed day.
- **Freshness Guarantee policy** (replacement/credit rules).

**Done when:** a new staff member could fulfil an order using only your written checklist.

---

## STEP 3. Design the catalogue and category tree
**Output:** category tree + product-data standard.

**Suggested tree (matches your products):**

```
Meat & Shares
 ├─ Cow sharing slots
 ├─ Goat sharing packages
 └─ Whole cow & cow parts
Soup Staples
 ├─ Egusi & Ogbono
 ├─ Crayfish
 └─ Dried & smoked fish
Peppers & Vegetables
 ├─ Fresh tomatoes
 ├─ Peppers (tatashe, rodo, shombo, Cameroon, dried)
 └─ Onions
Ginger, Garlic & Spices
Grains, Beans & Tubers          (phase 2)
Oils & Seasonings               (phase 2)
Bundles & Combos                (e.g. "Egusi soup starter pack")
```

**Product-data standard (every product must have):**
- Name (+ local-name synonyms for search)
- Category
- **Sell unit**: paint, bag, kg, piece, pack, share slot
- Price per unit, optional **old price**
- Photos: at least 1 real product photo, square 1:1 crop, plain background if possible
- Short description (origin, grade, how to store)
- Stock status / quantity
- Freshness/handling note ("Perishable: refrigerate on arrival")
- **Price last updated** timestamp

**Seed it:** your existing price list (Ogbono ₦33,000/paint, Egusi ₦15,000/paint, tomatoes ₦14,000/paint, etc.) and the cow/goat share tables.

**Done when:** every item on your price list exists in a spreadsheet with all required fields filled.

---

## STEP 4. Map user journeys (before drawing screens)
**Output:** five journeys on one page.

1. **First-time buyer:** lands from Instagram/WhatsApp → sees prices → adds items → checks out as guest → pays or confirms → tracks.
2. **Repeat buyer:** logs in → "Reorder last basket" → adjusts → pays.
3. **Share buyer (cow/goat):** picks animal → picks slot size → sees "X of Y slots filled" → pays deposit/full → gets delivery day.
4. **Bulk / reseller:** requests quote → gets tiered price → orders by the carton/bag.
5. **Problem case:** item arrived poor → opens order → taps "Report a problem" + photo → gets replacement/credit.

**Rule:** design the problem case (journey 5) as carefully as the happy path. That is where Jumia loses trust.

---

## STEP 5. Design the UX (mobile-first)

### 5.1 Principles taken from Jumia
- Search on top, always visible.
- Few taps from home to cart: home → category → add → cart → pay = 5 taps.
- Prices and trust badges visible *on the card*, not behind a click.
- Help and delivery info reachable from the header.
- Fast on slow networks: small images, minimal JavaScript, works on low-end Android.

### 5.2 Key wireframes (mobile, 360px wide)

**Home**
```
┌────────────────────────┐
│ ☰  RONNIE'S   🔍  🛒2  │ sticky header
│ [ Search soup items… ] │
├────────────────────────┤
│ Fresh today · Lagos    │ banner (delivery day, cut-off time)
├────────────────────────┤
│ (Meat)(Soup)(Pepper)(…)│ category chips, horizontal scroll
├────────────────────────┤
│ COW SHARE · 62% filled │ featured share card w/ progress bar
│ [ Get a slot ]         │
├────────────────────────┤
│ Fresh arrivals         │ 2-column product grid
│ [card] [card]          │
│ [card] [card]          │
├────────────────────────┤
│ Why order from us      │ 3 trust lines (fresh, delivery, guarantee)
└────────────────────────┘
 ▲ sticky bottom bar: View order · 3 items · ₦47,000
```

**Product detail**
```
[ photo gallery, swipe ]
Egusi (peeled)          ★4.8 (32)
₦15,000 / paint   Price updated today
[ − 1 + ]   [ ADD TO ORDER ]
Delivery: Tomorrow before 6 pm · from ₦___ 
Freshness Guarantee ▸
Description · Storage · Reviews · Similar
```

**Share (cow/goat) card**
```
Cow sharing · Delivery Sat 7 Nov
Slot: (1.5kg) (3kg) (7.5kg) (15kg)
████████░░ 62% of slots taken · closes Thu 6 pm
₦24,000      [ Reserve my slot ]
```

**Cart / Checkout (3 steps max):** Items → Delivery (zone, date/window, address) → Pay (card/transfer/pay-on-delivery rules) → Confirmation.

### 5.3 Design system tokens
- **Colour:** brand green + warm red + gold accent (as on your flyers); ensure text contrast ≥ 4.5:1; provide dark mode.
- **Type:** one display face + one body face; body ≥ 16px on mobile (stops iOS auto-zoom on inputs).
- **Touch targets:** ≥ 44px tall; primary button full width in grids.
- **Images:** square crop in grid; lazy-loaded; ≤ 60 KB each in the list view.
- **Language:** plain English now; leave room for Pidgin/Yoruba labels later.

**Done when:** clickable mockups for Home, Category, Product, Share, Cart, Checkout, Order tracking exist and 5 real customers can complete a purchase with them.

---

## STEP 6. Choose your technology (two paths)

### Path A: Fastest (launch in 1–3 weeks, low code)
- A hosted store builder (Shopify, WooCommerce on WordPress, or a Nigerian store-builder) + payment gateway + WhatsApp order button.
- **Pros:** quick, cheap to start, admin included.
- **Cons:** weak support for share slots, delivery-zone pricing and multi-vendor; monthly fees; customising takes plugins.

### Path B: Custom (6–10 weeks, recommended if share slots + marketplace are the plan)
| Layer | Suggested choice | Notes |
|---|---|---|
| Front end | **Next.js (React)** or SvelteKit | Server-rendered for SEO and speed |
| Back end / API | Node.js (NestJS/Express) **or** a commerce engine such as **Medusa** | Medusa gives cart/orders/inventory out of the box |
| Database | **PostgreSQL** (e.g. managed Supabase/Neon) | Relational fits orders and inventory |
| Auth | Phone-number OTP + email | Nigerians often prefer phone login |
| Payments | **Paystack** or **Flutterwave** (cards, bank transfer, USSD) | Compare current fees before choosing |
| SMS/WhatsApp | An SMS provider (e.g. Termii) + WhatsApp links/Cloud API | For OTP and order updates |
| Images | Cloudinary or similar image CDN | Jumia's own image URLs show the same pattern: on-the-fly resized images (e.g. `fit-in/300x300`) |
| Hosting | Vercel / a Lagos-friendly VPS + CDN | |
| Admin | Custom admin or Medusa Admin | Product, price, stock, orders, delivery |
| Analytics | GA4 + Meta Pixel + server logs | |
| Error tracking | Sentry | |

**Hybrid recommendation:** launch **Path A** (or your current WhatsApp-order page) *now* to start selling and learning, while building **Path B** in parallel. Migrate when share slots and zone pricing become essential.

---

## STEP 7. Model the data

Core tables (simplified PostgreSQL):

```sql
-- Catalogue
categories(id, parent_id, name, slug, sort_order)
products(id, vendor_id, category_id, name, slug, description,
         status, search_synonyms text[], created_at)
product_variants(id, product_id, sku, label,        -- "1 paint", "Small net bag"
                 unit, price_ngn, old_price_ngn,
                 stock_qty, price_updated_at)
product_images(id, product_id, url, alt, sort_order)

-- Group-buy shares (your differentiator)
share_campaigns(id, product_id, title, total_slots, delivery_date,
                closes_at, status)                   -- open/filled/closed/delivered
share_slot_options(id, campaign_id, label, weight_kg, price_ngn,
                   slots_total, slots_taken)

-- Customers & addresses
users(id, name, phone, email, role)                  -- customer/admin/vendor
addresses(id, user_id, zone_id, street, landmark, phone)

-- Delivery
delivery_zones(id, name, fee_ngn, min_order_ngn, pay_on_delivery_allowed)
delivery_windows(id, zone_id, weekday, start_time, end_time, cutoff_time)

-- Orders
orders(id, user_id, status, subtotal_ngn, delivery_fee_ngn, total_ngn,
       payment_method, payment_status, delivery_window_id, notes, created_at)
order_items(id, order_id, variant_id, share_option_id, qty, unit_price_ngn)
payments(id, order_id, provider, reference, amount_ngn, status, raw_json)
order_events(id, order_id, status, note, created_at)  -- tracking timeline

-- Trust
reviews(id, product_id, order_item_id, user_id, rating, text, photo_url,
        verified_purchase)
issues(id, order_id, order_item_id, type, photo_url, status, resolution)
```

**Order status machine:**
`pending_payment → confirmed → sourcing → packed → out_for_delivery → delivered`  
side exits: `cancelled`, `failed_delivery`, `issue_reported → replaced/credited`.

**Rules that matter**
- Store **price at time of order** in `order_items` (prices change daily).
- A share slot is **reserved for 15–30 minutes** at checkout, then released if unpaid.
- Never trust the browser for totals: recompute on the server.

---

## STEP 8. Build the MVP features in priority order

**Must-have (Sprint 1–3)**
1. Catalogue pages: home, category, product detail, search (with synonyms).
2. Cart (persisted for logged-in users, local for guests).
3. Checkout: guest or phone-OTP, address + zone, delivery window, order notes.
4. Payments: card/transfer via gateway; optional pay-on-delivery rules.
5. Order confirmation + SMS/WhatsApp message with order number.
6. Admin: product/price/stock editor, order list with status updates, daily price update screen, export orders.
7. Static pages: Help, Delivery, Freshness Guarantee, Contact, Terms, Privacy.

**Should-have (Sprint 4–5)**
8. **Share slots** with progress bars and closing dates.
9. Filters and sorting (price, category, availability), recently viewed.
10. Order tracking page (timeline from `order_events`).
11. Reviews with photos (verified purchase only).
12. "Report a problem" flow for the Freshness Guarantee.
13. "Reorder last basket".

**Later (after launch)**
14. Seller onboarding portal and seller score (marketplace).
15. Vouchers, referral credit, wallet.
16. Reseller/bulk tiers and quote requests.
17. Subscriptions ("weekly soup pack").
18. Pickup hubs; multi-city zones.
19. Mobile app (a progressive web app first is cheaper).

---

## STEP 9. Delivery, pricing and payment rules

**Delivery zones (example structure; fill in your real numbers):**

| Zone | Example areas | Fee | Min order | Pay on delivery? | Windows |
|---|---|---|---|---|---|
| A | Nearest areas | ₦___ | ₦___ | Yes | Daily |
| B | Mid-distance | ₦___ | ₦___ | Up to ₦___ | Mon/Wed/Sat |
| C | Far | ₦___ | ₦___ | No (prepay) | Sat only |

**Payment policy suggestions**
- Prepay or deposit (e.g. 50%) for share slots and any order above a set value.
- Pay on delivery only for small orders in covered zones, **after a confirmation call/WhatsApp**.
- Offer bank transfer with automatic confirmation via the gateway (virtual account).
- Show **"delivery fee added at checkout"** early, since hidden fees are a top abandonment cause.

**Price display:** always show the unit and "Price updated [date]". Keep prices honest; if the market price moves, update before orders lock.

---

## STEP 10. Build trust features (Jumia's biggest lesson)

1. **Freshness Guarantee** page and badge on product cards.
2. **Real photos** of your actual stock (you already have these).
3. **Quality-checked badge** (your Express equivalent) with a plain explanation of what you check.
4. **Verified-purchase reviews**, and show the bad ones too.
5. **Clear contact:** WhatsApp number, phone, address, Instagram in the header/footer, as Jumia does.
6. **Delivery promise** on every product page ("Order by 6 pm, delivered tomorrow").
7. **Order tracking** with SMS/WhatsApp status messages.
8. **Policy pages written in plain language** (what's refundable, what isn't, how long it takes).

---

## STEP 11. SEO, discovery and marketing

**Technical SEO (copy Jumia's URL discipline)**
- Clean URLs: `/soup-staples/egusi-1-paint`, `/meat-shares/cow`.
- Filters and sort in the query string (`?sort=lowest-price&page=2`) so views can be shared.
- Add **schema.org Product** markup (name, price in NGN, availability, rating).
- Unique title/description per category and product ("Buy Egusi in Lagos: ₦15,000 per paint, delivered").
- Fast pages: compress images, lazy-load, avoid heavy scripts.

**Channels for your market**
- WhatsApp Business catalogue + status updates (daily prices).
- Instagram/TikTok: market-fresh videos, share-slot countdowns.
- Google Business Profile for local search.
- Referral: "Give a friend ₦1,000, get ₦1,000".
- Flyer QR code → site (your flyers already carry the phone number).
- Reseller/caterer outreach for bulk orders.

---

## STEP 12. Legal, safety and compliance (verify locally)

Check current Nigerian requirements with a professional before launch:
- **Business registration** (CAC) and tax registration.
- **Food handling / meat hygiene** rules and any licences for processing, packaging and selling meat and packaged foods (check with state health authorities and NAFDAC where packaged food products apply).
- **Data protection:** Nigeria's data-protection law (NDPA 2023) means consent for marketing, a privacy notice, and secure storage of customer data.
- **Consumer protection:** clear pricing, honest descriptions, a complaints route.
- **Payments:** use a licensed gateway; never store card numbers yourself.
- Terms of sale for **share products** (what happens if a campaign doesn't fill: refund or roll-over).

---

## STEP 13. Test, then soft-launch

**Test checklist**
- Cheap Android phone on 3G throttling: home page usable in under ~5 s?
- Full order on iPhone Safari, Android Chrome, and desktop.
- Failed payment, double-tap on Pay, back button during checkout.
- Server recalculates price if someone edits it in the browser.
- Share slot concurrency: two people grabbing the last slot.
- Admin changes price → storefront updates; old orders keep old price.
- SMS/WhatsApp messages are sent once, with correct order number.

**Soft launch**
1. 20–50 existing WhatsApp customers invited first; watch real orders.
2. Fix top five friction points; then open to the public.
3. Keep the WhatsApp order route as backup for the first month.

---

## STEP 14. Measure, learn, then scale to a marketplace

**Weekly dashboard**
- Visits → product views → add-to-cart → checkout start → paid orders (funnel).
- Average order value; repeat-order rate (30/60/90 days).
- Delivery success %, on-time %, issue-report %, replacement cost.
- Top searches with zero results (add those products or synonyms).
- Stock-outs and cancelled orders.

**Scale triggers → next phase**
| Signal | Next step |
|---|---|
| Customers ask for items you don't sell | Add categories (grains, beans, tubers, oils) |
| Orders cluster in new areas | Add delivery zones / pickup hubs |
| Other farmers/vendors ask to list | Build the vendor portal: KYC, training, listing approval, seller score (the Jumia model) |
| Repeat rate > 30% | Subscriptions, wallet, loyalty |
| Mobile traffic dominates | Ship the PWA/app |

---

# 8–10 WEEK TIMELINE (Path B)

| Week | Focus | Deliverable |
|---|---|---|
| 0 | Steps 1–2 | Decision record, ops checklist |
| 1 | Steps 3–4 | Category tree, product spreadsheet, journeys |
| 2 | Step 5 | Wireframes + design tokens, tested with 5 people |
| 3 | Steps 6–7 | Stack chosen, DB created, seed data loaded |
| 4–5 | Step 8 (must-have) | Catalogue, search, cart, checkout |
| 6 | Payments + messaging + admin | Test payments end-to-end |
| 7 | Step 8 (should-have) | Share slots, tracking, reviews, issues |
| 8 | Steps 10–12 | Trust pages, SEO, legal pages |
| 9 | Step 13 | Testing + soft launch |
| 10 | Step 14 | Dashboard, first improvements |

---

# PART 4: REFERENCE

## 4.1 Feature-to-priority matrix

| Feature | Jumia has it | Priority for you |
|---|---|---|
| Search with synonyms | Yes | **P0** |
| Category nav + landing pages | Yes | **P0** |
| Product cards w/ badges | Yes | **P0** |
| Cart + guest checkout | Yes | **P0** |
| Delivery zone/fee at checkout | Yes | **P0** |
| Card/transfer payments | Yes | **P0** |
| Pay on delivery rules | Yes | **P0** |
| WhatsApp contact/order | Yes (chat) | **P0** |
| Order tracking | Yes | P1 |
| Reviews (verified) | Yes | P1 |
| Filters + sort | Yes | P1 |
| Share slots (group buy) | **No** | **P0 (your edge)** |
| Freshness Guarantee | Partial (returns) | **P0** |
| Wishlist | Yes | P2 |
| Vouchers/wallet | Yes | P2 |
| Seller portal + score | Yes | P2 (marketplace phase) |
| Official stores | Yes | P3 |
| Flash sales | Yes | P2 |
| App | Yes | P3 (PWA first) |

## 4.2 Biggest risks and how to reduce them

| Risk | Mitigation |
|---|---|
| Perishable losses | Buy-to-order; daily cut-off; small safety stock; discount near-expiry |
| High delivery cost | Zones + minimum order; scheduled delivery days; batch routes |
| Pay-on-delivery no-shows | Confirmation call; deposit above threshold; limit zones |
| Price volatility | Daily price update workflow; price-date stamp; "confirm at dispatch" rule for large orders |
| Share campaign doesn't fill | Clear refund/roll-over terms; minimum-fill threshold before slaughter |
| Low trust at start | Real photos, reviews, visible contact, guarantee |
| Over-building | Launch with must-haves only; keep WhatsApp fallback |

## 4.3 Launch checklist

- [ ] Product spreadsheet complete (photos, units, prices, synonyms)
- [ ] Delivery zones, fees, windows entered
- [ ] Payment gateway live and tested with a real small transaction
- [ ] SMS/WhatsApp order messages tested
- [ ] Freshness Guarantee, Delivery, Terms, Privacy pages published
- [ ] Admin trained on daily price/stock update
- [ ] Riders/packing process rehearsed with 5 mock orders
- [ ] Analytics + error tracking installed
- [ ] Google Business Profile + social links updated
- [ ] Soft-launch list of 20–50 customers ready

## 4.4 Sources (accessed during research)

- Jumia Nigeria live pages: Supermarket landing page (header, navigation, filters, sorting, product-card badges, footer) and Groceries/All-categories pages: `jumia.com.ng/mlp-supermarket/`, `/groceries/`, `/mlp-all-categories/`
- Jumia Group, "About / Business": `group.jumia.com`
- TechCabal, Jumia Delivery network: `techcabal.com/?p=159952`
- Africa.com / Business Insider report on pickup stations and top-ordered categories: `africa.com/top-10-news/what-are-the-most-ordered-items-on-jumias-platform`
- NaijaTechGuide, "14 Ways Jumia makes shopping better" (2018; mobile share, pickup vs door-delivery cost) and "5 Ways Jumia makes shopping safer" (Express badge, seller rating)
- Dignited, "Ultimate guide to shopping on Jumia" (return window, Express timing)
- Jumia Vendor Hub policy pages: `vendor.jumia.com/?p=433` (seller-score surcharges), `vendorhub.jumia.sn/prohibited-products/` (listing approval)
- Nashthuo, "How to sell on Jumia in Kenya (2026)" (KYC, training, commission)
- Techpoint Africa, "Why groceries could be the magnetic pull…" (grocery economics, Gloo.ng)
- TechCabal / BusinessDay, Jumia Food Mart quick commerce (2022)
- Proshare, Jumia strategy update (Dec 2022; scaling back first-party grocery)
- How We Made It In Africa, former Jumia MD on Supermart and cash on delivery
- Cash Matters, Jumia and cash on delivery (2024)
- Trustpilot, Jumia Kenya reviews (return and listing-accuracy complaints)

*End of document.*
