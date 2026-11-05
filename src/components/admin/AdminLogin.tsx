import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, Eye, EyeOff, Lock, Sparkles, Key } from 'lucide-react';
import { Button } from '../common/Button';

export const AdminLogin: React.FC = () => {
  const { locale, setLocale, loginUser, setCurrentView } = useApp();
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const res = loginUser(email, password);
    if (res.success) {
      if (res.role === 'staff') {
        setCurrentView('staff');
      } else {
        setCurrentView('admin');
      }
    } else {
      setErrorMessage(locale === 'am' ? 'ኢሜይል ወይም የይለፍ ቃል ትክክል አይደለም።' : 'Email or password is incorrect.');
    }
  };

  const handleFillAdmin = () => {
    setEmail('admin@gmail.com');
    setPassword('admin');
  };

  const handleFillStaff = () => {
    setEmail('abiyme@gmail.com');
    setPassword('staff');
  };

  return (
    <div className="min-h-screen bg-navy text-white bg-blueprint-dark flex flex-col justify-between p-4 sm:p-8 relative">
      {/* Top Bar Switcher */}
      <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
        <button
          onClick={() => setCurrentView('home')}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          ← {locale === 'am' ? 'ወደ መነሻ ገጽ' : 'Back to Home'}
        </button>

        <button
          onClick={() => setLocale(locale === 'am' ? 'en' : 'am')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700"
        >
          <Globe className="w-3.5 h-3.5 text-orange-signal" />
          <span>{locale === 'am' ? 'EN' : 'አማ'}</span>
        </button>
      </div>

      {/* Centered White Card (max 420px, 16px radius, large soft shadow) */}
      <div className="w-full max-w-[420px] mx-auto bg-white text-navy rounded-card p-8 shadow-2xl border border-line animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-btn bg-navy text-orange-signal flex items-center justify-center text-2xl font-bold shadow-md border border-slate-700 mb-3">
            ⚙️
          </div>
          <h2 className="text-2xl font-extrabold text-navy tracking-tight">
            {locale === 'am' ? 'የሰራተኞች መግቢያ (Staff Portal)' : 'Staff Portal'}
          </h2>
          <p className="text-xs text-muted mt-1">
            {locale === 'am' ? 'ቀጠሮዎችን ለማስተዳደር እዚህ ይግቡ' : 'Sign in to manage appointments & bays.'}
          </p>
        </div>

        {/* Demo Quick Fill Buttons */}
        <div className="mb-5 p-2.5 rounded-lg bg-orange-tint border border-orange-200 text-xs flex items-center justify-between">
          <span className="font-bold text-orange-deep flex items-center gap-1">
            <Key className="w-3.5 h-3.5" />
            <span>Demo:</span>
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleFillAdmin}
              className="px-2 py-0.5 rounded bg-white font-mono font-bold text-[11px] text-navy border border-slate-300 hover:bg-mist"
            >
              admin@gmail.com
            </button>
            <button
              type="button"
              onClick={handleFillStaff}
              className="px-2 py-0.5 rounded bg-white font-mono font-bold text-[11px] text-navy border border-slate-300 hover:bg-mist"
            >
              staff
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <span>⚠ {errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy mb-1.5">
              {locale === 'am' ? 'ኢሜይል አድራሻ (Email)' : 'Email'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full h-12 px-3 text-sm bg-mist border border-line rounded-input focus:ring-2 focus:ring-orange-signal focus:outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-navy">
                {locale === 'am' ? 'የይለፍ ቃል (Password)' : 'Password'}
              </label>
              <a href="#forgot" className="text-xs font-bold text-orange-deep hover:underline">
                {locale === 'am' ? 'ረሱት?' : 'Forgot password?'}
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
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

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            className="mt-2 text-navy font-extrabold shadow-md"
          >
            <Lock className="w-4 h-4 mr-1.5" />
            <span>{locale === 'am' ? 'ይግቡ' : 'Sign In'}</span>
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-line text-center">
          <p className="text-[11px] text-muted">
            {locale === 'am' 
              ? 'መግቢያ የሚፈቀደው በአስተዳዳሪ ግብዣ ብቻ ነው።' 
              : 'Access is by invitation from an administrator.'}
          </p>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-slate-500 max-w-md mx-auto">
        © 2026 Abegaz Motors Engineering · Built by Wise Digital Marketing
      </div>
    </div>
  );
};
