import Link from 'next/link';

export default function PublicationHighlight() {
  const steps = [
    { num: '01', title: 'Technical Screening', desc: 'Plagiarism & format check' },
    { num: '02', title: 'Double-Blind Review', desc: 'Two independent reviewers' },
    { num: '03', title: 'Author Revisions', desc: 'Addressing reviewer comments' },
    { num: '04', title: 'Editorial Decision', desc: 'Acceptance by committee' },
    { num: '05', title: 'Scopus Submission', desc: 'Partner journal indexing' },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200 relative overflow-hidden" aria-label="Publication & Proceedings">
      {/* ── Background Conference Watermark Icons ── */}
      {/* 1. Academic Journal / Open Book Watermark (Top Right) */}
      <div className="absolute -top-12 -right-12 w-80 h-80 pointer-events-none opacity-[0.045] text-teal-800 animate-float-a" aria-hidden>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
          <path d="M50 30 C35 22, 15 24, 10 26 V78 C15 76, 35 74, 50 82 C65 74, 85 76, 90 78 V26 C85 24, 65 22, 50 30 Z" />
          <line x1="50" y1="30" x2="50" y2="82" />
        </svg>
      </div>

      <div className="container-custom relative">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden text-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left 7 Columns: Scopus Publication Highlight */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold uppercase tracking-wider mb-6">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  Publication Opportunities
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight mb-4 leading-tight">
                  Conference Proceedings &amp; Scopus-Indexed Journals
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  All accepted, registered, and presented papers will be eligible for publication in the conference proceedings. Selected high-quality papers will be recommended for publication in <strong className="text-teal-700 font-bold">Scopus-indexed partner journals</strong> following two rounds of rigorous peer review and approval by the conference editorial board.
                </p>

                {/* Key publication features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90">
                    <div className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">Peer Review</div>
                    <div className="text-sm font-semibold text-[#0a192f]">Double-Blind Evaluation</div>
                    <p className="text-xs text-slate-500 mt-1">Independent assessment by international subject experts</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Integrity Policy</div>
                    <div className="text-sm font-semibold text-[#0a192f]">Strict Similarity Check</div>
                    <p className="text-xs text-slate-500 mt-1">Plagiarism screened via Turnitin / iThenticate</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/publication"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
                >
                  Full Publication Guidelines
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <span className="text-xs text-slate-500">
                  Journal titles announced upon final agreement confirmation.
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Review Workflow Pipeline */}
            <div className="lg:col-span-5 p-8 md:p-12 bg-slate-50/70 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-[#0a192f] mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Editorial &amp; Review Pipeline
              </h3>

              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="flex flex-col items-center">
                      <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-teal-700 shadow-xs flex items-center justify-center text-xs font-black shrink-0">
                        {step.num}
                      </span>
                      {idx < steps.length - 1 && (
                        <div className="w-0.5 h-6 bg-slate-200 my-1" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 leading-relaxed">
                <strong>Publication Ethics:</strong> Manuscripts submitted must be original, unpublished, and not under concurrent consideration in any other conference or journal.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
