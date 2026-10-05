import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Image layer with dark overlay */}
      {/* Background Image layer with dark overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/Alvas.jpg')" }}
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container-custom relative z-10 py-24 lg:py-32 w-full">
        <div className="max-w-4xl mx-auto xl:mx-0">
          {/* Conference badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-teal-500/30 bg-teal-500/10 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-300 text-sm font-medium tracking-wide">
              International Academic Conference
            </span>
          </div>

          {/* Conference short name */}
          <div className="text-teal-400 font-display text-5xl md:text-7xl font-bold mb-4 leading-none tracking-tight">
            IC-MEMS 2027
          </div>

          {/* Full name */}
          <h1 className="text-white text-xl md:text-3xl font-light leading-relaxed mb-8 max-w-2xl">
            International Conference on{" "}
            <span className="text-white font-semibold">Materials, Energy</span>{" "}
            and{" "}
            <span className="text-white font-semibold">
              Management for Sustainability
            </span>
          </h1>

          {/* Date & mode */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-white/90">
              <svg
                className="w-4 h-4 text-teal-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="font-semibold text-white">
                16–17 September 2027
              </span>
            </div>
            <span className="text-white/40 hidden sm:block">|</span>
            <div className="flex items-center gap-2 text-white/80">
              <svg
                className="w-4 h-4 text-teal-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <span>Hybrid Mode — In Person + Online</span>
            </div>
          </div>

          {/* Organiser */}
          <div className="flex items-center gap-2 text-white/80 mb-10">
            <svg
              className="w-4 h-4 text-teal-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <span className="text-white/60 mr-1">Organised by</span>
              <span className="text-white font-medium">
                Alva&rsquo;s Institute of Engineering and Technology
              </span>
              <span className="text-white/60 mx-1">·</span>
              <span className="text-white/80">Moodbidri, Karnataka, India</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Submit Abstract — Coming Soon */}
            <div className="coming-soon backdrop-blur-sm" title="Submission portal opening soon">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Submit Abstract — Opens 16 Jun 2027
            </div>

            {/* Register */}
            <Link
              href="/registration"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-teal-500/25"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Register Now
            </Link>

            {/* Download Brochure — Coming Soon */}
            <div
              className="coming-soon backdrop-blur-sm"
              title="Brochure will be available soon"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Brochure — Coming Soon
            </div>
          </div>

          {/* Theme pills */}
          <div className="mt-12 flex flex-wrap gap-2.5">
            {[
              "Advanced Materials",
              "Energy Systems & Hydrogen",
              "Environment & Climate",
              "Sustainable Management",
            ].map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 text-xs font-medium backdrop-blur-sm shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-xs z-10">
        <span>Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-teal-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
