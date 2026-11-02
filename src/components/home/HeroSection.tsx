import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col justify-between bg-[#eaf4fb] pt-5 sm:pt-7 lg:pt-8 pb-8 sm:pb-12 lg:pb-14 overflow-hidden min-h-[calc(100vh-96px)] xl:min-h-[calc(100vh-108px)]"
      aria-label="Conference Hero"
    >
      {/* Background Campus/Tech Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-[center_right] bg-no-repeat"
          style={{ backgroundImage: "url('/hero.png')" }}
        />
        {/* Crisp luminous light scrim behind text column for 100% legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#eaf4fb]/95 via-[#eaf4fb]/80 to-transparent w-full md:w-[70%] lg:w-[64%]" />
      </div>

      {/* Top-left subtle curved ribbon wave accents */}
      <div className="absolute left-0 top-0 w-[360px] h-[240px] pointer-events-none z-0 opacity-40">
        <svg viewBox="0 0 360 240" fill="none" className="w-full h-full">
          <path d="M0 0 C120 70 180 160 0 240" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
          <path d="M0 0 C160 50 240 140 60 240" stroke="#00ab80" strokeWidth="1.2" strokeOpacity="0.3" fill="none" />
          <path d="M0 0 C200 40 280 110 120 240" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.25" fill="none" />
        </svg>
      </div>

      {/* Bottom-left layered curved wave swoosh */}
      <div className="absolute left-0 bottom-0 w-[48%] min-w-[280px] max-w-[520px] h-[70px] sm:h-[85px] lg:h-[100px] pointer-events-none z-[5] overflow-hidden">
        <svg
          viewBox="0 0 650 200"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Pale cyan / translucent top wave accent */}
          <path
            d="M0 200 L0 80 Q160 90 340 150 T650 200 Z"
            fill="url(#waveCyanLight)"
            opacity="0.65"
          />
          {/* Vibrant turquoise / cyan middle curve */}
          <path
            d="M0 200 L0 115 Q170 120 350 165 T650 200 Z"
            fill="url(#waveTealMid)"
            opacity="0.88"
          />
          {/* Deeper marine teal curve at the bottom */}
          <path
            d="M0 200 L0 150 Q180 150 350 182 T650 200 Z"
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

      {/* Main Hero Content - Balanced from top to bottom and shifted slightly right */}
      <div className="container-custom relative z-10 w-full flex-1 flex flex-col justify-center my-auto py-2 sm:py-4">
        <div className="w-full max-w-[580px] lg:max-w-[640px] xl:max-w-[680px] flex flex-col items-start text-left sm:ml-4 md:ml-10 lg:ml-16 xl:ml-20 mr-auto relative">
          
          {/* ── Subtle Ambient Glow Behind The Text ── */}
          <div className="absolute -top-10 -left-10 -right-8 -bottom-8 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
            <div
              className="absolute top-1/4 left-6 w-[400px] h-[260px] rounded-full blur-3xl opacity-30 animate-aura-pulse"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(13, 148, 136, 0.4) 0%, rgba(56, 189, 248, 0.25) 50%, transparent 75%)',
              }}
            />
          </div>

          {/* Institution Header & Organizing Partnership Badge - Side-by-side with refined logo scale */}
          <div className="flex flex-nowrap items-center gap-1.5 sm:gap-3 mb-3 sm:mb-4 lg:mb-5 max-w-full">
            {/* Alva's Logo & Institution Name */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <img
                src="/alvas-org-logo.png"
                alt="Alva's Education Foundation"
                className="h-7 sm:h-9 lg:h-10 w-auto object-contain shrink-0"
              />
              <div className="h-6 sm:h-8 w-[1px] bg-slate-400/60 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[#0c2340] text-[10.5px] sm:text-[12px] lg:text-[13px] font-bold tracking-tight leading-tight whitespace-nowrap">
                  Alva&rsquo;s Institute of
                </span>
                <span className="text-[#0c2340] text-[10.5px] sm:text-[12px] lg:text-[13px] font-bold tracking-tight leading-tight whitespace-nowrap">
                  Engineering &amp; Technology
                </span>
                <span className="text-slate-600 text-[8px] sm:text-[9px] lg:text-[10px] font-medium leading-tight whitespace-nowrap mt-0.5">
                  Moodbidri, Karnataka, India
                </span>
              </div>
            </div>

            {/* In Association With Divider & Kingdom University Logo */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="w-2 sm:w-4 h-[1px] bg-slate-400/50 shrink-0 hidden min-[480px]:block" />
              <span className="text-slate-500 text-[7.5px] sm:text-[8.5px] lg:text-[9.5px] font-semibold uppercase tracking-wider whitespace-nowrap">
                IN ASSOCIATION WITH
              </span>
              <span className="w-2 sm:w-4 h-[1px] bg-slate-400/50 shrink-0 hidden min-[480px]:block" />
              <img
                src="/kingdom-university-clean.png"
                alt="Kingdom University"
                className="h-6 sm:h-8 lg:h-9 w-auto object-contain shrink-0"
              />
            </div>
          </div>

          {/* Conference Acronym - Serif Font Style (Playfair Display) */}
          <div className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight mb-2 sm:mb-2.5 lg:mb-3 leading-none flex items-baseline gap-3 sm:gap-4 flex-wrap">
            <span className="text-[#0c2340] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">ICMEMS</span>
            <div className="relative inline-flex flex-col items-center">
              <span className="text-[#0e7437] font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">2027</span>
              {/* Subtle green decorative curved swoosh underneath 2027 matching photo */}
              <svg className="w-full h-2.5 sm:h-3 text-[#0e7437] -mt-0.5 sm:-mt-1" viewBox="0 0 100 12" fill="none" preserveAspectRatio="none">
                <path d="M0 2 C 30 10, 70 10, 100 2 C 70 6, 30 6, 0 2 Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Full Official Title - Matching exact colors from photo: Navy & Forest Green with Left Green Accent Bar */}
          <h1 className="font-serif text-base sm:text-lg md:text-xl lg:text-[23px] font-normal leading-snug sm:leading-relaxed mb-3 sm:mb-4 lg:mb-5 tracking-tight">
            <span className="block text-slate-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] mb-1">
              International Conference on
            </span>
            <div className="border-l-[3.5px] border-[#16a34a] pl-2.5 sm:pl-3">
              <span className="block font-bold text-[#0a2265] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                Materials, Energy and Management
              </span>
              <span className="block font-bold text-[#0e7437] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                for Sustainability
              </span>
            </div>
          </h1>

          {/* Tagline - Matching exact dual-color text from photo with leaf icon */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-sky-200/60 shadow-xs mb-4 sm:mb-5 lg:mb-6">
            {/* Green Leaf Icon */}
            <svg className="w-3.5 h-3.5 text-[#0e7437] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.14em] uppercase flex items-center gap-1.5 flex-wrap">
              <span className="text-[#0a2265]">INNOVATING TODAY FOR A</span>
              <span className="text-[#0e7437]">SUSTAINABLE TOMORROW</span>
            </span>
          </div>

          {/* 4 Key Meta Cards - Exact matching background, lime icons, and slate-300 labels */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full mb-5 sm:mb-6 lg:mb-7 text-left">
            {/* 1. Dates */}
            <div className="px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-xl bg-gradient-to-br from-[#023c3f] to-[#012527] hover:from-[#034d51] hover:to-[#023336] backdrop-blur-md border border-teal-500/30 shadow-[0_4px_14px_rgba(2,60,63,0.3)] hover:shadow-lg transition-all flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-lime-500/15 border border-lime-400/30 flex items-center justify-center shrink-0 text-[#84cc16]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-300">DATES</div>
                <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">16 – 18 Sept 2027</div>
              </div>
            </div>

            {/* 2. Venue */}
            <div className="px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-xl bg-gradient-to-br from-[#023c3f] to-[#012527] hover:from-[#034d51] hover:to-[#023336] backdrop-blur-md border border-teal-500/30 shadow-[0_4px_14px_rgba(2,60,63,0.3)] hover:shadow-lg transition-all flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-lime-500/15 border border-lime-400/30 flex items-center justify-center shrink-0 text-[#84cc16]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-300">VENUE</div>
                <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">Moodbidri, India</div>
              </div>
            </div>

            {/* 3. Format */}
            <div className="px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-xl bg-gradient-to-br from-[#023c3f] to-[#012527] hover:from-[#034d51] hover:to-[#023336] backdrop-blur-md border border-teal-500/30 shadow-[0_4px_14px_rgba(2,60,63,0.3)] hover:shadow-lg transition-all flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-lime-500/15 border border-lime-400/30 flex items-center justify-center shrink-0 text-[#84cc16]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-300">FORMAT</div>
                <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">Hybrid Mode</div>
              </div>
            </div>

            {/* 4. Publication */}
            <div className="px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-xl bg-gradient-to-br from-[#023c3f] to-[#012527] hover:from-[#034d51] hover:to-[#023336] backdrop-blur-md border border-teal-500/30 shadow-[0_4px_14px_rgba(2,60,63,0.3)] hover:shadow-lg transition-all flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-lime-500/15 border border-lime-400/30 flex items-center justify-center shrink-0 text-[#84cc16]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-300">PUBLICATION</div>
                <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">Scopus Indexed</div>
              </div>
            </div>
          </div>

          {/* Action CTAs - Matching photo text colors */}
          <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-3.5 w-full">
            {/* Primary Green CTA Button */}
            <Link
              href="/registration"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#047857] hover:bg-[#065f46] text-white font-bold text-xs sm:text-sm lg:text-[15px] transition-all hover:shadow-lg hover:shadow-emerald-950/25 active:scale-98 shadow-md shrink-0"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Register for Conference &rarr;
            </Link>

            {/* Secondary Frosted White CTA Button - Navy Text with Green Icon */}
            <Link
              href="/for-authors#call-for-papers"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/95 hover:bg-white backdrop-blur-md text-[#0a2265] font-bold text-xs sm:text-sm lg:text-[15px] border border-white/90 transition-all shadow-sm hover:shadow-md active:scale-98 shrink-0"
            >
              <svg className="w-4 h-4 text-[#047857]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Call for Papers
            </Link>

            {/* Tertiary Frosted Pill Button - Navy Text with Green Calendar Icon */}
            <Link
              href="#dates"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/95 hover:bg-white backdrop-blur-md text-[#0a2265] hover:text-[#047857] font-bold text-xs sm:text-sm lg:text-[15px] border border-white/90 transition-all shadow-xs hover:shadow-sm shrink-0"
            >
              <svg className="w-4 h-4 text-[#047857]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              View Schedule &rarr;
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
