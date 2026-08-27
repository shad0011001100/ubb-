import React from 'react';
import { BookOpen, Smile, TrendingUp, HelpCircle, HeartHandshake } from 'lucide-react';

export function BottomNavBar({ currentTab = 'home', onNavigate }) {
  return (
    <nav className="fixed sm:absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#c5c8bc]/60 px-3 py-2 z-40 shadow-lg">
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
        {/* TAB 1: ARTICLES / EMERGENCY */}
        <button
          onClick={() => onNavigate('articles_emergency')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'articles_emergency'
              ? 'bg-red-50 text-red-700 font-bold'
              : 'text-[#5e5c52] hover:text-red-700 hover:bg-red-50/50'
          }`}
        >
          <BookOpen className={`w-4 h-4 ${currentTab === 'articles_emergency' ? 'text-red-700' : 'text-red-600'}`} />
          <span className="text-[9px] font-bold font-mono mt-1 text-center">Articles/SOS</span>
        </button>

        {/* TAB 2: MOOD & TOOLS (SUPPORT 1) */}
        <button
          onClick={() => onNavigate('level1_express')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'level1_express' || currentTab === 'mood_tools'
              ? 'bg-[#f3f5e6] text-[#526140] font-bold'
              : 'text-[#5e5c52] hover:text-[#526140] hover:bg-[#f3f5e6]'
          }`}
        >
          <Smile className={`w-4 h-4 ${currentTab === 'level1_express' || currentTab === 'mood_tools' ? 'text-[#526140]' : 'text-[#526140]'}`} />
          <span className="text-[9px] font-bold font-mono mt-1 text-center">Mood & Tools</span>
        </button>

        {/* TAB 3: PROGRESS TRACKER */}
        <button
          onClick={() => onNavigate('progress_tracker')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'progress_tracker'
              ? 'bg-[#f3f5e6] text-[#526140] font-bold'
              : 'text-[#5e5c52] hover:text-[#526140] hover:bg-[#f3f5e6]'
          }`}
        >
          <TrendingUp className={`w-4 h-4 ${currentTab === 'progress_tracker' ? 'text-[#526140]' : 'text-[#526140]'}`} />
          <span className="text-[9px] font-bold font-mono mt-1 text-center">Progress</span>
        </button>

        {/* TAB 4: 10-Q PSYCHOMETRIC FLOW */}
        <button
          onClick={() => onNavigate('questions_flow')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'questions_flow' || currentTab === 'adaptive_followup'
              ? 'bg-[#ffddb3]/40 text-[#815505] font-bold'
              : 'text-[#5e5c52] hover:text-[#815505] hover:bg-[#ffddb3]/30'
          }`}
        >
          <HelpCircle className={`w-4 h-4 ${currentTab === 'questions_flow' ? 'text-[#815505]' : 'text-[#815505]'}`} />
          <span className="text-[9px] font-bold font-mono mt-1 text-center">10-Q Flow</span>
        </button>
      </div>
    </nav>
  );
}
