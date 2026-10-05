import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About | IC-MEMS 2027' };

const participants = [
  'Research Scholars (PG and PhD)', 'Faculty Members',
  'Scientists', 'Researchers', 'Academicians', 'Engineers',
  'Industry Professionals', 'Management Professionals', 'Policymakers', 'Entrepreneurs',
];

export default function AboutPage() {
  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-teal-600 transition-colors">Home</Link></li>
            <li aria-hidden="true"><span className="mx-1">/</span></li>
            <li className="text-gray-800 font-medium">About</li>
          </ol>
        </div>
      </nav>

      {/* Page header */}
      <div className="gradient-navy text-white py-16">
        <div className="container-custom">
          <span className="badge bg-white/10 text-teal-300 mb-4">IC-MEMS 2027</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">About the Conference</h1>
          <p className="text-white/70 max-w-2xl text-lg">
            An interdisciplinary international platform for sustainable innovation
          </p>
        </div>
      </div>

      {/* About Conference */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0a192f' }}>About the Conference</h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  International Conference on Materials, Energy and Management for Sustainability (IC-MEMS 2027) provides an interdisciplinary international platform for researchers, academicians, scientists, engineers, research scholars, industry professionals, and other stakeholders to exchange recent developments, innovations and emerging ideas addressing global sustainability challenges.
                </p>
                <p>
                  The conference brings together diverse perspectives across Advanced and Sustainable Materials, including energy materials, fuel-cell and battery materials, hydrogen-storage materials, nanomaterials, functional thin films and sustainable composites; Energy Systems, Hydrogen and Sustainable Energy Technologies, Environment, Climate and Sustainable Engineering; and Sustainable Management, Business and Finance, focusing on ESG, sustainable business, green finance, innovation and technology management, responsible investment, entrepreneurship and sustainable supply chains.
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl bg-teal-50 border border-teal-100 p-6">
                <div className="text-3xl mb-3">📅</div>
                <h3 className="font-bold mb-1" style={{ color: '#0a192f' }}>Conference Date</h3>
                <p className="text-gray-600 text-sm">16–17 September 2027</p>
              </div>
              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
                <div className="text-3xl mb-3">🌐</div>
                <h3 className="font-bold mb-1" style={{ color: '#0a192f' }}>Conference Mode</h3>
                <p className="text-gray-600 text-sm">Hybrid — In Person & Online</p>
              </div>
              <div className="rounded-2xl bg-purple-50 border border-purple-100 p-6">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-bold mb-1" style={{ color: '#0a192f' }}>Publication</h3>
                <p className="text-gray-600 text-sm">Selected papers in Scopus-indexed journals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About AIET */}
      <section className="section-padding bg-gray-50 border-t border-gray-100">
        <div className="container-custom max-w-5xl">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0a192f' }}>
            About Alva&rsquo;s Institute of Engineering and Technology
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5 text-gray-600 leading-relaxed">
              <p>
                Alva&rsquo;s Institute of Engineering and Technology (AIET), located at Shobhavana Campus, Mijar, Moodbidri, Karnataka, is committed to education, research and innovation in engineering and management. The institute emphasises the connection between academic learning and professional practice, encouraging students and faculty to engage with technological, business and societal challenges.
              </p>
              <p>
                AIET promotes interdisciplinary research in areas including sustainable materials, renewable energy, green hydrogen, hydrogen storage, fuel cells, sensors and advanced technologies. Management perspectives complement these areas through a focus on entrepreneurship, innovation, responsible business practices and the organisational capabilities needed to translate research into practical applications. Industry–academia interaction provides opportunities to exchange knowledge, understand emerging needs and explore collaborative solutions.
              </p>
              <p>
                Through IC-MEMS 2027, AIET seeks to bring together researchers and practitioners from diverse disciplines to examine sustainability through both technological and managerial perspectives. The conference reflects the institute&rsquo;s commitment to knowledge sharing and collaboration, providing a forum to discuss how advances in materials, energy, environmental engineering, business and finance can contribute to sustainable development.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
              <div className="gradient-navy h-32 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl font-bold mb-1">AIET</div>
                  <div className="text-white/60 text-xs">Moodbidri, Karnataka</div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 leading-relaxed">
                  The sole organiser of IC-MEMS 2027, providing state-of-the-art research facilities and an international academic environment at Shobhavana Campus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Participate */}
      <section className="section-padding bg-white border-t border-gray-100">
        <div className="container-custom max-w-5xl">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0a192f' }}>Who Can Participate</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {participants.map((p) => (
              <div key={p} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all">
                <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conference Objectives — Placeholder */}
      <section className="section-padding bg-gray-50 border-t border-gray-100">
        <div className="container-custom max-w-5xl">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0a192f' }}>Conference Objectives</h2>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
            <div className="text-4xl mb-4">🔄</div>
            <p className="text-amber-800 font-medium mb-2">Reserve this section for conference objectives.</p>
            <p className="text-amber-700 text-sm">Final wording is pending organising-team confirmation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
