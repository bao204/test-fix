"use client";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getDepartments,
  createDepartment,
  deleteDepartment,
  updateDepartment,
  getDepartmentById,
  Department,
} from "../../services/departmentService";
import DepartmentItem from "../../components/Item/DepartmentItem";
import { Button } from "../../components/button/Button";
import { FiEdit } from "react-icons/fi";

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const data = await getDepartments();
    setDepartments(data);
  };

  const handleAdd = async () => {
    if (!name.trim()) {
      toast.error("Tên phòng ban không được để trống!");
      return;
    }
    await createDepartment(name);
    toast.success("Thêm phòng ban thành công!");
    setName("");
    fetchDepartments();
  };

  const handleDelete = async (id: string) => {
    await deleteDepartment(id);
    toast.success("Xóa phòng ban thành công!");
    fetchDepartments();
  };

  const handleEditClick = async (id: string) => {
    const department = await getDepartmentById(id);
    setEditId(id);
    setEditName(department.nameDepartment);
  };

  const handleUpdate = async () => {
    if (!editId || !editName.trim()) {
      toast.error("Tên phòng ban không được để trống!");
      return;
    }
    await updateDepartment(editId, editName);
    toast.success("Cập nhật phòng ban thành công!");
    setEditId(null);
    setEditName("");
    fetchDepartments();
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">Danh sách phòng ban</h1>

      {/* Form thêm mới */}
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="Nhập tên phòng ban"
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

          <Button label="Chỉnh sửa" onClick={handleUpdate} variant="primary" icon={<FiEdit />} />
          <button
            onClick={() => setEditId(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Hủy
          </button>
        </div>
      )}

      {/* Danh sách phòng ban */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {departments.map((dept) => (
          <DepartmentItem
            key={dept._id}
            department={dept}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        ))}
      </div>
    </div>
  );
}
