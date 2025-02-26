
import axios from 'axios';
import { Report } from '../models/Reports';

const API_BASE_URL = 'http://localhost:3000/reports';

export const getAllReports = async (): Promise<Report[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách report:', error);
    return [];
  }
};

export const createReport = async (formData: FormData) => {
  try {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating report:', error);
    throw error;
  }
};

export const updateReport = async (id: string, formData: FormData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật report:', error);
    throw error;
  }
};

export const getReportById = async (id: string): Promise<Report> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin report:', error);
    throw error;
  }
};

export const deleteReport = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa report:', error);
    throw error;
  }
};