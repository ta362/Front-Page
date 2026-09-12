import React, { useRef, useState, useEffect } from 'react';
import { CoverPageFormData, SubmissionType, BorderStyle, ValidationErrors } from '../types';
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
  RefreshCw
} from 'lucide-react';
import { DEFAULT_ACADEMIC_LOGO_SVG, TECH_INSTITUTE_LOGO_SVG, MEDICAL_INSTITUTE_LOGO_SVG, TCEA_LOGO_SVG } from '../utils/academicPresets';
import { DepartmentFacultyGroup } from '../data/facultyData';
import {
  getSavedFacultyGroups,
  saveFacultyGroups,
  getSyncUrl,
  isAutoSyncEnabled,
  syncFacultyFromRemote,
  getFacultyGroupFromList,
} from '../utils/facultyStore';
import { FacultyManagerModal } from './FacultyManagerModal';

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
  const departmentDropdownRef = useRef<HTMLDivElement>(null);
  const facultyDropdownRef = useRef<HTMLDivElement>(null);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isFacultyDropdownOpen, setIsFacultyDropdownOpen] = useState(false);

  // Dynamic faculty directory state
  const [facultyGroups, setFacultyGroups] = useState<DepartmentFacultyGroup[]>(() => getSavedFacultyGroups());
  const [isFacultyManagerOpen, setIsFacultyManagerOpen] = useState(false);

  // Listen to external faculty updates
  useEffect(() => {
    const handleFacultyUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<DepartmentFacultyGroup[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setFacultyGroups(customEvent.detail);
      }
    };
    window.addEventListener('tcea_faculty_data_updated', handleFacultyUpdate);
    return () => {
      window.removeEventListener('tcea_faculty_data_updated', handleFacultyUpdate);
    };
  }, []);

  // Background auto-sync if configured on startup
  useEffect(() => {
    const syncUrl = getSyncUrl();
    if (syncUrl && isAutoSyncEnabled()) {
      syncFacultyFromRemote(syncUrl, getSavedFacultyGroups())
        .then((res) => {
          if (res.success && res.groups) {
            setFacultyGroups(res.groups);
          }
        })
        .catch((err) => {
          console.warn('Initial background faculty sync notice:', err.message);
        });
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  const submissionTypes: { type: SubmissionType; label: string; desc: string }[] = [
    { type: 'Assignment', label: 'Assignment', desc: 'Course Work' },
    { type: 'Lab Copy', label: 'Lab Copy', desc: 'Laboratory' },
    { type: 'Project Report', label: 'Project Report', desc: 'Major / Minor' },
    { type: 'Thesis / Dissertation', label: 'Thesis', desc: 'Research' },
    { type: 'Term Paper', label: 'Term Paper', desc: 'Semester Paper' },
    { type: 'Practical Notebook', label: 'Practical Notebook', desc: 'Lab Practical' },
    { type: 'Case Study', label: 'Case Study', desc: 'Analysis' },
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
      <div className="liquid-card p-4 sm:p-5 space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
            1
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-800">
            College & Course Information
          </h3>
        </div>

        <div className="space-y-3.5 pt-1">
          {/* Submission Type Buttons (Liquid Glass Capsules) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Submission Type <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {submissionTypes.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => onChange({ submissionType: item.type })}
                  className={`px-3 py-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-center ${
                    formData.submissionType === item.type
                      ? 'liquid-pill-purple shadow-md font-bold'
                      : 'bg-white/60 hover:bg-white/90 text-slate-700 border-white/80 shadow-sm'
                  }`}
                >
                  <span className="text-xs leading-tight">{item.label}</span>
                  <span className={`text-[10px] mt-0.5 ${formData.submissionType === item.type ? 'text-purple-100' : 'text-slate-400'}`}>
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* College Name */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                College / University Name <span className="text-rose-500">*</span>
              </label>
            </div>
            <textarea
              rows={2}
              value={formData.college}
              onChange={(e) => onChange({ college: e.target.value })}
              placeholder=""
              className={`w-full px-4 py-2.5 liquid-input text-slate-800 text-sm focus:outline-none transition-all resize-none ${
                errors.college ? 'border-rose-400 ring-2 ring-rose-300' : ''
              }`}
            />
            {errors.college && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.college}</p>}
          </div>

          {/* Course Title and Course Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Course Title <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => onChange({ course: e.target.value })}
                  placeholder=""
                  className={`w-full pl-10 pr-3 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all ${
                    errors.course ? 'border-rose-400 ring-2 ring-rose-300' : ''
                  }`}
                />
              </div>
              {errors.course && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.course}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Course Code <span className="text-rose-500">*</span>
              </label>
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

      {/* SECTION 2: Logo & Academic Emblem */}
      <div className="liquid-card p-4 sm:p-5 space-y-4">
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
                  <button
                    type="button"
                    onClick={() => onChange({ logoUrl: TECH_INSTITUTE_LOGO_SVG, logoSize: 140 })}
                    className="px-3 py-1.5 text-xs bg-sky-500/15 hover:bg-sky-500/25 text-sky-700 font-bold rounded-full border border-sky-500/30 cursor-pointer shadow-sm transition-all"
                  >
                    Engineering Crest
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ logoUrl: DEFAULT_ACADEMIC_LOGO_SVG, logoSize: 140 })}
                    className="px-3 py-1.5 text-xs bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-700 font-bold rounded-full border border-indigo-500/30 cursor-pointer shadow-sm transition-all"
                  >
                    Classic Shield
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

              {/* Auto-Update & Manage Faculty Button */}
              <button
                type="button"
                onClick={() => setIsFacultyManagerOpen(true)}
                className="text-[11px] font-bold text-purple-800 hover:text-purple-950 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-200/80 px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs group"
                title="Manage Faculty Directory & Online Auto-Sync"
              >
                <RefreshCw className="w-3.5 h-3.5 text-purple-600 group-hover:rotate-180 transition-transform duration-500" />
                <span>Auto-Update / Manage</span>
                {getSyncUrl() ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Cloud / Online Sync Active" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                )}
              </button>
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
                            key={fac.name}
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

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Semester
            </label>
            <input
              type="text"
              value={formData.semester}
              onChange={(e) => onChange({ semester: e.target.value })}
              placeholder=""
              className="w-full px-4 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Session
            </label>
            <input
              type="text"
              value={formData.session}
              onChange={(e) => onChange({ session: e.target.value })}
              placeholder=""
              className="w-full px-4 py-2 liquid-input text-slate-800 text-sm focus:outline-none transition-all"
            />
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

      {/* SECTION 5: Information Layout (Side-by-Side vs Stacked) */}
      <div className="liquid-card p-4 sm:p-5 space-y-3.5 relative z-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
              5
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              Information Layout
            </h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-700">
            {formData.layoutMode === 'stacked' ? 'Centered Stack' : 'Side-by-Side'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onChange({ layoutMode: 'stacked' })}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-center ${
              formData.layoutMode === 'stacked'
                ? 'bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border-indigo-500/60 font-bold text-indigo-900 shadow-sm ring-2 ring-indigo-500/20'
                : 'bg-white/60 hover:bg-white/90 text-slate-600 border-white/80 shadow-sm'
            }`}
          >
            <span className="text-xs sm:text-sm font-extrabold flex items-center justify-between">
              <span>Vertical Stack (Centered)</span>
              {formData.layoutMode === 'stacked' && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
            </span>
            <span className="text-[11px] text-slate-500 mt-1">
              Classic centered column layout with balanced vertical spacing
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ layoutMode: 'side-by-side' })}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-center ${
              formData.layoutMode !== 'stacked'
                ? 'bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border-indigo-500/60 font-bold text-indigo-900 shadow-sm ring-2 ring-indigo-500/20'
                : 'bg-white/60 hover:bg-white/90 text-slate-600 border-white/80 shadow-sm'
            }`}
          >
            <span className="text-xs sm:text-sm font-extrabold flex items-center justify-between">
              <span>Side-by-Side</span>
              {formData.layoutMode !== 'stacked' && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
            </span>
            <span className="text-[11px] text-slate-500 mt-1">
              Submitted To (Left) and Submitted By (Right) side-by-side columns
            </span>
          </button>
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

      {/* Dynamic Faculty Manager & Auto-Sync Modal */}
      <FacultyManagerModal
        isOpen={isFacultyManagerOpen}
        onClose={() => setIsFacultyManagerOpen(false)}
        facultyGroups={facultyGroups}
        onFacultyGroupsChange={(updated) => {
          setFacultyGroups(updated);
          saveFacultyGroups(updated);
        }}
      />

    </div>
  );
};
