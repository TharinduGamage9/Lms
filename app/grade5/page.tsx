'use client';

import { useState, useEffect } from 'react';

interface Grade5Course {
  _id: string;
  subject: string;
  driveLink: string;
}

export default function Grade5Page() {
  const [grade5Courses, setGrade5Courses] = useState<Grade5Course[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrade5();
  }, [selectedSubject]);

  const fetchGrade5 = async () => {
    setLoading(true);
    try {
      const url = selectedSubject === 'all'
        ? '/api/grade5'
        : `/api/grade5?subject=${selectedSubject}`;

      const response = await fetch(url);
      const data = await response.json();
      setGrade5Courses(data.grade5Courses || []);
    } catch (error) {
      console.error('Error fetching Grade 5 courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjects = Array.from(
    new Set(grade5Courses.map((c) => c.subject))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          📚 Grade 5 Student Notes
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Access study materials for Grade 5 students
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Subject:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="all">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : grade5Courses.length === 0 ? (
          <p className="text-gray-600 bg-white p-6 rounded-lg shadow text-center">
            No Grade 5 courses available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grade5Courses.map((course) => (
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
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition inline-block w-full text-center"
                >
                  View Notes
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


