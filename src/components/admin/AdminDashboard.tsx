import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';
import { Appointment, AppointmentStatus, StaffMember } from '../../types';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Calendar as CalendarIcon, 
  Clock, 
  Wrench, 
  Users, 
  Bell, 
  Settings, 
  Search, 
  Check, 
  X, 
  Eye, 
  AlertCircle, 
  Send, 
  Mail, 
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Plus,
  UserCheck,
  FileText,
  Trash2,
  Lock,
  Phone,
  Layers,
  ArrowRight,
  BarChart3,
  ChevronLeft,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  Share2,
  CornerDownRight,
  ChevronDown,
  Menu,
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  Info,
  Car,
  CheckCheck,
  BarChart2,
  PieChart,
  Activity,
  RefreshCw,
  Zap,
  Volume2,
  Moon,
  Sliders,
  ExternalLink,
  HelpCircle,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '../common/Button';

export const AdminDashboard: React.FC = () => {
  const { 
    locale, 
    setLocale,
    setCurrentView, 
    appointments, 
    updateAppointmentStatus, 
    bulkUpdateAppointments,
    workingHours, 
    closedDates, 
    staffList,
    addStaffMember,
    updateStaffMember,
    notificationLogs,
    showToast,
    logoutUser,
    user
  } = useApp();

  // Navigation tabs (Dashboard Design System v2 groupings)
  const [activeTab, setActiveTab] = useState<
    'overview' | 'appointments' | 'calendar' | 'analytics' | 
    'services' | 'packages' | 'content' | 'customers' | 
    'availability' | 'staff' | 'notifications' | 'settings'
  >('overview');

  // Sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [overviewRange, setOverviewRange] = useState<'today' | '7d' | '30d'>('30d');

  // Notification Popover under bell
  const [isNotificationPopoverOpen, setIsNotificationPopoverOpen] = useState(false);
  const [popoverTab, setPopoverTab] = useState<'all' | 'requests' | 'alerts'>('all');

  // Live incoming toast alert
  const [incomingToastVisible, setIncomingToastVisible] = useState(true);

  // Appointments Screen State (Master-Detail)
  const [appointmentViewTab, setAppointmentViewTab] = useState<'pending' | 'today' | 'this_week' | 'all'>('pending');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [selectedDetailApt, setSelectedDetailApt] = useState<Appointment | null>(appointments[0] || null);
  const [filterChips, setFilterChips] = useState<{ id: string; label: string }[]>([
    { id: 'f-1', label: 'Service: Brake' },
    { id: 'f-2', label: 'Assigned: Samuel' }
  ]);

  // Approve Modal State (State 1: Confirm, State 2: Success with Live Delivery Tracker)
  const [approveModalApt, setApproveModalApt] = useState<Appointment | null>(null);
  const [approveModalStep, setApproveModalStep] = useState<1 | 2>(1);
  const [modalEmailChannel, setModalEmailChannel] = useState(true);
  const [modalTelegramChannel, setModalTelegramChannel] = useState(true);
  const [modalCustomNote, setModalCustomNote] = useState('Please arrive 10 minutes prior to your slot.');
  const [modalPreviewOpen, setModalPreviewOpen] = useState(false);

  // Reject Modal State
  const [rejectModalApt, setRejectModalApt] = useState<Appointment | null>(null);
  const [rejectReason, setRejectReason] = useState('That slot is already full.');
  const [rejectDetailNote, setRejectDetailNote] = useState('');

  // Analytics Screen State
  const [analyticsTab, setAnalyticsTab] = useState<'overview' | 'appointments' | 'services' | 'customers' | 'notifications'>('overview');
  const [analyticsDateRange, setAnalyticsDateRange] = useState('30 days');
  const [comparePrevious, setComparePrevious] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsEmpty, setAnalyticsEmpty] = useState(false);
  const [analyticsHeatmapHover, setAnalyticsHeatmapHover] = useState<{ day: string; hour: number; val: number } | null>(null);

  // Notifications Page State
  const [notifPageTab, setNotifPageTab] = useState<'alerts' | 'delivery_log' | 'settings'>('alerts');
  const [notifCategoryFilter, setNotifCategoryFilter] = useState<'all' | 'unread' | 'requests' | 'approvals' | 'failures' | 'system'>('all');
  const [selectedNotifItem, setSelectedNotifItem] = useState<any | null>(null);
  const [notifLogChannelFilter, setNotifLogChannelFilter] = useState<'all' | 'email' | 'telegram'>('all');
  const [notifLogStatusFilter, setNotifLogStatusFilter] = useState<'all' | 'sent' | 'failed' | 'pending'>('all');
  const [checkedNotifIds, setCheckedNotifIds] = useState<string[]>([]);
  const [adminEmails, setAdminEmails] = useState<string[]>(['admin@abegaz.com', 'mekdes@abegaz.com', 'dispatch@abegaz.com']);
  const [newAdminEmailInput, setNewAdminEmailInput] = useState('');
  const [showAddEmailInput, setShowAddEmailInput] = useState(false);
  const [staffTelegramGroup, setStaffTelegramGroup] = useState('-100192837465');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('07:00');

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setApproveModalApt(null);
        setRejectModalApt(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter queues
  const pendingApts = appointments.filter(a => a.status === 'pending');
  const approvedApts = appointments.filter(a => a.status === 'approved');
  const inProgressApts = appointments.filter(a => a.status === 'in_progress');
  const completedApts = appointments.filter(a => a.status === 'completed');

  const removeFilterChip = (id: string) => {
    setFilterChips(prev => prev.filter(c => c.id !== id));
  };

  const handleApproveConfirm = () => {
    if (!approveModalApt) return;
    updateAppointmentStatus(approveModalApt.id, 'approved', undefined, modalCustomNote);
    setApproveModalStep(2);
    showToast(locale === 'am' ? 'ጸድቋል — ደንበኛው ተነግሮታል (✔ Email ✔ Telegram)' : 'Approved — customer notified (✔ Email ✔ Telegram)', 'success');
  };

  const handleRejectConfirm = () => {
    if (!rejectModalApt) return;
    const finalReason = rejectDetailNote ? `${rejectReason}: ${rejectDetailNote}` : rejectReason;
    updateAppointmentStatus(rejectModalApt.id, 'rejected', finalReason);
    setRejectModalApt(null);
    showToast(locale === 'am' ? 'ቀጠሮው ውድቅ ተደርጓል' : 'Appointment rejected', 'info');
  };

  // Filter appointments for Master list
  const filteredAppointments = appointments.filter(a => {
    if (appointmentViewTab === 'pending') return a.status === 'pending';
    if (appointmentViewTab === 'today') return a.status === 'approved' || a.status === 'in_progress';
    if (appointmentViewTab === 'this_week') return a.status !== 'rejected';
    return true;
  }).filter(a => {
    const q = searchQuery.toLowerCase();
    return a.ref.toLowerCase().includes(q) || 
      a.customerName.toLowerCase().includes(q) || 
      a.vehiclePlate.toLowerCase().includes(q);
  });

  return (
    <div className="flex h-screen bg-mist overflow-hidden text-navy font-sans antialiased">
      
      {/* ----------------- 1. ADMIN SHELL: 260px GRAPHITE NAVY SIDEBAR (COLLAPSIBLE TO 72px) ----------------- */}
      <aside 
        className={`${
          isSidebarCollapsed ? 'w-[72px]' : 'w-[260px]'
        } bg-[#0F172A] bg-gradient-to-b from-[#0F172A] to-[#0B1220] flex flex-col justify-between shrink-0 transition-all duration-200 border-r border-slate-800 z-40 select-none`}
      >
        <div>
          {/* Top: Logo mark + Abegaz Motors + Admin Console label + Collapse chevron */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1 shrink-0 shadow-md border border-slate-700 overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="Abegaz Motors" 
                  className="w-full h-full object-contain"
                />
              </div>
              {!isSidebarCollapsed && (
                <div className="truncate">
                  <div className="text-xs font-black tracking-tight text-white leading-tight">
                    ABEGAZ MOTORS
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    Admin Console v2
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors shrink-0"
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Grouped Navigation Links */}
          <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-220px)]">
            
            {/* GROUP: MAIN */}
            <div>
              {!isSidebarCollapsed && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 block mb-1.5">
                  Main
                </span>
              )}
              <div className="space-y-1">
                {[
                  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                  { id: 'appointments', label: 'Appointments', icon: CalendarCheck, count: pendingApts.length, countColor: 'bg-orange-signal text-navy' },
                  { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      title={isSidebarCollapsed ? item.label : undefined}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                        isActive
                          ? 'bg-slate-800 text-white font-bold shadow-xs'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isActive && (
                          <span className="absolute left-0 top-2 bottom-2 w-1 bg-orange-signal rounded-r" />
                        )}
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-signal' : 'text-slate-400'}`} />
                        {!isSidebarCollapsed && <span>{item.label}</span>}
                      </div>
                      {!isSidebarCollapsed && item.count !== undefined && item.count > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${item.countColor}`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GROUP: MANAGE */}
            <div>
              {!isSidebarCollapsed && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 block mb-1.5">
                  Manage
                </span>
              )}
              <div className="space-y-1">
                {[
                  { id: 'services', label: 'Services', icon: Wrench },
                  { id: 'packages', label: 'Packages', icon: Layers },
                  { id: 'content', label: 'Content', icon: FileText },
                  { id: 'customers', label: 'Customers', icon: Users },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      title={isSidebarCollapsed ? item.label : undefined}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                        isActive
                          ? 'bg-slate-800 text-white font-bold'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isActive && (
                          <span className="absolute left-0 top-2 bottom-2 w-1 bg-orange-signal rounded-r" />
                        )}
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-signal' : 'text-slate-400'}`} />
                        {!isSidebarCollapsed && <span>{item.label}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GROUP: SYSTEM */}
            <div>
              {!isSidebarCollapsed && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 block mb-1.5">
                  System
                </span>
              )}
              <div className="space-y-1">
                {[
                  { id: 'availability', label: 'Availability', icon: Clock },
                  { id: 'staff', label: 'Staff & Bays', icon: UserCheck },
                  { id: 'notifications', label: 'Notifications', icon: Bell, count: 2, countColor: 'bg-red-500 text-white' },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      title={isSidebarCollapsed ? item.label : undefined}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                        isActive
                          ? 'bg-slate-800 text-white font-bold'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isActive && (
                          <span className="absolute left-0 top-2 bottom-2 w-1 bg-orange-signal rounded-r" />
                        )}
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-signal' : 'text-slate-400'}`} />
                        {!isSidebarCollapsed && <span>{item.label}</span>}
                      </div>
                      {!isSidebarCollapsed && item.count !== undefined && item.count > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${item.countColor}`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Glass Card & User Card */}
        <div className="p-3 border-t border-slate-800/80 space-y-3">
          {!isSidebarCollapsed && (
            <div className="p-3 rounded-card bg-slate-800/40 border border-slate-700/60 text-xs backdrop-blur-xs">
              <div className="flex items-center justify-between text-slate-300 font-bold mb-1.5">
                <span>Today</span>
                <span className="text-[11px] text-orange-signal font-mono">9 apts · 4 pend</span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-signal h-full rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
          )}

          {/* User Card */}
          <div className="flex items-center justify-between p-1.5 rounded-card bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-orange-signal text-navy font-black text-xs flex items-center justify-center shrink-0">
                MT
              </div>
              {!isSidebarCollapsed && (
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">
                    መቅደስ አስፋው (Mekdes)
                  </div>
                  <span className="inline-block bg-navy text-orange-signal text-[9px] font-black uppercase px-1.5 py-0.2 rounded">
                    Admin
                  </span>
                </div>
              )}
            </div>

            {!isSidebarCollapsed && (
              <button
                onClick={() => {
                  logoutUser();
                  setCurrentView('home');
                }}
                className="text-slate-400 hover:text-red-400 p-1"
                title="Log out"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ----------------- 2. MAIN APPLICATION WORKSPACE ----------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP BAR: Sticky 64px, soft blur, breadcrumb, search with "Ctrl K", Live dot, bell, language */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-line px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          
          {/* Breadcrumb & Title */}
          <div className="flex items-center gap-3">
            <div className="text-xs text-muted font-medium flex items-center gap-1.5">
              <span>Admin</span>
              <span>›</span>
              <span className="font-extrabold text-navy capitalize">{activeTab}</span>
            </div>
          </div>

          {/* Center: Search Field with "Ctrl K" key hint */}
          <div className="hidden md:flex items-center w-80 max-w-sm relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search appointments, customers, plates…"
              className="w-full pl-9 pr-14 py-1.5 bg-mist rounded-full border border-line text-xs font-medium text-navy outline-hidden focus:border-orange-signal focus:bg-white transition-all shadow-2xs"
            />
            <span className="absolute right-2.5 top-2 bg-white px-1.5 py-0.5 rounded border border-line text-[10px] font-mono text-muted shadow-2xs">
              Ctrl K
            </span>
          </div>

          {/* Right: Date Range Chip, Live Dot, Notification Bell & Language */}
          <div className="flex items-center gap-3">
            
            {/* Date Range Chip */}
            <div className="hidden sm:flex items-center gap-1 bg-mist px-3 py-1.5 rounded-full border border-line text-xs font-bold text-slate-700 cursor-pointer hover:bg-slate-200">
              <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            {/* Green Pulsing "Live" Indicator */}
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">Live</span>
            </div>

            {/* Notification Bell with Orange Count Pill (opens 420px popover) */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationPopoverOpen(!isNotificationPopoverOpen)}
                className="w-9 h-9 rounded-full bg-mist hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-orange-signal text-navy font-black text-[10px] flex items-center justify-center shadow-xs">
                  3
                </span>
              </button>

              {/* 420px NOTIFICATION POPOVER OVER DIMMED OVERVIEW */}
              {isNotificationPopoverOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    onClick={() => setIsNotificationPopoverOpen(false)}
                    className="fixed inset-0 bg-navy/20 backdrop-blur-[2px] z-40"
                  />

                  {/* Popover Card */}
                  <div className="absolute right-0 mt-3 w-[420px] max-w-[92vw] bg-white rounded-card shadow-2xl border border-line z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
                    {/* Small arrow pointer under bell */}
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-t border-l border-line transform rotate-45" />

                    {/* 1. Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-line mb-3 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-navy">Notifications</span>
                        <span className="text-[10px] font-bold bg-orange-signal text-navy px-2 py-0.5 rounded-full shadow-xs">
                          3 new
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button 
                          onClick={() => showToast('All notifications marked as read', 'info')}
                          className="text-xs text-orange-deep hover:underline font-bold"
                        >
                          Mark all as read
                        </button>
                        <button
                          onClick={() => {
                            setIsNotificationPopoverOpen(false);
                            setActiveTab('notifications');
                            setNotifPageTab('settings');
                          }}
                          title="Open Notification Settings"
                          className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-navy transition-colors"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* 2. Tabs: All · Requests · Alerts */}
                    <div className="flex items-center gap-1 bg-mist p-1 rounded-lg text-xs font-bold mb-3 relative z-10">
                      {(['all', 'requests', 'alerts'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => setPopoverTab(tab)}
                          className={`flex-1 py-1 rounded-md capitalize transition-all ${
                            popoverTab === tab ? 'bg-white text-navy shadow-xs font-black' : 'text-slate-500 hover:text-navy'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* 3. List grouped by "Today" and "Yesterday" */}
                    <div className="space-y-3 text-xs max-h-80 overflow-y-auto pr-1 relative z-10 divide-y divide-slate-100">
                      
                      {/* GROUP: TODAY */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted block">
                          Today
                        </span>

                        {/* Item 1: New request with inline Review & Approve buttons */}
                        {(popoverTab === 'all' || popoverTab === 'requests') && (
                          <div className="p-3 rounded-card bg-orange-50/70 border border-orange-200/80 hover:bg-orange-50 transition-colors">
                            <div className="flex items-start gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-orange-signal text-navy flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                                <Clock className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <p className="font-extrabold text-navy leading-snug">
                                    New request ABG-2026-0043
                                  </p>
                                  <span className="w-2 h-2 rounded-full bg-orange-signal shrink-0" title="Unread" />
                                </div>
                                <p className="text-[11px] text-slate-700 mt-0.5">
                                  Brake Service · Toyota Vitz · Thu 12 Nov 10:00
                                </p>
                                <span className="text-[10px] text-muted block mt-1 font-mono">8 min ago</span>
                                
                                <div className="mt-2.5 flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setIsNotificationPopoverOpen(false);
                                      setActiveTab('appointments');
                                      setAppointmentViewTab('pending');
                                    }}
                                    className="px-3 py-1 rounded-btn bg-white border border-line text-navy font-bold text-[11px] hover:bg-slate-100 shadow-2xs"
                                  >
                                    Review
                                  </button>
                                  <button
                                    onClick={() => {
                                      const apt = appointments.find(a => a.id === 'apt-3') || appointments[0];
                                      setApproveModalApt(apt);
                                      setApproveModalStep(1);
                                      setIsNotificationPopoverOpen(false);
                                    }}
                                    className="px-3 py-1 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] shadow-xs flex items-center gap-1"
                                  >
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Approve</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Item 2: Mekdes approved */}
                        {(popoverTab === 'all' || popoverTab === 'alerts') && (
                          <div className="p-2.5 rounded-card bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition-colors">
                            <div className="flex items-start gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <p className="font-bold text-navy leading-snug">
                                    Mekdes approved ABG-2026-0042
                                  </p>
                                  <span className="w-2 h-2 rounded-full bg-orange-signal shrink-0" title="Unread" />
                                </div>
                                <p className="text-[11px] text-muted mt-0.5">
                                  Customer notified by email and Telegram
                                </p>
                                <span className="text-[10px] text-muted block mt-1 font-mono">25 min ago</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Item 3: Failed message with retry link */}
                        {(popoverTab === 'all' || popoverTab === 'alerts') && (
                          <div className="p-2.5 rounded-card bg-red-50/70 border border-red-200/80 hover:bg-red-50 transition-colors">
                            <div className="flex items-start gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs">
                                <AlertTriangle className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <p className="font-black text-red-900 leading-snug">
                                    Message failed: Telegram not delivered
                                  </p>
                                  <span className="w-2 h-2 rounded-full bg-orange-signal shrink-0" title="Unread" />
                                </div>
                                <p className="text-[11px] text-red-800 mt-0.5">
                                  Telegram delivery failed for Dawit K. (+251 911 234 567)
                                </p>
                                <div className="mt-1 flex items-center justify-between text-[11px]">
                                  <span className="text-muted font-mono">1 hour ago</span>
                                  <button 
                                    onClick={() => showToast('Retrying Telegram webhook for Dawit K....', 'info')}
                                    className="text-red-700 font-black hover:underline"
                                  >
                                    Retry now ›
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* GROUP: YESTERDAY */}
                      <div className="space-y-2 pt-2.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted block">
                          Yesterday
                        </span>

                        {/* Item 4: Bot connection is healthy (system, read) */}
                        <div className="p-2.5 rounded-card bg-white border border-line hover:bg-mist transition-colors opacity-85">
                          <div className="flex items-start gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
                              <Info className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-navy leading-snug">
                                Bot connection is healthy
                              </p>
                              <p className="text-[11px] text-muted mt-0.5">
                                Telegram webhook verified · 0 latency anomalies detected
                              </p>
                              <span className="text-[10px] text-muted block mt-0.5 font-mono">Yesterday · 17:30</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* 4. Footer */}
                    <div className="pt-3 border-t border-line mt-3 relative z-10">
                      <button
                        onClick={() => {
                          setIsNotificationPopoverOpen(false);
                          setActiveTab('notifications');
                          setNotifPageTab('alerts');
                        }}
                        className="w-full py-2 rounded-btn bg-mist hover:bg-slate-200 text-center text-xs font-black text-navy transition-colors"
                      >
                        View all notifications ›
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLocale(locale === 'am' ? 'en' : 'am')}
              className="px-2.5 py-1 rounded-full bg-mist border border-line text-[11px] font-bold text-navy hover:bg-slate-200 transition-colors"
            >
              {locale === 'am' ? 'EN' : 'አማ'}
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-navy text-orange-signal font-extrabold text-xs flex items-center justify-center border-2 border-orange-signal">
              MT
            </div>
          </div>
        </header>

        {/* LIVE TOAST: "New request ABG-2026-0043 — Brake Service · Review" */}
        {incomingToastVisible && (
          <div className="bg-orange-50 border-b border-orange-200 px-6 py-2 flex items-center justify-between text-xs text-navy animate-in slide-in-from-top-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-signal animate-ping" />
              <span className="font-bold">
                🔔 New request ABG-2026-0043 — Brake Service · Toyota Vitz
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('appointments');
                  setAppointmentViewTab('pending');
                }}
                className="font-black text-orange-deep hover:underline"
              >
                Review now ›
              </button>
              <button onClick={() => setIncomingToastVisible(false)} className="text-slate-400 hover:text-navy">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ----------------- 3. TAB 1: OVERVIEW SCREEN (DESKTOP 1440) ----------------- */}
        {activeTab === 'overview' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
            
            {/* Header Row: Greeting + Date + Segmented Control + Export Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-navy tracking-tight">
                  {locale === 'am' ? 'እንደምን አደሩ፣ መቅደስ' : 'Good morning, Mekdes'}
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  Thursday, 12 November 2026 · Overview of Workshop Bay Operations
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-xl border border-line flex items-center text-xs font-bold shadow-2xs">
                  {(['today', '7d', '30d'] as const).map(period => (
                    <button
                      key={period}
                      onClick={() => setOverviewRange(period)}
                      className={`px-3 py-1 rounded-lg capitalize transition-all ${
                        overviewRange === period
                          ? 'bg-navy text-white font-black shadow-xs'
                          : 'text-slate-600 hover:text-navy'
                      }`}
                    >
                      {period === 'today' ? 'Today' : period === '7d' ? '7 days' : '30 days'}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => showToast('Exporting summary CSV...', 'info')}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-line text-xs font-bold text-navy hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* KPI Row: 4 Cards with sparklines & trend chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Pending */}
              <div className="bg-white p-5 rounded-card border-2 border-orange-signal shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted uppercase tracking-wider">
                      Pending requests
                    </span>
                    <span className="text-[11px] font-bold text-orange-deep bg-orange-tint px-2 py-0.5 rounded-full">
                      Needs review
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-navy font-mono mt-2">
                    {pendingApts.length}
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-line flex items-center justify-between">
                  <span className="text-[11px] text-muted font-medium">4 require immediate reply</span>
                  <button
                    onClick={() => {
                      setActiveTab('appointments');
                      setAppointmentViewTab('pending');
                    }}
                    className="text-xs font-black text-orange-deep hover:underline"
                  >
                    Review now ›
                  </button>
                </div>
              </div>

              {/* Card 2: Today's Appointments */}
              <div className="bg-white p-5 rounded-card border border-line shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted uppercase tracking-wider">
                      Today's appointments
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ▲ 12% vs last week
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-navy font-mono mt-2">
                    12
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-line text-[11px] text-muted flex items-center justify-between">
                  <span>9 scheduled · 3 completed</span>
                  <span className="font-mono text-slate-500">Bay 1–4 active</span>
                </div>
              </div>

              {/* Card 3: Approved this week */}
              <div className="bg-white p-5 rounded-card border border-line shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted uppercase tracking-wider">
                      Approved this week
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ▲ 8% growth
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-navy font-mono mt-2">
                    31
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-line text-[11px] text-muted flex items-center justify-between">
                  <span>86% approval rate</span>
                  <span className="text-emerald-700 font-bold">High volume</span>
                </div>
              </div>

              {/* Card 4: Avg response time */}
              <div className="bg-white p-5 rounded-card border border-line shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted uppercase tracking-wider">
                      Avg. response time
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ▼ 9 min faster
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-navy font-mono mt-2">
                    38 min
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-line text-[11px] text-muted flex items-center justify-between">
                  <span>Goal: &lt; 45 min</span>
                  <span className="text-emerald-700 font-bold">Target met ✔</span>
                </div>
              </div>
            </div>

            {/* Charts Row 1: "Appointments over time" (AreaChart look) & "Status breakdown" (Donut look) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Appointments Over Time (Wide AreaChart) */}
              <div className="lg:col-span-8 bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-navy">
                      Appointments over time (Last 30 Days)
                    </h3>
                    <p className="text-xs text-muted">Daily volume comparison: Requests vs Approvals</p>
                  </div>

                  {/* Legend Pills */}
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-orange-signal" /> Approved
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <span className="w-3 h-3 rounded bg-slate-400" /> Requested
                    </span>
                  </div>
                </div>

                {/* SVG AreaChart visual */}
                <div className="h-56 w-full relative pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F97316" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="slateGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#64748B" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#64748B" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal gridlines */}
                    <line x1="0" y1="40" x2="600" y2="40" stroke="#E2E8F0" strokeDasharray="3 3" />
                    <line x1="0" y1="90" x2="600" y2="90" stroke="#E2E8F0" strokeDasharray="3 3" />
                    <line x1="0" y1="140" x2="600" y2="140" stroke="#E2E8F0" strokeDasharray="3 3" />
                    <line x1="0" y1="190" x2="600" y2="190" stroke="#E2E8F0" />

                    {/* Slate Series (Requested) */}
                    <path
                      d="M0,160 Q100,110 200,130 T400,90 T600,60 L600,190 L0,190 Z"
                      fill="url(#slateGrad)"
                    />
                    <path
                      d="M0,160 Q100,110 200,130 T400,90 T600,60"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="2.5"
                    />

                    {/* Orange Series (Approved) */}
                    <path
                      d="M0,180 Q100,140 200,150 T400,110 T600,80 L600,190 L0,190 Z"
                      fill="url(#orangeGrad)"
                    />
                    <path
                      d="M0,180 Q100,140 200,150 T400,110 T600,80"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                
                <div className="flex items-center justify-between text-[11px] text-muted font-mono pt-1">
                  <span>Day 1</span>
                  <span>Day 10</span>
                  <span>Day 20</span>
                  <span>Day 30 (Today)</span>
                </div>
              </div>

              {/* Status Breakdown (Donut Chart) */}
              <div className="lg:col-span-4 bg-white p-6 rounded-card border border-line shadow-2xs space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-navy">
                    Status breakdown
                  </h3>
                  <p className="text-xs text-muted">Distribution of all 128 registered requests</p>
                </div>

                <div className="flex items-center justify-center relative py-2">
                  <div className="w-36 h-36 rounded-full border-8 border-orange-signal border-t-emerald-500 border-r-blue-500 border-b-slate-300 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-navy font-mono">128</span>
                    <span className="text-[10px] uppercase font-bold text-muted">Total</span>
                  </div>
                </div>

                {/* Legend Rows */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Pending
                    </span>
                    <span className="font-mono font-bold text-navy">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Approved
                    </span>
                    <span className="font-mono font-bold text-navy">64</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> In progress
                    </span>
                    <span className="font-mono font-bold text-navy">19</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Completed
                    </span>
                    <span className="font-mono font-bold text-navy">31</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Rejected
                    </span>
                    <span className="font-mono font-bold text-navy">7</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Three-Column Row: Needs attention queue, Top services bar chart, Message delivery radial */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Col 1: Needs Attention Queue */}
              <div className="bg-white p-5 rounded-card border border-line shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-line">
                  <h4 className="font-extrabold text-xs text-navy uppercase tracking-wider">
                    Needs attention ({pendingApts.length})
                  </h4>
                  <span className="text-[10px] text-orange-deep font-bold">Live review</span>
                </div>

                <div className="space-y-2 text-xs">
                  {pendingApts.slice(0, 3).map((apt, idx) => (
                    <div
                      key={apt.id}
                      className="p-2.5 rounded-card bg-mist border border-line hover:border-orange-signal transition-all group flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-navy text-orange-signal font-bold text-[11px] flex items-center justify-center shrink-0">
                          {apt.customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-navy leading-tight truncate max-w-[130px]">
                            {apt.customerName}
                          </p>
                          <p className="text-[10px] text-muted truncate max-w-[130px]">
                            {apt.serviceName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded font-mono ${
                          idx === 0 ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {idx === 0 ? '26 h' : '2 h'}
                        </span>
                        
                        {/* Hover Quick Actions ✔ and ✖ */}
                        <button
                          onClick={() => {
                            setApproveModalApt(apt);
                            setApproveModalStep(1);
                          }}
                          className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 shadow-2xs"
                          title="Approve"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setRejectModalApt(apt)}
                          className="w-6 h-6 rounded bg-white border border-red-400 text-red-600 flex items-center justify-center hover:bg-red-50"
                          title="Reject"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 2: Top Services Horizontal Bar Chart */}
              <div className="bg-white p-5 rounded-card border border-line shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-line">
                  <h4 className="font-extrabold text-xs text-navy uppercase tracking-wider">
                    Top services
                  </h4>
                  <span className="text-[10px] text-muted">Share %</span>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { name: 'Brake System Service', pct: 34 },
                    { name: 'Computer Diagnostics', pct: 28 },
                    { name: 'Body Repair & Paint', pct: 18 },
                    { name: 'Engine Overhaul', pct: 12 },
                    { name: 'Oil & Filter Change', pct: 8 }
                  ].map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-slate-800">{s.name}</span>
                        <span className="font-mono text-navy">{s.pct}%</span>
                      </div>
                      <div className="w-full bg-mist h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-orange-signal h-full rounded-full"
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 3: Message Delivery Radial Progress */}
              <div className="bg-white p-5 rounded-card border border-line shadow-2xs space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-line">
                    <h4 className="font-extrabold text-xs text-navy uppercase tracking-wider">
                      Message delivery
                    </h4>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                      High Health
                    </span>
                  </div>
                  <div className="text-center py-2">
                    <div className="text-3xl font-black text-navy font-mono">98.2%</div>
                    <span className="text-xs text-muted">Automated Delivery Success</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-1 border-t border-line">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <Mail className="w-3.5 h-3.5 text-emerald-600" /> Email Deliveries
                    </span>
                    <span className="font-mono font-bold text-emerald-700">99.1% ✔</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <Send className="w-3.5 h-3.5 text-[#229ED9]" /> Telegram Deliveries
                    </span>
                    <span className="font-mono font-bold text-emerald-700">97.4% ✔</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-red-600 font-bold">2 failed messages</span>
                    <button
                      onClick={() => showToast('Triggered automatic retry for 2 messages', 'info')}
                      className="text-red-700 font-bold hover:underline"
                    >
                      Retry now ›
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Today's Schedule Timeline & Recent Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left 60%: Today's Schedule with "now" line */}
              <div className="lg:col-span-7 bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <h3 className="text-sm font-extrabold text-navy">
                    Today's workshop schedule (Bay 1–4)
                  </h3>
                  <span className="text-xs text-muted font-mono">08:00 – 18:00</span>
                </div>

                <div className="relative space-y-3.5 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-line">
                  <div className="relative pl-7 text-xs">
                    <div className="absolute left-1.5 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-400" />
                    <div className="p-2.5 rounded-card bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-slate-500 font-bold">08:30 – 09:30</span>
                        <p className="font-extrabold text-navy">Toyota Hilux · [ET-3-99881]</p>
                        <span className="text-[11px] text-muted">Oil & Filter Change (Bay #1 · Dawit K.)</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                        Completed
                      </span>
                    </div>
                  </div>

                  {/* "Now" Marker Line */}
                  <div className="relative pl-7 my-2 flex items-center gap-2">
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-200 animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 font-mono">
                      ● Now 10:15 AM
                    </span>
                    <div className="flex-1 h-0.5 bg-red-400 border-dashed" />
                  </div>

                  <div className="relative pl-7 text-xs">
                    <div className="absolute left-1.5 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500" />
                    <div className="p-2.5 rounded-card bg-blue-50/70 border border-blue-200 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-blue-900 font-bold">10:00 – 11:30</span>
                        <p className="font-extrabold text-navy">Toyota Vitz · [AA-12345]</p>
                        <span className="text-[11px] text-blue-800">Brake Service (Bay #2 · ሳሙኤል በቀለ)</span>
                      </div>
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                        In progress
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 40%: Recent Activity Feed */}
              <div className="lg:col-span-5 bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <h3 className="text-sm font-extrabold text-navy">
                    Recent activity
                  </h3>
                  <span className="text-xs text-orange-deep font-bold">Audit trail</span>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { user: 'Mekdes A.', text: 'approved ABG-2026-0042 (Toyota Vitz)', time: '10 min ago', avatar: 'MA' },
                    { user: 'Samuel B.', text: 'moved ABG-2026-0041 to In Progress (Bay #2)', time: '28 min ago', avatar: 'SB' },
                    { user: 'System Bot', text: 'sent Telegram reminder to Dawit Kebede', time: '45 min ago', avatar: '🤖' },
                    { user: 'Dawit K.', text: 'completed inspection on Isuzu NPR Truck', time: '1 hour ago', avatar: 'DK' },
                  ].map((act, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-navy text-orange-signal font-bold text-[10px] flex items-center justify-center shrink-0">
                        {act.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-800 leading-snug">
                          <strong className="text-navy">{act.user}</strong> {act.text}
                        </p>
                        <span className="text-[10px] text-muted block mt-0.5 font-mono">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ----------------- 4. TAB 2: APPOINTMENTS SCREEN (MASTER-DETAIL LAYOUT) ----------------- */}
        {activeTab === 'appointments' && (
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* Top Toolbar: Saved View Tabs + Filter Chips */}
            <div className="bg-white border-b border-line px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              {/* Saved View Tabs */}
              <div className="flex items-center gap-2">
                {[
                  { id: 'pending', label: 'Pending', count: pendingApts.length },
                  { id: 'today', label: 'Today', count: 12 },
                  { id: 'this_week', label: 'This week', count: 31 },
                  { id: 'all', label: 'All', count: appointments.length },
                ].map((tab) => {
                  const isActive = appointmentViewTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setAppointmentViewTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'text-orange-deep bg-orange-tint border-b-2 border-orange-signal'
                          : 'text-slate-600 hover:text-navy hover:bg-mist'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-orange-signal text-navy' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Removable Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto">
                {filterChips.map(chip => (
                  <span
                    key={chip.id}
                    className="inline-flex items-center gap-1 bg-mist border border-line text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0"
                  >
                    <span>{chip.label}</span>
                    <button onClick={() => removeFilterChip(chip.id)} className="hover:text-red-600">
                      ✕
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => showToast('View saved to quick tabs', 'success')}
                  className="text-xs font-bold text-orange-deep hover:underline shrink-0"
                >
                  Save view
                </button>
              </div>
            </div>

            {/* MASTER-DETAIL WORKSPACE: 60% LIST ON LEFT, 40% STICKY DETAIL PANEL ON RIGHT */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* 60% MASTER LIST */}
              <div className="flex-1 lg:w-[60%] overflow-y-auto border-r border-line bg-white divide-y divide-line">
                {filteredAppointments.map((apt) => {
                  const isSelected = selectedDetailApt?.id === apt.id;
                  const isRowChecked = selectedRowIds.includes(apt.id);

                  return (
                    <div
                      key={apt.id}
                      onClick={() => setSelectedDetailApt(apt)}
                      className={`p-4 transition-all cursor-pointer relative flex items-center justify-between gap-4 group ${
                        isSelected
                          ? 'bg-orange-50/70'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Orange Left Bar when selected */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-signal" />
                      )}

                      <div className="flex items-center gap-3 min-w-0">
                        {/* Checkbox for bulk actions */}
                        <input
                          type="checkbox"
                          checked={isRowChecked}
                          onChange={(e) => {
                            e.stopPropagation();
                            setSelectedRowIds(prev =>
                              prev.includes(apt.id) ? prev.filter(id => id !== apt.id) : [...prev, apt.id]
                            );
                          }}
                          className="w-4 h-4 accent-orange-signal rounded cursor-pointer"
                        />

                        {/* Customer Avatar + Info */}
                        <div className="w-9 h-9 rounded-full bg-navy text-orange-signal font-extrabold text-xs flex items-center justify-center shrink-0">
                          {apt.customerName.charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-navy text-xs truncate">
                              {apt.customerName}
                            </span>
                            <span className="text-[11px] text-muted font-mono">
                              {apt.customerPhone}
                            </span>
                          </div>

                          {/* Car + Service Soft Chip */}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center gap-1 bg-slate-100 text-navy font-mono font-bold text-[10px] px-1.5 py-0.2 rounded border border-line">
                              <Car className="w-2.5 h-2.5" />
                              <span>{apt.vehiclePlate}</span>
                            </span>
                            <span className="text-xs text-slate-700 truncate">
                              {apt.vehicleMake} {apt.vehicleModel}
                            </span>
                            <span className="bg-orange-tint text-orange-deep text-[10px] font-bold px-2 py-0.2 rounded-full truncate">
                              {apt.serviceName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Details: Time label, Waiting Pill, Status Badge & Quick Actions */}
                      <div className="flex items-center gap-3 shrink-0 text-right">
                        <div>
                          <span className="text-xs font-mono font-bold text-navy block">
                            Tomorrow · {apt.requestedSlot}
                          </span>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.2 rounded-full border border-amber-200">
                            2 h 14 m
                          </span>
                        </div>

                        <StatusBadge status={apt.status} locale={locale} />

                        {/* Hover Quick Actions ✔ ✖ 👁 */}
                        <div className="hidden group-hover:flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setApproveModalApt(apt);
                              setApproveModalStep(1);
                            }}
                            className="w-7 h-7 rounded bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 shadow-2xs"
                            title="Quick Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setRejectModalApt(apt);
                            }}
                            className="w-7 h-7 rounded bg-white border border-red-400 text-red-600 flex items-center justify-center hover:bg-red-50"
                            title="Quick Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 40% STICKY DETAIL PANEL ON RIGHT */}
              <div className="hidden lg:flex lg:w-[40%] flex-col justify-between bg-mist overflow-y-auto border-l border-line p-6">
                {selectedDetailApt ? (
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-line">
                      <div>
                        <span className="text-xs font-mono font-bold text-muted block">
                          Ref: {selectedDetailApt.ref}
                        </span>
                        <h3 className="text-lg font-black text-navy">
                          {selectedDetailApt.customerName}
                        </h3>
                      </div>
                      <StatusBadge status={selectedDetailApt.status} locale={locale} />
                    </div>

                    {/* Customer & Vehicle Info Card */}
                    <div className="bg-white p-4 rounded-card border border-line shadow-2xs space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted font-bold">ስልክ ቁጥር:</span>
                        <a href={`tel:${selectedDetailApt.customerPhone}`} className="text-orange-deep font-bold font-mono">
                          {selectedDetailApt.customerPhone}
                        </a>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted font-bold">ኢሜይል:</span>
                        <span className="font-mono text-slate-700">{selectedDetailApt.customerEmail}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted font-bold">መኪና:</span>
                        <span className="font-bold text-navy">
                          {selectedDetailApt.vehicleMake} {selectedDetailApt.vehicleModel} ({selectedDetailApt.vehicleYear})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted font-bold">ሰሌዳ:</span>
                        <span className="bg-slate-100 text-navy font-mono font-bold text-xs px-2 py-0.5 rounded border border-line">
                          🇪🇹 {selectedDetailApt.vehiclePlate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted font-bold">የተጠየቀ ቀን:</span>
                        <span className="font-mono font-bold text-navy">
                          {selectedDetailApt.requestedDate} @ {selectedDetailApt.requestedSlot}
                        </span>
                      </div>
                    </div>

                    {/* Problem Description */}
                    <div className="bg-white p-4 rounded-card border border-line shadow-2xs space-y-2 text-xs">
                      <span className="font-extrabold text-navy uppercase tracking-wider text-[11px] block">
                        የተገለጸው ችግር (Fault Description)
                      </span>
                      <p className="text-slate-700 leading-relaxed italic bg-slate-50 p-2.5 rounded-btn border border-line">
                        "{selectedDetailApt.problemDescription}"
                      </p>
                    </div>

                    {/* Delivery Status Chips */}
                    <div className="bg-white p-4 rounded-card border border-line shadow-2xs space-y-2 text-xs">
                      <span className="font-extrabold text-navy uppercase tracking-wider text-[11px] block">
                        የማሳወቂያ ቻናሎች (Telemetry)
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <Mail className="w-3.5 h-3.5 text-emerald-600" /> Email Verified
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-[#229ED9] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                          <Send className="w-3.5 h-3.5" /> Telegram Linked
                        </span>
                      </div>
                    </div>

                    {/* Sticky Action Bar at Bottom of Panel */}
                    <div className="pt-4 border-t border-line grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setApproveModalApt(selectedDetailApt);
                          setApproveModalStep(1);
                        }}
                        className="h-12 rounded-card bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>✔ Approve</span>
                      </button>

                      <button
                        onClick={() => setRejectModalApt(selectedDetailApt)}
                        className="h-12 rounded-card bg-white border-2 border-red-500 hover:bg-red-50 text-red-600 font-black text-xs flex items-center justify-center gap-2 active:scale-98 transition-all"
                      >
                        <X className="w-4 h-4 stroke-[3]" />
                        <span>✖ Reject</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-muted">
                    <p>Select an appointment to inspect full details</p>
                  </div>
                )}
              </div>

            </div>

            {/* Floating Bulk-Action Bar when rows are selected */}
            {selectedRowIds.length > 0 && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-navy text-white px-5 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-4 text-xs animate-in slide-in-from-bottom-2">
                <span className="font-bold">
                  {selectedRowIds.length} appointments selected
                </span>
                <div className="h-4 w-px bg-slate-600" />
                <button
                  onClick={() => {
                    bulkUpdateAppointments(selectedRowIds, 'approved');
                    setSelectedRowIds([]);
                    showToast(`${selectedRowIds.length} requests approved in bulk!`, 'success');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3 py-1.5 rounded-full"
                >
                  Bulk Approve
                </button>
                <button
                  onClick={() => {
                    bulkUpdateAppointments(selectedRowIds, 'rejected');
                    setSelectedRowIds([]);
                    showToast(`${selectedRowIds.length} requests rejected`, 'info');
                  }}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold px-3 py-1.5 rounded-full"
                >
                  Bulk Reject
                </button>
                <button
                  onClick={() => setSelectedRowIds([])}
                  className="text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Small Footer with Keyboard Hints */}
            <div className="h-8 bg-white border-t border-line px-6 flex items-center justify-between text-[11px] text-muted font-mono shrink-0">
              <div className="flex items-center gap-4">
                <span><kbd className="bg-mist px-1.5 py-0.5 rounded border border-line">J</kbd> / <kbd className="bg-mist px-1.5 py-0.5 rounded border border-line">K</kbd> move</span>
                <span><kbd className="bg-mist px-1.5 py-0.5 rounded border border-line">A</kbd> approve</span>
                <span><kbd className="bg-mist px-1.5 py-0.5 rounded border border-line">R</kbd> reject</span>
                <span><kbd className="bg-mist px-1.5 py-0.5 rounded border border-line">Esc</kbd> close</span>
              </div>
              <span>Abegaz Motors Master-Detail Dispatch Console</span>
            </div>

          </div>
        )}

        {/* ----------------- 5. TAB 3: ANALYTICS PAGE (DESKTOP 1440) ----------------- */}
        {activeTab === 'analytics' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
            
            {/* 1. PAGE HEADER: title "Analytics", date range presets, compare toggle, Export CSV/PDF */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-line">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl font-black text-navy tracking-tight">
                    Analytics
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-tint text-orange-deep border border-orange-200">
                    Workshop Intelligence
                  </span>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  Real-time metrics, capacity telemetry, service demand and automated dispatch health
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Date range picker presets */}
                <div className="bg-white p-1 rounded-xl border border-line flex items-center text-xs font-bold shadow-2xs">
                  {['Today', '7 days', '30 days', 'This quarter', 'Custom'].map(period => (
                    <button
                      key={period}
                      onClick={() => {
                        setAnalyticsDateRange(period);
                        if (period === 'Custom') {
                          setAnalyticsEmpty(!analyticsEmpty);
                        } else {
                          setAnalyticsEmpty(false);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg transition-all text-xs ${
                        analyticsDateRange === period
                          ? 'bg-navy text-white font-black shadow-xs'
                          : 'text-slate-600 hover:text-navy'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>

                {/* Compare with previous period toggle */}
                <label className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-line text-xs font-bold text-navy cursor-pointer select-none shadow-2xs hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={comparePrevious}
                    onChange={(e) => setComparePrevious(e.target.checked)}
                    className="accent-orange-signal rounded w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>Compare with previous period</span>
                </label>

                {/* Export Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => showToast('Exporting analytics data as CSV...', 'info')}
                    className="px-3 py-1.5 rounded-xl bg-white border border-line text-navy hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => showToast('Generating high-resolution Analytics PDF report...', 'info')}
                    className="px-3.5 py-1.5 rounded-xl bg-orange-signal text-navy font-black text-xs hover:bg-orange-400 flex items-center gap-1.5 shadow-xs transition-colors active:scale-98"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </button>

                  {/* Dev toggle to preview skeleton state */}
                  <button
                    onClick={() => setAnalyticsLoading(!analyticsLoading)}
                    title="Toggle Skeleton / Loaded state"
                    className="p-1.5 rounded-xl bg-mist hover:bg-slate-200 text-slate-500 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${analyticsLoading ? 'animate-spin text-orange-deep' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. SUB-TABS: Overview (active) · Appointments · Services · Customers · Notifications */}
            <div className="flex items-center gap-1 border-b border-line pb-px overflow-x-auto text-xs font-bold">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'appointments', label: 'Appointments' },
                { id: 'services', label: 'Services' },
                { id: 'customers', label: 'Customers' },
                { id: 'notifications', label: 'Notifications' },
              ].map(tab => {
                const isActive = analyticsTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAnalyticsTab(tab.id as any)}
                    className={`px-4 py-2 border-b-2 transition-all relative ${
                      isActive
                        ? 'border-orange-signal text-navy font-black'
                        : 'border-transparent text-slate-500 hover:text-navy hover:border-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* EMPTY STATE conditional when "Custom" or empty toggle is triggered */}
            {analyticsEmpty ? (
              <div className="bg-white rounded-card border border-line p-12 text-center shadow-2xs space-y-4 max-w-xl mx-auto my-8">
                <div className="w-14 h-14 rounded-full bg-mist text-slate-400 flex items-center justify-center mx-auto text-2xl">
                  📊
                </div>
                <div>
                  <h3 className="font-extrabold text-navy text-base">No data for this period</h3>
                  <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
                    We could not find workshop operations or appointment dispatch telemetry matching the selected date filters.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setAnalyticsDateRange('30 days');
                      setAnalyticsEmpty(false);
                    }}
                    className="px-4 py-2 rounded-btn bg-orange-signal text-navy font-black text-xs hover:bg-orange-400 transition-all shadow-xs"
                  >
                    Change date range
                  </button>
                </div>
              </div>
            ) : analyticsLoading ? (
              /* LOADING SKELETONS */
              <div className="space-y-6 animate-pulse">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white p-5 rounded-card border border-line h-32 space-y-3">
                      <div className="h-3 bg-slate-200 rounded w-1/2" />
                      <div className="h-7 bg-slate-300 rounded w-2/3" />
                      <div className="h-2 bg-slate-200 rounded w-full" />
                    </div>
                  ))}
                </div>
                <div className="h-24 bg-orange-100/60 rounded-card border border-orange-200" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7].map(i => (
                    <div key={i} className="bg-white p-6 rounded-card border border-line h-72 space-y-4">
                      <div className="h-4 bg-slate-200 rounded w-1/3" />
                      <div className="h-48 bg-mist rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* 3. KPI STRIP (4 cards with trend chips and sparklines) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: 'Total requests',
                      val: '128',
                      trend: '▲ 18%',
                      trendPositive: true,
                      prevVal: '108 last period',
                      sparkline: [35, 45, 52, 60, 58, 72, 85, 96, 110, 128]
                    },
                    {
                      title: 'Approval rate',
                      val: '86%',
                      trend: '▲ 4%',
                      trendPositive: true,
                      prevVal: '82% last period',
                      sparkline: [78, 80, 81, 79, 82, 84, 85, 83, 86, 86]
                    },
                    {
                      title: 'Avg. response time',
                      val: '38 min',
                      trend: '▼ 9 min',
                      trendPositive: true,
                      prevVal: '47 min last period',
                      sparkline: [55, 52, 48, 50, 46, 44, 41, 40, 39, 38]
                    },
                    {
                      title: 'Completion rate',
                      val: '92%',
                      trend: '▲ 2.5%',
                      trendPositive: true,
                      prevVal: '89.5% last period',
                      sparkline: [88, 87, 89, 90, 89, 91, 90, 92, 91, 92]
                    },
                  ].map((kpi, idx) => {
                    const min = Math.min(...kpi.sparkline);
                    const max = Math.max(...kpi.sparkline);
                    const range = max - min || 1;
                    return (
                      <div key={idx} className="bg-white p-5 rounded-card border border-line shadow-2xs hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between text-xs font-bold text-muted">
                          <span>{kpi.title}</span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            kpi.trendPositive ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
                          }`}>
                            {kpi.trend}
                          </span>
                        </div>
                        <div className="text-3xl font-black font-mono mt-2 text-navy">
                          {kpi.val}
                        </div>

                        {/* Sparkline Visual */}
                        <div className="mt-3 flex items-end gap-1 h-8 pt-1">
                          {kpi.sparkline.map((v, sIdx) => {
                            const pct = Math.max(15, Math.round(((v - min) / range) * 100));
                            return (
                              <div
                                key={sIdx}
                                className="flex-1 bg-orange-signal/30 hover:bg-orange-signal rounded-xs transition-colors cursor-pointer"
                                style={{ height: `${pct}%` }}
                                title={`Step ${sIdx + 1}: ${v}`}
                              />
                            );
                          })}
                        </div>

                        {/* Compare note */}
                        {comparePrevious && (
                          <div className="mt-2 text-[10px] text-muted flex items-center justify-between border-t border-slate-100 pt-1.5 font-medium">
                            <span>vs. previous period</span>
                            <span className="font-mono font-bold text-slate-700">{kpi.prevVal}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* 4. "INSIGHTS" CARD (Orange Tint background, spark icon) */}
                <div className="bg-orange-tint p-5 rounded-card border border-orange-200/90 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-orange-deep font-black text-xs uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-orange-signal fill-orange-signal" />
                      <span>Intelligent Workshop Insights</span>
                    </div>
                    <span className="text-[10px] text-orange-deep font-mono font-bold bg-white/70 px-2 py-0.5 rounded-full border border-orange-200">
                      Auto-generated 5 min ago
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-navy font-medium pt-1">
                    <div className="bg-white/80 p-3 rounded-btn border border-orange-200/60 flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-orange-signal text-navy font-black text-[11px] flex items-center justify-center shrink-0">
                        1
                      </div>
                      <p className="leading-snug">
                        <strong>Thursday 10:00</strong> is your busiest slot — consider adding capacity or reserving Bay #3.
                      </p>
                    </div>

                    <div className="bg-white/80 p-3 rounded-btn border border-orange-200/60 flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-orange-signal text-navy font-black text-[11px] flex items-center justify-center shrink-0">
                        2
                      </div>
                      <p className="leading-snug">
                        Requests waiting more than 24 hours <strong>dropped by 40%</strong> after enabling Telegram alerts.
                      </p>
                    </div>

                    <div className="bg-white/80 p-3 rounded-btn border border-orange-200/60 flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-orange-signal text-navy font-black text-[11px] flex items-center justify-center shrink-0">
                        3
                      </div>
                      <p className="leading-snug">
                        <strong>Brake Service</strong> is up <strong>18% this month</strong>, making it the most requested mechanical line.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. CHARTS GRID (2 columns, Recharts look) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* CHART 1: "Requests by week" — stacked BarChart (Approved in orange, Rejected in slate, Pending in light slate) */}
                  <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-navy">Requests by week</h3>
                        <p className="text-[11px] text-muted">Weekly volume grouped by approval outcome</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => showToast('Requests by week data downloaded', 'info')}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy transition-colors"
                          title="Options"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Legend made of pills */}
                    <div className="flex items-center gap-2 text-[11px] font-bold">
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-tint text-orange-deep border border-orange-200">
                        <span className="w-2 h-2 rounded-full bg-orange-signal" /> Approved
                      </span>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-slate-700" /> Rejected
                      </span>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-50 text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-slate-300" /> Pending
                      </span>
                    </div>

                    {/* Stacked Bars with grid lines */}
                    <div className="h-52 pt-4 px-2 flex flex-col justify-end border-b border-line relative">
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="border-b border-slate-300 w-full" />
                        <div className="border-b border-slate-300 w-full" />
                        <div className="border-b border-slate-300 w-full" />
                      </div>

                      <div className="flex items-end justify-between gap-6 h-40 z-10">
                        {[
                          { week: 'Wk 1 (Oct 12)', approved: 22, rejected: 3, pending: 4, total: 29 },
                          { week: 'Wk 2 (Oct 19)', approved: 28, rejected: 2, pending: 5, total: 35 },
                          { week: 'Wk 3 (Oct 26)', approved: 34, rejected: 4, pending: 6, total: 44 },
                          { week: 'Wk 4 (Nov 02)', approved: 42, rejected: 3, pending: 8, total: 53 },
                        ].map((w, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                            <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-navy transition-colors">
                              {w.total}
                            </span>
                            <div
                              className="w-full max-w-[48px] flex flex-col-reverse rounded-t-lg overflow-hidden bg-slate-100 shadow-2xs transition-transform group-hover:scale-102"
                              style={{ height: `${(w.total / 55) * 100}%` }}
                              title={`${w.week}: ${w.approved} approved, ${w.rejected} rejected, ${w.pending} pending`}
                            >
                              <div
                                className="bg-orange-signal transition-all"
                                style={{ height: `${(w.approved / w.total) * 100}%` }}
                              />
                              <div
                                className="bg-slate-700 transition-all"
                                style={{ height: `${(w.rejected / w.total) * 100}%` }}
                              />
                              <div
                                className="bg-slate-300 transition-all"
                                style={{ height: `${(w.pending / w.total) * 100}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-600 mt-1">
                              {w.week.split(' ')[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CHART 2: "Peak hours" — a 7-day x 10-hour heatmap grid in orange intensity */}
                  <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-navy">Peak hours</h3>
                        <p className="text-[11px] text-muted">7-day × 10-hour garage occupancy heatmap</p>
                      </div>
                      <button
                        onClick={() => showToast('Peak hours heat distribution exported', 'info')}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Legend pills */}
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-normal">Intensity:</span>
                        <span className="w-3 h-3 rounded bg-orange-tint border border-orange-200" title="Low" />
                        <span className="w-3 h-3 rounded bg-orange-200" title="Medium-Low" />
                        <span className="w-3 h-3 rounded bg-orange-400" title="Medium-High" />
                        <span className="w-3 h-3 rounded bg-orange-signal" title="High" />
                        <span className="w-3 h-3 rounded bg-orange-deep" title="Peak" />
                      </div>
                      <span className="text-orange-deep font-black">
                        {analyticsHeatmapHover ? `${analyticsHeatmapHover.day} ${analyticsHeatmapHover.hour}:00 — ${analyticsHeatmapHover.val} requests` : 'Thu 10:00 highest (14 apts)'}
                      </span>
                    </div>

                    {/* 7-day x 10-hour Heatmap */}
                    <div className="space-y-1.5 text-[10px]">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dIdx) => (
                        <div key={day} className="flex items-center gap-2">
                          <span className="w-7 font-mono font-bold text-slate-500 text-right">{day}</span>
                          <div className="flex-1 grid grid-cols-10 gap-1">
                            {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => {
                              // Realistic distribution: peak at Thu 10:00, busy midmornings
                              let intensityClass = 'bg-orange-50 hover:bg-orange-100';
                              let val = 1;

                              if (day === 'Sun') {
                                intensityClass = 'bg-slate-100 text-slate-400'; // Closed or very light
                                val = 0;
                              } else if (dIdx === 3 && hour === 10) {
                                intensityClass = 'bg-orange-deep shadow-xs';
                                val = 14;
                              } else if ((hour === 10 || hour === 11) && dIdx < 5) {
                                intensityClass = 'bg-orange-signal';
                                val = 10;
                              } else if ((hour === 9 || hour === 14 || hour === 15) && dIdx < 6) {
                                intensityClass = 'bg-orange-400';
                                val = 7;
                              } else if (hour >= 12 && hour <= 13) {
                                intensityClass = 'bg-orange-200';
                                val = 4;
                              } else {
                                intensityClass = 'bg-orange-100';
                                val = 2;
                              }

                              return (
                                <div
                                  key={hour}
                                  onMouseEnter={() => setAnalyticsHeatmapHover({ day, hour, val })}
                                  onMouseLeave={() => setAnalyticsHeatmapHover(null)}
                                  className={`h-5 rounded-xs ${intensityClass} cursor-pointer transition-transform hover:scale-115 hover:ring-2 hover:ring-navy`}
                                  title={`${day} @ ${hour}:00 — ${val} appointments`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-muted font-mono pt-1 border-t border-slate-100">
                      <span>08:00 AM (Open)</span>
                      <span>12:00 PM (Midday)</span>
                      <span>05:00 PM (Close)</span>
                    </div>
                  </div>

                  {/* CHART 3: "Service popularity" — horizontal bars with share percentages */}
                  <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-navy">Service popularity</h3>
                        <p className="text-[11px] text-muted">Distribution of job orders across workshop lines</p>
                      </div>
                      <button
                        onClick={() => showToast('Service popularity breakdown exported', 'info')}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-2 text-[11px] font-bold">
                      <span className="px-2 py-0.5 rounded-full bg-navy text-white text-[10px]">
                        Share of total bookings
                      </span>
                    </div>

                    <div className="space-y-3 pt-1 text-xs">
                      {[
                        { name: 'Brake Service & Hydraulics', share: 28, count: '36 jobs', color: 'bg-navy' },
                        { name: 'Engine Oil & Filter Service', share: 22, count: '28 jobs', color: 'bg-navy' },
                        { name: 'Computerized Engine Diagnostics', share: 18, count: '23 jobs', color: 'bg-navy' },
                        { name: 'Suspension, Alignment & Bushings', share: 14, count: '18 jobs', color: 'bg-navy' },
                        { name: 'AC Refrigerant & Climate Control', share: 10, count: '13 jobs', color: 'bg-slate-700' },
                        { name: 'Transmission & Gearbox Fluid', share: 8, count: '10 jobs', color: 'bg-slate-500' },
                      ].map((svc) => (
                        <div key={svc.name} className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-navy truncate max-w-[240px]">{svc.name}</span>
                            <div className="flex items-center gap-2 font-mono">
                              <span className="text-slate-400">{svc.count}</span>
                              <span className="text-navy font-bold w-10 text-right">{svc.share}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-mist h-2.5 rounded-full overflow-hidden border border-slate-100">
                            <div
                              className={`${svc.color} h-full rounded-full transition-all duration-500`}
                              style={{ width: `${svc.share}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CHART 4: "Customer mix" — Donut "Individual vs Business" + Line "New vs returning" */}
                  <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-navy">Customer mix</h3>
                        <p className="text-[11px] text-muted">Client segmentation & recurring retention</p>
                      </div>
                      <button
                        onClick={() => showToast('Customer mix insights exported', 'info')}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-tint text-orange-deep">
                        <span className="w-2 h-2 rounded-full bg-orange-signal" /> Individual (68%)
                      </span>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-navy" /> Fleet / Business (32%)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                      {/* Donut representation using CSS conic gradient */}
                      <div className="flex flex-col items-center justify-center p-3">
                        <div
                          className="w-32 h-32 rounded-full relative flex items-center justify-center shadow-inner"
                          style={{
                            background: 'conic-gradient(#F97316 0% 68%, #0F172A 68% 100%)'
                          }}
                        >
                          <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center shadow-xs">
                            <span className="text-base font-black font-mono text-navy">128</span>
                            <span className="text-[9px] uppercase font-bold text-muted tracking-wider">Clients</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-muted mt-2 font-mono">68% Retail · 32% Fleet</span>
                      </div>

                      {/* New vs Returning customer bars */}
                      <div className="space-y-3">
                        <div className="p-3 bg-mist rounded-card border border-line">
                          <div className="flex items-center justify-between text-xs font-bold mb-1">
                            <span className="text-navy">New customers</span>
                            <span className="font-mono text-orange-deep font-black">54 (42%)</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-orange-signal h-full rounded-full" style={{ width: '42%' }} />
                          </div>
                          <span className="text-[10px] text-muted block mt-1">Acquired from Google & Telegram</span>
                        </div>

                        <div className="p-3 bg-mist rounded-card border border-line">
                          <div className="flex items-center justify-between text-xs font-bold mb-1">
                            <span className="text-navy">Returning customers</span>
                            <span className="font-mono text-navy font-black">74 (58%)</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-navy h-full rounded-full" style={{ width: '58%' }} />
                          </div>
                          <span className="text-[10px] text-muted block mt-1">Regular service & fleet maintenance</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CHART 5: "Response time" — a histogram of buckets */}
                  <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-navy">Response time</h3>
                        <p className="text-[11px] text-muted">Distribution from booking submission to staff review</p>
                      </div>
                      <button
                        onClick={() => showToast('Response time breakdown exported', 'info')}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-2 text-[11px] font-bold">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Median: 24 minutes (Target &lt; 45m Met ✔)
                      </span>
                    </div>

                    {/* Histogram Bars */}
                    <div className="h-44 pt-4 flex items-end justify-between gap-4 border-b border-line px-2">
                      {[
                        { bucket: '< 15 min', count: 54, pct: 42, color: 'bg-emerald-600' },
                        { bucket: '15–60 min', count: 41, pct: 32, color: 'bg-orange-signal' },
                        { bucket: '1–4 h', count: 20, pct: 16, color: 'bg-slate-700' },
                        { bucket: '4–24 h', count: 9, pct: 7, color: 'bg-slate-400' },
                        { bucket: '> 24 h', count: 4, pct: 3, color: 'bg-red-500' },
                      ].map((b, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                          <span className="text-[10px] font-mono font-bold text-slate-600 group-hover:text-navy">
                            {b.pct}%
                          </span>
                          <div
                            className={`w-full max-w-[46px] rounded-t-md ${b.color} transition-all duration-300 group-hover:opacity-90`}
                            style={{ height: `${b.pct * 2.2}px` }}
                            title={`${b.bucket}: ${b.count} bookings (${b.pct}%)`}
                          />
                          <span className="text-[10px] font-bold text-slate-500 truncate text-center w-full">
                            {b.bucket}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CHART 6: "Top vehicle makes" — a bar chart of top 8 makes */}
                  <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-navy">Top vehicle makes</h3>
                        <p className="text-[11px] text-muted">Fleet breakdown serviced across Addis Ababa</p>
                      </div>
                      <button
                        onClick={() => showToast('Vehicle makes dataset exported', 'info')}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2 text-xs pt-1">
                      {[
                        { make: 'Toyota (Vitz, Hilux, Land Cruiser, Corolla)', share: 38, count: '48 cars' },
                        { make: 'Suzuki (Dzire, Swift, Ertiga)', share: 20, count: '26 cars' },
                        { make: 'Hyundai (Tucson, Elantra, Santa Fe)', share: 14, count: '18 cars' },
                        { make: 'Isuzu (NPR, FSR Commercial Trucks)', share: 10, count: '13 trucks' },
                        { make: 'Nissan (Patrol, X-Trail)', share: 6, count: '8 cars' },
                        { make: 'Ford (Ranger, Everest)', share: 4, count: '5 cars' },
                        { make: 'Mitsubishi (Pajero, L200)', share: 4, count: '5 cars' },
                        { make: 'Others (Mercedes, BYD, Geely)', share: 4, count: '5 cars' },
                      ].map((m) => (
                        <div key={m.make} className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-navy truncate max-w-[260px]">{m.make}</span>
                            <div className="flex items-center gap-2 font-mono">
                              <span className="text-slate-400 text-[10px]">{m.count}</span>
                              <span className="text-navy font-bold">{m.share}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-mist h-2 rounded-full overflow-hidden border border-slate-100">
                            <div
                              className="bg-navy h-full rounded-full transition-all duration-500"
                              style={{ width: `${m.share}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CHART 7: "Message delivery by channel" — stacked bars of Email and Telegram (sent vs failed) */}
                  <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-4 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-navy">Message delivery by channel</h3>
                        <p className="text-[11px] text-muted">Automated notification delivery telemetry across Customer Email and Telegram</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => showToast('Delivery health audit exported', 'info')}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-3 text-[11px] font-bold">
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" /> Delivered successfully
                      </span>
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                        <span className="w-2 h-2 rounded-full bg-red-500" /> Delivery Failed / Retried
                      </span>
                      <span className="text-muted font-normal ml-auto">
                        Average delivery latency: <strong className="text-navy font-mono">1.2 seconds</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {/* Email Channel */}
                      <div className="p-4 rounded-card bg-mist border border-line space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-navy flex items-center gap-2">
                            <Mail className="w-4 h-4 text-emerald-600" />
                            Customer Email Channel (SMTP / Resend)
                          </span>
                          <span className="font-mono font-black text-emerald-700 text-xs">
                            100% (128 / 128 sent)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
                          <div className="bg-emerald-500 h-full w-full" title="128 sent" />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-muted font-medium">
                          <span>0 bounces · 0 spam reports</span>
                          <span className="text-emerald-700 font-bold">Healthy endpoint</span>
                        </div>
                      </div>

                      {/* Telegram Channel */}
                      <div className="p-4 rounded-card bg-mist border border-line space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-navy flex items-center gap-2">
                            <Send className="w-4 h-4 text-[#229ED9]" />
                            Telegram Bot Channel (@AbegazMotorsBot)
                          </span>
                          <span className="font-mono font-black text-[#229ED9] text-xs">
                            98.4% (122 sent · 2 failed)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
                          <div className="bg-[#229ED9] h-full" style={{ width: '98.4%' }} title="122 delivered" />
                          <div className="bg-red-500 h-full" style={{ width: '1.6%' }} title="2 failed (blocked by user)" />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-muted font-medium">
                          <span>2 failed (User chat not initiated)</span>
                          <button
                            onClick={() => showToast('Triggered automatic Telegram resend queue', 'info')}
                            className="text-orange-deep font-bold hover:underline"
                          >
                            Retry failed (2) ›
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            )}

          </div>
        )}

        {/* ----------------- 6. TAB 4: NOTIFICATIONS & TELEMETRY PAGE (3-PANE LAYOUT) ----------------- */}
        {activeTab === 'notifications' && (
          <div className="flex flex-col h-full overflow-hidden bg-mist">
            
            {/* 1. HEADER: title "Notifications", tabs "Alerts (active) · Delivery log · Settings", and "Mark all as read" button */}
            <div className="bg-white border-b border-line px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-2xs">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-xl font-black text-navy tracking-tight flex items-center gap-2">
                    <Bell className="w-5 h-5 text-orange-signal" />
                    <span>Notifications</span>
                  </h2>
                </div>

                <div className="flex items-center gap-1 bg-mist p-1 rounded-xl border border-line text-xs font-bold shadow-2xs">
                  {[
                    { id: 'alerts', label: 'Alerts' },
                    { id: 'delivery_log', label: 'Delivery log' },
                    { id: 'settings', label: 'Settings' }
                  ].map(tab => {
                    const isActive = notifPageTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setNotifPageTab(tab.id as any)}
                        className={`px-3.5 py-1.5 rounded-lg transition-all ${
                          isActive
                            ? 'bg-navy text-white shadow-xs font-black'
                            : 'text-slate-600 hover:text-navy hover:bg-slate-200/60'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    showToast('All notifications marked as read', 'info');
                    setCheckedNotifIds([]);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-line text-navy hover:bg-slate-100 text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Mark all as read</span>
                </button>
              </div>
            </div>

            {/* 2. THREE-PANE LAYOUT INSIDE WHITE CARDS (ALERTS TAB) */}
            {notifPageTab === 'alerts' && (
              <div className="flex-1 flex overflow-hidden p-4 gap-4">
                
                {/* PANE 1: LEFT (220px) FILTER RAIL */}
                <div className="w-[220px] bg-white rounded-card border border-line p-3 space-y-1 shrink-0 overflow-y-auto text-xs shadow-2xs">
                  <span className="text-[10px] font-black uppercase tracking-wider text-muted px-2 block mb-2">
                    Filter by Type
                  </span>
                  {[
                    { id: 'all', label: 'All', count: 18 },
                    { id: 'unread', label: 'Unread', count: 3, countColor: 'bg-orange-signal text-navy' },
                    { id: 'requests', label: 'New requests', count: 7, countColor: 'bg-orange-tint text-orange-deep' },
                    { id: 'approvals', label: 'Approvals', count: 6, countColor: 'bg-emerald-50 text-emerald-700' },
                    { id: 'failures', label: 'Delivery failures', count: 2, countColor: 'bg-red-500 text-white' },
                    { id: 'system', label: 'System', count: 1, countColor: 'bg-blue-50 text-blue-700' },
                  ].map((filter) => {
                    const isActive = notifCategoryFilter === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setNotifCategoryFilter(filter.id as any)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-btn font-bold transition-all relative ${
                          isActive
                            ? 'bg-orange-tint text-navy font-black shadow-2xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-navy'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isActive && (
                            <span className="w-1.5 h-4 rounded-full bg-orange-signal absolute left-1" />
                          )}
                          <span className={isActive ? 'pl-2' : ''}>{filter.label}</span>
                        </div>
                        {filter.count !== undefined && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${filter.countColor || 'bg-slate-100 text-slate-700'}`}>
                            {filter.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* PANE 2: CENTER (LIST) GROUPED BY "TODAY" AND "EARLIER" */}
                <div className="flex-1 bg-white rounded-card border border-line overflow-y-auto divide-y divide-line shadow-2xs flex flex-col">
                  
                  {/* Bulk Action Header if any checkboxes are checked */}
                  {checkedNotifIds.length > 0 && (
                    <div className="p-2.5 bg-orange-tint border-b border-orange-200 px-4 flex items-center justify-between text-xs animate-in slide-in-from-top-1">
                      <span className="font-bold text-navy">
                        {checkedNotifIds.length} notification(s) selected
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            showToast(`Marked ${checkedNotifIds.length} as read`, 'info');
                            setCheckedNotifIds([]);
                          }}
                          className="px-2.5 py-1 bg-white border border-line rounded text-xs font-bold text-navy hover:bg-slate-50"
                        >
                          Mark as read
                        </button>
                        <button
                          onClick={() => setCheckedNotifIds([])}
                          className="text-xs text-muted hover:text-navy font-medium"
                        >
                          Deselect all
                        </button>
                      </div>
                    </div>
                  )}

                  {/* GROUP: TODAY */}
                  <div className="p-2.5 bg-mist text-[11px] font-black uppercase tracking-wider text-muted px-4 sticky top-0 z-10 border-b border-line">
                    Today
                  </div>

                  {[
                    {
                      id: 'n-1',
                      title: 'New request ABG-2026-0043',
                      summary: 'Brake Service · Toyota Vitz · AA-12345 · Thu 12 Nov 10:00',
                      time: '10:02 AM',
                      relative: '12 min ago',
                      unread: true,
                      type: 'clock',
                      category: 'requests',
                      customer: 'Dawit Kebede',
                      phone: '+251 911 234 567',
                      car: 'Toyota Vitz (2018)',
                      plate: 'AA-12345',
                      service: 'Brake Service & Inspection',
                      requestedSlot: 'Thu 12 Nov · 10:00 AM',
                      emailDelivered: true,
                      telegramDelivered: true,
                      ref: 'ABG-2026-0043'
                    },
                    {
                      id: 'n-2',
                      title: 'Mekdes approved ABG-2026-0042',
                      summary: 'Customer notified automatically by email and Telegram',
                      time: '09:45 AM',
                      relative: '35 min ago',
                      unread: true,
                      type: 'check',
                      category: 'approvals',
                      customer: 'Sara Girma',
                      phone: '+251 922 456 789',
                      car: 'Suzuki Dzire (2020)',
                      plate: 'AA-2-C67890',
                      service: 'Engine Oil & Filter Service',
                      requestedSlot: 'Thu 12 Nov · 02:00 PM',
                      emailDelivered: true,
                      telegramDelivered: true,
                      ref: 'ABG-2026-0042'
                    },
                    {
                      id: 'n-3',
                      title: 'Message delivery failure: Telegram',
                      summary: 'Telegram message to Dawit K. failed — user bot not initiated',
                      time: '08:15 AM',
                      relative: '2 hours ago',
                      unread: true,
                      type: 'alert',
                      category: 'failures',
                      customer: 'Dawit Kebede',
                      phone: '+251 911 234 567',
                      car: 'Toyota Hilux (2021)',
                      plate: 'AA-3-B11223',
                      service: 'Heavy Mechanical Checkup',
                      requestedSlot: 'Fri 13 Nov · 09:00 AM',
                      emailDelivered: true,
                      telegramDelivered: false,
                      ref: 'ABG-2026-0040'
                    },
                  ]
                    .filter(item => {
                      if (notifCategoryFilter === 'unread') return item.unread;
                      if (notifCategoryFilter === 'requests') return item.category === 'requests';
                      if (notifCategoryFilter === 'approvals') return item.category === 'approvals';
                      if (notifCategoryFilter === 'failures') return item.category === 'failures';
                      if (notifCategoryFilter === 'system') return item.category === 'system';
                      return true;
                    })
                    .map((item) => {
                      const isSelected = selectedNotifItem?.id === item.id;
                      const isChecked = checkedNotifIds.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedNotifItem(item)}
                          className={`p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors group relative ${
                            isSelected ? 'bg-orange-50/70 border-l-4 border-orange-signal' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Hover Checkbox for bulk actions */}
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setCheckedNotifIds(prev =>
                                  prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id]
                                );
                              }}
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-opacity ${
                                isChecked ? 'bg-orange-signal border-orange-signal opacity-100' : 'border-line group-hover:opacity-100 opacity-0 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 text-navy stroke-[3]" />}
                            </div>

                            {/* Icon Circle */}
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                              item.type === 'clock'
                                ? 'bg-orange-signal text-navy'
                                : item.type === 'check'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-red-100 text-red-600'
                            }`}>
                              {item.type === 'clock' && <Clock className="w-4 h-4" />}
                              {item.type === 'check' && <Check className="w-4 h-4 stroke-[2.5]" />}
                              {item.type === 'alert' && <AlertTriangle className="w-4 h-4" />}
                            </div>

                            {/* Text Summary */}
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-navy text-xs truncate">
                                  {item.title}
                                </h4>
                                {item.unread && (
                                  <span className="w-2 h-2 rounded-full bg-orange-signal shrink-0" title="Unread" />
                                )}
                              </div>
                              <p className="text-[11px] text-muted truncate mt-0.5">
                                {item.summary}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end shrink-0 pl-2">
                            <span className="text-[10px] text-muted font-mono">{item.time}</span>
                            <span className="text-[9px] text-slate-400 font-medium">{item.relative}</span>
                          </div>
                        </div>
                      );
                    })}

                  {/* GROUP: EARLIER */}
                  <div className="p-2.5 bg-mist text-[11px] font-black uppercase tracking-wider text-muted px-4 sticky top-0 z-10 border-b border-line mt-2">
                    Earlier
                  </div>

                  {[
                    {
                      id: 'n-4',
                      title: 'Bot connection is healthy',
                      summary: 'Automated Telegram webhook heartbeat verified (0 latency errors)',
                      time: 'Yesterday · 17:30',
                      relative: '18 hours ago',
                      unread: false,
                      type: 'system',
                      category: 'system',
                      customer: 'System Gateway',
                      phone: 'N/A',
                      car: 'Webhook Gateway',
                      plate: 'API-PORT-443',
                      service: 'Automated Bot Webhook',
                      requestedSlot: 'Recurring Health Check',
                      emailDelivered: true,
                      telegramDelivered: true,
                      ref: 'SYS-LOG-091'
                    },
                    {
                      id: 'n-5',
                      title: 'Appointment completed ABG-2026-0039',
                      summary: 'Full Brake Fluid Flush completed at Kality Bay #2',
                      time: 'Yesterday · 14:10',
                      relative: 'Yesterday',
                      unread: false,
                      type: 'check',
                      category: 'approvals',
                      customer: 'Alazar Tesfaye',
                      phone: '+251 933 789 012',
                      car: 'Hyundai Tucson (2022)',
                      plate: 'AA-4-D55667',
                      service: 'Full Brake Fluid Flush',
                      requestedSlot: 'Wed 11 Nov · 02:00 PM',
                      emailDelivered: true,
                      telegramDelivered: true,
                      ref: 'ABG-2026-0039'
                    }
                  ]
                    .filter(item => {
                      if (notifCategoryFilter === 'unread') return item.unread;
                      if (notifCategoryFilter === 'system') return item.category === 'system';
                      if (notifCategoryFilter === 'approvals') return item.category === 'approvals';
                      return true;
                    })
                    .map((item) => {
                      const isSelected = selectedNotifItem?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedNotifItem(item)}
                          className={`p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors opacity-85 group ${
                            isSelected ? 'bg-orange-50/70 border-l-4 border-orange-signal opacity-100' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                              {item.type === 'system' ? <Info className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-navy text-xs truncate">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-muted truncate mt-0.5">
                                {item.summary}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] text-muted font-mono shrink-0 pl-2">{item.time}</span>
                        </div>
                      );
                    })}
                </div>

                {/* PANE 3: RIGHT (320px DETAIL PREVIEW) */}
                <div className="w-[320px] bg-white rounded-card border border-line p-5 shrink-0 overflow-y-auto space-y-4 text-xs shadow-2xs flex flex-col justify-between">
                  {selectedNotifItem ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-line">
                        <span className="font-black text-navy text-xs uppercase tracking-wider">
                          Notification Context
                        </span>
                        <span className="font-mono text-[11px] font-bold text-orange-deep bg-orange-tint px-2 py-0.5 rounded-full border border-orange-200">
                          {selectedNotifItem.ref}
                        </span>
                      </div>

                      {/* Context Card: Customer, Car, Service, Time */}
                      <div className="p-4 rounded-card bg-mist border border-line space-y-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                            Customer Details
                          </span>
                          <p className="font-extrabold text-navy text-sm mt-0.5">
                            {selectedNotifItem.customer}
                          </p>
                          <p className="text-muted text-[11px] font-mono">
                            {selectedNotifItem.phone}
                          </p>
                        </div>

                        <div className="border-t border-slate-200 pt-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                            Vehicle & Service
                          </span>
                          <p className="font-bold text-navy text-xs mt-0.5">
                            {selectedNotifItem.car} · <span className="font-mono text-orange-deep">[{selectedNotifItem.plate}]</span>
                          </p>
                          <p className="text-slate-600 text-[11px] mt-0.5">
                            {selectedNotifItem.service}
                          </p>
                        </div>

                        <div className="border-t border-slate-200 pt-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                            Requested Slot
                          </span>
                          <p className="font-mono font-bold text-navy text-xs mt-0.5">
                            {selectedNotifItem.requestedSlot}
                          </p>
                        </div>
                      </div>

                      {/* Delivery Status Chips */}
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-muted block mb-2">
                          Live Dispatch Telemetry
                        </span>
                        <div className="space-y-2">
                          <div className={`p-2 rounded-btn flex items-center justify-between ${
                            selectedNotifItem.emailDelivered ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                          }`}>
                            <span className="font-bold flex items-center gap-1.5 text-[11px]">
                              <Mail className="w-3.5 h-3.5" />
                              Customer Email
                            </span>
                            <span className="font-mono text-[10px] font-bold">
                              {selectedNotifItem.emailDelivered ? 'Delivered ✔' : 'Failed ✖'}
                            </span>
                          </div>

                          <div className={`p-2 rounded-btn flex items-center justify-between ${
                            selectedNotifItem.telegramDelivered ? 'bg-blue-50 text-blue-900 border border-blue-200' : 'bg-red-50 text-red-800 border border-red-200'
                          }`}>
                            <span className="font-bold flex items-center gap-1.5 text-[11px]">
                              <Send className="w-3.5 h-3.5" />
                              Customer Telegram
                            </span>
                            <span className="font-mono text-[10px] font-bold">
                              {selectedNotifItem.telegramDelivered ? 'Delivered ✔' : 'Failed ✖'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons: "Open appointment", "Approve", "Mark as read" */}
                      <div className="space-y-2 pt-2">
                        <button
                          onClick={() => {
                            setActiveTab('appointments');
                            setAppointmentViewTab('pending');
                          }}
                          className="w-full py-2.5 rounded-btn bg-orange-signal text-navy font-black text-xs hover:bg-orange-400 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open appointment</span>
                        </button>

                        <button
                          onClick={() => {
                            const apt = appointments.find(a => a.ref === selectedNotifItem.ref) || appointments[0];
                            setApproveModalApt(apt);
                            setApproveModalStep(1);
                          }}
                          className="w-full py-2.5 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Approve & dispatch notification</span>
                        </button>

                        <button
                          onClick={() => {
                            showToast(`Archived ${selectedNotifItem.ref}`, 'info');
                            setSelectedNotifItem(null);
                          }}
                          className="w-full py-2 rounded-btn bg-white border border-line text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors"
                        >
                          Mark as read
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* 3. Empty state: bell icon + "You're all caught up" */
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-14 h-14 rounded-full bg-mist text-slate-400 flex items-center justify-center text-2xl">
                        🔔
                      </div>
                      <div>
                        <h4 className="font-extrabold text-navy text-sm">
                          Select a notification
                        </h4>
                        <p className="text-[11px] text-muted mt-1 leading-snug">
                          Click any alert row in the center list to preview vehicle context, customer phone, and dispatch telemetry.
                        </p>
                      </div>
                      <div className="pt-2">
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          ✔ You’re all caught up on critical alerts
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* 3. DELIVERY LOG TAB: Clean Table with Channel and Status filters */}
            {notifPageTab === 'delivery_log' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-4 max-w-7xl w-full mx-auto">
                
                {/* Filter Toolbar above table */}
                <div className="bg-white p-4 rounded-card border border-line shadow-2xs flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600">Filters:</span>
                    
                    {/* Channel filter */}
                    <select
                      value={notifLogChannelFilter}
                      onChange={(e) => setNotifLogChannelFilter(e.target.value as any)}
                      className="px-3 py-1.5 rounded-lg border border-line bg-mist text-xs font-bold text-navy outline-hidden focus:border-orange-signal"
                    >
                      <option value="all">All Channels (✉ Email & ✈ Telegram)</option>
                      <option value="email">✉ Email Channel Only</option>
                      <option value="telegram">✈ Telegram Channel Only</option>
                    </select>

                    {/* Status filter */}
                    <select
                      value={notifLogStatusFilter}
                      onChange={(e) => setNotifLogStatusFilter(e.target.value as any)}
                      className="px-3 py-1.5 rounded-lg border border-line bg-mist text-xs font-bold text-navy outline-hidden focus:border-orange-signal"
                    >
                      <option value="all">All Statuses</option>
                      <option value="sent">Sent Successfully</option>
                      <option value="failed">Delivery Failed</option>
                      <option value="pending">Pending Queue</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted font-mono">
                      Showing 8 of 156 logged dispatches
                    </span>
                    <button
                      onClick={() => showToast('Exported delivery audit trail to CSV', 'info')}
                      className="px-3 py-1.5 rounded-lg bg-mist hover:bg-slate-200 text-xs font-bold text-navy border border-line flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Log</span>
                    </button>
                  </div>
                </div>

                {/* Table: Time · Event · Channel icon (✉ / ✈) · Recipient · Status badge · Error · "Resend" */}
                <div className="bg-white rounded-card border border-line shadow-2xs overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-mist border-b border-line text-[11px] uppercase tracking-wider text-muted font-black">
                      <tr>
                        <th className="p-3 pl-4">Time</th>
                        <th className="p-3">Event</th>
                        <th className="p-3">Channel</th>
                        <th className="p-3">Recipient</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Error / Telemetry</th>
                        <th className="p-3 pr-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {[
                        { time: '10:02:14 AM', event: 'Approval Notice (ABG-0042)', channel: 'telegram', rec: '@DawitK (ID: 981245)', status: 'Sent', failed: false, error: 'Delivered in 1.1s' },
                        { time: '10:02:12 AM', event: 'Approval Notice (ABG-0042)', channel: 'email', rec: 'dawit@email.com', status: 'Sent', failed: false, error: 'SMTP 250 OK' },
                        { time: '09:41:05 AM', event: 'New Booking Request', channel: 'telegram', rec: '@SaraG (ID: 712391)', status: 'Failed', failed: true, error: '403: Bot was blocked by user' },
                        { time: '09:41:02 AM', event: 'New Booking Request', channel: 'email', rec: 'sara@gmail.com', status: 'Sent', failed: false, error: 'SMTP 250 OK' },
                        { time: '08:15:30 AM', event: '24-Hour Reminder Notice', channel: 'telegram', rec: '@AlazarT (ID: 554219)', status: 'Sent', failed: false, error: 'Delivered in 0.9s' },
                        { time: '08:15:28 AM', event: '24-Hour Reminder Notice', channel: 'email', rec: 'alazar@outlook.com', status: 'Sent', failed: false, error: 'SMTP 250 OK' },
                        { time: '07:30:11 AM', event: 'Time Slot Modification', channel: 'telegram', rec: '@KidusB (ID: 441092)', status: 'Failed', failed: true, error: 'Network timeout (504 Gateway)' },
                        { time: '07:30:08 AM', event: 'Time Slot Modification', channel: 'email', rec: 'kidus@ethionet.et', status: 'Sent', failed: false, error: 'SMTP 250 OK' },
                      ]
                        .filter(log => {
                          if (notifLogChannelFilter !== 'all' && log.channel !== notifLogChannelFilter) return false;
                          if (notifLogStatusFilter === 'sent' && log.failed) return false;
                          if (notifLogStatusFilter === 'failed' && !log.failed) return false;
                          return true;
                        })
                        .map((log, idx) => (
                          <tr key={idx} className={log.failed ? 'bg-red-50/70 hover:bg-red-50' : 'hover:bg-slate-50'}>
                            <td className="p-3 pl-4 font-mono text-muted text-[11px] whitespace-nowrap">{log.time}</td>
                            <td className="p-3 font-extrabold text-navy">{log.event}</td>
                            <td className="p-3">
                              {log.channel === 'email' ? (
                                <span className="inline-flex items-center gap-1.5 text-slate-700 font-bold">
                                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Email</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 text-slate-700 font-bold">
                                  <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                                  <span>Telegram</span>
                                </span>
                              )}
                            </td>
                            <td className="p-3 font-mono text-[11px] text-slate-700">{log.rec}</td>
                            <td className="p-3">
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                log.failed
                                  ? 'bg-red-100 text-red-700 border border-red-200'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}>
                                {log.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className={`text-[11px] font-mono ${log.failed ? 'text-red-700 font-bold' : 'text-slate-500'}`}>
                                {log.error}
                              </span>
                            </td>
                            <td className="p-3 pr-4 text-right">
                              <button
                                onClick={() => showToast(`Dispatched retry for ${log.event} to ${log.rec}`, 'info')}
                                className={`text-xs font-black hover:underline ${log.failed ? 'text-red-700 font-bold' : 'text-orange-deep'}`}
                              >
                                {log.failed ? 'Retry Resend ›' : 'Resend'}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. SETTINGS TAB: Matrix card + Small configuration cards */}
            {notifPageTab === 'settings' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-7xl w-full mx-auto">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left 2 Cols: MATRIX CARD for Events x Recipients */}
                  <div className="lg:col-span-2 bg-white p-6 rounded-card border border-line shadow-2xs space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-line gap-2">
                      <div>
                        <h3 className="font-extrabold text-navy text-base">
                          Notification Dispatch Matrix
                        </h3>
                        <p className="text-xs text-muted mt-0.5">
                          Toggle which endpoints receive automated alerts for each workshop lifecycle event
                        </p>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 self-start">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>🟢 Webhook active</span>
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-line text-muted uppercase text-[10px] font-black">
                            <th className="py-2.5">Event</th>
                            <th className="py-2.5 text-center">Customer Email</th>
                            <th className="py-2.5 text-center">Customer Telegram</th>
                            <th className="py-2.5 text-center">Staff Telegram Group</th>
                            <th className="py-2.5 text-center">Admin Email</th>
                            <th className="py-2.5 text-center">In-App Banner</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {[
                            'New request',
                            'Approved',
                            'Rejected',
                            'Time changed',
                            'In progress / Completed',
                            '24-hour reminder'
                          ].map((ev, eIdx) => (
                            <tr key={ev} className="hover:bg-slate-50 transition-colors">
                              <td className="py-3 font-extrabold text-navy">{ev}</td>
                              <td className="py-3 text-center">
                                <input type="checkbox" defaultChecked className="accent-orange-signal cursor-pointer w-4 h-4" />
                              </td>
                              <td className="py-3 text-center">
                                <input type="checkbox" defaultChecked className="accent-[#229ED9] cursor-pointer w-4 h-4" />
                              </td>
                              <td className="py-3 text-center">
                                <input type="checkbox" defaultChecked={eIdx < 3} className="accent-orange-signal cursor-pointer w-4 h-4" />
                              </td>
                              <td className="py-3 text-center">
                                <input type="checkbox" defaultChecked={eIdx === 0 || eIdx === 2} className="accent-orange-signal cursor-pointer w-4 h-4" />
                              </td>
                              <td className="py-3 text-center">
                                <input type="checkbox" defaultChecked className="accent-navy cursor-pointer w-4 h-4" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => showToast('Dispatch matrix configuration saved', 'success')}
                        className="px-5 py-2.5 rounded-btn bg-orange-signal text-navy font-black text-xs hover:bg-orange-400 transition-colors shadow-xs"
                      >
                        Save Matrix Changes
                      </button>
                    </div>
                  </div>

                  {/* Right 1 Col: Small settings cards */}
                  <div className="space-y-4">
                    
                    {/* CARD 1: Admin emails (chips + add) */}
                    <div className="bg-white p-5 rounded-card border border-line shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-navy text-xs">
                          Admin Notification Emails
                        </h4>
                        <span className="text-[10px] text-muted">{adminEmails.length} active</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {adminEmails.map((email) => (
                          <span
                            key={email}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mist border border-line text-[11px] font-mono text-slate-700"
                          >
                            <span>{email}</span>
                            <button
                              onClick={() => setAdminEmails(prev => prev.filter(e => e !== email))}
                              className="text-slate-400 hover:text-red-500 font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      {showAddEmailInput ? (
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="email"
                            value={newAdminEmailInput}
                            onChange={(e) => setNewAdminEmailInput(e.target.value)}
                            placeholder="e.g. manager@abegaz.com"
                            className="flex-1 px-3 py-1.5 rounded-lg border border-line text-xs font-mono"
                          />
                          <button
                            onClick={() => {
                              if (newAdminEmailInput.trim()) {
                                setAdminEmails(prev => [...prev, newAdminEmailInput.trim()]);
                                setNewAdminEmailInput('');
                                setShowAddEmailInput(false);
                                showToast('Added admin recipient', 'success');
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-navy text-white text-xs font-bold"
                          >
                            Add
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowAddEmailInput(true)}
                          className="text-xs font-bold text-orange-deep hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add admin email</span>
                        </button>
                      )}
                    </div>

                    {/* CARD 2: Staff Telegram Group */}
                    <div className="bg-white p-5 rounded-card border border-line shadow-2xs space-y-3">
                      <div>
                        <h4 className="font-extrabold text-navy text-xs flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                          Staff Telegram Group ID
                        </h4>
                        <p className="text-[11px] text-muted mt-0.5">
                          All incoming booking alerts post directly into this group
                        </p>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={staffTelegramGroup}
                          onChange={(e) => setStaffTelegramGroup(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-line text-xs font-mono font-bold text-navy"
                        />
                        <button
                          onClick={() => showToast('Test ping sent to Staff Telegram Group (HTTP 200 OK)', 'success')}
                          className="w-full py-2 rounded-btn bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send test message</span>
                        </button>
                      </div>
                    </div>

                    {/* CARD 3: Sound for new requests toggle */}
                    <div className="bg-white p-5 rounded-card border border-line shadow-2xs flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-orange-tint text-orange-deep flex items-center justify-center">
                          <Volume2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-navy text-xs">
                            Sound for new requests
                          </h4>
                          <p className="text-[10px] text-muted">Audible garage ding on incoming appointments</p>
                        </div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={soundEnabled}
                          onChange={(e) => {
                            setSoundEnabled(e.target.checked);
                            showToast(e.target.checked ? 'Alert sound enabled' : 'Alert sound muted', 'info');
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-signal" />
                      </label>
                    </div>

                    {/* CARD 4: Quiet hours time range */}
                    <div className="bg-white p-5 rounded-card border border-line shadow-2xs space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                          <Moon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-navy text-xs">
                            Quiet hours
                          </h4>
                          <p className="text-[10px] text-muted">Silence non-critical customer push notifications</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono pt-1">
                        <input
                          type="time"
                          value={quietHoursStart}
                          onChange={(e) => setQuietHoursStart(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-line bg-mist font-bold text-navy"
                        />
                        <span className="text-muted font-bold">to</span>
                        <input
                          type="time"
                          value={quietHoursEnd}
                          onChange={(e) => setQuietHoursEnd(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-line bg-mist font-bold text-navy"
                        />
                      </div>
                    </div>

                    {/* CARD 5: Bot health pill */}
                    <div className="p-4 rounded-card bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-extrabold text-emerald-900">
                        <span>Telegram Bot Dispatcher</span>
                        <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">Active</span>
                      </div>
                      <p className="text-[11px] text-emerald-800">
                        🟢 Webhook active · Last ping 2 min ago · 0 failures in queue
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* ----------------- 7. TAB: CALENDAR & BAY ALLOCATION ----------------- */}
        {activeTab === 'calendar' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy">
                  Workshop Bay Calendar & Schedule
                </h2>
                <p className="text-xs text-muted">
                  Live real-time bay occupancy across Kality Engineering Bays 1–4
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white p-1 rounded-card border border-line text-xs font-bold shadow-2xs">
                  <button className="px-3 py-1.5 rounded-lg bg-navy text-white">Thursday, 12 Nov</button>
                  <button className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-navy">Friday, 13 Nov</button>
                  <button className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-navy">Saturday, 14 Nov</button>
                </div>
                <button
                  onClick={() => showToast('Bay slot blocked for maintenance', 'info')}
                  className="px-3 py-2 bg-orange-signal text-navy font-black text-xs rounded-card shadow-xs hover:bg-orange-400"
                >
                  + Block Slot
                </button>
              </div>
            </div>

            {/* Bay Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { bay: 'Bay #1: Quick Service', engineer: 'Dawit K.', active: 2, color: 'border-blue-400', badge: 'bg-blue-50 text-blue-700' },
                { bay: 'Bay #2: Heavy Mechanical', engineer: 'Samuel B.', active: 3, color: 'border-orange-400', badge: 'bg-orange-50 text-orange-700' },
                { bay: 'Bay #3: Diagnostics & ECU', engineer: 'Mekdes A.', active: 1, color: 'border-emerald-400', badge: 'bg-emerald-50 text-emerald-700' },
                { bay: 'Bay #4: Paint & Collision', engineer: 'Specialist Bay', active: 2, color: 'border-purple-400', badge: 'bg-purple-50 text-purple-700' },
              ].map((b, idx) => (
                <div key={idx} className="bg-white rounded-card border border-line shadow-2xs overflow-hidden flex flex-col justify-between">
                  <div className={`p-4 border-b-2 ${b.color} bg-mist`}>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-navy text-xs">{b.bay}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${b.badge}`}>
                        {b.active} active
                      </span>
                    </div>
                    <span className="text-[11px] text-muted block mt-0.5">Lead: {b.engineer}</span>
                  </div>

                  {/* Scheduled Slots in this Bay */}
                  <div className="p-3 space-y-2.5 flex-1 min-h-[300px]">
                    <div className="p-2.5 rounded-card bg-emerald-50/70 border border-emerald-200 text-xs">
                      <div className="flex items-center justify-between text-[10px] font-bold text-emerald-800">
                        <span>08:30 – 10:00</span>
                        <span>✔ Completed</span>
                      </div>
                      <p className="font-black text-navy mt-1">Toyota Hilux 4x4</p>
                      <span className="font-mono text-[10px] text-muted">ET-3-99881 · Oil & Filter</span>
                    </div>

                    <div className="p-2.5 rounded-card bg-blue-50/80 border border-blue-200 text-xs shadow-2xs">
                      <div className="flex items-center justify-between text-[10px] font-bold text-blue-900">
                        <span>10:00 – 12:00</span>
                        <span className="bg-blue-600 text-white px-1.5 py-0.2 rounded">In Progress</span>
                      </div>
                      <p className="font-black text-navy mt-1">Toyota Vitz (2016)</p>
                      <span className="font-mono text-[10px] text-muted">AA-12345 · Brake Overhaul</span>
                    </div>

                    <div className="p-2.5 rounded-card bg-amber-50/60 border border-amber-200 text-xs">
                      <div className="flex items-center justify-between text-[10px] font-bold text-amber-800">
                        <span>14:00 – 16:00</span>
                        <span>Scheduled</span>
                      </div>
                      <p className="font-black text-navy mt-1">Suzuki Dzire (2021)</p>
                      <span className="font-mono text-[10px] text-muted">AA-2-C67890 · Door Dent</span>
                    </div>
                  </div>

                  <div className="p-3 bg-mist border-t border-line text-center">
                    <button
                      onClick={() => {
                        setActiveTab('appointments');
                        setAppointmentViewTab('pending');
                      }}
                      className="text-xs font-bold text-orange-deep hover:underline"
                    >
                      + Assign Queue Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- 8. TAB: SERVICES MANAGEMENT ----------------- */}
        {activeTab === 'services' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy">
                  Automotive Services Directory
                </h2>
                <p className="text-xs text-muted">
                  Configure repair capabilities, starting prices, and workshop bay durations
                </p>
              </div>

              <button
                onClick={() => showToast('Service creation modal opened', 'info')}
                className="px-4 py-2 rounded-card bg-brand-600 text-white font-extrabold text-xs shadow-blue hover:bg-brand-700 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="bg-white rounded-card border border-line shadow-2xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-mist border-b border-line text-[11px] uppercase tracking-wider text-muted font-bold">
                  <tr>
                    <th className="p-3.5 pl-4">Service Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Duration</th>
                    <th className="p-3.5">Starting Price</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {useApp().services.map((svc) => (
                    <tr key={svc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 pl-4">
                        <div className="font-extrabold text-navy text-sm">{svc.nameEn}</div>
                        <div className="text-muted text-[11px]">{svc.nameAm}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="capitalize bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
                          {svc.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono">{svc.durationText}</td>
                      <td className="p-3.5 font-bold font-mono text-brand-700">
                        {svc.priceStarting.toLocaleString()} ETB
                      </td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          svc.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {svc.active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => showToast(`Edited ${svc.nameEn}`, 'info')}
                          className="text-xs font-bold text-brand-600 hover:underline mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => showToast(`Toggled status for ${svc.nameEn}`, 'info')}
                          className="text-xs font-bold text-slate-500 hover:text-navy"
                        >
                          Toggle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------- 9. TAB: PACKAGES MANAGEMENT ----------------- */}
        {activeTab === 'packages' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy">
                  Maintenance Service Packages
                </h2>
                <p className="text-xs text-muted">Tiered maintenance packages for individuals and fleet businesses</p>
              </div>
              <button
                onClick={() => showToast('Package creation opened', 'info')}
                className="px-4 py-2 rounded-card bg-brand-600 text-white font-extrabold text-xs shadow-blue"
              >
                + New Package
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useApp().packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-card p-6 border border-line shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-muted uppercase font-bold">{pkg.slug}</span>
                      {pkg.featured && (
                        <span className="text-[10px] font-extrabold bg-orange-signal text-navy px-2 py-0.5 rounded-full">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-navy">{pkg.nameEn}</h3>
                    <p className="text-xs text-brand-700 font-bold mt-0.5">{pkg.nameAm}</p>
                    <div className="text-3xl font-black font-mono text-navy my-4">
                      {pkg.price.toLocaleString()} <span className="text-xs font-normal text-muted">ETB</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600 border-t border-line pt-3">
                      {pkg.includedEn.slice(0, 4).map((inc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                    <span className="text-xs font-mono text-muted">{pkg.durationText}</span>
                    <button
                      onClick={() => showToast(`Editing package ${pkg.nameEn}`, 'info')}
                      className="text-xs font-bold text-brand-600 hover:underline"
                    >
                      Edit Package ›
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- 10. TAB: CUSTOMERS DIRECTORY ----------------- */}
        {activeTab === 'customers' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy">
                  Customer Directory & Vehicle Profiles
                </h2>
                <p className="text-xs text-muted">
                  Registered vehicle owners across Addis Ababa with repair history and contact logs
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Filter customer name or phone..."
                  className="px-3 py-1.5 bg-white border border-line rounded-lg text-xs outline-hidden focus:border-brand-600 w-56 font-bold"
                />
              </div>
            </div>

            <div className="bg-white rounded-card border border-line shadow-2xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-mist border-b border-line text-[11px] uppercase tracking-wider text-muted font-bold">
                  <tr>
                    <th className="p-3.5 pl-4">Customer Name</th>
                    <th className="p-3.5">Phone Number</th>
                    <th className="p-3.5">Registered Vehicles</th>
                    <th className="p-3.5">Total Bookings</th>
                    <th className="p-3.5">Telegram</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {[
                    { name: 'ዳዊት ከበደ (Dawit Kebede)', phone: '+251 911 234 567', car: 'Toyota Vitz · AA-12345', bookings: 3, tg: true },
                    { name: 'ሳራ ገብረእግዚአብሔር (Sara G.)', phone: '+251 922 345 678', car: 'Suzuki Dzire · AA-2-C67890', bookings: 2, tg: true },
                    { name: 'ዮናስ ታደሰ (Yonas Tadesse)', phone: '+251 933 456 789', car: 'Hyundai Tucson · AA-2-E88990', bookings: 1, tg: false },
                    { name: 'አበበ ተፈራ (Abebe T.)', phone: '+251 944 567 890', car: 'Isuzu NPR Truck · 3-A12890', bookings: 4, tg: true },
                  ].map((cust, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 pl-4">
                        <div className="font-extrabold text-navy text-sm">{cust.name}</div>
                        <span className="text-[10px] text-muted font-mono">ID: CUST-00{i + 1}</span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-700">{cust.phone}</td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 text-navy font-mono font-bold px-2 py-0.5 rounded border border-line">
                          🇪🇹 {cust.car}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold font-mono text-brand-700">{cust.bookings} visits</td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          cust.tg ? 'bg-blue-100 text-[#229ED9]' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {cust.tg ? '✈ Connected' : 'Not linked'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <a
                          href={`tel:${cust.phone}`}
                          className="px-2.5 py-1 rounded bg-mist hover:bg-slate-200 text-navy font-bold text-xs inline-flex items-center gap-1 mr-2"
                        >
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>Call</span>
                        </a>
                        <button
                          onClick={() => showToast(`Opening profile for ${cust.name}`, 'info')}
                          className="text-xs font-bold text-brand-600 hover:underline"
                        >
                          History ›
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------- 11. TAB: CONTENT & CMS MANAGEMENT ----------------- */}
        {activeTab === 'content' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl font-black text-navy tracking-tight">
                    Content & CMS Management
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-tint text-orange-deep border border-orange-200">
                    Live Portal
                  </span>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  Update homepage hero messages, emergency notices, gallery showcases, and customer announcements in English & Amharic
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Changes published to live website', 'success')}
                  className="px-4 py-2 rounded-btn bg-orange-signal text-navy font-black text-xs hover:bg-orange-400 transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Publish All Changes</span>
                </button>
              </div>
            </div>

            {/* Quick CMS Sections Tabs / Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Main Editor Panels */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. HERO BANNER & TAGLINE */}
                <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-line">
                    <div>
                      <h3 className="font-extrabold text-navy text-sm">
                        Homepage Hero Section
                      </h3>
                      <p className="text-xs text-muted">Primary headline & value proposition</p>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      Live
                    </span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Headline (Amharic - አማርኛ)
                      </label>
                      <input
                        type="text"
                        defaultValue="ትክክለኛ ምህንድስና፣ ዘመናዊ ምርመራ እና አስተማማኝ የመኪና ጥገና"
                        className="w-full px-3 py-2 rounded-btn border border-line font-bold text-navy outline-hidden focus:border-orange-signal"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Headline (English)
                      </label>
                      <input
                        type="text"
                        defaultValue="Precision Engineering, High-Tech Diagnostics & Trusted Auto Care"
                        className="w-full px-3 py-2 rounded-btn border border-line font-bold text-navy outline-hidden focus:border-orange-signal"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Primary CTA Button Text
                        </label>
                        <input
                          type="text"
                          defaultValue="ቀጠሮ ይያዙ (Book Appointment)"
                          className="w-full px-3 py-2 rounded-btn border border-line text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Phone Hotline Display
                        </label>
                        <input
                          type="text"
                          defaultValue="+251 911 234 567"
                          className="w-full px-3 py-2 rounded-btn border border-line font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => showToast('Hero section content updated', 'success')}
                        className="px-3.5 py-1.5 rounded-btn bg-navy text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                      >
                        Save Hero Changes
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. EMERGENCY & HOLIDAY ANNOUNCEMENT BANNER */}
                <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-line">
                    <div>
                      <h3 className="font-extrabold text-navy text-sm">
                        Site-Wide Top Announcement Banner
                      </h3>
                      <p className="text-xs text-muted">Displays on public website & customer dashboard</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        onChange={(e) => showToast(e.target.checked ? 'Top banner enabled' : 'Top banner hidden', 'info')}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-signal" />
                    </label>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Banner Message (Amharic)
                      </label>
                      <input
                        type="text"
                        defaultValue="በመስቀል በዓል ምክንያት ወርክሾፓችን መስከረም 17 ዝግ ይሆናል። ቀጠሮዎን አስቀድመው ይያዙ!"
                        className="w-full px-3 py-2 rounded-btn border border-line text-navy font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Banner Message (English)
                      </label>
                      <input
                        type="text"
                        defaultValue="Workshop closed on Sep 27 for Meskel Holiday. Please schedule appointments in advance."
                        className="w-full px-3 py-2 rounded-btn border border-line text-navy"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-muted">
                        Preview: <strong className="text-orange-deep bg-orange-tint px-2 py-0.5 rounded border border-orange-200">በመስቀል በዓል ምክንያት...</strong>
                      </span>
                      <button
                        onClick={() => showToast('Announcement banner saved', 'success')}
                        className="px-3.5 py-1.5 rounded-btn bg-navy text-white font-bold text-xs"
                      >
                        Update Banner
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. BEFORE / AFTER REPAIR GALLERY SHOWCASES */}
                <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-line">
                    <div>
                      <h3 className="font-extrabold text-navy text-sm">
                        Before & After Repair Gallery Items
                      </h3>
                      <p className="text-xs text-muted">Ethiopian real vehicle case studies on Gallery page</p>
                    </div>
                    <button
                      onClick={() => showToast('New case study upload modal opened', 'info')}
                      className="text-xs font-bold text-orange-deep hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Case Study</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      {
                        title: 'Toyota Vitz Front End Restoration',
                        plate: 'AA-12345',
                        desc: 'Bumper, radiator frame realignment, and precision paint matching',
                        category: 'Body & Collision'
                      },
                      {
                        title: 'Isuzu FSR Commercial Brake Overhaul',
                        plate: 'ET-3-88771',
                        desc: 'Dual master cylinder replacement and hydraulic high-pressure testing',
                        category: 'Heavy Mechanical'
                      },
                      {
                        title: 'Suzuki Dzire Electronic Transmission Calibration',
                        plate: 'AA-2-C67890',
                        desc: 'OBD-II diagnostic recalibration and valve body solenoid service',
                        category: 'Diagnostics & ECU'
                      },
                      {
                        title: 'Hyundai Tucson Full Chassis Undercoating',
                        plate: 'AA-4-D55667',
                        desc: 'High-temp rustproofing seal and suspension bushing renewal',
                        category: 'Chassis & Suspension'
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-card bg-mist border border-line space-y-2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded border border-line">
                              {item.category}
                            </span>
                            <span className="font-mono text-[10px] text-orange-deep font-bold">
                              {item.plate}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-navy text-xs mt-1">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-muted mt-1 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/80">
                          <button
                            onClick={() => showToast(`Editing ${item.title}`, 'info')}
                            className="text-[11px] font-bold text-orange-deep hover:underline"
                          >
                            Edit
                          </button>
                          <span className="text-slate-300">|</span>
                          <button
                            onClick={() => showToast(`Removed showcase`, 'info')}
                            className="text-[11px] text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right 1 Col: Quick Settings & Branding */}
              <div className="space-y-6">
                
                {/* BRAND ASSETS CARD */}
                <div className="bg-white p-5 rounded-card border border-line shadow-2xs space-y-4">
                  <h4 className="font-extrabold text-navy text-xs uppercase tracking-wider">
                    Company Brand Asset
                  </h4>

                  <div className="p-4 rounded-btn bg-mist border border-line flex flex-col items-center justify-center text-center space-y-2">
                    <div className="w-24 h-24 rounded-card bg-white p-2 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                      <img 
                        src="/logo.png" 
                        alt="Company Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-extrabold text-navy text-xs">Abegaz Motors Logo</p>
                      <p className="text-[10px] text-muted">Active on Header, Footer, Admin, and Invoices</p>
                    </div>
                    <button
                      onClick={() => showToast('To update logo, replace public/logo.png', 'info')}
                      className="text-xs font-bold text-orange-deep hover:underline pt-1"
                    >
                      Replace Logo Image ›
                    </button>
                  </div>
                </div>

                {/* FAQ MANAGEMENT CARD */}
                <div className="bg-white p-5 rounded-card border border-line shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-navy text-xs uppercase tracking-wider">
                      Frequently Asked Questions
                    </h4>
                    <span className="text-[10px] text-muted">12 articles</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      'How long does computerized diagnostics take?',
                      'Do you use genuine Toyota & Suzuki parts?',
                      'How do Telegram notifications work?',
                      'What is covered in the 3,000 km warranty?'
                    ].map((faq, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-mist border border-line flex items-center justify-between group">
                        <span className="text-slate-700 truncate pr-2 font-medium">{faq}</span>
                        <button
                          onClick={() => showToast(`Opening editor for FAQ #${i + 1}`, 'info')}
                          className="text-orange-deep font-bold text-[11px] hover:underline shrink-0"
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => showToast('New FAQ creation opened', 'info')}
                    className="w-full py-2 rounded-btn bg-mist hover:bg-slate-200 text-navy font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New FAQ</span>
                  </button>
                </div>

                {/* WORKSHOP LOCATION & MAP EMBED */}
                <div className="bg-white p-5 rounded-card border border-line shadow-2xs space-y-3">
                  <h4 className="font-extrabold text-navy text-xs uppercase tracking-wider">
                    Workshop Physical Landmark
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] text-muted font-bold block">Location (Amharic)</span>
                      <p className="font-bold text-navy">አዲስ አበባ፣ ቃሊቲ ክላስተር (ከቶታል ማደያ ፊት ለፊት)</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted font-bold block">GPS Coordinates</span>
                      <p className="font-mono text-slate-700">8.8923° N, 38.7491° E</p>
                    </div>
                    <button
                      onClick={() => showToast('Opening Google Maps preview...', 'info')}
                      className="text-xs font-bold text-orange-deep hover:underline"
                    >
                      Update Map Location Pin ›
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ----------------- 12. TAB: AVAILABILITY & HOLIDAYS ----------------- */}
        {activeTab === 'availability' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-5xl mx-auto w-full">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-navy">
                Workshop Availability & Closed Dates
              </h2>
              <p className="text-xs text-muted">
                Control active working hours, weekly bay capacity, and national Ethiopian holiday closures
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Working Hours */}
              <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-3">
                <h3 className="text-sm font-extrabold text-navy uppercase tracking-wider mb-2">
                  Weekly Operating Schedule
                </h3>
                <div className="divide-y divide-line text-xs">
                  {[
                    { day: 'Monday (ሰኞ)', hours: '08:00 – 18:00', open: true },
                    { day: 'Tuesday (ማክሰኞ)', hours: '08:00 – 18:00', open: true },
                    { day: 'Wednesday (ረቡዕ)', hours: '08:00 – 18:00', open: true },
                    { day: 'Thursday (ሐሙስ)', hours: '08:00 – 18:00', open: true },
                    { day: 'Friday (አርብ)', hours: '08:00 – 18:00', open: true },
                    { day: 'Saturday (ቅዳሜ)', hours: '08:00 – 16:00', open: true },
                    { day: 'Sunday (እሁድ)', hours: 'Closed (ዝግ ነው)', open: false },
                  ].map((d, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between">
                      <span className="font-bold text-navy">{d.day}</span>
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-[11px] ${d.open ? 'text-slate-700 font-bold' : 'text-red-500 font-bold'}`}>
                          {d.hours}
                        </span>
                        <input type="checkbox" defaultChecked={d.open} className="accent-brand-600 cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ethiopian Closed Dates & Holidays */}
              <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-extrabold text-navy uppercase tracking-wider">
                    Closed Dates & Holidays
                  </h3>
                  <button
                    onClick={() => showToast('Add holiday date modal', 'info')}
                    className="text-xs font-bold text-brand-600 hover:underline"
                  >
                    + Add Date
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { date: 'መስከረም 1 (Sep 11)', name: 'እንቁጣጣሽ (Ethiopian New Year)' },
                    { date: 'መስከረም 17 (Sep 27)', name: 'መስቀል (Finding of True Cross)' },
                    { date: 'ጥር 11 (Jan 19)', name: 'ጥምቀት (Timket Epiphany)' },
                    { date: 'ታህሳስ 29 (Jan 7)', name: 'ገና (Ethiopian Christmas)' },
                    { date: 'የካቲት 23 (Mar 2)', name: 'የዓድዋ ድል በዓል (Adwa Victory)' },
                  ].map((h, i) => (
                    <div key={i} className="p-3 rounded-card bg-mist border border-line flex items-center justify-between">
                      <div>
                        <span className="font-bold text-navy block">{h.name}</span>
                        <span className="text-[11px] text-muted font-mono">{h.date}</span>
                      </div>
                      <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        Closed
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- 12. TAB: STAFF & ROLES ----------------- */}
        {activeTab === 'staff' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-6xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy">
                  Staff Members & Role Permissions
                </h2>
                <p className="text-xs text-muted">
                  Manage workshop bay technicians, dispatch permissions, and access credentials
                </p>
              </div>

              <button
                onClick={() => showToast('Staff invitation dispatched via email and Telegram', 'success')}
                className="px-4 py-2 rounded-card bg-orange-signal text-navy font-black text-xs shadow-xs hover:bg-orange-400 flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Invite New Staff</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staffList.map((stf) => (
                <div key={stf.id} className="bg-white p-5 rounded-card border border-line shadow-2xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy text-orange-signal font-black text-sm flex items-center justify-center border-2 border-orange-signal">
                        {stf.name.slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-navy text-sm">{stf.name}</h4>
                        <p className="text-xs text-muted font-mono">{stf.email}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      stf.role === 'admin' ? 'bg-navy text-orange-signal' : 'bg-blue-100 text-brand-700'
                    }`}>
                      {stf.role}
                    </span>
                  </div>

                  <div className="p-3 rounded-btn bg-mist border border-line text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Approve & Reject:</span>
                      <strong className={stf.permissions.approveReject ? 'text-emerald-700' : 'text-slate-400'}>
                        {stf.permissions.approveReject ? 'Granted ✔' : 'Denied ✖'}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Update Repair Lifecycle:</span>
                      <strong className={stf.permissions.updateStatus ? 'text-emerald-700' : 'text-slate-400'}>
                        {stf.permissions.updateStatus ? 'Granted ✔' : 'Denied ✖'}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Customer Database Access:</span>
                      <strong className={stf.permissions.viewCustomers ? 'text-emerald-700' : 'text-slate-400'}>
                        {stf.permissions.viewCustomers ? 'Granted ✔' : 'Denied ✖'}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-muted pt-1">
                    <span>Last active: {stf.lastLogin}</span>
                    <button
                      onClick={() => showToast(`Permissions updated for ${stf.name}`, 'info')}
                      className="text-xs font-bold text-brand-600 hover:underline"
                    >
                      Configure ›
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- 13. TAB: SETTINGS & BOT HEALTH ----------------- */}
        {activeTab === 'settings' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto w-full">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-navy">
                Garage System & Dispatch Settings
              </h2>
              <p className="text-xs text-muted">Core operational configurations and automated bot health</p>
            </div>

            <div className="bg-white p-6 rounded-card border border-line shadow-2xs space-y-4 text-xs">
              <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider pb-2 border-b border-line">
                Workshop Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company Legal Name</label>
                  <input type="text" defaultValue="አበጋዝ ሞተርስ ኢንጂነሪንግ (Abegaz Motors Engineering)" className="w-full px-3 py-2 rounded-btn border border-line font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Workshop Hotline</label>
                  <input type="text" defaultValue="+251 911 234 567" className="w-full px-3 py-2 rounded-btn border border-line font-mono font-bold" />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Workshop Bay Address</label>
                  <input type="text" defaultValue="አዲስ አበባ፣ ቃሊቲ ክላስተር (ከቶታል ማደያ ፊት ለፊት)" className="w-full px-3 py-2 rounded-btn border border-line" />
                </div>
              </div>

              <div className="pt-4 border-t border-line flex items-center justify-between">
                <div>
                  <span className="font-bold text-navy block">Telegram Bot Webhook Sync</span>
                  <span className="text-[11px] text-muted">@AbegazMotorsBot live dispatcher</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  🟢 Connected & Healthy
                </span>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => showToast('Settings saved successfully', 'success')}
                  className="px-5 py-2.5 rounded-card bg-brand-600 text-white font-extrabold text-xs shadow-blue"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ----------------- APPROVE MODAL (DESKTOP 1440, 560px OVER DIMMED PANEL) ----------------- */}
      {approveModalApt && (
        <div className="fixed inset-0 z-50 bg-navy/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-card max-w-[560px] w-full p-6 shadow-2xl border border-line animate-in zoom-in-95 duration-150">
            
            {approveModalStep === 1 ? (
              // STATE 1 — CONFIRM
              <div className="space-y-4">
                {/* 1. Title + Close X */}
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-navy text-base">
                      Approve {approveModalApt.ref}
                    </h3>
                    <span className="text-[10px] font-bold bg-orange-tint text-orange-deep px-2 py-0.5 rounded-full border border-orange-200">
                      Step 1 of 2
                    </span>
                  </div>
                  <button
                    onClick={() => setApproveModalApt(null)}
                    className="w-8 h-8 rounded-full bg-mist hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-navy transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. Mist summary box: Date/time, Service, car, plate, customer */}
                <div className="p-4 rounded-card bg-mist border border-line text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-navy flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-orange-signal" />
                      <span>{approveModalApt.requestedDate} · {approveModalApt.requestedSlot}</span>
                    </span>
                    <span className="text-[11px] font-bold text-orange-deep bg-orange-tint px-2.5 py-0.5 rounded-full border border-orange-200">
                      Kality Bay #2 (Mechanical)
                    </span>
                  </div>

                  <div className="border-t border-slate-200/80 pt-2">
                    <p className="font-black text-navy text-sm">
                      {approveModalApt.serviceName}
                    </p>
                    <p className="text-slate-700 font-bold mt-0.5">
                      {approveModalApt.vehicleMake} {approveModalApt.vehicleModel} · <span className="font-mono text-orange-deep">[{approveModalApt.vehiclePlate}]</span>
                    </p>
                    <p className="text-muted text-[11px] mt-0.5">
                      Customer: <strong className="text-navy">{approveModalApt.customerName}</strong> ({approveModalApt.customerPhone})
                    </p>
                  </div>
                </div>

                {/* 3. Blue-tinted banner with a bolt/spark icon */}
                <div className="p-3 rounded-card bg-blue-50 border border-blue-200 text-xs text-blue-950 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <span className="font-medium">
                    The customer will be notified automatically via configured channels once approved.
                  </span>
                </div>

                {/* 4. Two channel cards with toggles (both ON by default) + Disabled version design */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Card 1: Email */}
                  <div className="p-3.5 rounded-card bg-white border border-line flex items-center justify-between shadow-2xs">
                    <div className="min-w-0 pr-2">
                      <span className="font-extrabold text-navy flex items-center gap-1.5 truncate">
                        <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Email</span>
                      </span>
                      <span className="text-[11px] text-muted font-mono truncate block mt-0.5">
                        {approveModalApt.customerEmail}
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={modalEmailChannel}
                        onChange={(e) => setModalEmailChannel(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600" />
                    </label>
                  </div>

                  {/* Card 2: Telegram (Active or disabled preview) */}
                  <div className="p-3.5 rounded-card bg-white border border-line flex items-center justify-between shadow-2xs">
                    <div className="min-w-0 pr-2">
                      <span className="font-extrabold text-navy flex items-center gap-1.5 truncate">
                        <Send className="w-4 h-4 text-[#229ED9] shrink-0" />
                        <span>Telegram</span>
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Connected (@{approveModalApt.customerName.split(' ')[0]}Bot)</span>
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={modalTelegramChannel}
                        onChange={(e) => setModalTelegramChannel(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#229ED9]" />
                    </label>
                  </div>
                </div>

                {/* Disabled version note for customers without Telegram */}
                {/* Note: If Telegram is disconnected, the disabled state card renders:
                  <div className="p-3.5 rounded-card bg-slate-100 border border-line opacity-75">
                    <span className="text-slate-600 font-bold">Telegram not connected — email only</span>
                    <button className="text-orange-deep text-xs font-bold block mt-1 hover:underline">Remind customer to connect</button>
                  </div>
                */}

                {/* 5. Optional textarea "Short message to customer" + Preview message link */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Short message to the customer (optional):
                    </label>
                    <button
                      type="button"
                      onClick={() => setModalPreviewOpen(!modalPreviewOpen)}
                      className="text-xs font-bold text-orange-deep hover:underline flex items-center gap-1"
                    >
                      {modalPreviewOpen ? 'Hide preview' : 'Preview message ›'}
                    </button>
                  </div>
                  <textarea
                    value={modalCustomNote}
                    onChange={(e) => setModalCustomNote(e.target.value)}
                    rows={2}
                    placeholder="e.g. Please bring vehicle logbook upon arrival."
                    className="w-full px-3 py-2 rounded-btn border border-line text-xs outline-hidden focus:border-orange-signal"
                  />
                  {modalPreviewOpen && (
                    <div className="p-3 rounded-btn bg-slate-900 text-slate-200 text-[11px] font-mono space-y-1 animate-in fade-in">
                      <div className="text-orange-signal font-bold text-[10px] uppercase">
                        ✉ Email & ✈ Telegram Payload Preview:
                      </div>
                      <p className="leading-relaxed">
                        "ሰላም {approveModalApt.customerName}፣ ለአበጋዝ ሞተርስ ኢንጂነሪንግ የጠየቁት ቀጠሮ ({approveModalApt.ref} · {approveModalApt.serviceName}) ጸድቋል! ቀን፡ {approveModalApt.requestedDate} {approveModalApt.requestedSlot}። {modalCustomNote}"
                      </p>
                    </div>
                  )}
                </div>

                {/* 6. Buttons: Outlined Cancel and Green "Approve and notify" */}
                <div className="pt-3 border-t border-line flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setApproveModalApt(null)}
                  >
                    Cancel
                  </Button>
                  <button
                    type="button"
                    onClick={handleApproveConfirm}
                    className="h-10 px-5 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-md active:scale-98 transition-all"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Approve and notify</span>
                  </button>
                </div>
              </div>
            ) : (
              // STATE 2 — SUCCESS WITH LIVE DELIVERY TRACKER
              <div className="space-y-5 text-center py-2 animate-in zoom-in-95 duration-200">
                
                {/* 1. Large green check animation + title */}
                <div className="relative w-18 h-18 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-emerald-200 animate-ping opacity-25" />
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl font-black shadow-md border-2 border-emerald-300">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-navy">
                    Approved — customer notified
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    Telemetry confirms live payload dispatch across active endpoints
                  </p>
                </div>

                {/* 2. LIVE DELIVERY TRACKER as a vertical stepper with connected dots */}
                <div className="bg-mist p-5 rounded-card border border-line text-left text-xs space-y-4 relative">
                  
                  {/* Vertical connecting line */}
                  <div className="absolute left-7 top-7 bottom-7 w-0.5 bg-emerald-300" />

                  {/* Step 1: Status changed */}
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold shadow-xs">
                      ✔
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-extrabold text-navy">
                        Status changed to Approved
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        10:02:10 AM
                      </span>
                    </div>
                  </div>

                  {/* Step 2: Email sent */}
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold shadow-xs">
                      ✔
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-navy">
                          Email sent to {approveModalApt.customerEmail}
                        </span>
                        <span className="text-[10px] text-muted block mt-0.5">SMTP 250 OK · Delivered to inbox</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">10:02:12 AM</span>
                    </div>
                  </div>

                  {/* Step 3: Telegram delivered */}
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold shadow-xs">
                      ✔
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-navy">
                          Telegram delivered to customer
                        </span>
                        <span className="text-[10px] text-muted block mt-0.5">Bot message ID: #782190</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">10:02:14 AM</span>
                    </div>
                  </div>

                  {/* Step 4: Visible on customer dashboard */}
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold shadow-xs">
                      ✔
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-extrabold text-navy">
                        Visible on customer dashboard & booking tracker
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Live ✔
                      </span>
                    </div>
                  </div>

                  {/* Failed Row Design (for reference/fallback) */}
                  {/*
                  <div className="flex items-start gap-3 relative z-10 p-2.5 rounded bg-red-50 border border-red-200">
                    <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                      ✖
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-red-900">Telegram failed — we'll retry automatically</span>
                        <span className="text-[10px] text-red-700 block">User has not started @AbegazMotorsBot</span>
                      </div>
                      <button className="text-orange-deep font-black text-xs hover:underline">Retry now ›</button>
                    </div>
                  </div>
                  */}
                </div>

                {/* 3. Buttons: Outlined Close and Orange "Next request ›" */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setApproveModalApt(null)}
                  >
                    Close
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const next = pendingApts.find(a => a.id !== approveModalApt.id);
                      if (next) {
                        setApproveModalApt(next);
                        setApproveModalStep(1);
                      } else {
                        setApproveModalApt(null);
                        showToast('No more pending requests in queue', 'info');
                      }
                    }}
                  >
                    <span>Next request ›</span>
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ----------------- REJECT MODAL ----------------- */}
      {rejectModalApt && (
        <div className="fixed inset-0 z-50 bg-navy/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-card max-w-md w-full p-6 shadow-2xl border border-line space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h3 className="font-extrabold text-navy text-base">
                Reject {rejectModalApt.ref}
              </h3>
              <button onClick={() => setRejectModalApt(null)} className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-700 block">Reason for rejection:</label>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 rounded-btn border border-line"
              >
                <option value="That slot is already full.">That slot is already full.</option>
                <option value="Workshop closed on requested date.">Workshop closed on requested date.</option>
                <option value="Spare parts currently unavailable.">Spare parts currently unavailable.</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setRejectModalApt(null)}>
                Cancel
              </Button>
              <button
                type="button"
                onClick={handleRejectConfirm}
                className="h-10 px-4 rounded-btn bg-red-600 hover:bg-red-500 text-white font-black text-xs"
              >
                Reject and notify
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- COMMAND PALETTE MODAL (CTRL K) ----------------- */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
          <div className="bg-white rounded-card max-w-lg w-full shadow-2xl border border-line overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-3 border-b border-line flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Jump to page, appointment, plate number or customer…"
                className="w-full outline-hidden text-sm font-bold text-navy"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="text-[10px] font-mono text-muted bg-mist px-2 py-0.5 rounded border border-line">
                ESC
              </span>
            </div>

            <div className="p-3 space-y-3 max-h-80 overflow-y-auto text-xs">
              <div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">
                  Pages
                </span>
                <div className="space-y-1">
                  {[
                    { id: 'overview', label: 'Overview Dashboard' },
                    { id: 'appointments', label: 'Appointments Queue & Dispatch' },
                    { id: 'analytics', label: 'Analytics & Peak Metrics' },
                    { id: 'notifications', label: 'Notifications & Telegram Health' }
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveTab(p.id as any);
                        setCommandPaletteOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-btn hover:bg-mist font-bold text-navy flex items-center justify-between"
                    >
                      <span>{p.label}</span>
                      <CornerDownRight className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">
                  Active Appointments
                </span>
                <div className="space-y-1">
                  {appointments.slice(0, 3).map(a => (
                    <button
                      key={a.id}
                      onClick={() => {
                        setSelectedDetailApt(a);
                        setActiveTab('appointments');
                        setCommandPaletteOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-btn hover:bg-mist flex items-center justify-between"
                    >
                      <span className="font-bold text-navy">{a.customerName} · [{a.vehiclePlate}]</span>
                      <span className="font-mono text-muted text-[11px]">{a.ref}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
