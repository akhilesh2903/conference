'use client';

import { useState, useEffect, useMemo } from 'react';

type Status = 'pending' | 'accepted' | 'rejected';
type CandidateSubTab = 'pending' | 'accepted' | 'rejected';

type Candidate = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  institution: string;
  category: string;
  presentationType: string;
  paperId?: string;
  paymentReference?: string;
  status: Status;
  createdAt: string;
};

type Track = {
  _id: string;
  trackNumber: string;
  title: string;
  text: string;
};

type Tab = 'candidates' | 'tracks';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('candidates');

  // Candidates state
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [candidateSubTab, setCandidateSubTab] = useState<CandidateSubTab>('pending');
  const [statusLoading, setStatusLoading] = useState<string | null>(null);

  // Accepted-tab filters
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');

  // Tracks state
  const [tracks, setTracks] = useState<Track[]>([]);
  const [tracksLoading, setTracksLoading] = useState(false);
  const [trackForm, setTrackForm] = useState({ trackNumber: '', title: '', text: '' });
  const [trackFormLoading, setTrackFormLoading] = useState(false);
  const [trackFormError, setTrackFormError] = useState('');
  const [trackFormSuccess, setTrackFormSuccess] = useState('');

  const authHeader = () =>
    'Basic ' + Buffer.from(username + ':' + password).toString('base64');

  /* ─── Fetch helpers ────────────────────────────────────────────────── */
  const fetchCandidates = async (user: string, pass: string) => {
    setFetchLoading(true);
    try {
      const header = 'Basic ' + Buffer.from(user + ':' + pass).toString('base64');
      const res = await fetch('/api/admin/candidates', {
        headers: { Authorization: header },
      });
      const contentType = res.headers.get('content-type');
      let data: any;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = { error: 'Server error: Check if MONGODB_URI is properly configured.' };
      }
      if (!res.ok) throw new Error(data.error || 'Failed to authenticate');
      // Ensure existing candidates without status are treated as pending
      const list: Candidate[] = (data.candidates || []).map((c: any) => ({
        ...c,
        status: c.status || 'pending',
      }));
      setCandidates(list);
      setIsLoggedIn(true);
      setErrorMsg('');
    } catch (err: any) {
      setErrorMsg(err.message);
      setIsLoggedIn(false);
    } finally {
      setFetchLoading(false);
      setLoading(false);
    }
  };

  const fetchTracks = async () => {
    setTracksLoading(true);
    try {
      const res = await fetch('/api/admin/tracks', {
        headers: { Authorization: authHeader() },
      });
      const data = await res.json();
      if (res.ok) setTracks(data.tracks || []);
    } catch {
      // silent
    } finally {
      setTracksLoading(false);
    }
  };

  /* ─── Status update ────────────────────────────────────────────────── */
  const updateStatus = async (id: string, newStatus: Status) => {
    setStatusLoading(id);
    try {
      const res = await fetch(`/api/admin/candidates/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader(),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setCandidates((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err: any) {
      alert(err.message || 'Error updating status');
    } finally {
      setStatusLoading(null);
    }
  };

  /* ─── Login ────────────────────────────────────────────────────────── */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchCandidates(username, password);
  };

  useEffect(() => {
    if (isLoggedIn && activeTab === 'tracks') {
      fetchTracks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, activeTab]);

  /* ─── Track handlers ───────────────────────────────────────────────── */
  const handleAddTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackFormLoading(true);
    setTrackFormError('');
    setTrackFormSuccess('');
    try {
      const res = await fetch('/api/admin/tracks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader(),
        },
        body: JSON.stringify(trackForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add track');
      setTrackFormSuccess('Track added successfully!');
      setTrackForm({ trackNumber: '', title: '', text: '' });
      fetchTracks();
    } catch (err: any) {
      setTrackFormError(err.message);
    } finally {
      setTrackFormLoading(false);
    }
  };

  const handleDeleteTrack = async (id: string) => {
    if (!confirm('Delete this track?')) return;
    try {
      const res = await fetch(`/api/admin/tracks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: authHeader() },
      });
      if (res.ok) {
        setTracks((prev) => prev.filter((t) => t._id !== id));
      }
    } catch {
      // silent
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCandidates([]);
    setTracks([]);
    setUsername('');
    setPassword('');
    setActiveTab('candidates');
  };

  /* ─── Derived candidate lists ─────────────────────────────────────── */
  const pending = useMemo(() => candidates.filter((c) => c.status === 'pending'), [candidates]);
  const accepted = useMemo(() => candidates.filter((c) => c.status === 'accepted'), [candidates]);
  const rejected = useMemo(() => candidates.filter((c) => c.status === 'rejected'), [candidates]);

  // Unique filter options from accepted list
  const categoryOptions = useMemo(
    () => Array.from(new Set(accepted.map((c) => c.category))).sort(),
    [accepted]
  );
  const typeOptions = useMemo(
    () => Array.from(new Set(accepted.map((c) => c.presentationType))).sort(),
    [accepted]
  );

  const filteredAccepted = useMemo(
    () =>
      accepted.filter(
        (c) =>
          (filterCategory === '' || c.category === filterCategory) &&
          (filterType === '' || c.presentationType === filterType)
      ),
    [accepted, filterCategory, filterType]
  );

  const subTabCandidates: Candidate[] =
    candidateSubTab === 'pending'
      ? pending
      : candidateSubTab === 'accepted'
      ? filteredAccepted
      : rejected;

  /* ─── Status badge ─────────────────────────────────────────────────── */
  const StatusBadge = ({ status }: { status: Status }) => {
    const styles: Record<Status, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  /* ─── Action buttons per sub-tab ───────────────────────────────────── */
  const ActionButtons = ({ candidate }: { candidate: Candidate }) => {
    const isUpdating = statusLoading === candidate._id;

    if (candidateSubTab === 'pending') {
      return (
        <div className="flex gap-2">
          <button
            disabled={isUpdating}
            onClick={() => updateStatus(candidate._id, 'accepted')}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {isUpdating ? '…' : '✓ Accept'}
          </button>
          <button
            disabled={isUpdating}
            onClick={() => updateStatus(candidate._id, 'rejected')}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {isUpdating ? '…' : '✕ Reject'}
          </button>
        </div>
      );
    }

    if (candidateSubTab === 'accepted') {
      return (
        <div className="flex gap-2">
          <button
            disabled={isUpdating}
            onClick={() => updateStatus(candidate._id, 'pending')}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50 transition-colors"
          >
            {isUpdating ? '…' : '↩ Undo'}
          </button>
          <button
            disabled={isUpdating}
            onClick={() => updateStatus(candidate._id, 'rejected')}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {isUpdating ? '…' : '✕ Reject'}
          </button>
        </div>
      );
    }

    // rejected tab
    return (
      <button
        disabled={isUpdating}
        onClick={() => updateStatus(candidate._id, 'pending')}
        className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50 transition-colors"
      >
        {isUpdating ? '…' : '↩ Undo Reject'}
      </button>
    );
  };

  /* ─── Login screen ─────────────────────────────────────────────────── */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              {errorMsg && (
                <div className="bg-red-50 text-red-700 p-3 rounded text-sm">{errorMsg}</div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1">
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {loading ? 'Authenticating...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Dashboard ────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Log Out
          </button>
        </div>

        {/* Main tab bar */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6">
            <button
              onClick={() => setActiveTab('candidates')}
              className={`py-3 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === 'candidates'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Registered Candidates
            </button>
            <button
              onClick={() => setActiveTab('tracks')}
              className={`py-3 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === 'tracks'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Manage Tracks
            </button>
          </nav>
        </div>

        {/* ── Candidates Tab ── */}
        {activeTab === 'candidates' && (
          <div className="space-y-4">
            {fetchLoading ? (
              <div className="bg-white shadow sm:rounded-lg p-8 text-center text-gray-500">
                Loading candidates…
              </div>
            ) : (
              <>
                {/* Candidate Sub-tabs with counts */}
                <div className="flex gap-2 flex-wrap">
                  {(
                    [
                      { key: 'pending', label: 'Pending', count: pending.length, color: 'yellow' },
                      { key: 'accepted', label: 'Accepted', count: accepted.length, color: 'green' },
                      { key: 'rejected', label: 'Rejected', count: rejected.length, color: 'red' },
                    ] as const
                  ).map(({ key, label, count, color }) => {
                    const active = candidateSubTab === key;
                    const colorMap: Record<string, { active: string; inact: string }> = {
                      yellow: {
                        active: 'bg-yellow-500 text-white shadow',
                        inact: 'bg-white text-yellow-700 border border-yellow-300 hover:bg-yellow-50',
                      },
                      green: {
                        active: 'bg-green-600 text-white shadow',
                        inact: 'bg-white text-green-700 border border-green-300 hover:bg-green-50',
                      },
                      red: {
                        active: 'bg-red-600 text-white shadow',
                        inact: 'bg-white text-red-700 border border-red-300 hover:bg-red-50',
                      },
                    };
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setCandidateSubTab(key);
                          setFilterCategory('');
                          setFilterType('');
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 flex items-center gap-2 ${
                          active ? colorMap[color].active : colorMap[color].inact
                        }`}
                      >
                        {label}
                        <span
                          className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                            active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Accepted-tab: Filters */}
                {candidateSubTab === 'accepted' && accepted.length > 0 && (
                  <div className="bg-white shadow sm:rounded-lg p-4 flex flex-wrap gap-4 items-end">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Filter by Category
                      </label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">All Categories</option>
                        {categoryOptions.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Filter by Presentation Type
                      </label>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">All Types</option>
                        {typeOptions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    {(filterCategory || filterType) && (
                      <button
                        onClick={() => { setFilterCategory(''); setFilterType(''); }}
                        className="text-xs text-teal-600 hover:underline self-end pb-1"
                      >
                        Clear filters
                      </button>
                    )}
                    <span className="text-xs text-gray-400 self-end pb-1">
                      Showing {filteredAccepted.length} of {accepted.length} accepted
                    </span>
                  </div>
                )}

                {/* Candidates table */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  {subTabCandidates.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      {candidateSubTab === 'pending' && 'No pending candidates.'}
                      {candidateSubTab === 'accepted' && (filterCategory || filterType)
                        ? 'No candidates match the selected filters.'
                        : candidateSubTab === 'accepted'
                        ? 'No accepted candidates yet.'
                        : null}
                      {candidateSubTab === 'rejected' && 'No rejected candidates.'}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name & Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Institution
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category & Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Paper ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Payment Ref
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {subTabCandidates.map((candidate, idx) => (
                            <tr
                              key={candidate._id || idx}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(candidate.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {candidate.fullName}
                                </div>
                                <div className="text-sm text-gray-500">{candidate.email}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {candidate.phoneNumber}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                                {candidate.institution}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800 break-words max-w-[200px] whitespace-normal">
                                  {candidate.category}
                                </span>
                                <div className="text-xs text-gray-500 mt-1">
                                  {candidate.presentationType}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {candidate.paperId || '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {candidate.paymentReference || '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <ActionButtons candidate={candidate} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Tracks Tab ── */}
        {activeTab === 'tracks' && (
          <div className="space-y-6">
            {/* Add Track Form */}
            <div className="bg-white shadow sm:rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Track</h2>
              <form onSubmit={handleAddTrack} className="space-y-4">
                {trackFormError && (
                  <div className="bg-red-50 text-red-700 p-3 rounded text-sm">{trackFormError}</div>
                )}
                {trackFormSuccess && (
                  <div className="bg-green-50 text-green-700 p-3 rounded text-sm">{trackFormSuccess}</div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Track Number</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 05"
                      value={trackForm.trackNumber}
                      onChange={(e) => setTrackForm((f) => ({ ...f, trackNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Track Title</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Robotics & Automation"
                      value={trackForm.title}
                      onChange={(e) => setTrackForm((f) => ({ ...f, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Track Description / Subtopics
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter subtopics or description for this track, one per line or as a paragraph."
                    value={trackForm.text}
                    onChange={(e) => setTrackForm((f) => ({ ...f, text: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={trackFormLoading}
                  className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                >
                  {trackFormLoading ? 'Adding...' : 'Add Track'}
                </button>
              </form>
            </div>

            {/* Existing Tracks */}
            <div className="bg-white shadow sm:rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Existing DB Tracks</h2>
                <p className="text-xs text-gray-500 mt-1">
                  These tracks are stored in the database and appear on the public Tracks page.
                </p>
              </div>
              {tracksLoading ? (
                <div className="p-8 text-center text-gray-500">Loading tracks...</div>
              ) : tracks.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No tracks in the database yet. Add one above.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                          No.
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description / Subtopics
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tracks.map((track) => (
                        <tr key={track._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-teal-700">
                            {track.trackNumber}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs">
                            {track.title}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                            <p className="line-clamp-3 whitespace-pre-line">{track.text}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <button
                              onClick={() => handleDeleteTrack(track._id)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
