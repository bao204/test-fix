import axios from 'axios';

const API_URL = 'http://localhost:3000/designations';

export interface Designation {
  _id: string;
  designationName: string;
}

// Lấy danh sách chức danh
export const getDesignation = async (): Promise<Designation[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy chức danh theo ID
export const getDesignationById = async (id: string): Promise<Designation> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Thêm chức danh mới
export const create = async (designationName: string) => {
  if (!designationName.trim()) {
    throw new Error('Tên chức danh không được để trống');
  }

  const regex = /^[A-Za-z0-9\s/]+$/; // Chỉ cho phép chữ, số và khoảng trắng
  if (!regex.test(designationName)) {
    throw new Error('Tên chức danh không được chứa ký tự đặc biệt');
  }

  await axios.post(API_URL, { designationName });
};

// Cập nhật chức danh
export const updateDesignation = async (id: string, designationName: string) => {
  await axios.patch(`${API_URL}/${id}`, { designationName });
};

// Xóa chức danh
export const deleteDesignation = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
