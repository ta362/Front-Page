import React, { useState, useEffect } from 'react';
import { CoverPageFormData, ValidationErrors, ToastMessage } from './types';
import { INITIAL_FORM_DATA, TCEA_LOGO_SVG } from './utils/academicPresets';
import { Navbar } from './components/Navbar';
import { CoverForm } from './components/CoverForm';
import { A4CoverPage } from './components/A4CoverPage';
import { A4PreviewViewer } from './components/A4PreviewViewer';
import { PresetSelectorModal } from './components/PresetSelectorModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { InstallPwaModal } from './components/InstallPwaModal';
import { AdBanner } from './components/AdBanner';
import { Footer } from './components/Footer';
import { AcademicGuidesView } from './components/AcademicGuidesView';
import { FaqView } from './components/FaqView';
import { LegalPagesModal } from './components/LegalPagesModal';
import { AdSenseApprovalGuideModal } from './components/AdSenseApprovalGuideModal';
import { exportCoverPageAsJPGDirect, exportCoverPageAsPNGDirect, exportCoverPageAsPDFDirect } from './utils/exportUtils';
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
  Layers,
  ArrowDownToLine,
  Award
} from 'lucide-react';

const STORAGE_KEY = 'assignment_cover_page_data_liquid_v3';

export default function App() {
  const [formData, setFormData] = useState<CoverPageFormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('assignment_cover_page_data_liquid_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_FORM_DATA,
          ...parsed,
          college: (parsed.college === 'Techno College of Engineering Agartala') ? '' : (parsed.college || ''),
          course: (parsed.course === 'Microwave and Fiber Optic Communication Lab') ? '' : (parsed.course || ''),
          courseCode: (parsed.courseCode === 'PC EC 605') ? '' : (parsed.courseCode || ''),
          teacher: (parsed.teacher === 'Mr. Sudip Deb') ? '' : (parsed.teacher || ''),
          designation: (parsed.designation === 'Assistant Professor') ? '' : (parsed.designation || ''),
          department: (parsed.department === 'Department of Electronics & Communication Engineering') ? '' : (parsed.department || ''),
          student: (parsed.student === 'TANMOY DAS') ? '' : (parsed.student || ''),
          studentId: (parsed.studentId === '24304033011' || parsed.studentId === '2026EE001') ? '' : (parsed.studentId || ''),
          roll: (parsed.roll === '2467030082' || parsed.roll === '2467000003') ? '' : (parsed.roll || ''),
          reg: (parsed.reg === '003732' || parsed.reg === '001236') ? '' : (parsed.reg || ''),
          semester: (parsed.semester === 'B.Tech. 6th Sem') ? '' : (parsed.semester || ''),
          session: (parsed.session === '2026-27') ? '' : (parsed.session || ''),
          borderStyle: parsed.borderStyle || 'none',
          layoutMode: parsed.layoutMode || 'stacked',
        };
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
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  
  // Active Navigation View State
  const [activeView, setActiveView] = useState<'editor' | 'guides' | 'faq'>('editor');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | 'about' | null>(null);
  const [isAdSenseGuideOpen, setIsAdSenseGuideOpen] = useState<boolean>(false);

  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);

  // Auto-save form state in LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.error('Failed to persist form data', e);
    }
  }, [formData]);

  // Capture PWA beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredInstallPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) {
      setShowInstallBanner(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredInstallPrompt) {
      try {
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        if (outcome === 'accepted') {
          addToast('success', 'App installed successfully on your phone!');
          setShowInstallBanner(false);
        }
        setDeferredInstallPrompt(null);
      } catch (err) {
        console.error('Install prompt error', err);
        setIsInstallModalOpen(true);
      }
    } else {
      setIsInstallModalOpen(true);
    }
  };

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
      await exportCoverPageAsJPGDirect(formData, 'Cover_Page_A4.jpg');
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
      await exportCoverPageAsPNGDirect(formData, 'Cover_Page_A4.png');
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
      await exportCoverPageAsPDFDirect(formData, 'Cover_Page_A4.pdf');
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
    setIsResetModalOpen(true);
  };

  const confirmResetBlank = () => {
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
      date: '',
      logoUrl: '',
      logoSize: 155,
      borderStyle: 'none',
      showWatermark: false,
      fontTheme: 'times',
      accentColor: '#dc2626',
      layoutMode: 'stacked',
    };
    setFormData(emptyData);
    setErrors({});
    setIsPreviewGenerated(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyData));
    } catch (e) {
      console.error('Failed to clear local storage', e);
    }
    setIsResetModalOpen(false);
    addToast('info', 'All details have been completely cleared! ↺');
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'Cover Page App - A4 Lab & Assignment Creator',
      text: 'Create and download professional A4 college cover pages instantly with Cover Page App!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        addToast('success', 'Thank you for sharing the app! 🚀');
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      addToast('success', 'App link copied to clipboard! Share it with your friends. 📋');
    } catch {
      addToast('info', 'Please copy URL from the browser address bar.');
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

  const handleFooterNavigation = (tab: 'editor' | 'guides' | 'faq' | 'privacy' | 'terms' | 'about' | 'adsense-guide') => {
    if (tab === 'editor' || tab === 'guides' || tab === 'faq') {
      setActiveView(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'privacy' || tab === 'terms' || tab === 'about') {
      setLegalModalTab(tab);
    } else if (tab === 'adsense-guide') {
      setIsAdSenseGuideOpen(true);
    }
  };

  return (
    <div className="min-h-screen liquid-bg-canvas text-slate-800 flex flex-col font-sans relative">
      
      {/* Top Navbar */}
      <Navbar
        onOpenPresets={() => setIsPresetsOpen(true)}
        onClearForm={handleClearForm}
        onPrint={handlePrint}
        onDownloadJPG={handleDownloadJPG}
        onDownloadPDF={handleDownloadPDF}
        isPreviewGenerated={isPreviewGenerated}
        isExporting={isExporting}
        onShareApp={handleShareApp}
        activeView={activeView}
        onNavigateTab={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdSenseGuide={() => setIsAdSenseGuideOpen(true)}
        onOpenLegal={(tab) => setLegalModalTab(tab)}
      />

      {/* Main Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-12">
        
        {/* Instant Mobile App Install Banner */}
        {showInstallBanner && activeView === 'editor' && (
          <div className="liquid-panel p-3.5 sm:p-4 bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-teal-600/10 border border-purple-300/40 shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-purple-500/30">
                <ArrowDownToLine className="w-5 h-5 animate-bounce" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                  Install App on Mobile
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium truncate">
                  Opens directly in full-screen without browser bars
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleInstallApp}
                className="liquid-pill-purple px-4 py-2 text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
              <button
                type="button"
                onClick={() => setShowInstallBanner(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* VIEW 1: MAIN COVER GENERATOR TOOL */}
        {activeView === 'editor' && (
          <div className="space-y-6">
            
            {/* Mobile View Toggle Bar */}
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

                  {/* A4 Canvas Container */}
                  <div className="w-full bg-slate-200/50 backdrop-blur-sm rounded-2xl p-2 sm:p-4 border border-white/80 overflow-y-auto max-h-[75vh] flex justify-center items-start shadow-inner">
                    <A4PreviewViewer data={formData} />
                  </div>

                  {/* Quick Action Footer */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={handleDownloadJPG}
                      disabled={!isPreviewGenerated || isExporting}
                      className={`flex-1 py-3 px-4 text-xs font-extrabold liquid-pill-blue flex items-center justify-center gap-2 cursor-pointer ${
                        isPreviewGenerated && !isExporting
                          ? 'opacity-100 active:scale-95'
                          : 'opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download JPG (300 DPI)</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadPDF}
                      disabled={!isPreviewGenerated || isExporting}
                      className={`flex-1 py-3 px-4 text-xs font-extrabold liquid-pill-purple flex items-center justify-center gap-2 cursor-pointer ${
                        isPreviewGenerated && !isExporting
                          ? 'opacity-100 active:scale-95'
                          : 'opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF Document</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>

            {/* Google AdSense Responsive Banner */}
            <AdBanner className="mt-8 mb-4" />

          </div>
        )}

        {/* VIEW 2: ACADEMIC FORMATTING GUIDES & ARTICLES */}
        {activeView === 'guides' && (
          <AcademicGuidesView onBackToEditor={() => setActiveView('editor')} />
        )}

        {/* VIEW 3: FAQ & TUTORIAL */}
        {activeView === 'faq' && (
          <FaqView onBackToEditor={() => setActiveView('editor')} />
        )}

      </main>

      {/* Comprehensive Footer */}
      <Footer onNavigateTab={handleFooterNavigation} />

      {/* Hidden canonical full-size A4 export container */}
      <div
        id="export-mount"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '794px',
          height: '1123px',
          zIndex: -50,
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <A4CoverPage data={formData} id="target-cover" />
      </div>

      {/* Hidden container dedicated to High-DPI browser printing */}
      <div id="print-cover-area" className="hidden">
        <A4CoverPage data={formData} id="print-cover-inner" isPrintArea={true} />
      </div>

      {/* Preset Modal */}
      {isPresetsOpen && (
        <PresetSelectorModal
          onSelectPreset={handleSelectPreset}
          onClose={() => setIsPresetsOpen(false)}
        />
      )}

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmResetBlank={confirmResetBlank}
      />

      {/* Install PWA Modal */}
      <InstallPwaModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        deferredPrompt={deferredInstallPrompt}
        onTriggerNativeInstall={handleInstallApp}
        onAddToast={addToast}
      />

      {/* Legal & Policy Modal (Privacy Policy, Terms of Service, About Us & Contact) */}
      {legalModalTab && (
        <LegalPagesModal
          initialTab={legalModalTab}
          onClose={() => setLegalModalTab(null)}
        />
      )}

      {/* AdSense Approval Status & Fix Guide Modal */}
      {isAdSenseGuideOpen && (
        <AdSenseApprovalGuideModal
          onClose={() => setIsAdSenseGuideOpen(false)}
          onOpenGuides={() => setActiveView('guides')}
          onOpenLegal={() => setLegalModalTab('privacy')}
        />
      )}

      {/* Toast Alerts */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl border flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-3 backdrop-blur-xl ${
              toast.type === 'success'
                ? 'bg-emerald-500/90 text-white border-emerald-400/50 shadow-emerald-500/20'
                : toast.type === 'error'
                ? 'bg-rose-500/90 text-white border-rose-400/50 shadow-rose-500/20'
                : toast.type === 'warning'
                ? 'bg-amber-500/90 text-white border-amber-400/50 shadow-amber-500/20'
                : 'bg-indigo-600/90 text-white border-indigo-400/50 shadow-indigo-500/20'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {toast.type === 'success' && <CheckCircle className="w-4 h-4 shrink-0" />}
              {toast.type === 'error' && <AlertTriangle className="w-4 h-4 shrink-0" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 shrink-0" />}
              <span className="text-xs font-bold leading-snug">{toast.text}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-white/80 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
