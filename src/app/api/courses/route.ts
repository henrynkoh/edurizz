import { NextResponse } from 'next/server';
import type { Course } from '@/lib/api';

// Mock database for demo purposes
let courses: Course[] = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of HTML, CSS, and JavaScript.',
    category: 'Programming',
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    description: 'Master the basics of data analysis and visualization.',
    category: 'Data Science',
    level: 'Beginner',
  },
  {
    id: 3,
    title: 'Advanced Machine Learning',
    description: 'Dive deep into neural networks and advanced ML algorithms.',
    category: 'AI',
    level: 'Advanced',
  },
];

export async function GET() {
  return NextResponse.json(courses);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCourse: Course = {
      id: courses.length > 0 ? Math.max(...courses.map(course => course.id)) + 1 : 1,
      title: body.title,
      description: body.description,
      category: body.category || 'General',
      level: body.level || 'Beginner',
    };
    
    courses.push(newCourse);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    const body = await request.json();
    
    const courseIndex = courses.findIndex(course => course.id === id);
    if (courseIndex === -1) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    
    courses[courseIndex] = { ...courses[courseIndex], ...body };
    return NextResponse.json(courses[courseIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  
  const courseIndex = courses.findIndex(course => course.id === id);
  if (courseIndex === -1) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }
  
  courses = courses.filter(course => course.id !== id);
  return NextResponse.json({ success: true });
} 