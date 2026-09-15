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
      studentDepartment,
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
              <div className="relative z-10 h-full flex flex-col justify-between items-center text-center px-6 py-8 min-h-[265mm]">
                
                {/* TOP SECTION: SUBMISSION TYPE & COLLEGE NAME */}
                <div className="w-full space-y-2 pt-2">
                  <p className="text-[17px] font-bold text-slate-900 tracking-tight">
                    {submissionType || 'Assignment'}
                  </p>
                  <h1
                    className="text-[25px] font-bold text-slate-950 leading-snug px-2"
                    style={{ fontFamily: fontTheme === 'times' ? "'Times New Roman', Times, serif" : 'inherit' }}
                  >
                    {college || 'Techno College of Engineering Agartala'}
                  </h1>
                </div>

                {/* MIDDLE SECTION: COURSE TITLE, COURSE CODE & LOGO */}
                <div className="w-full my-auto space-y-3">
                  <div>
                    <p className="text-[14px] text-slate-900 leading-snug">
                      <span className="font-bold">Course Title: </span>
                      <span className="font-bold">{course || 'COMPILER DESIGN'}</span>
                    </p>
                  </div>

                  {courseCode && (
                    <p className="text-[14px] text-slate-900 leading-snug">
                      <span className="font-bold">Course Code: </span>
                      <span className="font-bold">{courseCode}</span>
                    </p>
                  )}

                  {/* COLLEGE LOGO / EMBLEM POSITIONED DIRECTLY BELOW COURSE CODE */}
                  <div className="pt-4 pb-2 flex justify-center items-center">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="College Emblem"
                        style={{
                          width: `${logoSize}px`,
                          height: `${logoSize}px`,
                        }}
                        className="object-contain block mx-auto rounded-full"
                      />
                    ) : (
                      <div className="w-28 h-28 border border-dashed border-slate-300 rounded-full flex items-center justify-center text-slate-400 text-xs">
                        Emblem Placeholder
                      </div>
                    )}
                  </div>
                </div>

                {/* BOTTOM SECTION: SUBMITTED TO & SUBMITTED BY (6 LAYOUT MODES) */}
                {(() => {
                  const studentDeptText = (studentDepartment || department || '').replace(/^Department of\s*/i, '');
                  const teacherDeptText = department
                    ? department.startsWith('Department')
                      ? department
                      : `Department of ${department}`
                    : 'Department of Computer Science & Engineering';
                  const collegeLine = (college || 'Techno College of Engineering Agartala').split('\n')[0];

                  const teacherBlock = (
                    <div>
                      <p className="text-[15px] font-bold text-slate-900 mb-0.5">Submitted To:</p>
                      <p className="text-[16px] font-bold text-slate-950 leading-snug">{teacher || 'Dr. Tutan Nama'}</p>
                      {(designation || !teacher) && <p className="text-[13.5px] italic text-slate-800 leading-snug">{designation || 'Associate Professor'}</p>}
                      {(department || !teacher) && <p className="text-[13.5px] text-slate-800 leading-snug">{teacherDeptText}</p>}
                      {(college || !teacher) && <p className="text-[13.5px] text-slate-800 leading-snug">{collegeLine}</p>}
                    </div>
                  );

                  const studentDetails = (
                    <div className="text-[13.5px] space-y-0.5 text-slate-900">
                      {studentId && <p><span className="font-bold">Student ID: </span><span className="font-normal">{studentId}</span></p>}
                      {roll && <p><span className="font-bold">TU Roll No.: </span><span className="font-normal">{roll}</span></p>}
                      {reg && <p><span className="font-bold">TU Registration No.: </span><span className="font-normal">{reg}</span></p>}
                      {studentDeptText && <p><span className="font-bold">Department: </span><span className="font-normal">{studentDeptText}</span></p>}
                      {semester && <p><span className="font-bold">Program Level & Semester: </span><span className="font-normal">{semester}</span></p>}
                      {session && <p><span className="font-bold">Session: </span><span className="font-normal">{session}</span></p>}
                      {formattedDate && <p className="pt-1"><span className="font-bold">Date of Submission: </span><span className="font-normal">{formattedDate}</span></p>}
                    </div>
                  );

                  const studentBlock = (
                    <div>
                      <p className="text-[15px] font-bold text-slate-900 mb-0.5">Submitted By:</p>
                      <p className="text-[16.5px] font-bold text-slate-950 leading-snug mb-1">{student || 'Joy Debnath'}</p>
                      {studentDetails}
                    </div>
                  );

                  // 1. VERTICAL STACKED (CENTERED)
                  if (layoutMode === 'stacked') {
                    return (
                      <div className="w-full space-y-6 pt-2 pb-2 text-center">
                        {teacherBlock}
                        {studentBlock}
                      </div>
                    );
                  }

                  // 2. MODERN BOXED CARDS
                  if (layoutMode === 'modern-cards') {
                    return (
                      <div className="w-full grid grid-cols-2 gap-4 pt-2 pb-2 text-left">
                        <div className="p-3.5 rounded-xl border border-slate-300/90 bg-slate-50/60 shadow-xs space-y-2">
                          <span className="inline-block text-[11px] font-black tracking-widest uppercase text-slate-800 border-b-2 border-slate-900 pb-0.5 mb-1">
                            Submitted To
                          </span>
                          <p className="text-[15.5px] font-bold text-slate-950 leading-snug">{teacher || 'Dr. Tutan Nama'}</p>
                          {(designation || !teacher) && <p className="text-[13px] italic text-slate-800">{designation || 'Associate Professor'}</p>}
                          {(department || !teacher) && <p className="text-[13px] text-slate-800">{teacherDeptText}</p>}
                          {(college || !teacher) && <p className="text-[12.5px] text-slate-700">{collegeLine}</p>}
                        </div>

                        <div className="p-3.5 rounded-xl border border-slate-300/90 bg-slate-50/60 shadow-xs space-y-2">
                          <span className="inline-block text-[11px] font-black tracking-widest uppercase text-slate-800 border-b-2 border-slate-900 pb-0.5 mb-1">
                            Submitted By
                          </span>
                          <p className="text-[16px] font-bold text-slate-950 leading-snug">{student || 'Joy Debnath'}</p>
                          {studentDetails}
                        </div>
                      </div>
                    );
                  }

                  // 3. LEFT ALIGNED MINIMALIST WITH VERTICAL ACCENT
                  if (layoutMode === 'left-aligned') {
                    return (
                      <div className="w-full pt-2 pb-2 text-left space-y-5 border-l-4 border-slate-900 pl-5 my-1">
                        <div>
                          <p className="text-[13.5px] font-black tracking-wider text-slate-700 uppercase mb-1">Submitted To</p>
                          <p className="text-[16.5px] font-bold text-slate-950">{teacher || 'Dr. Tutan Nama'}</p>
                          {(designation || !teacher) && <p className="text-[13.5px] italic text-slate-800">{designation || 'Associate Professor'}</p>}
                          {(department || !teacher) && <p className="text-[13.5px] text-slate-800">{teacherDeptText}</p>}
                          {(college || !teacher) && <p className="text-[13.5px] text-slate-800">{collegeLine}</p>}
                        </div>

                        <div className="pt-2 border-t border-slate-200">
                          <p className="text-[13.5px] font-black tracking-wider text-slate-700 uppercase mb-1">Submitted By</p>
                          <p className="text-[17px] font-bold text-slate-950">{student || 'Joy Debnath'}</p>
                          {studentDetails}
                        </div>
                      </div>
                    );
                  }

                  // 4. RIGHT SPLIT EDGE (ASYMMETRIC)
                  if (layoutMode === 'right-aligned') {
                    return (
                      <div className="w-full grid grid-cols-2 gap-6 pt-3 pb-2">
                        {/* Left Side: Submitted To */}
                        <div className="text-left space-y-1 pr-2">
                          <p className="text-[14px] font-extrabold uppercase tracking-wide text-slate-900">Submitted To:</p>
                          <p className="text-[16px] font-bold text-slate-950">{teacher || 'Dr. Tutan Nama'}</p>
                          {(designation || !teacher) && <p className="text-[13.5px] italic text-slate-800">{designation || 'Associate Professor'}</p>}
                          {(department || !teacher) && <p className="text-[13.5px] text-slate-800">{teacherDeptText}</p>}
                          {(college || !teacher) && <p className="text-[13px] text-slate-800">{collegeLine}</p>}
                        </div>

                        {/* Right Side: Submitted By (Flush Right) */}
                        <div className="text-right space-y-1 pl-2 border-r-2 border-slate-900 pr-3">
                          <p className="text-[14px] font-extrabold uppercase tracking-wide text-slate-900">Submitted By:</p>
                          <p className="text-[17px] font-bold text-slate-950">{student || 'Joy Debnath'}</p>
                          <div className="text-[13.5px] space-y-0.5 text-slate-900">
                            {studentId && <p><span className="font-bold">ID: </span><span>{studentId}</span></p>}
                            {roll && <p><span className="font-bold">Roll: </span><span>{roll}</span></p>}
                            {reg && <p><span className="font-bold">Reg: </span><span>{reg}</span></p>}
                            {studentDeptText && <p><span className="font-bold">Dept: </span><span>{studentDeptText}</span></p>}
                            {semester && <p><span className="font-bold">Semester: </span><span>{semester}</span></p>}
                            {session && <p><span className="font-bold">Session: </span><span>{session}</span></p>}
                            {formattedDate && <p className="pt-1"><span className="font-bold">Date: </span><span>{formattedDate}</span></p>}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // 5. STRUCTURED TABULAR MATRIX (GRID)
                  if (layoutMode === 'compact-grid') {
                    return (
                      <div className="w-full pt-2 pb-2 text-left">
                        <div className="border-2 border-slate-800 rounded-lg overflow-hidden bg-white shadow-2xs divide-y-2 divide-slate-800">
                          {/* Teacher Row */}
                          <div className="p-3 bg-slate-50/80">
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-600 mb-1">Submitted To</p>
                            <p className="text-[15.5px] font-bold text-slate-950">{teacher || 'Dr. Tutan Nama'}</p>
                            <p className="text-[12.5px] text-slate-800">{designation || 'Associate Professor'} • {teacherDeptText}</p>
                          </div>

                          {/* Student Row */}
                          <div className="p-3">
                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-600 mb-1">Submitted By</p>
                            <p className="text-[16px] font-bold text-slate-950 mb-1.5">{student || 'Joy Debnath'}</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12.5px] text-slate-900">
                              {studentId && <p><strong className="font-bold">Student ID:</strong> {studentId}</p>}
                              {roll && <p><strong className="font-bold">Roll:</strong> {roll}</p>}
                              {reg && <p><strong className="font-bold">Reg:</strong> {reg}</p>}
                              {studentDeptText && <p><strong className="font-bold">Dept:</strong> {studentDeptText}</p>}
                              {semester && <p><strong className="font-bold">Semester:</strong> {semester}</p>}
                              {session && <p><strong className="font-bold">Session:</strong> {session}</p>}
                              {formattedDate && <p className="col-span-2 pt-0.5"><strong className="font-bold">Date:</strong> {formattedDate}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // 6. DEFAULT / SIDE-BY-SIDE (SPLIT COLUMNS)
                  return (
                    <div className="w-full grid grid-cols-2 gap-6 pt-3 pb-2 text-left">
                      {/* Left Column: Submitted To */}
                      <div className="space-y-1.5 pr-2">
                        {teacherBlock}
                      </div>

                      {/* Right Column: Submitted By */}
                      <div className="space-y-1.5 pl-2 border-l border-slate-200">
                        {studentBlock}
                      </div>
                    </div>
                  );
                })()}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
CoverPreview.displayName = 'CoverPreview';
