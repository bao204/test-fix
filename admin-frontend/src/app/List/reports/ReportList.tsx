'use client';
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import ReportItem from '../../components/Item/report/ReportItem';
import useSWR from 'swr';
import { PlusIcon } from '@heroicons/react/24/outline';
import CreateReportItem from '../../components/Item/report/CreateReportItem';

const API_BASE_URL = 'http://localhost:3000/reports';

interface Report {
  _id: string;
  reportName: string;
  submission_time: string;
  status: string;
  id_employee?: string; 
}

const ReportList: React.FC = () => {
  const [showCreateReportDialog, setShowCreateReportDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState<'reportName' | 'submission_time'>('reportName');

  const fetcher = (url: string) => axios.get<Report[]>(url).then((res) => res.data);
  const { data: reports, error, isLoading } = useSWR(API_BASE_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const filteredReports = useMemo(() => {
    if (!reports) return [];
    return reports
      .filter((report) =>
        report.reportName.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'reportName') {
          return a.reportName.localeCompare(b.reportName);
        } else if (sortBy === 'submission_time') {
          return new Date(a.submission_time).getTime() - new Date(b.submission_time).getTime();
        }
        return 0;
      });
  }, [reports, filterText, sortBy]);

  const paginatedReports = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return filteredReports.slice(startIndex, endIndex);
  }, [filteredReports, page, pageSize]);

  const handleDelete = (id: string) => {
    axios.delete(`${API_BASE_URL}/${id}`).then(() => {
      window.location.reload();
    });
  };

  const handleEdit = (id: string) => {
    console.log(`Editing report: ${id}`);
  };

  const totalPages = Math.ceil(filteredReports.length / pageSize);

  const handleOpenDialog = () => setShowCreateReportDialog(true);
  const handleCloseDialog = () => setShowCreateReportDialog(false);

  return (
    <div className="container">
      <div className="header-container">
        <h2 className="page-title text-2xl font-bold">Danh sách báo cáo</h2>

        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Tìm kiếm báo cáo..."
          className="search-input"
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'reportName' | 'submission_time')}>
          <option value="reportName">Sắp xếp theo tên báo cáo</option>
          <option value="submission_time">Sắp xếp theo thời gian nộp</option>
        </select>

        <div className="pagination-controls">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>Trước</button>
          <span>{page} / {totalPages}</span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Tiếp theo</button>
        </div>
      </div>

      {isLoading && <div className="loading-state">Đang tải danh sách báo cáo...</div>}
      {error && <div className="error-state">Lỗi khi tải danh sách báo cáo!</div>}

      <div className="grid-wrapper">
        <div className="reports-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedReports.length ? (
            paginatedReports.map((report) => (
              <ReportItem key={report._id} report={report} onDelete={handleDelete} onEdit={handleEdit} />
            ))
          ) : (
            <div className="empty-state">Không có báo cáo nào.</div>
          )}
        </div>
      </div>

      <button
        className="fab-button"
        onClick={handleOpenDialog}
        aria-label="Thêm báo cáo mới"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {showCreateReportDialog && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateReportItem onClose={handleCloseDialog} />
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

export default ReportList;