// hooks/accountHandlers.ts
import { toast } from "react-toastify";
import { CreateAccountCommand, UpdateAccountCommand, DeleteAccountCommand } from "../components/command/accountCommands"; 
import { getAccountById } from "../services/accountService";

export const handleAdd = async (name: string, email: string, password: string, fetchAccounts: () => void) => {
  if (!name.trim() || !email.trim() || !password.trim()) {
    toast.error("Tên tài khoản, email và mật khẩu không được để trống!");
    return;
  }

  const createCommand = new CreateAccountCommand(name, email, password);
  await createCommand.execute();
  toast.success("Thêm tài khoản thành công!");
  fetchAccounts();
};

export const handleDelete = async (id: string, fetchAccounts: () => void) => {
  const deleteCommand = new DeleteAccountCommand(id);
  await deleteCommand.execute();
  toast.success("Xóa tài khoản thành công!");
  fetchAccounts();
};

export const handleEditClick = async (id: string, setEditId: React.Dispatch<React.SetStateAction<string | null>>, setEditName: React.Dispatch<React.SetStateAction<string>>, setEditEmail: React.Dispatch<React.SetStateAction<string>>, setEditPassword: React.Dispatch<React.SetStateAction<string>>) => {
  const account = await getAccountById(id);
  setEditId(id);
  setEditName(account.userName);
  setEditEmail(account.email);
  setEditPassword(account.password);
};

export const handleUpdate = async (editId: string | null, editName: string, editEmail: string, editPassword: string, fetchAccounts: () => void, setEditId: React.Dispatch<React.SetStateAction<string | null>>, setEditName: React.Dispatch<React.SetStateAction<string>>, setEditEmail: React.Dispatch<React.SetStateAction<string>>, setEditPassword: React.Dispatch<React.SetStateAction<string>>) => {
  if (!editId || !editName.trim() || !editEmail.trim() || !editPassword.trim()) {
    toast.error("Tên tài khoản, email và mật khẩu không được để trống!");
    return;
  }

  const updateCommand = new UpdateAccountCommand(editId, editName, editEmail, editPassword);
  await updateCommand.execute();
  toast.success("Cập nhật tài khoản thành công!");
  setEditId(null);
  setEditName("");
  setEditEmail("");
  setEditPassword("");
  fetchAccounts();
};
