import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Tracks | IC-MEMS 2027' };

// Static fallback tracks (used when DB has no tracks yet)
const staticTracks = [
  {
    _id: 'static-1',
    trackNumber: '01',
    title: 'Advanced and Sustainable Materials',
    text: 'Energy materials, Solar cell materials, Fuel cell materials, Battery materials, Supercapacitors, Hydrogen storage materials, Thermoelectric materials, Energy harvesting materials, Smart materials, Biodegradable polymers, Green and natural fiber composites, Nanomaterials, Optical/electronic materials, Advanced coatings, Recycled and sustainable materials, Functional thin films',
  },
  {
    _id: 'static-2',
    trackNumber: '02',
    title: 'Energy Systems, Hydrogen & Sustainable Energy',
    text: 'Renewable energy, Solar energy, Wind energy, Bioenergy, Green hydrogen, Hydrogen storage, Hydrogen utilization, PEM fuel cells, Energy management, Energy efficiency, AI-enabled energy systems, Hydrogen mobility',
  },
  {
    _id: 'static-3',
    trackNumber: '03',
    title: 'Environment, Climate & Sustainable Engineering',
    text: 'Environmental engineering, Waste management, Waste-to-energy, Climate change mitigation, Carbon capture and utilization, GIS, Remote sensing, Environmental sustainability, Circular economy',
  },
  {
    _id: 'static-4',
    trackNumber: '04',
    title: 'Sustainable Management, Business & Finance',
    text: 'Sustainable business, Strategic management, Green banking, Green finance, Green marketing, ESG, Entrepreneurship, AI for sustainability, Sustainable supply chains, Circular business models, Innovation management, Technology management, CSR, Sustainable consumption, SDGs, Stakeholder management, Responsible investment, Corporate governance, Social entrepreneurship, Ethical leadership, Societal resilience, Responsible AI, Innovation, Interdisciplinary approaches',
  },
];

// Colour palette cycling for DB tracks
const PALETTE = [
  { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', icon: '⚗️' },
  { color: '#0d9488', bg: '#f0fdfa', border: '#99f6e4', icon: '⚡' },
  { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🌿' },
  { color: '#7c3aed', bg: '#faf5ff', border: '#e9d5ff', icon: '📊' },
  { color: '#db2777', bg: '#fdf2f8', border: '#fbcfe8', icon: '🔬' },
  { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', icon: '🏭' },
];

async function getTracks() {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const res = await fetch(`${baseUrl}/api/tracks`, {
      cache: 'no-store', // always fresh
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.tracks && data.tracks.length > 0 ? data.tracks : null;
  } catch {
    return null;
  }
}

export default async function TracksPage() {
  const dbTracks = await getTracks();
  // Always show the 4 original static tracks; append any admin-added DB tracks after them
  const tracks = dbTracks ? [...staticTracks, ...dbTracks] : staticTracks;

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-teal-600 transition-colors">Home</Link></li>
            <li aria-hidden><span className="mx-1">/</span></li>
            <li className="text-gray-800 font-medium">Tracks</li>
          </ol>
        </div>
      </nav>

      {/* Page header */}
      <div className="gradient-navy text-white py-20 lg:py-24 mb-6">
        <div className="container-custom">
          <span className="badge bg-white/10 text-teal-300 mb-4">Interdisciplinary Research</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Conference Tracks</h1>
          <p className="text-white/70 max-w-2xl">
            IC-MEMS 2027 covers {tracks.length} major interdisciplinary track{tracks.length !== 1 ? 's' : ''}.
            Explore the sub-topics and find where your research fits.
          </p>
          {/* Jump links */}
          <div className="flex flex-wrap gap-3 mt-8">
            {tracks.map((t: any, i: number) => (
              <a
                key={t._id}
                href={`#track-${t.trackNumber}`}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-medium transition-all border border-white/10"
              >
                Track {t.trackNumber}: {t.title.split(' ').slice(0, 3).join(' ')}…
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="container-custom max-w-5xl py-12 lg:py-16 space-y-16">
        {tracks.map((track: any, idx: number) => {
          const palette = PALETTE[idx % PALETTE.length];
          // Parse subtopics: split by comma or newline
          const subtopics = track.text
            .split(/,|\n/)
            .map((s: string) => s.trim())
            .filter(Boolean);

          return (
            <section
              key={track._id}
              id={`track-${track.trackNumber}`}
              className="scroll-mt-24"
              aria-labelledby={`heading-track-${track.trackNumber}`}
            >
              <div className="flex items-start gap-5 mb-8">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}
                  role="img"
                  aria-hidden="true"
                >
                  {palette.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: palette.color }}>
                    Track {track.trackNumber}
                  </p>
                  <h2
                    id={`heading-track-${track.trackNumber}`}
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: '#0a192f' }}
                  >
                    {track.title}
                  </h2>
                </div>
              </div>

              <div
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: palette.bg, borderColor: palette.border }}
              >
                <p className="text-sm font-semibold mb-4" style={{ color: palette.color }}>
                  Subtopics include:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
                  {subtopics.map((sub: string, si: number) => (
                    <li key={si} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ color: palette.color }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>

              {idx < tracks.length - 1 && <div className="mt-12 border-t border-gray-100" />}
            </section>
          );
        })}

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
