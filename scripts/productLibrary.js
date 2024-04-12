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

const productsPerPage = 6;
let currentPage = 1;

function displayProducts() {
    const productListContainer = document.getElementById('productList');
    productListContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    for (let i = startIndex + 1; i <= endIndex && i <= Object.keys(products).length; i++) {
        const productDetails = getProductDetailsById(i);
        const productDiv = createProductDiv(productDetails);
        productListContainer.appendChild(productDiv);
    }

    updatePagination();
}

function createProductDiv(productDetails) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.onclick = function () {
        window.location.href = `product.html?id=${productDetails.id}`;
    };

    const productImage = document.createElement('img');
    productImage.src = productDetails.image;
    productImage.alt = productDetails.name;

    const productName = document.createElement('h2');
    productName.innerText = productDetails.name;

    const productPrice = document.createElement('span');
    productPrice.innerText = `$${productDetails.price.toFixed(2)}`;

    productDiv.appendChild(productImage);
    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);

    return productDiv;
}

function updatePagination() {
    const totalPages = Math.ceil(Object.keys(products).length / productsPerPage);
    const currentPageElement = document.getElementById('currentPage');
    currentPageElement.innerText = `Page ${currentPage} of ${totalPages}`;

    const prevButton = document.querySelector('.pagination button:nth-child(2)');
    const nextButton = document.querySelector('.pagination button:nth-child(4)');
    const firstButton = document.querySelector('.pagination button:first-child');
    const lastButton = document.querySelector('.pagination button:last-child');

    prevButton.disabled = currentPage === 1;
    firstButton.disabled = currentPage === 1;

    nextButton.disabled = currentPage === totalPages;
    lastButton.disabled = currentPage === totalPages;
}

function goToPage(destination) {
    const totalPages = Math.ceil(Object.keys(products).length / productsPerPage);

    switch (destination) {
        case 'first':
            currentPage = 1;
            break;
        case 'prev':
            currentPage = Math.max(currentPage - 1, 1);
            break;
        case 'next':
            currentPage = Math.min(currentPage + 1, totalPages);
            break;
        case 'last':
            currentPage = totalPages;
            break;
    }

    displayProducts();
}

// Call displayProducts directly on window.onload
window.onload = displayProducts;