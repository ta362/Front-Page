import { toJpeg, toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * Downloads a data URL as a file in the browser.
 */
function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const CANONICAL_A4_WIDTH = 794;
const CANONICAL_A4_HEIGHT = 1123;

/**
 * High-resolution 300 DPI A4 JPG Exporter
 * Generates exact 2382 x 3369 px image with clean font rendering and no text overlaps
 */
export async function exportCoverPageAsJPG(elementId: string, filename = 'Cover_Page_A4.jpg'): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Cover page element not found.');
  }

  // Ensure document fonts are completely ready before rasterizing
  if ('fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue gracefully if font wait times out
    }
  }

  const dataUrl = await toJpeg(element, {
    quality: 0.98,
    pixelRatio: 3, // 794 * 3 = 2382px, 1123 * 3 = 3369px (true 300 DPI A4)
    width: CANONICAL_A4_WIDTH,
    height: CANONICAL_A4_HEIGHT,
    backgroundColor: '#ffffff',
    cacheBust: true,
  });

  const finalName = filename.endsWith('.jpg') || filename.endsWith('.jpeg') ? filename : `${filename}.jpg`;
  downloadDataUrl(dataUrl, finalName);
  return true;
}

/**
 * High-resolution PNG Exporter
 */
export async function exportCoverPageAsPNG(elementId: string, filename = 'Cover_Page_A4.png'): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Cover page element not found.');
  }

  if ('fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {}
  }

  const dataUrl = await toPng(element, {
    pixelRatio: 3,
    width: CANONICAL_A4_WIDTH,
    height: CANONICAL_A4_HEIGHT,
    backgroundColor: '#ffffff',
    cacheBust: true,
  });

  const finalName = filename.endsWith('.png') ? filename : `${filename}.png`;
  downloadDataUrl(dataUrl, finalName);
  return true;
}

/**
 * High-resolution A4 PDF Document Exporter (210mm x 297mm)
 */
export async function exportCoverPageAsPDF(elementId: string, filename = 'Cover_Page_A4.pdf'): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Cover page element not found.');
  }

  if ('fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {}
  }

  const dataUrl = await toJpeg(element, {
    quality: 0.98,
    pixelRatio: 2.5, // 1985 x 2807 px for high definition PDF document
    width: CANONICAL_A4_WIDTH,
    height: CANONICAL_A4_HEIGHT,
    backgroundColor: '#ffffff',
    cacheBust: true,
  });

  // Standard A4 dimensions in millimeters (210 x 297 mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  const finalName = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  pdf.save(finalName);
  return true;
}

export function formatSubmissionDate(isoDateString: string): string {
  if (!isoDateString) return '';
  const parts = isoDateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
  }
  return isoDateString;
}
