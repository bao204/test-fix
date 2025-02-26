'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';
import FileUpload from '../../input/FileUpload';

const API_BASE_URL = 'http://localhost:3000';
const API_REPORT_URL = `${API_BASE_URL}/reports`;
const API_EMPLOYEE_URL = `${API_BASE_URL}/employees`;
const API_TASK_URL = `${API_BASE_URL}/tasks`;
const API_PROGRESS_URL = `${API_BASE_URL}/progress`;

interface CreateReportItemProps {
  onClose: () => void;
}

interface ReportData {
  reportName: string;
  submission_time: string;
  status: string;
  notereport?: string;
  filerepport?: FileList;
  id_employee: string;
  id_task?: string;
  id_progress?: string;
}

interface Employee {
  _id: string;
  employeeName: string;
}

interface Task {
  _id: string;
  taskName: string;
}

interface Progress {
  _id: string;
  progressName: string;
}

const CreateReportItem: React.FC<CreateReportItemProps> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReportData>();
  const [file, setFile] = useState<File | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progresses, setProgresses] = useState<Progress[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesRes, tasksRes, progressesRes] = await Promise.all([
          axios.get(API_EMPLOYEE_URL),
          axios.get(API_TASK_URL),
          axios.get(API_PROGRESS_URL)
        ]);

        setEmployees(employeesRes.data);
        setTasks(tasksRes.data);
        setProgresses(progressesRes.data);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu');
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
      formData.append('reportName', data.reportName.trim());
      formData.append('submission_time', data.submission_time);
      formData.append('status', data.status.trim());
      formData.append('notereport', data.notereport || '');
      formData.append('id_employee', data.id_employee);
      if (data.id_task) formData.append('id_task', data.id_task);
      if (data.id_progress) formData.append('id_progress', data.id_progress);
      if (file) formData.append('filerepport', file);

      await axios.post(API_REPORT_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Báo cáo đã được tạo thành công');
      reset();
      setFile(null);
      mutate(API_REPORT_URL);
      onClose();
    } catch (error) {
      toast.error('Lỗi khi tạo báo cáo');
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Chuyển đổi dữ liệu thành SelectOption[]
  const taskOptions = tasks.map((tasks) => ({
    value: tasks._id,
    label: tasks.taskName,
  }));

  const employeeOptions = employees.map((employee) => ({
    value: employee._id,
    label: employee.employeeName,
  }));

  const progressOptions = progresses.map((progresses) => ({
    value: progresses._id,
    label: progresses.progressName,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Tạo Báo Cáo</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField   placeholder="Enter name"label="Tên Báo Cáo" type="text" register={register('reportName', { required: 'Tên báo cáo là bắt buộc' })} error={errors.reportName} />
        <InputField   placeholder="Enter date" label="Thời Gian Nộp" type="date" register={register('submission_time', { required: 'Thời gian nộp là bắt buộc' })} error={errors.submission_time} />
        <InputField   placeholder="Enter status" label="Trạng Thái" type="text" register={register('status', { required: 'Trạng thái là bắt buộc' })} error={errors.status} />
        <InputField   placeholder="Enter note" label="Ghi Chú" type="text" register={register('notereport')} error={errors.notereport} />
        <FileUpload onChange={onFileChange} error={errors.filerepport} />
        <SelectField     optionLabel="label" label="Nhân Viên" options={employeeOptions} register={register('id_employee', { required: 'ID nhân viên là bắt buộc' })} error={errors.id_employee} />
        <SelectField    optionLabel="label" label="Nhiệm Vụ" options={taskOptions} register={register('id_task')} error={errors.id_task} />
        <SelectField    optionLabel="label" label="Tiến Độ" options={progressOptions} register={register('id_progress')} error={errors.id_progress} />
        
        <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md" disabled={isSubmitting}>
          {isSubmitting ? 'Đang tạo...' : 'Tạo Báo Cáo'}
        </button>
      </form>
    </div>
  );
};

export default CreateReportItem;
