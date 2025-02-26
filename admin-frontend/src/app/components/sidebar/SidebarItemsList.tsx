"use client";

import React, { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SubItemsMenu from "./SubItemsMenu";

interface ISidebarItem {
  name: string;
  path: string;
  items?: ISubItems[];
}

interface ISubItems {
  name: string;
  path: string;
}

interface SidebarItemsListProps {
  item: ISidebarItem;
  isSidebarOpen: boolean;
}

const SidebarItemsList = ({ item, isSidebarOpen }: SidebarItemsListProps) => {
  const { name, items, path } = item;
  const [expanded, setExpanded] = useState(false); // Trạng thái mở/đóng menu con
  const router = useRouter();
  const pathname = usePathname();

  // Hàm để xử lý khi nhấn vào mục sidebar
  const onClick = () => {
    if (items && items.length > 0) {
      setExpanded(!expanded); // Mở hoặc đóng menu con khi nhấn
    } else {
      router.push(path); // Điều hướng đến path của mục nếu không có mục con
    }
  };

  const isActive = useMemo(() => {
    if (items && items.length > 0) {
      return items.some((item) => item.path === pathname); // Kiểm tra xem có mục con nào đang được chọn
    }
    return path === pathname;
  }, [path, pathname, items]);

  return (
    <div>
      <div
        className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer hover:text-sidebar-active justify-between ${isActive ? "text-sidebar-active bg-sidebar-background" : "text-sidebar-iconColor"
          }`}
        onClick={onClick}
      >
        <p className={`text-sm text-white font-semibold hover:text-black transition-all ${!isSidebarOpen ? 'hidden' : ''}`}>
          {name}
        </p>
        {/* Nút mở/đóng menu con */}
        {items && items.length > 0 && (
          <span
            className={`transform transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
          >
            ▶
          </span>
        )}
      </div>

      {/* Hiển thị các mục con nếu có và nếu menu con đang được mở */}
      {expanded && items && items.length > 0 && (
        <div className="flex flex-col ml-5 mt-2">
          {items.map((subItem) => (
            <SubItemsMenu key={subItem.path} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItemsList;
