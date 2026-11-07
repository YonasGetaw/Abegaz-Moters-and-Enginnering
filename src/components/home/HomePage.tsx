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
  ChevronDown,
  Star,
  HelpCircle
} from 'lucide-react';
import { Button } from '../common/Button';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { INITIAL_TESTIMONIALS, INITIAL_FAQS } from '../../lib/constants';

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

  // FAQ Accordion State
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleFaq = (id: string) => {
    setOpenFaqIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const featuredServices = services.filter(s => s.featured).slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 7.1 HERO SECTION - Original Ambient Workshop Video Background */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-900 bg-slate-950 text-white min-h-[85vh] flex items-center">
        
        {/* Ambient Video Background Layer - Authentic Mechanic Working Video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.play().catch(() => {});
              }
            }}
            onCanPlay={(e) => {
              e.currentTarget.play().catch(() => {});
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src="/mechanic-work.webm" type="video/webm" />
            <source src="/workshop-bg.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient: video stays 100% clear, vivid & sharp while text is perfectly legible */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">


          {/* Short Title as requested by user */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-4">
            {locale === 'am' ? 'አበጋዝ ሞተርስ ኢንጂነሪንግ' : 'Abegaz Motors Engineering'}
          </h1>

          {/* Short Tagline as requested by user */}
          <p className="text-xl sm:text-2xl md:text-3xl text-red-400 font-extrabold tracking-wide drop-shadow-xl mb-8">
            {locale === 'am' ? 'ሊተማመኑበት የሚችሉት ጥራት ያለው አገልግሎት' : 'Quality service you can trust'}
          </p>

          {/* Only 2 Buttons: Book Appointment and Services */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setCurrentView('book')}
              className="w-full sm:w-auto h-14 px-8 text-base font-black shadow-2xl shadow-red-600/40 hover:shadow-red-600/60"
            >
              <Calendar className="w-5 h-5 mr-2" />
              <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
            </Button>

            <button
              type="button"
              onClick={() => setCurrentView('services')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-btn bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border-2 border-white/60 hover:border-white font-extrabold text-base shadow-lg transition-all active:scale-98"
            >
              <span>{locale === 'am' ? 'አገልግሎቶች' : 'Services'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Trust Chips */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-white/95">
            <span className="flex items-center gap-2 font-bold drop-shadow">
              <CheckCircle2 className="w-4 h-4 text-red-500" />
              <span>{locale === 'am' ? 'ልምድ ያላቸው መሃንዲሶች' : 'Certified Engineers'}</span>
            </span>
            <span className="flex items-center gap-2 font-bold drop-shadow">
              <CheckCircle2 className="w-4 h-4 text-red-500" />
              <span>{locale === 'am' ? 'ግልጽ ሂደትና ዋጋ' : 'Transparent Pricing'}</span>
            </span>
            <span className="flex items-center gap-2 font-bold drop-shadow">
              <CheckCircle2 className="w-4 h-4 text-red-500" />
              <span>{locale === 'am' ? 'ፈጣን ማሳወቂያ' : 'Instant Updates'}</span>
            </span>
          </div>

          {/* Floating Quick Booking Widget */}
          <div className="mt-10 max-w-3xl mx-auto w-full bg-white/95 backdrop-blur-md text-slate-800 p-5 sm:p-6 rounded-2xl shadow-2xl border border-white/40 text-left">
            <form onSubmit={handleQuickBook} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  {locale === 'am' ? 'አገልግሎት ይምረጡ' : 'Select Service'}
                </label>
                <select
                  value={quickService}
                  onChange={(e) => setQuickService(e.target.value)}
                  className="w-full h-11 px-3 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  {services.map(s => (
                    <option key={s.slug} value={s.slug}>
                      {locale === 'am' ? s.nameAm : s.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  {locale === 'am' ? 'የቀጠሮ ቀን' : 'Preferred Date'}
                </label>
                <input
                  type="date"
                  value={quickDate}
                  onChange={(e) => setQuickDate(e.target.value)}
                  className="w-full h-11 px-3 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <Button type="submit" variant="primary" size="md" fullWidth className="h-11 text-xs font-black">
                  {locale === 'am' ? 'ክፍት ሰዓት ፈልግ ›' : 'Find Slot ›'}
                </Button>
              </div>
            </form>
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
                className="bg-white rounded-card p-6 border border-line shadow-sm card-hover-effect flex flex-col justify-between cursor-pointer"
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
      <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">

            <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-900 mt-3">
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
              <div key={idx} className="bg-white p-6 rounded-card border-2 border-slate-200 hover:border-blue-600 shadow-sm card-hover-effect relative">
                <div className="text-3xl font-black text-red-600 mb-3 font-mono">
                  {s.step}
                </div>
                <h4 className="text-lg font-bold text-blue-900 mb-2">
                  {locale === 'am' ? s.titleAm : s.titleEn}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
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
                  className={`rounded-card p-6 flex flex-col justify-between card-hover-effect cursor-pointer ${
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

                    <div className="my-4 py-2 px-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-orange-deep" />
                        <span>{locale === 'am' ? `የስራ ጊዜ፡ ~${pkg.durationHours} ሰዓት` : `Duration: ~${pkg.durationHours} hours`}</span>
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        {locale === 'am' ? 'የተሟላ ፓኬጅ' : 'Complete Package'}
                      </span>
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

      {/* 7.9 FAQ SECTION (Integrated in HomePage with #faq anchor) */}
      <section id="faq" className="py-16 md:py-24 bg-mist border-b border-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">

            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
              {locale === 'am' ? 'የተለመዱ ጥያቄዎችና መልሶቻቸው (FAQ)' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-muted text-xs sm:text-sm mt-2">
              {locale === 'am'
                ? 'ስለ ቀጠሮ አያያዝ፣ ክፍያ፣ አገልግሎቶችና አድራሻችን የተለመዱ ጥያቄዎች'
                : 'Clear answers about booking, pricing, and our workshop services.'}
            </p>
          </div>

          <div className="space-y-3">
            {INITIAL_FAQS.slice(0, 6).map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-line shadow-xs overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 select-none hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-extrabold text-navy text-sm sm:text-base">
                      {locale === 'am' ? faq.questionAm : faq.questionEn}
                    </span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'bg-orange-signal text-navy rotate-180' : 'bg-mist text-slate-600'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-line/60 bg-slate-50/50">
                      {locale === 'am' ? faq.answerAm : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted mb-3">
              {locale === 'am' ? 'ተጨማሪ ጥያቄ አለዎት? በቀጥታ በስልክ ያማክሩን፡' : 'Have a different question? Speak with us directly:'}
            </p>
            <a
              href="tel:+251975480808"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange-signal" />
              <span>0975 48 08 08</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7.10 FINAL CTA BAND - White & Royal Blue Theme */}
      <section className="bg-gradient-to-b from-white via-blue-50/50 to-blue-100/60 text-slate-800 py-16 border-t-2 border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-blue-900">
            {locale === 'am' 
              ? 'መኪናዎ ዛሬ ባለሙያ ይፈልጋል?' 
              : 'Does your vehicle need expert care today?'}
          </h2>
          <p className="text-slate-700 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-6 rounded-btn bg-[#229ED9] text-white font-black hover:bg-[#1D8BC0] shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Telegram @AbegazMotors</span>
            </a>

            <a
              href="tel:+251975480808"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-6 rounded-btn border-2 border-blue-600 bg-white text-blue-700 font-extrabold hover:bg-blue-50 transition-all font-mono shadow-xs"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>0975 48 08 08</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
