import React from 'react';
import { FieldError } from 'react-hook-form';

interface FileUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: FieldError | undefined;  // Sử dụng FieldError hoặc undefined
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange, required, error }) => (
  <div className="form-group">
    <label className="form-label">Project Image</label>
    <input 
      type="file" 
      onChange={onChange} 
      required={required} 
      className={`form-input file-input ${error ? 'border-red-500' : ''}`} 
    />
    {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>} {/* Thêm màu cho thông báo lỗi */}
    <p className="text-xs text-gray-500 mt-2">Please upload a valid project image (max size: 5MB)</p> {/* Thêm mô tả */}
  </div>
);

export default FileUpload;
