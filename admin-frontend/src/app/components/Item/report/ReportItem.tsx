import { useState } from "react";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { mutate } from "swr";
import ReportDetailDialog from "./DetailReportItem";
import EditReportItem from "./EditReportItem"; // Import modal chỉnh sửa

interface Report {
  _id: string;
  reportName: string;
  submission_time: string;
  status: string;
  notereport?: string;
  filerepport?: string;
  id_employee?: string;
  id_task?: string;
  id_progress?: string;
}

interface ReportItemProps {
  report: Report;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const ReportItem: React.FC<ReportItemProps> = ({ report, onDelete }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa báo cáo này không?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(report._id);
      toast.success("Báo cáo đã được xóa thành công");
      mutate("http://localhost:3000/reports");
    } catch (error) {
      toast.error("Lỗi khi xóa báo cáo");
      console.error("Error deleting report:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200">
      <div className="absolute top-3 right-3 flex gap-2">
        {/* Nút Xem chi tiết */}
        <button
          onClick={() => setIsDetailOpen(true)}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          title="Xem chi tiết"
        >
          <EyeIcon className="h-5 w-5" />
        </button>

        {/* Nút Chỉnh sửa */}
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          title="Chỉnh sửa"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>

        {/* Nút Xóa */}
        <button
          onClick={handleDelete}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          disabled={isDeleting}
          title={isDeleting ? "Đang xóa..." : "Xóa"}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Hiển thị thông tin cơ bản */}
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mt-3 text-gray-800">{report.reportName}</h3>
        <p className="text-sm text-gray-600">{new Date(report.submission_time).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600">Trạng thái: {report.status}</p>
      </div>

      {/* Hiển thị dialog chi tiết */}
      {isDetailOpen && (
        <ReportDetailDialog reportId={report._id} onClose={() => setIsDetailOpen(false)} />
      )}

      {/* Hiển thị modal chỉnh sửa */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <EditReportItem 
              reportId={report._id} 
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

export default ReportItem;
