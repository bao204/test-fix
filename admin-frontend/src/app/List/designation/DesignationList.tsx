  "use client";
  import { useEffect, useState } from "react";
  import { toast, ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import {
    getDesignation,
    create,
    deleteDesignation,
    updateDesignation,
    getDesignationById,
    Designation,
  } from "../../services/designationService"; // Thay tên service nếu cần
  import DesignationItem from "../../components/Item/DesignationItem"; // Thay tên component nếu cần

  export default function DesignationList() {
    const [designations, setDesignations] = useState<Designation[]>([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    useEffect(() => {
      fetchDesignations();
    }, []);

    const fetchDesignations = async () => {
      const data = await getDesignation();
      setDesignations(data);
    };

    const handleAdd = async () => {
      if (!name.trim()) {
        toast.error("Tên chức danh không được để trống!");
        return;
      }
      await create(name);
      toast.success("Thêm chức danh thành công!");
      setName("");
      fetchDesignations();
    };

    const handleDelete = async (id: string) => {
      await deleteDesignation(id);
      toast.success("Xóa chức danh thành công!");
      fetchDesignations();
    };

    const handleEditClick = async (id: string) => {
      const designation = await getDesignationById(id);
      setEditId(id);
      setEditName(designation.designationName);
    };

    const handleUpdate = async () => {
      if (!editId || !editName.trim()) {
        toast.error("Tên chức danh không được để trống!");
        return;
      }
      await updateDesignation(editId, editName);
      toast.success("Cập nhật chức danh thành công!");
      setEditId(null);
      setEditName("");
      fetchDesignations();
    };

    return (
      <div className="p-6">
        <ToastContainer position="top-right" autoClose={3000} />
        <h1 className="text-2xl font-bold mb-4">Danh sách chức danh</h1>

        {/* Form thêm mới */}
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded mr-2"
            placeholder="Nhập tên chức danh"
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

        {/* Danh sách chức danh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {designations.map((designation) => (
            <DesignationItem
              key={designation._id}
              designation={designation} // Đổi department thành designation
              onDelete={handleDelete}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      </div>
    );
  }
