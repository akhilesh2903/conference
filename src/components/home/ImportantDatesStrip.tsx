import Link from 'next/link';

interface DateItem {
  id: string;
  phase: 'Phase 1: Abstract Stage' | 'Phase 2: Full Paper Stage' | 'Phase 3: Registration & Event';
  label: string;
  date: string;
  day: string;
  month: string;
  year: string;
  highlight?: boolean;
  status: string;
  description: string;
}

const keyMilestones = [
  {
    title: 'Abstract Submission Deadline',
    date: '16 June 2027',
    day: '16',
    month: 'JUN',
    year: '2027',
    phase: 'Phase 1',
    status: 'Initial Milestone',
    note: '250–300 words structured abstract',
    accent: 'border-amber-400 bg-amber-50/50 text-amber-900',
    chipBg: 'bg-amber-500 text-white',
  },
  {
    title: 'Full Paper Submission Deadline',
    date: '31 July 2027',
    day: '31',
    month: 'JUL',
    year: '2027',
    phase: 'Phase 2',
    status: 'Manuscript Deadline',
    note: 'For accepted abstracts via AIET portal',
    accent: 'border-teal-500 bg-teal-50/40 text-teal-950',
    chipBg: 'bg-teal-600 text-white',
  },
  {
    title: 'Conference Days',
    date: '16–18 September 2027',
    day: '16-18',
    month: 'SEP',
    year: '2027',
    phase: 'Phase 3',
    status: 'Hybrid Conference',
    note: 'In-person at AIET & Virtual interactive sessions',
    accent: 'border-blue-500 bg-blue-50/40 text-blue-950',
    chipBg: 'bg-[#0a192f] text-white',
  },
];

const allDates: DateItem[] = [
  {
    id: 'd1',
    phase: 'Phase 1: Abstract Stage',
    label: 'Call for Papers Announcement',
    date: '16 January 2027',
    day: '16',
    month: 'JAN',
    year: '2027',
    status: 'Open',
    description: 'Official call for papers announced across all 4 conference tracks.',
  },
  {
    id: 'd2',
    phase: 'Phase 1: Abstract Stage',
    label: 'Abstract Submission Deadline',
    date: '16 June 2027',
    day: '16',
    month: 'JUN',
    year: '2027',
    highlight: true,
    status: 'Key Deadline',
    description: 'Submission of 250–300 word structured abstract through the portal.',
  },
  {
    id: 'd3',
    phase: 'Phase 1: Abstract Stage',
    label: 'Abstract Acceptance Notification',
    date: '30 June 2027',
    day: '30',
    month: 'JUN',
    year: '2027',
    status: 'Notification',
    description: 'Communication of abstract review outcomes to corresponding authors.',
  },
  {
    id: 'd4',
    phase: 'Phase 2: Full Paper Stage',
    label: 'Full-Paper Submission Opens',
    date: '16 July 2027',
    day: '16',
    month: 'JUL',
    year: '2027',
    status: 'Portal Opens',
    description: 'Portal opens for accepted authors to submit full camera-ready papers.',
  },
  {
    id: 'd5',
    phase: 'Phase 2: Full Paper Stage',
    label: 'Full-Paper Submission Deadline',
    date: '31 July 2027',
    day: '31',
    month: 'JUL',
    year: '2027',
    highlight: true,
    status: 'Key Deadline',
    description: 'Final deadline for submitting full research manuscripts for review.',
  },
  {
    id: 'd6',
    phase: 'Phase 2: Full Paper Stage',
    label: 'Full-Paper Acceptance Notification',
    date: '16 August 2027',
    day: '16',
    month: 'AUG',
    year: '2027',
    status: 'Notification',
    description: 'Editorial decision announced for conference presentation & Scopus consideration.',
  },
  {
    id: 'd7',
    phase: 'Phase 3: Registration & Event',
    label: 'Registration Opens',
    date: '1 June 2027',
    day: '01',
    month: 'JUN',
    year: '2027',
    status: 'Portal Opens',
    description: 'Early bird and standard author & attendee registration opens online.',
  },
  {
    id: 'd8',
    phase: 'Phase 3: Registration & Event',
    label: 'Registration Closes',
    date: '5 September 2027',
    day: '05',
    month: 'SEP',
    year: '2027',
    highlight: true,
    status: 'Final Date',
    description: 'Last date to complete registration and confirm conference participation.',
  },
  {
    id: 'd9',
    phase: 'Phase 3: Registration & Event',
    label: 'Conference Dates (Day 1 – Day 3)',
    date: '16 to 18 September 2027',
    day: '16–18',
    month: 'SEP',
    year: '2027',
    highlight: true,
    status: 'Main Event',
    description: 'Inaugural ceremony, keynote addresses, technical tracks, and valedictory session.',
  },
];

