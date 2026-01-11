import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

interface LinkInfo {
    url: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface PDFExportOptions {
    filename?: string;
    scale?: number;
}

function extractLinks(element: HTMLElement): LinkInfo[] {
    const links: LinkInfo[] = [];
    const anchorElements = element.querySelectorAll('a[href]');
    const elementRect = element.getBoundingClientRect();

    anchorElements.forEach((anchor) => {
        const href = anchor.getAttribute('href');
        if (!href) return;

        const rect = anchor.getBoundingClientRect();

        // Calculate position relative to the element
        const relativeX = rect.left - elementRect.left;
        const relativeY = rect.top - elementRect.top;

        links.push({
            url: href,
            x: relativeX,
            y: relativeY,
            width: rect.width,
            height: rect.height,
        });
    });

    return links;
}

export async function exportToPDF(
    element: HTMLElement,
    options: PDFExportOptions = {}
): Promise<void> {
    const { filename = 'cv.pdf', scale = 2 } = options;

    // Extract links before rendering to canvas
    const links = extractLinks(element);

    // Get element dimensions for scaling calculations
    const elementWidth = element.scrollWidth;
    const elementHeight = element.scrollHeight;

    // Capture the element as a canvas with high quality
    const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: elementWidth,
        height: elementHeight,
    });

    // Calculate dimensions to fit A4
    const imgWidth = A4_WIDTH_MM;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Calculate scale factor from pixels to mm
    const scaleX = imgWidth / elementWidth;
    const scaleY = imgHeight / elementHeight;

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

    // Add clickable links to the PDF
    links.forEach((link) => {
        // Convert pixel coordinates to mm
        const linkX = link.x * scaleX;
        const linkY = link.y * scaleY;
        const linkWidth = link.width * scaleX;
        const linkHeight = link.height * scaleY;

        // Determine which page this link is on
        const pageNumber = Math.floor(linkY / pageHeight) + 1;
        const yOnPage = linkY - (pageNumber - 1) * pageHeight;

        // Only add link if it's on a valid page
        if (pageNumber <= pdf.getNumberOfPages()) {
            pdf.setPage(pageNumber);
            pdf.link(linkX, yOnPage, linkWidth, linkHeight, { url: link.url });
        }
    });

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
