import axios from 'axios';

const API_URL = 'http://localhost:3000/accounts';  // Đổi API URL thành accounts

export interface Account {
  _id: string;
  userName: string;
  email: string;
  password: string;
}

// Lấy danh sách tài khoản
export const getAccounts = async (): Promise<Account[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy tài khoản theo ID
export const getAccountById = async (id: string): Promise<Account> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Thêm tài khoản mới
export const create = async (userName: string, password: string, email: string) => {
  if (!userName.trim()) {
    throw new Error('Tên tài khoản không được để trống');
  }

  if (!password.trim()) {
    throw new Error('Mật khẩu không được để trống');
  }

  if (!email.trim()) {
    throw new Error('Email không được để trống');
  }

  const regex = /^[A-Za-z0-9\s]+$/; // Kiểm tra tên tài khoản không chứa ký tự đặc biệt
  if (!regex.test(userName)) {
    throw new Error('Tên tài khoản không được chứa ký tự đặc biệt');
  }

  await axios.post(API_URL, { userName, password, email });
};

// Cập nhật tài khoản
export const updateAccount = async (id: string, userName: string, password: string, email: string) => {
  await axios.patch(`${API_URL}/${id}`, { userName, password, email });
};

// Xóa tài khoản
export const deleteAccount = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
