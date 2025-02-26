"use client";

import React, { useState } from "react";
import SidebarItems from "./SidebarItemsList";
import { useRouter } from "next/navigation"; // Import useRouter


interface ISidebarItem {
  name: string;
  path: string;
  items?: ISubItems[];
}

interface ISubItems {
  name: string;
  path: string;
}


const items: ISidebarItem[] = [
  { name: "Departments", path: "/List/departments" },
  { name: "Designations", path: "/List/designation" },
  { name: "Notifications", path: "/List/notifications" },
  { name: "Accounts", path: "/List/accounts" },
  { name: "ProjectCategories", path: "/List/projectcategories" },
  { name: "ProgressCategories", path: "/List/progresscategories" },
  { name: "TaskCategories", path: "/List/taskcategories" },
  {
    name: "Employees",
    path: "/List/settings",
    items: [
      { name: "Members", path: "/employees" },

    ],
  },
  {
    name: "Project",
    path: "/List/projects",
    items: [
      { name: "Project", path: "/List/projects" },
      { name: "Progress", path: "/List/progress" },
      { name: "Tasks", path: "/List/tasks" },
    ],
  },
  { name: "Reports", path: "/List/reports" },

];

const bottomItems: ISidebarItem[] = [
  {
    name: "Profile",
    path: "/List/profile",
    items: [
      { name: "Bio", path: "/profile/bio" },
      { name: "Test", path: "/profile/text" },
    ],
  },
  { name: "Logout", path: "#" },
];

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token
    window.dispatchEvent(new Event("logout")); // Gửi sự kiện logout
    router.push("/login"); // Điều hướng về login bằng Next.js
  };
  // Trạng thái để mở/đóng sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Hàm để chuyển trạng thái đóng/mở sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-screen bg-[#2D336B] shadow-lg z-10 p-4 overflow-y-auto flex flex-col transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"
          }`}
      >
        {/* Nút đóng/mở sidebar */}
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "←" : "→"} {/* Nút đóng/mở */}
        </button>

        <div className="flex flex-col flex-grow">
          <div className="flex items-center mb-10">
            {isSidebarOpen && (
              <span className="ml-1 text-3xl font-bold p-3 text-white ">Project Manager</span>
            )}
          </div>

          {/* Render các mục sidebar */}
          <div className="flex flex-col flex-grow space-y-1">
            {items.map((item) => (
              <SidebarItems key={item.path} item={item} isSidebarOpen={isSidebarOpen} />
            ))}
          </div>
          <div className="flex flex-col space-y-1">
            {bottomItems.map((item) =>
              item.name === "Logout" ? (
                <div
                  key={item.name}
                  className="px-6 py-3 bg-[#FFF2F2] text-black font-semibold rounded-sm shadow-lg cursor-pointer w-full
               hover:bg-black hover:text-[#FFF2F2] hover:shadow-xl transition duration-200 flex items-center justify-center space-x-2"
                  onClick={handleLogout}
                >
                  {isSidebarOpen ? item.name : "🚪"}
                </div>
              ) : (
                <SidebarItems key={item.path} item={item} isSidebarOpen={isSidebarOpen} />
              )
            )}
          </div>

        </div>
      </div>

      {/* Phần nội dung của trang */}
      <div
        className={`flex-grow ml-${isSidebarOpen ? "64" : "16"} transition-all duration-300`}
      >
        {/* Nội dung trang của bạn */}
        <div className="p-6">
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
