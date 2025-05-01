'use client';

import { useState, useEffect } from 'react';
import CourseCard from '@/components/CourseCard';
import CourseForm from '@/components/CourseForm';
import { fetchCourses, Course } from '@/lib/api';

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleEnroll = async (courseId: number) => {
    // This would typically integrate with n8n to trigger a workflow
    // For now, we'll just show an alert
    alert(`Successfully enrolled in course #${courseId}!`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">EduRizz Courses</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
        >
          {showForm ? 'Hide Form' : 'Add Course'}
        </button>
      </div>

      {showForm && (
        <CourseForm
          onCourseCreated={() => {
            loadCourses();
            setShowForm(false);
          }}
        />
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-lg">Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium mb-2">No courses available</h2>
          <p className="text-gray-600">Click the "Add Course" button to create your first course.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              category={course.category}
              level={course.level}
              onEnroll={() => handleEnroll(course.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
} 