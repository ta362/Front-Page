import React, { useState } from 'react';
import { ANDROID_PROJECT_FILES, ANDROID_PACKAGE_NAME, AndroidProjectFile } from '../data/androidProjectSource';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode2,
  FolderTree,
  Terminal,
  Smartphone,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import JSZip from 'jszip';

interface AndroidProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidProjectModal: React.FC<AndroidProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<AndroidProjectFile>(ANDROID_PROJECT_FILES[3]); // Default to MainActivity.kt
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Add all Android Studio files into the ZIP structure
      ANDROID_PROJECT_FILES.forEach((file) => {
        zip.file(file.path, file.content);
      });

      // Also add gradle wrapper properties
      zip.file(
        'gradle/wrapper/gradle-wrapper.properties',
        `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.4-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`
      );

      // Root build.gradle.kts and settings.gradle.kts
      zip.file(
        'build.gradle.kts',
        `plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
}
`
      );

      zip.file(
        'settings.gradle.kts',
        `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "AcademicCoverPage"
include(":app")
`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'Academic_Cover_Page_Android_Studio_Project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to create zip', err);
      alert('Failed to generate Android project zip file.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/30 backdrop-blur-md animate-in fade-in">
      <div className="liquid-panel w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-white/90">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 flex items-center justify-between gap-4 shrink-0 bg-white/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-400 to-teal-500 text-white rounded-2xl shadow-md shadow-emerald-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-800">
                  Android Studio Project Exporter
                </h3>
                <span className="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-500/30">
                  Jetpack Compose & Kotlin
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Production-ready Native Kotlin codebase with Clean Architecture (MVVM)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* File Explorer Tree */}
          <div className="w-full md:w-72 bg-white/50 border-r border-slate-200/80 p-3.5 overflow-y-auto shrink-0 space-y-2">
            <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-slate-600 uppercase tracking-wider">
              <FolderTree className="w-3.5 h-3.5" />
              <span>Project Files</span>
            </div>
            <div className="space-y-1">
              {ANDROID_PROJECT_FILES.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    selectedFile.name === file.name
                      ? 'liquid-pill-purple text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white/80'
                  }`}
                >
                  <FileCode2 className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-900 text-slate-100">
            <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
              <span className="text-xs font-mono text-slate-400 truncate">
                {selectedFile.path}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <div className="p-4 overflow-auto flex-1 font-mono text-xs leading-relaxed text-slate-200">
              <pre>
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white/40 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-500 text-center sm:text-left font-medium">
            Open the downloaded folder in <strong className="text-slate-800">Android Studio</strong> and run directly on your phone/emulator.
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-full transition-colors cursor-pointer shadow-sm"
            >
              Close
            </button>
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="w-1/2 sm:w-auto px-5 py-2 liquid-pill-purple text-white text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'Zipping...' : 'Download Project ZIP'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
