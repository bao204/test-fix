
'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../../app/styles/CreateEmployeeItem.css';
import { mutate } from 'swr';
import { updateEmployee } from '../../services/employeeService';
import '../../../app/styles/EditEmployeeItem.css';

import { Employee } from '@/app/models/employee';

const API_BASE_URL = 'http://localhost:3000';
const API_DEPARTMENT_URL = `${API_BASE_URL}/departments`;
const API_DESIGNATION_URL = `${API_BASE_URL}/designations`;
const CURRENT_USER = 'HMK1510';
const CURRENT_UTC_TIME = '2025-02-16 07:40:55';

interface EditEmployeeItemProps {
  employee: Employee;
  onClose: () => void;
}

interface EmployeeFormData {
  employeeName: string;
  employeeProfile?: FileList;
  joiningDate?: string;
  phone?: string;
  department?: string;
  designation?: string;
  description?: string;
}

const EditEmployeeItem: React.FC<EditEmployeeItemProps> = ({ employee, onClose }) => {
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Invalid date:', dateString);
      return '';
    }
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployeeFormData>({
    defaultValues: {
      employeeName: employee.employeeName,
      joiningDate: formatDateForInput(employee.joiningDate),
      phone: employee.phone,
      department: employee.department_id?._id,
      designation: employee.designation_id?._id,
      description: employee.description,
    }
  });

  const [file, setFile] = useState<File | null>(null);
  const [departments, setDepartments] = useState<any[]>([]);
  const [designations, setDesignations] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, desigRes] = await Promise.all([
          axios.get(API_DEPARTMENT_URL),
          axios.get(API_DESIGNATION_URL)
        ]);
        setDepartments(deptRes.data);
        setDesignations(desigRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load initial data');
      }
    };
    fetchData();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const formatDateForServer = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toISOString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };

  const onSubmit = async (data: EmployeeFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append('employeeName', data.employeeName.trim());
      if (file) {
        formData.append('employeeProfile', file);
      }

      if (data.joiningDate) {
        const formattedDate = formatDateForServer(data.joiningDate);
        if (formattedDate) {
          formData.append('joiningDate', formattedDate);
        }
      }

      if (data.phone) formData.append('phone', data.phone.trim());
      if (data.description) formData.append('description', data.description.trim());
      if (data.department) formData.append('department_id', data.department);
      if (data.designation) formData.append('designation_id', data.designation);

      formData.append('lastUpdatedBy', CURRENT_USER);
      formData.append('lastUpdatedAt', CURRENT_UTC_TIME);

      await updateEmployee(employee._id, formData);
      toast.success('Employee updated successfully');
      mutate(`${API_BASE_URL}/employees`);
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        if (Array.isArray(errorMessage)) {
          toast.error(errorMessage[0]);
        } else {
          toast.error(errorMessage || 'Error updating employee');
        }
        console.error('API Error:', error.response?.data);
      } else {
        toast.error('An unexpected error occurred');
        console.error('Error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const maxDate = new Date().toISOString().split('T')[0];

  return (
    <div className="create-employee-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="form-title">Edit Employee</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="create-employee-form">
        <div className="form-grid">
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            
            <div className="form-group">
              <label className="form-label">Employee Name *</label>
              <input 
                className="form-input"
                {...register('employeeName', { 
                  required: 'Employee name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters long'
                  }
                })} 
                placeholder="Enter employee name"
              />
              {errors.employeeName && (
                <span className="error-message">{errors.employeeName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Profile Image</label>
              <input 
                type="file" 
                onChange={onFileChange}
                className="form-input file-input"
                accept="image/*"
              />
              {employee.employeeProfile && (
                <img 
                  src={`${API_BASE_URL}${employee.employeeProfile}`}
                  alt="Current profile"
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Joining Date</label>
              <input 
                type="date" 
                className="form-input"
                {...register('joiningDate', {
                  validate: {
                    notFuture: (value) => {
                      if (!value) return true;
                      const today = new Date();
                      today.setHours(23, 59, 59, 999);
                      const selectedDate = new Date(value);
                      return selectedDate <= today || 'Joining date cannot be in the future';
                    }
                  }
                })}
                max={maxDate}
              />
              {errors.joiningDate && (
                <span className="error-message">{errors.joiningDate.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input 
                className="form-input"
                {...register('phone', {
                  pattern: {
                    value: /^[0-9+()-\s]*$/,
                    message: 'Please enter a valid phone number'
                  }
                })} 
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <div className="mb-2 text-sm text-gray-600">
                Current Department: {employee.department_id?.nameDepartment || 'Not assigned'}
              </div>
              <select 
                className="form-select"
                defaultValue={employee.department_id?._id || ""}
                {...register('department')}
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option 
                    key={dept._id} 
                    value={dept._id}
                  >
                    {dept.nameDepartment}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Designation</label>
              <div className="mb-2 text-sm text-gray-600">
                Current Designation: {employee.designation_id?.designationName || 'Not assigned'}
              </div>
              <select 
                className="form-select"
                defaultValue={employee.designation_id?._id || ""}
                {...register('designation')}
              >
                <option value="">Select Designation</option>
                {designations.map(desig => (
                  <option 
                    key={desig._id} 
                    value={desig._id}
                  >
                    {desig.designationName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                className="form-textarea"
                {...register('description')} 
                placeholder="Enter description"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeItem;