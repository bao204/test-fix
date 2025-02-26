import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

// Định nghĩa kiểu SelectOption rõ ràng
interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  options: SelectOption[];  // Thay any[] bằng SelectOption[]
  optionLabel: string;
  register: UseFormRegisterReturn<string>;  // Cập nhật register với kiểu đúng từ react-hook-form
  error?: FieldError | undefined;  // Cập nhật error với FieldError thay vì any
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  optionLabel,
  register,
  error,
}) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <select className="form-select" {...register}>
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option[optionLabel as keyof SelectOption]}  {/* Truy cập thuộc tính động */}
        </option>
      ))}
    </select>
    {error && <span className="error-message">{error.message}</span>}
  </div>
);

export default SelectField;
