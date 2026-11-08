import React from 'react';
import { useApp } from '../../context/AppContext';

export const PartnersSection: React.FC = () => {
  const { locale } = useApp();

  const partners = [
    {
      id: 'au',
      name: 'African Union',
      nameAm: 'የአፍሪካ ህብረት',
      subtitle: 'Pan-African Intergovernmental Body',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[170px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* AU Emblem: Laurel wreath and African continent */}
          <g transform="translate(10, 5)">
            <circle cx="28" cy="28" r="26" fill="#006633" fillOpacity="0.08" stroke="#006633" strokeWidth="2" />
            {/* Stylized African Continent Silhouette */}
            <path d="M22 14 C27 13, 35 15, 36 21 C37 25, 33 27, 34 32 C35 36, 29 42, 27 43 C25 41, 23 37, 23 33 C20 30, 18 26, 19 22 Z" fill="#006633" />
            <circle cx="34" cy="38" r="2" fill="#D4AF37" />
            {/* Wreath leaves */}
            <path d="M12 28 C12 37 19 44 28 44" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M44 28 C44 37 37 44 28 44" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
          {/* Typography */}
          <text x="75" y="30" fill="#006633" fontFamily="sans-serif" fontSize="15" fontWeight="900" letterSpacing="0.8">AFRICAN UNION</text>
          <text x="75" y="47" fill="#4B6B55" fontFamily="sans-serif" fontSize="9.5" fontWeight="600" letterSpacing="0.4">UNION AFRICAINE</text>
        </svg>
      )
    },
    {
      id: 'uneca',
      name: 'UN Economic Commission for Africa',
      nameAm: 'የተባበሩት መንግስታት የኢኮኖሚ ኮሚሽን (UNECA)',
      subtitle: 'United Nations ECA',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[175px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* UNECA UN Emblem in Official Cyan */}
          <g transform="translate(8, 6)">
            <circle cx="28" cy="28" r="25" fill="#009EDB" fillOpacity="0.08" stroke="#009EDB" strokeWidth="2" />
            <ellipse cx="28" cy="28" rx="22" ry="12" stroke="#009EDB" strokeWidth="1.2" fill="none" />
            <line x1="28" y1="5" x2="28" y2="51" stroke="#009EDB" strokeWidth="1.2" />
            <line x1="6" y1="28" x2="50" y2="28" stroke="#009EDB" strokeWidth="1.2" />
            {/* Olive Branches */}
            <path d="M13 32 C12 40 18 46 28 48 C38 46 44 40 43 32" stroke="#009EDB" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
          <text x="74" y="27" fill="#009EDB" fontFamily="sans-serif" fontSize="16" fontWeight="900" letterSpacing="0.5">UN-ECA</text>
          <text x="74" y="42" fill="#0F4C81" fontFamily="sans-serif" fontSize="8.5" fontWeight="700">United Nations</text>
          <text x="74" y="52" fill="#5A6B82" fontFamily="sans-serif" fontSize="7.5" fontWeight="600">Economic Commission for Africa</text>
        </svg>
      )
    },
    {
      id: 'abyssinia',
      name: 'Bank of Abyssinia',
      nameAm: 'የዐቢሲንያ ባንክ',
      subtitle: 'Bank of Abyssinia',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[175px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* BoA Iconic Rhombus/Diamond Monogram */}
          <g transform="translate(10, 8)">
            <rect x="12" y="3" width="28" height="28" rx="4" transform="rotate(45 26 17)" fill="#F5A800" />
            <rect x="17" y="8" width="18" height="18" rx="2" transform="rotate(45 26 17)" fill="#0B2341" />
            <circle cx="26" cy="17" r="4" fill="#F5A800" />
          </g>
          <text x="74" y="28" fill="#0B2341" fontFamily="sans-serif" fontSize="13.5" fontWeight="900" letterSpacing="0.3">Bank of Abyssinia</text>
          <text x="74" y="46" fill="#D89200" fontFamily="sans-serif" fontSize="11" fontWeight="800">የዐቢሲንያ ባንክ</text>
        </svg>
      )
    },
    {
      id: 'awash-bank',
      name: 'Awash Bank',
      nameAm: 'አዋሽ ባንክ',
      subtitle: 'Awash International Bank',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[165px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Awash Stylized Blue & Orange Chevrons */}
          <g transform="translate(10, 8)">
            <path d="M12 36 L24 8 L32 24 L26 24 L24 16 L17 36 Z" fill="#005A9C" />
            <path d="M26 36 L34 16 L44 36 L36 36 L34 26 L29 36 Z" fill="#FF8200" />
            <circle cx="28" cy="12" r="3.5" fill="#FF8200" />
          </g>
          <text x="70" y="28" fill="#005A9C" fontFamily="sans-serif" fontSize="15" fontWeight="900" letterSpacing="0.4">AWASH BANK</text>
          <text x="70" y="46" fill="#D96E00" fontFamily="sans-serif" fontSize="11.5" fontWeight="800">አዋሽ ባንክ</text>
        </svg>
      )
    },
    {
      id: 'awash-insurance',
      name: 'Awash Insurance',
      nameAm: 'አዋሽ ኢንሹራንስ',
      subtitle: 'Awash Insurance Company S.C.',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[175px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Awash Insurance Shield & Gear */}
          <g transform="translate(10, 8)">
            <path d="M26 6 L44 14 V28 C44 38 36 46 26 49 C16 46 8 38 8 28 V14 Z" fill="#0A3A6B" />
            <path d="M26 12 L38 18 V28 C38 34 32 40 26 42 C20 40 14 34 14 28 V18 Z" fill="#FF8200" />
            <circle cx="26" cy="28" r="6" fill="#FFFFFF" />
          </g>
          <text x="68" y="27" fill="#0A3A6B" fontFamily="sans-serif" fontSize="12.5" fontWeight="900" letterSpacing="0.2">AWASH INSURANCE</text>
          <text x="68" y="44" fill="#0A3A6B" fontFamily="sans-serif" fontSize="9" fontWeight="700">Company S.C. · አዋሽ ኢንሹራንስ</text>
        </svg>
      )
    },
    {
      id: 'oromia-insurance',
      name: 'Oromia Insurance',
      nameAm: 'ኦሮሚያ ኢንሹራንስ',
      subtitle: 'Oromia Insurance Company S.C.',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[175px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* OIC Tri-color Seal & Oda Tree */}
          <g transform="translate(10, 8)">
            <circle cx="26" cy="27" r="24" fill="#FFFFFF" stroke="#E52528" strokeWidth="2.5" />
            <path d="M12 20 Q26 12 40 20" stroke="#000000" strokeWidth="2.5" fill="none" />
            {/* Oda Tree Silhouette */}
            <path d="M24 37 V27 C20 25 16 22 17 18 C22 18 24 22 26 22 C28 22 30 18 35 18 C36 22 32 25 28 27 V37 Z" fill="#E52528" />
            <circle cx="26" cy="16" r="3" fill="#D4AF37" />
          </g>
          <text x="68" y="27" fill="#1A1A1A" fontFamily="sans-serif" fontSize="12.5" fontWeight="900">OROMIA INSURANCE</text>
          <text x="68" y="44" fill="#E52528" fontFamily="sans-serif" fontSize="9" fontWeight="800">Company S.C. · ኦሮሚያ ኢንሹራንስ</text>
        </svg>
      )
    },
    {
      id: 'care',
      name: 'CARE Ethiopia',
      nameAm: 'ኬር ኢትዮጵያ (CARE)',
      subtitle: 'CARE International',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[160px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Official CARE Curved Orange Emblem & Dark Blue Lettering */}
          <g transform="translate(8, 10)">
            <circle cx="24" cy="24" r="22" fill="#F26522" />
            <path d="M12 24 C14 16 22 12 30 14 C34 15 36 18 35 22 C34 26 28 28 24 28 C18 28 14 32 16 36" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>
          <text x="64" y="36" fill="#002F6C" fontFamily="sans-serif" fontSize="24" fontWeight="900" letterSpacing="-0.5">care</text>
          <text x="122" y="36" fill="#F26522" fontFamily="sans-serif" fontSize="12" fontWeight="800">ETHIOPIA</text>
          <text x="65" y="49" fill="#6B7280" fontFamily="sans-serif" fontSize="8" fontWeight="600">Defending dignity. Fighting poverty.</text>
        </svg>
      )
    },
    {
      id: 'technoserve',
      name: 'TechnoServe',
      nameAm: 'ቴክኖሰርቭ (TechnoServe)',
      subtitle: 'Business Solutions to Poverty',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[185px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* TechnoServe Rich Forest Green Leaf / Globe */}
          <g transform="translate(6, 10)">
            <path d="M12 34 C12 18 24 10 36 10 C36 26 24 34 12 34 Z" fill="#006B3F" />
            <path d="M36 10 C36 26 26 38 14 42 C28 42 42 32 42 16 C42 12 39 10 36 10 Z" fill="#78BE20" />
          </g>
          <text x="56" y="28" fill="#006B3F" fontFamily="sans-serif" fontSize="15" fontWeight="900" letterSpacing="0.4">TECHNOSERVE</text>
          <text x="56" y="44" fill="#4B6B55" fontFamily="sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="0.3">Business Solutions to Poverty</text>
        </svg>
      )
    },
    {
      id: 'farm-africa',
      name: 'Farm Africa',
      nameAm: 'ፋርም አፍሪካ (Farm Africa)',
      subtitle: 'Farm Africa Ethiopia',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[165px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Farm Africa Acacia Tree & Sun */}
          <g transform="translate(8, 10)">
            <circle cx="25" cy="20" r="14" fill="#F39200" />
            {/* Acacia Flat Canopy */}
            <path d="M10 22 C14 18 22 17 26 17 C32 17 38 19 42 22 C38 25 30 25 26 25 C20 25 14 24 10 22 Z" fill="#43883C" />
            <path d="M26 25 V40" stroke="#5C3B1E" strokeWidth="3" strokeLinecap="round" />
            <path d="M26 31 L20 26" stroke="#5C3B1E" strokeWidth="2" strokeLinecap="round" />
            <path d="M26 30 L32 26" stroke="#5C3B1E" strokeWidth="2" strokeLinecap="round" />
          </g>
          <text x="60" y="27" fill="#43883C" fontFamily="sans-serif" fontSize="15" fontWeight="900" letterSpacing="0.4">FARM AFRICA</text>
          <text x="60" y="44" fill="#F39200" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" letterSpacing="0.5">ETHIOPIA</text>
        </svg>
      )
    },
    {
      id: 'fh-ethiopia',
      name: 'FH Ethiopia',
      nameAm: 'ኤፍ ኤች ኢትዮጵያ (FH Ethiopia)',
      subtitle: 'Food for the Hungry',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[170px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* FH Navy Cross & Sprouting Wheat */}
          <g transform="translate(10, 8)">
            <rect x="18" y="8" width="16" height="36" rx="3" fill="#17355F" />
            <rect x="8" y="18" width="36" height="16" rx="3" fill="#17355F" />
            {/* Golden grain/leaf accent */}
            <path d="M26 14 C32 10 38 14 36 22 C30 22 26 18 26 14 Z" fill="#EAAA00" />
          </g>
          <text x="62" y="29" fill="#17355F" fontFamily="sans-serif" fontSize="16" fontWeight="900" letterSpacing="-0.3">fh ethiopia</text>
          <text x="62" y="46" fill="#EAAA00" fontFamily="sans-serif" fontSize="9" fontWeight="800">FOOD FOR THE HUNGRY</text>
        </svg>
      )
    },
    {
      id: 'msh',
      name: 'MSH',
      nameAm: 'ኤም ኤስ ኤች (MSH)',
      subtitle: 'Management Sciences for Health',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[180px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* MSH Circular Helix Node Motif */}
          <g transform="translate(10, 10)">
            <circle cx="24" cy="24" r="20" stroke="#00828A" strokeWidth="3" fill="none" />
            <circle cx="16" cy="20" r="5" fill="#00828A" />
            <circle cx="32" cy="20" r="5" fill="#5C768D" />
            <circle cx="24" cy="32" r="5" fill="#F26A36" />
            <path d="M16 20 L32 20 L24 32 Z" stroke="#00828A" strokeWidth="1.5" fill="none" />
          </g>
          <text x="62" y="29" fill="#00828A" fontFamily="sans-serif" fontSize="19" fontWeight="900" letterSpacing="0.2">msh</text>
          <text x="62" y="43" fill="#334155" fontFamily="sans-serif" fontSize="8" fontWeight="700">Management Sciences</text>
          <text x="62" y="52" fill="#5C768D" fontFamily="sans-serif" fontSize="7.5" fontWeight="600">for Health · Ethiopia</text>
        </svg>
      )
    },
    {
      id: 'ide',
      name: 'iDE',
      nameAm: 'አይ ዲ ኢ (iDE Ethiopia)',
      subtitle: 'Powering Entrepreneurs to End Poverty',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[185px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* iDE Orange Vibrant Loop */}
          <g transform="translate(8, 10)">
            <circle cx="24" cy="24" r="22" fill="#FFF3EB" />
            <path d="M14 24 C14 16 20 12 28 12 C36 12 36 24 28 24 C20 24 20 36 28 36 C36 36 36 30 36 30" stroke="#F36F21" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="14" cy="24" r="3" fill="#005A70" />
          </g>
          <text x="60" y="29" fill="#F36F21" fontFamily="sans-serif" fontSize="18" fontWeight="900" letterSpacing="0.4">iDE</text>
          <text x="60" y="43" fill="#005A70" fontFamily="sans-serif" fontSize="8" fontWeight="800">Powering Entrepreneurs</text>
          <text x="60" y="52" fill="#64748B" fontFamily="sans-serif" fontSize="7.5" fontWeight="700">to End Poverty</text>
        </svg>
      )
    },
    {
      id: 'lampros',
      name: 'Lampros Trading',
      nameAm: 'ላምፕሮስ ትሬዲንግ (Lampros)',
      subtitle: 'Lampros Trading PLC',
      svg: (
        <svg viewBox="0 0 240 70" className="h-12 w-auto max-w-[175px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Lampros Precision Monogram Chevron */}
          <g transform="translate(10, 10)">
            <rect x="8" y="8" width="34" height="34" rx="6" fill="#0F2C59" />
            <path d="M17 16 V34 H32" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="28" cy="20" r="3" fill="#FFFFFF" />
          </g>
          <text x="58" y="27" fill="#0F2C59" fontFamily="sans-serif" fontSize="13.5" fontWeight="900" letterSpacing="0.6">LAMPROS</text>
          <text x="58" y="42" fill="#DC2626" fontFamily="sans-serif" fontSize="9.5" fontWeight="800" letterSpacing="0.8">TRADING PLC</text>
          <text x="58" y="52" fill="#64748B" fontFamily="sans-serif" fontSize="7" fontWeight="600">Commercial & Industrial</text>
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white py-14 sm:py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Pure editorial layout, NO cards, centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-2">
            {locale === 'am' ? 'የታመነ የምህንድስና አገልግሎት' : 'Trusted Fleet & Corporate Engineering'}
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#0f2c59] tracking-tight leading-tight">
            {locale === 'am' ? (
              <>
                <span>የእኛ</span> <span className="text-red-600">አጋሮች</span>
              </>
            ) : (
              <>
                <span>Our</span> <span className="text-red-600">Partners</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto mt-3">
            {locale === 'am'
              ? 'በአዲስ አበባ እና በመላው ኢትዮጵያ በታላላቅ ዓለም አቀፍ ተቋማት፣ ባንኮች፣ የኢንሹራንስ ኩባንያዎችና መንግስታዊ ባልሆኑ ድርጅቶች የታመነ።'
              : 'Proudly trusted for fleet maintenance, diagnostics, and mechanical engineering by leading international missions, commercial banks, and enterprises.'}
          </p>
        </div>

        {/* Clean Logo Grid: Zero backgrounds, zero borders, zero cards — strictly clean logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 select-none text-center cursor-default group"
              title={locale === 'am' ? partner.nameAm : partner.name}
            >
              <div className="flex items-center justify-center transition-transform duration-300">
                {partner.svg}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
