//HUMBURGER MENU FUNCTIONALITY

const menuBtn = document.querySelector(".menu-btn");
const sideMenu = document.querySelector(".side-menu");
const closeBtn = document.querySelector(".close-btn");

if (menuBtn && sideMenu && closeBtn) {

    menuBtn.addEventListener("click", function() {
        sideMenu.style.left = "0";
    });

    closeBtn.addEventListener("click", function() {
        sideMenu.style.left = "-280px";
    });

}

// SEARCH FUNCTIONALITY

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

    const categories = document.querySelectorAll(".product-category");

    searchInput.addEventListener("input", function() {

        const searchText = searchInput.value.toLowerCase();

        categories.forEach(function(category) {

            const products = category.querySelectorAll(".product-card");

            let categoryMatch = false;

            products.forEach(function(product) {

                const productName =
                    product.querySelector("h3").textContent.toLowerCase();

                if (productName.includes(searchText)) {

                    product.style.display = "block";
                    categoryMatch = true;

                } else {

                    product.style.display = "none";

                }

            });

            if (categoryMatch || searchText === "") {

                category.style.display = "block";

            } else {

                category.style.display = "none";

            }

        });

    });

}

// WISHLIST FUNCTIONALITY

const wishlistButtons = document.querySelectorAll(".wishlist-btn");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

wishlistButtons.forEach(function(button) {

    const card = button.closest(".product-card");

    const name = card.querySelector("h3").textContent;

    // Check if product is already in wishlist
    const alreadyExists = wishlist.some(function(item) {
        return item.name === name;
    });

    // Keep heart filled after page reload
    if (alreadyExists) {
        button.querySelector("i").classList.remove("fa-regular");
        button.querySelector("i").classList.add("fa-solid");
    }

    button.addEventListener("click", function() {

        const image = card.querySelector("img").getAttribute("src");
        const price = card.querySelector(".price").textContent;

        const product = {
            name: name,
            image: image,
            price: price
        };

        // Check again after clicking
        const index = wishlist.findIndex(function(item) {
            return item.name === product.name;
        });

        if (index === -1) {

            // ADD TO WISHLIST
            wishlist.push(product);

            button.querySelector("i").classList.remove("fa-regular");
            button.querySelector("i").classList.add("fa-solid");

        } else {

            // REMOVE FROM WISHLIST
            wishlist.splice(index, 1);

            button.querySelector("i").classList.remove("fa-solid");
            button.querySelector("i").classList.add("fa-regular");

        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

    });

});
// DISPLAY WISHLIST

const wishlistContainer = document.getElementById("wishlistContainer");

if (wishlistContainer) {

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML =
            '<p class="empty-wishlist">Your wishlist is empty</p>';

    } else {

        wishlist.forEach(function(product) {

            wishlistContainer.innerHTML += `

                <div class="wishlist-card">

                    <button class="remove-wishlist">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <img src="${product.image}" alt="${product.name}">

                    <h3>${product.name}</h3>

                    <p class="wishlist-price">${product.price}</p>

                    <button class="wishlist-cart-btn">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Add to Cart
                    </button>

                </div>

            `;

        });

    }

}

//REMOVE WISHLIST
const removeButtons = document.querySelectorAll(".remove-wishlist");

removeButtons.forEach(function(button, index) {

    button.addEventListener("click", function() {

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        wishlist.splice(index, 1);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        location.reload();

    });

});

   // ACCOUNT LOGIN FUNCTIONALITY

const accountForm = document.querySelector(".account-form");

if (accountForm) {

    accountForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {

            alert("No account found. Please create an account first.");

            return;
        }

        if (email === savedUser.email && password === savedUser.password) {

            localStorage.setItem("loggedIn", "true");

            alert("Welcome back, " + savedUser.name + "!");

            window.location.href = "index.html";

        } else {

            alert("Incorrect email or password.");

        }

    });

}

// SHOW LOGGED-IN USER NAME IN HEADER

