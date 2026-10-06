const products = [
    {
        id: 1,
        name: "Smart Watch",
        price: 1999,
        emoji: "⌚"
    },
    {
        id: 2,
        name: "Headphones",
        price: 1499,
        emoji: "🎧"
    },
    {
        id: 3,
        name: "Laptop",
        price: 49999,
        emoji: "💻"
    },
    {
        id: 4,
        name: "Mobile Phone",
        price: 19999,
        emoji: "📱"
    },
    {
        id: 5,
        name: "Camera",
        price: 29999,
        emoji: "📷"
    },
    {
        id: 6,
        name: "Keyboard",
        price: 999,
        emoji: "⌨️"
    },
    {
        id: 7,
        name: "Mouse",
        price: 799,
        emoji: "🖱️"
    },
    {
        id: 8,
        name: "Speaker",
        price: 1299,
        emoji: "🔊"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function showHome() {

    document.getElementById("home").style.display = "block";
    document.getElementById("products").style.display = "none";
    document.getElementById("cart").style.display = "none";
}


function showProducts() {

    document.getElementById("home").style.display = "none";
    document.getElementById("products").style.display = "block";
    document.getElementById("cart").style.display = "none";

    displayProducts();
}


function showCart() {

    document.getElementById("home").style.display = "none";
    document.getElementById("products").style.display = "none";
    document.getElementById("cart").style.display = "block";

    displayCart();
}


function displayProducts() {

    const list = document.getElementById("productList");

    const searchText =
        document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    products.forEach(function(product) {

        if (product.name.toLowerCase().includes(searchText)) {

            list.innerHTML += `
                <div class="product">

                    <div class="emoji">
                        ${product.emoji}
                    </div>

                    <h3>${product.name}</h3>

                    <p>₹${product.price}</p>

                    <button onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>

                </div>
            `;
        }
    });
}


function addToCart(id) {

    const product = products.find(function(product) {
        return product.id === id;
    });

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");
}


function displayCart() {

    const list = document.getElementById("cartList");
    const totalElement = document.getElementById("total");

    list.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        list.innerHTML = "<p>Your cart is empty.</p>";

        totalElement.textContent = "0";

        return;
    }

    cart.forEach(function(product, index) {

        total = total + product.price;

        list.innerHTML += `
            <div class="cart-item">

                <div>
                    <h3>${product.emoji} ${product.name}</h3>
                    <p>₹${product.price}</p>
                </div>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    totalElement.textContent = total;
}


function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}


function updateCartCount() {

    document.getElementById("cartCount").textContent =
        cart.length;
}


displayProducts();
updateCartCount();