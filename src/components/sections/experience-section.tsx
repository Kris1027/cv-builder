const ExperienceSection = () => {
  return (
    <section className='p-4 space-y-1'>
      <h2 className='text-xl uppercase text-blue-500'>Work Experience</h2>
      <div className='h-1 bg-gradient-to-r from-blue-500 to-purple-500'></div>

      <article className='space-y-1'>
        <p className='flex items-center space-x-2'>
          <span className='font-bold'>Company</span>
          <span className='text-blue-400'>|</span>
          <span className='text-blue-400'>Position</span>
        </p>

        <p className='text-gray-400 space-x-2'>
          <span>fromDate</span>
          <span>-</span>
          <span>toDate</span>
          <span>|</span>
          <span>location</span>
        </p>

        <ul className='pl-4 bg-gray-100 border-l-4 border-l-blue-700 rounded-2xl space-y-1'>
          <li className='flex items-center space-x-2'>
            <span className='text-blue-500 font-bold'>&gt;</span>
            <span className='text-gray-600'>your main responsibility</span>
          </li>
          <li className='flex items-center space-x-2'>
            <span className='text-blue-500 font-bold'>&gt;</span>
            <span className='text-gray-600'>your main responsibility</span>
          </li>
          <li className='flex items-center space-x-2'>
            <span className='text-blue-500 font-bold'>&gt;</span>
            <span className='text-gray-600'>your main responsibility</span>
          </li>
          <li className='flex items-center space-x-2'>
            <span className='text-blue-500 font-bold'>&gt;</span>
            <span className='text-gray-600'>your main responsibility</span>
          </li>
          <li className='flex items-center space-x-2'>
            <span className='text-blue-500 font-bold'>&gt;</span>
            <span className='text-gray-600'>your main responsibility</span>
          </li>
        </ul>
      </article>
    </section>
  );
};

export default ExperienceSection;
