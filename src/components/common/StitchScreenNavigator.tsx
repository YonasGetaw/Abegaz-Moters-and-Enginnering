import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, ChevronUp, ChevronDown, Check, Key } from 'lucide-react';

export const StitchScreenNavigator: React.FC = () => {
  const { currentView, setCurrentView, loginUser, setPreviewEmailModal, setPreviewTelegramModal } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const screens = [
    // Part A
    { id: 'home', label: 'A1/A2 Home (Desktop & Mobile)', part: 'Part A: Public' },
    { id: 'about', label: 'A3 About Us (Desktop)', part: 'Part A: Public' },
    { id: 'services', label: 'A4 Services Grid & Detail', part: 'Part A: Public' },
    { id: 'packages', label: 'A6 Service Packages & Matrix', part: 'Part A: Public' },
    { id: 'contact', label: 'A7 Contact Us & Maps Facade', part: 'Part A: Public' },
    { id: 'faq', label: 'A8 FAQ with Live Search', part: 'Part A: Public' },
    { id: 'gallery', label: 'A9 Gallery & Before/After', part: 'Part A: Public' },

    // Part B
    { id: 'book', label: 'B1–B6 5-Step Booking Flow', part: 'Part B: Booking' },
    { id: 'track', label: 'B7 Public Booking Tracking (5-Stage)', part: 'Part B: Booking' },

    // Part C
    { id: 'login', label: 'C1 Customer Login (Split Screen)', part: 'Part C: Account' },
    { id: 'register', label: 'C2 Register Screen', part: 'Part C: Account' },
    { id: 'account', label: 'C3–C5 My Bookings & Profile', part: 'Part C: Account' },

    // Part D
    { id: 'admin-login', label: 'D1 Admin Login (admin@gmail.com / admin)', part: 'Part D: Admin' },
    { id: 'admin', label: 'D2–D12 Admin Dashboard & Staff Mgmt', part: 'Part D: Admin' },

    // Part E
    { id: 'staff', label: 'E1–E4 Staff Workshop Portal (Tablet)', part: 'Part E: Staff' },

    // Part F
    { id: '404', label: 'F1 404 Page (Road Closed)', part: 'Part F: System' },
    { id: '403', label: 'F2 403 No Permission (Staff)', part: 'Part F: System' },
  ];

  return (
    <div className="fixed bottom-2 left-2 z-50">
      {isOpen ? (
        <div className="bg-navy text-white rounded-banner shadow-2xl border border-slate-700 p-4 w-80 sm:w-96 max-h-[80vh] flex flex-col animate-fade-in text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-signal" />
              <span className="font-extrabold text-sm">Google Stitch Prompt Navigator</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Demo Credentials Autofill Banner */}
          <div className="my-2 p-2.5 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-between">
            <div>
              <p className="font-bold text-orange-signal text-[11px] flex items-center gap-1">
                <Key className="w-3 h-3" />
                <span>Admin Login:</span>
              </p>
              <p className="font-mono text-slate-300 text-[10px]">admin@gmail.com / admin</p>
            </div>
            <button
              onClick={() => {
                loginUser('admin@gmail.com', 'admin');
                setCurrentView('admin');
              }}
              className="px-2.5 py-1 rounded bg-orange-signal text-navy font-bold text-[10px] hover:bg-[#EA580C]"
            >
              Quick Login
            </button>
          </div>

          {/* Screens List */}
          <div className="overflow-y-auto space-y-1 my-2 pr-1">
            {screens.map(scr => {
              const isActive = currentView === scr.id;
              return (
                <button
                  key={scr.id}
                  onClick={() => {
                    setCurrentView(scr.id);
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-all ${
                    isActive ? 'bg-orange-signal text-navy font-bold' : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div>
                    <span className="text-[10px] text-slate-400 block">{scr.part}</span>
                    <span className="text-xs font-semibold">{scr.label}</span>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-navy stroke-[3]" />}
                </button>
              );
            })}
          </div>

          {/* Part F Email & Telegram preview modals triggers */}
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setPreviewEmailModal(true);
                setIsOpen(false);
              }}
              className="flex-1 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-center font-bold text-[11px]"
            >
              F3 Email (600px)
            </button>
            <button
              onClick={() => {
                setPreviewTelegramModal(true);
                setIsOpen(false);
              }}
              className="flex-1 py-1.5 rounded bg-[#229ED9] hover:bg-[#1D8BC0] text-white text-center font-bold text-[11px]"
            >
              F4 Telegram Preview
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="h-9 px-3 rounded-full bg-navy/90 hover:bg-navy text-white text-xs font-bold border border-slate-700 shadow-xl flex items-center gap-1.5 backdrop-blur-md hover:scale-105 transition-all select-none"
        >
          <Layers className="w-3.5 h-3.5 text-orange-signal" />
          <span>Screen Pack ({currentView.toUpperCase()})</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
