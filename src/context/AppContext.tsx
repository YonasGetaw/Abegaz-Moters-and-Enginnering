import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Locale, 
  User, 
  Appointment, 
  AppointmentStatus, 
  Service, 
  ServicePackage, 
  NotificationLogItem, 
  WorkingHour, 
  ClosedDate,
  StaffMember
} from '../types';
import { 
  INITIAL_SERVICES, 
  INITIAL_PACKAGES, 
  INITIAL_APPOINTMENTS, 
  INITIAL_WORKING_HOURS, 
  INITIAL_CLOSED_DATES,
  INITIAL_STAFF
} from '../lib/constants';

interface AppContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedServiceSlug: string | null;
  setSelectedServiceSlug: (slug: string | null) => void;
  activeServiceDrawer: Service | null;
  setActiveServiceDrawer: (svc: Service | null) => void;
  successBookingRef: string | null;
  setSuccessBookingRef: (ref: string | null) => void;
  user: User;
  setUser: (u: User) => void;
  isAuthenticated: boolean;
  loginUser: (email: string, pass: string) => { success: boolean; role?: 'admin' | 'staff' | 'customer'; message?: string };
  logoutUser: () => void;
  appointments: Appointment[];
  services: Service[];
  packages: ServicePackage[];
  workingHours: WorkingHour[];
  closedDates: ClosedDate[];
  staffList: StaffMember[];
  addStaffMember: (staff: Omit<StaffMember, 'id' | 'lastLogin'>) => void;
  updateStaffMember: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaffMember: (id: string) => void;
  notificationLogs: NotificationLogItem[];
  isTelegramConnected: boolean;
  telegramSyncToken: string;
  connectTelegram: () => void;
  disconnectTelegram: () => void;
  toast: { message: string; type: 'success' | 'error' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  createAppointment: (apt: Omit<Appointment, 'id' | 'ref' | 'createdAt' | 'status'>) => Promise<string>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus, decisionReason?: string, internalNote?: string) => void;
  bulkUpdateAppointments: (ids: string[], status: AppointmentStatus) => void;
  addService: (s: Service) => void;
  updateService: (s: Service) => void;
  toggleNotificationSimulator: () => void;
  isSimulatorOpen: boolean;
  previewEmailModal: boolean;
  setPreviewEmailModal: (open: boolean) => void;
  previewTelegramModal: boolean;
  setPreviewTelegramModal: (open: boolean) => void;
}

