import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Important Dates | IC-MEMS 2027' };

interface DateItem {
  id: number;
  label: string;
  date: string;
  month: string;
  day: string;
  note: string;
  highlight?: boolean;
}

const dates: DateItem[] = [
  { id: 1, label: 'Call for Papers', date: '16 January 2027', month: 'JAN', day: '16', note: 'Abstracts are open from this date.' },
  { id: 2, label: 'Registration Opens', date: '1 June 2027', month: 'JUN', day: '01', note: 'Register early.' },
  { id: 3, label: 'Abstract Submission Deadline', date: '16 June 2027', month: 'JUN', day: '16', highlight: true, note: '250–300 word abstract required.' },
  { id: 4, label: 'Abstract Acceptance Notification', date: '30 June 2027', month: 'JUN', day: '30', note: 'Results sent to corresponding author.' },
  { id: 5, label: 'Full-Paper Submission Opens', date: '16 July 2027', month: 'JUL', day: '16', note: 'Accepted authors only.' },
  { id: 6, label: 'Full-Paper Submission Deadline', date: '31 July 2027', month: 'JUL', day: '31', highlight: true, note: 'Upload through AIET portal.' },
  { id: 7, label: 'Full-Paper Acceptance Notification', date: '16 August 2027', month: 'AUG', day: '16', note: 'Final decision communicated.' },
  { id: 8, label: 'Registration Closes', date: '5 September 2027', month: 'SEP', day: '05', highlight: true, note: 'Last date to register.' },
  { id: 9, label: 'Conference Day 1', date: '16 September 2027', month: 'SEP', day: '16', highlight: true, note: 'Inaugural session and technical presentations.' },
  { id: 10, label: 'Conference Day 2', date: '17 September 2027', month: 'SEP', day: '17', note: 'Technical sessions.' },
  { id: 11, label: 'Conference Day 3', date: '18 September 2027', month: 'SEP', day: '18', highlight: true, note: 'Technical sessions and closing ceremony.' },
];

export default function ImportantDatesPage() {
  return (
    <div className="page-enter bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <header className="gradient-navy text-white pt-8 pb-16 px-4">
        <div className="container-custom max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-teal-300 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li className="text-slate-200 font-semibold">Important Dates</li>
            </ol>
          </nav>

          <div className="text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-4">
              Key Deadlines
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Important Dates
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              All deadlines are for IC-MEMS 2027. Dates are in Indian Standard Time (IST).
            </p>
          </div>
        </div>
      </header>

      {/* Dates Schedule */}
      <main className="container-custom max-w-3xl py-12 md:py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {dates.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors ${
                item.highlight ? 'bg-teal-50/40 hover:bg-teal-50/60' : 'hover:bg-slate-50/70'
              }`}
            >
              {/* Date Chip + Description */}
              <div className="flex items-center gap-4 min-w-0">
                {/* Clean Calendar Chip */}
                <div
                  className={`flex flex-col items-center justify-center shrink-0 w-13 h-14 rounded-xl border text-center shadow-xs overflow-hidden ${
                    item.highlight
                      ? 'border-teal-300 bg-teal-50'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <span
                    className={`text-[9px] font-bold w-full py-0.5 uppercase tracking-wide border-b ${
                      item.highlight
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.month}
                  </span>
                  <span
                    className={`text-base font-extrabold my-auto leading-none ${
                      item.highlight ? 'text-teal-900' : 'text-[#0a192f]'
                    }`}
                  >
                    {item.day}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-sm sm:text-base font-bold ${
                        item.highlight ? 'text-teal-950' : 'text-[#0a192f]'
                      }`}
                    >
                      {item.label}
                    </h3>
                    {item.highlight && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full border border-teal-200">
                        Key Date
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate sm:whitespace-normal">
                    {item.note}
                  </p>
                </div>
              </div>

              {/* Formatted Date Pill */}
              <span
                className={`font-bold text-xs sm:text-sm px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap ${
                  item.highlight
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {item.date}
              </span>
            </div>
          ))}
        </div>

        {/* Original Notes Box */}
        <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-sm font-bold text-[#0a192f] mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Notes:
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>All deadlines are in Indian Standard Time (IST, UTC+5:30).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>Exact daily cutoff times will be communicated when the submission portal opens.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>Dates are subject to revision by the organising committee.</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
