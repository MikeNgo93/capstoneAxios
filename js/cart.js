let resetCart = () => {
  cart = [];
  saveCartsToLocal();
  renderCart();
};

// Load cart data on page load
window.onload = () => {
  loadCartsFromLocal(); // Load cart data into the global cart array
  renderCart(); // Render the cart
};
