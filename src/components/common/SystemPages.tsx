import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wrench, Lock, ArrowLeft, Calendar, Send, Mail, X, Check, MapPin, Smartphone } from 'lucide-react';
import { Button } from './Button';

// F1. 404 Page (Desktop & Mobile)
export const NotFoundPage: React.FC = () => {
  const { locale, setCurrentView } = useApp();

  return (
    <div className="min-h-[75vh] bg-white bg-blueprint flex items-center justify-center p-6 text-center">
      <div className="max-w-lg space-y-6">
        {/* Outlined 404 with wrench replacing zero */}
        <div className="flex items-center justify-center font-extrabold text-7xl sm:text-9xl text-navy tracking-tighter select-none font-mono">
          <span>4</span>
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-8 border-navy flex items-center justify-center mx-2 text-orange-signal">
            <Wrench className="w-10 h-10 sm:w-16 sm:h-16 stroke-[2.5]" />
          </div>
          <span>4</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
            {locale === 'am' ? 'ይህ መንገድ ተዘግቷል!' : 'This road is closed.'}
          </h2>
          <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto leading-relaxed">
            {locale === 'am'
              ? 'የፈለጉት ገጽ የለም ወይም ወደ ሌላ ቦታ ተዛውሯል።'
              : 'The page you’re looking for doesn’t exist or has moved.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => setCurrentView('home')}
            className="w-full sm:w-auto"
          >
            <span>{locale === 'am' ? 'ወደ መነሻ ገጽ ተመለስ' : 'Back to Home'}</span>
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => setCurrentView('book')}
            className="w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4 mr-1.5" />
            <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

// F2. 403 No Permission Page (Staff friendly)
export const ForbiddenPage: React.FC = () => {
  const { locale, setCurrentView } = useApp();

  return (
    <div className="min-h-[75vh] bg-mist flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white rounded-banner p-8 border border-line shadow-sm space-y-5">
        <div className="w-16 h-16 rounded-full bg-orange-tint flex items-center justify-center text-orange-deep mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
            {locale === 'am' ? 'ይህን ገጽ ለማየት ፈቃድ የለዎትም' : 'You don’t have permission to view this page'}
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            {locale === 'am'
              ? 'ይህ ክፍል ለአስተዳዳሪዎች ብቻ የተፈቀደ ነው። ፈቃድ ከፈለጉ ዋና አስተዳዳሪውን ይጠይቁ።'
              : 'Ask an administrator if you need access to this section.'}
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => setCurrentView('staff')}
        >
          <span>{locale === 'am' ? 'ወደ «ዛሬ» ተመለስ' : 'Back to Today'}</span>
        </Button>
      </div>
    </div>
  );
};

// F3. Transactional Email Preview (600px wide) Modal
export const EmailPreviewModal: React.FC = () => {
  const { previewEmailModal, setPreviewEmailModal, locale } = useApp();
  if (!previewEmailModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-[640px] bg-mist rounded-banner p-4 sm:p-6 shadow-2xl border border-line my-8">
        <button
          onClick={() => setPreviewEmailModal(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white border border-line flex items-center justify-center text-navy shadow hover:bg-mist"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">
          Prompt F3: Transactional Email Preview (600px width on Mist background)
        </p>

        {/* 600px Email Card */}
        <div className="max-w-[600px] mx-auto bg-white rounded-card overflow-hidden border border-line shadow-md text-navy text-xs sm:text-sm">
          {/* Header */}
          <div className="bg-navy p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-slate-800 text-orange-signal flex items-center justify-center font-bold text-base">⚙️</div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base leading-tight">ABEGAZ MOTORS ENGINEERING</h3>
                <p className="text-[10px] text-slate-400">Precision Garage · Addis Ababa</p>
              </div>
            </div>
            <span className="text-[10px] bg-slate-800 px-2.5 py-1 rounded text-orange-signal font-mono font-bold">
              ABG-2026-0042
            </span>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Approved</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight leading-snug">
              Good news — your appointment is approved!
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Hello <strong>Dawit Kebede</strong>, our lead engineer reviewed your request and confirmed your garage bay slot.
            </p>

            {/* Details Table */}
            <div className="p-4 bg-mist rounded-card border border-line space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-muted">Booking Reference:</span>
                <span className="font-mono font-bold text-navy">ABG-2026-0042</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-muted">Confirmed Service:</span>
                <span className="font-bold text-navy">Brake System Service</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-muted">Scheduled Date & Time:</span>
                <span className="font-bold text-navy">Thu 12 Nov 2026 · 10:00 AM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-muted">Vehicle:</span>
                <span className="font-bold text-navy">Toyota Vitz · [AA-12345]</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted">Workshop Location:</span>
                <span className="font-semibold text-navy text-right">Bole, Addis Ababa — near Electric Power district</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
              Please arrive on time. If anything changes, contact us on Telegram <strong>@AbegazMotors</strong> or call <strong>+251 911 234 567</strong>.
            </p>

            <div className="pt-2">
              <button className="w-full h-12 rounded-btn bg-orange-signal text-navy font-bold text-sm hover:bg-[#EA580C] shadow transition-all">
                View My Appointment ›
              </button>
            </div>

            <div className="pt-6 border-t border-line text-[11px] text-muted text-center space-y-1">
              <p>Abegaz Motors Engineering · Akaki-Kality / Bole Road, Addis Ababa</p>
              <p className="text-slate-400">This message was sent automatically. Please do not reply directly to this email.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// F4. Telegram Bot Messages Preview Modal
export const TelegramPreviewModal: React.FC = () => {
  const { previewTelegramModal, setPreviewTelegramModal } = useApp();
  if (!previewTelegramModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-sm bg-[#0E1621] text-white rounded-banner p-4 shadow-2xl border border-slate-700 my-8">
        <button
          onClick={() => setPreviewTelegramModal(false)}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Telegram Top Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800 text-xs">
          <div className="w-9 h-9 rounded-full bg-[#229ED9] text-white flex items-center justify-center font-bold text-sm">
            ⚙️
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Abegaz Motors</h4>
            <p className="text-[10px] text-slate-400">bot · verified</p>
          </div>
        </div>

        {/* 3 Message Bubbles per Prompt F4 */}
        <div className="py-4 space-y-4 text-xs">
          {/* Bubble 1: Received */}
          <div className="bg-[#182533] p-3.5 rounded-card border border-slate-700/60 space-y-1.5 leading-relaxed">
            <p className="font-bold text-amber-400 text-sm">📝 We’ve received your request</p>
            <p>🔖 Number: <span className="font-mono text-orange-signal font-bold">ABG-2026-0042</span></p>
            <p>🔧 Service: Brake Service</p>
            <p>📅 Thu 12 Nov · 10:00 AM</p>
            <p>🚗 Toyota Vitz · AA-12345</p>
            <p className="text-amber-200">🟡 Status: Pending</p>
            <p className="text-slate-300">Our expert will approve it and we’ll tell you right here.</p>
            <div className="pt-2">
              <button className="w-full py-2 bg-[#2B5278] hover:bg-[#34628E] text-white font-bold rounded-lg text-xs">
                🔍 View my appointment
              </button>
            </div>
            <div className="text-[10px] text-slate-500 text-right">09:41 AM · ✔✔</div>
          </div>

          {/* Bubble 2: Approved */}
          <div className="bg-[#182533] p-3.5 rounded-card border border-slate-700/60 space-y-1.5 leading-relaxed">
            <p className="font-bold text-green-400 text-sm">✅ Your appointment is approved!</p>
            <p>🔖 <span className="font-mono text-green-400 font-bold">ABG-2026-0042</span></p>
            <p>📅 Thu 12 Nov · 10:00 AM</p>
            <p>📍 Bole, Addis Ababa</p>
            <p className="text-slate-200">Please arrive on time. 🙏</p>
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button className="py-2 bg-[#2B5278] hover:bg-[#34628E] text-white font-bold rounded-lg text-xs">
                🗺 Directions
              </button>
              <button className="py-2 bg-[#2B5278] hover:bg-[#34628E] text-white font-bold rounded-lg text-xs">
                🔍 Details
              </button>
            </div>
            <div className="text-[10px] text-slate-500 text-right">10:02 AM · ✔✔</div>
          </div>

          {/* Bubble 3: Rejected */}
          <div className="bg-[#182533] p-3.5 rounded-card border border-slate-700/60 space-y-1.5 leading-relaxed">
            <p className="font-bold text-red-400 text-sm">❌ Sorry, we couldn’t take your appointment</p>
            <p>🔖 <span className="font-mono text-red-400 font-bold">ABG-2026-0042</span></p>
            <p className="text-slate-300"><strong>Reason:</strong> That slot is already full.</p>
            <div className="pt-2">
              <button className="w-full py-2 bg-[#2B5278] hover:bg-[#34628E] text-white font-bold rounded-lg text-xs">
                📅 Choose another time
              </button>
            </div>
            <div className="text-[10px] text-slate-500 text-right">11:15 AM · ✔✔</div>
          </div>
        </div>
      </div>
    </div>
  );
};
