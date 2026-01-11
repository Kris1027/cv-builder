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
    singlePage?: boolean;
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
    const { filename = 'cv.pdf', scale = 2, singlePage = false } = options;

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

    // Calculate dimensions to fit A4 width
    const imgWidth = A4_WIDTH_MM;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF document
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const pageHeight = A4_HEIGHT_MM;

    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/png');

    // Calculate scale factors for link positioning
    let scaleX = imgWidth / elementWidth;
    let scaleY = imgHeight / elementHeight;
    let linkXOffset = 0;

    if (singlePage && imgHeight > A4_HEIGHT_MM) {
        // Single page: scale to fit within A4 maintaining aspect ratio
        const fitScale = A4_HEIGHT_MM / imgHeight;
        const finalWidth = imgWidth * fitScale;
        const finalHeight = A4_HEIGHT_MM;

        // Center horizontally
        linkXOffset = (A4_WIDTH_MM - finalWidth) / 2;

        pdf.addImage(imgData, 'PNG', linkXOffset, 0, finalWidth, finalHeight);

        // Update scale factors for links
        scaleX = finalWidth / elementWidth;
        scaleY = finalHeight / elementHeight;
    } else if (singlePage) {
        // Single page but content fits - just add it
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
        // Multi page: split across pages as before
        let heightLeft = imgHeight;
        let position = 0;

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
    }

    // Add clickable links to the PDF
    links.forEach((link) => {
        // Convert pixel coordinates to mm
        const linkX = link.x * scaleX + linkXOffset;
        const linkY = link.y * scaleY;
        const linkWidth = link.width * scaleX;
        const linkHeight = link.height * scaleY;

        // For single page, all links are on page 1
        if (singlePage) {
            pdf.setPage(1);
            pdf.link(linkX, linkY, linkWidth, linkHeight, { url: link.url });
        } else {
            // Determine which page this link is on
            const pageNumber = Math.floor(linkY / pageHeight) + 1;
            const yOnPage = linkY - (pageNumber - 1) * pageHeight;

            // Only add link if it's on a valid page
            if (pageNumber <= pdf.getNumberOfPages()) {
                pdf.setPage(pageNumber);
                pdf.link(linkX, yOnPage, linkWidth, linkHeight, { url: link.url });
            }
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
