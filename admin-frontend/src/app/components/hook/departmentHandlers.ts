import { toast } from "react-toastify";

export function useDepartmentHandlers(onEdit: (id: string) => void, onDelete: (id: string) => void) {
  const handleEdit = (id: string, name: string) => {
    toast.info(`Đang chỉnh sửa: ${name}`);
    onEdit(id);
  };

  const handleDelete = (id: string, name: string) => {
    toast.success(`Đã xóa: ${name}`);
    setTimeout(() => onDelete(id), 500); // Đợi một chút để toast hiển thị trước khi xóa
  };

  return { handleEdit, handleDelete };
}
