import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, X, CheckCircle2, Clock, Send, Calendar } from 'lucide-react';
import { Button } from '../common/Button';

export const PackagesPage: React.FC = () => {
  const { locale, setCurrentView, setSelectedServiceSlug, packages } = useApp();
  const [clientType, setClientType] = useState<'individual' | 'corporate'>('individual');

  const filteredPackages = clientType === 'individual'
    ? packages.filter(p => p.clientType !== 'fleet')
    : packages;

  const comparisonFeatures = [
    { nameAm: 'የሞተር ዘይትና ፊልተር ቅየራ', nameEn: 'Engine oil & filter change', p1: true, p2: true, p3: true },
    { nameAm: 'የኮምፒውተር ፈጣን OBD ስካን', nameEn: 'Quick OBD-II diagnostic scan', p1: true, p2: true, p3: true },
    { nameAm: 'የብሬክ ፓድና ዲስክ ፍተሻ', nameEn: 'Brake pad & rotor check', p1: true, p2: true, p3: true },
    { nameAm: 'ሙሉ የኮምፒውተር ዲያግኖስቲክስ ሪፖርት', nameEn: 'Full diagnostic report', p1: false, p2: true, p3: true },
    { nameAm: 'የኤርኮንዲሽነር (AC) ፍተሻና ማጽዳት', nameEn: 'AC performance check', p1: false, p2: true, p3: true },
    { nameAm: 'የ 50 ነጥብ የምህንድስና ሰርተፍኬት', nameEn: '50-point engineering cert', p1: false, p2: true, p3: true },
    { nameAm: 'ቅድሚያ የሚሰጠው የ 24 ሰዓት ክፍት ቦታ', nameEn: 'Priority 24-hr workshop bay', p1: false, p2: false, p3: true },
    { nameAm: 'ወርሃዊ የፍሊት ቴሌሜትሪ ሪፖርት', nameEn: 'Monthly fleet telemetry report', p1: false, p2: false, p3: true },
  ];

  return (
    <div className="py-12 md:py-20 bg-mist min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">

          <h1 className="text-3xl sm:text-5xl font-black text-blue-900 mt-3 tracking-tight">
            {locale === 'am' ? 'የተሟሉ የሰርቪስ ጥቅሎች' : 'Comprehensive Care Packages'}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-3">
            {locale === 'am'
              ? 'ለግል ተሽከርካሪዎ ወይም ለድርጅትዎ የሚስማማውን ጥቅል ይምረጡ። ዋጋዎች እንደ መኪናው ሁኔታ ሊለያዩ ይችላሉ።'
              : 'Pick the optimal maintenance tier. Transparent pricing with verified engineering standards.'}
          </p>

          {/* Individual vs Corporate Segmented control */}
          <div className="mt-6 inline-flex p-1 bg-white rounded-btn border border-line shadow-sm">
            <button
              onClick={() => setClientType('individual')}
              className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${
                clientType === 'individual' ? 'bg-red-600 text-white shadow-xs' : 'text-blue-700 hover:text-red-600'
              }`}
            >
              {locale === 'am' ? 'የግል መኪና' : 'Individual'}
            </button>
            <button
              onClick={() => setClientType('corporate')}
              className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${
                clientType === 'corporate' ? 'bg-red-600 text-white shadow-xs' : 'text-blue-700 hover:text-red-600'
              }`}
            >
              {locale === 'am' ? 'ድርጅት / ፍሊት' : 'Corporate / Fleet'}
            </button>
          </div>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {filteredPackages.map((pkg) => {
            const isFav = pkg.featured;
            return (
              <div
                key={pkg.id}
                className={`rounded-card p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  isFav
                    ? 'border-2 border-orange-signal bg-white shadow-xl relative scale-100 lg:scale-105 z-10'
                    : 'border border-line bg-white shadow-sm'
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
                  <p className="text-xs text-muted leading-relaxed mb-4">
                    {locale === 'am' ? pkg.descriptionAm : pkg.descriptionEn}
                  </p>

                  <div className="text-3xl sm:text-4xl font-extrabold text-navy my-4 font-mono">
                    {pkg.price.toLocaleString()} <span className="text-sm font-bold text-muted">ETB</span>
                  </div>

                  <p className="text-xs text-slate-500 mb-6 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{pkg.durationHours} {locale === 'am' ? 'ሰዓት' : 'hours'}</span>
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      {locale === 'am' ? 'የሚካተቱ፦' : 'What is included:'}
                    </p>
                    {(locale === 'am' ? pkg.includedAm : pkg.includedEn).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>

                  {pkg.notIncludedAm && pkg.notIncludedAm.length > 0 && (
                    <div className="space-y-1.5 mb-6 pt-4 border-t border-line">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {locale === 'am' ? 'የማይካተቱ፦' : 'Not included:'}
                      </p>
                      {(locale === 'am' ? pkg.notIncludedAm : pkg.notIncludedEn).map((nInc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                          <X className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          <span>{nInc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  variant={isFav ? 'brand' : 'outline'}
                  size="md"
                  fullWidth
                  onClick={() => {
                    setSelectedServiceSlug(pkg.slug);
                    setCurrentView('book');
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{locale === 'am' ? 'ይህን ጥቅል ይያዙ' : 'Select Package'}</span>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Comparison Table (PRD 10.4) */}
        <div className="bg-white rounded-banner p-6 sm:p-8 border border-line shadow-sm mb-16 overflow-x-auto">
          <h3 className="text-lg font-bold text-navy mb-4">
            {locale === 'am' ? 'የጥቅሎች ንጽጽር ሰንጠረዥ' : 'Package Comparison Matrix'}
          </h3>
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-line bg-mist">
                <th className="py-3 px-4 font-bold text-navy">{locale === 'am' ? 'ባህሪ / አገልግሎት' : 'Service Feature'}</th>
                <th className="py-3 px-4 font-bold text-navy text-center">መሰረታዊ (Basic)</th>
                <th className="py-3 px-4 font-bold text-navy text-center text-orange-deep bg-orange-tint/40">ምህንድስና (Precision)</th>
                <th className="py-3 px-4 font-bold text-navy text-center">ፍሊት (Fleet)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, i) => (
                <tr key={i} className="border-b border-line hover:bg-mist/50">
                  <td className="py-3 px-4 font-medium text-slate-700">
                    {locale === 'am' ? row.nameAm : row.nameEn}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.p1 ? <Check className="w-4 h-4 text-green-600 mx-auto stroke-[2.5]" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-3 px-4 text-center bg-orange-tint/20 font-bold">
                    {row.p2 ? <Check className="w-4 h-4 text-green-600 mx-auto stroke-[2.5]" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.p3 ? <Check className="w-4 h-4 text-green-600 mx-auto stroke-[2.5]" /> : <span className="text-slate-300">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-b from-blue-50/70 to-blue-100/50 text-slate-800 rounded-banner p-8 border-2 border-blue-200 text-center space-y-4 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-black text-blue-900">
            {locale === 'am' ? 'የሚስማማዎትን ጥቅል አልለዩም?' : 'Need guidance choosing the right package?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            {locale === 'am' ? 'በቴሌግራም አጭር መልእክት ይላኩልን፤ ባለሙያችን በቀጥታ ይመክራችኋል።' : 'Consult our engineering desk on Telegram for an accurate tailored assessment.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://t.me/AbegazMotors"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-btn bg-[#229ED9] text-white font-bold hover:bg-[#1D8BC0] transition-colors text-xs sm:text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Telegram @AbegazMotors</span>
            </a>
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentView('book')}
            >
              <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Appointment'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
