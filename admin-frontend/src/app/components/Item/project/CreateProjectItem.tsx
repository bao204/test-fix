'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import InputField from '../../input/InputField'; 
import SelectField from '../../input/SelectField';  
import { ProjectData } from '@/app/models/project';
import { CreateProjectCommand } from '@/app/components/command/project/createprojectCommand';
import { useCreateProject } from '@/app/components/hook/project/createprojectItemHandle';

const API_PROJECT_URL = 'http://localhost:3000/projects';

interface CreateProjectItemProps {
  onClose: () => void;
}

const CreateProjectItem: React.FC<CreateProjectItemProps> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectData>();
  const { file, categories, notifications, assignedPerson, setFile, onFileChange } = useCreateProject();

  const onSubmit = (data: ProjectData) => {
    const command = new CreateProjectCommand(data, file, () => {
      reset();
      setFile(null);
      mutate(API_PROJECT_URL);
      toast.success('Project created successfully!');
      onClose();
    });
    command.execute();
  };

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.projectCategoryName,
  }));

  const employeeOptions = assignedPerson.map((employee) => ({
    value: employee._id,
    label: employee.employeeName,
  }));

  const notificationOptions = notifications.map((notification) => ({
    value: notification._id,
    label: notification.notification_name,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Project</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField 
            label="Project Name"
            placeholder="Enter project name"
            type="text"
            register={register('projectName', { required: 'Project name is required' })}
            error={errors.projectName}
          />
          <SelectField 
            label="Project Category"
            options={categoryOptions}
            optionLabel="label"
            register={register('projectCategory', { required: 'Category is required' })}
            error={errors.projectCategory}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="form-group">
            <label className="form-label"> Image *</label>
            <input 
              type="file" 
              onChange={onFileChange} 
              required 
              className="form-input file-input"
            />
          </div>
          <InputField
            label="Project Start Date"
            placeholder="mm/dd/yyyy"
            type="date"
            register={register('projectStart', { required: 'Start date is required' })}
            error={errors.projectStart}
          />
          <InputField
            label="Project End Date"
            placeholder="mm/dd/yyyy"
            type="date"
            register={register('projectEnd', { required: 'End date is required' })}
            error={errors.projectEnd}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectField 
            label="Notification Sent"
            options={notificationOptions}
            optionLabel="label"
            register={register('notificationSent', { required: 'Notification is required' })}
            error={errors.notificationSent}
          />
          <SelectField 
            label="Task Assign Person"
            options={employeeOptions}
            optionLabel="label"
            register={register('assignedPerson', { required: 'Employee is required' })}
            error={errors.assignedPerson}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label="Budget"
            placeholder="Enter budget"
            type="number"
            register={register('budget', { required: 'Budget is required' })}
            error={errors.budget}
          />
          <InputField
            label="Priority"
            placeholder="Highest"
            type="text"
            register={register('priority', { required: 'Priority is required' })}
            error={errors.priority}
          />
        </div>
        <div className="form-group">
          <label className="font-semibold">Description (optional)</label>
          <textarea
            {...register('description')}
            placeholder="Add any extra details about the request"
            className="form-textarea p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectItem;
