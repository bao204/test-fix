import axios from 'axios';

const API_URL = 'http://localhost:3000/notifications';  // Sửa đường dẫn API

export interface NotificationSent {
  _id: string;
  notification_name: string;  // Đổi tên trường thành notification_name
}

// Lấy danh sách thông báo
export const getNotificationSent = async (): Promise<NotificationSent[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Lấy thông báo theo ID
export const getNotificationSentById = async (id: string): Promise<NotificationSent> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Thêm thông báo mới
export const create = async (notification_name: string) => {
  if (!notification_name.trim()) {
    throw new Error('Tên thông báo không được để trống');
  }

  const regex = /^[A-Za-z0-9\s/]+$/; // Chỉ cho phép chữ, số và khoảng trắng
  if (!regex.test(notification_name)) {
    throw new Error('Tên thông báo không được chứa ký tự đặc biệt');
  }

  await axios.post(API_URL, { notification_name });  // Sửa từ projectCategoryName thành notification_name
};

// Cập nhật thông báo
export const updateNotificationSent = async (id: string, notification_name: string) => {
  await axios.patch(`${API_URL}/${id}`, { notification_name });  // Sửa từ projectCategoryName thành notification_name
};

// Xóa thông báo
export const deleteNotificationSent = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
