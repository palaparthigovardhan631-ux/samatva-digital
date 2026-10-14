import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  CheckCircle2, 
  Sliders, 
  ShieldCheck, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  RefreshCw, 
  BookOpen, 
  GraduationCap, 
  DollarSign, 
  Building2, 
  HeartHandshake,
  Check,
  Zap,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateVulnerabilityScore } from '../data/welfareSchemes';

export default function Module1Eligibility({ t, currentLang, onNavigateToVault }) {
  // Questionnaire state
  const [params, setParams] = useState({
    income: 220000,
    occupation: "daily_wage",
    land: "landless",
    isFirstGen: true,
    isSingleParent: false,
    isPwD: false,
    isRuralSchool: true,
    hasChronicIllness: false
  });

  // Score result state
  const [result, setResult] = useState(() => calculateVulnerabilityScore({
    income: 220000,
    occupation: "daily_wage",
    land: "landless",
    isFirstGen: true,
    isSingleParent: false,
    isPwD: false,
    isRuralSchool: true,
    hasChronicIllness: false
  }));

  // Chatbot conversation state
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: currentLang === 'hi'
        ? "नमस्ते! मैं समत्व एआई सलाहकार हूँ। अपनी पारिवारिक आय, पेशा या परिस्थिति बताएं, मैं बिना किसी सामाजिक पूर्वाग्रह के आपके लिए 100% आवश्यकता-आधारित योजनाओं और कॉलेज सीटों का मिलान करूँगा।"
        : currentLang === 'te'
        ? "నమస్కారం! నేను సమత్వ AI సహాయకుడను. మీ కుటుంబ ఆదాయం, వృత్తిని తెలియజేయండి, ఎటువంటి వివక్ష లేకుండా మీ వాస్తవ ఆర్థిక అవసరాలకు సరిపోయే సంక్షేమ పథకాలను చూపిస్తాను."
        : currentLang === 'ta'
        ? "வணக்கம்! நான் சமத்துவ AI ஆலோசகர். உங்கள் வருமானம் மற்றும் தொழில் நிலையைத் தெரிவியுங்கள், உண்மையான தேவைக்கேற்ப கல்வி உதவித்தொகைகளைக் கண்டறிவோம்."
        : "Namaste & Welcome! I am your Samatva AI Advisor. Tell me about your household income, occupation, and family background to uncover 100% objective, needs-based welfare and educational quotas with zero social bias."
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Quick preset chips
  const quickPrompts = [
    {
      label: currentLang === 'hi' 
        ? "आय 1.8 लाख, दिहाड़ी मजदूर, प्रथम पीढ़ी कॉलेज" 
        : currentLang === 'te'
        ? "ఆదాయం 2 లక్షలు, కూలీ బిడ్డ, మొదటి తరం విద్యార్థి"
        : currentLang === 'ta'
        ? "வருமானம் 1.8 லட்சம், தினக்கூலி, முதல் தலைமுறை பட்டதாரி"
        : "Income ₹1.8L, daily wage worker child, 1st gen learner",
      income: 180000,
      occupation: "daily_wage",
      land: "landless",
      isFirstGen: true,
      isRuralSchool: true
    },
    {
      label: currentLang === 'hi'
        ? "एकल अभिभावक, ग्रामीण भूमिहीन, स्वास्थ्य व आवास"
        : currentLang === 'te'
        ? "ఒంటరి తల్లి, గ్రామీణ భూమిలేని కుటుంబం, ఇల్లు & ఆరోగ్యం"
        : currentLang === 'ta'
        ? "ஒற்றைப் பெற்றோர், நிலமற்ற குடும்பம், வீடு & மருத்துவம்"
        : "Single parent household, rural landless, need housing & health",
      income: 140000,
      occupation: "landless_agri",
      land: "landless",
      isSingleParent: true,
      hasChronicIllness: true
    },
    {
      label: currentLang === 'hi'
        ? "कारीगर परिवार, 2.8 लाख आय, तकनीक व छात्रवृत्ति"
        : currentLang === 'te'
        ? "చేతివృత్తుల కుటుంబం, 2.8 లక్షలు, ల్యాప్‌టాప్ గ్రాంట్"
        : currentLang === 'ta'
        ? "கைவினைஞர் குடும்பம், 2.8 லட்சம், தொழில்நுட்ப மானியம்"
        : "Artisan family, ₹2.8L income, need tech grant & tuition waiver",
      income: 280000,
      occupation: "artisan",
      land: "marginal_less_1acre",
      isFirstGen: true,
      isRuralSchool: false
    }
  ];

  const handleCalculate = (newParams = params) => {
    const res = calculateVulnerabilityScore(newParams);
    setResult(res);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#10b981']
    });
  };

  const handleApplyQuickPrompt = (qp) => {
    const updated = {
      ...params,
      income: qp.income,
      occupation: qp.occupation,
      land: qp.land,
      isFirstGen: !!qp.isFirstGen,
      isSingleParent: !!qp.isSingleParent,
      isRuralSchool: !!qp.isRuralSchool,
      hasChronicIllness: !!qp.hasChronicIllness
    };
    setParams(updated);
    handleCalculate(updated);

    const userQuery = qp.label;
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setIsTyping(true);

    setTimeout(() => {
      const calculated = calculateVulnerabilityScore(updated);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Based on your objective parameters (Income: ₹${(updated.income / 100000).toFixed(1)}L, ${updated.occupation.replace('_', ' ')} livelihood, and hardship modifiers), your Samatva Need Score is ${calculated.score}/100 (${calculated.tier.split(':')[0]}). You qualify for ${calculated.matchingSchemes.length} direct schemes with zero identity bias!`
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      let simulatedIncome = params.income;
      let isFirst = params.isFirstGen;
      let occ = params.occupation;

      if (userText.includes("1.5") || userText.includes("1.8") || userText.includes("1.2") || userText.includes("एक लाख") || userText.includes("లక్ష")) {
        simulatedIncome = 160000;
      } else if (userText.includes("2") || userText.includes("2.5") || userText.includes("दो लाख")) {
        simulatedIncome = 220000;
      }

      if (userText.toLowerCase().includes("daily wage") || userText.includes("मजदूर") || userText.includes("కూలీ") || userText.includes("கூலி")) {
        occ = "daily_wage";
      }

      const updated = {
        ...params,
        income: simulatedIncome,
        occupation: occ,
        isFirstGen: isFirst
      };
      setParams(updated);
      const res = calculateVulnerabilityScore(updated);
      setResult(res);

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `I have updated your economic parameters to reflect your input. Your Samatva Vulnerability Score is calculated at ${res.score}/100 (${res.tier.split(':')[0]}). You have unlocked ${res.matchingSchemes.length} major entitlements including tuition waivers, nutrition support, and free tech grants.`
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Sunny Yellow & White Module Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-md border-2 border-amber-300 relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 text-amber-950 border border-amber-400 text-xs font-black shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Module 1: Objective Needs & Reservation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            {t.eligibility.title}
          </h1>
          <p className="text-slate-800 text-sm leading-relaxed max-w-2xl font-medium">
            {t.eligibility.subtitle}
          </p>
        </div>
      </div>

      {/* Main Grid: Left Questionnaire & Right AI Chat / Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Questionnaire (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-6">
          <div className="flex items-center justify-between border-b border-amber-100 dark:border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                {t.eligibility.questionnaireTitle}
              </h2>
            </div>
            <button
              onClick={() => {
                const defaultParams = {
                  income: 220000,
                  occupation: "daily_wage",
                  land: "landless",
                  isFirstGen: true,
                  isSingleParent: false,
                  isPwD: false,
                  isRuralSchool: true,
                  hasChronicIllness: false
                };
                setParams(defaultParams);
                handleCalculate(defaultParams);
              }}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center space-x-1 transition-colors font-semibold"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{t.eligibility.resetBtn}</span>
            </button>
          </div>

          {/* Quick Preset Chips */}
          <div>
            <label className="text-xs font-bold text-amber-950/70 dark:text-slate-400 block mb-2">
              Quick Scenarios (One-Click Test):
            </label>
            <div className="flex flex-col gap-2">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyQuickPrompt(qp)}
                  className="text-left text-xs bg-amber-50/70 dark:bg-slate-950/50 hover:bg-amber-100 dark:hover:bg-amber-950/40 border border-amber-200 dark:border-slate-800 rounded-2xl p-3 text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between group shadow-2xs"
                >
                  <span className="truncate mr-2 font-bold">👉 {qp.label}</span>
                  <ArrowRight className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleCalculate(); }} className="space-y-4 text-xs">
            
            {/* Income Slider / Number */}
            <div className="space-y-1.5 bg-amber-50/40 dark:bg-slate-950/40 p-3.5 rounded-2xl border border-amber-200/70 dark:border-slate-800">
              <div className="flex justify-between items-center text-slate-800 dark:text-slate-300">
                <span className="font-bold">{t.eligibility.incomeLabel}</span>
                <span className="font-mono text-slate-950 dark:text-amber-300 text-sm font-black bg-amber-300 dark:bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-400 shadow-2xs">
                  ₹{Number(params.income).toLocaleString('en-IN')} / yr
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="25000"
                value={params.income}
                onChange={(e) => setParams({ ...params, income: Number(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-amber-200 dark:bg-slate-800 rounded-lg mt-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono font-semibold pt-1">
                <span>₹50,000 (Low)</span>
                <span>₹5,00,000 (Mid)</span>
                <span>₹10,00,000+ (High)</span>
              </div>
            </div>

            {/* Primary Occupation */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 dark:text-slate-300 block">
                {t.eligibility.occupationLabel}
              </label>
              <select
                value={params.occupation}
                onChange={(e) => setParams({ ...params, occupation: e.target.value })}
                className="w-full bg-white dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-slate-900 dark:text-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 shadow-2xs"
              >
                <option value="daily_wage">Daily Wage Labourer / Construction Worker (Unorganized)</option>
                <option value="landless_agri">Landless Agricultural Farm Worker</option>
                <option value="artisan">Traditional Artisan / Handloom Weaver / Potter</option>
                <option value="street_vendor">Street Vendor / Micro-Vendor</option>
                <option value="gig_worker">Gig Worker / Delivery Driver / Auto Driver</option>
                <option value="unorganized">Unorganized Private Shop Assistant</option>
                <option value="small_farmer">Marginal Farmer (&lt; 2 acres rainfed)</option>
                <option value="corporate_govt">Salaried Corporate / Government Employee</option>
              </select>
            </div>

            {/* Land & Assets */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 dark:text-slate-300 block">
                {t.eligibility.landLabel}
              </label>
              <select
                value={params.land}
                onChange={(e) => setParams({ ...params, land: e.target.value })}
                className="w-full bg-white dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2.5 text-slate-900 dark:text-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 shadow-2xs"
              >
                <option value="landless">Zero Land / Kutcha House / Rented Single Room</option>
                <option value="marginal_less_1acre">Marginal Landholding (&lt; 1 Acre Unirrigated)</option>
                <option value="small_1_to_2_5acre">Small Agricultural Land (1 to 2.5 Acres)</option>
                <option value="pucca_large">Multi-room Pucca House or &gt; 2.5 Acres Land</option>
              </select>
            </div>

            {/* Vulnerability Checkboxes */}
            <div className="pt-3 border-t border-amber-100 dark:border-slate-800 space-y-2.5">
              <label className="font-black text-amber-950/70 dark:text-slate-400 block text-[11px] uppercase tracking-wider">
                Objective Hardship Modifiers (Increases Eligibility Points):
              </label>

              <label className="flex items-center space-x-2.5 text-slate-800 dark:text-slate-300 cursor-pointer select-none bg-amber-50/50 p-2 rounded-xl border border-amber-200/60">
                <input
                  type="checkbox"
                  checked={params.isFirstGen}
                  onChange={(e) => setParams({ ...params, isFirstGen: e.target.checked })}
                  className="rounded border-amber-400 text-amber-600 accent-amber-500 w-4 h-4"
                />
                <span className="text-xs font-bold">{t.eligibility.firstGenLabel} (+8 pts)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-slate-800 dark:text-slate-300 cursor-pointer select-none bg-amber-50/50 p-2 rounded-xl border border-amber-200/60">
                <input
                  type="checkbox"
                  checked={params.isSingleParent}
                  onChange={(e) => setParams({ ...params, isSingleParent: e.target.checked })}
                  className="rounded border-amber-400 text-amber-600 accent-amber-500 w-4 h-4"
                />
                <span className="text-xs font-bold">{t.eligibility.singleParentLabel} (+8 pts)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-slate-800 dark:text-slate-300 cursor-pointer select-none bg-amber-50/50 p-2 rounded-xl border border-amber-200/60">
                <input
                  type="checkbox"
                  checked={params.isPwD}
                  onChange={(e) => setParams({ ...params, isPwD: e.target.checked })}
                  className="rounded border-amber-400 text-amber-600 accent-amber-500 w-4 h-4"
                />
                <span className="text-xs font-bold">{t.eligibility.disabilityLabel} (+10 pts)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-slate-800 dark:text-slate-300 cursor-pointer select-none bg-amber-50/50 p-2 rounded-xl border border-amber-200/60">
                <input
                  type="checkbox"
                  checked={params.isRuralSchool}
                  onChange={(e) => setParams({ ...params, isRuralSchool: e.target.checked })}
                  className="rounded border-amber-400 text-amber-600 accent-amber-500 w-4 h-4"
                />
                <span className="text-xs font-bold">{t.eligibility.ruralLabel} (+6 pts)</span>
              </label>

              <label className="flex items-center space-x-2.5 text-slate-800 dark:text-slate-300 cursor-pointer select-none bg-amber-50/50 p-2 rounded-xl border border-amber-200/60">
                <input
                  type="checkbox"
                  checked={params.hasChronicIllness}
                  onChange={(e) => setParams({ ...params, hasChronicIllness: e.target.checked })}
                  className="rounded border-amber-400 text-amber-600 accent-amber-500 w-4 h-4"
                />
                <span className="text-xs font-bold">{t.eligibility.illnessLabel} (+6 pts)</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black py-3.5 px-4 rounded-2xl shadow-md shadow-amber-400/25 flex items-center justify-center space-x-2 transition-all border border-amber-400 text-sm"
            >
              <Zap className="w-4 h-4" />
              <span>{t.eligibility.calculateBtn}</span>
            </button>
          </form>
        </div>

        {/* Right Column: AI Chat Advisor & Explainable Score Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Score Banner: Explainable Result */}
          <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {t.eligibility.scoreTitle}
                  </span>
                </div>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                    {result.score}
                  </span>
                  <span className="text-slate-400 font-mono text-sm">/ 100</span>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-950 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300">
                    {result.tier}
                  </span>
                </div>
              </div>

              {/* Zero-Bias Seal */}
              <div className="bg-amber-50 dark:bg-slate-950/80 border-2 border-amber-300 dark:border-amber-500/30 rounded-2xl p-3 flex items-center space-x-2.5 text-xs shadow-2xs">
                <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <div>
                  <div className="font-black text-amber-950 dark:text-amber-300">Zero-Bias Certificate</div>
                  <div className="text-[10px] text-amber-800/80 dark:text-slate-400 font-bold">Social Identity Weight: 0%</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 mt-3.5 bg-amber-50/60 dark:bg-slate-950/40 p-4 rounded-2xl border border-amber-200/80 dark:border-slate-800/80 font-medium leading-relaxed">
              {result.tierDesc}
            </p>

            {/* Explainable AI Mathematical Formula Breakdown */}
            <div className="mt-4 pt-4 border-t border-amber-100 dark:border-slate-800/80">
              <h3 className="text-xs font-black text-slate-800 dark:text-slate-300 flex items-center space-x-1.5 mb-2.5">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{t.eligibility.explainableTitle}</span>
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px]">
                <div className="bg-amber-50/70 dark:bg-slate-950/60 p-3 rounded-2xl border border-amber-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block font-semibold">Income Score</span>
                  <span className="font-black font-mono text-slate-950 dark:text-white text-xs">{result.breakdown.incomeScore} pts / 40</span>
                </div>
                <div className="bg-amber-50/70 dark:bg-slate-950/60 p-3 rounded-2xl border border-amber-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block font-semibold">Livelihood Factor</span>
                  <span className="font-black font-mono text-slate-950 dark:text-white text-xs">{result.breakdown.occupationScore} pts / 20</span>
                </div>
                <div className="bg-amber-50/70 dark:bg-slate-950/60 p-3 rounded-2xl border border-amber-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block font-semibold">Asset Deprivation</span>
                  <span className="font-black font-mono text-slate-950 dark:text-white text-xs">{result.breakdown.assetScore} pts / 20</span>
                </div>
                <div className="bg-amber-50/70 dark:bg-slate-950/60 p-3 rounded-2xl border border-amber-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block font-semibold">Hardship Bonus</span>
                  <span className="font-black font-mono text-amber-800 dark:text-amber-300 text-xs">+{result.breakdown.modifierScore} pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Matched Welfare Schemes & Quotas */}
          <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  {t.eligibility.eligibleSchemes} ({result.matchingSchemes.length})
                </h3>
              </div>
              <span className="text-xs font-mono font-black text-amber-950 dark:text-amber-400 bg-amber-200/80 dark:bg-amber-500/20 px-3 py-1 rounded-xl border border-amber-300">
                {result.totalBenefitsValue}
              </span>
            </div>

            <div className="space-y-3">
              {result.matchingSchemes.map((scheme) => (
                <div 
                  key={scheme.id}
                  className="bg-amber-50/30 dark:bg-slate-950/70 border-2 border-amber-200/80 dark:border-slate-800 hover:border-amber-400 rounded-3xl p-4.5 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-200 text-amber-950 border border-amber-300">
                          {scheme.category}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                          Min Need Score: {scheme.minScore}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-slate-950 dark:text-white mt-1 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                        {currentLang === 'hi' ? scheme.hindiName : currentLang === 'te' ? scheme.teluguName : currentLang === 'ta' ? scheme.tamilName : scheme.name}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                        {scheme.mandate}
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigateToVault && onNavigateToVault()}
                      className="flex-shrink-0 bg-amber-400 hover:bg-amber-500 text-slate-950 px-4 py-2 rounded-2xl text-xs font-black shadow-xs transition-all flex items-center space-x-1.5 border border-amber-400"
                    >
                      <span>Pre-Check & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Benefit Points */}
                  <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-amber-200/60 dark:border-slate-800/60">
                    {scheme.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multilingual AI Chatbot Assistant */}
          <div className="bg-white dark:bg-navy-900 border-2 border-amber-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm flex flex-col h-[350px]">
            <div className="flex items-center space-x-2 border-b border-amber-100 dark:border-slate-800 pb-2.5 px-2">
              <Bot className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <h3 className="text-xs font-black text-slate-900 dark:text-white">{t.eligibility.chatTitle}</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{t.eligibility.chatSubtitle}</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-2 space-y-3 text-xs">
              {messages.map((m, idx) => (
                <div 
                  key={idx}
                  className={`flex items-start space-x-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-600/30 border border-amber-300 dark:border-amber-500/40 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-3 leading-relaxed shadow-xs font-medium ${
                      m.sender === 'user'
                        ? 'bg-amber-400 text-slate-950 font-bold rounded-tr-none border border-amber-400'
                        : 'bg-amber-50/60 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-xs italic">
                  <Bot className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-spin" />
                  <span>Samatva AI is calculating your welfare entitlements...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="pt-2 border-t border-amber-100 dark:border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask in Hindi, Telugu, Tamil, or English..."
                className="flex-1 bg-amber-50/40 dark:bg-slate-950 border-2 border-amber-200 dark:border-slate-700 rounded-2xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 font-medium focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-slate-950 p-2.5 rounded-2xl transition-colors shadow-xs border border-amber-400 font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
