import type { Metadata } from 'next';
import Link from 'next/link';
import CommitteesHashScroll from '@/components/CommitteesHashScroll';

export const metadata: Metadata = { 
  title: 'Committees & Advisory Board | IC-MEMS 2027',
  description: 'Leadership, International & National Advisory Boards, Organising Committee, and Editorial Board for IC-MEMS 2027 at AIET Moodbidri.'
};

// ─── 1. LEADERSHIP WITH PHOTO PLACEHOLDERS ───
// To swap in photos later: upload your photo to /public/leadership/filename.jpg and update the `image` field.
interface LeaderMember {
  role: string;
  name: string;
  affiliation: string;
  subTitle?: string;
  image: string;
  badgeColor?: string;
}

const chiefPatron: LeaderMember = {
  role: 'Chief Patron',
  name: 'Dr. Mohan Alva',
  affiliation: "Chairman, Alva's Education Foundation, Moodbidri",
  subTitle: 'Visionary Educationist & Philanthropist',
  image: '/leadership/dr-mohan-alva.jpg',
  badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
};

const patrons: LeaderMember[] = [
  {
    role: 'Patron',
    name: 'Mr. Vivek Alva',
    affiliation: 'Managing Trustee, Alva’s Education Foundation',
    subTitle: 'Executive Leadership',
    image: '/leadership/mr-vivek-alva.webp',
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
  },
  {
    role: 'Patron',
    name: 'Dr. Peter Fernandes',
    affiliation: 'Principal, Alva’s Institute of Engineering & Technology',
    subTitle: 'Academic Head',
    image: '/leadership/dr-peter-fernandes.jpg',
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
  },
];

