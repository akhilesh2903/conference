import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Keynote & Invited Speakers | ICMEMS 2027',
  description: 'Distinguished Keynote and Plenary Speakers at the International Conference on Materials, Energy and Management for Sustainability (ICMEMS 2027).',
};

interface Speaker {
  name: string;
  role: string;
  affiliation: string;
  department: string;
  country: string;
  flag: string;
  image: string;
  topic: string;
  bio: string;
}

const keynoteSpeakers: Speaker[] = [
  {
    name: 'Dr. Dhasiyan Arun Kumar',
    role: 'Keynote Speaker',
    affiliation: 'ASM Japan / Nagoya University',
    department: 'Semiconductor Growth & Nanomaterials',
    country: 'Japan',
    flag: '🇯🇵',
    image: '/speakers/dr-dhasiyan-arun-kumar.png',
    topic: 'Advanced Nanocomposites & Semiconductor Material Interfaces for Next-Generation Electronics',
    bio: 'Renowned researcher and scientist associated with ASM Japan and Nagoya University specializing in advanced semiconductor growth, radical-enhanced chemical vapor deposition, and nanomaterials for energy applications.',
  },
  {
    name: 'Dr. Bir Bahadur Sherpa',
    role: 'Keynote Speaker',
    affiliation: 'Kumamoto University',
    department: 'Materials Joining & Explosive Metallurgy',
    country: 'Japan',
    flag: '🇯🇵',
    image: '/speakers/dr-bir-bahadur-sherpa.png',
    topic: 'Frontiers in Dissimilar Metal Joining & Explosive Metallurgy for Sustainable Engineering',
    bio: 'Prominent researcher in materials joining and shock synthesis at Kumamoto University, focusing on explosive welding mechanisms, microstructural evolution, and high-performance bimetallic systems.',
  },
  {
    name: 'Dr. G. Anandha Babu',
    role: 'Keynote Speaker',
    affiliation: 'SSN College of Engineering',
    department: 'Department of Physics & Crystal Growth Centre',
    country: 'India',
    flag: '🇮🇳',
    image: '/speakers/dr-g-anandha-babu.png',
    topic: 'Piezoelectric & Energy Storage Materials for Sustainable Power Technologies',
    bio: 'JSPS Post-Doctoral Fellow (Nagoya University) and SERB SIRE Fellow (Kumamoto University), leading high-temperature crystal growth and research in topological insulators and advanced dielectric energy materials.',
  },
];

export default function SpeakersPage() {
  return (
    <div className="page-enter bg-slate-50 min-h-screen">
      {/* ─── Hero Header ─── */}
      <div className="gradient-navy text-white pt-8 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-teal-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-1 text-slate-600">/</span>
              </li>
              <li className="text-slate-200 font-medium">Speakers</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold uppercase tracking-wider mb-4">
              Scholarly Leadership
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Distinguished Keynote Speakers
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              ICMEMS 2027 convenes international pioneers, esteemed academicians, and researchers to deliver plenary insights across materials, energy systems, and sustainable innovation.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Keynote Speakers Grid ─── */}
      <div className="container-custom max-w-6xl py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {keynoteSpeakers.map((speaker) => (
            <div
              key={speaker.name}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              {/* Photo Container */}
              <div className="relative w-full h-72 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden flex items-center justify-center">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

                {/* Country Flag Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5 border border-white/40">
                  <span>{speaker.flag}</span>
                  <span>{speaker.country}</span>
                </div>

                {/* Role Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-teal-600/95 text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                    {speaker.role}
                  </span>
                </div>
              </div>

              {/* Speaker Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0a192f] group-hover:text-teal-700 transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-teal-800 text-xs sm:text-sm font-semibold mt-1">
                    {speaker.affiliation}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {speaker.department}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Keynote Focus
                    </span>
                    <p className="text-xs font-medium text-slate-800 leading-snug line-clamp-2">
                      &ldquo;{speaker.topic}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {speaker.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 text-teal-700 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    Plenary Session
                  </span>
                  <span>ICMEMS 2027</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Additional Invited Speakers Announcement Banner ─── */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-teal-900 via-slate-900 to-[#0a192f] text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 text-[11px] font-bold uppercase tracking-wider">
              Technical Sessions
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              More Plenary & Invited Session Speakers
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Additional distinguished invited researchers, session chairs, and industry panelists will be announced in alignment with the thematic tracks.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/committees#international"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md"
            >
              View Advisory Board
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
