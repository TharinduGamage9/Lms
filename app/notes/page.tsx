'use client';

import { useState, useEffect } from 'react';

interface OtherNote {
  _id: string;
  subject: string;
  driveLink: string;
}

export default function NotesPage() {
  const [otherNotes, setOtherNotes] = useState<OtherNote[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOtherNotes();
  }, [selectedSubject]);

  const fetchOtherNotes = async () => {
    setLoading(true);
    try {
      const url = selectedSubject === 'all'
        ? '/api/other-notes'
        : `/api/other-notes?subject=${selectedSubject}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setOtherNotes(data.otherNotes || []);
    } catch (error) {
      console.error('Error fetching other notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjects = Array.from(
    new Set(otherNotes.map((note) => note.subject))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Other Notes
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
        ) : otherNotes.length === 0 ? (
          <p className="text-gray-600 bg-white p-6 rounded-lg shadow text-center">
            No notes available.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {otherNotes.map((note) => (
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
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition inline-block w-full text-center"
                >
                  View Note
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


