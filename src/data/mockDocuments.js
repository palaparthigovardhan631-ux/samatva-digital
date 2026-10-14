export const INITIAL_DIGILOCKER_DOCS = [
  {
    id: "doc-income",
    type: "Income Certificate",
    issuer: "Revenue Department, Govt of Andhra Pradesh",
    certificateNo: "AP-REV-INC-2025-883921",
    issueDate: "2025-05-14",
    validTill: "2026-05-13",
    status: "VALID",
    statedIncome: "₹1,80,000 / annum",
    holderName: "Ravi Teja Varma",
    fileSize: "1.4 MB (Signed PDF)",
    digitalSignature: "Cryptographically Signed by Tahsildar (e-Sign SHA-256)",
    qrChecksum: "VERIFIED_ACTIVE"
  },
  {
    id: "doc-marksheet",
    type: "Higher Secondary Academic Marksheet (12th / Inter)",
    issuer: "Board of Intermediate Education",
    certificateNo: "BIE-2024-REG-449102",
    issueDate: "2024-06-20",
    validTill: "Permanent",
    status: "VALID",
    statedIncome: "N/A",
    percentage: "91.4% (Grade A1)",
    holderName: "Ravi Teja Varma",
    fileSize: "2.1 MB (Original DigiLocker XML+PDF)",
    digitalSignature: "Controller of Examinations (PKI Valid)",
    qrChecksum: "VERIFIED_ACTIVE"
  },
  {
    id: "doc-domicile",
    type: "Permanent Residence / Domicile Certificate",
    issuer: "Office of the District Magistrate & Revenue Officer",
    certificateNo: "DOM-DIST-2023-112094",
    issueDate: "2023-08-10",
    validTill: "Permanent",
    status: "VALID",
    holderName: "Ravi Teja Varma",
    fileSize: "1.2 MB (Digitally Sealed)",
    digitalSignature: "District Revenue Officer (Valid)",
    qrChecksum: "VERIFIED_ACTIVE"
  },
  {
    id: "doc-ration",
    type: "National Food Security Card (NFSA - BPL / White Card)",
    issuer: "Department of Consumer Affairs, Food & Civil Supplies",
    certificateNo: "NFSA-W-07-2849102",
    issueDate: "2024-01-15",
    validTill: "2029-01-14",
    status: "VALID",
    holderName: "Ravi Teja Varma (Dependent / Son)",
    fileSize: "980 KB",
    digitalSignature: "Civil Supplies Officer (Active)",
    qrChecksum: "VERIFIED_ACTIVE"
  },
  {
    id: "doc-aadhaar-seeding",
    type: "NPCI Direct Benefit Transfer (DBT) Bank Seeding Status",
    issuer: "National Payments Corporation of India (NPCI) & PFMS",
    certificateNo: "NPCI-MAPP-99120482",
    issueDate: "2026-01-10",
    validTill: "Active / Seeded",
    status: "VALID",
    holderName: "Ravi Teja Varma",
    bankName: "State Bank of India (A/C •••• 4419)",
    fileSize: "Real-time API Token",
    digitalSignature: "NPCI Host Gateway Secure",
    qrChecksum: "VERIFIED_ACTIVE"
  }
];

export function runPreSubmissionScan(documents, hasExpiredIncome = false) {
  // Simulates deep OCR, validity date parsing, cross-matching
  const results = documents.map(doc => {
    if (doc.id === "doc-income" && hasExpiredIncome) {
      return {
        ...doc,
        issueDate: "2022-04-10",
        validTill: "2023-04-09",
        status: "EXPIRED_ERROR",
        feedback: "CRITICAL ERROR: Income Certificate expired 3 years ago (Validity in AP is 12 months). Standard clerical scrutiny would reject this immediately.",
        fixRecommendation: "Click to generate 1-Click Renewal Request directly to MeeSeva / e-District portal with pre-filled DigiLocker identity."
      };
    }

    return {
      ...doc,
      status: "VERIFIED_READY",
      feedback: "COMPLIANCE PASSED: Digital signature active, cryptographic QR verified, holder name matches 100% across identity databases.",
      fixRecommendation: null
    };
  });

  const hasErrors = results.some(r => r.status === "EXPIRED_ERROR");

  return {
    isReadyForDirectFiling: !hasErrors,
    complianceScore: hasErrors ? "64% - Action Required" : "100% - Fully Certified",
    diagnostics: results,
    overallSummary: hasErrors 
      ? "1 Document failed automated compliance scan. Fix the highlighted certificate to prevent administrative rejection."
      : "All 5 documents verified against official State & Central databases. Your application is eligible for 100% automated fast-track approval without clerk intervention."
  };
}
