import React from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, MapPin, Send, Mail, Clock, ArrowRight } from 'lucide-react';
import { WORKSHOP_INFO } from '../../lib/constants';

export const Footer: React.FC = () => {
  const { locale, setCurrentView } = useApp();

  const handleNav = (v: string) => {
    if (v === 'faq') {
      setCurrentView('home');
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
    setCurrentView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-btn bg-white flex items-center justify-center p-1 shadow-sm border border-slate-700 overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="Abegaz Motors Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-lg leading-tight">አበጋዝ ሞተርስ</h3>
                <p className="text-xs text-slate-400">Engineering & Car Care</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {locale === 'am' 
                ? 'ትክክለኛ ምህንድስና፣ ዘመናዊ የኮምፒውተር ምርመራ እና ንጹህ ወርክሾፕ። ለመኪናዎ አስተማማኝ እንክብካቤ።'
                : 'Precision garage engineering, high-tech diagnostics, and clean workshop environment in Addis Ababa.'}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://t.me/AbegazMotors" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#229ED9]/20 hover:bg-[#229ED9] text-[#229ED9] hover:text-white flex items-center justify-center transition-all"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href={`tel:${WORKSHOP_INFO.phoneRaw}`}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-orange-signal hover:text-navy text-slate-300 flex items-center justify-center transition-all"
                title={`Call ${WORKSHOP_INFO.phone}`}
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="mailto:abiyme@gmail.com"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-orange-signal hover:text-navy text-slate-300 flex items-center justify-center transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-orange-signal pl-3">
              {locale === 'am' ? 'ፈጣን ማገናኛዎች' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', labelAm: 'መነሻ ገጽ', labelEn: 'Home' },
                { id: 'track', labelAm: 'የቀጠሮ መከታተያ (Track)', labelEn: 'Track Booking' },
                { id: 'about', labelAm: 'ስለ እኛ', labelEn: 'About Us' },
                { id: 'packages', labelAm: 'የጥገና ጥቅሎች', labelEn: 'Packages' },
                { id: 'gallery', labelAm: 'የስራዎቻችን ጋለሪ', labelEn: 'Gallery' },
                { id: 'faq', labelAm: 'ተደጋጋሚ ጥያቄዎች', labelEn: 'FAQ' },
                { id: 'contact', labelAm: 'አድራሻና ካርታ', labelEn: 'Contact' },
              ].map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNav(item.id)}
                    className="hover:text-orange-signal transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span>{locale === 'am' ? item.labelAm : item.labelEn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Services */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-orange-signal pl-3">
              {locale === 'am' ? 'አገልግሎቶች' : 'Key Services'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                'ዘመናዊ የኮምፒውተር ምርመራ',
                'የሞተር ሙሉ ጥገና እና ማደስ',
                'የብሬክ እና ሱስፔንሽን ጥገና',
                'የኤሌክትሪክ እና ኤርኮንዲሽነር',
                'መደበኛ ወቅታዊ ሰርቪስ',
                'ለድርጅቶችና ፍሊት ድጋፍ'
              ].map((svc, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => handleNav('services')}
                    className="hover:text-orange-signal transition-colors text-slate-400 hover:text-white"
                  >
                    {svc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-orange-signal pl-3">
              {locale === 'am' ? 'የስራ ሰዓትና አድራሻ' : 'Working Hours & Location'}
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a 
                href={WORKSHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 hover:text-white transition-colors group"
                title="Open Google Maps"
              >
                <MapPin className="w-4 h-4 text-orange-signal shrink-0 mt-1 group-hover:animate-bounce" />
                <span className="leading-snug">
                  {locale === 'am' ? WORKSHOP_INFO.addressAm : WORKSHOP_INFO.addressEn} ({WORKSHOP_INFO.plusCode})
                </span>
              </a>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-signal shrink-0 mt-1" />
                <div>
                  <p className="text-slate-200 font-medium">ሰኞ – ቅዳሜ: 08:00 – 18:00</p>
                  <p className="text-xs text-orange-signal font-semibold">
                    {locale === 'am' ? WORKSHOP_INFO.hoursScheduleAm : WORKSHOP_INFO.hoursScheduleEn}
                  </p>
                  <p className="text-xs text-slate-500">እሁድ: ዝግ ነው (Sunday: Closed)</p>
                </div>
              </div>
              <a 
                href={`tel:${WORKSHOP_INFO.phoneRaw}`} 
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-signal shrink-0" />
                <span className="text-slate-200 font-mono font-bold">{WORKSHOP_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Abegaz Motors Engineering. መብቱ በህግ የተጠበቀ ነው።</p>
          <div className="flex items-center gap-4">
            <span>Built by <strong className="text-slate-300">Wise Digital Marketing</strong></span>
            <span>·</span>
            <button onClick={() => handleNav('admin')} className="hover:text-slate-300 underline">
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