export default function ImportantDatesStrip() {
  return (
    <section id="dates" className="py-20 bg-slate-50/70 border-b border-slate-200" aria-label="Important Dates & Deadlines">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-100/70 text-teal-800 text-xs font-semibold tracking-wider uppercase mb-3">
              <svg className="w-3.5 h-3.5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Conference Schedule & Milestones
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a192f] tracking-tight">
              Important Dates
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2 leading-relaxed">
              Plan your submission and participation for IC-MEMS 2027. All deadlines follow Indian Standard Time (IST, UTC+5:30).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/for-authors#call-for-papers"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs md:text-sm font-semibold transition-colors shadow-sm"
            >
              Call for Papers
            </Link>
            <Link
              href="/important-dates"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs md:text-sm font-semibold transition-colors shadow-sm"
            >
              Full Schedule
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ─── 1. TOP 3 KEY MILESTONES (Instant Glance for Researchers) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {keyMilestones.map((item) => (
            <div
              key={item.title}
              className={`relative rounded-xl border p-5 md:p-6 transition-all hover:shadow-md ${item.accent} flex items-start gap-4`}
            >
              {/* Calendar Date Block */}
              <div className="flex flex-col items-center justify-center shrink-0 min-w-[4.25rem] h-18 rounded-lg overflow-hidden border border-slate-200/80 bg-white shadow-sm">
                <span className={`w-full py-0.5 text-center text-[10px] font-bold uppercase tracking-wider ${item.chipBg}`}>
                  {item.month}
                </span>
                <span className="text-base sm:text-lg font-black text-[#0a192f] leading-tight my-auto whitespace-nowrap px-1">
                  {item.day}
                </span>
                <span className="text-[10px] text-slate-500 font-medium pb-1">
                  {item.year}
                </span>
              </div>

              {/* Information */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/90 border border-slate-200 text-slate-700">
                    {item.phase}
                  </span>
                  <span className="text-[11px] font-semibold text-teal-700">
                    {item.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0a192f] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ─── 2. COMPLETE SCHEDULE ACCORDION / PHASE BREAKDOWN ─── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-100/70 px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#0a192f] uppercase tracking-wider">
              <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Complete Chronological Schedule
            </div>
            <div className="text-xs text-slate-500 font-medium">
              * Deadlines are subject to committee extensions
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {allDates.map((item) => (
              <div
                key={item.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  item.highlight ? 'bg-teal-50/30 hover:bg-teal-50/50' : 'hover:bg-slate-50/80'
                }`}
              >
                {/* Left: Date Badge + Title + Details */}
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  {/* Calendar Chip */}
                  <div className="flex flex-col items-center justify-center shrink-0 w-13 h-14 rounded-lg border border-slate-200 bg-white text-center shadow-xs">
                    <span className="text-[9px] font-bold text-teal-700 bg-teal-50 w-full py-0.5 uppercase tracking-wide border-b border-slate-100">
                      {item.month}
                    </span>
                    <span className="text-base font-bold text-[#0a192f] my-auto leading-none">
                      {item.day}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.phase.split(':')[0]}
                      </span>
                      <h4 className={`text-sm sm:text-base font-bold ${item.highlight ? 'text-teal-950' : 'text-[#0a192f]'}`}>
                        {item.label}
                      </h4>
                      {item.highlight && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                          Critical
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right: Date String & Status */}
                <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <span className={`text-sm font-extrabold ${item.highlight ? 'text-teal-700' : 'text-slate-800'}`}>
                    {item.date}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 sm:mt-0.5">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note inside card */}
          <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
            <span>Official submissions portal opens on AIET conference management system.</span>
            <Link
              href="/important-dates"
              className="text-teal-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              View detailed guidelines & timezone details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
