// editProjectCommand.ts
import axios from 'axios';
import { ProjectData } from '@/app/models/project';

const API_PROJECT_URL = 'http://localhost:3000/projects';
const API_CATEGORY_URL = 'http://localhost:3000/projectcategories';
const API_NOTIFICATION_URL = 'http://localhost:3000/notifications';
const API_ASSIGNPERSON_URL = 'http://localhost:3000/employees';

export const fetchProjectData = async (projectId: string) => {
  const [projectRes, categoriesRes, employeesRes, notificationsRes] = await Promise.all([
    axios.get(`${API_PROJECT_URL}/${projectId}`),
    axios.get(API_CATEGORY_URL),
    axios.get(API_ASSIGNPERSON_URL),
    axios.get(API_NOTIFICATION_URL)
  ]);

  return {
    project: projectRes.data,
    categories: categoriesRes.data,
    employees: employeesRes.data,
    notifications: notificationsRes.data,
  };
};

export const updateProject = async (projectId: string, data: ProjectData, file: File | null, existingImage: string | null) => {
  const formData = new FormData();
  formData.append('projectName', data.projectName.trim());
  formData.append('projectStart', data.projectStart);
  formData.append('projectEnd', data.projectEnd);
  formData.append('budget', data.budget.toString());
  formData.append('priority', data.priority.trim());
  formData.append('description', data.description?.trim() || '');
  formData.append('projectCategory', data.projectCategory);
  formData.append('notificationSent', data.notificationSent);
  formData.append('assignedPerson', data.assignedPerson || '');

  if (file) {
    formData.append('projectImage', file);
  } else if (existingImage) {
    formData.append('projectImage', existingImage);
  }

  await axios.patch(`${API_PROJECT_URL}/${projectId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
