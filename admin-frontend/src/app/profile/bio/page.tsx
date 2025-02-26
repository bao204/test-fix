"use client";
import React from 'react';
import Image from 'next/image';
import { getEmployeeProfile } from '../../services/employeeService';
import { Employee } from '../../models/employee';
import '../../styles/BioPage.css';

const ProfilePage: React.FC = () => {
  const [employee, setEmployee] = React.useState<Employee | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getEmployeeProfile();
        setEmployee(profile);
      } catch (err) {
        setError('Lỗi khi lấy thông tin profile');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <span role="img" aria-label="warning" className="error-icon">⚠️</span>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
            aria-label="Thử lại"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="loading-container" role="alert" aria-busy="true">
        <div className="loading-spinner" />
        <p className="loading-text">
          Đang tải thông tin
          <span className="loading-dots">...</span>
        </p>
      </div>
    );
  }

  const InfoCard = ({ icon, label, value }: { icon: string; label: string; value: string | number }) => (
    <div className="info-card">
      <span className="info-icon" role="img" aria-hidden="true">{icon}</span>
      <div className="info-content">
        <p className="info-label">{label}</p>
        <p className="info-value">{value}</p>
      </div>
    </div>
  );

  return (
    <main className="profile-container">
      <header className="profile-header">
        <h1>Thông tin nhân viên</h1>
      </header>
      
      <div className="profile-content">
        <section className="profile-avatar-section">
          <div className="avatar-container">
            {employee.employeeProfile ? (
              <Image
                src={employee.employeeProfile}
                alt={`Ảnh của ${employee.employeeName}`}
                fill
                className="avatar-image"
                sizes="(max-width: 768px) 100vw, 300px"
                priority
              />
            ) : (
              <div className="avatar-placeholder">
                {employee.employeeName.charAt(0)}
              </div>
            )}
            <div className="avatar-status online" aria-label="Trạng thái: online" />
          </div>
          
          <div className="employee-title">
            <h2>{employee.employeeName}</h2>
            <p className="email">{employee.account.email}</p>
          </div>
        </section>

        <section className="profile-info-section">
          <div className="info-grid">
            <InfoCard 
              icon="👤" 
              label="Tên tài khoản" 
              value={employee.account.userName} 
            />
            
            {employee.phone && (
              <InfoCard 
                icon="📱" 
                label="Số điện thoại" 
                value={employee.phone} 
              />
            )}
            
            {employee.joiningDate && (
              <InfoCard 
                icon="📅" 
                label="Ngày gia nhập" 
                value={new Date(employee.joiningDate).toLocaleDateString('vi-VN')} 
              />
            )}
            
            {employee.department_id && (
              <InfoCard 
                icon="🏢" 
                label="Phòng ban" 
                value={employee.department_id.nameDepartment} 
              />
            )}
            
            {employee.designation_id && (
              <InfoCard 
                icon="💼" 
                label="Chức vụ" 
                value={employee.designation_id.designationName} 
              />
            )}
          </div>

          {employee.description && (
            <div className="description-section">
              <h3>
                <span aria-hidden="true">📝</span>
                Mô tả
              </h3>
              <p className="description-content">{employee.description}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;