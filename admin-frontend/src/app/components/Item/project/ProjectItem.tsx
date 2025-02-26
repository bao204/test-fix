import React from "react";
import EditProjectItem from "./EditProjectItem";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Project } from "../../../models/project";
import { useProjectActions } from "../../hook/project/projectItemHandle";

interface ProjectItemProps {
  project: Project;
  onDelete: (id: string) => void;
  
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, onDelete }) => {
  const { isEditModalOpen, setIsEditModalOpen, handleAddProgress, handleDelete, handleEdit } = 
    useProjectActions(project._id, onDelete);

  return (
    <div className="bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200">
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={handleEdit}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
          title="Chỉnh sửa"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
          title="Xóa"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <img
          src={project.projectImage}
          alt={project.projectName}
          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
          onError={(e) => (e.currentTarget.src = "/default_project.jpg")}
        />
        <h3 className="text-lg font-semibold mt-3 text-gray-800">{project.projectName}</h3>
        <div className="w-full mt-3 space-y-2">
          <div className="text-sm">
            <span className="font-medium text-gray-700">Danh mục: </span>
            <span className="text-gray-600">{project.projectCategory?.projectCategoryName || "Chưa có danh mục"}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Ngày bắt đầu: </span>
            <span className="text-gray-600">{new Date(project.projectStart).toLocaleDateString()}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Ngày kết thúc: </span>
            <span className="text-gray-600">{new Date(project.projectEnd).toLocaleDateString()}</span>
          </div>
        </div>
        <button
          onClick={handleAddProgress}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Thêm tiến độ
        </button>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <EditProjectItem projectId={project._id} onClose={() => setIsEditModalOpen(false)} />
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

export default ProjectItem;
