import React, { useState, useEffect } from 'react';
import { CoverPageFormData, ValidationErrors, ToastMessage } from './types';
import { INITIAL_FORM_DATA } from './utils/academicPresets';
import { Navbar } from './components/Navbar';
import { CoverForm } from './components/CoverForm';
import { A4CoverPage } from './components/A4CoverPage';
import { PresetSelectorModal } from './components/PresetSelectorModal';
import { AndroidProjectModal } from './components/AndroidProjectModal';
import { exportCoverPageAsJPG, exportCoverPageAsPNG, exportCoverPageAsPDF } from './utils/exportUtils';
import {
  FileCheck,
  Smartphone,
  Eye,
  Download,
  Printer,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Maximize2,
  Minimize2,
  Layers
} from 'lucide-react';

const STORAGE_KEY = 'assignment_cover_page_data_liquid_v2';

export default function App() {
  const [formData, setFormData] = useState<CoverPageFormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load local storage form data', e);
    }
    return INITIAL_FORM_DATA;
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isPreviewGenerated, setIsPreviewGenerated] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isPresetsOpen, setIsPresetsOpen] = useState<boolean>(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Auto-save form state in LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.error('Failed to persist form data', e);
    }
  }, [formData]);

  const addToast = (type: ToastMessage['type'], text: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.college.trim()) {
      newErrors.college = 'Please enter College / University Name.';
    }
    if (!formData.course.trim()) {
      newErrors.course = 'Please enter Course Title.';
    }
    if (!formData.courseCode.trim()) {
      newErrors.courseCode = 'Please enter Course Code.';
    }
    if (!formData.teacher.trim()) {
      newErrors.teacher = 'Please enter Faculty / Teacher Name.';
    }
    if (!formData.student.trim()) {
      newErrors.student = 'Please enter Student Name.';
    }
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Please enter Student ID.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      addToast('error', firstError || 'Please fill in required fields.');
      return false;
    }
    return true;
  };

  const handleGeneratePreview = () => {
    if (validateForm()) {
      setIsPreviewGenerated(true);
      addToast('success', 'Cover page preview updated successfully!');
      if (window.innerWidth < 1024) {
        setActiveTab('preview');
      }
    }
  };

  const handleDownloadJPG = async () => {
    if (!isPreviewGenerated) {
      addToast('warning', 'Please generate preview first before downloading.');
      return;
    }
    try {
      setIsExporting(true);
      addToast('info', 'Rendering high-resolution A4 image (300 DPI)...');
      await exportCoverPageAsJPG('target-cover', 'Cover_Page_A4.jpg');
      addToast('success', 'Cover page saved successfully! (Cover_Page_A4.jpg)');
    } catch (err: any) {
      console.error(err);
      addToast('error', `Failed to export JPG: ${err?.message || 'Error occurred'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPNG = async () => {
    if (!isPreviewGenerated) {
      addToast('warning', 'Please generate preview first.');
      return;
    }
    try {
      setIsExporting(true);
      await exportCoverPageAsPNG('target-cover', 'Cover_Page_A4.png');
      addToast('success', 'PNG exported successfully!');
    } catch (err: any) {
      console.error(err);
      addToast('error', `Failed to export PNG: ${err?.message || 'Error occurred'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!isPreviewGenerated) {
      addToast('warning', 'Please generate preview first.');
      return;
    }
    try {
      setIsExporting(true);
      addToast('info', 'Generating print-ready A4 PDF document...');
      await exportCoverPageAsPDF('target-cover', 'Cover_Page_A4.pdf');
      addToast('success', 'PDF file downloaded successfully!');
    } catch (err: any) {
      console.error(err);
      addToast('error', 'Failed to generate PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    if (!isPreviewGenerated) {
      addToast('warning', 'Please generate preview first.');
      return;
    }
    window.print();
  };

  const handleClearForm = () => {
    if (window.confirm('Are you sure you want to reset all fields?')) {
      const emptyData: CoverPageFormData = {
        college: '',
        course: '',
        courseCode: '',
        submissionType: 'Assignment',
        teacher: '',
        designation: '',
        department: '',
        student: '',
        studentId: '',
        roll: '',
        reg: '',
        semester: '',
        session: '',
        date: new Date().toISOString().split('T')[0],
        logoUrl: '',
        logoSize: 140,
        borderStyle: 'classic-double',
        showWatermark: false,
        fontTheme: 'times',
        accentColor: '#1e3a8a',
      };
      setFormData(emptyData);
      setErrors({});
      setIsPreviewGenerated(false);
      localStorage.removeItem(STORAGE_KEY);
      addToast('info', 'All form fields have been cleared.');
    }
  };

  const handleSelectPreset = (presetData: Partial<CoverPageFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...presetData,
    }));
    setErrors({});
    setIsPreviewGenerated(true);
    addToast('success', 'Preset loaded into form!');
  };

  return (
    <div className="min-h-screen liquid-bg-canvas text-slate-800 flex flex-col font-sans relative">
      
      {/* Top Navbar */}
      <Navbar
        onOpenPresets={() => setIsPresetsOpen(true)}
        onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
        onClearForm={handleClearForm}
        onPrint={handlePrint}
        onDownloadJPG={handleDownloadJPG}
        onDownloadPDF={handleDownloadPDF}
        isPreviewGenerated={isPreviewGenerated}
        isExporting={isExporting}
      />

      {/* Main Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20 lg:pb-6">
        
        {/* Mobile View Toggle Bar (Liquid Glass Capsule) */}
        <div className="lg:hidden flex items-center liquid-panel p-1 shadow-md">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'editor'
                ? 'liquid-pill-purple shadow-md text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. Edit Details</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer relative ${
              activeTab === 'preview'
                ? 'liquid-pill-purple shadow-md text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>2. A4 Preview</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Input Form */}
          <div className={`lg:col-span-6 space-y-4 sm:space-y-6 ${activeTab === 'editor' ? 'block' : 'hidden lg:block'}`}>
            <CoverForm
              formData={formData}
              errors={errors}
              onChange={(partial) => {
                setFormData((prev) => ({ ...prev, ...partial }));
                if (errors) {
                  const updatedErrors = { ...errors };
                  Object.keys(partial).forEach((key) => {
                    delete updatedErrors[key as keyof ValidationErrors];
                  });
                  setErrors(updatedErrors);
                }
              }}
              onGeneratePreview={handleGeneratePreview}
              onDownloadJPG={handleDownloadJPG}
              onDownloadPNG={handleDownloadPNG}
              onDownloadPDF={handleDownloadPDF}
              onPrint={handlePrint}
              onClearForm={handleClearForm}
              onOpenPresets={() => setIsPresetsOpen(true)}
              isPreviewGenerated={isPreviewGenerated}
              isExporting={isExporting}
            />
          </div>

          {/* RIGHT COLUMN: Live A4 Preview & Controls */}
          <div className={`lg:col-span-6 space-y-4 sticky top-20 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            
            {/* Preview Card Box */}
            <div className="liquid-panel p-4 sm:p-6 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white rounded-xl shadow-md shadow-blue-500/20">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">A4 Page Preview</h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Strict A4 Ratio (210mm × 297mm)</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] sm:text-[11px] text-teal-800 font-bold px-3 py-1 bg-teal-500/15 rounded-full border border-teal-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    300 DPI High-Res
                  </span>
                </div>
              </div>

              {/* A4 Canvas Container with smooth scrollable viewport */}
              <div className="w-full bg-slate-200/50 backdrop-blur-sm rounded-2xl p-2 sm:p-4 border border-white/80 overflow-y-auto max-h-[72vh] sm:max-h-[78vh] flex justify-center items-start shadow-inner">
                <div className="w-full max-w-[460px] shadow-2xl transition-transform origin-top my-1 rounded-sm overflow-hidden">
                  <A4CoverPage data={formData} id="target-cover" />
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('editor')}
                    className="lg:hidden text-xs text-indigo-600 hover:underline font-bold flex items-center gap-1"
                  >
                    ← Edit Details
                  </button>
                  <span className="hidden sm:inline">Typography: <strong className="text-slate-700">Academic Serif (Times / Garamond)</strong></span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={handleDownloadJPG}
                    disabled={isExporting}
                    className="px-4 py-2 liquid-pill-blue font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Save JPG
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isExporting}
                    className="px-4 py-2 bg-white/80 hover:bg-white text-slate-700 border border-white rounded-full font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer text-xs backdrop-blur-md"
                  >
                    PDF
                  </button>
                </div>
              </div>

            </div>

            {/* Android Banner Card (Liquid Aurora Glass) */}
            <div className="liquid-aurora-card p-4 sm:p-5 flex items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/80 text-purple-700 rounded-2xl shadow-md shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 truncate">Native Android Studio Project</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium truncate">Jetpack Compose + Kotlin architecture source code</p>
                </div>
              </div>
              <button
                onClick={() => setIsAndroidModalOpen(true)}
                className="px-4 py-2 liquid-pill-purple text-xs font-bold shadow-md transition-all shrink-0 cursor-pointer"
              >
                View Code
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Preset Modal */}
      <PresetSelectorModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

      {/* Android Studio Modal */}
      <AndroidProjectModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
      />

      {/* Floating Glass Toast Notification Stack */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-xl animate-in slide-in-from-bottom-5 transition-all ${
              toast.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-950 border-emerald-400/40'
                : toast.type === 'error'
                ? 'bg-rose-500/20 text-rose-950 border-rose-400/40'
                : toast.type === 'warning'
                ? 'bg-amber-500/20 text-amber-950 border-amber-400/40'
                : 'bg-indigo-500/20 text-indigo-950 border-indigo-400/40'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
              {toast.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-indigo-600 shrink-0" />}
              <span className="text-xs font-bold leading-snug">{toast.text}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-black/10 rounded-full transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
