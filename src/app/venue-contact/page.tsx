import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Venue & Contact | IC-MEMS 2027' };

export default function VenueContactPage() {
  return (
    <div className="page-enter">
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-gray-800 font-medium">Venue &amp; Contact</li>
          </ol>
        </div>
      </nav>

      <div className="gradient-navy text-white py-16">
        <div className="container-custom">
          <span className="badge bg-white/10 text-teal-300 mb-4">Where &amp; How</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Venue &amp; Contact</h1>
          <p className="text-white/70 max-w-xl">IC-MEMS 2027 is hosted at the Shobhavana Campus, AIET, Moodbidri.</p>
        </div>
      </div>

      <div className="container-custom max-w-5xl py-16 space-y-16">
        {/* Venue */}
        <section>
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0a192f' }}>Conference Venue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="rounded-2xl bg-teal-50 border border-teal-100 p-8 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl flex-shrink-0">📍</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Alva&rsquo;s Institute of Engineering and Technology</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Shobhavana Campus, Mijar<br />
                      Moodbidri – 574225<br />
                      Dakshina Kannada, Karnataka<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl bg-gray-100 border border-gray-200 h-64 flex flex-col items-center justify-center gap-3">
                <div className="text-4xl">🗺️</div>
                <p className="text-gray-500 text-sm font-medium">Interactive Map</p>
                <a
                  href="https://maps.google.com/?q=Alva%27s+Institute+of+Engineering+and+Technology+Moodbidri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-600 hover:text-teal-600 hover:border-teal-200 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </div>

            <div className="space-y-5">
              {/* Directions */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="font-bold mb-4" style={{ color: '#0a192f' }}>How to Reach</h3>
                <div className="space-y-4">
                  {[
                    { icon: '✈️', title: 'By Air', desc: 'Mangalore International Airport is the nearest airport. AIET is accessible from Mangalore.' },
                    { icon: '🚂', title: 'By Rail', desc: 'Moodbidri does not have a railway station. The nearest major railway station is at Mangalore.' },
                    { icon: '🚌', title: 'By Road', desc: 'Moodbidri is well connected by state highway. Direct bus services are available from Mangalore.' },
                  ].map((m) => (
                    <div key={m.title} className="flex gap-3">
                      <span className="text-xl flex-shrink-0">{m.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{m.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accommodation */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏨</span>
                  <div>
                    <h3 className="font-bold text-amber-900 mb-2">Accommodation</h3>
                    <p className="text-amber-800 text-sm leading-relaxed mb-2">
                      Limited accommodation can be arranged on a first-come, first-served basis at a nominal charge, subject to availability. Participants who are not allotted accommodation will need to arrange their own stay.
                    </p>
                    <p className="text-amber-700 text-xs">
                      Accommodation is not included in the registration fee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0a192f' }}>Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {[
              {
                icon: '✉️',
                label: 'Email',
                value: 'icmems2027@gmail.com',
                href: 'mailto:icmems2027@gmail.com',
              },
              {
                icon: '📞',
                label: 'Phone',
                value: (
                  <>
                    +91 89041 42098<br />
                    +91 96119 45201<br />
                    +91 98928 18760
                  </>
                ),
                href: 'tel:+918904142098',
              },
            ].map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.label === 'WhatsApp' ? '_blank' : undefined}
                rel={contact.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 bg-white hover:border-teal-300 hover:shadow-md transition-all group"
              >
                <span className="text-3xl">{contact.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{contact.label}</p>
                  <p className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors text-sm mt-0.5">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0a192f' }}>Send a Message</h3>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                <input id="contact-name" type="text" required placeholder="Your full name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                <input id="contact-email" type="email" required placeholder="your@email.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <input id="contact-subject" type="text" placeholder="Query subject" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                <textarea id="contact-message" required rows={4} placeholder="Your message" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition resize-none" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="px-7 py-2.5 rounded-xl bg-[#0a192f] hover:bg-[#163560] text-white font-semibold text-sm transition-colors">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
