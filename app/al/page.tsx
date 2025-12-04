'use client';

import { useState, useEffect } from 'react';

interface Note {
  _id: string;
  subject: string;
  driveLink: string;
  level: string;
  category?: string;
}

export default function ALPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [selectedCategory, selectedSubject]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let notesUrl = '/api/notes?level=AL';
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedSubject !== 'all') params.append('subject', selectedSubject);
      if (params.toString()) notesUrl += '&' + params.toString();

      const response = await fetch(notesUrl);
      const data = await response.json();

      setNotes(data.notes || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(
    new Set(notes.map((n) => n.category).filter(Boolean))
  );

  const subjects = Array.from(
    new Set(notes.map((n) => n.subject))
  );

  const notesByCategory = notes.reduce((acc, note) => {
    const category = note.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Advanced Level (AL) Materials
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
        ) : notes.length === 0 ? (
          <p className="text-gray-600 bg-white p-6 rounded-lg shadow text-center">
            No notes available for AL level.
          </p>
        ) : selectedCategory === 'all' && selectedSubject === 'all' ? (
          <div className="space-y-8">
            {Object.entries(notesByCategory).map(([category, categoryNotes]) => (
              <section key={category} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">{category}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryNotes.map((note) => (
                    <div
                      key={note._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {note.subject}
                      </h3>
                      <a
                        href={note.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition inline-block w-full text-center"
                      >
                        View Note
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                {note.category && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mb-2 inline-block">
                    {note.category}
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {note.subject}
                </h3>
                <a
                  href={note.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition inline-block w-full text-center"
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
