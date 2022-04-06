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