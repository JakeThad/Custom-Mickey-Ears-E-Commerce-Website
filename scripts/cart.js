// Create a cart array to store the products
let cart = [];

// Create a function to add a product to the cart
function addToCart(productId) {
    let product = cart.find(item => item.id == productId);

    if (product) {
        product.quantity++;
        Swal.fire({
            
            title: 'Added to Cart',
            text: 'Successfully added to cart.',
        });
        return;
    } else {
        product = {
            id: productId,
            name: getProductDetailsById(productId).name,
            price: parseFloat(getProductDetailsById(productId).price),
            quantity: 1
        };
        cart.push(product);
    }

    updateCartHtml();
    window.dispatchEvent(new Event("cartUpdated"));
}

// Create a function to remove a product from the cart
function removeFromCart(productId) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == productId) {
            cart.splice(i, 1);
            break;
        }
    }

    updateCartHtml();
    window.dispatchEvent(new Event("cartUpdated"));
}

// Create a function to update the quantity in the cart
function updateQuantity(productId, change) {
    let product = cart.find(item => item.id == productId);
    if (product) {
        product.quantity = Math.max(1, product.quantity + change);
        updateCartHtml();
        window.dispatchEvent(new Event("cartUpdated"));
    }
}

// Create a function to update the cart html
function updateCartHtml() {
    let cartTableBody = document.querySelector("#cart-table tbody");
    cartTableBody.innerHTML = "";

    for (let product of cart) {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.innerText = product.name;

        let priceCell = document.createElement("td");
        priceCell.innerText = product.price.toFixed(2);

        let quantityCell = document.createElement("td");
        quantityCell.appendChild(createQuantityEditor(product));

        let subtotalCell = document.createElement("td");
        subtotalCell.innerText = (product.price * product.quantity).toFixed(2);

        let removeCell = document.createElement("td");
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.dataset.productId = product.id;
        removeButton.addEventListener("click", function() {
            removeFromCart(this.dataset.productId);
        });
        removeCell.appendChild(removeButton);

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(subtotalCell);
        row.appendChild(removeCell);

        cartTableBody.appendChild(row);
    }

    let cartTotal = document.querySelector("#cart-total");
    let totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    cartTotal.innerText = totalPrice.toFixed(2);
}

// Create a function to create the quantity editor
function createQuantityEditor(product) {
    let quantityCell = document.createElement("div");
    quantityCell.className = "quantity-editor";

    let quantityDecreaseButton = document.createElement("button");
    quantityDecreaseButton.innerText = "-";
    quantityDecreaseButton.className = "quantity-decrease";
    quantityDecreaseButton.dataset.productId = product.id;
    quantityDecreaseButton.addEventListener("click", function() {
        updateQuantity(this.dataset.productId, -1);
    });

    let quantityValueSpan = document.createElement("span");
    quantityValueSpan.innerText = product.quantity;
    quantityValueSpan.className = "quantity-value";

    let quantityIncreaseButton = document.createElement("button");
    quantityIncreaseButton.innerText = "+";
    quantityIncreaseButton.className = "quantity-increase";
    quantityIncreaseButton.dataset.productId = product.id;
    quantityIncreaseButton.addEventListener("click", function() {
        updateQuantity(this.dataset.productId, 1);
    });

    quantityCell.appendChild(quantityDecreaseButton);
    quantityCell.appendChild(quantityValueSpan);
    quantityCell.appendChild(quantityIncreaseButton);

    return quantityCell;
}

// Add event listeners to the add to cart buttons on the product html
let addToCartButtons = document.querySelectorAll(".add-to-cart");
for (let button of addToCartButtons) {
    button.addEventListener("click", function() {
        addToCart(this.dataset.productId);
    });
}

// Save the cart data to local storage when the window unloads
window.addEventListener("unload", function() {
    localStorage.setItem("cart", JSON.stringify(cart));
});

// Retrieve the cart data from local storage when the window loads
window.addEventListener("load", function() {
    let cartData = localStorage.getItem("cart");
    if (cartData) {
        cart = JSON.parse(cartData);
        updateCartHtml();
    }
});

// Add an event listener to the window for cart updates
window.addEventListener("cartUpdated", function() {
    localStorage.setItem("cart", JSON.stringify(cart));
});
