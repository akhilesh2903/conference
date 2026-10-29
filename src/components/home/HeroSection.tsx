import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[calc(100vh-46px)] flex flex-col justify-start bg-[#eaf4fb] pt-[72px] sm:pt-[78px] xl:pt-[82px] pb-8 sm:pb-12 overflow-hidden"
      aria-label="Conference Hero"
    >
      {/* Background Campus/Tech Image Layer with background shadow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-[center_right] bg-no-repeat"
          style={{ backgroundImage: "url('/hero.png')" }}
        />
        {/* Background shadow gradient providing depth and contrast behind content */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-slate-950/20 to-transparent w-full sm:w-[70%]" />
      </div>

      {/* Top-left subtle curved ribbon wave accents from reference */}
      <div className="absolute left-0 top-0 w-[360px] h-[240px] pointer-events-none z-0 opacity-40">
        <svg viewBox="0 0 360 240" fill="none" className="w-full h-full">
          <path d="M0 0 C120 70 180 160 0 240" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
          <path d="M0 0 C160 50 240 140 60 240" stroke="#00ab80" strokeWidth="1.2" strokeOpacity="0.3" fill="none" />
          <path d="M0 0 C200 40 280 110 120 240" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.25" fill="none" />
        </svg>
      </div>

      {/* Bottom-left layered curved wave swoosh matching the reference banner */}
      <div className="absolute left-0 bottom-0 w-[58%] min-w-[340px] max-w-[720px] h-[150px] sm:h-[185px] lg:h-[210px] pointer-events-none z-[5] overflow-hidden">
        <svg
          viewBox="0 0 650 200"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Pale cyan / translucent top wave accent - hugs behind the green CTA */}
          <path
            d="M0 200 L0 55 Q160 65 340 135 T650 200 Z"
            fill="url(#waveCyanLight)"
            opacity="0.65"
          />
          {/* Vibrant turquoise / cyan middle curve */}
          <path
            d="M0 200 L0 95 Q170 100 350 155 T650 200 Z"
            fill="url(#waveTealMid)"
            opacity="0.88"
          />
          {/* Deeper marine teal curve at the bottom */}
          <path
            d="M0 200 L0 140 Q180 140 350 178 T650 200 Z"
            fill="url(#waveNavyDark)"
          />
          <defs>
            <linearGradient id="waveCyanLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="40%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="waveTealMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#009688" />
              <stop offset="100%" stopColor="#04566e" />
            </linearGradient>
            <linearGradient id="waveNavyDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#032b44" />
              <stop offset="60%" stopColor="#053e5e" />
              <stop offset="100%" stopColor="#022135" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Hero Content - Left aligned with generous breathing room */}
      <div className="container-custom relative z-10 w-full pt-2 sm:pt-3 md:pt-4 pb-4 sm:pb-6 flex flex-col justify-start">
        <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-start text-left mr-auto">
          
          {/* Institution Header & Organizing Partnership Badge floating directly on sky background without white box */}
          <div className="flex flex-nowrap items-center gap-2.5 sm:gap-4 lg:gap-5 mb-2.5 sm:mb-3.5 max-w-full overflow-x-auto sm:overflow-visible">
            {/* Alva's Logo & Institution Name */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <img
                src="/alvas-org-logo.png"
                alt="Alva's Education Foundation"
                className="h-10 sm:h-12 md:h-13 w-auto object-contain shrink-0"
              />
              <div className="h-8 sm:h-10 w-[1px] bg-slate-400/70 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[#0c2340] text-xs sm:text-sm md:text-[14px] font-bold tracking-tight leading-tight whitespace-nowrap">
                  Alva&rsquo;s Institute of
                </span>
                <span className="text-[#0c2340] text-xs sm:text-sm md:text-[14px] font-bold tracking-tight leading-tight whitespace-nowrap">
                  Engineering &amp; Technology
                </span>
                <span className="text-slate-600 text-[9px] sm:text-[11px] font-medium leading-tight whitespace-nowrap mt-0.5">
                  Moodbidri, Karnataka, India
                </span>
              </div>
            </div>

            {/* In Association With Divider */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 text-slate-500 text-[9px] sm:text-[10px] md:text-[11px] font-semibold uppercase tracking-widest px-1 shrink-0">
              <span className="w-4 sm:w-8 h-[1px] bg-slate-400/70 shrink-0 hidden min-[540px]:block" />
              <span className="whitespace-nowrap">IN ASSOCIATION WITH</span>
              <span className="w-4 sm:w-8 h-[1px] bg-slate-400/70 shrink-0 hidden min-[540px]:block" />
            </div>

            {/* Kingdom University Logo */}
            <div className="flex items-center shrink-0">
              <img
                src="/kingdom-university-clean.png"
                alt="Kingdom University"
                className="h-9 sm:h-11 md:h-12 w-auto object-contain shrink-0"
              />
            </div>
          </div>

          {/* Conference Acronym - Serif Font Style from reference photo (Playfair Display) */}
          <div className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight mb-1 sm:mb-1.5 leading-none flex items-baseline gap-3 sm:gap-4 flex-wrap">
            <span className="text-[#0c2340] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">IC MEMS</span>
            <span className="text-[#00a87e] font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">2027</span>
          </div>

          {/* Full Official Title - Serif Font Style from reference photo */}
          <h1 className="font-serif text-base sm:text-xl md:text-2xl lg:text-[25px] font-normal leading-snug mb-2 sm:mb-2.5 tracking-tight">
            <span className="block text-slate-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">International Conference on</span>
            <span className="block font-bold text-[#0d5e54] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
              Materials, Energy and Management
            </span>
            <span className="block font-bold text-[#0d5e54] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
              for Sustainability
            </span>
          </h1>

          {/* Tagline from reference photo */}
          <div className="text-slate-600 text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-3.5 sm:mb-4 flex items-center gap-2">
            <span className="w-5 h-[1.5px] bg-[#00a87e] shrink-0" />
            <span>INNOVATING TODAY FOR A SUSTAINABLE TOMORROW</span>
          </div>

          {/* 4 White Key Meta Cards - Slightly Transparent Frosted Glass matching reference image */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-[620px] lg:max-w-[680px] mb-3.5 sm:mb-4.5 text-left">
            {/* 1. Dates */}
            <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white/75 hover:bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex items-center gap-2.5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0 text-[#00a87e]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#059669]">DATES</div>
                <div className="text-[11px] sm:text-xs md:text-[13px] font-bold text-slate-900 whitespace-nowrap">16 – 18 Sept 2027</div>
              </div>
            </div>

            {/* 2. Venue */}
            <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white/75 hover:bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex items-center gap-2.5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0 text-[#00a87e]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#059669]">VENUE</div>
                <div className="text-[11px] sm:text-xs md:text-[13px] font-bold text-slate-900 whitespace-nowrap">Moodbidri, India</div>
              </div>
            </div>

            {/* 3. Format */}
            <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white/75 hover:bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex items-center gap-2.5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0 text-[#00a87e]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#059669]">FORMAT</div>
                <div className="text-[11px] sm:text-xs md:text-[13px] font-bold text-slate-900 whitespace-nowrap">Hybrid Mode</div>
              </div>
            </div>

            {/* 4. Proceedings */}
            <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white/75 hover:bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex items-center gap-2.5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0 text-[#00a87e]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#059669]">PROCEEDINGS</div>
                <div className="text-[11px] sm:text-xs md:text-[13px] font-bold text-slate-900 whitespace-nowrap">Scopus Indexed</div>
              </div>
            </div>
          </div>

          {/* Action CTAs - Left Aligned exactly matching target reference image */}
          <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4 w-full">
            {/* Primary Green CTA Button */}
            <Link
              href="/registration"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#009b72] hover:bg-[#008964] text-white font-bold text-xs sm:text-sm transition-all hover:shadow-lg hover:shadow-emerald-900/20 active:scale-98 shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Register for Conference &rarr;
            </Link>

            {/* Secondary Frosted White CTA Button - Slightly Transparent */}
            <Link
              href="/for-authors#call-for-papers"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/75 hover:bg-white/85 backdrop-blur-md text-slate-800 font-bold text-xs sm:text-sm border border-white/80 transition-all shadow-sm active:scale-98"
            >
              <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Call for Papers
            </Link>

            {/* Underlined Dark Text Link with subtle backlight for crisp readability */}
            <Link
              href="#dates"
              className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 text-[#0c2340] hover:text-[#009b72] font-bold text-xs sm:text-sm transition-colors underline underline-offset-4 decoration-2 decoration-[#0c2340] hover:decoration-[#009b72] drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]"
            >
              View Important Dates &rarr;
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}



