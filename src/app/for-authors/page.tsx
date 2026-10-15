import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'For Authors | IC-MEMS 2027' };

export default function ForAuthorsPage() {
  return (
    <div className="page-enter bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <header className="gradient-navy text-white pt-8 pb-16 px-4">
        <div className="container-custom max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-teal-300 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li className="text-slate-200 font-semibold">For Authors</li>
            </ol>
          </nav>

          <div className="text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-4">
              Author Guidance
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              For Authors
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Everything you need to submit your abstract and full paper to IC-MEMS 2027.
            </p>
          </div>

          {/* Jump links */}
          <div className="flex flex-wrap gap-2.5 mt-8 justify-center">
            {['call-for-papers', 'abstract-requirements', 'submission', 'full-paper', 'downloads'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 transition-all capitalize"
              >
                {id.replace(/-/g, ' ')}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom max-w-4xl py-12 md:py-16 space-y-12">
        {/* Call for Papers */}
        <section id="call-for-papers" className="scroll-mt-24 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0a192f] mb-4">Call for Papers</h2>
          <div className="rounded-xl bg-teal-50/60 border border-teal-100 p-6">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-5">
              Original and unpublished theoretical, experimental, computational, technological or applied research contributions are invited across all four conference themes:
            </p>
            <div className="space-y-3">
              {[
                'Advanced and Sustainable Materials',
                'Energy Systems, Hydrogen & Sustainable Energy',
                'Environment, Climate & Sustainable Engineering',
                'Sustainable Management, Business & Finance',
              ].map((t, i) => (
                <div key={t} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-teal-100">
                  <span className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-800 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-slate-800 text-sm font-semibold">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Abstract Requirements */}
        <section id="abstract-requirements" className="scroll-mt-24 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0a192f] mb-6">Abstract Requirements</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              ['📝', 'Word Count', '250–300 words'],
              ['🎯', 'Include', 'Objective, Methodology, Key Findings, Contribution'],
              ['🔑', 'Keywords', '3–5 keywords required'],
              ['📅', 'Deadline', '16 June 2027'],
              ['📬', 'Notification', '30 June 2027'],
              ['🗂️', 'Theme', 'Select relevant conference theme'],
            ].map(([icon, label, value]) => (
              <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xl shrink-0" role="img" aria-hidden="true">{icon}</span>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-bold text-[#0a192f] mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-blue-50/70 border border-blue-200/80 p-5 sm:p-6">
            <h3 className="font-bold text-blue-950 mb-3 text-sm">Author Information Required</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-blue-900">
              {[
                'Full Name',
                'Designation',
                'Institution',
                'Country',
                'Email',
                'Contact Number',
                'Co-authors (if any)',
                'Corresponding Author',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Abstract Submission */}
        <section id="submission" className="scroll-mt-24 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0a192f] mb-6">Abstract Submission</h2>
          <div className="rounded-xl border border-teal-200 bg-teal-50/70 p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-xl shrink-0">
              📝
            </div>
            <div>
              <h3 className="font-bold text-teal-950 mb-1 text-base">Direct Text Entry Method</h3>
              <p className="text-teal-900/90 text-xs sm:text-sm leading-relaxed">
                The abstract submission system supports direct text entry. Enter your abstract title, body text, keywords and author details directly in the online form on the AIET portal.
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-4 text-center">
            Submission portal opens 16 June 2027. Check back for updates.
          </p>
        </section>

        {/* Full Paper */}
        <section id="full-paper" className="scroll-mt-24 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0a192f] mb-6">Full Paper Submission</h2>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-wrap gap-8 mb-6">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Opens</p>
                <p className="text-lg font-bold text-[#0a192f]">16 July 2027</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Closes</p>
                <p className="text-lg font-bold text-[#0a192f]">31 July 2027</p>
              </div>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
              <p className="text-amber-900 text-xs sm:text-sm leading-relaxed">
                <strong>Full-paper formatting and presentation guidelines will be updated after final confirmation.</strong> Authors of accepted abstracts will receive detailed instructions.
              </p>
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section id="downloads" className="scroll-mt-24 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0a192f] mb-6">Downloads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Conference Brochure', type: 'PDF', icon: '📕' },
              { name: 'Abstract Template', type: 'DOCX', icon: '📝' },
              { name: 'Full Paper Template', type: 'DOCX', icon: '📄' },
              { name: 'Programme', type: 'PDF', icon: '📅' },
              { name: 'Presentation Template', type: 'PPTX', icon: '🖥️' },
            ].map((file) => (
              <div key={file.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center gap-3">
                <span className="text-2xl shrink-0" role="img" aria-hidden="true">{file.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-xs sm:text-sm truncate">{file.name}</p>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 mt-1">
                    {file.type}
                  </span>
                </div>
                <button
                  disabled
                  title="File not yet available"
                  className="text-[11px] px-2.5 py-1 rounded bg-slate-200 text-slate-500 cursor-not-allowed font-medium shrink-0"
                  aria-label={`${file.name} — not yet available`}
                >
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-4 text-center">
            Files will be made available as they are finalised.
          </p>
        </section>
      </main>
    </div>
  );
}
