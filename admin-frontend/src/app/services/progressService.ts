import axios from 'axios';
import { Progress } from '../models/Progress'; // Import kiểu dữ liệu

const API_BASE_URL = 'http://localhost:3000/progress';

export const getAllProgresses = async (): Promise<Progress[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tiến độ:', error);
    return [];
  }
};

export const createProgress = async (data: Progress): Promise<Progress> => {
  try {
    const response = await axios.post(API_BASE_URL, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo tiến độ:', error);
    throw error;
  }
};

export const updateProgress = async (id: string, data: Progress): Promise<Progress> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật tiến độ:', error);
    throw error;
  }
};

export const getProgressById = async (id: string): Promise<Progress> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin tiến độ:', error);
    throw error;
  }
};

export const deleteProgress = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Lỗi khi xóa tiến độ:', error);
    throw error;
  }
};
