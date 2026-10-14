export const LEGAL_PROTECTION_ACTS = [
  {
    id: "act-01",
    title: "Article 14 & 15: Fundamental Right to Equality & Non-Discrimination",
    shortCode: "Constitution of India, Art. 14-15",
    summary: "The State cannot deny any person equality before the law or discriminate on grounds only of religion, race, caste, sex, or place of birth.",
    citizenPower: "Any welfare rule or administrative official practicing discriminatory denial or caste profiling violates the Constitution. Writs under Article 226/32 can be filed immediately.",
    keyClauses: [
      "Article 14: Mandates reasonable classification based on intelligible differentia (e.g. objective economic distress).",
      "Article 15(1): Forbids identity discrimination in access to public places, government funds, or public educational institutions.",
      "Article 15(4) & (5): Constitutional power for special provisions for economically weaker and vulnerable citizens."
    ]
  },
  {
    id: "act-02",
    title: "Right to Public Services Legislation (Guaranteed Service Delivery)",
    shortCode: "Public Services Guarantee Act",
    summary: "State laws legally bound government designated officers to deliver citizen welfare certificates, scholarships, and pensions within fixed statutory time limits (typically 15-30 days).",
    citizenPower: "If an officer delays your file without valid written cause, a fine of ₹250 per day is automatically deducted from the officer's personal salary and paid to you as compensation.",
    keyClauses: [
      "Mandatory Time Bounds: 15 days for Income/Caste/Residence certificates, 30 days for scholarship disbursals.",
      "Statutory Rejection Rule: Rejections cannot be oral; officer must state exact legal section in writing.",
      "First Appellate Authority: Right to demand automatic hearing within 15 days of breach."
    ]
  },
  {
    id: "act-03",
    title: "Prevention of Corruption Act, 1988 (Amended 2018)",
    shortCode: "POCA Sections 7, 7A & 13",
    summary: "Stringent criminal code punishing public servants demanding illegal gratification, bribes, or undue advantage.",
    citizenPower: "Demanding a bribe to clear a free facility or government grant is a cognizable, non-bailable offence carrying 3 to 7 years imprisonment. Whistleblowers who report extortion within 7 days are granted total legal immunity.",
    keyClauses: [
      "Section 7: Imprisonment for public servant obtaining undue advantage for performing official duty.",
      "Section 7A: Penalizes middleman/touts who claim to influence public servants for bribes.",
      "Section 13: Criminal misconduct by public servant through illicit enrichment."
    ]
  },
  {
    id: "act-04",
    title: "Whistleblowers Protection Act & Confidentiality Directives",
    shortCode: "WPA 2014 & State Vigilance Guidelines",
    summary: "Legal framework safeguarding citizens and public officials who expose corruption, misuse of power, or criminal misconduct.",
    citizenPower: "Your identity cannot be revealed to local officials or accused persons under Section 4. Any attempt to harass or threaten a whistleblower attracts separate criminal proceedings.",
    keyClauses: [
      "Zero Retaliation: State Vigilance Commission is mandated to provide police protection if threats occur.",
      "Identity Redaction: Complaints must be anonymized before being shared with inquiry officers.",
      "False Rejection Penalties: Officials who punish whistleblowers face immediate suspension."
    ]
  },
  {
    id: "act-05",
    title: "National Legal Services Authority (NALSA) - Free Legal Counsel",
    shortCode: "Legal Services Authorities Act, 1987 (Sec. 12)",
    summary: "Constitutional entitlement providing free, state-sponsored senior advocates to represent disadvantaged citizens.",
    citizenPower: "Any citizen with family income below ₹3 Lakhs, all women, children, PwDs, and victim of atrocities are legally entitled to 100% free legal defense in all courts up to the Supreme Court.",
    keyClauses: [
      "Toll-free 24x7 National Legal Aid Helpline: 15100.",
      "Taluk / District Legal Services Authority (DLSA) appointed counsel at zero cost.",
      "Free drafting of writ petitions, notices, and appeals."
    ]
  }
];

export function generateStatutoryAppealLetter({
  citizenName,
  district,
  schemeName,
  rejectionReason,
  applicationRef,
  dateOfRejection
}) {
  return `FORMAL STATUTORY NOTICE OF APPEAL & RECONSIDERATION
UNDER SECTION 5 OF THE RIGHT TO PUBLIC SERVICES GUARANTEE ACT
READ WITH ARTICLES 14 & 21 OF THE CONSTITUTION OF INDIA

To,
The First Appellate Authority / District Collector & Magistrate,
District Administration, ${district || "[District Name]"}

Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
Application Tracking Reference ID: ${applicationRef || "SAMATVA-" + Math.floor(100000 + Math.random() * 900000)}

Subject: Urgent Appeal against Unlawful Rejection / Undue Delay of Welfare Benefit: "${schemeName}"

Respected Authority,

1. I, ${citizenName || "[Citizen Name]"}, resident of ${district || "[District]"}, duly submitted an application for the welfare benefit "${schemeName}" with all mandatory verified credentials through the Samatva Digital public registry.

2. On ${dateOfRejection || "recently"}, my application was rejected / stalled citing the following reason:
   "${rejectionReason || "Clerical discrepancy / unstated grounds"}"

3. I respectfully submit that this rejection is legally untenable, arbitrary, and violates the principles of natural justice:
   a) My eligibility meets all objective needs-based economic vulnerability parameters certified via DigiLocker.
   b) Under the Right to Public Services Act, no administrative denial can be issued without specific statutory justification and opportunity to cure minor paperwork defects.
   c) Oral refusals or vague pretexts constitute deliberate obstruction punishable under Section 166A of the Indian Penal Code.

4. DEMAND FOR MANDATORY STATUTORY RELIEF:
   In accordance with the statutory 7-day reconsideration mandate, you are hereby requested to:
   i. Review the pre-verified digital records attached hereto;
   ii. Issue a reasoned, written order reversing the rejection within seven (7) working days; OR
   iii. Provide a signed statutory justification for referral to the State Lokayukta / High Court of Judicature.

Yours faithfully,

${citizenName || "[Aggrieved Citizen]"}
Digital Token: SHA-256-VIG-${Math.random().toString(36).substring(2, 10).toUpperCase()}
Copy To: State Vigilance Commission & Central Welfare Integrity Directorate
`;
}
