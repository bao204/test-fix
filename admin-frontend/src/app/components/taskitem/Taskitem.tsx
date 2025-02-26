import React from 'react';

interface TaskItemProps {
  task: {
    name: string;
    priority: 'Low' | 'Medium' | 'High';
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const getPriorityColor = (priority: 'Low' | 'Medium' | 'High') => {
    switch (priority) {
      case 'Low':
        return 'bg-green-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'High':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4">
      <h4 className="font-medium text-lg">{task.name}</h4>
      <div className="flex items-center mt-2">
        <span className={`text-white px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
