import connectToDatabase from '@/lib/mongodb';
import Track from '@/models/Track';

export interface FormattedTrack {
  id: string;
  number: string;
  rawNumber: string;
  title: string;
  shortTitle: string;
  description: string;
  subtopics: string[];
  color: string;
  bg: string;
  border: string;
  accent: string;
  gradient: string;
  icon: string;
  shortIcon: string;
}

export const DEFAULT_TRACKS: FormattedTrack[] = [
  {
    id: 'track-1',
    number: '01',
    rawNumber: '1',
    title: 'Advanced and Sustainable Materials',
    shortTitle: 'Advanced Materials',
    description:
      'Exploring energy materials, nanomaterials, smart materials, biodegradable polymers, advanced coatings, thermoelectric and optical/electronic materials for a sustainable future.',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    accent: '#2563eb',
    gradient: 'from-blue-600 to-blue-700',
    icon: '⚗️',
    shortIcon: 'MAT',
    subtopics: [
      'Energy materials', 'Solar cell materials', 'Fuel cell materials',
      'Battery materials', 'Supercapacitors', 'Hydrogen storage materials',
      'Thermoelectric materials', 'Energy harvesting materials', 'Smart materials',
      'Biodegradable polymers', 'Green and natural fiber composites', 'Nanomaterials',
      'Optical/electronic materials', 'Advanced coatings', 'Recycled and sustainable materials',
      'Functional thin films',
    ],
  },
  {
    id: 'track-2',
    number: '02',
    rawNumber: '2',
    title: 'Energy Systems, Hydrogen & Sustainable Energy',
    shortTitle: 'Energy & Hydrogen',
    description:
      'Covering renewable energy, green hydrogen, fuel cells, energy management, AI-enabled systems and hydrogen mobility for a low-carbon energy transition.',
    color: '#0d9488',
    bg: '#f0fdfa',
    border: '#99f6e4',
    accent: '#0d9488',
    gradient: 'from-teal-600 to-teal-700',
    icon: '⚡',
    shortIcon: 'ENG',
    subtopics: [
      'Renewable energy', 'Solar energy', 'Wind energy', 'Bioenergy',
      'Green hydrogen', 'Hydrogen storage', 'Hydrogen utilization',
      'PEM fuel cells', 'Energy management', 'Energy efficiency',
      'AI-enabled energy systems', 'Hydrogen mobility',
    ],
  },
  {
    id: 'track-3',
    number: '03',
    rawNumber: '3',
    title: 'Environment, Climate & Sustainable Engineering',
    shortTitle: 'Environment & Climate',
    description:
      'Addressing environmental engineering, climate change mitigation, carbon capture, waste-to-energy, GIS, remote sensing, and circular economy principles.',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    accent: '#16a34a',
    gradient: 'from-green-600 to-green-700',
    icon: '🌿',
    shortIcon: 'ENV',
    subtopics: [
      'Environmental engineering', 'Waste management', 'Waste-to-energy',
      'Climate change mitigation', 'Carbon capture and utilization', 'GIS',
      'Remote sensing', 'Environmental sustainability', 'Circular economy',
    ],
  },
  {
    id: 'track-4',
    number: '04',
    rawNumber: '4',
    title: 'Sustainable Management, Business & Finance',
    shortTitle: 'Sustainable Management',
    description:
      'Integrating ESG, green finance, circular business models, AI for sustainability, SDGs, responsible investment, and ethical leadership into business practice.',
    color: '#7c3aed',
    bg: '#faf5ff',
    border: '#e9d5ff',
    accent: '#7c3aed',
    gradient: 'from-purple-600 to-purple-700',
    icon: '📊',
    shortIcon: 'MGT',
    subtopics: [
      'Sustainable business', 'Strategic management', 'Green banking', 'Green finance',
      'Green marketing', 'ESG', 'Entrepreneurship', 'AI for sustainability',
      'Sustainable supply chains', 'Circular business models', 'Innovation management',
      'Technology management', 'CSR', 'Sustainable consumption', 'SDGs',
      'Stakeholder management', 'Responsible investment', 'Corporate governance',
      'Social entrepreneurship', 'Ethical leadership', 'Societal resilience',
      'Responsible AI', 'Innovation', 'Interdisciplinary approaches',
    ],
  },
];

