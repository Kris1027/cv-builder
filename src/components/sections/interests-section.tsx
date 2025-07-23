import Heading from '../ui/heading';
import Section from '../ui/section';

const InterestsSection = () => {
  return (
    <Section>
      <Heading title='Interests' />

      <ul className='flex gap-2 flex-wrap'>
        {Array.from({ length: 5 }, (_, index) => (
          <li
            key={index}
            className='bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-full'
          >
            Interest {index + 1}
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default InterestsSection;
