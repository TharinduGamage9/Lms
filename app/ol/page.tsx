'use client';

import { useState, useEffect } from 'react';

interface Note {
  _id: string;
  subject: string;
  driveLink: string;
  level: string;
}

export default function OLPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [selectedSubject]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const notesUrl = selectedSubject === 'all' 
        ? '/api/notes?level=OL' 
        : `/api/notes?level=OL&subject=${selectedSubject}`;

      const response = await fetch(notesUrl);
      const data = await response.json();

      setNotes(data.notes || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjects = Array.from(
    new Set(notes.map((n) => n.subject))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
          Ordinary Level (OL) Materials
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Subject:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white"
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
        ) : (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notes</h2>
            {notes.length === 0 ? (
              <p className="text-gray-600 bg-white p-6 rounded-lg shadow">
                No notes available for OL level.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {notes.map((note) => (
                  <div
                    key={note._id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {note.subject}
                    </h3>
                    <a
                      href={note.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition inline-block"
                    >
                      View Note
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
