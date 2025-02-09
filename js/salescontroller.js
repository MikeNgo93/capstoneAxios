let refreshPage = () => {
  location.reload();
};

let renderSalesProduct = (productArr) => {
  console.log("productArr:", productArr);

  let contentHTML = "<div class='row'>"; // Start of the row container

  productArr.reverse().forEach((product, index) => {
    let divString = `<div class="col-md-3 product-card">
                          <div class="card">
                            <img src="${product.img}" class="card-img-top" alt="${product.name}" />
                            <div class="card-body">
                              <h5 class="card-title">${product.name}</h5>
                              <p class="card-text"><strong>Back Camera:</strong> ${product.backCamera}</p>
                              <p class="card-text"><strong>Front Camera:</strong> ${product.frontCamera}</p>
                              <p class="card-text"><strong>Description:</strong> ${product.desc}</p>
                              <button class="btn btn-primary" onclick="addToCart(${product.id})">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>`;

    contentHTML += divString;

    // Close row sau mỗi 4 divs
    if ((index + 1) % 4 === 0) {
      contentHTML += "</div><div class='row'>"; // Start a new row
    }
  });

  contentHTML += "</div>"; // End
  document.getElementById("productGrid").innerHTML = contentHTML;
};

let addToCart = (id) => {
  console.log("Adding to cart, product ID:", id);

  let reversedProducts = [...productsArray].reverse();
  let product = reversedProducts.find((item) => item.id == id);

  if (!product) {
    console.error("Error: Product not found with ID:", id);
    return;
  }

  // Check
  let cartItem = cart.find((item) => item.id == id);

  if (cartItem) {
    cartItem.quantity++; // tăng quantity
  } else {
    // Tạo mới
    let newCartItem = {
      id: product.id,
      name: product.name,
      img: product.img,
      price: product.price,
      quantity: 1,
    };
    cart.push(newCartItem);
  }

  console.log("Cart updated:", cart);
};

let turnOnLoading = () => {
  document.getElementById("loading").style.display = "block";
  console.log("loading on");
};

let turnOffLoading = () => {
  document.getElementById("loading").style.display = "none";
  console.log("loading off");
};
