'use client';
import React from 'react';
import { useEditProjectItem } from '@/app/components/hook/project/editprojectItemHanld';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';

interface EditProjectItemProps {
  projectId: string;
  onClose: () => void;
}

const EditProjectItem: React.FC<EditProjectItemProps> = ({ projectId, onClose }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    onFileChange,
    categories,
    notifications,
    employees,
    projectData,
    existingImage,
    isSubmitting,
  } = useEditProjectItem(projectId, onClose);

  if (!projectData) {
    return <p className="text-center text-gray-500">Loading project data...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Project</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          label="Project Name"
          placeholder="Enter project name"
          type="text"
          register={register('projectName', { required: 'Project name is required' })}
          error={errors.projectName}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectField
            label="Project Category"
            options={categories.map(c => ({ value: c._id, label: c.projectCategoryName }))}
            optionLabel="label"
            register={register('projectCategory', { required: 'Category is required' })}
            error={errors.projectCategory}
          />
          <SelectField
            label="Notification Sent"
            options={notifications.map(n => ({ value: n._id, label: n.notification_name }))}
            optionLabel="label"
            register={register('notificationSent', { required: 'Notification is required' })}
            error={errors.notificationSent}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label="Start Date"
            placeholder="Select start date"
            type="date"
            register={register('projectStart', { required: 'Start date is required' })}
            error={errors.projectStart}
          />
          <InputField
            label="End Date"
            placeholder="Select end date"
            type="date"
            register={register('projectEnd', { required: 'End date is required' })}
            error={errors.projectEnd}
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
            placeholder="Enter priority level"
            type="text"
            register={register('priority', { required: 'Priority is required' })}
            error={errors.priority}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Project Image</label>
          {existingImage && (
            <img src={`http://localhost:3000${existingImage}`} alt="Project" className="w-40 h-40 object-cover mb-2" />
          )}
          <input type="file" onChange={onFileChange} className="form-input file-input" />
        </div>

        <SelectField
          label="Assigned Person"
          options={employees.map(e => ({ value: e._id, label: e.employeeName }))}
          optionLabel="label"
          register={register('assignedPerson', { required: 'Employee is required' })}
          error={errors.assignedPerson}
        />

        <InputField
          label="Description"
          placeholder="Enter project description"
          type="text"
          register={register('description')}
          error={errors.description}
        />

        <div className="text-center">
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-6 rounded-md ${isSubmitting ? 'opacity-50' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectItem;
