import React, { useState } from 'react';
import EditTaskItem from './EditTaskItem';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Task {
  _id: string;
  taskName: string;
  progressId?: { progressName: string };
  taskCategory?: { taskCategoryName: string };
  taskStart: string;
  taskEnd: string;
  notificationSent?: { notification_name: string };
  taskAssignPerson?: { employeeName: string };
  taskRecipient?: { employeeName: string };
  priority: string;
  description: string;
  status: string;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TasksItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa nhiệm vụ này không?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(task._id);
      toast.success('Nhiệm vụ đã được xóa thành công');
      mutate('http://localhost:3000/tasks');
    } catch (error) {
      toast.error('Lỗi khi xóa nhiệm vụ');
      console.error('Error deleting task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200">
      {/* Nút sửa và xóa */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDeleting}
          title="Chỉnh sửa"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDeleting}
          title={isDeleting ? 'Đang xóa...' : 'Xóa'}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Thông tin nhiệm vụ */}
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mt-3 text-gray-800">
          {task.taskName || 'Không có tên'}
        </h3>
        <div className="w-full mt-3 space-y-2">
          <div className="text-sm">
            <span className="font-medium text-gray-700">Dự án: </span>
            <span className="text-gray-600">
              {task.progressId?.progressName || 'Không có dữ liệu'}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Danh mục: </span>
            <span className="text-gray-600">
              {task.taskCategory?.taskCategoryName || 'Không có danh mục'}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Người giao: </span>
            <span className="text-gray-600">
              {task.taskAssignPerson?.employeeName || 'Không có thông tin'}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Người nhận: </span>
            <span className="text-gray-600">
              {task.taskRecipient?.employeeName || 'Không có thông tin'}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Mức độ ưu tiên: </span>
            <span className="text-gray-600">{task.priority || 'Không xác định'}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Trạng thái: </span>
            <span className="text-gray-600">{task.status || 'Không có dữ liệu'}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Ngày bắt đầu: </span>
            <span className="text-gray-600">
              {task.taskStart ? new Date(task.taskStart).toLocaleDateString() : 'Chưa có ngày'}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Ngày kết thúc: </span>
            <span className="text-gray-600">
              {task.taskEnd ? new Date(task.taskEnd).toLocaleDateString() : 'Chưa có ngày'}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Thông báo: </span>
            <span className="text-gray-600">
              {task.notificationSent?.notification_name || 'Không có thông báo'}
            </span>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <EditTaskItem 
              taskId={task._id} 
              onClose={() => setIsEditModalOpen(false)} 
            />
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
              onClick={() => setIsEditModalOpen(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksItem;