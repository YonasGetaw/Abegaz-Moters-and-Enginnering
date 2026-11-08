import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';
import { 
  Phone, 
  Check, 
  Wrench, 
  CheckCheck, 
  Clock, 
  ArrowLeft,
  Calendar,
  User,
  Bell,
  Volume2,
  VolumeX,
  Send,
  AlertTriangle,
  QrCode,
  RotateCcw,
  Search,
  X,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Button } from '../common/Button';
import { Appointment, AppointmentStatus } from '../../types';
import { normalizeVehiclePlate } from '../../lib/vehicle';

export const StaffDashboard: React.FC = () => {
  const { 
    locale, 
    setCurrentView, 
    appointments, 
    updateAppointmentStatus, 
    showToast,
    user
  } = useApp();

  const [activeNav, setActiveNav] = useState<'today' | 'appointments' | 'schedule' | 'profile'>('today');
  const [appointmentsTab, setAppointmentsTab] = useState<'to_review' | 'today' | 'upcoming' | 'past'>('to_review');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationTab, setNotificationTab] = useState<'all' | 'requests'>('all');

  // Bottom sheets / Modals
  const [approveSheetApt, setApproveSheetApt] = useState<Appointment | null>(null);
  const [isApproveSuccess, setIsApproveSuccess] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyTelegram, setNotifyTelegram] = useState(true);
  
  const [rejectSheetApt, setRejectSheetApt] = useState<Appointment | null>(null);
  const [rejectReason, setRejectReason] = useState('Slot full (የሰዓት መደራረብ)');
  const [rejectCustomText, setRejectCustomText] = useState('');

  // Profile Telegram alerts toggles
  const [tgConnected, setTgConnected] = useState(true);
  const [alertNewRequests, setAlertNewRequests] = useState(true);
  const [alertAssignedToMe, setAlertAssignedToMe] = useState(true);

  // Filter queues
  const pendingApts = appointments.filter(a => a.status === 'pending');
  const todayApts = appointments.filter(a => a.status === 'approved' || a.status === 'in_progress');
  const completedToday = appointments.filter(a => a.status === 'completed');
  const nextCar = todayApts[0] || pendingApts[0] || null;

  const handleApproveConfirm = () => {
    if (!approveSheetApt) return;
    updateAppointmentStatus(approveSheetApt.id, 'approved', 'Engineer approved via Tablet Console');
    setIsApproveSuccess(true);
    showToast(locale === 'am' ? 'ቀጠሮው ጸድቋል — ደንበኛው ተነግሮታል' : 'Approved — customer notified', 'success');
  };

  const handleRejectConfirm = () => {
    if (!rejectSheetApt) return;
    const finalReason = rejectCustomText ? `${rejectReason}: ${rejectCustomText}` : rejectReason;
    updateAppointmentStatus(rejectSheetApt.id, 'rejected', finalReason);
    setRejectSheetApt(null);
    showToast(locale === 'am' ? 'ቀጠሮው ውድቅ ተደርጓል' : 'Appointment rejected', 'info');
  };

  const filteredQueueApts = appointments.filter(a => {
    if (appointmentsTab === 'to_review') return a.status === 'pending';
    if (appointmentsTab === 'today') return a.status === 'approved' || a.status === 'in_progress';
    if (appointmentsTab === 'upcoming') return a.status === 'approved';
    if (appointmentsTab === 'past') return a.status === 'completed' || a.status === 'rejected';
    return true;
  }).filter(a => {
    const q = searchQuery.toLowerCase();
    const plateQuery = normalizeVehiclePlate(searchQuery);
    return a.ref.toLowerCase().includes(q) || 
      a.customerName.toLowerCase().includes(q) || 
      normalizeVehiclePlate(a.vehiclePlate || '').includes(plateQuery);
  });

  return (
    <div className="flex h-screen bg-mist overflow-hidden text-navy select-none">
      
      {/* 1. LEFT RAIL (88px, Graphite Navy) */}
      <aside className="w-[88px] bg-navy flex flex-col items-center justify-between py-6 shrink-0 z-30 border-r border-slate-800">
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Logo Mark */}
          <div className="w-12 h-12 rounded-xl bg-orange-signal text-navy flex items-center justify-center font-black text-xl shadow-md">
            ⚙️
          </div>

          {/* Navigation Items (4 large icon + label items) */}
          <nav className="flex flex-col items-center gap-3 w-full px-2">
            {[
              { id: 'today', labelAm: 'ዛሬ', labelEn: 'Today', icon: Clock },
              { id: 'appointments', labelAm: 'ቀጠሮ', labelEn: 'Queue', icon: Calendar, count: pendingApts.length },
              { id: 'schedule', labelAm: 'ሰሌዳ', labelEn: 'Schedule', icon: Layers },
              { id: 'profile', labelAm: 'መገለጫ', labelEn: 'Profile', icon: User }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id as any)}
                  className={`w-full py-3 rounded-card flex flex-col items-center justify-center gap-1 transition-all relative ${
                    isActive 
                      ? 'bg-slate-800 text-white font-black shadow-inner' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-3 bottom-3 w-1.5 bg-orange-signal rounded-r" />
                  )}
                  <div className="relative">
                    <Icon className={`w-6 h-6 ${isActive ? 'text-orange-signal' : 'text-slate-400'}`} />
                    {item.count !== undefined && item.count > 0 && (
                      <span className="absolute -top-1 -right-2 bg-orange-signal text-navy font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold tracking-tight">
                    {locale === 'am' ? item.labelAm : item.labelEn}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Small "Staff" Badge and Avatar at Bottom */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => setCurrentView('home')}
            className="text-[10px] text-slate-400 hover:text-white font-bold mb-1 flex items-center gap-0.5"
            title="Exit to Portal"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>ውጣ</span>
          </button>
          <span className="text-[9px] font-black uppercase tracking-wider bg-slate-800 text-orange-signal px-2 py-0.5 rounded-full border border-slate-700">
            STAFF
          </span>
          <div className="w-10 h-10 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center border-2 border-orange-signal">
            SB
          </div>
        </div>
      </aside>

      {/* 2. MAIN TABLET AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* SLIDE-IN ALERT BANNER: "🔔 New request just arrived — Brake Service · Review" */}
        {isAlertVisible && (
          <div className="bg-orange-50 border-b border-orange-200 px-6 py-2.5 flex items-center justify-between text-navy animate-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-signal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-deep"></span>
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-navy">
                🔔 {locale === 'am' ? 'አዲስ የቀጠሮ ጥያቄ ደርሷል — የብሬክ ሲስተም ሰርቪስ (ABG-2026-0043)' : 'New request just arrived — Brake Service · Review'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveNav('appointments');
                  setAppointmentsTab('to_review');
                }}
                className="px-3 py-1 bg-orange-signal text-navy font-black text-xs rounded-full shadow-xs hover:bg-orange-400"
              >
                {locale === 'am' ? 'ገምግም (Review)' : 'Review'}
              </button>
              
              <button
                onClick={() => setIsSoundOn(!isSoundOn)}
                className="text-slate-500 hover:text-navy"
                title={isSoundOn ? 'Mute' : 'Unmute'}
              >
                {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-500" />}
              </button>

              <button
                onClick={() => setIsAlertVisible(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TOP BAR: Greeting "Hello Samuel" + Date + SHIFT PROGRESS RING + Bell */}
        <header className="h-18 bg-white border-b border-line px-6 sm:px-8 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy">
              {locale === 'am' ? 'ሰላም፣ ሳሙኤል (Samuel B.)' : 'Hello, Samuel'}
            </h1>
            <p className="text-xs text-muted">
              {locale === 'am' ? 'ሐሙስ ህዳር 3 ቀን 2019 ዓ.ም. · ነፋስ ስልክ-ላፍቶ ወርክሾፕ' : 'Thu 12 Nov 2026 · Nefas Silk-Lafto Workshop'}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ወርክሾፕ ክፍት ነው (Live Bay)</span>
            </div>

            {/* SHIFT PROGRESS RING "3 of 9 done" */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  {/* Track */}
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress (3 of 9 = 33%) */}
                  <path
                    className="text-orange-signal"
                    strokeDasharray="33, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[11px] font-black text-navy font-mono">
                  3/9
                </span>
              </div>
              <div className="hidden md:block">
                <span className="text-xs font-extrabold text-navy block">
                  3 of 9 done
                </span>
                <span className="text-[11px] text-muted">
                  {locale === 'am' ? 'የዛሬ ፈረቃ ሂደት' : 'Shift Progress'}
                </span>
              </div>
            </div>

            {/* Bell with Count */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="w-11 h-11 rounded-card bg-mist hover:bg-slate-200 flex items-center justify-center text-navy relative border border-line transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-700" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-signal text-navy font-black text-xs flex items-center justify-center shadow-xs">
                3
              </span>
            </button>
          </div>
        </header>

        {/* -------------------- VIEW 1: TODAY (TABLET LANDSCAPE 1180 × 820) -------------------- */}
        {activeNav === 'today' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* THREE BIG NUMBER CARDS with icons */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white p-5 rounded-card border-2 border-orange-signal shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-orange-deep uppercase tracking-wider block">
                    {locale === 'am' ? 'ለግምገማ (To Review)' : 'To Review'}
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-navy font-mono mt-1">
                    {pendingApts.length}
                  </div>
                  <span className="text-[11px] text-orange-deep font-semibold mt-1 block">
                    {locale === 'am' ? 'ፈጣን ማጽደቅ ይፈልጋሉ' : 'Awaiting confirmation'}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-tint text-orange-deep flex items-center justify-center font-bold">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-card border border-line shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                    {locale === 'am' ? 'የዛሬ ቀጠሮ (Today)' : 'Today Scheduled'}
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-navy font-mono mt-1">
                    9
                  </div>
                  <span className="text-[11px] text-muted font-medium mt-1 block">
                    {locale === 'am' ? 'በወርክሾፑ የሚሰሩ' : 'Active in all bays'}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                  <Wrench className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-card border border-line shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-wider block">
                    {locale === 'am' ? 'የተጠናቀቀ (Done)' : 'Done Today'}
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono mt-1">
                    3
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
                    {locale === 'am' ? 'ርክክብ የተደረገላቸው' : 'Inspected & handed over'}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCheck className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* HERO CARD "NEXT UP" (Graphite Navy, blueprint grid) */}
            {nextCar && (
              <div className="rounded-card bg-navy text-white p-6 border border-slate-700 shadow-xl relative overflow-hidden bg-blueprint-dark">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-orange-signal">
                        {locale === 'am' ? 'ቀጣይ ተረኛ መኪና (Next up)' : 'Next Up in Queue'}
                      </span>
                      <span className="text-[11px] font-bold bg-orange-signal text-navy px-2 py-0.5 rounded-full shadow-xs">
                        {locale === 'am' ? 'ከ 25 ደቂቃ በኋላ' : 'in 25 min'}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      10:30 · {nextCar.vehicleMake} {nextCar.vehicleModel} · [{nextCar.vehiclePlate}]
                    </h2>
                    <p className="text-xs text-slate-300">
                      {locale === 'am' ? 'ባለቤት:' : 'Owner:'} {nextCar.customerName} ({nextCar.customerPhone})
                    </p>
                  </div>

                  {/* Two large buttons (Large touch targets: at least 56px tall) */}
                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${nextCar.customerPhone}`}
                      className="h-14 px-6 rounded-card bg-orange-signal hover:bg-orange-400 text-navy font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                    >
                      <Phone className="w-5 h-5 text-navy" />
                      <span>{locale === 'am' ? 'ለደንበኛው ደውል' : 'Call customer'}</span>
                    </a>

                    <button
                      onClick={() => {
                        updateAppointmentStatus(nextCar.id, 'in_progress');
                        showToast(locale === 'am' ? 'ተሽከርካሪው ወደ ጥገና ቤይ ገብቷል' : 'Vehicle moved to In Progress', 'info');
                      }}
                      className="h-14 px-6 rounded-card bg-transparent border-2 border-white/80 hover:bg-white/10 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all active:scale-98"
                    >
                      <Wrench className="w-5 h-5" />
                      <span>{locale === 'am' ? 'ስራ ጀምር (Start work)' : 'Start work'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                      {locale === 'am' ? 'የተጠየቀ ሰርቪስ:' : 'Service:'}
                    </span>
                    <span className="bg-slate-800 text-orange-signal font-bold px-2.5 py-1 rounded-md border border-slate-700">
                      {nextCar.serviceName}
                    </span>
                  </div>
                  <span className="text-slate-400">
                    ችግር፡ "{nextCar.problemDescription}"
                  </span>
                </div>
              </div>
            )}

            {/* TWO COLUMNS: "WAITING FOR REVIEW" & "TODAY'S TIMELINE" */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Waiting for review */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-navy uppercase tracking-wider">
                    {locale === 'am' ? 'ግምገማ የሚጠብቁ ጥያቄዎች' : 'Waiting for review'} ({pendingApts.length})
                  </h3>
                  <button
                    onClick={() => {
                      setActiveNav('appointments');
                      setAppointmentsTab('to_review');
                    }}
                    className="text-xs font-bold text-orange-deep hover:underline"
                  >
                    {locale === 'am' ? 'ሁሉንም እይ ›' : 'View all ›'}
                  </button>
                </div>

                {pendingApts.length === 0 ? (
                  <div className="bg-white rounded-card p-8 border border-line text-center text-muted">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                    <p className="font-bold text-sm text-navy">
                      {locale === 'am' ? 'ምንም የሚጠብቅ ጥያቄ የለም — ሁሉም ተገምግመዋል!' : 'Nothing waiting for review — All caught up!'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingApts.slice(0, 3).map((apt) => (
                      <div
                        key={apt.id}
                        className="bg-white p-5 rounded-card border border-line shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-slate-100 text-slate-800 font-mono font-bold text-xs px-2 py-0.5 rounded border border-line">
                                🇪🇹 {apt.vehiclePlate}
                              </span>
                              <span className="font-extrabold text-navy text-sm">
                                {apt.customerName}
                              </span>
                              <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-200">
                                ⏱ 2 ሰዓት
                              </span>
                            </div>
                            <p className="text-xs text-muted">
                              {apt.vehicleMake} {apt.vehicleModel} • <strong className="text-navy">{apt.serviceName}</strong>
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 italic">
                              "{apt.problemDescription}"
                            </p>
                          </div>

                          <span className="text-xs font-mono font-black text-slate-700 bg-mist px-2.5 py-1 rounded">
                            {apt.requestedSlot}
                          </span>
                        </div>

                        {/* Two big buttons side by side (Large touch targets: at least 56px tall) */}
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-line">
                          <button
                            onClick={() => {
                              setApproveSheetApt(apt);
                              setIsApproveSuccess(false);
                            }}
                            className="h-14 rounded-card bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
                          >
                            <Check className="w-5 h-5 stroke-[3]" />
                            <span>{locale === 'am' ? '✔ አጽድቅ (Approve)' : '✔ Approve'}</span>
                          </button>

                          <button
                            onClick={() => {
                              setRejectSheetApt(apt);
                              setRejectCustomText('');
                            }}
                            className="h-14 rounded-card bg-white border-2 border-red-500 hover:bg-red-50 text-red-600 font-black text-sm flex items-center justify-center gap-2 active:scale-98 transition-all"
                          >
                            <X className="w-5 h-5 stroke-[3]" />
                            <span>{locale === 'am' ? '✖ ውድቅ አድርግ (Reject)' : '✖ Reject'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Today's Timeline with "now" line */}
              <div className="lg:col-span-5 bg-white p-5 rounded-card border border-line shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-line">
                  <h3 className="text-sm font-black text-navy uppercase tracking-wider">
                    {locale === 'am' ? 'የዛሬ የሰዓት ሰሌዳ' : "Today's Timeline"}
                  </h3>
                  <span className="text-xs text-muted">08:00 – 18:00</span>
                </div>

                <div className="relative space-y-4 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-line">
                  
                  {/* Slot 1: Completed */}
                  <div className="relative pl-7">
                    <div className="absolute left-1.5 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-slate-400" />
                    <div className="p-3 rounded-card bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center justify-between font-mono font-bold text-slate-500">
                        <span>08:30 – 09:30</span>
                        <span className="text-slate-600 font-sans">✓ የተጠናቀቀ</span>
                      </div>
                      <p className="font-extrabold text-navy mt-1">Toyota Hilux · [ET-3-99881]</p>
                      <p className="text-[11px] text-muted">የዘይትና ፊልተር ቅየራ (Bay #1)</p>
                    </div>
                  </div>

                  {/* "NOW" LIVE MARKER */}
                  <div className="relative pl-7 my-2 flex items-center gap-2">
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-200 animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      ● አሁን (Now) · 10:15 AM
                    </span>
                    <div className="flex-1 h-0.5 bg-red-400 border-dashed" />
                  </div>

                  {/* Slot 2: In Progress */}
                  <div className="relative pl-7">
                    <div className="absolute left-1.5 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-blue-100" />
                    <div className="p-3 rounded-card bg-blue-50/80 border border-blue-200 text-xs">
                      <div className="flex items-center justify-between font-mono font-bold text-blue-900">
                        <span>10:00 – 11:30</span>
                        <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-sans">በጥገና ላይ</span>
                      </div>
                      <p className="font-extrabold text-navy mt-1">Toyota Vitz · [AA-12345]</p>
                      <p className="text-[11px] text-blue-800">Brake System Service (Bay #2 · ሳሙኤል)</p>
                    </div>
                  </div>

                  {/* Slot 3: Upcoming */}
                  <div className="relative pl-7">
                    <div className="absolute left-1.5 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-emerald-500" />
                    <div className="p-3 rounded-card bg-emerald-50/60 border border-emerald-200 text-xs">
                      <div className="flex items-center justify-between font-mono font-bold text-emerald-900">
                        <span>13:30 – 15:00</span>
                        <span className="text-emerald-700 font-sans">ጸድቋል</span>
                      </div>
                      <p className="font-extrabold text-navy mt-1">Suzuki Dzire · [AA-2-C67890]</p>
                      <p className="text-[11px] text-emerald-800">የቦዲ ቀለምና ማስተካከል</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* -------------------- VIEW 2: APPOINTMENTS WORK QUEUE (TABLET 820 × 1180) -------------------- */}
        {activeNav === 'appointments' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header with Search & Pull-to-refresh */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy">
                  {locale === 'am' ? 'የስራ ቅደም ተከተል (Work Queue)' : 'Technician Work Queue'}
                </h2>
                <p className="text-xs text-muted">
                  {locale === 'am' ? 'የቀጠሮዎች ግምገማ፣ ማጽደቅ እና የስራ ደረጃ ማስተካከያ' : 'Review incoming requests and update repair lifecycle'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={locale === 'am' ? 'በሰሌዳ ቁጥር፣ ስም ወይም መለያ ፈልግ...' : 'Search plate, name, or ref...'}
                    className="pl-9 pr-3 py-2 bg-white rounded-card border border-line text-xs font-bold text-navy outline-hidden focus:border-orange-signal w-64 shadow-2xs"
                  />
                </div>

                <button
                  onClick={() => showToast(locale === 'am' ? 'ስራዎች ታድሰዋል' : 'Refreshed queue', 'info')}
                  className="p-2.5 bg-white border border-line rounded-card text-slate-600 hover:text-navy hover:bg-slate-50 transition-colors shadow-2xs"
                  title="Pull to Refresh"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Segmented Tabs with Counts ("To review 4" active in orange) */}
            <div className="grid grid-cols-4 gap-2 bg-white p-1.5 rounded-card border border-line shadow-2xs">
              {[
                { id: 'to_review', labelAm: 'ለግምገማ', labelEn: 'To review', count: pendingApts.length },
                { id: 'today', labelAm: 'የዛሬ', labelEn: 'Today', count: 9 },
                { id: 'upcoming', labelAm: 'የሚመጡ', labelEn: 'Upcoming', count: 5 },
                { id: 'past', labelAm: 'ያለፉ', labelEn: 'Past', count: 12 },
              ].map((tab) => {
                const isActive = appointmentsTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAppointmentsTab(tab.id as any)}
                    className={`py-3 px-2 rounded-card text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'bg-orange-signal text-navy shadow-sm'
                        : 'text-slate-600 hover:bg-mist hover:text-navy'
                    }`}
                  >
                    <span>{locale === 'am' ? tab.labelAm : tab.labelEn}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-navy text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 2-Column Grid of Big Cards (16px radius, 4px status bar on left) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQueueApts.map((apt) => {
                const isPending = apt.status === 'pending';
                const isApproved = apt.status === 'approved';
                const isInProgress = apt.status === 'in_progress';
                const isCompleted = apt.status === 'completed';

                const barColor = isPending
                  ? 'bg-amber-400'
                  : isApproved
                  ? 'bg-emerald-500'
                  : isInProgress
                  ? 'bg-blue-500'
                  : 'bg-slate-400';

                return (
                  <div
                    key={apt.id}
                    className="bg-white rounded-card border border-line shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between relative"
                  >
                    {/* 4px Status Bar on Left */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${barColor}`} />

                    <div className="p-5 pl-6 space-y-3">
                      {/* Top row: Number, Status badge & Waiting pill */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-muted">
                            {apt.ref}
                          </span>
                          <StatusBadge status={apt.status} locale={locale} />
                        </div>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          ⏱ 2h 14m waiting
                        </span>
                      </div>

                      {/* Customer & Car details */}
                      <div>
                        <h4 className="text-base font-extrabold text-navy">
                          {apt.customerName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-white text-navy font-mono font-black text-xs px-2 py-0.5 rounded border border-slate-700 shadow-2xs">
                            🇪🇹 {apt.vehiclePlate}
                          </span>
                          <span className="text-xs font-bold text-slate-700">
                            {apt.vehicleMake} {apt.vehicleModel} ({apt.vehicleYear})
                          </span>
                        </div>
                      </div>

                      {/* Service & Requested Time */}
                      <div className="bg-mist p-3 rounded-btn text-xs flex items-center justify-between">
                        <div>
                          <span className="text-muted text-[10px] block font-bold">አገልግሎት:</span>
                          <span className="font-extrabold text-navy">{apt.serviceName}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-muted text-[10px] block font-bold">ቀንና ሰዓት:</span>
                          <span className="font-mono font-bold text-slate-800">{apt.requestedDate} · {apt.requestedSlot}</span>
                        </div>
                      </div>

                      {/* Problem Description */}
                      <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                        "{apt.problemDescription}"
                      </p>
                    </div>

                    {/* Footer: ONE Giant Primary Button by Status (at least 56px tall) + Secondary Details link */}
                    <div className="p-4 pl-6 bg-slate-50 border-t border-line flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          showToast(`Ref: ${apt.ref} details opened`, 'info');
                        }}
                        className="text-xs font-bold text-slate-600 hover:text-navy hover:underline"
                      >
                        {locale === 'am' ? 'ዝርዝር እይ ›' : 'Details ›'}
                      </button>

                      {isPending && (
                        <button
                          onClick={() => {
                            setApproveSheetApt(apt);
                            setIsApproveSuccess(false);
                          }}
                          className="h-14 px-6 rounded-card bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all flex-1 max-w-[220px]"
                        >
                          <Check className="w-5 h-5 stroke-[3]" />
                          <span>{locale === 'am' ? 'አጽድቅ (Approve)' : 'Approve'}</span>
                        </button>
                      )}

                      {isApproved && (
                        <button
                          onClick={() => {
                            updateAppointmentStatus(apt.id, 'in_progress');
                            showToast('Work started', 'success');
                          }}
                          className="h-14 px-6 rounded-card bg-orange-signal hover:bg-orange-400 text-navy font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all flex-1 max-w-[220px]"
                        >
                          <Wrench className="w-5 h-5" />
                          <span>{locale === 'am' ? 'ስራ ጀምር' : 'Start work'}</span>
                        </button>
                      )}

                      {isInProgress && (
                        <button
                          onClick={() => {
                            updateAppointmentStatus(apt.id, 'completed');
                            showToast('Work completed', 'success');
                          }}
                          className="h-14 px-6 rounded-card bg-navy hover:bg-slate-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all flex-1 max-w-[220px]"
                        >
                          <CheckCheck className="w-5 h-5 text-orange-signal" />
                          <span>{locale === 'am' ? 'ጨርስ (Complete)' : 'Mark completed'}</span>
                        </button>
                      )}

                      {isCompleted && (
                        <span className="text-xs font-bold text-slate-400 bg-slate-200 px-3 py-1.5 rounded-full">
                          ✓ ተጠናቋል (Completed)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------- VIEW 3: PROFILE & TELEGRAM ALERTS -------------------- */}
        {activeNav === 'profile' && (
          <div className="p-6 sm:p-8 max-w-3xl space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-navy">
              {locale === 'am' ? 'የቴክኒሻን መገለጫና ማሳወቂያዎች' : 'Staff Profile & Alerts'}
            </h2>

            {/* Personal Details Card */}
            <div className="bg-white rounded-card p-6 border border-line shadow-2xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted">
                {locale === 'am' ? 'የግል መረጃ' : 'Personal Details'}
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-navy text-orange-signal font-black text-2xl flex items-center justify-center border-2 border-orange-signal">
                  SB
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-navy">ሳሙኤል በቀለ (Samuel B.)</h4>
                  <p className="text-xs text-muted">Lead Master Technician • Nefas Silk-Lafto</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">abiyme@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Telegram Alerts Card (Screen 2) */}
            <div className="bg-white rounded-card p-6 border border-line shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#229ED9] text-white flex items-center justify-center font-bold">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-navy text-sm">
                      Telegram Alerts
                    </h4>
                    <p className="text-xs text-muted">
                      {locale === 'am' ? 'አዳዲስ ጥያቄዎች በቴሌግራም ወዲያውኑ ይድረሱዎት' : 'Get new requests on Telegram instantly'}
                    </p>
                  </div>
                </div>

                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  tgConnected 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {tgConnected ? '✔ Connected' : 'Not connected'}
                </span>
              </div>

              {/* QR Code and Connect Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-card bg-mist border border-line">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg border border-line flex items-center justify-center p-1 shadow-2xs">
                    <QrCode className="w-14 h-14 text-navy" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-navy block">
                      @AbegazStaffBot
                    </span>
                    <p className="text-[11px] text-muted mt-0.5">
                      ስልክዎን በመጠቀም ቦቱን ያገናኙ ወይም ከታች ያለውን ቁልፍ ይጫኑ።
                    </p>
                  </div>
                </div>

                <a
                  href="https://t.me/AbegazMotors"
                  target="_blank"
                  rel="noreferrer"
                  className="h-12 px-5 rounded-btn bg-[#229ED9] hover:bg-[#1B89BF] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Connect Telegram</span>
                </a>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-navy block">
                      {locale === 'am' ? 'አዳዲስ የቀጠሮ ጥያቄዎች' : 'New requests alerts'}
                    </span>
                    <span className="text-[11px] text-muted">Notify whenever a customer books</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={alertNewRequests}
                    onChange={(e) => setAlertNewRequests(e.target.checked)}
                    className="w-5 h-5 accent-orange-signal rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-navy block">
                      {locale === 'am' ? 'ለእኔ የተመደቡ ብቻ' : 'Assigned to me alerts'}
                    </span>
                    <span className="text-[11px] text-muted">Notify only when work is dispatched to Bay #2</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={alertAssignedToMe}
                    onChange={(e) => setAlertAssignedToMe(e.target.checked)}
                    className="w-5 h-5 accent-orange-signal rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* -------------------- NOTIFICATIONS PANEL: SLIDE-OVER FROM RIGHT (420px) -------------------- */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-xs flex justify-end">
          <div className="w-[420px] max-w-full bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div>
              {/* Header */}
              <div className="p-5 border-b border-line flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-navy text-base">
                    {locale === 'am' ? 'ማሳወቂያዎች' : 'Notifications Panel'}
                  </h3>
                  <p className="text-xs text-muted">Staff live dispatch telemetry</p>
                </div>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-slate-500 hover:text-navy"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs: "All · Requests" */}
              <div className="flex items-center border-b border-line px-5 pt-2">
                <button
                  onClick={() => setNotificationTab('all')}
                  className={`pb-2.5 px-3 text-xs font-extrabold border-b-2 transition-all ${
                    notificationTab === 'all'
                      ? 'border-orange-signal text-orange-deep'
                      : 'border-transparent text-slate-500 hover:text-navy'
                  }`}
                >
                  All Alerts
                </button>
                <button
                  onClick={() => setNotificationTab('requests')}
                  className={`pb-2.5 px-3 text-xs font-extrabold border-b-2 transition-all flex items-center gap-1 ${
                    notificationTab === 'requests'
                      ? 'border-orange-signal text-orange-deep'
                      : 'border-transparent text-slate-500 hover:text-navy'
                  }`}
                >
                  <span>Requests Only</span>
                  <span className="w-2 h-2 rounded-full bg-orange-signal" />
                </button>
              </div>

              {/* Notifications List */}
              <div className="p-5 space-y-3 overflow-y-auto max-h-[70vh]">
                {/* Item 1: New request with Review button */}
                <div className="p-3.5 rounded-card bg-orange-50/60 border border-orange-200 text-xs relative">
                  <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-orange-signal" />
                  <span className="font-mono font-bold text-orange-deep text-[11px] block">
                    ABG-2026-0043
                  </span>
                  <h4 className="font-black text-navy mt-0.5">
                    New request: Brake Service · Toyota Vitz
                  </h4>
                  <p className="text-[11px] text-muted mt-0.5">
                    Requested for Thu 12 Nov · 10:00 AM
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">10 min ago</span>
                    <button
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        setActiveNav('appointments');
                      }}
                      className="px-3 py-1 rounded bg-orange-signal text-navy font-extrabold text-[11px] hover:bg-orange-400"
                    >
                      Review ›
                    </button>
                  </div>
                </div>

                {/* Item 2: Assigned to you */}
                <div className="p-3.5 rounded-card bg-slate-50 border border-slate-200 text-xs relative">
                  <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-orange-signal" />
                  <span className="font-mono font-bold text-slate-500 text-[11px] block">
                    ABG-2026-0039
                  </span>
                  <h4 className="font-bold text-navy mt-0.5">
                    Assigned to you: Hyundai Tucson Overhaul
                  </h4>
                  <p className="text-[11px] text-muted mt-0.5">
                    Allocated to Bay #2 by Head Office
                  </p>
                  <span className="text-[10px] text-slate-400 block mt-2 font-mono">25 min ago</span>
                </div>

                {/* Item 3: Approved by Mekdes */}
                <div className="p-3.5 rounded-card bg-emerald-50/60 border border-emerald-200 text-xs">
                  <span className="font-mono font-bold text-emerald-800 text-[11px] block">
                    ABG-2026-0042
                  </span>
                  <h4 className="font-bold text-emerald-950 mt-0.5">
                    Approved by Mekdes: ABG-2026-0042
                  </h4>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Customer notified via Email & Telegram ✔
                  </p>
                  <span className="text-[10px] text-emerald-600 block mt-2 font-mono">1 hour ago</span>
                </div>
              </div>
            </div>

            {/* Footer "Mark all as read" */}
            <div className="p-4 border-t border-line bg-mist">
              <button
                onClick={() => {
                  showToast(locale === 'am' ? 'ሁሉም እንደተነበቡ ተደርገዋል' : 'All marked as read', 'info');
                  setIsNotificationsOpen(false);
                }}
                className="w-full py-2.5 rounded-card bg-white border border-line text-navy hover:bg-slate-100 font-extrabold text-xs transition-colors"
              >
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- BOTTOM SHEET: APPROVE AND NOTIFY CUSTOMER -------------------- */}
      {approveSheetApt && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-banner sm:rounded-card max-w-lg w-full p-6 shadow-2xl border border-line animate-in slide-in-from-bottom-4 duration-200">
            {!isApproveSuccess ? (
              // State 1: Confirm Sheet
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-muted block">
                      {approveSheetApt.ref}
                    </span>
                    <h3 className="font-black text-navy text-base">
                      {locale === 'am' ? 'ቀጠሮውን አጽድቅና ለደንበኛው አሳውቅ' : 'Approve and notify customer'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setApproveSheetApt(null)}
                    className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-slate-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 rounded-card bg-mist border border-line text-xs space-y-1">
                  <p className="font-extrabold text-navy">
                    {approveSheetApt.customerName} ({approveSheetApt.customerPhone})
                  </p>
                  <p className="text-muted">
                    {approveSheetApt.vehicleMake} {approveSheetApt.vehicleModel} [{approveSheetApt.vehiclePlate}]
                  </p>
                  <p className="text-orange-deep font-bold">
                    {approveSheetApt.serviceName} • {approveSheetApt.requestedDate} @ {approveSheetApt.requestedSlot}
                  </p>
                </div>
                <p className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-900">
                  {locale === 'am'
                    ? `ደንበኛው ${approveSheetApt.vehiclePlate} በሚለው የሰሌዳ ቁጥር የጥገና ሁኔታውን ማየት ይችላል።`
                    : `Customer can check repair status using plate ${approveSheetApt.vehiclePlate}.`}
                </p>

                {/* Toggles */}
                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-btn bg-slate-50 border border-line">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      ✉️ Email Notification ({approveSheetApt.customerEmail})
                    </span>
                    <input
                      type="checkbox"
                      checked={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.checked)}
                      className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-btn bg-slate-50 border border-line">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      ✈️ Telegram Instant Alert (@Telegram)
                    </span>
                    <input
                      type="checkbox"
                      checked={notifyTelegram}
                      onChange={(e) => setNotifyTelegram(e.target.checked)}
                      className="w-5 h-5 accent-[#229ED9] rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Big Green Button */}
                <button
                  onClick={handleApproveConfirm}
                  className="w-full h-14 rounded-card bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>{locale === 'am' ? 'አጽድቅና ማሳወቂያ ላክ' : 'Approve & Notify Now'}</span>
                </button>
              </div>
            ) : (
              // State 2: Success Sheet
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-black">
                  ✔
                </div>
                <div>
                  <h3 className="text-lg font-black text-navy">
                    {locale === 'am' ? 'ጸድቋል — ለደንበኛው ማሳወቂያ ተልኳል' : 'Approved — customer notified'}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {locale === 'am'
                      ? `የጥገና ሁኔታውን በሰሌዳ ቁጥር ${approveSheetApt.vehiclePlate} ማየት ይችላሉ።`
                      : `They can track repair progress using plate ${approveSheetApt.vehiclePlate}.`}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-xs text-emerald-700 font-bold mt-2">
                    <span>✔ Email Sent</span>
                    <span>•</span>
                    <span>✔ Telegram Delivered</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setApproveSheetApt(null)}
                    className="flex-1 py-3 rounded-card bg-mist text-slate-700 font-extrabold text-xs hover:bg-slate-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setApproveSheetApt(null);
                      // Jump to next pending
                      const next = pendingApts.find(a => a.id !== approveSheetApt.id);
                      if (next) {
                        setApproveSheetApt(next);
                        setIsApproveSuccess(false);
                      }
                    }}
                    className="flex-1 py-3 rounded-card bg-orange-signal text-navy font-black text-xs hover:bg-orange-400 shadow-sm"
                  >
                    Next request ›
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* -------------------- BOTTOM SHEET: REJECT WITH REQUIRED REASON -------------------- */}
      {rejectSheetApt && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-banner sm:rounded-card max-w-lg w-full p-6 shadow-2xl border border-line animate-in slide-in-from-bottom-4 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div>
                <span className="text-[11px] font-mono font-bold text-red-600 block">
                  {rejectSheetApt.ref}
                </span>
                <h3 className="font-black text-navy text-base">
                  {locale === 'am' ? 'ቀጠሮውን ውድቅ አድርግ (Reason Required)' : 'Reject Appointment'}
                </h3>
              </div>
              <button
                onClick={() => setRejectSheetApt(null)}
                className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-muted">
              እባክዎ ለደንበኛው የሚላከውን ትክክለኛ ምክንያት ይምረጡ፡
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Slot full (የሰዓት መደራረብ)',
                'Workshop bay at capacity',
                'Spare parts not in stock',
                'Outside operational hours'
              ].map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setRejectReason(reason)}
                  className={`px-3 py-1.5 rounded-full font-bold border transition-all ${
                    rejectReason === reason
                      ? 'bg-red-50 text-red-700 border-red-400 font-black'
                      : 'bg-mist text-slate-600 border-line hover:bg-slate-200'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            {/* Textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ተጨማሪ ማብራሪያ (Optional):
              </label>
              <textarea
                value={rejectCustomText}
                onChange={(e) => setRejectCustomText(e.target.value)}
                placeholder="ለምሳሌ፡ እባክዎ ለነገ ጠዋት 10:00 ሌላ ቀጠሮ ይጠይቁ..."
                rows={2}
                className="w-full px-3 py-2 rounded-btn border border-line text-xs outline-hidden focus:border-red-500"
              />
            </div>

            {/* Red Button */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setRejectSheetApt(null)}
                className="flex-1 py-3 rounded-card bg-mist text-slate-700 font-extrabold text-xs hover:bg-slate-200"
              >
                ይቅር (Cancel)
              </button>
              <button
                onClick={handleRejectConfirm}
                className="flex-1 h-12 rounded-card bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <X className="w-4 h-4 stroke-[3]" />
                <span>ውድቅ አድርግና አሳውቅ</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
