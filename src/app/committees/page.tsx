import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Committees | IC-MEMS 2027' };

const leadership = [
  { role: 'Chief Patron', name: 'Dr. Mohan Alva', affiliation: 'Chairman, Alva\'s Education Foundation' },
  { role: 'Patron', name: 'Mr. Vivek Alva', affiliation: 'Managing Trustee, AIET' },
  { role: 'Patron', name: 'Dr. Peter Fernandes', affiliation: 'Principal, AIET' },
  { role: 'Chair', name: 'Dr. Richard Pinto', affiliation: 'AIET' },
  { role: 'Co-Chair', name: 'Dr. Satyanarayan', affiliation: 'AIET' },
  { role: 'Co-Chair', name: 'Prof. Priya Sequeira', affiliation: 'AIET' },
  { role: 'Convener', name: 'Dr. Jayarama A', affiliation: 'AIET' },
  { role: 'Convener', name: 'Dr. Catherine Nirmala', affiliation: 'AIET' },
  { role: 'Convener', name: 'Dr. Vinay Shivamurthy', affiliation: 'AIET' },
  { role: 'Convener', name: 'Dr. Gurushanth B. Vaggar', affiliation: 'AIET' },
  { role: 'Convener', name: 'Dr. Shashikumar Kumaraswamy', affiliation: 'AIET' },
];

const international = [
  { name: 'Prof. Philip J. Grandinetti', affiliation: 'The Ohio State University', country: 'USA' },
  { name: 'Prof. Jens Dittmer', affiliation: 'CNRS/Université du Mans', country: 'France' },
  { name: 'Prof. Nicolas Mercier', affiliation: 'Université d\'Angers', country: 'France' },
  { name: 'Prof. Ivan Hetman', affiliation: 'Linköping University', country: 'Sweden' },
  { name: 'Prof. Özlem Uguz Neli', affiliation: 'Stockholm University', country: 'Sweden' },
  { name: 'Dr. Dhasiyan Arun Kumar', affiliation: 'ASM Japan', country: 'Japan' },
  { name: 'Prof. Ir. Ts. Dr. Malathy A/P Batumalay', affiliation: 'INTI International University', country: 'Malaysia' },
  { name: 'Dr. Shigeru Tanaka', affiliation: 'Kumamoto University', country: 'Japan' },
  { name: 'Dr. I Wayan Budi Sentana', affiliation: 'Politeknik Negeri Bali (PNB)', country: 'Indonesia' },
  { name: 'Dr. Ryuichi Tomoshige', affiliation: 'SoJo University', country: 'Japan' },
  { name: 'Dr. Gurdip Kaur Saminder Singh', affiliation: '', country: 'Malaysia' },
  { name: 'Dr. V. Kumaradeepan', affiliation: 'University of Jaffna', country: 'Sri Lanka' },
  { name: 'Prof. Gilbert Mbaka Nduru', affiliation: 'Deputy VC, Chuka University', country: 'Kenya' },
];

const national = [
  { name: 'Prof. Shriganesh S. Prabhu', affiliation: 'TIFR, Mumbai' },
  { name: 'Prof. Achanta Venugopal', affiliation: 'TIFR, Mumbai' },
  { name: 'Prof. Siddhartha P. Duttagupta', affiliation: 'IIT Bombay' },
  { name: 'Prof. Sathish B. Ogale', affiliation: 'IISER Pune' },
  { name: 'Prof. M. S. Ramachandra Rao', affiliation: 'IIT Madras' },
  { name: 'Prof. Prashant Kulkarni', affiliation: 'DIAT, Pune' },
  { name: 'Dr. M. G. Ananda Kumar', affiliation: 'CPRI, Bengaluru' },
  { name: 'Dr. Ritanajali Majhi', affiliation: 'National Institute of Technology, Karnataka' },
  { name: 'Balaji Shri Kamalakannan', affiliation: 'Alliance University' },
  { name: 'Dr. Sunita Jadhav', affiliation: 'Bharati Vidyapeeta, Pune' },
  { name: 'Dr. Sanjog S. Nagarkar', affiliation: 'IIT Bombay' },
  { name: 'Dr. G. Anandha Babu', affiliation: 'SSN College of Engineering, Tamilnadu' },
  { name: 'Dr. S. Janakiraman', affiliation: 'IIT Indore' },
  { name: 'Dr. K Narayan Prabhu', affiliation: 'NITK Surathkal' },
  { name: 'Dr. Arnab Datta', affiliation: 'IIT Bombay' },
  { name: 'C A Russell Parera (Retd.)', affiliation: 'PwC India Partner / Former CEO KPMG India' },
];

