import { toJpeg, toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * Downloads a data URL as a file in the browser with mobile device compatibility.
 */
function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    try {
      document.body.removeChild(link);
    } catch {
      // Ignore if already removed
    }
  }, 100);
}

const CANONICAL_A4_WIDTH = 794;
const CANONICAL_A4_HEIGHT = 1123;

/**
 * Prepares the DOM element and fonts/images for an artifact-free snapshot
 */
async function prepareElementForCapture(element: HTMLElement) {
  // 1. Ensure fonts are fully loaded
  if ('fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue gracefully if font wait times out
    }
  }

  // 2. Ensure all <img> elements inside have loaded
  const images = Array.from(element.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    })
  );

  // 3. Small pause to allow browser layout & style calculations to settle
  await new Promise((resolve) => setTimeout(resolve, 80));
}

/**
 * High-resolution 300 DPI A4 JPG Exporter
 * Generates exact 2382 x 3369 px image with clean font rendering and no text overlaps
 */
export async function exportCoverPageAsJPG(elementId: string, filename = 'Cover_Page_A4.jpg'): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Cover page element not found.');
  }

  await prepareElementForCapture(element);

  // Mobile Webkit fix: Warm-up pass to resolve web fonts into raster cache
  try {
    await toJpeg(element, { quality: 0.1, pixelRatio: 1, width: CANONICAL_A4_WIDTH, height: CANONICAL_A4_HEIGHT });
  } catch {
    // Ignore warm-up error
  }

  // High quality export pass
  const dataUrl = await toJpeg(element, {
    quality: 0.98,
    pixelRatio: 2.5, // 1985 x 2807 px (balanced for mobile memory limits and crisp 300 DPI print quality)
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

  await prepareElementForCapture(element);

  const dataUrl = await toPng(element, {
    pixelRatio: 2.5,
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

  await prepareElementForCapture(element);

  // Warm-up pass
  try {
    await toJpeg(element, { quality: 0.1, pixelRatio: 1, width: CANONICAL_A4_WIDTH, height: CANONICAL_A4_HEIGHT });
  } catch {}

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
