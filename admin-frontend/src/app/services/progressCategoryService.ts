import axios from 'axios';

const API_URL = 'http://localhost:3000/progresscategories';  // Đổi API URL thành progresscategories

export interface ProgressCategory {
  _id: string;
  progressCategoryName: string;  // Đổi tên trường thành progressCategoryName
}

// Lấy danh sách Progress Categories
export const getProgressCategory = async (): Promise<ProgressCategory[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy Progress Category theo ID
export const getProgressCategoryById = async (id: string): Promise<ProgressCategory> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Thêm Progress Category mới
export const create = async (progressCategoryName: string) => {
  if (!progressCategoryName.trim()) {
    throw new Error('Tên loại tiến trình không được để trống');
  }

  const regex = /^[A-Za-z0-9\s/]+$/; // Chỉ cho phép chữ, số và khoảng trắng
  if (!regex.test(progressCategoryName)) {
    throw new Error('Tên loại tiến trình không được chứa ký tự đặc biệt');
  }

  await axios.post(API_URL, { progressCategoryName });  // Sửa từ projectCategoryName thành progressCategoryName
};

// Cập nhật Progress Category
export const updateProgressCategory = async (id: string, progressCategoryName: string) => {
  await axios.patch(`${API_URL}/${id}`, { progressCategoryName });  // Sửa từ projectCategoryName thành progressCategoryName
};

// Xóa Progress Category
export const deleteProgressCategory = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
