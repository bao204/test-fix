'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';

const API_REPORT_URL = 'http://localhost:3000/reports';
const API_EMPLOYEE_URL = 'http://localhost:3000/employees';
const API_TASK_URL = 'http://localhost:3000/tasks';
const API_PROGRESS_URL = 'http://localhost:3000/progress';

interface EditReportItemProps {
  reportId: string;
  onClose: () => void;
}

interface ReportData {
  reportName?: string;
  submission_time?: string;
  status?: string;
  notereport?: string;
  filerepport?: File | null;
  id_employee?: string;
  id_task?: string;
  id_progress?: string;
}

const EditReportItem: React.FC<EditReportItemProps> = ({ reportId, onClose }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ReportData>();
  const [file, setFile] = useState<File | null>(null);
  const [employees, setEmployees] = useState<{ _id: string; employeeName: string }[]>([]);
  const [tasks, setTasks] = useState<{ _id: string; taskName: string }[]>([]);
  const [progresses, setProgresses] = useState<{ _id: string; progressName: string }[]>([]);
  const [existingFile, setExistingFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportRes, employeesRes, tasksRes, progressesRes] = await Promise.all([
          axios.get(`${API_REPORT_URL}/${reportId}`),
          axios.get(API_EMPLOYEE_URL),
          axios.get(API_TASK_URL),
          axios.get(API_PROGRESS_URL)
        ]);

        const report = reportRes.data;
        setExistingFile(report.filerepport || null);
        setValue('reportName', report.reportName);
        setValue('submission_time', report.submission_time);
        setValue('status', report.status);
        setValue('notereport', report.notereport);
        setValue('id_employee', report.id_employee?._id || '');
        setValue('id_task', report.id_task?._id || '');
        setValue('id_progress', report.id_progress?._id || '');

        setEmployees(employeesRes.data);
        setTasks(tasksRes.data);
        setProgresses(progressesRes.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Failed to load report data');
      }
    };

    fetchData();
  }, [reportId, setValue]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: ReportData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('reportName', data.reportName?.trim() || '');
      formData.append('submission_time', data.submission_time || '');
      formData.append('status', data.status?.trim() || '');
      formData.append('notereport', data.notereport?.trim() || '');
      formData.append('id_employee', data.id_employee || '');


      if (data.id_task && data.id_task !== '') {
        formData.append('id_task', data.id_task);
      }
      if (data.id_progress && data.id_progress !== '') {
        formData.append('id_progress', data.id_progress);
      }

      if (file) {
        formData.append('filerepport', file);
      } else if (existingFile) {
        formData.append('filerepport', existingFile);
      }

      await axios.patch(`${API_REPORT_URL}/${reportId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Report updated successfully');
      onClose();
      router.refresh();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Error updating report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Report</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField label="Report Name" placeholder="Enter report name" type="text" register={register('reportName')} error={errors.reportName} />
        <InputField label="Submission Time" placeholder="Select date" type="date" register={register('submission_time')} error={errors.submission_time} />
        <InputField label="Status" placeholder="Enter status" type="text" register={register('status')} error={errors.status} />
        <InputField label="Note Report" placeholder="Enter note" type="text" register={register('notereport')} error={errors.notereport} />
        <div className="form-group">
          <label className="form-label">Report File</label>
          {existingFile && <a href={`http://localhost:3000${existingFile}`} target="_blank" className="text-blue-500">View existing file</a>}
          <input type="file" onChange={onFileChange} className="form-input file-input" />
        </div>
        <SelectField optionLabel="label" label="Employee" options={employees.map(e => ({ value: e._id, label: e.employeeName }))} register={register('id_employee')} error={errors.id_employee} />
        <SelectField optionLabel="label" label="Task" options={tasks.map(t => ({ value: t._id, label: t.taskName }))} register={register('id_task')} error={errors.id_task} />
        <SelectField optionLabel="label" label="Progress" options={progresses.map(p => ({ value: p._id, label: p.progressName }))} register={register('id_progress')} error={errors.id_progress} />
        <div className="text-center">
          <button type="submit" className={`bg-blue-500 text-white py-2 px-6 rounded-md ${isSubmitting ? 'opacity-50' : ''}`} disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReportItem;