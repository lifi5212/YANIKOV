const products = [
    {
        id: 1,
        name: "Oversize Hoodie",
        price: 5990,
        category: "hoodie",
        image: "assets/images/hoodie.jpg"
    },
    {
        id: 2,
        name: "Tech Pants",
        price: 6490,
        category: "pants",
        image: "assets/images/pants.jpg"
    },
    {
        id: 3,
        name: "Black Tee",
        price: 2990,
        category: "tee",
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
function renderProducts(category = "all") {
    productGrid.innerHTML = "";

    const filtered = category === "all"
        ? products
        : products.filter(p => p.category === category);

    filtered.forEach(product => {
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
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

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

    if (cart.length === 0) {
        cartItems.innerHTML = "<p style='opacity:0.5'>Корзина пуста</p>";
        cartTotal.textContent = 0;
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div class="cart-item-img" style="background-image:url('${item.image}')"></div>

            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span>${item.price} ₽</span>

                <div class="qty-control">
                    <button onclick="decreaseQty(${index})">−</button>
                    <span>${item.qty}</span>
                    <button onclick="increaseQty(${index})">+</button>
                </div>
            </div>

            <div class="cart-remove" onclick="removeFromCart(${index})">✖</div>
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

/* ===== PROFILE LOGIC ===== */
const profileBtn = document.getElementById("profile-btn");
const profileModal = document.getElementById("profile-modal");
const closeProfile = document.getElementById("close-profile");
const saveProfile = document.getElementById("save-profile");
const usernameInput = document.getElementById("username-input");
const profileText = document.getElementById("profile-text");

let username = localStorage.getItem("username");

profileBtn.onclick = () => {
    profileModal.style.display = "flex";
    if (username) {
        profileText.textContent = `Привет, ${username}`;
        usernameInput.value = username;
    }
};

closeProfile.onclick = () => {
    profileModal.style.display = "none";
};

saveProfile.onclick = () => {
    const value = usernameInput.value.trim();
    if (value) {
        localStorage.setItem("username", value);
        username = value;
        profileText.textContent = `Привет, ${username}`;
    }
};

/* ===== FILTER LOGIC ===== */
document.querySelectorAll(".filters button").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".filters button")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
        renderProducts(btn.dataset.category);
    };
});

/* ===== SCROLL ANIMATION ===== */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll("section").forEach(section => {
    section.classList.add("fade-in");
    observer.observe(section);
});

function increaseQty(index) {
    cart[index].qty += 1;
    saveCart();
    renderCart();
}

function decreaseQty(index) {
    cart[index].qty -= 1;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    renderCart();
}

cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = "none";
    }
});
