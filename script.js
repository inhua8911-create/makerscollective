/* The Makers Collective – prototype. Edit the data below to change content. */
const CATEGORIES = [
  { id: 'jewellery', name: 'Jewellery', icon: '💍', note: 'Rings, earrings, necklaces' },
  { id: 'crochet', name: 'Crochet', icon: '🧶', note: 'Soft, stitched by hand' },
  { id: 'paintings', name: 'Paintings', icon: '🎨', note: 'Original artwork' },
  { id: 'accessories', name: 'Accessories', icon: '👜', note: 'Bags, scarves, pouches' },
  { id: 'crafts', name: 'Crafts', icon: '✂️', note: 'Paper, wood and clay' },
  { id: 'decor', name: 'Home Décor', icon: '🏺', note: 'Pieces for every room' }
];

// Product photos live in the images/ folder. Replace a file (same name) to change a photo.
const PRODUCTS = [
  { id: 1, name: 'Pineapple Charm Pearl Bracelet', cat: 'jewellery', price: 399, creator: 'Meera Nair', img: 'images/pineapple-bracelet.jpg' },
  { id: 2, name: 'Royal Blue Pearl Weave Bracelet', cat: 'jewellery', price: 549, creator: 'Meera Nair', img: 'images/blue-pearl-bracelet.jpg' },
  { id: 3, name: 'Daisy & Crystal Charm Bracelet', cat: 'jewellery', price: 449, creator: 'Meera Nair', img: 'images/charm-crystal-bracelet.jpg' },
  { id: 4, name: 'Pearl Bracelet Set of Eight', cat: 'jewellery', price: 1799, creator: 'Meera Nair', img: 'images/pearl-bracelet-set.jpg' },
  { id: 5, name: 'Velvet Bloom Hair Clips, Large', cat: 'accessories', price: 349, creator: 'Little Bloom Crafts', img: 'images/velvet-flower-clips-large.jpg' },
  { id: 6, name: 'Mini Velvet Flower Clips, Set of 6', cat: 'accessories', price: 299, creator: 'Little Bloom Crafts', img: 'images/velvet-flower-clips-mini.jpg' },
  { id: 7, name: 'Chenille Lily Bouquet', cat: 'crafts', price: 599, creator: 'Little Bloom Crafts', img: 'images/chenille-lily-bouquet.jpg' },
  { id: 8, name: 'Sunflower & Daisy Flower Set', cat: 'crochet', price: 499, creator: 'Aisha Khan', img: 'images/sunflower-daisy-set.jpg' },
  { id: 9, name: 'Potted Flower Arrangement', cat: 'decor', price: 449, creator: 'Little Bloom Crafts', img: 'images/potted-flowers.jpg' }
];

const CREATORS = [
  { name: 'Meera Nair', craft: 'Beaded jewellery', city: 'Kochi', bio: 'Strings pearls, crystals and charms into bracelets with a story.', bg: '#b8553a' },
  { name: 'Little Bloom Crafts', craft: 'Velvet & chenille flowers', city: 'Bihar', bio: 'Makes flowers that never wilt, from hair clips to bouquets.', bg: '#8a9a7b' },
  { name: 'Aisha Khan', craft: 'Crochet & macramé', city: 'Hyderabad', bio: 'Turns cotton yarn into cosy, colourful home pieces.', bg: '#a8745a' },
  { name: 'Rohan Das', craft: 'Paintings', city: 'Kolkata', bio: 'Paints folk motifs and hill landscapes in bold colour.', bg: '#5f6f52' }
];

const $ = (s) => document.querySelector(s);
const inr = (n) => '₹' + n.toLocaleString('en-IN');
let activeCat = 'all';
let cart = [];

/* ---------- Cart storage ---------- */
try { cart = JSON.parse(localStorage.getItem('mc_cart')) || []; } catch (e) { cart = []; }
const saveCart = () => { try { localStorage.setItem('mc_cart', JSON.stringify(cart)); } catch (e) {} };

/* ---------- Render ---------- */
function renderCategories() {
  $('#catGrid').innerHTML = CATEGORIES.map(c =>
    `<button class="cat" data-cat="${c.id}"><span>${c.icon}</span><strong>${c.name}</strong><small>${c.note}</small></button>`).join('');
  const chips = [{ id: 'all', name: 'All' }, ...CATEGORIES];
  $('#filters').innerHTML = chips.map(c =>
    `<button class="chip" data-cat="${c.id}">${c.name}</button>`).join('');
  $('select[name="craft"]').insertAdjacentHTML('beforeend',
    CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join(''));
}

function renderProducts() {
  const list = PRODUCTS.filter(p => activeCat === 'all' || p.cat === activeCat);
  document.querySelectorAll('.chip').forEach(b => b.classList.toggle('active', b.dataset.cat === activeCat));
  $('#productGrid').innerHTML = list.length ? list.map(p => `
    <article class="card">
      <div class="card-img"><img src="${p.img}" alt="${p.name}, handmade by ${p.creator}" loading="lazy"></div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <span class="by">by ${p.creator}</span>
        <div class="card-foot"><span class="price">${inr(p.price)}</span>
        <button class="add" data-add="${p.id}">Add to cart</button></div>
      </div>
    </article>`).join('') : '<p class="empty">Nothing here yet. New pieces arrive soon.</p>';
}

