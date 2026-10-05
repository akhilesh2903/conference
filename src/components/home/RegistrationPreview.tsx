import Link from 'next/link';

const fees = [
  { category: 'Research Scholars / Postgraduate Students', price: '₹6,000' },
  { category: 'Faculty / Academicians', price: '₹8,000' },
  { category: 'Industry / R&D Participants', price: '₹10,000' },
  { category: 'International Participants', price: 'USD 200' },
  { category: 'Accompanying Attendee (No Certificate)', price: '₹4,000' },
];

export default function RegistrationPreview() {
  return (
    <section className="section-padding bg-white" aria-label="Registration Fee Preview">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="badge bg-teal-50 text-teal-700 mb-3">Participation</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0a192f' }}>Registration Fees</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Registration period: 1 June 2027 – 5 September 2027
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {fees.map((fee, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-teal-200 hover:shadow-lg transition-all gap-4">
                <span className="font-semibold text-gray-800 text-sm">{fee.category}</span>
                <span className="text-lg font-bold text-teal-600 sm:text-right">{fee.price}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/registration"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-teal-500/20"
            >
              View Full Registration Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
