function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  let cartQuantity = Number(localStorage.getItem('cartQuantity'));
  if(!cartItems) {
    return;
  }

  // displaying Cart Quantity
  const cartQuantityElement = document.querySelectorAll('.js-cart-quantity');
  cartQuantityElement.forEach((element) => {
    element.innerHTML = cartQuantity;
  });

  const cartItemsContainer = document.querySelector('.js-cart-items-container');
  cartItemsContainer.innerHTML = '';
  const itemTemplate = document.querySelector('.js-cart-item-template');

  
  // Displaying Calculations
  const totalPriceElement = document.querySelector('.js-total-price');
  const totalBeforeTaxElement = document.querySelector('.js-total-before-tax');
  const taxElement = document.querySelector('.js-tax');
  const orderTotalElement = document.querySelector('.js-order-total');
  let totalPrice = 0;
  const shippingCost = 0

  // check 0
  function renderResult(number, element) {
    number 
    ? element.innerHTML = `$${number.toFixed(2)}`
    : element.innerHTML = 0;
  }

  function displayCalculations() {
    renderResult(totalPrice, totalPriceElement);

    const totalBeforeTax = totalPrice + shippingCost;
    renderResult(totalBeforeTax, totalBeforeTaxElement);

    const tax = (totalPrice/100) * 10;
    renderResult(tax, taxElement);

    renderResult(totalBeforeTax + tax, orderTotalElement);
  }

  displayCalculations();

  cartItems.forEach((item, index) => {
    const itemClone = itemTemplate.content.cloneNode(true);

    const itemImage = itemClone.querySelector('.item-image');
    const itemName = itemClone.querySelector('.item-name');
    const itemPrice = itemClone.querySelector('.item-price');
    const itemQuantity = itemClone.querySelector('.item-quantity');

    const updateItem = itemClone.querySelector('.js-update-item');
    const deleteItem = itemClone.querySelector('.js-delete-item');


    itemImage.setAttribute('src', `${item.product_image}`);
    itemName.innerHTML = item.product_name;
    itemPrice.innerHTML = `$${item.product_price.toFixed(2)}`;
    itemQuantity.innerHTML = item.product_quantity;

    // Total Price of the item
    const itemTotalPrice = item.product_price * item.product_quantity;
    totalPrice += itemTotalPrice;
    displayCalculations();

    // update item
    updateItem.addEventListener('click', () => {

      if(updateItem.innerHTML === 'Update') {
      itemQuantity.innerHTML = `
        <input class="js-item-quantity-input" type="number" min="1" max="10" step="1" 
        value="${item.product_quantity}"
        data-product-id = "${item.product_id}"
        >
      `
      updateItem.innerHTML = "save"
      } else {
        const itemQuantityInput = itemQuantity.querySelector('.js-item-quantity-input');
        const difference = Number(itemQuantityInput.value) - Number(item.product_quantity);
        cartQuantity += difference;

        localStorage.setItem('cartQuantity', cartQuantity);

        item.product_quantity = itemQuantityInput.value;
        itemQuantity.innerHTML = item.product_quantity; 

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        updateItem.innerHTML = "Update" 

        displayCartItems();
      }
    });
    
    // delete item
    deleteItem.addEventListener('click', () => {
      cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      let cartQuantity = localStorage.getItem('cartQuantity');
      cartQuantity -= item.product_quantity;
      localStorage.setItem('cartQuantity', cartQuantity);

      displayCartItems();
    });

    cartItemsContainer.appendChild(itemClone);
  });
}

displayCartItems();


// redirecting to home when amazon logo is clicked
const leftSection = document.querySelector('.js-left-section');
leftSection.addEventListener('click', () => {
  window.location.href='home.html';
});