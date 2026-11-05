import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_GALLERY } from '../../lib/constants';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { 
  X, 
  Eye, 
  Calendar, 
  MapPin, 
  Wrench, 
  ShieldCheck, 
  SlidersHorizontal, 
  Layers, 
  SplitSquareVertical, 
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { GalleryItem } from '../../types';
import { Button } from '../common/Button';

export const GalleryPage: React.FC = () => {
  const { locale, setCurrentView, setSelectedServiceSlug } = useApp();
  const [filter, setFilter] = useState<'all' | 'body' | 'engine' | 'brakes' | 'suspension'>('all');
  const [viewMode, setViewMode] = useState<'slider' | 'toggle' | 'split'>('slider');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  
  // Track toggle states for individual cards when in 'toggle' mode: { [id]: 'before' | 'after' }
  const [cardToggleState, setCardToggleState] = useState<Record<string, 'before' | 'after'>>({});

  const filteredItems = INITIAL_GALLERY.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const getCardState = (id: string) => cardToggleState[id] || 'after';

  const toggleCard = (id: string, state: 'before' | 'after') => {
    setCardToggleState((prev) => ({ ...prev, [id]: state }));
  };

  const handleBookRepair = (category: string) => {
    // Map gallery category to service slug
    const slugMap: Record<string, string> = {
      body: 'body-repair-paint',
      engine: 'engine-overhaul',
      brakes: 'brake-system-service',
      suspension: 'suspension-steering'
    };
    if (slugMap[category]) {
      setSelectedServiceSlug(slugMap[category]);
    }
    setCurrentView('book');
  };

  return (
    <div className="py-10 md:py-16 bg-mist min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ethiopian Header & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-tint text-orange-deep text-xs font-bold mb-3 border border-orange-200">
            <span className="text-sm">🇪🇹</span>
            <span>
              {locale === 'am' 
                ? 'የኢትዮጵያ ተሽከርካሪዎች እድሳትና ጥገና ማህደር' 
                : 'Ethiopian Vehicle Rebuild & Restoration Portfolio'}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight">
            {locale === 'am' ? 'የተሰሩ ስራዎች ጋለሪ (ከመጠገኑ በፊት እና በኋላ)' : 'Before & After Engineering Gallery'}
          </h1>
          
          <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
            {locale === 'am'
              ? 'በአዲስ አበባ ጎዳናዎች ላይ የተጎዱ ተሽከርካሪዎች (ቪትዝ፣ ዲዛየር፣ ፕራዶ፣ አይሱዙ...) በአበጋዝ ሞተርስ ኢንጂነሪንግ እንዴት ወደ ፋብሪካ ጥራታቸው እንደተመለሱ በእውነተኛ ፎቶዎች ይመልከቱ።'
              : 'Real Ethiopian workshop repairs in Addis Ababa (Toyota Vitz, Suzuki Dzire, Prado, Isuzu trucks). Compare severe collision & mechanical damage to our precision restored finish.'}
          </p>

          {/* Controls Bar: Category Filters & Display Mode Switcher */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white rounded-card border border-line shadow-sm">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {[
                { id: 'all', labelAm: 'ሁሉም መኪኖች', labelEn: 'All Vehicles' },
                { id: 'body', labelAm: 'የቦዲና ቀለም', labelEn: 'Body & Paint' },
                { id: 'engine', labelAm: 'የሞተር እድሳት', labelEn: 'Engine Overhaul' },
                { id: 'brakes', labelAm: 'ብሬክና ሌዝ', labelEn: 'Brakes & Lathe' },
                { id: 'suspension', labelAm: 'ሱስፔንሽን 4x4', labelEn: '4x4 Suspension' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    filter === f.id
                      ? 'bg-orange-signal text-navy shadow-sm'
                      : 'bg-mist text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {locale === 'am' ? f.labelAm : f.labelEn}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-mist p-1 rounded-full border border-line shrink-0">
              <span className="text-[11px] font-bold text-muted px-2 hidden md:inline">
                {locale === 'am' ? 'የእይታ ዓይነት:' : 'Mode:'}
              </span>
              <button
                onClick={() => setViewMode('slider')}
                title={locale === 'am' ? 'በይነ-ተግባራዊ ስላይደር' : 'Interactive Slider'}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'slider'
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{locale === 'am' ? 'ስላይደር' : 'Slider'}</span>
              </button>
              
              <button
                onClick={() => setViewMode('toggle')}
                title={locale === 'am' ? 'ፈጣን መቀያየሪያ' : 'Quick Toggle'}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'toggle'
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{locale === 'am' ? 'ቅያሪ (Toggle)' : 'Toggle'}</span>
              </button>

              <button
                onClick={() => setViewMode('split')}
                title={locale === 'am' ? 'ጎን ለጎን' : 'Side by Side'}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'split'
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy'
                }`}
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{locale === 'am' ? 'ጎን ለጎን' : 'Side-by-Side'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const cardState = getCardState(item.id);
            const activeImage = cardState === 'before' ? item.beforeImage : item.afterImage;

            return (
              <div 
                key={item.id} 
                className="bg-white rounded-card overflow-hidden border border-line shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                {/* 1. Header: Plate, Location & Completion Date */}
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    {/* Ethiopian License Plate badge */}
                    <div className="flex items-center bg-white text-navy px-2 py-0.5 rounded border-2 border-slate-700 shadow-xs font-mono font-black text-xs tracking-wider">
                      <span className="mr-1 text-[11px]">🇪🇹</span>
                      <span>{item.plate}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-300 truncate max-w-[140px] sm:max-w-[180px]">
                      {item.vehicle}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-orange-signal font-semibold shrink-0">
                    <MapPin className="w-3 h-3" />
                    <span>{locale === 'am' ? item.locationAm : item.locationEn}</span>
                  </div>
                </div>

                {/* 2. Visual Transformation Area based on viewMode */}
                <div className="relative bg-slate-100">
                  {viewMode === 'slider' && (
                    <div className="p-2.5 bg-slate-100">
                      <BeforeAfterSlider
                        beforeImage={item.beforeImage}
                        afterImage={item.afterImage}
                        beforeLabel={locale === 'am' ? 'ከመጠገኑ በፊት' : 'Before Damage'}
                        afterLabel={locale === 'am' ? 'ከጥገና በኋላ' : 'After Restored'}
                        aspectRatio="aspect-[4/3]"
                      />
                    </div>
                  )}

                  {viewMode === 'toggle' && (
                    <div className="relative aspect-[4/3] overflow-hidden group">
                      <img
                        src={activeImage}
                        alt={item.titleEn}
                        className="w-full h-full object-cover transition-opacity duration-300"
                        loading="lazy"
                      />
                      
                      {/* Floating Indicator Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        {cardState === 'before' ? (
                          <span className="inline-flex items-center gap-1 bg-red-600/95 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-xs">
                            <AlertTriangle className="w-3 h-3" />
                            {locale === 'am' ? 'ከመጠገኑ በፊት (የተጎዳ)' : 'Before (Damaged)'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-emerald-600/95 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-xs">
                            <CheckCircle2 className="w-3 h-3" />
                            {locale === 'am' ? 'ከጥገና በኋላ (የተስተካከለ)' : 'After (Restored)'}
                          </span>
                        )}
                      </div>

                      {/* Interactive Flip Controller Pill */}
                      <div className="absolute bottom-3 inset-x-3 flex justify-center z-10">
                        <div className="bg-navy/85 backdrop-blur-md p-1 rounded-full shadow-lg border border-slate-700 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => toggleCard(item.id, 'before')}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                              cardState === 'before'
                                ? 'bg-red-500 text-white shadow-xs'
                                : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            {locale === 'am' ? 'በፊት' : 'Before'}
                          </button>
                          <span className="text-slate-500 text-xs">⇄</span>
                          <button
                            type="button"
                            onClick={() => toggleCard(item.id, 'after')}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                              cardState === 'after'
                                ? 'bg-emerald-500 text-white shadow-xs'
                                : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            {locale === 'am' ? 'በኋላ' : 'After'}
                          </button>
                        </div>
                      </div>

                      {/* Lightbox trigger overlay */}
                      <button 
                        onClick={() => setActiveLightbox(item)}
                        className="absolute top-3 right-3 p-2 bg-navy/80 hover:bg-navy text-white rounded-full transition-all shadow-md"
                        title={locale === 'am' ? 'አጉላ' : 'Inspect'}
                      >
                        <Maximize2 className="w-4 h-4 text-orange-signal" />
                      </button>
                    </div>
                  )}

                  {viewMode === 'split' && (
                    <div className="grid grid-cols-2 gap-1 p-2 bg-slate-900">
                      <div className="relative aspect-square overflow-hidden rounded-md">
                        <img 
                          src={item.beforeImage} 
                          alt="Before" 
                          className="w-full h-full object-cover" 
                          loading="lazy" 
                        />
                        <span className="absolute bottom-1 left-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {locale === 'am' ? 'በፊት' : 'Before'}
                        </span>
                      </div>
                      <div className="relative aspect-square overflow-hidden rounded-md">
                        <img 
                          src={item.afterImage} 
                          alt="After" 
                          className="w-full h-full object-cover" 
                          loading="lazy" 
                        />
                        <span className="absolute bottom-1 left-1 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {locale === 'am' ? 'በኋላ' : 'After'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Diagnostic & Engineering Breakdown */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-navy mb-2 leading-snug">
                      {locale === 'am' ? item.titleAm : item.titleEn}
                    </h3>

                    {/* Problem vs Solution Callout */}
                    <div className="space-y-2 mt-3 text-xs">
                      <div className="bg-red-50/80 border border-red-200/80 p-2.5 rounded-btn flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0" />
                        <div>
                          <span className="font-bold text-red-900 block text-[11px] uppercase tracking-wide">
                            {locale === 'am' ? 'የነበረው ጉዳት / ብልሽት:' : 'Fault / Damage:'}
                          </span>
                          <p className="text-red-800 leading-relaxed mt-0.5">
                            {locale === 'am' ? item.beforeDescriptionAm : item.beforeDescriptionEn}
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-50/80 border border-emerald-200/80 p-2.5 rounded-btn flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                        <div>
                          <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wide">
                            {locale === 'am' ? 'የተከናወነው የምህንድስና ስራ:' : 'Engineering Solution:'}
                          </span>
                          <p className="text-emerald-800 leading-relaxed mt-0.5">
                            {locale === 'am' ? item.afterDescriptionAm : item.afterDescriptionEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Footer of Card: Ethiopian Completion Date + Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-line flex items-center justify-between gap-2">
                    <span className="text-[11px] text-muted flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.dateCompleted}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setActiveLightbox(item)}
                        className="px-2.5 py-1.5 rounded-btn bg-slate-100 hover:bg-slate-200 text-navy font-bold text-xs flex items-center gap-1 transition-colors"
                        title={locale === 'am' ? 'በሙሉ ማያ አጉላ' : 'Inspect Details'}
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-600" />
                        <span className="hidden sm:inline">{locale === 'am' ? 'አጉላ' : 'Inspect'}</span>
                      </button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleBookRepair(item.category)}
                        className="text-xs h-8 px-2.5"
                      >
                        <Wrench className="w-3 h-3 mr-1" />
                        <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book'}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethiopian Workshop Standards Notice */}
        <div className="mt-12 bg-white rounded-card p-6 border border-line shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-tint flex items-center justify-center text-orange-deep shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-navy">
                {locale === 'am' 
                  ? 'የአበጋዝ ሞተርስ 100% የጥራት ዋስትና (Original Parts & Laser Alignment)' 
                  : 'Abegaz Certified Repair Standard with OEM Parts'}
              </h4>
              <p className="text-xs sm:text-sm text-muted mt-0.5">
                {locale === 'am'
                  ? 'በወርክሾፓችን የሚሰሩ ሁሉም የቦዲ፣ የቀለም፣ የሞተርና የሻሲ ስራዎች የ 6 ወር የጽሁፍ ዋስትና ይሰጣቸዋል።'
                  : 'Every major collision realignment, engine overhaul and paint job comes with written 6-month engineering warranty.'}
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setCurrentView('book')}
            className="shrink-0"
          >
            <span>{locale === 'am' ? 'የመኪናዎን ቀጠሮ አሁኑኑ ይያዙ' : 'Book Your Vehicle Now'}</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* Lightbox / High-Resolution Inspection Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-5xl w-full bg-slate-900 rounded-card overflow-hidden border border-slate-700 shadow-2xl my-auto">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white text-navy px-2.5 py-0.5 rounded border border-slate-600 font-mono font-black text-sm tracking-wider">
                  🇪🇹 {activeLightbox.plate}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {locale === 'am' ? activeLightbox.titleAm : activeLightbox.titleEn}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                    <span>{activeLightbox.vehicle}</span>
                    <span>•</span>
                    <span className="text-orange-signal">{locale === 'am' ? activeLightbox.locationAm : activeLightbox.locationEn}</span>
                    <span>•</span>
                    <span className="text-slate-400">{activeLightbox.dateCompleted}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveLightbox(null)}
                className="w-9 h-9 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Interactive Slider */}
            <div className="p-4 sm:p-6 bg-slate-950">
              <BeforeAfterSlider
                beforeImage={activeLightbox.beforeImage}
                afterImage={activeLightbox.afterImage}
                beforeLabel={locale === 'am' ? 'ከመጠገኑ በፊት (የተጎዳ)' : 'Before Repair'}
                afterLabel={locale === 'am' ? 'ከጥገና በኋላ (የተስተካከለ)' : 'After Restored'}
                aspectRatio="aspect-[16/10]"
              />
              <p className="text-center text-xs text-slate-400 mt-3">
                {locale === 'am' 
                  ? 'የተንሸራታች ምልክቱን ወደ ግራ ወይም ቀኝ በመጎተት የጥገናውን ውጤት ያወዳድሩ ⇄' 
                  : 'Drag handle horizontally to compare before and after repair quality ⇄'}
              </p>
            </div>

            {/* Modal Technical Details & Booking Action */}
            <div className="p-5 bg-slate-900 border-t border-slate-800 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="bg-red-950/40 border border-red-900/60 p-3.5 rounded-btn">
                  <span className="text-red-400 font-bold text-xs uppercase tracking-wider block mb-1">
                    {locale === 'am' ? 'የነበረው ብልሽት:' : 'Initial Damage:'}
                  </span>
                  <p className="text-xs text-red-200 leading-relaxed">
                    {locale === 'am' ? activeLightbox.beforeDescriptionAm : activeLightbox.beforeDescriptionEn}
                  </p>
                </div>

                <div className="bg-emerald-950/40 border border-emerald-900/60 p-3.5 rounded-btn">
                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider block mb-1">
                    {locale === 'am' ? 'የተከናወነው የምህንድስና ስራ:' : 'Restoration Method:'}
                  </span>
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    {locale === 'am' ? activeLightbox.afterDescriptionAm : activeLightbox.afterDescriptionEn}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Sparkles className="w-4 h-4 text-orange-signal" />
                  <span>
                    {locale === 'am' 
                      ? 'የተከናወነው በአበጋዝ ሞተርስ ሰርተፊኬት ባላቸው ሜካኒኮች ነው።' 
                      : 'Certified by Abegaz Motors Master Workshop Engineers.'}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveLightbox(null)}
                    className="flex-1 sm:flex-initial text-slate-300 border-slate-700 hover:bg-slate-800"
                  >
                    <span>{locale === 'am' ? 'ዝጋ' : 'Close'}</span>
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setActiveLightbox(null);
                      handleBookRepair(activeLightbox.category);
                    }}
                    className="flex-1 sm:flex-initial"
                  >
                    <Wrench className="w-3.5 h-3.5 mr-1.5" />
                    <span>{locale === 'am' ? 'ይህን መሰል ቀጠሮ ይያዙ' : 'Book Similar Repair'}</span>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
