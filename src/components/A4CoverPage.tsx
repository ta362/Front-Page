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
      case 'none':
      case 'minimal':
      default:
        return null;
    }
  };

  const fontFamily = {
    times: "'Tinos', 'EB Garamond', 'Times New Roman', Times, serif",
    garamond: "'EB Garamond', Georgia, serif",
    cinzel: "'Cinzel', serif",
  }[data.fontTheme || 'times'];

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
          padding: '44px 60px 34px 60px',
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
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#1e293b',
                marginBottom: '8px',
                lineHeight: 1.4,
              }}
            >
              {data.submissionType}
            </div>
          ) : null}

          {/* College / University Name */}
          {data.college ? (
            <div 
              style={{
                fontSize: '26.5px',
                fontWeight: 800,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                color: '#000000',
                lineHeight: 1.35,
                maxWidth: '680px',
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
                fontSize: '17.5px',
                lineHeight: 1.5,
                color: '#1e293b',
                maxWidth: '660px',
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
                fontSize: '17.5px',
                lineHeight: 1.5,
                color: '#1e293b',
                maxWidth: '660px',
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
              margin: '18px 0 16px 0',
              minHeight: '135px',
            }}
          >
            <img
              src={data.logoUrl}
              alt="Emblem"
              style={{
                maxWidth: `${Math.min(Math.max(data.logoSize || 170, 150), 195)}px`,
                maxHeight: '170px',
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

          // 1. VERTICAL STACKED (CENTERED)
          if (data.layoutMode === 'stacked') {
            return (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', marginTop: '16px', marginBottom: 'auto' }}>
                {/* SUBMITTED TO */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#000000', textDecoration: 'underline', textUnderlineOffset: '4px', marginBottom: '5px' }}>
                    SUBMITTED TO:
                  </div>
                  <div style={{ fontSize: '20.5px', fontWeight: 700, color: '#000000', marginBottom: '2px' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                  <div style={{ fontSize: '17px', color: '#1e293b', fontStyle: 'italic', marginBottom: '2px' }}>{data.designation || 'Associate Professor'}</div>
                  <div style={{ fontSize: '17px', color: '#1e293b', marginBottom: '2px' }}>{teacherDeptText}</div>
                  <div style={{ fontSize: '16.5px', color: '#334155' }}>{collegeLine}</div>
                </div>

                {/* SUBMITTED BY */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#000000', textDecoration: 'underline', textUnderlineOffset: '4px', marginBottom: '5px' }}>
                    SUBMITTED BY:
                  </div>
                  <div style={{ fontSize: '21.5px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#000000', marginBottom: '4px' }}>{data.student || 'Joy Debnath'}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '17px', lineHeight: 1.5, color: '#1e293b' }}>
                    {data.studentId && <div><strong>Student ID: </strong><span>{data.studentId}</span></div>}
                    {data.roll && <div><strong>TU Roll No.: </strong><span>{data.roll}</span></div>}
                    {data.reg && <div><strong>TU Registration No.: </strong><span>{data.reg}</span></div>}
                    {studentDeptText && <div><strong>Department: </strong><span>{studentDeptText}</span></div>}
                    {data.semester && <div><strong>Program Level &amp; Semester: </strong><span>{data.semester}</span></div>}
                    {data.session && <div><strong>Session: </strong><span>{data.session}</span></div>}
                    {formattedDate && <div style={{ marginTop: '3px' }}><strong>Date of Submission: </strong><span>{formattedDate}</span></div>}
                  </div>
                </div>
              </div>
            );
          }

          // 2. MODERN BOXED CARDS
          if (data.layoutMode === 'modern-cards') {
            return (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '12px', marginBottom: 'auto' }}>
                <div style={{ width: '48%', border: '1.5px solid #64748b', borderRadius: '12px', backgroundColor: '#f8fafc', padding: '16px 18px', textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '2px solid #0f172a', paddingBottom: '3px', marginBottom: '8px', color: '#0f172a' }}>SUBMITTED TO</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#000', marginBottom: '3px' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                  <div style={{ fontSize: '14.5px', fontStyle: 'italic', color: '#334155', marginBottom: '2px' }}>{data.designation || 'Associate Professor'}</div>
                  <div style={{ fontSize: '14.5px', color: '#334155', marginBottom: '2px' }}>{teacherDeptText}</div>
                  <div style={{ fontSize: '14px', color: '#475569' }}>{collegeLine}</div>
                </div>

                <div style={{ width: '48%', border: '1.5px solid #64748b', borderRadius: '12px', backgroundColor: '#f8fafc', padding: '16px 18px', textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', borderBottom: '2px solid #0f172a', paddingBottom: '3px', marginBottom: '8px', color: '#0f172a' }}>SUBMITTED BY</div>
                  <div style={{ fontSize: '18.5px', fontWeight: 800, color: '#000', marginBottom: '6px' }}>{data.student || 'Joy Debnath'}</div>
                  <div style={{ fontSize: '14.5px', lineHeight: 1.5, color: '#1e293b' }}>
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
              <div style={{ width: '100%', textAlign: 'left', borderLeft: '4px solid #0f172a', paddingLeft: '22px', marginTop: '14px', marginBottom: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', marginBottom: '4px' }}>SUBMITTED TO</div>
                  <div style={{ fontSize: '19px', fontWeight: 800, color: '#000', marginBottom: '2px' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                  <div style={{ fontSize: '15.5px', fontStyle: 'italic', color: '#1e293b' }}>{data.designation || 'Associate Professor'}</div>
                  <div style={{ fontSize: '15.5px', color: '#1e293b' }}>{teacherDeptText}</div>
                  <div style={{ fontSize: '15px', color: '#334155' }}>{collegeLine}</div>
                </div>

                <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', marginBottom: '4px' }}>SUBMITTED BY</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#000', marginBottom: '6px' }}>{data.student || 'Joy Debnath'}</div>
                  <div style={{ fontSize: '15.5px', lineHeight: 1.55, color: '#1e293b' }}>
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
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '14px', marginBottom: 'auto' }}>
                <div style={{ width: '48%', textAlign: 'left' }}>
                  <div style={{ fontSize: '15.5px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', marginBottom: '6px' }}>SUBMITTED TO:</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#000', marginBottom: '3px' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                  <div style={{ fontSize: '15px', fontStyle: 'italic', color: '#1e293b' }}>{data.designation || 'Associate Professor'}</div>
                  <div style={{ fontSize: '15px', color: '#1e293b' }}>{teacherDeptText}</div>
                  <div style={{ fontSize: '14.5px', color: '#334155' }}>{collegeLine}</div>
                </div>

                <div style={{ width: '48%', textAlign: 'right', borderRight: '3px solid #0f172a', paddingRight: '16px' }}>
                  <div style={{ fontSize: '15.5px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', marginBottom: '6px' }}>SUBMITTED BY:</div>
                  <div style={{ fontSize: '19px', fontWeight: 800, color: '#000', marginBottom: '6px' }}>{data.student || 'Joy Debnath'}</div>
                  <div style={{ fontSize: '15px', lineHeight: 1.5, color: '#1e293b' }}>
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
              <div style={{ width: '100%', marginTop: '12px', marginBottom: 'auto', textAlign: 'left' }}>
                <div style={{ border: '2px solid #0f172a', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
                  <div style={{ padding: '12px 16px', backgroundColor: '#f1f5f9', borderBottom: '2px solid #0f172a' }}>
                    <div style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#475569', marginBottom: '2px' }}>SUBMITTED TO</div>
                    <div style={{ fontSize: '17.5px', fontWeight: 800, color: '#0f172a' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                    <div style={{ fontSize: '14px', color: '#334155' }}>{data.designation || 'Associate Professor'} • {teacherDeptText}</div>
                  </div>

                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#475569', marginBottom: '2px' }}>SUBMITTED BY</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{data.student || 'Joy Debnath'}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: '14px', color: '#1e293b' }}>
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
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0 12px', marginTop: '8px', marginBottom: 'auto' }}>
              <div style={{ width: '47%', textAlign: 'left' }}>
                <div style={{ fontSize: '15.5px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000000', textDecoration: 'underline', textUnderlineOffset: '4px', marginBottom: '10px' }}>SUBMITTED TO:</div>
                <div style={{ fontSize: '17.5px', fontWeight: 700, color: '#000000', marginBottom: '4px' }}>{data.teacher || 'Dr. Tutan Nama'}</div>
                {data.designation && <div style={{ fontSize: '15px', color: '#1e293b', marginBottom: '3px' }}>{data.designation}</div>}
                {data.department && <div style={{ fontSize: '15px', color: '#1e293b', marginBottom: '3px' }}>{data.department}</div>}
                {data.college && <div style={{ fontSize: '14.5px', color: '#334155' }}>{collegeLine}</div>}
              </div>

              <div style={{ width: '49%', textAlign: 'left' }}>
                <div style={{ fontSize: '15.5px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000000', textDecoration: 'underline', textUnderlineOffset: '4px', marginBottom: '10px' }}>SUBMITTED BY:</div>
                <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#000000', marginBottom: '6px' }}>{data.student || 'Joy Debnath'}</div>
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '14.5px', lineHeight: 1.6, color: '#1e293b' }}>
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

