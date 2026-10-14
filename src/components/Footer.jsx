import React from 'react';
import { Scale, ShieldCheck, Lock, PhoneCall, Globe, ExternalLink, Heart } from 'lucide-react';

export default function Footer({ t, setLang, setActiveTab }) {
  return (
    <footer className="mt-16 bg-white dark:bg-navy-950 border-t-2 border-amber-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      
      {/* Statutory Helpline Strip */}
      <div className="bg-amber-100/80 dark:bg-navy-900 border-b border-amber-200 dark:border-slate-800 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-amber-950 dark:text-slate-200">
          <div className="flex items-center space-x-2 font-black text-xs">
            <PhoneCall className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>24x7 Free Citizen Emergency Helplines:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <span className="bg-white dark:bg-slate-950 px-3.5 py-1.5 rounded-xl border border-amber-300 dark:border-slate-800 shadow-2xs font-bold text-slate-900 dark:text-white">
              Anti-Corruption Toll-Free: <strong className="text-amber-600 text-xs">1064</strong>
            </span>
            <span className="bg-white dark:bg-slate-950 px-3.5 py-1.5 rounded-xl border border-amber-300 dark:border-slate-800 shadow-2xs font-bold text-slate-900 dark:text-white">
              Free Legal Aid (NALSA): <strong className="text-emerald-700 text-xs">15100</strong>
            </span>
            <span className="bg-white dark:bg-slate-950 px-3.5 py-1.5 rounded-xl border border-amber-300 dark:border-slate-800 shadow-2xs font-bold text-slate-900 dark:text-white">
              DigiLocker Help: <strong className="text-slate-900 text-xs">1800-111-555</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-slate-950 dark:text-white font-black text-base">
            <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>{t.platformName}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            National Civic & Welfare Integrity Platform designed to eliminate miscommunication, prevent welfare fund leakages, eradicate bureaucratic corruption, and replace identity bias with an objective needs-based eligibility framework.
          </p>
          <div className="flex items-center space-x-2 text-[10px] text-amber-950 dark:text-teal-400 font-extrabold bg-amber-100 dark:bg-slate-900 px-3 py-1 rounded-xl w-fit border border-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Certified Needs-Based Engine v3.2</span>
          </div>
        </div>

        {/* Modules Navigation */}
        <div className="space-y-2 text-xs">
          <h4 className="font-black text-slate-950 dark:text-white uppercase tracking-wider text-[11px]">
            Platform Modules
          </h4>
          <ul className="space-y-2 font-medium">
            <li>
              <button onClick={() => setActiveTab('module1')} className="hover:text-amber-700 dark:hover:text-teal-400 transition-colors">
                1. Universal Needs-Based Eligibility Engine
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('module4')} className="hover:text-amber-700 dark:hover:text-teal-400 transition-colors">
                2. DigiLocker Paperwork Pre-Check
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('module2')} className="hover:text-amber-700 dark:hover:text-teal-400 transition-colors">
                3. Anti-Leakage Fund Tracker & Audits
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('module3')} className="hover:text-amber-700 dark:hover:text-teal-400 transition-colors">
                4. Anonymous Whistleblower Portal
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('module5')} className="hover:text-amber-700 dark:hover:text-teal-400 transition-colors">
                5. Ground Reality & Constitutional Rights
              </button>
            </li>
          </ul>
        </div>

        {/* Legal & Compliance Standards */}
        <div className="space-y-2 text-xs">
          <h4 className="font-black text-slate-950 dark:text-white uppercase tracking-wider text-[11px]">
            Constitutional Foundations
          </h4>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px] font-medium">
            <li>• Constitution of India (Articles 14, 15, 21)</li>
            <li>• Prevention of Corruption Act, 1988 (POCA)</li>
            <li>• Whistleblowers Protection Directives 2014</li>
            <li>• Right to Public Services Guarantee Legislation</li>
            <li>• Digital Personal Data Protection (DPDP) Act</li>
            <li>• NPCI Direct Benefit Transfer (DBT) Directives</li>
          </ul>
        </div>

        {/* Languages & Security */}
        <div className="space-y-3 text-xs">
          <h4 className="font-black text-slate-950 dark:text-white uppercase tracking-wider text-[11px]">
            Available Languages
          </h4>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setLang('en')} className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 hover:bg-amber-100 text-slate-900 font-bold">
              English
            </button>
            <button onClick={() => setLang('hi')} className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 hover:bg-amber-100 text-slate-900 font-bold">
              हिंदी (Hindi)
            </button>
            <button onClick={() => setLang('te')} className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 hover:bg-amber-100 text-slate-900 font-bold">
              తెలుగు (Telugu)
            </button>
            <button onClick={() => setLang('ta')} className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 hover:bg-amber-100 text-slate-900 font-bold">
              தமிழ் (Tamil)
            </button>
          </div>

          <div className="bg-amber-50 dark:bg-slate-950 p-3 rounded-2xl border border-amber-300 dark:border-slate-800 flex items-center space-x-2 text-[10px] text-amber-950 dark:text-slate-400 font-semibold shadow-2xs">
            <Lock className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
            <span>Zero IP Logging • Client-Side Cryptographic Tokenization</span>
          </div>
        </div>

      </div>

      {/* Bottom copyright line */}
      <div className="border-t border-amber-200 dark:border-slate-900 py-4 px-4 text-center text-[11px] text-slate-500 font-medium">
        © 2026 Samatva Digital Initiative. Open-architecture public good for transparent civic governance and needs-based welfare justice.
      </div>
    </footer>
  );
}
