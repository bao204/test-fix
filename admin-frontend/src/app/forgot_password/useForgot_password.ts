import { useState } from "react";

export const useForgotPassword = (onResetSuccess: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch("http://localhost:3000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Yêu cầu đặt lại mật khẩu thất bại");

      setSuccessMessage("Yêu cầu đặt lại mật khẩu đã được gửi, vui lòng kiểm tra email của bạn.");
      onResetSuccess();
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

  return { loading, error, successMessage, handleForgotPassword };
};
