import React from 'react';
import { CoverPageFormData } from '../types';
import { formatSubmissionDate } from '../utils/exportUtils';

interface A4CoverPageProps {
  data: CoverPageFormData;
  id?: string;
  isPrintArea?: boolean;
}

export const A4CoverPage: React.FC<A4CoverPageProps> = React.memo(({
  data,
  id = 'target-cover',
  isPrintArea = false,
}) => {
  // Format submission date nicely (DD/MM/YYYY)
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

  // Border style renderings (Canonical A4 pixel standard: 794px x 1123px)
  const renderBorders = () => {
    switch (data.borderStyle) {
      case 'classic-double':
        return (
          <>
            <div style={{ position: 'absolute', top: 16, left: 16, right: 16, bottom: 16, border: '2.5px solid #000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 23, left: 23, right: 23, bottom: 23, border: '1px solid #000000', pointerEvents: 'none' }} />
          </>
        );
      case 'ornate-corners':
        return (
          <>
            <div style={{ position: 'absolute', top: 16, left: 16, right: 16, bottom: 16, border: '2px solid #000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 20, left: 20, width: 28, height: 28, borderTop: '3px solid #000000', borderLeft: '3px solid #000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 20, right: 20, width: 28, height: 28, borderTop: '3px solid #000000', borderRight: '3px solid #000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, width: 28, height: 28, borderBottom: '3px solid #000000', borderLeft: '3px solid #000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 20, right: 20, width: 28, height: 28, borderBottom: '3px solid #000000', borderRight: '3px solid #000000', pointerEvents: 'none' }} />
          </>
        );
      case 'simple-single':
        return <div style={{ position: 'absolute', top: 16, left: 16, right: 16, bottom: 16, border: '2px solid #000000', pointerEvents: 'none' }} />;
      case 'academic-crest':
        return (
          <>
            <div style={{ position: 'absolute', top: 16, left: 16, right: 16, bottom: 16, border: '2px solid #000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 24, left: 24, right: 24, bottom: 24, border: '1px dashed #334155', pointerEvents: 'none' }} />
          </>
        );
      case 'thick-thin-frame':
        return (
          <>
            <div style={{ position: 'absolute', top: 16, left: 16, right: 16, bottom: 16, border: '4px solid #000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 25, left: 25, right: 25, bottom: 25, border: '1px solid #000000', pointerEvents: 'none' }} />
          </>
        );
      case 'triple-line':
        return (
          <>
            <div style={{ position: 'absolute', top: 14, left: 14, right: 14, bottom: 14, border: '1.5px solid #000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, border: '1px solid #000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 26, left: 26, right: 26, bottom: 26, border: '1.5px solid #000000', pointerEvents: 'none' }} />
          </>
        );
      case 'corner-box':
        return (
          <>
            <div style={{ position: 'absolute', top: 18, left: 18, right: 18, bottom: 18, border: '2px solid #000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 12, left: 12, width: 14, height: 14, backgroundColor: '#000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 12, right: 12, width: 14, height: 14, backgroundColor: '#000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 12, left: 12, width: 14, height: 14, backgroundColor: '#000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 12, right: 12, width: 14, height: 14, backgroundColor: '#000000', pointerEvents: 'none' }} />
          </>
        );
      case 'top-bottom-bars':
        return (
          <>
            <div style={{ position: 'absolute', top: 16, left: 24, right: 24, height: 4, backgroundColor: '#000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 16, left: 24, right: 24, height: 4, backgroundColor: '#000000', pointerEvents: 'none' }} />
          </>
        );
      case 'dashed-formal':
        return (
          <>
            <div style={{ position: 'absolute', top: 18, left: 18, right: 18, bottom: 18, border: '2px dashed #000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 14, left: 14, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 14, right: 14, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 14, left: 14, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 14, right: 14, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#000000', pointerEvents: 'none' }} />
          </>
        );
      case 'minimal':
        return (
          <>
            <div style={{ position: 'absolute', top: 20, left: 40, right: 40, height: 2, backgroundColor: '#000000', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 40, right: 40, height: 2, backgroundColor: '#000000', pointerEvents: 'none' }} />
          </>
        );
      case 'none':
      default:
        return null;
    }
  };

  const fontFamily = {
    times: "'Tinos', 'EB Garamond', 'Times New Roman', Times, serif",
    garamond: "'EB Garamond', Georgia, serif",
    cinzel: "'Cinzel', serif",
  }[data.fontTheme || 'times'];

  const scaleMap = {
    medium: 1.18,
    large: 1.35,
    'extra-large': 1.52,
  };
  const fMult = scaleMap[data.fontSizeScale || 'large'] || 1.35;
  const fs = (px: number) => `${(px * fMult).toFixed(1)}px`;

  return (
    <div
      id={id}
      className={`relative select-none overflow-hidden mx-auto ${
        isPrintArea ? '' : 'shadow-2xl'
      }`}
      style={{
        width: '794px',
        height: '1123px',
        minWidth: '794px',
        minHeight: '1123px',
        maxWidth: '794px',
        maxHeight: '1123px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        color: '#000000',
        fontFamily,
        position: 'relative',
      }}
    >
      {/* Borders */}
      {renderBorders()}

      {/* Optional Watermark Logo */}
      {data.showWatermark && data.logoUrl && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            opacity: 0.05,
            overflow: 'hidden',
          }}
        >
          <img
            src={data.logoUrl}
            alt="Watermark"
            style={{ width: '50%', height: '50%', objectFit: 'contain', filter: 'grayscale(100%)' }}
          />
        </div>
      )}

      {/* Main Structural Content - Guaranteed No-Overlap Layout */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          width: '794px',
          height: '1123px',
          padding: '40px 54px 30px 54px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'center',
        }}
      >
        
        {/* 1. TOP HEADER SECTION */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Submission Type (e.g. ASSIGNMENT) */}
          {data.submissionType ? (
            <div 
              style={{
                fontSize: fs(18),
                fontWeight: 800,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#000000',
                marginBottom: '8px',
                lineHeight: 1.35,
              }}
            >
              {data.submissionType}
            </div>
          ) : null}

          {/* College / University Name */}
          {data.college ? (
            <div 
              style={{
                fontSize: fs(26.5),
                fontWeight: 800,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                color: '#000000',
                lineHeight: 1.3,
                maxWidth: '690px',
                margin: '0 auto 10px auto',
                wordWrap: 'break-word',
              }}
            >
              {data.college}
            </div>
          ) : null}

          {/* Course Title */}
          {data.course && (
            <div 
              style={{
                fontSize: fs(14.5),
                lineHeight: 1.38,
                color: '#000000',
                maxWidth: '680px',
                margin: '0 auto 4px auto',
                wordWrap: 'break-word',
              }}
            >
              <strong style={{ color: '#000000', fontWeight: 700 }}>Course Title: </strong>
              <span>{data.course}</span>
            </div>
          )}

          {/* Course Code */}
          {data.courseCode && (
            <div 
              style={{
                fontSize: fs(14.5),
                lineHeight: 1.38,
                color: '#000000',
                maxWidth: '680px',
                margin: '0 auto',
                wordWrap: 'break-word',
              }}
            >
              <strong style={{ color: '#000000', fontWeight: 700 }}>Course Code: </strong>
              <span>{data.courseCode}</span>
            </div>
          )}
        </div>

        {/* 2. LOGO SECTION */}
        {data.logoUrl && (
          <div 
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '14px 0 12px 0',
              minHeight: '125px',
            }}
          >
            <img
              src={data.logoUrl}
              alt="Emblem"
              style={{
                maxWidth: `${Math.min(data.logoSize || 200, 200)}px`,
                maxHeight: '175px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* 3 & 4. SUBMITTED TO & SUBMITTED BY (6 LAYOUT MODES) */}
        {(() => {
          const studentDeptText = (data.studentDepartment || data.department || '').replace(/^Department of\s*/i, '');
          const teacherDeptText = data.department
            ? data.department.startsWith('Department')
              ? data.department
              : `Department of ${data.department}`
            : 'Department of Computer Science & Engineering';
          const collegeLine = (data.college || 'Techno College of Engineering Agartala').split('\n')[0];

          // 1. VERTICAL STACKED (CENTERED) - PERMANENT DEFAULT
          if (data.layoutMode === 'stacked' || !data.layoutMode || data.layoutMode === 'side-by-side') {
            return (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '12px', marginBottom: 'auto' }}>
                {/* SUBMITTED TO */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: fs(21), fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#000000', textDecoration: 'underline', textUnderlineOffset: '4px', marginBottom: '8px' }}>
                    SUBMITTED TO:
                  </div>
                  <div style={{ fontSize: fs(25), fontWeight: 800, letterSpacing: '0.04em', color: '#000000', marginBottom: '6px' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: fs(20.5), lineHeight: 1.6, color: '#000000' }}>
                    <div style={{ fontStyle: 'italic', color: '#000000' }}>{data.designation || 'Associate Professor'}</div>
                    <div style={{ color: '#000000' }}>{teacherDeptText}</div>
                    <div style={{ color: '#000000' }}>{collegeLine}</div>
                  </div>
                </div>

                {/* SUBMITTED BY */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
                  <div style={{ fontSize: fs(21), fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#000000', textDecoration: 'underline', textUnderlineOffset: '4px', marginBottom: '8px' }}>
                    SUBMITTED BY:
                  </div>
                  <div style={{ fontSize: fs(25), fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#000000', marginBottom: '8px' }}>{data.student || 'Joy Debnath'}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: fs(20.5), lineHeight: 1.6, color: '#000000' }}>
                    {data.studentId && <div><strong>Student ID: </strong><span>{data.studentId}</span></div>}
                    {data.roll && <div><strong>TU Roll No.: </strong><span>{data.roll}</span></div>}
                    {data.reg && <div><strong>TU Registration No.: </strong><span>{data.reg}</span></div>}
                    {studentDeptText && <div><strong>Department: </strong><span>{studentDeptText}</span></div>}
                    {data.semester && <div><strong>Program Level &amp; Semester: </strong><span>{data.semester}</span></div>}
                    {data.session && <div><strong>Session: </strong><span>{data.session}</span></div>}
                    {formattedDate && <div style={{ marginTop: '4px' }}><strong>Date of Submission: </strong><span>{formattedDate}</span></div>}
                  </div>
                </div>
              </div>
            );
          }

          // 2. MODERN BOXED CARDS
          if (data.layoutMode === 'modern-cards') {
            return (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '10px', marginBottom: 'auto' }}>
                <div style={{ width: '48%', border: '1.5px solid #000000', borderRadius: '12px', backgroundColor: '#f8fafc', padding: '16px 18px', textAlign: 'left' }}>
                  <div style={{ fontSize: fs(14), fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '2px solid #000000', paddingBottom: '3px', marginBottom: '8px', color: '#000000' }}>SUBMITTED TO</div>
                  <div style={{ fontSize: fs(18), fontWeight: 800, color: '#000000', marginBottom: '3px' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                  <div style={{ fontSize: fs(14.5), fontStyle: 'italic', color: '#000000', marginBottom: '2px' }}>{data.designation || 'Associate Professor'}</div>
                  <div style={{ fontSize: fs(14.5), color: '#000000', marginBottom: '2px' }}>{teacherDeptText}</div>
                  <div style={{ fontSize: fs(14), color: '#000000' }}>{collegeLine}</div>
                </div>

                <div style={{ width: '48%', border: '1.5px solid #000000', borderRadius: '12px', backgroundColor: '#f8fafc', padding: '16px 18px', textAlign: 'left' }}>
                  <div style={{ fontSize: fs(14), fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '2px solid #000000', paddingBottom: '3px', marginBottom: '8px', color: '#000000' }}>SUBMITTED BY</div>
                  <div style={{ fontSize: fs(18.5), fontWeight: 800, color: '#000000', marginBottom: '6px' }}>{data.student || 'Joy Debnath'}</div>
                  <div style={{ fontSize: fs(14.5), lineHeight: 1.5, color: '#000000' }}>
                    {data.studentId && <div><strong>Student ID: </strong><span>{data.studentId}</span></div>}
                    {data.roll && <div><strong>TU Roll No.: </strong><span>{data.roll}</span></div>}
                    {data.reg && <div><strong>TU Registration No.: </strong><span>{data.reg}</span></div>}
                    {studentDeptText && <div><strong>Department: </strong><span>{studentDeptText}</span></div>}
                    {data.semester && <div><strong>Semester: </strong><span>{data.semester}</span></div>}
                    {data.session && <div><strong>Session: </strong><span>{data.session}</span></div>}
                    {formattedDate && <div style={{ marginTop: '4px' }}><strong>Date: </strong><span>{formattedDate}</span></div>}
                  </div>
                </div>
              </div>
            );
          }

          // 3. LEFT ALIGNED MINIMALIST WITH VERTICAL ACCENT
          if (data.layoutMode === 'left-aligned') {
            return (
              <div style={{ width: '100%', textAlign: 'left', borderLeft: '4px solid #000000', paddingLeft: '22px', marginTop: '12px', marginBottom: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <div style={{ fontSize: fs(15), fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000000', marginBottom: '4px' }}>SUBMITTED TO</div>
                  <div style={{ fontSize: fs(19), fontWeight: 800, color: '#000000', marginBottom: '2px' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                  <div style={{ fontSize: fs(15.5), fontStyle: 'italic', color: '#000000' }}>{data.designation || 'Associate Professor'}</div>
                  <div style={{ fontSize: fs(15.5), color: '#000000' }}>{teacherDeptText}</div>
                  <div style={{ fontSize: fs(15), color: '#000000' }}>{collegeLine}</div>
                </div>

                <div style={{ borderTop: '1px solid #000000', paddingTop: '14px' }}>
                  <div style={{ fontSize: fs(15), fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000000', marginBottom: '4px' }}>SUBMITTED BY</div>
                  <div style={{ fontSize: fs(20), fontWeight: 800, color: '#000000', marginBottom: '6px' }}>{data.student || 'Joy Debnath'}</div>
                  <div style={{ fontSize: fs(15.5), lineHeight: 1.55, color: '#000000' }}>
                    {data.studentId && <div><strong>Student ID: </strong><span>{data.studentId}</span></div>}
                    {data.roll && <div><strong>TU Roll No.: </strong><span>{data.roll}</span></div>}
                    {data.reg && <div><strong>TU Registration No.: </strong><span>{data.reg}</span></div>}
                    {studentDeptText && <div><strong>Department: </strong><span>{studentDeptText}</span></div>}
                    {data.semester && <div><strong>Program Level &amp; Semester: </strong><span>{data.semester}</span></div>}
                    {data.session && <div><strong>Session: </strong><span>{data.session}</span></div>}
                    {formattedDate && <div style={{ marginTop: '4px' }}><strong>Date of Submission: </strong><span>{formattedDate}</span></div>}
                  </div>
                </div>
              </div>
            );
          }

          // 4. RIGHT SPLIT EDGE (ASYMMETRIC)
          if (data.layoutMode === 'right-aligned') {
            return (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '12px', marginBottom: 'auto' }}>
                <div style={{ width: '48%', textAlign: 'left' }}>
                  <div style={{ fontSize: fs(15.5), fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000000', marginBottom: '6px' }}>SUBMITTED TO:</div>
                  <div style={{ fontSize: fs(18), fontWeight: 800, color: '#000000', marginBottom: '3px' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                  <div style={{ fontSize: fs(15), fontStyle: 'italic', color: '#000000' }}>{data.designation || 'Associate Professor'}</div>
                  <div style={{ fontSize: fs(15), color: '#000000' }}>{teacherDeptText}</div>
                  <div style={{ fontSize: fs(14.5), color: '#000000' }}>{collegeLine}</div>
                </div>

                <div style={{ width: '48%', textAlign: 'right', borderRight: '3px solid #000000', paddingRight: '16px' }}>
                  <div style={{ fontSize: fs(15.5), fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000000', marginBottom: '6px' }}>SUBMITTED BY:</div>
                  <div style={{ fontSize: fs(19), fontWeight: 800, color: '#000000', marginBottom: '6px' }}>{data.student || 'Joy Debnath'}</div>
                  <div style={{ fontSize: fs(15), lineHeight: 1.5, color: '#000000' }}>
                    {data.studentId && <div><strong>ID: </strong><span>{data.studentId}</span></div>}
                    {data.roll && <div><strong>Roll: </strong><span>{data.roll}</span></div>}
                    {data.reg && <div><strong>Reg: </strong><span>{data.reg}</span></div>}
                    {studentDeptText && <div><strong>Dept: </strong><span>{studentDeptText}</span></div>}
                    {data.semester && <div><strong>Semester: </strong><span>{data.semester}</span></div>}
                    {data.session && <div><strong>Session: </strong><span>{data.session}</span></div>}
                    {formattedDate && <div style={{ marginTop: '4px' }}><strong>Date: </strong><span>{formattedDate}</span></div>}
                  </div>
                </div>
              </div>
            );
          }

          // 5. STRUCTURED TABULAR MATRIX (GRID)
          if (data.layoutMode === 'compact-grid') {
            return (
              <div style={{ width: '100%', marginTop: '10px', marginBottom: 'auto', textAlign: 'left' }}>
                <div style={{ border: '2px solid #000000', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
                  <div style={{ padding: '12px 16px', backgroundColor: '#f1f5f9', borderBottom: '2px solid #000000' }}>
                    <div style={{ fontSize: fs(12), fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000000', marginBottom: '2px' }}>SUBMITTED TO</div>
                    <div style={{ fontSize: fs(17.5), fontWeight: 800, color: '#000000' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                    <div style={{ fontSize: fs(14), color: '#000000' }}>{data.designation || 'Associate Professor'} • {teacherDeptText}</div>
                  </div>

                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: fs(12), fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000000', marginBottom: '2px' }}>SUBMITTED BY</div>
                    <div style={{ fontSize: fs(18), fontWeight: 800, color: '#000000', marginBottom: '8px' }}>{data.student || 'Joy Debnath'}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: fs(14), color: '#000000' }}>
                      {data.studentId && <div><strong>Student ID:</strong> {data.studentId}</div>}
                      {data.roll && <div><strong>Roll:</strong> {data.roll}</div>}
                      {data.reg && <div><strong>Reg:</strong> {data.reg}</div>}
                      {studentDeptText && <div><strong>Dept:</strong> {studentDeptText}</div>}
                      {data.semester && <div><strong>Semester:</strong> {data.semester}</div>}
                      {data.session && <div><strong>Session:</strong> {data.session}</div>}
                      {formattedDate && <div style={{ gridColumn: 'span 2', marginTop: '2px' }}><strong>Date:</strong> {formattedDate}</div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // 6. DEFAULT: SIDE-BY-SIDE
          return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0 8px', marginTop: '6px', marginBottom: 'auto' }}>
              <div style={{ width: '47%', textAlign: 'left' }}>
                <div style={{ fontSize: fs(17), fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000000', textDecoration: 'underline', textUnderlineOffset: '4px', marginBottom: '10px' }}>SUBMITTED TO:</div>
                <div style={{ fontSize: fs(20), fontWeight: 800, color: '#000000', marginBottom: '6px' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: fs(16), lineHeight: 1.58, color: '#000000' }}>
                  {data.designation && <div style={{ marginBottom: '2px', fontStyle: 'italic', color: '#000000' }}><span>{data.designation}</span></div>}
                  {data.department && <div style={{ marginBottom: '2px', color: '#000000' }}><span>{data.department}</span></div>}
                  {data.college && <div style={{ marginBottom: '2px', color: '#000000' }}><span>{collegeLine}</span></div>}
                </div>
              </div>

              <div style={{ width: '49%', textAlign: 'left' }}>
                <div style={{ fontSize: fs(17), fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000000', textDecoration: 'underline', textUnderlineOffset: '4px', marginBottom: '10px' }}>SUBMITTED BY:</div>
                <div style={{ fontSize: fs(20), fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#000000', marginBottom: '6px' }}>{data.student || 'Joy Debnath'}</div>
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: fs(16), lineHeight: 1.58, color: '#000000' }}>
                  {data.studentId && <div style={{ marginBottom: '2px' }}><strong>Student ID: </strong><span>{data.studentId}</span></div>}
                  {data.roll && <div style={{ marginBottom: '2px' }}><strong>TU Roll No.: </strong><span>{data.roll}</span></div>}
                  {data.reg && <div style={{ marginBottom: '2px' }}><strong>TU Registration No.: </strong><span>{data.reg}</span></div>}
                  {studentDeptText && <div style={{ marginBottom: '2px' }}><strong>Department: </strong><span>{studentDeptText}</span></div>}
                  {data.semester && <div style={{ marginBottom: '2px' }}><strong>Program Level &amp; Semester: </strong><span>{data.semester}</span></div>}
                  {data.session && <div style={{ marginBottom: '2px' }}><strong>Session: </strong><span>{data.session}</span></div>}
                  {formattedDate && <div style={{ marginTop: '4px' }}><strong>Date of Submission: </strong><span>{formattedDate}</span></div>}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Layout rendering completes */}

      </div>
    </div>
  );
});
A4CoverPage.displayName = 'A4CoverPage';

