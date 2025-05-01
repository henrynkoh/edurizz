'use client';

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Check if a link is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-primary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              EduRizz
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <Link 
              href="/" 
              className={`${isActive('/') ? 'text-white font-medium' : 'text-primary-100'} hover:text-white transition-colors`}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className={`${isActive('/courses') ? 'text-white font-medium' : 'text-primary-100'} hover:text-white transition-colors`}
            >
              Courses
            </Link>
            <Link 
              href="/about" 
              className={`${isActive('/about') ? 'text-white font-medium' : 'text-primary-100'} hover:text-white transition-colors`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`${isActive('/contact') ? 'text-white font-medium' : 'text-primary-100'} hover:text-white transition-colors`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary-200 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md ${
                isActive('/') 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`block px-3 py-2 rounded-md ${
                isActive('/courses') 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md ${
                isActive('/about') 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 rounded-md ${
                isActive('/contact') 
                  ? 'bg-primary-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-700 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 