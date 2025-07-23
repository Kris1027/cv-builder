interface HeadingProps {
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <>
      <h2 className='text-xl uppercase text-blue-500'>{title}</h2>
      <div className='h-1 bg-gradient-to-r from-blue-500 to-purple-500'></div>
    </>
  );
};

export default Heading;
