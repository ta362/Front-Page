import React, { useRef, useState, useEffect } from 'react';
import { CoverPageFormData, SubmissionType, BorderStyle, ValidationErrors, LayoutMode } from '../types';
import {
  School,
  BookOpen,
  Code2,
  UserCheck,
  Briefcase,
  GraduationCap,
  Hash,
  FileCheck2,
  Calendar,
  Image as ImageIcon,
  Upload,
  Trash2,
  Sparkles,
  Sliders,
  CheckCircle2,
  Eye,
  Download,
  RotateCcw,
  Check,
  Building2,
  Users,
  ChevronDown,
  RefreshCw,
  Plus,
  Minus,
  X,
  Layers,
  Columns,
  Box,
  AlignLeft,
  AlignRight,
  Grid,
} from 'lucide-react';

const LAYOUT_OPTIONS: Array<{
  id: LayoutMode;
  label: string;
  shortDesc: string;
  desc: string;
  tag: string;
  icon: React.ElementType;
}> = [
  {
    id: 'side-by-side',
    label: 'Side-by-Side (Split)',
    shortDesc: '2 Column Left/Right',
    desc: 'Submitted To (Left) and Submitted By (Right) in two balanced columns',
    tag: 'Classic 2-Column',
    icon: Columns,
  },
  {
    id: 'stacked',
    label: 'Centered Stack',
    shortDesc: 'Vertical Centered',
    desc: 'Centered column layout with teacher stacked neatly above student details',
    tag: 'Centered Formal',
    icon: Layers,
  },
  {
    id: 'modern-cards',
    label: 'Boxed Cards',
    shortDesc: 'Framed Background Cards',
    desc: 'Teacher and student details enclosed in clean rounded framed cards',
    tag: 'Modern Framed',
    icon: Box,
  },
  {
    id: 'left-aligned',
    label: 'Left Minimalist',
    shortDesc: 'Left-aligned with Accent Line',
    desc: 'Entire info left-aligned with a dark vertical accent bar on the edge',
    tag: 'Linear Slate',
    icon: AlignLeft,
  },
  {
    id: 'right-aligned',
    label: 'Split Edge (Asymmetric)',
    shortDesc: 'Teacher Left / Student Right',
    desc: 'Teacher info on the left, student details flush to the right edge',
    tag: 'Editorial Asymmetric',
    icon: AlignRight,
  },
  {
    id: 'compact-grid',
    label: 'Structured Grid',
    shortDesc: 'Tabular Key-Value Matrix',
    desc: 'Structured key-value table grid with horizontal divider lines',
    tag: 'Academic Matrix',
    icon: Grid,
  },
];
import { DEFAULT_ACADEMIC_LOGO_SVG, TECH_INSTITUTE_LOGO_SVG, MEDICAL_INSTITUTE_LOGO_SVG, TCEA_LOGO_SVG } from '../utils/academicPresets';
import { DepartmentFacultyGroup } from '../data/facultyData';
import {
  getSavedFacultyGroups,
  saveFacultyGroups,
  getFacultyGroupFromList,
} from '../utils/facultyStore';
import {
  checkAndTriggerMonthlyTceaScan,
  getLastTceaWebsiteScanTime,
} from '../utils/tceaWebsiteScanner';
import {
  lookupTripuraCourseCode,
  lookupTripuraCourseVariants,
  searchTripuraCourses,
  TRIPURA_UNIVERSITY_COURSES,
  CourseMapping,
} from '../data/tripuraCourseDatabase';
import { SyllabusPdfImporter } from './SyllabusPdfImporter';

interface CoverFormProps {
  formData: CoverPageFormData;
  errors: ValidationErrors;
  onChange: (data: Partial<CoverPageFormData>) => void;
  onGeneratePreview: () => void;
  onDownloadJPG: () => void;
  onDownloadPNG?: () => void;
  onDownloadPDF?: () => void;
  onPrint?: () => void;
  onClearForm?: () => void;
  onOpenPresets?: () => void;
  isPreviewGenerated: boolean;
  isExporting: boolean;
}

