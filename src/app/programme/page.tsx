import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Programme | IC-MEMS 2027' };

const days = [
  { day: 1, date: '16 September 2027', label: 'Day 1' },
  { day: 2, date: '17 September 2027', label: 'Day 2' },
];

export default function ProgrammePage() {
  return (
    <div className="page-enter">
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-gray-800 font-medium">Programme</li>
          </ol>
        </div>
      </nav>

      <div className="gradient-navy text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge bg-amber-500/20 text-amber-300 border border-amber-400/20">To Be Announced</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">IC-MEMS 2027 Programme</h1>
          <p className="text-white/70 max-w-xl">The detailed conference programme will be published after confirmation. All times are in IST (UTC+5:30).</p>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-16">
        {/* Day tabs */}
        <div className="flex gap-4 mb-10">
          {days.map((d) => (
            <div key={d.day} className="flex-1 rounded-2xl border-2 border-dashed border-gray-200 p-6 text-center">
              <span className="badge bg-gray-100 text-gray-500 mb-3">{d.label}</span>
              <p className="font-bold text-lg" style={{ color: '#0a192f' }}>{d.date}</p>
              <p className="text-gray-400 text-sm mt-1">IST</p>
            </div>
          ))}
        </div>

        {/* Placeholder */}
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-10 text-center mb-10">
          <div className="text-5xl mb-4">📅</div>
          <h2 className="text-xl font-bold text-amber-900 mb-3">Detailed Programme Coming Soon</h2>
          <p className="text-amber-700 text-sm leading-relaxed max-w-md mx-auto">
            The detailed conference programme will be published after final confirmation. The schedule will include keynote sessions, technical sessions, session chairs and presentation slots.
          </p>
        </div>

        {/* Programme structure preview */}
        <div>
          <h2 className="text-xl font-bold mb-6" style={{ color: '#0a192f' }}>Expected Programme Structure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '🎤', title: 'Keynote Sessions', desc: 'Distinguished invited speakers from research and industry.' },
              { icon: '📊', title: 'Technical Sessions', desc: 'Presentation of accepted research papers across all four themes.' },
              { icon: '👤', title: 'Session Chairs', desc: 'Each technical session will have a designated chair from the editorial board.' },
              { icon: '🏆', title: 'Closing Ceremony', desc: 'Awards, acknowledgements and closing remarks.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm">Stay updated — contact us at{' '}
            <a href="mailto:icmems2027@gmail.com" className="text-teal-600 hover:underline">icmems2027@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