const accountBox = document.querySelector(".account");
const accountText = accountBox?.querySelector("span");

const currentUser = JSON.parse(localStorage.getItem("user"));
const loggedInUser = localStorage.getItem("loggedIn");

if (accountText) {

    if (currentUser && loggedInUser === "true") {

        accountText.textContent = currentUser.name;

    } else {

        accountText.textContent = "Account";

    }

}

// ACCOUNT CREATION FUNCTIONALITY

const createAccountForm = document.querySelector(".create-account-form");

if (createAccountForm) {

    createAccountForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("createEmail").value.trim();
        const password = document.getElementById("createPassword").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Account created successfully!");

        window.location.href = "account.html";

    });

}
// LOGOUT FUNCTIONALITY

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function() {

        localStorage.setItem("loggedIn", "false");

        alert("You have been logged out.");

        window.location.href = "account.html";

    });

}

// CART FUNCTIONALITY

const cartButtons = document.querySelectorAll(".cart-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card = button.closest(".product-card");

        const name = card.querySelector("h3").textContent;
        const image = card.querySelector("img").getAttribute("src");
        const price = card.querySelector(".price").textContent;

        const product = {
            name: name,
            image: image,
            price: price,
            quantity: 1
        };

        const existingIndex = cart.findIndex(function(item) {
            return item.name === product.name;
        });

        if (existingIndex === -1) {

            cart.push(product);

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Product added to cart!");

        } else {

            alert("Product is already in your cart.");

        }

    });

});


// DISPLAY CART

const cartContainer = document.getElementById("cartContainer");
const cartSummary = document.getElementById("cartSummary");

if (cartContainer) {

    if (cart.length === 0) {

        cartContainer.innerHTML =
            '<p class="empty-cart">Your cart is empty</p>';

    } else {

        cartContainer.innerHTML = "";

        cart.forEach(function(product, index) {

            cartContainer.innerHTML += `

                <div class="cart-card">

                    <img src="${product.image}" alt="${product.name}">

                    <div class="cart-details">

                        <h3>${product.name}</h3>

                        <p class="cart-price">${product.price}</p>

                        <div class="quantity">

                            <button class="minus-btn" data-index="${index}">
                                -
                            </button>

                            <span>${product.quantity || 1}</span>

                            <button class="plus-btn" data-index="${index}">
                                +
                            </button>

                        </div>

                    </div>

                    <button class="remove-cart" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            `;

        });

    }

}

// CART QUANTITY +, - AND DELETE

const plusButtons = document.querySelectorAll(".plus-btn");
const minusButtons = document.querySelectorAll(".minus-btn");
const deleteButtons = document.querySelectorAll(".remove-cart");


// PLUS BUTTON

plusButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const index = button.getAttribute("data-index");

        cart[index].quantity++;

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});


// MINUS BUTTON

minusButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const index = button.getAttribute("data-index");

        if (cart[index].quantity > 1) {

            cart[index].quantity--;

        } else {

            cart.splice(index, 1);

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});


// DELETE BUTTON

deleteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const index = button.getAttribute("data-index");

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});

// CART SUMMARY

if (cartSummary && cart.length > 0) {

    let totalItems = 0;
    let subtotal = 0;

    cart.forEach(function(product) {

        const price = parseFloat(
            product.price.replace("$", "")
        );

        const quantity = product.quantity || 1;

        totalItems += quantity;
        subtotal += price * quantity;

    });

    const shipping = 5;
    const total = subtotal + shipping;

    cartSummary.innerHTML = `

        <h3>Order Summary</h3>

        <p>
            Total Items:
            <span>${totalItems}</span>
        </p>

        <p>
            Subtotal:
            <span>$${subtotal.toFixed(2)}</span>
        </p>

        <p>
            Shipping:
            <span>$${shipping.toFixed(2)}</span>
        </p>

        <hr>

        <p class="cart-total">
            Total:
            <span>$${total.toFixed(2)}</span>
        </p>

        <button class="checkout-btn">
            Proceed to Checkout
        </button>

    `;

}

