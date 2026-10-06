'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const fees = [
  { category: 'Research Scholars / Postgraduate Students', amount: '₹6,000', currency: 'INR', icon: '🎓' },
  { category: 'Faculty / Academicians', amount: '₹8,000', currency: 'INR', icon: '👩‍🏫' },
  { category: 'Industry / R&D Participants', amount: '₹10,000', currency: 'INR', icon: '🏭' },
  { category: 'International Participants', amount: 'USD 200', currency: 'USD', icon: '🌐' },
  { category: 'Accompanying Attendee Without Certificate', amount: '₹4,000', currency: 'INR', icon: '👥' },
];

const comparison = [
  { feature: 'Conference Attendance', full: true, accompanying: true },
  { feature: 'Conference Kit', full: true, accompanying: true },
  { feature: 'Certificate of Participation', full: true, accompanying: false },
  { feature: 'Lunch & Refreshments', full: true, accompanying: true },
  { feature: 'Accommodation', full: false, accompanying: false },
];

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    institution: '',
    category: fees[0].category,
    presentationType: 'Oral Presenter',
    paperId: '',
    paymentReference: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [registeredName, setRegisteredName] = useState('');

  useEffect(() => {
    if (localStorage.getItem('isRegistered') === 'true') {
      setSubmitSuccess(true);
      setRegisteredName(localStorage.getItem('registeredName') || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('registeredName');
    window.dispatchEvent(new Event('registrationStatusChanged'));
    setSubmitSuccess(false);
    setRegisteredName('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = { error: "Server error: Check if MONGODB_URI is properly configured." };
      }

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('registeredName', formData.fullName);
      window.dispatchEvent(new Event('registrationStatusChanged'));
      setRegisteredName(formData.fullName);
      setSubmitSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-enter">
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-gray-800 font-medium">Registration</li>
          </ol>
        </div>
      </nav>

      <div className="gradient-navy text-white py-16">
        <div className="container-custom">
          <span className="badge bg-white/10 text-teal-300 mb-4">Join IC-MEMS 2027</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Registration</h1>
          <div className="flex flex-wrap gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Status: Open
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-5xl py-16 space-y-16">
        
        {/* Registration Form Section */}
        <section id="registration-form" aria-labelledby="form-heading">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 id="form-heading" className="text-2xl font-bold mb-6" style={{ color: '#0a192f' }}>Submit Registration</h2>
            
            {submitSuccess ? (
              <div className="bg-teal-50 border border-teal-200 text-teal-800 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">Registration Successful</h3>
                <p className="mb-6">Thank you for registering for IC-MEMS 2027, {registeredName}. We have received your details.</p>
                <button onClick={handleLogout} className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium">Log out</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
                    {errorMsg}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Dr. Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="+91 9876543210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution/Organization *</label>
                    <input required type="text" name="institution" value={formData.institution} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="University of Example" />
                  </div>
                  <div className="md:col-span-2 text-sm text-gray-500 italic">
                    Note: Payment gateway is not yet integrated. Please mention your offline payment reference below if available.
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Category *</label>
                    <select required name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
                      {fees.map(fee => (
                        <option key={fee.category} value={fee.category}>{fee.category} - {fee.amount}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type of Participation *</label>
                    <select required name="presentationType" value={formData.presentationType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none">
                      <option value="Oral Presenter">Oral Presenter</option>
                      <option value="Poster Presenter">Poster Presenter</option>
                      <option value="Attendee Only">Attendee Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Paper ID (If presenting)</label>
                    <input type="text" name="paperId" value={formData.paperId} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g. ICMEMS-1024" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Reference Number</label>
                    <input type="text" name="paymentReference" value={formData.paymentReference} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g. UPI/Bank Reference" />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : 'Register Now'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Registration Fee Table */}
        <section aria-labelledby="fees-heading">
          <h2 id="fees-heading" className="text-2xl font-bold mb-2" style={{ color: '#0a192f' }}>Registration Fees</h2>
          <p className="text-gray-500 text-sm mb-6">No early-bird pricing. Fixed category-wise fees apply.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fees.map((fee) => (
              <div key={fee.category} className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-teal-300 hover:shadow-md transition-all flex flex-col">
                <div className="text-3xl mb-4" role="img" aria-hidden="true">{fee.icon}</div>
                <p className="text-sm text-gray-600 font-medium leading-snug mb-4 flex-1">{fee.category}</p>
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-2xl font-bold" style={{ color: '#0a192f' }}>{fee.amount}</span>
                  <span className="text-xs text-gray-400 font-medium">{fee.currency}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Important conditions */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0a192f' }}>Registration Conditions</h2>
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 space-y-3">
            {[
              'Standard author registration covers one paper and one presenting author.',
              'Online and in-person presenters pay the same category-wise fee.',
              'Each co-author requiring a certificate must pay the full applicable category fee.',
              'Accompanying attendee category does not include a certificate.',
              'Registration fees are non-refundable.',
              'Accommodation is not included in the registration fee.',
            ].map((c) => (
              <div key={c} className="flex items-start gap-3 text-sm text-gray-700">
                <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {c}
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0a192f' }}>Inclusions Comparison</h2>
          <div className="table-responsive">
            <table className="w-full text-sm border-collapse rounded-2xl overflow-hidden border border-gray-200">
              <thead>
                <tr className="bg-[#0a192f] text-white">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold">Full Author Registration</th>
                  <th className="p-4 text-center font-semibold">Accompanying Attendee</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 text-gray-700 font-medium">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.full
                        ? <span className="text-teal-600 text-lg" aria-label="Included">✓</span>
                        : <span className="text-red-400 text-sm text-gray-400" aria-label="Not included">Not included</span>}
                    </td>
                    <td className="p-4 text-center">
                      {row.accompanying
                        ? <span className="text-teal-600 text-lg" aria-label="Included">✓</span>
                        : <span className="text-gray-400 text-sm" aria-label="Not included">Not included</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
