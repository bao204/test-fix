import axios from 'axios';
import { Project } from 'next/dist/build/swc/types';


const API_BASE_URL = 'http://localhost:3000/projects';

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dự án:', error);
    return [];
  }
};


export const createProject = async (formData: FormData) => {
    try {
      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };
  
  export const updateProject = async (id: string, formData: FormData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật dự án:', error);
      throw error;
    }
  };

  export const getProjectById = async (id: string): Promise<Project> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin dự án:', error);
      throw error;
    }
  };
  
  export const deleteProject = async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi xóa dự án :', error);
      throw error;
    }
  };