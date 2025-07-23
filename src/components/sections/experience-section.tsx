import DateLocation from '../ui/date-location';
import Heading from '../ui/heading';
import Section from '../ui/section';

const ExperienceSection = () => {
  return (
    <Section>
      <Heading title='Work Experience' />

      <article className='space-y-1'>
        <p className='flex items-center space-x-2'>
          <span className='font-bold'>Company</span>
          <span className='text-blue-400'>|</span>
          <span className='text-blue-400'>Position</span>
        </p>

        <DateLocation fromDate='Jan 2020' toDate='Present' location='City, Country' />

        <ul className='pl-4 bg-gray-100 border-l-4 border-l-blue-700 rounded-2xl space-y-1'>
          {Array.from({ length: 5 }, (_, index) => (
            <li key={index} className='text-gray-600 space-x-2'>
              <span className='font-bold text-blue-400'>&gt;</span>
              <span className='font-light'>Description of the task performed at the company.</span>
            </li>
          ))}
        </ul>
      </article>
    </Section>
  );
};

export default ExperienceSection;
