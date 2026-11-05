import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WORKSHOP_INFO } from '../../lib/constants';
import { MapPin, Navigation, ExternalLink, RotateCcw } from 'lucide-react';

interface LeafletMapProps {
  locale: 'am' | 'en';
}

const LAT = 8.9856892;
const LNG = 38.7464144;
const DEFAULT_ZOOM = 16;

export const LeafletMap: React.FC<LeafletMapProps> = ({ locale }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent duplicate map instances in React StrictMode
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [LAT, LNG],
      zoom: DEFAULT_ZOOM,
      scrollWheelZoom: false, // Prevent accidental scrolling when page scrolls
      zoomControl: false, // We'll add zoom control in top-right or use styled one
    });

    mapInstanceRef.current = map;

    // Add Zoom Control at top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Custom pulse pin marker for Abegaz Motors
    const customIcon = L.divIcon({
      className: 'abegaz-leaflet-marker',
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 44px; height: 44px; background: rgba(249, 115, 22, 0.35); border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 38px; height: 38px; background: #0F172A; border: 3px solid #F97316; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.35); z-index: 2;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -22],
    });

    const popupContent = `
      <div style="font-family: inherit; font-size: 13px; line-height: 1.4; color: #0F172A; min-width: 210px; padding: 2px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10B981;"></span>
          <strong style="font-size: 14px; font-weight: 800; color: #0F172A;">Abegaz Motors</strong>
        </div>
        <p style="margin: 0 0 4px 0; color: #475569; font-size: 11px;">
          ${WORKSHOP_INFO.addressEn}
        </p>
        <p style="margin: 0 0 6px 0; color: #C2410C; font-weight: 700; font-size: 11px;">
          Plus Code: ${WORKSHOP_INFO.plusCode}
        </p>
        <div style="margin: 6px 0; padding: 4px 6px; background: #F1F5F9; border-radius: 6px; font-size: 11px; font-weight: 600;">
          📞 <a href="tel:${WORKSHOP_INFO.phoneRaw}" style="color: #0F172A; text-decoration: none; font-weight: 700;">${WORKSHOP_INFO.phone}</a>
        </div>
        <div style="margin-bottom: 8px; font-size: 10px; color: #64748B;">
          🕒 ${WORKSHOP_INFO.hoursScheduleEn}
        </div>
        <a href="${WORKSHOP_INFO.googleMapsUrl}" target="_blank" rel="noreferrer" style="display: block; text-align: center; background: #F97316; color: #0F172A; font-weight: 800; padding: 6px 10px; border-radius: 8px; text-decoration: none; font-size: 11px;">
          Google Maps ›
        </a>
      </div>
    `;

    // Add marker with popup
    const marker = L.marker([LAT, LNG], { icon: customIcon }).addTo(map);
    marker.bindPopup(popupContent, { maxWidth: 280, closeButton: true });

    // Open popup after brief moment
    const timer = setTimeout(() => {
      marker.openPopup();
    }, 600);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleResetCenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([LAT, LNG], DEFAULT_ZOOM, { animate: true });
    }
  };

  return (
    <div className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-banner overflow-hidden border border-line shadow-sm bg-slate-100">
      {/* Map container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating control buttons */}
      <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
        <button
          onClick={handleResetCenter}
          className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-xs text-navy border border-line shadow-md text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 transition-all active:scale-95"
          title="Reset map view to workshop"
        >
          <RotateCcw className="w-3.5 h-3.5 text-orange-deep" />
          <span>{locale === 'am' ? 'ወደ ወርክሾፕ መልስ' : 'Re-center'}</span>
        </button>

        <a
          href={WORKSHOP_INFO.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded-lg bg-orange-signal text-navy border border-orange-400 shadow-md text-xs font-extrabold hover:bg-[#EA580C] flex items-center gap-1.5 transition-all active:scale-95"
          title="Open in Google Maps"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{locale === 'am' ? 'Google Maps ክፈት' : 'Open in Google Maps'}</span>
        </a>
      </div>

      {/* Badge at top left */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none">
        <div className="px-3 py-1.5 rounded-lg bg-navy/90 backdrop-blur-xs text-white shadow-md border border-slate-700 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-signal" />
          <div className="text-left">
            <p className="text-[11px] font-bold leading-tight">
              {locale === 'am' ? 'አበጋዝ ሞተርስ ኢንጂነሪንግ' : 'Abegaz Motors Engineering'}
            </p>
            <p className="text-[9px] text-slate-300 leading-tight">
              {locale === 'am' ? WORKSHOP_INFO.addressAm : WORKSHOP_INFO.addressEn}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
