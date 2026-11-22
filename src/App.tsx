import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DesignSettings, UserSession } from './types';
import BackgroundCanvas from './components/BackgroundCanvas';
import LoginCard from './components/LoginCard';
import DesignerHub from './components/DesignerHub';
const smokeBackground = "/src/assets/images/underwater_cavern_background_1783520411618.jpg";

export default function App() {
  const [settings, setSettings] = useState<DesignSettings>({
    blurAmount: 24,
    exposure: 0.9,
    lightIntensity: 1.2,
    particleCount: 60,
    mouseLighting: true,
    layout: 'centered',
    accentTheme: 'cyan-red',
  });

  const [session, setSession] = useState<UserSession | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  // Get ambient glow backdrops based on theme selection
  const getAmbientGlows = () => {
    switch (settings.accentTheme) {
      case 'violet-pink':
        return (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-500/10 blur-[130px] pointer-events-none" />
          </>
        );
      case 'emerald-gold':
        return (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />
          </>
        );
      case 'cyan-red':
      default:
        return (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00b4ff]/8 blur-[130px] pointer-events-none animate-pulse duration-5000" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#ff4d00]/8 blur-[130px] pointer-events-none animate-pulse duration-7000" />
          </>
        );
    }
  };

  // Determine dynamic spotlight tracking styles
  const spotlightStyle = settings.mouseLighting
    ? {
        background: `radial-gradient(circle 500px at ${mouse.x}px ${mouse.y}px, rgba(255, 255, 255, ${0.06 * settings.lightIntensity}), transparent 75%)`
      }
    : {
        background: `radial-gradient(circle 600px at 50% 50%, rgba(255, 255, 255, ${0.05 * settings.lightIntensity}), transparent 80%)`
      };

  return (
    <div
      id="app-root-container"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#0a0a0b] flex flex-col justify-center items-center overflow-x-hidden select-none"
    >
      {/* Atmospheric immersive dark ambient background */}
      <div className="atmosphere pointer-events-none" />

      {/* 3D Photorealistic Smoke Background Asset */}
      <div
        id="smoke-background-asset"
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out z-[1]"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 11, 0.75), rgba(10, 10, 11, 0.75)), url(${smokeBackground})`,
          filter: `brightness(${settings.exposure})`,
        }}
      />

      {/* Volumetric Spotlighting layer */}
      <div
        id="volumetric-spotlight"
        className="absolute inset-0 pointer-events-none z-[3] transition-all duration-300 ease-out"
        style={spotlightStyle}
      />

      {/* Secondary Ambient Atmospheric Color Glows */}
      {getAmbientGlows()}

      {/* Floating 3D Micro-particle system */}
      <BackgroundCanvas settings={settings} mouseX={mouse.x} mouseY={mouse.y} />

      {/* Main Core Section */}
      <div
        id="content-viewport"
        className="relative w-full max-w-7xl mx-auto min-h-screen px-6 py-12 flex items-center justify-center z-10"
      >
        <AnimatePresence mode="wait">
          {!session ? (
            <motion.div
              key="login-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full flex items-center justify-center ${
                settings.layout === 'left-split'
                  ? 'flex-row md:justify-around'
                  : settings.layout === 'right-split'
                  ? 'flex-row-reverse md:justify-around'
                  : 'justify-center'
              }`}
            >
              {/* Responsive Elegant Typography Block for Split Screen Layouts */}
              {settings.layout !== 'centered' && (
                <motion.div
                  initial={{ opacity: 0, x: settings.layout === 'left-split' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: settings.layout === 'left-split' ? 20 : -20 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="hidden lg:flex flex-col justify-center max-w-md space-y-6 text-left p-8 z-10"
                >
                  <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
                    Aura Creative Network
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white">
                    Architecting the future of sensory design.
                  </h2>
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                    Step into a fully customizable 3D glassmorphic environment crafted with optimal visual feedback, fluid parallax systems, and volumetric lighting calibrations.
                  </p>
                </motion.div>
              )}

              {/* Login/Register Panel Card */}
              <LoginCard settings={settings} onLoginSuccess={(sess) => setSession(sess)} />
            </motion.div>
          ) : (
            <motion.div
              key="hub-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center"
            >
              <DesignerHub
                session={session}
                settings={settings}
                setSettings={setSettings}
                onLogout={() => setSession(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
