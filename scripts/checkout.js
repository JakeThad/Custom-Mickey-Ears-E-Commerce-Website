// Function to save form data to sessionStorage
function saveFormDataToSessionStorage() {
    const form = document.getElementById('checkout-form');
    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {
        sessionStorage.setItem(key, value);
    }
}

// Function to load form data from sessionStorage
function loadFormDataFromSessionStorage() {
    const form = document.getElementById('checkout-form');

    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        if (element.type !== 'button') {
            element.value = sessionStorage.getItem(element.id);
        }
    }
}

// Create a function to handle the checkout process
function checkout() {
    // Save form data to sessionStorage before navigating away
    saveFormDataToSessionStorage();

    // Check if the cart is empty
    if (cart.length === 0) {
        // Display a SweetAlert2 alert for an empty cart
        Swal.fire({
            icon: 'warning',
            title: 'Empty Cart',
            text: 'Your cart is empty. Please add items to your cart before proceeding to checkout.',
        });
        return;
    }

    // Clone the checkout form to preserve the original elements
    const clonedForm = document.getElementById('checkout-form').cloneNode(true);

    // Display a modal to collect shipping address and credit card information
    Swal.fire({
        title: 'Order Summary',
        html: getCartSummaryHtml(),
        showCancelButton: true,
        confirmButtonText: 'Place Order',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            // Retrieve user input from the cloned form
            const fullName = clonedForm.querySelector('#full-name').value;
            const addressLine1 = clonedForm.querySelector('#address-line-1').value;
            const city = clonedForm.querySelector('#city').value;
            const state = clonedForm.querySelector('#state').value;
            const zipCode = clonedForm.querySelector('#zip-code').value;
            const creditCard = clonedForm.querySelector('#credit-card').value;
            const expiryDate = clonedForm.querySelector('#expiry-date').value;
            const cvv = clonedForm.querySelector('#cvv').value;

            // Validate the inputs
            const validationErrors = validateCheckoutInputs(fullName, addressLine1, city, state, zipCode, creditCard, expiryDate, cvv);

            if (validationErrors.length > 0) {
                Swal.showValidationMessage(validationErrors.join('<br>'));
                return false;
            }

            // Simulate a successful purchase
            return true;
        },
    }).then((result) => {
        if (result.isConfirmed) {
            // Simulate a successful checkout process
            alert("Checkout Successful! Thank you for your purchase.");

            // Clear the cart after successful checkout
            cart = [];
            updateCartHtml();
        } else if (result.isDismissed) {
            // Handle cancellation or closing of the modal
            console.log('Checkout cancelled or closed.');
        }
    }).catch((error) => {
        // Handle errors or cancelled checkout
        console.error('Error during checkout:', error);

        // Reset the form and update the cart screen
        document.getElementById('checkout-form').reset();
        updateCartHtml();

        // Show an error alert
        Swal.fire({
            icon: 'error',
            title: 'Checkout Failed',
            text: 'There was an issue processing your order. Please try again or contact support.',
        });
    });

    // Reset sessionStorage after successful checkout
    sessionStorage.clear();
}

// Function to validate checkout form inputs
function validateCheckoutInputs(fullName, addressLine1, city, state, zipCode, creditCard, expiryDate, cvv) {
    let errors = [];

    if (!fullName) {
        errors.push('Full Name is required');
    }

    if (!addressLine1) {
        errors.push('Address Line 1 is required');
    }

    if (!city) {
        errors.push('City is required');
    }

    if (!state) {
        errors.push('State is required');
    }

    if (!zipCode) {
        errors.push('ZIP Code is required');
    }

    if (!creditCard || !creditCard.match(/^\d{16}$/)) {
        errors.push('Invalid Credit Card Number. Please enter a 16-digit number.');
    }

    if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)) {
        errors.push('Invalid Expiry Date. Please enter a valid MM/YY format.');
    }

    if (!cvv || !cvv.match(/^\d{3}$/)) {
        errors.push('Invalid CVV. Please enter a 3-digit number.');
    }

    return errors;
}

// Load form data from sessionStorage when the window loads
window.addEventListener('load', loadFormDataFromSessionStorage);

// Add an event listener to the checkout button
let checkoutButton = document.getElementById('complete-purchase');
checkoutButton.addEventListener('click', checkout);

// Function to get HTML for the order summary in the alert
function getCartSummaryHtml() {
    let summaryHtml = '<div>';
    for (let product of cart) {
        summaryHtml += `<p>${product.name} x ${product.quantity}</p>`;
    }
    summaryHtml += `<p>Total: $${getCartTotal()}</p></div>`;
    return summaryHtml;
}

// Function to get the total price of the cart
function getCartTotal() {
    return cart.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);
}