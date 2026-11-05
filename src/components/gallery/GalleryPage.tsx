import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_GALLERY } from '../../lib/constants';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { 
  X, 
  Play, 
  Calendar, 
  Image as ImageIcon, 
  Film, 
  Sparkles, 
  Maximize2,
  Wrench,
  CheckCircle2,
  Layers,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '../common/Button';

// Gallery media items with videos and images
interface WorkshopVideo {
  id: string;
  titleAm: string;
  titleEn: string;
  category: 'mechanical' | 'electrical' | 'body' | 'ev_hybrid';
  thumbnailUrl: string;
  videoUrl?: string; // Embedded video or youtube/mp4 link
  duration: string;
}

const WORKSHOP_VIDEOS: WorkshopVideo[] = [
  {
    id: 'vid-1',
    titleAm: 'የሞተር ሙሉ ተሃድሶና ልኬት በወርክሾፑ ውስጥ',
    titleEn: 'Engine Overhaul & Precision Calibration Inside Workshop',
    category: 'mechanical',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    duration: '02:45'
  },
  {
    id: 'vid-2',
    titleAm: 'የሻሲ ማስተካከልና ኦሪጅናል የስፕሬይ ቀለም ሂደት',
    titleEn: 'Chassis Alignment & Oven Baked Spray Paint Process',
    category: 'body',
    thumbnailUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    duration: '01:30'
  },
  {
    id: 'vid-3',
    titleAm: 'የኮምፒውተር ዲያግኖስቲክስና የኤሌክትሪክ ፍተሻ',
    titleEn: 'Computer Diagnostics & ECU Scanner Live Demo',
    category: 'electrical',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
    duration: '03:15'
  },
  {
    id: 'vid-4',
    titleAm: 'የሃይብሪድ ባትሪ ሴል ምርመራና ጥገና',
    titleEn: 'EV & Hybrid High-Voltage Battery Cell Health Audit',
    category: 'ev_hybrid',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    duration: '02:10'
  }
];

export const GalleryPage: React.FC = () => {
  const { locale, setCurrentView, setSelectedServiceSlug } = useApp();
  const [activeTab, setActiveTab] = useState<'beforeAfter' | 'photos' | 'videos'>('beforeAfter');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<WorkshopVideo | null>(null);

  // Filter Before & After items
  const filteredBeforeAfter = INITIAL_GALLERY.filter((item) => {
    if (selectedPillar === 'all') return true;
    if (selectedPillar === 'mechanical') return item.category === 'engine' || item.category === 'brakes' || item.category === 'suspension';
    if (selectedPillar === 'body') return item.category === 'body';
    return item.category === selectedPillar;
  });

  // Filter videos
  const filteredVideos = WORKSHOP_VIDEOS.filter((v) => {
    if (selectedPillar === 'all') return true;
    return v.category === selectedPillar;
  });

  const handleBook = () => {
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-10 md:py-16 bg-mist min-h-screen pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Hero Header - Clean & direct, no zbaznke */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-navy tracking-tight">
            {locale === 'am' ? 'የተሰሩ ስራዎች ማህደር' : 'Work Showcase & Gallery'}
          </h1>
          <p className="text-muted text-sm sm:text-base mt-2">
            {locale === 'am' 
              ? 'ከመጠገኑ በፊት እና በኋላ የተሰሩ ስራዎች፣ ቪዲዮዎችና የዎርክሾፕ ምስሎች'
              : 'Before & After transformations, workshop videos, and project photos.'}
          </p>

          {/* Simple Tab Switcher: Before & After | Videos | Photos */}
          <div className="mt-6 inline-flex p-1.5 bg-white rounded-2xl border border-line shadow-xs gap-1.5">
            <button
              onClick={() => setActiveTab('beforeAfter')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'beforeAfter'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy hover:bg-mist'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-orange-signal" />
              <span>{locale === 'am' ? 'ከመጠገኑ በፊትና በኋላ (Before & After)' : 'Before & After'}</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'videos'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy hover:bg-mist'
              }`}
            >
              <Film className="w-4 h-4 text-orange-signal" />
              <span>{locale === 'am' ? 'ቪዲዮዎች (Videos)' : 'Videos'}</span>
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'photos'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-navy hover:bg-mist'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-orange-signal" />
              <span>{locale === 'am' ? 'ፎቶዎች (Photos)' : 'Photos'}</span>
            </button>
          </div>
        </div>

        {/* 1. BEFORE & AFTER SECTION - Clean Image-Only Comparison */}
        {activeTab === 'beforeAfter' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBeforeAfter.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl overflow-hidden border border-line shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                {/* Visual Before & After Slider - Pure Visual Focus */}
                <div className="relative p-2.5 bg-slate-900">
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    beforeLabel={locale === 'am' ? 'በፊት' : 'Before'}
                    afterLabel={locale === 'am' ? 'በኋላ' : 'After'}
                    aspectRatio="aspect-[4/3]"
                  />

                  {/* License Plate / Vehicle Tag Overlay */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
                    <span className="bg-navy/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-700 shadow-sm">
                      {item.vehicle}
                    </span>
                  </div>

                  {/* Expand Lightbox Button */}
                  <button 
                    onClick={() => setActiveLightboxImage(item.afterImage)}
                    className="absolute top-4 right-4 z-20 p-2 bg-navy/80 hover:bg-navy text-white rounded-full transition-all shadow-md"
                    title={locale === 'am' ? 'አጉላ' : 'Inspect'}
                  >
                    <Maximize2 className="w-4 h-4 text-orange-signal" />
                  </button>
                </div>

                {/* Minimal Card Footer: Vehicle + Quick Booking CTA */}
                <div className="p-4 flex items-center justify-between gap-3 bg-white">
                  <div>
                    <h3 className="text-sm font-black text-navy truncate max-w-[180px]">
                      {locale === 'am' ? item.titleAm : item.titleEn}
                    </h3>
                    <span className="text-[11px] text-muted font-mono block mt-0.5">
                      🇪🇹 {item.plate}
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleBook}
                    className="text-xs h-8 px-3"
                  >
                    <span>{locale === 'am' ? 'ቀጠሮ ያዝ' : 'Book'}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. VIDEOS SECTION - Workshop in Action */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {filteredVideos.map((vid) => (
              <div 
                key={vid.id}
                onClick={() => setActiveVideoModal(vid)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-line shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img 
                    src={vid.thumbnailUrl} 
                    alt={vid.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors" />

                  {/* Glowing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-orange-signal text-navy flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-navy ml-1" />
                    </div>
                  </div>

                  {/* Video Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-navy/90 text-white text-xs font-mono font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                    {vid.duration}
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between gap-3">
                  <h3 className="text-sm sm:text-base font-extrabold text-navy group-hover:text-orange-deep transition-colors">
                    {locale === 'am' ? vid.titleAm : vid.titleEn}
                  </h3>
                  <span className="text-xs font-bold text-orange-deep shrink-0">
                    {locale === 'am' ? 'ተመልከት ›' : 'Watch ›'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. PHOTOS SECTION - Real Workshop Photos */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { src: '/hero-signboard.jpg', alt: 'Abegaz Motors Workshop Signboard' },
              { src: '/hero-banner.png', alt: 'Official Signboard Graphic' },
              { src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80', alt: 'Panel restoration' },
              { src: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80', alt: 'Paint bake finish' },
              { src: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80', alt: 'Engine bay' },
              { src: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80', alt: 'Master mechanic rebuild' },
              { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', alt: '4x4 chassis work' },
              { src: 'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=800&q=80', alt: 'Commercial vehicle bay' },
            ].map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveLightboxImage(img.src)}
                className="group cursor-pointer relative aspect-square overflow-hidden rounded-2xl border border-line bg-slate-900 shadow-xs hover:shadow-lg transition-all"
              >
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors flex items-center justify-center">
                  <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal for Photo Inspection */}
      {activeLightboxImage && (
        <div 
          onClick={() => setActiveLightboxImage(null)}
          className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-orange-signal"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={activeLightboxImage} 
              alt="Enlarged view" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl border border-slate-700" 
            />
          </div>
        </div>
      )}

      {/* Video Modal Preview */}
      {activeVideoModal && (
        <div 
          onClick={() => setActiveVideoModal(null)}
          className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl"
          >
            <div className="p-4 bg-slate-800 flex items-center justify-between text-white border-b border-slate-700">
              <h3 className="text-sm sm:text-base font-bold">
                {locale === 'am' ? activeVideoModal.titleAm : activeVideoModal.titleEn}
              </h3>
              <button 
                onClick={() => setActiveVideoModal(null)}
                className="p-1 hover:text-orange-signal text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img 
                src={activeVideoModal.thumbnailUrl} 
                alt="Video poster" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute text-center space-y-3 p-6">
                <div className="w-16 h-16 rounded-full bg-orange-signal text-navy flex items-center justify-center mx-auto shadow-xl">
                  <Play className="w-8 h-8 fill-navy ml-1" />
                </div>
                <p className="text-white text-xs sm:text-sm font-semibold max-w-md">
                  {locale === 'am'
                    ? 'የአበጋዝ ሞተርስ ኢንጂነሪንግ የወርክሾፕ የጥገና ቪዲዮ (በቦታው የተቀረጸ)'
                    : 'Abegaz Motors Workshop Engineering Footage (Recorded Live on Bay)'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">⏱ {activeVideoModal.duration}</span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setActiveVideoModal(null);
                  handleBook();
                }}
              >
                <span>{locale === 'am' ? 'ቀጠሮ ይያዙ' : 'Book Bay'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
