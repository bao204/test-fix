"use client";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    
getNotificationSent,
  create,
  deleteNotificationSent,
  updateNotificationSent,
  getNotificationSentById,
  NotificationSent,
} from "../../services/notificationSentService"; // Thay tên service nếu cần

import NotificationSentItem from "../../components/Item/NotificationSentItem";

export default function NotificationList() {
  const [notifications, setNotifications] = useState<NotificationSent[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const data = await getNotificationSent();
    setNotifications(data);
  };

  const handleAdd = async () => {
    if (!name.trim()) {
      toast.error("Tên thông báo không được để trống!");
      return;
    }
    await create(name);
    toast.success("Thêm thông báo thành công!");
    setName("");
    fetchNotifications();
  };

  const handleDelete = async (id: string) => {
    await deleteNotificationSent(id);
    toast.success("Xóa thông báo thành công!");
    fetchNotifications();
  };

  const handleEditClick = async (id: string) => {
    const notification = await getNotificationSentById(id);
    setEditId(id);
    setEditName(notification.notification_name);
  };

  const handleUpdate = async () => {
    if (!editId || !editName.trim()) {
      toast.error("Tên thông báo không được để trống!");
      return;
    }
    await updateNotificationSent(editId, editName);
    toast.success("Cập nhật thông báo thành công!");
    setEditId(null);
    setEditName("");
    fetchNotifications();
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">Danh sách thông báo</h1>

      {/* Form thêm mới */}
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="Nhập tên thông báo"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm
        </button>
      </div>

      {/* Form chỉnh sửa */}
      {editId && (
        <div className="mb-4">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Cập nhật
          </button>
          <button
            onClick={() => setEditId(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Hủy
          </button>
        </div>
      )}

      {/* Danh sách thông báo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {notifications.map((notification) => (
          <NotificationSentItem
            key={notification._id}
            notificationSent={notification} 
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        ))}
      </div>
    </div>
  );
}
