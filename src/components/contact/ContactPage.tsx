import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Send, Mail, MapPin, Clock, Copy, Navigation, ExternalLink } from 'lucide-react';
import { isWorkshopOpenNow } from '../../lib/ethiopianCalendar';
import { WORKSHOP_INFO } from '../../lib/constants';
import { Button } from '../common/Button';
import { LeafletMap } from './LeafletMap';

export const ContactPage: React.FC = () => {
  const { locale, workingHours, showToast } = useApp();
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
                  <a href={`tel:${WORKSHOP_INFO.phoneRaw}`} className="text-lg font-extrabold text-navy hover:text-orange-deep transition-colors">
                    {WORKSHOP_INFO.phone}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {locale === 'am' ? WORKSHOP_INFO.hoursScheduleAm : WORKSHOP_INFO.hoursScheduleEn}
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(WORKSHOP_INFO.phone, 'ስልክ ቁጥር')}
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
                  <a href={`mailto:${WORKSHOP_INFO.email}`} className="text-sm sm:text-base font-bold text-navy hover:text-orange-deep">
                    {WORKSHOP_INFO.email}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Official Inquiries & Fleet</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(WORKSHOP_INFO.email, 'ኢሜይል')}
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
                    {locale === 'am' ? WORKSHOP_INFO.addressAm : WORKSHOP_INFO.addressEn}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    <span className="font-semibold text-orange-deep">Plus Code:</span> {WORKSHOP_INFO.plusCode}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {locale === 'am' ? WORKSHOP_INFO.hoursScheduleAm : WORKSHOP_INFO.hoursScheduleEn}
                  </p>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(`${WORKSHOP_INFO.addressEn} (${WORKSHOP_INFO.plusCode})`, 'አድራሻ')}
                  className="px-3 py-1.5 rounded-lg border border-line text-xs font-semibold text-navy hover:bg-mist flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{locale === 'am' ? 'አድራሻ ቅዳ' : 'Copy Address'}</span>
                </button>
                <a
                  href={WORKSHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-orange-signal text-navy text-xs font-bold flex items-center gap-1.5 hover:bg-[#EA580C]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{locale === 'am' ? 'አቅጣጫ በ Google Maps' : 'Google Maps Directions'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Map Facade & Hours Table */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Leaflet Map */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-navy flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-signal" />
                  <span>{locale === 'am' ? 'የቀጥታ ካርታ (Leaflet Map)' : 'Live Interactive Map (Leaflet)'}</span>
                </span>
                <span className="text-[11px] text-muted font-mono">
                  {WORKSHOP_INFO.plusCode}
                </span>
              </div>
              <LeafletMap locale={locale} />
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
              <div className="mt-4 pt-3 border-t border-line text-xs text-muted flex items-center justify-between">
                <span>{locale === 'am' ? 'የምሳ ዕረፍት ሰዓት፡' : 'Daily Lunch Break:'}</span>
                <span className="font-semibold text-orange-deep">12:00 PM – 1:00 PM ({locale === 'am' ? 'Closes 12 PM · Reopens 1 PM' : 'Closes 12 PM · Reopens 1 PM'})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
