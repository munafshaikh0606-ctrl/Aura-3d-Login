import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Building, AlertCircle } from 'lucide-react';
import { DesignSettings, UserSession } from '../types';

interface LoginCardProps {
  settings: DesignSettings;
  onLoginSuccess: (session: UserSession) => void;
}

export default function LoginCard({ settings, onLoginSuccess }: LoginCardProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Error/Loading states
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // 3D tilt states
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Subtle tilt for the giant heavy brutalist slab (max 4 degrees)
    const angleX = -(y - yc) / 45;
    const angleY = (x - xc) / 45;
    
    setRotateX(angleX);
    setRotateY(angleY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const validateForm = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    if (isSignUp) {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return false;
      }
      if (!company.trim()) {
        setError('Please enter your company/organization.');
        return false;
      }
      if (!agreeTerms) {
        setError('You must agree to the design platform terms of service.');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setLoadingStep(0);

    const timer1 = setTimeout(() => setLoadingStep(1), 500);
    const timer2 = setTimeout(() => setLoadingStep(2), 1000);
    const timer3 = setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        email,
        name: isSignUp ? name : email.split('@')[0].replace('.', ' '),
        company: isSignUp ? company : 'Industrial Labs',
        role: 'Industrial Designer'
      });
    }, 1600);
  };

  return (
    <div
      id="login-card-container"
      className="relative w-full max-w-[1100px] p-4 md:p-8 z-[10] select-none cursor-default tilt-container"
    >


      <div
        id="3d-tilting-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        } as React.CSSProperties}
        className="relative w-full min-h-[640px] bg-[#0a0a0b]/80 border border-[rgba(226,226,228,0.1)] backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.85)] flex flex-col md:grid md:grid-cols-[1.2fr_0.8fr] text-[#e2e2e4] transition-transform duration-100 ease-out tilt-element overflow-hidden"
      >
        {/* Rotating Border Beam (Lightning/Laser effect) */}
        <div className="absolute inset-0 pointer-events-none z-[15]">
          <svg className="absolute inset-0 w-full h-full p-[1px]" xmlns="http://www.w3.org/2000/svg">
            {/* The animated beam (Orange) */}
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke="#ff4d00"
              strokeWidth="2.5"
              pathLength="100"
              className="animate-border-beam"
              style={{
                filter: 'drop-shadow(0 0 6px #ff4d00) drop-shadow(0 0 2px #ff4d00)',
              }}
            />
            {/* The opposite animated beam (Cyan) */}
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke="#00b4ff"
              strokeWidth="2.5"
              pathLength="100"
              className="animate-border-beam-delay"
              style={{
                filter: 'drop-shadow(0 0 6px #00b4ff) drop-shadow(0 0 2px #00b4ff)',
              }}
            />
          </svg>
        </div>

        {/* Dynamic Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              id="loading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a0a0b]/95 z-[20] flex flex-col items-center justify-center p-6 text-center border-r-0 border-[rgba(226,226,228,0.1)]"
            >
              <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-[#e2e2e4]/10 animate-pulse" />
                <div className="w-16 h-16 border-t-4 border-r-4 border-[#ff4d00] animate-spin" />
              </div>
              <motion.div
                key={loadingStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#ff4d00]"
              >
                {loadingStep === 0 && '[ ESTABLISHING SECURE HANDSHAKE... ]'}
                {loadingStep === 1 && '[ SYNCHRONIZING VOLUMETRIC SYSTEM... ]'}
                {loadingStep === 2 && '[ INITIALIZING INDUSTRIAL HUB... ]'}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left Side: Branding */}
        <aside className="branding p-8 md:p-14 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[rgba(226,226,228,0.1)] bg-gradient-to-b from-[#111112]/90 to-[#070708]/90 relative overflow-hidden">
          {/* Subtle light overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(255,77,0,0.02)] pointer-events-none" />

          {/* Spacing placeholder since node label is removed */}
          <div className="h-4" />

          <div className="main-logo font-display text-[72px] md:text-[96px] font-extrabold leading-[0.85] uppercase tracking-[-0.05em] my-12 md:my-0">
            Gen
            <br />
            <span
              className="block mt-1"
              style={{
                WebkitTextStroke: '1px rgba(226,226,228,0.4)',
                color: 'transparent',
                fontSize: '82px',
              }}
            >
              Spark
            </span>
          </div>
        </aside>

        {/* Right Side: Login Content */}
        <main className="login-content p-8 md:p-14 flex flex-col justify-center relative bg-[rgba(255,255,255,0.01)]">
          <header className="header-section flex items-baseline justify-between border-b border-[rgba(226,226,228,0.1)] pb-5 mb-8">
            <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-[#e2e2e4]">
              {isSignUp ? 'Register' : 'Login'}
            </h2>
          </header>

          {/* Error Announcement */}
          {error && (
            <div id="form-error" className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 p-4 mb-6 font-mono text-[11px] uppercase tracking-wide">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form id="auth-form" onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div
                  key="signup-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 overflow-hidden"
                >
                  <div className="form-row flex flex-col">
                    <label className="label-style font-mono text-[10px] uppercase tracking-[0.2em] mb-3 text-[#e2e2e4]/50">
                      Full Name
                    </label>
                    <div className="input-box relative flex items-center">
                      <input
                        type="text"
                        placeholder="JANE DOE"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={isSignUp}
                        className="w-full bg-transparent border border-[rgba(226,226,228,0.1)] focus:border-[#ff4d00] hover:border-[rgba(226,226,228,0.2)] text-[#e2e2e4] p-3.5 pr-10 font-sans text-xs uppercase tracking-wider outline-none transition-all duration-200 placeholder:text-[#e2e2e4]/20"
                      />
                      <User size={15} className="absolute right-3.5 text-[#e2e2e4]/30" />
                    </div>
                  </div>

                  <div className="form-row flex flex-col">
                    <label className="label-style font-mono text-[10px] uppercase tracking-[0.2em] mb-3 text-[#e2e2e4]/50">
                      Company Name
                    </label>
                    <div className="input-box relative flex items-center">
                      <input
                        type="text"
                        placeholder="AURA DESIGN LAB"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required={isSignUp}
                        className="w-full bg-transparent border border-[rgba(226,226,228,0.1)] focus:border-[#ff4d00] hover:border-[rgba(226,226,228,0.2)] text-[#e2e2e4] p-3.5 pr-10 font-sans text-xs uppercase tracking-wider outline-none transition-all duration-200 placeholder:text-[#e2e2e4]/20"
                      />
                      <Building size={15} className="absolute right-3.5 text-[#e2e2e4]/30" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-row flex flex-col">
              <label className="label-style font-mono text-[10px] uppercase tracking-[0.2em] mb-3 text-[#e2e2e4]/50">
                Identifier / Email
              </label>
              <div className="input-box relative flex items-center">
                <input
                  type="email"
                  placeholder="EMAIL@ADDRESS.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border border-[rgba(226,226,228,0.1)] focus:border-[#ff4d00] hover:border-[rgba(226,226,228,0.2)] text-[#e2e2e4] p-3.5 pr-10 font-sans text-xs uppercase tracking-wider outline-none transition-all duration-200 placeholder:text-[#e2e2e4]/20"
                />
                <Mail size={15} className="absolute right-3.5 text-[#e2e2e4]/30" />
              </div>
            </div>

            <div className="form-row flex flex-col">
              <label className="label-style font-mono text-[10px] uppercase tracking-[0.2em] mb-3 text-[#e2e2e4]/50">
                Access Key / Password
              </label>
              <div className="input-box relative flex items-center">
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border border-[rgba(226,226,228,0.1)] focus:border-[#ff4d00] hover:border-[rgba(226,226,228,0.2)] text-[#e2e2e4] p-3.5 pr-10 font-sans text-xs outline-none transition-all duration-200 placeholder:text-[#e2e2e4]/20"
                />
                <Lock size={15} className="absolute right-3.5 text-[#e2e2e4]/30" />
              </div>
            </div>

            <div className="actions flex justify-between items-center text-[10px] font-mono uppercase tracking-wider my-4">
              {isSignUp ? (
                <label className="check-group flex items-center gap-2 cursor-pointer select-none opacity-80 hover:opacity-100 transition-opacity">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="accent-[#ff4d00] bg-transparent border border-[rgba(226,226,228,0.2)] w-3.5 h-3.5 rounded-none cursor-pointer"
                  />
                  <span>Agree Terms</span>
                </label>
              ) : (
                <label className="check-group flex items-center gap-2 cursor-pointer select-none opacity-80 hover:opacity-100 transition-opacity">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#ff4d00] bg-transparent border border-[rgba(226,226,228,0.2)] w-3.5 h-3.5 rounded-none cursor-pointer"
                  />
                  <span>Store Token</span>
                </label>
              )}

              {!isSignUp && (
                <a
                  href="#forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    setError('Password recovery trigger activated.');
                  }}
                  className="text-[#e2e2e4]/60 hover:text-[#ff4d00] transition-colors"
                >
                  Reset Key?
                </a>
              )}
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full bg-[#e2e2e4] hover:bg-[#ff4d00] text-[#0a0a0b] hover:text-white border-none py-4 px-6 font-display font-extrabold text-sm uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer shadow-md select-none active:translate-y-[1px] hover:shadow-[0_0_30px_rgba(255,77,0,0.3)]"
            >
              {isSignUp ? 'Initialize Registration' : 'Initialize Session'}
            </button>
          </form>

          <div className="footer-links mt-8 text-center text-xs text-[#e2e2e4]/50 uppercase tracking-widest font-mono">
            {isSignUp ? (
              <>
                Registered Aura Node?{' '}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(false); setError(''); }}
                  className="text-[#ff4d00] font-bold hover:underline cursor-pointer ml-1 uppercase font-mono text-[11px]"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Unregistered User?{' '}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(true); setError(''); }}
                  className="text-[#ff4d00] font-bold hover:underline cursor-pointer ml-1 uppercase font-mono text-[11px]"
                >
                  Create Account
                </button>
              </>
            )}
          </div>
        </main>

        {/* Decorative connecting line at the very bottom of the card frame */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(226,226,228,0.1)] flex justify-end items-center px-4 md:px-14 pointer-events-none">
          <span className="font-mono text-[8px] text-[#00ffaa] tracking-[0.15em] mb-[18px] uppercase">
            SECURE_CONNECTION_STABLE
          </span>
        </div>
      </div>
    </div>
  );
}
