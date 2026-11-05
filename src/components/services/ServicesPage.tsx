import React, { useState } from 'react';
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
  Building2
} from 'lucide-react';
import { Button } from '../common/Button';

export const ServicesPage: React.FC = () => {
  const { locale, setCurrentView, setSelectedServiceSlug, services } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDrawerService, setActiveDrawerService] = useState<Service | null>(null);

  const categories = [
    { id: 'all', labelAm: 'ሁሉም', labelEn: 'All' },
    { id: 'motor', labelAm: 'ሞተር (Engine)', labelEn: 'Engine' },
    { id: 'electric', labelAm: 'ኤሌክትሪክና AC', labelEn: 'Electrical & AC' },
    { id: 'brakes', labelAm: 'ብሬክና ሱስፔንሽን', labelEn: 'Brakes & Suspension' },
    { id: 'diagnostics', labelAm: 'ምርመራ (Diagnostics)', labelEn: 'Diagnostics' },
    { id: 'maintenance', labelAm: 'መደበኛ ጥገና', labelEn: 'Periodic Service' },
    { id: 'body', labelAm: 'ቦዲና ቀለም', labelEn: 'Body & Paint' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const openServiceDrawer = (svc: Service) => {
    setActiveDrawerService(svc);
  };

  const handleBookFromService = (slug: string) => {
    setSelectedServiceSlug(slug);
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 md:py-20 bg-mist min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-tint text-orange-deep text-xs font-bold mb-3">
            <span>{locale === 'am' ? 'የቴክኒክ ብቃት' : 'Engineering Capabilities'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
            {locale === 'am' ? 'የምንሰጣቸው አገልግሎቶች' : 'Automotive Services & Repairs'}
          </h1>
          <p className="text-muted text-sm sm:text-base mt-3">
            {locale === 'am'
              ? 'በዘመናዊ የዲያግኖስቲክስ መሣሪያዎችና በትክክለኛ ምህንድስና የሚሰጡ አስተማማኝ አገልግሎቶች።'
              : 'Reliable engineering care executed with high-precision equipment and certified technicians.'}
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === c.id
                  ? 'bg-orange-signal text-navy border-orange-signal shadow-sm'
                  : 'bg-white text-slate-700 border-line hover:bg-slate-200'
              }`}
            >
              {locale === 'am' ? c.labelAm : c.labelEn}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-card p-6 border border-line shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-tint flex items-center justify-center text-orange-deep">
                    <Wrench className="w-6 h-6" />
                  </div>
                  {svc.priceStarting && (
                    <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-mist text-slate-700">
                      💰 {locale === 'am' ? `ከ ${svc.priceStarting} ETB` : `From ${svc.priceStarting} ETB`}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-navy mb-2">
                  {locale === 'am' ? svc.nameAm : svc.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                  {locale === 'am' ? svc.descriptionAm : svc.descriptionEn}
                </p>

                <div className="space-y-1.5 mb-6">
                  {(locale === 'am' ? svc.includedAm : svc.includedEn).slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-line flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => openServiceDrawer(svc)}
                  className="text-xs font-bold text-orange-deep hover:underline"
                >
                  {locale === 'am' ? 'ዝርዝር መግለጫ ›' : 'View Details ›'}
                </button>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleBookFromService(svc.slug)}
                >
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  <span>{locale === 'am' ? 'ቀጠሮ ያዝ' : 'Book'}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Fleet Card (PRD 9.6) */}
        <div className="mt-16 bg-navy text-white rounded-banner p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 bg-blueprint-dark">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-orange-signal text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>{locale === 'am' ? 'ለድርጅቶችና ፍሊት' : 'Corporate Fleets'}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              {locale === 'am' ? 'የትራንስፖርትና የድርጅት መኪኖች ጥገና' : 'Dedicated Fleet Maintenance Contracts'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {locale === 'am'
                ? 'ለድርጅቶች፣ ታክሲዎችና ተከራይ መኪኖች ወርሃዊ የፍሊት ምርመራ፣ ቅድሚያ የሚሰጠው ክፍት ቦታና ዝርዝር ሪፖርት እንሰጣለን።'
                : 'Reliable preventive maintenance with itemized invoicing, priority bays and monthly telemetry reports.'}
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              setSelectedServiceSlug('fleet');
              setCurrentView('book');
            }}
            className="shrink-0"
          >
            <span>{locale === 'am' ? 'ለድርጅት ቀጠሮ ይያዙ' : 'Book Corporate Fleet'}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Side Drawer for Service Detail (PRD 9.4) */}
      {activeDrawerService && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-navy/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-deep">
                  {locale === 'am' ? 'የአገልግሎት ዝርዝር' : 'Service Details'}
                </span>
                <button
                  onClick={() => setActiveDrawerService(null)}
                  className="p-1.5 rounded-full hover:bg-mist text-muted hover:text-navy"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-navy">
                  {locale === 'am' ? activeDrawerService.nameAm : activeDrawerService.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                  {locale === 'am' ? activeDrawerService.descriptionAm : activeDrawerService.descriptionEn}
                </p>
              </div>

              {/* What is Included */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
                  {locale === 'am' ? 'ምን ያካትታል?' : 'What is Included:'}
                </h4>
                <div className="p-4 bg-mist rounded-card border border-line space-y-2">
                  {(locale === 'am' ? activeDrawerService.includedAm : activeDrawerService.includedEn).map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Signs */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
                  {locale === 'am' ? 'ይህ አገልግሎት መቼ ያስፈልጋል?' : 'When is this needed? (Warning Signs):'}
                </h4>
                <div className="p-4 bg-amber-50 rounded-card border border-amber-200 space-y-2">
                  {(locale === 'am' ? activeDrawerService.warningSignsAm : activeDrawerService.warningSignsEn).map((sign, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-mist rounded-card border border-line flex items-center justify-between text-xs font-bold">
                <span className="text-muted">⏱ {locale === 'am' ? `ግምታዊ ጊዜ፡ ~${activeDrawerService.durationMin} ደቂቃ` : `Estimated duration: ~${activeDrawerService.durationMin} min`}</span>
                {activeDrawerService.priceStarting && (
                  <span className="text-orange-deep font-mono">💰 {locale === 'am' ? `ከ ${activeDrawerService.priceStarting} ETB` : `From ${activeDrawerService.priceStarting} ETB`}</span>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-line">
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
                <span>{locale === 'am' ? 'ይህን አገልግሎት ቀጠሮ ያዝ' : 'Book This Service Now'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
