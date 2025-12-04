'use client';

import { useState, useEffect, useCallback } from 'react';

interface NVQCourse {
  _id: string;
  subject: string;
  driveLink: string;
  category: string;
}

export default function NVQPage() {
  const [nvqCourses, setNvqCourses] = useState<NVQCourse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const fetchNVQ = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/api/nvq';
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedSubject !== 'all') params.append('subject', selectedSubject);
      if (params.toString()) url += '?' + params.toString();

      const response = await fetch(url);
      const data = await response.json();
      setNvqCourses(data.nvqCourses || []);
    } catch (error) {
      console.error('Error fetching NVQ courses:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedSubject]);

  useEffect(() => {
    fetchNVQ();
  }, [fetchNVQ]);

  const categories = Array.from(new Set(nvqCourses.map((c) => c.category)));
  const subjects = Array.from(new Set(nvqCourses.map((c) => c.subject)));

  const coursesByCategory = nvqCourses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, NVQCourse[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          NVQ Courses
        </h1>

        <div className="mb-6 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubject('all');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Subject:
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : nvqCourses.length === 0 ? (
          <p className="text-gray-600 bg-white p-6 rounded-lg shadow text-center">
            No NVQ courses available.
          </p>
        ) : selectedCategory === 'all' ? (
          <div className="space-y-8">
            {Object.entries(coursesByCategory).map(([category, courses]) => (
              <section key={category} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">{category}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {course.subject}
                      </h3>
                      <a
                        href={course.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition inline-block"
                      >
                        View Course
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {nvqCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {course.subject}
                </h3>
                <a
                  href={course.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition inline-block"
                >
                  View Course
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


