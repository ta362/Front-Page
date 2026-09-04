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

  // Border style renderings (Container-relative percentages)
  const renderBorders = () => {
    switch (data.borderStyle) {
      case 'classic-double':
        return (
          <>
            <div className="absolute inset-[2.2%] border-[2px] sm:border-[2.5px] border-slate-900 pointer-events-none" />
            <div className="absolute inset-[2.9%] border border-slate-900 pointer-events-none" />
          </>
        );
      case 'ornate-corners':
        return (
          <>
            <div className="absolute inset-[2.2%] border-2 border-slate-900 pointer-events-none" />
            <div className="absolute top-[2.5%] left-[2.5%] w-4 h-4 sm:w-6 sm:h-6 border-t-4 border-l-4 border-slate-900 pointer-events-none" />
            <div className="absolute top-[2.5%] right-[2.5%] w-4 h-4 sm:w-6 sm:h-6 border-t-4 border-r-4 border-slate-900 pointer-events-none" />
            <div className="absolute bottom-[2.5%] left-[2.5%] w-4 h-4 sm:w-6 sm:h-6 border-b-4 border-l-4 border-slate-900 pointer-events-none" />
            <div className="absolute bottom-[2.5%] right-[2.5%] w-4 h-4 sm:w-6 sm:h-6 border-b-4 border-r-4 border-slate-900 pointer-events-none" />
          </>
        );
      case 'simple-single':
        return <div className="absolute inset-[2.2%] border-2 border-slate-900 pointer-events-none" />;
      case 'academic-crest':
        return (
          <>
            <div className="absolute inset-[2.2%] border-2 border-slate-900 pointer-events-none" />
            <div className="absolute inset-[3.2%] border border-dashed border-slate-700 pointer-events-none" />
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
      className={`relative w-full bg-white text-slate-950 select-none overflow-hidden mx-auto ${fontClass} ${
        isPrintArea ? '' : 'shadow-2xl rounded-sm'
      }`}
      style={{
        aspectRatio: '210 / 297',
        boxSizing: 'border-box',
        // Container query enabled for perfectly scaled typography across any screen size
        containerType: 'inline-size',
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

      {/* Main Content Layout - Exact vertical containment within A4 bounds */}
      <div 
        className="relative z-10 w-full h-full flex flex-col justify-between text-center box-border leading-normal"
        style={{
          padding: '5.5% 7.5%',
        }}
      >
        
        {/* 1. TOP HEADER SECTION */}
        <div className="flex flex-col items-center w-full min-h-0 space-y-[2cqi]">
          {/* Submission Type (e.g. Assignment / Laboratory Report) */}
          <div className="w-full">
            <h1 
              className="font-normal tracking-wide text-slate-900 uppercase"
              style={{ fontSize: 'clamp(10px, 3.4cqi, 16px)' }}
            >
              {data.submissionType || 'Assignment'}
            </h1>
          </div>

          {/* College / University Name */}
          <div className="w-full px-1">
            <h2 
              className="font-bold tracking-tight text-slate-950 whitespace-pre-line break-words leading-tight"
              style={{ fontSize: 'clamp(12px, 4.4cqi, 22px)' }}
            >
              {data.college || 'Techno College of Engineering Agartala'}
            </h2>
          </div>

          {/* Course Title & Course Code */}
          <div 
            className="flex flex-col items-center text-slate-900 w-full pt-[1cqi]"
            style={{ fontSize: 'clamp(9px, 2.9cqi, 14px)' }}
          >
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

        {/* 2. LOGO (Flexibly sized to never push out text) */}
        {data.logoUrl && (
          <div className="my-auto py-[1.5cqi] flex items-center justify-center w-full min-h-0">
            <img
              src={data.logoUrl}
              alt="College Emblem"
              className="object-contain"
              style={{
                width: 'clamp(45px, 25cqi, 140px)',
                maxHeight: 'clamp(45px, 20cqi, 110px)',
              }}
            />
          </div>
        )}

        {/* 3. SUBMITTED TO SECTION */}
        <div className="flex flex-col items-center w-full px-1 min-h-0">
          <h3 
            className="font-bold tracking-wide text-slate-900 uppercase underline underline-offset-2 mb-[1cqi]"
            style={{ fontSize: 'clamp(9.5px, 3.1cqi, 15px)' }}
          >
            Submitted To:
          </h3>

          <div 
            className="text-slate-950 flex flex-col items-center w-full max-w-md"
            style={{ fontSize: 'clamp(8.5px, 2.7cqi, 13px)' }}
          >
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
        <div className="flex flex-col items-center w-full px-1 pt-[1cqi] min-h-0">
          <h3 
            className="font-bold tracking-wide text-slate-900 uppercase underline underline-offset-2 mb-[1cqi]"
            style={{ fontSize: 'clamp(9.5px, 3.1cqi, 15px)' }}
          >
            Submitted By:
          </h3>

          <div 
            className="text-slate-950 flex flex-col items-center w-full max-w-lg"
            style={{ fontSize: 'clamp(8.5px, 2.7cqi, 13px)' }}
          >
            {/* Student Name */}
            <div className="font-bold text-slate-950 uppercase tracking-wide mb-[0.5cqi] break-words">
              {data.student || 'TANMOY DAS'}
            </div>

            {/* Student Details Stack */}
            <div className="flex flex-col items-center w-full max-w-md gap-[0.2cqi] text-slate-800 text-center leading-snug">
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
              <div 
                className="mt-[1.5cqi] text-slate-900"
                style={{ fontSize: 'clamp(8.5px, 2.7cqi, 13px)' }}
              >
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
