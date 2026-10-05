import Link from 'next/link';

export default function VenueContactPreview() {
  return (
    <section className="section-padding bg-white" aria-label="Venue and Contact">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Venue */}
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-10">
            <span className="badge bg-navy-50 text-teal-700 mb-4" style={{ backgroundColor: '#f0faf9' }}>Location</span>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#0a192f' }}>Venue</h2>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Alva&rsquo;s Institute of Engineering and Technology</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Shobhavana Campus, Mijar, Moodbidri – 574225<br />
                  Dakshina Kannada, Karnataka, India
                </p>
              </div>
            </div>
            
            <Link
              href="/venue-contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:text-teal-700 hover:border-teal-200 hover:bg-teal-50 text-sm font-semibold transition-all shadow-sm"
            >
              View Maps & Travel Info
            </Link>
          </div>
          
          {/* Contact */}
          <div className="bg-[#050d1f] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <span className="badge bg-white/10 text-teal-300 mb-4 border border-white/10">Get in Touch</span>
              <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-teal-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:icmems2027@gmail.com" className="text-white hover:text-teal-400 font-medium transition-colors">icmems2027@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-teal-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:+919611945201" className="text-white hover:text-teal-400 font-medium transition-colors block">+91 96119 45201</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 text-green-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.098.548 4.07 1.504 5.782L.057 23.5 6 22.01A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.012-1.374l-.36-.214-3.727.988 1.003-3.67-.234-.374A9.821 9.821 0 012.182 12C2.182 6.551 6.551 2.182 12 2.182S21.818 6.551 21.818 12 17.449 21.818 12 21.818z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">WhatsApp</p>
                    <a href="https://wa.me/919892818760" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 font-medium transition-colors block">+91 98928 18760</a>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
