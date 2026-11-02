import Link from 'next/link';

const fees = [
  {
    category: 'Research Scholars / Postgraduate Students',
    price: '₹6,000',
    type: 'National (INR)',
    eligibility: 'Full-time master & doctoral scholars with valid institutional ID',
    highlight: false,
  },
  {
    category: 'Faculty / Academicians',
    price: '₹8,000',
    type: 'National (INR)',
    eligibility: 'Professors, associate professors & academic faculty members',
    highlight: true,
  },
  {
    category: 'Industry / R&D Participants',
    price: '₹10,000',
    type: 'Corporate / Labs',
    eligibility: 'Scientists, industry delegates & commercial research engineers',
    highlight: false,
  },
  {
    category: 'International Delegates',
    price: 'USD 200',
    type: 'International',
    eligibility: 'Overseas academicians, researchers & international delegates',
    highlight: true,
  },
  {
    category: 'Accompanying Attendee (No Certificate)',
    price: '₹4,000',
    type: 'Attendee',
    eligibility: 'Co-attendee access to sessions & luncheon (without presentation)',
    highlight: false,
  },
];

const inclusions = [
  'Access to all Plenary Keynotes & Technical Tracks',
  'Presentation Certificate & Certificate of Attendance',
  'Official Delegate Kit, Program Guide & Abstract Book',
  'Conference Luncheons & High-Tea Refreshments (All 3 Days)',
  'Eligibility for Scopus-Indexed Journal Consideration',
  'Interactive Virtual Presentation Access for Remote Authors',
];

export default function RegistrationPreview() {
  return (
    <section
      className="py-20 bg-teal-50/60 border-b border-teal-100 relative overflow-hidden"
      aria-label="Registration Fee Schedule"
    >
      {/* ── Background Conference Watermark Icons ── */}
      {/* 1. Conference Delegate Badge Watermark (Top Right) */}
      <div className="absolute -top-8 -right-8 w-72 h-72 pointer-events-none opacity-[0.045] text-teal-800 animate-float-a" aria-hidden>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
          <rect x="25" y="20" width="50" height="70" rx="6" />
          <path d="M42 20 V12 H58 V20" />
          <circle cx="50" cy="40" r="10" />
          <path d="M35 62 C35 54 41 52 50 52 C59 52 65 54 65 62" />
          <line x1="35" y1="72" x2="65" y2="72" />
          <line x1="40" y1="78" x2="60" y2="78" />
        </svg>
      </div>

      {/* 2. Conference Passport / Ticket Watermark (Bottom Left) */}
      <div className="absolute -bottom-10 -left-10 w-80 h-80 pointer-events-none opacity-[0.035] text-teal-900 animate-float-b" aria-hidden>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
          <rect x="15" y="30" width="70" height="42" rx="4" />
          <line x1="62" y1="30" x2="62" y2="72" strokeDasharray="3 3" />
          <circle cx="35" cy="51" r="8" />
          <line x1="48" y1="46" x2="56" y2="46" />
          <line x1="48" y1="54" x2="56" y2="54" />
        </svg>
      </div>
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-semibold tracking-wider uppercase mb-3">
            Participation &amp; Registration
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a192f] tracking-tight">
            Registration Fee Structure
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2 leading-relaxed">
            Registration opens on <strong className="text-teal-800">1 June 2027</strong> and closes strictly on <strong className="text-teal-800">5 September 2027</strong>.
          </p>
        </div>

        {/* Fee Schedule Table / Cards */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8 sm:mb-10">
          <div className="bg-slate-100/80 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0a192f]">
              Delegate Category &amp; Registration Fee
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
              Applicable for both In-Person &amp; Virtual Presenters
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {fees.map((fee, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-colors ${
                  fee.highlight ? 'bg-teal-50/20 hover:bg-teal-50/40' : 'hover:bg-slate-50/70'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {fee.type}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#0a192f]">
                      {fee.category}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {fee.eligibility}
                  </p>
                </div>

                <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <span className="text-lg sm:text-xl font-extrabold text-teal-700">
                    {fee.price}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                    Per Accepted Paper / Delegate
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Inclusions Footer Bar */}
          <div className="bg-slate-50 p-4 sm:p-6 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-3">
              Registration Fee Inclusions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
              {inclusions.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <svg className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link
            href="/registration"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center"
          >
            Go to Registration Details &amp; Payment Guidelines
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
