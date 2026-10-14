export const WELFARE_SCHEMES_DATABASE = [
  {
    id: "sch-1",
    name: "Samatva Universal Higher Education Quota & 100% Tuition Waiver",
    hindiName: "समत्व सार्वभौमिक उच्च शिक्षा कोटा एवं शत-प्रतिशत शुल्क माफी",
    teluguName: "సమత్వ సార్వత్రిక ఉన్నత విద్య కోటా & 100% ఫీజు రీయింబర్స్‌మెంట్",
    tamilName: "சமத்துவ உயர்கல்வி இடஒதுக்கீடு & 100% கட்டண விலக்கு",
    minScore: 75,
    maxIncome: 250000,
    category: "Higher Education & Engineering/Medical Admissions",
    benefits: [
      "100% Government & Empanelled Private College Tuition Waiver",
      "₹75,000/yr Living & Hostel Stipend via Direct Aadhaar DBT",
      "Free High-Performance Student Laptop & Digital Learning Grant",
      "Dedicated Supernumerary Seat Allocation in State Technical Universities"
    ],
    mandate: "Direct Needs-Based Quota under National Equity Framework (zero identity markers)",
    authority: "Ministry of Education & National Social Justice Directorate",
    sanctionedFund: "₹1,200 Cr earmarked",
    validity: "Annual Renewal based on verified academic continuation"
  },
  {
    id: "sch-2",
    name: "National Livelihood Resilience & Skill Tech Stipend",
    hindiName: "राष्ट्रीय आजीविका संबल एवं कौशल तकनीक छात्रवृत्ति",
    teluguName: "జాతీయ జీవనోపాధి సంక్షేమ & సాంకేతిక శిక్షణ స్టైపెండ్",
    tamilName: "தேசிய வாழ்வாதார திறன் மேம்பாட்டு ஊக்கத்தொகை",
    minScore: 55,
    maxIncome: 450000,
    category: "Livelihood & Digital Employability",
    benefits: [
      "₹35,000/yr Technology & Skill Training Grant",
      "Guaranteed Apprenticeship Placement in Renewable Energy / IT sectors",
      "₹1,50,000 Collateral-free Micro-Credit Line at 0% interest",
      "Free Cloud Certification & AI Vocational Kit"
    ],
    mandate: "Economic Vulnerability Index Scheme Section 4B",
    authority: "Ministry of Skill Development & Entrepreneurship",
    sanctionedFund: "₹850 Cr earmarked",
    validity: "Multi-year milestone based"
  },
  {
    id: "sch-3",
    name: "Antyodaya Comprehensive Health & Nutrition Protection Card",
    hindiName: "अंत्योदय व्यापक स्वास्थ्य एवं पोषण सुरक्षा कार्ड",
    teluguName: "అంత్యోదయ సమగ్ర ఆరోగ్య & పోషకాహార రక్షణ కార్డు",
    tamilName: "அந்தியோதயா விரிவான சுகாதார மற்றும் ஊட்டச்சத்து அட்டை",
    minScore: 60,
    maxIncome: 300000,
    category: "Healthcare & Critical Medical Security",
    benefits: [
      "₹10,00,000/yr Cashless Secondary & Tertiary Hospitalization across 28,000+ Hospitals",
      "Zero-Out-of-Pocket Prescription Medicines via Jan Aushadhi Kendra",
      "Monthly ₹2,500 Direct Nutrition Support for Single Parents / Chronic Patient Homes",
      "Free Mobile Diagnostic Screening at Village Health Sub-Centers"
    ],
    mandate: "Right to Health Direct Assurance Framework",
    authority: "National Health Authority (NHA)",
    sanctionedFund: "₹6,400 Cr earmarked",
    validity: "Lifetime seeded with Aadhaar token"
  },
  {
    id: "sch-4",
    name: "First-Generation Scholar Mentorship & Book Subsidy",
    hindiName: "प्रथम पीढ़ी विद्वान मार्गदर्शन एवं पुस्तक अनुदान",
    teluguName: "మొదటి తరం విద్యార్థి మార్గదర్శకత్వం & పుస్తకాల సబ్సిడీ",
    tamilName: "முதல் தலைமுறை பட்டதாரி உதவித்தொகை & புத்தக மானியம்",
    minScore: 40,
    maxIncome: 600000,
    requiresFirstGen: true,
    category: "Educational Equity",
    benefits: [
      "₹20,000/yr Direct Book & Digital Reading Tablet Allowance",
      "1-on-1 Academic Mentorship from Central University Faculty",
      "50% Tuition Fee Concession in All State Universities",
      "Free Coaching Access for National Competitive Examinations (GATE/CAT/UPSC)"
    ],
    mandate: "First-Gen Social Mobility Directives 2026",
    authority: "Department of Higher Education",
    sanctionedFund: "₹420 Cr earmarked",
    validity: "Degree tenure"
  },
  {
    id: "sch-5",
    name: "Rural Landless Artisan Housing & Solar Grid Subsidy",
    hindiName: "ग्रामीण भूमिहीन कारीगर आवास एवं सौर ग्रिड सब्सिडी",
    teluguName: "గ్రామీణ భూమిలేని కళాకారుల గృహ & సోలార్ విద్యుత్ సబ్సిడీ",
    tamilName: "கிராமப்புற நிலமற்ற கைவினைஞர் வீட்டுவசதி & சோலார் மானியம்",
    minScore: 65,
    maxIncome: 300000,
    requiresLandlessOrArtisan: true,
    category: "Housing & Infrastructure",
    benefits: [
      "₹2,80,000 Direct Disbursal for 100% Pucca Climate-Resilient House Construction",
      "Free 2 kW Rooftop Solar Electricity & Clean Water Filter Unit",
      "Direct DBT Installments transferred with zero contractor commission",
      "Satellite Geo-tagged Verification with Drone Audit"
    ],
    mandate: "Universal Housing for Vulnerable Livelihoods Act",
    authority: "Ministry of Rural Development",
    sanctionedFund: "₹4,100 Cr earmarked",
    validity: "Project completion cycle"
  },
  {
    id: "sch-6",
    name: "Persons with Disabilities (PwD) Assistive Tech & Mobility Grant",
    hindiName: "दिव्यांगजन सहायक तकनीक एवं गतिशीलता अनुदान",
    teluguName: "దివ్యాంగుల ఉపకరణాలు & సహాయక సాంకేతిక గ్రాంట్",
    tamilName: "மாற்றுத்திறனாளிகள் உதவி உபகரணங்கள் மற்றும் இயக்கம் மானியம்",
    minScore: 35,
    maxIncome: 800000,
    requiresDisability: true,
    category: "Universal Accessibility",
    benefits: [
      "100% Free Motorized Wheelchair / Smart Braille Assistive Device",
      "₹4,000/month Unconditional Disability Care Allowance via DBT",
      "5% Supernumerary Reservation in all Academic Entrances",
      "Free Accessible Conveyance Pass for Public Transit"
    ],
    mandate: "Rights of Persons with Disabilities Act 2016 Compliant",
    authority: "Department of Empowerment of PwDs",
    sanctionedFund: "₹910 Cr earmarked",
    validity: "Permanent with UDID sync"
  }
];

