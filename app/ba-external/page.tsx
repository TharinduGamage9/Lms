'use client';

import { useState, useEffect } from 'react';

interface BAExternalCourse {
  _id: string;
  subject: string;
  medium: string;
  driveLink: string;
}

export default function BAExternalPage() {
  const [baExternalCourses, setBaExternalCourses] = useState<BAExternalCourse[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedMedium, setSelectedMedium] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBAExternal();
  }, [selectedSubject, selectedMedium]);

  const fetchBAExternal = async () => {
    setLoading(true);
    try {
      let url = '/api/ba-external';
      const params = new URLSearchParams();
      if (selectedSubject !== 'all') params.append('subject', selectedSubject);
      if (selectedMedium !== 'all') params.append('medium', selectedMedium);
      if (params.toString()) url += '?' + params.toString();

      const response = await fetch(url);
      const data = await response.json();
      setBaExternalCourses(data.baExternalCourses || []);
    } catch (error) {
      console.error('Error fetching BA External courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjects = Array.from(new Set(baExternalCourses.map((c) => c.subject)));
  const mediums = Array.from(new Set(baExternalCourses.map((c) => c.medium)));

  const coursesBySubject = baExternalCourses.reduce((acc, course) => {
    if (!acc[course.subject]) {
      acc[course.subject] = [];
    }
    acc[course.subject].push(course);
    return acc;
  }, {} as Record<string, BAExternalCourse[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          🎓 BA External Degree
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Complete notes collection for BA External Degree - English and Sinhala Medium
        </p>

        <div className="mb-6 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Subject:
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedMedium('all');
              }}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Medium:
            </label>
            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="all">All Mediums</option>
              {mediums.map((medium) => (
                <option key={medium} value={medium}>
                  {medium}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : baExternalCourses.length === 0 ? (
          <p className="text-gray-600 bg-white p-6 rounded-lg shadow text-center">
            No BA External courses available.
          </p>
        ) : selectedSubject === 'all' ? (
          <div className="space-y-8">
            {Object.entries(coursesBySubject).map(([subject, courses]) => (
              <section key={subject} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">{subject}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{course.medium}</h3>
                      </div>
                      <a
                        href={course.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition inline-block w-full text-center"
                      >
                        View Resources
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {baExternalCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{course.subject}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                    {course.medium}
                  </span>
                </div>
                <a
                  href={course.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition inline-block w-full text-center"
                >
                  View Resources
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

