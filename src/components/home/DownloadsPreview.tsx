import React from 'react';

export default function DownloadsPreview() {
  const files = [
    {
      name: 'Official Conference Brochure',
      type: 'PDF',
      size: '2.4 MB',
      description: 'Comprehensive conference overview, track scopes, patron committees, and venue guide.',
      status: 'Coming Soon',
    },
    {
      name: 'Abstract Submission Template',
      type: 'DOCX',
      size: '95 KB',
      description: 'Standard 250–300 word structured abstract template with author affiliation format.',
      status: 'Opens 16 Jan 2027',
    },
    {
      name: 'Full Manuscript Author Template',
      type: 'DOCX',
      size: '140 KB',
      description: 'Standard double-column research paper template conforming to journal guidelines.',
      status: 'Opens 16 Jul 2027',
    },
    {
      name: 'Oral Presentation Slide Template',
      type: 'PPTX',
      size: '1.2 MB',
      description: 'Standardized 16:9 widescreen presentation slide deck for technical session presentations.',
      status: 'Coming Soon',
    },
    {
      name: 'Schedule & Technical Program Matrix',
      type: 'PDF',
      size: '480 KB',
      description: 'Parallel session track distribution, keynote timings, and session chair allocations.',
      status: 'Available Sep 2027',
    },
    {
      name: 'Campus Travel & Lodging Guide',
      type: 'PDF',
      size: '1.8 MB',
      description: 'Airport transit, partner hotels in Moodbidri & Mangaluru, and local transport options.',
      status: 'Coming Soon',
    },
  ];

  return (
    <section
      className="py-20 bg-white border-b border-slate-200 relative overflow-hidden"
      aria-label="Author Resources and Downloads"
    >
      {/* ── Background Conference Watermark Icons ── */}
      {/* 1. Academic Research Manuscript / Folder Watermark (Top Right) */}
      <div className="absolute -top-10 -right-10 w-80 h-80 pointer-events-none opacity-[0.045] text-teal-800 animate-float-a" aria-hidden>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
          <path d="M25 15 H65 L85 35 V85 H25 Z" rx="2" />
          <polyline points="65,15 65,35 85,35" />
          <line x1="38" y1="48" x2="72" y2="48" />
          <line x1="38" y1="60" x2="72" y2="60" />
          <line x1="38" y1="72" x2="58" y2="72" />
        </svg>
      </div>

      {/* 2. Download / Cloud Repository Watermark (Bottom Left) */}
      <div className="absolute -bottom-10 -left-10 w-80 h-80 pointer-events-none opacity-[0.035] text-teal-900 animate-float-b" aria-hidden>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
          <path d="M25 65 A18 18 0 0 1 38 32 A24 24 0 0 1 72 35 A16 16 0 0 1 80 65 Z" />
          <polyline points="42,55 50,63 58,55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="50" y1="42" x2="50" y2="63" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* 3. Subtle Dot Matrix Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        aria-hidden
        style={{
          backgroundImage: 'radial-gradient(#0d9488 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container-custom relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold tracking-wider uppercase mb-3">
              Author Resources
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a192f] tracking-tight">
              Downloads &amp; Templates
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2 leading-relaxed">
              Official document templates, author guidelines, and event literature will be hosted here for researchers and registered delegates.
            </p>
          </div>

          <a
            href="/for-authors#downloads"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-colors shadow-xs shrink-0"
          >
            Author Guidelines &amp; Formatting Rules &rarr;
          </a>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-teal-400 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded text-[11px] font-black uppercase tracking-wider ${
                    file.type === 'PDF'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : file.type === 'DOCX'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {file.type} &bull; {file.size}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200/80">
                    {file.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0a192f] mb-2 leading-snug">
                  {file.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {file.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>AIET Official Document</span>
                <span className="text-teal-700 font-semibold">Available via Portal</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