export function calculateVulnerabilityScore(params) {
  const {
    income = 250000,
    occupation = "daily_wage",
    land = "landless",
    isFirstGen = false,
    isSingleParent = false,
    isPwD = false,
    isRuralSchool = false,
    hasChronicIllness = false
  } = params;

  let incomeScore = 0;
  if (income <= 150000) incomeScore = 40;
  else if (income <= 300000) incomeScore = 32;
  else if (income <= 500000) incomeScore = 22;
  else if (income <= 800000) incomeScore = 12;
  else incomeScore = 2;

  let occupationScore = 0;
  if (occupation === "daily_wage" || occupation === "landless_agri") occupationScore = 20;
  else if (occupation === "artisan" || occupation === "street_vendor") occupationScore = 16;
  else if (occupation === "gig_worker") occupationScore = 14;
  else if (occupation === "unorganized") occupationScore = 10;
  else if (occupation === "small_farmer") occupationScore = 8;
  else occupationScore = 2;

  let assetScore = 0;
  if (land === "landless" || land === "kuchha_rented") assetScore = 20;
  else if (land === "marginal_less_1acre") assetScore = 15;
  else if (land === "small_1_to_2_5acre") assetScore = 8;
  else assetScore = 2;

  let modifierScore = 0;
  const modifiers = [];
  if (isFirstGen) {
    modifierScore += 8;
    modifiers.push({ name: "First-Generation Scholar Factor", points: 8, rationale: "Family lacks higher education lineage" });
  }
  if (isSingleParent) {
    modifierScore += 8;
    modifiers.push({ name: "Single Parent / Orphan Vulnerability", points: 8, rationale: "Solo income earner household strain" });
  }
  if (isPwD) {
    modifierScore += 10;
    modifiers.push({ name: "Disability Accessibility Modifier", points: 10, rationale: "40%+ certified assistive necessity" });
  }
  if (isRuralSchool) {
    modifierScore += 6;
    modifiers.push({ name: "Rural Educational Equity Factor", points: 6, rationale: "> 7 years in rural government school" });
  }
  if (hasChronicIllness) {
    modifierScore += 6;
    modifiers.push({ name: "Medical Debt Deprivation", points: 6, rationale: "High catastrophic out-of-pocket healthcare expenses" });
  }

  const rawTotal = incomeScore + occupationScore + assetScore + modifierScore;
  const finalScore = Math.min(100, Math.max(5, rawTotal));

  let tier = "Tier 4: General / Self-Sufficient";
  let tierBadge = "bg-slate-700 text-slate-200 border-slate-600";
  let tierDesc = "Eligible for general merit quotas, subsidized skills training, and standard government credit assistance.";

  if (finalScore >= 80) {
    tier = "Tier 1: Extreme Economic Hardship (Priority Access)";
    tierBadge = "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
    tierDesc = "Maximum entitlement: 100% Free Tuition, Supernumerary Reserved Seats, Full Hostel DBT Stipend, and Complete Healthcare Coverage.";
  } else if (finalScore >= 60) {
    tier = "Tier 2: High Economic Vulnerability";
    tierBadge = "bg-teal-500/20 text-teal-300 border-teal-500/40";
    tierDesc = "Substantial entitlement: 75% Tuition Fee Waiver, Needs-Based Seat Allocation, ₹45,000/yr Living Subsidy, Cashless Health Card.";
  } else if (finalScore >= 40) {
    tier = "Tier 3: Moderate Vulnerability";
    tierBadge = "bg-blue-500/20 text-blue-300 border-blue-500/40";
    tierDesc = "Targeted entitlement: 50% Tuition Waiver, First-Gen Educational Allowance, and Collateral-Free Skill Micro-Credit.";
  }

  // Filter matching schemes
  const matchingSchemes = WELFARE_SCHEMES_DATABASE.filter(sch => {
    if (sch.minScore && finalScore < sch.minScore) return false;
    if (sch.maxIncome && income > sch.maxIncome) return false;
    if (sch.requiresFirstGen && !isFirstGen) return false;
    if (sch.requiresDisability && !isPwD) return false;
    if (sch.requiresLandlessOrArtisan && !(land === "landless" || occupation === "artisan" || occupation === "daily_wage")) return false;
    return true;
  });

  return {
    score: finalScore,
    tier,
    tierBadge,
    tierDesc,
    breakdown: {
      incomeScore,
      occupationScore,
      assetScore,
      modifierScore,
      modifiers,
      socialIdentityMarkerWeight: 0, // Explicitly 0% to emphasize caste-free needs basis
    },
    matchingSchemes,
    totalBenefitsValue: matchingSchemes.length > 0 
      ? `₹${(matchingSchemes.length * 1.8).toFixed(1)} Lakhs in Grants, Free Facilities & Fee Waivers`
      : "Standard Benefits"
  };
}
