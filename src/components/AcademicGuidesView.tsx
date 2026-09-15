import React, { useState } from 'react';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';
import { BookOpen, Clock, User, Calendar, ArrowLeft, Search, CheckCircle2, ChevronRight, Share2, Sparkles } from 'lucide-react';

interface AcademicGuidesViewProps {
  onBackToEditor: () => void;
}

export const AcademicGuidesView: React.FC<AcademicGuidesViewProps> = ({ onBackToEditor }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const selectedArticle = BLOG_ARTICLES.find((a) => a.id === selectedArticleId);

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="liquid-panel p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 text-xs font-bold border border-purple-500/20">
            <BookOpen className="w-3.5 h-3.5 text-purple-600" />
            <span>Academic Knowledge Base &amp; Formatting Guides</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            University Cover Page &amp; Report Guides
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Read official formatting standards, TCEA guidelines, A4 print DPI configurations, and university submission checklists verified for B.Tech, Diploma, and Science programs.
          </p>
        </div>

        <button
          onClick={onBackToEditor}
          className="self-start md:self-center px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Generator</span>
        </button>
      </div>

      {/* Article Detail View OR Article Catalog */}
      {selectedArticle ? (
        /* SINGLE ARTICLE READER VIEW */
        <div className="liquid-card p-6 sm:p-10 shadow-xl space-y-6">
          <button
            onClick={() => setSelectedArticleId(null)}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="space-y-3 pb-6 border-b border-slate-200">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 font-bold text-[11px] rounded-full border border-purple-200">
              {selectedArticle.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {selectedArticle.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-purple-600" />
                <span>{selectedArticle.author}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-purple-600" />
                <span>{selectedArticle.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>{selectedArticle.readTime}</span>
              </span>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-4">
            {selectedArticle.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h3 key={idx} className="text-lg font-extrabold text-slate-900 pt-2">
                    {paragraph.replace('# ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h4 key={idx} className="text-base font-bold text-slate-800 pt-3">
                    {paragraph.replace('## ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h5 key={idx} className="text-sm font-bold text-slate-800 pt-2">
                    {paragraph.replace('### ', '')}
                  </h5>
                );
              }
              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={() => setSelectedArticleId(null)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              ← Back to Catalog
            </button>
            <button
              onClick={onBackToEditor}
              className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Open Cover Generator →
            </button>
          </div>
        </div>
      ) : (
        /* ARTICLES CATALOG LIST */
        <div className="space-y-6">
          
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search guides or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white/80 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-purple-600 outline-none shadow-xs"
              />
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {['All', 'Formatting', 'TCEA Special', 'Academic Rules', 'Printing'].map((cat) => (
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

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticleId(article.id)}
                className="liquid-card p-5 sm:p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border border-white/80 hover:border-purple-300 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 font-bold text-[10px] rounded-full">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{article.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
                  <span>Read Full Article</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
