'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../models/employee';
import { mutate } from 'swr';

const API_BASE_URL = 'http://localhost:3000';
const API_DEPARTMENT_URL = `${API_BASE_URL}/departments`;
const API_DESIGNATION_URL = `${API_BASE_URL}/designations`;
const API_EMPLOYEE_URL = `${API_BASE_URL}/employees`;

interface CreateEmployeeItemProps {
  onClose: () => void;
}

interface EmployeeData {
  employeeName: string;
  employeeProfile: FileList;
  joiningDate: string;
  account: {
    userName: string;
    password: string;
    email: string;
  };
  phone: string;
  department: string;
  designation: string;
  description?: string;
}
interface Department {
  _id: string;
  nameDepartment: string;
}

interface Designation {
  _id: string;
  designationName: string;
}

const CreateEmployeeItem: React.FC<CreateEmployeeItemProps> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployeeData>();
  const [file, setFile] = useState<File | null>(null);

const [departments, setDepartments] = useState<Department[]>([]);
const [designations, setDesignations] = useState<Designation[]>([]);
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

  const onSubmit = async (data: EmployeeData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Basic information
      formData.append('employeeName', data.employeeName.trim());
      if (file) {
        formData.append('employeeProfile', file);
      }
      formData.append('joiningDate', data.joiningDate);
      formData.append('phone', data.phone.trim());
      formData.append('description', (data.description || '').trim());
      formData.append('department_id', data.department);
      formData.append('designation_id', data.designation);

      // Account information
      formData.append('account[userName]', data.account.userName.trim());
      formData.append('account[password]', data.account.password);
      formData.append('account[email]', data.account.email.trim());

      // Debug logs
      for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.post(API_EMPLOYEE_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 201 || response.status === 200) {
        toast.success('Employee created successfully');
        reset();
        setFile(null);
        mutate(API_EMPLOYEE_URL);
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Error creating employee');
        console.error('API Error:', error.response?.data);
      } else {
        toast.error('An unexpected error occurred');
        console.error('Error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-employee-container">
      <h2 className="form-title">Create New Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="create-employee-form">
        <div className="form-grid">
          {/* Basic Information Section */}
          <div className="form-section">
            <h3 className="section-title">Basic Information</h3>
            
            <div className="form-group">
              <label className="form-label">Employee Name *</label>
              <input 
                className="form-input"
                {...register('employeeName', { required: true })} 
                placeholder="Enter employee name"
              />
              {errors.employeeName && <span className="error-message">This field is required</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Profile Image *</label>
              <input 
                type="file" 
                onChange={onFileChange} 
                required 
                className="form-input file-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Joining Date *</label>
              <input 
                type="date" 
                className="form-input"
                {...register('joiningDate', { required: true })} 
              />
              {errors.joiningDate && <span className="error-message">This field is required</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Phone *</label>
              <input 
                className="form-input"
                {...register('phone', { required: true })} 
                placeholder="Enter phone number"
              />
              {errors.phone && <span className="error-message">This field is required</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Department *</label>
              <select 
                className="form-select"
                {...register('department', { required: true })}
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept._id} value={dept._id}>
                    {dept.nameDepartment}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Designation *</label>
              <select 
                className="form-select"
                {...register('designation', { required: true })}
              >
                <option value="">Select Designation</option>
                {designations.map(desig => (
                  <option key={desig._id} value={desig._id}>
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

          {/* Account Information Section */}
          <div className="form-section">
            <h3 className="section-title">Account Information</h3>
            
            <div className="form-group">
              <label className="form-label">Username *</label>
              <input 
                className="form-input"
                {...register('account.userName', { required: true })} 
                placeholder="Enter username"
              />
              {errors.account?.userName && <span className="error-message">This field is required</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input 
                type="password" 
                className="form-input"
                {...register('account.password', { required: true })} 
                placeholder="Enter password"
              />
              {errors.account?.password && <span className="error-message">This field is required</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input 
                type="email" 
                className="form-input"
                {...register('account.email', { required: true })} 
                placeholder="Enter email"
              />
              {errors.account?.email && <span className="error-message">This field is required</span>}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeeItem;