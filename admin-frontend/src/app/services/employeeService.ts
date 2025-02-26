import axios from 'axios';
import { Employee } from '../models/employee';

const API_BASE_URL = 'http://localhost:3000/employees';

// Tạo axios instance để tái sử dụng config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // timeout 10s
});

// Thêm interceptor để tự động thêm token vào header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getEmployeeProfile = async (): Promise<Employee> => {
  try {
    const response = await axiosInstance.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin profile:', error);
    throw error;
  }
};

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await axiosInstance.get('');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nhân viên:', error);
    return [];
  }
};

export const createEmployee = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (id: string, formData: FormData) => {
  try {
    const response = await axiosInstance.patch(`/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật nhân viên:', error);
    throw error;
  }
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin nhân viên:', error);
    throw error;
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa nhân viên:', error);
    throw error;
  }
};