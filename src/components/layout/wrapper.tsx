export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-[21cm] h-[29.7cm] my-4 mx-auto bg-white shadow-lg rounded-lg overflow-visible p-0 print:m-0 print:shadow-none print:rounded-none print:h-screen print:w-screen print:max-w-none print:max-h-none print:overflow-visible print:break-inside-avoid">
      {children}
    </div>
  );
}
