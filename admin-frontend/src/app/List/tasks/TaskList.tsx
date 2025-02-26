'use client';
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import TaskItem from '../../components/Item/task/TaskItem';
import useSWR from 'swr';
import { PlusIcon } from '@heroicons/react/24/outline';
import CreateTaskItem from '../../components/Item/task/CreateTaskItem';
import { useSearchParams } from 'next/navigation';

const API_BASE_URL = 'http://localhost:3000/tasks';

interface Task {
    _id: string;
    taskName: string;
    progressName: { progressName: string };
    taskCategory: { taskCategoryName: string };
    taskStart: string;
    taskEnd: string;
    notificationSent?: { notification_name: string };
    taskAssignPerson: { employeeName: string };
    taskRecipient: { employeeName: string };
    priority: string;
    description: string;
    status: string;
}

const TaskList: React.FC = () => {
  const [showCreateTaskDialog, setShowCreateTaskDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState<'taskName' | 'taskStart'>('taskName');
  const searchParams = useSearchParams();
  const progressId = searchParams.get('progressId');


  
  const fetcher = (url: string) => axios.get<Task[]>(url).then((res) => res.data);
  const { data: tasks, error, isLoading } = useSWR(API_BASE_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    return tasks
      .filter((task) =>
        task.taskName.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'taskName') {
          return a.taskName.localeCompare(b.taskName);
        } else if (sortBy === 'taskStart') {
          return new Date(a.taskStart).getTime() - new Date(b.taskStart).getTime();
        }
        return 0;
      });
  }, [tasks, filterText, sortBy]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, page, pageSize]);

  const handleDelete = (id: string) => {
    axios.delete(`${API_BASE_URL}/${id}`).then(() => {
      window.location.reload();
    });
  };

  const handleEdit = (id: string) => {
    console.log(`Editing task: ${id}`);
  };

  const totalPages = Math.ceil(filteredTasks.length / pageSize);

  const handleOpenDialog = () => setShowCreateTaskDialog(true);
  const handleCloseDialog = () => setShowCreateTaskDialog(false);

  return (
    <div className="container">
      <div className="header-container">
        <h2 className="text-2xl font-bold">
          Danh sách nhiệm vụ {progressId ? `của tiến độ ${progressId}` : ''}
        </h2>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Tìm kiếm nhiệm vụ..."
          className="search-input"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'taskName' | 'taskStart')}>
          <option value="taskName">Sắp xếp theo tên nhiệm vụ</option>
          <option value="taskStart">Sắp xếp theo ngày bắt đầu</option>
        </select>
        <div className="pagination-controls">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>Trước</button>
          <span>{page} / {totalPages}</span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Tiếp theo</button>
        </div>
      </div>

      {isLoading && <div className="loading-state">Đang tải danh sách nhiệm vụ...</div>}
      {error && <div className="error-state">Lỗi khi tải danh sách nhiệm vụ!</div>}

      <div className="grid-wrapper">
        <div className="tasks-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedTasks.length ? (
            paginatedTasks.map((task) => (
              <TaskItem key={task._id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
            ))
          ) : (
            <div className="empty-state">Không có nhiệm vụ nào.</div>
          )}
        </div>
      </div>

      <button
        className="fab-button"
        onClick={handleOpenDialog}
        aria-label="Thêm nhiệm vụ mới"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {showCreateTaskDialog && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateTaskItem progressId={progressId ?? undefined} onClose={handleCloseDialog} />
            <button
              className="close-button mt-4 px-4 py-2 text-white rounded"
              onClick={handleCloseDialog}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
