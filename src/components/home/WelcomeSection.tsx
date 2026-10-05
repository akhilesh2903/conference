import Link from 'next/link';

export default function WelcomeSection() {
  return (
    <section className="section-padding bg-gray-50 border-b border-gray-100" aria-label="Welcome">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="badge bg-navy-50 text-teal-700 mb-4" style={{ backgroundColor: '#f0faf9' }}>
              About the Conference
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: '#0a192f' }}>
              Welcome to <span className="text-gradient">IC-MEMS 2027</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                The <strong className="text-gray-800">International Conference on Materials, Energy and Management for Sustainability (IC-MEMS 2027)</strong>, organised by Alva&rsquo;s Institute of Engineering and Technology, Moodbidri, Karnataka, will be held on{' '}
                <strong className="text-gray-800">16–17 September 2027</strong> in hybrid mode.
              </p>
              <p>
                The conference brings together researchers, academicians, scientists, engineers, management professionals, industry representatives and policymakers to share research and discuss practical responses to sustainability challenges.
              </p>
              <p>
                It connects advances in science and engineering with the business strategies, financial decisions and organisational practices needed to translate innovation into sustainable outcomes.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Conference Themes</p>
              <div className="space-y-3">
                {[
                  ['01', 'Advanced and Sustainable Materials'],
                  ['02', 'Energy Systems, Hydrogen and Sustainable Energy'],
                  ['03', 'Environment, Climate and Sustainable Engineering'],
                  ['04', 'Sustainable Management, Business and Finance'],
                ].map(([num, title]) => (
                  <div key={num} className="flex items-center gap-4 p-3.5 rounded-xl bg-white border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all group">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-teal-600 flex-shrink-0"
                      style={{ backgroundColor: '#f0fdf4' }}
                    >
                      {num}
                    </span>
                    <span className="text-gray-700 font-medium text-sm group-hover:text-teal-700 transition-colors">{title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a192f] hover:bg-[#163560] text-white text-sm font-medium transition-colors"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/themes"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-teal-200 text-teal-700 hover:bg-teal-50 text-sm font-medium transition-colors"
              >
                Explore Themes
              </Link>
            </div>
          </div>

          {/* Stats / visual panel */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { value: '4', label: 'Conference Themes', icon: '01', color: 'blue' },
              { value: 'Hybrid', label: 'Mode of Conference', icon: '02', color: 'teal' },
              { value: '2 Days', label: 'Full Conference', icon: '03', color: 'green' },
              { value: 'Scopus', label: 'Indexed Publication', icon: '04', color: 'purple' },
              { value: '4000+', label: 'AIET Academic Community', icon: '05', color: 'orange' },
              { value: 'Sep 2027', label: 'Conference Date', icon: '06', color: 'teal' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
              >
                <div className="mb-4 text-xs font-extrabold tracking-[0.16em] text-teal-600" aria-hidden="true">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#0a192f' }}>{stat.value}</div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
