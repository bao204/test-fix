import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/progress';

export const useProgressHandlers = () => {
  const [showCreateProgressDialog, setShowCreateProgressDialog] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi xóa tiến độ:", error);
    }
  };

  const handleEdit = (id: string) => {
    console.log(`Editing progress: ${id}`);
  };

  const handleOpenDialog = () => setShowCreateProgressDialog(true);
  const handleCloseDialog = () => setShowCreateProgressDialog(false);

  return {
    showCreateProgressDialog,
    handleDelete,
    handleEdit,
    handleOpenDialog,
    handleCloseDialog,
  };
};
