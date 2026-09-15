import React, { useState } from 'react';
import { DepartmentFacultyGroup, FacultyMember } from '../data/facultyData';
import {
  saveFacultyGroups,
  resetFacultyGroupsToDefault,
  getSyncUrl,
  setSyncUrl,
  isAutoSyncEnabled,
  setAutoSyncEnabled,
  syncFacultyFromRemote,
  getLastSyncTimestamp,
} from '../utils/facultyStore';
import {
  X,
  RefreshCw,
  Plus,
  Trash2,
  Edit2,
  Check,
  Building2,
  Users,
  Link,
  HelpCircle,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface FacultyManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  facultyGroups: DepartmentFacultyGroup[];
  onFacultyGroupsChange: (groups: DepartmentFacultyGroup[]) => void;
}

export const FacultyManagerModal: React.FC<FacultyManagerModalProps> = ({
  isOpen,
  onClose,
  facultyGroups,
  onFacultyGroupsChange,
}) => {
  const [activeTab, setActiveTab] = useState<'sync' | 'manage' | 'backup'>('sync');
  const [selectedDeptCode, setSelectedDeptCode] = useState<string>('ME');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state
  const [syncUrlInput, setSyncUrlInput] = useState(() => getSyncUrl());
  const [autoSyncCheck, setAutoSyncCheck] = useState(() => isAutoSyncEnabled());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => getLastSyncTimestamp());

  // Add / Edit form state
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [editingTeacherIndex, setEditingTeacherIndex] = useState<number | null>(null);
  const [teacherNameInput, setTeacherNameInput] = useState('');
  const [teacherDesignationInput, setTeacherDesignationInput] = useState('');
  const [teacherQualInput, setTeacherQualInput] = useState('');

  // Backup state
  const [backupJsonText, setBackupJsonText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen) return null;

  const currentGroup = facultyGroups.find((g) => g.shortCode === selectedDeptCode) || facultyGroups[0];

  const filteredFaculties = currentGroup
    ? currentGroup.faculties.filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (f.qualification && f.qualification.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleManualSync = async () => {
    if (!syncUrlInput.trim()) {
      setSyncStatus({ type: 'error', message: 'Please enter a valid Google Sheets or JSON URL.' });
      return;
    }
    setIsSyncing(true);
    setSyncStatus(null);
    try {
      const result = await syncFacultyFromRemote(syncUrlInput, facultyGroups);
      onFacultyGroupsChange(result.groups);
      setSyncStatus({ type: 'success', message: result.message });
      setLastSyncTime(new Date().toLocaleString());
    } catch (err: any) {
      setSyncStatus({ type: 'error', message: err.message || 'Failed to sync from remote URL.' });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherNameInput.trim()) return;

    const newMember: FacultyMember = {
      name: teacherNameInput.trim(),
      designation: teacherDesignationInput.trim() || 'Faculty',
      ...(teacherQualInput.trim() ? { qualification: teacherQualInput.trim() } : {}),
    };

    const updatedGroups = facultyGroups.map((g) => {
      if (g.shortCode === currentGroup.shortCode) {
        let updatedList = [...g.faculties];
        if (editingTeacherIndex !== null) {
          updatedList[editingTeacherIndex] = newMember;
        } else {
          updatedList.push(newMember);
        }
        return { ...g, faculties: updatedList };
      }
      return g;
    });

    saveFacultyGroups(updatedGroups);
    onFacultyGroupsChange(updatedGroups);

    // Reset form
    setIsAddingTeacher(false);
    setEditingTeacherIndex(null);
    setTeacherNameInput('');
    setTeacherDesignationInput('');
    setTeacherQualInput('');
  };

  const handleDeleteTeacher = (index: number) => {
    const teacher = currentGroup.faculties[index];
    if (!teacher) return;
    if (window.confirm(`Are you sure you want to remove "${teacher.name}" from ${currentGroup.shortCode}?`)) {
      const updatedGroups = facultyGroups.map((g) => {
        if (g.shortCode === currentGroup.shortCode) {
          return {
            ...g,
            faculties: g.faculties.filter((_, i) => i !== index),
          };
        }
        return g;
      });
      saveFacultyGroups(updatedGroups);
      onFacultyGroupsChange(updatedGroups);
    }
  };

  const handleStartEdit = (index: number) => {
    const teacher = currentGroup.faculties[index];
    if (!teacher) return;
    setEditingTeacherIndex(index);
    setTeacherNameInput(teacher.name);
    setTeacherDesignationInput(teacher.designation);
    setTeacherQualInput(teacher.qualification || '');
    setIsAddingTeacher(true);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all faculty members to original default TCEA list? Any manual additions will be reverted.')) {
      const def = resetFacultyGroupsToDefault();
      onFacultyGroupsChange(def);
      setSyncStatus({ type: 'success', message: 'Successfully reset to default official college faculty directory.' });
    }
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(facultyGroups, null, 2);
    navigator.clipboard.writeText(dataStr);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(backupJsonText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        saveFacultyGroups(parsed);
        onFacultyGroupsChange(parsed);
        setSyncStatus({ type: 'success', message: 'Successfully imported faculty data!' });
        setBackupJsonText('');
      } else {
        alert('Invalid JSON structure. Must be an array of department groups.');
      }
    } catch (e: any) {
      alert('Failed to parse JSON: ' + e.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-purple-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Users className="w-5 h-5 text-purple-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">Faculty Directory & Auto-Update</h2>
                <span className="bg-emerald-500/30 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/40">
                  Dynamic
                </span>
              </div>
              <p className="text-xs text-purple-200">
                Manage teachers or connect a Google Sheet / URL for future auto-updates
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-5 pt-2 gap-2 text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('sync')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'sync'
                ? 'border-purple-600 text-purple-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Online Auto-Sync (Google Sheets)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('manage')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'manage'
                ? 'border-purple-600 text-purple-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Edit Teachers ({facultyGroups.reduce((acc, g) => acc + g.faculties.length, 0)})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('backup')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'border-purple-600 text-purple-700 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Backup & Reset
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TAB 1: ONLINE AUTO-SYNC */}
          {activeTab === 'sync' && (
            <div className="space-y-4">
              <div className="bg-purple-50/80 border border-purple-200 rounded-xl p-3.5 text-xs text-purple-950 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-purple-900 text-sm">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Auto-Sync & Upgrade Faculty Directory
                </div>
                <p className="text-slate-600 leading-relaxed">
                  If faculty details change or new teachers join in the future, you can connect a{' '}
                  <strong className="text-purple-900">Google Sheet</strong> CSV link here. The app will automatically sync and update the latest faculty roster whenever opened or reloaded.
                </p>
              </div>

              {syncStatus && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    syncStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {syncStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{syncStatus.message}</span>
                </div>
              )}

              {/* Sync URL Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Sheet CSV / JSON Sync URL
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Link className="w-4 h-4 absolute left-3 top-3 text-slate-400 pointer-events-none" />
                    <input
                      type="url"
                      value={syncUrlInput}
                      onChange={(e) => {
                        setSyncUrlInput(e.target.value);
                        setSyncUrl(e.target.value);
                      }}
                      placeholder="https://docs.google.com/spreadsheets/d/... or https://..."
                      className="w-full pl-9 pr-3 py-2 liquid-input text-slate-800 text-xs focus:outline-none transition-all"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleManualSync}
                    disabled={isSyncing}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    {isSyncing ? 'Syncing...' : 'Sync Now'}
                  </button>
                </div>
                {lastSyncTime && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Last synced: <span className="font-semibold text-slate-600">{lastSyncTime}</span>
                  </p>
                )}
              </div>

              {/* Auto Sync Toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Auto-Sync on App Startup</span>
                  <span className="text-[11px] text-slate-500">
                    Automatically check and upgrade faculty details when the app opens
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={autoSyncCheck}
                  onChange={(e) => {
                    setAutoSyncCheck(e.target.checked);
                    setAutoSyncEnabled(e.target.checked);
                  }}
                  className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                />
              </div>

              {/* Guide on Google Sheet format */}
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2 text-amber-950">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                  How to create a Google Sheet for sync? (Column Format)
                </span>
                <p className="text-[11.5px] text-amber-800">
                  Include these four headers in row 1 of your Google Sheet:
                </p>
                <div className="bg-white/80 p-2.5 rounded-lg border border-amber-300 font-mono text-[11px] text-slate-800 space-y-1">
                  <div className="text-purple-700 font-bold">Department, Name, Designation, Qualification</div>
                  <div className="text-slate-600">ME, Dr. Sujit Deb, Associate Professor & HOD, PhD.</div>
                  <div className="text-slate-600">ECE, Mr. Dipjyoti Deb, Assistant Professor & HOD, M.Tech.</div>
                  <div className="text-slate-600">CSE, Dr. Abhijit Biswas, Assistant Professor & HOD, PhD.</div>
                </div>
                <p className="text-[11px] text-amber-700">
                  Then select <strong>File → Share → Publish to web → CSV</strong> in Google Sheets and paste the link above!
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE & EDIT TEACHERS */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              {/* Department Selector Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {facultyGroups.map((g) => (
                  <button
                    key={g.shortCode}
                    type="button"
                    onClick={() => {
                      setSelectedDeptCode(g.shortCode);
                      setIsAddingTeacher(false);
                      setEditingTeacherIndex(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedDeptCode === g.shortCode
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-800'
                    }`}
                  >
                    <span>{g.shortCode}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        selectedDeptCode === g.shortCode ? 'bg-white/30 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {g.faculties.length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Department Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    {currentGroup.departmentName}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Showing {filteredFaculties.length} of {currentGroup.faculties.length} faculty members
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search teacher..."
                    className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingTeacher(!isAddingTeacher);
                      setEditingTeacherIndex(null);
                      setTeacherNameInput('');
                      setTeacherDesignationInput('Assistant Professor');
                      setTeacherQualInput('');
                    }}
                    className="px-2.5 py-1 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {isAddingTeacher ? 'Cancel' : 'Add Teacher'}
                  </button>
                </div>
              </div>

              {/* Add / Edit Form */}
              {isAddingTeacher && (
                <form
                  onSubmit={handleSaveTeacher}
                  className="p-3.5 bg-purple-50/90 rounded-xl border border-purple-200 space-y-3 animate-in fade-in duration-150"
                >
                  <span className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    {editingTeacherIndex !== null ? 'Edit Faculty Details' : `Add New Teacher to ${currentGroup.shortCode}`}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                        Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={teacherNameInput}
                        onChange={(e) => setTeacherNameInput(e.target.value)}
                        placeholder="e.g. Dr. Subrata Deb"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-purple-200 rounded-lg focus:outline-none focus:border-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Designation</label>
                      <input
                        type="text"
                        value={teacherDesignationInput}
                        onChange={(e) => setTeacherDesignationInput(e.target.value)}
                        placeholder="e.g. Assistant Professor"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-purple-200 rounded-lg focus:outline-none focus:border-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Qualification</label>
                      <input
                        type="text"
                        value={teacherQualInput}
                        onChange={(e) => setTeacherQualInput(e.target.value)}
                        placeholder="e.g. B.Tech, M.Tech, PhD."
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-purple-200 rounded-lg focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingTeacher(false)}
                      className="px-3 py-1 text-xs text-slate-600 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-xs"
                    >
                      {editingTeacherIndex !== null ? 'Save Changes' : 'Add to List'}
                    </button>
                  </div>
                </form>
              )}

              {/* Faculty List */}
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {filteredFaculties.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center italic">No teachers found matching query.</p>
                ) : (
                  filteredFaculties.map((fac, idx) => {
                    const originalIdx = currentGroup.faculties.findIndex((f) => f.name === fac.name);
                    return (
                      <div
                        key={`${fac.name}-${idx}`}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-purple-50/50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                            {originalIdx + 1}
                          </span>
                          <div className="truncate">
                            <span className="text-xs font-bold text-slate-900 block truncate">{fac.name}</span>
                            <span className="text-[11px] text-slate-500 block truncate">
                              {fac.designation} {fac.qualification ? `• ${fac.qualification}` : ''}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(originalIdx)}
                            className="p-1 rounded-md text-slate-400 hover:text-purple-600 hover:bg-purple-100 transition-colors cursor-pointer"
                            title="Edit teacher"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTeacher(originalIdx)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                            title="Delete teacher"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 3: BACKUP & RESET */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Export / Share Faculty Data</span>
                <p className="text-[11px] text-slate-500">
                  Copy the full faculty roster in JSON format to share with classmates or use on another computer:
                </p>
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                  {copySuccess ? 'Copied to Clipboard!' : 'Copy Faculty JSON'}
                </button>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Import Faculty Data</span>
                <p className="text-[11px] text-slate-500">Paste an exported JSON string below to restore or replace faculty list:</p>
                <textarea
                  value={backupJsonText}
                  onChange={(e) => setBackupJsonText(e.target.value)}
                  placeholder="Paste JSON array here..."
                  rows={3}
                  className="w-full p-2 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-purple-600"
                />
                <button
                  type="button"
                  onClick={handleImportJson}
                  disabled={!backupJsonText.trim()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Import JSON
                </button>
              </div>

              <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-rose-900 block">Reset to Official TCEA List</span>
                <p className="text-[11px] text-rose-700">
                  Revert all departments and faculty members back to the initial 2025-2026 Techno College of Engineering Agartala roster.
                </p>
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to Default Directory
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Total {facultyGroups.reduce((acc, g) => acc + g.faculties.length, 0)} teachers active
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
