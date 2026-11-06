import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Clock, MapPin, Globe, Menu, X, User as UserIcon, Calendar, Bell, Film, Play } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white border-b-2 border-slate-100 shadow-sm">
      {/* 1. Top Info Bar - Clean Pure White with Red & Blue accents for maximum readability */}
      <div className="hidden lg:block bg-slate-50 text-slate-700 text-xs py-2 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <div className="flex items-center gap-6">
            <a href="tel:+251975480808" className="flex items-center gap-1.5 text-blue-800 hover:text-red-600 transition-colors font-bold font-mono">
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>0975 48 08 08 / 011 465 1553</span>
            </a>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-blue-700" />
              <span>{locale === 'am' ? WORKSHOP_INFO.hoursScheduleAm : WORKSHOP_INFO.hoursScheduleEn}</span>
            </span>
            <a 
              href={WORKSHOP_INFO.googleMapsUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1.5 text-slate-700 hover:text-blue-700 transition-colors group"
              title="Open Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-red-600 group-hover:animate-bounce" />
              <span>{locale === 'am' ? 'አሌክሳንደር ፑሽኪን መንገድ፣ ቄራ፣ አዲስ አበባ' : WORKSHOP_INFO.addressEn} ({WORKSHOP_INFO.plusCode})</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Watch Workshop Video Trigger */}
            <button
              onClick={() => handleNavClick('gallery')}
              className="flex items-center gap-1.5 bg-blue-50 hover:bg-red-50 text-blue-800 hover:text-red-600 px-2.5 py-0.5 rounded text-[11px] font-black border border-blue-200 hover:border-red-300 transition-colors shadow-2xs"
              title="Watch Workshop Video"
            >
              <Film className="w-3 h-3 text-red-600" />
              <span>{locale === 'am' ? 'የወርክሾፕ ቪዲዮ' : 'Workshop Video'}</span>
            </button>
            <span className="text-slate-300">|</span>
            <button 
              onClick={() => handleNavClick('admin')}
              className={`hover:text-red-600 font-bold transition-colors flex items-center gap-1 ${currentView === 'admin' ? 'text-red-600' : 'text-blue-700'}`}
            >
              <span>Admin Portal</span>
              {pendingCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
            <span className="text-slate-300">|</span>
            <button 
              onClick={() => handleNavClick('staff')}
              className={`hover:text-red-600 font-bold transition-colors ${currentView === 'staff' ? 'text-red-600' : 'text-blue-700'}`}
            >
              Staff Portal
            </button>
            <span className="text-slate-300">|</span>
            {/* Live Notification Simulator Trigger */}
            <button
              onClick={toggleNotificationSimulator}
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-2 py-0.5 rounded text-[11px] font-bold border border-red-200 transition-colors"
              title="Open Live Telegram & Email Simulator"
            >
              <Bell className="w-3 h-3 text-red-600 animate-pulse" />
              <span>Demo Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar - Crisp Pure White Background with Bold Blue text and Red Logo accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 lg:h-20 flex items-center justify-between bg-white">
        
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
            <div className="font-black text-lg sm:text-xl text-blue-900 tracking-tight leading-none group-hover:text-red-600 transition-colors">
              አበጋዝ ሞተርስ ኢንጂነሪንግ
            </div>
            <div className="text-[10px] sm:text-xs font-black text-red-600 tracking-wider uppercase mt-0.5">
              Abegaz Motors Engineering
            </div>
          </div>
        </div>

        {/* Desktop Nav Links - Royal Blue Text, Crisp & Clear */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-xl text-sm font-extrabold transition-all duration-200 ${
                  isActive 
                    ? 'text-red-600 bg-red-50 border border-red-200 shadow-2xs' 
                    : 'text-blue-700 hover:text-red-600 hover:bg-blue-50/60'
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-red-500 text-xs font-black text-blue-700 bg-white hover:text-red-600 transition-all shadow-2xs"
            title="ቋንቋ ይቀይሩ / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-red-600" />
            <span>{locale === 'am' ? 'EN' : 'አማ'}</span>
          </button>

          {/* Account Icon */}
          <button
            onClick={() => handleNavClick('account')}
            className={`p-2.5 rounded-xl border border-slate-300 hover:border-red-500 hover:bg-red-50 text-blue-700 hover:text-red-600 transition-all shadow-2xs ${
              currentView === 'account' ? 'bg-red-50 border-red-500 text-red-600' : ''
            }`}
            title="የደንበኛ መለያ / Customer Account"
          >
            <UserIcon className="w-4 h-4" />
          </button>

          {/* Book Appointment CTA Button - Vivid Signboard Red for High Visibility */}
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
            className="lg:hidden p-2 rounded-xl text-blue-700 hover:text-red-600 hover:bg-blue-50 border border-slate-300"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6" />}
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
