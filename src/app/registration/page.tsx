'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const fees = [
  {
    category: 'Research Scholars / Postgraduate Students',
    amount: '₹6,000',
    currency: 'INR',
    badge: 'Students & Scholars',
  },
  {
    category: 'Faculty / Academicians',
    amount: '₹8,000',
    currency: 'INR',
    badge: 'Faculty',
  },
  {
    category: 'Industry / R&D Participants',
    amount: '₹10,000',
    currency: 'INR',
    badge: 'Industry & Labs',
  },
  {
    category: 'International Participants',
    amount: 'USD 200',
    currency: 'USD',
    badge: 'International',
  },
  {
    category: 'Accompanying Attendee Without Certificate',
    amount: '₹4,000',
    currency: 'INR',
    badge: 'Co-Attendee',
  },
];

const comparison = [
  { feature: 'Conference Attendance', full: true, accompanying: true },
  { feature: 'Conference Kit', full: true, accompanying: true },
  { feature: 'Certificate of Participation', full: true, accompanying: false },
  { feature: 'Lunch & Refreshments', full: true, accompanying: true },
  { feature: 'Accommodation', full: false, accompanying: false },
];

const countriesList = [
  'India', 'United States', 'United Kingdom', 'Germany', 'Japan',
  'Australia', 'Canada', 'Singapore', 'Malaysia', 'United Arab Emirates',
  'Saudi Arabia', 'Bahrain', 'France', 'Italy', 'South Korea',
  'China', 'Brazil', 'South Africa', 'Sweden', 'Netherlands', 'Other'
];

function RegistrationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [activeMode, setActiveMode] = useState<'register' | 'login'>('register');

  // Registration Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    institution: '',
    country: 'India',
    city: '',
    state: '',
    category: fees[0].category,
    presentationType: 'Oral Presenter',
    paperId: '',
    paymentReference: '',
    googleScholarId: '',
    orcidId: '',
    semanticScholarId: '',
    dblpId: '',
    openReviewId: '',
    domainConflicts: '',
    captchaInput: '',
    agreedToTerms: false,
  });

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K9M2');

  useEffect(() => {
    // Generate fresh simple alphanumeric captcha
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);

    const checkExisting = () => {
      const isReg = localStorage.getItem('isRegistered') === 'true';
      const cmt = localStorage.getItem('cmtUser');
      if (isReg || cmt) {
        setSubmitSuccess(true);
        try {
          if (cmt) setRegisteredUser(JSON.parse(cmt));
          else setRegisteredUser({ fullName: localStorage.getItem('registeredName') });
        } catch {
          setRegisteredUser({ fullName: localStorage.getItem('registeredName') });
        }
      }
    };
    checkExisting();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('registeredName');
    localStorage.removeItem('cmtUser');
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('registrationStatusChanged'));
    window.dispatchEvent(new Event('authStatusChanged'));
    setSubmitSuccess(false);
    setRegisteredUser(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMsg('Please enter both your First Name and Last Name.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg('Please enter a valid institutional or professional email address.');
      return;
    }
    if (!formData.password || formData.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter your password.');
      return;
    }
    if (!formData.institution.trim()) {
      setErrorMsg('Please enter your University, Institute, or Organization.');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setErrorMsg('Please enter your phone / WhatsApp number.');
      return;
    }
    if (formData.captchaInput.toUpperCase().trim() !== captchaCode) {
      setErrorMsg('Security code does not match. Please enter the characters shown in the box.');
      return;
    }
    if (!formData.agreedToTerms) {
      setErrorMsg('Please review and agree to the IC-MEMS 2027 Conference Ethics Statement & Terms.');
      return;
    }

    setIsSubmitting(true);
    try {
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      const payload = {
        ...formData,
        fullName,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed.');
      }

      const userData = data.user || {
        fullName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email.toLowerCase().trim(),
        institution: formData.institution,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
        category: formData.category,
        domainConflicts: formData.domainConflicts,
      };

      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('registeredName', fullName);
      localStorage.setItem('cmtUser', JSON.stringify(userData));

      window.dispatchEvent(new Event('registrationStatusChanged'));
      window.dispatchEvent(new Event('authStatusChanged'));

      setRegisteredUser(userData);
      setSubmitSuccess(true);

      // If user came from abstract submission redirect, send them back
      if (redirectUrl) {
        setTimeout(() => {
          router.push(redirectUrl);
        }, 800);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg('Please enter both your registered email address and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please verify credentials.');
      }

      const user = data.user;
      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('registeredName', user.fullName || `${user.firstName} ${user.lastName}`);
      localStorage.setItem('cmtUser', JSON.stringify(user));

      window.dispatchEvent(new Event('registrationStatusChanged'));
      window.dispatchEvent(new Event('authStatusChanged'));

      setRegisteredUser(user);
      setSubmitSuccess(true);

      if (redirectUrl) {
        setTimeout(() => {
          router.push(redirectUrl);
        }, 600);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-enter bg-slate-50 min-h-screen">
      {/* ─── Hero Header ─── */}
      <div className="gradient-navy text-white pt-10 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
              <li><Link href="/" className="hover:text-teal-300 transition-colors">Home</Link></li>
              <li><span className="mx-1 text-slate-600">/</span></li>
              <li className="text-slate-200 font-medium">Conference Registration</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-300 text-xs font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              IC-MEMS 2027 Delegate & Author Portal
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Conference Registration
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Register as an author, presenter, or attending delegate for the International Conference on Materials, Energy and Management for Sustainability (16–17 September 2027).
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-5xl py-12 space-y-14">
        
        {/* ─── Registration Form / Login Container ─── */}
        <section id="registration-form" aria-labelledby="form-heading">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Top Bar with Mode Toggle */}
            <div className="border-b border-slate-200 bg-slate-50/70 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 id="form-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
                  {submitSuccess ? 'Registration & Account Status' : activeMode === 'register' ? 'Author & Delegate Registration' : 'Author & Delegate Sign In'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {submitSuccess 
                    ? 'Your account is active. You can now submit abstracts and manage participation.'
                    : activeMode === 'register'
                    ? 'Complete the academic and affiliation profile below to register.'
                    : 'Enter your registered email and password to access your author console.'}
                </p>
              </div>

              {!submitSuccess && (
                <div className="flex items-center rounded-xl bg-slate-200/80 p-1 self-start sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => { setActiveMode('register'); setErrorMsg(''); }}
                    className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      activeMode === 'register'
                        ? 'bg-white text-teal-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    New Registration
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveMode('login'); setErrorMsg(''); }}
                    className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      activeMode === 'login'
                        ? 'bg-white text-teal-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Already Registered? Sign In
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              {/* If already registered/logged in */}
              {submitSuccess ? (
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-3xl mb-4 shadow-sm">
                    ✨
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-teal-900 mb-2">
                    Active Registration Session
                  </h3>
                  <p className="text-sm text-teal-800 max-w-lg mx-auto mb-6">
                    Welcome, <span className="font-semibold">{registeredUser?.fullName || 'Author'}</span>! You are officially registered with IC-MEMS 2027. Your credentials allow you to submit abstracts and view paper status.
                  </p>

                  <div className="max-w-md mx-auto bg-white/90 rounded-xl p-4 border border-teal-100 text-left text-xs sm:text-sm space-y-2 mb-6">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Name:</span>
                      <span className="font-semibold text-slate-800">{registeredUser?.fullName || '-'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Email:</span>
                      <span className="font-semibold text-slate-800">{registeredUser?.email || '-'}</span>
                    </div>
                    {registeredUser?.institution && (
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Institution:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[220px]" title={registeredUser.institution}>{registeredUser.institution}</span>
                      </div>
                    )}
                    {registeredUser?.category && (
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">Category:</span>
                        <span className="font-semibold text-teal-700">{registeredUser.category}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href="/for-authors#submission"
                      className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      Go to Abstract Submission →
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm font-semibold transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : activeMode === 'login' ? (
                /* ─── Sign In Form ─── */
                <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto space-y-5">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Registered Email Address *
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
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In to Author Console'}
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-xs text-slate-500">Need a new registration? </span>
                    <button
                      type="button"
                      onClick={() => { setActiveMode('register'); setErrorMsg(''); }}
                      className="text-xs text-teal-600 font-bold hover:underline"
                    >
                      Register here
                    </button>
                  </div>
                </form>
              ) : (
                /* ─── Full Registration Form with CMT Fields ─── */
                <form onSubmit={handleRegisterSubmit} className="space-y-8">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
                      {errorMsg}
                    </div>
                  )}

                  {/* Section 1: Account Credentials */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">Account Credentials</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="sm:col-span-2 lg:col-span-1">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="author@institution.edu"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                        />
                        <span className="text-[11px] text-slate-500 mt-1 block">Used as your login and author ID</span>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Create Password *</label>
                        <input
                          type="password"
                          required
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Min 8 characters"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password *</label>
                        <input
                          type="password"
                          required
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Re-enter password"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Personal & Contact Information */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">Personal & Contact Details</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">First Name (Given Name) *</label>
                        <input
                          type="text"
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="e.g. Dr. Priya"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name (Family Name) *</label>
                        <input
                          type="text"
                          required
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="e.g. Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Country / Region *</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm bg-white"
                        >
                          {countriesList.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">City, State / Province</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="e.g. Moodbidri, Karnataka"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Affiliation & Registration Category */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">Institution & Conference Category</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">University / Institute / Organization *</label>
                        <input
                          type="text"
                          required
                          name="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          placeholder="e.g. Alva's Institute of Engineering & Technology"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Registration Fee Category *</label>
                        <select
                          required
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm bg-white"
                        >
                          {fees.map((fee) => (
                            <option key={fee.category} value={fee.category}>
                              {fee.category} ({fee.amount})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Type of Participation *</label>
                        <select
                          required
                          name="presentationType"
                          value={formData.presentationType}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm bg-white"
                        >
                          <option value="Oral Presenter">Oral Presenter</option>
                          <option value="Poster Presenter">Poster Presenter</option>
                          <option value="Attendee Only">Attendee Only</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Academic Profiles (Optional) */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">4</span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">Academic & Subject Profiles (Optional)</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Google Scholar ID</label>
                        <input
                          type="text"
                          name="googleScholarId"
                          value={formData.googleScholarId}
                          onChange={handleChange}
                          placeholder="e.g. B8XyzaAAAAAJ"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">ORCID ID</label>
                        <input
                          type="text"
                          name="orcidId"
                          value={formData.orcidId}
                          onChange={handleChange}
                          placeholder="0000-0002-1825-0097"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Semantic Scholar ID</label>
                        <input
                          type="text"
                          name="semanticScholarId"
                          value={formData.semanticScholarId}
                          onChange={handleChange}
                          placeholder="e.g. 1741156"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">DBLP / OpenReview ID</label>
                        <input
                          type="text"
                          name="dblpId"
                          value={formData.dblpId}
                          onChange={handleChange}
                          placeholder="e.g. ~Priya_Sharma1"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 outline-none text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Domain Conflicts (Conflict of Interest) */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">5</span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">Domain Conflicts (Conflict of Interest)</h3>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Institutional Domain Conflicts</label>
                      <input
                        type="text"
                        name="domainConflicts"
                        value={formData.domainConflicts}
                        onChange={handleChange}
                        placeholder="e.g. aiet.org.in; ku.edu.bh; university.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Enter institutions/domains to prevent reviewer conflicts of interest, separated by semicolons (do not include &apos;@&apos; or public emails like gmail/yahoo).
                      </span>
                    </div>
                  </div>

                  {/* Section 6: Paper ID & Payment Reference */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">6</span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">Paper & Payment Information (Optional)</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Paper ID (If already assigned)</label>
                        <input
                          type="text"
                          name="paperId"
                          value={formData.paperId}
                          onChange={handleChange}
                          placeholder="e.g. ICMEMS-2027-ABS-1024"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Reference Number (Optional)</label>
                        <input
                          type="text"
                          name="paymentReference"
                          value={formData.paymentReference}
                          onChange={handleChange}
                          placeholder="e.g. UPI / NEFT Transaction ID"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 7: Security Code & Agreement */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">7</span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">Verification & Agreements</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="px-5 py-2.5 bg-slate-900 text-teal-400 font-mono text-xl tracking-widest font-extrabold rounded-lg shadow-inner select-none text-center">
                          {captchaCode}
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Enter Security Code *</label>
                          <input
                            type="text"
                            required
                            name="captchaInput"
                            value={formData.captchaInput}
                            onChange={handleChange}
                            placeholder="Type code shown on the left"
                            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 uppercase tracking-wider font-mono text-sm focus:border-teal-500 outline-none"
                          />
                        </div>
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer pt-2">
                        <input
                          type="checkbox"
                          required
                          name="agreedToTerms"
                          checked={formData.agreedToTerms}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                        />
                        <span className="text-xs text-slate-600 leading-relaxed">
                          I agree to the <Link href="/terms" className="text-teal-700 font-semibold underline">IC-MEMS 2027 Conference Terms</Link>, <Link href="/publication#review" className="text-teal-700 font-semibold underline">Publication Ethics Statement</Link>, and consent to the processing of registration details for conference organization and review.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                          </svg>
                          Processing Registration...
                        </>
                      ) : (
                        <>
                          Complete Registration
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>

                    <div className="text-xs text-slate-500">
                      Already registered?{' '}
                      <button
                        type="button"
                        onClick={() => { setActiveMode('login'); setErrorMsg(''); }}
                        className="text-teal-700 font-bold hover:underline"
                      >
                        Sign in to your account
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ─── Registration Fee Table ─── */}
        <section aria-labelledby="fees-heading">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="fees-heading" className="text-2xl font-bold text-slate-900">Registration Fees Structure</h2>
              <p className="text-slate-500 text-xs sm:text-sm">Standard category-wise registration fees for all tracks.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {fees.map((fee) => (
              <div key={fee.category} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 mb-3">
                    {fee.badge}
                  </span>
                  <p className="text-sm text-slate-800 font-bold leading-snug mb-4">{fee.category}</p>
                </div>
                <div className="flex items-end justify-between pt-4 border-t border-slate-100 mt-auto">
                  <span className="text-2xl font-extrabold text-teal-700">{fee.amount}</span>
                  <span className="text-xs text-slate-400 font-medium">{fee.currency}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Inclusions Comparison Table ─── */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Inclusions Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#0a192f] text-white">
                  <th className="text-left p-4 font-semibold text-xs uppercase tracking-wider">Feature</th>
                  <th className="p-4 text-center font-semibold text-xs uppercase tracking-wider">Full Author Registration</th>
                  <th className="p-4 text-center font-semibold text-xs uppercase tracking-wider">Accompanying Attendee</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                    <td className="p-4 text-slate-700 font-medium text-xs sm:text-sm">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.full
                        ? <span className="inline-flex w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 items-center justify-center font-bold text-xs" aria-label="Included">✓</span>
                        : <span className="text-slate-400 text-xs">Not included</span>}
                    </td>
                    <td className="p-4 text-center">
                      {row.accompanying
                        ? <span className="inline-flex w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 items-center justify-center font-bold text-xs" aria-label="Included">✓</span>
                        : <span className="text-slate-400 text-xs">Not included</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Conditions ─── */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Registration Guidelines & Policies</h2>
          <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3 shadow-xs">
            {[
              'Standard author registration covers one accepted abstract / paper presentation.',
              'Hybrid mode participation: Online and in-person presenters follow identical category-wise fees.',
              'Each co-author requiring an individual certificate of participation must complete registration under applicable category.',
              'Accompanying attendee category covers kit and meals without academic publication certificate.',
              'All registration fees are non-refundable once confirmed.',
              'Accommodation is available on request at AIET campus guest houses on additional booking.',
            ].map((c) => (
              <div key={c} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <svg className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm">Loading registration portal...</div>}>
      <RegistrationContent />
    </Suspense>
  );
}
