import Link from 'next/link';

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
    <section className="py-20 bg-white border-b border-slate-200" aria-label="Keynote Speakers">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-semibold tracking-wider uppercase mb-3">
            Scholarly Leadership
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a192f] tracking-tight">
            Distinguished Keynote Speakers
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2 leading-relaxed">
            IC-MEMS 2027 brings together eminent researchers, distinguished academicians, and global industry practitioners to deliver plenary addresses.
          </p>
        </div>

        {/* Keynote Program Sessions Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {speakerTracks.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
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
                <h3 className="text-base font-bold text-[#0a192f] mb-2 leading-snug">
                  {item.area}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-teal-700">Final Confirmation</span>
                <span>AIET Auditorium</span>
              </div>
            </div>
          ))}
        </div>

        {/* Announcement Box */}
        <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl border border-slate-200 bg-slate-50 text-center shadow-xs">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100/70 text-teal-800 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-[#0a192f] mb-2">
            Keynote Profiles Being Finalized
          </h3>
          <p className="text-xs md:text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
            The advisory committee is actively finalizing the roster of confirmed keynote speakers and session chairs from premier international universities and national research laboratories.
          </p>
          <Link
            href="/speakers"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-teal-500 hover:text-teal-700 bg-white text-slate-700 text-xs sm:text-sm font-semibold transition-colors shadow-xs"
          >
            View Speakers Page &amp; Program Structure
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
