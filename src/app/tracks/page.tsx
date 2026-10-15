import type { Metadata } from 'next';
import Link from 'next/link';
import { getTracks } from '@/lib/tracks';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Tracks | IC-MEMS 2027' };

export default async function TracksPage() {
  const tracks = await getTracks();

  return (
    <div className="page-enter">
      {/* Page header */}
      <div className="gradient-navy text-white pt-8 pb-16 lg:pb-20 mb-6">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
              <li><Link href="/" className="hover:text-teal-300 transition-colors">Home</Link></li>
              <li aria-hidden><span className="mx-1 text-slate-600">/</span></li>
              <li className="text-slate-200 font-medium">Tracks</li>
            </ol>
          </nav>

          <div className="text-center">
            <span className="badge bg-white/10 text-teal-300 mb-4">Interdisciplinary Research</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Conference Tracks</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              IC-MEMS 2027 covers {tracks.length} major interdisciplinary {tracks.length === 1 ? 'track' : 'tracks'}. Explore the sub-topics and find where your research fits.
            </p>
          </div>
          {/* Jump links */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {tracks.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-medium transition-all border border-white/10"
              >
                Track {t.number}: {t.shortTitle}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="container-custom max-w-5xl py-12 lg:py-16 space-y-16">
        {tracks.map((track, idx) => (
          <section
            key={track.id}
            id={track.id}
            className="scroll-mt-24"
            aria-labelledby={`heading-${track.id}`}
          >
            <div className="flex items-start gap-5 mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm"
                style={{ backgroundColor: track.bg, border: `1px solid ${track.border}` }}
                role="img" aria-hidden="true"
              >
                {track.icon}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: track.color }}>
                  Track {track.number}
                </p>
                <h2
                  id={`heading-${track.id}`}
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: '#0a192f' }}
                >
                  {track.title}
                </h2>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: track.bg, borderColor: track.border }}
            >
              <p className="text-sm font-semibold mb-4" style={{ color: track.color }}>
                Subtopics & Scope:
              </p>
              {track.subtopics.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
                  {track.subtopics.map((sub, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: track.color }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {track.description || 'Details and subtopics will be announced soon.'}
                </p>
              )}
            </div>

            {idx < tracks.length - 1 && <div className="mt-12 border-t border-gray-100" />}
          </section>
        ))}

        {/* Call to action */}
        <div className="rounded-2xl gradient-navy p-8 md:p-10 text-white text-center">
          <h3 className="text-xl font-bold mb-3">Ready to Submit Your Abstract?</h3>
          <p className="text-white/70 text-sm mb-6">Abstract submission opens 16 June 2027. Prepare your 250–300 word abstract.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/for-authors" className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm transition-all">
              For Authors
            </Link>
            <Link href="/important-dates" className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm transition-all border border-white/10">
              Important Dates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
