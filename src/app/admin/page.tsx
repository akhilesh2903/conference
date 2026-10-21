'use client';

import React, { useState, useEffect, useMemo } from 'react';

type Status = 'pending' | 'accepted' | 'rejected';
type CandidateSubTab = 'all' | 'pending' | 'accepted' | 'rejected';

type Candidate = {
  _id: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  institution: string;
  country?: string;
  city?: string;
  state?: string;
  category: string;
  presentationType: string;
  paperId?: string;
  paymentReference?: string;
  googleScholarId?: string;
  orcidId?: string;
  semanticScholarId?: string;
  dblpId?: string;
  openReviewId?: string;
  domainConflicts?: string;
  status: Status;
  createdAt: string;
};

type AbstractItem = {
  _id: string;
  submissionId: string;
  track: string;
  secondaryTrack?: string;
  title: string;
  abstract: string;
  keywords: string;
  userEmail: string;
  primaryAuthor: {
    name: string;
    email: string;
    organization: string;
    country: string;
  };
  coAuthors: {
    name: string;
    email: string;
    organization: string;
    country: string;
  }[];
  domainConflicts?: string;
  wordCount: number;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Revision' | 'Rejected';
  createdAt: string;
};

type Track = {
  _id: string;
  trackNumber: string;
  title: string;
  text: string;
  image?: string;
};

