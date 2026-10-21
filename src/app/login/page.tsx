'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const countries = [
  'India', 'United States', 'United Kingdom', 'Germany', 'Japan',
  'Australia', 'Canada', 'Singapore', 'Malaysia', 'United Arab Emirates',
  'Saudi Arabia', 'Bahrain', 'France', 'Italy', 'South Korea',
  'China', 'Brazil', 'Other'
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/for-authors#submission';

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Sign In State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register State
  const [regData, setRegData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    institution: '',
    country: 'India',
    city: '',
    category: 'Research Scholars / Postgraduate Students',
    presentationType: 'Oral Presenter',
    googleScholarId: '',
    orcidId: '',
    semanticScholarId: '',
    dblpId: '',
    domainConflicts: '',
    securityCodeInput: '',
    agreedToTerms: false,
  });

  const [securityCode, setSecurityCode] = useState('8K3P9');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [hasPreservedDraft, setHasPreservedDraft] = useState(false);

  useEffect(() => {
    // Check if user has an abstract draft waiting
    if (typeof window !== 'undefined' && localStorage.getItem('abstractDraft')) {
      setHasPreservedDraft(true);
    }

    // Generate random security code
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSecurityCode(code);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg('Please enter your email address and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify your credentials.');
      }

      const user = data.user;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('registeredName', user.fullName || `${user.firstName} ${user.lastName}`);
      localStorage.setItem('cmtUser', JSON.stringify(user));

      window.dispatchEvent(new Event('authStatusChanged'));
      window.dispatchEvent(new Event('registrationStatusChanged'));

      setSuccessMsg('Signed in successfully! Redirecting to conference portal...');
      setTimeout(() => {
        router.push(redirect);
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regData.firstName.trim() || !regData.lastName.trim()) {
      setErrorMsg('Please enter your first and last name.');
      return;
    }
    if (!regData.email.trim()) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (regData.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters.');
      return;
    }
    if (regData.password !== regData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!regData.institution.trim()) {
      setErrorMsg('Please provide your University / Institution.');
      return;
    }
    if (!regData.phoneNumber.trim()) {
      setErrorMsg('Please provide your phone / WhatsApp number.');
      return;
    }
    if (regData.securityCodeInput.toUpperCase().trim() !== securityCode) {
      setErrorMsg('Security code does not match.');
      return;
    }
    if (!regData.agreedToTerms) {
      setErrorMsg('Please agree to the conference ethics statement and participation terms.');
      return;
    }

    setLoading(true);
    try {
      const fullName = `${regData.firstName.trim()} ${regData.lastName.trim()}`;
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...regData,
          fullName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed.');
      }

      const user = data.user || {
        fullName,
        firstName: regData.firstName,
        lastName: regData.lastName,
        email: regData.email.toLowerCase().trim(),
        institution: regData.institution,
        country: regData.country,
        phoneNumber: regData.phoneNumber,
        category: regData.category,
        domainConflicts: regData.domainConflicts,
      };

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('registeredName', fullName);
      localStorage.setItem('cmtUser', JSON.stringify(user));

      window.dispatchEvent(new Event('authStatusChanged'));
      window.dispatchEvent(new Event('registrationStatusChanged'));

      setSuccessMsg('Account registered successfully! Redirecting...');
      setTimeout(() => {
        router.push(redirect);
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/80 font-sans pb-16">
      {/* ─── Conference Header Strip ─── */}
      <div className="bg-[#0a192f] text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/alvas-org-logo.png" alt="AIET Logo" className="h-8 w-auto object-contain" />
            <div className="border-l border-slate-700 pl-2.5">
              <span className="font-bold text-sm tracking-tight text-white">IC-MEMS <span className="text-teal-400">2027</span></span>
              <span className="text-[10px] text-slate-400 block leading-none">AIET, Moodbidri</span>
            </div>
          </Link>
          <Link href="/" className="text-xs text-slate-300 hover:text-white transition-colors">
            ← Return to Conference Home
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-8">
        
        {/* Preserved Draft Notification */}
        {hasPreservedDraft && (
          <div className="mb-6 p-4 rounded-xl bg-teal-50 border border-teal-300 text-teal-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
            <span className="text-lg">📝</span>
            <div>
              <p className="font-bold text-teal-950">Your drafted abstract is securely preserved!</p>
              <p className="text-teal-800 text-xs mt-0.5">
                Sign in or register below. You will be automatically returned to complete and submit your abstract.
              </p>
            </div>
          </div>
        )}

        {/* ─── Main Portal Card ─── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Card Title */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-semibold mb-2 border border-teal-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Author & Delegate Console
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              IC-MEMS 2027 Portal
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              International Conference on Materials, Energy and Management for Sustainability
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 bg-slate-50/80">
            <button
              onClick={() => { setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === 'login'
                  ? 'border-teal-600 text-teal-800 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === 'register'
                  ? 'border-teal-600 text-teal-800 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Account (Register)
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium">
                {successMsg}
              </div>
            )}

            {activeTab === 'login' ? (
              /* ─── Sign In Form ─── */
              <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-5 py-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="author@institution.edu"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign In to Author Portal'}
                </button>

                <div className="text-center pt-2">
                  <span className="text-xs text-slate-500">Don&apos;t have an account yet? </span>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
                    className="text-xs text-teal-600 font-bold hover:underline"
                  >
                    Create an account
                  </button>
                </div>
              </form>
            ) : (
              /* ─── Registration Form with All CMT Fields ─── */
              <form onSubmit={handleRegister} className="space-y-6">
                
                {/* 1. Account Credentials */}
                <div>
                  <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-3 pb-1 border-b border-slate-200">
                    1. Account Credentials
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={regData.email}
                        onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                        placeholder="author@institution.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Password * (Min 8 characters)</label>
                      <input
                        type="password"
                        required
                        value={regData.password}
                        onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password *</label>
                      <input
                        type="password"
                        required
                        value={regData.confirmPassword}
                        onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Personal Information */}
                <div>
                  <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-3 pb-1 border-b border-slate-200">
                    2. Personal & Affiliation Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">First Name (Given Name) *</label>
                      <input
                        type="text"
                        required
                        value={regData.firstName}
                        onChange={(e) => setRegData({ ...regData, firstName: e.target.value })}
                        placeholder="Dr. Priya"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name (Family Name) *</label>
                      <input
                        type="text"
                        required
                        value={regData.lastName}
                        onChange={(e) => setRegData({ ...regData, lastName: e.target.value })}
                        placeholder="Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Organization / University / Institute *</label>
                      <input
                        type="text"
                        required
                        value={regData.institution}
                        onChange={(e) => setRegData({ ...regData, institution: e.target.value })}
                        placeholder="e.g. Alva's Institute of Engineering & Technology"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Country / Region *</label>
                      <select
                        value={regData.country}
                        onChange={(e) => setRegData({ ...regData, country: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm bg-white"
                      >
                        {countries.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={regData.phoneNumber}
                        onChange={(e) => setRegData({ ...regData, phoneNumber: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Academic Profiles & Conflict of Interest */}
                <div>
                  <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-3 pb-1 border-b border-slate-200">
                    3. Academic Profiles & Reviewer Conflicts
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Google Scholar ID (Optional)</label>
                      <input
                        type="text"
                        value={regData.googleScholarId}
                        onChange={(e) => setRegData({ ...regData, googleScholarId: e.target.value })}
                        placeholder="e.g. B8XyzaAAAAAJ"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ORCID ID (Optional)</label>
                      <input
                        type="text"
                        value={regData.orcidId}
                        onChange={(e) => setRegData({ ...regData, orcidId: e.target.value })}
                        placeholder="0000-0002-1825-0097"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Domain Conflicts (Conflict of Interest)</label>
                      <input
                        type="text"
                        value={regData.domainConflicts}
                        onChange={(e) => setRegData({ ...regData, domainConflicts: e.target.value })}
                        placeholder="e.g. aiet.org.in; ku.edu.bh; university.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-sm"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Institutional domain names separated by semicolons to prevent reviewer bias.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4. Security Verification & Terms */}
                <div>
                  <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-3 pb-1 border-b border-slate-200">
                    4. Verification & Agreement
                  </h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="px-5 py-2 bg-slate-900 text-teal-400 font-mono text-xl tracking-widest font-extrabold rounded-lg shadow-inner select-none text-center">
                        {securityCode}
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Enter Security Code *</label>
                        <input
                          type="text"
                          required
                          value={regData.securityCodeInput}
                          onChange={(e) => setRegData({ ...regData, securityCodeInput: e.target.value })}
                          placeholder="Type code shown on the left"
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 uppercase tracking-wider font-mono text-sm focus:border-teal-500 outline-none"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={regData.agreedToTerms}
                        onChange={(e) => setRegData({ ...regData, agreedToTerms: e.target.checked })}
                        className="mt-1 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        I agree to the <Link href="/terms" className="text-teal-700 font-semibold underline">IC-MEMS 2027 Participation Terms</Link> and the <Link href="/publication#review" className="text-teal-700 font-semibold underline">Conference Ethics Statement</Link>.
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Complete Account Registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
