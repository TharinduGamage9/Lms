'use client';

import { useState, useEffect } from 'react';

interface Language {
  _id: string;
  subject: string;
  driveLink: string;
}

export default function LanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLanguages();
  }, [selectedSubject]);

  const fetchLanguages = async () => {
    setLoading(true);
    try {
      const url = selectedSubject === 'all'
        ? '/api/languages'
        : `/api/languages?subject=${selectedSubject}`;

      const response = await fetch(url);
      const data = await response.json();
      setLanguages(data.languages || []);
    } catch (error) {
      console.error('Error fetching languages:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjects = Array.from(
    new Set(languages.map((lang) => lang.subject))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          🌍 Language Learning Resources
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Learn 23+ languages for free with comprehensive study materials
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Language:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="all">All Languages</option>
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
        ) : languages.length === 0 ? (
          <p className="text-gray-600 bg-white p-6 rounded-lg shadow text-center">
            No language resources available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((language) => (
              <div
                key={language._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {language.subject}
                </h3>
                <a
                  href={language.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition inline-block w-full text-center"
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

