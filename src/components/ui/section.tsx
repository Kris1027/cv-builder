interface SectionProps {
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => {
  return <section className='p-4 space-y-1'>{children}</section>;
};

export default Section;
