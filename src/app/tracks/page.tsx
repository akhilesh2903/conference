import type { Metadata } from 'next';
import Link from 'next/link';
import { getTracks } from '@/lib/tracks';
import TrackCard from '@/components/tracks/TrackCard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Tracks | IC-MEMS 2027' };

export default async function TracksPage() {
  const tracks = await getTracks();

  return (
    <div className="page-enter bg-slate-50/50 min-h-screen">
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
              IC-MEMS 2027 covers {tracks.length} major interdisciplinary {tracks.length === 1 ? 'track' : 'tracks'}. Explore the sub-topics, examine high-resolution research infographics, and find where your work aligns.
            </p>
          </div>
          {/* Jump links */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {tracks.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-medium transition-all border border-white/10 flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                Track {t.number}: {t.shortTitle}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="container-custom max-w-7xl py-8 lg:py-14 space-y-12 lg:space-y-16">
        {tracks.map((track, idx) => (
          <TrackCard key={track.id} track={track} index={idx} />
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
