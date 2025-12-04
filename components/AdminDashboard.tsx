'use client';

import { useState, useEffect } from 'react';

interface Note {
  _id: string;
  subject: string;
  driveLink: string;
  level: 'OL' | 'AL';
  category?: string;
}

interface OtherNote {
  _id: string;
  subject: string;
  driveLink: string;
}

interface NVQCourse {
  _id: string;
  subject: string;
  driveLink: string;
  category: string;
}

interface PsychologyCourse {
  _id: string;
  subject: string;
  driveLink: string;
}

interface BComCourse {
  _id: string;
  subject: string;
  driveLink: string;
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'English Medium';
}

interface LanguageCourse {
  _id: string;
  subject: string;
  driveLink: string;
}

interface BAExternalCourse {
  _id: string;
  subject: string;
  medium: string;
  driveLink: string;
}

interface Grade5Course {
  _id: string;
  subject: string;
  driveLink: string;
}

interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  visitsByPage: Array<{ _id: string; count: number }>;
  recentVisits: Array<{ ip: string; page: string; timestamp: string; userAgent?: string }>;
  visitsByDay: Array<{ date: string; count: number; unique: number }>;
  period: string;
}

interface LiveVisitorData {
  liveCount: number;
  activeSessions: Array<{ sessionId: string; ip: string; page: string; lastSeen: string }>;
  sessionsByPage: Record<string, number>;
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'notes' | 'otherNotes' | 'nvq' | 'psychology' | 'bcom' | 'languages' | 'baExternal' | 'grade5' | 'visitors'>('notes');
  const [notes, setNotes] = useState<Note[]>([]);
  const [otherNotes, setOtherNotes] = useState<OtherNote[]>([]);
  const [nvqCourses, setNvqCourses] = useState<NVQCourse[]>([]);
  const [psychologyCourses, setPsychologyCourses] = useState<PsychologyCourse[]>([]);
  const [bcomCourses, setBcomCourses] = useState<BComCourse[]>([]);
  const [languages, setLanguages] = useState<LanguageCourse[]>([]);
  const [baExternalCourses, setBaExternalCourses] = useState<BAExternalCourse[]>([]);
  const [grade5Courses, setGrade5Courses] = useState<Grade5Course[]>([]);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [liveVisitors, setLiveVisitors] = useState<LiveVisitorData | null>(null);
  const [statsPeriod, setStatsPeriod] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Note | OtherNote | NVQCourse | PsychologyCourse | BComCourse | LanguageCourse | BAExternalCourse | Grade5Course | null>(null);

  const [formData, setFormData] = useState({
    subject: '',
    driveLink: '',
    level: 'OL' as 'OL' | 'AL',
    category: '',
    noteCategory: '', // For AL notes category
    year: '1st Year' as '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'English Medium',
    medium: '',
  });

