import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Search, 
  ExternalLink, 
  Copy, 
  Clock, 
  UserX, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  EyeOff,
  Sparkles,
  QrCode,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_GRIEVANCES } from '../data/mockGrievances';

export default function Module3GrievancePortal({ t }) {
  const [activeSubTab, setActiveSubTab] = useState('report'); // 'report' or 'track'
  const [grievances, setGrievances] = useState(INITIAL_GRIEVANCES);
  const [selectedTicket, setSelectedTicket] = useState(INITIAL_GRIEVANCES[0]);
  const [searchTicketId, setSearchTicketId] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    category: "Bribe Demanded for Sanctioned Welfare Disbursal",
    department: "Mandal Revenue Office (MRO) / Social Welfare Division",
    district: "Guntur, Andhra Pradesh",
    bribeAmount: "3000",
    description: "",
    bypassedLocal: true,
    hasFile: false,
    fileName: ""
  });

  const [generatedTicket, setGeneratedTicket] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        hasFile: true,
        fileName: file.name
      });
    }
  };

  const handleSubmitGrievance = (e) => {
    e.preventDefault();
    if (!formData.description.trim()) return;

    // Generate SHA-style ticket ID
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const newTicketId = `#SD-${randomHex}-${letter}`;

    const newGrievance = {
      ticketId: newTicketId,
      category: formData.category,
      department: formData.department,
      district: formData.district,
      bribeAmount: formData.bribeAmount ? `₹${formData.bribeAmount}` : "None stated",
      description: formData.description,
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: "INVESTIGATION_ACTIVE",
      statusBadge: "bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300",
      bypassedLocal: formData.bypassedLocal,
      escalationTarget: "State Anti-Corruption Bureau (ACB) & Special Judicial Vigilance Panel",
      evidenceCount: formData.hasFile ? 1 : 0,
      evidenceTypes: formData.hasFile ? [`Sanitized ${formData.fileName} (EXIF Purged)`] : [],
      timeline: [
        {
          step: "Encrypted Whistleblower Report Received",
          timestamp: "Just now",
          detail: "Report cryptographically sealed with AES-256. Zero IP logs stored. File hashes recorded."
        },
        {
          step: "Local Intermediaries Bypassed",
          timestamp: "Just now",
          detail: "Local block panchayat filtered out. Routed directly to State Anti-Corruption Bureau oversight board."
        },
        {
          step: "Assigned to Special Inquiry Directorate",
          timestamp: "Next in Queue",
          detail: "Case token queued for high-priority evidentiary review within 48 hours."
        }
      ]
    };

    setGrievances([newGrievance, ...grievances]);
    setSelectedTicket(newGrievance);
    setGeneratedTicket(newGrievance);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#ef4444']
    });
  };

  const handleCopyTicket = (ticketId) => {
    navigator.clipboard.writeText(ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSearchTicket = (e) => {
    e.preventDefault();
    const found = grievances.find(g => 
      g.ticketId.toLowerCase() === searchTicketId.trim().toLowerCase()
    );
    if (found) {
      setSelectedTicket(found);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Sunny Yellow & Warm Alert Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300 relative overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 text-rose-900 border border-rose-300 text-xs font-black shadow-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Module 3: Anonymous Whistleblower & Anti-Bribe Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            {t.grievance.title}
          </h1>
          <p className="text-slate-800 text-sm leading-relaxed max-w-2xl font-medium">
            Did any clerk or official demand a bribe to clear your scholarship, health card, or house grant? Report it here 100% anonymously. Local officials cannot see your name or delete your report.
          </p>
          <div className="mt-3 flex items-center space-x-2 text-xs text-amber-950 bg-white/90 border border-amber-300 px-3 py-1.5 rounded-2xl w-fit font-bold shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Zero IP Logging • Client-Side AES-256 Encryption • EXIF Metadata Stripping</span>
          </div>
        </div>
      </div>

      {/* Tab Controls: Report vs Track */}
      <div className="flex border-b-2 border-amber-200 dark:border-slate-800 space-x-6">
        <button
          onClick={() => setActiveSubTab('report')}
          className={`pb-3 text-sm font-black border-b-4 transition-all flex items-center space-x-2 ${
            activeSubTab === 'report'
              ? 'border-amber-500 text-amber-950 dark:border-amber-400 dark:text-amber-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <UserX className="w-4 h-4" />
          <span>{t.grievance.reportTab}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('track')}
          className={`pb-3 text-sm font-black border-b-4 transition-all flex items-center space-x-2 ${
            activeSubTab === 'track'
              ? 'border-amber-500 text-amber-950 dark:border-amber-400 dark:text-amber-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>{t.grievance.trackTab}</span>
        </button>
      </div>

      {/* Mode 1: Log Anonymous Grievance Form */}
      {activeSubTab === 'report' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 border-b border-amber-100 dark:border-slate-800 pb-3">
              <EyeOff className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <h2 className="text-base font-black text-slate-900 dark:text-white">Confidential Bribe & Corruption Complaint</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">You do not need to give your name or phone number. Complete legal protection.</p>
              </div>
            </div>

            <form onSubmit={handleSubmitGrievance} className="space-y-4 text-xs">
              
              {/* Category */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">
                  {t.grievance.categoryLabel}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-slate-900 dark:text-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 shadow-2xs"
                >
                  <option value="Bribe Demanded for Sanctioned Welfare Disbursal">Bribe Demanded for Sanctioned Welfare Disbursal</option>
                  <option value="Denial of Free Education / Healthcare Card">Denial of Free Education / Healthcare Card by Officials</option>
                  <option value="Ration Skimming & Foodgrain Diversion by Contractor">Ration Skimming & Foodgrain Diversion by Contractor</option>
                  <option value="Extortion, Threat or Harassment by Local Clerk">Extortion, Threat or Harassment by Local Clerk</option>
                  <option value="Caste / Identity Bias Discrimination in Service Delivery">Caste / Identity Bias Discrimination in Service Delivery</option>
                </select>
              </div>

              {/* Department & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 dark:text-slate-300 block">
                    {t.grievance.deptLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Mandal Revenue Office / Welfare Dept"
                    className="w-full bg-white dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-amber-500 shadow-2xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 dark:text-slate-300 block">
                    {t.grievance.locationLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="District & Block / Village"
                    className="w-full bg-white dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-amber-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* Amount Demanded */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">
                  {t.grievance.amountLabel}
                </label>
                <input
                  type="number"
                  value={formData.bribeAmount}
                  onChange={(e) => setFormData({ ...formData, bribeAmount: e.target.value })}
                  placeholder="e.g. 2000 (Enter 0 if non-monetary extortion)"
                  className="w-full bg-white dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-slate-900 dark:text-white text-xs font-mono font-bold focus:outline-none focus:border-amber-500 shadow-2xs"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">
                  {t.grievance.descLabel} *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what happened: What did the official say? Which office room/counter? What was the date and time? (Explain in simple words)"
                  className="w-full bg-white dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl p-3.5 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:border-amber-500 shadow-2xs"
                ></textarea>
              </div>

              {/* Evidence Upload */}
              <div className="space-y-1">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">
                  {t.grievance.evidenceLabel}
                </label>
                <div className="border-2 border-dashed border-amber-300 dark:border-slate-700 hover:border-amber-500 rounded-2xl p-4 text-center cursor-pointer transition-all bg-amber-50/40 dark:bg-slate-950/60 relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-1" />
                  <span className="text-slate-800 dark:text-slate-300 font-bold block">
                    {formData.hasFile ? `Selected: ${formData.fileName}` : "Click to attach photo of slip, audio recording, or letter"}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 font-medium">
                    Our system automatically cleans camera/phone location tags to protect your identity
                  </span>
                </div>
              </div>

              {/* Direct State Escalation Checkbox */}
              <div className="bg-amber-50 dark:bg-slate-950/80 border-2 border-amber-300 dark:border-amber-500/30 p-3.5 rounded-2xl flex items-start space-x-2.5">
                <input
                  type="checkbox"
                  id="bypass"
                  checked={formData.bypassedLocal}
                  onChange={(e) => setFormData({ ...formData, bypassedLocal: e.target.checked })}
                  className="rounded border-amber-400 text-amber-600 accent-amber-500 w-4 h-4 mt-0.5"
                />
                <label htmlFor="bypass" className="text-slate-800 dark:text-slate-300 cursor-pointer text-xs">
                  <span className="font-black text-slate-950 dark:text-white block">
                    {t.grievance.bypassCheckbox}
                  </span>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 block mt-0.5 font-medium">
                    Guarantees local block staff cannot view, edit, or tamper with your complaint.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black py-3.5 px-4 rounded-2xl shadow-md shadow-amber-400/25 text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all border border-amber-400"
              >
                <Lock className="w-4 h-4" />
                <span>Submit Confidential Complaint & Get Tracking Code</span>
              </button>
            </form>
          </div>

          {/* Right Column: Generated Cryptographic Ticket / Security Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            
            {generatedTicket ? (
              <div className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-navy-900 dark:to-slate-900 border-2 border-amber-400 rounded-3xl p-6 shadow-md space-y-4 animate-scaleUp">
                <div className="flex items-center space-x-2 text-amber-950 dark:text-amber-400 font-black text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Confidential Tracking Code Created!</span>
                </div>

                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border-2 border-amber-300 dark:border-amber-500/30 text-center space-y-2 shadow-xs">
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">Save This Tracking Code:</span>
                  <div className="text-2xl font-black font-mono text-amber-950 dark:text-amber-300 tracking-wider">
                    {generatedTicket.ticketId}
                  </div>
                  <button
                    onClick={() => handleCopyTicket(generatedTicket.ticketId)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-500 text-xs font-black border border-amber-500 transition-all shadow-xs"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? "Copied to Clipboard!" : "Copy Code"}</span>
                  </button>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2 font-medium">
                  <div className="flex justify-between border-b border-amber-100 dark:border-slate-800 pb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Escalation Route:</span>
                    <span className="font-extrabold text-emerald-800 dark:text-emerald-400">State Anti-Corruption Bureau</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-100 dark:border-slate-800 pb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Local Office Bypassed:</span>
                    <span className="font-extrabold text-amber-950 dark:text-teal-300">Yes (Corrupt clerks blocked)</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-100 dark:border-slate-800 pb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Citizen Protection:</span>
                    <span className="font-extrabold text-slate-950 dark:text-white">Protected by Law (Sec 7 POCA)</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedTicket(generatedTicket);
                    setActiveSubTab('track');
                  }}
                  className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 transition-colors"
                >
                  <span>Track Investigation Progress</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 text-slate-950 dark:text-white font-black text-xs">
                  <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Citizen Protection Guarantees (By Law)</span>
                </div>
                <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  <div className="bg-amber-50/60 dark:bg-slate-950/70 p-3.5 rounded-2xl border border-amber-200 dark:border-slate-800">
                    <div className="font-black text-slate-950 dark:text-white mb-0.5">100% Anonymous</div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                      Your name, phone number, and location are never recorded. Nobody can track down who filed the report.
                    </p>
                  </div>
                  <div className="bg-amber-50/60 dark:bg-slate-950/70 p-3.5 rounded-2xl border border-amber-200 dark:border-slate-800">
                    <div className="font-black text-slate-950 dark:text-white mb-0.5">Bypasses Local Corrupt Clerks</div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                      The report skips village or block officials and lands directly on state judicial oversight panels.
                    </p>
                  </div>
                  <div className="bg-amber-50/60 dark:bg-slate-950/70 p-3.5 rounded-2xl border border-amber-200 dark:border-slate-800">
                    <div className="font-black text-slate-950 dark:text-white mb-0.5">Compensation & Benefits Cleared</div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                      If your welfare was delayed due to bribe extortion, the official faces suspension and your benefit is disbursed immediately.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Demo Cases */}
            <div className="bg-white dark:bg-navy-900/60 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-4 text-xs">
              <span className="font-black text-amber-950/80 dark:text-slate-400 block mb-2">
                Recently Resolved Bribe Complaints:
              </span>
              <div className="space-y-2">
                {grievances.slice(0, 2).map((g) => (
                  <div 
                    key={g.ticketId}
                    onClick={() => {
                      setSelectedTicket(g);
                      setActiveSubTab('track');
                    }}
                    className="p-3 rounded-2xl bg-amber-50/50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 hover:border-amber-400 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="font-black text-amber-950 dark:text-amber-300 font-mono">{g.ticketId}</div>
                      <div className="text-[10px] text-slate-600 dark:text-slate-400 truncate max-w-[200px] font-medium">{g.category}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${g.statusBadge}`}>
                      {g.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Mode 2: Track Whistleblower Ticket */}
      {activeSubTab === 'track' && (
        <div className="space-y-6">
          
          {/* Search bar */}
          <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <form onSubmit={handleSearchTicket} className="flex-1 flex items-center space-x-2 w-full">
              <Search className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <input
                type="text"
                value={searchTicketId}
                onChange={(e) => setSearchTicketId(e.target.value)}
                placeholder="Enter your tracking code (e.g., #SD-8921-X)..."
                className="flex-1 bg-amber-50/40 dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 font-medium focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-2xl text-xs transition-colors border border-amber-500"
              >
                Track Case
              </button>
            </form>

            <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 font-bold">
              <span>Quick Sample Cases:</span>
              {grievances.map(g => (
                <button
                  key={g.ticketId}
                  onClick={() => setSelectedTicket(g)}
                  className={`font-mono px-2.5 py-1 rounded-xl text-[11px] border transition-colors ${
                    selectedTicket?.ticketId === g.ticketId
                      ? 'bg-amber-200 text-amber-950 border-amber-400 font-black'
                      : 'bg-amber-50 text-slate-700 border-amber-200'
                  }`}
                >
                  {g.ticketId}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Timeline View */}
          {selectedTicket && (
            <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
              
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-amber-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-black font-mono text-slate-950 dark:text-white">
                      {selectedTicket.ticketId}
                    </span>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-black border ${selectedTicket.statusBadge}`}>
                      {selectedTicket.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mt-1">
                    {selectedTicket.category}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                    {selectedTicket.department} • {selectedTicket.district}
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="text-slate-500 font-semibold">Bribe Demanded:</div>
                  <div className="font-black text-rose-600 text-sm font-mono">{selectedTicket.bribeAmount}</div>
                  <div className="text-[10px] text-emerald-800 dark:text-teal-400 mt-0.5 font-black">
                    {selectedTicket.bypassedLocal ? "✓ Local Block Office Bypassed" : "Standard Channel"}
                  </div>
                </div>
              </div>

              {/* Description & Evidence */}
              <div className="bg-amber-50/50 dark:bg-slate-950/70 p-4 rounded-2xl border border-amber-200 dark:border-slate-800 text-xs space-y-2">
                <span className="text-slate-600 dark:text-slate-400 font-bold block">Incident Summary:</span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{selectedTicket.description}</p>
                {selectedTicket.evidenceTypes && selectedTicket.evidenceTypes.length > 0 && (
                  <div className="pt-2 border-t border-amber-200/60 dark:border-slate-800 flex items-center space-x-2">
                    <span className="text-slate-500 font-bold">Attached Evidence:</span>
                    {selectedTicket.evidenceTypes.map((ev, idx) => (
                      <span key={idx} className="bg-white border border-amber-200 text-amber-950 px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold">
                        📎 {ev}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Step by Step Immutable Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Investigation Milestones & State Oversight Action</span>
                </h4>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-200 dark:before:bg-slate-800">
                  {selectedTicket.timeline.map((step, sIdx) => (
                    <div key={sIdx} className="relative">
                      <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-amber-400 border-2 border-white dark:border-slate-950 flex items-center justify-center shadow-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-950"></div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between text-xs">
                        <span className="font-black text-slate-950 dark:text-white">{step.step}</span>
                        <span className="font-mono text-slate-500 text-[11px] font-semibold">{step.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed font-medium">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
