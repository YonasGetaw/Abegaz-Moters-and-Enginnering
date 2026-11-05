import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Service } from '../../types';
import { 
  Cpu, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  X, 
  Calendar,
  Building2,
  Search,
  ShieldCheck,
  Zap,
  Sparkles,
  Car,
  RotateCcw,
  Award,
  PhoneCall,
  SlidersHorizontal,
  Compass,
  FileCheck2,
  BadgeCheck
} from 'lucide-react';
import { Button } from '../common/Button';
import { WORKSHOP_INFO } from '../../lib/constants';

interface SymptomShortcut {
  id: string;
  labelAm: string;
  labelEn: string;
  targetCategory: string;
  query: string;
  icon: string;
}

const QUICK_SYMPTOMS: SymptomShortcut[] = [
  { id: 'sym-1', labelAm: 'የሞተር ማስጠንቀቂያ መብራት (Check Engine)', labelEn: 'Check Engine Light', targetCategory: 'diagnostics', query: 'engine light', icon: '🚨' },
  { id: 'sym-2', labelAm: 'የብሬክ ጩኸት / መንቀጥቀጥ', labelEn: 'Brake Squeak / Vibration', targetCategory: 'brakes', query: 'brake', icon: '🛑' },
  { id: 'sym-3', labelAm: 'ኤሲ አያቀዘቅዝም', labelEn: 'AC Blowing Warm Air', targetCategory: 'electric', query: 'ac', icon: '❄️' },
  { id: 'sym-4', labelAm: 'ዘይትና ፊልተር ቅየራ', labelEn: 'Oil & Filter Service', targetCategory: 'maintenance', query: 'oil', icon: '🛢️' },
  { id: 'sym-5', labelAm: 'ባትሪ / ለመነሳት መቸገር', labelEn: 'Battery / Starting Trouble', targetCategory: 'electric', query: 'battery', icon: '⚡' },
  { id: 'sym-6', labelAm: 'መኪና ከመግዛት በፊት ፍተሻ', labelEn: 'Pre-Purchase Inspection', targetCategory: 'diagnostics', query: 'purchase', icon: '🔍' },
];

