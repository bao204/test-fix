// commands/CreateProjectCommand.ts
import axios from 'axios';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { ProjectData } from '@/app/models/project';

const API_PROJECT_URL = 'http://localhost:3000/projects';

export class CreateProjectCommand {
  private data: ProjectData;
  private file: File | null;
  private onSuccess: () => void;

  constructor(data: ProjectData, file: File | null, onSuccess: () => void) {
    this.data = data;
    this.file = file;
    this.onSuccess = onSuccess;
  }

  async execute() {
    try {
      const formData = new FormData();
      formData.append('projectName', this.data.projectName.trim());

      if (this.file) {
        formData.append('projectImage', this.file);
      } else {
        formData.append('projectImage', '');
      }

      formData.append('projectStart', this.data.projectStart);
      formData.append('projectEnd', this.data.projectEnd);
      formData.append('budget', this.data.budget.toString());
      formData.append('priority', this.data.priority.trim());
      formData.append('description', (this.data.description || '').trim());
      formData.append('projectCategory', this.data.projectCategory || '');
      formData.append('notificationSent', this.data.notificationSent || '');
      formData.append('assignedPerson', this.data.assignedPerson || '');

      const response = await axios.post(API_PROJECT_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Project created successfully');
        mutate(API_PROJECT_URL);
        this.onSuccess();
      }
    } catch (error) {
      toast.error('Error creating project');
      console.error('API Error:', error);
    }
  }
}
