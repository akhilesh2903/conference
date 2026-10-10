import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Tracks | IC-MEMS 2027' };

const tracks = [
  {
    id: 'track-1',
    number: '01',
    title: 'Advanced and Sustainable Materials',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    icon: '⚗️',
    subtopics: [
      'Energy materials', 'Solar cell materials', 'Fuel cell materials',
      'Battery materials', 'Supercapacitors', 'Hydrogen storage materials',
      'Thermoelectric materials', 'Energy harvesting materials', 'Smart materials',
      'Biodegradable polymers', 'Green and natural fiber composites', 'Nanomaterials',
      'Optical/electronic materials', 'Advanced coatings', 'Recycled and sustainable materials',
      'Functional thin films',
    ],
  },
  {
    id: 'track-2',
    number: '02',
    title: 'Energy Systems, Hydrogen & Sustainable Energy',
    color: '#0d9488',
    bg: '#f0fdfa',
    border: '#99f6e4',
    icon: '⚡',
    subtopics: [
      'Renewable energy', 'Solar energy', 'Wind energy', 'Bioenergy',
      'Green hydrogen', 'Hydrogen storage', 'Hydrogen utilization',
      'PEM fuel cells', 'Energy management', 'Energy efficiency',
      'AI-enabled energy systems', 'Hydrogen mobility',
    ],
  },
  {
    id: 'track-3',
    number: '03',
    title: 'Environment, Climate & Sustainable Engineering',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    icon: '🌿',
    subtopics: [
      'Environmental engineering', 'Waste management', 'Waste-to-energy',
      'Climate change mitigation', 'Carbon capture and utilization', 'GIS',
      'Remote sensing', 'Environmental sustainability', 'Circular economy',
    ],
  },
  {
    id: 'track-4',
    number: '04',
    title: 'Sustainable Management, Business & Finance',
    color: '#7c3aed',
    bg: '#faf5ff',
    border: '#e9d5ff',
    icon: '📊',
    subtopics: [
      'Sustainable business', 'Strategic management', 'Green banking', 'Green finance',
      'Green marketing', 'ESG', 'Entrepreneurship', 'AI for sustainability',
      'Sustainable supply chains', 'Circular business models', 'Innovation management',
      'Technology management', 'CSR', 'Sustainable consumption', 'SDGs',
      'Stakeholder management', 'Responsible investment', 'Corporate governance',
      'Social entrepreneurship', 'Ethical leadership', 'Societal resilience',
      'Responsible AI', 'Innovation', 'Interdisciplinary approaches',
    ],
  },
];

export default function TracksPage() {
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
            IC-MEMS 2027 covers four major interdisciplinary tracks. Explore the sub-topics and find where your research fits.
          </p>
          {/* Jump links */}
          <div className="flex flex-wrap gap-3 mt-8">
            {tracks.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-medium transition-all border border-white/10"
              >
                Track {t.number}: {t.title.split(' ').slice(0, 3).join(' ')}…
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
                Subtopics include:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
                {track.subtopics.map((sub) => (
                  <li key={sub} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: track.color }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {sub}
                  </li>
                ))}
              </ul>
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
