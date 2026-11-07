export interface VehicleModel {
  id: string;
  name: string;
  nameAm: string;
  brand: string;
  category: 'ev' | 'sedan' | '4x4' | 'commercial' | 'suv';
  categoryNumber: 1 | 2 | 3 | 4 | 5 | 6;
  categoryLabelEn: string;
  categoryLabelAm: string;
  bodyType: string;
  fuelType: 'Electric' | 'Hybrid' | 'Petrol' | 'Diesel';
  image: string;
  featured?: boolean;
  servicesRecommended: string[];
}

export interface VehicleCategory {
  id: string;
  number: number;
  slug: string;
  nameEn: string;
  nameAm: string;
  descriptionEn: string;
  descriptionAm: string;
}

export const VEHICLE_CATEGORIES: VehicleCategory[] = [
  {
    id: 'cat-all',
    number: 0,
    slug: 'all',
    nameEn: 'All Vehicles',
    nameAm: 'ሁሉም ተሽከርካሪዎች',
    descriptionEn: 'Full fleet of vehicles serviced with certified genuine parts and advanced diagnostics.',
    descriptionAm: 'በኦሪጅናል መለዋወጫዎችና በዘመናዊ ዲያግኖስቲክስ የምናስተናግዳቸው ሙሉ የተሽከርካሪ ሞዴሎች።'
  },
  {
    id: 'cat-ev',
    number: 2,
    slug: 'ev',
    nameEn: 'Electric Vehicles (EV) – BYD',
    nameAm: 'የኤሌክትሪክ ተሽከርካሪዎች (EV) – BYD',
    descriptionEn: 'Specialized high-voltage battery diagnostics, motor inverter repair & BMS calibration for BYD and EV models.',
    descriptionAm: 'የከፍተኛ ቮልቴጅ ባትሪ ፍተሻ፣ ሞተር ኢንቨርተር ጥገና እና የBMS ሲስተም ልኬት ለBYD እና ኤሌክትሪክ መኪኖች።'
  },
  {
    id: 'cat-sedan',
    number: 3,
    slug: 'sedan',
    nameEn: 'Passenger Cars / Sedans',
    nameAm: 'የከተማና አነስተኛ መኪኖች (Sedans)',
    descriptionEn: 'Routine service, suspension calibration, brake systems & engine tune-ups for city sedans and hatchbacks.',
    descriptionAm: 'መደበኛ ሰርቪስ፣ የሰስፔንሽን ልኬት፣ የብሬክ ሲስተም እና የሞተር ማስተካከል ለከተማ መኪኖች።'
  },
  {
    id: 'cat-4x4',
    number: 4,
    slug: '4x4',
    nameEn: 'Utility Vehicles & 4x4',
    nameAm: 'ፎርዊል ድራይቭና ዩቲሊቲ (4x4)',
    descriptionEn: 'Differential, 4WD transfer case, off-road suspension overhaul & heavy-duty chassis maintenance.',
    descriptionAm: 'የዲፈረንሻል፣ የ4WD ትራንስፈር ኬዝ፣ ከባድ የሻሲና የሰስፔንሽን ሙሉ ተሃድሶ።'
  },
  {
    id: 'cat-commercial',
    number: 5,
    slug: 'commercial',
    nameEn: 'Commercial Vehicles',
    nameAm: 'የንግድና ጭነት ተሽከርካሪዎች',
    descriptionEn: 'Fleet maintenance, heavy load suspension, diesel common-rail injectors & transmission service.',
    descriptionAm: 'የፍሊት ድርጅታዊ ጥገና፣ የናፍጣ ኮመን-ሬይል ኢንጀክተር እና የጭነት ትራንስሚሽን ሰርቪስ።'
  },
  {
    id: 'cat-suv',
    number: 6,
    slug: 'suv',
    nameEn: 'Luxury SUVs & Crossovers',
    nameAm: 'የቅንጦት SUVs እና ክሮስኦቨር',
    descriptionEn: 'Advanced air suspension, ECU programming, premium transmission servicing & high-end diagnostics.',
    descriptionAm: 'ዘመናዊ የኤር ሰስፔንሽን፣ የECU ፕሮግራሚንግ፣ የፕሪሚየም ትራንስሚሽን ሰርቪስ እና ኤሌክትሮኒክስ ፍተሻ።'
  }
];

