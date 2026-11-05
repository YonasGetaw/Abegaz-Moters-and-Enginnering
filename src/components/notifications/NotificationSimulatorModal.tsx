import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Mail, X, CheckCircle2, QrCode, Smartphone, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';

export const NotificationSimulatorModal: React.FC = () => {
  const { 
    locale, 
    isSimulatorOpen, 
    toggleNotificationSimulator, 
    appointments, 
    isTelegramConnected,
    connectTelegram,
    disconnectTelegram,
    telegramSyncToken
  } = useApp();

  const [activeChannel, setActiveChannel] = useState<'telegram' | 'email'>('telegram');
  const [selectedRef, setSelectedRef] = useState<string>(appointments[0]?.ref || 'ABG-2026-0042');

  if (!isSimulatorOpen) return null;

  const apt = appointments.find(a => a.ref === selectedRef) || appointments[0];

  return (
    <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-banner max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-line">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-navy text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-signal" />
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">
                {locale === 'am' ? 'የማሳወቂያ ሲሙሌተር (Live Dispatch Simulator)' : 'Live Notification Preview Simulator'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {locale === 'am' ? 'ደንበኞችና ሰራተኞች በስልካቸው የሚያዩትን የቀጥታ መልእክት ይሞክሩ' : 'Simulate incoming Telegram messages & Emails in real-time'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleNotificationSimulator}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Ref selection & Channel tabs */}
        <div className="p-4 bg-mist border-b border-line flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-navy">ቀጠሮ ይምረጡ፦</span>
            <select
              value={selectedRef}
              onChange={(e) => setSelectedRef(e.target.value)}
              className="h-9 px-2 bg-white border border-line rounded-lg font-mono font-bold"
            >
              {appointments.map(a => (
                <option key={a.id} value={a.ref}>{a.ref} — {a.customerName} ({a.status})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-line">
            <button
              onClick={() => setActiveChannel('telegram')}
              className={`px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 transition-all ${
                activeChannel === 'telegram' ? 'bg-[#229ED9] text-white shadow-sm' : 'text-slate-600 hover:text-navy'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram Bot</span>
            </button>
            <button
              onClick={() => setActiveChannel('email')}
              className={`px-3 py-1.5 rounded-md font-bold flex items-center gap-1.5 transition-all ${
                activeChannel === 'email' ? 'bg-navy text-white shadow-sm' : 'text-slate-600 hover:text-navy'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>React Email</span>
            </button>
          </div>
        </div>

        {/* Preview Container */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100 flex justify-center">
          {activeChannel === 'telegram' ? (
            /* Telegram Chat Mock (PRD 17.4) */
            <div className="w-full max-w-sm bg-[#0E1621] text-white rounded-banner p-4 shadow-xl border border-slate-700 font-sans space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-[#229ED9] text-white flex items-center justify-center text-[10px] font-extrabold">⚙️</span>
                  Abegaz Motors Bot
                </span>
                <span>Bot ✔</span>
              </div>

              {/* Bot Message Bubble */}
              <div className="bg-[#182533] p-4 rounded-card border border-slate-700/60 text-xs space-y-2.5 leading-relaxed">
                {apt?.status === 'pending' && (
                  <>
                    <p className="font-bold text-amber-400 text-sm">📝 ጥያቄዎ ደርሶናል!</p>
                    <p>🔖 <strong>ቁጥር፦</strong> <span className="font-mono text-orange-signal">{apt.ref}</span></p>
                    <p>🔧 <strong>አገልግሎት፦</strong> {apt.vehicleMake} {apt.vehicleModel}</p>
                    <p>📅 <strong>ቀንና ሰዓት፦</strong> {apt.requestedDate} · {apt.requestedSlot}</p>
                    <p>🚗 <strong>ሰሌዳ፦</strong> [{apt.vehiclePlate}]</p>
                    <p className="text-amber-200 mt-1">🟡 <strong>ሁኔታ፦</strong> በመጠባበቅ ላይ<br />ባለሙያችን ሲያጸድቀው እዚሁ እናሳውቅዎታለን።</p>
                  </>
                )}

                {apt?.status === 'approved' && (
                  <>
                    <p className="font-bold text-green-400 text-sm">✅ ደስ የሚል ዜና — ቀጠሮዎ ጸድቋል!</p>
                    <p>🔖 <strong>ቁጥር፦</strong> <span className="font-mono text-green-400">{apt.ref}</span></p>
                    <p>📅 <strong>የተረጋገጠ ሰዓት፦</strong> {apt.requestedDate} · {apt.requestedSlot}</p>
                    <p>📍 <strong>አድራሻ፦</strong> አዲስ አበባ፣ ቃሊቲ (ከመብራት ኃይል አጠገብ)</p>
                    <p className="text-slate-300">እባክዎ በሰዓቱ ይምጡ። ለውጥ ካለ በስልክ +251 911 234 567 ያነጋግሩን። 🙏</p>
                  </>
                )}

                {apt?.status === 'rejected' && (
                  <>
                    <p className="font-bold text-red-400 text-sm">❌ ይቅርታ፣ ቀጠሮዎን ማስተናገድ አልቻልንም</p>
                    <p>🔖 <strong>ቁጥር፦</strong> <span className="font-mono text-red-400">{apt.ref}</span></p>
                    <p className="text-slate-300"><strong>ምክንያት፦</strong> {apt.decisionReason || 'የወርክሾፑ ሰዓት ስለሞላ እባክዎ ሌላ ቀን ይምረጡ።'}</p>
                  </>
                )}

                {/* Inline Telegram Buttons */}
                <div className="pt-2 border-t border-slate-700 space-y-1.5">
                  <button className="w-full py-2 bg-[#2B5278] hover:bg-[#34628E] text-white font-bold rounded-lg text-[11px] transition-colors">
                    🔍 ቀጠሮዬን በድረ-ገጽ ይመልከቱ
                  </button>
                  {apt?.status === 'approved' && (
                    <button className="w-full py-2 bg-[#2B5278] hover:bg-[#34628E] text-white font-bold rounded-lg text-[11px] transition-colors">
                      🗺 አቅጣጫ አሳይ (Google Maps)
                    </button>
                  )}
                </div>
              </div>

              <div className="text-[10px] text-slate-500 text-right">
                {new Date().toLocaleTimeString()} · Delivered ✔✔
              </div>
            </div>
          ) : (
            /* React Email Mock (PRD 17.3) */
            <div className="w-full max-w-md bg-white rounded-card overflow-hidden shadow-xl border border-line text-navy text-xs leading-relaxed">
              {/* Email Top Bar */}
              <div className="bg-navy p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-slate-800 text-orange-signal flex items-center justify-center font-bold text-sm">⚙️</div>
                  <span className="font-extrabold text-sm">አበጋዝ ሞተርስ ኢንጂነሪንግ</span>
                </div>
                <span className="text-[10px] text-slate-400">Automated Notification</span>
              </div>

              {/* Email Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <h4 className="font-extrabold text-base text-navy">
                    {apt?.status === 'approved' ? '✔ የቀጠሮ ማረጋገጫ' : 'የቀጠሮ ማሳወቂያ'}
                  </h4>
                  <span className="font-mono font-bold text-orange-deep bg-orange-tint px-2 py-0.5 rounded">
                    {apt?.ref}
                  </span>
                </div>

                <p className="text-slate-700">
                  ሰላም <strong>{apt?.customerName}</strong>፣
                </p>

                <p className="text-slate-600">
                  {apt?.status === 'approved' 
                    ? 'ደስ የሚል ዜና! የቀጠሮ ጥያቄዎ በዋና መሃንዲሳችን ተገምግሞ ጸድቋል።'
                    : 'የቀጠሮ ጥያቄዎ በተሳካ ሁኔታ ደርሶናል፤ በቅርቡ ገምግመን እናሳውቅዎታለን።'}
                </p>

                {/* Details Table */}
                <div className="p-4 bg-mist rounded-card border border-line space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-muted">ተሽከርካሪ፡</span><span className="font-bold text-navy">{apt?.vehicleMake} {apt?.vehicleModel}</span></div>
                  <div className="flex justify-between"><span className="text-muted">የሰሌዳ ቁጥር፡</span><span className="font-mono font-bold text-navy">[{apt?.vehiclePlate}]</span></div>
                  <div className="flex justify-between"><span className="text-muted">ቀንና ሰዓት፡</span><span className="font-bold text-navy">{apt?.requestedDate} · {apt?.requestedSlot}</span></div>
                  <div className="flex justify-between"><span className="text-muted">የኢትዮጵያ ቀን፡</span><span className="text-orange-deep font-semibold">{apt?.ethiopianDate}</span></div>
                </div>

                <div className="text-center pt-2">
                  <a
                    href="#account"
                    className="inline-block px-6 py-2.5 rounded-btn bg-orange-signal text-navy font-bold text-xs shadow hover:bg-[#EA580C]"
                  >
                    ቀጠሮዬን በድረ-ገጽ ይመልከቱ ›
                  </a>
                </div>

                <div className="pt-4 border-t border-line text-[10px] text-muted text-center">
                  አዲስ አበባ፣ ቃሊቲ (ከመብራት ኃይል አጠገብ) · +251 911 234 567<br />
                  ይህ መልእክት በራስ-ሰር የተላከ ነው።
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
