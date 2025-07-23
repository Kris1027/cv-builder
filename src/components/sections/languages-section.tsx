import Heading from '../ui/heading';
import Section from '../ui/section';

const LanguagesSection = () => {
  return (
    <Section>
      <Heading title='Languages' />
      <ul className='flex gap-2 flex-wrap'>
        {Array.from({ length: 2 }, (_, index) => (
          <li
            key={index}
            className='font-light bg-gray-100 p-2 rounded-lg border-t-2 border-t-green-400 flex flex-col items-center'
          >
            <span>Language {index + 1}</span>
            <span className='text-blue-400'>C2</span>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default LanguagesSection;
