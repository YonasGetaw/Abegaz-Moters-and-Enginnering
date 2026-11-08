import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Layers
} from 'lucide-react';

interface PackageItem {
  id: string;
  code: string;
  nameEn: string;
  nameAm: string;
  interval: string;
  intervalAm: string;
  duration: string;
  durationAm: string;
  image: string;
  descEn: string;
  descAm: string;
  highlightPointsEn: string[];
  highlightPointsAm: string[];
  fullChecklistEn: string[];
  fullChecklistAm: string[];
}

export const PackagesPage: React.FC = () => {
  const { locale } = useApp();
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);

  const packagesData: PackageItem[] = [
    {
      id: 'pkg-a',
      code: 'A-Service',
      nameEn: 'A-Service: Preventive Care Package',
      nameAm: 'A-ሰርቪስ: መሰረታዊ የቅድመ-መከላከል ጥገና',
      interval: 'Every 5,000 KM',
      intervalAm: 'በየ 5,000 ኪ.ሜ',
      duration: '1.5 - 2 Hours',
      durationAm: '1.5 - 2 ሰዓት',
      image: '/packages/package-a.jpg',
      descEn: 'Essential routine maintenance to maintain engine vitality, brake responsiveness, and safe driving reliability for Toyota Hilux & Land Cruiser.',
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
      ]
    },
    {
      id: 'pkg-b',
      code: 'B-Service',
      nameEn: 'B-Service: Intermediate Protection Package',
      nameAm: 'B-ሰርቪስ: መካከለኛ የጥገና ፓኬጅ',
      interval: 'Every 10,000 - 15,000 KM',
      intervalAm: 'በየ 10,000 - 15,000 ኪ.ሜ',
      duration: '2.5 - 3 Hours',
      durationAm: '2.5 - 3 ሰዓት',
      image: '/packages/package-b.jpg',
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
      ]
    },
    {
      id: 'pkg-c',
      code: 'C-Service',
      nameEn: 'C-Service: Advanced Heavy Duty Package',
      nameAm: 'C-ሰርቪስ: የላቀ የጥገና ፓኬጅ',
      interval: 'Every 25,000 - 30,000 KM',
      intervalAm: 'በየ 25,000 - 30,000 ኪ.ሜ',
      duration: '4 - 4.5 Hours',
      durationAm: '4 - 4.5 ሰዓት',
      image: '/packages/package-c.jpg',
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
      ]
    },
    {
      id: 'pkg-d',
      code: 'D-Service',
      nameEn: 'D-Service: Major Overhaul & Recommission',
      nameAm: 'D-ሰርቪስ: ሙሉ ሜጀር ሰርቪስ',
      interval: 'Every 40,000 - 50,000 KM',
      intervalAm: 'በየ 40,000 - 50,000 ኪ.ሜ',
      duration: '5 - 6 Hours',
      durationAm: '5 - 6 ሰዓት',
      image: '/packages/package-d.jpg',
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
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Editorial Title Section on Pure White Background (Two-Tone Blue & Red, Centered) */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-tight">
            {locale === 'am' ? (
              <>
                <span className="text-blue-950">የተሟሉ የሰርቪስ</span>{' '}
                <span className="text-red-600">ጥቅሎች (A - D)</span>
              </>
            ) : (
              <>
                <span className="text-blue-950">Complete Service</span>{' '}
                <span className="text-red-600">Packages (A - D)</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            {locale === 'am'
              ? 'ለToyota Hilux፣ Land Cruiser፣ Prado እና ለሁሉም ተሽከርካሪዎች የተዘጋጁ ደረጃቸውን የጠበቁ የፋብሪካ ጥገና ፓኬጆች። እንደ መኪናዎ የኪሎሜትር ጉዞ የሚስማማውን ይምረጡ።'
              : 'Standardized factory-grade preventive maintenance packages engineered for Toyota Hilux, Land Cruiser, Prado and all passenger & commercial vehicles.'}
          </p>
        </div>

        {/* 2 COLUMN × 2 ROW OPEN GRID (4 BALANCED PACKAGES ON PURE WHITE BACKGROUND, NO CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {packagesData.map((pkg) => {
            const isExpanded = expandedPackageId === pkg.id;

            return (
              <div
                key={pkg.id}
                className="flex flex-col justify-between"
              >
                <div>
                  {/* Clean Package Image */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl mb-6">
                    <img
                      src={pkg.image}
                      alt={locale === 'am' ? pkg.nameAm : pkg.nameEn}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Red Bold Headline (matching sample "Toyota Trained Experts") */}
                  <h2 className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight leading-tight mb-2">
                    {locale === 'am' ? pkg.nameAm : pkg.nameEn}
                  </h2>

                  {/* Interval & Duration line */}
                  <div className="flex items-center gap-4 text-xs sm:text-sm font-bold text-slate-700 mb-4">
                    <span className="text-red-600 font-black">
                      {locale === 'am' ? pkg.intervalAm : pkg.interval}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span>{locale === 'am' ? pkg.durationAm : pkg.duration}</span>
                    </span>
                  </div>

                  {/* Editorial Description */}
                  <p className="text-base text-slate-600 font-normal leading-relaxed mb-6">
                    {locale === 'am' ? pkg.descAm : pkg.descEn}
                  </p>

                  {/* Key Highlights Checklist */}
                  <div className="space-y-2 mb-6">
                    {(locale === 'am' ? pkg.highlightPointsAm : pkg.highlightPointsEn).map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Full Checklist from Workshop Sheets */}
                  {isExpanded && (
                    <div className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-100 animate-fadeIn">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-red-600" />
                        <span>
                          {locale === 'am' 
                            ? `የወረቀቱ ሙሉ ፍተሻ ዝርዝር (${pkg.fullChecklistAm.length} ነጥቦች)፦` 
                            : `Complete Inspection Checklist (${pkg.fullChecklistEn.length} items):`}
                        </span>
                      </p>
                      <div className="space-y-1.5">
                        {(locale === 'am' ? pkg.fullChecklistAm : pkg.fullChecklistEn).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                            <span className="w-4 h-4 rounded-full bg-red-100 text-red-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Toggle Checklist Link */}
                  <button
                    onClick={() => setExpandedPackageId(isExpanded ? null : pkg.id)}
                    className="text-xs sm:text-sm font-extrabold text-red-600 hover:text-red-700 inline-flex items-center gap-1.5 transition-colors mb-6"
                  >
                    <span>
                      {isExpanded 
                        ? (locale === 'am' ? 'ዝርዝር ቼክሊስትን ሰብስብ' : 'Collapse Checklist') 
                        : (locale === 'am' ? `ሁሉንም ዝርዝር ፍተሻዎች ይመልከቱ (${pkg.fullChecklistAm.length} ነጥቦች)` : `View Full Checklist (${pkg.fullChecklistEn.length} items)`)}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
