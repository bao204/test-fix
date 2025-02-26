'use client';
import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import ProgressBar from '../../components/progressbar/Progressbar'; // Assuming ProgressBar component exists in a subfolder
import TaskItem from '../../components/taskitem/Taskitem'; // Assuming TaskItem component exists

const TaskManagement: React.FC = () => {
  const taskProgress = [
    { name: 'UI/UX Design', completed: 2, total: 7 },
    { name: 'Website Design', completed: 1, total: 3 },
    { name: 'Quality Assurance', completed: 2, total: 7 },
    { name: 'Development', completed: 1, total: 5 },
  ];

  const recentActivity = [
    { name: 'Rechard Add New Task', timeAgo: '20Min ago' },
    { name: 'Shipa Review Completed', timeAgo: '40Min ago' },
    { name: 'Mora Task To Completed', timeAgo: '1Hr ago' },
  ];

  const allocatedMembers = [
    { name: 'Lucinda Massey', role: 'UI/UX Designer' },
    { name: 'Ryan Nolan', role: 'Website Designer' },
    { name: 'Oliver Black', role: 'App Developer' },
  ];

  const inProgressTasks = [
    { name: 'Quality Assurance', priority: 'Medium' as 'Medium' },
  ];

  const needsReviewTasks = [
    { name: 'UI/UX Design', priority: 'Medium' as 'Medium' },
  ];

  const completedTasks = [
    { name: 'UI/UX Design', priority: 'Medium' as 'Medium' },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Tasks Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center">
          <PlusIcon className="w-6 h-6 mr-2" />
          Create Task
        </button>
      </div>

      {/* First Row: Task Progress, Recent Activity, Allocated Task Members */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Task Progress */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Task Progress</h3>
          {taskProgress.map((task, index) => (
            <ProgressBar
              key={index}
              label={task.name}
              completed={task.completed}
              total={task.total}
            />
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          {recentActivity.map((activity, index) => (
            <div key={index} className="mb-2">
              <p className="font-medium">{activity.name}</p>
              <span className="text-sm text-gray-500">{activity.timeAgo}</span>
            </div>
          ))}
        </div>

        {/* Allocated Task Members */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Allocated Task Members</h3>
          {allocatedMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium">{member.name}</p>
                <span className="text-sm text-gray-500">{member.role}</span>
              </div>
              <button className="text-red-500 bg-red-100 px-2 py-1 rounded-lg">Remove</button>
            </div>
          ))}
        </div>
      </div>

      {/* Second Row: In Progress, Needs Review, Completed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* In Progress */}
        <div>
          <h3 className="text-lg font-semibold mb-4">In Progress</h3>
          {inProgressTasks.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))}
        </div>

        {/* Needs Review */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Needs Review</h3>
          {needsReviewTasks.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))}
        </div>

        {/* Completed */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Completed</h3>
          {completedTasks.map((task, index) => (
            <TaskItem key={index} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
