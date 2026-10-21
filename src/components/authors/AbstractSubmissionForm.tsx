'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CoAuthor {
  name: string;
  email: string;
  organization: string;
  country: string;
}

const TRACKS = [
  'Theme 01: Advanced and Sustainable Materials',
  'Theme 02: Energy Systems, Hydrogen & Sustainable Energy',
  'Theme 03: Environment, Climate & Sustainable Engineering',
  'Theme 04: Sustainable Management, Business & Finance',
];

export default function AbstractSubmissionForm() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Form Fields
  const [track, setTrack] = useState(TRACKS[0]);
  const [secondaryTrack, setSecondaryTrack] = useState('');
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  const [domainConflicts, setDomainConflicts] = useState('');

  // Primary Author
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorOrg, setAuthorOrg] = useState('');
  const [authorCountry, setAuthorCountry] = useState('India');

  // Co-authors
  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>([]);

  // UI States
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState<any>(null);
  const [draftRestored, setDraftRestored] = useState(false);

  // Word count calculator
  const words = abstract.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  useEffect(() => {
    // Check login state
    const checkAuth = () => {
      const stored = localStorage.getItem('cmtUser');
      if (stored) {
        try {
          const u = JSON.parse(stored);
          setUser(u);
          setIsLoggedIn(true);
          // Autofill primary author if not already entered
          setAuthorName((prev) => prev || u.fullName || `${u.firstName || ''} ${u.lastName || ''}`.trim());
          setAuthorEmail((prev) => prev || u.email || '');
          setAuthorOrg((prev) => prev || u.organization || '');
          setAuthorCountry((prev) => prev || u.country || 'India');
          setDomainConflicts((prev) => prev || u.domainConflicts || '');
        } catch (e) {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener('authStatusChanged', checkAuth);
    window.addEventListener('registrationStatusChanged', checkAuth);

    // Restore draft if saved
    const savedDraft = localStorage.getItem('abstractDraft');
    if (savedDraft) {
      try {
        const d = JSON.parse(savedDraft);
        if (d.title) setTitle(d.title);
        if (d.abstract) setAbstract(d.abstract);
        if (d.track) setTrack(d.track);
        if (d.keywords) setKeywords(d.keywords);
        if (d.domainConflicts) setDomainConflicts(d.domainConflicts);
        if (d.coAuthors && Array.isArray(d.coAuthors)) setCoAuthors(d.coAuthors);
        setDraftRestored(true);
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('authStatusChanged', checkAuth);
      window.removeEventListener('registrationStatusChanged', checkAuth);
    };
  }, []);

  const saveDraftToStorage = () => {
    const draftData = {
      title,
      abstract,
      track,
      secondaryTrack,
      keywords,
      domainConflicts,
      coAuthors,
    };
    localStorage.setItem('abstractDraft', JSON.stringify(draftData));
  };

  const addCoAuthor = () => {
    setCoAuthors([...coAuthors, { name: '', email: '', organization: '', country: 'India' }]);
  };

  const updateCoAuthor = (index: number, field: keyof CoAuthor, val: string) => {
    const updated = [...coAuthors];
    updated[index][field] = val;
    setCoAuthors(updated);
  };

  const removeCoAuthor = (index: number) => {
    setCoAuthors(coAuthors.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    localStorage.removeItem('cmtUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('registeredName');
    window.dispatchEvent(new Event('authStatusChanged'));
    window.dispatchEvent(new Event('registrationStatusChanged'));
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Check if logged in
    if (!isLoggedIn) {
      // Save draft first so work is not lost
      saveDraftToStorage();
      // Redirect to Microsoft CMT Login page
      router.push('/login?redirect=/for-authors%23submission');
      return;
    }

    // Validation
    if (!title.trim()) {
      setErrorMsg('Please enter your paper/abstract title.');
      return;
    }

    if (wordCount < 40) {
      setErrorMsg('Please provide a complete abstract summary in the text area (at least 40 words).');
      return;
    }

    if (!keywords.trim()) {
      setErrorMsg('Please provide 3 to 5 keywords separated by commas.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        track,
        secondaryTrack,
        title: title.trim(),
        abstract: abstract.trim(),
        keywords: keywords.trim(),
        userEmail: user?.email || authorEmail,
        primaryAuthor: {
          name: authorName,
          email: authorEmail,
          organization: authorOrg,
          country: authorCountry,
        },
        coAuthors,
        domainConflicts,
      };

      const res = await fetch('/api/abstracts/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      // Clear draft on successful submission
      localStorage.removeItem('abstractDraft');
      setSubmissionSuccess(data.submission);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit abstract to Microsoft CMT portal.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              IC-MEMS 2027 Submission Portal
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">AIET Moodbidri</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Online Abstract Text Submission
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Submit your research abstract directly using the form and text area below.
          </p>
        </div>

        {/* Auth Badge */}
        <div className="shrink-0">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-xl px-4 py-2 text-xs shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                {(user?.fullName || user?.firstName || 'A')[0].toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-teal-900 leading-tight">
                  {user?.fullName || `${user?.firstName} ${user?.lastName}`}
                </p>
                <p className="text-teal-700 text-[11px] truncate max-w-[180px]">
                  {user?.email}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="ml-2 text-red-600 hover:text-red-700 font-semibold underline text-[11px]"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login?redirect=/for-authors%23submission"
              onClick={saveDraftToStorage}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Sign In / Register</span>
            </Link>
          )}
        </div>
      </div>

      {/* Notifications */}
      {draftRestored && !submissionSuccess && (
        <div className="mb-6 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>✨</span>
            <span>Your previously drafted abstract text has been automatically restored.</span>
          </div>
          <button
            type="button"
            onClick={() => setDraftRestored(false)}
            className="text-blue-700 font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {!isLoggedIn && !submissionSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="leading-relaxed">
            <strong className="font-bold text-amber-950 block mb-0.5">
              Sign In Required for Abstract Submission
            </strong>
            You can compose and write your abstract in the text area below. When you click <strong>Submit Abstract</strong>, you will be prompted to sign in or register your author account. Your draft is automatically saved and will be restored when you sign in.
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ═══════════ SUBMISSION SUCCESS STATE ═══════════ */}
      {submissionSuccess ? (
        <div className="bg-gradient-to-b from-teal-50 to-white border border-teal-200 rounded-2xl p-6 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-teal-100 border-2 border-teal-400 text-teal-700 text-3xl flex items-center justify-center mx-auto shadow-sm">
            ✓
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/90 px-3 py-1 rounded-full border border-teal-200">
              Official Abstract Registered
            </span>
            <h4 className="text-2xl font-bold text-slate-900 mt-2">
              Abstract Submission Received!
            </h4>
            <p className="text-sm text-slate-600 mt-1 max-w-lg mx-auto">
              Your research abstract has been successfully submitted to the IC-MEMS 2027 technical committee.
            </p>
          </div>

          {/* Submission Details Card */}
          <div className="max-w-xl mx-auto bg-white rounded-xl border border-slate-200 p-5 text-left text-xs sm:text-sm space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Submission ID:</span>
              <span className="font-mono font-bold text-teal-700 text-base">{submissionSuccess.submissionId}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Conference Track:</span>
              <span className="font-semibold text-slate-800 text-right">{submissionSuccess.track}</span>
            </div>
            <div className="flex items-start justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500 shrink-0 mr-4">Paper Title:</span>
              <span className="font-bold text-slate-900 text-right">{submissionSuccess.title}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Word Count:</span>
              <span className="font-medium text-slate-700">{submissionSuccess.wordCount} words</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
                {submissionSuccess.status}
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Receipt
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmissionSuccess(null);
                setTitle('');
                setAbstract('');
                setKeywords('');
                setCoAuthors([]);
              }}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors shadow-sm"
            >
              Submit Another Abstract
            </button>
          </div>
        </div>
      ) : (
        /* ═══════════ ABSTRACT SUBMISSION FORM ═══════════ */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Track Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Conference Track <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-xs sm:text-sm bg-white font-medium"
              >
                {TRACKS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Secondary Subject Area (Optional)
              </label>
              <select
                value={secondaryTrack}
                onChange={(e) => setSecondaryTrack(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-xs sm:text-sm bg-white font-medium"
              >
                <option value="">-- None / Cross-track --</option>
                {TRACKS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Paper / Abstract Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Synthesis of Sustainable Graphene Nanocomposites for Renewable Hydrogen Storage"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm font-semibold text-slate-900"
            />
          </div>

          {/* Abstract Text Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Abstract Text <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 text-xs">
                <span className={`px-2 py-0.5 rounded-md font-semibold ${
                  wordCount >= 200 && wordCount <= 350
                    ? 'bg-emerald-100 text-emerald-800'
                    : wordCount > 350
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {wordCount} words
                </span>
                <span className="text-slate-400 hidden sm:inline">(250–300 words recommended)</span>
              </div>
            </div>

            <textarea
              required
              rows={9}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Enter your abstract body text here...

Recommended Structure:
• Objective: Clearly state the research problem and goals.
• Methodology: Describe the computational, experimental, or analytical approach.
• Key Findings: Summarize the principal results and quantitative outcomes.
• Contribution / Significance: Explain the impact on materials, energy, or sustainability."
              className="w-full p-4 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-xs sm:text-sm leading-relaxed text-slate-800 font-sans resize-y shadow-2xs"
            />
            
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 px-1">
              <span>Supports plain text directly without formatting tags.</span>
              <button
                type="button"
                onClick={() => {
                  setAbstract(`This study investigates the electrochemical performance and thermal stability of bio-derived graphene nanocomposites for next-generation renewable hydrogen storage systems. Utilizing a scalable green synthesis route, porous nanostructures were fabricated and characterized via XRD, SEM, and Raman spectroscopy. Experimental evaluations demonstrate a 34% increase in sorption kinetics with negligible degradation over 500 charge-discharge cycles. The results present a viable, cost-effective framework for sustainable energy storage applications.`);
                }}
                className="text-teal-600 hover:text-teal-700 underline font-medium"
              >
                Insert Sample Abstract
              </button>
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Keywords <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. Nanomaterials, Hydrogen Storage, Green Synthesis, Clean Energy, Sustainability"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-xs sm:text-sm"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Provide 3 to 5 keywords separated by commas to help assign relevant peer reviewers.
            </span>
          </div>

          {/* Primary Author Information */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>Primary Author Information</span>
              {isLoggedIn && (
                <span className="text-xs text-teal-700 font-normal">
                  Auto-populated from registered account profile
                </span>
              )}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Dr. Jane Doe"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="jane@university.edu"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Institution / University <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={authorOrg}
                  onChange={(e) => setAuthorOrg(e.target.value)}
                  placeholder="AIET Moodbidri"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={authorCountry}
                  onChange={(e) => setAuthorCountry(e.target.value)}
                  placeholder="India"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-teal-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Co-Authors Section */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Co-Authors</h4>
                <p className="text-[11px] text-slate-500">Add any contributing co-authors to this paper.</p>
              </div>
              <button
                type="button"
                onClick={addCoAuthor}
                className="px-3 py-1.5 rounded-lg border border-teal-300 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>+ Add Co-Author</span>
              </button>
            </div>

            {coAuthors.length > 0 && (
              <div className="space-y-3 mb-2">
                {coAuthors.map((ca, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700">Co-Author #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeCoAuthor(idx)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        required
                        value={ca.name}
                        onChange={(e) => updateCoAuthor(idx, 'name', e.target.value)}
                        className="px-2.5 py-1.5 rounded border border-slate-300 text-xs bg-white"
                      />
                      <input
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={ca.email}
                        onChange={(e) => updateCoAuthor(idx, 'email', e.target.value)}
                        className="px-2.5 py-1.5 rounded border border-slate-300 text-xs bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Institution *"
                        required
                        value={ca.organization}
                        onChange={(e) => updateCoAuthor(idx, 'organization', e.target.value)}
                        className="px-2.5 py-1.5 rounded border border-slate-300 text-xs bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Country *"
                        required
                        value={ca.country}
                        onChange={(e) => updateCoAuthor(idx, 'country', e.target.value)}
                        className="px-2.5 py-1.5 rounded border border-slate-300 text-xs bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Domain Conflicts */}
          <div className="pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Domain Conflicts (Conflict of Interest)
            </label>
            <input
              type="text"
              value={domainConflicts}
              onChange={(e) => setDomainConflicts(e.target.value)}
              placeholder="e.g. aiet.org.in; university.edu"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-xs sm:text-sm"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Institutions with which reviewers may have conflicts, separated by semicolons.
            </span>
          </div>

          {/* Action Submission Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                saveDraftToStorage();
                alert('Abstract draft saved to your browser! You can return anytime.');
              }}
              className="text-xs text-slate-600 hover:text-slate-900 underline order-2 sm:order-1"
            >
              Save Draft Locally
            </button>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 order-1 sm:order-2 ${
                isLoggedIn
                  ? 'bg-teal-600 hover:bg-teal-500 hover:shadow-teal-500/20'
                  : 'bg-teal-600 hover:bg-teal-700 hover:shadow-teal-600/20'
              }`}
            >
              {submitting ? (
                <span>Submitting Abstract for Review...</span>
              ) : isLoggedIn ? (
                <>
                  <span>Submit Abstract for Review</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              ) : (
                <>
                  <span>Sign In to Submit Abstract</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
