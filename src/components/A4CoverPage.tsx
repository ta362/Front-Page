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
            <div className="absolute inset-[18px] border-[2.5px] border-slate-950 pointer-events-none" />
            <div className="absolute inset-[25px] border-[1px] border-slate-950 pointer-events-none" />
          </>
        );
      case 'ornate-corners':
        return (
          <>
            <div className="absolute inset-[18px] border-[2px] border-slate-950 pointer-events-none" />
            <div className="absolute top-[22px] left-[22px] w-6 h-6 border-t-[3px] border-l-[3px] border-slate-950 pointer-events-none" />
            <div className="absolute top-[22px] right-[22px] w-6 h-6 border-t-[3px] border-r-[3px] border-slate-950 pointer-events-none" />
            <div className="absolute bottom-[22px] left-[22px] w-6 h-6 border-b-[3px] border-l-[3px] border-slate-950 pointer-events-none" />
            <div className="absolute bottom-[22px] right-[22px] w-6 h-6 border-b-[3px] border-r-[3px] border-slate-950 pointer-events-none" />
          </>
        );
      case 'simple-single':
        return <div className="absolute inset-[18px] border-[2px] border-slate-950 pointer-events-none" />;
      case 'academic-crest':
        return (
          <>
            <div className="absolute inset-[18px] border-[2px] border-slate-950 pointer-events-none" />
            <div className="absolute inset-[26px] border border-dashed border-slate-700 pointer-events-none" />
          </>
        );
      case 'minimal':
      default:
        return null;
    }
  };

  const fontClass = {
    times: 'font-academic-serif',
    garamond: 'font-serif',
    cinzel: 'font-cinzel',
  }[data.fontTheme || 'times'];

  return (
    <div
      id={id}
      className={`relative bg-white text-slate-950 select-none overflow-hidden mx-auto ${fontClass} ${
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
      }}
    >
      {/* Borders */}
      {renderBorders()}

      {/* Optional Watermark Logo in background */}
      {data.showWatermark && data.logoUrl && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 overflow-hidden">
          <img
            src={data.logoUrl}
            alt="Watermark"
            className="w-1/2 h-1/2 object-contain grayscale"
          />
        </div>
      )}

      {/* Main Content Layout - Exact vertical containment within 794px x 1123px A4 bounds */}
      <div 
        className="relative z-10 w-full h-full flex flex-col justify-between text-center box-border"
        style={{
          padding: '52px 64px 44px 64px',
        }}
      >
        
        {/* 1. TOP HEADER SECTION */}
        <div className="flex flex-col items-center w-full space-y-2">
          {/* Submission Type (e.g. ASSIGNMENT / LABORATORY REPORT) */}
          <div className="w-full">
            <h1 className="text-base font-semibold tracking-[0.2em] text-slate-800 uppercase">
              {data.submissionType || 'Assignment'}
            </h1>
          </div>

          {/* College / University Name */}
          <div className="w-full px-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 uppercase leading-snug whitespace-pre-line break-words max-w-[660px] mx-auto">
              {data.college || 'Techno College of Engineering Agartala'}
            </h2>
          </div>

          {/* Course Title & Course Code */}
          <div className="flex flex-col items-center text-slate-900 w-full pt-1 space-y-1 text-sm">
            {data.course && (
              <p className="leading-snug break-words">
                <span className="font-bold text-slate-950">Course Title: </span>
                <span className="font-normal text-slate-800">{data.course}</span>
              </p>
            )}
            {data.courseCode && (
              <p className="leading-snug break-words">
                <span className="font-bold text-slate-950">Course Code: </span>
                <span className="font-normal text-slate-800">{data.courseCode}</span>
              </p>
            )}
          </div>
        </div>

        {/* 2. LOGO (Centered with dedicated headroom) */}
        {data.logoUrl && (
          <div className="my-auto py-2 flex items-center justify-center w-full">
            <img
              src={data.logoUrl}
              alt="College Emblem"
              className="object-contain"
              style={{
                maxWidth: `${Math.min(data.logoSize || 140, 160)}px`,
                maxHeight: '120px',
              }}
            />
          </div>
        )}

        {/* 3. SUBMITTED TO SECTION */}
        <div className="flex flex-col items-center w-full px-2">
          <h3 className="text-sm font-bold tracking-wider text-slate-950 uppercase underline underline-offset-4 mb-2">
            Submitted To:
          </h3>

          <div className="text-slate-950 flex flex-col items-center w-full max-w-md text-[14px] leading-relaxed space-y-0.5">
            <div className="font-bold text-slate-950 break-words text-base">
              {data.teacher || 'Mr. Sudip Deb'}
            </div>
            {data.designation && (
              <div className="text-slate-800 break-words">
                {data.designation}
              </div>
            )}
            {data.department && (
              <div className="text-slate-800 break-words">
                {data.department}
              </div>
            )}
            {data.college && (
              <div className="text-slate-800 break-words line-clamp-1">
                {data.college.split('\n')[0]}
              </div>
            )}
          </div>
        </div>

        {/* 4. SUBMITTED BY SECTION */}
        <div className="flex flex-col items-center w-full px-2 mt-2">
          <h3 className="text-sm font-bold tracking-wider text-slate-950 uppercase underline underline-offset-4 mb-2">
            Submitted By:
          </h3>

          <div className="text-slate-950 flex flex-col items-center w-full max-w-lg text-[14px] leading-relaxed">
            {/* Student Name */}
            <div className="font-bold text-slate-950 uppercase tracking-wide text-base mb-1.5 break-words">
              {data.student || 'TANMOY DAS'}
            </div>

            {/* Student Details Stack - Explicit clean rows, no flex squishing */}
            <div className="flex flex-col items-center w-full max-w-md space-y-1 text-slate-800 text-center">
              {data.studentId && (
                <div>
                  <span className="font-semibold text-slate-950">Student ID: </span>
                  <span>{data.studentId}</span>
                </div>
              )}
              {data.roll && (
                <div>
                  <span className="font-semibold text-slate-950">TU Roll No.: </span>
                  <span>{data.roll}</span>
                </div>
              )}
              {data.reg && (
                <div>
                  <span className="font-semibold text-slate-950">TU Registration No.: </span>
                  <span>{data.reg}</span>
                </div>
              )}
              {data.department && (
                <div className="break-words">
                  <span className="font-semibold text-slate-950">Department: </span>
                  <span>{data.department.replace(/^Department of\s*/i, '')}</span>
                </div>
              )}
              {data.semester && (
                <div>
                  <span className="font-semibold text-slate-950">Program Level & Semester: </span>
                  <span>{data.semester}</span>
                </div>
              )}
              {data.session && (
                <div>
                  <span className="font-semibold text-slate-950">Session: </span>
                  <span>{data.session}</span>
                </div>
              )}
            </div>

            {/* Date of Submission */}
            {formattedDate && (
              <div className="mt-3 text-[14px] text-slate-950">
                <span className="font-semibold">Date of Submission: </span>
                <span className="font-normal">{formattedDate}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
});
A4CoverPage.displayName = 'A4CoverPage';
