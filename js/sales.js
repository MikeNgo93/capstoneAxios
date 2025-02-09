const BASE_URL = "https://67925d36cf994cc68049c413.mockapi.io/products";

/*
Các cải tiến: 
  - Dùng chung một cấu trúc async function để dễ đọc hơn
  - Dùng try - catch thay vì then - catch như trong lớp học 
  - Có dùng finally để tắt loading
*/

const fetchSalesProduct = async () => {
  try {
    turnOnLoading();
    const result = await axios.get(BASE_URL);
    renderSalesProduct(result.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    turnOffLoading();
  }
};

fetchSalesProduct();

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
    console.error("Error fetching products:", error);
  } finally {
    turnOffLoading();
  }
};
