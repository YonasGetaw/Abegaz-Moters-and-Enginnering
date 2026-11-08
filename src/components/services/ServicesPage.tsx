import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight,
  ChevronDown, 
  ChevronUp, 
  Layers
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface ServiceCategory {
  id: string;
  imagePosition: 'right' | 'left';
  codeBadge: string;
  codeBadgeAm: string;
  nameEn: string;
  nameAm: string;
  descriptionEn: string;
  descriptionAm: string;
  image: string;
  featurePillsEn: string[];
  featurePillsAm: string[];
  itemizedRepairsEn: string[];
  itemizedRepairsAm: string[];
}

export const ServicesPage: React.FC = () => {
  const { locale } = useApp();
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  const servicesData: ServiceCategory[] = [
    {
      id: 'engine',
      imagePosition: 'right', // 1st: Image in Right
      codeBadge: 'ENGINE REPAIR',
      codeBadgeAm: 'የሞተር ጥገና',
      nameEn: 'Engine & Mechanical Overhaul',
      nameAm: 'የሞተርና የሜካኒካል ሲስተም ሙሉ ጥገና',
      descriptionEn: 'Essential precision engineering with all modern diagnostic equipment for complete engine block and cylinder head rebuilds.',
      descriptionAm: 'የአበጋዝ ሞተርስ ኢንጂነሪንግ አገልግሎት በባለሙያዎች ጥልቅ ልምድና በዘመናዊ የዲያግኖስቲክስ መሳሪያዎች የተደገፈ የሞተር ሙሉ እድሳት ነው።',
      image: '/services/engine-repairs.jpg',
      featurePillsEn: ['OVERHAUL', 'INJECTION PUMP', 'TIMING BELT', 'TURBOCHARGER', '+20 More'],
      featurePillsAm: ['ሙሉ እድሳት', 'ኢንጄክሽን ፓምፕ', 'ታይሚንግ ቤልት', 'ተርቦቻርጀር', '+20 ተጨማሪ'],
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
      imagePosition: 'left', // 2nd: Image in Left
      codeBadge: 'TRANSMISSION',
      codeBadgeAm: 'ትራንስሚሽን',
      nameEn: 'Gearbox & Drivetrain Engineering',
      nameAm: 'የማርሽ ቦክስና ትራንስሚሽን ምህንድስና',
      descriptionEn: 'Factory transmission standards with modern necessities for smooth gear shifting, clutch hydraulics, and 4WD transfer integrity.',
      descriptionAm: 'የማርሽ ቦክስ ሙሉ መፍታት፣ የማርሽ ጥርሶች ፍተሻ፣ የሲንክሮናይዘር ቅየራ እና የሃይድሮሊክ ክላች ሲሊንደሮች ጥገና በከፍተኛ ጥንቃቄ ይከናወናል።',
      image: '/services/transmission-gearbox.jpg',
      featurePillsEn: ['GEARBOX OVERHAUL', 'TRANSFER 4X4', 'CLUTCH MASTER', 'U-JOINTS', '+12 More'],
      featurePillsAm: ['ጊርቦክስ ጥገና', 'ትራንስፈር 4x4', 'ክላች ማስተር', 'ዩኒቨርሳል ጆይንት', '+12 ተጨማሪ'],
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
      imagePosition: 'right', // 3rd: Image in Right
      codeBadge: 'BRAKE SYSTEM',
      codeBadgeAm: 'የፍሬን ሲስተም',
      nameEn: 'Hydraulic Brake System Precision',
      nameAm: 'የሃይድሮሊክ ፍሬን ሲስተም ሙሉ ጥገና',
      descriptionEn: 'High-precision brake disc machining, master cylinder profiling, and ABS hydraulic bleeding for dependable stopping power.',
      descriptionAm: 'የፍሬን ዲስኮች ልኬትና ማስተካከል፣ የማስተር ሲሊንደር ግፊት ፍተሻ፣ የኤቢኤስ መስመሮችና የቫኪዩም ቡስተር ጥገና ለተሟላ የጉዞ ደህንነት።',
      image: '/services/brake-repairs.jpg',
      featurePillsEn: ['MASTER CYLINDER', 'DISCS & DRUMS', 'BRAKE CALIPERS', 'VACUUM PUMP', '+15 More'],
      featurePillsAm: ['ማስተር ሲሊንደር', 'ዲስክና ድራም', 'ብሬክ ካሊፐር', 'ቫኪዩም ፓምፕ', '+15 ተጨማሪ'],
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
      imagePosition: 'left', // 4th: Image in Left
      codeBadge: 'SUSPENSION',
      codeBadgeAm: 'ሰስፔንሽን',
      nameEn: 'Suspension & Chassis Alignment',
      nameAm: 'የሰስፔንሽን፣ ስቲሪንግና ሻሲ ጥገና',
      descriptionEn: 'Heavy-duty suspension rebuilds for Toyota Hilux and Land Cruiser. Leaf spring bundle rebuilding and 3D computerized alignment.',
      descriptionAm: 'ለToyota Hilux፣ Land Cruiser እና Prado የተዘጋጀ የባለ ሸበካ (Leaf Spring) እድሳት፣ የሾክ አምፖርሳዶር ቅየራ፣ የስቲሪንግ ቡሾችና የሻሲ ማስተካከል ስራ።',
      image: '/services/suspension-steering.jpg',
      featurePillsEn: ['COIL SPRINGS', 'LEAF SPRINGS', 'SHOCK ABSORBERS', 'U-BOLTS', '+10 More'],
      featurePillsAm: ['ኮይል ስፕሪንግ', 'ሊፍ ስፕሪንግ', 'ሾክ አምፖርሳዶር', 'ዩ-ቦልት', '+10 ተጨማሪ'],
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
      imagePosition: 'right', // 5th: Image in Right
      codeBadge: 'ELECTRICAL',
      codeBadgeAm: 'ኤሌክትሪክ',
      nameEn: 'Toyota Electrical & Diagnostics',
      nameAm: 'በToyota የሰለጠኑ የኤሌክትሪክና ዲያግኖስቲክስ ባለሙያዎች',
      descriptionEn: 'Certified specialists utilizing advanced scan tools for charging systems, high-torque starter motors, and multiplex body electronics.',
      descriptionAm: 'በToyota የሰለጠኑ ባለሙያዎች በዘመናዊ የዲያግኖስቲክስ ኮምፒውተሮች በመታገዝ የቻርጅ ሲስተም፣ ስታርተር ሞተር፣ ሴንሰሮችና ኤሌክትሮኒክስን ይመረምራሉ።',
      image: '/services/electrical-diagnostics.jpg',
      featurePillsEn: ['STARTER MOTOR', 'ALTERNATOR', 'OBD-II SCAN', 'GLOW PLUGS', '+11 More'],
      featurePillsAm: ['ስታርተር ሞተር', 'አልተርኔተር', 'ኮምፒውተር ስካን', 'ግሎው ፕላግ', '+11 ተጨማሪ'],
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
      imagePosition: 'left', // 6th: Image in Left
      codeBadge: 'BODY & CARE',
      codeBadgeAm: 'ቦዲና ሰርቪስ',
      nameEn: 'Body Hardware, Accessories & General Care',
      nameAm: 'የቦዲ እቃዎች፣ መለዋወጫዎችና አጠቃላይ እንክብካቤ',
      descriptionEn: 'Essential exterior hardware servicing including power window regulators, door locks, hood dampers, exhaust welding, and steam wash.',
      descriptionAm: 'የመስታወት ማንሻ ሞተሮች፣ የበር እጀታዎችና ቁልፎች፣ የካፖርት ድጋፎች፣ የጭስ ማውጫ ብየዳና የከፍተኛ ግፊት እጥበት አገልግሎት።',
      image: '/services/body-maintenance.jpg',
      featurePillsEn: ['POWER WINDOW', 'DOOR LOCKS', 'EXHAUST WELDING', 'PRESSURE WASH', '+12 More'],
      featurePillsAm: ['መስታወት ማንሻ', 'የበር ሎክ', 'የጭስ ማውጫ ብየዳ', 'የሻሲ እጥበት', '+12 ተጨማሪ'],
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
    <div className="bg-white min-h-screen text-slate-900 pb-20">
      
      {/* 1. HERO BANNER WITH AMBIENT WORKSHOP BACKGROUND */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:py-20 border-b border-slate-200 mb-12 sm:mb-16">
        {/* Subtle Ambient Workshop Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/services/engine-repairs.jpg"
            alt="Abegaz Motors Precision Service Bay"
            className="w-full h-full object-cover object-center opacity-15 filter saturate-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-white/85 to-white" />
          <div className="absolute inset-0 bg-blueprint opacity-25 mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <ScrollReveal direction="down">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-tight">
              {locale === 'am' ? (
                <>
                  <span className="text-blue-950 font-serif">የተሟሉ የሜካኒካል</span>{' '}
                  <span className="text-red-600 font-serif">እና ኤሌክትሪክ ጥገናዎች</span>
                </>
              ) : (
                <>
                  <span className="text-blue-950 font-serif">Mechanical &</span>{' '}
                  <span className="text-red-600 font-serif">Electrical Overhaul Services</span>
                </>
              )}
            </h1>
          </ScrollReveal>

          <ScrollReveal delayMs={100}>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              {locale === 'am'
                ? 'ከሞተር ሙሉ እድሳት እስከ ማርሽ ቦክስ፣ ፍሬን፣ ሰስፔንሽንና ኤሌክትሪክ ድረስ በፋብሪካው መመሪያ መሰረት በዘመናዊ መመርመሪያ ማሽኖች የሚከናወኑ አገልግሎቶች።'
                : 'Factory-standard engineering procedures for complete engine rebuilding, transmission overhaul, brake precision, and computerized diagnostics.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. OPEN EDITORIAL SECTIONS — NO CARDS, PURE CLEAN WHITE BACKGROUND, EXACT ALTERNATING ORDER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-slate-100 space-y-16 md:space-y-24">
          {servicesData.map((service, sIndex) => {
            const isImageRight = service.imagePosition === 'right';
            const isExpanded = expandedCategoryId === service.id;

            return (
              <ScrollReveal key={service.id} delayMs={50}>
                <section className="pt-16 md:pt-24 first:pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

                    {/* CONTENT COLUMN (7 Columns on Large Screens) - Styled like Sample 2 ("Single Standard") */}
                    <div className={`lg:col-span-7 flex flex-col justify-center ${
                      isImageRight ? 'order-1' : 'order-2'
                    }`}>
                      
                      {/* Serif Bold Headline (Exact Font Style like Image 2 "Single Standard") */}
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#0f2c59] tracking-tight leading-tight mb-4">
                        {locale === 'am' ? service.nameAm : service.nameEn}
                      </h2>

                      {/* Editorial Description Paragraph */}
                      <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-6">
                        {locale === 'am' ? service.descriptionAm : service.descriptionEn}
                      </p>

                      {/* Feature Pills Line with Dark Squares (Exact Replica of Sample 2: ▪ WI-FI ▪ SHOWER ...) */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-black uppercase tracking-wider text-slate-750 mb-8">
                        {(locale === 'am' ? service.featurePillsAm : service.featurePillsEn).map((pill, idx) => (
                          <span key={idx} className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#0f2c59] rounded-xs inline-block" />
                            <span className="text-[#0f2c59]">{pill}</span>
                          </span>
                        ))}
                      </div>

                      {/* Expandable Full Checklist from Workshop Sheets */}
                      {isExpanded && (
                        <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200/80 animate-fadeIn">
                          <p className="text-xs font-black uppercase tracking-wider text-[#0f2c59] mb-4 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-red-600" />
                            <span>
                              {locale === 'am'
                                ? `የወረቀቱ ሙሉ ዝርዝር (${service.itemizedRepairsAm.length} ጥገናዎች)፦`
                                : `Complete Itemized Service List (${service.itemizedRepairsEn.length} operations):`}
                            </span>
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {(locale === 'am' ? service.itemizedRepairsAm : service.itemizedRepairsEn).map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                                <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="leading-snug">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bottom Action: "VIEW DETAILS →" (Exact Replica of Sample 2) */}
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => setExpandedCategoryId(isExpanded ? null : service.id)}
                          className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#0f2c59] hover:text-red-600 inline-flex items-center gap-2.5 transition-colors group cursor-pointer"
                        >
                          <span>
                            {isExpanded
                              ? (locale === 'am' ? 'ዝርዝር ሰብስብ' : 'HIDE DETAILS')
                              : (locale === 'am' ? 'ዝርዝር ይመልከቱ' : 'VIEW DETAILS')}
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </div>

                    {/* IMAGE COLUMN (5 Columns on Large Screens) - Styled like Sample 1 ("STANDARD" Badge + Geometric Corner Fold) */}
                    <div className={`lg:col-span-5 relative ${
                      isImageRight ? 'order-2' : 'order-1'
                    }`}>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 shadow-md bg-slate-100 group">
                        
                        {/* Rectangular Dark Navy Badge in Top-Left (Exact replica of Image 1 "STANDARD") */}
                        <div className="absolute top-5 left-5 z-10 bg-[#1e3a8a] text-white px-3.5 py-1.5 font-mono text-xs font-black tracking-widest uppercase shadow-md rounded-xs">
                          {locale === 'am' ? service.codeBadgeAm : service.codeBadge}
                        </div>

                        {/* Geometric Diamond/Triangle Fold in Top-Right Corner (Exact replica of Image 1 corner accent) */}
                        <div className="absolute top-0 right-0 z-10 w-8 h-8 pointer-events-none">
                          <div className="w-0 h-0 border-t-[32px] border-t-[#1e3a8a] border-l-[32px] border-l-transparent" />
                        </div>

                        <img
                          src={service.image}
                          alt={locale === 'am' ? service.nameAm : service.nameEn}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>

                  </div>
                </section>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </div>
  );
};
