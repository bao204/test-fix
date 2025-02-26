import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { mutate } from "swr";

export const useProjectActions = (projectId: string, onDelete: (id: string) => void) => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddProgress = () => {
    router.push(`/List/progress?projectId=${projectId}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa dự án này không?")) {
      return;
    }

    try {
      await onDelete(projectId);
      toast.success("Dự án đã được xóa thành công");
      mutate("http://localhost:3000/projects");
    } catch (error) {
      toast.error("Lỗi khi xóa dự án");
      console.error("Error deleting project:", error);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  return {
    isEditModalOpen,
    setIsEditModalOpen,
    handleAddProgress,
    handleDelete,
    handleEdit,
  };
};
