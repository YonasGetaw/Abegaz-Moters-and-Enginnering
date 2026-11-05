import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  Clock, 
  Award, 
  Users, 
  Sparkles, 
  Send, 
  Phone,
  ChevronRight,
  Star
} from 'lucide-react';
import { Button } from '../common/Button';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { INITIAL_TESTIMONIALS } from '../../lib/constants';

export const HomePage: React.FC = () => {
  const { locale, setCurrentView, setSelectedServiceSlug, services, packages } = useApp();

  // Quick Booking Form State on Hero
  const [quickService, setQuickService] = useState('computer-diagnostics');
  const [quickDate, setQuickDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedServiceSlug(quickService);
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredServices = services.filter(s => s.featured).slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 7.1 HERO SECTION - Precision Garage Master Theme */}
      <section className="relative bg-navy text-white bg-blueprint-dark overflow-hidden py-14 md:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-orange-signal text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-orange-signal animate-pulse" />
                <span>{locale === 'am' ? 'ትክክለኛ ምህንድስና · ንጹህ ወርክሾፕ' : 'Precision Automotive Engineering · Clean Bay'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                {locale === 'am' ? (
                  <>
                    መኪናዎ በባለሙያ እጅ — <br className="hidden sm:inline" />
                    <span className="text-orange-signal">
                      በትክክለኛ ምህንድስና።
                    </span>
                  </>
                ) : (
                  <>
                    Expert car care, <br />
                    <span className="text-orange-signal">
                      engineered for peace of mind.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {locale === 'am' 
                  ? 'ቀጠሮዎን በኦንላይን በ 2 ደቂቃ ይያዙ። ጥያቄዎ እንደጸደቀ በኢሜይል ወይም በቴሌግራም ፈጣን ማረጋገጫ ይደርስዎታል።'
                  : 'Book your workshop service online in 2 minutes. Receive real-time approval notifications via Telegram and Email.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => setCurrentView('book')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
                </Button>

                <Button
                  size="lg"
                  variant="outline-white"
                  onClick={() => setCurrentView('services')}
                >
                  <span>{locale === 'am' ? 'አገልግሎቶችን ይመልከቱ' : 'Explore Services'}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* 3 Trust Chips */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-orange-signal" />
                  <span>{locale === 'am' ? 'ልምድ ያላቸው መሃንዲሶች' : 'Certified Engineers'}</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-orange-signal" />
                  <span>{locale === 'am' ? 'ግልጽ ሂደትና ዋጋ' : 'Transparent Pricing'}</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-orange-signal" />
                  <span>{locale === 'am' ? 'ፈጣን ማሳወቂያ' : 'Instant Updates'}</span>
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual & Quick Booking Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-banner overflow-hidden shadow-2xl border-2 border-slate-700 bg-white p-2 sm:p-3">
                <img
                  src="/hero-banner.png"
                  alt="አበጋዝ ሞተርስ ኢንጂነሪንግ - Abegaz Motors Engineering Official Signboard"
                  className="w-full h-auto object-contain rounded-xl"
                />
                
                <div className="mt-2.5 bg-navy/95 p-3 rounded-lg border border-slate-700 text-white flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <p className="text-xs font-bold text-slate-200">
                      {locale === 'am' ? 'ኦፊሴላዊ የምህንድስና ወርክሾፕ' : 'Official Engineering Bay'}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-orange-signal bg-slate-800 px-2 py-0.5 rounded">
                    Advanced Care. Absolute Trust.
                  </span>
                </div>
              </div>

              {/* Floating Quick Booking Widget (PC / Tablet) */}
              <div className="hidden sm:block absolute -bottom-10 -left-6 right-6 bg-white text-navy p-5 rounded-card shadow-lg border border-line z-20">
                <form onSubmit={handleQuickBook} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="block text-xs font-bold text-muted mb-1">
                      {locale === 'am' ? 'አገልግሎት ይምረጡ' : 'Select Service'}
                    </label>
                    <select
                      value={quickService}
                      onChange={(e) => setQuickService(e.target.value)}
                      className="w-full h-11 px-3 text-xs font-semibold bg-mist border border-line rounded-input focus:ring-2 focus:ring-orange-signal focus:outline-none"
                    >
                      {services.map(s => (
                        <option key={s.slug} value={s.slug}>
                          {locale === 'am' ? s.nameAm : s.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted mb-1">
                      {locale === 'am' ? 'የቀጠሮ ቀን' : 'Preferred Date'}
                    </label>
                    <input
                      type="date"
                      value={quickDate}
                      onChange={(e) => setQuickDate(e.target.value)}
                      className="w-full h-11 px-3 text-xs font-semibold bg-mist border border-line rounded-input focus:ring-2 focus:ring-orange-signal focus:outline-none"
                    />
                  </div>

                  <div>
                    <Button type="submit" variant="primary" size="md" fullWidth className="h-11 text-xs">
                      {locale === 'am' ? 'ክፍት ሰዓት ፈልግ ›' : 'Find Slot ›'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.2 TRUST STRIP (NUMBERS) */}
      <section className="bg-white border-b border-line py-8 sm:py-12 mt-0 sm:mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-mist rounded-card border border-line hover:border-orange-signal transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-navy font-mono">12+</div>
              <p className="text-xs sm:text-sm text-muted font-medium mt-1">
                {locale === 'am' ? 'ዓመት የምህንድስና ልምድ' : 'Years Experience'}
              </p>
            </div>
            <div className="p-4 bg-mist rounded-card border border-line hover:border-orange-signal transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-navy font-mono">6,500+</div>
              <p className="text-xs sm:text-sm text-muted font-medium mt-1">
                {locale === 'am' ? 'የተጠገኑ ተሽከርካሪዎች' : 'Repaired Vehicles'}
              </p>
            </div>
            <div className="p-4 bg-mist rounded-card border border-line hover:border-orange-signal transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-navy font-mono">15+</div>
              <p className="text-xs sm:text-sm text-muted font-medium mt-1">
                {locale === 'am' ? 'ባለሙያ መሃንዲሶች' : 'Certified Engineers'}
              </p>
            </div>
            <div className="p-4 bg-mist rounded-card border border-line hover:border-orange-signal transition-colors">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-mono">99.4%</div>
              <p className="text-xs sm:text-sm text-muted font-medium mt-1">
                {locale === 'am' ? 'ደስተኛ ደንበኞች' : 'Client Satisfaction'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7.3 FEATURED SERVICES */}
      <section className="py-16 md:py-24 bg-mist bg-blueprint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-tint text-orange-deep border border-orange-200 text-xs font-bold mb-3">
              <Wrench className="w-3.5 h-3.5" />
              <span>{locale === 'am' ? 'የምንሰጣቸው አገልግሎቶች' : 'Our Capabilities'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
              {locale === 'am' ? 'ትክክለኛ የምህንድስና አገልግሎቶች' : 'Precision Engineering Services'}
            </h2>
            <p className="text-muted text-sm sm:text-base mt-3">
              {locale === 'am'
                ? 'ከኮምፒውተር ዲያግኖስቲክስ እስከ ሙሉ የሞተር ማደስ ድረስ በዘመናዊ መሣሪያዎች እንሰራለን።'
                : 'From computer diagnostics to complete engine rebuilds with cutting-edge garage equipment.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((svc) => (
              <div
                key={svc.id}
                className="bg-white rounded-card p-6 border border-line shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-orange-tint flex items-center justify-center text-orange-deep mb-4">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">
                    {locale === 'am' ? svc.nameAm : svc.nameEn}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {locale === 'am' ? svc.descriptionAm : svc.descriptionEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
                  <span className="text-muted flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>~{svc.durationMin} {locale === 'am' ? 'ደቂቃ' : 'min'}</span>
                  </span>

                  <button
                    onClick={() => {
                      setSelectedServiceSlug(svc.slug);
                      setCurrentView('services');
                    }}
                    className="text-orange-deep font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>{locale === 'am' ? 'ዝርዝር' : 'Details'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="md"
              onClick={() => setCurrentView('services')}
            >
              <span>{locale === 'am' ? 'ሁሉንም አገልግሎቶች ይመልከቱ' : 'View All Services'}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* 7.4 WHY CHOOSE US (ለምን እኛ?) */}
      <section className="py-16 md:py-24 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 rounded-banner overflow-hidden shadow-lg border border-line">
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80"
                alt="Engineers at work"
                className="w-full h-80 sm:h-[420px] object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-navy text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-signal" />
                <span>{locale === 'am' ? 'ለምን አበጋዝ ሞተርስ?' : 'Why Choose Us?'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
                {locale === 'am' ? 'የምህንድስና ጥራትና ግልጽነት' : 'Engineering Integrity & Precision'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-btn bg-mist flex items-center justify-center text-orange-deep font-bold border border-line">
                    01
                  </div>
                  <h4 className="font-bold text-navy">
                    {locale === 'am' ? 'ልምድ ያላቸው መሃንዲሶች' : 'Certified Engineers'}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {locale === 'am' 
                      ? 'በዩኒቨርሲቲና በአምራቾች የሰለጠኑ ከፍተኛ የሞተርና ኤሌክትሪክ መሃንዲሶች።'
                      : 'Manufacturer-trained technicians with deep expertise in modern automotive systems.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-btn bg-mist flex items-center justify-center text-orange-deep font-bold border border-line">
                    02
                  </div>
                  <h4 className="font-bold text-navy">
                    {locale === 'am' ? 'ዘመናዊ የምርመራ መሣሪያዎች' : 'High-Tech Diagnostics'}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {locale === 'am' 
                      ? 'ግምታዊ ጥገናን በማስቀረት ትክክለኛውን ችግር የሚያወጡ የኮምፒውተር ስካነሮች።'
                      : 'Eliminate guesswork with OEM-grade diagnostic scanners and live telemetry.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-btn bg-mist flex items-center justify-center text-orange-deep font-bold border border-line">
                    03
                  </div>
                  <h4 className="font-bold text-navy">
                    {locale === 'am' ? 'ግልጽ ሂደትና ዋጋ' : 'Transparent Pricing'}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {locale === 'am' 
                      ? 'ምንም የተደበቀ ወጪ የለም። ስራ ከመጀመሩ በፊት የዋጋ ግምት ያገኛሉ።'
                      : 'Itemized cost estimates provided before any wrench is turned.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-btn bg-mist flex items-center justify-center text-orange-deep font-bold border border-line">
                    04
                  </div>
                  <h4 className="font-bold text-navy">
                    {locale === 'am' ? 'ቀላል የኦንላይን ቀጠሮ' : 'Seamless Online Booking'}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {locale === 'am' 
                      ? 'ወረፋ መጠበቅ ሳያስፈልግ በስልክዎ በ 2 ደቂቃ ቀጠሮ መያዝ።'
                      : 'Skip waiting lines by securing verified appointment slots from any phone.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5 HOW BOOKING WORKS (ቀጠሮ እንዴት ይሰራል?) */}
      <section className="py-16 md:py-20 bg-navy text-white bg-blueprint-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-orange-signal text-xs font-bold uppercase tracking-wider">
              {locale === 'am' ? 'ቀላል 4 ደረጃዎች' : 'Simple 4-Step Process'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              {locale === 'am' ? 'ቀጠሮ እንዴት ይሰራል?' : 'How Appointment Booking Works'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                titleAm: 'አገልግሎት ይምረጡ',
                titleEn: 'Pick Service',
                descAm: 'የሚፈልጉትን አገልግሎት ወይም ጥቅል ከዝርዝሩ ይምረጡ።',
                descEn: 'Select your needed repair or comprehensive service package.'
              },
              {
                step: '02',
                titleAm: 'ቀንና ሰዓት ይምረጡ',
                titleEn: 'Choose Date & Slot',
                descAm: 'የሚመችዎትን ክፍት ሰዓት ከካላንደሩ በቀላሉ ይምረጡ።',
                descEn: 'Pick a convenient open slot from our live calendar.'
              },
              {
                step: '03',
                titleAm: 'ባለሙያችን ያጸድቃል',
                titleEn: 'Engineer Reviews',
                descAm: 'መሐንዲሳችን የወርክሾፑን አቅም አይቶ ያጸድቃል።',
                descEn: 'Our head engineer reviews the request and allocates a bay.'
              },
              {
                step: '04',
                titleAm: 'ማረጋገጫ ይደርስዎታል',
                titleEn: 'Instant Notification',
                descAm: 'በኢሜይል ወይም በቴሌግራም ወዲያውኑ ማረጋገጫ ይደርስዎታል።',
                descEn: 'Receive real-time confirmation via Telegram and Email.'
              }
            ].map((s, idx) => (
              <div key={idx} className="bg-slate-800/80 p-6 rounded-card border border-slate-700 relative">
                <div className="text-3xl font-extrabold text-orange-signal mb-3 font-mono">
                  {s.step}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {locale === 'am' ? s.titleAm : s.titleEn}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {locale === 'am' ? s.descAm : s.descEn}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setCurrentView('book')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              <span>{locale === 'am' ? 'አሁን ቀጠሮ ይያዙ' : 'Book Appointment Now'}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 7.6 PACKAGES PREVIEW */}
      <section className="py-16 md:py-24 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-orange-deep text-xs font-bold uppercase tracking-wider">
              {locale === 'am' ? 'ተመጣጣኝ ዋጋዎች' : 'Maintenance Packages'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy mt-2">
              {locale === 'am' ? 'የተሟሉ የጥገና ጥቅሎች' : 'Tailored Service Packages'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => {
              const isFav = pkg.featured;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-card p-6 flex flex-col justify-between transition-all ${
                    isFav
                      ? 'border-2 border-orange-signal bg-white shadow-xl relative scale-100 lg:scale-105 z-10'
                      : 'border border-line bg-mist shadow-sm hover:shadow'
                  }`}
                >
                  {isFav && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-signal text-navy text-xs font-extrabold uppercase px-4 py-1 rounded-full shadow">
                      {locale === 'am' ? 'በጣም ተመራጭ' : 'Most Popular'}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">
                      {locale === 'am' ? pkg.nameAm : pkg.nameEn}
                    </h3>
                    <p className="text-xs text-muted mb-4">
                      {locale === 'am' ? pkg.descriptionAm : pkg.descriptionEn}
                    </p>

                    <div className="text-3xl font-extrabold text-navy my-4 font-mono">
                      {pkg.price.toLocaleString()} <span className="text-sm font-bold text-muted">ETB</span>
                    </div>

                    <div className="text-xs text-slate-500 mb-6 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>~{pkg.durationHours} {locale === 'am' ? 'ሰዓት' : 'hours'}</span>
                    </div>

                    <div className="space-y-2 mb-6">
                      {(locale === 'am' ? pkg.includedAm : pkg.includedEn).slice(0, 5).map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant={isFav ? 'primary' : 'outline'}
                    size="md"
                    fullWidth
                    onClick={() => {
                      setSelectedServiceSlug(pkg.slug);
                      setCurrentView('book');
                    }}
                  >
                    <span>{locale === 'am' ? 'ይህን ጥቅል ይያዙ' : 'Select Package'}</span>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7.7 GALLERY PREVIEW WITH BEFORE/AFTER SLIDER */}
      <section className="py-16 md:py-24 bg-mist bg-blueprint border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-orange-deep text-xs font-bold uppercase tracking-wider">
                {locale === 'am' ? 'የስራ ውጤቶቻችን' : 'Our Craftsmanship'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-navy mt-1">
                {locale === 'am' ? 'በፊት እና በኋላ ማነፃፀሪያ' : 'Before & After Engineering'}
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentView('gallery')}
            >
              <span>{locale === 'am' ? 'ሁሉንም ፎቶዎች ይመልከቱ' : 'View Full Gallery'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Slider */}
            <div className="lg:col-span-7 bg-white p-3 rounded-card border border-line shadow-sm">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="bg-white border-2 border-slate-700 px-2 py-0.5 rounded font-mono font-black text-xs text-navy shadow-xs">
                    🇪🇹 AA-2-B12345
                  </span>
                  <span className="text-xs font-bold text-navy">
                    Toyota Vitz (2016)
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-orange-deep bg-orange-tint px-2 py-0.5 rounded-full">
                  {locale === 'am' ? 'ነፋስ ስልክ-ላፍቶ ወርክሾፕ' : 'Nefas Silk-Lafto'}
                </span>
              </div>

              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80"
                afterImage="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80"
                beforeLabel={locale === 'am' ? 'ከመጠገኑ በፊት (የተጎዳ)' : 'Before (Damaged)'}
                afterLabel={locale === 'am' ? 'ከጥገና በኋላ (የተስተካከለ)' : 'After (Restored)'}
                aspectRatio="aspect-[16/10]"
              />
              <div className="flex items-center justify-between text-xs text-muted mt-3 px-1">
                <span>{locale === 'am' ? 'የግጭት ጉዳት ወደ ፋብሪካ ልኬት' : 'Front collision to OEM spec'}</span>
                <span className="font-semibold text-orange-deep cursor-pointer" onClick={() => setCurrentView('gallery')}>
                  {locale === 'am' ? 'እጀታውን ይጎትቱ ⇄' : 'Drag handle ⇄'}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails of other Ethiopian Repairs */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {[
                {
                  plate: 'AA-2-C67890',
                  vehicle: 'Suzuki Dzire',
                  img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80',
                  labelAm: 'የጎን በር ጭረትና ቀለም',
                  labelEn: 'Door Paint & Scratch'
                },
                {
                  plate: 'AA-2-E88990',
                  vehicle: 'Hyundai Tucson',
                  img: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=400&q=80',
                  labelAm: 'የሞተር ሙሉ ተሃድሶ',
                  labelEn: 'Engine Rebuild'
                },
                {
                  plate: '3-A12890',
                  vehicle: 'Isuzu NPR Truck',
                  img: 'https://images.unsplash.com/photo-1600790142048-b4b1275b28d0?auto=format&fit=crop&w=400&q=80',
                  labelAm: 'የብሬክ ዲስክ ሌዝ',
                  labelEn: 'Brake Rotor Lathe'
                },
                {
                  plate: 'AA-2-D44556',
                  vehicle: 'Land Cruiser Prado',
                  img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80',
                  labelAm: 'የሻሲ ሌዘር ማስተካከል',
                  labelEn: 'Laser Chassis Frame'
                }
              ].map((car, idx) => (
                <div 
                  key={idx}
                  onClick={() => setCurrentView('gallery')}
                  className="group relative rounded-card overflow-hidden shadow-sm border border-line h-36 bg-navy cursor-pointer"
                >
                  <img
                    src={car.img}
                    alt={car.vehicle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent p-2.5 flex flex-col justify-between">
                    <span className="self-start bg-white/90 text-navy font-mono font-bold text-[10px] px-1.5 py-0.5 rounded shadow-xs">
                      {car.plate}
                    </span>
                    <div>
                      <p className="text-white font-bold text-xs leading-tight drop-shadow-xs">
                        {car.vehicle}
                      </p>
                      <p className="text-orange-signal text-[10px] font-medium">
                        {locale === 'am' ? car.labelAm : car.labelEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7.8 TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-orange-deep text-xs font-bold uppercase tracking-wider">
              {locale === 'am' ? 'የደንበኞች ምስክርነት' : 'Customer Reviews'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy mt-1">
              {locale === 'am' ? 'ደንበኞቻችን ስለ እኛ ምን ይላሉ?' : 'What Drivers Say About Us'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-card bg-mist border border-line flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                    "{locale === 'am' ? t.commentAm : t.commentEn}"
                  </p>
                </div>

                <div className="pt-4 border-t border-line/60">
                  <h4 className="font-bold text-navy text-sm">{t.name}</h4>
                  <p className="text-xs text-muted">{t.vehicle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.9 FINAL CTA BAND - Precision Garage Master Theme */}
      <section className="bg-navy text-white py-16 border-t border-slate-800 bg-blueprint-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-orange-signal text-xs font-bold border border-slate-700">
            <span>🇪🇹 አዲስ አበባ · ነፋስ ስልክ-ላፍቶ · ኬራ</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {locale === 'am' 
              ? 'መኪናዎ ዛሬ ባለሙያ ይፈልጋል?' 
              : 'Does your vehicle need expert care today?'}
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {locale === 'am'
              ? 'ቀጠሮዎን አሁኑኑ በኦንላይን ይያዙ፤ ወይም በቀጥታ በቴሌግራም ባለሙያዎቻችንን ያማክሩ።'
              : 'Secure your verified bay appointment online now or consult our engineers directly on Telegram.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setCurrentView('book')}
              className="w-full sm:w-auto shadow-md"
            >
              <Calendar className="w-5 h-5 mr-2" />
              <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
            </Button>

            <a
              href="https://t.me/AbegazMotors"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-6 rounded-btn bg-[#229ED9] text-white font-bold hover:bg-[#1D8BC0] shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Telegram @AbegazMotors</span>
            </a>

            <a
              href="tel:+251114651553"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-6 rounded-btn border-2 border-slate-700 text-slate-200 font-bold hover:bg-slate-800 transition-all font-mono"
            >
              <Phone className="w-4 h-4 text-orange-signal" />
              <span>011 465 1553</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
