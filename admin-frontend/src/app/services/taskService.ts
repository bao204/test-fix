import { Task } from './../../../../src/schemas/Task.schema';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000/tasks';
export const getAllTasks = async (): Promise<Task[]> => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách task:', error);
      return [];
    }
  };
  
export const createTask = async (formData: FormData) => {
    try {
      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  export const updateTask = async (id: string, formData: FormData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật task:', error);
      throw error;
    }
  };
  export const getTaskById = async (id: string): Promise<Task> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin task:', error);
      throw error;
    }
  };
  
  export const deleteTask = async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi xóa task :', error);
      throw error;
    }
  };