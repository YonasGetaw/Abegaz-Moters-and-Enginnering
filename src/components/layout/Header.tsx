import React, { useState } from 'react';
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

  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const isHome = currentView === 'home';

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
    <header className={`sticky top-0 z-50 transition-colors duration-200 ${
      isHome 
        ? 'bg-black/35 backdrop-blur-md border-b border-white/10 shadow-lg' 
        : 'bg-white/95 backdrop-blur-md border-b-2 border-slate-100 shadow-sm'
    }`}>
      {/* 1. Top Info Bar - Transparent on Hero, crisp light on other pages */}
      <div className={`hidden lg:block text-xs py-2 px-6 border-b transition-colors ${
        isHome 
          ? 'bg-black/40 text-white/90 border-white/10' 
          : 'bg-slate-50 text-slate-700 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <div className="flex items-center gap-6">
            <a 
              href="tel:+251975480808" 
              className={`flex items-center gap-1.5 font-bold font-mono transition-colors ${
                isHome ? 'text-white hover:text-red-400' : 'text-blue-800 hover:text-red-600'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>0975 48 08 08 / 011 465 1553</span>
            </a>
            <span className={`flex items-center gap-1.5 ${isHome ? 'text-white/80' : 'text-slate-600'}`}>
              <Clock className={`w-3.5 h-3.5 ${isHome ? 'text-red-400' : 'text-blue-700'}`} />
              <span>{locale === 'am' ? WORKSHOP_INFO.hoursScheduleAm : WORKSHOP_INFO.hoursScheduleEn}</span>
            </span>
            <a 
              href={WORKSHOP_INFO.googleMapsUrl} 
              target="_blank" 
              rel="noreferrer" 
              className={`flex items-center gap-1.5 transition-colors group ${
                isHome ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-blue-700'
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
                  : (isHome ? 'text-white hover:text-red-400' : 'text-blue-700 hover:text-red-600')
              }`}
            >
              <span>Admin Portal</span>
              {pendingCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
            <span className={isHome ? 'text-white/30' : 'text-slate-300'}>|</span>
            <button 
              onClick={() => handleNavClick('staff')}
              className={`font-bold transition-colors ${
                currentView === 'staff' 
                  ? 'text-red-500' 
                  : (isHome ? 'text-white hover:text-red-400' : 'text-blue-700 hover:text-red-600')
              }`}
            >
              Staff Portal
            </button>
            <span className={isHome ? 'text-white/30' : 'text-slate-300'}>|</span>
            {/* Live Notification Simulator Trigger */}
            <button
              onClick={toggleNotificationSimulator}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold border transition-colors ${
                isHome 
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

      {/* 2. Main Navigation Bar - Transparent over Hero video */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 lg:h-20 flex items-center justify-between transition-colors ${
        isHome ? 'bg-transparent' : 'bg-white'
      }`}>
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-3 select-none group"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm border-2 border-red-500 group-hover:border-blue-700 transition-colors overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Abegaz Motors Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className={`font-black text-lg sm:text-xl tracking-tight leading-none group-hover:text-red-500 transition-colors ${
              isHome ? 'text-white drop-shadow-md' : 'text-blue-900'
            }`}>
              አበጋዝ ሞተርስ ኢንጂነሪንግ
            </div>
            <div className={`text-[10px] sm:text-xs font-black tracking-wider uppercase mt-0.5 ${
              isHome ? 'text-red-400' : 'text-red-600'
            }`}>
              Abegaz Motors Engineering
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-xl text-sm font-extrabold transition-all duration-200 ${
                  isActive 
                    ? (isHome ? 'text-white bg-red-600 shadow-md' : 'text-red-600 bg-red-50 border border-red-200 shadow-2xs')
                    : (isHome ? 'text-white/90 hover:text-white hover:bg-white/15' : 'text-blue-700 hover:text-red-600 hover:bg-blue-50/60')
                }`}
              >
                {locale === 'am' ? link.labelAm : link.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Pill */}
          <button
            onClick={() => setLocale(locale === 'am' ? 'en' : 'am')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black transition-all shadow-2xs ${
              isHome 
                ? 'border-white/25 text-white bg-white/10 hover:bg-white/20 hover:text-white' 
                : 'border-slate-300 hover:border-red-500 text-blue-700 bg-white hover:text-red-600'
            }`}
            title="ቋንቋ ይቀይሩ / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span>{locale === 'am' ? 'EN' : 'አማ'}</span>
          </button>

          {/* Account Icon */}
          <button
            onClick={() => handleNavClick('account')}
            className={`p-2.5 rounded-xl border transition-all shadow-2xs ${
              isHome 
                ? 'border-white/25 text-white bg-white/10 hover:bg-white/20'
                : (currentView === 'account' ? 'bg-red-50 border-red-500 text-red-600' : 'border-slate-300 hover:border-red-500 text-blue-700 bg-white hover:text-red-600 hover:bg-red-50')
            }`}
            title="የደንበኛ መለያ / Customer Account"
          >
            <UserIcon className="w-4 h-4" />
          </button>

          {/* Book Appointment CTA Button */}
          <button
            onClick={() => handleNavClick('book')}
            className="hidden sm:inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-md hover:shadow-lg transition-all active:scale-98"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border transition-colors ${
              isHome 
                ? 'text-white hover:text-red-400 bg-white/10 border-white/20' 
                : 'text-blue-700 hover:text-red-600 hover:bg-blue-50 border-slate-300'
            }`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-18 bg-white z-50 flex flex-col p-6 overflow-y-auto animate-fade-in border-t border-slate-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`h-14 px-4 rounded-xl flex items-center justify-between text-base font-extrabold border transition-all ${
                  currentView === link.id
                    ? 'bg-red-50 text-red-600 border-red-300 shadow-xs'
                    : 'bg-white text-blue-700 border-slate-200 hover:bg-blue-50'
                }`}
              >
                <span>{locale === 'am' ? link.labelAm : link.labelEn}</span>
                <span className="text-red-500 text-lg">›</span>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
            <button
              onClick={() => handleNavClick('account')}
              className="w-full h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
            >
              <UserIcon className="w-4 h-4 text-red-600" />
              <span>{locale === 'am' ? 'የኔ ቀጠሮዎች / መለያ' : 'My Account & Bookings'}</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
            >
              <span>Admin Dashboard</span>
              {pendingCount > 0 && (
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-black">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('staff')}
              className="w-full h-12 rounded-xl bg-slate-800 text-slate-200 font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors"
            >
              <span>Staff Workshop Portal</span>
            </button>

            <button
              onClick={() => handleNavClick('book')}
              className="w-full h-13 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-base shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <Calendar className="w-5 h-5 text-white" />
              <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
