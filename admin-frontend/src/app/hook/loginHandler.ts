import { useState } from "react";
import { Employee } from "../models/employee";

interface LoginResponse {
  token: string;
  employee: Employee;
  message?: string;
}

export const useLogin = (onLoginSuccess: (employee: Employee) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await res.json();
      if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");

      // Lưu token vào localStorage
      localStorage.setItem("token", data.token);

      // Gọi hàm onLoginSuccess khi đăng nhập thành công
      onLoginSuccess(data.employee);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleLogin };
};
