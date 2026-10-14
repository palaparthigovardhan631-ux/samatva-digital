import React, { useState } from 'react';
import { 
  MapPin, 
  BookOpen, 
  FileSignature, 
  CheckCircle2, 
  AlertTriangle, 
  Star, 
  Camera, 
  Send, 
  Plus, 
  X, 
  Copy, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  ShieldCheck,
  Search,
  Check,
  Sparkles,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GROUND_AUDIT_ASSETS } from '../data/mockGroundAudits';
import { LEGAL_PROTECTION_ACTS, generateStatutoryAppealLetter } from '../data/legalGuideData';

export default function Module5GroundAudit({ t }) {
  const [activeSubTab, setActiveSubTab] = useState('assets'); // 'assets', 'rights', 'appeal'
  const [assets, setAssets] = useState(GROUND_AUDIT_ASSETS);
  const [assetFilter, setAssetFilter] = useState('ALL');
  
  // Modal for adding a ground report
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    facilityName: "Model Rural Digital School & Solar Lab",
    groundStatus: "OPERATIONAL",
    groundRating: 5,
    comment: "",
    isAnonymous: true,
    hasPhoto: false
  });

  // Rights accordion expanded state
  const [expandedAct, setExpandedAct] = useState("act-01");
  const [rightsSearch, setRightsSearch] = useState("");

  // Appeal Generator form state
  const [appealForm, setAppealForm] = useState({
    citizenName: "Ravi Teja Varma",
    district: "Guntur",
    schemeName: "Samatva Universal Higher Education Quota & 100% Tuition Waiver",
    rejectionReason: "Clerk claimed local domicile certificate format was obsolete without citing legal rule",
    applicationRef: "SAMATVA-2026-89104",
    dateOfRejection: "12 Oct 2026"
  });
  const [generatedLetter, setGeneratedLetter] = useState(null);
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Filtered ground assets
  const filteredAssets = assets.filter(a => {
    if (assetFilter === 'ALL') return true;
    return a.groundStatus === assetFilter;
  });

  // Submit ground audit
  const handleSubmitAudit = (e) => {
    e.preventDefault();
    if (!newReport.comment.trim()) return;

    setAssets(prev => prev.map(a => {
      if (a.facilityName === newReport.facilityName) {
        return {
          ...a,
          verificationCount: a.verificationCount + 1,
          groundStatus: newReport.groundStatus,
          groundRating: Number(((a.groundRating + newReport.groundRating) / 2).toFixed(1)),
          latestComment: newReport.comment,
          lastInspected: "Just now (Citizen Audit)"
        };
      }
      return a;
    }));

    setIsModalOpen(false);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#10b981']
    });
  };

  // Generate appeal notice
  const handleGenerateAppeal = (e) => {
    e.preventDefault();
    const letter = generateStatutoryAppealLetter(appealForm);
    setGeneratedLetter(letter);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#3b82f6']
    });
  };

  const handleCopyAppeal = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2500);
  };

  const handleDownloadAppeal = () => {
    if (!generatedLetter) return;
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Statutory_Appeal_${appealForm.citizenName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Sunny Yellow & White Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300 relative overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 text-amber-950 border border-amber-400 text-xs font-black shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Module 5: Community Ground Reality & Legal Rights</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            {t.groundAudit.title}
          </h1>
          <p className="text-slate-800 text-sm leading-relaxed max-w-2xl font-medium">
            Did the government sanction a school computer lab, free clinic, or water plant in your village? See if it is actually open and functional or just on paper!
          </p>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex border-b-2 border-amber-200 dark:border-slate-800 space-x-6">
        <button
          onClick={() => setActiveSubTab('assets')}
          className={`pb-3 text-sm font-black border-b-4 transition-all flex items-center space-x-2 ${
            activeSubTab === 'assets'
              ? 'border-amber-500 text-amber-950 dark:border-amber-400 dark:text-amber-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>{t.groundAudit.tabAssets}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rights')}
          className={`pb-3 text-sm font-black border-b-4 transition-all flex items-center space-x-2 ${
            activeSubTab === 'rights'
              ? 'border-amber-500 text-amber-950 dark:border-amber-400 dark:text-amber-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{t.groundAudit.tabRights}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('appeal')}
          className={`pb-3 text-sm font-black border-b-4 transition-all flex items-center space-x-2 ${
            activeSubTab === 'appeal'
              ? 'border-amber-500 text-amber-950 dark:border-amber-400 dark:text-amber-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <FileSignature className="w-4 h-4" />
          <span>{t.groundAudit.tabAppeal}</span>
        </button>
      </div>

      {/* SUBTAB 1: Ground Reality Asset Verification Tracker */}
      {activeSubTab === 'assets' && (
        <div className="space-y-6">
          
          {/* Controls: Filter & Add Report Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 p-4 rounded-3xl shadow-xs">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-amber-950/80 dark:text-slate-400 mr-1 font-bold">Filter By Reality:</span>
              <button
                onClick={() => setAssetFilter('ALL')}
                className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                  assetFilter === 'ALL'
                    ? 'bg-amber-300 text-slate-950 border-amber-400 font-black'
                    : 'bg-amber-50 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-amber-200 dark:border-slate-700'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setAssetFilter('OPERATIONAL')}
                className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                  assetFilter === 'OPERATIONAL'
                    ? 'bg-emerald-300 text-slate-950 border-emerald-400 font-black'
                    : 'bg-emerald-50 dark:bg-slate-800 text-emerald-900 dark:text-slate-400 border-emerald-200 dark:border-slate-700'
                }`}
              >
                Working (Open)
              </button>
              <button
                onClick={() => setAssetFilter('NON_FUNCTIONAL_LOCKED')}
                className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                  assetFilter === 'NON_FUNCTIONAL_LOCKED'
                    ? 'bg-amber-300 text-slate-950 border-amber-400 font-black'
                    : 'bg-amber-50 dark:bg-slate-800 text-amber-900 dark:text-slate-400 border-amber-200 dark:border-slate-700'
                }`}
              >
                Locked / Broken
              </button>
              <button
                onClick={() => setAssetFilter('GHOST_FACILITY')}
                className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                  assetFilter === 'GHOST_FACILITY'
                    ? 'bg-rose-300 text-slate-950 border-rose-400 font-black'
                    : 'bg-rose-50 dark:bg-slate-800 text-rose-900 dark:text-slate-400 border-rose-200 dark:border-slate-700'
                }`}
              >
                Ghost Facility (Never Built)
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black py-2.5 px-5 rounded-2xl text-xs shadow-xs flex items-center space-x-1.5 transition-all border border-amber-400"
            >
              <Plus className="w-4 h-4" />
              <span>Report Local School / Clinic Status</span>
            </button>
          </div>

          {/* Asset Feed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssets.map((asset) => {
              let statusBadge = "bg-emerald-100 text-emerald-950 border-emerald-300";
              let statusLabel = "OPEN & FUNCTIONAL";

              if (asset.groundStatus === 'NON_FUNCTIONAL_LOCKED') {
                statusBadge = "bg-amber-100 text-amber-950 border-amber-300";
                statusLabel = "LOCKED / CONTRACTOR ABANDONED";
              } else if (asset.groundStatus === 'GHOST_FACILITY') {
                statusBadge = "bg-rose-100 text-rose-950 border-rose-300";
                statusLabel = "GHOST ASSET (NEVER CONSTRUCTED)";
              }

              return (
                <div 
                  key={asset.id}
                  className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 hover:border-amber-400 rounded-3xl p-5 shadow-xs space-y-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-black text-amber-800 dark:text-amber-400 tracking-wider">
                        {asset.type}
                      </span>
                      <h3 className="text-base font-black text-slate-950 dark:text-white mt-0.5">
                        {asset.facilityName}
                      </h3>
                      <div className="flex items-center space-x-1 text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>{asset.location}</span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${statusBadge}`}>
                      {statusLabel}
                    </span>
                  </div>

                  {/* Financial & Geotag details */}
                  <div className="grid grid-cols-3 gap-2 bg-amber-50/50 dark:bg-slate-950/70 p-3 rounded-2xl border border-amber-200/80 dark:border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold block">Sanctioned:</span>
                      <span className="font-black text-slate-950 dark:text-white font-mono">{asset.sanctionedBudget}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold block">Citizen Rating:</span>
                      <div className="flex items-center space-x-1 font-black text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{asset.groundRating}</span>
                        <span className="text-[10px] text-slate-500 font-normal">({asset.verificationCount} votes)</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold block">Contractor:</span>
                      <span className="text-slate-800 dark:text-slate-300 truncate block text-[11px] font-semibold">{asset.contractor}</span>
                    </div>
                  </div>

                  {/* Citizen comments */}
                  <div className="bg-amber-50/30 dark:bg-slate-950/40 p-3 rounded-2xl border border-amber-200/60 dark:border-slate-800/80 text-xs space-y-1 font-medium">
                    <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                      <span>Citizen Field Verification:</span>
                      <span className="font-mono font-bold text-slate-700">{asset.lastInspected}</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-300 italic">
                      "{asset.latestComment}"
                    </p>
                  </div>

                  {/* Warning / Audit Flag banner */}
                  {asset.auditNoticeIssued && (
                    <div className="bg-rose-50 border border-rose-300 p-3 rounded-2xl text-rose-950 text-xs flex items-center space-x-2 font-bold">
                      <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>Investigation Notice Dispatched: Contractor faces license seizure and fund clawback.</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* SUBTAB 2: Legal Rights & Protection Guide */}
      {activeSubTab === 'rights' && (
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-black text-slate-950 dark:text-white">Your Constitutional & Legal Protections</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">You have legally enforceable rights. Officials who delay your benefits face statutory daily fines!</p>
              </div>

              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={rightsSearch}
                  onChange={(e) => setRightsSearch(e.target.value)}
                  placeholder="Search articles, acts, daily penalties..."
                  className="w-full bg-amber-50/40 dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl pl-10 pr-3.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 font-medium focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Accordion list */}
            <div className="space-y-3 pt-2">
              {LEGAL_PROTECTION_ACTS.filter(act => 
                act.title.toLowerCase().includes(rightsSearch.toLowerCase()) ||
                act.summary.toLowerCase().includes(rightsSearch.toLowerCase()) ||
                act.citizenPower.toLowerCase().includes(rightsSearch.toLowerCase())
              ).map((act) => {
                const isOpen = expandedAct === act.id;
                return (
                  <div 
                    key={act.id}
                    className="border-2 border-amber-200/80 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-950/60 transition-colors shadow-2xs"
                  >
                    <button
                      onClick={() => setExpandedAct(isOpen ? null : act.id)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-amber-50/60 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-950 border border-amber-300 flex items-center justify-center font-black text-xs flex-shrink-0">
                          §
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-950 dark:text-white">{act.title}</div>
                          <div className="text-[11px] text-amber-800 dark:text-amber-400 font-mono font-bold">{act.shortCode}</div>
                        </div>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-600" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-amber-100 dark:border-slate-800/60 text-xs space-y-3 animate-fadeIn font-medium">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-3">
                          {act.summary}
                        </p>

                        <div className="bg-amber-100/70 border border-amber-300 p-3.5 rounded-2xl text-amber-950">
                          <span className="font-black text-slate-950 block mb-0.5">Your Direct Citizen Power by Law:</span>
                          <span className="text-xs leading-relaxed">{act.citizenPower}</span>
                        </div>

                        <div className="space-y-1.5 pt-1">
                          <span className="font-black text-slate-700 dark:text-slate-400 block text-[11px]">Enforceable Rules:</span>
                          {act.keyClauses.map((clause, cIdx) => (
                            <div key={cIdx} className="flex items-start space-x-2 text-slate-700 dark:text-slate-300 text-xs">
                              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{clause}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* SUBTAB 3: The 7-Day Direct Appeal & Reconsideration Bot */}
      {activeSubTab === 'appeal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 border-b border-amber-100 dark:border-slate-800 pb-3">
              <FileSignature className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <h2 className="text-base font-black text-slate-950 dark:text-white">7-Day Legal Appeal Notice Bot</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Forces local office to give written order or approve benefit within 7 days.</p>
              </div>
            </div>

            <form onSubmit={handleGenerateAppeal} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">Your Name (Applicant)</label>
                <input
                  type="text"
                  value={appealForm.citizenName}
                  onChange={(e) => setAppealForm({ ...appealForm, citizenName: e.target.value })}
                  className="w-full bg-amber-50/40 dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">District Administration Office</label>
                <input
                  type="text"
                  value={appealForm.district}
                  onChange={(e) => setAppealForm({ ...appealForm, district: e.target.value })}
                  className="w-full bg-amber-50/40 dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">Welfare Scheme / Facility Denied</label>
                <input
                  type="text"
                  value={appealForm.schemeName}
                  onChange={(e) => setAppealForm({ ...appealForm, schemeName: e.target.value })}
                  className="w-full bg-amber-50/40 dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">Reason Stated by Clerk for Delay</label>
                <textarea
                  rows="3"
                  value={appealForm.rejectionReason}
                  onChange={(e) => setAppealForm({ ...appealForm, rejectionReason: e.target.value })}
                  className="w-full bg-amber-50/40 dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl p-3 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">Application Tracking Ref Number</label>
                <input
                  type="text"
                  value={appealForm.applicationRef}
                  onChange={(e) => setAppealForm({ ...appealForm, applicationRef: e.target.value })}
                  className="w-full bg-amber-50/40 dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2 text-slate-900 dark:text-white text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black py-3 px-4 rounded-2xl text-xs shadow-md shadow-amber-400/25 flex items-center justify-center space-x-2 transition-all border border-amber-400"
              >
                <Sparkles className="w-4 h-4 text-amber-900" />
                <span>Create Official Legal Notice of Appeal</span>
              </button>
            </form>
          </div>

          {/* Right Column: Generated Legal Notice Preview */}
          <div className="lg:col-span-7 bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-amber-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-sm font-black text-slate-950 dark:text-white">Statutory Notice Preview</h3>
                </div>

                {generatedLetter && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopyAppeal}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedLetter ? "Copied!" : "Copy Notice"}</span>
                    </button>
                    <button
                      onClick={handleDownloadAppeal}
                      className="bg-amber-400 hover:bg-amber-500 text-slate-950 border border-amber-500 px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .txt</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 bg-amber-50/50 dark:bg-slate-950 p-4 rounded-2xl border-2 border-amber-200 dark:border-slate-800 max-h-[480px] overflow-y-auto font-mono text-[11px] text-slate-800 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-semibold">
                {generatedLetter || generateStatutoryAppealLetter(appealForm)}
              </div>
            </div>

            <div className="bg-amber-100/70 p-3.5 rounded-2xl border border-amber-300 text-[11px] text-amber-950 font-medium">
              💡 Serving this formal notice to your District Collector triggers the mandatory 7-day statutory clock under the Public Services Guarantee Act!
            </div>
          </div>

        </div>
      )}

      {/* Modal: Submit Ground Reality Report */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-amber-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center space-x-2">
                <Camera className="w-5 h-5 text-amber-600" />
                <span>Submit Local Public Facility Reality Check</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-amber-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitAudit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">Sanctioned Public Facility</label>
                <select
                  value={newReport.facilityName}
                  onChange={(e) => setNewReport({ ...newReport, facilityName: e.target.value })}
                  className="w-full bg-white dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
                >
                  {assets.map(a => (
                    <option key={a.id} value={a.facilityName}>{a.facilityName} ({a.location})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">Actual Ground Status Today</label>
                <select
                  value={newReport.groundStatus}
                  onChange={(e) => setNewReport({ ...newReport, groundStatus: e.target.value })}
                  className="w-full bg-white dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
                >
                  <option value="OPERATIONAL">Fully Operational & Open to Public</option>
                  <option value="NON_FUNCTIONAL_LOCKED">Locked, Incomplete or Equipment Broken</option>
                  <option value="GHOST_FACILITY">Ghost Asset (Only on paper, zero ground presence)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">Star Rating (1 - 5 Stars)</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReport({ ...newReport, groundRating: star })}
                      className="p-1 text-slate-300 hover:text-amber-500"
                    >
                      <Star className={`w-7 h-7 ${star <= newReport.groundRating ? 'text-amber-500 fill-amber-500' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">What Did You Witness in Person? *</label>
                <textarea
                  rows="3"
                  required
                  value={newReport.comment}
                  onChange={(e) => setNewReport({ ...newReport, comment: e.target.value })}
                  placeholder="Explain what is happening: Is the hospital locked? Is drinking water working? Are doctors or teachers present?"
                  className="w-full bg-white dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl p-3 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 text-slate-800 dark:text-slate-300 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={newReport.isAnonymous}
                    onChange={(e) => setNewReport({ ...newReport, isAnonymous: e.target.checked })}
                    className="rounded border-amber-400 text-amber-600 accent-amber-500 w-4 h-4"
                  />
                  <span>Post Anonymously (Hide My Name)</span>
                </label>

                <span className="text-[10px] text-amber-800 dark:text-amber-400 font-mono font-bold">
                  📍 Verified Geo-tag: 16.243° N, 80.640° E
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black py-3 rounded-2xl text-xs shadow-md shadow-amber-400/25 transition-all flex items-center justify-center space-x-1.5 border border-amber-400"
              >
                <Send className="w-4 h-4" />
                <span>Submit Citizen Verification</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
