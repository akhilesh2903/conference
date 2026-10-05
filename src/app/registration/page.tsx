import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Registration | IC-MEMS 2027' };

const fees = [
  { category: 'Research Scholars / Postgraduate Students', amount: '₹6,000', currency: 'INR', icon: '🎓' },
  { category: 'Faculty / Academicians', amount: '₹8,000', currency: 'INR', icon: '👩‍🏫' },
  { category: 'Industry / R&D Participants', amount: '₹10,000', currency: 'INR', icon: '🏭' },
  { category: 'International Participants', amount: 'USD 200', currency: 'USD', icon: '🌐' },
  { category: 'Accompanying Attendee Without Certificate', amount: '₹4,000', currency: 'INR', icon: '👥' },
];

const comparison = [
  { feature: 'Conference Attendance', full: true, accompanying: true },
  { feature: 'Conference Kit', full: true, accompanying: true },
  { feature: 'Certificate of Participation', full: true, accompanying: false },
  { feature: 'Lunch & Refreshments', full: true, accompanying: true },
  { feature: 'Accommodation', full: false, accompanying: false },
];

export default function RegistrationPage() {
  return (
    <div className="page-enter">
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-gray-800 font-medium">Registration</li>
          </ol>
        </div>
      </nav>

      <div className="gradient-navy text-white py-16">
        <div className="container-custom">
          <span className="badge bg-white/10 text-teal-300 mb-4">Join IC-MEMS 2027</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Registration</h1>
          <div className="flex flex-wrap gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Opens: 1 June 2027
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Closes: 5 September 2027
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-5xl py-16 space-y-16">
        {/* Registration Fee Table */}
        <section aria-labelledby="fees-heading">
          <h2 id="fees-heading" className="text-2xl font-bold mb-2" style={{ color: '#0a192f' }}>Registration Fees</h2>
          <p className="text-gray-500 text-sm mb-6">No early-bird pricing. Fixed category-wise fees apply.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fees.map((fee) => (
              <div key={fee.category} className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-teal-300 hover:shadow-md transition-all flex flex-col">
                <div className="text-3xl mb-4" role="img" aria-hidden="true">{fee.icon}</div>
                <p className="text-sm text-gray-600 font-medium leading-snug mb-4 flex-1">{fee.category}</p>
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-2xl font-bold" style={{ color: '#0a192f' }}>{fee.amount}</span>
                  <span className="text-xs text-gray-400 font-medium">{fee.currency}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Important conditions */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0a192f' }}>Registration Conditions</h2>
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 space-y-3">
            {[
              'Standard author registration covers one paper and one presenting author.',
              'Online and in-person presenters pay the same category-wise fee.',
              'Each co-author requiring a certificate must pay the full applicable category fee.',
              'Accompanying attendee category does not include a certificate.',
              'Registration fees are non-refundable.',
              'Accommodation is not included in the registration fee.',
            ].map((c) => (
              <div key={c} className="flex items-start gap-3 text-sm text-gray-700">
                <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {c}
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#0a192f' }}>Inclusions Comparison</h2>
          <div className="table-responsive">
            <table className="w-full text-sm border-collapse rounded-2xl overflow-hidden border border-gray-200">
              <thead>
                <tr className="bg-[#0a192f] text-white">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold">Full Author Registration</th>
                  <th className="p-4 text-center font-semibold">Accompanying Attendee</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 text-gray-700 font-medium">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.full
                        ? <span className="text-teal-600 text-lg" aria-label="Included">✓</span>
                        : <span className="text-red-400 text-sm text-gray-400" aria-label="Not included">Not included</span>}
                    </td>
                    <td className="p-4 text-center">
                      {row.accompanying
                        ? <span className="text-teal-600 text-lg" aria-label="Included">✓</span>
                        : <span className="text-gray-400 text-sm" aria-label="Not included">Not included</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Register Now CTA */}
        <section>
          <div className="rounded-2xl gradient-navy p-8 md:p-10 text-white text-center">
            <h3 className="text-xl font-bold mb-3">Ready to Register?</h3>
            <p className="text-white/70 text-sm mb-2">Registration opens: <strong className="text-white">1 June 2027</strong></p>
            <p className="text-white/60 text-sm mb-6">Payment will be processed through the AIET portal payment gateway.</p>
            <div className="coming-soon mx-auto w-fit">
              🎫 Registration Portal — Opens 1 June 2027
            </div>
            <p className="text-white/40 text-xs mt-4">Contact: icmems2027@gmail.com | +91 96119 45201</p>
          </div>
        </section>
      </div>
    </div>
  );
}