  useEffect(() => {
    fetchNotes();
    fetchOtherNotes();
    fetchNVQ();
    fetchPsychology();
    fetchBCom();
    fetchLanguages();
    fetchBAExternal();
    fetchGrade5();
    fetchVisitorStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'visitors') {
      fetchVisitorStats();
      fetchLiveVisitors();
      
      // Auto-refresh live visitors every 5 seconds
      const interval = setInterval(() => {
        fetchLiveVisitors();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [statsPeriod, activeTab]);

  const fetchLiveVisitors = async () => {
    try {
      const response = await fetch('/api/visitors/live');
      const data = await response.json();
      setLiveVisitors(data);
    } catch (error) {
      console.error('Error fetching live visitors:', error);
    }
  };

  const fetchVisitorStats = async () => {
    try {
      const response = await fetch(`/api/visitors/stats?period=${statsPeriod}`);
      const data = await response.json();
      setVisitorStats(data);
    } catch (error) {
      console.error('Error fetching visitor stats:', error);
    }
  };

  const fetchGrade5 = async () => {
    try {
      const response = await fetch('/api/grade5');
      const data = await response.json();
      setGrade5Courses(data.grade5Courses || []);
    } catch (error) {
      console.error('Error fetching Grade 5 courses:', error);
    }
  };

  const fetchBAExternal = async () => {
    try {
      const response = await fetch('/api/ba-external');
      const data = await response.json();
      setBaExternalCourses(data.baExternalCourses || []);
    } catch (error) {
      console.error('Error fetching BA External courses:', error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch('/api/languages');
      const data = await response.json();
      setLanguages(data.languages || []);
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const fetchBCom = async () => {
    try {
      const response = await fetch('/api/bcom');
      const data = await response.json();
      setBcomCourses(data.bcomCourses || []);
    } catch (error) {
      console.error('Error fetching B Com courses:', error);
    }
  };

  const fetchPsychology = async () => {
    try {
      const response = await fetch('/api/psychology');
      const data = await response.json();
      setPsychologyCourses(data.psychologyCourses || []);
    } catch (error) {
      console.error('Error fetching psychology courses:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();
      setNotes(data.notes || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchOtherNotes = async () => {
    try {
      const response = await fetch('/api/other-notes');
      const data = await response.json();
      setOtherNotes(data.otherNotes || []);
    } catch (error) {
      console.error('Error fetching other notes:', error);
    }
  };

  const fetchNVQ = async () => {
    try {
      const response = await fetch('/api/nvq');
      const data = await response.json();
      setNvqCourses(data.nvqCourses || []);
    } catch (error) {
      console.error('Error fetching NVQ courses:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === 'notes') {
        const url = editingItem ? `/api/notes/${editingItem._id}` : '/api/notes';
        const method = editingItem ? 'PUT' : 'POST';
        const body: any = {
          subject: formData.subject,
          driveLink: formData.driveLink,
          level: formData.level,
        };
        // Add category only for AL level notes
        if (formData.level === 'AL' && formData.noteCategory) {
          body.category = formData.noteCategory;
        }

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchNotes();
          resetForm();
        }
      } else if (activeTab === 'otherNotes') {
        const url = editingItem ? `/api/other-notes/${editingItem._id}` : '/api/other-notes';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchOtherNotes();
          resetForm();
        }
      } else if (activeTab === 'nvq') {
        const url = editingItem ? `/api/nvq/${editingItem._id}` : '/api/nvq';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
          category: formData.category,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchNVQ();
          resetForm();
        }
      } else if (activeTab === 'psychology') {
        const url = editingItem ? `/api/psychology/${editingItem._id}` : '/api/psychology';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchPsychology();
          resetForm();
        }
      } else if (activeTab === 'bcom') {
        const url = editingItem ? `/api/bcom/${editingItem._id}` : '/api/bcom';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
          year: formData.year,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchBCom();
          resetForm();
        }
      } else if (activeTab === 'languages') {
        const url = editingItem ? `/api/languages/${editingItem._id}` : '/api/languages';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchLanguages();
          resetForm();
        }
      } else if (activeTab === 'baExternal') {
        const url = editingItem ? `/api/ba-external/${editingItem._id}` : '/api/ba-external';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          medium: formData.medium,
          driveLink: formData.driveLink,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchBAExternal();
          resetForm();
        }
      } else {
        const url = editingItem ? `/api/grade5/${editingItem._id}` : '/api/grade5';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchGrade5();
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      let url = '';
      if (activeTab === 'notes') {
        url = `/api/notes/${id}`;
      } else if (activeTab === 'otherNotes') {
        url = `/api/other-notes/${id}`;
      } else if (activeTab === 'nvq') {
        url = `/api/nvq/${id}`;
      } else if (activeTab === 'psychology') {
        url = `/api/psychology/${id}`;
      } else if (activeTab === 'bcom') {
        url = `/api/bcom/${id}`;
      } else if (activeTab === 'languages') {
        url = `/api/languages/${id}`;
      } else if (activeTab === 'baExternal') {
        url = `/api/ba-external/${id}`;
      } else {
        url = `/api/grade5/${id}`;
      }
      const response = await fetch(url, { method: 'DELETE' });

      if (response.ok) {
        if (activeTab === 'notes') {
          fetchNotes();
        } else if (activeTab === 'otherNotes') {
          fetchOtherNotes();
        } else if (activeTab === 'nvq') {
          fetchNVQ();
        } else if (activeTab === 'psychology') {
          fetchPsychology();
        } else if (activeTab === 'bcom') {
          fetchBCom();
        } else if (activeTab === 'languages') {
          fetchLanguages();
        } else if (activeTab === 'baExternal') {
          fetchBAExternal();
        } else {
          fetchGrade5();
        }
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleEdit = (item: Note | OtherNote | NVQCourse | PsychologyCourse | BComCourse | LanguageCourse | BAExternalCourse | Grade5Course) => {
    setEditingItem(item);
    if ('level' in item) {
      setFormData({
        subject: item.subject,
        driveLink: item.driveLink,
        level: item.level,
        category: '',
        noteCategory: item.category || '',
        year: '1st Year',
        medium: '',
      });
    } else if ('category' in item) {
      setFormData({
        subject: item.subject,
        driveLink: item.driveLink,
        level: 'OL',
        category: item.category,
        year: '1st Year',
        medium: '',
      });
    } else if ('year' in item) {
      setFormData({
        subject: item.subject,
        driveLink: item.driveLink,
        level: 'OL',
        category: '',
        year: item.year,
        medium: '',
      });
    } else if ('medium' in item) {
      setFormData({
        subject: item.subject,
        driveLink: item.driveLink,
        level: 'OL',
        category: '',
        year: '1st Year',
        medium: item.medium,
      });
    } else {
      setFormData({
        subject: item.subject,
        driveLink: item.driveLink,
        level: 'OL',
        category: '',
        year: '1st Year',
        medium: '',
      });
    }
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      driveLink: '',
      level: 'OL',
      category: '',
      noteCategory: '',
      year: '1st Year',
      medium: '',
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const getTabLabel = () => {
    if (activeTab === 'notes') return 'Note';
    if (activeTab === 'otherNotes') return 'Other Note';
    if (activeTab === 'nvq') return 'NVQ Course';
    if (activeTab === 'psychology') return 'Psychology Course';
    if (activeTab === 'bcom') return 'B Com Course';
    if (activeTab === 'languages') return 'Language';
    if (activeTab === 'baExternal') return 'BA External Course';
    if (activeTab === 'grade5') return 'Grade 5 Course';
    return 'Visitor';
  };

  const categories = ['ICT', 'Construction & Engineering Technology', 'Automotive Technology', 'Hospitality & Tourism', 'Healthcare & Social Care'];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => {
                  setActiveTab('notes');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'notes'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notes
              </button>
              <button
                onClick={() => {
                  setActiveTab('otherNotes');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'otherNotes'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Other Notes
              </button>
              <button
                onClick={() => {
                  setActiveTab('nvq');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'nvq'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                NVQ
              </button>
              <button
                onClick={() => {
                  setActiveTab('psychology');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'psychology'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Psychology
              </button>
              <button
                onClick={() => {
                  setActiveTab('bcom');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'bcom'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                B Com
              </button>
              <button
                onClick={() => {
                  setActiveTab('languages');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'languages'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Languages
              </button>
              <button
                onClick={() => {
                  setActiveTab('baExternal');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'baExternal'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                BA External
              </button>
              <button
                onClick={() => {
                  setActiveTab('grade5');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'grade5'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Grade 5
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab !== 'visitors' && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {showForm ? 'Cancel' : `Add New ${getTabLabel()}`}
              </button>
            )}

            {showForm && activeTab !== 'visitors' && (
              <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Mathematics, Science"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {activeTab === 'notes' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Level
                        </label>
                        <select
                          required
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value as 'OL' | 'AL', noteCategory: '' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="OL">OL</option>
                          <option value="AL">AL</option>
                        </select>
                      </div>
                      {formData.level === 'AL' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category (for AL)
                          </label>
                          <select
                            value={formData.noteCategory}
                            onChange={(e) => setFormData({ ...formData, noteCategory: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="">No Category</option>
                            <option value="වාණිජ විෂය ධාරාව (Commerce Stream)">වාණිජ විෂය ධාරාව (Commerce Stream)</option>
                            <option value="කලා විෂය ධාරාව (Arts Stream)">කලා විෂය ධාරාව (Arts Stream)</option>
                            <option value="කලා විෂය ධාරාව (Languages)">කලා විෂය ධාරාව (Languages)</option>
                            <option value="තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)">තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)</option>
                            <option value="විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)">විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)</option>
                          </select>
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === 'nvq' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {activeTab === 'bcom' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <select
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value as '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'English Medium' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="English Medium">English Medium</option>
                      </select>
                    </div>
                  )}
                  {activeTab === 'baExternal' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medium
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.medium}
                        onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                        placeholder="e.g., English Medium, Sinhala Medium, More Resources"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                  <div className={activeTab === 'otherNotes' || activeTab === 'nvq' || activeTab === 'psychology' || activeTab === 'bcom' || activeTab === 'languages' || activeTab === 'baExternal' || activeTab === 'grade5' ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Drive Link
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.driveLink}
                      onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                </button>
              </form>
            )}

            {activeTab !== 'visitors' && (
              <div className="space-y-4">
                {activeTab === 'notes' ? (
                notes.length === 0 ? (
                  <p className="text-gray-500">No notes found. Add your first note!</p>
                ) : (
                  notes.map((note) => (
                    <div key={note._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-4 items-center mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900">{note.subject}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                              {note.level}
                            </span>
                            {note.category && (
                              <span className="text-xs text-gray-600 bg-blue-100 px-2 py-1 rounded">
                                {note.category}
                              </span>
                            )}
                          </div>
                          <a
                            href={note.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link →
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(note)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(note._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'otherNotes' ? (
                otherNotes.length === 0 ? (
                  <p className="text-gray-500">No other notes found. Add your first other note!</p>
                ) : (
                  otherNotes.map((note) => (
                    <div key={note._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{note.subject}</h3>
                          <a
                            href={note.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link →
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(note)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(note._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'nvq' ? (
                nvqCourses.length === 0 ? (
                  <p className="text-gray-500">No NVQ courses found. Add your first NVQ course!</p>
                ) : (
                  nvqCourses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-4 items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{course.subject}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                              {course.category}
                            </span>
                          </div>
                          <a
                            href={course.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link →
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'psychology' ? (
                psychologyCourses.length === 0 ? (
                  <p className="text-gray-500">No psychology courses found. Add your first psychology course!</p>
                ) : (
                  psychologyCourses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.subject}</h3>
                          <a
                            href={course.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link →
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'bcom' ? (
                bcomCourses.length === 0 ? (
                  <p className="text-gray-500">No B Com courses found. Add your first B Com course!</p>
                ) : (
                  bcomCourses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-4 items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{course.subject}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                              {course.year}
                            </span>
                          </div>
                          <a
                            href={course.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link →
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'languages' ? (
                languages.length === 0 ? (
                  <p className="text-gray-500">No languages found. Add your first language!</p>
                ) : (
                  languages.map((language) => (
                    <div key={language._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{language.subject}</h3>
                          <a
                            href={language.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link →
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(language)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(language._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'baExternal' ? (
                baExternalCourses.length === 0 ? (
                  <p className="text-gray-500">No BA External courses found. Add your first BA External course!</p>
                ) : (
                  baExternalCourses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-4 items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{course.subject}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                              {course.medium}
                            </span>
                          </div>
                          <a
                            href={course.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link →
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                grade5Courses.length === 0 ? (
                  <p className="text-gray-500">No Grade 5 courses found. Add your first Grade 5 course!</p>
                ) : (
                  grade5Courses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.subject}</h3>
                          <a
                            href={course.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link →
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
                )}
              </div>
            )}

            {activeTab === 'visitors' && (
                <div className="p-6">
                  <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Visitor Statistics</h2>
                    <select
                      value={statsPeriod}
                      onChange={(e) => setStatsPeriod(e.target.value as 'today' | 'week' | 'month' | 'all')}
                      className="px-4 py-2 border border-gray-300 rounded-md bg-white"
                    >
                      <option value="today">Today</option>
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
                      <option value="all">All Time</option>
                    </select>
                  </div>

                  {/* Live Visitors Card */}
                  <div className="mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-6 text-white shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium opacity-90 mb-1">Live Visitors Now</div>
                          <div className="text-5xl font-bold">
                            {liveVisitors?.liveCount ?? 0}
                          </div>
                          <div className="text-sm opacity-75 mt-2">
                            Active in the last 5 minutes
                          </div>
                        </div>
                        <div className="text-6xl opacity-20">
                          👥
                        </div>
                      </div>
                      {liveVisitors && liveVisitors.liveCount > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <div className="text-sm font-medium mb-2">Currently viewing:</div>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(liveVisitors.sessionsByPage).map(([page, count]) => (
                              <div key={page} className="bg-white/20 px-3 py-1 rounded-full text-xs">
                                {page === '/' ? 'Home' : page}: {count}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Live Visitors Card */}
                  <div className="mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-6 text-white shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium opacity-90 mb-1">Live Visitors Now</div>
                          <div className="text-5xl font-bold">
                            {liveVisitors?.liveCount ?? 0}
                          </div>
                          <div className="text-sm opacity-75 mt-2">
                            Active in the last 5 minutes
                          </div>
                        </div>
                        <div className="text-6xl opacity-20">
                          👥
                        </div>
                      </div>
                      {liveVisitors && liveVisitors.liveCount > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <div className="text-sm font-medium mb-2">Currently viewing:</div>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(liveVisitors.sessionsByPage).map(([page, count]) => (
                              <div key={page} className="bg-white/20 px-3 py-1 rounded-full text-xs">
                                {page === '/' ? 'Home' : page}: {count}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {visitorStats ? (
                    <div className="space-y-6">
                      {/* Statistics Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                          <div className="text-sm font-medium opacity-90">Total Visits</div>
                          <div className="text-4xl font-bold mt-2">{visitorStats.totalVisits.toLocaleString()}</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                          <div className="text-sm font-medium opacity-90">Unique Visitors</div>
                          <div className="text-4xl font-bold mt-2">{visitorStats.uniqueVisitors.toLocaleString()}</div>
                        </div>
                      </div>

                      {/* Visits by Page */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
                        {visitorStats.visitsByPage.length > 0 ? (
                          <div className="space-y-3">
                            {visitorStats.visitsByPage.map((page) => (
                              <div key={page._id} className="flex justify-between items-center">
                                <span className="text-gray-700">{page._id === '/' ? 'Home' : page._id}</span>
                                <span className="font-semibold text-indigo-600">{page.count.toLocaleString()} visits</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No page visits yet</p>
                        )}
                      </div>

                      {/* Active Sessions */}
                      {liveVisitors && liveVisitors.activeSessions.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions (Live)</h3>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Page</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {liveVisitors.activeSessions.map((session) => {
                                  const lastSeen = new Date(session.lastSeen);
                                  const secondsAgo = Math.floor((Date.now() - lastSeen.getTime()) / 1000);
                                  return (
                                    <tr key={session.sessionId}>
                                      <td className="px-4 py-3 text-sm text-gray-900">{session.ip}</td>
                                      <td className="px-4 py-3 text-sm text-gray-600">{session.page === '/' ? 'Home' : session.page}</td>
                                      <td className="px-4 py-3 text-sm text-gray-500">
                                        {secondsAgo < 60 ? `${secondsAgo}s ago` : `${Math.floor(secondsAgo / 60)}m ago`}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Recent Visits */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Visits (Historical)</h3>
                        {visitorStats.recentVisits.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {visitorStats.recentVisits.map((visit, index) => (
                                  <tr key={index}>
                                    <td className="px-4 py-3 text-sm text-gray-900">{visit.ip}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{visit.page === '/' ? 'Home' : visit.page}</td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                      {new Date(visit.timestamp).toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-gray-500">No recent visits</p>
                        )}
                      </div>

                      {/* Daily Visits Chart */}
                      {visitorStats.visitsByDay.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Visits</h3>
                          <div className="space-y-2">
                            {visitorStats.visitsByDay.map((day) => (
                              <div key={day.date} className="flex items-center">
                                <div className="w-24 text-sm text-gray-600">{day.date}</div>
                                <div className="flex-1 mx-4">
                                  <div className="bg-gray-200 rounded-full h-6 relative">
                                    <div
                                      className="bg-indigo-600 h-6 rounded-full flex items-center justify-end pr-2"
                                      style={{
                                        width: `${Math.min((day.count / Math.max(...visitorStats.visitsByDay.map(d => d.count))) * 100, 100)}%`,
                                      }}
                                    >
                                      <span className="text-xs text-white font-medium">{day.count}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-20 text-sm text-gray-600 text-right">
                                  {day.unique} unique
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">Loading visitor statistics...</p>
                    </div>
                  )}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
