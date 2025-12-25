const products = [
    {
        id: 1,
        name: "Oversize Hoodie",
        price: 5990,
        image: "assets/images/hoodie.jpg"
    },
    {
        id: 2,
        name: "Tech Pants",
        price: 6490,
        image: "assets/images/pants.jpg"
    },
    {
        id: 3,
        name: "Black Tee",
        price: 2990,
        image: "assets/images/tee.jpg"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productGrid = document.getElementById("product-grid");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

/* ===== RENDER PRODUCTS ===== */
function renderProducts() {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image" style="background-image:url('${product.image}')"></div>
            <h3>${product.name}</h3>
            <p>${product.price} ₽</p>
            <button>В КОРЗИНУ</button>
        `;

        card.querySelector("button").onclick = () => addToCart(product);
        productGrid.appendChild(card);
    });
}

/* ===== CART ===== */
cartBtn.onclick = () => {
    cartModal.style.display = "flex";
    renderCart();
};

closeCart.onclick = () => {
    cartModal.style.display = "none";
};

function addToCart(product) {
    cart.push(product);
    saveCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} ₽</span>
            <span style="cursor:pointer;" onclick="removeFromCart(${index})">✖</span>
        `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = total;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount.textContent = cart.length;
}

renderProducts();
cartCount.textContent = cart.length;
