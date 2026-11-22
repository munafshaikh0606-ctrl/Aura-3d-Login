import { useState } from 'react';
import { User, LogOut, Code, Copy, Check, Sparkles, Layers, Sliders, ExternalLink, RefreshCw } from 'lucide-react';
import { DesignSettings, UserSession } from '../types';

interface DesignerHubProps {
  session: UserSession;
  settings: DesignSettings;
  setSettings: (settings: DesignSettings) => void;
  onLogout: () => void;
}

export default function DesignerHub({ session, settings, setSettings, onLogout }: DesignerHubProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'tokens' | 'code'>('tokens');

  // Generate dynamic CSS block representing current custom configuration
  const getCustomCSS = () => {
    const blur = `${settings.blurAmount}px`;
    const exposure = settings.exposure;
    const light = settings.lightIntensity;
    const themeGradient =
      settings.accentTheme === 'violet-pink'
        ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
        : settings.accentTheme === 'emerald-gold'
        ? 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)'
        : 'linear-gradient(135deg, #00d2ff 0%, #ff4b2b 100%)';

    return `/* Aura 3D Custom Glassmorphism Token Set */
:root {
  --aura-blur: ${blur};
  --aura-exposure: ${exposure};
  --aura-spotlight-intensity: ${light};
  --aura-primary-accent: ${themeGradient};
  --aura-particles-active: ${settings.particleCount};
  --aura-glass-bg: rgba(255, 255, 255, 0.04);
  --aura-glass-border: rgba(255, 255, 255, 0.12);
  --aura-shadow-cast: 0 40px 100px rgba(0, 0, 0, 0.8);
}`;
  };

  // Generate complete interactive React template code for user's configuration
  const getReactCode = () => {
    return `import React, { useState } from 'react';

// Custom design properties exported from Aura 3D Studio
export default function GlassLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-sans">
      {/* 3D Smoke Background */}
      <div 
        className="absolute inset-0 bg-[url('smoke_background.jpg')] bg-cover bg-center transition-all duration-700"
        style={{ filter: 'brightness(${settings.exposure})' }}
      />
      
      {/* Volumetric Spotlighting overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,${settings.lightIntensity * 0.12}), transparent 60%)'
        }}
      />

      {/* Glassmorphic 3D Tilting Card */}
      <div 
        className="relative w-full max-w-md p-10 rounded-3xl text-white border border-white/12 shadow-2xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(${settings.blurAmount}px) saturate(180%)',
          WebkitBackdropFilter: 'blur(${settings.blurAmount}px) saturate(180%)'
        }}
      >
        <h2 className="text-2xl font-bold font-display text-center mb-6">Welcome Back</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-[11px] text-neutral-400 font-semibold uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="jane@company.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-white/30 text-sm"
            />
          </div>
          <div>
            <label className="block text-[11px] text-neutral-400 font-semibold uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-white/30 text-sm"
            />
          </div>
          <button className="w-full py-3 px-4 rounded-xl font-semibold bg-white text-black hover:bg-neutral-200 transition-colors mt-6 text-sm">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentThemeLabel = () => {
    switch (settings.accentTheme) {
      case 'violet-pink': return 'Nebula Glow';
      case 'emerald-gold': return 'Aurora Gold';
      case 'cyan-red':
      default:
        return 'Crimson Frost';
    }
  };

  return (
    <div id="designer-hub-container" className="w-full max-w-4xl p-6 md:p-8 z-10 font-sans text-white">
      {/* Top Welcome Bar */}
      <div id="hub-welcome" className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl">
            <User size={24} className="text-neutral-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-white/10 text-white border border-white/10 font-mono py-0.5 px-2 rounded-full uppercase">
                {session.role}
              </span>
              <span className="text-[10px] bg-brand-blue/10 text-cyan-400 border border-cyan-500/15 font-mono py-0.5 px-2 rounded-full uppercase">
                Aura Certified
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold mt-1 text-white">
              {session.name}
            </h1>
            <p className="text-xs text-neutral-400">
              Session established with <span className="text-neutral-200">{session.company}</span>
            </p>
          </div>
        </div>

        <button
          id="hub-logout"
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 text-red-300 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-lg w-fit md:w-auto"
        >
          <LogOut size={14} />
          <span>Terminate Session</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Design Overview Statistics */}
        <div id="hub-left-col" className="lg:col-span-1 space-y-6">
          <div className="glass-card-dark rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Layers size={16} className="text-neutral-400" />
              <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-neutral-300">
                Aesthetic Configuration
              </h3>
            </div>
            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-400">Active Theme</span>
                <span className="text-white font-sans font-medium">{currentThemeLabel()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-400">Backdrop Blur</span>
                <span className="text-white">{settings.blurAmount}px</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-400">Light Exposure</span>
                <span className="text-white">{(settings.exposure * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-400">Spotlight Lumens</span>
                <span className="text-white">{(settings.lightIntensity * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-neutral-400">Dust Micro-particles</span>
                <span className="text-white">{settings.particleCount} qty</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-400">Dynamic Tracking</span>
                <span className="text-white">{settings.mouseLighting ? 'ON' : 'OFF'}</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setSettings({
                    blurAmount: 24,
                    exposure: 1.0,
                    lightIntensity: 1.0,
                    particleCount: 60,
                    mouseLighting: true,
                    layout: 'centered',
                    accentTheme: 'cyan-red',
                  });
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white rounded-xl transition-all text-xs font-semibold cursor-pointer"
              >
                <RefreshCw size={12} />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>
          </div>

          <div className="glass-card-dark rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-white/[0.02] to-white/[0.05]">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-neutral-400 animate-pulse" />
              <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-neutral-300">
                Peachweb Technology
              </h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              This environment uses real-time canvas renderers, hardware-accelerated CSS custom variables, and 3D pointer-vector calculators to achieve optimal layout aesthetics without lagging frame budgets.
            </p>
            <div className="mt-4 pt-2 flex gap-3 text-[11px] font-semibold">
              <a
                href="https://ai.studio/build"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-all"
              >
                <span>Aura Specs</span>
                <ExternalLink size={10} />
              </a>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-500 font-mono">v1.4.2 stable</span>
            </div>
          </div>
        </div>

        {/* Dynamic Code & Token Exporter */}
        <div id="hub-right-col" className="lg:col-span-2 space-y-6">
          <div className="glass-card-dark rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full">
            {/* Header / Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <Code size={16} className="text-neutral-300" />
                <h3 className="font-display font-semibold text-sm">Design Assets & Presets</h3>
              </div>
              <div className="flex bg-white/5 p-1 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('tokens')}
                  className={`py-1.5 px-3 rounded-md transition-all cursor-pointer ${
                    activeTab === 'tokens' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  CSS Custom Tokens
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`py-1.5 px-3 rounded-md transition-all cursor-pointer ${
                    activeTab === 'code' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  React Component
                </button>
              </div>
            </div>

            {/* Content panel */}
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-xs text-neutral-400 mb-4">
                {activeTab === 'tokens'
                  ? 'Integrate these high-fidelity design tokens into your root Tailwind CSS sheets to maintain consistent atmospheric glass rendering.'
                  : 'Complete standalone React view optimized for Tailwind CSS, featuring the customizable volumetric backdrop properties.'}
              </p>

              <div className="relative flex-1 min-h-[250px] bg-black/45 border border-white/5 rounded-xl p-4 font-mono text-xs text-neutral-300 overflow-auto max-h-[360px]">
                <button
                  onClick={() => handleCopy(activeTab === 'tokens' ? getCustomCSS() : getReactCode())}
                  className="absolute top-3 right-3 p-2 bg-neutral-900/90 border border-white/10 hover:border-white/20 hover:bg-neutral-800 text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-[10px] z-[12]"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <pre className="whitespace-pre text-left leading-relaxed">
                  <code>{activeTab === 'tokens' ? getCustomCSS() : getReactCode()}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
