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

  // Border style renderings
  const renderBorders = () => {
    switch (data.borderStyle) {
      case 'classic-double':
        return (
          <>
            <div className="absolute inset-2 sm:inset-3 md:inset-4 border-[2.5px] sm:border-[3px] border-slate-900 pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 md:inset-5 border border-slate-900 pointer-events-none" />
          </>
        );
      case 'ornate-corners':
        return (
          <>
            <div className="absolute inset-2 sm:inset-3 md:inset-4 border-2 border-slate-900 pointer-events-none" />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 border-t-4 border-l-4 border-slate-900 pointer-events-none" />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 border-t-4 border-r-4 border-slate-900 pointer-events-none" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 border-b-4 border-l-4 border-slate-900 pointer-events-none" />
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 border-b-4 border-r-4 border-slate-900 pointer-events-none" />
          </>
        );
      case 'simple-single':
        return <div className="absolute inset-2 sm:inset-3 md:inset-4 border-2 border-slate-900 pointer-events-none" />;
      case 'academic-crest':
        return (
          <>
            <div className="absolute inset-2 sm:inset-3 md:inset-4 border-2 border-slate-900 pointer-events-none" />
            <div className="absolute inset-3.5 sm:inset-5 md:inset-6 border border-dashed border-slate-700 pointer-events-none" />
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
      className={`relative w-full bg-white text-slate-950 select-none overflow-hidden mx-auto transition-all ${fontClass} ${
        isPrintArea ? '' : 'shadow-2xl rounded-sm'
      }`}
      style={{
        aspectRatio: '210 / 297',
        boxSizing: 'border-box',
        transform: 'translateZ(0)',
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
            className="w-3/5 h-3/5 object-contain grayscale"
          />
        </div>
      )}

      {/* Main Content Layout - Exact Vertical Hierarchy */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between py-[6%] px-[8%] sm:py-[6.5%] sm:px-[9%] text-center box-border leading-normal">
        
        {/* 1. TOP HEADER SECTION */}
        <div className="flex flex-col items-center w-full min-h-0 space-y-1 sm:space-y-1.5">
          {/* Submission Type (e.g. Assignment / Lab Copy) */}
          <div className="w-full">
            <h1 className="text-base sm:text-xl md:text-[22px] font-normal tracking-wide text-slate-900">
              {data.submissionType || 'Assignment'}
            </h1>
          </div>

          {/* College / University Name */}
          <div className="w-full max-w-full px-1 pt-0.5 sm:pt-1">
            <h2 className="text-lg sm:text-2xl md:text-[25px] font-bold tracking-tight text-slate-950 whitespace-pre-line break-words">
              {data.college || 'Techno College of Engineering Agartala'}
            </h2>
          </div>

          {/* Course Title & Course Code (Placed directly below College Name) */}
          <div className="flex flex-col items-center gap-0.5 sm:gap-1 text-xs sm:text-sm md:text-[15px] text-slate-900 w-full px-2 pt-2 sm:pt-2.5">
            {data.course && (
              <p className="leading-snug break-words">
                <span className="font-semibold text-slate-900">Course Title: </span>
                <span className="font-normal text-slate-800">{data.course}</span>
              </p>
            )}
            {data.courseCode && (
              <p className="leading-snug break-words">
                <span className="font-semibold text-slate-900">Course Code: </span>
                <span className="font-normal text-slate-800">{data.courseCode}</span>
              </p>
            )}
          </div>
        </div>

        {/* 2. LOGO (Centered directly BELOW the Course Title and Course Code) */}
        {data.logoUrl && (
          <div className="my-auto py-2 sm:py-3 flex items-center justify-center w-full">
            <img
              src={data.logoUrl}
              alt="College Emblem"
              className="object-contain max-h-[115px] sm:max-h-[140px] md:max-h-[160px]"
              style={{
                width: `${Math.min(data.logoSize || 155, 175)}px`,
              }}
            />
          </div>
        )}

        {/* 3. SUBMITTED TO SECTION */}
        <div className="flex flex-col items-center w-full px-2 mt-1">
          <h3 className="text-sm sm:text-base md:text-[16px] font-bold tracking-wide text-slate-900 mb-0.5">
            Submitted To:
          </h3>

          <div className="text-slate-950 flex flex-col items-center w-full max-w-md text-xs sm:text-sm md:text-[13.5px]">
            <div className="font-bold text-slate-900 break-words">
              {data.teacher || 'Mr. Sudip Deb'}
            </div>
            {data.designation && (
              <p className="text-slate-800 leading-tight mt-0.5 break-words">
                {data.designation}
              </p>
            )}
            {data.department && (
              <p className="text-slate-800 leading-tight break-words">
                {data.department}
              </p>
            )}
            {data.college && (
              <p className="text-slate-800 leading-tight break-words line-clamp-1">
                {data.college.split('\n')[0]}
              </p>
            )}
          </div>
        </div>

        {/* 4. SUBMITTED BY SECTION */}
        <div className="flex flex-col items-center mt-2.5 sm:mt-3.5 w-full px-2">
          <h3 className="text-sm sm:text-base md:text-[16px] font-bold tracking-wide text-slate-900 mb-0.5">
            Submitted By:
          </h3>

          <div className="text-slate-950 flex flex-col items-center w-full max-w-lg text-xs sm:text-sm md:text-[13.5px]">
            {/* Student Name */}
            <div className="font-bold text-slate-950 uppercase tracking-wide mb-1 break-words">
              {data.student || 'TANMOY DAS'}
            </div>

            {/* Student Details Stack */}
            <div className="flex flex-col items-center w-full max-w-md gap-0.5 text-slate-800 text-center leading-snug">
              {data.studentId && (
                <p>
                  <span className="font-medium text-slate-900">Student ID: </span>
                  <span>{data.studentId}</span>
                </p>
              )}
              {data.roll && (
                <p>
                  <span className="font-medium text-slate-900">TU Roll No.: </span>
                  <span>{data.roll}</span>
                </p>
              )}
              {data.reg && (
                <p>
                  <span className="font-medium text-slate-900">TU Registration No.: </span>
                  <span>{data.reg}</span>
                </p>
              )}
              {data.department && (
                <p className="break-words">
                  <span className="font-medium text-slate-900">Department: </span>
                  <span>{data.department.replace(/^Department of\s*/i, '')}</span>
                </p>
              )}
              {data.semester && (
                <p>
                  <span className="font-medium text-slate-900">Program Level & Semester: </span>
                  <span>{data.semester}</span>
                </p>
              )}
              {data.session && (
                <p>
                  <span className="font-medium text-slate-900">Session: </span>
                  <span>{data.session}</span>
                </p>
              )}
            </div>

            {/* Date of Submission */}
            {formattedDate && (
              <div className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-[13.5px] text-slate-900">
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
