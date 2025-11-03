import addToCart from "./cart.js";

// Fetching data
let allProducts;
async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    if (data) {
      allProducts = Array.isArray(data.products)
        ? data.products
        : [data.products];
    } else {
      throw new Error('Invalid data');
    }

  } catch (error) {
    console.log("Error fetching product details:", error);
  }
}

// displaying products
async function displayProduct(productArray) {
  const product_template = document.getElementById('js-product-template');
  const mainContainer = document.querySelector('.js-main-container');

  mainContainer.innerHTML = '';

  productArray.forEach((product) => {
    const productClone = product_template.content.cloneNode(true);
    const productImage = productClone.querySelector('.js-product-image'); 
    const productName = productClone.querySelector('.js-product-name');
    const productRating = productClone.querySelector('.js-product-rating');
    const ratingParticipants = productClone.querySelector('.js-rating-participants');
    const productPrice = productClone.querySelector('.js-product-price');
    // Product Quantity Select
    const productQuantitySelect = productClone.querySelector('.js-product-quantity-select');
    productQuantitySelect.dataset.productId = product.product_id;

    // add to cart button
    const addToCartButton = productClone.querySelector('.js-addToCartButton');
    addToCartButton.setAttribute('data-product-info', JSON.stringify(product));

    productImage.src = product.product_image;
    productName.innerHTML = product.product_name;
    productRating.src = `images/Ratings/rating-${product.product_rating}.png`;
    ratingParticipants.innerHTML = product.rating_participants;
    productPrice.innerHTML = `$${product.product_price.toFixed(2)}`;

    mainContainer.appendChild(productClone);
  });
}

// initial rendering
(async () => {
  await fetchProducts();
  displayProduct(allProducts);
})();


// making search interactive
const productSearchInputElement = document.querySelector('.js-product-search-input');
const productSearchButton = document.querySelector('.js-product-search-button');
let productSearchInputValue;
productSearchInputElement.addEventListener('input', (event) => {
  productSearchInputValue = event.target.value;
});                                                   

let filteredProducts;
function search() {
  if(!productSearchInputValue) {
    displayProduct(allProducts);
    return;
  }
  filteredProducts = allProducts.filter((product) => {
    return product.product_name.toLowerCase().includes(productSearchInputValue.toLowerCase());
  });
  displayProduct(filteredProducts);
}

productSearchButton.addEventListener('click', () => {
  search();
});

// making 'enter' key work to search
productSearchInputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    search();
  }
});

// calling imported functions
addToCart();

// making hamburgermenu work
const hamburgermenuElement = document.querySelector('.js-hamburger-menu');
const hamburgermenuListElem = document.querySelector('.js-hamburger-menu-list');
hamburgermenuElement.addEventListener('click', () => {
  hamburgermenuListElem.classList.toggle('hidden');
});

// hiding hamburgerElement when clicking anywhere outside the list
document.addEventListener('click', (event) => {
  if(!(hamburgermenuListElem.contains(event.target) || (hamburgermenuElement.contains(event.target)))) {
    hamburgermenuListElem.classList.add('hidden');
  }
});

const cartElem = document.querySelector('.js-hamburger-menu-list-cart');
cartElem.addEventListener('click', () => {
  window.location.href='checkout.html';
});

export function displayHamburgerMenuCartQuantity() {
  const hamburgermenuCartQuantityElem = document.querySelector('.js-hamburger-menu-cart-quantity');
  hamburgermenuCartQuantityElem.innerHTML = localStorage.getItem('cartQuantity');
}

// hiding when viwport width is 740px or wider
const mediaQuery = window.matchMedia('(min-width: 740px)');

mediaQuery.addEventListener('change', (event) => {
  if (event.matches) {
    hamburgermenuListElem.classList.add('hidden');
  }
});

displayHamburgerMenuCartQuantity();
