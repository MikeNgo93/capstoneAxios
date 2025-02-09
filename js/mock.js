// mock data
const mockData = [
  {
    tk: "NV001",
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
    ngayLam: "2025-01-15",
    chucVu: "Sếp",
    tongluong: "30,000,000 VND",
    xeploai: "giỏi",
  },
  {
    tk: "NV002",
    name: "Tran Thi B",
    email: "tranthib@example.com",
    ngayLam: "2025-01-10",
    chucVu: "Trưởng phòng",
    tongluong: "20,000,000 VND",
    xeploai: "khá",
  },
];

// Function to display Bảng nhân viên
function displayMockData() {
  //   console.log("mock called");
  const mockDataTable = document.getElementById("tableDanhSach");
  mockDataTable.innerHTML = ""; // Clear existing data

  // Table rows populate
  mockData.forEach((data) => {
    const row = `
        <tr>
          <td>${data.tk}</td>
          <td>${data.name}</td>
          <td>${data.email}</td>
          <td>${data.ngayLam}</td>
          <td>${data.chucVu}</td>
          <td>${data.tongluong}</td>
          <td>${data.xeploai}</td>
        </tr>
      `;
    mockDataTable.innerHTML += row;
  });
}
console.log("Mock Data:", mockData);

// display
displayMockData();

// Local storage
// B1: biến array thành string
// JSON.stringtify

// Lưu dữ liệu xuống local storage
let jsonDSSV = JSON.stringify(mockData);
localStorage.setItem("DSSV", jsonDSSV); // Tên key, Dữ liệu muốn lưu (dạng string)

// Lấy dữ liệu từ local storage lên
let dssvJSON = localStorage.getItem("DSSV");
let arrayDSSV = JSON.parse(dssvJSON); //sẽ ra null nếu ở dưới rỗng
// Chú ý nếu rỗng thì không lấy lên, sẽ xảy ra lỗi
// if dssvJSON = "".../ if (!arrayDSSV)
console.log(arrayDSSV);

// Class lưu vô model.js
