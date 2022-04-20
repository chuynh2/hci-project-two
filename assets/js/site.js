"use strict";

// Simulate data received from server
var cartProducts = {
  "Hacker Certification": {
    desc: "This certification will turn you into a hacker.",
    price: 100
  },
  "Good Hacker Certification": {
    desc: "This certification will turn you into a good hacker.",
    price: 200
  },
  "Great Hacker Certification": {
    desc: "This certification will turn you into a great hacker.",
    price: 300
  },
  "Pro Hacker Certification": {
    desc: "This certification will turn you into a pro hacker.",
    price: 400
  },
  "Super Hacker Certification": {
    desc: "This certification will turn you into a super hacker.",
    price: 500
  },
  "Ultra Hacker Certification": {
    desc: "This certification will turn you into a ultra hacker.",
    price: 600
  },
  "Ultra Plus Hacker Certification": {
    desc: "This certification will turn you into a ultra plus hacker.",
    price: 700
  },
  "Ethical Hacker Certification": {
    desc: "This certification will turn you into a ethical hacker.",
    price: 300
  },
  "White Hat Hacker Certification": {
    desc: "This certification will turn you into a white hacker.",
    price: 450
  },
  "Teacher Hacker Certification": {
    desc: "This certification will turn you into a teacher hacker.",
    price: 250
  },
  "Penetration Tester Certification": {
    desc: "This certification will turn you into a penetration hacker.",
    price: 200
  },
  "Offensive Security Certification": {
    desc: "This certification will turn you into a offensive hacker.",
    price: 350
  }
}

var cart = loadCartFromStorage();
updateCartLink();
updateItemAmount();

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
  if (isNaN(quantity) || !(name in cartProducts) || quantity <= 0)
    return false;

  if (!(name in cart)) { // Item not in cart
    cart[name] = quantity
  } else { // Item exists in cart
    cart[name] += quantity
  }

  updateCartLink();
  updateItemAmount();
  updatePopupList();
  saveCartToStorage();
  return true;
}

function cartRemoveProduct(name) {
  if (!(name in cart))
    return false;

  delete cart[name];

  updateCartLink();
  updateItemAmount();
  saveCartToStorage();
  return true;
}

function cartSetProductQuantity(name, quantity=1) {
  if (isNaN(quantity) || !(name in cartProducts) || quantity <= 0)
    return false;

  cart[name] = quantity;

  updateCartLink();
  updateItemAmount();
  saveCartToStorage();
  return true;
}

function getCartSize() {
  let count = 0;

  // Get an array of all the values in the cart with Object.values(cart)
  // and count how many of each item
  Object.values(cart).forEach(item => {
    count += parseInt(item);
  })

  return count;
}

function updateCartLink() {
  let links = document.querySelector("#pages").querySelectorAll("a");
  let cartSize = getCartSize();

  links.forEach(link => {
    if (link.getAttribute("href") === "./cart/")
      link.innerHTML = cartSize > 0 ? `Cart (${getCartSize()})` : "Cart";
  })
}

function updateItemAmount() {
  let cartSize = getCartSize();
  let cartTitle = document.querySelector("#cart-items-container h1");
  if(cartTitle){
    cartTitle.innerHTML = cartSize > 1 ? `Shopping Cart(${getCartSize()} Items)`
                                       : `Shopping Cart(${getCartSize()} Item)`;
  }
}

