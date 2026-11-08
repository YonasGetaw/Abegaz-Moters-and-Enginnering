import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Mail, 
  Send, 
  PhoneCall,
  Layers
} from 'lucide-react';
import { WORKSHOP_INFO } from '../../lib/constants';

interface ServiceCategory {
  id: string;
  imagePosition: 'right' | 'left';
  nameEn: string;
  nameAm: string;
  descriptionEn: string;
  descriptionAm: string;
  image: string;
  keyHighlightsEn: string[];
  keyHighlightsAm: string[];
  itemizedRepairsEn: string[];
  itemizedRepairsAm: string[];
}

export const ServicesPage: React.FC = () => {
  const { locale } = useApp();
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  const servicesData: ServiceCategory[] = [
    {
      id: 'engine',
      imagePosition: 'right', // 1st: Image in Right (as requested)
      nameEn: 'Engine & Mechanical System Repairs',
      nameAm: 'የሞተርና የሜካኒካል ሲስተም ሙሉ ጥገና',
      descriptionEn: 'Accuracy and quality service bases not only on technicians expertise but also availability and usage of up to date diagnostic tools and modern equipment for complete engine overhauling.',
      descriptionAm: 'የአበጋዝ ሞተርስ ኢንጂነሪንግ አገልግሎት በባለሙያዎች ጥልቅ ልምድ ላይ ብቻ ሳይሆን በዘመናዊ የዲያግኖስቲክስ መሳሪያዎችና የሞተር መፈተሻ ቴክኖሎጂዎች ላይ የተመሰረተ ነው።',
      image: '/services/engine-repairs.jpg',
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
      imagePosition: 'left', // 2nd: Image in Left (as requested)
      nameEn: 'Transmission & Gearbox Engineering',
      nameAm: 'የማርሽ ቦክስና ትራንስሚሽን ምህንድስና',
      descriptionEn: 'MOENCO-level factory transmission standards. Disassembly, gear teeth wear analysis, synchronous mesh replacement, and hydraulic clutch master/release rehabilitation.',
      descriptionAm: 'የማርሽ ቦክስ ሙሉ መፍታት፣ የማርሽ ጥርሶች ፍተሻ፣ የሲንክሮናይዘር ቅየራ እና የሃይድሮሊክ ክላች ሲሊንደሮች ጥገና በከፍተኛ ጥንቃቄ ይከናወናል።',
      image: '/services/transmission-gearbox.jpg',
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
      imagePosition: 'right', // 3rd: Image in Right (as requested)
      nameEn: 'Hydraulic Brake System Overhaul',
      nameAm: 'የሃይድሮሊክ ፍሬን ሲስተም ሙሉ ጥገና',
      descriptionEn: 'High-precision brake disc machining, master cylinder pressure profiling, ABS hydraulic bleeding, and vacuum booster load testing for optimal road safety.',
      descriptionAm: 'የፍሬን ዲስኮች ልኬትና ማስተካከል፣ የማስተር ሲሊንደር ግፊት ፍተሻ፣ የኤቢኤስ መስመሮችና የቫኪዩም ቡስተር ጥገና ለተሟላ የጉዞ ደህንነት።',
      image: '/services/brake-repairs.jpg',
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
      imagePosition: 'left', // 4th: Image in Left (as requested)
      nameEn: 'Suspension, Steering & Chassis Alignment',
      nameAm: 'የሰስፔንሽን፣ ስቲሪንግና ሻሲ ጥገና',
      descriptionEn: 'Heavy-duty suspension rebuilds for Toyota Hilux, Land Cruiser and Prado. Leaf spring bundle rebuilding, coil spring replacement, and steering linkage play elimination.',
      descriptionAm: 'ለToyota Hilux፣ Land Cruiser እና Prado የተዘጋጀ የባለ ሸበካ (Leaf Spring) እድሳት፣ የሾክ አምፖርሳዶር ቅየራ፣ የስቲሪንግ ቡሾችና የሻሲ ማስተካከል ስራ።',
      image: '/services/suspension-steering.jpg',
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
      imagePosition: 'right', // 5th: Image in Right (as requested)
      nameEn: 'Toyota Trained Electrical & Diagnostic Experts',
      nameAm: 'በToyota የሰለጠኑ የኤሌክትሪክና ዲያግኖስቲክስ ባለሙያዎች',
      descriptionEn: 'MOENCO-standard training and Toyota programs enable us to diagnose electronic modules, charging systems, high-torque starter motors, and vehicle multiplex wiring.',
      descriptionAm: 'በToyota የሰለጠኑ ባለሙያዎች በዘመናዊ የዲያግኖስቲክስ ኮምፒውተሮች በመታገዝ የቻርጅ ሲስተም፣ ስታርተር ሞተር፣ ሴንሰሮችና ኤሌክትሮኒክስን ይመረምራሉ።',
      image: '/services/electrical-diagnostics.jpg',
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
      imagePosition: 'left', // 6th: Image in Left (as requested)
      nameEn: 'Body Hardware, Accessories & General Care',
      nameAm: 'የቦዲ እቃዎች፣ መለዋወጫዎችና አጠቃላይ እንክብካቤ',
      descriptionEn: 'Comprehensive exterior hardware servicing including power window regulators, door locks, hood cable dampers, structural exhaust welding, and high-pressure steam wash.',
      descriptionAm: 'የመስታወት ማንሻ ሞተሮች፣ የበር እጀታዎችና ቁልፎች፣ የካፖርት ድጋፎች፣ የጭስ ማውጫ ብየዳና የከፍተኛ ግፊት እጥበት አገልግሎት።',
      image: '/services/body-maintenance.jpg',
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

  return (
    <div className="bg-white min-h-screen text-slate-900 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Clean Editorial Title Section on Pure White Background (Two-Tone Blue & Red) */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-tight">
            {locale === 'am' ? (
              <>
                <span className="text-blue-950">የተሟሉ የሜካኒካል</span>{' '}
                <span className="text-red-600">እና ኤሌክትሪክ ጥገናዎች</span>
              </>
            ) : (
              <>
                <span className="text-blue-950">Mechanical &</span>{' '}
                <span className="text-red-600">Electrical Overhaul Services</span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            {locale === 'am'
              ? 'ከሞተር ሙሉ እድሳት እስከ ማርሽ ቦክስ፣ ፍሬን፣ ሰስፔንሽንና ኤሌክትሪክ ድረስ በፋብሪካው መመሪያ መሰረት በዘመናዊ መመርመሪያ ማሽኖች የሚከናወኑ አገልግሎቶች።'
              : 'Factory-standard engineering procedures for complete engine rebuilding, transmission overhaul, brake precision, and computerized diagnostics.'}
          </p>
        </div>

        {/* OPEN EDITORIAL SECTIONS — NO CARDS, PURE CLEAN WHITE BACKGROUND, EXACT ALTERNATING ORDER */}
        <div className="divide-y divide-slate-100 space-y-16 md:space-y-24">
          {servicesData.map((service) => {
            const isImageRight = service.imagePosition === 'right';
            const isExpanded = expandedCategoryId === service.id;

            return (
              <section
                key={service.id}
                className="pt-16 md:pt-24 first:pt-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                  {/* CONTENT COLUMN (7 Columns on Large Screens) */}
                  <div className={`lg:col-span-7 flex flex-col justify-center ${
                    isImageRight ? 'order-1' : 'order-2'
                  }`}>
                    
                    {/* Red Bold Headline (matching sample "Toyota Trained Experts" / "Latest Equipment") */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600 tracking-tight leading-tight mb-4">
                      {locale === 'am' ? service.nameAm : service.nameEn}
                    </h2>

                    {/* Editorial Description Paragraph */}
                    <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-6">
                      {locale === 'am' ? service.descriptionAm : service.descriptionEn}
                    </p>

                    {/* Clean Feature Checklist */}
                    <div className="space-y-2.5 mb-8">
                      {(locale === 'am' ? service.keyHighlightsAm : service.keyHighlightsEn).map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                          <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                          <span className="font-medium leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expandable Full Checklist from Workshop Sheets */}
                    {isExpanded && (
                      <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 animate-fadeIn">
                        <p className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-red-600" />
                          <span>
                            {locale === 'am'
                              ? `የወረቀቱ ሙሉ ዝርዝር (${service.itemizedRepairsAm.length} ጥገናዎች)፦`
                              : `Complete Itemized Service List (${service.itemizedRepairsEn.length} operations):`}
                          </span>
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {(locale === 'am' ? service.itemizedRepairsAm : service.itemizedRepairsEn).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-750">
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
                      onClick={() => setExpandedCategoryId(isExpanded ? null : service.id)}
                      className="text-xs sm:text-sm font-extrabold text-red-600 hover:text-red-700 inline-flex items-center gap-1.5 transition-colors mb-8 self-start"
                    >
                      <span>
                        {isExpanded
                          ? (locale === 'am' ? 'ዝርዝር ጥገናዎችን ሰብስብ' : 'Collapse Itemized List')
                          : (locale === 'am' ? `ሁሉንም ዝርዝር ጥገናዎች ይመልከቱ (${service.itemizedRepairsAm.length} እቃዎች)` : `View All Itemized Repairs (${service.itemizedRepairsEn.length} items)`)}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {/* Red Pill Social Contact Bar (Exact Replica of MOENCO / Sample Design) */}
                    <div className="inline-flex items-center bg-red-600 text-white rounded-xl px-4 py-2.5 gap-4 shadow-sm self-start">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        title="Facebook"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <span className="font-black text-lg leading-none">f</span>
                      </a>

                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent('Abegaz Motors, Addis Ababa')}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Location"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <MapPin className="w-5 h-5" />
                      </a>

                      <a
                        href={`mailto:${WORKSHOP_INFO.email}`}
                        title="Email"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <Mail className="w-5 h-5" />
                      </a>

                      <a
                        href="https://t.me/AbegazMotors"
                        target="_blank"
                        rel="noreferrer"
                        title="Telegram / WhatsApp"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <Send className="w-5 h-5" />
                      </a>
                    </div>

                  </div>

                  {/* IMAGE COLUMN (5 Columns on Large Screens) */}
                  <div className={`lg:col-span-5 relative overflow-hidden rounded-2xl ${
                    isImageRight ? 'order-2' : 'order-1'
                  }`}>
                    <img
                      src={service.image}
                      alt={locale === 'am' ? service.nameAm : service.nameEn}
                      className="w-full h-auto max-h-[480px] object-cover object-center rounded-2xl shadow-md"
                    />
                  </div>

                </div>
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
};
