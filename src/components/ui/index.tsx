export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-blue-600 text-base font-semibold uppercase tracking-wide mb-2.5 pb-1.5 border-b-2 border-blue-600 relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-10 after:h-0.5 after:bg-sky-500 print:text-sm print:mb-1.5 print:pb-1 print:break-after-avoid">
      {children}
    </h3>
  );
}

export function Subheading({ children }: { children: React.ReactNode }) {
  return <h4 className='text-sm font-semibold text-slate-800 mb-1'>{children}</h4>;
}

export function Subtitle({ children }: { children: React.ReactNode }) {
  return <h5 className='font-mono font-medium text-xs text-sky-500 ml-1.5'>{children}</h5>;
}

export function Info({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-xs font-medium text-slate-600 mb-1 flex items-center gap-1'>{children}</p>
  );
}
