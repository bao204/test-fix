import { useEffect, useState } from "react";

interface Report {
  _id: string;
  reportName: string;
  submission_time: string;
  status: string;
  notereport?: string;
  filerepport?: string;
  id_employee?: { _id: string; name: string };
  id_task?: { _id: string; taskName: string };
  id_progress?: { _id: string; progressName: string };
}

interface ReportDetailDialogProps {
  reportId: string;
  onClose: () => void;
}

const ReportDetailDialog: React.FC<ReportDetailDialogProps> = ({ reportId, onClose }) => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reportId) return;
    const fetchReport = async () => {
      try {
        const res = await fetch(`http://localhost:3000/reports/${reportId}`);
        const data = await res.json();
        setReport(data);
      } catch (error) {
        console.error("Lỗi khi tải báo cáo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId]);

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (!report) return <p className="text-center">Không tìm thấy báo cáo</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold">{report.reportName}</h2>
        <p><strong>Thời gian nộp:</strong> {new Date(report.submission_time).toLocaleString()}</p>
        <p><strong>Trạng thái:</strong> {report.status}</p>
        {report.notereport && <p><strong>Ghi chú:</strong> {report.notereport}</p>}
        {report.filerepport && (
          <p>
            <strong>File báo cáo:</strong>{' '}
            <a href={report.filerepport} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Xem báo cáo
            </a>
          </p>
        )}
        {report.id_employee && <p><strong>Nhân viên:</strong> {report.id_employee.name}</p>}
        {report.id_task && <p><strong>Công việc:</strong> {report.id_task.taskName}</p>}
        {report.id_progress && <p><strong>Tiến độ:</strong> {report.id_progress.progressName}</p>}

        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ReportDetailDialog;
