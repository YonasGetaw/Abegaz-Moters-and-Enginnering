import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { WORKSHOP_INFO } from '../../lib/constants';

export const FloatingSocialMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { locale, showToast } = useApp();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    if (showToast) {
      showToast(locale === 'am' ? 'ሊንኩ ተቀድቷል!' : 'Link copied to clipboard!', 'success');
    }
    setTimeout(() => setCopied(false), 2000);
  };

  // Buttons matching the reference image from top to bottom
  const items = [
    {
      id: 'phone',
      nameAm: 'ስልክ ይደውሉ',
      nameEn: 'Call Us (0975 48 08 08)',
      href: `tel:${WORKSHOP_INFO.phoneRaw}`,
      bg: 'bg-[#00E676] hover:bg-[#00C853]',
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1C10.5 21 3 13.5 3 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.02l-2.23 2.09z" />
        </svg>
      ),
    },
    {
      id: 'sms',
      nameAm: 'ኤስኤምኤስ (SMS)',
      nameEn: 'Send SMS',
      href: `sms:${WORKSHOP_INFO.phoneRaw}`,
      bg: 'bg-[#FF3377] hover:bg-[#E60055]',
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" opacity="0.95" />
          <text
            x="12"
            y="13"
            textAnchor="middle"
            fill="#FF3377"
            fontWeight="900"
            fontSize="7"
            fontFamily="Arial, sans-serif"
            letterSpacing="-0.5"
          >
            SMS
          </text>
        </svg>
      ),
    },
    {
      id: 'telegram',
      nameAm: 'ቴሌግራም',
      nameEn: 'Telegram Channel',
      href: WORKSHOP_INFO.telegramUrl,
      target: '_blank',
      bg: 'bg-[#29B6F6] hover:bg-[#039BE5]',
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      ),
    },
    {
      id: 'tiktok',
      nameAm: 'ቲክቶክ',
      nameEn: 'TikTok',
      href: 'https://www.tiktok.com/@abegazmotors',
      target: '_blank',
      bg: 'bg-black hover:bg-neutral-800',
      icon: (
        <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.33 0 .64.06.93.16V9.03a6.35 6.35 0 00-.93-.07 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.45c1.45.96 3.19 1.53 5.06 1.55v-3.46c-.45 0-.89-.09-1.29-.25z" />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      nameAm: 'ሊንክድኢን',
      nameEn: 'LinkedIn',
      href: 'https://www.linkedin.com/company/abegaz-motors',
      target: '_blank',
      bg: 'bg-[#0077B5] hover:bg-[#006097]',
      icon: (
        <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      id: 'location',
      nameAm: 'የአውደ ጥናት አድራሻ (Google Maps)',
      nameEn: 'Workshop Location (Google Maps)',
      href: WORKSHOP_INFO.googleMapsUrl,
      target: '_blank',
      bg: 'bg-[#10B981] hover:bg-[#059669]',
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'whatsapp',
      nameAm: 'ዋትስአፕ (WhatsApp)',
      nameEn: 'WhatsApp Chat',
      href: 'https://wa.me/251975480808',
      target: '_blank',
      bg: 'bg-[#25D366] hover:bg-[#20BA5A]',
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
    {
      id: 'link',
      nameAm: copied ? 'ተቀድቷል!' : 'ሊንኩን ቅዳ',
      nameEn: copied ? 'Copied!' : 'Copy Website Link',
      href: '#',
      onClick: handleCopyLink,
      bg: 'bg-[#1E88E5] hover:bg-[#1976D2]',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
    {
      id: 'messenger',
      nameAm: 'ሜሴንጀር (Messenger)',
      nameEn: 'Facebook Messenger',
      href: 'https://m.me/abegazmotors',
      target: '_blank',
      bg: 'bg-[#0084FF] hover:bg-[#0074E4]',
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.14 7.17.16.14.26.35.26.57l-.05 1.77c-.03.78.78 1.34 1.48.98l1.98-1.02c.18-.09.38-.11.58-.06.82.22 1.7.34 2.61.34 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.19 13.06l-2.58-2.75a.8.8 0 00-1.16 0l-3.5 3.49c-.47.47-1.17-.11-.84-.71l3.54-6.42a.8.8 0 011.16-.27l2.58 2.75a.8.8 0 001.16 0l3.5-3.49c.47-.47 1.17.11.84.71l-3.54 6.42a.8.8 0 01-1.16.27z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-50 left-4 sm:left-6 bottom-20 lg:bottom-6 flex flex-col items-center select-none"
    >
      {/* Vertically Stacked Action Buttons */}
      <div
        className={`flex flex-col items-center gap-2.5 mb-2.5 transition-all duration-300 origin-bottom ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-75 translate-y-8 pointer-events-none'
        }`}
      >
        {items.map((item, index) => {
          const content = (
            <div className="group relative flex items-center">
              {/* Circular Action Button */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${item.bg} text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer`}
                style={{
                  transitionDelay: isOpen ? `${(items.length - 1 - index) * 25}ms` : '0ms',
                }}
              >
                {item.icon}
              </div>

              {/* Tooltip Label to the Right */}
              <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900/90 text-white text-xs font-semibold rounded-md shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none drop-shadow">
                {locale === 'am' ? item.nameAm : item.nameEn}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/90" />
              </div>
            </div>
          );

          if (item.onClick) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="focus:outline-none"
                aria-label={item.nameEn}
              >
                {content}
              </button>
            );
          }

          return (
            <a
              key={item.id}
              href={item.href}
              target={item.target}
              rel={item.target ? 'noopener noreferrer' : undefined}
              className="focus:outline-none"
              aria-label={item.nameEn}
            >
              {content}
            </a>
          );
        })}
      </div>

      {/* Main Trigger Button (Matching Reference Images) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle contact & social channels"
        className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none ${
          isOpen
            ? 'bg-[#FF5252] hover:bg-[#E53935] ring-4 ring-red-200'
            : 'bg-[#FF5B5B] hover:bg-[#FF4545] shadow-[0_8px_25px_rgba(255,91,91,0.45)]'
        }`}
      >
        {isOpen ? (
          /* Bold White X when Open */
          <svg
            className="w-7 h-7 text-white transition-transform duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* Dual Speech Bubble Icon when Closed (Matching Reference Image) */
          <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
            <path
              d="M7 3C4.24 3 2 5.24 2 8c0 1.62.77 3.06 1.96 3.99L3.4 15.6a.6.6 0 00.86.64l3.14-1.57c.5.11 1.03.17 1.6.17 2.76 0 5-2.24 5-5s-2.24-5-5-5zm8 4c-.31 0-.61.03-.91.08 1.13.9 1.91 2.29 1.91 3.92 0 1.05-.33 2.02-.89 2.81.42.12.87.19 1.89.19.46 0 .89-.05 1.28-.14l2.51 1.26a.5.5 0 00.72-.53l-.44-2.96C21.36 14.88 22 13.68 22 12.3c0-2.38-1.92-4.3-4.5-4.3-.17 0-.33.01-.5.03z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
