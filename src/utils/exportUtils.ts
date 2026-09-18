import { jsPDF } from 'jspdf';
import { CoverPageFormData } from '../types';
import { renderCoverPageToCanvas } from './canvasCoverPage';

/**
 * Robust cross-platform download helper for desktop and mobile browsers
 */
function triggerBrowserDownload(dataUrl: string, filename: string) {
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
      // Ignore if already cleaned up
    }
  }, 100);
}

/**
 * 300 DPI High-Resolution A4 JPG Exporter
 * Direct Canvas-to-Blob rendering eliminates all mobile flexbox / SVG foreignObject collapse issues.
 */
export async function exportCoverPageAsJPGDirect(
  formData: CoverPageFormData,
  filename = 'Cover_Page_A4.jpg'
): Promise<boolean> {
  const canvas = await renderCoverPageToCanvas(formData);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.98);

  const finalName = filename.endsWith('.jpg') || filename.endsWith('.jpeg') ? filename : `${filename}.jpg`;
  triggerBrowserDownload(dataUrl, finalName);
  return true;
}

/**
 * 300 DPI High-Resolution A4 PNG Exporter
 */
export async function exportCoverPageAsPNGDirect(
  formData: CoverPageFormData,
  filename = 'Cover_Page_A4.png'
): Promise<boolean> {
  const canvas = await renderCoverPageToCanvas(formData);
  const dataUrl = canvas.toDataURL('image/png');

  const finalName = filename.endsWith('.png') ? filename : `${filename}.png`;
  triggerBrowserDownload(dataUrl, finalName);
  return true;
}

/**
 * Print-Ready Standard A4 PDF Document Exporter (210mm x 297mm)
 */
export async function exportCoverPageAsPDFDirect(
  formData: CoverPageFormData,
  filename = 'Cover_Page_A4.pdf'
): Promise<boolean> {
  const canvas = await renderCoverPageToCanvas(formData);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.98);

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

/**
 * Direct File Share Helper for Mobile Devices (Bypasses Chrome download bar)
 */
export async function shareCoverPageFile(
  formData: CoverPageFormData,
  format: 'pdf' | 'jpg' = 'pdf'
): Promise<boolean> {
  const canvas = await renderCoverPageToCanvas(formData);
  let file: File;

  if (format === 'pdf') {
    const dataUrl = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    const pdfBlob = pdf.output('blob');
    file = new File([pdfBlob], 'Cover_Page_A4.pdf', { type: 'application/pdf' });
  } else {
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.98));
    if (!blob) return false;
    file = new File([blob], 'Cover_Page_A4.jpg', { type: 'image/jpeg' });
  }

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      title: 'A4 Cover Page',
      text: 'My A4 Assignment / Lab Copy Cover Page',
      files: [file],
    });
    return true;
  }
  return false;
}
export function formatSubmissionDate(isoDateString: string): string {
  if (!isoDateString) return '';
  const parts = isoDateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
  }
  return isoDateString;
}
