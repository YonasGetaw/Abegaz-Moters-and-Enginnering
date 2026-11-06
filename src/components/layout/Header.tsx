import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../../context/AppContext';
import { Phone, Clock, MapPin, Globe, Menu, X, User as UserIcon, Calendar, Bell } from 'lucide-react';
import { WORKSHOP_INFO } from '../../lib/constants';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const { 
    locale, 
    setLocale, 
    currentView, 
    setCurrentView, 
    toggleNotificationSimulator, 
    appointments 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const isTransparent = currentView === 'home' && !isScrolled;

  // Exact Order: Home -> About -> Services -> Packages -> Gallery -> Track -> FAQ -> Contact
  const navLinks = [
    { id: 'home', labelAm: 'መነሻ', labelEn: 'Home' },
    { id: 'about', labelAm: 'ስለ እኛ', labelEn: 'About Us' },
    { id: 'services', labelAm: 'አገልግሎቶች', labelEn: 'Services' },
    { id: 'packages', labelAm: 'ጥቅሎች', labelEn: 'Packages' },
    { id: 'gallery', labelAm: 'ጋለሪ', labelEn: 'Gallery' },
    { id: 'track', labelAm: 'ቀጠሮ መከታተያ', labelEn: 'Track' },
    { id: 'faq', labelAm: 'ጥያቄና መልስ', labelEn: 'FAQ' },
    { id: 'contact', labelAm: 'አድራሻ', labelEn: 'Contact' },
  ];

  const handleNavClick = (viewId: string) => {
    if (viewId === 'faq') {
      setCurrentView('home');
      setMobileMenuOpen(false);
      setTimeout(() => {
        const el = document.getElementById('faq');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`transition-all duration-300 ${
      isTransparent
        ? 'fixed top-0 inset-x-0 z-40 bg-gradient-to-b from-black/70 via-black/25 to-transparent border-b border-white/10 text-white'
        : 'sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-md text-slate-800'
    }`}>
      {/* 1. Top Info Bar */}
      <div className={`hidden lg:block text-xs py-2 px-6 border-b transition-colors ${
        isTransparent
          ? 'bg-black/30 backdrop-blur-xs text-white/90 border-white/10'
          : 'bg-slate-50 text-slate-700 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <div className="flex items-center gap-6">
            <a 
              href="tel:+251975480808" 
              className={`flex items-center gap-1.5 font-bold font-mono transition-colors ${
                isTransparent ? 'text-white hover:text-red-400' : 'text-blue-900 hover:text-red-600'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>0975 48 08 08 / 011 465 1553</span>
            </a>
            <span className={`flex items-center gap-1.5 ${isTransparent ? 'text-white/80' : 'text-slate-600'}`}>
              <Clock className={`w-3.5 h-3.5 ${isTransparent ? 'text-red-400' : 'text-blue-700'}`} />
              <span>{locale === 'am' ? WORKSHOP_INFO.hoursScheduleAm : WORKSHOP_INFO.hoursScheduleEn}</span>
            </span>
            <a 
              href={WORKSHOP_INFO.googleMapsUrl} 
              target="_blank" 
              rel="noreferrer" 
              className={`flex items-center gap-1.5 transition-colors group ${
                isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-blue-900'
              }`}
              title="Open Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-red-500 group-hover:animate-bounce" />
              <span>{locale === 'am' ? 'አሌክሳንደር ፑሽኪን መንገድ፣ ቄራ፣ አዲስ አበባ' : WORKSHOP_INFO.addressEn} ({WORKSHOP_INFO.plusCode})</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('admin')}
              className={`font-bold transition-colors flex items-center gap-1 ${
                currentView === 'admin' 
                  ? 'text-red-500' 
                  : (isTransparent ? 'text-white hover:text-red-400' : 'text-blue-900 hover:text-red-600')
              }`}
            >
              <span>Admin Portal</span>
              {pendingCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
            <span className={isTransparent ? 'text-white/30' : 'text-slate-300'}>|</span>
            <button 
              onClick={() => handleNavClick('staff')}
              className={`font-bold transition-colors ${
                currentView === 'staff' 
                  ? 'text-red-500' 
                  : (isTransparent ? 'text-white hover:text-red-400' : 'text-blue-900 hover:text-red-600')
              }`}
            >
              Staff Portal
            </button>
            <span className={isTransparent ? 'text-white/30' : 'text-slate-300'}>|</span>
            {/* Live Notification Simulator Trigger */}
            <button
              onClick={toggleNotificationSimulator}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold border transition-colors ${
                isTransparent
                  ? 'bg-red-600/30 text-white border-red-500/40 hover:bg-red-600/50'
                  : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200'
              }`}
              title="Open Live Telegram & Email Simulator"
            >
              <Bell className="w-3 h-3 text-red-500 animate-pulse" />
              <span>Demo Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-2 sm:gap-2.5 select-none group shrink-0"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white flex items-center justify-center p-1 shadow-xs border-2 border-red-500 group-hover:border-blue-700 transition-colors overflow-hidden shrink-0">
            <img 
              src="/logo.png" 
              alt="Abegaz Motors Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="shrink-0">
            <div className={`font-black text-sm sm:text-base xl:text-lg tracking-tight leading-none group-hover:text-red-500 transition-colors whitespace-nowrap ${
              isTransparent ? 'text-white drop-shadow-md' : 'text-blue-950'
            }`}>
              አበጋዝ ሞተርስ ኢንጂነሪንግ
            </div>
            <div className={`text-[8px] sm:text-[10px] font-black tracking-wider uppercase mt-0.5 whitespace-nowrap ${
              isTransparent ? 'text-red-400 drop-shadow-sm' : 'text-red-600'
            }`}>
              Abegaz Motors Engineering
            </div>
          </div>
        </div>

        {/* Desktop Nav Links - Slightly reduced text size and strictly one-line for "About us" */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs xl:text-[13px] font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive 
                    ? (isTransparent ? 'text-white bg-red-600 shadow-md font-extrabold' : 'text-red-600 bg-red-50 border border-red-200 shadow-2xs font-extrabold')
                    : (isTransparent ? 'text-white/90 hover:text-white hover:bg-white/15' : 'text-blue-950 hover:text-red-600 hover:bg-blue-50/70')
                }`}
              >
                {locale === 'am' ? link.labelAm : link.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher Pill */}
          <button
            onClick={() => setLocale(locale === 'am' ? 'en' : 'am')}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-black whitespace-nowrap transition-all shadow-2xs ${
              isTransparent
                ? 'border-white/25 text-white bg-white/15 hover:bg-white/25'
                : 'border-slate-300 hover:border-red-500 text-blue-900 bg-white hover:text-red-600'
            }`}
            title="ቋንቋ ይቀይሩ / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span>{locale === 'am' ? 'EN' : 'አማ'}</span>
          </button>

          {/* Account Icon */}
          <button
            onClick={() => handleNavClick('account')}
            className={`p-2 rounded-xl border transition-all shadow-2xs ${
              isTransparent
                ? 'border-white/25 text-white bg-white/15 hover:bg-white/25'
                : (currentView === 'account' ? 'bg-red-50 border-red-500 text-red-600' : 'border-slate-300 hover:border-red-500 text-blue-900 bg-white hover:text-red-600 hover:bg-red-50')
            }`}
            title="የደንበኛ መለያ / Customer Account"
          >
            <UserIcon className="w-4 h-4" />
          </button>

          {/* Book Appointment CTA Button - Adjusted compact & responsive */}
          <button
            onClick={() => handleNavClick('book')}
            className="hidden sm:inline-flex items-center gap-1.5 h-10 px-3.5 xl:px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs xl:text-sm whitespace-nowrap shadow-md hover:shadow-lg transition-all active:scale-98"
          >
            <Calendar className="w-4 h-4 text-white shrink-0" />
            <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className={`lg:hidden p-2 rounded-xl border-2 transition-all active:scale-95 ${
              isTransparent
                ? 'bg-white/20 border-white/40 text-white hover:bg-white/30'
                : 'bg-white border-slate-300 text-blue-950 hover:text-red-600 hover:border-red-500 shadow-xs'
            }`}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-red-500 stroke-[2.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Portal: rendered at document.body with z-[9999] so NOTHING can overlap or cover it */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="lg:hidden fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-sm animate-fade-in flex flex-col justify-start"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-full bg-white max-h-[90vh] overflow-y-auto shadow-2xl border-b-4 border-red-600 p-5 sm:p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header row in mobile drawer */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1 border-2 border-red-500 overflow-hidden shadow-xs">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-black text-sm text-blue-950 leading-none">አበጋዝ ሞተርስ ኢንጂነሪንግ</div>
                  <div className="text-[9px] font-black text-red-600 uppercase mt-0.5">Abegaz Motors</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-red-600 stroke-[2.5]" />
              </button>
            </div>

            {/* Nav list */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`h-13 px-4 rounded-xl flex items-center justify-between text-base font-extrabold border transition-all ${
                    currentView === link.id
                      ? 'bg-red-50 text-red-600 border-red-300 shadow-xs'
                      : 'bg-white text-blue-950 border-slate-200 hover:bg-blue-50'
                  }`}
                >
                  <span>{locale === 'am' ? link.labelAm : link.labelEn}</span>
                  <span className="text-red-500 text-lg font-bold">›</span>
                </button>
              ))}
            </div>

            {/* Account & portals */}
            <div className="mt-5 pt-5 border-t border-slate-200 space-y-2.5">
              <button
                onClick={() => handleNavClick('account')}
                className="w-full h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
              >
                <UserIcon className="w-4 h-4 text-red-600" />
                <span>{locale === 'am' ? 'የኔ ቀጠሮዎች / መለያ' : 'My Account & Bookings'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="h-11 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Admin Dashboard</span>
                  {pendingCount > 0 && (
                    <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                      {pendingCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleNavClick('staff')}
                  className="h-11 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center"
                >
                  <span>Staff Portal</span>
                </button>
              </div>

              <button
                onClick={() => handleNavClick('book')}
                className="w-full h-13 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-base shadow-lg flex items-center justify-center gap-2 mt-1"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
