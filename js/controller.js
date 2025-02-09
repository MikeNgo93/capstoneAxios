/* GLOBAL VARIABLE */
let cart = []; // Global cart array

/* ADMIN PAGE*/
let refreshPage = () => {
  location.reload();
};

let renderProduct = (productArr) => {
  console.log("productArr:", productArr);

  let contentHTML = "";

  productArr.reverse().forEach((product) => {
    let trString = `<tr>
                  <td>${product.id}</td>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td>${product.screen}</td>
                  <td>${product.backCamera}</td>
                  <td>${product.frontCamera}</td>
                  <td>${product.img}</td>
                  <td>${product.desc}</td>
                  <td>${product.type}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                            Delete
                        </button>
                        <button class="btn btn-warning" onclick="editProduct(${product.id})">
                            Edit
                        </button>
                    </td>
          </tr>`;
    contentHTML += trString;
  });

  document.getElementById("tableDanhSach").innerHTML = contentHTML;
};

let showDataForm = (product) => {
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productScreen").value = product.screen;
  document.getElementById("backCamera").value = product.backCamera;
  document.getElementById("frontCamera").value = product.frontCamera;
  document.getElementById("productImage").value = product.img;
  document.getElementById("productDesc").value = product.desc;
  document.getElementById("productType").value = product.type;
};

let getDataForm = () => {
  if (validateData() == false) {
    console.log("Data không hợp lệ");
    return null;
  }

  return {
    name: document.getElementById("productName").value.trim(),
    price: document.getElementById("productPrice").value * 1,
    screen: document.getElementById("productScreen").value.trim(),
    backCamera: document.getElementById("backCamera").value.trim(),
    frontCamera: document.getElementById("frontCamera").value.trim(),
    img: document.getElementById("productImage").value.trim(),
    desc: document.getElementById("productDesc").value.trim(),
    type: document.getElementById("productType").value.trim(),
  };
};

let turnOnLoading = () => {
  document.getElementById("loading").style.display = "block";
  console.log("loading on");
};

let turnOffLoading = () => {
  document.getElementById("loading").style.display = "none";
  console.log("loading off");
};

let isAscending = true;
const sortTable = (order) => {
  let table = document.querySelector(".myTable tbody");
  let rows = Array.from(table.rows);

  // Asc hay Desc
  if (order === "asc") {
    isAscending = true;
  } else {
    isAscending = false;
  }

  // Sắp xep rows theo 'price'
  rows.sort((rowA, rowB) => {
    const priceA = parseFloat(
      rowA.cells[2].textContent.replace(/[^0-9.-]+/g, "")
    );
    const priceB = parseFloat(
      rowB.cells[2].textContent.replace(/[^0-9.-]+/g, "")
    );

    return isAscending ? priceA - priceB : priceB - priceA;
  });

  // Re-attach the sorted rows
  rows.forEach((row) => table.appendChild(row));
};

let validateData = () => {
  let isValid = true;

  let tenSp = document.getElementById("productName");
  let gia = document.getElementById("productPrice");
  let manHinh = document.getElementById("productScreen");
  let backCamera = document.getElementById("backCamera");
  let frontCamera = document.getElementById("frontCamera");
  let hinhAnh = document.getElementById("productImage");
  let moTa = document.getElementById("productDesc");

  // Validate Product Name
  if (tenSp.value.trim() === "") {
    tenSp.placeholder = "Tên sản phẩm không được để trống";
    isValid = false;
  } else {
    tenSp.placeholder = "Tên sản phẩm";
  }

  // Validate Price
  let giaValue = Number(gia.value);
  if (isNaN(giaValue) || giaValue <= 0) {
    gia.placeholder = "Giá phải lớn hơn 0";
    isValid = false;
  } else {
    gia.placeholder = "Giá sản phẩm";
  }

  // Validate Screen
  if (manHinh.value.trim() === "") {
    manHinh.placeholder = "Màn hình không được để trống";
    isValid = false;
  } else {
    manHinh.placeholder = "Màn hình";
  }

  // Validate Back Camera
  if (backCamera.value.trim() === "") {
    backCamera.placeholder = "Camera sau không được để trống";
    isValid = false;
  } else {
    backCamera.placeholder = "Camera sau";
  }

  // Validate Front Camera
  if (frontCamera.value.trim() === "") {
    frontCamera.placeholder = "Camera trước không được để trống";
    isValid = false;
  } else {
    frontCamera.placeholder = "Camera trước";
  }

  // Validate Description
  if (moTa.value.trim() === "") {
    moTa.placeholder = "Mô tả không được để trống";
    isValid = false;
  } else {
    moTa.placeholder = "Mô tả";
  }

  return isValid;
};

let searchSP = async () => {
  let satisfied = [];
  let wanted = document.getElementById("searchItem").value.trim().toLowerCase();

  try {
    turnOnLoading();
    const result = await axios.get(BASE_URL);
    let products = result.data;

    for (let entry of products) {
      if (entry.name.toLowerCase() === wanted) {
        satisfied.push(entry);
      }
    }

    if (satisfied.length === 0) {
      onFailure(`Không có sản phẩm tên "${wanted}"`);
      return [];
    }

    renderProduct(satisfied);
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    turnOffLoading();
  }

  return satisfied;
};

/* SALES PAGE*/
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

// Save cart to local storage
let saveCartsToLocal = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Load cart from local storage
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

let addToCart = (id) => {
  console.log("Adding to cart, product ID:", id);

  let reversedProducts = [...productsArray].reverse();
  let product = reversedProducts.find((item) => item.id == id);

  if (!product) {
    console.error("Error: Product not found:", id);
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
      desc: product.desc,
      quantity: 1,
    };
    cart.push(newCartItem);
  }

  console.log("Cart updated:", cart);
  updateCartQuantity();
  saveCartsToLocal();
};

let updateCartQuantity = () => {
  document.querySelector(".total-qty").textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
};

/* CART PAGE*/

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
                                +
                            </button>
                            <button class="btn btn-warning" onclick="decreaseQuantity(${
                              cartItem.id
                            })">
                                -
                            </button>
                            <button class="btn btn-danger" onclick="removeProduct(${
                              cartItem.id
                            })">
                                X
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
  let cartItem = cart.find((item) => item.id == id);
  if (cartItem) {
    cartItem.quantity++;

    saveCartsToLocal();
    renderCart();
  }
};

// xoá sản phẩm
let removeProduct = (id) => {
  let productIndex = cart.findIndex((item) => item.id == id);

  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
    saveCartsToLocal();
    renderCart();
  } else {
    console.error("Product not found");
  }
};

let decreaseQuantity = (id) => {
  let cartItem = cart.find((item) => item.id == id);
  if (cartItem) {
    if (cartItem.quantity > 0) {
      cartItem.quantity--;
    }

    saveCartsToLocal();
    renderCart();
  }
};
