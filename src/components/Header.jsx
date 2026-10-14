import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Globe, 
  ChevronDown, 
  UserCheck, 
  Eye, 
  Activity, 
  ShieldAlert, 
  Lock,
  PhoneCall,
  Bell,
  Sparkles
} from 'lucide-react';

export default function Header({
  isCollapsed,
  setIsCollapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  theme,
  setTheme,
  currentLang,
  setLang,
  t,
  activeTab,
  userRole,
  setUserRole,
  onOpenSearch
}) {
  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' }
  ];

  // Citizen-friendly rotating announcements
  const tickerItems = [
    "💰 ₹46,890 Crore delivered directly to bank accounts without middlemen cuts!",
    "🎓 100% Free College Tuition & Living Grants for eligible daily wage worker families",
    "🛡️ Bribe Protection: Any citizen can report corruption 100% anonymously",
    "📑 DigiLocker AI Scan: Fix paperwork errors before applying to prevent rejections",
    "⚖️ Need-Based Quotas: Evaluation based on actual economic distress, zero caste bias"
  ];
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % tickerItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [tickerItems.length]);

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'module1': return "1. Find Free Grants & Quotas";
      case 'module2': return "2. Track Public Fund Money";
      case 'module3': return "3. Report Corruption Anonymously";
      case 'module4': return "4. DigiLocker Pre-Check";
      case 'module5': return "5. Ground Reality & Legal Rights";
      case 'oversight': return "6. Oversight Administration";
      default: return "Universal Eligibility";
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-navy-950/95 backdrop-blur-md border-b border-amber-200/80 dark:border-slate-800 transition-colors shadow-sm">
      
      {/* Top Civic Live Announcement Bar */}
      <div className="bg-amber-100/90 dark:bg-navy-900 border-b border-amber-200 dark:border-slate-800/60 px-4 py-1 text-xs">
        <div className="flex items-center justify-between text-amber-950 dark:text-slate-300">
          <div className="flex items-center space-x-2 truncate pr-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 border border-amber-500 shadow-xs flex-shrink-0">
              PUBLIC NOTICE
            </span>
            <span className="text-[11px] font-bold text-amber-950 dark:text-slate-200 truncate transition-all duration-300">
              {tickerItems[tickerIndex]}
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-4 text-[11px] flex-shrink-0 font-semibold">
            <span className="flex items-center space-x-1 text-amber-800 dark:text-amber-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero-Bribe Protection</span>
            </span>
            <span className="text-amber-300 dark:text-slate-700">|</span>
            <span className="flex items-center space-x-1 text-emerald-800 dark:text-emerald-400">
              <Activity className="w-3.5 h-3.5" />
              <span>99.4% DBT Success</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        
        {/* Left Side: Sidebar Toggle & Breadcrumb */}
        <div className="flex items-center space-x-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          <div className="hidden sm:flex items-center space-x-2 text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400">Samatva Portal</span>
            <span className="text-amber-300 dark:text-slate-700 font-bold">/</span>
            <span className="font-extrabold text-slate-900 dark:text-white bg-amber-50 dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-slate-700">
              {getBreadcrumbTitle()}
            </span>
          </div>
        </div>

        {/* Center: Universal Search Button */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full bg-amber-50/60 dark:bg-navy-900 hover:bg-amber-100/70 dark:hover:bg-navy-850 border border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between shadow-xs transition-colors group"
          >
            <div className="flex items-center space-x-2 truncate">
              <Search className="w-4 h-4 text-amber-600 dark:text-amber-400 transition-colors" />
              <span className="truncate font-medium">Search scholarships, free grants, districts, laws...</span>
            </div>
            <kbd className="text-[10px] font-mono bg-white dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Side: Theme Switcher, Language Dropdown & Role Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Mobile search icon */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Switcher Button (☀️ Warm Yellow/Light vs 🌙 Dark) */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-2xl bg-amber-50 dark:bg-navy-900 border border-amber-200 dark:border-slate-700 text-amber-800 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-xs"
            title={theme === 'dark' ? "Switch to Sunny Yellow & White Theme" : "Switch to Dark Theme"}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-90 transition-transform" />
            ) : (
              <Sun className="w-4 h-4 text-amber-600 fill-amber-400 hover:rotate-90 transition-transform" />
            )}
          </button>

          {/* Regional Language Switcher */}
          <div className="relative group">
            <div className="flex items-center space-x-1.5 bg-amber-50 dark:bg-navy-900 border border-amber-200 dark:border-slate-700 hover:border-amber-400 rounded-2xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 cursor-pointer transition-colors shadow-xs">
              <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="font-bold text-xs">
                {languages.find(l => l.code === currentLang)?.native}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-500 group-hover:rotate-180 transition-transform" />
            </div>
            <div className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-navy-900 border border-amber-200 dark:border-slate-700 rounded-2xl shadow-xl py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
              <div className="px-3 py-1 text-[10px] font-bold uppercase text-amber-900/60 dark:text-slate-400 border-b border-amber-100 dark:border-slate-800">
                Choose Language
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLang(lang.code)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors ${
                    currentLang === lang.code 
                      ? 'text-amber-900 font-extrabold bg-amber-100/70 dark:bg-amber-500/10 dark:text-amber-300' 
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="font-semibold">{lang.native}</span>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Role Switcher Pill */}
          <div className="flex items-center bg-amber-100/80 dark:bg-navy-900 p-1 rounded-2xl border border-amber-300 dark:border-slate-700 text-xs shadow-xs">
            <button
              onClick={() => setUserRole('citizen')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-xl transition-all font-bold ${
                userRole === 'citizen'
                  ? 'bg-amber-400 text-slate-950 shadow-sm border border-amber-500'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Citizen Mode: Access welfare matching, vault pre-check & whistleblower"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.nav.roleCitizen}</span>
            </button>

            <button
              onClick={() => setUserRole('oversight')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-xl transition-all font-bold ${
                userRole === 'oversight'
                  ? 'bg-rose-500 text-white shadow-sm border border-rose-600'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Oversight Mode: State Vigilance & Anti-Corruption Bureau controls"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.nav.roleAdmin}</span>
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
