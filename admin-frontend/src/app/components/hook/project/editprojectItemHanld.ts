import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ProjectData } from '@/app/models/project';
import { fetchProjectData, updateProject } from '@/app/components/command/project/editprojectCommand';

export const useEditProjectItem = (projectId: string, onClose: () => void) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProjectData>();
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<{ _id: string; projectCategoryName: string }[]>([]);
  const [notifications, setNotifications] = useState<{ _id: string; notification_name: string }[]>([]);
  const [employees, setEmployees] = useState<{ _id: string; employeeName: string }[]>([]);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadProject = async () => {
      try {
        const { project, categories, employees, notifications } = await fetchProjectData(projectId);
        
        setProjectData(project);
        setExistingImage(project.projectImage || null);

        const formatDate = (isoString: string) => isoString?.split('T')[0];
        setValue('projectName', project.projectName);
        setValue('projectStart', formatDate(project.projectStart));
        setValue('projectEnd', formatDate(project.projectEnd));
        setValue('budget', project.budget);
        setValue('priority', project.priority);
        setValue('description', project.description || '');
        setValue('projectCategory', project.projectCategory?._id || '');
        setValue('notificationSent', project.notificationSent?._id || '');
        setValue('assignedPerson', project.assignedPerson?._id || '');

        setCategories(categories);
        setEmployees(employees);
        setNotifications(notifications);
      } catch (err) {
        toast.error('Failed to load project data');
        console.error("Fetch Data Error:", err);
      }
    };

    loadProject();
  }, [projectId, setValue]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: ProjectData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await updateProject(projectId, data, file, existingImage);
      toast.success('Project updated successfully');
      onClose();
      router.refresh();
    } catch (err) {
      toast.error('Failed to load project data');
      console.error("Fetch Data Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    file,
    onFileChange,
    categories,
    notifications,
    employees,
    projectData,
    existingImage,
    isSubmitting,
  };
};
