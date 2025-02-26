import { toast } from "react-toastify";

interface Props {
  taskCategory: {
    _id: string;
    taskCategoryName: string;  // Đổi từ projectCategoryName thành taskCategoryName
  };
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function TaskCategoryItem({ taskCategory, onDelete, onEdit }: Props) {
  const handleEdit = (id: string) => {
    toast.info(`Đang chỉnh sửa: ${taskCategory.taskCategoryName}`);  // Sửa projectCategoryName thành taskCategoryName
    onEdit(id);
  };

  const handleDelete = (id: string) => {
    toast.success(`Đã xóa: ${taskCategory.taskCategoryName}`);  // Sửa projectCategoryName thành taskCategoryName
    setTimeout(() => onDelete(id), 500); // Đợi một chút để toast hiển thị trước khi xóa
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-full">
      <span className="text-lg font-semibold text-gray-800 block mb-2">
        {taskCategory.taskCategoryName}  {/* Sửa projectCategoryName thành taskCategoryName */}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(taskCategory._id)}  // Sửa projectCategory._id thành taskCategory._id
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Chỉnh sửa
        </button>
        <button
          onClick={() => handleDelete(taskCategory._id)}  // Sửa projectCategory._id thành taskCategory._id
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}
