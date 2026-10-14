import React, { useState } from 'react';
import { 
  Eye, 
  ShieldAlert, 
  Activity, 
  Lock, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Building2, 
  Clock, 
  UserCheck, 
  ArrowUpRight,
  TrendingDown,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DISTRICT_AUDIT_DATA, SUMMARY_METRICS } from '../data/districtData';
import { INITIAL_GRIEVANCES } from '../data/mockGrievances';

export default function OversightDashboard({ t, onSwitchToDistrict }) {
  const [districts, setDistricts] = useState(DISTRICT_AUDIT_DATA);
  const [grievances, setGrievances] = useState(INITIAL_GRIEVANCES);
  const [actionSuccessMsg, setActionSuccessMsg] = useState(null);

  const activeAlerts = districts.filter(d => d.healthStatus !== 'OPTIMAL');

  const triggerGlobalAudit = () => {
    setActionSuccessMsg("Global Graph AI Audit sweep triggered across 782 districts. 14 new forensic traces analyzed.");
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ef4444', '#0d9488']
    });
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleResolveGrievance = (ticketId) => {
    setGrievances(prev => prev.map(g => {
      if (g.ticketId === ticketId) {
        return {
          ...g,
          status: "RESOLVED_RESTITUTION",
          statusBadge: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40",
          timeline: [
            ...g.timeline,
            {
              step: "Oversight Director Mandate Issued",
              timestamp: "Just now",
              detail: "Bribe demand substantiated. Official disciplinary action confirmed and citizen benefit credited directly."
            }
          ]
        };
      }
      return g;
    }));
    setActionSuccessMsg(`Case ${ticketId} resolved with statutory disciplinary action against delinquent officials.`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Toast Alert */}
      {actionSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-900 border border-amber-500 text-slate-900 dark:text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-royal-950 to-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
            <Eye className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL • STATE VIGILANCE COMMISSION & ACB CONSOLE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            National Welfare Oversight & Forensic Command
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed max-w-2xl">
            Centralized anti-corruption radar monitoring 782 districts, intercepting fund bottlenecks, and enforcing zero-tampering whistleblower actions.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={triggerGlobalAudit}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Trigger National Forensic Sweep</span>
          </button>
        </div>
      </div>

      {/* High-Level Oversight KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-navy-900 border border-amber-300 dark:border-amber-500/30 p-5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>High-Severity Bottlenecks</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-700 dark:text-amber-300 mt-2 font-mono">
            {activeAlerts.length} Active
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Disbursement lag exceeds 14 days in flagged blocks.
          </p>
        </div>

        <div className="bg-white dark:bg-navy-900 border border-rose-300 dark:border-rose-500/30 p-5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Pending Whistleblower Cases</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-rose-700 dark:text-rose-400 mt-2 font-mono">
            {grievances.filter(g => g.status === 'INVESTIGATION_ACTIVE').length} Inquiries
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Bypassed local authorities straight to State ACB.
          </p>
        </div>

        <div className="bg-white dark:bg-navy-900 border border-teal-300 dark:border-teal-500/30 p-5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Siphoning Prevented</span>
            <Lock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-3xl font-black text-teal-800 dark:text-teal-300 mt-2 font-mono">
            {SUMMARY_METRICS.leakagePrevented}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Intercepted before corrupt intermediate withdrawal.
          </p>
        </div>

        <div className="bg-white dark:bg-navy-900 border border-emerald-300 dark:border-emerald-500/30 p-5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Direct Aadhaar Clearance</span>
            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-2 font-mono">
            96.84%
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Directly in beneficiary vaults without human clerk delay.
          </p>
        </div>

      </div>

      {/* Grid: Flagged District Interventions & Whistleblower Escalation Triaging */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Flagged District Radar (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Graph AI Active Bottlenecks & Escrow Retentions
              </h2>
            </div>
            <span className="text-[10px] font-mono text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-200 dark:border-amber-500/30 font-bold">
              Live Radar
            </span>
          </div>

          <div className="space-y-3">
            {activeAlerts.map(dist => (
              <div 
                key={dist.id}
                className="bg-slate-50 dark:bg-slate-950/80 border border-amber-200 dark:border-amber-500/30 hover:border-amber-400 dark:hover:border-amber-500/60 rounded-2xl p-4 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {dist.district}, {dist.state}
                    </h3>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Officer in Charge: {dist.officerInCharge}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-500/30">
                    Lag: {dist.lagDays} Days
                  </span>
                </div>

                <p className="text-xs text-amber-900 dark:text-amber-200/90 mt-2 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200 dark:border-amber-500/20 leading-relaxed">
                  {dist.anomalyDetails}
                </p>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-mono">
                    Blocked: ₹{(dist.sanctioned - dist.disbursed).toFixed(1)} Cr
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onSwitchToDistrict && onSwitchToDistrict(dist)}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-3 py-1 rounded-xl text-xs transition-colors"
                    >
                      Audit District
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Whistleblower Investigation Triaging (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                State Vigilance Whistleblower Docket
              </h2>
            </div>
            <span className="text-[10px] font-mono text-rose-800 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/10 px-2.5 py-0.5 rounded-lg border border-rose-200 dark:border-rose-500/30 font-bold">
              Judicial Oversight
            </span>
          </div>

          <div className="space-y-3">
            {grievances.map(g => (
              <div 
                key={g.ticketId}
                className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs mr-2">
                      {g.ticketId}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${g.statusBadge}`}>
                      {g.status.replace('_', ' ')}
                    </span>
                    <div className="font-semibold text-slate-800 dark:text-slate-300 mt-1">{g.category}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{g.department} • {g.district}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Demanded Cut:</div>
                    <div className="font-bold font-mono text-rose-600 dark:text-rose-400">{g.bribeAmount}</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 italic">
                  "{g.description}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80">
                  <span className="text-[10px] text-teal-700 dark:text-teal-400 font-medium">
                    Bypassed Local: {g.bypassedLocal ? "YES (ACB Direct)" : "NO"}
                  </span>

                  {g.status === 'INVESTIGATION_ACTIVE' ? (
                    <button
                      onClick={() => handleResolveGrievance(g.ticketId)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Enforce Disciplinary Sanction</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                      ✓ Sanction Enforced & Restitution Paid
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
