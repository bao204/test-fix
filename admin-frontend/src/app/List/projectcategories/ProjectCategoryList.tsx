"use client";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
getProjectCategory,
  create,
  deleteProjectCategory,
  updateProjectCategory,
  getProjectCategoryById,
  ProjectCategory,
} from "../../services/projectCategoryService"; // Thay tên service nếu cần
import ProjectCategoryItem from "../../components/Item/project/ProjectCategoryItem"; // Thay tên component nếu cần

export default function ProjectCategoryList() {
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchProjectCategories();
  }, []);

  const fetchProjectCategories = async () => {
    const data = await getProjectCategory();
    setProjectCategories(data);
  };

  const handleAdd = async () => {
    if (!name.trim()) {
      toast.error("Tên danh mục không được để trống!");
      return;
    }
    await create(name);
    toast.success("Thêm danh mục thành công!");
    setName("");
    fetchProjectCategories();
  };

  const handleDelete = async (id: string) => {
    await deleteProjectCategory(id);
    toast.success("Xóa danh mục thành công!");
    fetchProjectCategories();
  };

  const handleEditClick = async (id: string) => {
    const projectCategory = await getProjectCategoryById(id);
    setEditId(id);
    setEditName(projectCategory.projectCategoryName);
  };

  const handleUpdate = async () => {
    if (!editId || !editName.trim()) {
      toast.error("Tên danh mục không được để trống!");
      return;
    }
    await updateProjectCategory(editId, editName);
    toast.success("Cập nhật danh mục thành công!");
    setEditId(null);
    setEditName("");
    fetchProjectCategories();
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">Danh sách danh mục</h1>

      {/* Form thêm mới */}
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="Nhập tên danh mục"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm
        </button>
      </div>

      {/* Form chỉnh sửa */}
      {editId && (
        <div className="mb-4">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Cập nhật
          </button>
          <button
            onClick={() => setEditId(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Hủy
          </button>
        </div>
      )}

      {/* Danh sách danh mục */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {projectCategories.map((projectCategory) => (
          <ProjectCategoryItem
            key={projectCategory._id}
            projectCategory={projectCategory} // Đổi designation thành projectCategory
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        ))}
      </div>
    </div>
  );
}
