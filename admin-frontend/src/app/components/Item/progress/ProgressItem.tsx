import React from 'react';
import EditProgressItem from './EditProgressItem';
import { PencilSquareIcon, TrashIcon, ClockIcon } from '@heroicons/react/24/outline'; // Import ClockIcon
import { useProgressHandler } from '@/app/components/hook/progress/progressItemHandle';

interface Progress {
  _id: string;
  progressName: string;
  projectid: { projectName: string };
  progressCategory: { progressCategoryName: string };
  progressStart: string;
  progressEnd: string;
  notificationSent?: { notification_name: string };
  taskAssignPerson: { employeeName: string; employeeProfile?: string };  // Added employeeImage
  taskRecipient: { employeeName: string; employeeProfile?: string };     // Added employeeImage
  priority: string;
  description: string;
  status: string;
}

interface ProgressItemProps {
  progress: Progress;
  onDelete: (id: string) => void;  
  onEdit: (id: string) => void;    
}

// Function to calculate the number of months between two dates
const calculateMonthsDifference = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let months = end.getMonth() - start.getMonth();
  const years = end.getFullYear() - start.getFullYear();

  months += years * 12; // Adding the number of months from the year difference

  return months >= 0 ? months : 0; // Ensure non-negative result
};

const ProgressItem: React.FC<ProgressItemProps> = ({ progress }) => {
  const {
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleting,
    handleAddTasks,
    handleDelete,
  } = useProgressHandler();

  const monthsRequired = progress.progressStart && progress.progressEnd ? 
    calculateMonthsDifference(progress.progressStart, progress.progressEnd) : 
    0;

  return (
    <div className="bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200">
      
      {/* Employee images in the top-right corner */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        {/* Display task assign person image */}
        {progress.taskAssignPerson?.employeeProfile ? (
          <img
            src={progress.taskAssignPerson.employeeProfile}
            className="w-10 h-10 rounded-full object-cover"
            alt={progress.taskAssignPerson.employeeName}
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>  // Placeholder if no image
        )}

        {/* Display task recipient image with a negative margin */}
        {progress.taskRecipient?.employeeProfile ? (
          <img
            src={progress.taskRecipient.employeeProfile}
            className="w-10 h-10 rounded-full object-cover -ml-4"  // Negative margin to pull image closer
            alt={progress.taskRecipient.employeeName}
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>  // Placeholder if no image
        )}
      </div>

      {/* Progress Category in top-left corner */}
      <div className="absolute top-3 left-3 bg-green-100 text-green-600 px-2 py-1 rounded-md">
        {progress.progressCategory?.progressCategoryName}
      </div>

      {/* Content of the Progress Item */}
      <div className="flex flex-col items-center mt-16">
        <h3 className="text-lg font-semibold text-gray-800">
          {progress.progressName || 'Không có tên'}
        </h3>

        {/* Priority Badge */}
        <div className="absolute top-16 right-3 bg-yellow-100 text-yellow-600 px-2 py-1 rounded-md">
          {progress.priority}
        </div>

        <div className="w-full mt-3 space-y-2">
          <div className="text-sm">
            <span className="text-gray-600">{progress.description || 'Không có dữ liệu'}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Ngày bắt đầu: </span>
            <span className="text-gray-600">{progress.progressStart ? new Date(progress.progressStart).toLocaleDateString() : 'Chưa có ngày'}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Ngày kết thúc: </span>
            <span className="text-gray-600">{progress.progressEnd ? new Date(progress.progressEnd).toLocaleDateString() : 'Chưa có ngày'}</span>
          </div>
          {/* Display months required */}
          <div className="text-sm flex items-center gap-1">
            <ClockIcon className="h-5 w-5 text-gray-600" /> {/* Icon for time */}
            <span className="font-medium text-gray-700">Thời gian thực hiện: </span>
            <span className="text-gray-600">{monthsRequired} tháng</span>
          </div>
        </div>

        {/* Add Task Button */}
        <button
  onClick={() => handleAddTasks(progress._id)}
  className=" mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 "
>
  Thêm công việc
</button>

      </div>

      {/* Edit and Delete buttons at the bottom-right corner */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDeleting}
          title="Chỉnh sửa"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleDelete(progress._id)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDeleting}
          title={isDeleting ? 'Đang xóa...' : 'Xóa'}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <EditProgressItem progressId={progress._id} onClose={() => setIsEditModalOpen(false)} />
            <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200" onClick={() => setIsEditModalOpen(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressItem;