type Tab = 'candidates' | 'abstracts' | 'tracks';

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
  const [candidateSubTab, setCandidateSubTab] = useState<CandidateSubTab>('all');
  const [candidateSearch, setCandidateSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');
  const [statusLoading, setStatusLoading] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Abstracts state
  const [abstracts, setAbstracts] = useState<AbstractItem[]>([]);
  const [abstractsLoading, setAbstractsLoading] = useState(false);
  const [abstractSubTab, setAbstractSubTab] = useState<string>('all');
  const [abstractSearch, setAbstractSearch] = useState('');
  const [abstractTrackFilter, setAbstractTrackFilter] = useState('');
  const [abstractStatusLoading, setAbstractStatusLoading] = useState<string | null>(null);
  const [selectedAbstract, setSelectedAbstract] = useState<AbstractItem | null>(null);

  // Tracks state
  const [tracks, setTracks] = useState<Track[]>([]);
  const [tracksLoading, setTracksLoading] = useState(false);
  const [trackDeleteLoading, setTrackDeleteLoading] = useState<string | null>(null);
  const [trackForm, setTrackForm] = useState({ trackNumber: '', title: '', text: '', image: '' });
  const [trackImageName, setTrackImageName] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [trackFormLoading, setTrackFormLoading] = useState(false);
  const [trackFormError, setTrackFormError] = useState('');
  const [trackFormSuccess, setTrackFormSuccess] = useState('');
  const [seedLoading, setSeedLoading] = useState(false);

  const authHeader = () => {
    if (typeof window !== 'undefined') {
      try {
        return 'Basic ' + window.btoa(`${username}:${password}`);
      } catch {
        return 'Basic ' + window.btoa(encodeURIComponent(`${username}:${password}`));
      }
    }
    return 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
  };

  /* ─── Fetch helpers ────────────────────────────────────────────────── */
  const fetchCandidates = async (user: string, pass: string) => {
    setFetchLoading(true);
    try {
      let header = '';
      if (typeof window !== 'undefined') {
        try {
          header = 'Basic ' + window.btoa(`${user}:${pass}`);
        } catch {
          header = 'Basic ' + window.btoa(encodeURIComponent(`${user}:${pass}`));
        }
      } else {
        header = 'Basic ' + Buffer.from(user + ':' + pass).toString('base64');
      }

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
      const list: Candidate[] = (data.candidates || []).map((c: any) => ({
        ...c,
        status: c.status || 'pending',
      }));
      setCandidates(list);
      setIsLoggedIn(true);
      setErrorMsg('');

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('icmems_admin_u', user);
        sessionStorage.setItem('icmems_admin_p', pass);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
      setIsLoggedIn(false);
    } finally {
      setFetchLoading(false);
      setLoading(false);
    }
  };

  // Restore session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const u = sessionStorage.getItem('icmems_admin_u');
      const p = sessionStorage.getItem('icmems_admin_p');
      if (u && p) {
        setUsername(u);
        setPassword(p);
        fetchCandidates(u, p);
      }
    }
  }, []);

  const fetchAbstracts = async () => {
    setAbstractsLoading(true);
    try {
      const res = await fetch('/api/admin/abstracts', {
        headers: { Authorization: authHeader() },
      });
      const data = await res.json();
      if (res.ok) setAbstracts(data.abstracts || []);
    } catch (e) {
      // silent
    } finally {
      setAbstractsLoading(false);
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

  /* ─── Status update: Candidate ─────────────────────────────────────── */
  const updateCandidateStatus = async (id: string, newStatus: Status) => {
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
      if (selectedCandidate && selectedCandidate._id === id) {
        setSelectedCandidate((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      alert(err.message || 'Error updating status');
    } finally {
      setStatusLoading(null);
    }
  };

  /* ─── Status update: Abstract ───────────────────────────────────────── */
  const updateAbstractStatus = async (id: string, newStatus: string) => {
    setAbstractStatusLoading(id);
    try {
      const res = await fetch(`/api/admin/abstracts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader(),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update abstract status');
      setAbstracts((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: newStatus as any } : a))
      );
      if (selectedAbstract && selectedAbstract._id === id) {
        setSelectedAbstract((prev) => prev ? { ...prev, status: newStatus as any } : null);
      }
    } catch (err: any) {
      alert(err.message || 'Error updating abstract status');
    } finally {
      setAbstractStatusLoading(null);
    }
  };

  /* ─── Login & Tab Switch Handler ───────────────────────────────────── */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchCandidates(username, password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (activeTab === 'abstracts') fetchAbstracts();
      if (activeTab === 'tracks') fetchTracks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, activeTab]);

  /* ─── Track Handlers ───────────────────────────────────────────────── */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setTrackFormError('');
    setTrackImageName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawBase64 = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        try {
          // Resize image to max 1200x800 to keep MongoDB document lightweight (~80-120KB)
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.85);
            setTrackForm((prev) => ({ ...prev, image: optimizedBase64 }));
          } else {
            setTrackForm((prev) => ({ ...prev, image: rawBase64 }));
          }
        } catch {
          setTrackForm((prev) => ({ ...prev, image: rawBase64 }));
        } finally {
          setUploadingImage(false);
        }
      };
      img.onerror = () => {
        setTrackForm((prev) => ({ ...prev, image: rawBase64 }));
        setUploadingImage(false);
      };
      img.src = rawBase64;
    };
    reader.onerror = () => {
      setTrackFormError('Failed to read image file');
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

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
      setTrackForm({ trackNumber: '', title: '', text: '', image: '' });
      setTrackImageName('');
      fetchTracks();
    } catch (err: any) {
      setTrackFormError(err.message);
    } finally {
      setTrackFormLoading(false);
    }
  };

  const handleDeleteTrack = async (track: Track) => {
    const trackId = track._id || (track as any).id;
    if (!trackId) {
      alert('Unable to delete track: Missing track ID');
      return;
    }
    if (!confirm(`Are you sure you want to delete Track ${track.trackNumber}: "${track.title}"? This cannot be undone.`)) return;

    setTrackDeleteLoading(trackId);
    try {
      const res = await fetch(`/api/admin/tracks/${encodeURIComponent(trackId)}`, {
        method: 'DELETE',
        headers: { Authorization: authHeader() },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete track from server');
      }
      setTracks((prev) => prev.filter((t) => (t._id || (t as any).id) !== trackId && t.trackNumber !== track.trackNumber));
      fetchTracks();
    } catch (err: any) {
      alert(err.message || 'Error deleting track');
    } finally {
      setTrackDeleteLoading(null);
    }
  };

  const handleSeedDefaultTracks = async () => {
    if (!confirm('Load or restore the 4 official conference tracks into the database?')) return;
    setSeedLoading(true);
    try {
      const res = await fetch('/api/admin/tracks/seed', {
        method: 'POST',
        headers: { Authorization: authHeader() },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to seed tracks');
      alert('Official conference tracks loaded successfully!');
      fetchTracks();
    } catch (err: any) {
      alert(err.message || 'Error seeding tracks');
    } finally {
      setSeedLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('icmems_admin_u');
      sessionStorage.removeItem('icmems_admin_p');
    }
    setIsLoggedIn(false);
    setCandidates([]);
    setAbstracts([]);
    setTracks([]);
    setUsername('');
    setPassword('');
    setActiveTab('candidates');
  };

  /* ─── Export to CSV Helper ─────────────────────────────────────────── */
  const exportCandidatesCSV = () => {
    const headers = [
      'Full Name', 'First Name', 'Last Name', 'Email', 'Phone',
      'Institution', 'Country', 'City', 'Category', 'Presentation Type',
      'Paper ID', 'Payment Ref', 'ORCID', 'Google Scholar', 'Domain Conflicts',
      'Status', 'Registered Date'
    ];
    const rows = filteredCandidates.map((c) => [
      `"${c.fullName || ''}"`,
      `"${c.firstName || ''}"`,
      `"${c.lastName || ''}"`,
      `"${c.email || ''}"`,
      `"${c.phoneNumber || ''}"`,
      `"${(c.institution || '').replace(/"/g, '""')}"`,
      `"${c.country || ''}"`,
      `"${c.city || ''}"`,
      `"${c.category || ''}"`,
      `"${c.presentationType || ''}"`,
      `"${c.paperId || ''}"`,
      `"${c.paymentReference || ''}"`,
      `"${c.orcidId || ''}"`,
      `"${c.googleScholarId || ''}"`,
      `"${(c.domainConflicts || '').replace(/"/g, '""')}"`,
      `"${c.status || ''}"`,
      `"${new Date(c.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ICMEMS_Registered_Candidates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAbstractsCSV = () => {
    const headers = [
      'Submission ID', 'Title', 'Primary Track', 'Secondary Track',
      'Author Name', 'Author Email', 'Institution', 'Country',
      'Co-Authors Count', 'Word Count', 'Keywords', 'Domain Conflicts',
      'Status', 'Date Submitted'
    ];
    const rows = filteredAbstracts.map((a) => [
      `"${a.submissionId || ''}"`,
      `"${(a.title || '').replace(/"/g, '""')}"`,
      `"${(a.track || '').replace(/"/g, '""')}"`,
      `"${(a.secondaryTrack || '').replace(/"/g, '""')}"`,
      `"${a.primaryAuthor?.name || ''}"`,
      `"${a.primaryAuthor?.email || ''}"`,
      `"${(a.primaryAuthor?.organization || '').replace(/"/g, '""')}"`,
      `"${a.primaryAuthor?.country || ''}"`,
      `"${a.coAuthors?.length || 0}"`,
      `"${a.wordCount || 0}"`,
      `"${(a.keywords || '').replace(/"/g, '""')}"`,
      `"${(a.domainConflicts || '').replace(/"/g, '""')}"`,
      `"${a.status || ''}"`,
      `"${new Date(a.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ICMEMS_Abstract_Submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ─── Filtering logic: Candidates ───────────────────────────────────── */
  const pendingCount = useMemo(() => candidates.filter((c) => c.status === 'pending').length, [candidates]);
  const acceptedCount = useMemo(() => candidates.filter((c) => c.status === 'accepted').length, [candidates]);
  const rejectedCount = useMemo(() => candidates.filter((c) => c.status === 'rejected').length, [candidates]);

  const categoryOptions = useMemo(
    () => Array.from(new Set(candidates.map((c) => c.category).filter(Boolean))).sort(),
    [candidates]
  );
  const typeOptions = useMemo(
    () => Array.from(new Set(candidates.map((c) => c.presentationType).filter(Boolean))).sort(),
    [candidates]
  );

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      // Sub-tab status filter
      if (candidateSubTab !== 'all' && c.status !== candidateSubTab) return false;
      // Category filter
      if (filterCategory && c.category !== filterCategory) return false;
      // Presentation type filter
      if (filterType && c.presentationType !== filterType) return false;
      // Text search
      if (candidateSearch.trim()) {
        const q = candidateSearch.toLowerCase();
        const matchName = c.fullName?.toLowerCase().includes(q);
        const matchEmail = c.email?.toLowerCase().includes(q);
        const matchInst = c.institution?.toLowerCase().includes(q);
        const matchPhone = c.phoneNumber?.toLowerCase().includes(q);
        const matchCountry = c.country?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchInst && !matchPhone && !matchCountry) return false;
      }
      return true;
    });
  }, [candidates, candidateSubTab, filterCategory, filterType, candidateSearch]);

  /* ─── Filtering logic: Abstracts ────────────────────────────────────── */
  const abstractTrackOptions = useMemo(
    () => Array.from(new Set(abstracts.map((a) => a.track).filter(Boolean))).sort(),
    [abstracts]
  );

  const filteredAbstracts = useMemo(() => {
    return abstracts.filter((a) => {
      if (abstractSubTab !== 'all' && a.status !== abstractSubTab) return false;
      if (abstractTrackFilter && a.track !== abstractTrackFilter) return false;
      if (abstractSearch.trim()) {
        const q = abstractSearch.toLowerCase();
        const matchTitle = a.title?.toLowerCase().includes(q);
        const matchId = a.submissionId?.toLowerCase().includes(q);
        const matchAuthor = a.primaryAuthor?.name?.toLowerCase().includes(q);
        const matchEmail = a.primaryAuthor?.email?.toLowerCase().includes(q);
        const matchOrg = a.primaryAuthor?.organization?.toLowerCase().includes(q);
        const matchKeywords = a.keywords?.toLowerCase().includes(q);
        if (!matchTitle && !matchId && !matchAuthor && !matchEmail && !matchOrg && !matchKeywords) return false;
      }
      return true;
    });
  }, [abstracts, abstractSubTab, abstractTrackFilter, abstractSearch]);

  /* ─── Login screen ─────────────────────────────────────────────────── */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            Authorized Access Only
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">IC-MEMS 2027 Admin</h2>
          <p className="text-slate-400 text-xs mt-1">Management Portal for Candidates, Abstracts & Tracks</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-800/90 border border-slate-700/80 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 backdrop-blur-md">
            <form className="space-y-5" onSubmit={handleLogin}>
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-medium">
                  {errorMsg}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Username
                </label>
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Admin Password
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-md transition-colors disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Dashboard ────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ─── Top Header ─── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  IC-MEMS 2027 Admin Console
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                  Live DB
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Conference Authors, Registrations, Abstract Submissions & Tracks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors shadow-2xs"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* ─── Main Tabs Navigation ─── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-xs flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('candidates')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'candidates'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Registered Authors & Candidates</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${activeTab === 'candidates' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {candidates.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('abstracts')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'abstracts'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Abstract Submissions</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${activeTab === 'abstracts' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {abstracts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tracks')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'tracks'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Manage Tracks</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${activeTab === 'tracks' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {tracks.length}
            </span>
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ─── TAB 1: REGISTERED CANDIDATES & AUTHORS ─── */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'candidates' && (
          <div className="space-y-4">
            
            {/* Filters & Actions Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Sub-tab Status Filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                  {(
                    [
                      { key: 'all', label: 'All Registered', count: candidates.length, color: 'slate' },
                      { key: 'pending', label: 'Pending Review', count: pendingCount, color: 'amber' },
                      { key: 'accepted', label: 'Accepted', count: acceptedCount, color: 'emerald' },
                      { key: 'rejected', label: 'Rejected', count: rejectedCount, color: 'red' },
                    ] as const
                  ).map(({ key, label, count }) => {
                    const active = candidateSubTab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setCandidateSubTab(key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                          active
                            ? 'bg-slate-900 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {label}
                        <span className={`px-1.5 py-0.2 rounded text-[10px] ${active ? 'bg-white/20 text-white' : 'bg-white text-slate-700'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Export Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportCandidatesCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export Candidates (.CSV)
                  </button>
                </div>
              </div>

              {/* Search & Select Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <input
                    type="text"
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                    placeholder="Search name, email, institution, phone, country..."
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:border-teal-500 outline-none bg-white"
                  >
                    <option value="">All Fee Categories</option>
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:border-teal-500 outline-none bg-white"
                  >
                    <option value="">All Presentation Types</option>
                    {typeOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Candidates Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {fetchLoading ? (
                <div className="p-12 text-center text-slate-500 text-sm">Loading candidates from MongoDB...</div>
              ) : filteredCandidates.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-sm">
                  No candidates found matching the selected filters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                    <thead className="bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Author Details</th>
                        <th className="px-4 py-3">Contact</th>
                        <th className="px-4 py-3">Affiliation & Location</th>
                        <th className="px-4 py-3">Category & Type</th>
                        <th className="px-4 py-3">Academic IDs & Conflicts</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredCandidates.map((c) => {
                        const isUpdating = statusLoading === c._id;
                        return (
                          <tr key={c._id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                              {new Date(c.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-bold text-slate-900">{c.fullName}</div>
                              <div className="text-slate-500 text-[11px] select-all">{c.email}</div>
                            </td>
                            <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                              {c.phoneNumber}
                            </td>
                            <td className="px-4 py-3 max-w-[200px]">
                              <div className="font-medium text-slate-800 truncate" title={c.institution}>
                                {c.institution}
                              </div>
                              <div className="text-slate-500 text-[11px]">
                                {[c.city, c.country].filter(Boolean).join(', ') || 'India'}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 mb-0.5">
                                {c.category}
                              </span>
                              <div className="text-slate-500 text-[11px]">{c.presentationType}</div>
                            </td>
                            <td className="px-4 py-3 max-w-[180px]">
                              <div className="flex flex-wrap gap-1 mb-1">
                                {c.orcidId && (
                                  <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-bold" title={`ORCID: ${c.orcidId}`}>
                                    ORCID
                                  </span>
                                )}
                                {c.googleScholarId && (
                                  <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[9px] font-bold" title={`Scholar ID: ${c.googleScholarId}`}>
                                    Scholar
                                  </span>
                                )}
                                {c.semanticScholarId && (
                                  <span className="px-1.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded text-[9px] font-bold">
                                    Semantic
                                  </span>
                                )}
                              </div>
                              {c.domainConflicts ? (
                                <div className="text-[10px] text-slate-500 truncate" title={c.domainConflicts}>
                                  Conflicts: {c.domainConflicts}
                                </div>
                              ) : (
                                <span className="text-[10px] text-slate-400">None</span>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                                c.status === 'accepted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : c.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedCandidate(c)}
                                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors"
                                  title="View full profile details"
                                >
                                  Details
                                </button>
                                {c.status !== 'accepted' && (
                                  <button
                                    disabled={isUpdating}
                                    onClick={() => updateCandidateStatus(c._id, 'accepted')}
                                    className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors disabled:opacity-50"
                                  >
                                    Accept
                                  </button>
                                )}
                                {c.status !== 'rejected' && (
                                  <button
                                    disabled={isUpdating}
                                    onClick={() => updateCandidateStatus(c._id, 'rejected')}
                                    className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold transition-colors disabled:opacity-50"
                                  >
                                    Reject
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ─── TAB 2: ABSTRACT SUBMISSIONS ─── */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'abstracts' && (
          <div className="space-y-4">
            
            {/* Header & Filter Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                
                {/* Status sub-tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                  {['all', 'Submitted', 'Under Review', 'Accepted', 'Revision', 'Rejected'].map((st) => {
                    const count = st === 'all' ? abstracts.length : abstracts.filter((a) => a.status === st).length;
                    const active = abstractSubTab === st;
                    return (
                      <button
                        key={st}
                        onClick={() => setAbstractSubTab(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                          active
                            ? 'bg-slate-900 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st === 'all' ? 'All Submissions' : st}
                        <span className={`px-1.5 py-0.2 rounded text-[10px] ${active ? 'bg-white/20 text-white' : 'bg-white text-slate-700'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Export Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportAbstractsCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export Abstracts (.CSV)
                  </button>
                </div>
              </div>

              {/* Search & Track filter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <input
                    type="text"
                    value={abstractSearch}
                    onChange={(e) => setAbstractSearch(e.target.value)}
                    placeholder="Search by ID, Paper Title, Author, Keywords, Institution..."
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:border-teal-500 outline-none"
                  />
                </div>
                <div>
                  <select
                    value={abstractTrackFilter}
                    onChange={(e) => setAbstractTrackFilter(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:border-teal-500 outline-none bg-white"
                  >
                    <option value="">All Conference Tracks</option>
                    {abstractTrackOptions.map((tr) => (
                      <option key={tr} value={tr}>{tr}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Abstracts Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {abstractsLoading ? (
                <div className="p-12 text-center text-slate-500 text-sm">Loading abstracts from database...</div>
              ) : filteredAbstracts.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-sm">
                  No abstract submissions found matching the criteria.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                    <thead className="bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-4 py-3">ID & Date</th>
                        <th className="px-4 py-3">Paper Title & Track</th>
                        <th className="px-4 py-3">Primary Author</th>
                        <th className="px-4 py-3">Affiliation</th>
                        <th className="px-4 py-3">Co-Authors</th>
                        <th className="px-4 py-3">Words</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredAbstracts.map((abs) => {
                        const isUpdating = abstractStatusLoading === abs._id;
                        return (
                          <tr key={abs._id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                                {abs.submissionId}
                              </span>
                              <div className="text-[10px] text-slate-400 mt-1">
                                {new Date(abs.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-4 py-3 max-w-[260px]">
                              <div className="font-bold text-slate-900 line-clamp-2" title={abs.title}>
                                {abs.title}
                              </div>
                              <div className="text-[11px] text-teal-700 font-medium truncate mt-0.5" title={abs.track}>
                                {abs.track}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="font-semibold text-slate-800">{abs.primaryAuthor?.name}</div>
                              <div className="text-slate-500 text-[11px]">{abs.primaryAuthor?.email}</div>
                            </td>
                            <td className="px-4 py-3 max-w-[180px]">
                              <div className="text-slate-800 font-medium truncate" title={abs.primaryAuthor?.organization}>
                                {abs.primaryAuthor?.organization}
                              </div>
                              <div className="text-slate-500 text-[11px]">{abs.primaryAuthor?.country}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {abs.coAuthors?.length > 0 ? (
                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold" title={abs.coAuthors.map((c) => c.name).join(', ')}>
                                  {abs.coAuthors.length} Co-Author{abs.coAuthors.length > 1 ? 's' : ''}
                                </span>
                              ) : (
                                <span className="text-slate-400">Single</span>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-slate-600 font-mono">
                              {abs.wordCount}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <select
                                disabled={isUpdating}
                                value={abs.status}
                                onChange={(e) => updateAbstractStatus(abs._id, e.target.value)}
                                className={`text-[11px] font-bold rounded-lg px-2 py-1 border outline-none cursor-pointer ${
                                  abs.status === 'Accepted'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : abs.status === 'Rejected'
                                    ? 'bg-red-50 text-red-800 border-red-300'
                                    : abs.status === 'Under Review'
                                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                                    : abs.status === 'Revision'
                                    ? 'bg-purple-50 text-purple-800 border-purple-300'
                                    : 'bg-amber-50 text-amber-800 border-amber-300'
                                }`}
                              >
                                <option value="Submitted">Submitted</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Revision">Revision</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <button
                                type="button"
                                onClick={() => setSelectedAbstract(abs)}
                                className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-2xs transition-colors"
                              >
                                Read Abstract
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ─── TAB 3: MANAGE TRACKS ─── */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'tracks' && (
          <div className="space-y-6">
            {/* Add Track Form */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
              <h2 className="text-base font-bold text-slate-900 mb-4">Add New Conference Track</h2>
              <form onSubmit={handleAddTrack} className="space-y-4">
                {trackFormError && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs">{trackFormError}</div>
                )}
                {trackFormSuccess && (
                  <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl text-xs">{trackFormSuccess}</div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Track Number</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 05"
                      value={trackForm.trackNumber}
                      onChange={(e) => setTrackForm((f) => ({ ...f, trackNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:border-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Track Title</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Robotics & Industrial Automation"
                      value={trackForm.title}
                      onChange={(e) => setTrackForm((f) => ({ ...f, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:border-teal-500 outline-none"
                    />
                  </div>
                </div>

                {/* Upload Track Image */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Upload Track Image
                    <span className="text-slate-400 font-normal ml-1.5">(Choose an image file from your device)</span>
                  </label>

                  {trackForm.image ? (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={trackForm.image}
                          alt="Track Preview"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/tracks/track-4-management.png';
                          }}
                          className="w-16 h-14 object-cover rounded-lg border border-slate-300 shadow-2xs bg-white shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-800 block truncate">
                            {trackImageName || 'Selected Track Image'}
                          </span>
                          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Image uploaded &amp; ready
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <label className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 cursor-pointer transition-colors shadow-2xs">
                          Change
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setTrackForm((f) => ({ ...f, image: '' }));
                            setTrackImageName('');
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl cursor-pointer bg-slate-50/60 hover:bg-teal-50/30 transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-2xl text-teal-600 mb-2 group-hover:scale-105 transition-transform">
                        📷
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {uploadingImage ? 'Uploading image...' : 'Click to browse and upload track image'}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5">
                        PNG, JPG, WebP format supported
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Track Description / Subtopics
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter subtopics or description for this track, one per line or as a paragraph."
                    value={trackForm.text}
                    onChange={(e) => setTrackForm((f) => ({ ...f, text: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:border-teal-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={trackFormLoading}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md transition-all disabled:opacity-50"
                >
                  {trackFormLoading ? 'Adding Track...' : 'Add Conference Track'}
                </button>
              </form>
            </div>

            {/* Existing Tracks */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Database Conference Tracks</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    These tracks appear across the website dropdowns and tracks page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSeedDefaultTracks}
                  disabled={seedLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-teal-300 text-teal-700 hover:bg-teal-50 rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
                >
                  {seedLoading ? 'Loading...' : '⚡ Restore 4 Official Conference Tracks'}
                </button>
              </div>

              {tracksLoading ? (
                <div className="p-8 text-center text-slate-500 text-xs">Loading tracks...</div>
              ) : tracks.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">No tracks in database yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                    <thead className="bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-4 py-3 w-16">No.</th>
                        <th className="px-4 py-3 w-24">Image</th>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Description / Subtopics</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {tracks.map((track) => {
                        const trackId = track._id || (track as any).id;
                        const isDeleting = trackDeleteLoading === trackId;
                        return (
                          <tr key={trackId} className="hover:bg-slate-50/70 transition-colors">
                            <td className="px-4 py-4 font-bold text-teal-700">Track {track.trackNumber}</td>
                            <td className="px-4 py-4">
                              {track.image ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                  src={track.image}
                                  alt={track.title}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/tracks/track-4-management.png';
                                  }}
                                  className="w-14 h-10 object-cover rounded-lg border border-slate-200 shadow-2xs bg-white"
                                />
                              ) : (
                                <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-medium border border-slate-200">
                                  Default
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 font-semibold text-slate-900 max-w-xs">{track.title}</td>
                            <td className="px-6 py-4 text-slate-600 max-w-md line-clamp-3">{track.text}</td>
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                disabled={isDeleting}
                                onClick={() => handleDeleteTrack(track)}
                                className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs transition-colors disabled:opacity-50 inline-flex items-center gap-1.5 shadow-2xs"
                              >
                                {isDeleting ? (
                                  <>
                                    <span className="w-3 h-3 rounded-full border-2 border-red-600 border-t-transparent animate-spin" />
                                    <span>Deleting...</span>
                                  </>
                                ) : (
                                  <span>Delete</span>
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── MODAL: CANDIDATE FULL PROFILE ─── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedCandidate.fullName}</h3>
                <p className="text-xs text-slate-500">Registered Author & Delegate Profile</p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Email Address</span>
                <span className="font-semibold text-slate-900 select-all">{selectedCandidate.email}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Phone / WhatsApp</span>
                <span className="font-semibold text-slate-900 select-all">{selectedCandidate.phoneNumber}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Institution / Organization</span>
                <span className="font-semibold text-slate-900">{selectedCandidate.institution}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Country & Location</span>
                <span className="font-semibold text-slate-900">{[selectedCandidate.city, selectedCandidate.country].filter(Boolean).join(', ') || 'India'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Fee Category</span>
                <span className="font-semibold text-teal-700">{selectedCandidate.category}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Presentation Type</span>
                <span className="font-semibold text-slate-900">{selectedCandidate.presentationType}</span>
              </div>
              {selectedCandidate.paperId && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">Paper ID</span>
                  <span className="font-semibold font-mono text-slate-900">{selectedCandidate.paperId}</span>
                </div>
              )}
              {selectedCandidate.paymentReference && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">Payment Reference</span>
                  <span className="font-semibold text-slate-900">{selectedCandidate.paymentReference}</span>
                </div>
              )}
            </div>

            {/* Academic Profiles & Conflict of Interest */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-slate-800">Academic IDs & Profiles</h4>
              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div>ORCID: <span className="font-mono">{selectedCandidate.orcidId || 'Not provided'}</span></div>
                <div>Google Scholar: <span className="font-mono">{selectedCandidate.googleScholarId || 'Not provided'}</span></div>
                <div>Semantic Scholar: <span className="font-mono">{selectedCandidate.semanticScholarId || 'Not provided'}</span></div>
                <div>DBLP: <span className="font-mono">{selectedCandidate.dblpId || 'Not provided'}</span></div>
              </div>
              {selectedCandidate.domainConflicts && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-500 block">Domain Conflicts (Conflict of Interest):</span>
                  <span className="font-mono text-slate-800">{selectedCandidate.domainConflicts}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-xs text-slate-500">
                Status: <strong className="uppercase text-slate-900">{selectedCandidate.status}</strong>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => updateCandidateStatus(selectedCandidate._id, 'accepted')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  Accept Candidate
                </button>
                <button
                  onClick={() => updateCandidateStatus(selectedCandidate._id, 'rejected')}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                >
                  Reject Candidate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ─── MODAL: READ FULL ABSTRACT ─── */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {selectedAbstract && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4 mb-4">
              <div>
                <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 text-xs">
                  {selectedAbstract.submissionId}
                </span>
                <span className="ml-2 text-xs text-slate-500 font-semibold">{selectedAbstract.track}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 leading-snug">
                  {selectedAbstract.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAbstract(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center shrink-0 ml-4"
              >
                ✕
              </button>
            </div>

            {/* Author bar */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-5 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2 mb-2">
                <div>
                  <span className="text-slate-500">Primary Author: </span>
                  <span className="font-bold text-slate-900">{selectedAbstract.primaryAuthor?.name}</span>
                  <span className="text-slate-500"> ({selectedAbstract.primaryAuthor?.email})</span>
                </div>
                <div className="text-slate-600">
                  {selectedAbstract.primaryAuthor?.organization}, {selectedAbstract.primaryAuthor?.country}
                </div>
              </div>

              {selectedAbstract.coAuthors?.length > 0 && (
                <div>
                  <span className="text-slate-500 font-semibold block mb-1">Co-Authors:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedAbstract.coAuthors.map((ca, idx) => (
                      <span key={idx} className="bg-white px-2 py-1 rounded border border-slate-200 text-slate-700">
                        {ca.name} ({ca.organization}, {ca.country})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Abstract Text Area Body */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Abstract Text Content</h4>
                <span className="text-xs font-mono text-slate-500">{selectedAbstract.wordCount} words</span>
              </div>
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                {selectedAbstract.abstract}
              </div>
            </div>

            {/* Keywords & Conflict */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Keywords:</span>
                <span className="font-medium text-slate-800">{selectedAbstract.keywords}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Domain Conflicts:</span>
                <span className="font-medium text-slate-800">{selectedAbstract.domainConflicts || 'None stated'}</span>
              </div>
            </div>

            {/* Status change actions */}
            <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Change Status:</span>
                <select
                  value={selectedAbstract.status}
                  onChange={(e) => updateAbstractStatus(selectedAbstract._id, e.target.value)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 outline-none bg-white"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Revision">Revision</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedAbstract(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