// PROCEED TO CHECKOUT

const checkoutBtn = document.querySelector(".checkout-btn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function() {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }

        window.location.href = "checkout.html";

    });

}

// CHECKOUT FUNCTIONALITY

const checkoutForm = document.getElementById("checkoutForm");
const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutShipping = document.getElementById("checkoutShipping");
const checkoutTotal = document.getElementById("checkoutTotal");

let checkoutCart = JSON.parse(localStorage.getItem("cart")) || [];

if (checkoutItems) {

    if (checkoutCart.length === 0) {

        checkoutItems.innerHTML =
            '<p class="checkout-empty">Your cart is empty.</p>';

        checkoutSubtotal.textContent = "$0.00";
        checkoutShipping.textContent = "$0.00";
        checkoutTotal.textContent = "$0.00";

    } else {

        let subtotal = 0;

        checkoutCart.forEach(function(product) {

            const price = parseFloat(
                product.price.replace("$", "")
            );

            const quantity = product.quantity || 1;

            subtotal += price * quantity;

            checkoutItems.innerHTML += `

                <div class="checkout-item">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div class="checkout-item-details">

                        <h3>${product.name}</h3>

                        <p>
                            ${product.price} × ${quantity}
                        </p>

                    </div>

                </div>

            `;

        });

        const shipping = 5;
        const total = subtotal + shipping;

        checkoutSubtotal.textContent =
            "$" + subtotal.toFixed(2);

        checkoutShipping.textContent =
            "$" + shipping.toFixed(2);

        checkoutTotal.textContent =
            "$" + total.toFixed(2);

    }

}


// PLACE ORDER

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (checkoutCart.length === 0) {

            alert("Your cart is empty.");

            return;

        }

        const name =
            document.getElementById("checkoutName").value.trim();

        alert(
            "Order placed successfully! Thank you, " +
            name + "!"
        );

        localStorage.removeItem("cart");

        window.location.href = "order-success.html";

    });

}

// ADD WISHLIST PRODUCT TO CART

const wishlistCartButtons = document.querySelectorAll(".wishlist-cart-btn");

wishlistCartButtons.forEach(function(button, index) {

    button.addEventListener("click", function() {

        let wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const product = wishlist[index];

        if (!product) {
            return;
        }

        const alreadyExists = cart.some(function(item) {
            return item.name === product.name;
        });

        if (!alreadyExists) {

            cart.push({
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: 1
            });

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            alert("Product added to cart!");

        } else {

            alert("Product is already in your cart.");

        }

    });

});
//CART COUNT UPDATE
function updateCartCount() {

  const cartCount = document.querySelector(".cart-count");

  if (!cartCount) {
    return;
  }

  const cartData =
    JSON.parse(localStorage.getItem("cart")) || [];

  let totalItems = 0;

  cartData.forEach(function(item) {
    totalItems += item.quantity || 1;
  });

  cartCount.textContent = totalItems;
}

updateCartCount();

const continueShoppingBtn =
  document.querySelector(".continue-shopping-btn");

if (continueShoppingBtn) {
  continueShoppingBtn.addEventListener("click", function() {
    window.location.href = "index.html";
  });
}
// CONTACT FORM FUNCTIONALITY
const contactForm = document.querySelector(".contact-form form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name && email && message) {

            alert(
                "Thank you, " + name +
                "! Your message has been sent successfully."
            );

            contactForm.reset();
        }

    });

}
// SELLER FORM FUNCTIONALITY

const sellerForm = document.querySelector(".seller-form");

if (sellerForm) {

    sellerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("sellerName").value.trim();

        const email =
            document.getElementById("sellerEmail").value.trim();

        const shopName =
            document.getElementById("shopName").value.trim();

        if (name && email && shopName) {

            alert(
                "Thank you, " + name +
                "! Your seller registration has been submitted successfully."
            );

            sellerForm.reset();
        }

    });

}