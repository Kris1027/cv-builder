export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-blue-600 text-base font-semibold uppercase tracking-wide mb-2.5 pb-1.5 border-b-2 border-blue-600 relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-10 after:h-0.5 after:bg-sky-500 print:text-sm print:mb-1.5 print:pb-1 print:break-after-avoid">
      {children}
    </h3>
  );
}
