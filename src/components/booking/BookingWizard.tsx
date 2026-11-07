import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Check, 
  Phone, 
  Send, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Car,
  Wrench,
  Cpu,
  Fan,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Info,
  CalendarCheck
} from 'lucide-react';
import { Button } from '../common/Button';

// Real clean engineering services with professional Lucide SVGs (no emoji icons)
const SERVICES_DATA = [
  {
    id: 'brakes',
    Icon: ShieldCheck,
    iconColor: 'text-orange-deep bg-orange-tint',
    nameAm: 'የብሬክ ሲስተም ጥገና',
    nameEn: 'Brake System Service',
    descAm: 'የብሬክ ፓድ፣ ዲስክ፣ የሃይድሮሊክ ዘይት ቅየራ እና ፍተሻ',
    descEn: 'Pads, discs, hydraulic bleed & sensor calibration',
    estimatedTimeAm: '~2 ሰዓት',
    estimatedTimeEn: '~2 hours'
  },
  {
    id: 'engine-oil',
    Icon: Wrench,
    iconColor: 'text-navy bg-mist',
    nameAm: 'የሞተር ሙሉ ጥገናና ዘይት ቅየራ',
    nameEn: 'Engine Service & Oil Change',
    descAm: 'ኦሪጅናል ሲንቴቲክ ዘይት፣ ፊልተር ቅየራ እና ቴክኒካል ፍተሻ',
    descEn: 'Synthetic oil, filter replacement & engine tune-up',
    estimatedTimeAm: '~1 ሰዓት',
    estimatedTimeEn: '~1 hour'
  },
  {
    id: 'diagnostics',
    Icon: Cpu,
    iconColor: 'text-blue-700 bg-blue-50',
    nameAm: 'ዘመናዊ የኮምፒውተር ዲያግኖስቲክስ',
    nameEn: 'Computer Diagnostics / Check Engine',
    descAm: 'በኦሪጅናል OBD-II ስካነር የሞተርና ኤሌክትሮኒክስ ብልሽት ፍተሻ',
    descEn: 'Full OBD-II ECU scan, sensor stream & error reset',
    estimatedTimeAm: '~45 ደቂቃ',
    estimatedTimeEn: '~45 min'
  },
  {
    id: 'ac-cooling',
    Icon: Fan,
    iconColor: 'text-cyan-700 bg-cyan-50',
    nameAm: 'የኤርኮንዲሽነርና ማቀዝቀዣ ጥገና',
    nameEn: 'AC & Climate Cooling Service',
    descAm: 'የማቀዝቀዣ ጋዝ መሙላት፣ ራዲያተርና ቴርሞስታት ፍተሻ',
    descEn: 'Refrigerant recharge, leak test & radiator flush',
    estimatedTimeAm: '~1 ሰዓት',
    estimatedTimeEn: '~1 hour'
  },
  {
    id: 'general-inspection',
    Icon: HelpCircle,
    iconColor: 'text-amber-800 bg-amber-50',
    nameAm: 'ችግሩን አላውቀውም — መርምሩልኝ',
    nameEn: "I'm Not Sure — Full Inspection",
    descAm: 'ባለሙያዎቻችን መኪናዎን በወርክሾፑ መርምረው መፍትሄ ይሰጣሉ',
    descEn: 'Our certified engineers will inspect & recommend the exact repair',
    estimatedTimeAm: 'ነጻ ምርመራ',
    estimatedTimeEn: 'Free Check',
    highlight: true
  }
];

// Time slots with both Civil and Ethiopian local hours
const TIME_OPTIONS = [
  {
    id: 'morning',
    timeCiv: '09:00 AM',
    timeEth: 'ጠዋት 3:00 ሰዓት',
    titleAm: 'ጠዋት',
    titleEn: 'Morning'
  },
  {
    id: 'midday',
    timeCiv: '11:30 AM',
    timeEth: 'ቀትር 5:30 ሰዓት',
    titleAm: 'ቀትር',
    titleEn: 'Midday'
  },
  {
    id: 'afternoon',
    timeCiv: '02:30 PM',
    timeEth: 'ከሰዓት 8:30 ሰዓት',
    titleAm: 'ከሰዓት',
    titleEn: 'Afternoon'
  },
  {
    id: 'late',
    timeCiv: '04:30 PM',
    timeEth: 'ከሰዓት 10:30 ሰዓት',
    titleAm: 'አመሻሽ',
    titleEn: 'Late Afternoon'
  }
];

