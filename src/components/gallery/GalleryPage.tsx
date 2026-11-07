import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_GALLERY } from '../../lib/constants';
import { 
  VEHICLES_DATA, 
  VEHICLE_CATEGORIES, 
  VehicleModel 
} from '../../lib/vehiclesData';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { 
  X, 
  Play, 
  Film, 
  SlidersHorizontal,
  Car,
  ChevronDown,
  ArrowRight,
  Maximize2,
  Search
} from 'lucide-react';
import { Button } from '../common/Button';

// Gallery media items with videos
interface WorkshopVideo {
  id: string;
  titleAm: string;
  titleEn: string;
  category: 'mechanical' | 'electrical' | 'body' | 'ev_hybrid';
  thumbnailUrl: string;
  videoUrl?: string;
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
  const { locale, setCurrentView } = useApp();
  
  // 3 Gallery Tabs: Vehicle Fleet, Before & After, Videos
  const [activeTab, setActiveTab] = useState<'catalog' | 'beforeAfter' | 'videos'>('catalog');
  
  // Category state, Search & Sort
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'nameAsc' | 'nameDesc' | 'brand'>('default');
  
  // Modal states
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<WorkshopVideo | null>(null);

  // Filtered & Sorted Vehicles
  const filteredVehicles = useMemo(() => {
    let result = [...VEHICLES_DATA];

    // Filter by Category
    if (selectedCategorySlug !== 'all') {
      result = result.filter(v => v.category === selectedCategorySlug);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(v => 
        v.name.toLowerCase().includes(q) ||
        v.nameAm.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.bodyType.toLowerCase().includes(q) ||
        v.fuelType.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'nameAsc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'nameDesc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'brand') {
      result.sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategorySlug, searchQuery, sortBy]);

  // Book service for specific vehicle
  const handleBookVehicle = (vehicle: VehicleModel) => {
    try {
      sessionStorage.setItem('selected_vehicle_for_booking', `${vehicle.brand} ${vehicle.name}`);
    } catch (e) {
      // ignore
    }
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGeneralBook = () => {
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Current active category object
  const currentCategoryObj = VEHICLE_CATEGORIES.find(c => c.slug === selectedCategorySlug) || VEHICLE_CATEGORIES[0];

  return (
    <div className="py-8 md:py-14 bg-white min-h-screen pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {locale === 'am' ? 'የምንሰራቸው መኪኖችና የስራ ማህደር' : 'Serviced Vehicles & Work Showcase'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 max-w-2xl mx-auto">
            {locale === 'am' 
              ? 'በአበጋዝ ሞተርስ ኢንጂነሪንግ በኦሪጅናል መለዋወጫዎችና በላቁ ቴክኖሎጂዎች የምንጠግናቸው ሞዴሎች፣ የቀደምት ስራዎች እና ቪዲዮዎች'
              : 'Explore the full spectrum of vehicle models serviced at Abegaz Motors Engineering with certified diagnostic equipment and genuine parts.'}
          </p>

          {/* Clean 3-Column Tab Switcher: Vehicle Fleet | Before & After | Videos */}
          <div className="mt-7 grid grid-cols-3 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-xs max-w-xl mx-auto gap-1">
            {/* 1. Vehicle Fleet Tab */}
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-red-600 hover:bg-white'
              }`}
            >
              <Car className={`w-4 h-4 ${activeTab === 'catalog' ? 'text-white' : 'text-red-600'}`} />
              <span className="truncate">{locale === 'am' ? 'የመኪና ሞዴሎች' : 'Vehicle Fleet'}</span>
            </button>

            {/* 2. Before & After */}
            <button
              onClick={() => setActiveTab('beforeAfter')}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'beforeAfter'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-red-600 hover:bg-white'
              }`}
            >
              <SlidersHorizontal className={`w-4 h-4 ${activeTab === 'beforeAfter' ? 'text-white' : 'text-red-600'}`} />
              <span className="truncate">{locale === 'am' ? 'ከጥገና በፊትና በኋላ' : 'Before & After'}</span>
            </button>

            {/* 3. Videos */}
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'videos'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-red-600 hover:bg-white'
              }`}
            >
              <Film className={`w-4 h-4 ${activeTab === 'videos' ? 'text-white' : 'text-red-600'}`} />
              <span className="truncate">{locale === 'am' ? 'ቪዲዮዎች' : 'Videos'}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: CLEAN WHITE STUDIO VEHICLE FLEET (MATCHING REFERENCE IMAGE UI)
            ========================================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            
            {/* Category Navigation Bar + Search & Sort Controls (Matching Reference Image) */}
            <div className="border-b border-slate-200 pb-4">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                
                {/* Category Menu with Underline for Active Category (like ALL CATEGORIES in reference image) */}
                <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3">
                  {VEHICLE_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategorySlug === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategorySlug(cat.slug)}
                        className={`text-xs sm:text-[13px] tracking-wider uppercase font-bold transition-all pb-1.5 border-b-2 ${
                          isSelected
                            ? 'text-blue-950 border-blue-950'
                            : 'text-slate-400 hover:text-slate-800 border-transparent'
                        }`}
                      >
                        <span>{locale === 'am' ? cat.nameAm : cat.nameEn}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sleek Search & Sort Controls (Aesthetic & Easy) */}
                <div className="flex items-center gap-2.5 shrink-0 self-start xl:self-auto">
                  {/* Clean Search Input with 🔍 */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={locale === 'am' ? 'ሞዴል ይፈልጉ...' : 'Search model...'}
                      className="pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all w-44 sm:w-60 text-slate-900 placeholder:text-slate-400"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        title={locale === 'am' ? 'አጥፋ' : 'Clear'}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Clean Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-full pl-4 pr-8 py-2 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-950 shadow-2xs cursor-pointer"
                    >
                      <option value="default">{locale === 'am' ? 'ነባሪ ቅደም ተከተል' : 'Default sorting'}</option>
                      <option value="nameAsc">{locale === 'am' ? 'በስም: A-Z' : 'Sort by Name (A-Z)'}</option>
                      <option value="nameDesc">{locale === 'am' ? 'በስም: Z-A' : 'Sort by Name (Z-A)'}</option>
                      <option value="brand">{locale === 'am' ? 'በብራንድ' : 'Sort by Brand'}</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

              </div>
            </div>

            {/* Sub-header Bar: Active Category Title + Results Count */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {selectedCategorySlug !== 'all' 
                    ? (locale === 'am' ? currentCategoryObj.nameAm : currentCategoryObj.nameEn)
                    : (locale === 'am' ? 'ሁሉም ተሽከርካሪዎች' : 'All Categories')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {locale === 'am'
                    ? `ከ ${VEHICLES_DATA.length} ሞዴሎች ውስጥ ${filteredVehicles.length} ውጤቶች በመታየት ላይ`
                    : `Showing 1–${filteredVehicles.length} of ${VEHICLES_DATA.length} results`}
                </p>
              </div>

              {searchQuery && (
                <span className="text-xs text-blue-900 font-semibold bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {locale === 'am' ? `ፍተሻ፦ "${searchQuery}"` : `Search: "${searchQuery}"`}
                </span>
              )}
            </div>

            {/* Pure White Studio Vehicle Grid: 3 COLUMNS, NO CARDS, PURE WHITE BACKGROUND */}
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-20 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 p-8">
                <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  {locale === 'am' ? 'ምንም የተገኘ መኪና የለም' : 'No vehicles found matching your criteria'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  {locale === 'am' 
                    ? 'እባክዎ የተየቡትን ፍተሻ ያጽዱ ወይም ሌላ ምድብ ይምረጡ።' 
                    : 'Try clearing your search query or selecting another category.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategorySlug('all');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-950 text-white text-xs font-bold rounded-full hover:bg-slate-800 transition-colors shadow-2xs"
                >
                  {locale === 'am' ? 'ሁሉንም አሳይ' : 'Show All Vehicles'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 sm:gap-x-12 sm:gap-y-16">
                {filteredVehicles.map((vehicle) => {
                  return (
                    <div
                      key={vehicle.id}
                      onClick={() => handleBookVehicle(vehicle)}
                      className="group cursor-pointer flex flex-col items-center text-center transition-all duration-300"
                    >
                      {/* Vehicle Cutout Image Floating on Pure White Canvas with Ground Shadow */}
                      <div className="relative w-full aspect-[16/10] bg-white flex items-center justify-center p-3 overflow-hidden">
                        {/* Studio Ground Shadow */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-3.5 bg-black/15 rounded-full blur-md group-hover:blur-lg group-hover:scale-105 transition-all duration-300" />

                        {/* Cutout Vehicle */}
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="relative max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                      </div>

                      {/* Vehicle Name ONLY (matching reference image: clean bold text) */}
                      <div className="mt-4 w-full">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                          {vehicle.name}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Service Prompt */}
            <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-600 text-center sm:text-left">
                {locale === 'am'
                  ? 'የእርስዎን መኪና ሞዴል አላገኙም? አበጋዝ ሞተርስ ሁሉንም የመኪና አይነቶች በከፍተኛ ጥራት ያስተናግዳል።'
                  : 'Can’t find your exact model? Abegaz Motors Engineering services all Japanese, European, American, and EV brands.'}
              </p>

              <Button
                variant="primary"
                onClick={handleGeneralBook}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl shadow-xs text-xs sm:text-sm shrink-0"
              >
                <span>{locale === 'am' ? 'ቀጠሮ ያዙ' : 'Book Bay'}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: BEFORE & AFTER SECTION (3 COLUMNS)
            ========================================================================= */}
        {activeTab === 'beforeAfter' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {locale === 'am' ? 'ከጥገና በፊትና በኋላ የተሰሩ ስራዎች' : 'Real Workshop Before & After Transformations'}
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {INITIAL_GALLERY.length} {locale === 'am' ? 'ምሳሌዎች' : 'cases'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {INITIAL_GALLERY.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  {/* Visual Before & After Slider */}
                  <div className="relative p-2 bg-slate-900">
                    <BeforeAfterSlider
                      beforeImage={item.beforeImage}
                      afterImage={item.afterImage}
                      beforeLabel={locale === 'am' ? 'በፊት' : 'Before'}
                      afterLabel={locale === 'am' ? 'በኋላ' : 'After'}
                      aspectRatio="aspect-[4/3]"
                    />

                    {/* License Plate / Vehicle Tag Overlay */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
                      <span className="bg-slate-950/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md border border-slate-700 shadow-sm">
                        {item.vehicle}
                      </span>
                    </div>

                    {/* Expand Lightbox Button */}
                    <button 
                      onClick={() => setActiveLightboxImage(item.afterImage)}
                      className="absolute top-4 right-4 z-20 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-all shadow-md"
                      title={locale === 'am' ? 'አጉላ' : 'Inspect'}
                    >
                      <Maximize2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  {/* Minimal Card Footer: Vehicle + Quick Booking CTA */}
                  <div className="p-4 flex items-center justify-between gap-3 bg-white">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 truncate max-w-[180px]">
                        {locale === 'am' ? item.titleAm : item.titleEn}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                        🇪🇹 {item.plate}
                      </span>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleGeneralBook}
                      className="text-xs h-8 px-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
                    >
                      <span>{locale === 'am' ? 'ቀጠሮ ያዝ' : 'Book'}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: VIDEOS SECTION (WORKSHOP IN ACTION)
            ========================================================================= */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {locale === 'am' ? 'የዎርክሾፑ የስራ ሂደት ቪዲዮዎች' : 'Engineering Workshop Video Highlights'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {WORKSHOP_VIDEOS.map((vid) => (
                <div 
                  key={vid.id}
                  onClick={() => setActiveVideoModal(vid)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <img 
                      src={vid.thumbnailUrl} 
                      alt={vid.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />

                    {/* Glowing Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-white ml-1" />
                      </div>
                    </div>

                    {/* Video Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-xs font-mono font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between gap-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-red-600 transition-colors">
                      {locale === 'am' ? vid.titleAm : vid.titleEn}
                    </h3>
                    <span className="text-xs font-bold text-red-600 shrink-0">
                      {locale === 'am' ? 'ተመልከት ›' : 'Watch ›'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal for Photo Inspection */}
      {activeLightboxImage && (
        <div 
          onClick={() => setActiveLightboxImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-red-500"
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
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
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
                className="p-1 hover:text-red-500 text-slate-300"
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
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-xl">
                  <Play className="w-8 h-8 fill-white ml-1" />
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
                  handleGeneralBook();
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold"
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
