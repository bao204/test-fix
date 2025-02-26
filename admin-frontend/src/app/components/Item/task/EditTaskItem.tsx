'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';

const API_TASK_URL = 'http://localhost:3000/tasks';
const API_CATEGORY_URL = 'http://localhost:3000/taskcategories';
const API_NOTIFICATION_URL = 'http://localhost:3000/notifications';
const API_ASSIGNPERSON_URL = 'http://localhost:3000/employees';

interface EditTaskItemProps {
  taskId: string;
  onClose: () => void;
}

interface TaskData {
  taskName?: string;
  progressName?: string;
  taskCategory?: string;
  taskStart?: string;
  taskEnd?: string;
  notificationSent?: string;
  taskAssignPerson?: string;
  taskRecipient?: string;
  priority?: string;
  description?: string;
  status?: string;
}

const EditTaskItem: React.FC<EditTaskItemProps> = ({ taskId, onClose }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TaskData>();
  const [categories, setCategories] = useState<{ _id: string; taskCategoryName: string }[]>([]);
  const [notifications, setNotifications] = useState<{ _id: string; notification_name: string }[]>([]);
  const [employees, setEmployees] = useState<{ _id: string; employeeName: string }[]>([]);
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskRes, categoriesRes, employeesRes, notificationsRes] = await Promise.all([
          axios.get(`${API_TASK_URL}/${taskId}`),
          axios.get(API_CATEGORY_URL),
          axios.get(API_ASSIGNPERSON_URL),
          axios.get(API_NOTIFICATION_URL)
        ]);

        const task = taskRes.data;
        setTaskData(task);
        const formatDate = (isoString: string) => isoString?.split('T')[0];
        setValue('taskName', task.taskName);
        setValue('taskStart', formatDate(task.taskStart));
        setValue('taskEnd', formatDate(task.taskEnd));
        setValue('priority', task.priority || '');
        setValue('description', task.description || '');
        setValue('status', task.status || '');
        setValue('taskCategory', task.taskCategory?._id || '');
        setValue('notificationSent', task.notificationSent?._id || '');
        setValue('taskAssignPerson', task.taskAssignPerson?._id || '');
        setValue('taskRecipient', task.taskRecipient?._id || '');

        setCategories(categoriesRes.data);
        setEmployees(employeesRes.data);
        setNotifications(notificationsRes.data);
      } catch (error) {
        toast.error('Failed to load task data');
        console.error('Fetch Data Error:', error);
      }
    };

    fetchData();
  }, [taskId, setValue]);

  const onSubmit = async (data: TaskData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await axios.patch(`${API_TASK_URL}/${taskId}`, data);
      toast.success('Task updated successfully');
      onClose();
      router.refresh();
    } catch (error) {
      toast.error('Error updating task');
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!taskData) {
    return <p className="text-center text-gray-500">Loading task data...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField    placeholder="Enter namename" label="Task Name" type="text" register={register('taskName')} error={errors.taskName} />
        <InputField   placeholder="Select start date" label="Start Date" type="date" register={register('taskStart')} error={errors.taskStart} />
        <InputField  placeholder="Select start date" label="End Date" type="date" register={register('taskEnd')} error={errors.taskEnd} />
        <InputField    placeholder="Enter priority" label="Priority" type="text" register={register('priority')} error={errors.priority} />
        <InputField    placeholder="Enter desciptdescipt" label="Description" type="text" register={register('description')} error={errors.description} />
        <InputField    placeholder="Enter statusstatus" label="Status" type="text" register={register('status')} error={errors.status} />

        <SelectField  optionLabel="label" label="Task Category" options={categories.map(c => ({ value: c._id, label: c.taskCategoryName }))} register={register('taskCategory')} error={errors.taskCategory} />
        <SelectField  optionLabel="label" label="Notification Sent" options={notifications.map(n => ({ value: n._id, label: n.notification_name }))} register={register('notificationSent')} error={errors.notificationSent} />
        <SelectField   optionLabel="label"label="Assign Person" options={employees.map(e => ({ value: e._id, label: e.employeeName }))} register={register('taskAssignPerson')} error={errors.taskAssignPerson} />
        <SelectField  optionLabel="label" label="Recipient" options={employees.map(e => ({ value: e._id, label: e.employeeName }))} register={register('taskRecipient')} error={errors.taskRecipient} />

        <div className="text-center">
          <button type="submit" className={`bg-blue-500 text-white py-2 px-6 rounded-md ${isSubmitting ? 'opacity-50' : ''}`} disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskItem;