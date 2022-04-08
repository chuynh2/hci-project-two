"use strict";

var cartProductPrices = {
  "Hacker Certification": 100,
  "Good Hacker Certification": 200,
  "Great Hacker Certification": 300,
  "Pro Hacker Certification": 400,
  "Super Hacker Certification": 500,
  "Ultra Hacker Certification": 600,
  "Ultra Plus Hacker Certification": 700,
  "Ethical Hacker Certification": 300,
  "White Hat Hacker Certification": 450,
  "Teacher Hacker Certification": 250,
  "Penetration Tester Certification": 200,
  "Offensive Security Certification": 350
}

var cart = loadCartFromStorage();
console.log(cart);

// ======================================
// ===== LocalStorage Functionality =====
// ======================================
function loadCartFromStorage() {
  if (localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return {};
  }
}

function saveCartToStorage() {
  console.log(cart)
  localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart() {
  cart = {};
  saveCartToStorage();
}

// ==============================
// ===== Cart Functionality =====
// ==============================
function cartAddProduct(name, quantity=1) {
  if (isNaN(quantity) || !(name in cartProductPrices) || quantity <= 0) 
    return false;
  
  if (!(name in cart)) { // Item not in cart
    cart[name] = quantity
  } else { // Item exists in cart
    cart[name] += quantity
  }

  saveCartToStorage();
  return true;
}

function cartRemoveProduct(name, quantity=1) {
  if (isNaN(quantity) || !(name in cartProductPrices) || !(name in cart) || quantity <= 0) 
    return false;

  let count = cart[name]
  if (quantity >= count) { // Remove entirely
    delete cart[name];
  } else { // Update count
    cart[name] -= quantity;
  }
  
  saveCartToStorage();
  return true;
}

function cartSetProductQuantity(name, quantity=1) {
  if (isNaN(quantity) || !(name in cartProductPrices) || quantity <= 0)
    return false;
  
  cart[name] = quantity;
  
  saveCartToStorage();
  return true;
}

// ==========================
// ===== Update Summary =====
// ==========================
function updateSummary() {
  let summary = document.querySelector("#cart-summary")
  if (!summary) { // Should not be called on pages without summary display
    console.log("This page has no summary.")
    return
  }

  // TODO
}

// For pages with main containers
var pageMain = document.querySelector("main")

// === HOMESCREEN ===
if (pageMain && pageMain.id === "homescreen") {
  // ==============================
  // ===== Cart Functionality =====
  // ==============================
  var products = document.querySelectorAll(".products");

  products.forEach(product => {
    product.addEventListener("click", function(event) {
      let title = this.querySelector(".product-title").textContent.trim()
      let price = this.querySelector(".product-price").textContent.trim()
      price = price.match(/\d+/g) // Extract digits

      if (price.length > 0) {
        price = parseInt(price[0]) // Set as integer
      } else {
        console.log(`ERROR PARSING PRICE: ${title}`)
        return
      }

      if (!(title in cartProductPrices)) {
        console.log(`TITLE NOT FOUND: ${title}`)
        console.log("!! FIX ELEMENT !!", this)
        return
      }

      if (!cartAddProduct(title)) {
        console.log(`ERROR ADDING ${title} TO CART`)
        console.log("!! FIX ELEMENT !!", this)
        return
      }
    })
  })

  // =========================================
  // ===== Product Display Functionality =====
  // =========================================
  // Dynamically load/update store items
  function pageAddProduct(name, quantity=1) {
    // TODO
  }
  
  function pageRemoveProduct(name, quantity=1) {
    // TODO
  }
  
  function pageSetProductQuantity(name, quantity=1) {
    // TODO
  }
}

// For pages with form container
var pageForm = document.forms[0]; // First form on page


// === Cart ===
if (pageForm && pageForm.id == "cart") {
  // =========================================
  // ===== Product Display Functionality =====
  // =========================================
  // Remove/update element in cart
  function pageAddProduct(name, quantity=1) {
    // TODO
  }
  
  function pageRemoveProduct(name, quantity=1) {
    // TODO
  }
  
  function pageSetProductQuantity(name, quantity=1) {
    // TODO
  }
}

// === Checkout ===
if (pageForm && pageForm.id == "checkout") { // Apply to checkout webpage
  // ===== Enforce Billing Address Validation =====
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