// ==========================
// ===== Update Summary =====
// ==========================
function updateSummary() {
  let summary = document.getElementById("cart-summary")
  if (!summary) { // Should not be called on pages without summary display
    console.log("This page has no summary.")
    return
  }

  let totListElem = summary.querySelector("#cost-total.category").parentElement
  let subtotListElem = summary.querySelector("#cost-subtotal.category").parentElement
  let feeListElem = summary.querySelector("#cost-fee.category").parentElement
  let taxListElem = summary.querySelector("#cost-tax.category").parentElement

  let totValueElem = totListElem.getElementsByClassName("value")[0]
  let subtotValueElem = subtotListElem.getElementsByClassName("value")[0]
  let feeValueElem = feeListElem.getElementsByClassName("value")[0]
  let taxValueElem = taxListElem.getElementsByClassName("value")[0]

  let total = 0, subtotal = 0, fee = 50, tax = 0;

  for (const [title, count] of Object.entries(cart)) {
    if (title in cartProducts) {
      if (isNaN(count) || count <= 0) {
        console.log(`ERROR: ${title} has invalid count.`)
        continue
      }

      let productDetails = cartProducts[title]
      total = subtotal += (productDetails.price * count)
    } else {
      console.log(`ERROR: "${title}" Not found in cartProducts`)
    }
  }

  tax = subtotal * (6.25/100) // 6.25% fee
  total = subtotal + tax + fee;

  totValueElem.textContent = `$${total}`
  subtotValueElem.textContent = `$${subtotal}`
  feeValueElem.textContent = `$${fee}`
  taxValueElem.textContent = `$${tax}`
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

      if (!(title in cartProducts)) {
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
  function getProductTemplate() {
    let templateHTML = `
      <img class="icon" src="../assets/img/trophy.png" alt="Certificate Image">
      <ul class="details">
        <li class="title"></li>
        <li class="description"></li>
      </ul>
      <section class="misc">
        <h2 class="price"></h2>
        <input type="button" class="remove" value="Remove">
        <input type="number" class="quantity" value="0">
      </section>
    `

    let product = document.createElement("li")
    product.className = "cart-item"
    product.innerHTML = templateHTML

    return product
  }

  let cartContainer = document.getElementById("cart-items")
  let template = getProductTemplate() // Blank product element

  // == Load Cart ==
  for (const [title, count] of Object.entries(cart)) {
    if (title in cartProducts) {
      pageAddProduct(title, count)
    } else {
      console.log(`ERROR: "${title}" Not found in cartProducts`)
    }
  }

  function pageAddProduct(name, quantity=1) {
    if (isNaN(quantity) || !(name in cartProducts) || quantity <= 0)
      return false;

    let productDetails = cartProducts[name]
    let newProduct = template.cloneNode(true) // Clone deep

    let titleElem = newProduct.querySelector(".title")
    let descElem = newProduct.querySelector(".description")
    let priceElem = newProduct.querySelector(".price")
    let quantityElem = newProduct.querySelector(".quantity")

    titleElem.textContent = name
    descElem.textContent = productDetails.desc
    priceElem.textContent = `$${productDetails.price}`
    quantityElem.value = cart[name]

    cartContainer.appendChild(newProduct)
    return true
  }

  function pageRemoveProduct(itemElement) {
    itemElement.remove();
  }

  let cartItemElements = document.querySelectorAll(".cart-item");

  cartItemElements.forEach(item => {
    // == Remove Button Functionality ==
    let removeButton = item.querySelector(".remove");
    let productName = item.querySelector(".title").textContent;

    removeButton.addEventListener("click", function(event) {
      pageRemoveProduct(item);
      cartRemoveProduct(productName);
      updateSummary();
    });

    // == Quantity selector functionality ==
    let quantityElem = item.querySelector(".quantity");

    quantityElem.addEventListener("change", function(event) {
      cartSetProductQuantity(productName, parseInt(event.target.value)); // parseInt() to avoid causing errors when displaying cart size
      updateSummary();
    })
  })

  updateSummary(); // Update summary display
}

// === Checkout ===
if (pageForm && pageForm.id == "checkout") { // Apply to checkout webpage
  // == Update Summary ==
  updateSummary()

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


// === Cart Popup ===
var cartPopup = document.querySelector("#cart-popup");
if(cartPopup) {
  cartPopup.setAttribute('aria-hidden', 'true');
  cartPopup.setAttribute('disabled', 'disabled');

  addProductsToPopup();

  var addCartButton = document.querySelectorAll(".add-to-cart");
  addCartButton.forEach(item => {
    item.addEventListener("click", showPopup);
    item.addEventListener("click", debounce(closePopup, 3000));
  });
}

function showPopup(event) {
  window.scrollTo(0, 0);
  updatePopupList(this);
  this.classList.add('added-item');
  cartPopup.setAttribute('aria-hidden', 'false');
  cartPopup.removeAttribute('disabled');

  let templateHTML = `
      <img src="assets/img/checked.png" alt="success tick logo"/>
      <figcaption class="nav-heading current-page-heading">Added to cart</figcaption>`;
  if(!document.getElementById("success-message")){
    var successMessage = document.createElement("figure");
    successMessage.setAttribute("id", "success-message");
    successMessage.innerHTML= templateHTML;
    cartPopup.prepend(successMessage);
  }
}

function closePopup(){
  this.classList.remove('added-item');
  cartPopup.setAttribute('aria-hidden', 'true');
  cartPopup.setAttribute('disabled', 'disabled');
  document.querySelector("#success-message").remove();
}

function addProductsToPopup() {
  let templateHTML = `
    <ul>
      <li class="popup-img">
        <img class="icon" src="assets/img/trophy.png" alt="Certificate Image">
      </li>
      <li class="popup-title"></li>
      <li class="popup-count"></li>
      <li class="popup-price"></li>
    </ul>`;

  var popupList = document.querySelector("#cart-popup ol");
  for (const [title, count] of Object.entries(cart)) {
    var product = document.createElement("li");
    product.className = "popup-product";
    product.innerHTML = templateHTML;
    product.querySelector(".popup-title").innerText= title;
    product.querySelector(".popup-count").innerText= "Quantity: " + count;
    product.querySelector(".popup-price").innerText= "$" + (cartProducts[title].price*count);
    popupList.appendChild(product);
  }
}

function updatePopupList() {
  var popupProducts = document.querySelectorAll("#cart-popup ol li");
  popupProducts.forEach(item => {
    item.remove();
  });
  addProductsToPopup();
}

function debounce(callback, delay) {
  var timer;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);

    timer = setTimeout(function() {
      callback.apply(context, args);
    }, delay);
  }
}
