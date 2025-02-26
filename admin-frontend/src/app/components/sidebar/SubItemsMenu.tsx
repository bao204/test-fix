"use client"

import React, { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation';

interface ISubItems {
  name: string;
  path: string;
}

const SubItemsMenu = ({ item }: { item: ISubItems }) => {
  const { name, path } = item;
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(path);  // Điều hướng đến mục con khi nhấn
  };

  const isActive = useMemo(() => path === pathname, [path, pathname]);

  return (
    <div
      className={`text-sm cursor-pointer ${isActive ? "text-sidebar-active font-semibold" : "hover:text-sidebar-active"}`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default SubItemsMenu;
