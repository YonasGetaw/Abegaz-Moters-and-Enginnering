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
      initials: 'AA',
      image: '/team/abiy-abegaz.png'
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
      initials: 'MT',
      image: '/team/mikiyas-tsegaye.png'
    }
  ];

  return (
    <div className="bg-mist min-h-screen pb-24">
      {/* 1. HERO BANNER - Clean White & Royal Blue */}
      <section className="bg-gradient-to-b from-blue-50/70 via-white to-white text-slate-800 relative overflow-hidden pt-12 pb-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">


          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-blue-950 tracking-tight leading-tight max-w-4xl mx-auto">
            {locale === 'am' ? (
              <>ስለ <span className="text-red-600">አበጋዝ ሞተርስ ኢንጂነሪንግ</span></>
            ) : (
              <>About <span className="text-red-600">Abegaz Motors Engineering</span></>
            )}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {locale === 'am'
              ? 'በአዲስ አበባ፣ ነፋስ ስልክ-ላፍቶ (ቄራ አካባቢ) የሚገኝ ዘመናዊ የምህንድስና ደረጃዎችን የጠበቀ አስተማማኝ የመኪና ጥገና ማዕከል ነው።'
              : 'Addis Ababa’s benchmark automotive engineering center located at Nefas Silk-Lafto, Alexander Pushkin Street near Kera.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-blue-950 pt-3">
            <span className="flex items-center gap-2 bg-white/90 px-4 py-2.5 rounded-full border border-slate-200 shadow-sm">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>{WORKSHOP_INFO.addressEn} ({WORKSHOP_INFO.plusCode})</span>
            </span>
            <span className="flex items-center gap-2 bg-white/90 px-4 py-2.5 rounded-full border border-slate-200 shadow-sm">
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>{WORKSHOP_INFO.customerServicePhoneMobile} / {WORKSHOP_INFO.customerServicePhoneOffice}</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {workshopStats.map((st, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg text-center sm:text-left">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-900 via-red-600 to-red-400" />
              <div className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-950">
                {st.num}
              </div>
              <p className="text-sm text-slate-600 font-semibold mt-2 leading-relaxed">
                {locale === 'am' ? st.labelAm : st.labelEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. STORY & WORKSHOP IDENTITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 text-xs sm:text-sm font-bold tracking-wide">
              <span>{locale === 'am' ? 'የእኛ ማንነት' : 'Our Identity & Purpose'}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight">
              {locale === 'am'
                ? 'በግምት ሳይሆን በሳይንሳዊ ምህንድስና የሚሰጥ እውነተኛ አገልግሎት'
                : 'Driven by Rigorous Engineering Integrity, Not Guesswork'}
            </h2>

            <div className="space-y-4 text-slate-600 text-base leading-7">
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

            <div className="pt-2 flex flex-wrap gap-3 text-sm font-semibold text-blue-950">
              <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{locale === 'am' ? 'ግልጽ የቅድመ-ዋጋ ግምት' : 'Upfront Transparent Estimates'}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{locale === 'am' ? 'የ 35 ነጥብ ጥብቅ ፍተሻ' : '35-Point Safety Inspection'}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{locale === 'am' ? 'በሰዓቱ የተከበረ ርክክብ' : 'Punctual Bay Handover'}</span>
              </div>
            </div>
          </div>

          {/* Right Image: Workshop Team Photo */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border-4 border-white bg-white p-2 shadow-2xl ring-1 ring-slate-200">
              <img
                src="/team/team-photo.jpg"
                alt="Abegaz Motors workshop team"
                className="aspect-[2/1] w-full rounded-2xl object-cover object-center"
              />
            </div>
            <div className="mt-3 text-center">
              <span className="text-[11px] font-mono text-muted">
                📍 Alexander Pushkin St, Addis Ababa · Plus Code: {WORKSHOP_INFO.plusCode}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. THE 4 PILLARS OF EXCELLENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-red-700 text-xs sm:text-sm font-bold uppercase tracking-[0.16em]">
            {locale === 'am' ? 'የስራችን መሠረቶች' : 'Engineering Capabilities'}
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-blue-950 tracking-tight mt-2">
            {locale === 'am' ? '4ቱ የወርክሾፓችን ዋና ዘርፎች' : 'The 4 Core Engineering Pillars'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div 
                key={idx}
                className="group relative overflow-hidden bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-red-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-900 to-red-500 opacity-80" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-700 ring-1 ring-red-100 transition-colors group-hover:bg-red-600 group-hover:text-white">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black font-mono text-muted bg-slate-100 px-2 py-0.5 rounded">
                      #{p.num}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-blue-950 mb-2 leading-snug">
                    {locale === 'am' ? p.titleAm : p.titleEn}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
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
            );
          })}
        </div>
      </section>

      {/* 5. LEADERSHIP TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-red-700 text-xs sm:text-sm font-bold uppercase tracking-[0.16em]">
            {locale === 'am' ? 'የአመራር ቡድን' : 'Workshop Leadership'}
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-blue-950 tracking-tight mt-2">
            {locale === 'am' ? 'የወርክሾፓችን መሃንዲሶችና አስተዳዳሪዎች' : 'Meet Our Workshop Leaders'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {locale === 'am' 
              ? 'መኪናዎን በኃላፊነትና በሙያዊ ብቃት የሚያስተናግዱ ባለሙያዎች'
              : 'Passionate automotive professionals dedicated to vehicle reliability.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {leadership.map((leader, idx) => (
            <div 
              key={idx}
              className="group relative overflow-hidden bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 hover:border-red-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center space-y-5 flex flex-col justify-between"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-900 via-blue-700 to-red-500" />
              <div className="space-y-4">
                {leader.image ? (
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white ring-2 ring-red-500 shadow-lg bg-slate-100">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-blue-900 text-white mx-auto flex items-center justify-center font-display font-extrabold text-3xl border-4 border-white ring-2 ring-red-500 shadow-lg">
                    {leader.initials}
                  </div>
                )}

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-100 px-3.5 py-1.5 rounded-full">
                    {leader.badge}
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-blue-950 mt-4">
                    {leader.name}
                  </h3>
                  <p className="text-sm font-bold text-red-700 mt-1">
                    {locale === 'am' ? leader.roleAm : leader.roleEn}
                  </p>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {locale === 'am' ? leader.bioAm : leader.bioEn}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-center">
                <a
                  href={`tel:${leader.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 hover:bg-red-50 text-blue-900 hover:text-red-700 border border-blue-100 hover:border-red-200 text-sm font-bold transition-all font-mono shadow-sm"
                >
                  <PhoneCall className="w-4 h-4 text-red-600" />
                  <span>{leader.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WHO WE SERVE: INDIVIDUALS & CORPORATE FLEETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Individual Owners */}
          <div className="group bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center ring-1 ring-red-100">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-blue-950">
                {locale === 'am' ? 'የግል መኪና ባለቤቶች' : 'Private Vehicle Owners'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
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

          {/* Corporate Fleets */}
          <div className="group bg-white p-7 sm:p-8 rounded-3xl border border-blue-100 shadow-sm space-y-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center ring-1 ring-blue-100">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-blue-950">
                {locale === 'am' ? 'ድርጅቶችና የንግድ ተሽከርካሪዎች' : 'Corporate & Commercial Fleets'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
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

        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 border border-blue-800 shadow-xl text-center max-w-3xl mx-auto space-y-5">
          <div className="pointer-events-none absolute right-0 top-0 w-64 h-64 rounded-full bg-red-600/20 blur-3xl" />
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-red-300 flex items-center justify-center mx-auto ring-1 ring-white/15">
            <Award className="w-7 h-7" />
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {locale === 'am' ? 'ለመኪናዎ ዛሬውኑ አስተማማኝ እንክብካቤ ያግኙ' : 'Experience Precision Automotive Engineering'}
          </h3>

          <p className="text-sm sm:text-base text-blue-100 max-w-lg mx-auto leading-relaxed">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-colors font-mono"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>0975 48 08 08 / 011 465 1553</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
