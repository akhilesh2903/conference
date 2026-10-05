import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'For Authors | IC-MEMS 2027' };

export default function ForAuthorsPage() {
  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-gray-800 font-medium">For Authors</li>
          </ol>
        </div>
      </nav>

      <div className="gradient-navy text-white py-16">
        <div className="container-custom">
          <span className="badge bg-white/10 text-teal-300 mb-4">Author Guidance</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">For Authors</h1>
          <p className="text-white/70 max-w-2xl">Everything you need to submit your abstract and full paper to IC-MEMS 2027.</p>
          {/* Jump links */}
          <div className="flex flex-wrap gap-3 mt-8">
            {['call-for-papers', 'abstract-requirements', 'submission', 'full-paper', 'downloads'].map((id) => (
              <a key={id} href={`#${id}`} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs font-medium border border-white/10 transition-all capitalize">
                {id.replace(/-/g, ' ')}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-16 space-y-16">
        {/* Call for Papers */}
        <section id="call-for-papers" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0a192f' }}>Call for Papers</h2>
          <div className="rounded-2xl bg-teal-50 border border-teal-200 p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Original and unpublished theoretical, experimental, computational, technological or applied research contributions are invited across all four conference themes:
            </p>
            {['Advanced and Sustainable Materials', 'Energy Systems, Hydrogen & Sustainable Energy', 'Environment, Climate & Sustainable Engineering', 'Sustainable Management, Business & Finance'].map((t, i) => (
              <div key={t} className="flex items-center gap-3 py-2.5 border-b border-teal-100 last:border-0">
                <span className="w-7 h-7 rounded-lg bg-teal-200 flex items-center justify-center text-xs font-bold text-teal-800">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-gray-700 text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Abstract Requirements */}
        <section id="abstract-requirements" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0a192f' }}>Abstract Requirements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              ['📝', 'Word Count', '250–300 words'],
              ['🎯', 'Include', 'Objective, Methodology, Key Findings, Contribution'],
              ['🔑', 'Keywords', '3–5 keywords required'],
              ['📅', 'Deadline', '16 June 2027'],
              ['📬', 'Notification', '30 June 2027'],
              ['🗂️', 'Theme', 'Select relevant conference theme'],
            ].map(([icon, label, value]) => (
              <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
                  <p className="text-sm text-gray-800 font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-blue-50 border border-blue-100 p-5">
            <h3 className="font-semibold text-blue-900 mb-3">Author Information Required</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
              {['Full Name', 'Designation', 'Institution', 'Country', 'Email', 'Contact Number', 'Co-authors (if any)', 'Corresponding Author'].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submission */}
        <section id="submission" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0a192f' }}>Abstract Submission</h2>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 mb-6 flex gap-4">
            <div className="text-3xl flex-shrink-0">ℹ️</div>
            <div>
              <h3 className="font-bold text-amber-900 mb-1">Submission Method</h3>
              <p className="text-amber-800 text-sm">The exact abstract submission method is being finalised. The system will support either direct text entry or Word document upload. Details will be updated once confirmed.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-bold mb-2" style={{ color: '#0a192f' }}>Option A: Text Entry</h3>
              <p className="text-sm text-gray-600">Enter your abstract title, body text, keywords and author details directly in the online form on the AIET portal.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="font-bold mb-2" style={{ color: '#0a192f' }}>Option B: File Upload</h3>
              <p className="text-sm text-gray-600">Upload your abstract as a Word document using the provided template from the Downloads section through the AIET portal.</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">Submission portal opens 16 June 2027. Check back for updates.</p>
        </section>

        {/* Full Paper */}
        <section id="full-paper" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0a192f' }}>Full Paper Submission</h2>
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-8">
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Opens</p>
                <p className="font-bold text-gray-900">16 July 2027</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Closes</p>
                <p className="font-bold text-gray-900">31 July 2027</p>
              </div>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-amber-800 text-sm">
                <strong>Full-paper formatting and presentation guidelines will be updated after final confirmation.</strong> Authors of accepted abstracts will receive detailed instructions.
              </p>
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section id="downloads" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0a192f' }}>Downloads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Conference Brochure', type: 'PDF', icon: '📕' },
              { name: 'Abstract Template', type: 'DOCX', icon: '📝' },
              { name: 'Full Paper Template', type: 'DOCX', icon: '📄' },
              { name: 'Programme', type: 'PDF', icon: '📅' },
              { name: 'Presentation Template', type: 'PPTX', icon: '🖥️' },
            ].map((file) => (
              <div key={file.name} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 flex items-center gap-4">
                <span className="text-3xl flex-shrink-0" role="img" aria-hidden="true">{file.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{file.name}</p>
                  <span className="badge bg-gray-200 text-gray-600 text-[10px] mt-1">{file.type}</span>
                </div>
                <button
                  disabled
                  title="File not yet available"
                  className="text-xs px-3 py-1.5 rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed"
                  aria-label={`${file.name} — not yet available`}
                >
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">Files will be made available as they are finalised.</p>
        </section>
      </div>
    </div>
  );
}
