import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Filter, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  ArrowRight, 
  FileSpreadsheet, 
  Lock, 
  X, 
  Check, 
  Zap, 
  RefreshCw,
  ExternalLink,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { SUMMARY_METRICS, DISTRICT_AUDIT_DATA, LIVE_TRANSACTION_STREAM } from '../data/districtData';

export default function Module2FundTracker({ t, userRole }) {
  const [districts, setDistricts] = useState(DISTRICT_AUDIT_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [activeDistrictModal, setActiveDistrictModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filtered districts
  const filteredDistricts = districts.filter(d => {
    const matchesSearch = 
      d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.officerInCharge.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = selectedState === "ALL" || d.state === selectedState;
    const matchesStatus = selectedStatus === "ALL" || d.healthStatus === selectedStatus;

    return matchesSearch && matchesState && matchesStatus;
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAdminAction = (actionType, districtId) => {
    setDistricts(prev => prev.map(d => {
      if (d.id === districtId) {
        if (actionType === 'FREEZE') {
          return { ...d, escrowStatus: 'Frozen by Vigilance', healthStatus: 'AUDIT_TRIGGERED' };
        } else if (actionType === 'OVERRIDE') {
          return { ...d, healthStatus: 'OPTIMAL', lagDays: 1.2, deliveryRate: 98.4, anomalyDetails: 'Resolved via Central Aadhaar Direct Override. Intermediary delay purged.' };
        }
      }
      return d;
    }));

    if (actionType === 'FREEZE') {
      showToast(`Escrow account for ${activeDistrictModal?.district} frozen. Audit summons dispatched to District Collector.`);
    } else if (actionType === 'OVERRIDE') {
      showToast(`Central Aadhaar direct bypass executed for ${activeDistrictModal?.district}. Funds credited to beneficiary vaults.`);
    } else if (actionType === 'SUMMONS') {
      showToast(`Official Vigilance Notice served to ${activeDistrictModal?.officerInCharge} under Section 7 of POCA.`);
    }
    setActiveDistrictModal(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border-2 border-amber-400 text-slate-950 px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs animate-bounce font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sunny Yellow & White Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300 relative overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 text-amber-950 border border-amber-400 text-xs font-black shadow-xs">
            <Activity className="w-3.5 h-3.5 text-amber-600" />
            <span>Module 2: Direct Fund Tracker & Zero-Leakage Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            {t.fundTracker.title}
          </h1>
          <p className="text-slate-800 text-sm leading-relaxed max-w-2xl font-medium">
            See exactly where government money is delivered. Track from national treasury to individual citizen bank accounts in every district.
          </p>
        </div>
      </div>

      {/* Top 5 High-Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-4.5 shadow-xs">
          <span className="text-[11px] font-bold text-amber-950/70 dark:text-slate-400 block">
            {t.fundTracker.totalSanctioned}
          </span>
          <div className="text-2xl font-black text-slate-950 dark:text-white mt-1">
            {SUMMARY_METRICS.totalSanctioned}
          </div>
          <div className="flex items-center space-x-1 text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Govt Treasury Sanctioned</span>
          </div>
        </div>

        <div className="bg-white dark:bg-navy-900 border-2 border-emerald-300 dark:border-emerald-500/30 rounded-3xl p-4.5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100/60 dark:bg-emerald-500/10 rounded-bl-full pointer-events-none"></div>
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 block">
            {t.fundTracker.totalDelivered}
          </span>
          <div className="text-2xl font-black text-slate-950 dark:text-white mt-1">
            {SUMMARY_METRICS.totalDisbursed}
          </div>
          <div className="flex items-center space-x-1 text-[10px] text-emerald-800 dark:text-emerald-400 mt-2 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{SUMMARY_METRICS.disbursalPercentage}% Direct in Bank (DBT)</span>
          </div>
        </div>

        <div className="bg-white dark:bg-navy-900 border-2 border-amber-300 dark:border-amber-500/30 rounded-3xl p-4.5 shadow-xs">
          <span className="text-[11px] font-bold text-amber-900 dark:text-amber-400 block">
            {t.fundTracker.leakagePrevented}
          </span>
          <div className="text-2xl font-black text-amber-700 dark:text-amber-300 mt-1">
            {SUMMARY_METRICS.leakagePrevented}
          </div>
          <div className="flex items-center space-x-1 text-[10px] text-slate-600 dark:text-slate-400 mt-2 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>Zero middleman siphoning</span>
          </div>
        </div>

        <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-4.5 shadow-xs">
          <span className="text-[11px] font-bold text-amber-950/70 dark:text-slate-400 block">
            {t.fundTracker.integrityIndex}
          </span>
          <div className="text-2xl font-black text-slate-950 dark:text-white mt-1">
            {SUMMARY_METRICS.transparencyIndex} <span className="text-xs font-normal text-slate-500">/ 100</span>
          </div>
          <div className="w-full bg-amber-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-400 h-full rounded-full" style={{ width: '94.2%' }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-navy-900 border-2 border-amber-300 dark:border-amber-500/30 rounded-3xl p-4.5 shadow-xs">
          <span className="text-[11px] font-bold text-amber-950/80 dark:text-amber-400 block">
            {t.fundTracker.activeBottlenecks}
          </span>
          <div className="text-2xl font-black text-amber-800 dark:text-amber-300 mt-1">
            {SUMMARY_METRICS.activeBottlenecks} <span className="text-xs font-normal text-slate-500">Districts</span>
          </div>
          <div className="flex items-center space-x-1 text-[10px] text-amber-800 dark:text-amber-400 mt-2 font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Graph AI Bottleneck Radar</span>
          </div>
        </div>

      </div>

      {/* Graph AI Fund Flow Pipeline & Live Stream */}
      <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h2 className="text-sm font-black text-slate-900 dark:text-white tracking-wide">
              How Money Travels Directly (No Corrupt Middlemen)
            </h2>
          </div>
          <span className="text-[11px] font-mono font-black text-amber-950 dark:text-emerald-400 bg-amber-200/90 dark:bg-emerald-500/10 px-3 py-1 rounded-xl border border-amber-300 dark:border-emerald-500/20">
            {SUMMARY_METRICS.dbtThroughputSeconds}
          </span>
        </div>

        {/* Visual Pipeline Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 py-2">
          
          <div className="bg-amber-50/50 dark:bg-slate-950/80 border-2 border-amber-200 dark:border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-200 text-amber-950 border border-amber-300 flex items-center justify-center font-black text-xs flex-shrink-0">
              1
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">Central Treasury</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Public welfare funds released</div>
            </div>
          </div>

          <div className="bg-amber-50/50 dark:bg-slate-950/80 border-2 border-amber-200 dark:border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-200 text-amber-950 border border-amber-300 flex items-center justify-center font-black text-xs flex-shrink-0">
              2
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">State Nodal Account</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Auto-cleared electronically</div>
            </div>
          </div>

          <div className="bg-amber-50/50 dark:bg-slate-950/80 border-2 border-amber-200 dark:border-amber-500/30 rounded-2xl p-4 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-300 text-amber-950 border border-amber-400 flex items-center justify-center font-black text-xs flex-shrink-0">
              3
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">District Clearing</div>
              <div className="text-[10px] text-amber-800 dark:text-amber-400 font-bold">AI catches delay or held money</div>
            </div>
          </div>

          <div className="bg-emerald-50/60 dark:bg-slate-950/80 border-2 border-emerald-300 dark:border-emerald-500/40 rounded-2xl p-4 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-400 text-slate-950 border border-emerald-500 flex items-center justify-center font-black text-xs flex-shrink-0">
              4
            </div>
            <div>
              <div className="text-xs font-extrabold text-emerald-950 dark:text-emerald-300">Your Bank Account</div>
              <div className="text-[10px] text-emerald-800 dark:text-slate-400 font-bold">Direct credit with zero cut!</div>
            </div>
          </div>

        </div>

        {/* Live Transaction Stream */}
        <div className="pt-2 border-t border-amber-100 dark:border-slate-800/80">
          <span className="text-[11px] font-bold text-amber-950/80 dark:text-slate-400 block mb-2">
            Real-Time Bank Disbursals Happening Right Now:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {LIVE_TRANSACTION_STREAM.map((tx) => (
              <div key={tx.id} className="bg-amber-50/50 dark:bg-slate-950/60 border border-amber-200 dark:border-slate-800/80 rounded-2xl p-3 text-[11px]">
                <div className="flex justify-between items-center text-slate-800 dark:text-slate-300 font-mono">
                  <span className="font-black text-emerald-800 dark:text-emerald-400">{tx.amount}</span>
                  <span className="text-slate-400 text-[10px]">{tx.timestamp}</span>
                </div>
                <div className="text-slate-950 dark:text-slate-200 font-extrabold truncate mt-0.5">{tx.scheme}</div>
                <div className="text-slate-600 dark:text-slate-400 text-[10px] truncate font-medium">{tx.beneficiaryMasked}</div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-amber-900 dark:text-teal-400 font-bold">
                  <span className="font-mono">{tx.hash}</span>
                  <span className="text-emerald-800 dark:text-emerald-400">✓ 100% Middleman-Free</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* District-by-District Welfare Audit Table */}
      <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        
        {/* Table Search & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your district name, state, or collector..."
              className="w-full bg-amber-50/40 dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl pl-10 pr-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 font-medium focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-amber-50/40 dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3 py-2 text-xs text-slate-800 dark:text-slate-300 font-bold focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">{t.fundTracker.filterAllStates}</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Bihar">Bihar</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-amber-50/40 dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3 py-2 text-xs text-slate-800 dark:text-slate-300 font-bold focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">{t.fundTracker.filterAllStatus}</option>
              <option value="OPTIMAL">Clear & Transferred</option>
              <option value="BOTTLENECK_FLAGGED">Money Held / Delayed</option>
              <option value="AUDIT_TRIGGERED">Investigation Ordered</option>
              <option value="HIGH_DISCREPANCY">Discrepancy Detected</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto rounded-2xl border-2 border-amber-200/80 dark:border-slate-800">
          <table className="w-full text-left text-xs text-slate-800 dark:text-slate-300">
            <thead className="bg-amber-100/70 dark:bg-slate-950/80 text-[11px] uppercase tracking-wider text-amber-950 dark:text-slate-400 border-b border-amber-200 dark:border-slate-800 font-black">
              <tr>
                <th className="py-3.5 px-4">{t.fundTracker.tableDistrict}</th>
                <th className="py-3.5 px-4">{t.fundTracker.tableSanctioned}</th>
                <th className="py-3.5 px-4">{t.fundTracker.tableDisbursed}</th>
                <th className="py-3.5 px-4">Delivery Delay</th>
                <th className="py-3.5 px-4">Status Tag</th>
                <th className="py-3.5 px-4 text-right">Inspect District</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 dark:divide-slate-800/60 bg-white dark:bg-navy-950/40">
              {filteredDistricts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400 font-medium">
                    No district audit records match your search.
                  </td>
                </tr>
              ) : (
                filteredDistricts.map((d) => {
                  let statusBadgeClass = "bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400";
                  let statusText = "Clear (Directly Paid)";

                  if (d.healthStatus === 'BOTTLENECK_FLAGGED') {
                    statusBadgeClass = "bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-500/10 dark:text-amber-300";
                    statusText = "Held Up (Delay)";
                  } else if (d.healthStatus === 'AUDIT_TRIGGERED') {
                    statusBadgeClass = "bg-rose-100 text-rose-950 border-rose-300 dark:bg-rose-500/10 dark:text-rose-300";
                    statusText = "Audit Triggered";
                  } else if (d.healthStatus === 'HIGH_DISCREPANCY') {
                    statusBadgeClass = "bg-purple-100 text-purple-950 border-purple-300 dark:bg-purple-500/10 dark:text-purple-300";
                    statusText = "Discrepancy Found";
                  }

                  return (
                    <tr key={d.id} className="hover:bg-amber-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-black text-slate-950 dark:text-white text-xs">{d.district}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{d.state}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-slate-200">
                        ₹{d.sanctioned.toFixed(1)} Cr
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-black text-slate-950 dark:text-white">₹{d.disbursed.toFixed(1)} Cr</div>
                        <div className="text-[10px] text-emerald-700 dark:text-teal-400 font-bold">{d.deliveryRate.toFixed(1)}% in accounts</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`font-mono font-bold ${d.lagDays > 10 ? 'text-rose-600 font-black' : 'text-slate-700 dark:text-slate-300'}`}>
                          {d.lagDays} days
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black border ${statusBadgeClass}`}>
                          {statusText}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setActiveDistrictModal(d)}
                          className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all inline-flex items-center space-x-1 shadow-2xs border border-amber-400"
                        >
                          <span>Inspect</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* District Inspection & Oversight Action Modal */}
      {activeDistrictModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-amber-100 dark:border-slate-800 pb-3">
              <div>
                <div className="text-[10px] uppercase font-black text-amber-700 dark:text-amber-400 tracking-wider">
                  District Public Money Audit Report
                </div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">
                  {activeDistrictModal.district}, {activeDistrictModal.state}
                </h3>
              </div>
              <button
                onClick={() => setActiveDistrictModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-amber-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Key stats in modal */}
            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="bg-amber-50/60 dark:bg-slate-950 p-3 rounded-2xl border border-amber-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">Total Sanctioned</span>
                <span className="font-black text-slate-950 dark:text-white">₹{activeDistrictModal.sanctioned} Cr</span>
              </div>
              <div className="bg-emerald-50/60 dark:bg-slate-950 p-3 rounded-2xl border border-emerald-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">Delivered in Bank</span>
                <span className="font-black text-emerald-800 dark:text-emerald-400">₹{activeDistrictModal.disbursed} Cr</span>
              </div>
              <div className="bg-amber-50/60 dark:bg-slate-950 p-3 rounded-2xl border border-amber-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">Citizens Covered</span>
                <span className="font-black text-amber-900 dark:text-amber-300">{activeDistrictModal.beneficiaries}</span>
              </div>
            </div>

            {/* Officer & Escrow */}
            <div className="bg-amber-50/40 dark:bg-slate-950 p-3.5 rounded-2xl border border-amber-200/80 dark:border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-medium">District Officer:</span>
                <span className="font-bold text-slate-950 dark:text-white">{activeDistrictModal.officerInCharge}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-medium">District Account Status:</span>
                <span className="font-mono font-black text-amber-900 dark:text-amber-400">{activeDistrictModal.escrowStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Average Transfer Delay:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-300">{activeDistrictModal.lagDays} days</span>
              </div>
            </div>

            {/* Anomaly details */}
            <div>
              <span className="text-xs font-black text-slate-900 dark:text-slate-300 block mb-1">
                Automated Integrity Check Report:
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-300 bg-amber-50/60 dark:bg-slate-950/80 p-3.5 rounded-2xl border border-amber-200 dark:border-slate-800 leading-relaxed font-medium">
                {activeDistrictModal.anomalyDetails}
              </p>
            </div>

            {/* Actions for Oversight Role vs Citizen */}
            {userRole === 'oversight' ? (
              <div className="pt-2 border-t border-amber-100 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-black text-amber-900 dark:text-amber-400 uppercase tracking-wider block">
                  Enforcement Actions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => handleAdminAction('OVERRIDE', activeDistrictModal.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Direct DBT Bypass</span>
                  </button>
                  <button
                    onClick={() => handleAdminAction('FREEZE', activeDistrictModal.id)}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-black py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Freeze District Account</span>
                  </button>
                  <button
                    onClick={() => handleAdminAction('SUMMONS', activeDistrictModal.id)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Issue Summons</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-amber-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveDistrictModal(null)}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Close Inspection
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
