import axios from 'axios';

const API_URL = 'http://localhost:3000/projectcategories';  // Sửa đường dẫn API

export interface ProjectCategory {
  _id: string;
  projectCategoryName: string;  // Đổi tên trường thành categoryName (nếu cần)
}

// Lấy danh sách Project Categories
export const getProjectCategory = async (): Promise<ProjectCategory[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy Project Category theo ID
export const getProjectCategoryById = async (id: string): Promise<ProjectCategory> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Thêm Project Category mới
export const create = async (projectCategoryName: string) => {
  if (!projectCategoryName.trim()) {
    throw new Error('Tên loại dự án không được để trống');
  }

  const regex = /^[A-Za-z0-9\s/]+$/; // Chỉ cho phép chữ, số và khoảng trắng
  if (!regex.test(projectCategoryName)) {
    throw new Error('Tên loại dự án không được chứa ký tự đặc biệt');
  }

  await axios.post(API_URL, { projectCategoryName });  // Sửa từ designationName thành categoryName
};

// Cập nhật Project Category
export const updateProjectCategory = async (id: string, projectCategoryName: string) => {
  await axios.patch(`${API_URL}/${id}`, { projectCategoryName });  // Sửa từ designationName thành categoryName
};

// Xóa Project Category
export const deleteProjectCategory = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
