import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useFetchData from '../../hook/progress/createprogressItemHandle';
import useSubmitProgress from '../../hook/progress/useSubmitProgressHandle';
import { ProgressData } from '@/app/models/Progress';

export const useCreateProgressItemCommand = (projectId: string | null|undefined, onClose: () => void) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProgressData>({
    defaultValues: {
      projectid: projectId ?? undefined,  // Ensure default value is either null or string
    },
  });

  const { categories, notifications, employees, projects } = useFetchData();
  const { isSubmitting, onSubmit } = useSubmitProgress(onClose);

  useEffect(() => {
    // Check if projectId is not undefined or null before calling setValue
    if (projectId !== undefined && projectId !== null) {
      setValue('projectid', projectId);  // Set projectId if it's valid
    }
  }, [projectId, setValue]);

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.progressCategoryName,
  }));

  const employeeOptions = employees.map((employee) => ({
    value: employee._id,
    label: employee.employeeName,
  }));

  const notificationOptions = notifications.map((notification) => ({
    value: notification._id,
    label: notification.notification_name,
  }));

  const projectOptions = projects.map((project) => ({
    value: project._id,
    label: project.projectName,
  }));

  return {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    isSubmitting,
    onSubmit,
    projectOptions,
    categoryOptions,
    notificationOptions,
    employeeOptions,
    projects,
  };
};
