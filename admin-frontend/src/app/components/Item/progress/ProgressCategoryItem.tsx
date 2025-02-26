import { toast } from "react-toastify";

interface Props {
  progressCategory: {
    _id: string;
    progressCategoryName: string;  // Đổi từ projectCategoryName thành progressCategoryName
  };
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function ProgressCategoryItem({ progressCategory, onDelete, onEdit }: Props) {
  const handleEdit = (id: string) => {
    toast.info(`Đang chỉnh sửa: ${progressCategory.progressCategoryName}`);  // Sửa từ projectCategoryName thành progressCategoryName
    onEdit(id);
  };

  const handleDelete = (id: string) => {
    toast.success(`Đã xóa: ${progressCategory.progressCategoryName}`);  // Sửa từ projectCategoryName thành progressCategoryName
    setTimeout(() => onDelete(id), 500); // Đợi một chút để toast hiển thị trước khi xóa
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-full">
      <span className="text-lg font-semibold text-gray-800 block mb-2">
        {progressCategory.progressCategoryName}  {/* Sửa từ projectCategoryName thành progressCategoryName */}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(progressCategory._id)}  // Sửa từ projectCategory._id thành progressCategory._id
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Chỉnh sửa
        </button>
        <button
          onClick={() => handleDelete(progressCategory._id)}  // Sửa từ projectCategory._id thành progressCategory._id
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}
