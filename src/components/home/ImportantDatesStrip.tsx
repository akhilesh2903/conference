import Link from 'next/link';

const dates = [
  { label: 'Call for Papers', date: '16 January 2027', icon: '01', highlight: false },
  { label: 'Registration Opens', date: '1 June 2027', icon: '02', highlight: false },
  { label: 'Abstract Submission Deadline', date: '16 June 2027', icon: '03', highlight: true },
  { label: 'Abstract Acceptance Notification', date: '30 June 2027', icon: '04', highlight: false },
  { label: 'Full-Paper Submission Opens', date: '16 July 2027', icon: '05', highlight: false },
  { label: 'Full-Paper Submission Deadline', date: '31 July 2027', icon: '06', highlight: true },
  { label: 'Full-Paper Acceptance Notification', date: '16 August 2027', icon: '07', highlight: false },
  { label: 'Registration Closes', date: '5 September 2027', icon: '08', highlight: true },
  { label: 'Conference', date: '16 to 18 September 2027', icon: '09', highlight: true },
];

export default function ImportantDatesStrip() {
  return (
    <section className="bg-white border-b border-gray-100 section-sm" aria-label="Important dates">
      <div className="container-custom">
        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="badge bg-teal-50 text-teal-700 mb-2">Key Deadlines</span>
            <h2 className="text-2xl font-bold text-navy-900" style={{ color: '#0a192f' }}>Important Dates</h2>
          </div>
          <Link
            href="/important-dates"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dates.map((item) => (
            <div
              key={item.label}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                item.highlight
                  ? 'border-teal-200 bg-teal-50'
                  : 'border-gray-100 bg-gray-50 hover:border-teal-200 hover:bg-teal-50/50'
              }`}
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-[#e6f5f2] text-xs font-extrabold text-teal-700" aria-hidden="true">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-600 leading-snug">{item.label}</p>
                <p className={`font-bold mt-0.5 ${item.highlight ? 'text-teal-700' : 'text-gray-900'}`} style={{ color: item.highlight ? '#0d9488' : '#0a192f', fontSize: '0.95rem' }}>
                  {item.date}
                </p>
              </div>
              {item.highlight && (
                <div className="ml-auto flex-shrink-0 w-2 h-2 rounded-full bg-teal-500 mt-1.5" />
              )}
            </div>
          ))}
        </div>

        {/* View all (mobile) */}
        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/important-dates"
            className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            View All Important Dates
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
