'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';

const API_BASE_URL = 'http://localhost:3000';
const API_NOTIFICATION_URL = `${API_BASE_URL}/notifications`;
const API_CATEGORY_URL = `${API_BASE_URL}/taskcategories`;
const API_TASK_URL = `${API_BASE_URL}/tasks`;
const API_ASSIGNPERSON_URL = `${API_BASE_URL}/employees`;
const API_PROGRESS_URL = `${API_BASE_URL}/progress`;

interface CreateTaskItemProps {
  progressId?: string | null;
  onClose: () => void;
}

interface TaskData {
  taskName: string;
  taskStart: string;
  taskEnd: string;
  priority: string;
  description: string;
  status: string;
  progressId?: string;
  taskCategory?: string;
  notificationSent?: string;
  taskAssignPerson?: string;
  taskRecipient?: string;
}

interface Category {
  _id: string;
  taskCategoryName: string;
}

interface Notification {
  _id: string;
  notification_name: string;
}

interface Employee {
  _id: string;
  employeeName: string;
}

interface Progress {
  _id: string;
  progressName: string;
}

const CreateTaskItem: React.FC<CreateTaskItemProps> = ({ progressId, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<TaskData>({
    defaultValues: {
      progressId: progressId || undefined,
    },
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [progresses, setProgresses] = useState<Progress[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, employeesRes, notificationsRes, progressesRes] = await Promise.all([
          axios.get(API_CATEGORY_URL),
          axios.get(API_ASSIGNPERSON_URL),
          axios.get(API_NOTIFICATION_URL),
          axios.get(API_PROGRESS_URL)
        ]);

        setCategories(categoriesRes.data);
        setEmployees(employeesRes.data);
        setNotifications(notificationsRes.data);
        setProgresses(progressesRes.data);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu');
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (progressId) {
      setValue('progressId', progressId);
    }
  }, [progressId, setValue]);

  const onSubmit = async (data: TaskData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(API_TASK_URL, data);

      if (response.status === 200 || response.status === 201) {
        toast.success('Nhiệm vụ đã được tạo thành công');
        reset();
        mutate(API_TASK_URL);
        onClose();
      }
    } catch (error) {
      toast.error('Lỗi khi tạo nhiệm vụ');
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.taskCategoryName,
  }));

  const employeeOptions = employees.map((employee) => ({
    value: employee._id,
    label: employee.employeeName,
  }));

  const notificationOptions = notifications.map((notification) => ({
    value: notification._id,
    label: notification.notification_name,
  }));

  const progressOptions = progresses.map((progress) => ({
    value: progress._id,
    label: progress.progressName,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Thêm Nhiệm Vụ</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField label="Tên Nhiệm Vụ" type="text" placeholder="Nhập tên nhiệm vụ" register={register('taskName', { required: 'Tên nhiệm vụ không được để trống' })} error={errors.taskName} />

        {progressId ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">Tiến độ</label>
            <p className="mt-1 text-base font-semibold text-gray-900">
              {progresses.find((p) => p._id === progressId)?.progressName || 'Không tìm thấy tiến độ'}
            </p>
          </div>
        ) : (
          <SelectField label="Tiến độ" options={progressOptions} optionLabel="label" register={register('progressId', { required: 'Vui lòng chọn tiến độ' })} error={errors.progressId} />
        )}

        <InputField    placeholder="Enter date" label="Ngày Bắt Đầu" type="date" register={register('taskStart', { required: 'Vui lòng nhập ngày bắt đầu' })} error={errors.taskStart} />
        <InputField    placeholder="Enter date" label="Ngày Kết Thúc" type="date" register={register('taskEnd', { required: 'Vui lòng nhập ngày kết thúc' })} error={errors.taskEnd} />
        <SelectField label="Loại Nhiệm Vụ" options={categoryOptions} optionLabel="label" register={register('taskCategory', { required: 'Vui lòng chọn loại nhiệm vụ' })} error={errors.taskCategory} />
        <SelectField label="taskAssignPerson" options={employeeOptions} optionLabel="label" register={register('taskAssignPerson', { required: 'Vui lòng chọn ' })} error={errors.taskAssignPerson} />
        <SelectField label="taskAssignPerson" options={employeeOptions} optionLabel="label" register={register('taskRecipient', { required: 'Vui lòng chọn ' })} error={errors.taskRecipient} />
        <SelectField label="taskAssignPerson" options={notificationOptions} optionLabel="label" register={register('notificationSent', { required: 'Vui lòng chọn ' })} error={errors.notificationSent} /> 
        <InputField label="Mức Độ Ưu Tiên"    placeholder="Enter prioritypriority" type="text" register={register('priority', { required: 'Vui lòng nhập mức độ ưu tiên' })} error={errors.priority} />
        <InputField    placeholder="Enter statusstatus" label="Trạng Thái" type="text" register={register('status', { required: 'Vui lòng nhập trạng thái' })} error={errors.status} />
        <InputField    placeholder="Enter descript"label="Mô Tả" type="text" register={register('description', { required: 'Vui lòng nhập mô tả' })} error={errors.description} />
        <div className="text-center">
          <button type="submit" className={`bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 ${isSubmitting ? 'opacity-50' : ''}`} disabled={isSubmitting}>
            {isSubmitting ? 'Đang tạo...' : 'Tạo Nhiệm Vụ'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskItem;
