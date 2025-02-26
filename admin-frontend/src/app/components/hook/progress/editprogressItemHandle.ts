import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ProgressData } from '@/app/models/Progress';
import { ProgressCategory } from '@/app/services/progressCategoryService';
import { Employee } from '@/app/models/employee';
import { Notification } from '@/app/models/notification';
import { UseFormSetValue } from 'react-hook-form';

const API_PROGRESS_URL = 'http://localhost:3000/progress';
const API_CATEGORY_URL = 'http://localhost:3000/progresscategories';
const API_NOTIFICATION_URL = 'http://localhost:3000/notifications';
const API_ASSIGNPERSON_URL = 'http://localhost:3000/employees';

export interface SelectOption {
  value: string;
  label: string;
}

export const useProgressData = (progressId: string,setValue: UseFormSetValue<ProgressData>) => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [notifications, setNotifications] = useState<SelectOption[]>([]);
  const [employees, setEmployees] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, categoriesRes, employeesRes, notificationsRes] = await Promise.all([
          axios.get(`${API_PROGRESS_URL}/${progressId}`),
          axios.get(API_CATEGORY_URL),
          axios.get(API_ASSIGNPERSON_URL),
          axios.get(API_NOTIFICATION_URL)
        ]);

        const progress = progressRes.data;
        setProgressData(progress);

        // Format ngày
        const formatDate = (isoString: string) => isoString?.split('T')[0];

        // Đặt giá trị vào form
        setValue('progressName', progress.progressName);
        setValue('progressStart', formatDate(progress.progressStart));
        setValue('progressEnd', formatDate(progress.progressEnd));
        setValue('priority', progress.priority || '');
        setValue('description', progress.description || '');
        setValue('status', progress.status || '');
        setValue('progressCategory', progress.progressCategory?._id || '');
        setValue('notificationSent', progress.notificationSent?._id || '');
        setValue('taskAssignPerson', progress.taskAssignPerson?._id || '');
        setValue('taskRecipient', progress.taskRecipient?._id || '');

        // Chuyển đổi dữ liệu sang SelectOption[]
        setCategories(categoriesRes.data.map((c: ProgressCategory) => ({ value: c._id, label: c.progressCategoryName })));
        setEmployees(employeesRes.data.map((e: Employee) => ({ value: e._id, label: e.employeeName })));
        setNotifications(notificationsRes.data.map((n: Notification) => ({ value: n._id, label: n.notification_name })));
      } catch (error) {
        toast.error('Failed to load progress data');
        console.error('Fetch Data Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [progressId, setValue]);

  return { progressData, categories, notifications, employees, loading };
};
