'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FormattedTrack } from '@/lib/tracks';

interface TrackCardProps {
  track: FormattedTrack;
  index: number;
}

export default function TrackCard({ track, index }: TrackCardProps) {
  // Alternating layout:
  // index 0 (Track 1): Image column on LEFT, Subtopics on RIGHT
  // index 1 (Track 2): Subtopics on LEFT, Image column on RIGHT
  // index 2 (Track 3): Image column on LEFT, Subtopics on RIGHT
  // index 3 (Track 4): Subtopics on LEFT, Image column on RIGHT
  const isImageOnRight = index % 2 === 1;

  return (
    <motion.article
      id={track.id}
      suppressHydrationWarning
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-28 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group"
      aria-labelledby={`heading-${track.id}`}
    >
      {/* Top Accent Ribbon with Track Color */}
      <div
        className="h-2 w-full transition-all duration-300 group-hover:h-2.5"
        style={{
          background: `linear-gradient(90deg, ${track.color} 0%, ${track.border} 100%)`,
        }}
      />

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* ===================== IMAGE & TITLE & ACTION COLUMN ===================== */}
          <motion.div
            suppressHydrationWarning
            initial={{ opacity: 0, x: isImageOnRight ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
            className={`lg:col-span-6 flex flex-col justify-between ${
              isImageOnRight ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            {/* 1. Title & Badge directly ABOVE the image */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase text-white shadow-xs"
                  style={{ backgroundColor: track.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Track {track.number}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {track.subtopics?.length || 0} Research Domains
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                  Scopus Publication
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-xs"
                  style={{ backgroundColor: track.bg, border: `1px solid ${track.border}` }}
                  role="img"
                  aria-hidden="true"
                >
                  {track.icon}
                </div>
                <h2
                  id={`heading-${track.id}`}
                  className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-[#0a192f] tracking-tight leading-snug"
                >
                  {track.title}
                </h2>
              </div>
            </div>

            {/* 2. Clean Image Frame without blue background */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-500 group/img bg-slate-50">
              {track.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={track.image}
                  alt={track.imageAlt || track.title}
                  className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover/img:scale-[1.02]"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              ) : (
                <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm mb-3"
                    style={{ backgroundColor: track.bg, border: `1px solid ${track.border}` }}
                  >
                    {track.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-800">Track {track.number}: {track.title}</span>
                  <span className="text-xs text-slate-500 mt-1">Peer-Reviewed &amp; Scopus Indexed Research Track</span>
                </div>
              )}
            </div>

            {/* 3. Submit Abstract directly BELOW the image */}
            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <Link
                href="/for-authors#call-for-papers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:scale-102 active:scale-98"
                style={{ backgroundColor: track.color }}
              >
                <span>Submit Abstract to Track {track.number}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/for-authors"
                className="inline-flex items-center justify-center text-xs font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-4"
              >
                Submission Guidelines &rarr;
              </Link>
            </div>
          </motion.div>

          {/* ===================== SCOPE & SUBTOPICS COLUMN ===================== */}
          <motion.div
            suppressHydrationWarning
            initial={{ opacity: 0, x: isImageOnRight ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
            className={`lg:col-span-6 flex flex-col justify-between h-full ${
              isImageOnRight ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <div>
              {/* Header for Scope */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: track.color }}
                  />
                  Research Scope &amp; Focus Domains
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Track {track.number}
                </span>
              </div>

              {/* Scope Description */}
              {track.description && (
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60">
                  {track.description}
                </p>
              )}

              {/* Subtopics Checklist */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Accepted Research Subtopics ({track.subtopics.length}):
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Select for abstract submission
                  </span>
                </div>

                {track.subtopics && track.subtopics.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                    {track.subtopics.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 p-2 rounded-lg bg-slate-50/90 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-2xs transition-all duration-200 group/pill"
                      >
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold shadow-2xs"
                          style={{ backgroundColor: track.color }}
                        >
                          ✓
                        </span>
                        <span className="text-xs font-medium text-slate-800 leading-tight truncate" title={sub}>
                          {sub}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-600">
                    {track.description || 'Details will be announced soon.'}
                  </p>
                )}
              </div>
            </div>

            {/* Publication & Deadline Footer */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span>Abstract Deadline: <strong className="text-slate-800">16 June 2027</strong></span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="hidden sm:inline">250–300 words</span>
              </div>
              <span className="text-teal-700 font-semibold">Peer-Reviewed &amp; Scopus Indexed</span>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.article>
  );
}
