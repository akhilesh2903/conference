import Link from 'next/link';

const themes = [
  {
    number: '01',
    title: 'Advanced and Sustainable Materials',
    shortTitle: 'Advanced Materials',
    icon: 'MAT',
    description:
      'Exploring energy materials, nanomaterials, smart materials, biodegradable polymers, advanced coatings, thermoelectric and optical/electronic materials for a sustainable future.',
    color: 'from-blue-600 to-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    accent: '#2563eb',
    id: 'theme-1',
  },
  {
    number: '02',
    title: 'Energy Systems, Hydrogen & Sustainable Energy',
    shortTitle: 'Energy & Hydrogen',
    icon: 'ENG',
    description:
      'Covering renewable energy, green hydrogen, fuel cells, energy management, AI-enabled systems and hydrogen mobility for a low-carbon energy transition.',
    color: 'from-teal-600 to-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    accent: '#0d9488',
    id: 'theme-2',
  },
  {
    number: '03',
    title: 'Environment, Climate & Sustainable Engineering',
    shortTitle: 'Environment & Climate',
    icon: 'ENV',
    description:
      'Addressing environmental engineering, climate change mitigation, carbon capture, waste-to-energy, GIS, remote sensing, and circular economy principles.',
    color: 'from-green-600 to-green-700',
    bg: 'bg-green-50',
    border: 'border-green-100',
    accent: '#16a34a',
    id: 'theme-3',
  },
  {
    number: '04',
    title: 'Sustainable Management, Business & Finance',
    shortTitle: 'Sustainable Management',
    icon: 'MGT',
    description:
      'Integrating ESG, green finance, circular business models, AI for sustainability, SDGs, responsible investment, and ethical leadership into business practice.',
    color: 'from-purple-600 to-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    accent: '#7c3aed',
    id: 'theme-4',
  },
];

export default function ThemeCards() {
  return (
    <section className="section-padding bg-white" aria-label="Conference themes">
      <div className="container-custom">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="badge bg-teal-50 text-teal-700 mb-3">Interdisciplinary Research</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0a192f' }}>
            Conference Themes
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            IC-MEMS 2027 covers four interconnected themes bridging materials science, energy engineering, environmental sustainability and management.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`group relative rounded-2xl border ${theme.border} ${theme.bg} p-8 card-hover`}
            >
              {/* Number + icon row */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[0.65rem] font-extrabold tracking-wider shadow-sm"
                    style={{ backgroundColor: 'white' }}
                    aria-hidden="true"
                  >
                    {theme.icon}
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
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {theme.description}
              </p>

              {/* CTA */}
              <Link
                href={`/themes#${theme.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: theme.accent }}
                aria-label={`Explore ${theme.title}`}
              >
                Explore Theme
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
            href="/themes"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0a192f] hover:bg-[#163560] text-white font-semibold transition-all hover:-translate-y-0.5 shadow-lg"
          >
            View All Themes & Subtopics
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
