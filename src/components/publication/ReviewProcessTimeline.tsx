'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ReviewStep {
  step: string;
  title: string;
  desc: string;
}

const reviewSteps: ReviewStep[] = [
  {
    step: '01',
    title: 'Technical Screening',
    desc: 'All submitted papers are screened for scope, originality and completeness.',
  },
  {
    step: '02',
    title: 'Reviewer Assignment',
    desc: 'Papers are assigned to domain experts from the editorial board.',
  },
  {
    step: '03',
    title: 'First Review',
    desc: 'Independent review and evaluation by assigned reviewers.',
  },
  {
    step: '04',
    title: 'Revision / Re-review',
    desc: 'Authors revise and resubmit based on reviewer comments if required.',
  },
  {
    step: '05',
    title: 'Second Review',
    desc: 'Revised papers are reviewed to confirm satisfactory revision.',
  },
  {
    step: '06',
    title: 'Final Editorial Decision',
    desc: 'Editorial board makes the final acceptance or rejection decision.',
  },
  {
    step: '07',
    title: 'Preparation of Accepted Manuscripts',
    desc: 'Accepted authors prepare manuscripts for journal publication.',
  },
];

export default function ReviewProcessTimeline() {
  return (
    <div className="relative max-w-4xl mx-auto py-8 overflow-hidden">
      {/* Desktop Center Connecting Line */}
      <div
        className="hidden md:block absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-0.5 bg-slate-200"
        aria-hidden="true"
      />

      {/* Mobile Left Connecting Line */}
      <div
        className="md:hidden absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200"
        aria-hidden="true"
      />

      <div className="space-y-8 md:space-y-12">
        {reviewSteps.map((s, idx) => {
          const isEven = idx % 2 === 1; // 0=odd(left), 1=even(right), 2=odd(left)...

          return (
            <div
              key={s.step}
              className="relative flex flex-col md:flex-row items-center w-full"
            >
              {/* Desktop Center Node on the Spine */}
              <div
                className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-20 w-10 h-10 rounded-full items-center justify-center font-bold text-xs text-white shadow-sm border-2 border-white ring-2 ring-slate-200"
                style={{ backgroundColor: '#0a192f' }}
              >
                {s.step}
              </div>

              {/* ─── DESKTOP LEFT COLUMN (Steps 01, 03, 05, 07) ─── */}
              <div className="w-full md:w-1/2 md:pr-12 pl-14 md:pl-0">
                {!isEven ? (
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-teal-500/50 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-100">
                        Step {s.step}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0a192f] mb-1.5 group-hover:text-teal-700 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {s.desc}
                    </p>

                    {/* Arrow Pointer to Spine (Desktop Only) */}
                    <div
                      className="hidden md:block absolute -right-2 top-8 w-4 h-4 bg-white border-t border-r border-slate-200 rotate-45 transform"
                      aria-hidden="true"
                    />
                  </motion.div>
                ) : (
                  <div className="hidden md:block" />
                )}
              </div>

              {/* ─── DESKTOP RIGHT COLUMN (Steps 02, 04, 06) ─── */}
              <div className="w-full md:w-1/2 md:pl-12 pl-14 mt-4 md:mt-0">
                {isEven ? (
                  <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-teal-500/50 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-100">
                        Step {s.step}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0a192f] mb-1.5 group-hover:text-teal-700 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {s.desc}
                    </p>

                    {/* Arrow Pointer to Spine (Desktop Only) */}
                    <div
                      className="hidden md:block absolute -left-2 top-8 w-4 h-4 bg-white border-b border-l border-slate-200 rotate-45 transform"
                      aria-hidden="true"
                    />
                  </motion.div>
                ) : (
                  <div className="md:hidden" />
                )}
              </div>

              {/* Mobile Node Badge */}
              <div
                className="md:hidden absolute left-2 top-5 z-20 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-sm border-2 border-white"
                style={{ backgroundColor: '#0a192f' }}
              >
                {s.step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
