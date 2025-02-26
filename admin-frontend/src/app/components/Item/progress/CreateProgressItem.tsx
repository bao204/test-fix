'use client';
import React from 'react';
import { useCreateProgressItemCommand } from '../../command/progress/createprogressItemCommand';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';

interface CreateProgressItemProps {
  open: boolean;
  projectId?: string | null;
  onClose: () => void;
}

const CreateProgressItem: React.FC<CreateProgressItemProps> = ({ projectId, onClose }) => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    isSubmitting,
    onSubmit,
    projectOptions,
    categoryOptions,
    notificationOptions,
    employeeOptions,
    projects,
  } = useCreateProgressItemCommand(projectId, onClose);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Thêm Tiến Độ</h2>
      <form onSubmit={handleSubmit((data) => onSubmit(data, reset))} className="space-y-6">
        <InputField
          label="Tên Tiến Độ"
          placeholder="Nhập tên tiến độ"
          type="text"
          register={register('progressName', { required: 'Tên tiến độ không được để trống' })}
          error={errors.progressName}
        />

        {projectId ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">Dự án</label>
            <p className="mt-1 text-base font-semibold text-gray-900">
              {projects.find((p) => p._id === projectId)?.projectName || 'Không tìm thấy dự án'}
            </p>
          </div>
        ) : (
          <SelectField
            label="Dự án"
            options={projectOptions}
            optionLabel="label"
            register={register('projectid', { required: 'Vui lòng chọn dự án' })}
            error={errors.projectid}
          />
        )}

        <InputField
          label="Ngày Bắt Đầu"
          type="date"
          placeholder="Enter date"
          register={register('progressStart', { required: 'Vui lòng nhập ngày bắt đầu' })}
          error={errors.progressStart}
        />

        <InputField
          label="Ngày Kết Thúc"
          type="date"
          placeholder="Enter date"
          register={register('progressEnd', { required: 'Vui lòng nhập ngày kết thúc' })}
          error={errors.progressEnd}
        />

        <SelectField
          label="Loại Tiến Độ"
          options={categoryOptions}
          optionLabel="label"
          register={register('progressCategory', { required: 'Vui lòng chọn loại tiến độ' })}
          error={errors.progressCategory}
        />

        <SelectField
          label="Thông Báo"
          options={notificationOptions}
          optionLabel="label"
          register={register('notificationSent', { required: 'Vui lòng chọn thông báo' })}
          error={errors.notificationSent}
        />

        <SelectField
          label="Người Giao Việc"
          options={employeeOptions}
          optionLabel="label"
          register={register('taskAssignPerson', { required: 'Vui lòng chọn người giao việc' })}
          error={errors.taskAssignPerson}
        />

        <SelectField
          label="Người Nhận Việc"
          options={employeeOptions}
          optionLabel="label"
          register={register('taskRecipient', { required: 'Vui lòng chọn người nhận việc' })}
          error={errors.taskRecipient}
        />

        <InputField
          label="Độ Ưu Tiên"
          placeholder="Nhập độ ưu tiên"
          type="text"
          register={register('priority', { required: 'Vui lòng nhập độ ưu tiên' })}
          error={errors.priority}
        />

        <InputField
          label="Trạng Thái"
          placeholder="Nhập trạng thái"
          type="text"
          register={register('status', { required: 'Vui lòng nhập trạng thái' })}
          error={errors.status}
        />

        <InputField
          label="Mô tả"
          placeholder="Nhập Mô tả"
          type="text"
          register={register('description', { required: 'Vui lòng nhập Mô tả' })}
          error={errors.description}
        />

        <div className="text-center">
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 ${isSubmitting ? 'opacity-50' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang tạo...' : 'Tạo Tiến Độ'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProgressItem;
