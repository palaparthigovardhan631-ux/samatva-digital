import React from 'react';
import { 
  Scale, 
  Activity, 
  ShieldAlert, 
  FileCheck2, 
  MapPin, 
  Eye, 
  PhoneCall, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Lock, 
  Sparkles,
  UserCheck,
  HelpCircle
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed, 
  t, 
  userRole, 
  setUserRole 
}) {
  const navSections = [
    {
      title: "Welfare & Benefits",
      items: [
        { id: 'module1', label: t.nav.module1, icon: Scale, badge: 'Needs Engine', color: 'amber' },
        { id: 'module4', label: t.nav.module4, icon: FileCheck2, badge: 'DigiLocker', color: 'yellow' },
      ]
    },
    {
      title: "Tracking & Transparency",
      items: [
        { id: 'module2', label: t.nav.module2, icon: Activity, badge: 'Fund Tracker', color: 'emerald' },
        { id: 'module5', label: t.nav.module5, icon: MapPin, badge: 'Ground Audits', color: 'amber' },
      ]
    },
    {
      title: "Protection & Anti-Bribe",
      items: [
        { id: 'module3', label: t.nav.module3, icon: ShieldAlert, badge: 'Anonymous', color: 'rose' },
      ]
    },
    {
      title: "Administrative Control",
      items: [
        { id: 'oversight', label: t.nav.oversight, icon: Eye, badge: 'Officer Desk', color: 'purple' },
      ]
    }
  ];

  return (
    <aside 
      className={`fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-navy-950 border-r border-amber-200/80 dark:border-slate-800 transition-all duration-300 flex flex-col shadow-sm ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Sidebar Header / Brand */}
      <div className="h-16 border-b border-amber-200/70 dark:border-slate-800/80 px-4 flex items-center justify-between bg-gradient-to-r from-amber-50 via-white to-yellow-50 dark:from-navy-950 dark:to-navy-900">
        <div 
          onClick={() => setActiveTab('module1')}
          className="flex items-center space-x-3 cursor-pointer overflow-hidden select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 p-0.5 shadow-md shadow-amber-400/20 flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full bg-white dark:bg-navy-950 rounded-[14px] flex items-center justify-center">
              <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  {t.platformName}
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-md bg-amber-100 dark:bg-amber-500/10 text-amber-900 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30">
                  Gov.in
                </span>
              </div>
              <p className="text-[10px] text-amber-900/70 dark:text-slate-400 font-medium truncate">
                Fair Citizen Welfare Portal
              </p>
            </div>
          )}
        </div>

        {/* Collapse toggle (Desktop) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex w-7 h-7 rounded-xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 items-center justify-center text-amber-800 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Pill in Sidebar */}
      {!isCollapsed && (
        <div className="p-3 bg-amber-50/70 dark:bg-navy-900/60 border-b border-amber-200/60 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Portal View:</span>
            <button
              onClick={() => setUserRole(userRole === 'citizen' ? 'oversight' : 'citizen')}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold flex items-center space-x-1 transition-all shadow-sm ${
                userRole === 'citizen'
                  ? 'bg-amber-400 text-slate-950 border border-amber-500'
                  : 'bg-rose-500 text-white border border-rose-600'
              }`}
            >
              <span>{userRole === 'citizen' ? '👤 Citizen Mode' : '🛡️ Oversight Officer'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            {!isCollapsed && (
              <h4 className="px-3 text-[10px] font-black uppercase tracking-wider text-amber-900/60 dark:text-slate-500">
                {section.title}
              </h4>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all group ${
                      isActive
                        ? 'bg-amber-100 text-amber-950 border border-amber-300 shadow-sm font-extrabold dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-amber-50/80 dark:hover:bg-slate-900/60 border border-transparent'
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${
                        isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 group-hover:text-amber-600 dark:group-hover:text-slate-200'
                      }`} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                        isActive
                          ? 'bg-amber-200 text-amber-950 dark:bg-amber-500/20 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Info in Sidebar */}
      {!isCollapsed ? (
        <div className="p-4 border-t border-amber-200/80 dark:border-slate-800 space-y-3 bg-amber-50/40 dark:bg-navy-950">
          <div className="bg-white dark:bg-navy-900 p-3.5 rounded-2xl border border-amber-200 dark:border-slate-800 text-xs space-y-1 shadow-sm">
            <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Direct Bank Delivery (DBT)</span>
            </div>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight">
              Money goes directly from Central Treasury to your bank. No middleman cuts!
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 pt-1 font-medium">
            <div className="flex items-center space-x-1">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Helpline: <strong className="text-slate-900 dark:text-white">1064</strong></span>
            </div>
            <div className="flex items-center space-x-1 font-mono text-[10px]">
              <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span>Protected</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t border-amber-200/80 dark:border-slate-800 flex justify-center">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold" title="Direct Welfare Active">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
      )}
    </aside>
  );
}