const conferenceChairs: LeaderMember[] = [
  {
    role: 'Conference Chair',
    name: 'Dr. Richard Pinto',
    affiliation: 'Alva’s Institute of Engineering & Technology',
    subTitle: 'Research & Academic Strategy',
    image: '/leadership/dr-richard-pinto.jpg',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  {
    role: 'Conference Co-Chair',
    name: 'Dr. Satyanarayan',
    affiliation: 'Alva’s Institute of Engineering & Technology',
    subTitle: 'Technical Coordination',
    image: '/leadership/dr-satyanarayan.jpg',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  {
    role: 'Conference Co-Chair',
    name: 'Prof. Priya Sequeira',
    affiliation: 'Alva’s Institute of Engineering & Technology',
    subTitle: 'Institutional Coordination',
    image: '/leadership/prof-priya-sequeira.jpg',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
  },
];

const conveners: LeaderMember[] = [
  {
    role: 'Convener',
    name: 'Dr. Jayarama A',
    affiliation: 'Alva’s Institute of Engineering & Technology',
    subTitle: 'Conference Secretariat',
    image: '/leadership/dr-jayarama.jpg',
  },
  {
    role: 'Convener',
    name: 'Dr. Catherine Nirmala',
    affiliation: 'Alva’s Institute of Engineering & Technology',
    subTitle: 'Session Management',
    image: '/leadership/dr-catherine-nirmala.jpg',
  },
  {
    role: 'Convener',
    name: 'Dr. Vinay Shivamurthy',
    affiliation: 'Alva’s Institute of Engineering & Technology',
    subTitle: 'Technical Programs',
    image: '/leadership/dr-vinay-shivamurthy.jpg',
  },
  {
    role: 'Convener',
    name: 'Dr. Gurushanth B. Vaggar',
    affiliation: 'Alva’s Institute of Engineering & Technology',
    subTitle: 'Publications & Logistics',
    image: '/leadership/dr-gurushanth-vaggar.jpg',
  },
  {
    role: 'Convener',
    name: 'Dr. Shashikumar Kumaraswamy',
    affiliation: 'Alva’s Institute of Engineering & Technology',
    subTitle: 'Peer-Review Operations',
    image: '/leadership/avatar-academic.svg',
  },
];

// ─── 2. INTERNATIONAL ADVISORY COMMITTEE ───
const international = [
  { name: 'Prof. Philip J. Grandinetti', affiliation: 'The Ohio State University', country: 'United States', flag: 'USA' },
  { name: 'Prof. Jens Dittmer', affiliation: 'CNRS / Université du Mans', country: 'France', flag: 'FRA' },
  { name: 'Prof. Nicolas Mercier', affiliation: 'Université d’Angers', country: 'France', flag: 'FRA' },
  { name: 'Prof. Ivan Hetman', affiliation: 'Linköping University', country: 'Sweden', flag: 'SWE' },
  { name: 'Prof. Özlem Uguz Neli', affiliation: 'Stockholm University', country: 'Sweden', flag: 'SWE' },
  { name: 'Dr. Dhasiyan Arun Kumar', affiliation: 'ASM Japan', country: 'Japan', flag: 'JPN' },
  { name: 'Prof. Ir. Ts. Dr. Malathy A/P Batumalay', affiliation: 'INTI International University', country: 'Malaysia', flag: 'MYS' },
  { name: 'Dr. Shigeru Tanaka', affiliation: 'Kumamoto University', country: 'Japan', flag: 'JPN' },
  { name: 'Dr. I Wayan Budi Sentana', affiliation: 'Politeknik Negeri Bali (PNB)', country: 'Indonesia', flag: 'IDN' },
  { name: 'Dr. Ryuichi Tomoshige', affiliation: 'SoJo University', country: 'Japan', flag: 'JPN' },
  { name: 'Dr. Gurdip Kaur Saminder Singh', affiliation: 'Universiti Teknologi MARA', country: 'Malaysia', flag: 'MYS' },
  { name: 'Dr. V. Kumaradeepan', affiliation: 'University of Jaffna', country: 'Sri Lanka', flag: 'LKA' },
  { name: 'Prof. Gilbert Mbaka Nduru', affiliation: 'Deputy Vice Chancellor, Chuka University', country: 'Kenya', flag: 'KEN' },
];

// ─── 3. NATIONAL ADVISORY COMMITTEE ───
const national = [
  { name: 'Prof. Shriganesh S. Prabhu', affiliation: 'Tata Institute of Fundamental Research (TIFR), Mumbai' },
  { name: 'Prof. Achanta Venugopal', affiliation: 'Tata Institute of Fundamental Research (TIFR), Mumbai' },
  { name: 'Prof. Siddhartha P. Duttagupta', affiliation: 'Indian Institute of Technology (IIT) Bombay' },
  { name: 'Prof. Sathish B. Ogale', affiliation: 'Indian Institute of Science Education and Research (IISER), Pune' },
  { name: 'Prof. M. S. Ramachandra Rao', affiliation: 'Indian Institute of Technology (IIT) Madras' },
  { name: 'Prof. Prashant Kulkarni', affiliation: 'Defence Institute of Advanced Technology (DIAT), Pune' },
  { name: 'Dr. M. G. Ananda Kumar', affiliation: 'Central Power Research Institute (CPRI), Bengaluru' },
  { name: 'Dr. Ritanajali Majhi', affiliation: 'National Institute of Technology Karnataka (NITK), Surathkal' },
  { name: 'Balaji Shri Kamalakannan', affiliation: 'Alliance University, Bengaluru' },
  { name: 'Dr. Sunita Jadhav', affiliation: 'Bharati Vidyapeeth, Pune' },
  { name: 'Dr. Sanjog S. Nagarkar', affiliation: 'Indian Institute of Technology (IIT) Bombay' },
  { name: 'Dr. G. Anandha Babu', affiliation: 'SSN College of Engineering, Tamil Nadu' },
  { name: 'Dr. S. Janakiraman', affiliation: 'Indian Institute of Technology (IIT) Indore' },
  { name: 'Dr. K. Narayan Prabhu', affiliation: 'National Institute of Technology Karnataka (NITK), Surathkal' },
  { name: 'Dr. Arnab Datta', affiliation: 'Indian Institute of Technology (IIT) Bombay' },
  { name: 'C A Russell Parera (Retd.)', affiliation: 'Former Partner, PwC India / Former CEO, KPMG India' },
];

// ─── 4. ORGANISING COMMITTEE ───
const organising = [
  { name: 'Dr. Ravi Kumar Chandrappa', dept: 'AIET Moodbidri' },
  { name: 'Dr. Sakshi S. Kamath', dept: 'AIET Moodbidri' },
  { name: 'Dr. Ramaprasad A. T.', dept: 'AIET Moodbidri' },
  { name: 'Dr. S. Samshuddin', dept: 'AIET Moodbidri' },
  { name: 'Dr. Umeshchandra H. G.', dept: 'AIET Moodbidri' },
  { name: 'Dr. Vijay Joshi', dept: 'AIET Moodbidri' },
  { name: 'Mr. Johnson Fernandes', dept: 'AIET Moodbidri' },
  { name: 'Dr. Guruprasad', dept: 'AIET Moodbidri' },
  { name: 'Dr. Kumaraswamy', dept: 'AIET Moodbidri' },
  { name: 'Prof. Hemanth Suvarna', dept: 'AIET Moodbidri' },
  { name: 'Prof. Srinivas C S', dept: 'AIET Moodbidri' },
  { name: 'Dr. Ganesh V N', dept: 'AIET Moodbidri' },
  { name: 'Dr. Roshan Shetty', dept: 'AIET Moodbidri' },
  { name: 'Dr. Subrahmanya Bhat', dept: 'AIET Moodbidri' },
  { name: 'Mr. Abhishek B', dept: 'AIET Moodbidri' },
  { name: 'Ms. Krithika', dept: 'AIET Moodbidri' },
  { name: 'Ujwal S Shetty', dept: 'AIET Moodbidri' },
  { name: 'Leron Noronha', dept: 'AIET Moodbidri' },
  { name: 'Panchami Jogi', dept: 'AIET Moodbidri' },
  { name: 'Ankita Paradkar', dept: 'AIET Moodbidri' },
];

// ─── 5. EDITORIAL BOARD (SPLIT INTO 7 ON LEFT & 7 ON RIGHT) ───
const editorialLeft = [
  { num: '01', name: 'Dr. Richard Pinto', area: 'Condensed Matter Physics, Thin Films, Sensors, Energy and Fuel Cells' },
  { num: '02', name: 'Dr. Satyanarayan', area: 'Materials Engineering and Energy-Related Materials' },
  { num: '03', name: 'Dr. Jayarama A.', area: 'Thin Films, Sensors, Fuel Cells and Hydrogen Technologies' },
  { num: '04', name: 'Dr. Ramaprasad A. T.', area: 'Polymers and Membrane Technologies' },
  { num: '05', name: 'Dr. Shashikumar Kumaraswamy', area: 'Materials Characterisation, Solid-State NMR and DFT Analysis' },
  { num: '06', name: 'Dr. Gurushanth B. Vaggar', area: 'Materials Engineering and Energy-related Materials' },
  { num: '07', name: 'Dr. Sakshi S. Kamath', area: 'Polymer Composites and Materials Science' },
];

const editorialRight = [
  { num: '08', name: 'Dr. S. Samshuddin', area: 'Chemistry, Corrosion, Electrochemistry and Materials Chemistry' },
  { num: '09', name: 'Dr. Ravi Kumar Chandrappa', area: 'Polymer Composites, Materials Science and Spectroscopic Characterisation' },
  { num: '10', name: 'Dr. Vinay S.', area: 'Environmental Engineering, GIS, Remote Sensing and Sustainability' },
  { num: '11', name: 'Dr. Umeshchandra H. G.', area: 'Materials and Sustainable Technologies' },
  { num: '12', name: 'Dr. Catherine Nirmala', area: 'Management, Sustainability and Skill Development' },
  { num: '13', name: 'Dr. Habeeb Ur Rahiman', area: 'Management and Sustainable Business' },
  { num: '14', name: 'Dr. Niyaz Panakaje', area: 'Management, Finance and Sustainability' },
];

export default function CommitteesPage() {
  return (
    <div className="page-enter bg-slate-50 min-h-screen">
      <CommitteesHashScroll />
      {/* Page Header */}
      <div className="gradient-navy text-white pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
            <ol className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-400">
              <li><Link href="/" className="hover:text-teal-300 transition-colors">Home</Link></li>
              <li><span className="mx-1 text-slate-600">/</span></li>
              <li className="text-slate-200 font-semibold">Committees</li>
            </ol>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4">
              Conference Governance &amp; Advisory
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
              Committees &amp; Organizing Board
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-1 sm:px-0">
              The governing leadership, international advisors, national scientific experts, and editorial board steering IC-MEMS 2027 at Alva’s Institute of Engineering and Technology.
            </p>
          </div>

          {/* Quick Anchor Navigation */}
          <div className="flex items-center gap-2 mt-6 sm:mt-8 overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:flex-wrap sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'leadership', label: 'Leadership' },
              { id: 'international', label: 'International Advisory' },
              { id: 'national', label: 'National Advisory' },
              { id: 'organising', label: 'Organising Committee' },
              { id: 'editorial', label: 'Editorial Board (7 + 7)' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs font-medium border border-white/15 whitespace-nowrap transition-all shrink-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom max-w-6xl py-8 sm:py-14 lg:py-20 space-y-12 sm:space-y-16 lg:space-y-20">

        {/* ═══════════════════════════════════════════════
            SECTION 1: LEADERSHIP (WITH PHOTO AREAS)
        ═══════════════════════════════════════════════ */}
        <section id="leadership" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 md:mb-10 gap-2 sm:gap-4 border-b border-slate-200 pb-3 sm:pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">
                Executive Patronage &amp; Chairs
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0a192f] tracking-tight">
                Conference Leadership
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Distinguished executive leadership and academic conveners steering the conference.
            </p>
          </div>

          {/* 1A. Chief Patron (Prominent Hero Feature Card) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-amber-200/80 p-5 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-all mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8 text-center sm:text-left">
              
              {/* Photo Area */}
              <div className="relative group shrink-0">
                <div className="w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-md bg-slate-100">
                  <img
                    src={chiefPatron.image}
                    alt={chiefPatron.name}
                    className="w-full h-full object-cover object-center transition-transform group-hover:scale-105 duration-300"
                  />
                </div>
              </div>

              {/* Chief Patron Info */}
              <div className="flex-1 space-y-2.5 sm:space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  {chiefPatron.role}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0a192f] tracking-tight">
                  {chiefPatron.name}
                </h3>
                <div className="text-xs sm:text-sm font-semibold text-teal-800">
                  {chiefPatron.affiliation}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Founder and visionary leader guiding Alva&rsquo;s Education Foundation into a globally recognized institution fostering multidisciplinary research, technological education, and social sustainability.
                </p>
                <div className="pt-1 sm:pt-2 flex flex-wrap gap-2 text-xs text-slate-500 justify-center sm:justify-start">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium text-slate-700">AIET Moodbidri</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium text-slate-700">Patron Committee</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1B. Patrons (2 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {patrons.map((patron) => (
              <div
                key={patron.name}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-7 shadow-sm hover:shadow-md transition-all flex flex-row items-center sm:items-start gap-4 sm:gap-6 text-left group"
              >
                {/* Photo Area */}
                <div className="relative shrink-0">
                  <div className="w-20 h-26 sm:w-32 sm:h-40 md:w-36 md:h-44 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-teal-400/70 shadow-sm bg-slate-100">
                    <img
                      src={patron.image}
                      alt={patron.name}
                      className="w-full h-full object-cover object-center transition-transform group-hover:scale-105 duration-300"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    {patron.role}
                  </span>
                  <h4 className="text-base sm:text-xl font-bold text-[#0a192f] leading-snug truncate sm:whitespace-normal">
                    {patron.name}
                  </h4>
                  <div className="text-xs font-semibold text-slate-700 leading-tight">
                    {patron.affiliation}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {patron.subTitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 1C. Conference Chairs (3 Cards) */}
          <div className="mb-6 sm:mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 sm:mb-4">
              Conference Chairs &amp; Co-Chairs
            </h4>
            <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
              {conferenceChairs.map((chair) => (
                <div
                  key={chair.name}
                  className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-row min-[520px]:flex-col items-center text-left min-[520px]:text-center gap-4 min-[520px]:gap-0 group"
                >
                  {/* Photo Area */}
                  <div className="relative shrink-0 min-[520px]:mb-4">
                    <div className="w-20 h-26 min-[520px]:w-32 min-[520px]:h-40 rounded-xl overflow-hidden border-2 border-blue-200 shadow-sm bg-slate-100">
                      <img
                        src={chair.image}
                        alt={chair.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 mb-1.5 min-[520px]:mb-2">
                      {chair.role}
                    </span>
                    <h5 className="text-sm sm:text-base font-bold text-[#0a192f] leading-snug">
                      {chair.name}
                    </h5>
                    <div className="text-xs text-slate-600 mt-1">
                      {chair.affiliation}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {chair.subTitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 1D. Conference Conveners (5 Cards) */}
          <div className="mt-6 sm:mt-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 sm:mb-4">
              Conference Conveners
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {conveners.map((convener, idx) => (
                <div
                  key={convener.name}
                  className={`bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-3 sm:p-4 lg:p-5 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group ${
                    idx === conveners.length - 1 ? 'col-span-2 min-[520px]:col-span-1' : ''
                  }`}
                >
                  {/* Photo Area */}
                  <div className="relative mb-2.5 sm:mb-3">
                    <div className="w-20 h-26 sm:w-24 sm:h-32 md:w-28 md:h-36 rounded-lg sm:rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100">
                      <img
                        src={convener.image}
                        alt={convener.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 mb-1 sm:mb-1.5">
                    {convener.role}
                  </span>
                  <h6 className="text-xs font-bold text-[#0a192f] leading-tight line-clamp-2">
                    {convener.name}
                  </h6>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {convener.affiliation}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-teal-700 font-semibold mt-1 line-clamp-1">
                    {convener.subTitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            SECTION 2: INTERNATIONAL ADVISORY COMMITTEE
        ═══════════════════════════════════════════════ */}
        <section id="international" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-2 sm:gap-4 border-b border-slate-200 pb-3 sm:pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">
                Global Scientific Counsel
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0a192f] tracking-tight">
                International Advisory Committee
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Scholars and researchers from leading global universities and international research facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {international.map((m, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-teal-50 text-teal-800 border border-teal-100">
                      {m.country}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      {m.flag}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0a192f] leading-snug">
                    {m.name}
                  </h3>
                  {m.affiliation && (
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">
                      {m.affiliation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            SECTION 3: NATIONAL ADVISORY COMMITTEE
        ═══════════════════════════════════════════════ */}
        <section id="national" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-2 sm:gap-4 border-b border-slate-200 pb-3 sm:pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">
                National Academic Eminence
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0a192f] tracking-tight">
                National Advisory Committee
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Distinguished professors and directors from TIFR, IITs, IISER, CPRI, and premier Indian engineering institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {national.map((m, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      India Advisory Council
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0a192f] leading-snug">
                    {m.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">
                    {m.affiliation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            SECTION 4: ORGANISING COMMITTEE
        ═══════════════════════════════════════════════ */}
        <section id="organising" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-2 sm:gap-4 border-b border-slate-200 pb-3 sm:pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">
                Host Institution Execution Team
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0a192f] tracking-tight">
                Organising Committee
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Faculty members and department heads coordinating operations across all technical tracks at AIET Moodbidri.
            </p>
          </div>

          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {organising.map((m, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-3 sm:p-3.5 shadow-xs hover:border-teal-300 hover:bg-slate-50/50 transition-all flex items-center gap-2.5 sm:gap-3"
              >
                <div className="w-6 h-6 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-bold text-[#0a192f] leading-snug truncate">
                    {m.name}
                  </div>
                  <div className="text-[11px] text-teal-700 font-medium mt-0.5 truncate">
                    {m.dept}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ═══════════════════════════════════════════════
            SECTION 5: EDITORIAL BOARD (7 LEFT & 7 RIGHT)
        ═══════════════════════════════════════════════ */}
        <section id="editorial" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-2 sm:gap-4 border-b border-slate-200 pb-3 sm:pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">
                Peer Review &amp; Proceedings Evaluation
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0a192f] tracking-tight">
                Editorial Board
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              14 peer-review editors coordinating double-blind reviews across engineering and science tracks.
            </p>
          </div>

          {/* Symmetrical 2-Column Split: 7 on Left, 7 on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            
            {/* ─── LEFT COLUMN (Members 01 to 07) ─── */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="bg-slate-100/80 px-4 sm:px-6 py-3 sm:py-3.5 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0a192f]">
                  Editorial Board &bull; Section A
                </span>
                <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Track 01–07
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {editorialLeft.map((m) => (
                  <div
                    key={m.num}
                    className="p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 text-[11px] sm:text-xs font-black shrink-0">
                      {m.num}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0a192f] leading-snug">
                        {m.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-relaxed">
                        {m.area}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── RIGHT COLUMN (Members 08 to 14) ─── */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="bg-slate-100/80 px-4 sm:px-6 py-3 sm:py-3.5 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0a192f]">
                  Editorial Board &bull; Section B
                </span>
                <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Track 08–14
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {editorialRight.map((m) => (
                  <div
                    key={m.num}
                    className="p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 text-[11px] sm:text-xs font-black shrink-0">
                      {m.num}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0a192f] leading-snug">
                        {m.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-relaxed">
                        {m.area}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Editorial Advisory Note */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold shrink-0">
                ✓
              </div>
              <div className="leading-relaxed">
                <strong>Peer Review Protocol:</strong> All submitted manuscripts undergo rigorous two-stage review by members of the editorial board and external subject reviewers.
              </div>
            </div>
            <Link
              href="/publication"
              className="w-full sm:w-auto text-center px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold whitespace-nowrap transition-colors shadow-xs"
            >
              Publication Guidelines &rarr;
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

