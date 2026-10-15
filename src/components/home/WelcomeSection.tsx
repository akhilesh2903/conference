import Link from 'next/link';
import { FormattedTrack, getTracks } from '@/lib/tracks';

interface WelcomeSectionProps {
  tracks?: FormattedTrack[];
}

export default async function WelcomeSection({ tracks: propTracks }: WelcomeSectionProps) {
  const tracks = propTracks || (await getTracks());

  const pillars = [
    {
      title: 'Scopus-Indexed Publication',
      desc: 'Selected accepted and presented papers will be published in Scopus-indexed partner journals following rigorous two-round peer review.',
      icon: (
        <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      tag: 'Academic Credibility'
    },
    {
      title: 'Interdisciplinary Synthesis',
      desc: 'Connects breakthrough materials discovery and green energy technologies with ESG frameworks, corporate strategy, and public policy.',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      tag: '4 Core Tracks'
    },
    {
      title: 'Global Hybrid Flexibility',
      desc: 'Presents in-person at the scenic AIET campus in Moodbidri or virtually via live interactive digital presentation streams.',
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      tag: 'Worldwide Participation'
    },
    {
      title: 'Distinguished Host Institution',
      desc: 'Hosted by AIET Moodbidri, a flagship center of excellence with premier laboratories, green campus, and active research culture.',
      icon: (
        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      tag: 'AIET Moodbidri'
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200" aria-label="About IC-MEMS 2027">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Academic Introduction */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-semibold tracking-wider uppercase">
              About The Conference
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight leading-tight">
              Welcome to <span className="text-teal-700">IC-MEMS 2027</span>
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                The <strong className="text-[#0a192f]">International Conference on Materials, Energy and Management for Sustainability (IC-MEMS 2027)</strong>, hosted by <strong className="text-[#0a192f]">Alva&rsquo;s Institute of Engineering and Technology (AIET)</strong> in Moodbidri, Karnataka, will convene global researchers on <span className="text-teal-700 font-semibold">16 to 18 September 2027</span> in hybrid mode.
              </p>
              <p>
                Addressing climate change, resource scarcity, and clean energy transition demands an interdisciplinary synthesis. IC-MEMS 2027 brings together researchers, engineers, scientists, and management scholars to translate frontier materials discoveries and renewable energy technologies into actionable, sustainable enterprise models.
              </p>
              <p>
                The conference features keynote addresses by leading international scholars, parallel peer-reviewed technical paper presentations, poster symposiums, and industrial panel dialogues.
              </p>
            </div>

            {/* Quick Track Badges */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Interdisciplinary Tracks Covered
              </p>
              <div className="flex flex-wrap gap-2">
                {tracks.map((t) => (
                  <Link
                    key={t.id}
                    href={`/tracks#${t.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-200 text-slate-700 hover:text-teal-800 text-xs font-medium transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    {t.shortTitle}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a192f] hover:bg-[#163560] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                About Conference & AIET
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/tracks"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-teal-500 hover:text-teal-700 bg-white text-slate-700 text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                Explore Call for Tracks
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Conference Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                      {pillar.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0a192f] leading-snug mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Bottom Highlights Card Spanning 2 cols */}
            <div className="sm:col-span-2 p-5 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-teal-900 uppercase tracking-wide">Hybrid Accessibility</div>
                  <div className="text-xs text-teal-800">Authors unable to travel can present via virtual interactive sessions</div>
                </div>
              </div>
              <Link
                href="/registration"
                className="text-xs font-bold text-teal-800 hover:text-teal-950 underline shrink-0"
              >
                Registration Details &rarr;
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
