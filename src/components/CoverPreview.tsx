import React, { useRef, forwardRef } from 'react';
import { CoverPageFormData } from '../types';
import {
  Sparkles,
  Download,
  Printer,
  FileText,
  CheckCircle,
  Eye,
  RotateCcw,
  Layers,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface CoverPreviewProps {
  formData: CoverPageFormData;
  onDownloadJPG: () => void;
  onDownloadPNG: () => void;
  onDownloadPDF: () => void;
  onPrint: () => void;
  isPreviewGenerated: boolean;
  isExporting: boolean;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const CoverPreview = forwardRef<HTMLDivElement, CoverPreviewProps>(
  (
    {
      formData,
      onDownloadJPG,
      onDownloadPNG,
      onDownloadPDF,
      onPrint,
      isPreviewGenerated,
      isExporting,
      zoomLevel,
      onZoomIn,
      onZoomOut,
      onResetZoom,
    },
    ref
  ) => {
    const {
      college,
      course,
      courseCode,
      submissionType,
      teacher,
      designation,
      department,
      student,
      studentId,
      roll,
      reg,
      semester,
      session,
      date,
      logoUrl,
      logoSize = 155,
      borderStyle = 'classic-double',
      showWatermark = false,
      fontTheme = 'times',
      layoutMode = 'stacked',
    } = formData;

    const formattedDate = date
      ? new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '';

    return (
      <div className="space-y-4">
        {/* Floating Glass Preview Controller Bar */}
        <div className="liquid-panel px-4 py-3 shadow-lg flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
            <span className="text-xs font-bold text-slate-800 tracking-tight">
              Standard A4 Canvas (210 × 297 mm)
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-2 py-1 rounded-full border border-white/90 shadow-sm">
            <button
              onClick={onZoomOut}
              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-white/80 rounded-full transition-colors cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onResetZoom}
              className="text-[11px] font-bold text-slate-700 px-1.5 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={onZoomIn}
              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-white/80 rounded-full transition-colors cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrint}
              disabled={!isPreviewGenerated}
              className="p-2 text-slate-700 bg-white/80 hover:bg-white border border-white/90 rounded-full shadow-sm transition-all cursor-pointer backdrop-blur-md"
              title="Print directly"
            >
              <Printer className="w-4 h-4 text-teal-600" />
            </button>
            <button
              onClick={onDownloadPDF}
              disabled={!isPreviewGenerated || isExporting}
              className="p-2 text-slate-700 bg-white/80 hover:bg-white border border-white/90 rounded-full shadow-sm transition-all cursor-pointer backdrop-blur-md"
              title="Save as PDF"
            >
              <FileText className="w-4 h-4 text-rose-500" />
            </button>
            <button
              onClick={onDownloadJPG}
              disabled={!isPreviewGenerated || isExporting}
              className="px-3.5 py-1.5 text-xs font-bold liquid-pill-blue cursor-pointer flex items-center gap-1.5 shadow-md"
              title="Save as JPG"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Outer Canvas Container with Liquid Glass Frame */}
        <div className="liquid-panel p-3 sm:p-6 overflow-x-auto flex justify-center shadow-2xl">
          <div
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
            }}
            className="shrink-0"
          >
            {/* The Strict Standard A4 Page Area (210mm x 297mm) */}
            <div
              id="print-cover-area"
              ref={ref}
              className="bg-white text-slate-900 shadow-2xl relative overflow-hidden select-text"
              style={{
                width: '210mm',
                minHeight: '297mm',
                padding: '16mm 14mm',
                boxSizing: 'border-box',
                fontFamily: fontTheme === 'times' ? "'Times New Roman', Times, serif" : 'inherit',
              }}
            >
              {/* BORDER STYLES */}
              {borderStyle === 'classic-double' && (
                <div
                  className="absolute inset-[8mm] pointer-events-none"
                  style={{
                    border: '3px double #0f172a',
                    padding: '2.5mm',
                  }}
                >
                  <div className="w-full h-full border border-slate-700/60" />
                </div>
              )}

              {borderStyle === 'simple-single' && (
                <div className="absolute inset-[8mm] border-2 border-slate-900 pointer-events-none" />
              )}

              {borderStyle === 'ornate-corners' && (
                <div className="absolute inset-[8mm] border border-slate-900 pointer-events-none">
                  {/* Corner accents */}
                  <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-slate-900" />
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-slate-900" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-slate-900" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-slate-900" />
                </div>
              )}

              {/* Watermark */}
              {showWatermark && logoUrl && (
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
                  <img
                    src={logoUrl}
                    alt="Watermark"
                    className="w-[120mm] h-[120mm] object-contain grayscale"
                  />
                </div>
              )}

              {/* COVER PAGE CONTENT */}
              <div className="relative z-10 h-full flex flex-col justify-between items-center text-center px-4 py-2 min-h-[265mm]">
                
                {/* 1. TOP HEADER: COLLEGE NAME */}
                <div className="w-full pt-1">
                  <h1
                    className="text-[23px] font-black uppercase tracking-tight text-slate-950 leading-tight"
                    style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                  >
                    {college || 'Techno College of Engineering Agartala'}
                  </h1>
                  <div className="w-40 h-[2px] bg-slate-900 mx-auto mt-2 mb-1" />
                </div>

                {/* 2. SUBMISSION TYPE & COURSE TITLE & CODE */}
                <div className="w-full my-auto space-y-3.5">
                  <div className="inline-block px-5 py-1 bg-slate-100 border border-slate-400 rounded-md">
                    <span className="text-[14px] font-bold tracking-widest uppercase text-slate-800">
                      {submissionType || 'Assignment'}
                    </span>
                  </div>

                  <div>
                    <p className="text-[12px] font-bold text-slate-600 uppercase tracking-widest mb-1">
                      Course Title
                    </p>
                    <h2
                      className="text-[19px] font-black text-slate-900 leading-snug px-6"
                      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                    >
                      {course || 'Course Name'}
                    </h2>
                  </div>

                  {courseCode && (
                    <div className="inline-block">
                      <p className="text-[13px] font-bold tracking-wider text-slate-700 bg-slate-50 border border-slate-300 px-3 py-0.5 rounded">
                        <span className="text-slate-500 font-normal mr-1.5">Course Code:</span>
                        {courseCode}
                      </p>
                    </div>
                  )}

                  {/* 3. COLLEGE LOGO / EMBLEM POSITIONED DIRECTLY BELOW COURSE CODE */}
                  <div className="pt-2 pb-1 flex justify-center items-center">
                    {logoUrl ? (
                      <div className="p-1 rounded-full border border-slate-300/80 shadow-sm bg-white inline-block">
                        <img
                          src={logoUrl}
                          alt="College Emblem"
                          style={{
                            width: `${logoSize}px`,
                            height: `${logoSize}px`,
                          }}
                          className="object-contain block mx-auto rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 border border-dashed border-slate-300 rounded-full flex items-center justify-center text-slate-400 text-xs">
                        Emblem Placeholder
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. SUBMITTED TO & SUBMITTED BY */}
                {layoutMode === 'stacked' ? (
                  <div className="w-full space-y-4 pt-2 pb-1 border-t border-slate-300 text-center">
                    {/* Centered: Submitted To */}
                    <div className="space-y-1">
                      <p className="text-[13px] font-extrabold uppercase tracking-wider text-slate-900 underline underline-offset-4 inline-block">
                        Submitted To:
                      </p>
                      <p className="text-[15px] font-bold text-slate-950 leading-tight">
                        {teacher || 'Teacher Name'}
                      </p>
                      {designation && (
                        <p className="text-[12px] font-medium text-slate-700 leading-tight">
                          {designation}
                        </p>
                      )}
                      {department && (
                        <p className="text-[12px] text-slate-700 leading-tight">
                          {department}
                        </p>
                      )}
                      {college && (
                        <p className="text-[11.5px] text-slate-600 leading-tight font-serif">
                          {college.split('\n')[0]}
                        </p>
                      )}
                    </div>

                    {/* Centered: Submitted By */}
                    <div className="space-y-1 pt-1 border-t border-slate-200/60">
                      <p className="text-[13px] font-extrabold uppercase tracking-wider text-slate-900 underline underline-offset-4 inline-block">
                        Submitted By:
                      </p>
                      <p className="text-[15px] font-extrabold text-slate-950 uppercase tracking-wide leading-tight">
                        {student || 'Student Name'}
                      </p>
                      <div className="text-[12px] space-y-0.5 text-slate-800">
                        {studentId && (
                          <p>
                            <span className="font-semibold text-slate-900">Student ID:</span> {studentId}
                          </p>
                        )}
                        {roll && (
                          <p>
                            <span className="font-semibold text-slate-900">Roll No.:</span> {roll}
                          </p>
                        )}
                        {reg && (
                          <p>
                            <span className="font-semibold text-slate-900">Reg. No.:</span> {reg}
                          </p>
                        )}
                        {department && (
                          <p>
                            <span className="font-semibold text-slate-900">Department:</span> {department.replace(/^Department of\s*/i, '')}
                          </p>
                        )}
                        {semester && (
                          <p>
                            <span className="font-semibold text-slate-900">Program Level & Semester:</span> {semester}
                          </p>
                        )}
                        {session && (
                          <p>
                            <span className="font-semibold text-slate-900">Session:</span> {session}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-2 gap-6 pt-3 pb-2 border-t border-slate-300 text-left">
                    {/* Left Column: Submitted To */}
                    <div className="space-y-1.5 pr-2">
                      <p className="text-[13px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 inline-block">
                        Submitted To:
                      </p>
                      <p className="text-[15px] font-bold text-slate-950 leading-tight">
                        {teacher || 'Teacher Name'}
                      </p>
                      {designation && (
                        <p className="text-[12px] font-medium text-slate-700 leading-tight">
                          {designation}
                        </p>
                      )}
                      {department && (
                        <p className="text-[11.5px] text-slate-600 leading-tight">
                          {department}
                        </p>
                      )}
                      <p className="text-[11.5px] text-slate-600 leading-tight font-serif">
                        {college || 'Techno College of Engineering Agartala'}
                      </p>
                    </div>

                    {/* Right Column: Submitted By */}
                    <div className="space-y-1.5 pl-2 border-l border-slate-200">
                      <p className="text-[13px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 inline-block">
                        Submitted By:
                      </p>
                      <p className="text-[15px] font-bold text-slate-950 leading-tight">
                        {student || 'Student Name'}
                      </p>
                      <div className="text-[12px] space-y-0.5 text-slate-800">
                        {studentId && (
                          <p>
                            <span className="font-semibold text-slate-900">Student ID:</span> {studentId}
                          </p>
                        )}
                        {roll && (
                          <p>
                            <span className="font-semibold text-slate-900">Roll No.:</span> {roll}
                          </p>
                        )}
                        {reg && (
                          <p>
                            <span className="font-semibold text-slate-900">Reg. No.:</span> {reg}
                          </p>
                        )}
                        {semester && (
                          <p>
                            <span className="font-semibold text-slate-900">Semester:</span> {semester}
                          </p>
                        )}
                        {session && (
                          <p>
                            <span className="font-semibold text-slate-900">Session:</span> {session}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. FOOTER: DATE OF SUBMISSION */}
                <div className="w-full pt-2 pb-1 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-600">
                  <span>Session: {session || '2026-27'}</span>
                  <span>Date: {formattedDate || 'Date of Submission'}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
CoverPreview.displayName = 'CoverPreview';