function renderCreators() {
  $('#creatorGrid').innerHTML = CREATORS.map(c => `
    <article class="creator">
      <div class="avatar" style="--bg:${c.bg}">${c.name[0]}</div>
      <h3>${c.name}</h3>
      <span class="craft">${c.craft}</span>
      <p>${c.city}. ${c.bio}</p>
    </article>`).join('');
}

function renderCart() {
  const items = cart.map(i => ({ ...i, p: PRODUCTS.find(p => p.id === i.id) })).filter(i => i.p);
  $('#cartItems').innerHTML = items.length ? items.map(({ id, qty, p }) => `
    <div class="line">
      <div class="thumb"><img src="${p.img}" alt=""></div>
      <div><b>${p.name}</b><small>${inr(p.price)} each</small>
        <div class="qty"><button data-dec="${id}" aria-label="Decrease quantity">−</button>${qty}<button data-inc="${id}" aria-label="Increase quantity">+</button></div></div>
      <div style="text-align:right"><b>${inr(p.price * qty)}</b><br><button class="rm" data-rm="${id}">Remove</button></div>
    </div>`).join('') : '<p class="empty">Your cart is empty. Add a piece you love.</p>';
  const total = items.reduce((s, i) => s + i.p.price * i.qty, 0);
  $('#cartTotal').textContent = inr(total);
  $('#cartCount').textContent = items.reduce((s, i) => s + i.qty, 0);
  $('#checkoutBtn').disabled = !items.length;
}

/* ---------- Cart actions ---------- */
function addToCart(id) {
  const line = cart.find(i => i.id === id);
  line ? line.qty++ : cart.push({ id, qty: 1 });
  update(); openCart();
}
function changeQty(id, d) {
  const line = cart.find(i => i.id === id);
  if (!line) return;
  line.qty += d;
  if (line.qty < 1) cart = cart.filter(i => i.id !== id);
  update();
}
function update() { saveCart(); renderCart(); }

function openCart() { $('#cart').classList.add('open'); $('#cart').setAttribute('aria-hidden', 'false'); $('#overlay').hidden = false; }
function closeCart() { $('#cart').classList.remove('open'); $('#cart').setAttribute('aria-hidden', 'true'); $('#overlay').hidden = true; }

/* ---------- Events ---------- */
document.addEventListener('click', (e) => {
  const t = e.target.closest('button, a');
  if (!t) return;
  const d = t.dataset;
  if (d.cat) { activeCat = d.cat; renderProducts(); if (t.classList.contains('cat')) $('#shop').scrollIntoView({ behavior: 'smooth' }); }
  if (d.add) addToCart(+d.add);
  if (d.inc) changeQty(+d.inc, 1);
  if (d.dec) changeQty(+d.dec, -1);
  if (d.rm) { cart = cart.filter(i => i.id !== +d.rm); update(); }
  if (t.tagName === 'A' && t.closest('#navLinks')) closeMenu();
});
$('#cartBtn').onclick = openCart;
$('#closeCart').onclick = closeCart;
$('#overlay').onclick = closeCart;
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });
$('#clearCart').onclick = () => { cart = []; update(); };
$('#checkoutBtn').onclick = () => {
  cart = []; update();
  const m = $('#cartMsg'); m.hidden = false;
  m.textContent = 'Thank you! This is a demo, so no payment was taken.';
  setTimeout(() => (m.hidden = true), 4000);
};

const closeMenu = () => { $('#navLinks').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', 'false'); };
$('#menuBtn').onclick = () => {
  const open = $('#navLinks').classList.toggle('open');
  $('#menuBtn').setAttribute('aria-expanded', open);
};

/* ---------- Creator form ---------- */
const form = $('#creatorForm');
const rules = {
  name: (v) => v.trim().length >= 2 || 'Enter your full name.',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email, like name@example.com.',
  phone: (v) => /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '')) || 'Enter a 10-digit Indian mobile number.',
  craft: (v) => v !== '' || 'Choose the craft you make.',
  about: (v) => v.trim().length >= 20 || 'Write at least 20 characters about your work.'
};
function validateField(el) {
  const res = rules[el.name](el.value);
  el.classList.toggle('bad', res !== true);
  el.parentElement.querySelector('.err').textContent = res === true ? '' : res;
  return res === true;
}
form.querySelectorAll('input,select,textarea').forEach(el => el.addEventListener('blur', () => validateField(el)));
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const ok = [...form.elements].filter(el => rules[el.name]).map(validateField).every(Boolean);
  const msg = $('#formSuccess');
  if (!ok) { msg.hidden = true; form.querySelector('.bad').focus(); return; }
  msg.hidden = false;
  msg.textContent = `Thanks, ${form.name.value.trim().split(' ')[0]}! Your application is in. (Demo only: nothing was sent.)`;
  form.reset();
});

/* ---------- Init ---------- */
renderCategories(); renderProducts(); renderCreators(); renderCart();
