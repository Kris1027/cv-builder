import { FaPrint } from 'react-icons/fa';
import { openPrintDialog } from '../../utils/pdf-export-simple-print';

interface PrintButtonProps {
  className?: string;
}

const PrintButton = ({ className = '' }: PrintButtonProps) => {
  const handlePrint = () => {
    try {
      openPrintDialog();
      console.log('Print dialog opened');
    } catch (error) {
      console.error('Error opening print dialog:', error);
      alert('Could not open print dialog.');
    }
  };

  return (
    <button
      onClick={handlePrint}
      className={`
        flex items-center space-x-2 px-4 py-2 
        bg-blue-600 hover:bg-blue-700
        text-white font-medium rounded-lg
        transition-colors duration-200
        ${className}
      `}
      title="Print CV or save as PDF"
    >
      <FaPrint size={16} />
      <span>Print / Save as PDF</span>
    </button>
  );
};

export default PrintButton;