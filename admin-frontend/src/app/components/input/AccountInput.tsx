// components/AccountInput.tsx
import React from "react";

interface AccountInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
}

const AccountInput: React.FC<AccountInputProps> = ({ value, onChange, type, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="border p-2 rounded mr-2"
      placeholder={placeholder}
    />
  );
};

export default AccountInput;
