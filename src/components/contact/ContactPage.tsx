import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Send, Mail, MapPin, Clock, Copy, Navigation, ExternalLink } from 'lucide-react';
import { isWorkshopOpenNow } from '../../lib/ethiopianCalendar';
import { Button } from '../common/Button';

export const ContactPage: React.FC = () => {
  const { locale, workingHours, showToast } = useApp();
  const [mapLoaded, setMapLoaded] = useState(false);
  const statusInfo = isWorkshopOpenNow();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} ተቀድቷል`);
  };

  return (
    <div className="py-12 md:py-20 bg-mist min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-orange-deep text-xs font-bold uppercase tracking-wider">
            {locale === 'am' ? 'ያግኙን' : 'Reach Us'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight mt-1">
            {locale === 'am' ? 'አድራሻና የመገናኛ መንገዶች' : 'Contact & Workshop Location'}
          </h1>
          <p className="text-muted text-xs sm:text-sm mt-3">
            {locale === 'am'
              ? 'በስልክ ይደውሉ፣ በቴሌግራም መልእክት ይላኩ ወይም በቀጥታ ወደ ወርክሾፓችን ይምጡ።'
              : 'Direct hotline, verified Telegram desk, and map directions to our garage.'}
          </p>
        </div>

        {/* Live Working Hours Status Badge (PRD 12.2) */}
        <div className="max-w-md mx-auto">
          <div className={`p-4 rounded-card border flex items-center justify-center gap-3 text-sm font-bold shadow-sm ${
            statusInfo.isOpen
              ? 'bg-green-50 text-green-800 border-green-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            <span className={`w-3 h-3 rounded-full animate-ping ${statusInfo.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            <span>{locale === 'am' ? statusInfo.nextStatusAm : statusInfo.nextStatusEn}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone Card */}
            <div className="bg-white p-6 rounded-card border border-line shadow-sm flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-tint flex items-center justify-center text-orange-deep shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted font-bold uppercase">{locale === 'am' ? 'ስልክ ቁጥር' : 'Direct Call'}</p>
                  <a href="tel:+251911234567" className="text-lg font-extrabold text-navy hover:text-orange-deep transition-colors">
                    +251 911 234 567
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">ሰኞ – ቅዳሜ: 08:00 – 18:00</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('+251911234567', 'ስልክ ቁጥር')}
                className="text-muted hover:text-navy p-1"
                title="Copy phone"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            {/* Telegram Card */}
            <div className="bg-white p-6 rounded-card border border-line shadow-sm flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#229ED9]/10 flex items-center justify-center text-[#229ED9] shrink-0">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted font-bold uppercase">Telegram Bot & Support</p>
                  <a
                    href="https://t.me/AbegazMotors"
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-extrabold text-[#0088cc] hover:underline"
                  >
                    @AbegazMotors
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">{locale === 'am' ? 'የ 24 ሰዓት የጥያቄ መቀበያ' : '24/7 inquiries & notifications'}</p>
                </div>
              </div>
              <a
                href="https://t.me/AbegazMotors"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-btn bg-[#229ED9] text-white hover:bg-[#1D8BC0]"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white p-6 rounded-card border border-line shadow-sm flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-mist flex items-center justify-center text-navy shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted font-bold uppercase">{locale === 'am' ? 'ኢሜይል' : 'Email Desk'}</p>
                  <a href="mailto:info@abegazmotors.et" className="text-sm sm:text-base font-bold text-navy hover:text-orange-deep">
                    info@abegazmotors.et
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Official Inquiries & Fleet</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('info@abegazmotors.et', 'ኢሜይል')}
                className="text-muted hover:text-navy p-1"
                title="Copy email"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            {/* Address & Landmark Card (PRD 12.1) */}
            <div className="bg-white p-6 rounded-card border border-line shadow-sm space-y-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-tint flex items-center justify-center text-orange-deep shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted font-bold uppercase">{locale === 'am' ? 'አድራሻና የመለያ ምልክት' : 'Workshop Landmark'}</p>
                  <h4 className="text-base font-extrabold text-navy">
                    {locale === 'am' ? 'አዲስ አበባ፣ ቃሊቲ ክፍለ ከተማ' : 'Addis Ababa, Akaki-Kality'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {locale === 'am' 
                      ? 'ዋናው መንገድ፣ ከመብራት ኃይል ዲስትሪክት ቢሮ 200 ሜትር አለፍ ብሎ በስተቀኝ በኩል።'
                      : 'Main Debre Zeit road, 200m past Electric Power district office on the right.'}
                  </p>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard('አዲስ አበባ፣ ቃሊቲ ከመብራት ኃይል አጠገብ', 'አድራሻ')}
                  className="px-3 py-1.5 rounded-lg border border-line text-xs font-semibold text-navy hover:bg-mist flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{locale === 'am' ? 'አድራሻ ቅዳ' : 'Copy Address'}</span>
                </button>
                <a
                  href="https://maps.google.com/?q=Akaki+Kality+Addis+Ababa"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-orange-signal text-navy text-xs font-bold flex items-center gap-1.5 hover:bg-[#EA580C]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{locale === 'am' ? 'አቅጣጫ ያግኙ (Maps)' : 'Get Directions'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Map Facade & Hours Table */}
          <div className="lg:col-span-7 space-y-6">
            {/* Google Maps Facade (PRD 12.3: loads iframe only on user click to save mobile data) */}
            <div className="bg-white rounded-banner overflow-hidden border border-line shadow-sm">
              <div className="relative h-80 sm:h-96 bg-slate-100 flex items-center justify-center">
                {mapLoaded ? (
                  <iframe
                    title="Abegaz Motors Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63056.88371360144!2d38.7423!3d8.9056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85040e34c9c1%3A0xa6182c16f272a08d!2sAkaki%20Kality%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-mist">
                    <MapPin className="w-12 h-12 text-orange-deep mb-3 animate-bounce" />
                    <p className="text-sm font-bold text-navy mb-1">
                      {locale === 'am' ? 'የአበጋዝ ሞተርስ መገኛ ካርታ' : 'Abegaz Motors Workshop Map'}
                    </p>
                    <p className="text-xs text-muted mb-4 max-w-xs">
                      {locale === 'am' ? 'የሞባይል ዳታ ለመቆጠብ ካርታው ሲጫኑ ብቻ ይከፈታል።' : 'Click to load interactive Google Maps.'}
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setMapLoaded(true)}
                    >
                      <MapPin className="w-4 h-4 mr-1.5" />
                      <span>{locale === 'am' ? 'ካርታውን ክፈት' : 'Load Interactive Map'}</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Business Hours Table */}
            <div className="bg-white p-6 rounded-banner border border-line shadow-sm">
              <h4 className="text-sm font-bold text-navy mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-signal" />
                <span>{locale === 'am' ? 'ሳምንታዊ የስራ ሰዓታት' : 'Weekly Working Hours'}</span>
              </h4>
              <div className="divide-y divide-line text-xs sm:text-sm">
                {workingHours.map((wh) => (
                  <div key={wh.dayIndex} className="py-2.5 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">
                      {locale === 'am' ? wh.dayNameAm : wh.dayNameEn}
                    </span>
                    <span className={wh.isOpen ? 'font-mono text-navy font-bold' : 'text-red-600 font-bold'}>
                      {wh.isOpen ? `${wh.openTime} – ${wh.closeTime}` : (locale === 'am' ? 'ዝግ ነው (Closed)' : 'Closed')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
