import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Target, 
  ShieldCheck, 
  Wrench, 
  Users, 
  ArrowRight, 
  Building2, 
  User, 
  Award, 
  CheckCircle2, 
  Compass,
  MapPin,
  Cpu,
  Car,
  Zap,
  BatteryCharging,
  PhoneCall,
  Clock,
  Sparkles
} from 'lucide-react';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { WORKSHOP_INFO } from '../../lib/constants';

export const AboutPage: React.FC = () => {
  const { locale, setCurrentView, setSelectedServiceSlug } = useApp();

  const workshopStats = [
    { num: '12+', labelAm: 'ዓመታት በኢንዱስትሪው ውስጥ', labelEn: 'Years Engineering Excellence' },
    { num: '6,500+', labelAm: 'የተጠገኑ ተሽከርካሪዎች', labelEn: 'Vehicles Repaired & Handed Over' },
    { num: '100%', labelAm: 'የጥራት ዋስትና በኦሪጅናል ዕቃዎች', labelEn: 'Genuine OEM Parts Guarantee' },
    { num: '4', labelAm: 'ዋና ዋና የምህንድስና ዘርፎች', labelEn: 'Dedicated Core Engineering Bays' },
  ];

  const pillars = [
    {
      num: '01',
      titleAm: 'ሜካኒካል ምህንድስና (Mechanical)',
      titleEn: 'Mechanical Engineering',
      descAm: 'የሞተር ሙሉ ማደስ፣ ሲሊንደር ሄድ፣ ጊርቦክስ፣ ብሬክና ሱስፔንሽን በጥንቃቄ መለካት።',
      descEn: 'Full engine overhauls, cylinder head resurfacing, transmission, and laser steering geometry.',
      icon: Wrench,
      accent: 'blue'
    },
    {
      num: '02',
      titleAm: 'ኤሌክትሪክና ዲያግኖስቲክስ (Electrical)',
      titleEn: 'Auto Electrical & ECU Scanners',
      descAm: 'የኮምፒውተር ስካነሮች፣ አልተርኔተር፣ ስታርተር፣ የሽቦ ብልሽት መለየትና የ AC ስርዓት።',
      descEn: 'Factory OBD-II/ECU telemetry, live sensor analysis, charging systems, and cabin climate.',
      icon: Zap,
      accent: 'amber'
    },
    {
      num: '03',
      titleAm: 'ቦዲና ስፕሬይ ቀለም (Body & Paint)',
      titleEn: 'Chassis Alignment & Oven Paint',
      descAm: 'የግጭት ጥገና፣ የሻሲ ማስተካከል በኮምፒውተርና በጋራዥ ስፕሬይ ቡዝ የፋብሪካ ቀለም።',
      descEn: 'Chassis frame pulling, laser dent correction, computerized color matching, and baked clear coat.',
      icon: Car,
      accent: 'orange'
    },
    {
      num: '04',
      titleAm: 'EV እና ሃይብሪድ ጥገና (EV & Hybrid)',
      titleEn: 'EV & Hybrid Battery Care',
      descAm: 'የከፍተኛ ቮልቴጅ ባትሪ ሴል ምርመራ (SOH)፣ የኢንቨርተር ማቀዝቀዣና ኤሌክትሪክ ሞተር።',
      descEn: 'High-voltage pack diagnostics, inverter cooling loops, and regenerative brake systems.',
      icon: BatteryCharging,
      accent: 'emerald'
    },
  ];

  const leadership = [
    {
      name: 'አቢይ አበጋዝ (Abiy Abegaz)',
      roleAm: 'ዋና ስራ አስፈፃሚ እና ዋና ስራ አስኪያጅ (CEO & General Manager)',
      roleEn: 'CEO & General Manager',
      phone: '091 120 7549',
      phoneRaw: '+251911207549',
      bioAm: 'በአውቶሞቲቭ ኢንጂነሪንግና በወርክሾፕ ከፍተኛ አመራር ከ 15+ ዓመታት በላይ የካበተ ልምድ ያካበቱ መሃንዲስ።',
      bioEn: 'Over 15+ years spearheading precision automotive engineering and executive workshop operations.',
      badge: 'CEO & GM',
      initials: 'AA'
    },
    {
      name: 'ሚኪያስ ፀጋዬ (Mikiyas Tsegaye)',
      roleAm: 'ዋና ስራ አስኪያጅ (General Manager)',
      roleEn: 'General Manager',
      phone: '091 141 4570',
      phoneRaw: '+251911414570',
      bioAm: 'የወርክሾፕ ስራዎችን፣ የቴክኒክ ጥራት ቁጥጥርና የደንበኞች አያያዝን በላቀ ብቃት የሚመሩ።',
      bioEn: 'Directing daily workshop operations, engineering quality assurance, and seamless service delivery.',
      badge: 'General Manager',
      initials: 'MT'
    }
  ];

  return (
    <div className="bg-mist min-h-screen pb-24">
      {/* 1. HERO BANNER - Clean White & Royal Blue with Ambient Workshop Watermark */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:py-20 border-b border-slate-200">
        {/* Subtle Ambient Workshop Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/packages/package-d.jpg"
            alt="Abegaz Motors Workshop Engineering"
            className="w-full h-full object-cover object-center opacity-15 filter saturate-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-white/85 to-white" />
          <div className="absolute inset-0 bg-blueprint opacity-30 mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <ScrollReveal direction="down">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-blue-900 tracking-tight leading-tight max-w-4xl mx-auto">
              {locale === 'am' ? (
                <>ስለ <span className="text-red-600">አበጋዝ ሞተርስ ኢንጂነሪንግ</span></>
              ) : (
                <>About <span className="text-red-600">Abegaz Motors Engineering</span></>
              )}
            </h1>
          </ScrollReveal>

          <ScrollReveal delayMs={100}>
            <p className="text-slate-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {locale === 'am'
                ? 'በአዲስ አበባ፣ ነፋስ ስልክ-ላፍቶ (ቄራ አካባቢ) የሚገኝ ዘመናዊ የምህንድስና ደረጃዎችን የጠበቀ አስተማማኝ የመኪና ጥገና ማዕከል ነው።'
                : 'Addis Ababa’s benchmark automotive engineering center located at Nefas Silk-Lafto, Alexander Pushkin Street near Kera.'}
            </p>
          </ScrollReveal>

          <ScrollReveal delayMs={200}>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-blue-900 pt-2">
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>{WORKSHOP_INFO.addressEn} ({WORKSHOP_INFO.plusCode})</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>{WORKSHOP_INFO.customerServicePhoneMobile} / {WORKSHOP_INFO.customerServicePhoneOffice}</span>
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <ScrollReveal delayMs={150}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {workshopStats.map((st, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-line shadow-sm hover:shadow-md transition-all text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-black text-navy font-mono">
                  {st.num}
                </div>
                <p className="text-xs text-muted font-bold mt-1">
                  {locale === 'am' ? st.labelAm : st.labelEn}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. STORY & WORKSHOP IDENTITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-tint text-orange-deep text-xs font-bold">
                <span>{locale === 'am' ? 'የእኛ ማንነት' : 'Our Identity & Purpose'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-navy tracking-tight leading-tight mt-2">
                {locale === 'am'
                  ? 'በግምት ሳይሆን በሳይንሳዊ ምህንድስና የሚሰጥ እውነተኛ አገልግሎት'
                  : 'Driven by Rigorous Engineering Integrity, Not Guesswork'}
              </h2>

              <div className="space-y-4 text-slate-700 text-sm leading-relaxed mt-4">
                <p>
                  {locale === 'am'
                    ? 'አበጋዝ ሞተርስ ኢንጂነሪንግ (Abegaz Motors Engineering) በአዲስ አበባ ከተማ ውስጥ አሽከርካሪዎች ለመኪናቸው የሚያገኙትን የእንክብካቤ ደረጃ ወደ ላቀ ምህንድስና ለማሸጋገር ተቋቁሟል። አብዛኛው የከተማዋ ጋራዦች በባህላዊ ግምት ላይ በሚደገፉበት ወቅት፣ እኛ ኦሪጅናል OEM የዲያግኖስቲክስ ስካነሮችን፣ የሻሲ ሌዘር መለኪያዎችንና ትክክለኛ የፋብሪካ አሰራርን መሰረት አድርገን ስራ ጀመርን።'
                    : 'Founded in Addis Ababa, Abegaz Motors Engineering was established to bring scientific precision to vehicle repair. While conventional garages rely on trial and error, we invest in computerized diagnostics, laser calibration, and factory-standard rebuilds.'}
                </p>

                <p>
                  {locale === 'am'
                    ? 'ዛሬ በነፋስ ስልክ-ላፍቶ በሚገኘው ዘመናዊ ወርክሾፓችን ውስጥ ከቀላል ከተማ መኪኖች (Toyota Vitz, Suzuki Dzire) አንስቶ እስከ ከባድ 4x4 ፕራዶ፣ ላንድ ክሩዘር እንዲሁም የኤሌክትሪክና ሃይብሪድ መኪኖች (EV & Hybrid) ሙሉ የምህንድስና እንክብካቤ እንሰጣለን።'
                    : 'From daily commuters to heavy 4x4 SUVs and the newest generation of Electric and Hybrid vehicles, our dedicated bays handle mechanical, electrical, body, and high-voltage systems with zero compromise.'}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 text-xs font-bold text-navy">
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-line shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{locale === 'am' ? 'ግልጽ የቅድመ-ዋጋ ግምት' : 'Upfront Transparent Estimates'}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-line shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{locale === 'am' ? 'የ 35 ነጥብ ጥብቅ ፍተሻ' : '35-Point Safety Inspection'}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-line shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{locale === 'am' ? 'በሰዓቱ የተከበረ ርክክብ' : 'Punctual Bay Handover'}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Image: Official Signboard Photo */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="right" delayMs={150}>
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-white p-2">
                <img
                  src="/hero-banner.png"
                  alt="Abegaz Motors Official Signboard"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
              <div className="mt-3 text-center">
                <span className="text-[11px] font-mono text-muted">
                  📍 Alexander Pushkin St, Addis Ababa · Plus Code: {WORKSHOP_INFO.plusCode}
                </span>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 4. THE 4 PILLARS OF EXCELLENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-orange-deep text-xs font-bold uppercase tracking-wider">
              {locale === 'am' ? 'የስራችን መሠረቶች' : 'Engineering Capabilities'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-navy tracking-tight mt-1">
              {locale === 'am' ? '4ቱ የወርክሾፓችን ዋና ዘርፎች' : 'The 4 Core Engineering Pillars'}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <ScrollReveal key={idx} delayMs={idx * 100}>
                <div 
                  className="bg-white rounded-2xl p-6 border border-line shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-mist flex items-center justify-center text-navy">
                        <IconComp className="w-6 h-6 text-orange-deep" />
                      </div>
                      <span className="text-xs font-black font-mono text-muted bg-slate-100 px-2 py-0.5 rounded">
                        #{p.num}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-navy mb-2 leading-snug">
                      {locale === 'am' ? p.titleAm : p.titleEn}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {locale === 'am' ? p.descAm : p.descEn}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-line/60">
                    <span className="text-[11px] font-bold text-orange-deep flex items-center gap-1">
                      <span>{locale === 'am' ? 'የተረጋገጠ ደረጃ' : 'Certified Standard'}</span>
                      <Sparkles className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 5. LEADERSHIP TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-orange-deep text-xs font-bold uppercase tracking-wider">
              {locale === 'am' ? 'የአመራር ቡድን' : 'Workshop Leadership'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-navy tracking-tight mt-1">
              {locale === 'am' ? 'የወርክሾፓችን መሃንዲሶችና አስተዳዳሪዎች' : 'Meet Our Workshop Leaders'}
            </h2>
            <p className="text-muted text-xs sm:text-sm mt-2">
              {locale === 'am' 
                ? 'መኪናዎን በኃላፊነትና በሙያዊ ብቃት የሚያስተናግዱ ባለሙያዎች'
                : 'Passionate automotive professionals dedicated to vehicle reliability.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {leadership.map((leader, idx) => (
            <ScrollReveal key={idx} delayMs={idx * 150}>
              <div 
                className="bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-blue-600 shadow-sm hover:shadow-xl transition-all text-center space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <div className="w-24 h-24 rounded-full bg-blue-900 text-white mx-auto flex items-center justify-center font-black text-2xl border-4 border-red-600 shadow-lg">
                    {leader.initials}
                  </div>

                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full">
                      {leader.badge}
                    </span>
                    <h3 className="text-xl font-black text-blue-900 mt-3">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-bold text-red-600 mt-1">
                      {locale === 'am' ? leader.roleAm : leader.roleEn}
                    </p>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {locale === 'am' ? leader.bioAm : leader.bioEn}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-center">
                  <a
                    href={`tel:${leader.phoneRaw}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-red-50 text-blue-800 hover:text-red-600 border border-blue-200 hover:border-red-300 text-xs font-black transition-all font-mono shadow-xs"
                  >
                    <PhoneCall className="w-4 h-4 text-red-600" />
                    <span>{leader.phone}</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. WHO WE SERVE: INDIVIDUALS & CORPORATE FLEETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Individual Owners */}
          <ScrollReveal direction="left">
            <div className="bg-white p-8 rounded-3xl border border-line shadow-sm space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-tint text-orange-deep flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-navy">
                  {locale === 'am' ? 'የግል መኪና ባለቤቶች' : 'Private Vehicle Owners'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {locale === 'am'
                    ? 'ለከተማ አሽከርካሪዎች መደበኛ ሰርቪስ፣ ፈጣን ምርመራ፣ የብሬክና ዘይት ቅየራ ከግልጽ የዋጋ ዝርዝር ጋር። በ 2 ደቂቃ ቀጠሮ ይያዙ።'
                    : 'Transparent diagnostics, periodic oil service, brakes, and air conditioning maintenance with fast online booking.'}
                </p>
              </div>

              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSelectedServiceSlug('engine-repair-overhaul');
                  setCurrentView('book');
                }}
                className="self-start mt-2"
              >
                <span>{locale === 'am' ? 'የግል ቀጠሮ ይያዙ' : 'Book Personal Bay'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </ScrollReveal>

          {/* Corporate Fleets */}
          <ScrollReveal direction="right" delayMs={100}>
            <div className="bg-white p-8 rounded-3xl border-2 border-blue-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-blue-600 transition-all h-full">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-blue-900">
                  {locale === 'am' ? 'ድርጅቶችና የንግድ ተሽከርካሪዎች' : 'Corporate & Commercial Fleets'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {locale === 'am'
                    ? 'ለኩባንያዎች፣ ኤምባሲዎችና ለከባድ ትራንስፖርት ተሽከርካሪዎች የተመደበ ቅድሚያ ቤይ፣ ወርሃዊ ፍተሻና የተሟላ ህጋዊ የታክስ ደረሰኝ።'
                    : 'Dedicated priority turnaround, scheduled preventive telemetry, and itemized invoicing for commercial accounts.'}
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setSelectedServiceSlug('fleet');
                  setCurrentView('book');
                }}
                className="self-start mt-2"
              >
                <span>{locale === 'am' ? 'የፍሊት ቀጠሮ ይያዙ' : 'Book Corporate Fleet'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <ScrollReveal>
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-sm text-center max-w-3xl mx-auto space-y-5">
            <div className="w-14 h-14 rounded-full bg-orange-tint text-orange-deep flex items-center justify-center mx-auto">
              <Award className="w-7 h-7" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-navy">
              {locale === 'am' ? 'ለመኪናዎ ዛሬውኑ አስተማማኝ እንክብካቤ ያግኙ' : 'Experience Precision Automotive Engineering'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              {locale === 'am'
                ? 'በድረ-ገጻችን በቀጥታ ቀጠሮ ይያዙ ወይም በደንበኞች አገልግሎት ስልኮቻችን 0975 48 08 08 / 011 465 1553 ደውለው ያማክሩን።'
                : 'Reserve your verified bay appointment online or reach our customer service desk at 0975 48 08 08 / 011 465 1553.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setCurrentView('book');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <a
                href={`tel:${WORKSHOP_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 transition-colors font-mono"
              >
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>0975 48 08 08 / 011 465 1553</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
