export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-blue-600 text-base font-bold uppercase tracking-wider mb-3 pb-2 border-b-2 border-gradient-to-r from-blue-600 to-sky-500 relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-12 after:h-1 after:bg-gradient-to-r after:from-sky-500 after:to-emerald-500 after:rounded-full print:text-sm print:mb-2 print:pb-1 print:break-after-avoid">
      {children}
    </h3>
  );
}

export function Subheading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h4 className={`text-sm font-semibold text-slate-800 mb-1 ${className}`}>{children}</h4>;
}

export function Subtitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h5 className={`font-medium text-xs text-sky-600 ${className}`}>{children}</h5>;
}

export function Info({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-medium text-slate-600 mb-1 ${className}`}>{children}</p>
  );
}
