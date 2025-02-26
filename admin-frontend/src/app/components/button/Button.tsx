import React from "react"; 

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "danger";
  icon?: React.ReactNode; 
  disabled?: boolean; // Thêm thuộc tính disabled
}

export function Button({ label, onClick, variant = "primary", icon, disabled }: ButtonProps) {
  const baseStyle = "px-4 py-2 text-white rounded-lg transition flex items-center gap-2";
  const styles = {
    primary: "bg-blue-500 hover:bg-blue-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${styles[variant]}`} 
      disabled={disabled} // Thêm thuộc tính disabled vào button
    >
      {icon} {label}
    </button>
  );
}