const defaultAdminUser: User = {
  id: 'usr-admin',
  name: 'አበጋዝ ተስፋዬ (Abegaz T.)',
  phone: '+251 911 234 567',
  email: 'admin@gmail.com',
  role: 'admin',
  locale: 'en',
  telegramActive: true,
  telegramChatId: '89271635'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    return (localStorage.getItem('abegaz_locale') as Locale) || 'en'; // default english for stitch prompts, easily switched
  });

  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const [activeServiceDrawer, setActiveServiceDrawer] = useState<Service | null>(null);
  const [successBookingRef, setSuccessBookingRef] = useState<string | null>('ABG-2026-0042');
  
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('abegaz_current_user');
    return saved ? JSON.parse(saved) : defaultAdminUser;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('abegaz_auth') === 'true';
  });

  const [isTelegramConnected, setIsTelegramConnected] = useState<boolean>(true);
  const [telegramSyncToken, setTelegramSyncToken] = useState<string>('tk_abg_98217f0a');

  // Staff list in LocalStorage
  const [staffList, setStaffList] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('abegaz_staff');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('abegaz_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [packages, setPackages] = useState<ServicePackage[]>(INITIAL_PACKAGES);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>(INITIAL_WORKING_HOURS);
  const [closedDates, setClosedDates] = useState<ClosedDate[]>(INITIAL_CLOSED_DATES);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [previewEmailModal, setPreviewEmailModal] = useState<boolean>(false);
  const [previewTelegramModal, setPreviewTelegramModal] = useState<boolean>(false);

  const [notificationLogs, setNotificationLogs] = useState<NotificationLogItem[]>([
    {
      id: 'log-1',
      ref: 'ABG-2026-0042',
      event: 'created',
      channel: 'email',
      recipient: 'dawit@email.com',
      success: true,
      timestamp: 'Today · 10:02 AM'
    },
    {
      id: 'log-2',
      ref: 'ABG-2026-0042',
      event: 'created',
      channel: 'telegram',
      recipient: '@dawit_kebede',
      success: true,
      timestamp: 'Today · 10:02 AM'
    },
    {
      id: 'log-3',
      ref: 'ABG-2026-0039',
      event: 'approved',
      channel: 'telegram',
      recipient: '@yonas_tadesse',
      success: true,
      timestamp: 'Yesterday · 14:05 PM'
    },
    {
      id: 'log-4',
      ref: 'ABG-2026-0036',
      event: 'rejected',
      channel: 'telegram',
      recipient: '@user_blocked_bot',
      success: false,
      error: 'Telegram: bot was blocked by the user',
      timestamp: 'Nov 03 · 11:20 AM'
    },
    {
      id: 'log-5',
      ref: 'ABG-2026-0035',
      event: 'reminder',
      channel: 'email',
      recipient: 'invalid_email@nowhere.com',
      success: false,
      error: 'SMTP: 550 User mailbox not found',
      timestamp: 'Nov 02 · 09:10 AM'
    }
  ]);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  useEffect(() => {
    localStorage.setItem('abegaz_locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    localStorage.setItem('abegaz_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('abegaz_staff', JSON.stringify(staffList));
  }, [staffList]);

  useEffect(() => {
    localStorage.setItem('abegaz_current_user', JSON.stringify(user));
    localStorage.setItem('abegaz_auth', isAuthenticated ? 'true' : 'false');
  }, [user, isAuthenticated]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Demo Login Handler as specifically requested:
  // email: admin@gmail.com and password: admin -> Admin!
  const loginUser = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (cleanEmail === 'admin@gmail.com' && cleanPass === 'admin') {
      const adminUser: User = {
        id: 'usr-admin-1',
        name: 'Mekdes Asfaw (Admin)',
        phone: '+251 911 234 567',
        email: 'admin@gmail.com',
        role: 'admin',
        locale,
        telegramActive: true
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      showToast('✔ Logged in as Administrator (Mekdes A.)');
      return { success: true, role: 'admin' as const };
    }

    // Check staff members in local storage
    const staffMatch = staffList.find(s => s.email.toLowerCase() === cleanEmail);
    if (staffMatch && (cleanPass === 'staff' || cleanPass === 'admin' || cleanPass === 'password')) {
      const stUser: User = {
        id: staffMatch.id,
        name: staffMatch.name,
        phone: '+251 922 000 111',
        email: staffMatch.email,
        role: staffMatch.role,
        locale,
        telegramActive: true
      };
      setUser(stUser);
      setIsAuthenticated(true);
      showToast(`✔ Welcome, ${staffMatch.name} (${staffMatch.role.toUpperCase()})`);
      return { success: true, role: staffMatch.role };
    }

    // Default Customer Login
    if (cleanEmail && cleanPass) {
      const custUser: User = {
        id: 'usr-cust-1',
        name: 'Dawit Kebede',
        phone: '+251 911 234 567',
        email: cleanEmail,
        role: 'customer',
        locale,
        telegramActive: true
      };
      setUser(custUser);
      setIsAuthenticated(true);
      showToast('✔ Logged in to Customer Account');
      return { success: true, role: 'customer' as const };
    }

    showToast('Invalid credentials. For Admin use: admin@gmail.com / admin', 'error');
    return { success: false, message: 'Invalid credentials' };
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setUser(defaultAdminUser);
    showToast('Signed out', 'info');
  };

  // Add new staff member with permissions into LocalStorage!
  const addStaffMember = (staffData: Omit<StaffMember, 'id' | 'lastLogin'>) => {
    const newStaff: StaffMember = {
      ...staffData,
      id: `stf-${Date.now()}`,
      lastLogin: 'Never (Invited)',
    };
    setStaffList(prev => [newStaff, ...prev]);
    showToast(`✔ Staff member "${newStaff.name}" added and saved locally!`);
  };

  const updateStaffMember = (id: string, updates: Partial<StaffMember>) => {
    setStaffList(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    showToast('Staff permissions updated');
  };

  const deleteStaffMember = (id: string) => {
    setStaffList(prev => prev.filter(s => s.id !== id));
    showToast('Staff removed');
  };

  const connectTelegram = () => {
    setIsTelegramConnected(true);
    showToast('✔ Telegram connected successfully!');
  };

  const disconnectTelegram = () => {
    setIsTelegramConnected(false);
    showToast('Telegram disconnected', 'info');
  };

  const createAppointment = async (data: Omit<Appointment, 'id' | 'ref' | 'createdAt' | 'status'>): Promise<string> => {
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const newRef = `ABG-2026-${randomSeq}`;
    const now = new Date();
    const createdStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().slice(0, 5)}`;

    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      ref: newRef,
      status: 'pending',
      createdAt: createdStr,
      submittedAgo: 'Just now'
    };

    setAppointments(prev => [newApt, ...prev]);
    setSuccessBookingRef(newRef);

    // Auto notification log
    const emailLog: NotificationLogItem = {
      id: `log-${Date.now()}-1`,
      ref: newRef,
      event: 'created',
      channel: 'email',
      recipient: newApt.customerEmail,
      success: true,
      timestamp: 'Just now'
    };

    const logsToAdd: NotificationLogItem[] = [emailLog];

    if (data.notificationMethods.telegram && isTelegramConnected) {
      const tgLog: NotificationLogItem = {
        id: `log-${Date.now()}-2`,
        ref: newRef,
        event: 'created',
        channel: 'telegram',
        recipient: `@${data.customerName.replace(/\s+/g, '_').toLowerCase()}`,
        success: true,
        timestamp: 'Just now'
      };
      logsToAdd.push(tgLog);
    }

    setNotificationLogs(prev => [...logsToAdd, ...prev]);
    return newRef;
  };

  const updateAppointmentStatus = (id: string, newStatus: AppointmentStatus, decisionReason?: string, internalNote?: string) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        const updated = { ...a, status: newStatus };
        if (decisionReason) updated.decisionReason = decisionReason;
        if (internalNote) {
          updated.internalNotes = [...(updated.internalNotes || []), `${new Date().toLocaleTimeString()}: ${internalNote}`];
        }
        return updated;
      }
      return a;
    }));

    const apt = appointments.find(a => a.id === id);
    if (apt) {
      const newLogs: NotificationLogItem[] = [];

      if (apt.notificationMethods.email) {
        newLogs.push({
          id: `log-${Date.now()}-e`,
          ref: apt.ref,
          event: newStatus as any,
          channel: 'email',
          recipient: apt.customerEmail,
          success: true,
          timestamp: 'Just now'
        });
      }

      if (apt.notificationMethods.telegram && isTelegramConnected) {
        newLogs.push({
          id: `log-${Date.now()}-t`,
          ref: apt.ref,
          event: newStatus as any,
          channel: 'telegram',
          recipient: `@${apt.customerName.replace(/\s+/g, '_').toLowerCase()}`,
          success: true,
          timestamp: 'Just now'
        });
      }

      setNotificationLogs(prev => [...newLogs, ...prev]);

      showToast(
        locale === 'am'
          ? `ቀጠሮ ${apt.ref} ወደ «${newStatus}» ተቀይሯል። ማሳወቂያ ተልኳል!`
          : `Appointment ${apt.ref} updated to ${newStatus}. Notification sent!`
      );
    }
  };

  const bulkUpdateAppointments = (ids: string[], status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => ids.includes(a.id) ? { ...a, status } : a));
    showToast(`Bulk updated ${ids.length} appointments to ${status}`);
  };

  const addService = (s: Service) => {
    setServices(prev => [s, ...prev]);
    showToast('New service created');
  };

  const updateService = (s: Service) => {
    setServices(prev => prev.map(item => item.id === s.id ? s : item));
    showToast('Service updated');
  };

  const toggleNotificationSimulator = () => {
    setIsSimulatorOpen(prev => !prev);
  };

  return (
    <AppContext.Provider value={{
      locale,
      setLocale,
      currentView,
      setCurrentView,
      selectedServiceSlug,
      setSelectedServiceSlug,
      activeServiceDrawer,
      setActiveServiceDrawer,
      successBookingRef,
      setSuccessBookingRef,
      user,
      setUser,
      isAuthenticated,
      loginUser,
      logoutUser,
      appointments,
      services,
      packages,
      workingHours,
      closedDates,
      staffList,
      addStaffMember,
      updateStaffMember,
      deleteStaffMember,
      notificationLogs,
      isTelegramConnected,
      telegramSyncToken,
      connectTelegram,
      disconnectTelegram,
      toast,
      showToast,
      createAppointment,
      updateAppointmentStatus,
      bulkUpdateAppointments,
      addService,
      updateService,
      toggleNotificationSimulator,
      isSimulatorOpen,
      previewEmailModal,
      setPreviewEmailModal,
      previewTelegramModal,
      setPreviewTelegramModal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
