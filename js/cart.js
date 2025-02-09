let cart = []; // Global cart array

let loadCartsFromLocal = () => {
  let storedCart = localStorage.getItem("cart"); // Get cart data from localStorage
  if (storedCart) {
    cart = JSON.parse(storedCart);
    console.log("Cart loaded from localStorage:", cart);
  } else {
    cart = [];
  }
  return cart;
};

let renderCart = () => {
  let contentHTML = "";

  let totalPrice = 0;

  cart.forEach((cartItem) => {
    let itemTotalPrice = cartItem.price * cartItem.quantity;
    totalPrice += itemTotalPrice;

    let trString = `<tr>
                        <td>${cartItem.name}</td>
                        <td>${cartItem.price.toLocaleString()} VND</td>
                        <td>${cartItem.quantity}</td>
                        <td>${itemTotalPrice.toLocaleString()} VND</td>
                        <td>
                            <button class="btn btn-success" onclick="increaseQuantity(${
                              cartItem.id
                            })">
                                Add
                            </button>
                            <button class="btn btn-warning" onclick="decreaseQuantity(${
                              cartItem.id
                            })">
                                Decrease
                            </button>
                        </td>
                </tr>`;
    contentHTML += trString;
  });

  // Phần tổng tiền
  contentHTML += `<tr>
                      <td colspan="3"><strong>Tổng tiền</strong></td>
                      <td colspan="2"><strong>${totalPrice.toLocaleString()} VND</strong></td>
                    </tr>`;

  document.getElementById("tableGiohang").innerHTML = contentHTML;
};

let increaseQuantity = (id) => {
  console.log(id);
  let cartItem = cart.find((item) => item.id == id);
  console.log(cartItem);

  if (cartItem) {
    cartItem.quantity++;

    saveCartsToLocal();
    renderCart();
  }
};

let decreaseQuantity = (id) => {
  console.log(id);

  let cartItem = cart.find((item) => item.id == id);

  if (cartItem) {
    if (cartItem.quantity > 0) {
      cartItem.quantity--;
    }

    saveCartsToLocal();
    renderCart();
  }
};

let saveCartsToLocal = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Load cart data on page load
window.onload = () => {
  loadCartsFromLocal(); // Load cart data into the global cart array
  renderCart(); // Render the cart
};
