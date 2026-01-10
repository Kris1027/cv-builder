import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

export interface PDFExportOptions {
    filename?: string;
    scale?: number;
}

export async function exportToPDF(
    element: HTMLElement,
    options: PDFExportOptions = {}
): Promise<void> {
    const { filename = 'cv.pdf', scale = 2 } = options;

    // Capture the element as a canvas with high quality
    const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        // Ensure we capture the full element
        width: element.scrollWidth,
        height: element.scrollHeight,
    });

    // Calculate dimensions to fit A4
    const imgWidth = A4_WIDTH_MM;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF document
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    // If content is taller than one page, we need multiple pages
    const pageHeight = A4_HEIGHT_MM;
    let heightLeft = imgHeight;
    let position = 0;

    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/png');

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
}

export function generateCVFilename(
    firstName?: string,
    lastName?: string
): string {
    const nameParts = [firstName, lastName].filter(Boolean);
    const name = nameParts.length > 0 ? nameParts.join('-') : 'my';
    return `${name}-CV.pdf`;
}
