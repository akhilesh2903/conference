export default function DownloadsPreview() {
  const files = [
    { name: 'Conference Brochure', type: 'PDF' },
    { name: 'Abstract Template', type: 'DOCX' },
    { name: 'Full Paper Template', type: 'DOCX' },
    { name: 'Programme', type: 'PDF' },
    { name: 'Presentation Template', type: 'PPTX' }
  ];

  return (
    <section className="section-padding bg-gray-50 border-t border-gray-100" aria-label="Downloads">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="badge bg-teal-50 text-teal-700 mb-3 block w-fit">Resources</span>
            <h2 className="text-3xl font-bold" style={{ color: '#0a192f' }}>Downloads</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
            Important documents and templates for IC-MEMS 2027 will be made available here soon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file, idx) => (
            <div key={idx} className="bg-white border text-gray-500 cursor-not-allowed border-gray-200 rounded-2xl p-5 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 text-sm">{file.name}</h3>
                  <p className="text-xs text-gray-400 font-medium tracking-wide mt-0.5">{file.type}</p>
                </div>
              </div>
              
              <div className="bg-gray-100 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest text-gray-400">
                Coming Soon
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
