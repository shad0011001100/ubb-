import React from 'react';
import { Shield, FileQuestion, Bell, User, ShieldAlert, Sparkles, Scale, Camera } from 'lucide-react';

export const BottomNav = ({ activeTab, onTabChange, currentView, onStartCapture, onOpenZKModal }) => {
  if (currentView !== 'dashboard') {
    return null; // Hide municipal bottom nav during secure recording or post-capture for focus
  }

  const tabs = [
    { id: 'vigilance', label: 'Vigilance Desk', marathi: 'दक्षता कक्ष', icon: Shield },
    { id: 'grievances', label: 'Track Escrow', marathi: 'लोकायुक्त ट्रॅकर', icon: Scale },
    { id: 'notices', label: 'Notices', marathi: 'परिपत्रक', icon: Bell },
    { id: 'identity', label: 'ZK Identity', marathi: 'नागरिक ओळख', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 shadow-md">
      <div className="max-w-md mx-auto grid grid-cols-4 px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'identity') {
                  onOpenZKModal();
                } else {
                  onTabChange(tab.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-md transition-colors cursor-pointer ${
                isActive 
                  ? 'text-blue-900 font-bold bg-blue-50/70' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-900' : 'text-slate-500'}`} />
              <span className="text-[10px] leading-tight mt-0.5">{tab.label}</span>
              <span className="text-[8px] opacity-60 leading-none">{tab.marathi}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
