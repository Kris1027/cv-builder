import DateLocation from '../ui/date-location';
import Heading from '../ui/heading';
import Section from '../ui/section';

const EducationSection = () => {
  return (
    <Section>
      <Heading title='Education' />

      <p className='text-blue-400'>Bachelor of Science in Computer Science</p>

      <DateLocation fromDate='Sept 2015' toDate='June 2019' location='University, City, Country' />
    </Section>
  );
};

export default EducationSection;