export const ServicesPage: React.FC = () => {
  const { locale, setCurrentView, setSelectedServiceSlug, services } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDrawerService, setActiveDrawerService] = useState<Service | null>(null);

  const categories = [
    { id: 'all', labelAm: 'ሁሉም አገልግሎቶች', labelEn: 'All Services', icon: SlidersHorizontal },
    { id: 'diagnostics', labelAm: 'ምርመራ (Diagnostics)', labelEn: 'Diagnostics', icon: Cpu },
    { id: 'motor', labelAm: 'ሞተር (Engine)', labelEn: 'Engine & Mechanical', icon: Wrench },
    { id: 'brakes', labelAm: 'ብሬክና ሱስፔንሽን', labelEn: 'Brakes & Suspension', icon: ShieldCheck },
    { id: 'electric', labelAm: 'ኤሌክትሪክና AC', labelEn: 'Electrical & AC', icon: Zap },
    { id: 'maintenance', labelAm: 'መደበኛ ሰርቪስ', labelEn: 'Periodic Service', icon: RotateCcw },
    { id: 'body', labelAm: 'ቦዲና ቀለም', labelEn: 'Body & Paint', icon: Car },
  ];

  // Helper to render relevant category icon
  const getServiceIcon = (svc: Service) => {
    switch (svc.category) {
      case 'diagnostics':
        return <Cpu className="w-5 h-5" />;
      case 'motor':
        return <Wrench className="w-5 h-5" />;
      case 'brakes':
        return <ShieldCheck className="w-5 h-5" />;
      case 'electric':
        return svc.slug.includes('air-conditioning') ? <Sparkles className="w-5 h-5" /> : <Zap className="w-5 h-5" />;
      case 'maintenance':
        return <RotateCcw className="w-5 h-5" />;
      case 'body':
        return <Car className="w-5 h-5" />;
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  // Filter services by category and search query
  const filteredServices = useMemo(() => {
    return services.filter(svc => {
      const matchCat = selectedCategory === 'all' || svc.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchNameAm = svc.nameAm.toLowerCase().includes(q);
      const matchNameEn = svc.nameEn.toLowerCase().includes(q);
      const matchDescAm = svc.descriptionAm.toLowerCase().includes(q);
      const matchDescEn = svc.descriptionEn.toLowerCase().includes(q);
      const matchSignsAm = svc.warningSignsAm.some(s => s.toLowerCase().includes(q));
      const matchSignsEn = svc.warningSignsEn.some(s => s.toLowerCase().includes(q));

      return matchNameAm || matchNameEn || matchDescAm || matchDescEn || matchSignsAm || matchSignsEn;
    });
  }, [services, selectedCategory, searchQuery]);

  const openServiceDrawer = (svc: Service) => {
    setActiveDrawerService(svc);
  };

  const handleBookFromService = (slug: string) => {
    setSelectedServiceSlug(slug);
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSymptomClick = (symptom: SymptomShortcut) => {
    setSelectedCategory(symptom.targetCategory);
    setSearchQuery(symptom.query);
    // Smooth scroll to results
    const resultsElement = document.getElementById('services-grid-section');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-mist min-h-screen pb-24">
      {/* 1. HERO & SMART SYMPTOM SEARCH SECTION */}
      <section className="bg-navy text-white bg-blueprint-dark relative overflow-hidden pt-12 pb-16 sm:py-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 text-orange-signal text-xs font-bold border border-slate-700 shadow-sm backdrop-blur-sm">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{locale === 'am' ? 'ትክክለኛ የምህንድስና ደረጃዎች' : 'Precision Engineering Standards'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {locale === 'am' ? (
                <>የመኪናዎ አስተማማኝ <span className="text-orange-signal">የጥገና ማዕከል</span></>
              ) : (
                <>Expert Automotive <span className="text-orange-signal">Repairs & Care</span></>
              )}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {locale === 'am'
                ? 'በዘመናዊ OEM ኮምፒውተር ዲያግኖስቲክስ፣ በሰለጠኑ ማስተር መካኒኮች እና በግልጽ ዋጋ የሚሰጡ የተሟላ የመኪና ጥገናዎች።'
                : 'Computerized diagnostics, factory-certified master technicians, and transparent pricing at Nefas Silk-Lafto, Addis Ababa.'}
            </p>

            {/* Smart Search Input */}
            <div className="pt-3 max-w-xl mx-auto">
              <div className="relative flex items-center shadow-lg rounded-2xl bg-white text-navy overflow-hidden border-2 border-white/20 focus-within:border-orange-signal transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    locale === 'am'
                      ? 'መኪናዎ ምን እያደረገ ነው? (ለምሳሌ፡ ብሬክ፣ ቼክ ኢንጅን፣ ኤሲ፣ ዘይት...)'
                      : 'Search by symptom or service (e.g. check engine, brakes, AC, oil change)...'
                  }
                  className="w-full px-3 py-3.5 text-sm sm:text-base text-navy placeholder:text-slate-400 focus:outline-none bg-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 text-slate-400 hover:text-navy mr-2"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Symptom Chips ("መኪናዎ ላይ የሚታየው ችግር ምንድነው?") */}
            <div className="pt-4 text-left">
              <p className="text-xs font-semibold text-slate-300 text-center mb-2.5">
                {locale === 'am' ? '💡 ፈጣን ፍተሻ፦ መኪናዎ ላይ የሚታየውን ምልክት ይምረጡ፡' : '💡 Common symptoms — Click to diagnose quickly:'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
                {QUICK_SYMPTOMS.map((sym) => (
                  <button
                    key={sym.id}
                    onClick={() => handleSymptomClick(sym)}
                    className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800/80 hover:bg-orange-signal hover:text-navy text-slate-200 border border-slate-700/80 transition-all hover:scale-105 active:scale-95 shadow-xs"
                  >
                    <span>{sym.icon}</span>
                    <span>{locale === 'am' ? sym.labelAm : sym.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4-PILLAR ENGINEERING PROMISE BAR */}
      <section className="bg-white border-b border-line shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-tint text-orange-deep flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-navy">
                  {locale === 'am' ? 'የተረጋገጡ መካኒኮች' : 'Certified Mechanics'}
                </h4>
                <p className="text-[11px] text-muted hidden sm:block">
                  {locale === 'am' ? 'ከ 15+ ዓመታት ልምድ' : '15+ Years Experience'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-navy">
                  {locale === 'am' ? 'ኦሪጅናል OEM ስካነሮች' : 'Factory Diagnostic Scanners'}
                </h4>
                <p className="text-[11px] text-muted hidden sm:block">
                  {locale === 'am' ? 'ትክክለኛ ኮምፒውተር ንባብ' : 'Precision ECU code readout'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-navy">
                  {locale === 'am' ? 'ግልጽ የቅድመ-ዋጋ ግምት' : 'Upfront Transparent Estimates'}
                </h4>
                <p className="text-[11px] text-muted hidden sm:block">
                  {locale === 'am' ? 'ያለ ድብቅ ክፍያ' : 'No surprise charges'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-navy">
                  {locale === 'am' ? 'የተረጋገጠ የጊዜ ሰሌዳ' : 'Guaranteed Bay Turnaround'}
                </h4>
                <p className="text-[11px] text-muted hidden sm:block">
                  {locale === 'am' ? 'ፈጣን ርክክብ' : 'Scheduled intake slots'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN SERVICES DIRECTORY SECTION */}
      <section id="services-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Category Filter Chips Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full lg:w-auto no-scrollbar">
            {categories.map((c) => {
              const IconComp = c.icon;
              const isSelected = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-md ring-2 ring-orange-signal/30'
                      : 'bg-white text-slate-700 border-line hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-orange-signal' : 'text-slate-400'}`} />
                  <span>{locale === 'am' ? c.labelAm : c.labelEn}</span>
                </button>
              );
            })}
          </div>

          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-orange-deep hover:underline inline-flex items-center gap-1 shrink-0 ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{locale === 'am' ? 'ሁሉንም አሳይ (Reset)' : 'Reset Filters'}</span>
            </button>
          )}
        </div>

        {/* Results Count Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {locale === 'am' 
              ? `${filteredServices.length} አገልግሎቶች ተገኝተዋል` 
              : `Showing ${filteredServices.length} engineering services`}
          </p>

          <span className="text-xs text-muted hidden sm:inline">
            📍 {locale === 'am' ? 'ወርክሾፕ፡ ነፋስ ስልክ-ላፍቶ፣ አዲስ አበባ' : 'Bay: Nefas Silk-Lafto, Addis Ababa'}
          </span>
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="bg-white rounded-2xl border border-line p-12 text-center max-w-lg mx-auto shadow-xs space-y-4 my-8">
            <div className="w-16 h-16 rounded-full bg-orange-tint text-orange-deep flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-navy">
              {locale === 'am' ? 'የተፈለገው አገልግሎት አልተገኘም' : 'No matching services found'}
            </h3>
            <p className="text-xs sm:text-sm text-muted">
              {locale === 'am'
                ? `"${searchQuery}" ጋር የሚዛመድ አገልግሎት የለም። እባክዎ ሌላ ቃል ይፈልጉ ወይም በቀጥታ ደውለው ያማክሩን።`
                : `No services match "${searchQuery}". Try a different keyword or call us directly.`}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button size="sm" variant="secondary" onClick={handleResetFilters}>
                {locale === 'am' ? 'ሁሉንም አገልግሎቶች አሳይ' : 'Clear Search'}
              </Button>
              <a
                href={`tel:${WORKSHOP_INFO.phoneRaw}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-orange-signal" />
                <span>{WORKSHOP_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}

        {/* 4. REDESIGNED MODERN SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="group bg-white rounded-2xl border border-line p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy via-orange-signal to-navy opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header: Icon + Duration Badge + Starting Price */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-tint text-orange-deep flex items-center justify-center shrink-0 group-hover:bg-orange-signal group-hover:text-navy transition-colors">
                    {getServiceIcon(svc)}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {svc.priceStarting ? (
                      <span className="text-xs font-black font-mono px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {locale === 'am' ? `ከ ${svc.priceStarting.toLocaleString()} ብር` : `From ${svc.priceStarting.toLocaleString()} ETB`}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-muted bg-mist px-2 py-0.5 rounded">
                        {locale === 'am' ? 'እንደ ምርመራው' : 'Quote Based'}
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 text-[11px] text-muted font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{svc.durationText || `~${svc.durationMin} min`}</span>
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-black text-navy group-hover:text-orange-deep transition-colors mb-2">
                  {locale === 'am' ? svc.nameAm : svc.nameEn}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2">
                  {locale === 'am' ? svc.descriptionAm : svc.descriptionEn}
                </p>

                {/* What's Included Preview (3 items) */}
                <div className="p-3.5 rounded-xl bg-mist/70 border border-line/60 space-y-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                    {locale === 'am' ? 'የአገልግሎቱ ይዘት፡' : 'Key Included Steps:'}
                  </span>
                  {(locale === 'am' ? svc.includedAm : svc.includedEn).slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-line flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => openServiceDrawer(svc)}
                  className="text-xs font-bold text-navy hover:text-orange-deep hover:underline transition-colors py-1"
                >
                  {locale === 'am' ? 'ዝርዝር እይ ›' : 'View Details ›'}
                </button>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleBookFromService(svc.slug)}
                  className="shadow-sm hover:shadow"
                >
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  <span>{locale === 'am' ? 'ቀጠሮ ያዝ' : 'Book Bay'}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 5. DEDICATED CORPORATE FLEET CARD */}
        <div className="mt-16 sm:mt-20 bg-navy text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 bg-blueprint-dark relative overflow-hidden">
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-orange-signal text-xs font-bold border border-slate-700">
              <Building2 className="w-3.5 h-3.5" />
              <span>{locale === 'am' ? 'ለድርጅቶችና የንግድ ፍሊቶች' : 'Commercial & Fleet Maintenance'}</span>
            </div>
            
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {locale === 'am' 
                ? 'የድርጅት መኪኖችና የከባድ ትራንስፖርት ወርሃዊ ጥገና' 
                : 'Corporate Fleet Contracts & Heavy Commercial Care'}
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {locale === 'am'
                ? 'ለድርጅቶች፣ ኤምባሲዎችና ለንግድ ተሽከርካሪዎች የተመደበ ቅድሚያ ቤይ (Priority Bay)፣ የተሟላ የታክስ ደረሰኝ እና የዲጂታል ሪፖርት እንሰጣለን።'
                : 'Dedicated priority workshop bays, itemized tax invoices, monthly preventive inspections, and fleet emergency priority support.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-orange-signal" />
                {locale === 'am' ? 'ወርሃዊ ፍተሻ' : 'Monthly Preventive Audits'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-orange-signal" />
                {locale === 'am' ? 'ቅድሚያ የሚሰጠው ቤይ' : 'Priority Lane'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-orange-signal" />
                {locale === 'am' ? 'ኦፊሴላዊ ደረሰኝ' : 'Official Invoicing'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto relative z-10">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setSelectedServiceSlug('fleet');
                setCurrentView('book');
              }}
              className="w-full sm:w-auto"
            >
              <span>{locale === 'am' ? 'የፍሊት ቀጠሮ ይያዙ' : 'Book Corporate Fleet'}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <a
              href={`tel:${WORKSHOP_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-button font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors w-full sm:w-auto"
            >
              <PhoneCall className="w-4 h-4 text-orange-signal" />
              <span>{locale === 'am' ? 'በስልክ ያማክሩን' : 'Call Workshop'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. MODERN SERVICE DETAIL SLIDE-OVER DRAWER */}
      {activeDrawerService && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-navy/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-orange-tint text-orange-deep flex items-center justify-center">
                    {getServiceIcon(activeDrawerService)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-deep block">
                      {locale === 'am' ? 'የአገልግሎት ዝርዝር' : 'Service Breakdown'}
                    </span>
                    <span className="text-xs text-muted">
                      Abegaz Motors Workshop
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveDrawerService(null)}
                  className="p-2 rounded-full hover:bg-mist text-muted hover:text-navy transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-2xl font-black text-navy leading-snug">
                  {locale === 'am' ? activeDrawerService.nameAm : activeDrawerService.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {locale === 'am' ? activeDrawerService.descriptionAm : activeDrawerService.descriptionEn}
                </p>
              </div>

              {/* Pricing & Duration Card */}
              <div className="p-4 bg-mist rounded-xl border border-line flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{locale === 'am' ? `ግምታዊ ጊዜ፡ ${activeDrawerService.durationText || `~${activeDrawerService.durationMin} ደቂቃ`}` : `Estimated: ${activeDrawerService.durationText || `~${activeDrawerService.durationMin} min`}`}</span>
                </div>
                {activeDrawerService.priceStarting && (
                  <span className="text-emerald-700 font-mono font-black text-sm">
                    {locale === 'am' ? `ከ ${activeDrawerService.priceStarting.toLocaleString()} ብር` : `From ${activeDrawerService.priceStarting.toLocaleString()} ETB`}
                  </span>
                )}
              </div>

              {/* What is Included */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{locale === 'am' ? 'የሚካተቱ የምህንድስና ሂደቶች፡' : 'What is Included in this Service:'}</span>
                </h4>
                <div className="p-4 bg-white rounded-xl border border-line space-y-2.5">
                  {(locale === 'am' ? activeDrawerService.includedAm : activeDrawerService.includedEn).map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Signs */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>{locale === 'am' ? 'ይህ ጥገና የሚያስፈልግበት ምልክቶች፡' : 'Warning Signs (When you need this):'}</span>
                </h4>
                <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-2">
                  {(locale === 'am' ? activeDrawerService.warningSignsAm : activeDrawerService.warningSignsEn).map((sign, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-amber-950">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-line space-y-2">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  handleBookFromService(activeDrawerService.slug);
                  setActiveDrawerService(null);
                }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                <span>{locale === 'am' ? 'ይህን አገልግሎት አሁን ቀጠሮ ያዝ' : 'Book This Service Now'}</span>
              </Button>

              <p className="text-[11px] text-center text-muted">
                {locale === 'am' ? 'ቀጠሮ መያዝ ክፍያ አይጠይቅም · ክፍያ በቦታው ይፈጸማል' : 'Free booking reservation · Pay at the workshop'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
