'use client';

import { useState, useEffect } from 'react';

interface BComCourse {
  _id: string;
  subject: string;
  driveLink: string;
  year: string;
}

export default function BComPage() {
  const [bcomCourses, setBcomCourses] = useState<BComCourse[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBCom();
  }, [selectedYear, selectedSubject]);

  const fetchBCom = async () => {
    setLoading(true);
    try {
      let url = '/api/bcom';
      const params = new URLSearchParams();
      if (selectedYear !== 'all') params.append('year', selectedYear);
      if (selectedSubject !== 'all') params.append('subject', selectedSubject);
      if (params.toString()) url += '?' + params.toString();

      const response = await fetch(url);
      const data = await response.json();
      setBcomCourses(data.bcomCourses || []);
    } catch (error) {
      console.error('Error fetching B Com courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const years = Array.from(new Set(bcomCourses.map((c) => c.year)));
  const subjects = Array.from(new Set(bcomCourses.map((c) => c.subject)));

  const coursesByYear = bcomCourses.reduce((acc, course) => {
    if (!acc[course.year]) {
      acc[course.year] = [];
    }
    acc[course.year].push(course);
    return acc;
  }, {} as Record<string, BComCourse[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          B Com (Bachelor of Commerce) Courses
        </h1>

        <div className="mb-6 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Year:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedSubject('all');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
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
        ) : bcomCourses.length === 0 ? (
          <p className="text-gray-600 bg-white p-6 rounded-lg shadow text-center">
            No B Com courses available.
          </p>
        ) : selectedYear === 'all' ? (
          <div className="space-y-8">
            {Object.entries(coursesByYear).map(([year, courses]) => (
              <section key={year} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">{year}</h2>
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
                        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition inline-block"
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
            {bcomCourses.map((course) => (
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
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition inline-block"
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

