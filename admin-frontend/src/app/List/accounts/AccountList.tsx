"use client";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAccounts, Account } from "../../services/accountService";
import AccountItem from "../../components/Item/AccountItem"
import { Button } from "../../components/button/Button";
import { FiEdit, FiPlus } from "react-icons/fi";
import { handleAdd, handleDelete, handleEditClick, handleUpdate } from "../../hook/accountHandlers"; // Import các hàm xử lý
import AccountInput from "../../components/input/AccountInput"; // Import component AccountInput

export default function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const data = await getAccounts();
    setAccounts(data);
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">Danh sách tài khoản</h1>

      {/* Form thêm mới */}
      <div className="mb-4 flex items-center gap-2">
        <AccountInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nhập tên tài khoản"
        />
        <AccountInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Nhập email"
        />
        <AccountInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Nhập mật khẩu"
        />
        <Button label="Thêm" onClick={() => handleAdd(name, email, password, fetchAccounts)} variant="primary" icon={<FiPlus />} />
      </div>

      {/* Form chỉnh sửa */}
      {editId && (
        <div className="mb-5 flex items-center gap-2">
          <AccountInput
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            type="text"
            placeholder="Nhập tên tài khoản"
          />
          <AccountInput
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            type="email"
            placeholder="Nhập email"
          />
          <AccountInput
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            type="password"
            placeholder="Nhập mật khẩu"
          />
          <Button label="Cập nhật" onClick={() => handleUpdate(editId, editName, editEmail, editPassword, fetchAccounts, setEditId, setEditName, setEditEmail, setEditPassword)} variant="primary" icon={<FiEdit />} />
          <Button label="Hủy" onClick={() => setEditId(null)} variant="primary" icon={<FiEdit />} />
        </div>
      )}

      {/* Danh sách tài khoản */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {accounts.map((account) => (
          <AccountItem
            key={account._id}
            account={account}
            onDelete={(id) => handleDelete(id, fetchAccounts)}  // Cập nhật cách gọi handleDelete
            onEdit={(id) => handleEditClick(id, setEditId, setEditName, setEditEmail, setEditPassword)}  // Cập nhật cách gọi handleEditClick
          />
        ))}
      </div>
    </div>
  );
}
