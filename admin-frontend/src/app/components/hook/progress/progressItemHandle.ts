import { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import { DeleteProgressCommand } from '@/app/components/command/progress/progressItemCommand';

export const useProgressHandler = () => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddTasks = (progressId: string) => {
    router.push(`/List/tasks?progressId=${progressId}`);
  };

  const handleDelete = async (progressId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tiến độ này không?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await new DeleteProgressCommand(progressId).execute();
      toast.success('Tiến độ đã được xóa thành công');
      mutate('http://localhost:3000/progress');
    } catch (error) {
      toast.error('Lỗi khi xóa tiến độ');
      console.error('Error deleting progress:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleting,
    handleAddTasks,
    handleDelete,
  };
};
