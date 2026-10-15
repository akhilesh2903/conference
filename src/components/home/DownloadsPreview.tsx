import Link from 'next/link';

export default function DownloadsPreview() {
  const files = [
    {
      name: 'Official Conference Brochure',
      type: 'PDF',
      size: '2.4 MB',
      description: 'Comprehensive conference overview, track scopes, patron committees, and venue guide.',
      status: 'Coming Soon',
    },
    {
      name: 'Abstract Submission Template',
      type: 'DOCX',
      size: '95 KB',
      description: 'Standard 250–300 word structured abstract template with author affiliation format.',
      status: 'Opens 16 Jan 2027',
    },
    {
      name: 'Full Manuscript Author Template',
      type: 'DOCX',
      size: '140 KB',
      description: 'Standard double-column research paper template conforming to journal guidelines.',
      status: 'Opens 16 Jul 2027',
    },
    {
      name: 'Oral Presentation Slide Template',
      type: 'PPTX',
      size: '1.2 MB',
      description: 'Standardized 16:9 widescreen presentation slide deck for technical session presentations.',
      status: 'Coming Soon',
    },
    {
      name: 'Schedule & Technical Program Matrix',
      type: 'PDF',
      size: '480 KB',
      description: 'Parallel session track distribution, keynote timings, and session chair allocations.',
      status: 'Available Sep 2027',
    },
    {
      name: 'Campus Travel & Lodging Guide',
      type: 'PDF',
      size: '1.8 MB',
      description: 'Airport transit, partner hotels in Moodbidri & Mangaluru, and local transport options.',
      status: 'Coming Soon',
    },
  ];

  return (
    <section className="py-20 bg-white" aria-label="Author Resources and Downloads">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-semibold tracking-wider uppercase mb-3">
              Author Resources
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a192f] tracking-tight">
              Downloads &amp; Templates
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2 leading-relaxed">
              Official document templates, author guidelines, and event literature will be hosted here for researchers and registered delegates.
            </p>
          </div>

          <Link
            href="/for-authors#downloads"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 hover:border-teal-500 hover:text-teal-700 bg-white text-slate-700 text-xs sm:text-sm font-semibold transition-colors shadow-xs shrink-0"
          >
            Author Guidelines &amp; Formatting Rules &rarr;
          </Link>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded text-[11px] font-black uppercase tracking-wider ${
                    file.type === 'PDF'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : file.type === 'DOCX'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {file.type} &bull; {file.size}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {file.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0a192f] mb-2 leading-snug">
                  {file.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {file.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>AIET Official Document</span>
                <span className="text-teal-700 font-semibold">Available via Portal</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
