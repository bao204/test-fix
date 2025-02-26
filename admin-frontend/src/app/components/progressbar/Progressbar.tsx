import React from 'react';

interface ProgressBarProps {
  label: string;
  completed: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, completed, total }) => {
  const percentage = (completed / total) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-500">{`${completed}/${total}`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
