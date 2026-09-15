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
 * Draws text with optional bold label prefix and value, centered horizontally
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
  valueColor = '#000000',
  valueBold = false
) {
  const boldFont = `bold ${fontSize}px ${fontFamily}`;
  const valueFont = valueBold ? `bold ${fontSize}px ${fontFamily}` : `normal ${fontSize}px ${fontFamily}`;

  ctx.font = boldFont;
  const labelWidth = ctx.measureText(label).width;

  ctx.font = valueFont;
  const valueWidth = ctx.measureText(value).width;

  const totalWidth = labelWidth + valueWidth;
  const startX = centerX - totalWidth / 2;

  // Draw Label
  ctx.font = boldFont;
  ctx.fillStyle = labelColor;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(label, startX, y);

  // Draw Value
  ctx.font = valueFont;
  ctx.fillStyle = valueColor;
  ctx.fillText(value, startX + labelWidth, y);
}

/**
 * Draws text with optional bold label prefix and value, left aligned
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
  valueColor = '#000000',
  valueBold = false
) {
  const boldFont = `bold ${fontSize}px ${fontFamily}`;
  const valueFont = valueBold ? `bold ${fontSize}px ${fontFamily}` : `normal ${fontSize}px ${fontFamily}`;

  ctx.textBaseline = 'top';

  // Draw Label
  ctx.font = boldFont;
  ctx.fillStyle = labelColor;
  ctx.textAlign = 'left';
  ctx.fillText(label, x, y);

  const labelWidth = ctx.measureText(label).width;

  // Draw Value
  ctx.font = valueFont;
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
    ctx.setLineDash([12 * SCALE, 10 * SCALE]);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1 * SCALE;
    ctx.strokeRect(
      24 * SCALE,
      24 * SCALE,
      CANONICAL_A4_WIDTH - 48 * SCALE,
      CANONICAL_A4_HEIGHT - 48 * SCALE
    );
    ctx.setLineDash([]);
  } else if (borderStyle === 'thick-thin-frame') {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4 * SCALE;
    ctx.strokeRect(
      16 * SCALE,
      16 * SCALE,
      CANONICAL_A4_WIDTH - 32 * SCALE,
      CANONICAL_A4_HEIGHT - 32 * SCALE
    );
    ctx.lineWidth = 1 * SCALE;
    ctx.strokeRect(
      25 * SCALE,
      25 * SCALE,
      CANONICAL_A4_WIDTH - 50 * SCALE,
      CANONICAL_A4_HEIGHT - 50 * SCALE
    );
  } else if (borderStyle === 'triple-line') {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5 * SCALE;
    ctx.strokeRect(14 * SCALE, 14 * SCALE, CANONICAL_A4_WIDTH - 28 * SCALE, CANONICAL_A4_HEIGHT - 28 * SCALE);
    ctx.lineWidth = 1 * SCALE;
    ctx.strokeRect(20 * SCALE, 20 * SCALE, CANONICAL_A4_WIDTH - 40 * SCALE, CANONICAL_A4_HEIGHT - 40 * SCALE);
    ctx.lineWidth = 1.5 * SCALE;
    ctx.strokeRect(26 * SCALE, 26 * SCALE, CANONICAL_A4_WIDTH - 52 * SCALE, CANONICAL_A4_HEIGHT - 52 * SCALE);
  } else if (borderStyle === 'corner-box') {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2 * SCALE;
    ctx.strokeRect(18 * SCALE, 18 * SCALE, CANONICAL_A4_WIDTH - 36 * SCALE, CANONICAL_A4_HEIGHT - 36 * SCALE);
    ctx.fillStyle = '#000000';
    const boxSz = 14 * SCALE;
    ctx.fillRect(12 * SCALE, 12 * SCALE, boxSz, boxSz);
    ctx.fillRect(CANONICAL_A4_WIDTH - 26 * SCALE, 12 * SCALE, boxSz, boxSz);
    ctx.fillRect(12 * SCALE, CANONICAL_A4_HEIGHT - 26 * SCALE, boxSz, boxSz);
    ctx.fillRect(CANONICAL_A4_WIDTH - 26 * SCALE, CANONICAL_A4_HEIGHT - 26 * SCALE, boxSz, boxSz);
  } else if (borderStyle === 'top-bottom-bars') {
    ctx.fillStyle = '#000000';
    ctx.fillRect(24 * SCALE, 16 * SCALE, CANONICAL_A4_WIDTH - 48 * SCALE, 4 * SCALE);
    ctx.fillRect(24 * SCALE, CANONICAL_A4_HEIGHT - 20 * SCALE, CANONICAL_A4_WIDTH - 48 * SCALE, 4 * SCALE);
  } else if (borderStyle === 'dashed-formal') {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2 * SCALE;
    ctx.setLineDash([12 * SCALE, 8 * SCALE]);
    ctx.strokeRect(18 * SCALE, 18 * SCALE, CANONICAL_A4_WIDTH - 36 * SCALE, CANONICAL_A4_HEIGHT - 36 * SCALE);
    ctx.setLineDash([]);
    ctx.fillStyle = '#000000';
    const r = 5 * SCALE;
    ctx.beginPath(); ctx.arc(14 * SCALE + r, 14 * SCALE + r, r, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(CANONICAL_A4_WIDTH - 24 * SCALE + r, 14 * SCALE + r, r, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(14 * SCALE + r, CANONICAL_A4_HEIGHT - 24 * SCALE + r, r, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(CANONICAL_A4_WIDTH - 24 * SCALE + r, CANONICAL_A4_HEIGHT - 24 * SCALE + r, r, 0, Math.PI * 2); ctx.fill();
  } else if (borderStyle === 'minimal') {
    ctx.fillStyle = '#000000';
    ctx.fillRect(40 * SCALE, 20 * SCALE, CANONICAL_A4_WIDTH - 80 * SCALE, 2 * SCALE);
    ctx.fillRect(40 * SCALE, CANONICAL_A4_HEIGHT - 22 * SCALE, CANONICAL_A4_WIDTH - 80 * SCALE, 2 * SCALE);
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

  const scaleMap = {
    medium: 1.18,
    large: 1.35,
    'extra-large': 1.52,
  };
  const fMult = scaleMap[data.fontSizeScale || 'large'] || 1.35;

  // ---- 1. SUBMISSION TYPE ----
  if (data.submissionType) {
    ctx.font = `bold ${18 * fMult * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(data.submissionType, centerX, currentY);
    currentY += 28 * fMult * SCALE;
  }

  // ---- 2. COLLEGE / UNIVERSITY NAME ----
  if (data.college) {
    ctx.font = `bold ${26 * fMult * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const collegeLines = wrapText(ctx, data.college, maxContentWidth);
    for (const line of collegeLines) {
      ctx.fillText(line, centerX, currentY);
      currentY += 36 * fMult * SCALE;
    }
    currentY += 10 * SCALE;
  }

  // ---- 3. COURSE TITLE & COURSE CODE ----
  if (data.course) {
    const courseFontSize = 14.5 * fMult * SCALE;
    ctx.font = `bold ${courseFontSize}px ${fontFamily}`;
    const courseLines = wrapText(ctx, data.course, maxContentWidth - 20 * SCALE);
    if (courseLines.length === 1) {
      drawLabeledCenteredText(
        ctx,
        'Course Title: ',
        courseLines[0],
        currentY,
        centerX,
        fontFamily,
        courseFontSize,
        '#000000',
        '#000000',
        true
      );
      currentY += 24 * fMult * SCALE;
    } else {
      drawLabeledCenteredText(
        ctx,
        'Course Title: ',
        courseLines[0],
        currentY,
        centerX,
        fontFamily,
        courseFontSize,
        '#000000',
        '#000000',
        true
      );
      currentY += 22 * fMult * SCALE;
      ctx.font = `bold ${courseFontSize}px ${fontFamily}`;
      ctx.fillStyle = '#000000';
      for (let i = 1; i < courseLines.length; i++) {
        ctx.fillText(courseLines[i], centerX, currentY);
        currentY += 22 * fMult * SCALE;
      }
    }
  }

  if (data.courseCode) {
    const codeFontSize = 14.5 * fMult * SCALE;
    drawLabeledCenteredText(
      ctx,
      'Course Code: ',
      data.courseCode,
      currentY,
      centerX,
      fontFamily,
      codeFontSize,
      '#000000',
      '#000000',
      true
    );
    currentY += 28 * fMult * SCALE;
  }

  // ---- 4. CENTER LOGO ----
  const logoTargetCenterY = 1040;
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

  // ---- 5 & 6. SUBMITTED TO & SUBMITTED BY (6 LAYOUT MODES) ----
  const studentDeptClean = (data.studentDepartment || data.department || '').replace(/^Department of\s*/i, '');
  const teacherDeptClean = data.department
    ? data.department.startsWith('Department')
      ? data.department
      : `Department of ${data.department}`
    : 'Department of Computer Science & Engineering';
  const collegeClean = (data.college || (data.teacher ? '' : 'Techno College of Engineering Agartala')).split('\n')[0];

  const mode = data.layoutMode || 'side-by-side';

  // 1. STACKED / CENTERED
  if (mode === 'stacked') {
    currentY = Math.max(currentY, 1220);

    // Section Heading: SUBMITTED TO
    if (data.teacher || data.designation || data.department) {
      ctx.font = `bold ${18.5 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      ctx.fillText('Submitted To:', centerX, currentY);
      currentY += 28 * SCALE;

      ctx.font = `bold ${20.5 * SCALE}px ${fontFamily}`;
      ctx.fillText(data.teacher || 'Dr. Tutan Nama', centerX, currentY);
      currentY += 26 * SCALE;

      const desigText = data.designation || (data.teacher ? '' : 'Associate Professor');
      if (desigText) {
        ctx.font = `italic ${17 * SCALE}px ${fontFamily}`;
        ctx.fillText(desigText, centerX, currentY);
        currentY += 23 * SCALE;
      }

      if (teacherDeptClean) {
        ctx.font = `normal ${17 * SCALE}px ${fontFamily}`;
        ctx.fillText(teacherDeptClean, centerX, currentY);
        currentY += 23 * SCALE;
      }

      if (collegeClean) {
        ctx.font = `normal ${16.5 * SCALE}px ${fontFamily}`;
        ctx.fillText(collegeClean, centerX, currentY);
        currentY += 24 * SCALE;
      }
    }

    // Section Heading: SUBMITTED BY
    if (data.student || data.studentId || data.roll || data.reg || studentDeptClean || data.semester || data.session) {
      if (data.teacher || data.designation || data.department) {
        currentY += 36 * SCALE;
      }

      ctx.font = `bold ${18.5 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';

      ctx.fillText('Submitted By:', centerX, currentY);
      currentY += 28 * SCALE;

      if (data.student) {
        ctx.font = `bold ${21.5 * SCALE}px ${fontFamily}`;
        ctx.fillText(data.student, centerX, currentY);
        currentY += 28 * SCALE;
      }

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
      if (studentDeptClean) {
        drawLabeledCenteredText(ctx, 'Department: ', studentDeptClean, currentY, centerX, fontFamily, detailFontSize);
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
      if (formattedDate) {
        currentY += 8 * SCALE;
        drawLabeledCenteredText(ctx, 'Date of Submission: ', formattedDate, currentY, centerX, fontFamily, detailFontSize);
        currentY += detailRowHeight;
      }
    }
  } 
  // 2. MODERN BOXED CARDS
  else if (mode === 'modern-cards') {
    const startSectionY = Math.max(currentY + 12 * SCALE, 1380);
    const cardW = 310 * SCALE;
    const cardH = 260 * SCALE;
    const cardLeftX = 60 * SCALE;
    const cardRightX = 390 * SCALE;

    // Card 1 Background (Teacher)
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2 * SCALE;
    ctx.beginPath();
    ctx.roundRect(cardLeftX, startSectionY, cardW, cardH, 12 * SCALE);
    ctx.fill();
    ctx.stroke();

    // Card 2 Background (Student)
    ctx.beginPath();
    ctx.roundRect(cardRightX, startSectionY, cardW, cardH, 12 * SCALE);
    ctx.fill();
    ctx.stroke();

    // Teacher Details
    let leftY = startSectionY + 20 * SCALE;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    ctx.font = `bold ${14 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#0f172a';
    ctx.fillText('SUBMITTED TO', cardLeftX + 16 * SCALE, leftY);
    leftY += 24 * SCALE;

    ctx.font = `bold ${17.5 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.fillText(data.teacher || 'Dr. Tutan Nama', cardLeftX + 16 * SCALE, leftY);
    leftY += 25 * SCALE;

    const desigText = data.designation || (data.teacher ? '' : 'Associate Professor');
    if (desigText) {
      ctx.font = `italic ${14.5 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#334155';
      ctx.fillText(desigText, cardLeftX + 16 * SCALE, leftY);
      leftY += 21 * SCALE;
    }

    if (teacherDeptClean) {
      ctx.font = `normal ${14.5 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#334155';
      ctx.fillText(teacherDeptClean, cardLeftX + 16 * SCALE, leftY);
      leftY += 21 * SCALE;
    }

    if (collegeClean) {
      ctx.font = `normal ${14 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#475569';
      ctx.fillText(collegeClean, cardLeftX + 16 * SCALE, leftY);
    }

    // Student Details inside Card 2
    let rightY = startSectionY + 20 * SCALE;
    ctx.font = `bold ${14 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#0f172a';
    ctx.fillText('SUBMITTED BY', cardRightX + 16 * SCALE, rightY);
    rightY += 24 * SCALE;

    ctx.font = `bold ${18 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.fillText(data.student || 'Joy Debnath', cardRightX + 16 * SCALE, rightY);
    rightY += 26 * SCALE;

    const detailFontSize = 14.5 * SCALE;
    const detailRowHeight = 21 * SCALE;

    if (data.studentId) {
      drawLabeledLeftText(ctx, 'Student ID: ', data.studentId, cardRightX + 16 * SCALE, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }
    if (data.roll) {
      drawLabeledLeftText(ctx, 'TU Roll No.: ', data.roll, cardRightX + 16 * SCALE, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }
    if (data.reg) {
      drawLabeledLeftText(ctx, 'TU Registration No.: ', data.reg, cardRightX + 16 * SCALE, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }
    if (studentDeptClean) {
      drawLabeledLeftText(ctx, 'Department: ', studentDeptClean, cardRightX + 16 * SCALE, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }
    if (data.semester) {
      drawLabeledLeftText(ctx, 'Semester: ', data.semester, cardRightX + 16 * SCALE, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }
    if (data.session) {
      drawLabeledLeftText(ctx, 'Session: ', data.session, cardRightX + 16 * SCALE, rightY, fontFamily, detailFontSize);
      rightY += detailRowHeight;
    }
    if (formattedDate) {
      drawLabeledLeftText(ctx, 'Date: ', formattedDate, cardRightX + 16 * SCALE, rightY, fontFamily, detailFontSize);
    }
  }
  // 3. LEFT ALIGNED MINIMALIST WITH VERTICAL ACCENT
  else if (mode === 'left-aligned') {
    const startSectionY = Math.max(currentY + 12 * SCALE, 1400);
    const accentX = 64 * SCALE;
    const textLeftX = 84 * SCALE;
    let y = startSectionY;

    // Vertical Bar
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(accentX, startSectionY, 5 * SCALE, 260 * SCALE);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Submitted To Block
    ctx.font = `bold ${15 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#475569';
    ctx.fillText('SUBMITTED TO', textLeftX, y);
    y += 24 * SCALE;

    ctx.font = `bold ${19 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.fillText(data.teacher || 'Dr. Tutan Nama', textLeftX, y);
    y += 26 * SCALE;

    const desigText = data.designation || (data.teacher ? '' : 'Associate Professor');
    if (desigText) {
      ctx.font = `italic ${15.5 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#1e293b';
      ctx.fillText(desigText, textLeftX, y);
      y += 22 * SCALE;
    }

    if (teacherDeptClean) {
      ctx.font = `normal ${15.5 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#1e293b';
      ctx.fillText(teacherDeptClean, textLeftX, y);
      y += 22 * SCALE;
    }

    if (collegeClean) {
      ctx.font = `normal ${15 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#334155';
      ctx.fillText(collegeClean, textLeftX, y);
      y += 26 * SCALE;
    }

    // Divider Line
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1 * SCALE;
    ctx.beginPath();
    ctx.moveTo(textLeftX, y);
    ctx.lineTo(680 * SCALE, y);
    ctx.stroke();
    y += 16 * SCALE;

    // Submitted By Block
    ctx.font = `bold ${15 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#475569';
    ctx.fillText('SUBMITTED BY', textLeftX, y);
    y += 24 * SCALE;

    ctx.font = `bold ${20 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.fillText(data.student || 'Joy Debnath', textLeftX, y);
    y += 27 * SCALE;

    const detailFontSize = 15.5 * SCALE;
    const detailRowHeight = 23 * SCALE;

    if (data.studentId) {
      drawLabeledLeftText(ctx, 'Student ID: ', data.studentId, textLeftX, y, fontFamily, detailFontSize);
      y += detailRowHeight;
    }
    if (data.roll) {
      drawLabeledLeftText(ctx, 'TU Roll No.: ', data.roll, textLeftX, y, fontFamily, detailFontSize);
      y += detailRowHeight;
    }
    if (data.reg) {
      drawLabeledLeftText(ctx, 'TU Registration No.: ', data.reg, textLeftX, y, fontFamily, detailFontSize);
      y += detailRowHeight;
    }
    if (studentDeptClean) {
      drawLabeledLeftText(ctx, 'Department: ', studentDeptClean, textLeftX, y, fontFamily, detailFontSize);
      y += detailRowHeight;
    }
    if (data.semester) {
      drawLabeledLeftText(ctx, 'Program Level & Semester: ', data.semester, textLeftX, y, fontFamily, detailFontSize);
      y += detailRowHeight;
    }
    if (data.session) {
      drawLabeledLeftText(ctx, 'Session: ', data.session, textLeftX, y, fontFamily, detailFontSize);
      y += detailRowHeight;
    }
    if (formattedDate) {
      drawLabeledLeftText(ctx, 'Date of Submission: ', formattedDate, textLeftX, y, fontFamily, detailFontSize);
    }
  }
  // 4. RIGHT SPLIT EDGE (ASYMMETRIC)
  else if (mode === 'right-aligned') {
    const startSectionY = Math.max(currentY + 12 * SCALE, 1400);
    const colLeftX = 64 * SCALE;
    const colRightEdgeX = 690 * SCALE;
    let leftY = startSectionY;
    let rightY = startSectionY;

    // Left Column (Submitted To)
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    ctx.font = `bold ${15.5 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.fillText('SUBMITTED TO:', colLeftX, leftY);
    leftY += 26 * SCALE;

    ctx.font = `bold ${18 * SCALE}px ${fontFamily}`;
    ctx.fillText(data.teacher || 'Dr. Tutan Nama', colLeftX, leftY);
    leftY += 26 * SCALE;

    const desigText = data.designation || (data.teacher ? '' : 'Associate Professor');
    if (desigText) {
      ctx.font = `italic ${15 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#1e293b';
      ctx.fillText(desigText, colLeftX, leftY);
      leftY += 22 * SCALE;
    }

    if (teacherDeptClean) {
      ctx.font = `normal ${15 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#1e293b';
      ctx.fillText(teacherDeptClean, colLeftX, leftY);
      leftY += 22 * SCALE;
    }

    if (collegeClean) {
      ctx.font = `normal ${14.5 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#334155';
      ctx.fillText(collegeClean, colLeftX, leftY);
    }

    // Right Column (Submitted By - Flush Right with right accent bar)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(702 * SCALE, startSectionY, 4 * SCALE, 220 * SCALE);

    ctx.textAlign = 'right';
    ctx.font = `bold ${15.5 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#000000';
    ctx.fillText('SUBMITTED BY:', colRightEdgeX, rightY);
    rightY += 26 * SCALE;

    ctx.font = `bold ${19 * SCALE}px ${fontFamily}`;
    ctx.fillText(data.student || 'Joy Debnath', colRightEdgeX, rightY);
    rightY += 27 * SCALE;

    ctx.font = `normal ${15 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#1e293b';

    if (data.studentId) {
      ctx.fillText(`ID: ${data.studentId}`, colRightEdgeX, rightY);
      rightY += 22 * SCALE;
    }
    if (data.roll) {
      ctx.fillText(`Roll: ${data.roll}`, colRightEdgeX, rightY);
      rightY += 22 * SCALE;
    }
    if (data.reg) {
      ctx.fillText(`Reg: ${data.reg}`, colRightEdgeX, rightY);
      rightY += 22 * SCALE;
    }
    if (studentDeptClean) {
      ctx.fillText(`Dept: ${studentDeptClean}`, colRightEdgeX, rightY);
      rightY += 22 * SCALE;
    }
    if (data.semester) {
      ctx.fillText(`Semester: ${data.semester}`, colRightEdgeX, rightY);
      rightY += 22 * SCALE;
    }
    if (data.session) {
      ctx.fillText(`Session: ${data.session}`, colRightEdgeX, rightY);
      rightY += 22 * SCALE;
    }
    if (formattedDate) {
      ctx.fillText(`Date: ${formattedDate}`, colRightEdgeX, rightY);
    }
  }
  // 5. STRUCTURED TABULAR MATRIX (GRID)
  else if (mode === 'compact-grid') {
    const startSectionY = Math.max(currentY + 12 * SCALE, 1380);
    const boxX = 60 * SCALE;
    const boxW = 640 * SCALE;
    const teacherRowH = 95 * SCALE;
    const studentRowH = 155 * SCALE;

    // Box Outer Border
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5 * SCALE;
    ctx.beginPath();
    ctx.roundRect(boxX, startSectionY, boxW, teacherRowH + studentRowH, 8 * SCALE);
    ctx.fill();
    ctx.stroke();

    // Header Background
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.roundRect(boxX, startSectionY, boxW, teacherRowH, [8 * SCALE, 8 * SCALE, 0, 0]);
    ctx.fill();

    // Divider
    ctx.strokeStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(boxX, startSectionY + teacherRowH);
    ctx.lineTo(boxX + boxW, startSectionY + teacherRowH);
    ctx.stroke();

    // Row 1 (Teacher)
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    ctx.font = `bold ${12 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#475569';
    ctx.fillText('SUBMITTED TO', boxX + 16 * SCALE, startSectionY + 12 * SCALE);

    ctx.font = `bold ${17.5 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#0f172a';
    ctx.fillText(data.teacher || 'Dr. Tutan Nama', boxX + 16 * SCALE, startSectionY + 34 * SCALE);

    const subDetail = `${data.designation || 'Associate Professor'} • ${teacherDeptClean}`;
    ctx.font = `normal ${14 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#334155';
    ctx.fillText(subDetail, boxX + 16 * SCALE, startSectionY + 62 * SCALE);

    // Row 2 (Student Matrix)
    const stY = startSectionY + teacherRowH + 12 * SCALE;
    ctx.font = `bold ${12 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#475569';
    ctx.fillText('SUBMITTED BY', boxX + 16 * SCALE, stY);

    ctx.font = `bold ${18 * SCALE}px ${fontFamily}`;
    ctx.fillStyle = '#0f172a';
    ctx.fillText(data.student || 'Joy Debnath', boxX + 16 * SCALE, stY + 22 * SCALE);

    const detailFontSize = 14 * SCALE;
    const col1X = boxX + 16 * SCALE;
    const col2X = boxX + 340 * SCALE;
    let rY1 = stY + 52 * SCALE;
    let rY2 = stY + 52 * SCALE;

    if (data.studentId) {
      drawLabeledLeftText(ctx, 'Student ID: ', data.studentId, col1X, rY1, fontFamily, detailFontSize);
      rY1 += 22 * SCALE;
    }
    if (data.roll) {
      drawLabeledLeftText(ctx, 'Roll: ', data.roll, col2X, rY2, fontFamily, detailFontSize);
      rY2 += 22 * SCALE;
    }
    if (data.reg) {
      drawLabeledLeftText(ctx, 'Reg: ', data.reg, col1X, rY1, fontFamily, detailFontSize);
      rY1 += 22 * SCALE;
    }
    if (studentDeptClean) {
      drawLabeledLeftText(ctx, 'Dept: ', studentDeptClean, col2X, rY2, fontFamily, detailFontSize);
      rY2 += 22 * SCALE;
    }
    if (data.semester) {
      drawLabeledLeftText(ctx, 'Semester: ', data.semester, col1X, rY1, fontFamily, detailFontSize);
      rY1 += 22 * SCALE;
    }
    if (data.session) {
      drawLabeledLeftText(ctx, 'Session: ', data.session, col2X, rY2, fontFamily, detailFontSize);
      rY2 += 22 * SCALE;
    }
    if (formattedDate) {
      const maxRY = Math.max(rY1, rY2);
      drawLabeledLeftText(ctx, 'Date: ', formattedDate, col1X, maxRY, fontFamily, detailFontSize);
    }
  }
  // 6. DEFAULT / SIDE-BY-SIDE
  else {
    const startSectionY = Math.max(currentY + 12 * SCALE, 1400);
    let leftY = startSectionY;
    let rightY = startSectionY;

    const colLeftX = 64 * SCALE;
    const colRightX = 414 * SCALE;

    // LEFT COLUMN: SUBMITTED TO
    if (data.teacher || data.designation || data.department) {
      ctx.font = `bold ${17 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      ctx.fillText('Submitted To:', colLeftX, leftY);
      leftY += 26 * SCALE;

      ctx.font = `bold ${18.5 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#000000';
      ctx.fillText(data.teacher || 'Dr. Tutan Nama', colLeftX, leftY);
      leftY += 26 * SCALE;

      const desigText = data.designation || (data.teacher ? '' : 'Associate Professor');
      if (desigText) {
        ctx.font = `italic ${15.5 * SCALE}px ${fontFamily}`;
        ctx.fillStyle = '#000000';
        ctx.fillText(desigText, colLeftX, leftY);
        leftY += 23 * SCALE;
      }

      if (teacherDeptClean) {
        ctx.font = `normal ${15.5 * SCALE}px ${fontFamily}`;
        ctx.fillStyle = '#000000';
        ctx.fillText(teacherDeptClean, colLeftX, leftY);
        leftY += 23 * SCALE;
      }

      if (collegeClean) {
        ctx.font = `normal ${15 * SCALE}px ${fontFamily}`;
        ctx.fillStyle = '#000000';
        ctx.fillText(collegeClean, colLeftX, leftY);
      }
    }

    // RIGHT COLUMN: SUBMITTED BY
    if (data.student || data.studentId || data.roll || data.reg || studentDeptClean || data.semester || data.session) {
      ctx.font = `bold ${17 * SCALE}px ${fontFamily}`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      ctx.fillText('Submitted By:', colRightX, rightY);
      rightY += 26 * SCALE;

      if (data.student) {
        ctx.font = `bold ${18.5 * SCALE}px ${fontFamily}`;
        ctx.fillStyle = '#000000';
        ctx.fillText(data.student, colRightX, rightY);
        rightY += 27 * SCALE;
      }

      const detailFontSize = 15 * SCALE;
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

      if (studentDeptClean) {
        drawLabeledLeftText(ctx, 'Department: ', studentDeptClean, colRightX, rightY, fontFamily, detailFontSize);
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

      if (formattedDate) {
        drawLabeledLeftText(ctx, 'Date of Submission: ', formattedDate, colRightX, rightY, fontFamily, detailFontSize);
      }
    }
  }

  return canvas;
}
