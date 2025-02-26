import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ProgressCategory } from '@/app/models/progressCategory';
import { Notification } from '@/app/models/notification';
import { Employee } from '@/app/models/employee';
import { Project } from '@/app/models/project';

const API_CATEGORY_URL = 'http://localhost:3000/progresscategories';
const API_NOTIFICATION_URL = 'http://localhost:3000/notifications';
const API_ASSIGNPERSON_URL = 'http://localhost:3000/employees';
const API_PROJECT_URL = 'http://localhost:3000/projects';

const useFetchData = () => {
    const [categories, setCategories] = useState<ProgressCategory[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, employeesRes, notificationsRes, projectsRes] = await Promise.all([
          axios.get(API_CATEGORY_URL),
          axios.get(API_ASSIGNPERSON_URL),
          axios.get(API_NOTIFICATION_URL),
          axios.get(API_PROJECT_URL),
        ]);
        
        setCategories(categoriesRes.data);
        setEmployees(employeesRes.data);
        setNotifications(notificationsRes.data);
        setProjects(projectsRes.data);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, notifications, employees, projects, isLoading };
};

export default useFetchData;
