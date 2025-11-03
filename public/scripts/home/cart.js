import { displayHamburgerMenuCartQuantity } from "./main.js";


function addToCart() {
  // cart quantity
  const mainContainer = document.querySelector('.js-main-container');

  const cartQuantityElement = document.querySelector('.js-cart-quantity')

  let cartQuantity = Number(localStorage.getItem('cartQuantity')) || 0;
  cartQuantityElement.innerHTML = cartQuantity;

  // cart items
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // reset cartQuantity and cartItems
  // localStorage.removeItem('cartItems');
  // localStorage.removeItem('cartQuantity');

  // addToCartButton
  mainContainer.addEventListener('click', (event) => {
    if(event.target && event.target.matches('.addToCartButton')) {
      // Increasing Cart Quantity
      const productInfo = JSON.parse(event.target.dataset.productInfo);

      const select = document.querySelector(`.js-product-quantity-select[data-product-id="${productInfo.product_id}"]`);

      cartQuantity = cartQuantity + Number(select.value);

      localStorage.setItem('cartQuantity', cartQuantity);

      cartQuantityElement.innerHTML = cartQuantity;
      displayHamburgerMenuCartQuantity();

      // Saving cartItems info and adding product_quantity in product info

      const itemIndex = cartItems.findIndex((item) => {
        return item.product_id === productInfo.product_id;
      })

      if(itemIndex >= 0) {
        cartItems[itemIndex].product_quantity += Number(select.value);
      } else {
        productInfo.product_quantity = Number(select.value);
        cartItems.push(productInfo);
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  });
}

const cart = document.querySelector('.js-cart-container');
cart.onclick = () => {
  window.location.href='checkout.html'
}

export default addToCart;