import React, { useState } from 'react';
import { 
  FileCheck2, 
  Scan, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Zap, 
  Layers, 
  Check, 
  XCircle,
  Clock,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_DIGILOCKER_DOCS, runPreSubmissionScan } from '../data/mockDocuments';

export default function Module4DigiVault({ t }) {
  const [documents, setDocuments] = useState(INITIAL_DIGILOCKER_DOCS);
  const [hasExpiredIncome, setHasExpiredIncome] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState(() => runPreSubmissionScan(INITIAL_DIGILOCKER_DOCS, false));
  const [submissionReceipt, setSubmissionReceipt] = useState(null);

  const handleRunScan = (expiredToggle = hasExpiredIncome) => {
    setIsScanning(true);
    setScanProgress(15);
    setSubmissionReceipt(null);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 150);

    setTimeout(() => {
      setIsScanning(false);
      const res = runPreSubmissionScan(documents, expiredToggle);
      setScanResult(res);

      if (res.isReadyForDirectFiling) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#10b981']
        });
      }
    }, 1100);
  };

  const handleToggleExpiredMode = () => {
    const nextVal = !hasExpiredIncome;
    setHasExpiredIncome(nextVal);
    handleRunScan(nextVal);
  };

  const handleDirectPipelineSubmit = () => {
    const randomAppId = `SAMATVA-APP-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionReceipt({
      appId: randomAppId,
      timestamp: new Date().toLocaleString('en-IN'),
      clearingStatus: "Direct Pipeline Dispatched (Zero Clerk Intervention)",
      digitalHash: "SHA-256-4b92f7...89a1"
    });

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#fbbf24', '#10b981']
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Sunny Yellow & White Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300 relative overflow-hidden">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 text-amber-950 border border-amber-400 text-xs font-black shadow-xs">
            <FileCheck2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Module 4: Zero Red-Tape Paperwork Verifier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            {t.vault.title}
          </h1>
          <p className="text-slate-800 text-sm leading-relaxed max-w-2xl font-medium">
            Never get your welfare application rejected over expired certificates or spelling mismatches! Our AI connects to DigiLocker and checks all your papers beforehand.
          </p>
        </div>
      </div>

      {/* Control Banner: DigiLocker Sync & Simulation Toggle */}
      <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/10 border-2 border-amber-300 flex items-center justify-center text-amber-800 dark:text-amber-400 shadow-2xs">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-950 dark:text-white flex items-center space-x-2">
              <span>National DigiLocker Verified Vault</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-950 border border-emerald-300 font-mono font-black">
                API Verified
              </span>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
              Official certificates pulled directly from revenue and education boards.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          
          {/* Simulation Toggle: Expired Doc Test */}
          <button
            onClick={handleToggleExpiredMode}
            className={`px-4 py-2 rounded-2xl text-xs font-black border transition-all flex items-center space-x-1.5 shadow-2xs ${
              hasExpiredIncome
                ? 'bg-rose-100 text-rose-950 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300'
                : 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100'
            }`}
            title="Click to test how the pre-checker catches an expired income certificate before official rejection"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Test Error Detection: {hasExpiredIncome ? "ON (Expired Certificate)" : "OFF (Healthy)"}</span>
          </button>

          {/* Run Scan Button */}
          <button
            onClick={() => handleRunScan()}
            disabled={isScanning}
            className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black py-2.5 px-5 rounded-2xl text-xs shadow-md shadow-amber-400/25 flex items-center space-x-2 transition-all border border-amber-400 disabled:opacity-50"
          >
            <Scan className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? "Checking Papers..." : t.vault.runScan}</span>
          </button>
        </div>
      </div>

      {/* Scanning Progress Bar */}
      {isScanning && (
        <div className="bg-white dark:bg-navy-900 border-2 border-amber-300 dark:border-amber-500/40 rounded-2xl p-4 shadow-sm space-y-2 animate-pulse">
          <div className="flex justify-between text-xs text-amber-950 dark:text-amber-300 font-bold">
            <span>Testing Digital Signatures & Expiration Dates...</span>
            <span className="font-mono">{scanProgress}%</span>
          </div>
          <div className="w-full bg-amber-100 dark:bg-slate-950 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-400 to-yellow-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Pre-Check Results & Diagnostic Banner */}
      {scanResult && !isScanning && (
        <div className={`p-5 rounded-3xl border-2 shadow-sm flex flex-wrap items-start justify-between gap-4 ${
          scanResult.isReadyForDirectFiling 
            ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-500/40' 
            : 'bg-rose-50 border-rose-300 dark:bg-rose-950/20 dark:border-rose-500/40'
        }`}>
          <div className="flex items-start space-x-3.5 max-w-2xl">
            {scanResult.isReadyForDirectFiling ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-black text-slate-950 dark:text-white">
                  {scanResult.isReadyForDirectFiling 
                    ? "Paperwork AI Check: 100% Certified (No Clerk Can Reject You)" 
                    : "Paperwork AI Check: Problem Found Before Filing"}
                </h3>
                <span className="text-xs font-mono font-black text-slate-900 dark:text-teal-300 bg-white/80 px-2 py-0.5 rounded-lg border border-slate-300">
                  {scanResult.complianceScore}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed font-medium">
                {scanResult.overallSummary}
              </p>
            </div>
          </div>

          {/* Action button if passed */}
          {scanResult.isReadyForDirectFiling && !submissionReceipt && (
            <button
              onClick={handleDirectPipelineSubmit}
              className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs shadow-md shadow-amber-400/25 flex items-center space-x-2 transition-all border border-amber-400"
            >
              <Zap className="w-4 h-4" />
              <span>Submit Direct Application Pipeline</span>
            </button>
          )}
        </div>
      )}

      {/* Submission Success Receipt Card */}
      {submissionReceipt && (
        <div className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-navy-900 dark:to-emerald-950 border-2 border-amber-400 rounded-3xl p-6 shadow-md space-y-4 animate-scaleUp">
          <div className="flex items-center justify-between border-b border-amber-200 dark:border-emerald-500/30 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span className="font-black text-slate-950 dark:text-white text-sm">
                Application Filed Directly into Central Welfare Pipeline
              </span>
            </div>
            <span className="text-[10px] font-mono text-amber-950 dark:text-emerald-300 bg-amber-200 px-2.5 py-0.5 rounded-lg border border-amber-400 font-black">
              Zero Intermediary
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white dark:bg-slate-950/80 p-3.5 rounded-2xl border-2 border-amber-200 shadow-2xs">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold block">Application Token:</span>
              <span className="font-mono font-black text-slate-950 dark:text-white text-xs">{submissionReceipt.appId}</span>
            </div>
            <div className="bg-white dark:bg-slate-950/80 p-3.5 rounded-2xl border-2 border-amber-200 shadow-2xs">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold block">Submission Time:</span>
              <span className="font-mono text-slate-700 dark:text-slate-200 text-xs font-semibold">{submissionReceipt.timestamp}</span>
            </div>
            <div className="bg-white dark:bg-slate-950/80 p-3.5 rounded-2xl border-2 border-amber-200 shadow-2xs">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold block">Cryptographic Hash:</span>
              <span className="font-mono text-amber-900 dark:text-teal-300 text-xs font-bold">{submissionReceipt.digitalHash}</span>
            </div>
          </div>

          <p className="text-xs text-amber-950 dark:text-emerald-200 bg-amber-100/70 dark:bg-emerald-950/60 p-3 rounded-2xl border border-amber-300 dark:border-emerald-500/30 font-medium">
            ✓ Your application has been logged on the tamper-proof central database. It skips the local clerk desk and is processed directly for bank disbursement.
          </p>
        </div>
      )}

      {/* Document Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center space-x-2">
          <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Your DigiLocker Certificates & Pre-Scan Diagnostic</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scanResult.diagnostics.map((doc) => {
            const isError = doc.status === 'EXPIRED_ERROR';

            return (
              <div 
                key={doc.id}
                className={`rounded-3xl p-5 border-2 transition-all shadow-xs ${
                  isError 
                    ? 'bg-rose-50/70 border-rose-300 dark:bg-rose-950/20 dark:border-rose-500/50' 
                    : 'bg-white dark:bg-navy-900 border-amber-200 dark:border-slate-800 hover:border-amber-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-black text-amber-800 dark:text-amber-400 tracking-wider">
                      {doc.type}
                    </span>
                    <h4 className="text-sm font-black text-slate-950 dark:text-white mt-0.5">{doc.issuer}</h4>
                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 font-bold">
                      Doc No: {doc.certificateNo}
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border flex items-center space-x-1 ${
                    isError 
                      ? 'bg-rose-100 text-rose-950 border-rose-300' 
                      : 'bg-emerald-100 text-emerald-950 border-emerald-300'
                  }`}>
                    {isError ? <AlertTriangle className="w-3 h-3 mr-1" /> : <Check className="w-3 h-3 mr-1" />}
                    <span>{isError ? "EXPIRED" : "VERIFIED"}</span>
                  </span>
                </div>

                {/* Metadata Details */}
                <div className="mt-3.5 pt-3 border-t border-amber-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold">Issue Date:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{doc.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold">Valid Until:</span>
                    <span className={`font-mono font-black ${isError ? 'text-rose-600' : 'text-emerald-800'}`}>
                      {doc.validTill}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold">Digital Signature:</span>
                    <span className="text-slate-900 dark:text-teal-300 font-semibold truncate block">{doc.digitalSignature}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-bold">Holder Name:</span>
                    <span className="text-slate-900 dark:text-white font-bold">{doc.holderName}</span>
                  </div>
                </div>

                {/* AI Diagnostic Message */}
                <div className="mt-3.5 pt-2 text-[11px] leading-relaxed">
                  <div className={`p-3 rounded-2xl border font-medium ${
                    isError 
                      ? 'bg-rose-100/60 border-rose-300 text-rose-950' 
                      : 'bg-amber-50/60 dark:bg-slate-950/60 border-amber-200 dark:border-slate-800 text-slate-800 dark:text-slate-300'
                  }`}>
                    {doc.feedback}
                  </div>

                  {/* Fix recommendation */}
                  {doc.fixRecommendation && (
                    <div className="mt-2.5 bg-amber-100 border border-amber-300 p-3 rounded-2xl text-amber-950 flex items-start space-x-2 font-medium">
                      <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-black block">Citizen Action to Fix:</span>
                        <span>{doc.fixRecommendation}</span>
                        <div className="mt-2">
                          <button
                            onClick={() => handleToggleExpiredMode()}
                            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-xl text-[10px] transition-colors border border-amber-500"
                          >
                            1-Click e-District Re-issue Request
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
