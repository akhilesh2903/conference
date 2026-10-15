import type { Metadata } from 'next';
import Link from 'next/link';
import ReviewProcessTimeline from '@/components/publication/ReviewProcessTimeline';

export const metadata: Metadata = {
  title: 'Publication | IC-MEMS 2027',
  description: 'Publication details and peer review process for IC-MEMS 2027.',
};

export default function PublicationPage() {
  return (
    <div className="page-enter bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <header className="gradient-navy text-white pt-8 pb-16 px-4">
        <div className="container-custom max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-teal-300 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li className="text-slate-200 font-medium">Publication</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-4">
              Research Output
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Publication
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Selected papers will be considered for publication in Scopus-indexed journals.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="container-custom max-w-4xl py-12 md:py-16 space-y-10">
        {/* Main Statement */}
        <div className="rounded-2xl bg-white border border-teal-200/90 p-8 sm:p-10 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-blue-600" />
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl shadow-xs">
            📚
          </div>
          <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed max-w-2xl mx-auto">
            Selected papers will be published in{' '}
            <span className="text-teal-700 font-bold">Scopus-indexed journals</span>{' '}
            following two rounds of review and acceptance by the conference editorial board.
          </p>
        </div>

        {/* Journal Details Placeholder */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 sm:p-7 shadow-xs flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-xl flex-shrink-0 text-amber-900">
            📋
          </div>
          <div>
            <h2 className="text-base font-bold text-amber-950 mb-1">Journal Details</h2>
            <p className="text-amber-900/90 text-xs sm:text-sm leading-relaxed">
              Journal details will be announced after final confirmation. No journal names or timelines are published at this stage.
            </p>
          </div>
        </div>

        {/* Review Process with Scroll Animation */}
        <section className="pt-4">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
              Review Process
            </h2>
            <div className="w-12 h-1 bg-teal-500 mx-auto mt-2.5 rounded-full" />
          </div>

          <ReviewProcessTimeline />
        </section>

        {/* Important Notes */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-base font-bold text-[#0a192f] mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Important Notes
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-teal-600 font-bold mt-0.5">•</span>
              <span>Papers must be original and unpublished.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-teal-600 font-bold mt-0.5">•</span>
              <span>All submitted papers will undergo rigorous editorial review.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-teal-600 font-bold mt-0.5">•</span>
              <span>Authors of accepted abstracts must submit full papers through the AIET portal.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-teal-600 font-bold mt-0.5">•</span>
              <span>Publication in conference proceedings is subject to conference registration and presentation.</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
