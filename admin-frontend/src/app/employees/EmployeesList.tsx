'use client';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import EmployeeItem from '../components/employee/EmployeeItem';
import CreateEmployeeItem from '../components/employee/CreateEmployeeItem'
import useSWR from 'swr';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Thêm MagnifyingGlassIcon
import debounce from 'lodash/debounce'; // Thêm debounce từ lodash
import '../../app/styles/EmployeeList.css';
import { gsap } from "gsap";


const API_BASE_URL = 'http://localhost:3000/employees';

interface Employee {
  _id: string;
  employeeName: string;
  employeeProfile?: string;
  designation?: { designationName: string };
  account: { userName: string; email: string };
  description?: string;
}

const EmployeeList: React.FC = () => {
  const [showCreateEmployeeDialog, setShowCreateEmployeeDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetcher = (url: string) => axios.get<Employee[]>(url).then((res) => res.data);

  const { data: employees, error, isLoading } = useSWR(API_BASE_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Debounce search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Filter employees based on search term
  const filteredEmployees = useMemo(() => {
    if (!employees) return [];
    if (!searchTerm) return employees;

    const searchTermLower = searchTerm.toLowerCase();
    return employees.filter((employee) =>
      employee.employeeName.toLowerCase().includes(searchTermLower)
    );
  }, [employees, searchTerm]);

  const handleOpenDialog = () => setShowCreateEmployeeDialog(true);
  const handleCloseDialog = () => setShowCreateEmployeeDialog(false);

  useEffect(() => {

    gsap.to("#addBtn", { opacity: 1, y: -50, delay: 1, backgroundColor: '#2D336B' });
  }, []);



  return (
    <>
      <div className="flex flex-col justify-end">
        <div className="flex justify-between items-center w-full h-full p-8 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
          <h2 className="page-title text-4xl font-bold mb-6" id="title">Danh sách nhân viên</h2>

          <div className="search-container">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
              className="search-input"
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {isLoading && (
          <div className="loading-state">
            Đang tải danh sách nhân viên...
          </div>
        )}

        {error && (
          <div className="error-state">
            Lỗi khi tải danh sách nhân viên!
          </div>
        )}

        <div className="bg-[#f0f0f0] p-8 rounded-xl">
          <div className="grid-wrapper gap-10">
            <div className="employees-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4" id="employee-card">
              {filteredEmployees.length ? (
                filteredEmployees.map((employee) => (
                  <EmployeeItem
                    key={employee._id || Math.random()}
                    employee={employee}
                  />
                ))
              ) : (
                <div className="empty-state">
                  {searchTerm ? 'Không tìm thấy nhân viên nào.' : 'Không có nhân viên nào.'}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* FAB Button - Đặt bên ngoài container */}
      <button
        className="fab-button opacity-0"
        onClick={handleOpenDialog}
        aria-label="Thêm nhân viên mới"
        id="addBtn"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {/* Modal */}
      {showCreateEmployeeDialog && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateEmployeeItem onClose={handleCloseDialog} />
            <button
              className="close-button mt-4 px-4 py-2 text-white rounded"
              onClick={handleCloseDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeList;

