import { useState } from 'react';
import { Sliders, Check, Sparkles, ChevronRight, ChevronLeft, Palette, LayoutGrid } from 'lucide-react';
import { DesignSettings } from '../types';

interface ControlPanelProps {
  settings: DesignSettings;
  setSettings: (settings: DesignSettings) => void;
}

export default function ControlPanel({ settings, setSettings }: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  const updateSetting = <K extends keyof DesignSettings>(key: K, value: DesignSettings[K]) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div
      id="control-panel-wrapper"
      className={`fixed top-4 right-4 z-[50] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? 'translate-x-0' : 'translate-x-[calc(100%-12px)]'
      }`}
    >
      <div className="flex items-start">
        {/* Toggle button */}
        <button
          id="control-panel-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black/80 hover:bg-black border border-white/10 hover:border-white/20 text-white p-3 rounded-l-xl flex items-center justify-center cursor-pointer shadow-2xl transition-all h-12"
          aria-label={isOpen ? "Collapse configurations" : "Expand configurations"}
        >
          {isOpen ? <ChevronRight size={18} /> : <Sliders size={18} className="animate-pulse" />}
        </button>

        {/* Panel Content */}
        <div id="control-panel-body" className="w-80 glass-card-dark rounded-r-2xl rounded-bl-2xl p-6 text-white border-l-0 shadow-2xl">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={16} className="text-brand-blue" />
            <h3 className="font-display font-medium text-sm uppercase tracking-wider text-neutral-300">
              Aura Designer Studio
            </h3>
          </div>

          <div className="space-y-5 text-sm">
            {/* Aspect Theme Selection */}
            <div>
              <label className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium uppercase tracking-wider mb-2">
                <Palette size={13} className="text-neutral-500" />
                Color Atmosphere
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cyan-red', label: 'Crimson Frost', preview: 'bg-gradient-to-r from-cyan-400 to-red-500' },
                  { id: 'violet-pink', label: 'Nebula Glow', preview: 'bg-gradient-to-r from-purple-500 to-pink-500' },
                  { id: 'emerald-gold', label: 'Aurora Gold', preview: 'bg-gradient-to-r from-emerald-500 to-amber-500' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateSetting('accentTheme', t.id as any)}
                    className={`relative p-2 rounded-lg border text-[11px] text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      settings.accentTheme === t.id
                        ? 'border-white bg-white/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-8 h-3 rounded-full ${t.preview}`} />
                    <span className="font-sans leading-none">{t.label}</span>
                    {settings.accentTheme === t.id && (
                      <div className="absolute top-1 right-1 bg-white text-black rounded-full p-0.5">
                        <Check size={8} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Style */}
            <div>
              <label className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium uppercase tracking-wider mb-2">
                <LayoutGrid size={13} className="text-neutral-500" />
                Layout Composition
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'centered', label: 'Glass Center' },
                  { id: 'left-split', label: 'Left Split' },
                  { id: 'right-split', label: 'Right Split' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => updateSetting('layout', l.id as any)}
                    className={`p-2 rounded-lg border text-[11px] text-center transition-all cursor-pointer ${
                      settings.layout === l.id
                        ? 'border-white bg-white/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider: Backdrop Blur */}
            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-1.5">
                <span>BACKDROP BLUR</span>
                <span className="font-mono text-white">{settings.blurAmount}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={settings.blurAmount}
                onChange={(e) => updateSetting('blurAmount', parseInt(e.target.value))}
                className="w-full accent-white h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Slider: Ambient Light Intensity */}
            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-1.5">
                <span>VOLUMETRIC GLOW</span>
                <span className="font-mono text-white">{Math.round(settings.lightIntensity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={settings.lightIntensity}
                onChange={(e) => updateSetting('lightIntensity', parseFloat(e.target.value))}
                className="w-full accent-white h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Slider: Exposure */}
            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-1.5">
                <span>SMOKE EXPOSURE</span>
                <span className="font-mono text-white">{Math.round(settings.exposure * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.5"
                step="0.05"
                value={settings.exposure}
                onChange={(e) => updateSetting('exposure', parseFloat(e.target.value))}
                className="w-full accent-white h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Slider: Dust Particle Count */}
            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-1.5">
                <span>FLOATING PARTICLES</span>
                <span className="font-mono text-white">{settings.particleCount}</span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                value={settings.particleCount}
                onChange={(e) => updateSetting('particleCount', parseInt(e.target.value))}
                className="w-full accent-white h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Toggle: Spotlight Lighting */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-xs text-neutral-400">SPOTLIGHT GLOW FOLLOWS MOUSE</span>
              <button
                onClick={() => updateSetting('mouseLighting', !settings.mouseLighting)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                  settings.mouseLighting ? 'bg-white' : 'bg-white/15'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-black transition-transform ${
                    settings.mouseLighting ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <p className="text-[10px] text-neutral-500 font-mono">
              PEACHWEB PROTOCOL v1.4.2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
