import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, Eye, ShieldCheck, Wrench, Users, ArrowRight, Building2, User } from 'lucide-react';
import { Button } from '../common/Button';

export const AboutPage: React.FC = () => {
  const { locale, setCurrentView, setSelectedServiceSlug } = useApp();

  const team = [
    { name: 'ኢንጂነር አበጋዝ ወልደማርያም', role: 'ዋና የምህንድስና ዳይሬክተር (Lead Automotive Engineer)', exp: '18 ዓመት ልምድ' },
    { name: 'ኢንጂነር ቴዎድሮስ በቀለ', role: 'የኤሌክትሮኒክስና ዲያግኖስቲክስ መሃንዲስ (Diagnostics Specialist)', exp: '12 ዓመት ልምድ' },
    { name: 'ኢንጂነር ካሌብ ታሪኩ', role: 'የሞተርና ትራንስሚሽን መሃንዲስ (Engine Overhaul Expert)', exp: '10 ዓመት ልምድ' },
    { name: 'ሄለን ሰለሞን', role: 'የደንበኞች አገልግሎትና የቀጠሮ አስተባባሪ (Service Advisor)', exp: '6 ዓመት ልምድ' },
  ];

  return (
    <div className="py-12 md:py-20 bg-mist min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-orange-deep text-xs font-bold uppercase tracking-wider">
            {locale === 'am' ? 'ስለ አበጋዝ ሞተርስ' : 'About Abegaz Motors'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight mt-1">
            {locale === 'am' ? 'ትክክለኛ ምህንድስናና የደንበኛ እምነት' : 'Precision Engineering & Uncompromising Trust'}
          </h1>
          <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
            {locale === 'am'
              ? 'መኪናዎ በዘመናዊ መሣሪያዎችና በሰለጠኑ መሃንዲሶች እጅ አስተማማኝ እንክብካቤ ያገኛል።'
              : 'Dedicated to precision automotive diagnosis, transparent pricing, and respectful customer service.'}
          </p>
        </div>

        {/* 8.1 Our Story */}
        <div className="bg-white rounded-banner p-8 sm:p-12 border border-line shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-slate-700 text-sm leading-relaxed">
            <h3 className="text-2xl font-extrabold text-navy">
              {locale === 'am' ? 'ታሪካችን እና ራዕያችን' : 'Our Story & Philosophy'}
            </h3>
            <p>
              {locale === 'am'
                ? 'አበጋዝ ሞተርስ ኢንጂነሪንግ የተመሰረተው በኢትዮጵያ ውስጥ ያለውን የተሽከርካሪ ጥገና ደረጃ ወደ ላቀ ምህንድስና ለማሸጋገር ነው። አብዛኛው ጋራዥ በግምት በሚሰራበት ዘመን፣ እኛ በዘመናዊ ዲጂታል ስካነሮች፣ ትክክለኛ መለኪያዎችና ግልጽ ሂደት ስራ ጀመርን።'
                : 'Abegaz Motors Engineering was founded to raise automotive repair standards in Ethiopia. Where conventional garages rely on guesswork, we combine factory diagnostic equipment with rigorous engineering integrity.'}
            </p>
            <p>
              {locale === 'am'
                ? 'ዛሬ ከ 6,500 በላይ የግልና የድርጅት ተሽከርካሪዎችን ያገለገልን ሲሆን፣ ንጹህ ወርክሾፕ፣ በሰዓቱ የሚከበር ቀጠሮና ፈጣን የቴሌግራም/ኢሜይል ማሳወቂያን ባህላችን አድርገናል።'
                : 'Having serviced over 6,500 vehicles, we are proud of our pristine workshop floor, punctual booking execution, and modern customer communication.'}
            </p>
          </div>

          <div className="lg:col-span-6 rounded-card overflow-hidden shadow border border-line">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
              alt="Workshop team"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* 8.2 Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-card border border-line shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-orange-tint flex items-center justify-center text-orange-deep">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-navy">
              {locale === 'am' ? 'ተልዕኮ (Mission)' : 'Mission'}
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              {locale === 'am'
                ? 'ለትክክለኛ ምርመራና ጥገና ቅድሚያ በመስጠት፣ አሽከርካሪዎች በመኪናቸው ደህንነት ሙሉ እምነት እንዲኖራቸው ማድረግ።'
                : 'Deliver precision diagnostics and honest repairs so every driver rides with complete peace of mind.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-card border border-line shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-orange-tint flex items-center justify-center text-orange-deep">
              <Eye className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-navy">
              {locale === 'am' ? 'ራዕይ (Vision)' : 'Vision'}
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              {locale === 'am'
                ? 'በኢትዮጵያ ውስጥ ተምሳሌት የሆነ ዘመናዊ፣ ንጹህና በቴክኖሎጂ የታገዘ የመጀመሪያው የምህንድስና ወርክሾፕ መሆን።'
                : 'To be the benchmark for modern, clean, technology-driven automotive engineering in East Africa.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-card border border-line shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-orange-tint flex items-center justify-center text-orange-deep">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-navy">
              {locale === 'am' ? 'እሴቶቻችን (Core Values)' : 'Core Values'}
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              {locale === 'am'
                ? 'ግልጽነት፣ የቴክኒክ ጥራት፣ የሰዓት አክብሮትና የደንበኛ እርካታ። ምንም የተደበቀ ወጪ አይኖርም።'
                : 'Absolute transparency, engineering precision, punctuality, and unwavering respect for customer time.'}
            </p>
          </div>
        </div>

        {/* 8.4 Team */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-navy">
              {locale === 'am' ? 'የምህንድስና ቡድናችን' : 'Our Engineering Leaders'}
            </h3>
            <p className="text-xs text-muted mt-1">
              {locale === 'am' ? 'በሙያቸው የዳበሩና ከፍተኛ ልምድ ያላቸው ባለሙያዎች' : 'Certified automotive technicians with extensive manufacturer experience.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, idx) => (
              <div key={idx} className="bg-white p-6 rounded-card border border-line shadow-sm text-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-mist border-2 border-line mx-auto flex items-center justify-center text-2xl font-bold text-navy">
                  👨‍🔧
                </div>
                <div>
                  <h4 className="font-bold text-navy text-sm">{m.name}</h4>
                  <p className="text-xs text-orange-deep font-semibold mt-0.5">{m.role}</p>
                  <p className="text-[11px] text-muted mt-1">{m.exp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8.6 Who We Serve (Individual vs Fleet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-card border border-line shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-btn bg-orange-tint flex items-center justify-center text-orange-deep">
              <User className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-bold text-navy">
              {locale === 'am' ? 'የግል የመኪና ባለቤቶች' : 'Private Vehicle Owners'}
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              {locale === 'am'
                ? 'ለዕለታዊ የከተማ አሽከርካሪዎች መደበኛ ሰርቪስ፣ ፈጣን ምርመራ እና በስልክ የሚከታተሉት የቀጠሮ ስርዓት።'
                : 'Scheduled oil changes, brake pads, diagnostic scans, and hassle-free online booking.'}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedServiceSlug('computer-diagnostics');
                setCurrentView('book');
              }}
            >
              <span>{locale === 'am' ? 'የግል ቀጠሮ ይያዙ' : 'Book Personal Service'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

          <div className="bg-navy text-white p-8 rounded-card border border-slate-800 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-btn bg-slate-800 flex items-center justify-center text-orange-signal">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-bold text-white">
              {locale === 'am' ? 'ድርጅቶችና የንግድ ፍሊቶች' : 'Corporate Fleets'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {locale === 'am'
                ? 'ለተቋማትና ኩባንያዎች የተዘጋጀ የፍሊት ውል፣ ቅድሚያ የሚሰጠው የቦታ አገልግሎትና ወርሃዊ የቴክኒክ ሪፖርት።'
                : 'Commercial fleet preventative maintenance contracts, monthly telemetry audits, and priority turnaround.'}
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setSelectedServiceSlug('fleet');
                setCurrentView('book');
              }}
            >
              <span>{locale === 'am' ? 'ለድርጅት ቀጠሮ ይያዙ' : 'Book Corporate Fleet'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
