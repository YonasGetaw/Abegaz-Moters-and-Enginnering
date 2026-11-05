import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Globe, Eye, EyeOff, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';

export const LoginSplitScreen: React.FC = () => {
  const { locale, setLocale, loginUser, setCurrentView } = useApp();
  const [email, setEmail] = useState('dawit@email.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setShowError(true);
      return;
    }
    const res = loginUser(email, password);
    if (res.success) {
      setCurrentView('account');
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* LEFT 45% (Navy Brand Panel with faint blueprint grid) */}
      <div className="hidden lg:flex lg:col-span-5 bg-navy text-white bg-blueprint-dark p-12 flex-col justify-between relative overflow-hidden border-r border-slate-800">
        <div>
          {/* Logo */}
          <div 
            onClick={() => setCurrentView('home')}
            className="cursor-pointer flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-btn bg-slate-800 border border-slate-700 flex items-center justify-center text-orange-signal text-xl font-bold">
              ⚙️
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight">አበጋዝ ሞተርስ</div>
              <div className="text-[10px] text-muted uppercase tracking-wider font-semibold">Engineering & Care</div>
            </div>
          </div>

          <div className="mt-16 space-y-6">
            <h1 className="text-3xl xl:text-4xl font-extrabold leading-tight text-white">
              {locale === 'am' 
                ? 'መኪናዎ፣ ቀጠሮዎ — ሁሉም በአንድ ቦታ።'
                : 'Your car, your appointments — all in one place.'}
            </h1>

            <div className="space-y-4 pt-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-signal shrink-0" />
                <span>{locale === 'am' ? 'ቀጠሮዎን በቀጥታ ይከታተሉ' : 'Track your appointments in real time'}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-signal shrink-0" />
                <span>{locale === 'am' ? 'የቀደመ የጥገና ታሪክዎን ያግኙ' : 'Access your complete vehicle service history'}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-signal shrink-0" />
                <span>{locale === 'am' ? 'ፈጣን የቴሌግራም/ኢሜይል ማሳወቂያ' : 'Get instant Telegram and Email notifications'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Workshop photo card */}
        <div className="rounded-banner overflow-hidden border border-slate-700 shadow-xl relative mt-8">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80"
            alt="Workshop bay"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-[1px]" />
          <div className="absolute bottom-3 left-4 right-4 text-xs font-semibold text-white">
            Abegaz Motors Precision Workshop · Addis Ababa
          </div>
        </div>
      </div>

      {/* RIGHT 55% (Form centered, max 400px) */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-12 flex flex-col justify-between">
        <div className="flex items-center justify-between max-w-[400px] mx-auto w-full">
          <button
            onClick={() => setCurrentView('home')}
            className="text-xs text-muted hover:text-navy"
          >
            ← {locale === 'am' ? 'ወደ መነሻ' : 'Home'}
          </button>

          <button
            onClick={() => setLocale(locale === 'am' ? 'en' : 'am')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line text-xs font-bold text-navy hover:bg-mist"
          >
            <Globe className="w-3.5 h-3.5 text-orange-signal" />
            <span>{locale === 'am' ? 'EN' : 'አማ'}</span>
          </button>
        </div>

        <div className="max-w-[400px] mx-auto w-full my-auto py-8">
          <h2 className="text-3xl font-extrabold text-navy tracking-tight">
            {locale === 'am' ? 'እንኳን ደህና መጡ' : 'Welcome back'}
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1 mb-6">
            {locale === 'am' ? 'ቀጠሮዎን ለመከታተል እዚህ ይግቡ።' : 'Log in to follow your appointments.'}
          </p>

          {showError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{locale === 'am' ? 'ኢሜይል ወይም የይለፍ ቃል ትክክል አይደለም።' : 'Email or password is incorrect.'}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                {locale === 'am' ? 'ኢሜይል' : 'Email'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dawit@email.com"
                className="w-full h-12 px-3 text-sm bg-mist border border-line rounded-input focus:ring-2 focus:ring-orange-signal focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-navy">
                  {locale === 'am' ? 'የይለፍ ቃል' : 'Password'}
                </label>
                <a href="#forgot" className="text-xs font-bold text-orange-deep hover:underline">
                  {locale === 'am' ? 'የይለፍ ቃል ረሱ?' : 'Forgot password?'}
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-orange-signal"
                />
                <span>{locale === 'am' ? 'አስታውሰኝ' : 'Remember me'}</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="text-navy font-extrabold shadow-md mt-2"
            >
              <span>{locale === 'am' ? 'ይግቡ' : 'Log in'}</span>
            </Button>
          </form>

          <div className="mt-8 text-center text-xs text-muted">
            {locale === 'am' ? 'አዲስ ነዎት?' : 'New here?'}{' '}
            <button
              onClick={() => setCurrentView('register')}
              className="font-bold text-orange-deep hover:underline"
            >
              {locale === 'am' ? 'ይመዝገቡ (Register)' : 'Register'}
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-muted max-w-[400px] mx-auto w-full">
          © 2026 Abegaz Motors Engineering · Precision Garage
        </div>
      </div>
    </div>
  );
};
