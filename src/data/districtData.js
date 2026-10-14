export const SUMMARY_METRICS = {
  totalSanctioned: "₹48,420 Cr",
  totalDisbursed: "₹46,890 Cr",
  disbursalPercentage: 96.84,
  leakagePrevented: "₹1,530 Cr",
  transparencyIndex: 94.2,
  activeBottlenecks: 6,
  totalBeneficiaries: "3.42 Crore Citizens",
  dbtThroughputSeconds: "1.4s Avg Clearing Speed"
};

export const DISTRICT_AUDIT_DATA = [
  {
    id: "dist-01",
    district: "Guntur",
    state: "Andhra Pradesh",
    sanctioned: 840.5,
    disbursed: 825.2,
    deliveryRate: 98.18,
    lagDays: 1.8,
    healthStatus: "OPTIMAL",
    anomalyDetails: "All Direct Benefit Transfers cleared via NPCI Aadhaar mapper within 36 hours. Zero intermediary escrow retention.",
    beneficiaries: "4.85 Lakhs",
    officerInCharge: "R. Venkat Rao, IAS (Dist. Collector)",
    escrowStatus: "Active",
    lastAuditDate: "Today, 09:40 AM"
  },
  {
    id: "dist-02",
    district: "Mirzapur",
    state: "Uttar Pradesh",
    sanctioned: 620.0,
    disbursed: 445.8,
    deliveryRate: 71.90,
    lagDays: 19.4,
    healthStatus: "BOTTLENECK_FLAGGED",
    anomalyDetails: "Graph AI flagged 19-day delay in Block 4 & 7. Local welfare office retained batch approvals without justification.",
    beneficiaries: "3.20 Lakhs",
    officerInCharge: "P. Srivastava, PCS (Sub-Divisional Mag.)",
    escrowStatus: "Audit Hold",
    lastAuditDate: "12 mins ago"
  },
  {
    id: "dist-03",
    district: "Warangal",
    state: "Telangana",
    sanctioned: 580.2,
    disbursed: 569.8,
    deliveryRate: 98.21,
    lagDays: 2.1,
    healthStatus: "OPTIMAL",
    anomalyDetails: "Continuous micro-clearing. Direct Aadhaar seeding at 99.4% saturation across rural blocks.",
    beneficiaries: "3.90 Lakhs",
    officerInCharge: "K. Swetha Devi, IAS",
    escrowStatus: "Active",
    lastAuditDate: "Today, 11:15 AM"
  },
  {
    id: "dist-04",
    district: "Madurai",
    state: "Tamil Nadu",
    sanctioned: 910.4,
    disbursed: 894.1,
    deliveryRate: 98.21,
    lagDays: 1.4,
    healthStatus: "OPTIMAL",
    anomalyDetails: "Automated treasury pipeline synchronized with State Public Financial Management System (PFMS).",
    beneficiaries: "6.12 Lakhs",
    officerInCharge: "M. Senthil Nathan, IAS",
    escrowStatus: "Active",
    lastAuditDate: "Today, 08:30 AM"
  },
  {
    id: "dist-05",
    district: "Gaya",
    state: "Bihar",
    sanctioned: 740.0,
    disbursed: 480.3,
    deliveryRate: 64.91,
    lagDays: 24.8,
    healthStatus: "AUDIT_TRIGGERED",
    anomalyDetails: "Severe discrepancy: ₹259.7 Cr unreleased despite central clearance. 14 anonymous whistleblower reports logged for bribe demands.",
    beneficiaries: "4.10 Lakhs",
    officerInCharge: "A. K. Paswan, State Cadre",
    escrowStatus: "Frozen by Vigilance",
    lastAuditDate: "Just now"
  },
  {
    id: "dist-06",
    district: "Kurnool",
    state: "Andhra Pradesh",
    sanctioned: 710.0,
    disbursed: 692.4,
    deliveryRate: 97.52,
    lagDays: 2.5,
    healthStatus: "OPTIMAL",
    anomalyDetails: "Agricultural and scholarship DBT transfers successfully routed with 0% middleman clawback.",
    beneficiaries: "4.40 Lakhs",
    officerInCharge: "G. Srijana, IAS",
    escrowStatus: "Active",
    lastAuditDate: "Today, 10:05 AM"
  },
  {
    id: "dist-07",
    district: "Bikaner",
    state: "Rajasthan",
    sanctioned: 490.6,
    disbursed: 382.1,
    deliveryRate: 77.88,
    lagDays: 14.2,
    healthStatus: "HIGH_DISCREPANCY",
    anomalyDetails: "Suspicious clustering: 812 scholarship approvals routed to a non-functional polytechnic trust address.",
    beneficiaries: "2.80 Lakhs",
    officerInCharge: "Namit Mehta, IAS",
    escrowStatus: "Audit Hold",
    lastAuditDate: "28 mins ago"
  },
  {
    id: "dist-08",
    district: "Thane",
    state: "Maharashtra",
    sanctioned: 1120.0,
    disbursed: 1089.4,
    deliveryRate: 97.27,
    lagDays: 2.0,
    healthStatus: "OPTIMAL",
    anomalyDetails: "Urban unorganized worker fund dispatches verified with biometric and digital locker sync.",
    beneficiaries: "8.40 Lakhs",
    officerInCharge: "Ashok Shingare, IAS",
    escrowStatus: "Active",
    lastAuditDate: "Today, 11:50 AM"
  }
];

export const LIVE_TRANSACTION_STREAM = [
  {
    id: "tx-9941",
    amount: "₹75,000",
    scheme: "Higher Ed Tuition Waiver & Stipend",
    beneficiaryMasked: "Citizen •••• 4912 (Guntur, AP)",
    hash: "0x8fa1...c3e9",
    timestamp: "12 seconds ago",
    status: "Direct DBT Cleared",
    middlemanBypass: "100% Intermediary-Free"
  },
  {
    id: "tx-9940",
    amount: "₹10,000",
    scheme: "Antyodaya Nutrition & Care Credit",
    beneficiaryMasked: "Citizen •••• 8821 (Madurai, TN)",
    hash: "0x3bc2...99d1",
    timestamp: "34 seconds ago",
    status: "Direct DBT Cleared",
    middlemanBypass: "100% Intermediary-Free"
  },
  {
    id: "tx-9939",
    amount: "₹35,000",
    scheme: "Livelihood Tech Grant",
    beneficiaryMasked: "Citizen •••• 1045 (Warangal, TS)",
    hash: "0x77e4...51fa",
    timestamp: "1 min ago",
    status: "Direct DBT Cleared",
    middlemanBypass: "100% Intermediary-Free"
  },
  {
    id: "tx-9938",
    amount: "₹2,80,000",
    scheme: "Artisan Pucca Housing Tranche #2",
    beneficiaryMasked: "Citizen •••• 6271 (Kurnool, AP)",
    hash: "0x12a9...fd40",
    timestamp: "2 mins ago",
    status: "Direct DBT Cleared",
    middlemanBypass: "100% Intermediary-Free"
  }
];
