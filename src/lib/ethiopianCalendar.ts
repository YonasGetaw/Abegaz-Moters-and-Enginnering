/**
 * Ethiopian Calendar and Local Time Helper
 * Localizes Gregorian dates and 24-hr times to Ethiopian conventions as specified in PRD Section 11.5
 */

// Format Ethiopian Date using Intl API when available or fallback calculation
export function formatEthiopianDate(gregorianDateStr: string, locale: 'am' | 'en' = 'am'): string {
  try {
    const [year, month, day] = gregorianDateStr.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    
    // Use Intl Ethiopian calendar formatting
    const formatter = new Intl.DateTimeFormat(locale === 'am' ? 'am-ET-u-ca-ethiopic' : 'en-ET-u-ca-ethiopic', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return formatter.format(date);
  } catch (err) {
    return gregorianDateStr;
  }
}

/**
 * Converts 24-hour time string (e.g. "08:30", "14:00") to Ethiopian Time
 * Ethiopian day starts at 6:00 AM (0 ሰዓት).
 * 08:00 AM -> 2:00 ሰዓት (ጠዋት)
 * 14:00 PM -> 8:00 ሰዓት (ከሰዓት)
 */
export function formatEthiopianTime(timeStr: string, locale: 'am' | 'en' = 'am'): string {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  
  // Ethiopian hour is (hours - 6) % 12
  let ethHours = hours - 6;
  if (ethHours <= 0) {
    ethHours += 12;
  } else if (ethHours > 12) {
    ethHours -= 12;
  }
  
  const periodAm = hours >= 6 && hours < 12 
    ? 'ጠዋት' 
    : (hours >= 12 && hours < 18 ? 'ከሰዓት' : 'ማታ');
  const periodEn = hours >= 6 && hours < 12 
    ? 'Morning' 
    : (hours >= 12 && hours < 18 ? 'Afternoon' : 'Night');

  if (locale === 'am') {
    return `${timeStr} (${ethHours}:${minutes} ${periodAm})`;
  } else {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const civHours = hours % 12 || 12;
    return `${civHours}:${minutes} ${ampm} (${ethHours}:${minutes} Eth. time)`;
  }
}

/**
 * Checks if workshop is open right now based on Africa/Addis_Ababa timezone (UTC+3)
 */
export function isWorkshopOpenNow(): { isOpen: boolean; nextStatusAm: string; nextStatusEn: string } {
  const now = new Date();
  // Addis Ababa is UTC+3
  const utcHours = now.getUTCHours();
  const utcDay = now.getUTCDay();
  const eatHours = (utcHours + 3) % 24;
  
  // Monday (1) to Saturday (6): 8:00 to 18:00 (6:00 PM)
  const isWorkDay = utcDay >= 1 && utcDay <= 6;
  const isOpenHours = eatHours >= 8 && eatHours < 18;
  
  if (isWorkDay && isOpenHours) {
    return {
      isOpen: true,
      nextStatusAm: 'አሁን ክፍት ነው (እስከ 12:00 ሰዓት)',
      nextStatusEn: 'Open now (until 6:00 PM)'
    };
  }
  
  return {
    isOpen: false,
    nextStatusAm: 'አሁን ዝግ ነው — ነገ 2:00 (8:00 AM) ይከፈታል',
    nextStatusEn: 'Closed now — Opens tomorrow at 8:00 AM'
  };
}