const organising = [
  'Dr. Ravi Kumar Chandrappa', 'Dr. Sakshi S. Kamath', 'Dr. Ramaprasad A. T.',
  'Dr. S. Samshuddin', 'Dr. Umeshchandra H. G.', 'Dr. Vijay Joshi',
  'Mr. Johnson Fernandes', 'Dr. Guruprasad', 'Dr. Kumaraswamy',
  'Prof. Hemanth Suvarna', 'Prof. Srinivas C S', 'Dr. Ganesh V N',
  'Dr. Roshan Shetty', 'Dr. Subrahmanya Bhat', 'Mr. Abhishek. B',
  'Ms. Krithika', 'Ujwal S Shetty', 'Leron Noronha', 'Panchami Jogi', 'Ankita Paradkar',
];

const editorial = [
  { name: 'Dr. Richard Pinto', area: 'Condensed Matter Physics, Thin Films, Sensors, Energy and Fuel Cells' },
  { name: 'Dr. Satyanarayan', area: 'Materials Engineering and Energy-Related Materials' },
  { name: 'Dr. Jayarama A.', area: 'Thin Films, Sensors, Fuel Cells and Hydrogen Technologies' },
  { name: 'Dr. Ramaprasad A. T.', area: 'Polymers and Membrane Technologies' },
  { name: 'Dr. Shashikumar Kumaraswamy', area: 'Materials Characterisation, Solid-State NMR and DFT Analysis' },
  { name: 'Dr. Gurushanth B. Vaggar', area: 'Materials Engineering and Energy-related Materials' },
  { name: 'Dr. Sakshi S. Kamath', area: 'Polymer Composites and Materials Science' },
  { name: 'Dr. S. Samshuddin', area: 'Chemistry, Corrosion, Electrochemistry and Materials Chemistry' },
  { name: 'Dr. Ravi Kumar Chandrappa', area: 'Polymer Composites, Materials Science and Spectroscopic Characterisation' },
  { name: 'Dr. Vinay S.', area: 'Environmental Engineering, GIS, Remote Sensing and Sustainability' },
  { name: 'Dr. Umeshchandra H. G.', area: 'Materials and Sustainable Technologies' },
  { name: 'Dr. Catherine Nirmala', area: 'Management, Sustainability and Skill Development' },
  { name: 'Dr. Habeeb Ur Rahiman', area: 'Management and Sustainable Business' },
  { name: 'Dr. Niyaz Panakaje', area: 'Management, Finance and Sustainability' },
];

export default function CommitteesPage() {
  return (
    <div className="page-enter">
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
            <li><span className="mx-1">/</span></li>
            <li className="text-gray-800 font-medium">Committees</li>
          </ol>
        </div>
      </nav>

      <div className="gradient-navy text-white py-16">
        <div className="container-custom text-center">
          <span className="badge bg-white/10 text-teal-300 mb-4">Organising Team</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Committees</h1>
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            {['leadership', 'international', 'national', 'organising', 'editorial'].map((id) => (
              <a key={id} href={`#${id}`} className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs font-medium border border-white/10 transition-all capitalize">
                {id === 'international' ? 'International Advisory' : id === 'national' ? 'National Advisory' : id}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom max-w-5xl py-16 space-y-16">
        {/* Leadership */}
        <section id="leadership" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0a192f' }}>Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadership.map((m) => (
              <div key={`${m.role}-${m.name}`} className="rounded-xl border border-gray-200 bg-white p-4 hover:border-teal-200 hover:shadow-sm transition-all">
                <span className="badge bg-teal-50 text-teal-700 text-[10px] mb-2">{m.role}</span>
                <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{m.affiliation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* International Advisory */}
        <section id="international" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0a192f' }}>International Advisory Committee</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {international.map((m) => (
              <div key={m.name} className="rounded-xl border border-gray-200 bg-white p-4 flex items-start gap-3 hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                  {m.country.slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm leading-snug">{m.name}</p>
                  {m.affiliation && <p className="text-gray-500 text-xs mt-0.5">{m.affiliation}</p>}
                  <p className="text-blue-600 text-xs font-medium mt-0.5">{m.country}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* National Advisory */}
        <section id="national" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0a192f' }}>National Advisory Committee</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {national.map((m) => (
              <div key={m.name} className="rounded-xl border border-gray-200 bg-white p-4 hover:border-teal-200 hover:shadow-sm transition-all">
                <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{m.affiliation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Organising Committee */}
        <section id="organising" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0a192f' }}>Organising Committee</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {organising.map((name) => (
              <div key={name} className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center hover:border-teal-200 hover:bg-teal-50/30 transition-all">
                <p className="text-gray-700 text-xs font-medium leading-snug">{name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Board */}
        <section id="editorial" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0a192f' }}>Editorial Board</h2>
          <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 overflow-hidden">
            {editorial.map((m, i) => (
              <div key={m.name} className={`p-4 flex items-start gap-4 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-teal-50/30 transition-colors`}>
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{m.area}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
