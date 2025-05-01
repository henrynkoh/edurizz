import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

export interface Course {
  id: number;
  title: string;
  description: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const fetchCourses = async (): Promise<Course[]> => {
  const { data } = await api.get('/api/courses');
  return data;
};

// Placeholder for n8n integration
export const triggerN8nWorkflow = async (workflowId: string, data: any) => {
  // Replace with actual n8n API endpoint
  const response = await axios.post(`https://n8n.example.com/webhook/${workflowId}`, data);
  return response.data;
};

// MCP integration for course management
export const createCourse = async (courseData: Omit<Course, 'id'>): Promise<Course> => {
  const { data } = await api.post('/api/courses', courseData);
  return data;
};

export const updateCourse = async (id: number, courseData: Partial<Course>): Promise<Course> => {
  const { data } = await api.put(`/api/courses/${id}`, courseData);
  return data;
};

export const deleteCourse = async (id: number): Promise<void> => {
  await api.delete(`/api/courses/${id}`);
};

export default api; 