import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GlobalSearchModal from './components/GlobalSearchModal';
import Module1Eligibility from './components/Module1Eligibility';
import Module2FundTracker from './components/Module2FundTracker';
import Module3GrievancePortal from './components/Module3GrievancePortal';
import Module4DigiVault from './components/Module4DigiVault';
import Module5GroundAudit from './components/Module5GroundAudit';
import OversightDashboard from './components/OversightDashboard';
import Footer from './components/Footer';
import { translations } from './data/translations';
import { 
  Scale, 
  Activity, 
  ShieldAlert, 
  FileCheck2, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  Lock,
  HeartHandshake,
  Check,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('light'); // Default to bright sunny light/white/yellow theme
  const [currentLang, setCurrentLang] = useState('en');
  const [activeTab, setActiveTab] = useState('module1');
  const [userRole, setUserRole] = useState('citizen'); // 'citizen' or 'oversight'
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Synchronize dark class on document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const t = translations[currentLang] || translations.en;

  const handleGlobalNavigate = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex font-sans transition-colors duration-200">
      
      {/* Universal Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleGlobalNavigate}
      />

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        ></div>
      )}

      {/* Collapsible Sidebar (Left Panel) */}
      <div className={`lg:block ${mobileSidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setMobileSidebarOpen(false);
          }}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          t={t}
          userRole={userRole}
          setUserRole={setUserRole}
        />
      </div>

      {/* Main App Layout (Right Stage) */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        isCollapsed ? 'lg:ml-20' : 'lg:ml-72'
      }`}>
        
        {/* Top Sticky Header */}
        <Header
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          theme={theme}
          setTheme={setTheme}
          currentLang={currentLang}
          setLang={setCurrentLang}
          t={t}
          activeTab={activeTab}
          userRole={userRole}
          setUserRole={setUserRole}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Oversight Notification Banner if active */}
        {userRole === 'oversight' && (
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 text-white px-4 py-2 text-xs shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-white animate-pulse" />
                <span className="font-extrabold">
                  State Oversight Administrator Privilege Active:
                </span>
                <span className="text-amber-100 hidden sm:inline">
                  You are authorized to execute Direct DBT overrides, freeze intermediary escrows, and triage anti-corruption dockets.
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('oversight')}
                  className={`px-3 py-1 rounded-xl font-extrabold text-xs transition-all shadow-sm ${
                    activeTab === 'oversight'
                      ? 'bg-slate-950 text-white'
                      : 'bg-amber-800 hover:bg-amber-900 text-white border border-amber-300'
                  }`}
                >
                  Open Oversight Desk
                </button>
                <button
                  onClick={() => setUserRole('citizen')}
                  className="text-[11px] underline text-amber-100 hover:text-white font-medium"
                >
                  Exit to Citizen Mode
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Stage */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* Quick Hero Banner with Light Colors (White & Warm Yellow) */}
          <section className="relative rounded-3xl bg-gradient-to-br from-amber-50/90 via-white to-yellow-50/90 dark:from-navy-900 dark:via-navy-850 dark:to-slate-900 border-2 border-amber-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm dark:shadow-2xl overflow-hidden transition-colors">
            
            <div className="relative z-10 max-w-4xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-200/80 dark:bg-amber-500/20 text-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 text-xs font-black">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {t.hero.title}
              </h1>

              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
                {t.hero.desc}
              </p>

              {/* Citizen-Friendly Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('module1')}
                  className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md shadow-amber-400/30 flex items-center space-x-2 transition-all border border-amber-400 group"
                >
                  <span>{t.hero.startCheck}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('module4')}
                  className="bg-white dark:bg-slate-900 hover:bg-amber-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm border border-amber-200 dark:border-slate-700 flex items-center space-x-2 transition-all shadow-xs"
                >
                  <FileCheck2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Scan Papers with DigiLocker</span>
                </button>

                <button
                  onClick={() => setActiveTab('module3')}
                  className="bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-900 dark:text-rose-300 font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm border border-rose-200 dark:border-rose-500/30 flex items-center space-x-2 transition-all shadow-xs"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>{t.hero.reportCorruption}</span>
                </button>
              </div>
            </div>

            {/* "HOW THIS WORKS FOR ANY CITIZEN" Simple 3-Step Guide */}
            <div className="relative z-10 mt-8 pt-6 border-t border-amber-200 dark:border-slate-800/80">
              <div className="flex items-center space-x-2 mb-3">
                <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-400">
                  How Samatva Works for You in 3 Easy Steps (No Bureaucracy)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-amber-200 dark:border-slate-800 shadow-xs space-y-1.5">
                  <div className="flex items-center space-x-2 font-black text-slate-900 dark:text-white">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-black">
                      1
                    </span>
                    <span>Check Free Quotas & Grants</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    Enter your family income and occupation. Our AI matches 100% free college seats, waivers, and scholarships based on economic need — zero caste bias.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-amber-200 dark:border-slate-800 shadow-xs space-y-1.5">
                  <div className="flex items-center space-x-2 font-black text-slate-900 dark:text-white">
                    <span className="w-6 h-6 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center text-xs font-black">
                      2
                    </span>
                    <span>AI Pre-Checks Your Papers</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    Pulls your certificates via DigiLocker. The AI tests expiration dates and spelling so corrupt clerks cannot reject you on petty technicalities.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-amber-200 dark:border-slate-800 shadow-xs space-y-1.5">
                  <div className="flex items-center space-x-2 font-black text-slate-900 dark:text-white">
                    <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-xs font-black">
                      3
                    </span>
                    <span>Money Sent Directly to Bank</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    Benefits bypass middlemen and go straight to your Aadhaar-linked bank account. If anyone asks for a bribe, report anonymously with one click.
                  </p>
                </div>

              </div>
            </div>

            {/* Quick Feature Badges */}
            <div className="relative z-10 mt-6 pt-4 border-t border-amber-200/60 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-2xl bg-amber-200/80 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/20 flex items-center justify-center text-amber-900 dark:text-amber-400 flex-shrink-0 font-bold">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">Zero Caste Bias</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">Pure Economic Need</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 flex items-center justify-center text-emerald-800 dark:text-emerald-400 flex-shrink-0 font-bold">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">96.8% DBT Speed</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">Direct Citizen Vault</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-2xl bg-rose-100 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/20 flex items-center justify-center text-rose-800 dark:text-rose-400 flex-shrink-0 font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">100% Anonymous</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">No Name or Phone Stored</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-2xl bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-300 dark:border-yellow-500/20 flex items-center justify-center text-yellow-900 dark:text-yellow-400 flex-shrink-0 font-bold">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">DigiLocker Pre-Check</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">Zero Red-Tape Risk</span>
                </div>
              </div>
            </div>
          </section>

          {/* Active Module Stage */}
          {activeTab === 'module1' && (
            <Module1Eligibility 
              t={t} 
              currentLang={currentLang} 
              onNavigateToVault={() => setActiveTab('module4')} 
            />
          )}

          {activeTab === 'module2' && (
            <Module2FundTracker 
              t={t} 
              userRole={userRole} 
            />
          )}

          {activeTab === 'module3' && (
            <Module3GrievancePortal 
              t={t} 
            />
          )}

          {activeTab === 'module4' && (
            <Module4DigiVault 
              t={t} 
            />
          )}

          {activeTab === 'module5' && (
            <Module5GroundAudit 
              t={t} 
            />
          )}

          {activeTab === 'oversight' && (
            <OversightDashboard 
              t={t} 
              onSwitchToDistrict={(dist) => setActiveTab('module2')} 
            />
          )}

        </main>

        {/* Footer */}
        <Footer 
          t={t} 
          setLang={setCurrentLang} 
          setActiveTab={setActiveTab} 
        />

      </div>

    </div>
  );
}
