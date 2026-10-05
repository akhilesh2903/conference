import Link from 'next/link';

export default function SpeakersPreview() {
  return (
    <section className="section-padding bg-gray-50 border-t border-gray-100" aria-label="Keynote Speakers">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="badge bg-navy-50 text-teal-700 mb-3" style={{ backgroundColor: '#f0faf9' }}>Keynote Speakers</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0a192f' }}>Distinguished Speakers</h2>
        </div>

        <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-sm">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Confirmed speakers will be announced soon.</h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto mb-8">
            We are curating a lineup of leading academicians, industry experts, and policymakers. Check back later for updates on our keynote sessions.
          </p>
          <Link
            href="/speakers"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-colors"
          >
            Go to Speakers Page
          </Link>
        </div>
      </div>
    </section>
  );
}
