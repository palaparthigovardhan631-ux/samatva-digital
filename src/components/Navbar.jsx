import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Activity, 
  Eye, 
  FileCheck2, 
  FileText, 
  MapPin, 
  Globe, 
  UserCheck, 
  ShieldAlert, 
  Lock,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  currentLang, 
  setLang, 
  t, 
  activeTab, 
  setActiveTab, 
  userRole, 
  setUserRole 
}) {
  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' }
  ];

  const navItems = [
    { id: 'module1', label: t.nav.module1, icon: Scale, badge: 'Needs-Based' },
    { id: 'module2', label: t.nav.module2, icon: Activity, badge: 'Zero-Leak' },
    { id: 'module3', label: t.nav.module3, icon: ShieldAlert, badge: 'Anonymous' },
    { id: 'module4', label: t.nav.module4, icon: FileCheck2, badge: 'DigiLocker' },
    { id: 'module5', label: t.nav.module5, icon: MapPin, badge: 'Audit & Rights' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl">
      {/* Top micro-bar: National initiative branding & integrity ticker */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border-b border-slate-800/60 px-4 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-300">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1"></span>
              GOV.IN CIVIC-TECH
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-[11px] text-slate-300 font-medium hidden sm:inline">
              National Welfare Integrity & Fair Needs-Based Reservation Framework
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-[11px] text-teal-400">
              <Lock className="w-3 h-3 text-teal-400" />
              <span className="font-mono">AES-256 Encrypted</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>Live DBT Integrity: 99.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Platform Name */}
          <div 
            onClick={() => setActiveTab('module1')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-700 p-0.5 shadow-lg shadow-teal-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Scale className="w-5 h-5 text-teal-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-teal-300 transition-colors">
                  {t.platformName}
                </span>
                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 font-medium tracking-wide hidden md:block">
                {t.platformSubtitle}
              </p>
            </div>
          </div>

          {/* Module Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/40 shadow-sm shadow-teal-500/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Language Selector & Role Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Switcher Dropdown */}
            <div className="relative group">
              <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-700/80 hover:border-teal-500/50 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 cursor-pointer transition-colors">
                <Globe className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-medium">
                  {languages.find(l => l.code === currentLang)?.native}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
              </div>
              <div className="absolute right-0 mt-1.5 w-36 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLang(lang.code)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      currentLang === lang.code ? 'text-teal-400 font-bold bg-teal-500/10' : 'text-slate-300'
                    }`}
                  >
                    <span>{lang.native}</span>
                    <span className="text-[10px] text-slate-500 uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Role Switcher: Citizen vs Oversight Administrator */}
            <div className="flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-700/80 text-xs">
              <button
                onClick={() => setUserRole('citizen')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all font-medium ${
                  userRole === 'citizen'
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Citizen Mode: Access needs-based scholarships, DigiLocker scan & anonymous whistleblower"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.nav.roleCitizen}</span>
              </button>

              <button
                onClick={() => setUserRole('oversight')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all font-medium ${
                  userRole === 'oversight'
                    ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Oversight Mode: Anti-Corruption Bureau & State Vigilance administrative dashboard"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.nav.roleAdmin}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/60 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1 transition-all ${
                  isActive
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
