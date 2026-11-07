import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_GALLERY } from '../../lib/constants';
import { 
  VEHICLES_DATA, 
  VEHICLE_CATEGORIES, 
  VEHICLE_BRANDS, 
  VehicleModel 
} from '../../lib/vehiclesData';
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
  SlidersHorizontal,
  Car,
  Search,
  ChevronDown,
  Zap,
  Fuel,
  Shield,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { Button } from '../common/Button';

// Gallery media items with videos and images
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
  
  // Gallery Main Tabs
  const [activeTab, setActiveTab] = useState<'catalog' | 'beforeAfter' | 'videos' | 'photos'>('catalog');
  
  // Catalog Filtering & Sorting state
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'nameAsc' | 'nameDesc' | 'brand'>('default');
  
  // Modal states
  const [selectedVehicleModal, setSelectedVehicleModal] = useState<VehicleModel | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<WorkshopVideo | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<string>('all');

  // Filtered & Sorted Vehicles for the Studio Catalog
  const filteredVehicles = useMemo(() => {
    let result = [...VEHICLES_DATA];

    // Filter by Category
    if (selectedCategorySlug !== 'all') {
      result = result.filter(v => v.category === selectedCategorySlug);
    }

    // Filter by Brand
    if (selectedBrand !== 'All') {
      result = result.filter(v => v.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Search Filter
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
  }, [selectedCategorySlug, selectedBrand, searchQuery, sortBy]);

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

  // Current active category object
  const currentCategoryObj = VEHICLE_CATEGORIES.find(c => c.slug === selectedCategorySlug) || VEHICLE_CATEGORIES[0];

  return (
    <div className="py-8 md:py-14 bg-[#fafbfc] min-h-screen pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold mb-3 tracking-wide uppercase">
            <Car className="w-3.5 h-3.5" />
            <span>{locale === 'am' ? 'የተሽከርካሪ ሞዴሎችና የስራ ማህደር' : 'Vehicle Fleet & Workshop Showcase'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {locale === 'am' ? 'የምንሰራቸው መኪኖችና የስራ ማህደር' : 'Serviced Vehicles & Work Showcase'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 max-w-2xl mx-auto">
            {locale === 'am' 
              ? 'በአበጋዝ ሞተርስ ኢንጂነሪንግ በኦሪጅናል መለዋወጫዎችና በላቁ ቴክኖሎጂዎች የምንጠግናቸው ሞዴሎች፣ የቀደምት ስራዎች እና ቪዲዮዎች'
              : 'Explore the full spectrum of vehicle models serviced at Abegaz Motors Engineering with certified diagnostic equipment and genuine parts.'}
          </p>

          {/* Clean 4-Way Tab Switcher */}
          <div className="mt-7 inline-flex flex-wrap justify-center p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs gap-1">
            {/* 1. Vehicle Fleet Tab */}
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
              }`}
            >
              <Car className={`w-4 h-4 ${activeTab === 'catalog' ? 'text-white' : 'text-red-600'}`} />
              <span>{locale === 'am' ? 'የመኪና ሞዴሎች (Vehicle Fleet)' : 'Vehicle Fleet'}</span>
            </button>

            {/* 2. Before & After */}
            <button
              onClick={() => setActiveTab('beforeAfter')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'beforeAfter'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className={`w-4 h-4 ${activeTab === 'beforeAfter' ? 'text-white' : 'text-red-600'}`} />
              <span>{locale === 'am' ? 'ከጥገና በፊትና በኋላ' : 'Before & After'}</span>
            </button>

            {/* 3. Videos */}
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'videos'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
              }`}
            >
              <Film className={`w-4 h-4 ${activeTab === 'videos' ? 'text-white' : 'text-red-600'}`} />
              <span>{locale === 'am' ? 'ቪዲዮዎች (Videos)' : 'Videos'}</span>
            </button>

            {/* 4. Photos */}
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'photos'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
              }`}
            >
              <ImageIcon className={`w-4 h-4 ${activeTab === 'photos' ? 'text-white' : 'text-red-600'}`} />
              <span>{locale === 'am' ? 'የዎርክሾፕ ፎቶዎች' : 'Facility Photos'}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: CLEAN WHITE STUDIO VEHICLE CATALOG (MATCHING USER REFERENCE IMAGES)
            ========================================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            
            {/* Filter Card: Categories & Brands & Search */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
              
              {/* Category Pills (The 6 Official Categories from Reference Document) */}
              <div className="mb-5">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  {locale === 'am' ? 'የተሽከርካሪ ምድቦች (Official Categories)' : 'Vehicle Categories'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {VEHICLE_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategorySlug === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategorySlug(cat.slug)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                        }`}
                      >
                        {cat.number > 0 && (
                          <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                            isSelected ? 'bg-red-600 text-white' : 'bg-slate-300 text-slate-700'
                          }`}>
                            {cat.number}
                          </span>
                        )}
                        <span>{locale === 'am' ? cat.nameAm : cat.nameEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand Selector Pills */}
              <div className="mb-5 pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  {locale === 'am' ? 'የመኪና ብራንድ (Brand Filter)' : 'Brand Filter'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {VEHICLE_BRANDS.map((brand) => {
                    const isSelected = selectedBrand.toLowerCase() === brand.toLowerCase();
                    return (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-red-600 text-white font-bold shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search Bar & Active Filters Reset */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-96">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={locale === 'am' ? 'የመኪና ሞዴል ይፈልጉ (ምሳሌ: Corolla, Song Plus, Prado)...' : 'Search vehicle (e.g. Camry, Yaris, BYD Tang, Patrol)...'}
                    className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-slate-900"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Reset Filters button if active */}
                {(selectedCategorySlug !== 'all' || selectedBrand !== 'All' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategorySlug('all');
                      setSelectedBrand('All');
                      setSearchQuery('');
                    }}
                    className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{locale === 'am' ? 'ሁሉንም ማጣሪያ አጥፋ' : 'Clear Filters'}</span>
                  </button>
                )}
              </div>

            </div>

            {/* Sub-header Bar (Strictly matching Reference Image 2 & 3: Brand Heading + Results Count + Sorting) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 pb-1 border-b border-slate-200">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {selectedBrand !== 'All' 
                    ? selectedBrand 
                    : selectedCategorySlug !== 'all' 
                      ? (locale === 'am' ? currentCategoryObj.nameAm : currentCategoryObj.nameEn)
                      : (locale === 'am' ? 'ሁሉም ተሽከርካሪዎች' : 'All Serviced Vehicles')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {locale === 'am'
                    ? `ከ ${VEHICLES_DATA.length} ሞዴሎች ውስጥ ${filteredVehicles.length} ውጤቶች በመታየት ላይ`
                    : `Showing 1–${filteredVehicles.length} of ${VEHICLES_DATA.length} results`}
                </p>
              </div>

              {/* Sorting Dropdown (matching 'Default sorting' from screenshot) */}
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white border border-slate-300 hover:border-slate-400 rounded-xl px-4 py-2 pr-9 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs cursor-pointer"
                >
                  <option value="default">{locale === 'am' ? 'ነባሪ ቅደም ተከተል (Default sorting)' : 'Default sorting'}</option>
                  <option value="nameAsc">{locale === 'am' ? 'በስም: ከሀ - ፐ (Sort by Name A-Z)' : 'Sort by Name (A-Z)'}</option>
                  <option value="nameDesc">{locale === 'am' ? 'በስም: ከፐ - ሀ (Sort by Name Z-A)' : 'Sort by Name (Z-A)'}</option>
                  <option value="brand">{locale === 'am' ? 'በብራንድ ቅደም ተከተል (Sort by Brand)' : 'Sort by Brand'}</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Pure White Studio Vehicle Grid (Exact UI of User Reference Image 2 & 3) */}
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
                <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">
                  {locale === 'am' ? 'ምንም የተገኘ መኪና የለም' : 'No vehicles found'}
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  {locale === 'am' 
                    ? 'የፈለጉት ሞዴል በአበጋዝ ሞተርስ ይስተናገዳል! እባክዎ ፍተሻውን ያፅዱ ወይም በስልክ ያግኙን።'
                    : 'Try clearing the search or filters to see our full fleet of serviced models.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategorySlug('all');
                    setSelectedBrand('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors"
                >
                  {locale === 'am' ? 'ሁሉንም አሳይ' : 'Show All Vehicles'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {filteredVehicles.map((vehicle) => {
                  return (
                    <div
                      key={vehicle.id}
                      className="group bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Studio Vehicle Image on Pure White Background */}
                      <div 
                        onClick={() => setSelectedVehicleModal(vehicle)}
                        className="relative w-full aspect-[16/10] bg-white flex items-center justify-center p-2 cursor-pointer overflow-hidden rounded-xl"
                      >
                        {/* Subtle Ground Shadow for Studio Floating Look */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/10 rounded-full blur-md group-hover:blur-lg group-hover:scale-105 transition-all" />

                        {/* Vehicle Image */}
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="relative max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            // fallback placeholder if local image fails
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80';
                          }}
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2 left-2 flex items-center gap-1.5">
                          {vehicle.fuelType === 'Electric' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                              <span>100% EV</span>
                            </span>
                          )}
                          {vehicle.fuelType === 'Hybrid' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-teal-50 text-teal-700 border border-teal-200">
                              <Zap className="w-3 h-3 text-teal-600" />
                              <span>Hybrid</span>
                            </span>
                          )}
                          {vehicle.fuelType === 'Diesel' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              <Fuel className="w-3 h-3 text-amber-600" />
                              <span>Diesel</span>
                            </span>
                          )}
                        </div>

                        {/* Quick View Button on Hover */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVehicleModal(vehicle);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                          title={locale === 'am' ? 'ዝርዝር እይ' : 'Quick Details'}
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>

                      {/* Vehicle Typography & Details (Matching Reference Image 2 & 3) */}
                      <div className="pt-4 text-center">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                          {vehicle.name}
                        </h3>

                        <div className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                          <span>{vehicle.bodyType}</span>
                          <span>•</span>
                          <span className="text-slate-400">{vehicle.brand}</span>
                        </div>

                        {/* Recommended Service Tags */}
                        <div className="mt-3 flex flex-wrap justify-center gap-1">
                          {vehicle.servicesRecommended.slice(0, 2).map((svc, i) => (
                            <span key={i} className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              {svc}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons: Book Service & Details */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => setSelectedVehicleModal(vehicle)}
                            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
                          >
                            <Info className="w-3.5 h-3.5 text-slate-400" />
                            <span>{locale === 'am' ? 'ዝርዝር' : 'Details'}</span>
                          </button>

                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleBookVehicle(vehicle)}
                            className="text-xs h-8 px-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xs"
                          >
                            <span>{locale === 'am' ? 'ቀጠሮ ያዙ' : 'Book Service'}</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Service Guarantee Banner */}
            <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {locale === 'am' ? 'የእርስዎ የመኪና ሞዴል አልተዘረዘረም?' : 'Don’t see your exact vehicle model?'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    {locale === 'am'
                      ? 'አበጋዝ ሞተርስ ኢንጂነሪንግ ሁሉንም የአውሮፓ፣ የኤስያ እና የአሜሪካ መኪኖች በኦሪጅናል ዲያግኖስቲክስ ያስተናግዳል!'
                      : 'Abegaz Motors Engineering technicians are fully certified to service all Japanese, European, American, and Chinese EV models.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button
                  variant="primary"
                  onClick={handleGeneralBook}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-xs text-xs sm:text-sm"
                >
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>{locale === 'am' ? 'አሁኑኑ ቀጠሮ ያዙ' : 'Schedule Diagnostic'}</span>
                </Button>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: BEFORE & AFTER SECTION
            ========================================================================= */}
        {activeTab === 'beforeAfter' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {locale === 'am' ? 'ከጥገና በፊትና በኋላ የተሰሩ ስራዎች' : 'Real Workshop Before & After Transformations'}
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {filteredBeforeAfter.length} {locale === 'am' ? 'ምሳሌዎች' : 'cases'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredBeforeAfter.map((item) => (
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
            TAB 3: VIDEOS SECTION - Workshop in Action
            ========================================================================= */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {locale === 'am' ? 'የዎርክሾፑ የስራ ሂደት ቪዲዮዎች' : 'Engineering Workshop Video Highlights'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {filteredVideos.map((vid) => (
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

        {/* =========================================================================
            TAB 4: PHOTOS SECTION - Real Workshop Photos
            ========================================================================= */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {locale === 'am' ? 'የፋሲሊቲና የወርክሾፕ ምስሎች' : 'Facility & Workshop Floor Photos'}
              </h2>
            </div>

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
                  className="group cursor-pointer relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-xs hover:shadow-lg transition-all"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          MODAL 1: VEHICLE DETAIL & SERVICE MODAL
          ========================================================================= */}
      {selectedVehicleModal && (
        <div 
          onClick={() => setSelectedVehicleModal(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl cursor-default"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wide">
                  {selectedVehicleModal.brand} • {selectedVehicleModal.bodyType}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {selectedVehicleModal.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedVehicleModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vehicle Studio Image */}
            <div className="p-6 bg-white flex items-center justify-center relative min-h-[220px]">
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-3 bg-black/10 rounded-full blur-md" />
              <img 
                src={selectedVehicleModal.image} 
                alt={selectedVehicleModal.name}
                className="max-h-56 max-w-full object-contain relative"
              />
            </div>

            {/* Body Info */}
            <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {locale === 'am' ? 'ምድብ' : 'Category'}
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {locale === 'am' ? selectedVehicleModal.categoryLabelAm : selectedVehicleModal.categoryLabelEn}
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {locale === 'am' ? 'የነዳጅ/ሃይል አይነት' : 'Fuel / Powertrain'}
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {selectedVehicleModal.fuelType}
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {locale === 'am' ? 'ብራንድ' : 'Manufacturer'}
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {selectedVehicleModal.brand}
                  </span>
                </div>
              </div>

              {/* Recommended Services by Abegaz Motors */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  {locale === 'am' 
                    ? 'በአበጋዝ ሞተርስ የሚሰጡ የተመሰከረላቸው አገልግሎቶች:' 
                    : 'Certified Engineering Services at Abegaz Motors:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVehicleModal.servicesRecommended.map((svc, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-800"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{svc}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedVehicleModal(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  {locale === 'am' ? 'ዝጋ' : 'Close'}
                </button>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleBookVehicle(selectedVehicleModal);
                    setSelectedVehicleModal(null);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-xs text-xs sm:text-sm"
                >
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>
                    {locale === 'am' 
                      ? `ለዚህ መኪና ቀጠሮ ያዙ` 
                      : `Book Service for ${selectedVehicleModal.name}`}
                  </span>
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: LIGHTBOX PHOTO MODAL
          ========================================================================= */}
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

      {/* =========================================================================
          MODAL 3: WORKSHOP VIDEO MODAL
          ========================================================================= */}
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
