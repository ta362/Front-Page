import React, { useState } from 'react';
import { FileText, Upload, Sparkles, Check, Trash2, Plus, X, AlertCircle } from 'lucide-react';
import { parseSyllabusText, saveCustomSyllabusCourses, CourseMapping } from '../data/tripuraCourseDatabase';

interface SyllabusPdfImporterProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete?: (parsed: CourseMapping[]) => void;
  department?: string;
  semester?: string | number;
}

export const SyllabusPdfImporter: React.FC<SyllabusPdfImporterProps> = ({
  isOpen,
  onClose,
  onImportComplete,
  department = '',
  semester = '',
}) => {
  const [pastedText, setPastedText] = useState('');
  const [extractedCourses, setExtractedCourses] = useState<CourseMapping[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newCode, setNewCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setPastedText(text);
        const parsed = parseSyllabusText(text, department, semester);
        setExtractedCourses(parsed);
      }
    };
    reader.readAsText(file);
  };

  const handleParseText = () => {
    if (!pastedText.trim()) return;
    const parsed = parseSyllabusText(pastedText, department, semester);
    setExtractedCourses(parsed);
  };

  const handleAddManual = () => {
    if (!newTitle.trim() || !newCode.trim()) return;
    setExtractedCourses((prev) => [
      ...prev,
      {
        title: newTitle.trim(),
        code: newCode.trim().toUpperCase(),
        department: department || 'Custom PDF',
        semester: semester,
        scheme: 'Custom',
      },
    ]);
    setNewTitle('');
    setNewCode('');
  };

  const handleRemoveCourse = (index: number) => {
    setExtractedCourses((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = () => {
    if (extractedCourses.length === 0) return;
    saveCustomSyllabusCourses(extractedCourses);
    setIsSuccess(true);
    if (onImportComplete) {
      onImportComplete(extractedCourses);
    }
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <FileText className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Import Syllabus PDF / Paper Codes</h3>
              <p className="text-xs text-purple-200">Tripura University Official Syllabus Parser</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-xl transition-colors text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-700">
          {/* Instructions */}
          <div className="bg-purple-50/80 border border-purple-200/80 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-purple-900">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>How to import from Tripura University PDF:</span>
            </div>
            <p className="text-purple-800 leading-relaxed">
              Open your Department Syllabus PDF file, copy the text (ctrl+C), and paste it into the box below or upload a text file. The system will automatically scan subject names & paper codes (e.g. <b>EC-604</b>, <b>PCEC-604</b>, <b>CS-301</b>)!
            </p>
          </div>

          {/* Input Box / Upload */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">Paste PDF Text or Syllabus List</label>
              <label className="text-xs text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1 cursor-pointer bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg border border-purple-200 transition-colors">
                <Upload className="w-3.5 h-3.5" /> Upload File (.txt / text)
                <input type="file" accept=".txt,.csv,.text,.doc" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <textarea
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste syllabus text here (Example: EC-604 : Digital Signal Processing or Subject: Data Structures Code: PCC-CS301)..."
              className="w-full h-32 p-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono"
            />

            <button
              type="button"
              onClick={handleParseText}
              disabled={!pastedText.trim()}
              className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-40 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              Scan & Extract Paper Codes from Text
            </button>
          </div>

          {/* Add Manual Item Option */}
          <div className="pt-3 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-800 mb-2">Or Add Custom Subject & Code Manually:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Subject Name (e.g. Digital Signal Processing)"
                className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="Paper Code (e.g. EC-604)"
                className="w-32 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-extrabold uppercase"
              />
              <button
                type="button"
                onClick={handleAddManual}
                disabled={!newTitle.trim() || !newCode.trim()}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl disabled:opacity-40 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>

          {/* Extracted List Preview */}
          {extractedCourses.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Extracted Subjects ({extractedCourses.length}):</span>
                <span className="text-purple-600 font-normal text-[11px]">Will be saved to Auto-Fill database</span>
              </div>
              <div className="max-h-48 overflow-y-auto border border-purple-100 rounded-2xl divide-y divide-slate-100 bg-slate-50/50">
                {extractedCourses.map((item, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between hover:bg-purple-50/60 transition-colors">
                    <div className="min-w-0 pr-3">
                      <p className="text-xs font-bold text-slate-800 truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-400">Scheme: {item.scheme || 'Custom'}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-1 bg-purple-100 text-purple-900 text-xs font-extrabold rounded-lg border border-purple-200">
                        {item.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCourse(idx)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {extractedCourses.length === 0 && pastedText.trim() && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-amber-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <span>No paper codes automatically detected in text. Try formatting as <b>Subject Name : CODE</b> or use manual add above.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {extractedCourses.length} subject(s) ready
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={extractedCourses.length === 0}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 disabled:opacity-40 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" /> Saved to Database!
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-200" /> Save & Use In Cover Form
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
