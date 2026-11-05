import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, Eye, EyeOff, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '../common/Button';

export const RegisterScreen: React.FC = () => {
  const { locale, setLocale, setCurrentView, showToast } = useApp();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredSuccess(true);
    showToast(locale === 'am' ? 'መለያዎ ተፈጥሯል' : 'Account created');
  };

  return (
    <div className="min-h-screen bg-white text-navy p-4 sm:p-8 flex flex-col justify-between max-w-md mx-auto">
      {/* Top Header Bar */}
      <div>
        <div className="flex items-center justify-between pb-6">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-1.5 text-xs text-muted hover:text-navy"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === 'am' ? 'መነሻ' : 'Home'}</span>
          </button>

          <button
            onClick={() => setLocale(locale === 'am' ? 'en' : 'am')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-line text-xs font-bold bg-mist"
          >
            <Globe className="w-3.5 h-3.5 text-orange-signal" />
            <span>{locale === 'am' ? 'EN' : 'አማ'}</span>
          </button>
        </div>

        {/* Verification banner if registered */}
        {registeredSuccess && (
          <div className="mb-6 p-4 rounded-card bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold">
                {locale === 'am' ? 'የማረጋገጫ ሊንክ ተልኳል' : 'Verification link sent!'}
              </p>
              <p className="text-[11px] text-blue-700 mt-0.5">
                {locale === 'am'
                  ? 'ምንም ማሳወቂያ እንዳያመልጥዎ የኢሜይል ማረጋገጫ ወደ አድራሻዎ ልከናል፤ ከዚያ በኋላ በቀጥታ መግባት ይችላሉ።'
                  : 'We sent a verification link to your email, so you never miss an appointment notification.'}
              </p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="w-10 h-10 rounded-btn bg-navy text-orange-signal flex items-center justify-center font-bold text-lg mb-3">
            ⚙️
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
            {locale === 'am' ? 'መለያዎን ይፍጠሩ' : 'Create your account'}
          </h1>
          <p className="text-xs text-muted mt-1">
            {locale === 'am' ? 'ከአንድ ደቂቃ በታች ይወስዳል' : 'It takes less than a minute.'}
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy mb-1.5">
              {locale === 'am' ? 'ሙሉ ስም' : 'Full name'}
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dawit Kebede"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-12 px-3 text-sm bg-mist border border-line rounded-input focus:ring-2 focus:ring-orange-signal focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy mb-1.5">
              {locale === 'am' ? 'ስልክ ቁጥር' : 'Phone'}
            </label>
            <div className="flex">
              <span className="h-12 px-3 bg-slate-200 text-navy font-mono font-bold text-xs flex items-center rounded-l-input border border-r-0 border-line">
                +251
              </span>
              <input
                type="tel"
                required
                placeholder="9XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-12 px-3 text-sm bg-mist border border-line rounded-r-input focus:ring-2 focus:ring-orange-signal focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy mb-1.5">
              {locale === 'am' ? 'ኢሜይል' : 'Email'}
            </label>
            <input
              type="email"
              required
              placeholder="dawit@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-3 text-sm bg-mist border border-line rounded-input focus:ring-2 focus:ring-orange-signal focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy mb-1.5">
              {locale === 'am' ? 'የይለፍ ቃል' : 'Password'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-3 pr-10 text-sm bg-mist border border-line rounded-input focus:ring-2 focus:ring-orange-signal focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-navy p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* 4-Segment Strength Meter ("Good" state per prompt C2) */}
            <div className="mt-2 space-y-1">
              <div className="grid grid-cols-4 gap-1.5 h-1.5">
                <div className="bg-green-500 rounded-full" />
                <div className="bg-green-500 rounded-full" />
                <div className="bg-green-500 rounded-full" />
                <div className="bg-slate-200 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] text-muted font-medium">
                <span>{locale === 'am' ? 'የጥንካሬ ደረጃ፡ ጥሩ (Good)' : 'Strength: Good'}</span>
                <span>{locale === 'am' ? 'ቢያንስ 8 ፊደላት' : 'At least 8 characters'}</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            className="text-navy font-extrabold shadow-md mt-4"
          >
            <span>{locale === 'am' ? 'ይመዝገቡ' : 'Register'}</span>
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-muted">
          {locale === 'am' ? 'መለያ አለዎት?' : 'Already have an account?'}{' '}
          <button
            onClick={() => setCurrentView('login')}
            className="font-bold text-orange-deep hover:underline"
          >
            {locale === 'am' ? 'ይግቡ (Log in)' : 'Log in'}
          </button>
        </div>
      </div>

      <div className="text-center text-[11px] text-muted pt-8">
        © 2026 Abegaz Motors Engineering
      </div>
    </div>
  );
};
