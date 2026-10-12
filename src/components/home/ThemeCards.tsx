import Link from 'next/link';
import { FormattedTrack, getTracks } from '@/lib/tracks';

interface ThemeCardsProps {
  tracks?: FormattedTrack[];
}

export default async function ThemeCards({ tracks: propTracks }: ThemeCardsProps) {
  const tracks = propTracks || (await getTracks());

  return (
    <section className="section-padding bg-white" aria-label="Conference tracks">
      <div className="container-custom">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="badge bg-teal-50 text-teal-700 mb-3">Interdisciplinary Research</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0a192f' }}>
            Conference Tracks
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            IC-MEMS 2027 covers {tracks.length} major interdisciplinary {tracks.length === 1 ? 'track' : 'tracks'} bridging materials science, energy engineering, environmental sustainability and management.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {tracks.map((theme) => (
            <div
              key={theme.id}
              className="group relative rounded-2xl border p-8 card-hover"
              style={{
                backgroundColor: theme.bg,
                borderColor: theme.border,
              }}
            >
              {/* Number + icon row */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[0.65rem] font-extrabold tracking-wider shadow-sm"
                    style={{ backgroundColor: 'white' }}
                    aria-hidden="true"
                  >
                    {theme.shortIcon}
                  </span>
                  <span
                    className="text-4xl font-black leading-none select-none"
                    style={{ color: theme.accent, opacity: 0.25 }}
                  >
                    {theme.number}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-3 leading-snug" style={{ color: '#0a192f' }}>
                {theme.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                {theme.description}
              </p>

              {/* CTA */}
              <Link
                href={`/tracks#${theme.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: theme.accent }}
                aria-label={`Explore ${theme.title}`}
              >
                Explore Track
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/tracks"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0a192f] hover:bg-[#163560] text-white font-semibold transition-all hover:-translate-y-0.5 shadow-lg"
          >
            View All Tracks & Subtopics
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
