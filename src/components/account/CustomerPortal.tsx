import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';
import { 
  Calendar, 
  Car, 
  Clock, 
  Send, 
  Check, 
  X, 
  AlertCircle, 
  ChevronRight, 
  User as UserIcon, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Navigation,
  ArrowRight,
  Bell,
  MessageSquare,
  Plus,
  Home,
  FileText,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Smartphone,
  Monitor,
  Sparkles,
  MapPin,
  CalendarPlus
} from 'lucide-react';
import { Button } from '../common/Button';
import { Appointment } from '../../types';
import { WORKSHOP_INFO } from '../../lib/constants';

export const CustomerPortal: React.FC = () => {
  const { 
    locale, 
    setCurrentView, 
    appointments, 
    user, 
    isTelegramConnected, 
    connectTelegram, 
    disconnectTelegram,
    showToast,
    logoutUser,
    setLocale
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'cars' | 'messages' | 'profile'>('overview');
  const [devicePreview, setDevicePreview] = useState<'responsive' | 'mobile'>('responsive');
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(appointments[0] || null);
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [newCarMake, setNewCarMake] = useState('Toyota');
  const [newCarModel, setNewCarModel] = useState('Corolla');
  const [newCarPlate, setNewCarPlate] = useState('AA-2-D99881');

  // Customer Cars list
  const [myCars, setMyCars] = useState([
    { id: 'car-1', make: 'Toyota', model: 'Vitz', plate: 'AA-12345', year: 2016, lastService: 'Oct 2026' },
    { id: 'car-2', make: 'Suzuki', model: 'Dzire', plate: 'AA-2-C67890', year: 2021, lastService: 'Sep 2026' }
  ]);

  const approvedApt = appointments.find(a => a.status === 'approved') || appointments[0];
  const completedApts = appointments.filter(a => a.status === 'completed');

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCarPlate) return;
    setMyCars(prev => [
      ...prev, 
      { id: `car-${Date.now()}`, make: newCarMake, model: newCarModel, plate: newCarPlate, year: 2020, lastService: 'New' }
    ]);
    setShowAddCarModal(false);
    showToast(locale === 'am' ? 'መኪና በተሳካ ሁኔታ ተመዝግቧል' : 'Car registered successfully', 'success');
  };

  // 5-dot status tracker steps
  const trackerSteps = [
    { key: 'sent', labelAm: 'ተልኳል', labelEn: 'Sent', time: '09:41' },
    { key: 'reviewing', labelAm: 'በግምገማ ላይ', labelEn: 'Reviewing', time: '09:50' },
    { key: 'approved', labelAm: 'ጸድቋል', labelEn: 'Approved', time: '10:02' },
    { key: 'in_progress', labelAm: 'በጥገና ላይ', labelEn: 'In Progress', time: '--:--' },
    { key: 'completed', labelAm: 'ተጠናቋል', labelEn: 'Completed', time: '--:--' }
  ];

  const content = (
    <div className="flex flex-col lg:flex-row min-h-screen bg-mist">
      
      {/* 1. DESKTOP LEFT SIDEBAR (white, 240px, thin right border) */}
      <aside className="hidden lg:flex w-60 bg-white border-r border-line flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Logo */}
          <div 
            onClick={() => setCurrentView('home')}
            className="p-5 border-b border-line flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 transition-colors"
            title="Return to Home Website"
          >
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center text-orange-signal font-black text-sm">
              ⚙️
            </div>
            <div>
              <div className="text-xs font-black tracking-tight text-navy leading-none">
                ABEGAZ MOTORS
              </div>
              <div className="text-[10px] text-muted tracking-wider uppercase font-semibold">
                Customer Portal
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {[
              { id: 'overview', labelAm: 'አጠቃላይ እይታ', labelEn: 'Overview', icon: Home },
              { id: 'appointments', labelAm: 'የኔ ቀጠሮዎች', labelEn: 'My appointments', icon: Calendar, count: appointments.length },
              { id: 'cars', labelAm: 'የኔ መኪኖች', labelEn: 'My cars', icon: Car, count: myCars.length },
              { id: 'messages', labelAm: 'መልእክቶች', labelEn: 'Messages', icon: MessageSquare, count: 2, countColor: 'bg-orange-signal text-navy' },
              { id: 'profile', labelAm: 'መገለጫ', labelEn: 'Profile', icon: UserIcon }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-card text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-orange-tint text-navy font-extrabold shadow-2xs'
                      : 'text-slate-600 hover:bg-mist hover:text-navy'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-orange-signal rounded-r" />
                    )}
                    <Icon className={`w-4 h-4 ${isActive ? 'text-orange-deep' : 'text-slate-500'}`} />
                    <span>{locale === 'am' ? item.labelAm : item.labelEn}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${item.countColor || 'bg-slate-100 text-slate-700'}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Support Card & Log out */}
        <div className="p-3 border-t border-line space-y-3">
          <div className="p-3.5 rounded-card bg-mist border border-line text-xs">
            <p className="font-bold text-navy mb-1">
              {locale === 'am' ? 'እርዳታ ይፈልጋሉ?' : 'Need help?'}
            </p>
            <p className="text-[11px] text-muted mb-3">
              {locale === 'am' ? 'ቀጠሮ ለመቀየር ወይም ጥያቄ ለመጠየቅ ይደውሉልን።' : 'Contact workshop directly to modify active slot.'}
            </p>
            <div className="flex flex-col gap-1.5">
              <a
                href={`tel:${WORKSHOP_INFO.phoneRaw}`}
                className="w-full py-1.5 px-2.5 rounded-btn bg-white hover:bg-slate-100 text-navy border border-line font-bold flex items-center justify-center gap-1.5 text-[11px] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-orange-deep" />
                <span>{WORKSHOP_INFO.phone}</span>
              </a>
              <a
                href="https://t.me/AbegazMotors"
                target="_blank"
                rel="noreferrer"
                className="w-full py-1.5 px-2.5 rounded-btn bg-[#229ED9] hover:bg-[#1E88C7] text-white font-bold flex items-center justify-center gap-1.5 text-[11px] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram @AbegazMotors</span>
              </a>
            </div>
          </div>

          <button
            onClick={() => {
              logoutUser();
              setCurrentView('home');
            }}
            className="w-full px-3 py-2 text-xs font-bold text-slate-500 hover:text-red-600 flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{locale === 'am' ? 'ውጣ (Log out)' : 'Log out'}</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR: "Hello, Dawit 👋", Bell with count, Language, "Book appointment" */}
        <header className="h-16 bg-white border-b border-line px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Mobile Logo Mark */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-navy flex items-center justify-center text-orange-signal font-black text-xs">
                ⚙️
              </div>
              <span className="font-extrabold text-navy text-xs tracking-tight">ABEGAZ</span>
            </div>

            <div className="hidden sm:block">
              <h1 className="text-base font-extrabold text-navy flex items-center gap-1.5">
                <span>{locale === 'am' ? 'ሰላም፣ ዳዊት' : 'Hello, Dawit'}</span>
                <span className="text-sm">👋</span>
              </h1>
              <p className="text-[11px] text-muted">
                {locale === 'am' ? 'የአበጋዝ ሞተርስ ደንበኛ ዳሽቦርድ' : 'Customer Operations Console v2'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              onClick={() => setLocale(locale === 'am' ? 'en' : 'am')}
              className="px-2.5 py-1 rounded-full bg-mist border border-line text-[11px] font-bold text-navy hover:bg-slate-200 transition-colors"
            >
              {locale === 'am' ? 'EN' : 'አማ'}
            </button>

            {/* Notification Bell with Count Pill */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationPopover(!showNotificationPopover)}
                className="w-9 h-9 rounded-full bg-mist hover:bg-slate-200 flex items-center justify-center text-navy transition-colors relative"
              >
                <Bell className="w-4 h-4 text-slate-700" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-orange-signal text-navy font-black text-[10px] flex items-center justify-center shadow-xs">
                  2
                </span>
              </button>

              {/* Notification Popover Dropdown */}
              {showNotificationPopover && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-card shadow-2xl border border-line p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-line mb-2">
                    <span className="font-extrabold text-xs text-navy">
                      {locale === 'am' ? 'ማሳወቂያዎች' : 'Notifications'}
                    </span>
                    <span className="text-[10px] text-orange-deep font-bold bg-orange-tint px-2 py-0.5 rounded-full">
                      2 አዲስ
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-emerald-50 border border-emerald-100">
                      <p className="font-bold text-emerald-900 text-[11px]">
                        ✔ የቀጠሮ ማረጋገጫ (Approved)
                      </p>
                      <p className="text-[10px] text-emerald-800 mt-0.5">
                        ቀጠሮ ABG-2026-0042 ጸድቋል። በኢሜይል እና በቴሌግራም ዝርዝሩ ተልኳል።
                      </p>
                      <span className="text-[9px] text-emerald-600 block mt-1">ከ 15 ደቂቃ በፊት</span>
                    </div>
                    <div className="p-2 rounded bg-slate-50 border border-slate-200">
                      <p className="font-bold text-navy text-[11px]">
                        ጥያቄዎ ደርሶናል (Request Received)
                      </p>
                      <p className="text-[10px] text-muted mt-0.5">
                        የብሬክ ሲስተም ሰርቪስ ጥያቄዎ ለቴክኒሻን ተልኳል።
                      </p>
                      <span className="text-[9px] text-slate-400 block mt-1">ዛሬ 09:41</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Orange "Book appointment" button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => setCurrentView('book')}
              className="h-9 px-3 text-xs"
            >
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book appointment'}</span>
            </Button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-navy text-orange-signal font-extrabold text-xs flex items-center justify-center border-2 border-orange-signal shadow-xs">
              DK
            </div>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6 pb-24 lg:pb-12">
          
          {/* Mobile Greetings (shown on small screens) */}
          <div className="sm:hidden flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-navy">
                {locale === 'am' ? 'ሰላም፣ ዳዊት' : 'Hello, Dawit'} 👋
              </h2>
              <p className="text-xs text-muted">
                {locale === 'am' ? 'የመኪናዎን ቀጠሮ እዚህ ይከታተሉ' : 'Track your vehicle status & history'}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-line text-[11px] font-bold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{locale === 'am' ? 'ቀጥታ' : 'Live'}</span>
            </div>
          </div>

          {/* 2. GREEN BANNER: "✔ Your appointment was approved — details sent to your email and Telegram" */}
          <div className="p-3.5 sm:p-4 rounded-card bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs font-bold text-sm">
                ✔
              </div>
              <div>
                <p className="text-xs sm:text-sm font-extrabold leading-snug">
                  {locale === 'am' 
                    ? 'ቀጠሮዎ ጸድቋል — ዝርዝሩ ወደ ኢሜይልዎና ቴሌግራምዎ ተልኳል።' 
                    : 'Your appointment was approved just now. We sent the details to your email and Telegram.'}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-emerald-700 mt-0.5">
                  <span className="flex items-center gap-1 font-semibold">
                    <Mail className="w-3 h-3 text-emerald-600" /> dawit@email.com ✔
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Send className="w-3 h-3 text-[#229ED9]" /> Telegram Delivered ✔
                  </span>
                </div>
              </div>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-bold bg-white text-emerald-800 px-2 py-1 rounded-md border border-emerald-200 shrink-0">
              ABG-2026-0042
            </span>
          </div>

          {/* 3. HERO "NEXT APPOINTMENT" CARD (Graphite Navy, blueprint grid) */}
          <div className="rounded-card bg-navy text-white p-5 sm:p-6 border border-slate-700 shadow-xl relative overflow-hidden bg-blueprint-dark">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/80">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-signal">
                    {locale === 'am' ? 'ቀጣይ ተረኛ ቀጠሮ' : 'Next Appointment'}
                  </span>
                  <span className="text-[11px] font-bold bg-orange-signal text-navy px-2 py-0.5 rounded-full shadow-xs">
                    {locale === 'am' ? 'ከ 6 ቀናት በኋላ' : 'in 6 days'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                  Thu 12 Nov · 10:00 AM
                </h2>
                <p className="text-xs text-slate-300">
                  {locale === 'am' ? 'ህዳር 3 ቀን 2019 ዓ.ም. (4:00 ጠዋት)' : 'Ethiopian Calendar: Hidar 3, 2019'}
                </p>
              </div>

              {/* Action Buttons: "Directions" (orange) and "Calendar" (outlined) */}
              <div className="flex items-center gap-2.5">
                <a
                  href={WORKSHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-btn bg-orange-signal text-navy font-extrabold text-xs hover:bg-orange-400 transition-all flex items-center gap-1.5 shadow-md active:scale-98"
                  title={WORKSHOP_INFO.addressEn}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{locale === 'am' ? 'አቅጣጫ (Directions)' : 'Directions'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => showToast(locale === 'am' ? 'ወደ ካላንደር ተጨምሯል (.ics)' : 'Added to calendar (.ics)', 'info')}
                  className="px-3.5 py-2.5 rounded-btn bg-transparent border border-white/60 hover:bg-white/10 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>{locale === 'am' ? 'ካላንደር' : 'Calendar'}</span>
                </button>
              </div>
            </div>

            {/* Vehicle, Service & Address Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-orange-signal shrink-0 border border-slate-700">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">
                    {locale === 'am' ? 'ተሽከርካሪ' : 'Vehicle'}
                  </span>
                  <span className="font-extrabold text-white text-sm">
                    Toyota Vitz (2016)
                  </span>
                  <span className="inline-block mt-0.5 bg-white text-navy font-mono font-black text-[10px] px-1.5 py-0.2 rounded border border-slate-400">
                    🇪🇹 AA-12345
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-orange-signal shrink-0 border border-slate-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">
                    {locale === 'am' ? 'የተጠየቀ አገልግሎት' : 'Service'}
                  </span>
                  <span className="font-extrabold text-white text-sm">
                    Brake System Service
                  </span>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {locale === 'am' ? 'የብሬክ ዲስክ ፍተሻና የፓድ ቅየራ' : 'Front & rear pad renewal + rotor audit'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-orange-signal shrink-0 border border-slate-700">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">
                    {locale === 'am' ? 'የወርክሾፕ አድራሻ' : 'Workshop Location'}
                  </span>
                  <span className="font-extrabold text-white text-sm">
                    ነፋስ ስልክ-ላፍቶ ወርክሾፕ
                  </span>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    ከአሌክሳንደር ፑሽኪን መንገድ፣ ቄራ አካባቢ
                  </p>
                </div>
              </div>
            </div>

            {/* Compact 5-Dot Status Tracker (Sent → Reviewing → Approved (current) → In Progress → Completed) */}
            <div className="pt-4 border-t border-slate-700/80">
              <div className="flex items-center justify-between mb-3 text-[11px]">
                <span className="font-bold text-slate-300">
                  {locale === 'am' ? 'የቀጠሮ ሂደት መከታተያ:' : 'Live Status Progression:'}
                </span>
                <span className="font-extrabold text-orange-signal">
                  {locale === 'am' ? 'ደረጃ 3 ከ 5 — ጸድቋል (Approved)' : 'Stage 3 of 5 — Approved'}
                </span>
              </div>

              {/* Horizontal Stepper */}
              <div className="grid grid-cols-5 gap-1 sm:gap-2">
                {trackerSteps.map((s, idx) => {
                  const isCurrent = s.key === 'approved';
                  const isPast = idx < 2;
                  return (
                    <div key={s.key} className="space-y-1.5 text-center">
                      <div className="relative flex items-center justify-center">
                        <div 
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                            isCurrent
                              ? 'bg-orange-signal text-navy ring-4 ring-orange-500/30 font-black'
                              : isPast
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-800 border border-slate-700 text-slate-400'
                          }`}
                        >
                          {isPast ? '✔' : isCurrent ? '●' : idx + 1}
                        </div>
                      </div>
                      <p className={`text-[10px] sm:text-[11px] font-bold leading-tight ${
                        isCurrent ? 'text-orange-signal' : isPast ? 'text-slate-200' : 'text-slate-500'
                      }`}>
                        {locale === 'am' ? s.labelAm : s.labelEn}
                      </p>
                      <span className="text-[9px] text-slate-400 block font-mono">
                        {s.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. HORIZONTAL SWIPE ROW OF QUICK ACTIONS */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted mb-3">
              {locale === 'am' ? 'ፈጣን ድርጊቶች' : 'Quick Actions'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 overflow-x-auto pb-1">
              {/* Book new */}
              <button
                onClick={() => setCurrentView('book')}
                className="p-3.5 rounded-card bg-orange-signal text-navy font-extrabold text-left hover:bg-orange-400 transition-all shadow-sm active:scale-98 flex flex-col justify-between h-24"
              >
                <Plus className="w-5 h-5" />
                <div>
                  <span className="text-xs font-black block">
                    {locale === 'am' ? 'አዲስ ቀጠሮ' : 'Book new'}
                  </span>
                  <span className="text-[10px] opacity-80">
                    {locale === 'am' ? 'በ 2 ደቂቃ ውስጥ' : 'Select service ›'}
                  </span>
                </div>
              </button>

              {/* Book again */}
              <button
                onClick={() => {
                  showToast(locale === 'am' ? 'የብሬክ ሰርቪስ ተመርጧል' : 'Brake Service reselected', 'info');
                  setCurrentView('book');
                }}
                className="p-3.5 rounded-card bg-white border border-line text-navy font-bold text-left hover:border-orange-signal transition-all shadow-2xs active:scale-98 flex flex-col justify-between h-24"
              >
                <Sparkles className="w-5 h-5 text-orange-deep" />
                <div>
                  <span className="text-xs font-black block">
                    {locale === 'am' ? 'እንደገና ያዙ' : 'Book again'}
                  </span>
                  <span className="text-[10px] text-muted">
                    Brake Service
                  </span>
                </div>
              </button>

              {/* Telegram */}
              <a
                href="https://t.me/AbegazMotors"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-card bg-[#229ED9] text-white font-bold text-left hover:bg-[#1C8AC0] transition-all shadow-2xs active:scale-98 flex flex-col justify-between h-24"
              >
                <Send className="w-5 h-5" />
                <div>
                  <span className="text-xs font-black block">
                    Telegram
                  </span>
                  <span className="text-[10px] text-white/80">
                    @AbegazMotors
                  </span>
                </div>
              </a>

              {/* Call */}
              <a
                href={`tel:${WORKSHOP_INFO.phoneRaw}`}
                className="p-3.5 rounded-card bg-white border border-line text-navy font-bold text-left hover:border-orange-signal transition-all shadow-2xs active:scale-98 flex flex-col justify-between h-24"
              >
                <Phone className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="text-xs font-black block">
                    {locale === 'am' ? 'በስልክ ደውል' : 'Direct Call'}
                  </span>
                  <span className="text-[10px] text-muted font-mono">
                    {WORKSHOP_INFO.phone}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* TELEGRAM BANNER (If not connected) */}
          {!isTelegramConnected && (
            <div className="p-4 rounded-card bg-blue-50 border border-blue-200 text-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#229ED9] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-blue-950">
                    {locale === 'am' ? 'ፈጣን የቀጠሮ ማሳወቂያዎችን በቴሌግራም ያግኙ' : 'Get instant updates on Telegram'}
                  </h4>
                  <p className="text-[11px] text-blue-800 mt-0.5">
                    {locale === 'am' 
                      ? 'ቀጠሮዎ ሲጸድቅ፣ የጥገና ሁኔታው ሲቀየር ወዲያውኑ መልእክት ይደርስዎታል።' 
                      : 'Free real-time notification alerts whenever your car enters bay or is ready for pickup.'}
                  </p>
                </div>
              </div>
              <button
                onClick={connectTelegram}
                className="px-4 py-2 rounded-btn bg-[#229ED9] hover:bg-[#1988BF] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{locale === 'am' ? 'ቴሌግራም አገናኝ (Connect)' : 'Connect Telegram'}</span>
              </button>
            </div>
          )}

          {/* 5. "MY CARS" - HORIZONTAL SWIPE CARDS */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted">
                {locale === 'am' ? 'የተመዘገቡ መኪኖቼ (My Cars)' : 'My Registered Vehicles'}
              </h3>
              <button
                onClick={() => setShowAddCarModal(true)}
                className="text-xs font-bold text-orange-deep hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>{locale === 'am' ? 'መኪና ጨምር' : 'Add a car'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {myCars.map((car) => (
                <div 
                  key={car.id}
                  className="bg-white p-4 rounded-card border border-line shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-full bg-orange-tint text-orange-deep flex items-center justify-center">
                        <Car className="w-4 h-4" />
                      </div>
                      <span className="bg-slate-100 text-slate-800 font-mono font-bold text-xs px-2 py-0.5 rounded border border-line">
                        🇪🇹 {car.plate}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-navy text-sm">
                      {car.make} {car.model}
                    </h4>
                    <p className="text-[11px] text-muted mt-0.5">
                      {car.year} • {locale === 'am' ? 'የመጨረሻ ሰርቪስ:' : 'Last Service:'} {car.lastService}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                    <button
                      onClick={() => {
                        showToast(locale === 'am' ? `${car.make} ${car.model} ተመርጧል` : `${car.make} selected for booking`, 'info');
                        setCurrentView('book');
                      }}
                      className="text-xs font-extrabold text-orange-deep hover:underline flex items-center gap-1"
                    >
                      <span>{locale === 'am' ? 'ለዚህ መኪና ቀጠሮ ያዝ' : 'Book for this car'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Dashed "Add a car" card */}
              <button
                onClick={() => setShowAddCarModal(true)}
                className="h-full min-h-[130px] rounded-card border-2 border-dashed border-slate-300 hover:border-orange-signal bg-slate-50/50 hover:bg-orange-50/20 p-4 flex flex-col items-center justify-center text-center transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-line flex items-center justify-center text-muted group-hover:text-orange-deep mb-2 shadow-2xs">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-xs font-extrabold text-navy group-hover:text-orange-deep">
                  {locale === 'am' ? '+ አዲስ መኪና መዝግብ' : '+ Add a car'}
                </span>
                <span className="text-[10px] text-muted mt-0.5">
                  {locale === 'am' ? 'የሰሌዳ ቁጥርና ሞዴል' : 'Plate number & model'}
                </span>
              </button>
            </div>
          </div>

          {/* 6. "MESSAGES WE SENT YOU" - TIMELINE OF AUTOMATIC NOTIFICATIONS */}
          <div className="bg-white rounded-card p-5 border border-line shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted">
                {locale === 'am' ? 'የተላኩ አውቶማቲክ መልእክቶች' : 'Messages We Sent You'}
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% Delivered
              </span>
            </div>

            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-line">
              <div className="relative pl-7">
                <div className="absolute left-1.5 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <span className="font-extrabold text-navy">
                    {locale === 'am' ? 'ቀጠሮዎ ጸድቋል (Appointment Approved)' : 'Appointment Approved — Confirmed'}
                  </span>
                  <span className="text-[11px] text-muted font-mono">ዛሬ 10:02 AM</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-600 mt-1">
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
                    <Mail className="w-3 h-3 text-emerald-600" /> Email ✔
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#229ED9]">
                    <Send className="w-3 h-3 text-[#229ED9]" /> Telegram ✔
                  </span>
                  <span className="text-slate-400">• ref: ABG-2026-0042</span>
                </div>
              </div>

              <div className="relative pl-7">
                <div className="absolute left-1.5 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-slate-400 ring-4 ring-white" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    {locale === 'am' ? 'የቀጠሮ ጥያቄ ደርሶናል (Request Received)' : 'Request Received — Under Review'}
                  </span>
                  <span className="text-[11px] text-muted font-mono">ዛሬ 09:41 AM</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                  <span className="inline-flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-500" /> Email ✔
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Send className="w-3 h-3 text-slate-500" /> Telegram ✔
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 7. SMALL "HISTORY" LIST WITH COMPLETED APPOINTMENTS */}
          <div className="bg-white rounded-card p-5 border border-line shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted">
                {locale === 'am' ? 'የቀደሙ የተጠናቀቁ ጥገናዎች' : 'Service History'}
              </h3>
              <span className="text-xs text-muted">
                {completedApts.length} {locale === 'am' ? 'የተጠናቀቁ' : 'Completed'}
              </span>
            </div>

            <div className="divide-y divide-line text-xs">
              {completedApts.map((apt) => (
                <div key={apt.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-mist flex items-center justify-center text-slate-600 font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold text-navy">
                        {apt.serviceName}
                      </p>
                      <p className="text-[11px] text-muted">
                        {apt.vehicleMake} {apt.vehicleModel} [{apt.vehiclePlate}] • {apt.requestedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={apt.status} locale={locale} />
                    <button
                      onClick={() => setSelectedApt(apt)}
                      className="text-xs font-bold text-orange-deep hover:underline"
                    >
                      {locale === 'am' ? 'ዝርዝር ›' : 'Details ›'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>

        {/* 8. MOBILE BOTTOM NAVIGATION (5 items: Home, Appointments, Raised Center "+ Book", Messages, Profile) */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-line px-2 py-1.5 z-40 shadow-2xl flex items-center justify-around">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              activeTab === 'overview' ? 'text-orange-deep' : 'text-slate-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>{locale === 'am' ? 'መነሻ' : 'Home'}</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              activeTab === 'appointments' ? 'text-orange-deep' : 'text-slate-500'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>{locale === 'am' ? 'ቀጠሮዎች' : 'Bookings'}</span>
          </button>

          {/* Raised Center Orange Button: "+ Book" */}
          <button
            onClick={() => setCurrentView('book')}
            className="-mt-5 w-12 h-12 rounded-full bg-orange-signal text-navy shadow-lg flex items-center justify-center font-black active:scale-95 transition-all border-4 border-white"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold relative ${
              activeTab === 'messages' ? 'text-orange-deep' : 'text-slate-500'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>{locale === 'am' ? 'መልእክት' : 'Messages'}</span>
            <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-orange-signal" />
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              activeTab === 'profile' ? 'text-orange-deep' : 'text-slate-500'
            }`}
          >
            <UserIcon className="w-5 h-5" />
            <span>{locale === 'am' ? 'መገለጫ' : 'Profile'}</span>
          </button>
        </nav>
      </div>

      {/* Add Car Modal */}
      {showAddCarModal && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-card max-w-md w-full p-6 shadow-2xl border border-line animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
              <h3 className="font-extrabold text-navy text-sm">
                {locale === 'am' ? 'አዲስ ተሽከርካሪ ይመዝግቡ' : 'Register New Vehicle'}
              </h3>
              <button
                onClick={() => setShowAddCarModal(false)}
                className="w-7 h-7 rounded-full bg-mist flex items-center justify-center text-slate-500 hover:text-navy"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCar} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {locale === 'am' ? 'የመኪናው አምራች (Make)' : 'Vehicle Make'}
                </label>
                <input
                  type="text"
                  value={newCarMake}
                  onChange={(e) => setNewCarMake(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-line focus:border-orange-signal outline-hidden"
                  placeholder="e.g. Toyota, Suzuki, Hyundai"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {locale === 'am' ? 'የመኪናው ሞዴል (Model)' : 'Vehicle Model'}
                </label>
                <input
                  type="text"
                  value={newCarModel}
                  onChange={(e) => setNewCarModel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-line focus:border-orange-signal outline-hidden"
                  placeholder="e.g. Vitz, Dzire, Tucson"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {locale === 'am' ? 'የሰሌዳ ቁጥር (Ethiopian Plate)' : 'Plate Number'}
                </label>
                <input
                  type="text"
                  value={newCarPlate}
                  onChange={(e) => setNewCarPlate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-line focus:border-orange-signal outline-hidden font-mono"
                  placeholder="AA-2-XXXXX"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddCarModal(false)}
                >
                  {locale === 'am' ? 'ይቅር' : 'Cancel'}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                >
                  {locale === 'am' ? 'መዝግብ' : 'Save Vehicle'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  return content;
};
