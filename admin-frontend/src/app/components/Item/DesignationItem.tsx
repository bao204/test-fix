  import { toast } from "react-toastify";

  interface Props {
    designation: {
      _id: string;
      designationName: string;
    };
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
  }

  export default function DesignationItem({ designation, onDelete, onEdit }: Props) {
    const handleEdit = (id: string) => {
      toast.info(`Đang chỉnh sửa: ${designation.designationName}`);
      onEdit(id);
    };

    const handleDelete = (id: string) => {
      toast.success(`Đã xóa: ${designation.designationName}`);
      setTimeout(() => onDelete(id), 500); // Đợi một chút để toast hiển thị trước khi xóa
    };

    return (
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-full">
        <span className="text-lg font-semibold text-gray-800 block mb-2">
          {designation.designationName}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(designation._id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Chỉnh sửa
          </button>
          <button
            onClick={() => handleDelete(designation._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Xóa
          </button>
        </div>
      </div>
    );
  }
