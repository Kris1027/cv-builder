// Simple print-based PDF export that just opens print dialog
export const openPrintDialog = () => {
  // Add print-specific styles
  const printStyles = document.createElement('style');
  printStyles.id = 'print-styles-override';
  printStyles.textContent = `
    @media print {
      /* Hide everything except CV content */
      body * {
        visibility: hidden;
      }
      
      #cv-content, #cv-content * {
        visibility: visible;
      }
      
      #cv-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
      
      /* Override gradients for print */
      .bg-gradient-to-r {
        background: #3b82f6 !important;
        background-image: none !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .from-blue-400.to-purple-500,
      .from-blue-500.to-purple-500 {
        background: #3b82f6 !important;
        background-image: none !important;
      }
      
      /* Ensure colors print */
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      /* Hide print buttons */
      .print\\:hidden {
        display: none !important;
      }
      
      /* Page breaks */
      @page {
        margin: 0.5in;
        size: A4;
      }
    }
  `;
  
  document.head.appendChild(printStyles);
  
  // Open print dialog
  window.print();
  
  // Clean up after print dialog closes
  setTimeout(() => {
    const styles = document.getElementById('print-styles-override');
    if (styles) {
      document.head.removeChild(styles);
    }
  }, 1000);
  
  return true;
};