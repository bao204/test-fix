import axios from 'axios';

const API_URL = 'http://localhost:3000/taskcategories';  // Đổi API URL thành taskcategories

export interface TaskCategory {
  _id: string;
  taskCategoryName: string;  // Đổi tên trường thành taskCategoryName
}

// Lấy danh sách Task Categories
export const getTaskCategory = async (): Promise<TaskCategory[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy Task Category theo ID
export const getTaskCategoryById = async (id: string): Promise<TaskCategory> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Thêm Task Category mới
export const create = async (taskCategoryName: string) => {
  if (!taskCategoryName.trim()) {
    throw new Error('Tên loại nhiệm vụ không được để trống');
  }

  const regex = /^[A-Za-z0-9\s/]+$/; // Chỉ cho phép chữ, số và khoảng trắng
  if (!regex.test(taskCategoryName)) {
    throw new Error('Tên loại nhiệm vụ không được chứa ký tự đặc biệt');
  }

  await axios.post(API_URL, { taskCategoryName });  // Sửa từ progressCategoryName thành taskCategoryName
};

// Cập nhật Task Category
export const updateTaskCategory = async (id: string, taskCategoryName: string) => {
  await axios.patch(`${API_URL}/${id}`, { taskCategoryName });  // Sửa từ progressCategoryName thành taskCategoryName
};

// Xóa Task Category
export const deleteTaskCategory = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