export const VEHICLE_BRANDS = [
  'All',
  'Toyota',
  'BYD',
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Lexus',
  'Hyundai',
  'Suzuki',
  'Nissan',
  'Ford',
  'Mitsubishi'
];

export const VEHICLES_DATA: VehicleModel[] = [
  // 1. Toyota Corolla Cross Hybrid (Reference Image 2)
  {
    id: 'toyota-corolla-cross',
    name: 'Toyota Corolla Cross Hybrid',
    nameAm: 'ቶዮታ ኮሮላ ክሮስ ሃይብሪድ',
    brand: 'Toyota',
    category: 'suv',
    categoryNumber: 6,
    categoryLabelEn: 'Luxury SUVs & Crossovers',
    categoryLabelAm: 'ክሮስኦቨርና SUVs',
    bodyType: 'Compact SUV',
    fuelType: 'Hybrid',
    image: '/vehicles/toyota-corolla-cross.png',
    featured: true,
    servicesRecommended: ['Hybrid Inverter Flush', 'Brake Energy Regen', 'ECU Tune-up']
  },
  // 2. Toyota Camry (Reference Image 2)
  {
    id: 'toyota-camry',
    name: 'Toyota Camry',
    nameAm: 'ቶዮታ ካምሪ',
    brand: 'Toyota',
    category: 'sedan',
    categoryNumber: 3,
    categoryLabelEn: 'Passenger Cars / Sedans',
    categoryLabelAm: 'የከተማና ሴዳን መኪኖች',
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    image: '/vehicles/toyota-camry.png',
    featured: true,
    servicesRecommended: ['Transmission Flush', 'Suspension Balance', 'Oil & Filter']
  },
  // 3. Toyota Corolla Sedan (Reference Image 2)
  {
    id: 'toyota-corolla-sedan',
    name: 'Toyota Corolla Sedan',
    nameAm: 'ቶዮታ ኮሮላ ሴዳን',
    brand: 'Toyota',
    category: 'sedan',
    categoryNumber: 3,
    categoryLabelEn: 'Passenger Cars / Sedans',
    categoryLabelAm: 'የከተማና ሴዳን መኪኖች',
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    image: '/vehicles/toyota-corolla-sedan.png',
    featured: true,
    servicesRecommended: ['Brake Pad Replacement', 'OBD-II Diagnostics', 'Full Service']
  },
  // 4. Toyota Yaris Hatch Back (Reference Image 3)
  {
    id: 'toyota-yaris-hatchback',
    name: 'Toyota Yaris Hatch Back',
    nameAm: 'ቶዮታ ያሪስ ሃች ባክ',
    brand: 'Toyota',
    category: 'sedan',
    categoryNumber: 3,
    categoryLabelEn: 'Passenger Cars / Sedans',
    categoryLabelAm: 'የከተማና ሴዳን መኪኖች',
    bodyType: 'Hatchback',
    fuelType: 'Petrol',
    image: '/vehicles/toyota-yaris-hatchback.png',
    featured: true,
    servicesRecommended: ['Engine Tune-up', 'AC Recharge', 'Brake Inspection']
  },
  // 5. Toyota Yaris Sedan (Reference Image 3)
  {
    id: 'toyota-yaris-sedan',
    name: 'Toyota Yaris Sedan',
    nameAm: 'ቶዮታ ያሪስ ሴዳን',
    brand: 'Toyota',
    category: 'sedan',
    categoryNumber: 3,
    categoryLabelEn: 'Passenger Cars / Sedans',
    categoryLabelAm: 'የከተማና ሴዳን መኪኖች',
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    image: '/vehicles/toyota-yaris-sedan.png',
    featured: true,
    servicesRecommended: ['Steering Alignment', 'Oil Service', 'Shock Absorbers']
  },
  // 6. Toyota RAV4 (Reference Image 3 & Cat 6)
  {
    id: 'toyota-rav4',
    name: 'Toyota RAV4',
    nameAm: 'ቶዮታ ራቭ 4 (RAV4)',
    brand: 'Toyota',
    category: 'suv',
    categoryNumber: 6,
    categoryLabelEn: 'Luxury SUVs & Crossovers',
    categoryLabelAm: 'ክሮስኦቨርና SUVs',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    image: '/vehicles/toyota-rav4.png',
    featured: true,
    servicesRecommended: ['AWD Coupling Service', 'Suspension Bushings', 'Computer Scan']
  },
  // 7. Toyota Land Cruiser (Official Cat 1, 4, 5)
  {
    id: 'toyota-land-cruiser',
    name: 'Toyota Land Cruiser (LC300 / V8)',
    nameAm: 'ቶዮታ ላንድ ክሩዘር (LC300 / V8)',
    brand: 'Toyota',
    category: '4x4',
    categoryNumber: 4,
    categoryLabelEn: 'Utility Vehicles & 4x4',
    categoryLabelAm: 'ፎርዊል ድራይቭና ዩቲሊቲ',
    bodyType: 'Heavy 4x4',
    fuelType: 'Diesel',
    image: '/vehicles/toyota-land-cruiser.png',
    featured: true,
    servicesRecommended: ['4WD Transfer Case', 'Heavy Duty Suspension', 'Brake Booster Cal']
  },
  // 8. Toyota Land Cruiser Prado (Official Cat 4)
  {
    id: 'toyota-prado',
    name: 'Toyota Prado',
    nameAm: 'ቶዮታ ፕራዶ (Prado TX/TXL)',
    brand: 'Toyota',
    category: '4x4',
    categoryNumber: 4,
    categoryLabelEn: 'Utility Vehicles & 4x4',
    categoryLabelAm: 'ፎርዊል ድራይቭና ዩቲሊቲ',
    bodyType: 'SUV / 4x4',
    fuelType: 'Diesel',
    image: '/vehicles/toyota-prado.png',
    featured: true,
    servicesRecommended: ['KDSS Suspension Calibration', 'Timing Belt & Water Pump', 'Differential Fluid']
  },
  // 9. Toyota Hilux / Revo (Official Cat 1, 5)
  {
    id: 'toyota-hilux',
    name: 'Toyota Hilux / Revo',
    nameAm: 'ቶዮታ ሃይሉክስ / ሬቮ (Revo)',
    brand: 'Toyota',
    category: 'commercial',
    categoryNumber: 5,
    categoryLabelEn: 'Commercial Vehicles',
    categoryLabelAm: 'የንግድና ጭነት ተሽከርካሪዎች',
    bodyType: 'Pickup Truck',
    fuelType: 'Diesel',
    image: '/vehicles/toyota-hilux.png',
    featured: true,
    servicesRecommended: ['Leaf Spring Overhaul', 'Turbo & Intercooler Check', 'Heavy Duty Clutch']
  },
  // 10. Toyota Highlander (Official Cat 1, 4)
  {
    id: 'toyota-highlander',
    name: 'Toyota Highlander',
    nameAm: 'ቶዮታ ሃይላንደር',
    brand: 'Toyota',
    category: '4x4',
    categoryNumber: 4,
    categoryLabelEn: 'Utility Vehicles & 4x4',
    categoryLabelAm: 'ፎርዊል ድራይቭና ዩቲሊቲ',
    bodyType: 'Mid-size SUV',
    fuelType: 'Hybrid',
    image: '/vehicles/toyota-highlander.png',
    featured: false,
    servicesRecommended: ['Hybrid Cooling System', 'CV Axle Replacement', 'Electronic Steering']
  },
  // 11. Toyota FJ Cruiser (Official Cat 1)
  {
    id: 'toyota-fj-cruiser',
    name: 'Toyota FJ Cruiser',
    nameAm: 'ቶዮታ ኤፍ ጄ ክሩዘር (FJ Cruiser)',
    brand: 'Toyota',
    category: '4x4',
    categoryNumber: 4,
    categoryLabelEn: 'Utility Vehicles & 4x4',
    categoryLabelAm: 'ፎርዊል ድራይቭና ዩቲሊቲ',
    bodyType: 'Off-road 4x4',
    fuelType: 'Petrol',
    image: '/vehicles/toyota-fj-cruiser.png',
    featured: false,
    servicesRecommended: ['A-Trac & Diff Lock', 'Underbody Anti-corrosion', 'Suspension Lift Alignment']
  },
  // 12. Toyota Vitz (Official Cat 3)
  {
    id: 'toyota-vitz',
    name: 'Toyota Vitz',
    nameAm: 'ቶዮታ ቪትዝ (Vitz)',
    brand: 'Toyota',
    category: 'sedan',
    categoryNumber: 3,
    categoryLabelEn: 'Passenger Cars / Sedans',
    categoryLabelAm: 'የከተማና ሴዳን መኪኖች',
    bodyType: 'Hatchback',
    fuelType: 'Petrol',
    image: '/vehicles/toyota-vitz.png',
    featured: false,
    servicesRecommended: ['CVT Fluid Service', 'Fuel Injector Cleaning', 'Brake Caliper Service']
  },
  // 13. Toyota Hiace (Official Cat 5)
  {
    id: 'toyota-hiace',
    name: 'Toyota Hiace',
    nameAm: 'ቶዮታ ሃይኤስ (Hiace)',
    brand: 'Toyota',
    category: 'commercial',
    categoryNumber: 5,
    categoryLabelEn: 'Commercial Vehicles',
    categoryLabelAm: 'የንግድና ጭነት ተሽከርካሪዎች',
    bodyType: 'Van / Commercial',
    fuelType: 'Diesel',
    image: '/vehicles/toyota-hiace.png',
    featured: false,
    servicesRecommended: ['Fleet Engine Overhaul', 'Brake Master Cylinder', 'Differential Rebuild']
  },
  // 14. Toyota Avanza (Official Cat 5)
  {
    id: 'toyota-avanza',
    name: 'Toyota Avanza',
    nameAm: 'ቶዮታ አቫንዛ (Avanza)',
    brand: 'Toyota',
    category: 'commercial',
    categoryNumber: 5,
    categoryLabelEn: 'Commercial Vehicles',
    categoryLabelAm: 'የንግድና ጭነት ተሽከርካሪዎች',
    bodyType: 'MPV / Compact Van',
    fuelType: 'Petrol',
    image: '/vehicles/toyota-avanza.png',
    featured: false,
    servicesRecommended: ['Drive Belt Tensioner', 'Front Struts & Shocks', 'Air Filter Service']
  },
  // 15. Toyota Rush (Official Cat 4)
  {
    id: 'toyota-rush',
    name: 'Toyota Rush',
    nameAm: 'ቶዮታ ራሽ (Rush)',
    brand: 'Toyota',
    category: '4x4',
    categoryNumber: 4,
    categoryLabelEn: 'Utility Vehicles & 4x4',
    categoryLabelAm: 'ፎርዊል ድራይቭና ዩቲሊቲ',
    bodyType: 'Compact SUV',
    fuelType: 'Petrol',
    image: '/vehicles/toyota-rush.png',
    featured: false,
    servicesRecommended: ['Rear Wheel Drive Fluid', 'Stabilizer Bushings', 'Aircon Cleaning']
  },

  // --- CAT 2: ELECTRIC VEHICLES (EV) - BYD ---
  // 16. BYD Song Plus (Official Cat 2)
  {
    id: 'byd-song-plus',
    name: 'BYD Song Plus EV / DM-i',
    nameAm: 'ቢ ዋይ ዲ ሶንግ ፕላስ (Song Plus)',
    brand: 'BYD',
    category: 'ev',
    categoryNumber: 2,
    categoryLabelEn: 'Electric Vehicles (EV) – BYD',
    categoryLabelAm: 'የኤሌክትሪክ ተሽከርካሪዎች - BYD',
    bodyType: 'Electric SUV',
    fuelType: 'Electric',
    image: '/vehicles/byd-song-plus.png',
    featured: true,
    servicesRecommended: ['Blade Battery SOH Scan', 'Thermal Liquid Loop', 'Software Update']
  },
  // 17. BYD Tang L (Official Cat 2)
  {
    id: 'byd-tang',
    name: 'BYD Tang L / EV',
    nameAm: 'ቢ ዋይ ዲ ታንግ (Tang L)',
    brand: 'BYD',
    category: 'ev',
    categoryNumber: 2,
    categoryLabelEn: 'Electric Vehicles (EV) – BYD',
    categoryLabelAm: 'የኤሌክትሪክ ተሽከርካሪዎች - BYD',
    bodyType: 'Large Electric SUV',
    fuelType: 'Electric',
    image: '/vehicles/byd-tang.png',
    featured: true,
    servicesRecommended: ['Dual Motor Diagnostics', 'Brembo Calipers Bleed', 'Battery Module Balance']
  },
  // 18. BYD Seagull (Official Cat 2)
  {
    id: 'byd-seagull',
    name: 'BYD Seagull',
    nameAm: 'ቢ ዋይ ዲ ሲጋል (Seagull)',
    brand: 'BYD',
    category: 'ev',
    categoryNumber: 2,
    categoryLabelEn: 'Electric Vehicles (EV) – BYD',
    categoryLabelAm: 'የኤሌክትሪክ ተሽከርካሪዎች - BYD',
    bodyType: 'City EV',
    fuelType: 'Electric',
    image: '/vehicles/byd-seagull.png',
    featured: true,
    servicesRecommended: ['High-voltage Isolation Test', 'Regenerative Brake Scan', 'BMS Firmware Sync']
  },
  // 19. BYD Yuan Up (Official Cat 2)
  {
    id: 'byd-yuan-up',
    name: 'BYD Yuan Up / Yuan Plus',
    nameAm: 'ቢ ዋይ ዲ ዩዋን አፕ (Yuan Up)',
    brand: 'BYD',
    category: 'ev',
    categoryNumber: 2,
    categoryLabelEn: 'Electric Vehicles (EV) – BYD',
    categoryLabelAm: 'የኤሌክትሪክ ተሽከርካሪዎች - BYD',
    bodyType: 'Compact EV Crossover',
    fuelType: 'Electric',
    image: '/vehicles/byd-yuan-up.png',
    featured: false,
    servicesRecommended: ['Heat Pump Diagnostics', 'Battery Cell Balancing', 'Suspension Tuning']
  },
  // 20. Yangwang U8 (Official Cat 2 & 6)
  {
    id: 'byd-yangwang-u8',
    name: 'BYD Yangwang U8 Luxury SUV',
    nameAm: 'ቢ ዋይ ዲ ያንግዋንግ ዩ 8 (Yangwang U8)',
    brand: 'BYD',
    category: 'ev',
    categoryNumber: 2,
    categoryLabelEn: 'Electric Vehicles (EV) – BYD',
    categoryLabelAm: 'የኤሌክትሪክ ተሽከርካሪዎች - BYD',
    bodyType: 'Ultra-Luxury EV / 4-Motor',
    fuelType: 'Electric',
    image: '/vehicles/yangwang-u8.png',
    featured: true,
    servicesRecommended: ['Quad Motor Vectoring Test', 'Hydraulic Suspension DiSus-P', 'High-Amperage Inverter']
  },

  // --- CAT 6: LUXURY SUVS ---
  // 21. Mercedes-Benz GLE (Official Cat 1, 6)
  {
    id: 'mercedes-gle',
    name: 'Mercedes-Benz GLE / G-Class',
    nameAm: 'መርሴዲስ-ቤንዝ ጂኤልኢ (GLE / G-Class)',
    brand: 'Mercedes-Benz',
    category: 'suv',
    categoryNumber: 6,
    categoryLabelEn: 'Luxury SUVs & Crossovers',
    categoryLabelAm: 'የቅንጦት SUVs',
    bodyType: 'Luxury SUV',
    fuelType: 'Petrol',
    image: '/vehicles/mercedes-gle.png',
    featured: true,
    servicesRecommended: ['Airmatic Air Suspension', '9G-Tronic Gearbox Cal', 'Mercedes Xentry Diagnosis']
  },
  // 22. BMW X5 (Official Cat 6)
  {
    id: 'bmw-x5',
    name: 'BMW X5 / xDrive',
    nameAm: 'ቢ ኤም ደብሊው ኤክስ 5 (BMW X5)',
    brand: 'BMW',
    category: 'suv',
    categoryNumber: 6,
    categoryLabelEn: 'Luxury SUVs & Crossovers',
    categoryLabelAm: 'የቅንጦት SUVs',
    bodyType: 'Luxury SUV',
    fuelType: 'Petrol',
    image: '/vehicles/bmw-x5.png',
    featured: true,
    servicesRecommended: ['xDrive Transfer Case', 'BMW ISTA Scan', 'Turbo Boost Pressure Audit']
  },
  // 23. Audi Q7 (Official Cat 1, 6)
  {
    id: 'audi-q7',
    name: 'Audi Q7 Quattro',
    nameAm: 'ኦዲ ኪው 7 (Audi Q7)',
    brand: 'Audi',
    category: 'suv',
    categoryNumber: 6,
    categoryLabelEn: 'Luxury SUVs & Crossovers',
    categoryLabelAm: 'የቅንጦት SUVs',
    bodyType: 'Luxury SUV',
    fuelType: 'Petrol',
    image: '/vehicles/audi-q7.png',
    featured: true,
    servicesRecommended: ['Quattro Differential Service', 'Air Struts Recalibration', 'VAG-COM Diagnostic']
  },
  // 24. Lexus RX / LX (Official Cat 1, 6)
  {
    id: 'lexus-rx',
    name: 'Lexus RX / LX Luxury SUV',
    nameAm: 'ሌክሰስ አር ኤክስ / ኤል ኤክስ (Lexus RX / LX)',
    brand: 'Lexus',
    category: 'suv',
    categoryNumber: 6,
    categoryLabelEn: 'Luxury SUVs & Crossovers',
    categoryLabelAm: 'የቅንጦት SUVs',
    bodyType: 'Luxury SUV',
    fuelType: 'Hybrid',
    image: '/vehicles/lexus-rx.png',
    featured: true,
    servicesRecommended: ['Lexus Hybrid Drive Service', 'Mark Levinson Sound System Check', 'Brembo Brake Service']
  },

  // --- CAT 4: UTILITY & 4X4 ---
  // 25. Nissan Patrol (Official Cat 1, 4)
  {
    id: 'nissan-patrol',
    name: 'Nissan Patrol / Armada V8',
    nameAm: 'ኒሳን ፓትሮል (Patrol / Armada)',
    brand: 'Nissan',
    category: '4x4',
    categoryNumber: 4,
    categoryLabelEn: 'Utility Vehicles & 4x4',
    categoryLabelAm: 'ፎርዊል ድራይቭና ዩቲሊቲ',
    bodyType: 'Full-size 4x4',
    fuelType: 'Petrol',
    image: '/vehicles/nissan-patrol.png',
    featured: true,
    servicesRecommended: ['HBMC Hydraulic Body Motion', 'V8 Valve Timing & Chains', '4x4 Transfer Case']
  },

  // --- CAT 5: COMMERCIAL ---
  // 26. Ford Ranger (Official Cat 1, 5)
  {
    id: 'ford-ranger',
    name: 'Ford Ranger Heavy Duty',
    nameAm: 'ፎርድ ሬንጀር (Ford Ranger)',
    brand: 'Ford',
    category: 'commercial',
    categoryNumber: 5,
    categoryLabelEn: 'Commercial Vehicles',
    categoryLabelAm: 'የንግድና ጭነት ተሽከርካሪዎች',
    bodyType: 'Pickup Truck',
    fuelType: 'Diesel',
    image: '/vehicles/ford-ranger.png',
    featured: false,
    servicesRecommended: ['Bi-Turbo Diesel Intercooler', '10-Speed Auto Fluid', 'Suspension Grease & Align']
  },

  // --- CAT 3: PASSENGER CARS ---
  // 27. Hyundai Elantra (Official Cat 1, 3)
  {
    id: 'hyundai-elantra',
    name: 'Hyundai Elantra / Accent',
    nameAm: 'ሃዩንዳይ ኢላንትራ (Elantra / Accent)',
    brand: 'Hyundai',
    category: 'sedan',
    categoryNumber: 3,
    categoryLabelEn: 'Passenger Cars / Sedans',
    categoryLabelAm: 'የከተማና ሴዳን መኪኖች',
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    image: '/vehicles/hyundai-elantra.png',
    featured: false,
    servicesRecommended: ['Dual Clutch Transmission', 'Ignition Coil Replacement', 'Electronic Steering Column']
  },
  // 28. Suzuki Swift (Official Cat 1, 3)
  {
    id: 'suzuki-swift',
    name: 'Suzuki Swift',
    nameAm: 'ሱዙኪ ስዊፍት (Suzuki Swift)',
    brand: 'Suzuki',
    category: 'sedan',
    categoryNumber: 3,
    categoryLabelEn: 'Passenger Cars / Sedans',
    categoryLabelAm: 'የከተማና ሴዳን መኪኖች',
    bodyType: 'Hatchback',
    fuelType: 'Petrol',
    image: '/vehicles/suzuki-swift.png',
    featured: false,
    servicesRecommended: ['Boosterjet Diagnostics', 'Clutch Plate & Flywheel', 'Front Suspension Links']
  },
  // 29. Suzuki Dzire (Official Cat 3)
  {
    id: 'suzuki-dzire',
    name: 'Suzuki Dzire Sedan',
    nameAm: 'ሱዙኪ ዲዛይር (Suzuki Dzire)',
    brand: 'Suzuki',
    category: 'sedan',
    categoryNumber: 3,
    categoryLabelEn: 'Passenger Cars / Sedans',
    categoryLabelAm: 'የከተማና ሴዳን መኪኖች',
    bodyType: 'Compact Sedan',
    fuelType: 'Petrol',
    image: '/vehicles/suzuki-dzire.png',
    featured: false,
    servicesRecommended: ['AGS Automated Gearbox Calibration', 'Routine 5,000km Service', 'Brake Lining Check']
  },
  // 30. Mitsubishi Attrage (Official Cat 3)
  {
    id: 'mitsubishi-attrage',
    name: 'Mitsubishi Attrage Sedan',
    nameAm: 'ሚትሱቢሺ አትሬጅ (Attrage)',
    brand: 'Mitsubishi',
    category: 'sedan',
    categoryNumber: 3,
    categoryLabelEn: 'Passenger Cars / Sedans',
    categoryLabelAm: 'የከተማና ሴዳን መኪኖች',
    bodyType: 'Compact Sedan',
    fuelType: 'Petrol',
    image: '/vehicles/mitsubishi-attrage.png',
    featured: false,
    servicesRecommended: ['MIVEC Engine Valve Check', 'CVT Fluid Flush', 'Alternator & Battery Testing']
  }
];
