function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productDetails = getProductDetailsById(productId);

    // Add the product ID to the HTML elements
    document.getElementById('product-image').src = productDetails.image;
    document.getElementById('product-name').innerText = productDetails.name;
    document.getElementById('product-price').innerText = `$${productDetails.price.toFixed(2)}`;

    // Add an event listener to the "Add to Cart" button
    const addToCartButton = document.getElementById('add-to-cart-button');
    addToCartButton.dataset.productId = productId;

    // Check if the event listener is already added to avoid recursion
    if (!addToCartButton.hasEventListener) {
        addToCartButton.addEventListener('click', function () {
            addToCart(productId); // Call the addToCart function from cart.js
        });
        
        addToCartButton.hasEventListener = true; // Flag to indicate that the listener is added
    }
}
function getProductDetailsById(productId) {
    const products = {
        1: { id: 1, name: 'Classic Minnie Ears', price: 25.99, image: 'image/Product-1.jpg' },
        2: { id: 2, name: 'Elegant Lost Princess', price: 29.99, image: 'image/Product-2.jpg' },
        3: { id: 3, name: 'Emerald Beauty', price: 29.99, image: 'image/Product-3.jpg' },
        4: { id: 4, name: 'Fluffy like a Cloud', price: 35.99, image: 'image/Product-4.jpg' },
        5: { id: 5, name: 'Golden Sunset', price: 29.99, image: 'image/Product-5.jpg' },
        6: { id: 6, name: 'Happiness and Joy', price: 29.99, image: 'image/Product-6.jpg' },
        7: { id: 7, name: 'Lovely Princess', price: 29.99, image: 'image/Product-7.jpg' },
        8: { id: 8, name: 'Mermaid Princess', price: 29.99, image: 'image/Product-8.jpg' },
        9: { id: 9, name: 'For the Men', price: 29.99, image: 'image/Product-9.jpg' },
        10: { id: 10, name: 'Spider-man', price: 29.99, image: 'image/Product-10.jpg' },
        11: { id: 11, name: 'Star Wars', price: 29.99, image: 'image/Product-11.jpg' },
        12: { id: 12, name: 'Lightsabers', price: 29.99, image: 'image/Product-12.jpg' },
        13: { id: 13, name: 'Mario', price: 29.99, image: 'image/Product-13.jpg' },
        14: { id: 14, name: 'Sonic', price: 29.99, image: 'image/Product-14.jpg' },
        15: { id: 15, name: 'Dragon', price: 29.99, image: 'image/Product-15.jpg' },
        16: { id: 16, name: 'Goku', price: 29.99, image: 'image/Product-16.jpg' },
        17: { id: 17, name: 'Iron Man', price: 29.99, image: 'image/Product-17.jpg' },
        18: { id: 18, name: 'Captain America', price: 29.99, image: 'image/Product-18.jpg' },
    };
    return products[productId];
}

window.onload = loadProductDetails;
