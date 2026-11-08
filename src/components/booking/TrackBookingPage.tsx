import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/Badge';
import {
  Car, 
  Clock,
  MapPin, 
  Phone, 
  Send, 
  Calendar,
  AlertTriangle,
  CalendarPlus
} from 'lucide-react';
import { Button } from '../common/Button';
import { Appointment } from '../../types';
import { WORKSHOP_INFO } from '../../lib/constants';
import { normalizeVehiclePlate } from '../../lib/vehicle';

export const TrackBookingPage: React.FC = () => {
  const { locale, appointments, setCurrentView, showToast, plateToTrack, setPlateToTrack } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [matchedAppointment, setMatchedAppointment] = useState<Appointment | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!plateToTrack) return;

    const normalizedPlate = normalizeVehiclePlate(plateToTrack);
    const found = appointments.find(a => normalizeVehiclePlate(a.vehiclePlate || '') === normalizedPlate);
    setSearchQuery(plateToTrack);
    setMatchedAppointment(found || null);
    setHasSearched(true);
    setPlateToTrack('');
  }, [appointments, plateToTrack, setPlateToTrack]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = normalizeVehiclePlate(searchQuery);
    if (!query) {
      showToast(locale === 'am' ? 'የሰሌዳ ቁጥርዎን ያስገቡ' : 'Enter your vehicle plate number', 'error');
      return;
    }

    const found = appointments.find(a => normalizeVehiclePlate(a.vehiclePlate || '') === query);

    setMatchedAppointment(found || null);
    setHasSearched(true);

    if (found) {
      showToast(locale === 'am' ? 'የመኪና ሁኔታ ተገኝቷል' : 'Vehicle status found', 'success');
    } else {
      showToast(locale === 'am' ? 'በዚህ ሰሌዳ ቁጥር ቀጠሮ አልተገኘም' : 'No repair request found for this plate number', 'error');
    }
  };

  const trackerSteps = [
    { key: 'sent', labelAm: 'ተልኳል', labelEn: 'Sent', descAm: 'ጥያቄዎ ደርሶናል', descEn: 'Request received' },
    { key: 'reviewing', labelAm: 'በግምገማ ላይ', labelEn: 'Reviewing', descAm: 'መሐንዲሳችን እያየው ነው', descEn: 'Engineer reviewing' },
    { key: 'approved', labelAm: 'ጸድቋል', labelEn: 'Approved', descAm: 'ሰዓትና ቤይ ተመድቧል', descEn: 'Slot & Bay allocated' },
    { key: 'in_progress', labelAm: 'በጥገና ላይ', labelEn: 'In Progress', descAm: 'ስራው ተጀምሯል', descEn: 'Under maintenance' },
    { key: 'completed', labelAm: 'ተጠናቋል', labelEn: 'Ready for Pickup', descAm: 'ለመረከብ ዝግጁ ነው', descEn: 'Ready for handover' }
  ];

  const getStepIndex = (status: Appointment['status']) => {
    switch (status) {
      case 'pending': return 1;
      case 'approved': return 2;
      case 'in_progress': return 3;
      case 'completed': return 4;
      case 'rejected': return 0;
      default: return 0;
    }
  };

  const currentStepIdx = matchedAppointment ? getStepIndex(matchedAppointment.status) : 0;

  return (
    <div className="py-12 md:py-20 bg-mist min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">

          
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
            {locale === 'am' ? 'የመኪናዎን ቀጠሮ ሁኔታ ይከታተሉ' : 'Track Your Vehicle Repair Status'}
          </h1>
          
          <p className="text-muted text-sm mt-3">
            {locale === 'am'
              ? 'የቀጠሮ መለያ ወይም ስልክ ሳያስፈልግ የመኪናዎን ሰሌዳ ቁጥር በማስገባት የጥገና ሁኔታውን ይመልከቱ።'
              : 'Enter your vehicle plate number to check the latest repair status—no tracking code or account needed.'}
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto">
            <div className="relative flex-1 w-full">
              <Car className="w-4 h-4 absolute left-3.5 top-3.5 text-blue-700" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'am' ? 'የመኪናዎን ሰሌዳ (ለምሳሌ AA-12345)' : 'Enter your plate, e.g. AA-12345'}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-btn border border-line text-sm font-bold text-blue-950 outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-sm font-mono uppercase tracking-wider"
                required
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto h-12 px-6 text-xs font-black shadow-md shrink-0"
            >
              <span>{locale === 'am' ? 'ሁኔታውን ይመልከቱ' : 'Check Status'}</span>
            </Button>
          </form>
        </div>

        {/* Results Workspace */}
        {hasSearched && matchedAppointment ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
            
            {/* Top Overview Card */}
            <div className="bg-white rounded-card p-6 border border-line shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
                <div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={matchedAppointment.status} locale={locale} />
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-extrabold text-blue-950 mt-2">
                    {matchedAppointment.serviceName}
                  </h2>
                </div>

                {/* Ethiopian License Plate badge */}
                <div className="flex items-center gap-3">
                  <div className="bg-white text-blue-950 font-mono font-black text-sm px-4 py-2 rounded-lg border-2 border-blue-900 shadow-sm tracking-wider">
                    🇪🇹 {matchedAppointment.vehiclePlate}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {matchedAppointment.vehicleMake} {matchedAppointment.vehicleModel} ({matchedAppointment.vehicleYear})
                  </span>
                </div>
              </div>

              {/* 5-STAGE STATUS TRACKER */}
              {matchedAppointment.status === 'rejected' ? (
                <div className="my-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-left">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <p className="font-bold text-red-900">
                      {locale === 'am' ? 'ይህን ጥያቄ መቀበል አልተቻለም' : 'This request could not be accepted'}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-red-800">
                      {locale === 'am' ? 'ተጨማሪ መረጃ ለማግኘት ከቡድናችን ጋር ይገናኙ።' : 'Please contact our team for more information or to choose another time.'}
                    </p>
                  </div>
                </div>
              ) : (
              <div className="py-6">
                <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center">
                  {trackerSteps.map((s, idx) => {
                    const isDone = idx < currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    const isUpcoming = idx > currentStepIdx;

                    return (
                      <div key={s.key} className="space-y-2">
                        <div className="relative flex items-center justify-center">
                          <div
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                              isDone
                                ? 'bg-emerald-500 text-white'
                                : isCurrent
                                ? 'bg-orange-signal text-navy font-black ring-4 ring-orange-500/30'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {isDone ? '✔' : isCurrent ? '●' : idx + 1}
                          </div>
                        </div>

                        <div>
                          <p className={`text-xs font-extrabold ${
                            isCurrent ? 'text-orange-deep' : isDone ? 'text-navy' : 'text-slate-400'
                          }`}>
                            {locale === 'am' ? s.labelAm : s.labelEn}
                          </p>
                          <span className="text-[10px] text-muted hidden sm:block">
                            {locale === 'am' ? s.descAm : s.descEn}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              )}

              {/* Bay Allocation & Timetable Specs */}
              <div className="p-4 rounded-btn bg-mist border border-line grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-line flex items-center justify-center text-orange-deep shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-muted block font-semibold">{locale === 'am' ? 'የተመደበ ሰዓት:' : 'Time Slot:'}</span>
                    <strong className="text-navy">{matchedAppointment.requestedDate} · {matchedAppointment.requestedSlot}</strong>
                    <span className="block text-[11px] text-orange-deep font-medium mt-0.5">{matchedAppointment.ethiopianTime}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-line flex items-center justify-center text-orange-deep shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-muted block font-semibold">{locale === 'am' ? 'የወርክሾፕ ቤይ:' : 'Workshop Bay:'}</span>
                    <strong className="text-navy">ነፋስ ስልክ-ላፍቶ ወርክሾፕ</strong>
                    <span className="block text-[11px] text-slate-500 mt-0.5">ከአሌክሳንደር ፑሽኪን መንገድ፣ ቄራ አካባቢ</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={WORKSHOP_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-btn bg-orange-signal text-navy font-extrabold text-xs flex items-center gap-1.5 shadow-sm hover:bg-orange-400"
                    title={WORKSHOP_INFO.addressEn}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{locale === 'am' ? 'አቅጣጫ በካርታ' : 'Get Directions'}</span>
                  </a>

                  <button
                    onClick={() => showToast(locale === 'am' ? 'ቀጠሮው ወደ ካላንደር ተቀምጧል' : 'Calendar event downloaded', 'info')}
                    className="px-3.5 py-2 rounded-btn bg-white border border-line hover:bg-slate-100 text-navy font-bold text-xs flex items-center gap-1.5"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-slate-600" />
                    <span>{locale === 'am' ? 'ወደ ካላንደር ጨምር' : 'Add to Calendar'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${WORKSHOP_INFO.phoneRaw}`}
                    className="px-3.5 py-2 rounded-btn bg-mist hover:bg-slate-200 text-navy font-bold text-xs flex items-center gap-1.5 border border-line"
                    title={`Call ${WORKSHOP_INFO.phone}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{locale === 'am' ? 'ወርክሾፕ ደውል' : 'Call Workshop'}</span>
                  </a>

                  <a
                    href="https://t.me/AbegazMotors"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-btn bg-[#229ED9] hover:bg-[#1C88BF] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        ) : hasSearched && !matchedAppointment ? (
          <div className="bg-white rounded-card p-10 border border-line shadow-sm text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-navy text-base">
                {locale === 'am' ? 'ቀጠሮው አልተገኘም' : 'No Appointment Found'}
              </h3>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                {locale === 'am'
                  ? 'እባክዎ የመኪናውን ሰሌዳ ቁጥር ያረጋግጡና እንደገና ይሞክሩ። ቀጠሮዎን አሁን ከላኩ፣ ትንሽ ጊዜ ጠብቀው ይመልከቱ።'
                  : 'Check the plate number and try again. If you just submitted your request, please allow a moment for it to appear.'}
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setCurrentView('book')}
            >
              <span>{locale === 'am' ? 'አዲስ ቀጠሮ ይያዙ' : 'Book New Appointment'}</span>
            </Button>
          </div>
        ) : null}

      </div>
    </div>
  );
};
