const cart = [];

const cartCountEl = document.querySelector('.cart-count');
const cartItemCountEl = document.getElementById('cartItemCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const productCards = [...document.querySelectorAll('.product-card')];
const categoryButtons = [...document.querySelectorAll('.category-btn')];
const searchInput = document.getElementById('searchInput');

function updateCartUI() {
  cartCountEl.textContent = cart.length;
  cartItemCountEl.textContent = `${cart.length} item${cart.length === 1 ? '' : 's'}`;

  if (!cart.length) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    cartTotalEl.textContent = '$0.00';
    return;
  }

  const totals = cart.reduce((sum, item) => sum + item.price, 0);
  cartItemsEl.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <div class="cart-item-name">${item.name}</div>
          </div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
      `
    )
    .join('');

  cartTotalEl.textContent = `$${totals.toFixed(2)}`;
}

function addToCart(productName, price) {
  cart.push({ name: productName, price });
  updateCartUI();
}

productCards.forEach((card) => {
  const productName = card.dataset.name;
  const priceText = card.querySelector('.product-footer strong').textContent.replace('$', '');
  const price = Number(priceText);

  const button = card.querySelector('.add-to-cart');
  button.addEventListener('click', () => addToCart(productName, price));
});

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    categoryButtons.forEach((entry) => entry.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    productCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.style.display = matches ? 'block' : 'none';
    });
  });
});

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  const activeFilter = document.querySelector('.category-btn.active')?.dataset.filter || 'all';

  productCards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category;
    const matchesQuery = name.includes(query);
    const matchesCategory = activeFilter === 'all' || category === activeFilter;
    card.style.display = matchesQuery && matchesCategory ? 'block' : 'none';
  });
});

updateCartUI();
