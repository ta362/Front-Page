import React, { useState } from 'react';
import { FAQ_DATA, FaqItem } from '../data/faqData';
import { HelpCircle, ChevronDown, ChevronUp, Search, ArrowLeft, BookOpen, Printer, Sparkles, CheckCircle2 } from 'lucide-react';

interface FaqViewProps {
  onBackToEditor: () => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onBackToEditor }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="liquid-panel p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 text-xs font-bold border border-purple-500/20">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
            <span>User Tutorial &amp; Frequently Asked Questions</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            How to Use &amp; FAQ
          </h1>
          <p className="text-xs text-slate-600 max-w-xl">
            Step-by-step instructions on generating A4 cover pages, setting printer DPI, selecting TCEA presets, and troubleshooting export options.
          </p>
        </div>

        <button
          onClick={onBackToEditor}
          className="self-start sm:self-center px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Generator</span>
        </button>
      </div>

      {/* Step-By-Step Quick User Tutorial */}
      <div className="liquid-card p-6 shadow-lg space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Quick 3-Step Guide to Generate Your A4 Cover Page</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-2xl space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-extrabold flex items-center justify-center">
              1
            </span>
            <h3 className="font-bold text-purple-950">Fill Details &amp; Select Preset</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Select your College Name (or pick TCEA Preset), Course Title, Course Code, Faculty Designation, Student Name, Roll No., and Registration No.
            </p>
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-extrabold flex items-center justify-center">
              2
            </span>
            <h3 className="font-bold text-indigo-950">Add Number &amp; Style</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Use the sleek <strong>[- 1 +]</strong> stepper control to set Assignment / Lab Copy numbers (e.g. Assignment 1) and pick your preferred font style.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center">
              3
            </span>
            <h3 className="font-bold text-emerald-950">Export or Print A4</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Click <strong>Export JPG</strong>, <strong>Export PDF</strong>, or <strong>Print</strong> to generate a 300 DPI high-definition document formatted precisely for A4 paper.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Search & Category Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search FAQ questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/90 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-purple-600 outline-none shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {['All', 'General', 'Formatting', 'Export & Printing', 'TCEA & Colleges'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-purple-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="liquid-card border border-white/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left font-bold text-slate-800 text-xs sm:text-sm flex items-center justify-between gap-3 hover:text-purple-700 transition-colors cursor-pointer"
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-purple-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-purple-50/20 animate-fade-in">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
