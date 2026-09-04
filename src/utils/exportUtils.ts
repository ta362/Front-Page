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

/**
 * High-resolution 300 DPI A4 JPG Exporter
 * Uses html-to-image (SVG foreignObject) with pixelRatio 3x, which handles OKLCH, Tailwind v4 and modern CSS colors flawlessly.
 */
export async function exportCoverPageAsJPG(elementId: string, filename = 'Cover_Page_A4.jpg'): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Cover page element not found. Please ensure the preview is visible.');
  }

  // Ensure element has standard white background and no transform issues
  const dataUrl = await toJpeg(element, {
    quality: 0.98,
    pixelRatio: 3, // ~2480 x 3508 px at full standard 300 DPI print quality
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
    throw new Error('Cover page element not found. Please ensure the preview is visible.');
  }

  const dataUrl = await toPng(element, {
    pixelRatio: 3,
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
    throw new Error('Cover page element not found. Please ensure the preview is visible.');
  }

  const dataUrl = await toJpeg(element, {
    quality: 0.98,
    pixelRatio: 2.5,
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
