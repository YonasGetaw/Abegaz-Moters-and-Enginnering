import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  Send, 
  Wrench, 
  Sparkles,
  Layers,
  Car
} from 'lucide-react';
import { Button } from '../common/Button';
import { WORKSHOP_INFO } from '../../lib/constants';

interface PackageItem {
  id: string;
  code: string;
  tier: string;
  tierAm: string;
  nameEn: string;
  nameAm: string;
  interval: string;
  intervalAm: string;
  duration: string;
  durationAm: string;
  image: string;
  featured?: boolean;
  descEn: string;
  descAm: string;
  highlightPointsEn: string[];
  highlightPointsAm: string[];
  fullChecklistEn: string[];
  fullChecklistAm: string[];
  compatibleModels: string[];
}

export const PackagesPage: React.FC = () => {
  const { locale, setCurrentView, setSelectedServiceSlug } = useApp();
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);
  const [selectedVehicleFilter, setSelectedVehicleFilter] = useState<'all' | 'hilux' | 'landcruiser' | 'prado'>('all');

  const packagesData: PackageItem[] = [
    {
      id: 'pkg-a',
      code: 'A-Service',
      tier: 'Level 1 · Basic Maintenance',
      tierAm: 'ደረጃ 1 · መሰረታዊ ቅድመ-መከላከል',
      nameEn: 'A-Service: Preventive Care Package',
      nameAm: 'A-ሰርቪስ: መሰረታዊ የቅድመ-መከላከል ጥገና',
      interval: 'Every 5,000 KM',
      intervalAm: 'በየ 5,000 ኪ.ሜ',
      duration: '1.5 - 2 Hours',
      durationAm: '1.5 - 2 ሰዓት',
      image: '/packages/package-a.jpg',
      featured: false,
      descEn: 'Essential routine maintenance to maintain engine vitality, brake responsiveness, and safe driving reliability.',
      descAm: 'የሞተር ጤንነትን፣ የፍሬን ቅልጥፍናንና አስተማማኝ ጉዞን ለማረጋገጥ የሚደረግ መሰረታዊ የቅድመ-መከላከል ጥገና።',
      highlightPointsEn: [
        'Brake pad & disc inspection & cleaning',
        'Engine oil & genuine filter replacement',
        'Fuel element & air cleaner check',
        'Propeller shafts grease & bolt tightening',
        'Battery health & steering linkage check'
      ],
      highlightPointsAm: [
        'የፍሬን ፓድና ዲስክ ፍተሻና ማጽዳት',
        'የሞተር ዘይትና ኦሪጅናል ፊልተር ቅየራ',
        'የነዳጅ ኤለመንትና የአየር ማጣሪያ ፍተሻ',
        'የፕሮፔለር ሻፍት ግሪስና ቦልቶች ማሰር',
        'የባትሪ ጤንነትና የስቲሪንግ ሊንኬጅ ፍተሻ'
      ],
      fullChecklistEn: [
        'Brake pad & Discs inspection',
        'Steering knuckle, Drag link, King pin, Centre Arm & Steering Linkage Grease',
        'Engine Oil with filter replacement',
        'Fuel Element inspection',
        'Air cleaner check & blow cleaning',
        'Battery terminal & charge status check',
        'Steering Wheel linkage & Steering gear box Oil',
        'Propeller shafts greasing',
        'Tightening propeller shafts bolts & nuts',
        'Front & Rear Suspension visual inspection',
        'External fluid leakage inspection (cooling, fuel, oil)'
      ],
      fullChecklistAm: [
        'የፍሬን ፓድና ዲስክ ፍተሻ (Brake pad & Discs)',
        'የስቲሪንግ ናክል፣ ድራግ ሊንክ፣ ኪንግ ፒንና ሴንተር አርም ግሪስ (Steering Linkage Grease)',
        'የሞተር ዘይትና ፊልተር ቅየራ (Engine Oil with filter)',
        'የነዳጅ ኤለመንት ፍተሻ (Fuel Element)',
        'የአየር ማጣሪያ ፍተሻና ማጽዳት (Air cleaner)',
        'የባትሪ ተርሚናልና ቮልቴጅ ፍተሻ (Battery health)',
        'የስቲሪንግ ሊንኬጅና ጊርቦክስ ዘይት ፍተሻ (Steering gear box Oil)',
        'የፕሮፔለር ሻፍት ግሪስ (Propeller shafts grease)',
        'የፕሮፔለር ሻፍት ቦልቶችና ነቶች ማሰር (Tightening bolts & nuts)',
        'የፊትና የኋላ ሰስፔንሽን ፍተሻ (Front & Rear Suspension)',
        'የውጭ ፈሳሽ መፍሰስ ፍተሻ (External leakage check)'
      ],
      compatibleModels: ['Toyota Hilux', 'Land Cruiser', 'Prado', 'RAV4']
    },
    {
      id: 'pkg-b',
      code: 'B-Service',
      tier: 'Level 2 · Intermediate Maintenance · Recommended',
      tierAm: 'ደረጃ 2 · መካከለኛ የጥገና ፓኬጅ · በጣም ተመራጭ',
      nameEn: 'B-Service: Intermediate Protection Package',
      nameAm: 'B-ሰርቪስ: መካከለኛ የጥገና ፓኬጅ',
      interval: 'Every 10,000 - 15,000 KM',
      intervalAm: 'በየ 10,000 - 15,000 ኪ.ሜ',
      duration: '2.5 - 3 Hours',
      durationAm: '2.5 - 3 ሰዓት',
      image: '/packages/package-b.jpg',
      featured: true,
      descEn: 'Comprehensive multi-point service extending beyond basic fluid changes into drivetrain, hydraulic fluids, and suspension integrity.',
      descAm: 'ከመሰረታዊ ቅየራ ባለፈ የድራይቭ ሻፍት፣ የሃይድሮሊክ ፈሳሾችና የሻሲ ጥንካሬን የሚያረጋግጥ የተሟላ የፍተሻ ፓኬጅ።',
      highlightPointsEn: [
        'Complete A-Service checklist included',
        'Brake disc run-out, drum & pad inspection',
        'Drive shaft boots, bolts & ball joint dust covers',
        'Brake, clutch & power steering fluid checks',
        'Water sedimenter, all lights, wipers & chassis bolts'
      ],
      highlightPointsAm: [
        'የA-Service ሙሉ ፍተሻዎች ተካተዋል',
        'የፍሬን ዲስክ ሩን-አውት፣ ድራም እና ፓዶች ፍተሻ',
        'የድራይቭ ሻፍት ቦትስ፣ ቦልቶችና ቦል ጆይንት',
        'የፍሬን፣ ክላችና ፓወር ስቲሪንግ ፈሳሾች ቅየራ/ፍተሻ',
        'የውሃ ሴዲመንተር፣ መብራቶች፣ ዋይፐርና የሻሲ ቦልቶች'
      ],
      fullChecklistEn: [
        'All A-Service inspection points included',
        'Brake pads, Discs & Drums comprehensive check',
        'Brake Disc Run-out tolerance check',
        'Drive shaft Boots inspection',
        'Tightening Drive shaft bolts',
        'Ball joint Dust covers inspection',
        'Brake pedal travel & parking brake tension check',
        'Brake line pipes & flexible hoses inspection',
        'Brake fluid level & moisture test',
        'Clutch fluid level check',
        'Power steering fluid condition & level',
        'Water sedimenter draining & inspection',
        'All exterior lights, horns, wipers & washers operation',
        'Bolts & nuts on chassis & vehicle body torque check',
        'Tire tread depth, wear pattern & inflation pressure calibration'
      ],
      fullChecklistAm: [
        'የA-Service ሙሉ 11 ነጥቦች ተካተዋል',
        'የፍሬን ፓድ፣ ዲስክና ድራም የተሟላ ፍተሻ (Discs & Drums)',
        'የፍሬን ዲስክ ሩን-አውት ፍተሻ (Brake Disc Run-out)',
        'የድራይቭ ሻፍት ቦትስ ፍተሻ (Drive shaft Boots)',
        'የድራይቭ ሻፍት ቦልቶች ማሰር (Tightening Drive shaft bolts)',
        'የቦል ጆይንት ደስት ከቨር (Ball joint Dust covers)',
        'የእግርና የእጅ ፍሬን ፍተሻ (Break pedal & parking brake)',
        'የፍሬን መስመር ቧንቧዎችና ሆሶች (Brake line pipes & hoses)',
        'የፍሬን ፈሳሽ እርጥበትና መጠን (Brake fluid)',
        'የክላች ፈሳሽ ፍተሻ (Clutch fluid)',
        'የፓወር ስቲሪንግ ፈሳሽ ፍተሻ (Power steering fluid)',
        'የውሃ ሴዲመንተር ማፍሰስና ማጽዳት (Water sedimenter)',
        'መብራቶች፣ ክላክስ፣ ዋይፐርና ዋሸር (Lights, horns, wipers & washers)',
        'የሻሲና የቦዲ ቦልቶችና ነቶች ማሰር (Bolts & nuts on chassis)',
        'የጎማ ንፋስና እርጅና ፍተሻ (Tire & inflation pressure)'
      ],
      compatibleModels: ['Toyota Hilux', 'Land Cruiser', 'Prado', 'Fortuner', 'RAV4']
    },
    {
      id: 'pkg-c',
      code: 'C-Service',
      tier: 'Level 3 · Advanced Maintenance',
      tierAm: 'ደረጃ 3 · የላቀ የጥገና ፓኬጅ',
      nameEn: 'C-Service: Advanced Heavy Duty Package',
      nameAm: 'C-ሰርቪስ: የላቀ የጥገና ፓኬጅ',
      interval: 'Every 25,000 - 30,000 KM',
      intervalAm: 'በየ 25,000 - 30,000 ኪ.ሜ',
      duration: '4 - 4.5 Hours',
      durationAm: '4 - 4.5 ሰዓት',
      image: '/packages/package-c.jpg',
      featured: false,
      descEn: 'Heavy-duty maintenance for high-mileage, commercial, or off-road vehicles requiring powertrain and drivetrain service.',
      descAm: 'በረጅም ርቀት፣ አስቸጋሪ መንገዶች ወይም ለድርጅት ተሽከርካሪዎች የተዘጋጀ የድራይቭ ቤልት፣ ቤሪንግና ዲፈረንሺያል ጥገና።',
      highlightPointsEn: [
        'Complete B-Service checklist included',
        'Drive belt tensioning & condition analysis',
        'Vacuum pump oil hoses & idler speed calibration',
        'Wheel bearing repacking & high-temp grease',
        'Differential gear oil drain & fresh refill'
      ],
      highlightPointsAm: [
        'የB-Service ሙሉ ፍተሻዎች ተካተዋል',
        'የድራይቭ ቤልት ውጥረትና ሁኔታ ምርመራ',
        'የቫኪዩም ፓምፕ ዘይት ሆሶችና የአይድለር ፍጥነት',
        'የዊል ቤሪንግ ፍተሻና ከፍተኛ ሙቀት መቋቋሚ ግሪስ',
        'የዲፈረንሺያል ጊርቦክስ ዘይት ቅየራና ፍተሻ'
      ],
      fullChecklistEn: [
        'All A & B-Service inspection points included',
        'Drive Belt wear inspection & tension adjustment',
        'Vacuum pump oil hoses & connection tightness',
        'Idler Speed & engine idle stability calibration',
        'Wheel Bearing inspection & grease repacking',
        'Exhaust pipes, hangers & mountings inspection',
        'Differential Gear oil inspection & replacement',
        'Suspension bushing play & torque verification',
        'Fuel delivery lines & pressure consistency test'
      ],
      fullChecklistAm: [
        'የA እና B ሰርቪስ ሙሉ ፍተሻዎች ተካተዋል',
        'የድራይቭ ቤልት ፍተሻና ማስተካከል (Drive Belt)',
        'የቫኪዩም ፓምፕ ዘይት ሆሶች (Vacuum pump oil hoses)',
        'የሞተር ማዞሪያ ፍጥነት ማስተካከል (Idler Speed)',
        'የዊል ቤሪንግ ፍተሻና ግሪስ ቅየራ (Wheel Bearing grease)',
        'የጭስ ማውጫ መስመሮችና ማንጠልጠያዎች (Exhaust pipes & Mountings)',
        'የዲፈረንሺያል ጊርቦክስ ዘይት ቅየራ (Differential Gear oil)',
        'የሰስፔንሽን ቡሽና ቦልቶች ጥንካሬ ፍተሻ',
        'የነዳጅ ማስተላለፊያ መስመሮች ግፊት ፍተሻ'
      ],
      compatibleModels: ['Toyota Hilux', 'Land Cruiser', 'Prado', 'Highlander', 'All 4x4']
    },
    {
      id: 'pkg-d',
      code: 'D-Service',
      tier: 'Level 4 · Major Comprehensive Overhaul',
      tierAm: 'ደረጃ 4 · ሙሉ ሜጀር ሰርቪስ',
      nameEn: 'D-Service: Major Overhaul & Recommission',
      nameAm: 'D-ሰርቪስ: ሙሉ ሜጀር ሰርቪስ',
      interval: 'Every 40,000 - 50,000 KM',
      intervalAm: 'በየ 40,000 - 50,000 ኪ.ሜ',
      duration: '5 - 6 Hours',
      durationAm: '5 - 6 ሰዓት',
      image: '/packages/package-d.jpg',
      featured: false,
      descEn: 'The ultimate bumper-to-bumper engineering inspection including valve clearance, manual transmission & transfer case oil, and AC refrigerant.',
      descAm: 'የቫልቭ ክሊራንስ፣ የማኑዋል ማስተላለፊያና ትራንስፈር ዘይት፣ ኤሲ ጋዝና የኮምፒውተር ዲያግኖስቲክስ የሚያካትት ከፍተኛው ሜጀር ሰርቪስ።',
      highlightPointsEn: [
        'Complete C-Service checklist included',
        'Valve clearance measurement & adjustment',
        'Manual transmission & transfer case oil replacement',
        'AC cooler refrigerant level & pressure test',
        'Fuel tank cap, lines & evaporative connections'
      ],
      highlightPointsAm: [
        'የC-Service ሙሉ ፍተሻዎች ተካተዋል',
        'የቫልቭ ክሊራንስ መለካትና ማስተካከል',
        'የማኑዋል ትራንስሚሽንና ትራንስፈር ዘይት ቅየራ',
        'የኤርኮንዲሽነር (AC) ጋዝና ማቀዝቀዣ ፍተሻ',
        'የነዳጅ ታንከር ክዳን፣ መስመሮችና መገናኛዎች'
      ],
      fullChecklistEn: [
        'All A, B & C-Service inspection points included',
        'Valve clearance precision measurement & adjustment',
        'Manual transmission & transfer case oil full replacement',
        'Air conditioning / cooler refrigerant charge & leak test',
        'Fuel tank cap, fuel lines & vapor connections integrity check',
        'Full vehicle computer OBD-II diagnostic multi-module scan',
        'Cooling system radiator flush & thermostat operation test',
        'Official Abegaz Motors engineering certificate of roadworthiness'
      ],
      fullChecklistAm: [
        'የA፣ B እና C ሰርቪስ ሙሉ ዝርዝሮች ተካተዋል',
        'የቫልቭ ክሊራንስ ትክክለኛ ልኬትና ማስተካከል (Valve clearance)',
        'የማኑዋል ትራንስሚሽንና ትራንስፈር ቦክስ ዘይት ሙሉ ቅየራ',
        'የኤርኮንዲሽነር (AC) ጋዝ ጫናና ማቀዝቀዝ ፍተሻ',
        'የነዳጅ ታንከር ክዳን፣ መስመሮችና መገናኛዎች ፍተሻ (Fuel lines)',
        'የሙሉ ተሽከርካሪ ኮምፒውተር OBD-II ዲያግኖስቲክስ ስካን',
        'የራዲያተር ማቀዝቀዣ ውሃና ቴርሞስታት ስራ ፍተሻ',
        'የአበጋዝ ሞተርስ ይፋዊ የብቃት ሰርተፍኬት'
      ],
      compatibleModels: ['Toyota Hilux', 'Land Cruiser', 'Prado', 'All SUVs & Trucks']
    }
  ];

  const handleBookPackage = (pkg: PackageItem) => {
    setSelectedServiceSlug(pkg.code);
    setCurrentView('book');
  };

  return (
    <div className="py-12 md:py-20 bg-slate-900/10 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-bold mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>{locale === 'am' ? 'የአበጋዝ ሞተርስ ይፋዊ የጥገና ፓኬጆች' : 'Official Abegaz Motors Maintenance Tiers'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight mb-4">
            {locale === 'am' ? 'የተሟሉ የሰርቪስ ጥቅሎች (A - D)' : 'Complete Service Packages (A - D)'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {locale === 'am'
              ? 'ለToyota Hilux፣ Land Cruiser፣ Prado እና ለሁሉም ተሽከርካሪዎች የተዘጋጁ ደረጃቸውን የጠበቁ የፋብሪካ ጥገና ፓኬጆች። እንደ መኪናዎ የኪሎሜትር ጉዞ የሚስማማውን ይምረጡ።'
              : 'Standardized factory-grade preventive maintenance packages engineered for Toyota Hilux, Land Cruiser, Prado and all passenger & commercial vehicles.'}
          </p>

          {/* Vehicle Compatibility Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: 'all', labelAm: 'ሁሉም ተሽከርካሪዎች', labelEn: 'All Vehicles' },
              { id: 'hilux', labelAm: 'Toyota Hilux', labelEn: 'Toyota Hilux' },
              { id: 'landcruiser', labelAm: 'Land Cruiser', labelEn: 'Land Cruiser' },
              { id: 'prado', labelAm: 'Prado & 4x4', labelEn: 'Prado & 4x4' }
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setSelectedVehicleFilter(pill.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border ${
                  selectedVehicleFilter === pill.id
                    ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-red-300 hover:text-red-600'
                }`}
              >
                {locale === 'am' ? pill.labelAm : pill.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* 2 COLUMN × 2 ROW GRID (4 BALANCED PACKAGE CARDS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {packagesData.map((pkg) => {
            const isExpanded = expandedPackageId === pkg.id;
            const isFav = pkg.featured;

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl overflow-hidden bg-white border transition-all duration-300 flex flex-col justify-between ${
                  isFav
                    ? 'border-red-500 shadow-2xl ring-2 ring-red-500/20 relative'
                    : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Popular Ribbon for Package B */}
                {isFav && (
                  <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] font-black uppercase tracking-wider px-4 py-1.5 text-center flex items-center justify-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{locale === 'am' ? 'በጣም ተመራጭ የጥገና ፓኬጅ' : 'Most Popular Routine Package'}</span>
                  </div>
                )}

                <div>
                  {/* Package Image & Hero Banner */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900 group">
                    <img
                      src={pkg.image}
                      alt={locale === 'am' ? pkg.nameAm : pkg.nameEn}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Tier Code Badge & Interval */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black shadow-md tracking-wider">
                        {pkg.code}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                        {locale === 'am' ? pkg.intervalAm : pkg.interval}
                      </span>
                    </div>

                    {/* Bottom overlay: Duration & Checkpoint count */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1.5 font-bold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                        <Clock className="w-3.5 h-3.5 text-red-400" />
                        <span>{locale === 'am' ? `የስራ ጊዜ: ${pkg.durationAm}` : `Duration: ${pkg.duration}`}</span>
                      </span>

                      <span className="flex items-center gap-1.5 font-bold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>
                          {locale === 'am' 
                            ? `${pkg.fullChecklistAm.length} የፍተሻ ነጥቦች` 
                            : `${pkg.fullChecklistEn.length} Checkpoints`}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8">
                    <div className="mb-4">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-red-600 block mb-1">
                        {locale === 'am' ? pkg.tierAm : pkg.tier}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                        {locale === 'am' ? pkg.nameAm : pkg.nameEn}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {locale === 'am' ? pkg.descAm : pkg.descEn}
                    </p>

                    {/* Vehicle Compatibility Tag */}
                    <div className="mb-6 py-2 px-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Car className="w-4 h-4 text-red-600" />
                        <span>{locale === 'am' ? 'የተሽከርካሪ ዝግጁነት' : 'Vehicle Fit:'}</span>
                      </span>
                      <span className="text-xs font-extrabold text-slate-900">
                        {pkg.compatibleModels.join(' · ')}
                      </span>
                    </div>

                    {/* Highlighted Checklist Preview */}
                    <div className="space-y-2.5 mb-6">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-800">
                        {locale === 'am' ? 'ዋና ዋና የፍተሻ ነጥቦች፦' : 'Key Included Checkpoints:'}
                      </p>
                      {(locale === 'am' ? pkg.highlightPointsAm : pkg.highlightPointsEn).map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-medium leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expandable Full Checklist Accordion */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-slate-200 animate-fadeIn space-y-2 bg-slate-50/70 p-4 rounded-2xl">
                        <p className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-red-600" />
                          <span>
                            {locale === 'am' 
                              ? `ሙሉ የወረቀት ፍተሻ ዝርዝር (${pkg.fullChecklistAm.length} ነጥቦች)፦` 
                              : `Complete Inspection Checklist (${pkg.fullChecklistEn.length} items):`}
                          </span>
                        </p>
                        {(locale === 'am' ? pkg.fullChecklistAm : pkg.fullChecklistEn).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                            <span className="w-4 h-4 rounded-full bg-red-100 text-red-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Toggle Full Checklist Button */}
                    <button
                      onClick={() => setExpandedPackageId(isExpanded ? null : pkg.id)}
                      className="mt-3 text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>
                        {isExpanded 
                          ? (locale === 'am' ? 'ዝርዝር ቼክሊስትን ሰብስብ' : 'Collapse Checklist') 
                          : (locale === 'am' ? 'ሁሉንም ዝርዝር ፍተሻዎች ይመልከቱ' : 'View Full Checklist')}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Card Footer: Action Buttons */}
                <div className="p-6 sm:p-8 pt-0">
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleBookPackage(pkg)}
                      className="w-full sm:flex-1 h-12 font-black text-sm shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{locale === 'am' ? `${pkg.code} ቀጠሮ ያስይዙ` : `Book ${pkg.code}`}</span>
                    </Button>

                    <a
                      href={`tel:${WORKSHOP_INFO.phone}`}
                      className="h-12 px-4 rounded-btn border border-slate-300 hover:border-red-600 text-slate-800 hover:text-red-600 text-xs font-bold inline-flex items-center justify-center gap-2 transition-all bg-white"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{locale === 'am' ? 'በስልክ ይጠይቁ' : 'Call'}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose Abegaz Maintenance Guarantee Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-red-600/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-red-400 font-extrabold text-xs tracking-wider uppercase block mb-2">
                {locale === 'am' ? 'የአበጋዝ ሞተርስ የጥራት ዋስትና' : 'Abegaz Motors Quality Standard'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                {locale === 'am' 
                  ? 'ኦሪጅናል መለዋወጫዎች እና በToyota የሰለጠኑ ባለሙያዎች' 
                  : 'Toyota-Certified Technicians & OEM Genuine Parts'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {locale === 'am'
                  ? 'በወርክሾፓችን የሚከናወኑ ሁሉም የ A፣ B፣ C እና D ሰርቪሶች በፋብሪካው መመሪያ መሰረት በዘመናዊ መመርመሪያ ማሽኖች እና በዋስትና የተደገፉ ናቸው።'
                  : 'Every maintenance package adheres strictly to manufacturer specifications using state-of-the-art diagnostic tools, computerized torque calibration, and genuine fluids.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setCurrentView('book')}
                className="w-full h-13 font-black text-sm shadow-xl shadow-red-600/40"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>{locale === 'am' ? 'አሁን ፈጣን ቀጠሮ ይያዙ' : 'Book Maintenance Now'}</span>
              </Button>

              <a
                href="https://t.me/AbegazMotors"
                target="_blank"
                rel="noreferrer"
                className="h-13 px-6 rounded-btn bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold inline-flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>{locale === 'am' ? 'በTelegram ያግኙን' : 'Telegram Support'}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
