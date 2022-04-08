"use strict";

var pageForm = document.forms[0]; // First page form

/*
  Enforce Billing Address Validation
*/
if (pageForm && pageForm.id == "checkout") { // Apply to checkout webpage
  function toggleBillingAddressValidation(validate) {
    let inputs = document.querySelectorAll("#address-b-form input")
    let ignore_ids = ["address2-b"]

    inputs.forEach(input => {
      // Don't change ignored ids
      input.required = (!ignore_ids.includes(input.id)) ? validate : input.required
    })
  }

  var billingCheckbox = document.getElementById("show-address-b")

  toggleBillingAddressValidation(billingCheckbox.checked) // Handle current state
  billingCheckbox.addEventListener("click", function() { // Handle state changes
    toggleBillingAddressValidation(billingCheckbox.checked)
  })
}

// Shopping cart functionality
// TO-DO:
// removeProductFromCart()
// updateQuantityOfProduct()
// Other utility functions if necessary
var cart = loadCartFromStorage();
console.log(cart);

// Event listeners
if (document.querySelector("main").id === "homescreen") {
  var products = document.querySelectorAll(".products");

  for (var i = 0; i < products.length; i++) {
    products[i].querySelector(".add-to-cart").addEventListener("click", addProductToCart);
  }
}

function loadCartFromStorage() {
  if (localStorage.getItem("cart") != null) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
}

function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart() {
  cart = [];
  saveCartToStorage();
}

function addProductToCart(event) {
  var productDetails = event.target.parentElement.parentElement;
  var productTitle = productDetails.querySelector(".product-title").innerHTML;
  var productPrice = productDetails.querySelector(".product-price").innerHTML;

  // If product is already in cart just increase quantity by 1
  for (var i = 0; i < cart.length; i++) {
    var product = cart[i];
    if (product.title === productTitle) {
      product.quantity += 1;
      saveCartToStorage();
      return;
    }
  }

  productPrice = productPrice.replace(/[^\d.]/g, ''); // Remove any non-digit characters from the product price

  var product = {
    "title": productTitle,
    "price": productPrice,
    "quantity": 1
  };

  cart.push(product);
  saveCartToStorage();
}

function removeProductFromCart(event) {
  // Remove products from the cart object and then update localStorage
}

function updateQuantityOfProduct(productTitle, quantity) {
  // Allow user to specify a quantity and update it with this function
}
