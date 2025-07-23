interface DateLocationProps {
  fromDate: string;
  toDate: string;
  location: string;
}

const DateLocation: React.FC<DateLocationProps> = ({ fromDate, toDate, location }) => {
  return (
    <p className='text-gray-400 space-x-2'>
      <span>{fromDate}</span>
      <span>-</span>
      <span>{toDate}</span>
      <span>|</span>
      <span>{location}</span>
    </p>
  );
};

export default DateLocation;
