let BASE_URL = "https://67925d36cf994cc68049c413.mockapi.io/products";
let productsArray = [];

const fetchSalesProduct = async () => {
  try {
    turnOnLoading();
    const result = await axios.get(BASE_URL);
    productsArray = result.data;
    renderSalesProduct(result.data);
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    turnOffLoading();
  }
};

console.log(productsArray);

const filterSP = async (selectedValue) => {
  console.log("filter");
  try {
    turnOnLoading();
    const result = await axios.get(BASE_URL);
    const filteredProducts = result.data.filter(
      (product) => product.type == selectedValue
    );

    renderSalesProduct(filteredProducts);
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    turnOffLoading();
  }
};

window.onload = () => {
  loadCartsFromLocal(); // Load cart from local

  // If cart is not empty, save it to local storage
  if (cart.length !== 0) {
    saveCartsToLocal();
  }

  updateCartQuantity();

  // Fetch and display products
  fetchSalesProduct();
  console.log(cart);
};
