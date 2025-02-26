import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Category } from '@/app/models/projectCategory';
import { Notification } from '@/app/models/notification';
import { Employee } from '@/app/models/employee';

const API_BASE_URL = 'http://localhost:3000';
const API_NOTIFICATION_URL = `${API_BASE_URL}/notifications`; 
const API_CATEGORY_URL = `${API_BASE_URL}/projectcategories`; 
const API_ASSIGNPERSON_URL = `${API_BASE_URL}/employees`;

export const useCreateProject = () => {
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [assignedPerson, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, employeesRes, notificationsRes] = await Promise.all([
          axios.get(API_CATEGORY_URL),
          axios.get(API_ASSIGNPERSON_URL),
          axios.get(API_NOTIFICATION_URL)
        ]);

        setCategories(categoriesRes.data);
        setEmployees(employeesRes.data);
        setNotifications(notificationsRes.data);
      } catch (error) {
        toast.error('Failed to load data');
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

  return {
    file,
    categories,
    notifications,
    assignedPerson,
    setFile,
    onFileChange
  };
};
