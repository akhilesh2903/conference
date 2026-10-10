import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Publication | IC-MEMS 2027' };

const reviewSteps = [
  { step: '01', title: 'Technical Screening', desc: 'All submitted papers are screened for scope, originality and completeness.' },
  { step: '02', title: 'Reviewer Assignment', desc: 'Papers are assigned to domain experts from the editorial board.' },
  { step: '03', title: 'First Review', desc: 'Independent review and evaluation by assigned reviewers.' },
  { step: '04', title: 'Revision / Re-review', desc: 'Authors revise and resubmit based on reviewer comments if required.' },
  { step: '05', title: 'Second Review', desc: 'Revised papers are reviewed to confirm satisfactory revision.' },
  { step: '06', title: 'Final Editorial Decision', desc: 'Editorial board makes the final acceptance or rejection decision.' },
  { step: '07', title: 'Preparation of Accepted Manuscripts', desc: 'Accepted authors prepare manuscripts for journal publication.' },
];

export default function PublicationPage() {
  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-gray-800 font-medium">Publication</li>
          </ol>
        </div>
      </nav>

      <div className="gradient-navy text-white py-16">
        <div className="container-custom text-center">
          <span className="badge bg-white/10 text-teal-300 mb-4">Research Output</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Publication</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Selected papers will be considered for publication in Scopus-indexed journals.</p>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-16">
        {/* Main statement */}
        <div className="rounded-2xl bg-teal-50 border border-teal-200 p-8 mb-12 text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-lg font-semibold text-gray-800 leading-relaxed max-w-2xl mx-auto">
            Selected papers will be published in <span className="text-teal-700">Scopus-indexed journals</span> following two rounds of review and acceptance by the conference editorial board.
          </p>
        </div>

        {/* Journal details placeholder */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 mb-12 flex items-start gap-4">
          <div className="text-3xl flex-shrink-0">📋</div>
          <div>
            <h3 className="font-bold text-amber-900 mb-1">Journal Details</h3>
            <p className="text-amber-800 text-sm">Journal details will be announced after final confirmation. No journal names or timelines are published at this stage.</p>
          </div>
        </div>

        {/* Review process */}
        <h2 className="text-2xl font-bold mb-8" style={{ color: '#0a192f' }}>Review Process</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200" aria-hidden="true" />
          <div className="space-y-6">
            {reviewSteps.map((s, idx) => (
              <div key={s.step} className="relative flex gap-6 pl-2">
                <div
                  className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 border-2 text-white"
                  style={{ backgroundColor: '#0a192f', borderColor: '#0a192f' }}
                >
                  {s.step}
                </div>
                <div className={`flex-1 pb-6 ${idx < reviewSteps.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-12 rounded-2xl bg-gray-50 border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">Important Notes</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">•</span> Papers must be original and unpublished.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">•</span> All submitted papers will undergo rigorous editorial review.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">•</span> Authors of accepted abstracts must submit full papers through the AIET portal.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 mt-0.5">•</span> Publication in conference proceedings is subject to conference registration and presentation.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
