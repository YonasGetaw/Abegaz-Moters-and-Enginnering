import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wrench, 
  Cog, 
  Disc, 
  Car, 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  PhoneCall, 
  Send, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  MapPin,
  Mail,
  Layers,
  Sparkles
} from 'lucide-react';
import { Button } from '../common/Button';
import { WORKSHOP_INFO } from '../../lib/constants';

interface ServiceCategory {
  id: string;
  sectionNumber: string;
  imagePosition: 'right' | 'left';
  nameEn: string;
  nameAm: string;
  taglineEn: string;
  taglineAm: string;
  descriptionEn: string;
  descriptionAm: string;
  image: string;
  badgeEn: string;
  badgeAm: string;
  keyHighlightsEn: string[];
  keyHighlightsAm: string[];
  itemizedRepairsEn: string[];
  itemizedRepairsAm: string[];
}

export const ServicesPage: React.FC = () => {
  const { locale, setCurrentView, setSelectedServiceSlug } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  const servicesData: ServiceCategory[] = [
    {
      id: 'engine',
      sectionNumber: '01',
      imagePosition: 'right', // 1st: Image in Right (as requested)
      nameEn: 'Engine & Mechanical System Repairs',
      nameAm: 'የሞተርና የሜካኒካል ሲስተም ሙሉ ጥገና',
      taglineEn: 'Precision Overhaul & Component Reconstruction',
      taglineAm: 'የሞተር ሙሉ እድሳትና ትክክለኛ የሜካኒካል ጥገና',
      descriptionEn: 'Accuracy and quality service bases not only on technicians expertise but also availability and usage of up-to-date diagnostic tools and modern equipment for complete engine overhauling.',
      descriptionAm: 'የአበጋዝ ሞተርስ ኢንጂነሪንግ አገልግሎት በባለሙያዎች ጥልቅ ልምድ ላይ ብቻ ሳይሆን በዘመናዊ የዲያግኖስቲክስ መሳሪያዎችና የሞተር መፈተሻ ቴክኖሎጂዎች ላይ የተመሰረተ ነው።',
      image: '/services/engine-repairs.jpg',
      badgeEn: 'Full & Top Overhaul',
      badgeAm: 'ሙሉና ከፊል የሞተር እድሳት',
      keyHighlightsEn: [
        'Complete engine block & cylinder head overhaul',
        'Fuel injection pump, nozzles & carburetor rebuild',
        'Timing belt, V-belts & AC belt precision tensioning',
        'Valve clearance measurement & camshaft balancing',
        'Turbocharger overhaul, gaskets & engine remounting'
      ],
      keyHighlightsAm: [
        'የሞተር ብሎክና ሲሊንደር ሄድ ሙሉ እድሳት (Overhauling)',
        'የነዳጅ ኢንጄክሽን ፓምፕ፣ ኖዝሎችና ካርቡሬተር ሰርቪስ',
        'የታይሚንግ ቤልት፣ ቪ-ቤልትና ኤሲ ቤልት ማስተካከል',
        'የቫልቭ ክሊራንስ መለካትና የካምሻፍት ሚዛን ማስተካከል',
        'ተርቦ ቻርጀር፣ ጋስኬቶችና የሞተር ሳፖርት ቅየራ'
      ],
      itemizedRepairsEn: [
        'Engine overhauling (Complete Block & Head)',
        'Engine top overhauling & decarbonization',
        'Engine bottom overhauling (Bearings & Crank)',
        'Injection pump calibration & pressure timing',
        'Timing belt & tensioner pulley replacement',
        'Carburetor tune-up & jet cleaning',
        'Nozzle servicing & ultrasonic spray pattern testing',
        'Camshaft & rocker arm geometry alignment',
        'Crankshaft front & rear oil seal replacement',
        'V-belt, AC compressor belt & steering pump belts',
        'Engine mountings / support replacement (both sides)',
        'Exhaust manifold & intake manifold gasket sealing',
        'Valve clearance precision shimming',
        'Cylinder head gasket replacement & head skimming',
        'Crankshaft pulley & harmonic damper inspection',
        'Oil sump gasket & pan leak repair',
        'Ignition timing stroboscopic calibration',
        'Turbocharger inspection & boost pressure testing',
        'Flywheel, starter ring gear & spigot bearing replacement',
        'Complete engine dismount & remount service'
      ],
      itemizedRepairsAm: [
        'የሞተር ሙሉ ጥገና (Engine Overhauling)',
        'የሞተር የላይኛው ክፍል ጥገና (Top Overhauling)',
        'የሞተር የታችኛው ክፍል ጥገና (Bottom Overhauling)',
        'የነዳጅ ኢንጄክሽን ፓምፕ ካሊብሬሽን (Injection Pump)',
        'የታይሚንግ ቤልት ቅየራ (Timing Belt)',
        'የካርቡሬተር ማስተካከልና ማጽዳት (Carburetor)',
        'የኖዝል ፍተሻና ሰርቪስ (Nozzle Servicing)',
        'የካምሻፍት ፍተሻ (Camshaft Inspection)',
        'የክራንክሻፍት የፊትና የኋላ ኦይል ሲል (Crankshaft Oil Seal)',
        'የቪ-ቤልት፣ ኤሲ እና ስቲሪንግ ፓምፕ ቤልቶች (V-Belts)',
        'የሞተር ሳፖርት ቅየራ (Engine Support Replacement)',
        'የኢንቴክና ኤግዞስት ማኒፎልድ ጋስኬት (Manifold Gasket)',
        'የቫልቭ ክሊራንስ ማስተካከል (Valve Clearance)',
        'የሲሊንደር ሄድ ጋስኬት ቅየራ (Cylinder Head Gasket)',
        'የክራንክሻፍት ፑሊ ፍተሻ (Crankshaft Pulley)',
        'የዘይት ሰምፕ ጋስኬትና ፍሳሽ ማቆም (Oil Sump)',
        'የኢግኒሽን ታይሚንግ ፍተሻ (Ignition Timing)',
        'የተርቦ ቻርጀር ፍተሻና ጫና መለካት (Turbocharger)',
        'የፍላይዊልና ስታርተር ሪንግ ጊር (Flywheel & Starter Gear)',
        'ሞተር ማውረድና መልሶ መግጠም (Engine Dismount & Remount)'
      ]
    },
    {
      id: 'transmission',
      sectionNumber: '02',
      imagePosition: 'left', // 2nd: Image in Left (as requested)
      nameEn: 'Transmission & Gearbox Engineering',
      nameAm: 'የማርሽ ቦክስና ትራንስሚሽን ምህንድስና',
      taglineEn: 'Smooth Gear Selection & Power Delivery',
      taglineAm: 'ለስላሳ የማርሽ ሽግግርና የተሟላ የሃይል ማስተላለፊያ',
      descriptionEn: 'Factory-standard transmission disassembly, gear teeth wear analysis, synchronous mesh replacement, and hydraulic clutch master/release rehabilitation.',
      descriptionAm: 'የማርሽ ቦክስ ሙሉ መፍታት፣ የማርሽ ጥርሶች ፍተሻ፣ የሲንክሮናይዘር ቅየራ እና የሃይድሮሊክ ክላች ሲሊንደሮች ጥገና በከፍተኛ ጥንቃቄ ይከናወናል።',
      image: '/services/transmission-gearbox.jpg',
      badgeEn: 'Manual & Transfer Box',
      badgeAm: 'ማኑዋልና 4x4 ትራንስፈር ቦክስ',
      keyHighlightsEn: [
        'Complete gearbox overhaul & synchro mesh renewal',
        'Transfer case 4x4 engagement & flange seal replacement',
        'Clutch master & slave release cylinder overhaul',
        'Clutch pressure plate & friction disc replacement',
        'Propeller shaft balance, U-joints & center bearing'
      ],
      keyHighlightsAm: [
        'የማርሽ ቦክስ ሙሉ ጥገናና ሲንክሮናይዘር ቅየራ',
        'የ 4x4 ትራንስፈር ጊርቦክስና የፍላንጅ ኦይል ሲል',
        'የክላች ማስተርና ሪሊዝ ሲሊንደር ጥገና',
        'የክላች ዲስክ፣ ፕሬሸር ፕሌትና ቤሪንግ ቅየራ',
        'የፕሮፔለር ሻፍት ሚዛን፣ ዩኒቨርሳል ጆይንት (Yoke)'
      ],
      itemizedRepairsEn: [
        'Gearbox comprehensive overhaul & rebuild',
        'Transfer gear box service (4WD High/Low)',
        'Rear flange gear box oil seal renewal',
        'Shifting lever linkage bushing & play elimination',
        'Universal joint (Yoke) replacement & greasing',
        'Gear box rubber mounting & crossmember support',
        'Clutch master cylinder rebuild or renewal',
        'Clutch slave / release cylinder hydraulic service',
        'Clutch disc cover & pressure plate renewal',
        'Hydraulic clutch line bleeding & pressure test',
        'Extension housing gasket replacement',
        'Bellhousing gasket & alignment dowels check',
        'Speedometer drive gear replacement',
        'Transmission input shaft oil seal renewal',
        'Propeller shaft front & rear universal joint service'
      ],
      itemizedRepairsAm: [
        'የጊርቦክስ ሙሉ ጥገና (Gearbox Overhaul)',
        'የትራንስፈር ጊር ቦክስ ጥገና (Transfer Gear Box)',
        'የኋላ ፍላንጅ ጊርቦክስ ኦይል ሲል (Flange Oil Seal)',
        'የማርሽ መምረጫ ሊቨርና ቡሾች ማስተካከል (Shifting Lever)',
        'ዩኒቨርሳል ጆይንት (Yoke) ቅየራና ግሪስ',
        'የጊርቦክስ ሳፖርትና ማውንቲንግ (Gearbox Mounting)',
        'የክላች ማስተር ሲሊንደር ጥገና (Clutch Master Cylinder)',
        'የክላች ሪሊዝ ሲሊንደር ጥገና (Clutch Release Cylinder)',
        'የክላች ዲስክ ከቨርና ፕሌት (Clutch Disc Cover)',
        'የሃይድሮሊክ ክላች መስመር ማጽዳት (Hydraulic Bleeding)',
        'የኤክስቴንሽን ሃውሲንግ ጋስኬት (Extension Gasket)',
        'የቤል ሃውሲንግ ጋስኬት (Bellhousing Gasket)',
        'የስፒዶሜትር ድራይቭ ጊር (Speedometer Drive Gear)',
        'የኢንፑት ሻፍት ኦይል ሲል (Input Shaft Oil Seal)',
        'የፊትና የኋላ ፕሮፔለር ሻፍት (Propeller Shaft Front/Rear)'
      ]
    },
    {
      id: 'brakes',
      sectionNumber: '03',
      imagePosition: 'right', // 3rd: Image in Right (as requested)
      nameEn: 'Hydraulic Brake System Overhaul',
      nameAm: 'የሃይድሮሊክ ፍሬን ሲስተም ሙሉ ጥገና',
      taglineEn: 'Maximum Stopping Power & Safety Assurance',
      taglineAm: 'አስተማማኝ የማቆም ብቃትና የተረጋገጠ ደህንነት',
      descriptionEn: 'High-precision brake disc machining, master cylinder pressure profiling, ABS hydraulic bleeding, and vacuum booster load testing.',
      descriptionAm: 'የፍሬን ዲስኮች ልኬትና ማስተካከል፣ የማስተር ሲሊንደር ግፊት ፍተሻ፣ የኤቢኤስ መስመሮችና የቫኪዩም ቡስተር ጥገና ለተሟላ የጉዞ ደህንነት።',
      image: '/services/brake-repairs.jpg',
      badgeEn: 'Brakes & Hubs',
      badgeAm: 'ፍሬንና የዊል ሃብ ጥገና',
      keyHighlightsEn: [
        'Brake master cylinder & vacuum booster overhaul',
        'Disc run-out machining & drum lining renewal',
        'Front & rear brake calipers hydraulic rebuild',
        'Emergency handbrake cable primer & secondary adjustment',
        'Load sensing proportioning valve & brake pipe replacement'
      ],
      keyHighlightsAm: [
        'የፍሬን ማስተር ሲሊንደርና ቫኪዩም ቡስተር ጥገና',
        'የፍሬን ዲስክ ሩን-አውት ማስተካከልና ድራም ፍተሻ',
        'የፊትና የኋላ ካሊፐሮች ሃይድሮሊክ እድሳት',
        'የእጅ ፍሬን ገመድ ማስተካከል (Parking Brake Cable)',
        'የሎድ ሴንሲንግ ቫልቭና የብሬክ ቧንቧዎች ቅየራ'
      ],
      itemizedRepairsEn: [
        'Brake booster vacuum diaphragm & valve service',
        'Brake master cylinder piston & seals renewal',
        'Parking brake cable primary & secondary replacement',
        'Front wheel brake cylinders hydraulic overhaul',
        'Rear wheel brake cylinders overhaul',
        'Front flexible high-pressure brake hoses replacement',
        'Rear high-pressure brake hoses replacement',
        'Front brake caliper piston seal rebuild',
        'Rear brake caliper servicing',
        'Engine vacuum pump & diesel alternator pump overhaul',
        'Wheel hub studs & lug bolts replacement',
        'Front hub bearing repacking & seal replacement',
        'Rear hub bearing service',
        'Brake disc rotor resurfacing / replacement',
        'Brake drum skimming & shoe relining',
        'Brake pads front & rear installation with anti-squeal shims',
        'Pressure compensator / load sensing proportioning valve',
        'Front & rear full-floating axle seals service',
        'Complete hydraulic pressure bleeding with DOT4 fluid'
      ],
      itemizedRepairsAm: [
        'የፍሬን ቫኪዩም ቡስተር ጥገና (Brake Booster)',
        'የፍሬን ማስተር ሲሊንደር እድሳት (Brake Master Cylinder)',
        'የእጅ ፍሬን ገመዶች ቅየራ (Parking Cable Primary/Secondary)',
        'የፊት ጎማ ፍሬን ሲሊንደር ጥገና (Wheel Cylinder Front)',
        'የኋላ ጎማ ፍሬን ሲሊንደር ጥገና (Wheel Cylinder Rear)',
        'የፊት ከፍተኛ ግፊት ፍሬን ሆስ (Front Brake Hose)',
        'የኋላ ከፍተኛ ግፊት ፍሬን ሆስ (Rear Brake Hose)',
        'የፊት ፍሬን ካሊፐር ጥገና (Caliper Front)',
        'የኋላ ፍሬን ካሊፐር ጥገና (Caliper Rear)',
        'የቫኪዩም ፓምፕ እድሳት (Vacuum Pump Overhaul)',
        'የዊል ቦልቶችና ነቶች ቅየራ (Wheel Bolts)',
        'የፊት ዊል ሃብ ጥገናና ቤሪንግ (Front Hub)',
        'የኋላ ዊል ሃብ ጥገናና ቤሪንግ (Rear Hub)',
        'የፍሬን ዲስክ ማስተካከልና ቅየራ (Brake Discs)',
        'የፍሬን ድራም ማስተካከልና ጫማ (Brake Drums & Shoes)',
        'የፊትና የኋላ ፍሬን ፓድ ቅየራ (Brake Pads Front/Rear)',
        'የግፊት ማካካሻ ሎድ ቫልቭ (Load Valve / Compensator)',
        'የፊትና የኋላ አክስል ኦይል ሲል (Front/Rear Axle Seals)',
        'የፍሬን ዘይትና አየር ማውጣት (Hydraulic Bleeding)'
      ]
    },
    {
      id: 'suspension',
      sectionNumber: '04',
      imagePosition: 'left', // 4th: Image in Left (as requested)
      nameEn: 'Suspension, Steering & Chassis Alignment',
      nameAm: 'የሰስፔንሽን፣ ስቲሪንግና ሻሲ ጥገና',
      taglineEn: 'Stability, Comfort & Off-Road Durability',
      taglineAm: 'የተሽከርካሪ መረጋጋት፣ ምቾትና የሻሲ ጥንካሬ',
      descriptionEn: 'Heavy-duty suspension rebuilds for Toyota Hilux, Land Cruiser and Prado. Leaf spring bundle rebuilding, coil spring replacement, and steering linkage play elimination.',
      descriptionAm: 'ለToyota Hilux፣ Land Cruiser እና Prado የተዘጋጀ የባለ ሸበካ (Leaf Spring) እድሳት፣ የሾክ አምፖርሳዶር ቅየራ፣ የስቲሪንግ ቡሾችና የሻሲ ማስተካከል ስራ።',
      image: '/services/suspension-steering.jpg',
      badgeEn: '4x4 & Heavy Duty',
      badgeAm: 'ለ 4x4 እና ከባድ ተሽከርካሪዎች',
      keyHighlightsEn: [
        'Coil springs & gas-charged shock absorbers replacement',
        'Leaf spring bundles rebuilding, re-arching & new U-bolts',
        'Stabilizer bar front & rear polyurethane/rubber bushings',
        'Lead arm bushings, torsion bars & suspension cushions',
        'Computerized 3D steering alignment & camber/toe tuning'
      ],
      keyHighlightsAm: [
        'የኮይል ስፕሪንግና ጋዝ ሾክ አምፖርሳዶሮች ቅየራ',
        'የባለ ሸበካ ስፕሪንግ (Leaf Spring) ማደስና U-Bolt',
        'የፊትና የኋላ ስታቢላይዘር ቡሾች ቅየራ',
        'የሊድ አርም ቡሾች፣ ቶርሽን ባርና የሰስፔንሽን ኩሽኖች',
        'የኮምፒውተር ስቲሪንግ አላይንመንት (Alignment & Toe)'
      ],
      itemizedRepairsEn: [
        'Coil spring front replacement (left/right)',
        'Coil spring rear heavy duty replacement',
        'Front shock absorbers replacement (twin-tube/gas)',
        'Rear shock absorbers heavy duty replacement',
        'Torsion bar adjustment & torque leveling',
        'Stabilizer sway bar front bushings renewal',
        'Stabilizer bar rear bushings renewal',
        'Leaf spring front eye bushing replacement',
        'Leaf spring rear shackle bushing replacement',
        'Lead arm (control arm) suspension bushings',
        'Bundle leaf spring complete renewal / re-arching',
        'Cushion shock absorber bump stops replacement',
        'High-tensile suspension U-Bolts replacement',
        'Main leaf spring & overload helper leaf service',
        'Steering knuckle alignment & camber calibration'
      ],
      itemizedRepairsAm: [
        'የፊት ኮይል ስፕሪንግ ቅየራ (Coil Spring Front)',
        'የኋላ ኮይል ስፕሪንግ ቅየራ (Coil Spring Rear)',
        'የፊት ሾክ አምፖርሳዶር ቅየራ (Front Shock Absorber)',
        'የኋላ ሾክ አምፖርሳዶር ቅየራ (Rear Shock Absorber)',
        'የቶርሽን ባር ማስተካከል (Torsion Bar)',
        'የፊት ስታቢላይዘር ቡሽ ቅየራ (Stabilizer Bush Front)',
        'የኋላ ስታቢላይዘር ቡሽ ቅየራ (Stabilizer Bush Rear)',
        'የፊት ሊፍ ስፕሪንግ ቡሽ (Leaf Spring Bush Front)',
        'የኋላ ሊፍ ስፕሪንግ ቡሽ (Leaf Spring Bush Rear)',
        'የሊድ አርም ቡሽ ቅየራ (Lead Arm Bushing)',
        'ሙሉ የባለ ሸበካ ስፕሪንግ እድሳት (Bundle Leaf Spring)',
        'የሾክ አምፖርሳዶር ኩሽን (Cushion Shock Absorber)',
        'የሰስፔንሽን ዩ-ቦልት ቅየራ (U-Bolt Replacement)',
        'ዋናው ሊፍ ስፕሪንግ ሰርቪስ (Main Leaf Spring)',
        'የስቲሪንግ ናክልና አላይንመንት ማስተካከል (Alignment)'
      ]
    },
    {
      id: 'electrical',
      sectionNumber: '05',
      imagePosition: 'right', // 5th: Image in Right (as requested)
      nameEn: 'Electrical, Electronics & Computer Diagnostics',
      nameAm: 'የኤሌክትሪክ፣ ኤሌክትሮኒክስና ኮምፒውተር ዲያግኖስቲክስ',
      taglineEn: 'Advanced Multiplex Wiring & Component Testing',
      taglineAm: 'ዘመናዊ የመኪና ሽቦ፣ ዳሳሾችና የኮምፒውተር ምርመራ',
      descriptionEn: 'Toyota-trained specialists utilizing advanced scan tools for powertrain, charging system alternators, high-torque starter motors, and multiplex body electronics.',
      descriptionAm: 'በToyota የሰለጠኑ ባለሙያዎች በዘመናዊ የዲያግኖስቲክስ ኮምፒውተሮች በመታገዝ የቻርጅ ሲስተም፣ ስታርተር ሞተር፣ ሴንሰሮችና ኤሌክትሮኒክስን ይመረምራሉ።',
      image: '/services/electrical-diagnostics.jpg',
      badgeEn: 'Computer Diagnostics',
      badgeAm: 'ዘመናዊ ኮምፒውተር ዲያግኖስቲክስ',
      keyHighlightsEn: [
        'Heavy-duty starter motor & solenoid overhaul',
        'High-output alternator diode pack & regulator service',
        'OBD-II live telemetry scan & ECU trouble code clearing',
        'Diesel glow plug heating circuit & relay diagnostics',
        'Complete vehicle lighting, wiper motor & ignition barrel'
      ],
      keyHighlightsAm: [
        'የስታርተር ሞተርና ሶሌኖይድ ሙሉ ጥገና',
        'የአልተርኔተር ዳዮድ፣ ሬጉሌተርና ቻርጅ ፍተሻ',
        'የኮምፒውተር OBD-II ዲያግኖስቲክስ ስካንና ዳሳሾች',
        'የዲሴል ግሎው ፕላግ (ካንዴላ) መስመር ፍተሻ',
        'የመብራቶች፣ ዋይፐር ሞተርና ኢግኒሽን ሲሊንደር ጥገና'
      ],
      itemizedRepairsEn: [
        'Starter motor armature, brushes & solenoid rebuild',
        'Alternator rotor, stator & voltage regulator overhaul',
        'Automotive electric wiring fault tracing & repair',
        'Windshield wiper motor & linkage assembly overhaul',
        'Diesel glow plug resistance testing & replacement',
        'Warning horn & steering wheel horn contact service',
        'Alternator charging system amp/volt dynamic load test',
        'Headlight assembly & leveling motor adjustment',
        'Headlamp high-output halogen / LED bulb replacement',
        'Tail light assemblies & reverse light circuits',
        'Interior dome lights & door open sensor switches',
        'Side repeater turn indicator lamp wiring',
        'License number plate lighting assembly',
        'Odometer speed sensor & mechanical cable replacement',
        'Ignition key lock cylinder & electrical switch replacement'
      ],
      itemizedRepairsAm: [
        'የስታርተር ሞተርና ሶሌኖይድ ጥገና (Starter Motor)',
        'የአልተርኔተርና ቮልቴጅ ሬጉሌተር ጥገና (Alternator)',
        'የመኪና ሽቦ መስመሮች ፍተሻና ጥገና (Electric System)',
        'የዋይፐር ሞተርና ሊንኬጅ ጥገና (Wiper Motor & Linkage)',
        'የግሎው ፕላግ (ካንዴላ) ቅየራ (Glow Plugs)',
        'የክላክስ መስመርና ቁልፍ ፍተሻ (Horn Circuit)',
        'የቻርጅ ሲስተም ሙሉ ፍተሻ (Charging System)',
        'የፊት ዋና መብራት አሰባሰብ (Head Light Assembly)',
        'የፊት መብራት አምፑል ቅየራ (Head Lamp Bulbs)',
        'የኋላ መብራቶች ጥገና (Tail Light Assemblies)',
        'የውስጥ መብራትና የበር ዳሳሽ (Interior Lamps)',
        'የጎን ሲግናል መብራት (Side Repeaters)',
        'የሰሌዳ መብራት ጥገና (Number Plate Lamp)',
        'የስፒዶሜትር ኬብልና ሴንሰር (Odometer Cable)',
        'የኢግኒሽን ቁልፍ ሲሊንደር ጥገና (Ignition Key Cylinder)'
      ]
    },
    {
      id: 'body_maintenance',
      sectionNumber: '06',
      imagePosition: 'left', // 6th: Image in Left (as requested)
      nameEn: 'Body Hardware, Accessories & General Care',
      nameAm: 'የቦዲ እቃዎች፣ መለዋወጫዎችና አጠቃላይ እንክብካቤ',
      taglineEn: 'Cabin Comfort, Structural Hardware & Finishing',
      taglineAm: 'የተሟላ የበር እቃዎች፣ የጭስ ማውጫና አጠቃላይ እንክብካቤ',
      descriptionEn: 'Comprehensive exterior hardware servicing including power window regulators, door locks, hood cable dampers, structural exhaust welding, and high-pressure steam wash.',
      descriptionAm: 'የመስታወት ማንሻ ሞተሮች፣ የበር እጀታዎችና ቁልፎች፣ የካፖርት ድጋፎች፣ የጭስ ማውጫ ብየዳና የከፍተኛ ግፊት እጥበት አገልግሎት።',
      image: '/services/body-maintenance.jpg',
      badgeEn: 'Body & Maintenance',
      badgeAm: 'የቦዲና አጠቃላይ ሰርቪስ',
      keyHighlightsEn: [
        'Electric power window regulator & motor overhaul',
        'Door lock actuators, internal & external handles',
        'Rear tailgate glass, gas struts & rubber seals',
        'Front radiator grill, mudguards & side step running boards',
        'Exhaust pipe welding, structural silencer & chassis steam wash'
      ],
      keyHighlightsAm: [
        'የኤሌክትሪክ መስታወት ማንሻ ሞተር ጥገና (Power Window)',
        'የበር መቆለፊያዎች፣ የውስጥና የውጭ እጀታዎች',
        'የኋላ በር መስታወትና የካፖርት ድጋፍ ጋዝ ስትረቶች',
        'የፊት ራዲያተር ግሪል፣ የጭቃ መከላከያና የእግር መርገጫ',
        'የጭስ ማውጫ ብየዳ፣ ሳለንሰርና ከፍተኛ የሻሲ እጥበት'
      ],
      itemizedRepairsEn: [
        'Electric power window regulator mechanism & switches',
        'Door lock central locking actuator replacement',
        'Door handles internal & external replacement',
        'Door key tumblers & master key synchronization',
        'Back door tailgate glass & defroster repair',
        'Back door & hood gas damper struts replacement',
        'Seat belt retractor mechanism & safety buckle service',
        'Front radiator protection grill & badge mounting',
        'Hood release cable & latch mechanism service',
        'Sliding door guide rollers & track alignment',
        'Sun visor replacement & mirror cover hardware',
        'Heavy-duty door hinges & hood pivot hinges',
        'Exhaust pipe structural oxy/arc welding & bracket service',
        'Side step running board mounting & alignment',
        'Front & rear aerodynamic mud guard installation',
        'Complete chassis high-pressure wash & chemical greasing'
      ],
      itemizedRepairsAm: [
        'የመስታወት ማንሻ ሞተርና ቁልፎች (Repair Power Window)',
        'የበር ሴንትራል ሎክ ሲስተም (Door Lock Actuator)',
        'የበር የውስጥና የውጭ እጀታዎች (Door Handles)',
        'የበር መክፈቻ ቁልፍ (Door Key Servicing)',
        'የኋላ በር መስታወትና ማሞቂያ (Back Door Glass)',
        'የኋላ በርና ካፖርት ጋዝ ድጋፍ (Back Door & Hood Damper)',
        'የደህንነት ቀበቶ ጥገና (Seat Belt Servicing)',
        'የፊት ራዲያተር ግሪል (Radiator Grill)',
        'የካፖርት መክፈቻ ኬብል (Hood Cable)',
        'የተንሸራታች በር ሮለርና መመሪያ (Sliding Door)',
        'የፀሐይ መከላከያ (Sun Visor)',
        'የበርና የካፖርት ማንጠልጠያ ሂንጅ (Door & Hood Hinges)',
        'የጭስ ማውጫ ብየዳና ማስተካከል (Exhaust Pipe Welding)',
        'የጎን እግር መርገጫ መግጠም (Side Stepper)',
        'የጭቃ መከላከያ ፕላስቲኮች (Mud Guard)',
        'የሻሲ እጥበትና ሙሉ ግሪስ (Wash & Greasing)'
      ]
    }
  ];

  // Filtering
  const filteredServices = useMemo(() => {
    if (selectedFilter === 'all') return servicesData;
    return servicesData.filter(s => s.id === selectedFilter);
  }, [selectedFilter]);

  const handleBookService = (service: ServiceCategory) => {
    setSelectedServiceSlug(service.nameEn);
    setCurrentView('book');
  };

  return (
    <div className="py-12 md:py-20 bg-slate-900/10 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-bold mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>{locale === 'am' ? 'የአበጋዝ ሞተርስ ይፋዊ የጥገና አገልግሎቶች' : 'Official Abegaz Motors Engineering Services'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight mb-4">
            {locale === 'am' ? 'የተሟሉ የሜካኒካልና ኤሌክትሪክ ጥገናዎች' : 'Mechanical & Electrical Overhaul Services'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {locale === 'am'
              ? 'ከሞተር ሙሉ እድሳት እስከ ማርሽ ቦክስ፣ ፍሬን፣ ሰስፔንሽንና ኤሌክትሪክ ድረስ በወረቀቱ ላይ የተመለከቱትን እያንዳንዱን ዝርዝር ጥገናዎች በዘመናዊ መሳሪያዎች እንፈጽማለን።'
              : 'From complete engine rebuilds and transmission overhauls to precision brakes, heavy-duty suspension, and computer diagnostics — engineered to factory tolerances.'}
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: 'all', labelAm: 'ሁሉም አገልግሎቶች', labelEn: 'All Services' },
              { id: 'engine', labelAm: 'ሞተር (Engine)', labelEn: 'Engine' },
              { id: 'transmission', labelAm: 'ማርሽ ቦክስ (Gearbox)', labelEn: 'Transmission' },
              { id: 'brakes', labelAm: 'ፍሬን (Brakes)', labelEn: 'Brakes' },
              { id: 'suspension', labelAm: 'ሰስፔንሽን (Suspension)', labelEn: 'Suspension' },
              { id: 'electrical', labelAm: 'ኤሌክትሪክ (Electrical)', labelEn: 'Electrical' },
              { id: 'body_maintenance', labelAm: 'ቦዲና አጠቃላይ (Body & Care)', labelEn: 'Body & Care' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all border ${
                  selectedFilter === tab.id
                    ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-red-300 hover:text-red-600'
                }`}
              >
                {locale === 'am' ? tab.labelAm : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* ALTERNATING DUAL-STYLE SHOWCASE SECTIONS */}
        <div className="space-y-12 sm:space-y-16 mb-20">
          {filteredServices.map((service, index) => {
            const isImageRight = service.imagePosition === 'right';
            const isExpanded = expandedCategoryId === service.id;

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-slate-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${
                  isImageRight ? '' : 'lg:flex-row-reverse'
                }`}>

                  {/* 1. CONTENT BLOCK (Takes 7 cols on desktop) */}
                  <div className={`lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between ${
                    isImageRight ? 'order-1' : 'order-2'
                  }`}>
                    <div>
                      {/* Top Badges & Section Number */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-xl bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-red-600/30">
                            {service.sectionNumber}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-extrabold uppercase tracking-wider border border-slate-200">
                            {locale === 'am' ? service.badgeAm : service.badgeEn}
                          </span>
                        </div>

                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                          {locale === 'am' ? 'የነጻ ግምትና ፍተሻ' : 'Free Estimate'}
                        </span>
                      </div>

                      {/* Main Title (Red Bold as requested from samples) */}
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-red-600 tracking-tight mb-2 leading-tight">
                        {locale === 'am' ? service.nameAm : service.nameEn}
                      </h2>

                      {/* Tagline */}
                      <p className="text-xs sm:text-sm font-bold text-slate-800 mb-4 tracking-wide">
                        {locale === 'am' ? service.taglineAm : service.taglineEn}
                      </p>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                        {locale === 'am' ? service.descriptionAm : service.descriptionEn}
                      </p>

                      {/* Key Highlights Checklist */}
                      <div className="space-y-2.5 mb-6 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                        <p className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
                          {locale === 'am' ? 'ዋና ዋና የጥገና ነጥቦች፦' : 'Service Capabilities:'}
                        </p>
                        {(locale === 'am' ? service.keyHighlightsAm : service.keyHighlightsEn).map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="font-medium leading-relaxed">{point}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Itemized Checklist from Paper Sheets */}
                      {isExpanded && (
                        <div className="mb-6 pt-4 border-t border-slate-200 space-y-2 bg-red-50/50 p-4 sm:p-5 rounded-2xl border border-red-100 animate-fadeIn">
                          <p className="text-xs font-black uppercase tracking-wider text-red-900 mb-3 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-red-600" />
                            <span>
                              {locale === 'am'
                                ? `የወረቀቱ ሙሉ ዝርዝር (${service.itemizedRepairsAm.length} ጥገናዎች)፦`
                                : `Complete Itemized Service List (${service.itemizedRepairsEn.length} operations):`}
                            </span>
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(locale === 'am' ? service.itemizedRepairsAm : service.itemizedRepairsEn).map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                                <span className="w-4 h-4 rounded-full bg-red-200 text-red-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="leading-snug">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Expand/Collapse Checklist Button */}
                      <button
                        onClick={() => setExpandedCategoryId(isExpanded ? null : service.id)}
                        className="text-xs font-extrabold text-red-600 hover:text-red-700 inline-flex items-center gap-1.5 transition-colors mb-6"
                      >
                        <span>
                          {isExpanded
                            ? (locale === 'am' ? 'ዝርዝር ጥገናዎችን ሰብስብ' : 'Collapse Itemized List')
                            : (locale === 'am' ? `ሁሉንም ዝርዝር ጥገናዎች ይመልከቱ (${service.itemizedRepairsAm.length} እቃዎች)` : `View All Itemized Repairs (${service.itemizedRepairsEn.length} items)`)}
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Bottom Action Row with Social Contact Badges (matching Image 1 sample) */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Social & Contact Pills (Facebook, Map, Email, Telegram) */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noreferrer"
                          title="Facebook"
                          className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-xs"
                        >
                          <span className="font-black text-sm">f</span>
                        </a>

                        <a
                          href={`tel:${WORKSHOP_INFO.phone}`}
                          title="Call Us"
                          className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-xs"
                        >
                          <PhoneCall className="w-4 h-4" />
                        </a>

                        <a
                          href={`mailto:${WORKSHOP_INFO.email}`}
                          title="Email Us"
                          className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-xs"
                        >
                          <Mail className="w-4 h-4" />
                        </a>

                        <a
                          href="https://t.me/AbegazMotors"
                          target="_blank"
                          rel="noreferrer"
                          title="Telegram / WhatsApp"
                          className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-xs"
                        >
                          <Send className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Direct Booking Button */}
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => handleBookService(service)}
                        className="w-full sm:w-auto h-12 px-6 font-black text-xs sm:text-sm shadow-md shadow-red-600/30 hover:shadow-red-600/50"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{locale === 'am' ? 'ይህንን አገልግሎት ያስይዙ' : 'Book This Service'}</span>
                      </Button>
                    </div>
                  </div>

                  {/* 2. IMAGE BLOCK (Takes 5 cols on desktop) */}
                  <div className={`lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-950 group ${
                    isImageRight ? 'order-2' : 'order-1'
                  }`}>
                    <img
                      src={service.image}
                      alt={locale === 'am' ? service.nameAm : service.nameEn}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

                    {/* Bottom floating chip */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <span className="font-extrabold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-red-400" />
                        <span>{locale === 'am' ? 'የአበጋዝ ሞተርስ ወርክሾፕ' : 'Abegaz Certified Bay'}</span>
                      </span>

                      <span className="font-bold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-emerald-400">
                        {locale === 'am' ? 'ኦሪጅናል መለዋወጫዎች' : 'Genuine Parts'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Guarantee Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-red-600/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-red-400 font-extrabold text-xs tracking-wider uppercase block mb-2">
                {locale === 'am' ? 'ፈጣን የምክርና የጥገና ቀጠሮ' : 'Fast Diagnostic & Service Booking'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                {locale === 'am'
                  ? 'ተሽከርካሪዎን ዛሬውኑ ወደ አበጋዝ ሞተርስ ይዘው ይምጡ'
                  : 'Bring Your Vehicle to Abegaz Motors Today'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {locale === 'am'
                  ? 'የተሟላ የኮምፒውተር ዲያግኖስቲክስ ምርመራ፣ የነጻ የጥገና ግምትና በባለሙያዎች የተደገፈ አስተማማኝ አገልግሎት ያገኛሉ።'
                  : 'Get a full multi-point diagnostic check, transparent repair estimates, and factory-certified workmanship backed by warranty.'}
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
                <span>{locale === 'am' ? 'የቀጠሮ ቅጽ ይሙሉ' : 'Schedule Service'}</span>
              </Button>

              <a
                href={`tel:${WORKSHOP_INFO.phone}`}
                className="h-13 px-6 rounded-btn bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold inline-flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>{locale === 'am' ? `በስልክ ይደውሉ፡ ${WORKSHOP_INFO.phone}` : `Direct Call: ${WORKSHOP_INFO.phone}`}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
