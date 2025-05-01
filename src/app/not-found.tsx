import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">This page could not be found.</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="space-x-4">
        <Link 
          href="/"
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
        >
          Go to Homepage
        </Link>
        <Link 
          href="/courses"
          className="px-6 py-3 border border-primary-600 text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
        >
          Explore Courses
        </Link>
      </div>
    </div>
  );
} 