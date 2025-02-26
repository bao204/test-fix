// components/InputField.tsx
import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  placeholder: string;
  type: string;
  register: UseFormRegisterReturn<string>;
  error?: FieldError | undefined; // Lỗi validation
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type, register, error }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <input className="form-input" type={type} placeholder={placeholder} {...register} />
    {error && <span className="error-message">{error.message}</span>}
  </div>
);

export default InputField;
