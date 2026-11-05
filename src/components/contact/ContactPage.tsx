import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  Send, 
  Mail, 
  MapPin, 
  Clock, 
  Copy, 
  Navigation, 
  ExternalLink,
  MessageSquare,
  Compass,
  CheckCircle2,
  Calendar,
  Building2,
  UserCheck
} from 'lucide-react';
import { isWorkshopOpenNow } from '../../lib/ethiopianCalendar';
import { WORKSHOP_INFO } from '../../lib/constants';
import { Button } from '../common/Button';
import { LeafletMap } from './LeafletMap';

export const ContactPage: React.FC = () => {
  const { locale, workingHours, showToast, setCurrentView } = useApp();
  const statusInfo = isWorkshopOpenNow();

  // Quick inquiry form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} ተቀድቷል`);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;
    
    // Construct pre-filled Telegram link or simulated message
    const msg = `ሰላም፣ ስሜ ${inquiryName} እባላለሁ። ስልክ፡ ${inquiryPhone}። መልእክት፡ ${inquiryMessage || 'የመኪና ጥገና ጥያቄ'}`;
    const tgUrl = `https://t.me/AbegazMotors?text=${encodeURIComponent(msg)}`;
    
    setInquirySent(true);
    showToast(locale === 'am' ? 'መልእክትዎ ተልኳል! ወደ ቴሌግራም እየተላለፈ ነው...' : 'Inquiry sent! Opening Telegram desk...');
    setTimeout(() => {
      window.open(tgUrl, '_blank');
    }, 800);
  };

  return (
    <div className="bg-mist min-h-screen pb-24">
      {/* 1. HERO HEADER */}
      <section className="bg-navy text-white bg-blueprint-dark relative overflow-hidden pt-12 pb-14 sm:py-16 border-b border-slate-800">
        <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 text-orange-signal text-xs font-bold border border-slate-700 shadow-sm backdrop-blur-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>{locale === 'am' ? 'አበጋዝ ሞተርስ ኢንጂነሪንግ' : 'Abegaz Motors Engineering'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {locale === 'am' ? (
              <>አድራሻና <span className="text-orange-signal">ቀጥታ መገናኛዎች</span></>
            ) : (
              <>Contact & <span className="text-orange-signal">Workshop Directions</span></>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {locale === 'am'
              ? 'በአካል ለመምጣት፣ በስልክ ለመደወል ወይም በቴሌግራም ፈጣን መልእክት ለመላክ የተሟላ የወርክሾፓችን መረጃ።'
              : 'Direct hotlines, instant Telegram desk, live interactive map, and workshop bay hours.'}
          </p>

          {/* Live Open / Closed Banner */}
          <div className="pt-2">
            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-black shadow-md border ${
              statusInfo.isOpen
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 backdrop-blur-sm'
                : 'bg-red-500/20 text-red-300 border-red-500/50 backdrop-blur-sm'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full animate-ping ${statusInfo.isOpen ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <span>{locale === 'am' ? statusInfo.nextStatusAm : statusInfo.nextStatusEn}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4 QUICK ACTION TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Phone Tile */}
          <div className="bg-white p-5 rounded-2xl border border-line shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-orange-tint text-orange-deep flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-muted uppercase">{locale === 'am' ? 'የስልክ ጥሪ' : 'Direct Call'}</p>
                <a href={`tel:${WORKSHOP_INFO.phoneRaw}`} className="text-sm font-extrabold text-navy hover:text-orange-deep font-mono">
                  {WORKSHOP_INFO.phone}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(WORKSHOP_INFO.phone, 'ስልክ')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-mist"
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* Telegram Tile */}
          <div className="bg-white p-5 rounded-2xl border border-line shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#229ED9]/10 text-[#229ED9] flex items-center justify-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-muted uppercase">Telegram Desk</p>
                <a href="https://t.me/AbegazMotors" target="_blank" rel="noreferrer" className="text-sm font-extrabold text-[#0088cc] hover:underline">
                  @AbegazMotors
                </a>
              </div>
            </div>
            <a
              href="https://t.me/AbegazMotors"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-[#229ED9] text-white hover:bg-[#1D8BC0]"
              title="Open"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Email Tile */}
          <div className="bg-white p-5 rounded-2xl border border-line shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-mist text-navy flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-muted uppercase">{locale === 'am' ? 'ኢሜይል' : 'Email'}</p>
                <a href={`mailto:${WORKSHOP_INFO.email}`} className="text-xs sm:text-sm font-extrabold text-navy hover:text-orange-deep truncate block max-w-[130px]">
                  {WORKSHOP_INFO.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(WORKSHOP_INFO.email, 'ኢሜይል')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-navy hover:bg-mist"
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* Location Tile */}
          <div className="bg-white p-5 rounded-2xl border border-line shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-orange-tint text-orange-deep flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-muted uppercase">Addis Ababa</p>
                <p className="text-xs font-extrabold text-navy truncate max-w-[130px]">
                  {WORKSHOP_INFO.plusCode}
                </p>
              </div>
            </div>
            <a
              href={WORKSHOP_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-orange-signal text-navy font-bold hover:bg-[#EA580C]"
              title="Directions"
            >
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. MAIN WORKSHOP SECTION: INTERACTIVE MAP + DETAILS + INQUIRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 Cols): Workshop Identity, Hours & Quick Message */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Workshop Location Card */}
            <div className="bg-white p-6 rounded-2xl border border-line shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-navy text-orange-signal flex items-center justify-center shrink-0 font-black text-base shadow-sm">
                  AM
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-deep block">
                    {locale === 'am' ? 'የወርክሾፕ አድራሻ' : 'Physical Address'}
                  </span>
                  <h3 className="text-lg font-black text-navy leading-snug">
                    {locale === 'am' ? WORKSHOP_INFO.nameAm : WORKSHOP_INFO.nameEn}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {locale === 'am' ? WORKSHOP_INFO.addressAm : WORKSHOP_INFO.addressEn}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-mist/80 border border-line/70 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted font-semibold">{locale === 'am' ? 'አካባቢ፡' : 'Sub-City & Area:'}</span>
                  <span className="font-extrabold text-navy">ነፋስ ስልክ-ላፍቶ · ኬራ አካባቢ</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted font-semibold">Plus Code:</span>
                  <span className="font-mono font-bold text-orange-deep">{WORKSHOP_INFO.plusCode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted font-semibold">{locale === 'am' ? 'ዋና ኃላፊ፡' : 'Manager / Lead:'}</span>
                  <span className="font-extrabold text-navy">አቢይ አበጋዝ (Abiy Abegaz)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => copyToClipboard(`${WORKSHOP_INFO.addressEn} (${WORKSHOP_INFO.plusCode})`, 'አድራሻ')}
                  className="flex-1 py-2 rounded-xl border border-line text-xs font-bold text-navy hover:bg-mist flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{locale === 'am' ? 'አድራሻ ቅዳ' : 'Copy'}</span>
                </button>
                <a
                  href={WORKSHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-orange-signal text-navy text-xs font-black flex items-center justify-center gap-1.5 hover:bg-[#EA580C] transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{locale === 'am' ? 'Google Maps' : 'Google Maps'}</span>
                </a>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-white p-6 rounded-2xl border border-line shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-line">
                <MessageSquare className="w-4 h-4 text-orange-deep" />
                <h4 className="text-sm font-black text-navy">
                  {locale === 'am' ? 'ፈጣን መልእክት ወይም ጥያቄ ይላኩ' : 'Send Quick Inquiry'}
                </h4>
              </div>

              {inquirySent ? (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-800">
                    {locale === 'am' ? 'ጥያቄዎ ተቀብለናል፤ በቅርቡ እናገኝዎታለን!' : 'Inquiry received! We will follow up shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-muted mb-1">
                      {locale === 'am' ? 'የእርስዎ ስም' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Dawit Kebede"
                      className="w-full h-10 px-3 text-xs bg-mist border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-signal"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-muted mb-1">
                      {locale === 'am' ? 'ስልክ ቁጥር' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="09... or +251..."
                      className="w-full h-10 px-3 text-xs bg-mist border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-signal font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-muted mb-1">
                      {locale === 'am' ? 'መልእክት / የመኪናው ብልሽት' : 'Message or Vehicle Problem'}
                    </label>
                    <textarea
                      rows={2}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder={locale === 'am' ? 'አጭር መግለጫ...' : 'Brief problem summary...'}
                      className="w-full p-2.5 text-xs bg-mist border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-signal resize-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="sm" fullWidth className="h-10 text-xs">
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    <span>{locale === 'am' ? 'መልእክት ላክ (በቴሌግራም/ኢሜይል)' : 'Send to Workshop Desk'}</span>
                  </Button>
                </form>
              )}
            </div>

            {/* Direct Booking CTA */}
            <div className="p-5 rounded-2xl bg-navy text-white flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-orange-signal">
                  {locale === 'am' ? 'ለጥገና ዝግጁ ኖት?' : 'Ready for Service?'}
                </p>
                <h5 className="text-sm font-extrabold text-white mt-0.5">
                  {locale === 'am' ? 'ቀጠሮዎን በኦንላይን ይያዙ' : 'Book Workshop Bay Online'}
                </h5>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  setCurrentView('book');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Calendar className="w-3.5 h-3.5 mr-1" />
                <span>{locale === 'am' ? 'ቀጠሮ ያዝ' : 'Book'}</span>
              </Button>
            </div>
          </div>

          {/* Right Column (7 Cols): Live Leaflet Map + Operating Hours */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Interactive Leaflet Map */}
            <div className="bg-white p-4 rounded-2xl border border-line shadow-sm space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-extrabold text-navy flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-signal" />
                  <span>{locale === 'am' ? 'የቀጥታ በይነ-ተግባራዊ ካርታ (Leaflet Map)' : 'Live Interactive Workshop Map'}</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-500 bg-mist px-2 py-0.5 rounded">
                  {WORKSHOP_INFO.plusCode}
                </span>
              </div>
              
              <div className="overflow-hidden rounded-xl border border-line">
                <LeafletMap locale={locale} />
              </div>
            </div>

            {/* Business Hours Table */}
            <div className="bg-white p-6 rounded-2xl border border-line shadow-sm">
              <h4 className="text-sm font-black text-navy mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-signal" />
                <span>{locale === 'am' ? 'ሳምንታዊ የስራ ሰዓታት' : 'Weekly Workshop Hours'}</span>
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

              <div className="mt-4 pt-3 border-t border-line text-xs flex items-center justify-between bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                <span className="font-bold text-amber-900">{locale === 'am' ? 'የምሳ ዕረፍት ሰዓት፡' : 'Daily Lunch Break:'}</span>
                <span className="font-mono font-black text-amber-950">12:00 PM – 1:00 PM (Closes 12 PM · Reopens 1 PM)</span>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