export const CoverForm: React.FC<CoverFormProps> = ({
  formData,
  errors,
  onChange,
  onGeneratePreview,
  onDownloadJPG,
  onDownloadPNG,
  onDownloadPDF,
  onPrint,
  onClearForm,
  onOpenPresets,
  isPreviewGenerated,
  isExporting,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submissionTypeDropdownRef = useRef<HTMLDivElement>(null);
  const collegeDropdownRef = useRef<HTMLDivElement>(null);
  const courseDropdownRef = useRef<HTMLDivElement>(null);
  const departmentDropdownRef = useRef<HTMLDivElement>(null);
  const facultyDropdownRef = useRef<HTMLDivElement>(null);
  const semesterDropdownRef = useRef<HTMLDivElement>(null);
  const sessionDropdownRef = useRef<HTMLDivElement>(null);
  const studentDepartmentDropdownRef = useRef<HTMLDivElement>(null);
  const [isSubmissionTypeDropdownOpen, setIsSubmissionTypeDropdownOpen] = useState(false);
  const [isCollegeDropdownOpen, setIsCollegeDropdownOpen] = useState(false);
  const [isCourseSuggestionsOpen, setIsCourseSuggestionsOpen] = useState(false);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isFacultyDropdownOpen, setIsFacultyDropdownOpen] = useState(false);
  const [isSemesterDropdownOpen, setIsSemesterDropdownOpen] = useState(false);
  const [isSessionDropdownOpen, setIsSessionDropdownOpen] = useState(false);
  const [isStudentDepartmentDropdownOpen, setIsStudentDepartmentDropdownOpen] = useState(false);
  const [isSyllabusImporterOpen, setIsSyllabusImporterOpen] = useState(false);

  // Dynamic faculty directory state
  const [facultyGroups, setFacultyGroups] = useState<DepartmentFacultyGroup[]>(() => getSavedFacultyGroups());
  const [lastScanTime, setLastScanTime] = useState<string>(() => getLastTceaWebsiteScanTime());

  // Listen to external faculty updates
  useEffect(() => {
    const handleFacultyUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<DepartmentFacultyGroup[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setFacultyGroups(customEvent.detail);
        setLastScanTime(getLastTceaWebsiteScanTime());
      }
    };
    window.addEventListener('tcea_faculty_data_updated', handleFacultyUpdate);
    return () => {
      window.removeEventListener('tcea_faculty_data_updated', handleFacultyUpdate);
    };
  }, []);

  // Automatically scan & update faculty from Techno College Of Engineering Agartala website on the 1st and 2nd of every month
  useEffect(() => {
    checkAndTriggerMonthlyTceaScan()
      .then((updatedGroups) => {
        if (updatedGroups) {
          setFacultyGroups(updatedGroups);
          setLastScanTime(getLastTceaWebsiteScanTime());
        }
      })
      .catch((err) => {
        console.warn('Monthly TCEA scan check notice:', err);
      });
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submissionTypeDropdownRef.current &&
        !submissionTypeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSubmissionTypeDropdownOpen(false);
      }
      if (
        collegeDropdownRef.current &&
        !collegeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCollegeDropdownOpen(false);
      }
      if (
        courseDropdownRef.current &&
        !courseDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCourseSuggestionsOpen(false);
      }
      if (
        departmentDropdownRef.current &&
        !departmentDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDepartmentDropdownOpen(false);
      }
      if (
        facultyDropdownRef.current &&
        !facultyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFacultyDropdownOpen(false);
      }
      if (
        semesterDropdownRef.current &&
        !semesterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSemesterDropdownOpen(false);
      }
      if (
        sessionDropdownRef.current &&
        !sessionDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSessionDropdownOpen(false);
      }
      if (
        studentDepartmentDropdownRef.current &&
        !studentDepartmentDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStudentDepartmentDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({ logoUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const baseSubmissionTypes: { type: string; label: string }[] = [
    { type: 'Assignment', label: 'Assignment' },
    { type: 'Mini Project Report', label: 'Mini Project' },
    { type: 'Major Project Report', label: 'Major Project' },
    { type: 'Project Report', label: 'Project Report' },
    { type: 'Industrial Training Report', label: 'Industrial Training' },
    { type: 'Internship Report', label: 'Internship Report' },
    { type: 'Seminar Report', label: 'Seminar Report' },
    { type: 'Workshop Report', label: 'Workshop Report' },
    { type: 'Practical Notebook', label: 'Practical Notebook' },
    { type: 'Lab Copy', label: 'Lab Copy' },
    { type: 'Term Paper', label: 'Term Paper' },
    { type: 'Thesis / Dissertation', label: 'Thesis' },
    { type: 'Case Study', label: 'Case Study' },
    { type: 'Comprehensive Viva Voce', label: 'Viva Voce' },
    { type: 'Synopsis / Research Proposal', label: 'Synopsis' },
  ];

  return (
    <div className="liquid-panel p-5 sm:p-7 shadow-2xl space-y-6">
      
      {/* 1. Header */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-200/80">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 p-[1.5px] shadow-md shadow-purple-500/20 flex items-center justify-center shrink-0">
          <div className="w-full h-full bg-white/90 rounded-[14px] flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight">
            Cover Page Details
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Enter academic information below to generate your A4 cover page.
          </p>
        </div>
      </div>

      {/* SECTION 1: Submission Type & College Info */}
      <div className="liquid-card p-4 sm:p-5 space-y-4 relative z-50">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
            1
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-800">
            College & Course Information
          </h3>
        </div>

        <div className="space-y-3.5 pt-1">
          {/* Submission Type Field (Input Box + Right Dropdown Arrow + Stepper) */}
          <div ref={submissionTypeDropdownRef} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                Submission Type <span className="text-rose-500">*</span>
              </label>

              {/* Pure Minimal [- 1 +] Stepper */}
              {(() => {
                const match = (formData.submissionType || '').match(/\s+(\d+)$/);
                const currentNum = match ? parseInt(match[1], 10) : 0;
                const baseName = (formData.submissionType || 'Assignment').replace(/\s+\d+$/, '');

                const handleDecrement = () => {
                  if (currentNum <= 1) {
                    onChange({ submissionType: baseName });
                  } else {
                    onChange({ submissionType: `${baseName} ${currentNum - 1}` });
                  }
                };

                const handleIncrement = () => {
                  const nextNum = currentNum === 0 ? 1 : currentNum + 1;
                  onChange({ submissionType: `${baseName} ${nextNum}` });
                };

                return (
                  <div className="inline-flex items-center bg-white border border-slate-200/90 rounded-xl px-1.5 py-0.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={currentNum === 0}
                      className={`w-5 h-5 rounded flex items-center justify-center transition-all cursor-pointer ${
                        currentNum === 0
                          ? 'opacity-30 cursor-not-allowed text-slate-400'
                          : 'hover:bg-slate-100 text-slate-700 active:scale-95'
                      }`}
                      title="Decrease number"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <div className="min-w-[24px] text-center px-1 text-xs font-bold text-purple-950 select-none">
                      {currentNum > 0 ? currentNum : '—'}
                    </div>

                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100 text-slate-700 active:scale-95 transition-all cursor-pointer"
                      title="Increase number"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })()}
            </div>

            {/* Input Box with Dropdown Arrow Icon on the right */}
            <div className="relative">
              <input
                type="text"
                value={formData.submissionType}
                onChange={(e) => onChange({ submissionType: e.target.value })}
                onFocus={() => setIsSubmissionTypeDropdownOpen(true)}
                placeholder="e.g. Assignment 1, Lab Copy, Project Report..."
                className="w-full pl-4 pr-10 py-2.5 liquid-input text-slate-800 text-sm focus:outline-none transition-all"
              />

              <button
                type="button"
                onClick={() => setIsSubmissionTypeDropdownOpen(!isSubmissionTypeDropdownOpen)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                title="View options list"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSubmissionTypeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Options List */}
              {isSubmissionTypeDropdownOpen && (
                <div className="absolute z-30 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-60 overflow-y-auto divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1">
                  {baseSubmissionTypes.map((item) => {
                    const match = formData.submissionType?.match(/\d+$/);
                    const currentNum = match ? match[0] : '';
                    const fullValue = currentNum ? `${item.type} ${currentNum}` : item.type;
                    const isSelected = formData.submissionType === item.type || formData.submissionType?.startsWith(`${item.type} `);

                    return (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => {
                          onChange({ submissionType: fullValue });
                          setIsSubmissionTypeDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-purple-50 text-purple-900 font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span>{item.type}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-purple-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* College Name */}
          <div ref={collegeDropdownRef} className="relative">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              College / University Name <span className="text-rose-500">*</span>
            </label>

            <div className="relative">
              <input
                type="text"
                value={formData.college}
                onChange={(e) => onChange({ college: e.target.value })}
                onFocus={() => setIsCollegeDropdownOpen(true)}
                placeholder=""
                className={`w-full pl-4 pr-11 py-2.5 liquid-input text-slate-800 text-sm focus:outline-none transition-all ${
                  errors.college ? 'border-rose-400 ring-2 ring-rose-300' : ''
                }`}
              />
              {/* Arrow (ChevronDown) inside the box */}
              <button
                type="button"
                onClick={() => setIsCollegeDropdownOpen(!isCollegeDropdownOpen)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition-all cursor-pointer shadow-xs"
                title="Click to select Techno College Of Engineering Agartala"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCollegeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* College Dropdown Options Menu */}
            {isCollegeDropdownOpen && (
              <div className="absolute left-0 right-0 mt-1 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-purple-200 py-1.5 z-50 max-h-56 overflow-y-auto animate-in fade-in duration-100">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select College / University
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onChange({
                      college: 'Techno College Of Engineering Agartala',
                      logoUrl: TCEA_LOGO_SVG,
                    });
                    setIsCollegeDropdownOpen(false);
                  }}
                  className="w-full px-3.5 py-2.5 text-left text-xs font-bold text-purple-950 hover:bg-purple-50 flex items-center justify-between transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600 group-hover:scale-125 transition-transform shrink-0" />
                    <div>
                      <span className="block text-sm font-bold text-slate-900 group-hover:text-purple-900">
                        Techno College Of Engineering Agartala
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Official College (Agartala, Tripura) • Auto-selects TCEA Logo
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-extrabold shrink-0">
                    TCEA
                  </span>
                </button>
              </div>
            )}

            {errors.college && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.college}</p>}
          </div>

          {/* Course Title and Course Code (Auto-Fill Integration) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                Course Details & University Syllabus Code
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Course Title Field */}
              <div ref={courseDropdownRef} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Course Title <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200/60">
                    Tripura Univ Directory
                  </span>
                </div>

                <div className="relative">
                  <BookOpen className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => {
                      const newCourse = e.target.value;
                      const matchedCourse = lookupTripuraCourseCode(newCourse);
                      if (matchedCourse && newCourse.trim().toLowerCase() === matchedCourse.title.toLowerCase()) {
                        onChange({ course: newCourse, courseCode: matchedCourse.code });
                      } else {
                        onChange({ course: newCourse });
                      }
                      setIsCourseSuggestionsOpen(true);
                    }}
                    onFocus={() => setIsCourseSuggestionsOpen(true)}
                    placeholder=""
                    className={`w-full pl-10 pr-9 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all ${
                      errors.course ? 'border-rose-400 ring-2 ring-rose-300' : ''
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setIsCourseSuggestionsOpen(!isCourseSuggestionsOpen)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-purple-600 hover:bg-purple-50 rounded cursor-pointer"
                    title="Show Tripura University Course Directory"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCourseSuggestionsOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Tripura University Live Suggestions Dropdown */}
                {isCourseSuggestionsOpen && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-purple-200 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto divide-y divide-slate-100 animate-in fade-in duration-100">
                    <div className="px-3 py-1.5 bg-slate-50/90 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                      <span>Tripura University & TCEA Courses</span>
                      <span className="text-purple-600">Auto-Fills Paper Code</span>
                    </div>
                    {(() => {
                      const results = searchTripuraCourses(formData.course, formData.department, formData.semester);
                      if (results.length === 0) {
                        return (
                          <div className="px-4 py-3 text-xs text-slate-500 text-center font-medium">
                            No exact syllabus match for &quot;{formData.course}&quot;. You can keep your custom title.
                          </div>
                        );
                      }
                      return results.map((courseItem, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            onChange({
                              course: courseItem.title,
                              courseCode: courseItem.code,
                            });
                            setIsCourseSuggestionsOpen(false);
                          }}
                          className="w-full px-3.5 py-2 text-left hover:bg-purple-50/90 flex items-center justify-between transition-colors cursor-pointer group"
                        >
                          <div className="min-w-0 pr-2">
                            <span className="block text-xs font-bold text-slate-800 group-hover:text-purple-900 truncate">
                              {courseItem.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {courseItem.semester ? `Sem ${courseItem.semester} • ` : ''}Dept: {courseItem.department || 'General'} • {courseItem.scheme || courseItem.degree || 'B.Tech'}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-lg bg-purple-100 text-purple-900 text-[11px] font-extrabold shrink-0 border border-purple-200/80">
                            {courseItem.code}
                          </span>
                        </button>
                      ));
                    })()}
                  </div>
                )}



                {errors.course && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.course}</p>}
              </div>

              {/* Course Code Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Paper / Course Code <span className="text-rose-500">*</span>
                  </label>
                  {(() => {
                    const match = lookupTripuraCourseCode(formData.course);
                    if (match && match.code === formData.courseCode) {
                      return (
                        <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-teal-600 animate-pulse" /> Auto-filled
                        </span>
                      );
                    }
                    return null;
                  })()}
                </div>

                <div className="relative">
                  <Code2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.courseCode}
                    onChange={(e) => onChange({ courseCode: e.target.value })}
                    placeholder=""
                    className={`w-full pl-10 pr-3 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all ${
                      errors.courseCode ? 'border-rose-400 ring-2 ring-rose-300' : ''
                    }`}
                  />
                </div>

                {errors.courseCode && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.courseCode}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Logo & Academic Emblem */}
      <div className="liquid-card p-4 sm:p-5 space-y-4 relative z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
              2
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              College Logo / Emblem
            </h3>
          </div>
          {formData.logoUrl && (
            <span className="text-xs font-bold text-teal-700 flex items-center gap-1 bg-teal-500/15 px-3 py-1 rounded-full border border-teal-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Logo Attached
            </span>
          )}
        </div>

        <div className="bg-white/60 backdrop-blur-md border border-white/90 rounded-2xl p-4 space-y-3 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {formData.logoUrl ? (
              <div className="relative group shrink-0 self-center sm:self-auto">
                <div className="w-20 h-20 bg-white rounded-2xl p-2 border border-slate-200/90 flex items-center justify-center shadow-md overflow-hidden">
                  <img
                    src={formData.logoUrl}
                    alt="Logo Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ logoUrl: '' })}
                  className="absolute -top-2 -right-2 p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg transition-colors cursor-pointer"
                  title="Remove logo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="w-20 h-20 bg-white/70 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 shrink-0 self-center sm:self-auto">
                <ImageIcon className="w-7 h-7 text-slate-400" />
                <span className="text-[10px] mt-1 font-semibold text-slate-500">No Logo</span>
              </div>
            )}

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 liquid-pill-cyan text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Custom Logo
                </button>
              </div>

              {/* Sample Emblem Quick Pick */}
              <div className="pt-2">
                <div className="text-[11px] text-slate-500 mb-1.5 font-bold">
                  Quick select emblem:
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onChange({ logoUrl: TCEA_LOGO_SVG, logoSize: 155 })}
                    className="px-3 py-1.5 text-xs bg-red-500/15 hover:bg-red-500/25 text-red-700 font-bold rounded-full border border-red-500/30 cursor-pointer shadow-sm transition-all"
                  >
                    ★ TCEA Red Emblem
                  </button>
                </div>
              </div>
            </div>
          </div>

          {formData.logoUrl && (
            <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-slate-700">
                Adjust Logo Size: <span className="text-indigo-600">{formData.logoSize || 155}px</span>
              </label>
              <input
                type="range"
                min={90}
                max={200}
                step={5}
                value={formData.logoSize || 155}
                onChange={(e) => onChange({ logoSize: Number(e.target.value) })}
                className="w-full sm:w-56 accent-indigo-600 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: Faculty Details (Submitted To) */}
      {(() => {
        const activeFacultyGroup = getFacultyGroupFromList(facultyGroups, formData.department);

        return (
          <div className="liquid-card p-4 sm:p-5 space-y-4 relative z-30">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                  3
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-800">
                  Faculty Details (Submitted To)
                </h3>
              </div>

              {/* Compact subtle last scan date indicator with live pulsing green dot */}
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50/80 border border-emerald-200/70 text-[11px] text-emerald-900 select-none shadow-2xs"
                title="Techno College of Engineering Agartala (tiaedu.org) faculty directory automatically scans on the 1st & 2nd of each month"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-500 font-medium">Last scan:</span>
                <span className="font-bold text-slate-800">{lastScanTime}</span>
              </div>
            </div>

            <div className="space-y-3.5">
              {/* 1. Department Field with Arrow Dropdown & Full Names */}
              <div ref={departmentDropdownRef} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Department
                  </label>
                  <span className="text-[11px] text-purple-700 font-semibold">
                    {activeFacultyGroup ? `${activeFacultyGroup.shortCode} • Full Name` : 'Select Full Department Name'}
                  </span>
                </div>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => onChange({ department: e.target.value })}
                    onFocus={() => setIsDepartmentDropdownOpen(true)}
                    placeholder="Select or type full department name..."
                    className="w-full pl-10 pr-10 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all"
                  />
                  {/* Arrow (ChevronDown) button for Department */}
                  <button
                    type="button"
                    onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition-all cursor-pointer shadow-xs"
                    title="Click to view all departments with full names"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDepartmentDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Department Dropdown List with Full Names */}
                {isDepartmentDropdownOpen && (
                  <div className="absolute left-0 w-full sm:w-[520px] max-w-[92vw] mt-1.5 bg-white rounded-xl shadow-2xl border-2 border-purple-400/80 py-1 z-[120] max-h-72 overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                    <div className="sticky top-0 bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50 px-3.5 py-2.5 text-xs font-extrabold text-purple-950 flex items-center justify-between border-b border-purple-200 z-10 shadow-2xs">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-purple-700 shrink-0" />
                        Departments (Select Full Name)
                      </span>
                      <span className="text-[10.5px] text-purple-800 font-bold bg-white/90 px-2.5 py-0.5 rounded-full border border-purple-200 shadow-2xs">
                        {facultyGroups.length} Departments Available
                      </span>
                    </div>
                    {facultyGroups.map((dept) => {
                      const isSelected =
                        activeFacultyGroup?.shortCode === dept.shortCode ||
                        formData.department.trim().toLowerCase() === dept.departmentName.toLowerCase();

                      return (
                        <button
                          key={dept.shortCode}
                          type="button"
                          onClick={() => {
                            onChange({ department: dept.departmentName });
                            setIsDepartmentDropdownOpen(false);
                          }}
                          className={`w-full px-3.5 py-2.5 text-left text-xs transition-all flex items-center justify-between cursor-pointer hover:bg-purple-50/90 group ${
                            isSelected ? 'bg-purple-100/90 font-bold text-purple-950' : 'text-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`w-9 h-6 rounded-md text-[11px] font-extrabold flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? 'bg-purple-600 text-white shadow-xs'
                                  : 'bg-purple-100 text-purple-800 group-hover:bg-purple-600 group-hover:text-white'
                              }`}
                            >
                              {dept.shortCode}
                            </span>
                            <div className="truncate">
                              <span className="font-bold text-slate-900 group-hover:text-purple-900 block truncate">
                                {dept.departmentName}
                              </span>
                              <span className="text-[11px] text-purple-700 font-medium block truncate">
                                {dept.faculties.length} Faculty Members
                              </span>
                            </div>
                          </div>
                          {isSelected ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-purple-700 shrink-0 ml-2">
                              <Check className="w-4 h-4 text-purple-700" />
                              Selected
                            </span>
                          ) : (
                            <span className="text-[10px] text-purple-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2 bg-white px-2 py-0.5 rounded-md border border-purple-200">
                              Select
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. Teacher Name & Designation Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div ref={facultyDropdownRef} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Faculty / Teacher Name <span className="text-rose-500">*</span>
                    </label>
                    {activeFacultyGroup ? (
                      <span className="text-[11px] text-purple-700 font-semibold flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {activeFacultyGroup.shortCode} Teachers: {activeFacultyGroup.faculties.length} available
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">
                        (Type Department above to load list)
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <UserCheck className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.teacher}
                      onChange={(e) => {
                        const newTeacher = e.target.value;
                        const match = activeFacultyGroup?.faculties.find(
                          (f) => f.name.toLowerCase() === newTeacher.trim().toLowerCase()
                        );
                        onChange({
                          teacher: newTeacher,
                          ...(match ? { designation: match.designation } : {}),
                        });
                      }}
                      onFocus={() => {
                        if (activeFacultyGroup) {
                          setIsFacultyDropdownOpen(true);
                        }
                      }}
                      placeholder={activeFacultyGroup ? `Select or type ${activeFacultyGroup.shortCode} teacher...` : 'Select or type teacher...'}
                      className={`w-full pl-10 pr-10 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all ${
                        errors.teacher ? 'border-rose-400 ring-2 ring-rose-300' : ''
                      }`}
                    />

                    {/* Arrow Symbol inside the Faculty / Teacher Name input */}
                    {activeFacultyGroup ? (
                      <button
                        type="button"
                        onClick={() => setIsFacultyDropdownOpen(!isFacultyDropdownOpen)}
                        className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition-all cursor-pointer shadow-xs"
                        title={`Click to view all ${activeFacultyGroup.faculties.length} teachers in ${activeFacultyGroup.shortCode}`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isFacultyDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      <div
                        className="absolute right-2 top-2 p-1.5 text-slate-300 pointer-events-none"
                        title="Enter Department first to view teacher list"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Serial-wise Faculty Dropdown list */}
                  {activeFacultyGroup && isFacultyDropdownOpen && (
                    <div className="absolute left-0 w-full sm:w-[520px] max-w-[92vw] mt-1.5 bg-white rounded-xl shadow-2xl border-2 border-purple-400/80 py-1 z-[100] max-h-80 overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                      <div className="sticky top-0 bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50 px-3.5 py-2.5 text-xs font-extrabold text-purple-950 flex items-center justify-between border-b border-purple-200 z-10 shadow-2xs">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-purple-700 shrink-0" />
                          {activeFacultyGroup.shortCode} Faculty Details ({activeFacultyGroup.faculties.length} Serial-wise)
                        </span>
                        <span className="text-[10.5px] text-purple-800 font-bold bg-white/90 px-2.5 py-0.5 rounded-full border border-purple-200 shadow-2xs">
                          Click name to fill
                        </span>
                      </div>
                      {activeFacultyGroup.faculties.map((fac, idx) => {
                        const isSelected = (formData.teacher || '').trim().toLowerCase() === fac.name.trim().toLowerCase();

                        return (
                          <button
                            key={`${fac.name}-${fac.designation}-${idx}`}
                            type="button"
                            onClick={() => {
                              onChange({
                                teacher: fac.name,
                                designation: fac.designation,
                              });
                              setIsFacultyDropdownOpen(false);
                            }}
                            className={`w-full px-3.5 py-2.5 text-left text-xs transition-all flex items-center justify-between cursor-pointer hover:bg-purple-50/90 group ${
                              isSelected ? 'bg-purple-100/90 font-bold text-purple-950' : 'text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`w-5 h-5 rounded-full text-[10.5px] font-extrabold flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? 'bg-purple-600 text-white shadow-xs' : 'bg-purple-100 text-purple-800 group-hover:bg-purple-600 group-hover:text-white'
                              }`}>
                                {idx + 1}
                              </span>
                              <div className="truncate">
                                <span className="font-bold text-slate-900 group-hover:text-purple-900 block truncate">
                                  {fac.name}
                                </span>
                                <span className="text-[11px] text-purple-700 font-medium block truncate">
                                  {fac.designation} {fac.qualification ? `• ${fac.qualification}` : ''}
                                </span>
                              </div>
                            </div>
                            {isSelected ? (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-purple-700 shrink-0 ml-2">
                                <Check className="w-4 h-4 text-purple-700" />
                                Selected
                              </span>
                            ) : (
                              <span className="text-[10px] text-purple-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2 bg-white px-2 py-0.5 rounded-md border border-purple-200">
                                Select
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {errors.teacher && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.teacher}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => onChange({ designation: e.target.value })}
                      placeholder=""
                      className="w-full pl-10 pr-3 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* SECTION 4: Student Details (Submitted By) */}
      <div className="liquid-card p-4 sm:p-5 space-y-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
            4
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-800">
            Student Details (Submitted By)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Student Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.student}
              onChange={(e) => onChange({ student: e.target.value })}
              placeholder=""
              className={`w-full px-4 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all font-bold ${
                errors.student ? 'border-rose-400 ring-2 ring-rose-300' : ''
              }`}
            />
            {errors.student && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.student}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Student ID <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.studentId}
              onChange={(e) => onChange({ studentId: e.target.value })}
              placeholder=""
              className={`w-full px-4 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all font-semibold ${
                errors.studentId ? 'border-rose-400 ring-2 ring-rose-300' : ''
              }`}
            />
            {errors.studentId && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.studentId}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Roll No.
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={formData.roll}
                onChange={(e) => onChange({ roll: e.target.value })}
                placeholder=""
                className="w-full pl-10 pr-3 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Registration No.
            </label>
            <div className="relative">
              <FileCheck2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={formData.reg}
                onChange={(e) => onChange({ reg: e.target.value })}
                placeholder=""
                className="w-full pl-10 pr-3 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Student Department Field with Dropdown */}
          <div ref={studentDepartmentDropdownRef} className="sm:col-span-2 relative">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Student Department / Discipline
              </label>
              {formData.department && (
                <button
                  type="button"
                  onClick={() => onChange({ studentDepartment: formData.department })}
                  className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-2 py-0.5 rounded-md border border-purple-200 transition-all cursor-pointer"
                  title="Copy department from Teacher Details above"
                >
                  Same as Teacher&apos;s Dept
                </button>
              )}
            </div>

            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={formData.studentDepartment ?? ''}
                onChange={(e) => onChange({ studentDepartment: e.target.value })}
                onFocus={() => setIsStudentDepartmentDropdownOpen(true)}
                placeholder={formData.department ? `e.g. ${formData.department}` : "Select or type student department..."}
                className="w-full pl-10 pr-10 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all font-semibold"
              />
              <button
                type="button"
                onClick={() => setIsStudentDepartmentDropdownOpen(!isStudentDepartmentDropdownOpen)}
                className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition-all cursor-pointer shadow-xs"
                title="Select Student Department"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isStudentDepartmentDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Student Department Dropdown Menu */}
            {isStudentDepartmentDropdownOpen && (
              <div className="absolute left-0 w-full sm:w-[520px] max-w-[92vw] mt-1.5 bg-white rounded-xl shadow-2xl border-2 border-purple-400/80 py-1 z-[120] max-h-72 overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                <div className="sticky top-0 bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50 px-3.5 py-2.5 text-xs font-extrabold text-purple-950 flex items-center justify-between border-b border-purple-200 z-10 shadow-2xs">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-purple-700 shrink-0" />
                    Student Departments
                  </span>
                  <span className="text-[10.5px] text-purple-800 font-bold bg-white/90 px-2.5 py-0.5 rounded-full border border-purple-200 shadow-2xs">
                    {facultyGroups.length} Departments Available
                  </span>
                </div>

                {facultyGroups.map((dept) => {
                  const currentVal = formData.studentDepartment ?? '';
                  const isSelected = currentVal.trim().toLowerCase() === dept.departmentName.toLowerCase();

                  return (
                    <button
                      key={`student-dept-${dept.shortCode}`}
                      type="button"
                      onClick={() => {
                        onChange({ studentDepartment: dept.departmentName });
                        setIsStudentDepartmentDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 text-left text-xs transition-all flex items-center justify-between cursor-pointer hover:bg-purple-50/90 group ${
                        isSelected ? 'bg-purple-100/90 font-bold text-purple-950' : 'text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-9 h-6 rounded-md text-[11px] font-extrabold flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-purple-600 text-white shadow-xs'
                              : 'bg-purple-100 text-purple-800 group-hover:bg-purple-600 group-hover:text-white'
                          }`}
                        >
                          {dept.shortCode}
                        </span>
                        <div className="truncate">
                          <span className="font-bold text-slate-900 group-hover:text-purple-900 block truncate">
                            {dept.departmentName}
                          </span>
                        </div>
                      </div>
                      {isSelected ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-purple-700 shrink-0 ml-2">
                          <Check className="w-4 h-4 text-purple-700" />
                          Selected
                        </span>
                      ) : (
                        <span className="text-[10px] text-purple-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2 bg-white px-2 py-0.5 rounded-md border border-purple-200">
                          Select
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Semester Field with Dropdown + Quick Chips for B.Tech 1-8 */}
          <div ref={semesterDropdownRef} className="relative">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Program Level & Semester
              </label>
              <span className="text-[11px] text-purple-700 font-semibold">
                B.Tech 1st to 8th Sem
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={formData.semester}
                onChange={(e) => onChange({ semester: e.target.value })}
                onFocus={() => setIsSemesterDropdownOpen(true)}
                placeholder="Select or type semester (e.g. B.Tech. 6th Sem)..."
                className="w-full pl-4 pr-10 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all font-semibold"
              />
              <button
                type="button"
                onClick={() => setIsSemesterDropdownOpen(!isSemesterDropdownOpen)}
                className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition-all cursor-pointer shadow-xs"
                title="Select B.Tech 1st to 8th Semester"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isSemesterDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Semester Dropdown Menu */}
            {isSemesterDropdownOpen && (
              <div className="absolute left-0 w-full mt-1.5 bg-white rounded-xl shadow-2xl border-2 border-purple-400/80 py-1 z-[110] max-h-64 overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                <div className="sticky top-0 bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50 px-3.5 py-2 text-xs font-extrabold text-purple-950 flex items-center justify-between border-b border-purple-200 z-10 shadow-2xs">
                  <span>B.Tech & Academic Semesters</span>
                  <span className="text-[10.5px] text-purple-800 bg-white px-2 py-0.5 rounded-full border border-purple-200 font-bold">
                    Click to select
                  </span>
                </div>
                
                {/* B.Tech 1-8 Semesters Group */}
                <div className="p-1">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-purple-600 uppercase tracking-wider">
                    B.Tech Semesters (1st - 8th)
                  </div>
                  {[
                    'B.Tech. 1st Sem',
                    'B.Tech. 2nd Sem',
                    'B.Tech. 3rd Sem',
                    'B.Tech. 4th Sem',
                    'B.Tech. 5th Sem',
                    'B.Tech. 6th Sem',
                    'B.Tech. 7th Sem',
                    'B.Tech. 8th Sem',
                  ].map((sem) => {
                    const isSelected = (formData.semester || '').trim().toLowerCase() === sem.toLowerCase();
                    return (
                      <button
                        key={sem}
                        type="button"
                        onClick={() => {
                          onChange({ semester: sem });
                          setIsSemesterDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs transition-all rounded-lg flex items-center justify-between cursor-pointer hover:bg-purple-50/90 ${
                          isSelected ? 'bg-purple-100 font-bold text-purple-950' : 'text-slate-800'
                        }`}
                      >
                        <span>{sem}</span>
                        {isSelected && <Check className="w-4 h-4 text-purple-700" />}
                      </button>
                    );
                  })}
                </div>

                {/* Additional Degrees Group */}
                <div className="p-1">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                    Other Programs (M.Tech & Diploma)
                  </div>
                  {[
                    'M.Tech. 1st Sem',
                    'M.Tech. 2nd Sem',
                    'M.Tech. 3rd Sem',
                    'M.Tech. 4th Sem',
                    'Diploma 1st Sem',
                    'Diploma 2nd Sem',
                    'Diploma 3rd Sem',
                    'Diploma 4th Sem',
                    'Diploma 5th Sem',
                    'Diploma 6th Sem',
                  ].map((sem) => {
                    const isSelected = (formData.semester || '').trim().toLowerCase() === sem.toLowerCase();
                    return (
                      <button
                        key={sem}
                        type="button"
                        onClick={() => {
                          onChange({ semester: sem });
                          setIsSemesterDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs transition-all rounded-lg flex items-center justify-between cursor-pointer hover:bg-purple-50/90 ${
                          isSelected ? 'bg-purple-100 font-bold text-purple-950' : 'text-slate-800'
                        }`}
                      >
                        <span>{sem}</span>
                        {isSelected && <Check className="w-4 h-4 text-purple-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Session Field with Interactive Year-by-Year Dropdown (2020-21 to 2050-51) */}
          <div ref={sessionDropdownRef} className="relative">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Session
              </label>
              <span className="text-[11px] text-indigo-700 font-semibold">
                2020-21 to 2050-51
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={formData.session}
                onChange={(e) => onChange({ session: e.target.value })}
                onFocus={() => setIsSessionDropdownOpen(true)}
                placeholder="Select or type session (e.g. 2025-26)..."
                className="w-full pl-4 pr-10 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all font-semibold"
              />
              <button
                type="button"
                onClick={() => setIsSessionDropdownOpen(!isSessionDropdownOpen)}
                className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer shadow-xs"
                title="Select Academic Session (2020-21 to 2050-51)"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isSessionDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Session Dropdown Menu */}
            {isSessionDropdownOpen && (
              <div className="absolute left-0 w-full mt-1.5 bg-white rounded-xl shadow-2xl border-2 border-indigo-400/80 py-1 z-[110] max-h-64 overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                <div className="sticky top-0 bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-50 px-3.5 py-2 text-xs font-extrabold text-indigo-950 flex items-center justify-between border-b border-indigo-200 z-10 shadow-2xs">
                  <span>Academic Sessions</span>
                  <span className="text-[10.5px] text-indigo-800 bg-white px-2 py-0.5 rounded-full border border-indigo-200 font-bold">
                    2020-21 – 2050-51
                  </span>
                </div>

                <div className="p-1">
                  {Array.from({ length: 31 }, (_, i) => {
                    const startYear = 2020 + i;
                    const endYearShort = String(startYear + 1).slice(-2);
                    const sessionVal = `${startYear}-${endYearShort}`;
                    const isSelected = (formData.session || '').trim() === sessionVal;

                    return (
                      <button
                        key={sessionVal}
                        type="button"
                        onClick={() => {
                          onChange({ session: sessionVal });
                          setIsSessionDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs transition-all rounded-lg flex items-center justify-between cursor-pointer hover:bg-indigo-50/90 ${
                          isSelected ? 'bg-indigo-100 font-bold text-indigo-950' : 'text-slate-800'
                        }`}
                      >
                        <span className="font-semibold">{sessionVal}</span>
                        {isSelected && <Check className="w-4 h-4 text-indigo-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Date of Submission
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => onChange({ date: e.target.value })}
                className="w-full pl-10 pr-3 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: Information Layout & Text Style */}
      <div className="liquid-card p-4 sm:p-5 space-y-3 relative z-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
              5
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              Information Layout & Text Style
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full font-extrabold bg-indigo-100 text-indigo-900 border border-indigo-200/80 self-start sm:self-auto">
            {LAYOUT_OPTIONS.find((l) => l.id === (formData.layoutMode || 'side-by-side'))?.label || 'Side-by-Side'}
          </span>
        </div>

        {/* Dropdown Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Select Layout Style
          </label>
          <div className="relative">
            <select
              value={formData.layoutMode || 'side-by-side'}
              onChange={(e) => onChange({ layoutMode: e.target.value as LayoutMode })}
              className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm appearance-none cursor-pointer"
            >
              {LAYOUT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label} — {opt.shortDesc}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-500 pointer-events-none" />
          </div>
          <p className="text-[11.5px] text-slate-500 pt-0.5">
            {LAYOUT_OPTIONS.find((l) => l.id === (formData.layoutMode || 'side-by-side'))?.desc}
          </p>
        </div>
      </div>

      {/* SECTION 6: Border & Framing Style */}
      <div className="liquid-card p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
            6
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-800">
            Border & Framing Style
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'none', label: 'No Border (Clean)', desc: 'Remove side borders' },
            { id: 'classic-double', label: 'Classic Double', desc: 'Double lines' },
            { id: 'simple-single', label: 'Single Line', desc: 'Clean border' },
            { id: 'ornate-corners', label: 'Ornate Corners', desc: 'Accent corners' },
            { id: 'minimal', label: 'Minimal', desc: 'Frameless' },
          ].map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => onChange({ borderStyle: style.id as BorderStyle })}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-center ${
                formData.borderStyle === style.id || (!formData.borderStyle && style.id === 'none')
                  ? 'bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border-indigo-500/60 font-bold text-indigo-900 shadow-sm'
                  : 'bg-white/60 hover:bg-white/90 text-slate-600 border-white/80 shadow-sm'
              }`}
            >
              <span className="text-xs">{style.label}</span>
              <span className="text-[10px] text-slate-400 mt-0.5">{style.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS: Glossy Liquid Glass Action Bar */}
      <div className="pt-3 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* 1. Update Preview Button (Liquid Purple Pill) */}
          <button
            type="button"
            id="btn-generate-preview"
            onClick={onGeneratePreview}
            className="w-full py-3.5 px-6 liquid-pill-purple font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Eye className="w-5 h-5" />
            <span>Update Preview</span>
          </button>

          {/* 2. Download JPG Button (Liquid Cyan / Blue Pill) */}
          <button
            type="button"
            id="btn-download-jpg"
            onClick={onDownloadJPG}
            disabled={isExporting}
            className={`w-full py-3.5 px-6 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
              isPreviewGenerated
                ? 'liquid-pill-cyan'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed rounded-full opacity-70'
            }`}
          >
            <Download className="w-5 h-5" />
            <span>{isExporting ? 'Generating...' : 'Download JPG (300 DPI)'}</span>
          </button>
        </div>
      </div>

      {/* Syllabus PDF / Text Importer Modal */}
      <SyllabusPdfImporter
        isOpen={isSyllabusImporterOpen}
        onClose={() => setIsSyllabusImporterOpen(false)}
        department={formData.department}
        semester={formData.semester}
        onImportComplete={(courses) => {
          if (courses && courses.length > 0) {
            onChange({
              course: courses[0].title,
              courseCode: courses[0].code,
            });
          }
        }}
      />

    </div>
  );
};
