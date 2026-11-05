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

  const navLinks = [
    { id: 'home', labelAm: 'መነሻ', labelEn: 'Home' },
    { id: 'services', labelAm: 'አገልግሎቶች', labelEn: 'Services' },
    { id: 'packages', labelAm: 'ጥቅሎች', labelEn: 'Packages' },
    { id: 'gallery', labelAm: 'ጋለሪ', labelEn: 'Gallery' },
    { id: 'track', labelAm: 'ቀጠሮ መከታተያ', labelEn: 'Track' },
    { id: 'about', labelAm: 'ስለ እኛ', labelEn: 'About Us' },
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
    <header className="sticky top-0 z-40 bg-white border-b border-line shadow-sm">
      {/* Top Info Bar for PC only */}
      <div className="hidden lg:block bg-navy text-slate-300 text-xs py-2 px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`tel:${WORKSHOP_INFO.phoneRaw}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-orange-signal" />
              <span>{WORKSHOP_INFO.phone}</span>
            </a>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Clock className="w-3.5 h-3.5 text-orange-signal" />
              <span>{locale === 'am' ? WORKSHOP_INFO.hoursScheduleAm : WORKSHOP_INFO.hoursScheduleEn}</span>
            </span>
            <a 
              href={WORKSHOP_INFO.googleMapsUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1.5 hover:text-white transition-colors group"
              title="Open Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-signal group-hover:animate-bounce" />
              <span>{locale === 'am' ? WORKSHOP_INFO.addressAm : WORKSHOP_INFO.addressEn} ({WORKSHOP_INFO.plusCode})</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavClick('admin')}
              className={`hover:text-white font-medium flex items-center gap-1 ${currentView === 'admin' ? 'text-orange-signal' : ''}`}
            >
              <span>Admin Portal</span>
              {pendingCount > 0 && (
                <span className="bg-orange-signal text-navy text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => handleNavClick('staff')}
              className={`hover:text-white font-medium ${currentView === 'staff' ? 'text-orange-signal' : ''}`}
            >
              Staff Portal
            </button>
            <span className="text-slate-600">|</span>
            {/* Live Notification Simulator Trigger */}
            <button
              onClick={toggleNotificationSimulator}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-orange-signal px-2 py-0.5 rounded text-[11px] border border-slate-700"
              title="Open Live Telegram & Email Simulator"
            >
              <Bell className="w-3 h-3 animate-pulse" />
              <span>Demo Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 lg:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-3 select-none group"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-btn bg-white flex items-center justify-center p-1 shadow-sm border border-slate-200 group-hover:border-orange-signal transition-colors overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Abegaz Motors Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to stylized mark if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="font-extrabold text-base sm:text-lg text-navy tracking-tight leading-none">
              አበጋዝ ሞተርስ
            </div>
            <div className="text-[10px] sm:text-xs font-semibold text-muted tracking-wider uppercase">
              Engineering & Care
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
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'text-orange-deep font-bold bg-orange-tint' 
                    : 'text-navy hover:text-orange-deep hover:bg-mist'
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-line hover:border-muted text-xs font-bold text-navy bg-white transition-all shadow-sm"
            title="ቋንቋ ይቀይሩ / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-orange-signal" />
            <span>{locale === 'am' ? 'EN' : 'አማ'}</span>
          </button>

          {/* Account Icon */}
          <button
            onClick={() => handleNavClick('account')}
            className={`p-2 rounded-lg border border-line hover:bg-mist text-navy transition-all ${currentView === 'account' ? 'bg-orange-tint border-orange-signal text-orange-deep' : ''}`}
            title="የደንበኛ መለያ / Customer Account"
          >
            <UserIcon className="w-4 h-4" />
          </button>

          {/* Book Appointment CTA Button */}
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleNavClick('book')}
            className="hidden sm:inline-flex items-center gap-2 shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
          </Button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-navy hover:bg-mist border border-line"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-18 bg-white z-50 flex flex-col p-6 overflow-y-auto animate-fade-in border-t border-line">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`h-14 px-4 rounded-btn flex items-center justify-between text-base font-semibold border ${
                  currentView === link.id
                    ? 'bg-orange-tint text-orange-deep border-orange-200'
                    : 'bg-white text-navy border-line hover:bg-mist'
                }`}
              >
                <span>{locale === 'am' ? link.labelAm : link.labelEn}</span>
                <span className="text-muted text-sm">›</span>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-line space-y-3">
            <button
              onClick={() => handleNavClick('account')}
              className="w-full h-12 rounded-btn bg-mist border border-line text-navy font-semibold flex items-center justify-center gap-2"
            >
              <UserIcon className="w-4 h-4 text-orange-signal" />
              <span>{locale === 'am' ? 'የኔ ቀጠሮዎች / መለያ' : 'My Account & Bookings'}</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full h-12 rounded-btn bg-slate-900 text-white font-semibold flex items-center justify-center gap-2"
            >
              <span>Admin Dashboard</span>
              {pendingCount > 0 && (
                <span className="bg-orange-signal text-navy text-xs px-2 py-0.5 rounded-full font-bold">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('staff')}
              className="w-full h-12 rounded-btn bg-slate-800 text-slate-200 font-semibold flex items-center justify-center gap-2"
            >
              <span>Staff Workshop Portal</span>
            </button>

            <Button
              fullWidth
              variant="primary"
              size="lg"
              onClick={() => handleNavClick('book')}
              className="mt-2"
            >
              <Calendar className="w-5 h-5 mr-2" />
              <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
