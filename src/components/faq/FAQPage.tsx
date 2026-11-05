import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_FAQS } from '../../lib/constants';
import { Search, Plus, Minus, Send, Phone, HelpCircle } from 'lucide-react';
import { Button } from '../common/Button';

export const FAQPage: React.FC = () => {
  const { locale, setCurrentView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<'all' | 'booking' | 'services' | 'pricing' | 'account'>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleAccordion = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(prev => prev.filter(item => item !== id));
    } else {
      setOpenIds(prev => [...prev, id]);
    }
  };

  const filteredFaqs = INITIAL_FAQS.filter((faq) => {
    const matchesCat = selectedCat === 'all' || faq.category === selectedCat;
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      faq.questionAm.toLowerCase().includes(query) ||
      faq.questionEn.toLowerCase().includes(query) ||
      faq.answerAm.toLowerCase().includes(query) ||
      faq.answerEn.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="py-12 md:py-20 bg-mist min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-orange-deep text-xs font-bold uppercase tracking-wider">
            {locale === 'am' ? 'እገዛና ማብራሪያ' : 'Help & Answers'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
            {locale === 'am' ? 'ተደጋጋሚ ጥያቄዎች (FAQ)' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-muted text-xs sm:text-sm max-w-xl mx-auto">
            {locale === 'am'
              ? 'ስለ ቀጠሮ አያያዝ፣ ክፍያ፣ አገልግሎቶችና ማሳወቂያዎች የተለመዱ ጥያቄዎችና መልሶቻቸው።'
              : 'Clear answers about booking, pricing, engineer inspection, and notifications.'}
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-lg mx-auto relative">
            <Search className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={locale === 'am' ? 'ጥያቄዎን እዚህ ይፈልጉ...' : 'Search questions here...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 text-sm bg-white border border-line rounded-input shadow-sm focus:ring-2 focus:ring-orange-signal focus:outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', labelAm: 'ሁሉም', labelEn: 'All' },
              { id: 'booking', labelAm: 'ቀጠሮ', labelEn: 'Booking' },
              { id: 'services', labelAm: 'አገልግሎቶች', labelEn: 'Services' },
              { id: 'pricing', labelAm: 'ዋጋና ክፍያ', labelEn: 'Pricing' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedCat === cat.id
                    ? 'bg-orange-signal text-navy border-orange-signal shadow-sm'
                    : 'bg-white text-slate-700 border-line hover:bg-slate-200'
                }`}
              >
                {locale === 'am' ? cat.labelAm : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-card border border-line shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 select-none hover:bg-mist/50"
                >
                  <span className="font-bold text-navy text-sm sm:text-base">
                    {locale === 'am' ? faq.questionAm : faq.questionEn}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-mist flex items-center justify-center text-navy shrink-0 border border-line">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-line/60 bg-mist/30">
                    <p>{locale === 'am' ? faq.answerAm : faq.answerEn}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-card border border-line p-8">
              <HelpCircle className="w-10 h-10 text-muted mx-auto mb-2" />
              <p className="text-sm font-bold text-navy">
                {locale === 'am' ? 'ምንም ጥያቄ አልተገኘም' : 'No matching questions found'}
              </p>
              <p className="text-xs text-muted mt-1">
                {locale === 'am' ? 'እባክዎ የተለየ የፍለጋ ቃል ይጠቀሙ ወይም በቴሌግራም ያነጋግሩን።' : 'Try another search term or contact us on Telegram.'}
              </p>
            </div>
          )}
        </div>

        {/* Still Have Questions Card (PRD 13) */}
        <div className="bg-navy text-white rounded-banner p-8 text-center space-y-4">
          <h3 className="text-xl font-bold">
            {locale === 'am' ? 'መልስ አላገኙም?' : 'Still have unanswered questions?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            {locale === 'am'
              ? 'የቴክኒክ ቡድናችን በቴሌግራም ወይም በስልክ ፈጣን ምላሽ ለመስጠት ዝግጁ ነው።'
              : 'Our technical support desk is available on Telegram and direct phone.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://t.me/AbegazMotors"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-btn bg-[#229ED9] text-white font-bold text-xs sm:text-sm hover:bg-[#1D8BC0]"
            >
              <Send className="w-4 h-4" />
              <span>Telegram @AbegazMotors</span>
            </a>
            <a
              href="tel:+251911234567"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-btn bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-700"
            >
              <Phone className="w-4 h-4 text-orange-signal" />
              <span>+251 911 234 567</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
