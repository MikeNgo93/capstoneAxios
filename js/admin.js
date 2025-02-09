let BASE_URL = "https://67925d36cf994cc68049c413.mockapi.io/products";

/*
Các cải tiến: 
  - Dùng chung một cấu trúc async function để dễ đọc hơn
  - Dùng try - catch thay vì then - catch như trong lớp học 
  - Có dùng finally để tắt loading
*/

const fetchProduct = async () => {
  try {
    turnOnLoading();
    const result = await axios.get(BASE_URL);
    renderProduct(result.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    turnOffLoading();
  }
};

fetchProduct();

const deleteProduct = async (id) => {
  try {
    turnOnLoading();
    await axios.delete(`${BASE_URL}/${id}`);
    fetchProduct();
  } catch (error) {
    console.error("Error deleting product:", error);
  } finally {
    turnOffLoading();
  }
};

const createProduct = async () => {
  let product = getDataForm();
  if (product == null) {
    return;
  }

  try {
    turnOnLoading();
    const result = await axios.post(BASE_URL, product);
    console.log("Thêm thành công", result.data);
    $("#myModal").modal("hide");
    fetchProduct();
  } catch (error) {
    console.error("Thêm thất bại", error);
  } finally {
    turnOffLoading();
  }
};

let idProductEdit = null;

const editProduct = async (id) => {
  try {
    idProductEdit = id;
    const result = await axios.get(`${BASE_URL}/${id}`);
    showDataForm(result.data);
    $("#myModal").modal("show");
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

let updateProduct = async () => {
  let product = getDataForm();
  if (product == null) return; // Dừng nếu data không hợp lệ

  try {
    let result = await axios.put(`${BASE_URL}/${idProductEdit}`, product);
    console.log("Cập nhật thành công", result.data);
    $("#myModal").modal("hide");
    fetchProduct();
  } catch (err) {
    console.log("Cập nhật thất bại", err);
  }
};
