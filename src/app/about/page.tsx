'use client';

import Image from 'next/image';

export default function About() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Former education technology director with over 15 years of experience in online learning.',
      image: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    {
      name: 'David Chen',
      role: 'Chief Learning Officer',
      bio: 'Ph.D in Educational Psychology with a passion for making learning accessible to everyone.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Maria Rodriguez',
      role: 'Head of Course Development',
      bio: 'Curriculum design specialist who has developed over 200 online courses in various fields.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'James Wilson',
      role: 'Technical Director',
      bio: 'Software engineer with expertise in building scalable educational platforms and tools.',
      image: 'https://randomuser.me/api/portraits/men/55.jpg',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About EduRizz</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transforming education through personalized, practical, and accessible learning experiences.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="mb-4">
            EduRizz was founded in 2023 with a simple but powerful vision: to make high-quality, practical education accessible to everyone.
          </p>
          <p className="mb-4">
            We recognized that traditional educational approaches often fail to prepare learners for real-world challenges. Theory without practice creates knowledge gaps that leave students unprepared for their careers.
          </p>
          <p className="mb-4">
            By combining cutting-edge technology, expert instructors, and a focus on practical skills, EduRizz has created a platform where anyone can learn valuable skills that directly apply to their personal and professional growth.
          </p>
          <p>
            Today, EduRizz serves thousands of learners worldwide, offering courses in programming, data science, artificial intelligence, and many other fields – all designed with practicality and effectiveness at their core.
          </p>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-90"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-center mb-6">
              To empower individuals through practical, accessible education that prepares them for real-world success.
            </p>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-center">
              A world where quality education is accessible to everyone, regardless of their background or circumstances.
            </p>
          </div>
        </div>
      </div>

      {/* What Sets Us Apart */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">What Sets Us Apart</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-primary-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Practical Application</h3>
            <p className="text-gray-600">
              Our courses focus on real-world skills and projects, not just theory. Learn by doing, not just by watching.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-primary-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Customized Learning</h3>
            <p className="text-gray-600">
              We recognize that everyone learns differently. Our platform adapts to your pace, style, and needs.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-primary-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
            <p className="text-gray-600">
              Learn from professionals with real industry experience who know what skills matter in the field.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div>
        <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 w-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 