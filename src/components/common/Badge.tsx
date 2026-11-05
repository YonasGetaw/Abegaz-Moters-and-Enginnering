import React from 'react';
import { AppointmentStatus } from '../../types';
import { Clock, Check, X, Wrench, CheckCheck } from 'lucide-react';

interface BadgeProps {
  status: AppointmentStatus;
  locale?: 'am' | 'en';
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, locale = 'am' }) => {
  const configs = {
    pending: {
      bg: 'bg-[#FEF3C7]',
      text: 'text-[#92400E]',
      border: 'border-[#FDE68A]',
      icon: <Clock className="w-3.5 h-3.5" />,
      labelAm: 'በመጠባበቅ ላይ',
      labelEn: 'Pending',
    },
    approved: {
      bg: 'bg-[#DCFCE7]',
      text: 'text-[#166534]',
      border: 'border-[#BBF7D0]',
      icon: <Check className="w-3.5 h-3.5 stroke-[2.5]" />,
      labelAm: 'ጸድቋል',
      labelEn: 'Approved',
    },
    rejected: {
      bg: 'bg-[#FEE2E2]',
      text: 'text-[#991B1B]',
      border: 'border-[#FECACA]',
      icon: <X className="w-3.5 h-3.5 stroke-[2.5]" />,
      labelAm: 'ውድቅ ተደርጓል',
      labelEn: 'Rejected',
    },
    in_progress: {
      bg: 'bg-[#DBEAFE]',
      text: 'text-[#1E40AF]',
      border: 'border-[#BFDBFE]',
      icon: <Wrench className="w-3.5 h-3.5" />,
      labelAm: 'በስራ ላይ',
      labelEn: 'In Progress',
    },
    completed: {
      bg: 'bg-[#E2E8F0]',
      text: 'text-[#334155]',
      border: 'border-[#CBD5E1]',
      icon: <CheckCheck className="w-3.5 h-3.5 stroke-[2.5]" />,
      labelAm: 'ተጠናቋል',
      labelEn: 'Completed',
    },
  };

  const current = configs[status] || configs.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${current.bg} ${current.text} ${current.border} shadow-sm select-none`}>
      {current.icon}
      <span>{locale === 'am' ? current.labelAm : current.labelEn}</span>
    </span>
  );
};
