// AccountItem.tsx
import { toast } from "react-toastify";
import { Button } from "../button/Button";
import { FiEdit, FiTrash } from "react-icons/fi";
import { EditCommand, DeleteCommand } from "../command/command";
import { Account } from "../../models/account"; // Import interface Account

interface Props {
  account: Account; // Sử dụng interface Account
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}
export default function AccountItem({ account, onDelete, onEdit }: Props) {
  const editCommand = new EditCommand(account._id, onEdit);
  const deleteCommand = new DeleteCommand(account._id, onDelete);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-full">
      <span className="text-lg font-semibold text-gray-800 block mb-2">
        {account.userName}
      </span>
      <span className="text-sm text-gray-600 block mb-2">Email: {account.email}</span>
      <span className="text-sm text-gray-600 block mb-2">Mật khẩu: {account.password}</span>
      <div className="flex gap-2">
        <Button
          label="Chỉnh sửa"
          onClick={() => {
            toast.info(`Đang chỉnh sửa: ${account.userName}`);
            editCommand.execute();
          }}
          variant="primary"
          icon={<FiEdit />}
        />
        <Button
          label="Xóa"
          onClick={() => deleteCommand.execute()}
          variant="danger"
          icon={<FiTrash />}
        />
      </div>
    </div>
  );
}
