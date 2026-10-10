import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Important Dates | IC-MEMS 2027' };

const dates = [
  { id: 1, label: 'Call for Papers', date: '16 January 2027', icon: '📣', note: 'Abstracts are open from this date.' },
  { id: 2, label: 'Registration Opens', date: '1 June 2027', icon: '🎫', note: 'Register early.' },
  { id: 3, label: 'Abstract Submission Deadline', date: '16 June 2027', icon: '📋', highlight: true, note: '250–300 word abstract required.' },
  { id: 4, label: 'Abstract Acceptance Notification', date: '30 June 2027', icon: '✅', note: 'Results sent to corresponding author.' },
  { id: 5, label: 'Full-Paper Submission Opens', date: '16 July 2027', icon: '📄', note: 'Accepted authors only.' },
  { id: 6, label: 'Full-Paper Submission Deadline', date: '31 July 2027', icon: '🔒', highlight: true, note: 'Upload through AIET portal.' },
  { id: 7, label: 'Full-Paper Acceptance Notification', date: '16 August 2027', icon: '🏆', note: 'Final decision communicated.' },
  { id: 8, label: 'Registration Closes', date: '5 September 2027', icon: '⏰', highlight: true, note: 'Last date to register.' },
  { id: 9, label: 'Conference Day 1', date: '16 September 2027', icon: '🎓', highlight: true, note: 'Inaugural session and technical presentations.' },
  { id: 10, label: 'Conference Day 2', date: '17 September 2027', icon: '🎓', highlight: true, note: 'Technical sessions.' },
  { id: 11, label: 'Conference Day 3', date: '18 September 2027', icon: '🏆', highlight: true, note: 'Technical sessions and closing ceremony.' },
];

export default function ImportantDatesPage() {
  return (
    <div className="page-enter">
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-gray-800 font-medium">Important Dates</li>
          </ol>
        </div>
      </nav>

      <div className="gradient-navy text-white py-16">
        <div className="container-custom text-center">
          <span className="badge bg-white/10 text-teal-300 mb-4">Key Deadlines</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Important Dates</h1>
          <p className="text-white/70 max-w-2xl mx-auto">All deadlines are for IC-MEMS 2027. Dates are in Indian Standard Time (IST).</p>
        </div>
      </div>

      <div className="container-custom max-w-3xl py-16">
        <div className="relative">
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200" aria-hidden="true" />
          <div className="space-y-4">
            {dates.map((item) => (
              <div key={item.id} className="relative flex gap-6 pl-2">
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 border-2 ${
                    item.highlight ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white'
                  }`}
                  role="img" aria-hidden="true"
                >
                  {item.icon}
                </div>
                <div className={`flex-1 pb-4 ${item.id < dates.length ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className={`font-semibold ${item.highlight ? 'text-teal-700' : 'text-gray-900'}`}>
                        {item.label}
                        {item.highlight && <span className="ml-2 text-[10px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Key Date</span>}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">{item.note}</p>
                    </div>
                    <span className={`font-bold text-sm px-3 py-1.5 rounded-lg ${item.highlight ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-600 space-y-2">
          <p className="font-semibold text-gray-800">Notes:</p>
          <p>• All deadlines are in Indian Standard Time (IST, UTC+5:30).</p>
          <p>• Exact daily cutoff times will be communicated when the submission portal opens.</p>
          <p>• Dates are subject to revision by the organising committee.</p>
        </div>
      </div>
    </div>
  );
}
