window.RONNIES_FIREBASE_CONFIG = {
  enabled: false,
  databaseURL: 'https://your-project-default-rtdb.firebaseio.com'
};

window.RONNIES_DATA = {
  store: {
    wa: '2348130983206',
    tel: '08130983206'
  },
  images: {
    cow: 'https://th.bing.com/th/id/R.ce1c2e93f095a02fc30520af41a74d2f?rik=eDQn99n5QTQwOw&pid=ImgRaw&r=0',
    goat: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80',
    egusi: 'https://images.squarespace-cdn.com/content/v1/54222358e4b0ef23d87a996b/1595194400472-8UENRHLEK4676KZ5JXTR/DAMq1AfVYAA9B09.jpg',
    rice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
    beans: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80',
    soybeans: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=80',
    groundnuts: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80',
    ogbono: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=80',
    crayfish: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    catfish: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
    tomato: 'https://static.vecteezy.com/system/resources/thumbnails/047/830/714/small_2x/a-vibrant-assortment-of-fresh-vegetables-including-peppers-onions-lettuce-broccoli-tomatoes-corn-and-garlic-arranged-on-a-white-background-png.png',
    tatashe: 'https://images.unsplash.com/photo-1592841200221-1f056f1d5d6f?auto=format&fit=crop&w=900&q=80',
    pepper: 'https://static.vecteezy.com/system/resources/thumbnails/047/830/714/small_2x/a-vibrant-assortment-of-fresh-vegetables-including-peppers-onions-lettuce-broccoli-tomatoes-corn-and-garlic-arranged-on-a-white-background-png.png',
    ginger: 'https://thumbs.dreamstime.com/b/fresh-herbs-spices-garlic-cooking-food-photography-close-up-shot-white-background-vibrant-image-captures-341599089.jpg',
    garlic: 'https://thumbs.dreamstime.com/b/fresh-herbs-spices-garlic-cooking-food-photography-close-up-shot-white-background-vibrant-image-captures-341599089.jpg',
    home: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    soup: 'https://images.squarespace-cdn.com/content/v1/54222358e4b0ef23d87a996b/1595194400472-8UENRHLEK4676KZ5JXTR/DAMq1AfVYAA9B09.jpg',
    pepperVeg: 'https://static.vecteezy.com/system/resources/thumbnails/047/830/714/small_2x/a-vibrant-assortment-of-fresh-vegetables-including-peppers-onions-lettuce-broccoli-tomatoes-corn-and-garlic-arranged-on-a-white-background-png.png',
    spice: 'https://thumbs.dreamstime.com/b/fresh-herbs-spices-garlic-cooking-food-photography-close-up-shot-white-background-vibrant-image-captures-341599089.jpg'
  },
  categories: [
    ['meat', 'Meat shares'],
    ['soup', 'Soup staples'],
    ['pep', 'Peppers & veg'],
    ['spice', 'Ginger & garlic'],
    ['staple', 'Staple foods']
  ],
  testimonials: [],
  faq: [
    ['How do I order?', 'Add items to your cart, check out, and tap the WhatsApp button on the confirmation page. Ronnie’s confirms availability and delivery on WhatsApp.'],
    ['Where do you deliver?', 'Ronnie’s Agro Foods is based in Lagos State, with home and office delivery available. Delivery charges apply and are confirmed with your order.'],
    ['What is a paint?', 'A paint is the standard bucket measure used in the market. Each product shows its unit under the name.'],
    ['Can I order in bulk?', 'Yes, bulk orders are welcome. Message us on WhatsApp for a quote.'],
    ['How do shares work?', 'Choose a slot size or package, then reserve early. Cow and goat shares are processed hygienically and delivered to you.'],
    ['I added the wrong item. What now?', 'Call or message us with your order number and we’ll fix it.']
  ],
  parts: [
    ['Full cow', 1000000],
    ['Half cow', 500000],
    ['Quarter cow', 250000],
    ['Cow head', 100000],
    ['Cow tongue', 20000],
    ['4 cow legs', 32000],
    ['Cow tail', 30000],
    ['Full hand', 180000],
    ['Full laps', 150000]
  ],
  products: [
    {
      id: 'cow',
      c: 'meat',
      n: 'Cow sharing slots',
      sn: 'Cow share',
      img: 'cow',
      d: 'Share a cow with other families and pay only for your portion. Hygienically processed, fresh and well packaged.',
      gn: ['Slot size'],
      g: [['1.5 kg', '3 kg', '7.5 kg', '15 kg']],
      pr: {
        '1.5 kg': 12000,
        '3 kg': 24000,
        '7.5 kg': 60000,
        '15 kg': 120000
      }
    },
    {
      id: 'goat',
      c: 'meat',
      n: 'Goat sharing packages',
      sn: 'Goat package',
      img: 'goat',
      d: 'Fresh goat meat shared by the quarter, half or full. Reserve early to secure your preferred package.',
      gn: ['Package', 'Share'],
      g: [['Standard', 'Premium', 'Deluxe'], ['Quarter', 'Half', 'Full']],
      hint: {
        Standard: 'Perfect for small families.',
        Premium: 'Ideal for medium-sized families and gatherings.',
        Deluxe: 'Best for large families, celebrations and special occasions.'
      },
      pr: {
        'Standard|Quarter': 20000,
        'Standard|Half': 40000,
        'Standard|Full': 80000,
        'Premium|Quarter': 30000,
        'Premium|Half': 60000,
        'Premium|Full': 120000,
        'Deluxe|Quarter': 37500,
        'Deluxe|Half': 75000,
        'Deluxe|Full': 150000
      }
    },
    {
      id: 'parts',
      c: 'meat',
      n: 'Whole cow & cow parts',
      sn: 'Cow',
      d: 'Take the whole animal or just the part you need.',
      gn: ['Part'],
      g: [['Full cow', 'Half cow', 'Quarter cow', 'Cow head', 'Cow tongue', '4 cow legs', 'Cow tail', 'Full hand', 'Full laps']],
      pr: {
        'Full cow': 1000000,
        'Half cow': 500000,
        'Quarter cow': 250000,
        'Cow head': 100000,
        'Cow tongue': 20000,
        '4 cow legs': 32000,
        'Cow tail': 30000,
        'Full hand': 180000,
        'Full laps': 150000
      }
    },
    { id: 'egusi', c: 'soup', n: 'Egusi', u: '1 paint', p: 15000, img: 'egusi' },
    { id: 'ogbono', c: 'soup', n: 'Ogbono', u: '1 paint', p: 33000, img: 'ogbono' },
    { id: 'cray-s', c: 'soup', n: 'Small crayfish', u: '1 paint', p: 13000, img: 'crayfish' },
    { id: 'cray-b', c: 'soup', n: 'Big crayfish', u: '1 paint', p: 25000 },
    { id: 'cat', c: 'soup', n: 'Dried catfish', u: '10 standard pieces', p: 25000, img: 'catfish' },
    { id: 'rice', c: 'staple', n: 'Rice', u: '1 paint', p: 28000, img: 'rice' },
    { id: 'beans', c: 'staple', n: 'Beans', u: '1 paint', p: 26000, img: 'beans' },
    { id: 'soyabeans', c: 'staple', n: 'Soyabeans', u: '1 paint', p: 24000, img: 'soybeans' },
    { id: 'groundnuts', c: 'staple', n: 'Groundnuts', u: '1 paint', p: 22000, img: 'groundnuts' },
    { id: 'tom', c: 'pep', n: 'Fresh tomatoes', u: '1 paint', p: 14000, img: 'tomato' },
    { id: 'tat', c: 'pep', n: 'Tatashe', u: '1 paint', p: 10000, img: 'tatashe' },
    { id: 'cam', c: 'pep', n: 'Cameroon pepper', u: '1 paint', p: 16000, img: 'pepper' },
    { id: 'dry', c: 'pep', n: 'Dried pepper', u: '1 paint', p: 12000 },
    { id: 'smp', c: 'pep', n: 'Small pepper', u: '1 paint', p: 8000 },
    { id: 'sho', c: 'pep', n: 'Shombo pepper', u: '1 paint', p: 8000 },
    { id: 'oni', c: 'pep', n: 'Onions', u: '1 paint', p: 8000 },
    { id: 'gin', c: 'spice', n: 'Fresh ginger', u: '1 paint', p: 40000, img: 'ginger' },
    { id: 'gar', c: 'spice', n: 'Fresh garlic', u: 'Small net bag', p: 9000, img: 'garlic' }
  ]
};
