import axios from 'axios';

const API_URL = 'http://localhost:3000/departments';

export interface Department {
  _id: string;
  nameDepartment: string;
}

// Lấy danh sách phòng ban
export const getDepartments = async (): Promise<Department[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy phòng ban theo ID
export const getDepartmentById = async (id: string): Promise<Department> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createDepartment = async (nameDepartment: string) => {
  // Kiểm tra tên phòng ban không được bỏ trống
  if (!nameDepartment.trim()) {
    throw new Error('Tên phòng ban không được để trống');
  }

  // Kiểm tra tên phòng ban không chứa ký tự đặc biệt (chỉ cho phép chữ cái và số)
  const regex = /^[A-Za-z0-9\s]+$/; // Chỉ cho phép chữ, số và khoảng trắng
  if (!regex.test(nameDepartment)) {
    throw new Error('Tên phòng ban không được chứa ký tự đặc biệt');
  }

  // Nếu tất cả điều kiện đều đúng, gửi yêu cầu
  await axios.post(API_URL, { nameDepartment });
};


// Cập nhật phòng ban
export const updateDepartment = async (id: string, nameDepartment: string) => {
  await axios.patch(`${API_URL}/${id}`, { nameDepartment });
};

// Xóa phòng ban
export const deleteDepartment = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
