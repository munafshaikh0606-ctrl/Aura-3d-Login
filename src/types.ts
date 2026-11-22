export interface DesignSettings {
  blurAmount: number;
  exposure: number;
  lightIntensity: number;
  particleCount: number;
  mouseLighting: boolean;
  layout: 'centered' | 'left-split' | 'right-split';
  accentTheme: 'cyan-red' | 'violet-pink' | 'emerald-gold';
}

export interface UserSession {
  email: string;
  name: string;
  company: string;
  role: string;
}
