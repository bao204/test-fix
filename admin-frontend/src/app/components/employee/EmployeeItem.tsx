import React, { useState } from 'react';
import EditEmployeeItem from './EditEmployeeItem';
import { deleteEmployee } from '../../services/employeeService';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { Employee } from '../../models/employee';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

interface EmployeeItemProps {
  employee: Employee;
}

const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const imageUrl = employee.employeeProfile
    ? `http://localhost:3000${employee.employeeProfile}`
    : '/ngoe.jpg';

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteEmployee(employee._id);
      toast.success('Employee deleted successfully');
      mutate('http://localhost:3000/employees');
    } catch (error) {
      toast.error('Failed to delete employee');
      console.error('Error deleting employee:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200">

      <div className="w-40 border-r-2 mr-3 flex justify-center items-center">
        <img
          src={imageUrl}
          alt={employee.employeeName}
          className="w-24 h-24 object-cover rounded-full border-2 border-gray-200"
          onError={(e) => (e.currentTarget.src = '/ngoe.jpg')}
        />
      </div>

      <div className="flex flex-col ">
        <h3 className="text-lg font-semibold mt-3 text-gray-800">
          {employee.employeeName}
        </h3>

        <div className="text-xs bg-slate-400 p-2 font-bold inline-block text-center rounded-sm w-fit px-2 py-1 border-2 border-slate-450">
          <span className="text-black ">
            {employee.designation_id?.designationName || 'Chưa có chức vụ'}
          </span>
        </div>

        <div className="text-sm">
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className="font-medium text-gray-700 ">Email: </span>
            <span className="text-gray-600">
              {employee.account?.email || 'Chưa có email'}
            </span>
          </div>
        </div>


        {employee.description && (

          <div className="text-sm">
            <span className="font-medium text-gray-700">Description: </span>
            <span className="text-gray-600">{employee.description}</span>
          </div>
        )}

        <div className=" top-9 right-3 flex gap-2 mr-auto pt-4">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting}
            title="Edit"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting}
            title={isDeleting ? 'Deleting...' : 'Delete'}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>

      </div>


      {
        isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
              <EditEmployeeItem
                employee={employee}
                onClose={() => setIsEditModalOpen(false)}
              />
              <button
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
                onClick={() => setIsEditModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default EmployeeItem;