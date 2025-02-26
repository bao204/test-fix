// components/ProjectList.tsx
'use client';
import React from 'react';

import ProjectItem from '../../components/Item/project/ProjectItem';
import { PlusIcon } from '@heroicons/react/24/outline';
import CreateProjectItem from '../../components/Item/project/CreateProjectItem';
import { useProjectListCommand } from '../../hook/projectHanlder';

const ProjectList: React.FC = () => {
  const {
    isLoading,
    error,
    paginatedProjects,
    totalPages,
    page,
    setPage,
    filterText,
    setFilterText,
    sortBy,
    setSortBy,
    handleDelete,
    showCreateProjectDialog,
    setShowCreateProjectDialog,
  } = useProjectListCommand();

  return (
    <div className="container">
      <div className="header-container">
        <h2 className="page-title text-2xl font-bold">Danh sách dự án</h2>

        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Tìm kiếm dự án..."
          className="search-input"
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'projectName' | 'projectStart')}>
          <option value="projectName">Sắp xếp theo tên dự án</option>
          <option value="projectStart">Sắp xếp theo ngày bắt đầu</option>
        </select>

        <div className="pagination-controls">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>Trước</button>
          <span>{page} / {totalPages}</span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Tiếp theo</button>
        </div>
      </div>

      {isLoading && <div className="loading-state">Đang tải danh sách dự án...</div>}
      {error && <div className="error-state">Lỗi khi tải danh sách dự án!</div>}

      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedProjects.length ? (
          paginatedProjects.map((project) => (
            <ProjectItem key={project._id} project={project} onDelete={handleDelete} />
          ))
        ) : (
          <div className="empty-state">Không có dự án nào.</div>
        )}
      </div>

      <button className="fab-button" onClick={() => setShowCreateProjectDialog(true)} aria-label="Thêm dự án mới">
        <PlusIcon className="w-6 h-6" />
      </button>

      {showCreateProjectDialog && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateProjectItem onClose={() => setShowCreateProjectDialog(false)} />
            <button className="close-button mt-4 px-4 py-2 text-white rounded" onClick={() => setShowCreateProjectDialog(false)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
