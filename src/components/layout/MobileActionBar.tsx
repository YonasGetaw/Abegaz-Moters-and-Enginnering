import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Send, Calendar } from 'lucide-react';

export const MobileActionBar: React.FC = () => {
  const { currentView, setCurrentView, locale } = useApp();

  // Hide on Customer Account (which has its own 5-item bottom nav), Booking wizard, Admin, and Staff views
  if (['book', 'admin', 'staff', 'account', 'login', 'register'].includes(currentView)) {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-line shadow-lg px-4 py-2.5 pb-safe flex items-center gap-2">
      {/* Tap to Call */}
      <a
        href="tel:+251114651553"
        className="flex-1 h-11 rounded-btn bg-mist border border-line text-navy flex items-center justify-center gap-1.5 text-xs font-semibold hover:bg-slate-200 transition-colors"
      >
        <Phone className="w-4 h-4 text-orange-deep" />
        <span>{locale === 'am' ? 'ደውል' : 'Call'}</span>
      </a>

      {/* Tap to Telegram */}
      <a
        href="https://t.me/AbegazMotors"
        target="_blank"
        rel="noreferrer"
        className="flex-1 h-11 rounded-btn bg-[#229ED9]/10 border border-[#229ED9]/30 text-[#0088cc] flex items-center justify-center gap-1.5 text-xs font-semibold hover:bg-[#229ED9]/20 transition-colors"
      >
        <Send className="w-4 h-4 text-[#229ED9]" />
        <span>Telegram</span>
      </a>

      {/* Primary Booking Button */}
      <button
        onClick={() => {
          setCurrentView('book');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex-[2] h-11 rounded-btn bg-orange-signal text-navy font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
      >
        <Calendar className="w-4 h-4" />
        <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Now'}</span>
      </button>
    </div>
  );
};
