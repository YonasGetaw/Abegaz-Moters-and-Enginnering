import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight,
  Layers
} from 'lucide-react';

interface PackageItem {
  id: string;
  code: string;
  codeBadge: string;
  codeBadgeAm: string;
  nameEn: string;
  nameAm: string;
  interval: string;
  intervalAm: string;
  duration: string;
  durationAm: string;
  image: string;
  descEn: string;
  descAm: string;
  featurePillsEn: string[];
  featurePillsAm: string[];
  fullChecklistEn: string[];
  fullChecklistAm: string[];
}

export const PackagesPage: React.FC = () => {
  const { locale, setCurrentView } = useApp();
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);

  const packagesData: PackageItem[] = [
    {
      id: 'pkg-a',
      code: 'A-Service',
      codeBadge: 'PACKAGE A',
      codeBadgeAm: 'ፓኬጅ A',
      nameEn: 'A-Service: Preventive Care Package',
      nameAm: 'A-ሰርቪስ: መሰረታዊ የቅድመ-መከላከል ጥገና',
      interval: 'Every 5,000 KM',
      intervalAm: 'በየ 5,000 ኪ.ሜ',
      duration: '1.5 - 2 Hours',
      durationAm: '1.5 - 2 ሰዓት',
      image: '/packages/package-a.jpg',
      descEn: 'Essential routine maintenance to maintain engine vitality, brake responsiveness, and safe driving reliability for Toyota Hilux & Land Cruiser.',
      descAm: 'የሞተር ጤንነትን፣ የፍሬን ቅልጥፍናንና አስተማማኝ ጉዞን ለማረጋገጥ የሚደረግ መሰረታዊ የቅድመ-መከላከል ጥገና።',
      featurePillsEn: ['OIL & FILTER', 'BRAKE CHECK', 'STEERING GREASE', '5,000 KM'],
      featurePillsAm: ['ዘይትና ፊልተር', 'የፍሬን ፍተሻ', 'የስቲሪንግ ግሪስ', '5,000 ኪ.ሜ'],
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
      ]
    },
    {
      id: 'pkg-b',
      code: 'B-Service',
      codeBadge: 'PACKAGE B',
      codeBadgeAm: 'ፓኬጅ B',
      nameEn: 'B-Service: Intermediate Protection Package',
      nameAm: 'B-ሰርቪስ: መካከለኛ የጥገና ፓኬጅ',
      interval: 'Every 10,000 - 15,000 KM',
      intervalAm: 'በየ 10,000 - 15,000 ኪ.ሜ',
      duration: '2.5 - 3 Hours',
      durationAm: '2.5 - 3 ሰዓት',
      image: '/packages/package-b.jpg',
      descEn: 'Comprehensive multi-point service extending beyond basic fluid changes into drivetrain, hydraulic fluids, and suspension integrity.',
      descAm: 'ከመሰረታዊ ቅየራ ባለፈ የድራይቭ ሻፍት፣ የሃይድሮሊክ ፈሳሾችና የሻሲ ጥንካሬን የሚያረጋግጥ የተሟላ የፍተሻ ፓኬጅ።',
      featurePillsEn: ['ALL A-SERVICE', 'DRIVE SHAFT', 'HYDRAULIC FLUIDS', '10,000 KM'],
      featurePillsAm: ['የA ሙሉ ሰርቪስ', 'ድራይቭ ሻፍት', 'የሃይድሮሊክ ፈሳሾች', '10,000 ኪ.ሜ'],
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
      ]
    },
    {
      id: 'pkg-c',
      code: 'C-Service',
      codeBadge: 'PACKAGE C',
      codeBadgeAm: 'ፓኬጅ C',
      nameEn: 'C-Service: Advanced Heavy Duty Package',
      nameAm: 'C-ሰርቪስ: የላቀ የጥገና ፓኬጅ',
      interval: 'Every 25,000 - 30,000 KM',
      intervalAm: 'በየ 25,000 - 30,000 ኪ.ሜ',
      duration: '4 - 4.5 Hours',
      durationAm: '4 - 4.5 ሰዓት',
      image: '/packages/package-c.jpg',
      descEn: 'Heavy-duty maintenance for high-mileage, commercial, or off-road vehicles requiring powertrain and drivetrain service.',
      descAm: 'በረጅም ርቀት፣ አስቸጋሪ መንገዶች ወይም ለድርጅት ተሽከርካሪዎች የተዘጋጀ የድራይቭ ቤልት፣ ቤሪንግና ዲፈረንሺያል ጥገና።',
      featurePillsEn: ['ALL B-SERVICE', 'DRIVE BELTS', 'WHEEL BEARINGS', '25,000 KM'],
      featurePillsAm: ['የB ሙሉ ሰርቪስ', 'ድራይቭ ቤልት', 'የዊል ቤሪንግ', '25,000 ኪ.ሜ'],
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
      ]
    },
    {
      id: 'pkg-d',
      code: 'D-Service',
      codeBadge: 'PACKAGE D',
      codeBadgeAm: 'ፓኬጅ D',
      nameEn: 'D-Service: Major Overhaul & Recommission',
      nameAm: 'D-ሰርቪስ: ሙሉ ሜጀር ሰርቪስ',
      interval: 'Every 40,000 - 50,000 KM',
      intervalAm: 'በየ 40,000 - 50,000 ኪ.ሜ',
      duration: '5 - 6 Hours',
      durationAm: '5 - 6 ሰዓት',
      image: '/packages/package-d.jpg',
      descEn: 'The ultimate bumper-to-bumper engineering inspection including valve clearance, manual transmission & transfer case oil, and AC refrigerant.',
      descAm: 'የቫልቭ ክሊራንስ፣ የማኑዋል ማስተላለፊያና ትራንስፈር ዘይት፣ ኤሲ ጋዝና የኮምፒውተር ዲያግኖስቲክስ የሚያካትት ከፍተኛው ሜጀር ሰርቪስ።',
      featurePillsEn: ['MAJOR OVERHAUL', 'VALVE CLEARANCE', 'GEARBOX OIL', '50,000 KM'],
      featurePillsAm: ['ሜጀር ሰርቪስ', 'ቫልቭ ክሊራንስ', 'የማርሽ ዘይት', '50,000 ኪ.ሜ'],
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
      ]
    }
  ];

  return (
    <div className="bg-[#fcfdfd] min-h-screen text-slate-900 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Editorial Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-2">
            {locale === 'am' ? 'ደረጃቸውን የጠበቁ የጥገና ፓኬጆች' : 'Factory Standard Maintenance'}
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight mb-4 leading-tight">
            {locale === 'am' ? (
              <>
                <span className="text-[#0f2c59]">የተሟሉ የሰርቪስ</span>{' '}
                <span className="text-red-600">ጥቅሎች (A - D)</span>
              </>
            ) : (
              <>
                <span className="text-[#0f2c59]">Complete Service</span>{' '}
                <span className="text-red-600">Packages (A - D)</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            {locale === 'am'
              ? 'ለToyota Hilux፣ Land Cruiser፣ Prado እና ለሁሉም ተሽከርካሪዎች የተዘጋጁ ደረጃቸውን የጠበቁ የፋብሪካ ጥገና ፓኬጆች።'
              : 'Standardized factory-grade preventive maintenance packages engineered for Toyota Hilux, Land Cruiser, Prado and all passenger & commercial vehicles.'}
          </p>
        </div>

        {/* 2 COLUMN × 2 ROW CARD GRID (Exact Card Layout & Typography from the sample image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {packagesData.map((pkg) => {
            const isExpanded = expandedPackageId === pkg.id;

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(15,44,89,0.09)] transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* 1. TOP IMAGE (With Top-Left Navy Badge & Top-Right Rotated Diamond Accent) */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  {/* Top-Left Dark Navy Badge (Exact match with Image 2 "STANDARD") */}
                  <div className="absolute top-4 left-4 z-10 bg-[#1e3a8a] text-white px-3.5 py-1 text-[11px] font-bold tracking-widest uppercase shadow-sm">
                    {locale === 'am' ? pkg.codeBadgeAm : pkg.codeBadge}
                  </div>

                  {/* Top-Right Navy Rotated Diamond Accent (Exact match with Image 2) */}
                  <div className="absolute -top-3.5 -right-3.5 z-10 w-8 h-8 bg-[#1e3a8a] rotate-45 shadow-sm pointer-events-none" />

                  <img
                    src={pkg.image}
                    alt={locale === 'am' ? pkg.nameAm : pkg.nameEn}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* 2. CARD BODY (Exact match with Image 1 "Single Standard") */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Title: Classic High-Contrast Bold Serif (Playfair Display) */}
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#144272] tracking-tight leading-snug mb-3">
                      {locale === 'am' ? pkg.nameAm : pkg.nameEn}
                    </h2>

                    {/* Description: Clean Slate Gray */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 font-normal">
                      {locale === 'am' ? pkg.descAm : pkg.descEn}
                    </p>

                    {/* Feature Pills with Square Bullets (Exact match with Image 1: ▪ WI-FI ▪ SHOWER ...) */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
                      {(locale === 'am' ? pkg.featurePillsAm : pkg.featurePillsEn).map((pill, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-xs inline-block" />
                          <span>{pill}</span>
                        </span>
                      ))}
                      <span className="text-slate-400 font-semibold lowercase">
                        {locale === 'am' ? '+ተጨማሪ' : '+1 More'}
                      </span>
                    </div>

                    {/* Expandable Full Checklist from Workshop Sheets */}
                    {isExpanded && (
                      <div className="mb-6 p-5 bg-slate-50 rounded-xl border border-slate-200/80 animate-fadeIn text-xs sm:text-sm">
                        <p className="font-bold text-[#144272] uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-red-600" />
                          <span>
                            {locale === 'am' 
                              ? `የወረቀቱ ሙሉ ፍተሻ ዝርዝር (${pkg.fullChecklistAm.length} ነጥቦች)፦` 
                              : `Complete Inspection Checklist (${pkg.fullChecklistEn.length} items):`}
                          </span>
                        </p>
                        <div className="space-y-1.5">
                          {(locale === 'am' ? pkg.fullChecklistAm : pkg.fullChecklistEn).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-slate-800">
                              <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Horizontal Divider Line (Exact match with Image 1 line) */}
                    <div className="border-t border-slate-150 pt-5 mt-2" />

                    {/* 3. BOTTOM ACTION BAR (Left: VIEW DETAILS →, Right: RESERVE Button) */}
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setExpandedPackageId(isExpanded ? null : pkg.id)}
                        className="text-xs font-black uppercase tracking-widest text-[#144272] hover:text-red-600 inline-flex items-center gap-2 transition-colors group/btn"
                      >
                        <span>
                          {isExpanded 
                            ? (locale === 'am' ? 'ዝርዝር ሰብስብ' : 'HIDE DETAILS') 
                            : (locale === 'am' ? 'ዝርዝር ይመልከቱ' : 'VIEW DETAILS')}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCurrentView('book');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#144272] border border-slate-200 bg-slate-50/50 hover:bg-[#144272] hover:text-white hover:border-[#144272] rounded-xs transition-all shadow-xs"
                      >
                        {locale === 'am' ? 'ቀጠሮ' : 'RESERVE'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
