import Heading from '../ui/heading';
import Section from '../ui/section';

const SkillsSection = () => {
  return (
    <Section>
      <Heading title='Skills' />
      <ul className='space-y-1'>
        {Array.from({ length: 5 }, (_, index) => (
          <li
            key={index}
            className='font-light bg-gray-100 p-1 rounded-lg border-l-2 border-l-blue-400'
          >
            Skill {index + 1}
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default SkillsSection;
