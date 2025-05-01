# EduRizz Tutorial: Adding Course Progress Tracking

This tutorial walks through adding a progress tracking feature to the EduRizz platform, allowing students to track their advancement through courses.

## Prerequisites
- EduRizz project set up (see README.md)
- Basic knowledge of Next.js and TypeScript
- Understanding of React state management

## Step 1: Update the Course Model

First, we need to update our Course model to include lessons and progress tracking.

Edit `src/lib/api.ts`:

```typescript
// Add these interfaces
export interface Lesson {
  id: number;
  title: string;
  content: string;
  order: number;
}

export interface CourseProgress {
  userId: string;
  courseId: number;
  completedLessons: number[];
  lastAccessed: string; // ISO date string
}

// Update the Course interface
export interface Course {
  id: number;
  title: string;
  description: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons?: Lesson[]; // Add this line
}

// Add these functions
export const fetchCourseProgress = async (userId: string, courseId: number): Promise<CourseProgress> => {
  const { data } = await api.get(`/api/progress?userId=${userId}&courseId=${courseId}`);
  return data;
};

export const updateCourseProgress = async (progress: CourseProgress): Promise<CourseProgress> => {
  const { data } = await api.post('/api/progress', progress);
  return data;
};

export const markLessonComplete = async (userId: string, courseId: number, lessonId: number): Promise<CourseProgress> => {
  const { data } = await api.put('/api/progress/complete', { userId, courseId, lessonId });
  return data;
};
```

## Step 2: Create Progress API Routes

Create a new file `src/app/api/progress/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { CourseProgress } from '@/lib/api';

// Mock database for progress
let progressRecords: CourseProgress[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const courseId = Number(searchParams.get('courseId'));
  
  if (!userId || !courseId) {
    return NextResponse.json({ error: 'Missing userId or courseId' }, { status: 400 });
  }
  
  const progress = progressRecords.find(
    p => p.userId === userId && p.courseId === courseId
  );
  
  if (!progress) {
    // Return a new empty progress record
    return NextResponse.json({
      userId,
      courseId,
      completedLessons: [],
      lastAccessed: new Date().toISOString()
    });
  }
  
  return NextResponse.json(progress);
}

export async function POST(request: Request) {
  try {
    const body: CourseProgress = await request.json();
    
    if (!body.userId || !body.courseId) {
      return NextResponse.json({ error: 'Missing userId or courseId' }, { status: 400 });
    }
    
    const index = progressRecords.findIndex(
      p => p.userId === body.userId && p.courseId === body.courseId
    );
    
    if (index === -1) {
      // New record
      progressRecords.push({
        ...body,
        lastAccessed: new Date().toISOString()
      });
      return NextResponse.json(progressRecords[progressRecords.length - 1]);
    } else {
      // Update existing record
      progressRecords[index] = {
        ...body,
        lastAccessed: new Date().toISOString()
      };
      return NextResponse.json(progressRecords[index]);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
```

Create `src/app/api/progress/complete/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { CourseProgress } from '@/lib/api';

// Use the same mock database from the main progress route
// In a real app, you'd use a shared database or import it
let progressRecords: CourseProgress[] = [];

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, courseId, lessonId } = body;
    
    if (!userId || !courseId || !lessonId) {
      return NextResponse.json(
        { error: 'Missing userId, courseId, or lessonId' }, 
        { status: 400 }
      );
    }
    
    let index = progressRecords.findIndex(
      p => p.userId === userId && p.courseId === courseId
    );
    
    if (index === -1) {
      // Create new record
      progressRecords.push({
        userId,
        courseId,
        completedLessons: [lessonId],
        lastAccessed: new Date().toISOString()
      });
      return NextResponse.json(progressRecords[progressRecords.length - 1]);
    } else {
      // Update existing record
      if (!progressRecords[index].completedLessons.includes(lessonId)) {
        progressRecords[index].completedLessons.push(lessonId);
      }
      progressRecords[index].lastAccessed = new Date().toISOString();
      return NextResponse.json(progressRecords[index]);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
```

## Step 3: Create Progress Display Component

Create a new file `src/components/CourseProgress.tsx`:

```tsx
import { FC, useEffect, useState } from 'react';
import { CourseProgress as ProgressType, fetchCourseProgress, markLessonComplete } from '@/lib/api';

interface Props {
  userId: string;
  courseId: number;
  totalLessons: number;
}

const CourseProgress: FC<Props> = ({ userId, courseId, totalLessons }) => {
  const [progress, setProgress] = useState<ProgressType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true);
        const data = await fetchCourseProgress(userId, courseId);
        setProgress(data);
      } catch (err) {
        setError('Failed to load progress');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [userId, courseId]);

  const handleMarkComplete = async (lessonId: number) => {
    try {
      const updated = await markLessonComplete(userId, courseId, lessonId);
      setProgress(updated);
    } catch (err) {
      setError('Failed to update progress');
      console.error(err);
    }
  };

  if (loading) return <div>Loading progress...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!progress) return <div>No progress data available</div>;

  const percentComplete = totalLessons > 0
    ? Math.round((progress.completedLessons.length / totalLessons) * 100)
    : 0;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Your Progress</h3>
      
      <div className="bg-gray-200 rounded-full h-4 mb-2">
        <div
          className="bg-primary-600 h-4 rounded-full"
          style={{ width: `${percentComplete}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-600">
        {progress.completedLessons.length} of {totalLessons} lessons completed ({percentComplete}%)
      </p>
      
      <p className="text-xs text-gray-500 mt-1">
        Last accessed: {new Date(progress.lastAccessed).toLocaleString()}
      </p>
    </div>
  );
};

export default CourseProgress;
```

## Step 4: Update Course Card to Show Progress

Update `src/components/CourseCard.tsx` to include the progress component:

```tsx
import { FC } from 'react';
import CourseProgress from './CourseProgress';

interface CourseCardProps {
  id: number; // Add this line
  title: string;
  description: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  totalLessons?: number; // Add this line
  userId?: string; // Add this line
  onEnroll: () => void;
}

const CourseCard: FC<CourseCardProps> = ({
  id, // Add this
  title,
  description,
  category = 'General',
  level = 'Beginner',
  totalLessons = 0, // Add this
  userId, // Add this
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
        
        {/* Add progress component if user is logged in */}
        {userId && (
          <CourseProgress
            userId={userId}
            courseId={id}
            totalLessons={totalLessons}
          />
        )}
        
        <button
          onClick={onEnroll}
          className="w-full py-2 mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
```

## Step 5: Update the Home Page

Update `src/app/page.tsx` to include the new props for the CourseCard:

```tsx
// Inside the grid where courses are mapped
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {courses.map((course) => (
    <CourseCard
      key={course.id}
      id={course.id} // Add this
      title={course.title}
      description={course.description}
      category={course.category}
      level={course.level}
      totalLessons={course.lessons?.length || 0} // Add this
      userId="user-123" // Add this (hardcoded for demo)
      onEnroll={() => handleEnroll(course.id)}
    />
  ))}
</div>
```

## Step 6: Testing the Feature

1. Start the development server: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000) in your browser
3. You should see progress bars on each course card
4. The progress starts at 0%
5. In a real implementation, you would connect this with the lesson completion functionality

## Next Steps

To fully implement this feature:

1. Add authentication to get real user IDs instead of the hardcoded value
2. Create a lessons page showing each lesson with a "Mark Complete" button
3. Add a database to permanently store progress (instead of the in-memory array)
4. Create reporting features to show analytics on course progress 