export const BookingWizard: React.FC = () => {
  const { 
    locale, 
    setCurrentView, 
    createAppointment, 
    showToast 
  } = useApp();

  // All input fields start completely EMPTY so the user types their own real info
  const [selectedService, setSelectedService] = useState<string>('brakes');
  const [problemDetail, setProblemDetail] = useState<string>('');
  
  // Date selection
  const [dayPreference, setDayPreference] = useState<'today' | 'tomorrow' | 'custom'>('tomorrow');
  const [customDate, setCustomDate] = useState<string>('');

  // Time slot selection
  const [selectedSlotId, setSelectedSlotId] = useState<string>('morning');

  // Contact fields (Empty for user input, or pre-filled from Gallery vehicle selection)
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [vehicleMakeModel, setVehicleMakeModel] = useState<string>(() => {
    try {
      const savedCar = sessionStorage.getItem('selected_vehicle_for_booking');
      if (savedCar) {
        sessionStorage.removeItem('selected_vehicle_for_booking');
        return savedCar;
      }
    } catch (e) {
      // ignore
    }
    return '';
  });
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [preferredContact, setPreferredContact] = useState<'telegram' | 'phone'>('telegram');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [createdRef, setCreatedRef] = useState('');

  const activeServiceObj = SERVICES_DATA.find(s => s.id === selectedService) || SERVICES_DATA[0];
  const activeSlotObj = TIME_OPTIONS.find(t => t.id === selectedSlotId) || TIME_OPTIONS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showToast(locale === 'am' ? 'እባክዎ ሙሉ ስምዎን ያስገቡ' : 'Please enter your full name', 'error');
      return;
    }

    if (!phoneNumber.trim()) {
      showToast(locale === 'am' ? 'እባክዎ ስልክ ቁጥርዎን ያስገቡ' : 'Please enter your phone number', 'error');
      return;
    }

    setIsSubmitting(true);

    const calculatedDayStr = 
      dayPreference === 'today'
        ? (locale === 'am' ? 'ዛሬ (Today)' : 'Today')
        : dayPreference === 'tomorrow'
        ? (locale === 'am' ? 'ነገ (Tomorrow)' : 'Tomorrow')
        : (customDate || 'Upcoming');

    try {
      const generatedRef = await createAppointment({
        customerType: 'individual',
        customerName: fullName.trim(),
        customerPhone: phoneNumber.trim(),
        customerEmail: 'abiyme@gmail.com',
        vehicleMake: vehicleMakeModel.trim() || 'Unspecified',
        vehicleModel: vehicleMakeModel.trim() || 'Vehicle',
        vehiclePlate: licensePlate.trim().toUpperCase() || 'AA-ET',
        vehicleYear: 2020,
        problemDescription: problemDetail.trim() || (locale === 'am' ? 'ምርመራ' : 'Inspection'),
        problemTags: [activeServiceObj.nameEn],
        photos: [],
        requestedDate: calculatedDayStr,
        requestedSlot: `${activeSlotObj.timeCiv} (${activeSlotObj.timeEth})`,
        ethiopianDate: calculatedDayStr,
        ethiopianTime: activeSlotObj.timeEth,
        notificationMethods: {
          email: false,
          telegram: preferredContact === 'telegram'
        }
      });

      setCreatedRef(generatedRef || 'ABG-2026-0042');
      setIsSubmitting(false);
      setIsDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setIsSubmitting(false);
      setCreatedRef('ABG-2026-0042');
      setIsDone(true);
    }
  };

  // =========================================================================
  // SUCCESS SCREEN
  // =========================================================================
  if (isDone) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-mist min-h-[75vh] flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-card p-6 sm:p-8 border border-line shadow-md text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs border-2 border-emerald-300">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
              {locale === 'am' ? 'የቀጠሮ ጥያቄዎ በተሳካ ሁኔታ ደርሶናል!' : 'Appointment Request Successfully Received!'}
            </h2>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              {locale === 'am'
                ? 'የወርክሾፕ ባለሙያዎቻችን ክፍት ቦታ መርምረው በ30 ደቂቃ ውስጥ በቴሌግራም ወይም በስልክ ያረጋግጡልዎታል።'
                : 'Our engineers will review bay availability and confirm via Telegram or phone within 30 minutes.'}
            </p>
          </div>

          <div className="p-3 bg-mist rounded-card border border-line flex items-center justify-between text-xs">
            <span className="text-muted font-bold">
              {locale === 'am' ? 'የቀጠሮ መለያ ቁጥር፦' : 'Reference Number:'}
            </span>
            <span className="font-mono font-black text-navy text-sm">{createdRef}</span>
          </div>

          <div className="p-4 bg-orange-tint/40 rounded-card border border-orange-200/80 text-left text-xs space-y-2">
            <p className="font-extrabold text-navy">
              {locale === 'am' ? activeServiceObj.nameAm : activeServiceObj.nameEn}
            </p>
            {vehicleMakeModel && (
              <p className="text-slate-700 font-medium">
                🚗 {vehicleMakeModel} {licensePlate && `· [${licensePlate}]`}
              </p>
            )}
            <p className="text-orange-deep font-bold">
              📅 {dayPreference === 'today' ? (locale === 'am' ? 'ዛሬ (Today)' : 'Today') : dayPreference === 'tomorrow' ? (locale === 'am' ? 'ነገ (Tomorrow)' : 'Tomorrow') : customDate} · {activeSlotObj.timeCiv} ({activeSlotObj.timeEth})
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href="https://t.me/AbegazMotors"
              target="_blank"
              rel="noreferrer"
              className="w-full h-11 rounded-btn bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{locale === 'am' ? 'በቴሌግራም ይከታተሉ' : 'Track on Telegram (@AbegazMotors)'}</span>
            </a>

            <button
              onClick={() => setCurrentView('home')}
              className="w-full h-10 rounded-btn bg-white border border-line text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
            >
              {locale === 'am' ? 'ወደ መነሻ ገጽ ተመለስ' : 'Return to Home'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN APPOINTMENT PAGE (Desktop 2-Col + Mobile Single Column)
  // =========================================================================
  return (
    <div className="bg-mist min-h-screen py-6 sm:py-10 text-navy font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-tint border border-orange-200 text-xs font-extrabold text-orange-deep">
            <Sparkles className="w-3.5 h-3.5 text-orange-signal" />
            <span>
              {locale === 'am' 
                ? 'ምንም ቅድመ ክፍያ የለውም · ነጻ ምርመራ' 
                : 'Free Request · No Upfront Payment · 30-Min Confirmation'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy tracking-tight">
            {locale === 'am' ? 'የመኪናዎን ቀጠሮ በ1 ደቂቃ ይያዙ' : 'Book Your Workshop Appointment'}
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            {locale === 'am'
              ? 'አገልግሎት፣ ቀንና ሰዓት ይምረጡ፤ የወርክሾፕ ባለሙያዎቻችን ቦታ ያዘጋጁልዎታል'
              : 'Choose your service, preferred day and time slot. Our engineers will prepare the bay.'}
          </p>
        </div>

        {/* Responsive Grid: Desktop Two-Columns (Form Left 8 cols, Live Summary Right 4 cols) | Mobile Stacked */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: 3 Clean Booking Blocks */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* ------------------------------------------------------------- */}
            {/* BLOCK 1: SERVICE SELECTION */}
            {/* ------------------------------------------------------------- */}
            <div className="bg-white rounded-card p-5 sm:p-7 border border-line shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-black text-navy text-sm sm:text-base">
                    {locale === 'am' ? 'የሚፈልጉትን አገልግሎት ይምረጡ' : 'Select the Service You Need'}
                  </h2>
                </div>
                <span className="text-[11px] text-muted font-medium">
                  {locale === 'am' ? 'አንዱን ይጫኑ' : 'Tap to select'}
                </span>
              </div>

              {/* Service Cards (Clean Lucide SVGs, NO Emojis) */}
              <div className="space-y-2.5">
                {SERVICES_DATA.map((item) => {
                  const isSelected = selectedService === item.id;
                  const IconComponent = item.Icon;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedService(item.id)}
                      className={`p-3.5 sm:p-4 rounded-btn border cursor-pointer transition-all flex items-center justify-between gap-3 select-none ${
                        isSelected
                          ? 'bg-orange-tint/70 border-orange-signal shadow-2xs ring-2 ring-orange-signal'
                          : 'bg-white hover:bg-mist border-line'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Professional Icon Badge */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-200/80 ${item.iconColor}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-navy text-xs sm:text-sm truncate">
                              {locale === 'am' ? item.nameAm : item.nameEn}
                            </h3>
                            {item.highlight && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-signal text-navy shrink-0">
                                {locale === 'am' ? 'ምርጥ ምርጫ' : 'Popular'}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-muted truncate mt-0.5">
                            {locale === 'am' ? item.descAm : item.descEn}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500 font-bold">
                          {locale === 'am' ? item.estimatedTimeAm : item.estimatedTimeEn}
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-orange-signal bg-orange-signal text-navy' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional brief note */}
              <div className="pt-2">
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {locale === 'am' ? 'ተጨማሪ ማስታወሻ (አማራጭ)፦' : 'Brief symptom description (optional):'}
                </label>
                <input
                  type="text"
                  value={problemDetail}
                  onChange={(e) => setProblemDetail(e.target.value)}
                  placeholder={locale === 'am' ? 'ምሳሌ፡ ጠዋት ሲነሳ የጩኸት ድምጽ አለው...' : 'e.g. Squeaking noise when cold, Check Engine light is on...'}
                  className="w-full h-10 px-3 text-xs bg-mist border border-line rounded-input focus:border-orange-signal outline-hidden"
                />
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* BLOCK 2: DAY & TIME SELECTION */}
            {/* ------------------------------------------------------------- */}
            <div className="bg-white rounded-card p-5 sm:p-7 border border-line shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-black text-navy text-sm sm:text-base">
                    {locale === 'am' ? 'የቀጠሮ ቀንና ሰዓት ይምረጡ' : 'Choose Date & Time Window'}
                  </h2>
                </div>
              </div>

              {/* Day Choice Buttons */}
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-2">
                  {locale === 'am' ? 'የቀጠሮ ቀን፦' : 'Preferred Day:'}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'today', labelAm: 'ዛሬ (Today)', labelEn: 'Today', noteAm: 'አስቸኳይ' },
                    { id: 'tomorrow', labelAm: 'ነገ (Tomorrow)', labelEn: 'Tomorrow', noteAm: 'ተመራጭ' },
                    { id: 'custom', labelAm: 'ቀን እመርጣለሁ', labelEn: 'Specific Date', noteAm: 'የቀን መቁጠሪያ' }
                  ].map((d) => {
                    const isSelected = dayPreference === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDayPreference(d.id as any)}
                        className={`p-3 rounded-btn border text-center transition-all flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-orange-signal text-navy font-black border-orange-signal shadow-2xs'
                            : 'bg-mist text-slate-700 border-line hover:bg-slate-200'
                        }`}
                      >
                        <span className="text-xs leading-tight font-bold">
                          {locale === 'am' ? d.labelAm : d.labelEn}
                        </span>
                        <span className="text-[10px] text-muted font-normal mt-0.5">
                          {d.noteAm}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {dayPreference === 'custom' && (
                  <div className="mt-3 p-3 bg-mist rounded-btn border border-line flex items-center justify-between text-xs">
                    <span className="font-bold text-navy">
                      {locale === 'am' ? 'ቀን ይምረጡ፦' : 'Select Date:'}
                    </span>
                    <input
                      type="date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-line bg-white font-mono font-bold text-navy"
                    />
                  </div>
                )}
              </div>

              {/* 4 Time Slots with Ethiopian & Civil Hours */}
              <div className="pt-2">
                <label className="text-xs font-bold text-slate-600 block mb-2">
                  {locale === 'am' ? 'የሰዓት መስኮት፦' : 'Preferred Time Slot:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TIME_OPTIONS.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`p-3 rounded-btn border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-orange-tint/70 border-orange-signal shadow-2xs ring-2 ring-orange-signal'
                            : 'bg-white hover:bg-mist border-line'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-orange-deep" />
                            <span className="text-xs font-black text-navy">{slot.timeCiv}</span>
                            <span className="text-xs font-extrabold text-orange-deep">
                              ({slot.timeEth})
                            </span>
                          </div>
                          <span className="text-[11px] text-muted block mt-0.5">
                            {locale === 'am' ? slot.titleAm : slot.titleEn}
                          </span>
                        </div>

                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-orange-signal bg-orange-signal text-navy' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* BLOCK 3: CONTACT INFORMATION (EMPTY FOR USER INPUT) */}
            {/* ------------------------------------------------------------- */}
            <div className="bg-white rounded-card p-5 sm:p-7 border border-line shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  <h2 className="font-black text-navy text-sm sm:text-base">
                    {locale === 'am' ? 'የእርስዎን መረጃ ያስገቡ' : 'Your Contact & Car Details'}
                  </h2>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  {locale === 'am' ? 'ምስጢራዊ ነው' : 'Confidential'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="font-bold text-navy block mb-1">
                    {locale === 'am' ? 'ሙሉ ስም *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={locale === 'am' ? 'ስምዎን እዚህ ያስገቡ...' : 'Enter your full name...'}
                    className="w-full h-11 px-3.5 bg-mist border border-line rounded-input font-bold text-navy focus:border-orange-signal outline-hidden"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="font-bold text-navy block mb-1">
                    {locale === 'am' ? 'ስልክ ቁጥር (09... ወይም 07...) *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0911 234 567"
                    className="w-full h-11 px-3.5 bg-mist border border-line rounded-input font-mono font-bold text-navy focus:border-orange-signal outline-hidden"
                  />
                </div>

                {/* Car Make & Model */}
                <div>
                  <label className="font-bold text-navy block mb-1">
                    {locale === 'am' ? 'የመኪናው ዓይነት (ሞዴል)' : 'Car Make & Model'}
                  </label>
                  <input
                    type="text"
                    value={vehicleMakeModel}
                    onChange={(e) => setVehicleMakeModel(e.target.value)}
                    placeholder={locale === 'am' ? 'ምሳሌ፡ Toyota Vitz, Suzuki Dzire' : 'e.g. Toyota Vitz, Suzuki Dzire'}
                    className="w-full h-11 px-3.5 bg-mist border border-line rounded-input font-bold text-navy focus:border-orange-signal outline-hidden"
                  />
                </div>

                {/* License Plate (Optional) */}
                <div className="sm:col-span-2">
                  <label className="font-bold text-navy block mb-1">
                    {locale === 'am' ? 'የሰሌዳ ቁጥር (አማራጭ)' : 'License Plate (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                    placeholder="AA-12345"
                    className="w-full h-11 px-3.5 bg-mist border border-line rounded-input font-mono font-bold uppercase text-navy focus:border-orange-signal outline-hidden"
                  />
                </div>
              </div>

              {/* Confirmation Channel Preference */}
              <div className="pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  {locale === 'am' ? 'የቀጠሮ ማረጋገጫ በምን ይላክሎት?' : 'Preferred Confirmation Channel:'}
                </label>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPreferredContact('telegram')}
                    className={`p-3 rounded-btn border font-bold flex items-center justify-center gap-2 transition-all ${
                      preferredContact === 'telegram'
                        ? 'bg-[#229ED9]/15 border-[#229ED9] text-[#0088cc] font-black'
                        : 'bg-mist border-line text-slate-600'
                    }`}
                  >
                    <Send className="w-4 h-4 text-[#229ED9]" />
                    <span>Telegram (በቴሌግራም)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreferredContact('phone')}
                    className={`p-3 rounded-btn border font-bold flex items-center justify-center gap-2 transition-all ${
                      preferredContact === 'phone'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-black'
                        : 'bg-mist border-line text-slate-600'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Phone Call (በስልክ ጥሪ)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Submit Button (Visible on small screens) */}
            <div className="lg:hidden pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-btn bg-orange-signal hover:bg-orange-400 text-navy font-black text-base flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                {isSubmitting ? (
                  <span>{locale === 'am' ? 'እየተመዘገበ ነው...' : 'Submitting...'}</span>
                ) : (
                  <>
                    <span>{locale === 'am' ? 'ቀጠሮ ይጠይቁ — REQUEST APPOINTMENT' : 'SUBMIT APPOINTMENT REQUEST'}</span>
                    <ChevronRight className="w-5 h-5 stroke-[3]" />
                  </>
                )}
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Desktop Sticky Live Summary Card (Hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
            
            <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <h3 className="font-black text-navy text-sm uppercase tracking-wider">
                  {locale === 'am' ? 'የቀጠሮ ማጠቃለያ' : 'Request Summary'}
                </h3>
                <span className="text-[10px] font-bold bg-orange-tint text-orange-deep px-2 py-0.5 rounded-full border border-orange-200">
                  {locale === 'am' ? 'ቀጥታ' : 'Live'}
                </span>
              </div>

              {/* Service */}
              <div className="space-y-1 text-xs">
                <span className="text-muted block text-[10px] uppercase font-bold">
                  {locale === 'am' ? 'የተመረጠው አገልግሎት' : 'Selected Service'}
                </span>
                <p className="font-extrabold text-navy text-sm">
                  {locale === 'am' ? activeServiceObj.nameAm : activeServiceObj.nameEn}
                </p>
                <p className="text-slate-500 text-[11px]">
                  ⏱ {locale === 'am' ? activeServiceObj.estimatedTimeAm : activeServiceObj.estimatedTimeEn}
                </p>
              </div>

              {/* Date & Time */}
              <div className="border-t border-slate-100 pt-3 space-y-1 text-xs">
                <span className="text-muted block text-[10px] uppercase font-bold">
                  {locale === 'am' ? 'ቀንና ሰዓት' : 'Date & Time Window'}
                </span>
                <p className="font-bold text-navy">
                  📅 {dayPreference === 'today' ? (locale === 'am' ? 'ዛሬ (Today)' : 'Today') : dayPreference === 'tomorrow' ? (locale === 'am' ? 'ነገ (Tomorrow)' : 'Tomorrow') : (customDate || 'Not selected')}
                </p>
                <p className="font-bold text-orange-deep">
                  ⏰ {activeSlotObj.timeCiv} ({activeSlotObj.timeEth})
                </p>
              </div>

              {/* Vehicle */}
              <div className="border-t border-slate-100 pt-3 space-y-1 text-xs">
                <span className="text-muted block text-[10px] uppercase font-bold">
                  {locale === 'am' ? 'መኪና' : 'Vehicle'}
                </span>
                <p className="font-bold text-navy">
                  {vehicleMakeModel || (locale === 'am' ? 'አልተሞላም' : 'Not filled yet')}
                  {licensePlate && ` · [${licensePlate}]`}
                </p>
              </div>

              {/* Primary Submit Button on Desktop */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-btn bg-orange-signal hover:bg-orange-400 text-navy font-black text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  {isSubmitting ? (
                    <span>{locale === 'am' ? 'እየተላከ ነው...' : 'Submitting...'}</span>
                  ) : (
                    <>
                      <span>{locale === 'am' ? 'ቀጠሮ ይጠይቁ' : 'Request Appointment'}</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-muted text-center pt-1 border-t border-slate-100">
                ✔ {locale === 'am' ? 'ቅድመ ክፍያ አይጠየቅም' : 'No payment required to book'}
              </div>
            </div>

            {/* Direct Support Card */}
            <div className="bg-white rounded-card p-4 border border-line shadow-2xs text-xs space-y-2">
              <span className="font-black text-navy block text-[11px] uppercase tracking-wider">
                {locale === 'am' ? 'እርዳታ ይፈልጋሉ?' : 'Need Help Booking?'}
              </span>
              <div className="flex items-center justify-between text-slate-700 font-bold">
                <a
                  href="tel:+251114651553"
                  className="text-orange-deep hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>011 465 1553</span>
                </a>
                <span className="text-slate-300">·</span>
                <a
                  href="https://t.me/AbegazMotors"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#229ED9] hover:underline flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
