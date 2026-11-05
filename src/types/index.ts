export type Locale = 'am' | 'en';

export type UserRole = 'guest' | 'customer' | 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  locale: Locale;
  telegramChatId?: string;
  telegramActive: boolean;
}

export interface StaffPermissions {
  approveReject: boolean;
  updateStatus: boolean;
  manageSlots: boolean;
  viewCustomers: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  status: 'active' | 'invited' | 'blocked';
  lastLogin: string;
  permissions: StaffPermissions;
}

export type AppointmentStatus = 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed';

export interface Service {
  id: string;
  slug: string;
  nameAm: string;
  nameEn: string;
  category: 'motor' | 'electric' | 'brakes' | 'body' | 'diagnostics' | 'maintenance';
  icon: string;
  durationMin: number;
  durationText?: string;
  priceStarting?: number;
  descriptionAm: string;
  descriptionEn: string;
  includedAm: string[];
  includedEn: string[];
  warningSignsAm: string[];
  warningSignsEn: string[];
  featured: boolean;
  active: boolean;
}

export interface ServicePackage {
  id: string;
  slug: string;
  nameAm: string;
  nameEn: string;
  price: number;
  priceText?: string;
  durationHours: number;
  durationText?: string;
  descriptionAm: string;
  descriptionEn: string;
  includedAm: string[];
  includedEn: string[];
  notIncludedAm: string[];
  notIncludedEn: string[];
  featured: boolean;
  clientType: 'individual' | 'fleet' | 'both';
  active: boolean;
}

export interface Appointment {
  id: string;
  ref: string; // e.g. ABG-2026-0042
  status: AppointmentStatus;
  customerType: 'individual' | 'corporate';
  companyName?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleMake: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleYear?: number;
  serviceId?: string;
  serviceName?: string;
  packageId?: string;
  packageName?: string;
  problemTags: string[];
  problemDescription: string;
  photos: string[];
  requestedDate: string; // YYYY-MM-DD
  requestedSlot: string; // e.g. 10:00 AM
  ethiopianDate?: string;
  ethiopianTime?: string;
  createdAt: string;
  submittedAgo?: string;
  assignedTo?: string;
  assignedAvatar?: string;
  decisionReason?: string;
  internalNotes?: string[];
  notificationMethods: {
    email: boolean;
    telegram: boolean;
  };
}

export interface NotificationLogItem {
  id: string;
  ref: string;
  event: 'created' | 'approved' | 'rejected' | 'in_progress' | 'completed' | 'reminder';
  channel: 'email' | 'telegram';
  recipient: string;
  success: boolean;
  error?: string;
  timestamp: string;
}

export interface WorkingHour {
  dayIndex: number;
  dayNameAm: string;
  dayNameEn: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  breakStart?: string;
  breakEnd?: string;
  slotLength?: number;
  capacity?: number;
}

export interface ClosedDate {
  id: string;
  date: string;
  reasonAm: string;
  reasonEn: string;
  isHoliday?: boolean;
}

export interface FAQItem {
  id: string;
  questionAm: string;
  questionEn: string;
  answerAm: string;
  answerEn: string;
  category: 'booking' | 'services' | 'pricing' | 'account';
  confirmed: boolean;
}

export interface GalleryItem {
  id: string;
  titleAm: string;
  titleEn: string;
  vehicle: string;
  plate: string;
  locationAm: string;
  locationEn: string;
  category: 'engine' | 'body' | 'brakes' | 'suspension' | 'beforeAfter';
  isBeforeAfter: boolean;
  beforeImage: string;
  afterImage: string;
  beforeDescriptionAm: string;
  beforeDescriptionEn: string;
  afterDescriptionAm: string;
  afterDescriptionEn: string;
  altText: string;
  dateCompleted: string;
}

export interface Testimonial {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  commentAm: string;
  commentEn: string;
  approved: boolean;
  date: string;
}
