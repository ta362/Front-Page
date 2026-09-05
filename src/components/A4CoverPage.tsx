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
          padding: '48px 64px 38px 64px',
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
          <div 
            style={{
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#1e293b',
              marginBottom: '10px',
              lineHeight: 1.4,
            }}
          >
            {data.submissionType || 'ASSIGNMENT'}
          </div>

          {/* College / University Name */}
          <div 
            style={{
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color: '#000000',
              lineHeight: 1.35,
              maxWidth: '660px',
              margin: '0 auto 12px auto',
              wordWrap: 'break-word',
            }}
          >
            {data.college || 'Techno College of Engineering Agartala'}
          </div>

          {/* Course Title */}
          {data.course && (
            <div 
              style={{
                fontSize: '14.5px',
                lineHeight: 1.5,
                color: '#1e293b',
                maxWidth: '620px',
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
                fontSize: '14.5px',
                lineHeight: 1.5,
                color: '#1e293b',
                maxWidth: '620px',
                margin: '0 auto',
                wordWrap: 'break-word',
              }}
            >
              <strong style={{ color: '#000000', fontWeight: 700 }}>Course Code: </strong>
              <span>{data.courseCode}</span>
            </div>
          )}
        </div>

        {/* 2. LOGO SECTION (Generous vertical breathing space) */}
        {data.logoUrl && (
          <div 
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '12px 0',
              minHeight: '120px',
            }}
          >
            <img
              src={data.logoUrl}
              alt="Emblem"
              style={{
                maxWidth: `${Math.min(data.logoSize || 135, 145)}px`,
                maxHeight: '115px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* 3. SUBMITTED TO SECTION */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div 
            style={{
              fontSize: '14px',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#000000',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              marginBottom: '10px',
              lineHeight: 1.4,
            }}
          >
            SUBMITTED TO:
          </div>

          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.55,
            }}
          >
            <div 
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '3px',
              }}
            >
              {data.teacher || 'Mr. Sudip Deb'}
            </div>
            {data.designation && (
              <div style={{ fontSize: '14px', color: '#1e293b', marginBottom: '2px' }}>
                {data.designation}
              </div>
            )}
            {data.department && (
              <div style={{ fontSize: '14px', color: '#1e293b', marginBottom: '2px' }}>
                {data.department}
              </div>
            )}
            {data.college && (
              <div style={{ fontSize: '13.5px', color: '#334155' }}>
                {data.college.split('\n')[0]}
              </div>
            )}
          </div>
        </div>

        {/* 4. SUBMITTED BY SECTION */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '6px' }}>
          <div 
            style={{
              fontSize: '14px',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#000000',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              marginBottom: '10px',
              lineHeight: 1.4,
            }}
          >
            SUBMITTED BY:
          </div>

          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            {/* Student Name */}
            <div 
              style={{
                fontSize: '16.5px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#000000',
                marginBottom: '8px',
                lineHeight: 1.4,
              }}
            >
              {data.student || 'TANMOY DAS'}
            </div>

            {/* Student Details Stack - Every single row has explicit height and spacing */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                fontSize: '13.5px',
                lineHeight: 1.6,
                color: '#1e293b',
              }}
            >
              {data.studentId && (
                <div style={{ marginBottom: '2px' }}>
                  <strong style={{ color: '#000000', fontWeight: 700 }}>Student ID: </strong>
                  <span>{data.studentId}</span>
                </div>
              )}
              {data.roll && (
                <div style={{ marginBottom: '2px' }}>
                  <strong style={{ color: '#000000', fontWeight: 700 }}>TU Roll No.: </strong>
                  <span>{data.roll}</span>
                </div>
              )}
              {data.reg && (
                <div style={{ marginBottom: '2px' }}>
                  <strong style={{ color: '#000000', fontWeight: 700 }}>TU Registration No.: </strong>
                  <span>{data.reg}</span>
                </div>
              )}
              {data.department && (
                <div style={{ marginBottom: '2px' }}>
                  <strong style={{ color: '#000000', fontWeight: 700 }}>Department: </strong>
                  <span>{data.department.replace(/^Department of\s*/i, '')}</span>
                </div>
              )}
              {data.semester && (
                <div style={{ marginBottom: '2px' }}>
                  <strong style={{ color: '#000000', fontWeight: 700 }}>Program Level &amp; Semester: </strong>
                  <span>{data.semester}</span>
                </div>
              )}
              {data.session && (
                <div style={{ marginBottom: '2px' }}>
                  <strong style={{ color: '#000000', fontWeight: 700 }}>Session: </strong>
                  <span>{data.session}</span>
                </div>
              )}
            </div>

            {/* Date of Submission */}
            {formattedDate && (
              <div 
                style={{
                  marginTop: '12px',
                  fontSize: '13.5px',
                  lineHeight: 1.5,
                  color: '#000000',
                }}
              >
                <strong style={{ fontWeight: 700 }}>Date of Submission: </strong>
                <span>{formattedDate}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
});
A4CoverPage.displayName = 'A4CoverPage';

