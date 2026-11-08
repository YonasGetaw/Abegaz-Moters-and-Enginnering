import React from 'react';
import { useApp } from '../../context/AppContext';

export const PartnersSection: React.FC = () => {
  const { locale } = useApp();

  const partners = [
    {
      id: 'au',
      name: 'African Union',
      nameAm: 'የአፍሪካ ህብረት',
      logo: '/partners/african-union.png',
      heightClass: 'h-14 sm:h-16'
    },
    {
      id: 'uneca',
      name: 'UN Economic Commission for Africa',
      nameAm: 'የተባበሩት መንግስታት የኢኮኖሚ ኮሚሽን (UNECA)',
      logo: '/partners/uneca.svg',
      heightClass: 'h-12 sm:h-14'
    },
    {
      id: 'abyssinia',
      name: 'Bank of Abyssinia',
      nameAm: 'የዐቢሲንያ ባንክ',
      logo: '/partners/bank-of-abyssinia.png',
      heightClass: 'h-11 sm:h-13'
    },
    {
      id: 'awash-bank',
      name: 'Awash Bank',
      nameAm: 'አዋሽ ባንክ',
      logo: '/partners/awash-bank.png',
      heightClass: 'h-12 sm:h-14'
    },
    {
      id: 'awash-insurance',
      name: 'Awash Insurance',
      nameAm: 'አዋሽ ኢንሹራንስ',
      logo: '/partners/awash-insurance.png',
      heightClass: 'h-11 sm:h-13'
    },
    {
      id: 'oromia-insurance',
      name: 'Oromia Insurance',
      nameAm: 'ኦሮሚያ ኢንሹራንስ',
      logo: '/partners/oromia-insurance.png',
      heightClass: 'h-12 sm:h-14'
    },
    {
      id: 'care',
      name: 'CARE Ethiopia',
      nameAm: 'ኬር ኢትዮጵያ (CARE)',
      logo: '/partners/care.svg',
      heightClass: 'h-11 sm:h-13'
    },
    {
      id: 'technoserve',
      name: 'TechnoServe',
      nameAm: 'ቴክኖሰርቭ (TechnoServe)',
      logo: '/partners/technoserve.png',
      heightClass: 'h-11 sm:h-13'
    },
    {
      id: 'farm-africa',
      name: 'Farm Africa',
      nameAm: 'ፋርም አፍሪካ (Farm Africa)',
      logo: '/partners/farm-africa.svg',
      heightClass: 'h-10 sm:h-12'
    },
    {
      id: 'fh-ethiopia',
      name: 'FH Ethiopia',
      nameAm: 'ኤፍ ኤች ኢትዮጵያ (FH Ethiopia)',
      logo: '/partners/fh-ethiopia.png',
      heightClass: 'h-11 sm:h-13'
    },
    {
      id: 'msh',
      name: 'MSH',
      nameAm: 'ኤም ኤስ ኤች (MSH)',
      logo: '/partners/msh.png',
      heightClass: 'h-11 sm:h-13'
    },
    {
      id: 'ide',
      name: 'iDE',
      nameAm: 'አይ ዲ ኢ (iDE)',
      logo: '/partners/ide.svg',
      heightClass: 'h-10 sm:h-12'
    },
    {
      id: 'lampros',
      name: 'Lampros Trading',
      nameAm: 'ላምፕሮስ ትሬዲንግ',
      logo: '/partners/lampros-trading.png',
      heightClass: 'h-11 sm:h-13'
    }
  ];

  // Duplicate for seamless 100% infinite marquee loop
  const marqueeItems = [...partners, ...partners];

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        
        {/* Title styled like the sample image: bold green heading with pure clean presentation */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#008744] tracking-tight leading-tight">
            {locale === 'am' ? 'ታማኝ ደንበኞቻችንና አጋሮቻችን' : 'Our Emblematic Clients'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {locale === 'am' 
              ? 'በታላላቅ ዓለም አቀፍ ተቋማትና ኩባንያዎች የታመነ' 
              : 'Trusted by leading international organizations & enterprises'}
          </p>
        </div>

      </div>

      {/* Infinite Horizontal Sideways Marquee Track — Clean, pure logos, NO background cards */}
      <div className="relative w-full overflow-hidden select-none py-4">
        {/* Left & Right Soft Blur Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        <div className="animate-marquee-scroll items-center gap-14 sm:gap-20 md:gap-24 px-8">
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex items-center justify-center shrink-0 grayscale hover:grayscale-0 opacity-85 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer"
              title={locale === 'am' ? partner.nameAm : partner.name}
            >
              <img
                src={partner.logo}
                alt={locale === 'am' ? partner.nameAm : partner.name}
                className={`${partner.heightClass} w-auto max-w-[200px] object-contain`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
