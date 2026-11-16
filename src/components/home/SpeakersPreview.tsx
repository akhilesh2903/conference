import Image from 'next/image';
import Link from 'next/link';

const keynoteSpeakers = [
  {
    name: 'Dr. Dhasiyan Arun Kumar',
    role: 'Keynote Speaker',
    affiliation: 'ASM Japan / Nagoya University',
    department: 'Semiconductor Growth & Nanomaterials',
    country: 'Japan',
    flag: '🇯🇵',
    image: '/speakers/dr-dhasiyan-arun-kumar.png',
    track: 'Theme 01 & 02: Advanced Materials & Clean Energy',
  },
  {
    name: 'Dr. Bir Bahadur Sherpa',
    role: 'Keynote Speaker',
    affiliation: 'Kumamoto University',
    department: 'Materials Joining & Explosive Metallurgy',
    country: 'Japan',
    flag: '🇯🇵',
    image: '/speakers/dr-bir-bahadur-sherpa.png',
    track: 'Theme 01 & 03: Materials Science & Engineering',
  },
  {
    name: 'Dr. G. Anandha Babu',
    role: 'Keynote Speaker',
    affiliation: 'SSN College of Engineering / Shiv Nadar Univ.',
    department: 'Crystal Growth & Piezoelectric Materials',
    country: 'India',
    flag: '🇮🇳',
    image: '/speakers/dr-g-anandha-babu.png',
    track: 'Theme 02: Energy Systems & Piezoelectrics',
  },
];

const speakerTracks = [
  {
    theme: 'Track 1 & 2',
    area: 'Advanced Materials & Clean Energy',
    format: 'International Keynote Address',
    desc: 'Frontier developments in energy harvesting materials, smart polymers, and commercial-scale green hydrogen storage systems.',
  },
  {
    theme: 'Track 3',
    area: 'Environment & Climate Engineering',
    format: 'Plenary Session',
    desc: 'Breakthroughs in carbon capture utilization, circular engineering, and remote sensing for regional climate resilience.',
  },
  {
    theme: 'Track 4',
    area: 'Sustainable Management & Green Finance',
    format: 'Executive Symposium Panel',
    desc: 'Integration of ESG criteria into capital markets, sustainable supply chain governance, and policy architectures.',
  },
];

export default function SpeakersPreview() {
  return (
    <section
      className="py-20 bg-white border-b border-slate-200 relative overflow-hidden"
      aria-label="Keynote Speakers"
    >
      {/* ── Background Conference Watermark Icons ── */}
      <div
        className="absolute -top-10 -right-10 w-80 h-80 pointer-events-none opacity-[0.045] text-teal-800 animate-float-a"
        aria-hidden
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
          <ellipse cx="50" cy="30" rx="12" ry="16" />
          <line x1="38" y1="30" x2="62" y2="30" />
          <line x1="39" y1="36" x2="61" y2="36" />
          <path d="M34 32 C34 46 66 46 66 32" />
          <line x1="50" y1="46" x2="50" y2="70" strokeWidth="3" />
          <line x1="32" y1="70" x2="68" y2="70" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div
        className="absolute -bottom-10 -left-10 w-72 h-72 pointer-events-none opacity-[0.035] text-teal-900 animate-float-b"
        aria-hidden
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
          <circle cx="50" cy="50" r="14" />
          <path d="M50 24 A26 26 0 0 1 76 50" strokeLinecap="round" />
          <path d="M50 14 A36 36 0 0 1 86 50" strokeLinecap="round" />
          <path d="M50 4 A46 46 0 0 1 96 50" strokeLinecap="round" />
        </svg>
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-semibold tracking-wider uppercase mb-3">
            Scholarly Leadership
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a192f] tracking-tight">
            Distinguished Keynote Speakers
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2 leading-relaxed">
            ICMEMS 2027 convenes international pioneers, eminent researchers, and global practitioners to deliver plenary addresses.
          </p>
        </div>

        {/* ── Keynote Speaker Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl 2xl:max-w-7xl mx-auto mb-16">
          {keynoteSpeakers.map((speaker) => (
            <div
              key={speaker.name}
              className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-teal-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative w-full h-64 bg-slate-200 overflow-hidden">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-85" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1 border border-white/50">
                  <span>{speaker.flag}</span>
                  <span>{speaker.country}</span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {speaker.role}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0a192f] group-hover:text-teal-700 transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-teal-800 text-xs font-semibold mt-1">
                    {speaker.affiliation}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {speaker.department}
                  </p>
                  <p className="text-[11px] font-medium text-slate-700 bg-white border border-slate-200/80 rounded-lg p-2 mt-3 leading-snug">
                    {speaker.track}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5 text-teal-700 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    Plenary Speaker
                  </span>
                  <span>AIET Campus</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Keynote Program Sessions Preview */}
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto mb-10">
          <div className="text-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Thematic Track Plenary Formats
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {speakerTracks.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-100">
                      {item.theme}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {item.format}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#0a192f] mb-2 leading-snug">
                    {item.area}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-teal-700">Auditorium Main Stage</span>
                  <span>ICMEMS 2027</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center mt-12">
          <Link
            href="/speakers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold transition-all shadow-md hover:shadow-lg"
          >
            View Full Keynote Profiles &amp; Lecture Topics
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
