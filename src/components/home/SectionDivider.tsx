import React from 'react';

/**
 * SectionDivider — A refined, academic conference section break for ICMEMS 2027.
 * Clean, subtle, and elegant with a delicate hairline and centered conference insignia.
 */

export type DividerIconName = 'crystal' | 'globe' | 'paper' | 'flask' | 'cap' | 'chart' | 'leaf' | 'gear';

interface SectionDividerProps {
  /** Conference icon shown in the central insignia */
  icon?: DividerIconName;
  /** Section background color underneath */
  bg?: string;
  /** Label text for accessibility */
  title?: string;
}

const icons: Record<DividerIconName, React.ReactNode> = {
  crystal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-full h-full">
      <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
      <polyline points="12,2 12,22" />
      <polyline points="3,7 12,12 21,7" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-full h-full">
      <circle cx="12" cy="12" r="9.5" />
      <ellipse cx="12" cy="12" rx="4.5" ry="9.5" />
      <path d="M2.5 12h19M4 7h16M4 17h16" />
    </svg>
  ),
  paper: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-full h-full">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-full h-full">
      <path d="M10 2v5.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 7.5V2" />
      <line x1="8.5" y1="2" x2="15.5" y2="2" />
      <circle cx="10" cy="16" r="1" fill="currentColor" />
      <circle cx="14" cy="14" r="1.2" fill="currentColor" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-full h-full">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-full h-full">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-full h-full">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-full h-full">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

export default function SectionDivider({ icon = 'globe', bg = '#ffffff' }: SectionDividerProps) {
  return (
    <div
      className="relative w-full overflow-hidden pointer-events-none select-none flex items-center justify-center"
      style={{ background: bg, height: '42px' }}
      aria-hidden="true"
    >
      {/* Subtle dual-line gradient rule */}
      <div
        className="absolute inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #e2e8f0 18%, #14b8a6 50%, #e2e8f0 82%, transparent 100%)',
          top: '50%',
        }}
      />

      {/* Decorative side accent pips */}
      <div
        className="absolute w-2 h-2 rounded-full bg-teal-400/40"
        style={{ left: 'calc(50% - 36px)', top: 'calc(50% - 4px)' }}
      />
      <div
        className="absolute w-2 h-2 rounded-full bg-teal-400/40"
        style={{ right: 'calc(50% - 36px)', top: 'calc(50% - 4px)' }}
      />

      {/* Central insignia badge */}
      <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-teal-400/70 shadow-xs text-teal-600 transition-transform duration-300">
        <div className="w-4 h-4 text-teal-600">
          {icons[icon] || icons.globe}
        </div>
      </div>
    </div>
  );
}
