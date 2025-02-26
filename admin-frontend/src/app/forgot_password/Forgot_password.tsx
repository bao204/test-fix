"use client";
import { useState } from "react";
import { Button } from "../components/button/Button"; // Import Button component

export default function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập gửi yêu cầu khôi phục mật khẩu qua SMS
    setTimeout(() => {
      // Giả lập số điện thoại hợp lệ
      if (phoneNumber === "0987654321") {
        setMessage("Mật khẩu mới đã được gửi qua SMS.");
        setError("");
      } else {
        setError("Không tìm thấy tài khoản với số điện thoại này.");
        setMessage("");
      }
      setLoading(false);
    }, 1000); // Giả lập thời gian chờ
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      {/* Form khôi phục mật khẩu */}
      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Khôi phục mật khẩu
        </h2>
        {message && <p className="text-green-500 text-sm mt-2 text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nhập số điện thoại của bạn
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-indigo-500"
              required
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="flex justify-center">
            <Button
              label={loading ? "Đang gửi..." : "Gửi SMS khôi phục"}
              onClick= {() => handleSubmit}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
