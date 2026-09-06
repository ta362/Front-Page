import { CoverPageFormData } from '../types';
import { formatSubmissionDate } from './exportUtils';

const CANONICAL_A4_WIDTH = 2382;  // 794 * 3 (300 DPI)
const CANONICAL_A4_HEIGHT = 3369; // 1123 * 3 (300 DPI)
const SCALE = 3;

/**
 * Preloads an image URL into an HTMLImageElement
 */
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Wraps text into lines that do not exceed maxWidth on a canvas context
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  if (!text) return [];
  const lines: string[] = [];
  const rawParagraphs = text.split('\n');

  for (const paragraph of rawParagraphs) {
    const words = paragraph.split(' ');
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}

/**
 * Draws text with optional bold label prefix and normal value, centered horizontally
 */
function drawLabeledCenteredText(
  ctx: CanvasRenderingContext2D,
  label: string,
  value: string,
  y: number,
  centerX: number,
  fontFamily: string,
  fontSize: number,
  labelColor = '#000000',
  valueColor = '#1e293b'
) {
  const boldFont = `bold ${fontSize}px ${fontFamily}`;
  const normalFont = `normal ${fontSize}px ${fontFamily}`;

  ctx.font = boldFont;
  const labelWidth = ctx.measureText(label).width;

  ctx.font = normalFont;
  const valueWidth = ctx.measureText(value).width;

  const totalWidth = labelWidth + valueWidth;
  const startX = centerX - totalWidth / 2;

  // Draw Label
  ctx.font = boldFont;
  ctx.fillStyle = labelColor;
  ctx.textAlign = 'left';
  ctx.fillText(label, startX, y);

  // Draw Value
  ctx.font = normalFont;
  ctx.fillStyle = valueColor;
  ctx.fillText(value, startX + labelWidth, y);
}

/**
 * Draws text with optional bold label prefix and normal value, left aligned
 */
function drawLabeledLeftText(
  ctx: CanvasRenderingContext2D,
  label: string,
  value: string,
  x: number,
  y: number,
  fontFamily: string,
  fontSize: number,
  labelColor = '#000000',
  valueColor = '#1e293b'
) {
  const boldFont = `bold ${fontSize}px ${fontFamily}`;
  const normalFont = `normal ${fontSize}px ${fontFamily}`;

  ctx.textBaseline = 'top';

  // Draw Label
  ctx.font = boldFont;
  ctx.fillStyle = labelColor;
  ctx.textAlign = 'left';
  ctx.fillText(label, x, y);

  const labelWidth = ctx.measureText(label).width;

  // Draw Value
  ctx.font = normalFont;
  ctx.fillStyle = valueColor;
  ctx.fillText(value, x + labelWidth, y);
}

/**
 * High-performance 300 DPI Canvas Renderer for Academic Cover Page
 * Eliminates all Mobile Webkit/Chromium SVG foreignObject rendering bugs.
 */
