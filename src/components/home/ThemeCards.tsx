import Link from 'next/link';
import { FormattedTrack, getTracks } from '@/lib/tracks';

interface ThemeCardsProps {
  tracks?: FormattedTrack[];
}

export default async function ThemeCards({ tracks: propTracks }: ThemeCardsProps) {
  const tracks = propTracks || (await getTracks());

  return (
    <section className="py-20 bg-slate-50/60 border-b border-slate-200" aria-label="Conference Tracks">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-semibold tracking-wider uppercase mb-3">
            Interdisciplinary Scope
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a192f] tracking-tight">
            Conference Tracks & Call for Papers
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-3 leading-relaxed">
            IC-MEMS 2027 invites original research papers across {tracks.length} core interdisciplinary tracks connecting engineering materials, clean energy systems, environmental technology, and sustainable governance.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {tracks.map((theme) => (
            <div
              key={theme.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Infographic Preview Banner */}
              {theme.image && (
                <Link
                  href={`/tracks#${theme.id}`}
                  className="relative block w-full aspect-[16/9] overflow-hidden bg-slate-50 border-b border-slate-200/90 group/thumb cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={theme.image}
                    alt={theme.imageAlt || theme.title}
                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover/thumb:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Track Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-xs">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }} />
                    Track {theme.rawNumber}
                  </div>
                </Link>
              )}

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  {/* Track header (if no image or secondary header) */}
                  {!theme.image && (
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#0a192f] border border-slate-200">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }} />
                        Track {theme.rawNumber}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        Peer-Reviewed Scope
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-[#0a192f] mb-3 group-hover:text-teal-700 transition-colors leading-snug">
                    {theme.title}
                  </h3>

                {/* Description */}
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-5 line-clamp-3">
                  {theme.description}
                </p>

                {/* Subtopics Pills */}
                {theme.subtopics && theme.subtopics.length > 0 && (
                  <div className="mb-6">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Key Topics Preview
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {theme.subtopics.slice(0, 5).map((topic, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-50 border border-slate-200 text-slate-600"
                        >
                          {topic}
                        </span>
                      ))}
                      {theme.subtopics.length > 5 && (
                        <span className="px-2 py-1 rounded-md text-[11px] font-semibold text-teal-700 bg-teal-50">
                          +{theme.subtopics.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <Link
                  href={`/tracks#${theme.id}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors"
                >
                  View Full Track Topics & CFP
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/for-authors#call-for-papers"
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  Submit Abstract &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/tracks"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0a192f] hover:bg-[#163560] text-white text-xs sm:text-sm font-semibold transition-all hover:shadow-md"
          >
            Explore Complete Track Directory & Subtopics
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
