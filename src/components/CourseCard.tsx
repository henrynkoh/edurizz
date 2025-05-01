'use client';

import { FC } from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  onEnroll: () => void;
}

const CourseCard: FC<CourseCardProps> = ({
  title,
  description,
  category = 'General',
  level = 'Beginner',
  onEnroll,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
            {category}
          </span>
          <span className="inline-block bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
            {level}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <button
          onClick={onEnroll}
          className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard; 