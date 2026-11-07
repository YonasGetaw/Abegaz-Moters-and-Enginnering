import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Service } from '../../types';
import { 
  Wrench, 
  Zap, 
  Car, 
  BatteryCharging, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  X, 
  Calendar,
  Building2,
  ShieldCheck,
  PhoneCall,
  SlidersHorizontal,
  Compass,
  RotateCcw
} from 'lucide-react';
import { Button } from '../common/Button';
import { WORKSHOP_INFO } from '../../lib/constants';

export const ServicesPage: React.FC = () => {
  const { locale, setCurrentView, setSelectedServiceSlug, services } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDrawerService, setActiveDrawerService] = useState<Service | null>(null);

  // The 4 Official Signboard Pillars of Abegaz Motors Engineering
  const signboardPillars = [
    { 
      id: 'all', 
      number: '0', 
      labelAm: 'ሁሉም አገልግሎቶች', 
      labelEn: 'All Services', 
      descAm: 'ሙሉ የጋራዥና የምህንድስና አገልግሎቶች',
      descEn: 'Full engineering services',
      icon: SlidersHorizontal,
      color: 'navy'
    },
    { 
      id: 'mechanical', 
      number: '1', 
      labelAm: 'ሜካኒካል ስራዎች (Mechanical Work)', 
      labelEn: 'Mechanical Work', 
      descAm: 'የሞተር ሙሉ ጥገና፣ ጊርቦክስ፣ ብሬክና ሱስፔንሽን',
      descEn: 'Engine overhaul, transmission, brakes & suspension',
      icon: Wrench,
      color: 'blue'
    },
    { 
      id: 'electrical', 
      number: '2', 
      labelAm: 'ኤሌክትሪክ ስራዎች (Electrical Work)', 
      labelEn: 'Electrical Work', 
      descAm: 'ኮምፒውተር ዲያግኖስቲክስ፣ አልተርኔተር፣ ሽቦና ኤሲ',
      descEn: 'Computer diagnostics, wiring, alternator & AC',
      icon: Zap,
      color: 'amber'
    },
    { 
      id: 'body', 
      number: '3', 
      labelAm: 'ቦዲና ቀለም (Body Work & Paint)', 
      labelEn: 'Body Work & Paint', 
      descAm: 'የግጭት ጥገና፣ ሻሲ ማስተካከልና ኦሪጅናል ስፕሬይ ቀለም',
      descEn: 'Chassis laser alignment, dent pull & oven baked paint',
      icon: Car,
      color: 'orange'
    },
    { 
      id: 'ev_hybrid', 
      number: '4', 
      labelAm: 'EV እና ሃይብሪድ ጥገና (EV & Hybrid)', 
      labelEn: 'EV & Hybrid Maintenance', 
      descAm: 'የከፍተኛ ቮልቴጅ ባትሪ ፍተሻ፣ ኢንቨርተርና ሞተር',
      descEn: 'High-voltage battery diagnostics, inverter & EV systems',
      icon: BatteryCharging,
      color: 'emerald'
    },
  ];

  // Helper to render pillar icon
  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'mechanical':
      case 'motor':
      case 'brakes':
      case 'maintenance':
        return <Wrench className="w-5 h-5 text-blue-600" />;
      case 'electrical':
      case 'electric':
      case 'diagnostics':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'body':
        return <Car className="w-5 h-5 text-orange-deep" />;
      case 'ev_hybrid':
        return <BatteryCharging className="w-5 h-5 text-emerald-600" />;
      default:
        return <Wrench className="w-5 h-5 text-orange-deep" />;
    }
  };

  const getPillarBadge = (category: string) => {
    switch (category) {
      case 'mechanical':
      case 'motor':
      case 'brakes':
      case 'maintenance':
        return {
          text: locale === 'am' ? '1. ሜካኒካል' : '1. Mechanical',
          bg: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      case 'electrical':
      case 'electric':
      case 'diagnostics':
        return {
          text: locale === 'am' ? '2. ኤሌክትሪክ' : '2. Electrical',
          bg: 'bg-amber-50 text-amber-700 border-amber-200'
        };
      case 'body':
        return {
          text: locale === 'am' ? '3. ቦዲና ቀለም' : '3. Body & Paint',
          bg: 'bg-orange-tint text-orange-deep border-orange-200'
        };
      case 'ev_hybrid':
        return {
          text: locale === 'am' ? '4. EV & Hybrid' : '4. EV & Hybrid',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      default:
        return {
          text: locale === 'am' ? 'ምህንድስና' : 'Engineering',
          bg: 'bg-slate-100 text-slate-700 border-slate-200'
        };
    }
  };

  // Filter services by active pillar
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') return services;

    return services.filter(svc => {
      if (selectedCategory === 'mechanical') {
        return svc.category === 'mechanical' || svc.category === 'motor' || svc.category === 'brakes' || svc.category === 'maintenance';
      }
      if (selectedCategory === 'electrical') {
        return svc.category === 'electrical' || svc.category === 'electric' || svc.category === 'diagnostics';
      }
      if (selectedCategory === 'body') {
        return svc.category === 'body';
      }
      if (selectedCategory === 'ev_hybrid') {
        return svc.category === 'ev_hybrid';
      }
      return svc.category === selectedCategory;
    });
  }, [services, selectedCategory]);

  const openServiceDrawer = (svc: Service) => {
    setActiveDrawerService(svc);
  };

  const handleBookFromService = (slug: string) => {
    setSelectedServiceSlug(slug);
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-mist min-h-screen pb-24">
      {/* 1. HERO SECTION - CLEAN, BOLD & DIRECT (White background, Royal Blue text, Brand Red accents) */}
      <section className="bg-gradient-to-b from-blue-50/70 via-white to-white text-slate-800 relative overflow-hidden pt-12 pb-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">


          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-blue-900 tracking-tight leading-tight max-w-4xl mx-auto">
            {locale === 'am' ? (
              <>የምንሰጣቸው <span className="text-red-600">ዋና ዋና አገልግሎቶች</span></>
            ) : (
              <>Our Core <span className="text-red-600">Automotive Services</span></>
            )}
          </h1>

          <p className="text-slate-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {locale === 'am'
              ? 'በወርክሾፓችን ሳይንቦርድ ላይ የተዘረዘሩት 4ቱ ዋና የምህንድስና ዘርፎች፦ ሜካኒካል፣ ኤሌክትሪክ፣ ቦዲና ቀለም እንዲሁም የ EV/Hybrid ጥገና።'
              : 'The 4 pillars of engineering care from our workshop signboard: Mechanical, Electrical, Body & Paint, and EV & Hybrid maintenance.'}
          </p>
        </div>
      </section>

      {/* 2. THE 4 OFFICIAL SIGNBOARD PILLARS (INTERACTIVE TABS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {signboardPillars.map((pillar) => {
            const IconComp = pillar.icon;
            const isSelected = selectedCategory === pillar.id;

            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedCategory(pillar.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900 shadow-lg ring-2 ring-red-600 scale-[1.02]'
                    : 'bg-white text-blue-900 border-slate-200 hover:border-blue-600 hover:shadow-md'
                } ${pillar.id === 'all' ? 'col-span-2 md:col-span-1' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-50 text-blue-700'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  {pillar.number !== '0' && (
                    <span className={`text-[11px] font-black font-mono px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-blue-800 text-red-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      #{pillar.number}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className={`text-xs sm:text-sm font-extrabold ${isSelected ? 'text-white' : 'text-blue-900'}`}>
                    {locale === 'am' ? pillar.labelAm : pillar.labelEn}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {locale === 'am' ? pillar.descAm : pillar.descEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. SERVICES LISTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        {/* Header indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-navy">
              {selectedCategory === 'all'
                ? (locale === 'am' ? 'ሁሉም አገልግሎቶች' : 'All Engineering Services')
                : signboardPillars.find(p => p.id === selectedCategory)?.[locale === 'am' ? 'labelAm' : 'labelEn']}
            </h2>
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {filteredServices.length}
            </span>
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold text-orange-deep hover:underline inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{locale === 'am' ? 'ሁሉንም አሳይ' : 'Show All'}</span>
            </button>
          )}
        </div>

        {/* Modern, Clean & Not Complicated Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((svc) => {
            const badge = getPillarBadge(svc.category);

            return (
              <div
                key={svc.id}
                className="group bg-white rounded-2xl border border-line p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy via-orange-signal to-navy opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Bar: Pillar Tag + Duration Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badge.bg}`}>
                      {badge.text}
                    </span>

                    <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>~{svc.durationMin} {locale === 'am' ? 'ደቂቃ' : 'min'}</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center shrink-0 mt-0.5">
                      {getServiceIcon(svc.category)}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-navy group-hover:text-orange-deep transition-colors leading-snug">
                        {locale === 'am' ? svc.nameAm : svc.nameEn}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-muted font-medium mt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{svc.durationText || `~${svc.durationMin} min`}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2">
                    {locale === 'am' ? svc.descriptionAm : svc.descriptionEn}
                  </p>

                  {/* Included Steps Checklist */}
                  <div className="p-3.5 rounded-xl bg-mist/60 border border-line/60 space-y-2 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">
                      {locale === 'am' ? 'የሚካተቱ ዋና ዋና ስራዎች፡' : 'Key Included Steps:'}
                    </span>
                    {(locale === 'am' ? svc.includedAm : svc.includedEn).slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
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
                    <span>{locale === 'am' ? 'ቀጠሮ ያዝ' : 'Book'}</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. CORPORATE & COMMERCIAL FLEET CARD */}
        <div className="mt-16 bg-navy text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 bg-blueprint-dark relative overflow-hidden">
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-orange-signal text-xs font-bold border border-slate-700">
              <Building2 className="w-3.5 h-3.5" />
              <span>{locale === 'am' ? 'ለድርጅቶችና ፍሊቶች' : 'Fleet Maintenance'}</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {locale === 'am' 
                ? 'የድርጅትና የንግድ ተሽከርካሪዎች የተሟላ የጋራዥ ጥገና' 
                : 'Commercial Fleet & Company Vehicle Service'}
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {locale === 'am'
                ? 'ለድርጅቶች፣ ታክሲዎችና ተከራይ መኪኖች ወርሃዊ ምርመራ፣ ቅድሚያ የሚሰጠው ክፍት ቤይና የታክስ ደረሰኝ እንሰጣለን።'
                : 'Priority workshop bays, scheduled periodic inspections, and itemized invoicing for commercial accounts.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto relative z-10">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setSelectedServiceSlug('fleet');
                setCurrentView('book');
              }}
            >
              <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Fleet'}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <a
              href={`tel:${WORKSHOP_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-button font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-signal" />
              <span>{WORKSHOP_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. SERVICE DETAIL MODAL/DRAWER */}
      {activeDrawerService && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-navy/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-mist flex items-center justify-center">
                    {getServiceIcon(activeDrawerService.category)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-deep block">
                      {locale === 'am' ? 'የአገልግሎት ዝርዝር' : 'Service Breakdown'}
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
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border mb-2 inline-block ${getPillarBadge(activeDrawerService.category).bg}`}>
                  {getPillarBadge(activeDrawerService.category).text}
                </span>
                <h3 className="text-2xl font-black text-navy leading-snug">
                  {locale === 'am' ? activeDrawerService.nameAm : activeDrawerService.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {locale === 'am' ? activeDrawerService.descriptionAm : activeDrawerService.descriptionEn}
                </p>
              </div>

              {/* Duration & Quality Card */}
              <div className="p-4 bg-mist rounded-xl border border-line flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{locale === 'am' ? `ግምታዊ ጊዜ፡ ${activeDrawerService.durationText || `~${activeDrawerService.durationMin} ደቂቃ`}` : `Estimated: ${activeDrawerService.durationText || `~${activeDrawerService.durationMin} min`}`}</span>
                </div>
                <span className="text-blue-900 font-bold text-xs bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  {locale === 'am' ? 'ኦሪጅናል መለዋወጫ' : 'Genuine OEM Parts'}
                </span>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
