"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./login/Login";
import { Employee } from "./models/employee";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (employee: Employee) => {
    setIsLoggedIn(true);

    // Kiểm tra designation_id của nhân viên và điều hướng tương ứng
    if (employee && employee.designation_id) {
      if (employee.designation_id.designationName === "Tech Lead") {
        router.push("/tasks"); // Điều hướng đến trang tasks nếu là Tech Lead
      } else {
        router.push("/projects"); // Điều hướng đến trang project nếu không phải là Tech Lead
      }
    } else {
      console.error("Thông tin nhân viên không hợp lệ"); // Xử lý trường hợp không có thông tin nhân viên
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex w-full bg-[#f0f0f0]">
          {isLoggedIn ? (
            <div className="flex w-full">
              <div className="h-full fixed">
                <Sidebar />
              </div>
              <div className="flex flex-col w-full h-full pl-64 p-4 mt-6">
                {children}
              </div>
            </div>
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      </body>
    </html>
  );
}