export async function renderCoverPageToCanvas(
  data: CoverPageFormData
): Promise<HTMLCanvasElement> {
  // Ensure web fonts are completely ready before drawing
  if ('fonts' in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue gracefully if wait times out
    }
  }

  // Preload logo image if provided
  const logoImg = data.logoUrl ? await loadImage(data.logoUrl) : null;

  const canvas = document.createElement('canvas');
  canvas.width = CANONICAL_A4_WIDTH;
  canvas.height = CANONICAL_A4_HEIGHT;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) {
    throw new Error('Canvas 2D context creation failed.');
  }

  // 1. Clean White Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, CANONICAL_A4_WIDTH, CANONICAL_A4_HEIGHT);

  const centerX = CANONICAL_A4_WIDTH / 2;
  const maxContentWidth = CANONICAL_A4_WIDTH - 128 * SCALE; // padding 64px * 3 on each side

  // Select font family
  const fontFamily = {
    times: "'Tinos', 'Times New Roman', Times, serif",
    garamond: "'EB Garamond', Georgia, serif",
    cinzel: "'Cinzel', serif",
  }[data.fontTheme || 'times'];

  // 2. Render Academic Borders
  const borderStyle = data.borderStyle || 'classic-double';
  if (borderStyle === 'classic-double') {
    // Outer border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5 * SCALE; // 7.5px
    ctx.strokeRect(
      16 * SCALE,
      16 * SCALE,
      CANONICAL_A4_WIDTH - 32 * SCALE,
      CANONICAL_A4_HEIGHT - 32 * SCALE
    );
    // Inner border
    ctx.lineWidth = 1 * SCALE; // 3px
    ctx.strokeRect(
      23 * SCALE,
      23 * SCALE,
      CANONICAL_A4_WIDTH - 46 * SCALE,
      CANONICAL_A4_HEIGHT - 46 * SCALE
    );
  } else if (borderStyle === 'simple-single') {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2 * SCALE;
    ctx.strokeRect(
      16 * SCALE,
      16 * SCALE,
      CANONICAL_A4_WIDTH - 32 * SCALE,
      CANONICAL_A4_HEIGHT - 32 * SCALE
    );
  } else if (borderStyle === 'ornate-corners') {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2 * SCALE;
    ctx.strokeRect(
      16 * SCALE,
      16 * SCALE,
      CANONICAL_A4_WIDTH - 32 * SCALE,
      CANONICAL_A4_HEIGHT - 32 * SCALE
    );

    // 4 Corner brackets
    const cSize = 28 * SCALE;
    const cThick = 3 * SCALE;
    ctx.lineWidth = cThick;

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(20 * SCALE, (20 + 28) * SCALE);
    ctx.lineTo(20 * SCALE, 20 * SCALE);
    ctx.lineTo((20 + 28) * SCALE, 20 * SCALE);
    ctx.stroke();

    // Top-Right
    ctx.beginPath();
    ctx.moveTo((CANONICAL_A4_WIDTH / SCALE - 48) * SCALE, 20 * SCALE);
    ctx.lineTo((CANONICAL_A4_WIDTH / SCALE - 20) * SCALE, 20 * SCALE);
    ctx.lineTo((CANONICAL_A4_WIDTH / SCALE - 20) * SCALE, (20 + 28) * SCALE);
    ctx.stroke();

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(20 * SCALE, (CANONICAL_A4_HEIGHT / SCALE - 48) * SCALE);
    ctx.lineTo(20 * SCALE, (CANONICAL_A4_HEIGHT / SCALE - 20) * SCALE);
    ctx.lineTo((20 + 28) * SCALE, (CANONICAL_A4_HEIGHT / SCALE - 20) * SCALE);
    ctx.stroke();

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo((CANONICAL_A4_WIDTH / SCALE - 48) * SCALE, (CANONICAL_A4_HEIGHT / SCALE - 20) * SCALE);
    ctx.lineTo((CANONICAL_A4_WIDTH / SCALE - 20) * SCALE, (CANONICAL_A4_HEIGHT / SCALE - 20) * SCALE);
    ctx.lineTo((CANONICAL_A4_WIDTH / SCALE - 20) * SCALE, (CANONICAL_A4_HEIGHT / SCALE - 48) * SCALE);
    ctx.stroke();
  } else if (borderStyle === 'academic-crest') {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2 * SCALE;
    ctx.strokeRect(
      16 * SCALE,
      16 * SCALE,
      CANONICAL_A4_WIDTH - 32 * SCALE,
      CANONICAL_A4_HEIGHT - 32 * SCALE
    );
    // Dashed inner border
    ctx.setLineDash([12, 10]);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1 * SCALE;
    ctx.strokeRect(
      24 * SCALE,
      24 * SCALE,
      CANONICAL_A4_WIDTH - 48 * SCALE,
      CANONICAL_A4_HEIGHT - 48 * SCALE
    );
    ctx.setLineDash([]);
  }

  // 3. Watermark (if enabled)
  if (data.showWatermark && logoImg) {
    ctx.save();
    ctx.globalAlpha = 0.05;
    const wmSize = Math.min(CANONICAL_A4_WIDTH * 0.5, CANONICAL_A4_HEIGHT * 0.5);
    ctx.drawImage(
      logoImg,
      centerX - wmSize / 2,
      CANONICAL_A4_HEIGHT / 2 - wmSize / 2,
      wmSize,
      wmSize
    );
    ctx.restore();
  }

  // 4. Content Layout Calculation
  // We use deterministic layout blocks with guaranteed non-overlapping Y anchors:
  // Top Header: ~160px - ~750px
  // Logo: ~850px - ~1350px
  // Submitted To: ~1450px - ~2050px
  // Submitted By: ~2150px - ~3200px

  let currentY = 56 * SCALE; // starting padding-top: 168px

  // ---- 1. SUBMISSION TYPE ----
  const submissionText = (data.submissionType || 'ASSIGNMENT').toUpperCase();
  ctx.font = `bold ${18 * SCALE}px ${fontFamily}`;
  ctx.fillStyle = '#1e293b';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  // Support letter spacing if available, otherwise draw spaced characters
  try {
    (ctx as any).letterSpacing = '0.22em';
    ctx.fillText(submissionText, centerX, currentY);
    (ctx as any).letterSpacing = '0px';
  } catch {
    ctx.fillText(submissionText.split('').join(' '), centerX, currentY);
  }
  currentY += 28 * SCALE;

  // ---- 2. COLLEGE / UNIVERSITY NAME ----
  ctx.font = `bold ${26.5 * SCALE}px ${fontFamily}`;
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  const collegeLines = wrapText(ctx, (data.college || 'Techno College of Engineering Agartala').toUpperCase(), maxContentWidth);
  for (const line of collegeLines) {
    ctx.fillText(line, centerX, currentY);
    currentY += 36 * SCALE;
  }
  currentY += 8 * SCALE;

  // ---- 3. COURSE TITLE & COURSE CODE ----
  if (data.course) {
    const courseLines = wrapText(ctx, data.course, maxContentWidth - 140 * SCALE);
    if (courseLines.length === 1) {
      drawLabeledCenteredText(
        ctx,
        'Course Title: ',
        courseLines[0],
        currentY,
        centerX,
        fontFamily,
        17.5 * SCALE
      );
      currentY += 25 * SCALE;
    } else {
      // First line with label
      drawLabeledCenteredText(
        ctx,
        'Course Title: ',
        courseLines[0],
        currentY,
        centerX,
        fontFamily,
        17.5 * SCALE
      );
      currentY += 24 * SCALE;
      // Continuation lines
      ctx.font = `normal ${17.5 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#1e293b';
      for (let i = 1; i < courseLines.length; i++) {
        ctx.fillText(courseLines[i], centerX, currentY);
        currentY += 24 * SCALE;
      }
    }
  }

  if (data.courseCode) {
    drawLabeledCenteredText(
      ctx,
      'Course Code: ',
      data.courseCode,
      currentY,
      centerX,
      fontFamily,
      17.5 * SCALE
    );
    currentY += 28 * SCALE;
  }

  // ---- 4. CENTER LOGO ----
  const logoTargetCenterY = 1040; // Balanced vertical placement
  if (logoImg) {
    const maxLogoW = Math.min((data.logoSize || 170) * SCALE, 195 * SCALE);
    const maxLogoH = 170 * SCALE;

    const imgAspect = (logoImg.naturalWidth || logoImg.width) / (logoImg.naturalHeight || logoImg.height);
    let drawW = maxLogoW;
    let drawH = drawW / imgAspect;
    if (drawH > maxLogoH) {
      drawH = maxLogoH;
      drawW = drawH * imgAspect;
    }

    const logoY = Math.max(currentY + 22 * SCALE, logoTargetCenterY - drawH / 2);
    ctx.drawImage(logoImg, centerX - drawW / 2, logoY, drawW, drawH);
    currentY = logoY + drawH + 34 * SCALE;
  } else {
    currentY = Math.max(currentY + 36 * SCALE, 1150);
  }

  // Formatted date string calculation
  const formattedDate = (() => {
    if (!data.date) return '';
    try {
      const parts = data.date.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return data.date;
    } catch {
      return formatSubmissionDate(data.date);
    }
  })();

  // ---- 5 & 6. SUBMITTED TO & SUBMITTED BY ----
  if (data.layoutMode !== 'stacked') {
    // ======== SIDE-BY-SIDE LAYOUT (Side-by-Side) ========
    const startSectionY = Math.max(currentY + 12 * SCALE, 1400);
    let leftY = startSectionY;
    let rightY = startSectionY;

    const colLeftX = 64 * SCALE;
    const colRightX = 414 * SCALE;

    // LEFT COLUMN: SUBMITTED TO
    ctx.font = `bold ${16 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    const subToText = 'SUBMITTED TO:';
    ctx.fillText(subToText, colLeftX, leftY);

    const subToWidth = ctx.measureText(subToText).width;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.3 * SCALE;
    ctx.beginPath();
    ctx.moveTo(colLeftX, leftY + 19 * SCALE);
    ctx.lineTo(colLeftX + subToWidth, leftY + 19 * SCALE);
    ctx.stroke();

    leftY += 28 * SCALE;

    // Teacher Name
    ctx.font = `bold ${18 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.fillText(data.teacher || 'Mr. Sudip Deb', colLeftX, leftY);
    leftY += 26 * SCALE;

    // Designation
    if (data.designation) {
      ctx.font = `normal ${15 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#1e293b';
      ctx.fillText(data.designation, colLeftX, leftY);
      leftY += 23 * SCALE;
    }

    // Department
    if (data.department) {
      ctx.font = `normal ${15 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#1e293b';
      ctx.fillText(data.department, colLeftX, leftY);
      leftY += 23 * SCALE;
    }

    // College Name
    if (data.college) {
      ctx.font = `normal ${14.5 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#334155';
      ctx.fillText(data.college.split('\n')[0], colLeftX, leftY);
      leftY += 24 * SCALE;
    }

    // RIGHT COLUMN: SUBMITTED BY
    ctx.font = `bold ${16 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    const subByText = 'SUBMITTED BY:';
    ctx.fillText(subByText, colRightX, rightY);

    const subByWidth = ctx.measureText(subByText).width;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.3 * SCALE;
    ctx.beginPath();
    ctx.moveTo(colRightX, rightY + 19 * SCALE);
    ctx.lineTo(colRightX + subByWidth, rightY + 19 * SCALE);
    ctx.stroke();

    rightY += 28 * SCALE;

    // Student Name
    ctx.font = `bold ${18 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.fillText((data.student || 'STUDENT NAME').toUpperCase(), colRightX, rightY);
    rightY += 27 * SCALE;

    // Student Details
    const detailFontSize = 14.5 * SCALE;
    const detailRowHeight = 23 * SCALE;

    if (data.studentId) {
      drawLabeledLeftText(ctx, 'Student ID: ', data.studentId, colRightX, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }

    if (data.roll) {
      drawLabeledLeftText(ctx, 'TU Roll No.: ', data.roll, colRightX, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }

    if (data.reg) {
      drawLabeledLeftText(ctx, 'TU Registration No.: ', data.reg, colRightX, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }

    if (data.department) {
      const deptClean = data.department.replace(/^Department of\s*/i, '');
      drawLabeledLeftText(ctx, 'Department: ', deptClean, colRightX, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }

    if (data.semester) {
      drawLabeledLeftText(ctx, 'Program Level & Semester: ', data.semester, colRightX, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }

    if (data.session) {
      drawLabeledLeftText(ctx, 'Session: ', data.session, colRightX, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }

    // Date of Submission (Centered at bottom)
    const maxLowerY = Math.max(leftY, rightY);
    const dateY = Math.max(maxLowerY + 22 * SCALE, 3050);

    if (formattedDate) {
      drawLabeledCenteredText(
        ctx,
        'Date of Submission: ',
        formattedDate,
        dateY,
        centerX,
        fontFamily,
        15 * SCALE,
        '#000000',
        '#000000'
      );
    }
  } else {
    // ======== STACKED / CENTERED LAYOUT (Larger text & tight, cohesive spacing) ========
    currentY = Math.max(currentY, 1220);

    // Section Heading: SUBMITTED TO
    ctx.font = `bold ${18.5 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const subToText = 'SUBMITTED TO:';
    ctx.fillText(subToText, centerX, currentY);
    
    const subToWidth = ctx.measureText(subToText).width;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.3 * SCALE;
    ctx.beginPath();
    ctx.moveTo(centerX - subToWidth / 2, currentY + 21 * SCALE);
    ctx.lineTo(centerX + subToWidth / 2, currentY + 21 * SCALE);
    ctx.stroke();

    currentY += 26 * SCALE;

    // Teacher Name
    ctx.font = `bold ${20.5 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.fillText(data.teacher || 'Mr. Sudip Deb', centerX, currentY);
    currentY += 26 * SCALE;

    // Designation
    if (data.designation) {
      ctx.font = `normal ${17 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#1e293b';
      ctx.fillText(data.designation, centerX, currentY);
      currentY += 23 * SCALE;
    }

    // Department
    if (data.department) {
      ctx.font = `normal ${17 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#1e293b';
      ctx.fillText(data.department, centerX, currentY);
      currentY += 23 * SCALE;
    }

    // College Name
    if (data.college) {
      ctx.font = `normal ${16.5 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#334155';
      ctx.fillText(data.college.split('\n')[0], centerX, currentY);
      currentY += 24 * SCALE;
    }

    // Section Heading: SUBMITTED BY (shifted ~3 text lines lower from faculty)
    currentY += 68 * SCALE;

    ctx.font = `bold ${18.5 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const subByText = 'SUBMITTED BY:';
    ctx.fillText(subByText, centerX, currentY);

    const subByWidth = ctx.measureText(subByText).width;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.3 * SCALE;
    ctx.beginPath();
    ctx.moveTo(centerX - subByWidth / 2, currentY + 21 * SCALE);
    ctx.lineTo(centerX + subByWidth / 2, currentY + 21 * SCALE);
    ctx.stroke();

    currentY += 26 * SCALE;

    // Student Name
    ctx.font = `bold ${21.5 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.fillText((data.student || 'STUDENT NAME').toUpperCase(), centerX, currentY);
    currentY += 28 * SCALE;

    // Student Details
    const detailFontSize = 17 * SCALE;
    const detailRowHeight = 24 * SCALE;

    if (data.studentId) {
      drawLabeledCenteredText(ctx, 'Student ID: ', data.studentId, currentY, centerX, fontFamily, detailFontSize);
      currentY += detailRowHeight;
    }

    if (data.roll) {
      drawLabeledCenteredText(ctx, 'TU Roll No.: ', data.roll, currentY, centerX, fontFamily, detailFontSize);
      currentY += detailRowHeight;
    }

    if (data.reg) {
      drawLabeledCenteredText(ctx, 'TU Registration No.: ', data.reg, currentY, centerX, fontFamily, detailFontSize);
      currentY += detailRowHeight;
    }

    if (data.department) {
      const deptClean = data.department.replace(/^Department of\s*/i, '');
      drawLabeledCenteredText(ctx, 'Department: ', deptClean, currentY, centerX, fontFamily, detailFontSize);
      currentY += detailRowHeight;
    }

    if (data.semester) {
      drawLabeledCenteredText(ctx, 'Program Level & Semester: ', data.semester, currentY, centerX, fontFamily, detailFontSize);
      currentY += detailRowHeight;
    }

    if (data.session) {
      drawLabeledCenteredText(ctx, 'Session: ', data.session, currentY, centerX, fontFamily, detailFontSize);
      currentY += detailRowHeight;
    }

    // Date of Submission
    if (formattedDate) {
      currentY += 18 * SCALE;
      drawLabeledCenteredText(ctx, 'Date of Submission: ', formattedDate, currentY, centerX, fontFamily, detailFontSize, '#000000', '#000000');
    }
  }

  return canvas;
}
