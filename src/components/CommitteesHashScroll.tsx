'use client';

import { useEffect } from 'react';

export default function CommitteesHashScroll() {
  useEffect(() => {
    const scrollToTarget = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const id = window.location.hash.replace('#', '');
        const target = document.getElementById(id);
        if (target) {
          // Allow DOM to settle, then smooth scroll
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 80);
        }
      }
    };

    scrollToTarget();
    window.addEventListener('hashchange', scrollToTarget);
    return () => window.removeEventListener('hashchange', scrollToTarget);
  }, []);

  return null;
}
