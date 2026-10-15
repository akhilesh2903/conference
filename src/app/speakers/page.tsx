import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Speakers | IC-MEMS 2027' };

export default function SpeakersPage() {
  return (
    <div className="page-enter">
      <div className="gradient-navy text-white pt-8 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
              <li><Link href="/" className="hover:text-teal-300 transition-colors">Home</Link></li>
              <li><span className="mx-1 text-slate-600">/</span></li>
              <li className="text-slate-200 font-medium">Speakers</li>
            </ol>
          </nav>

          <div className="text-center">
            <span className="badge bg-white/10 text-teal-300 mb-3 sm:mb-4">Keynote Speakers</span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Speakers</h1>
            <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto px-2 sm:px-0">Distinguished researchers and practitioners will be announced soon.</p>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-12 sm:py-20 md:py-24 text-center">
        {/* Placeholder state */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border-2 border-dashed border-gray-200 p-6 sm:p-10 flex flex-col items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl sm:text-3xl">
                👤
              </div>
              <div className="space-y-2 w-full">
                <div className="h-3 rounded-full bg-gray-100 w-2/3 mx-auto" />
                <div className="h-2.5 rounded-full bg-gray-100 w-1/2 mx-auto" />
                <div className="h-2 rounded-full bg-gray-100 w-3/4 mx-auto" />
              </div>
            </div>
          ))}
        </div>

        <div className="inline-flex flex-col items-center gap-4 p-5 sm:p-8 rounded-2xl bg-amber-50 border border-amber-200 max-w-md mx-auto">
          <div className="text-3xl sm:text-4xl">📢</div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-amber-900 mb-2">Speakers To Be Announced</h2>
            <p className="text-amber-700 text-xs sm:text-sm leading-relaxed">
              Confirmed keynote and invited speakers will be announced soon. Check back for updates.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-gray-500 text-sm mb-4">Stay updated — contact the organising committee</p>
          <a
            href="mailto:icmems2027@gmail.com"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors"
          >
            icmems2027@gmail.com
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
