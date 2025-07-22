import { FaEnvelope, FaGithub, FaHome, FaLinkedin, FaPhone } from 'react-icons/fa';

const InfoSection = () => {
  return (
    <section className='bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4'>
      <h1 className='space-x-1 text-2xl font-bold'>
        <span>John</span>
        <span>Doe</span>
      </h1>

      <div className='grid grid-cols-3 gap-2'>
        <a
          href='https://example.com'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center space-x-1'
        >
          <FaHome size={24} /> <span>johndoe.com</span>
        </a>

        <a
          href='https://github.com/username'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center space-x-1'
        >
          <FaGithub size={24} /> <span>johndoe_git</span>
        </a>

        <a
          href='https://linkedin.com/in/username'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center space-x-1'
        >
          <FaLinkedin size={24} /> <span>johndoe_linkedin</span>
        </a>

        <a
          href='mailto:email@example.com'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center space-x-1'
        >
          <FaEnvelope size={24} /> <span>johndoe_email@example.com</span>
        </a>

        <a
          href='tel:+1234567890'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center space-x-1'
        >
          <FaPhone size={24} /> <span>+1234567890</span>
        </a>
      </div>
    </section>
  );
};

export default InfoSection;
