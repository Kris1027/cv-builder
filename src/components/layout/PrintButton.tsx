export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      className='fixed top-20 right-4 bg-emerald-600 text-white px-3 py-2 rounded-md shadow-md border border-emerald-200 font-medium text-sm cursor-pointer transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg flex items-center justify-center gap-1.5 z-[1000] print:hidden'
      onClick={handlePrint}
      title='Print CV'
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <polyline points='6,9 6,2 18,2 18,9'></polyline>
        <path d='M6,18H4a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2H20a2,2,0,0,1,2,2v5a2,2,0,0,1-2,2H18'></path>
        <polyline points='6,14 18,14 18,22 6,22 6,14'></polyline>
      </svg>
      Print or Save as PDF
    </button>
  );
}
