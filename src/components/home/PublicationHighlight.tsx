import Link from 'next/link';

export default function PublicationHighlight() {
  return (
    <section className="section-padding bg-[#f7faf9]" aria-label="Publication Highlight">
      <div className="container-custom">
        <div className="bg-white rounded-2xl border border-teal-100 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 gradient-navy text-white flex flex-col justify-center">
              <span className="badge bg-white/10 text-teal-300 mb-4 inline-flex self-start border border-white/20">Publication</span>
              <h2 className="text-3xl font-bold mb-6">Conference Proceedings</h2>
              <p className="text-white/80 leading-relaxed text-lg font-medium mb-6">
                Selected papers will be published in Scopus-indexed journals following two rounds of review and acceptance by the conference editorial board.
              </p>
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 mt-2">
                <p className="text-teal-300 font-semibold text-sm">Note:</p>
                <p className="text-white/70 text-sm mt-1">Journal details will be announced after final confirmation.</p>
              </div>
            </div>
            
            <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0a192f' }}>Review Process</h3>
              
              <div className="relative border-l-2 border-teal-100 ml-3 space-y-6">
                {[
                  'Technical Screening',
                  'Reviewer Assignment',
                  'First Review',
                  'Revision / Re-review as Required',
                  'Second Review',
                  'Final Editorial Decision',
                  'Preparation of Accepted Manuscripts'
                ].map((step, index) => (
                  <div key={index} className="relative pl-6">
                    <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-teal-500 ring-4 ring-white" />
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">{step}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <Link href="/publication" className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors">
                  Read Full Publication Guidelines
                  <svg className="w-4 h-4 hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
