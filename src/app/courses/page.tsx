'use client';

import { useState, useEffect } from 'react';
import { fetchCourses, Course } from '@/lib/api';
import CourseCard from '@/components/CourseCard';

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    level: '',
  });

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCourses();
        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = courses;

    // Apply search term
    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(
        (course) => course.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Apply level filter
    if (filters.level) {
      result = result.filter(
        (course) => course.level === filters.level
      );
    }

    setFilteredCourses(result);
  }, [searchTerm, filters, courses]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEnroll = async (courseId: number) => {
    alert(`Successfully enrolled in course #${courseId}!`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      level: '',
    });
  };

  // Extract all unique categories from courses
  const categories = Array.from(
    new Set(courses.map((course) => course.category).filter(Boolean))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Explore Our Courses</h1>
        <p className="text-gray-600 max-w-3xl">
          Browse our extensive library of practical, skill-focused courses designed to help you achieve your personal and professional goals. Each course is crafted by industry experts and focuses on real-world application.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium mb-1">
              Search Courses
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Search by title or description"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="level" className="block text-sm font-medium mb-1">
              Level
            </label>
            <select
              id="level"
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-primary-600 hover:text-primary-800"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Courses Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-lg">Loading courses...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium mb-2">No courses found</h2>
          <p className="text-gray-600">Try adjusting your search or filters.</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md"
          >
            Show All Courses
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-6 text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
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
        </div>
      )}
    </div>
  );
} 