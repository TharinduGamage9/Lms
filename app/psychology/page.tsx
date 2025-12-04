'use client';

import { useState, useEffect, useCallback } from 'react';

interface PsychologyCourse {
  _id: string;
  subject: string;
  driveLink: string;
}

export default function PsychologyPage() {
  const [psychologyCourses, setPsychologyCourses] = useState<PsychologyCourse[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const fetchPsychology = useCallback(async () => {
    setLoading(true);
    try {
      const url = selectedSubject === 'all'
        ? '/api/psychology'
        : `/api/psychology?subject=${selectedSubject}`;

      const response = await fetch(url);
      const data = await response.json();
      setPsychologyCourses(data.psychologyCourses || []);
    } catch (error) {
      console.error('Error fetching psychology courses:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedSubject]);

  useEffect(() => {
    fetchPsychology();
  }, [fetchPsychology]);

  const subjects = Array.from(
    new Set(psychologyCourses.map((c) => c.subject))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          මනෝ ප්‍රතිකාර (Psychology & Therapy)
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Subject:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white"
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
        ) : psychologyCourses.length === 0 ? (
          <p className="text-gray-600 bg-white p-6 rounded-lg shadow text-center">
            No psychology courses available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {psychologyCourses.map((course) => (
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
                  className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition inline-block"
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


