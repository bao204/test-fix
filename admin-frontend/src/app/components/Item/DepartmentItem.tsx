import { Button } from "../button/Button";
import { FiDelete, FiEdit } from "react-icons/fi";
import { Department } from "../../models/department";
import { useDepartmentHandlers } from "../../components/hook/departmentHandlers";

interface Props {
  department: Department;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function DepartmentItem({ department, onDelete, onEdit }: Props) {
  const { handleEdit, handleDelete } = useDepartmentHandlers(onEdit, onDelete);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-full">
      <span className="text-lg font-semibold text-gray-800 block mb-2">
        {department.nameDepartment}
      </span>
      <div className="flex gap-2">
        <Button label="Chỉnh sửa" onClick={() => handleEdit(department._id, department.nameDepartment)} variant="primary" icon={<FiEdit />} />
        <Button label="Xóa" onClick={() => handleDelete(department._id, department.nameDepartment)} variant="danger" icon={<FiDelete />} />
      </div>
    </div>
  );
}