const THEME_PALETTES = [
  {
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    accent: '#2563eb',
    gradient: 'from-blue-600 to-blue-700',
    icon: '⚗️',
    defaultShortIcon: 'MAT',
  },
  {
    color: '#0d9488',
    bg: '#f0fdfa',
    border: '#99f6e4',
    accent: '#0d9488',
    gradient: 'from-teal-600 to-teal-700',
    icon: '⚡',
    defaultShortIcon: 'ENG',
  },
  {
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    accent: '#16a34a',
    gradient: 'from-green-600 to-green-700',
    icon: '🌿',
    defaultShortIcon: 'ENV',
  },
  {
    color: '#7c3aed',
    bg: '#faf5ff',
    border: '#e9d5ff',
    accent: '#7c3aed',
    gradient: 'from-purple-600 to-purple-700',
    icon: '📊',
    defaultShortIcon: 'MGT',
  },
  {
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    accent: '#d97706',
    gradient: 'from-amber-600 to-amber-700',
    icon: '💡',
    defaultShortIcon: 'INN',
  },
  {
    color: '#e11d48',
    bg: '#fff1f2',
    border: '#fecdd3',
    accent: '#e11d48',
    gradient: 'from-rose-600 to-rose-700',
    icon: '🔬',
    defaultShortIcon: 'RES',
  },
  {
    color: '#4f46e5',
    bg: '#eef2ff',
    border: '#c7d2fe',
    accent: '#4f46e5',
    gradient: 'from-indigo-600 to-indigo-700',
    icon: '🤖',
    defaultShortIcon: 'TECH',
  },
  {
    color: '#0891b2',
    bg: '#ecfeff',
    border: '#a5f3fc',
    accent: '#0891b2',
    gradient: 'from-cyan-600 to-cyan-700',
    icon: '🌐',
    defaultShortIcon: 'SYS',
  },
];

function generateShortIcon(title: string, index: number): string {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0] + (words[2] ? words[2][0] : '')).toUpperCase().slice(0, 3);
  }
  if (words.length === 1 && words[0].length >= 3) {
    return words[0].slice(0, 3).toUpperCase();
  }
  return THEME_PALETTES[index % THEME_PALETTES.length].defaultShortIcon;
}

export function parseSubtopics(text: string): string[] {
  if (!text) return [];
  // Split on newlines first
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-*•–—\d.)\]]\s*/, '').trim())
    .filter(Boolean);

  if (lines.length > 1) {
    return lines;
  }

  // If only 1 line, check if comma or semicolon separated
  if (lines.length === 1 && (lines[0].includes(',') || lines[0].includes(';'))) {
    const delimiter = lines[0].includes(';') ? ';' : ',';
    const split = lines[0]
      .split(delimiter)
      .map((item) => item.trim().replace(/^[-*•–—\d.)\]]\s*/, '').trim())
      .filter(Boolean);
    if (split.length > 1) {
      return split;
    }
  }

  return lines;
}

export async function getTracks(): Promise<FormattedTrack[]> {
  try {
    await connectToDatabase();
    const dbTracks = await Track.find({}).lean();

    if (!dbTracks || dbTracks.length === 0) {
      return DEFAULT_TRACKS;
    }

    // Natural sort by trackNumber
    const sorted = [...dbTracks].sort((a: any, b: any) => {
      const numA = parseInt(a.trackNumber, 10);
      const numB = parseInt(b.trackNumber, 10);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      return String(a.trackNumber || '').localeCompare(String(b.trackNumber || ''), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });

    return sorted.map((track: any, idx: number) => {
      const palette = THEME_PALETTES[idx % THEME_PALETTES.length];
      const rawNumber = String(track.trackNumber || idx + 1);
      const formattedNumber =
        rawNumber.length === 1 && !isNaN(Number(rawNumber)) ? `0${rawNumber}` : rawNumber;
      const subtopics = parseSubtopics(track.text || '');

      // Build clean preview description
      let description = track.text || '';
      if (subtopics.length > 0) {
        description = subtopics.slice(0, 3).join(', ') + (subtopics.length > 3 ? '...' : '');
      }

      const shortTitle = track.title.length > 28
        ? track.title.split(' ').slice(0, 3).join(' ') + '…'
        : track.title;

      return {
        id: `track-${rawNumber}`,
        number: formattedNumber,
        rawNumber,
        title: track.title,
        shortTitle,
        description,
        subtopics,
        color: palette.color,
        bg: palette.bg,
        border: palette.border,
        accent: palette.accent,
        gradient: palette.gradient,
        icon: palette.icon,
        shortIcon: generateShortIcon(track.title, idx),
      };
    });
  } catch (err) {
    console.error('Error fetching tracks from MongoDB:', err);
    return DEFAULT_TRACKS;
  }
}
