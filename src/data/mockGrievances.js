export const INITIAL_GRIEVANCES = [
  {
    ticketId: "#SD-8921-X",
    category: "Bribe Demanded for Sanctioned Welfare Disbursal",
    department: "Mandal Revenue Office (MRO) / Social Welfare Division",
    district: "Gaya, Bihar",
    bribeAmount: "₹5,000",
    description: "The village clerk demanded ₹5,000 in cash to clear the pending Higher Education scholarship file, stating 'if you don't give the cut, your income certificate verification will be marked defective'.",
    dateSubmitted: "2026-10-10",
    status: "INVESTIGATION_ACTIVE",
    statusBadge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    bypassedLocal: true,
    escalationTarget: "State Anti-Corruption Bureau (ACB) & Special Vigilance Unit",
    evidenceCount: 2,
    evidenceTypes: ["Sanitized Audio Recording (0:48s)", "Written slip with demanded amount"],
    timeline: [
      {
        step: "Anonymous Whistleblower Logged",
        timestamp: "10 Oct 2026, 14:22",
        detail: "Complaint encrypted using client-side AES-256. IP address purged, audio EXIF stripped."
      },
      {
        step: "Local Intermediaries Bypassed",
        timestamp: "10 Oct 2026, 14:23",
        detail: "Ticket routed straight to State Vigilance Oversight Panel. Local block office blocked from viewing whistleblower token."
      },
      {
        step: "Evidence Authenticated by AI Audio Lab",
        timestamp: "11 Oct 2026, 09:15",
        detail: "Voice spectrograph confirmed match with Revenue Clerk ID #RC-4091. Tampering score: 0%."
      },
      {
        step: "Vigilance Summon Dispatched",
        timestamp: "12 Oct 2026, 16:30",
        detail: "Sub-Divisional Magistrate instructed to submit written show-cause explanation within 48 hours."
      }
    ]
  },
  {
    ticketId: "#SD-4412-Z",
    category: "Denial of Free Healthcare & Hospitalization Card",
    department: "District Government Civil Hospital",
    district: "Mirzapur, Uttar Pradesh",
    bribeAmount: "₹2,500",
    description: "Hospital billing superintendent refused cashless admission under Antyodaya Health Card, demanding ₹2,500 for 'administrative stamp fees'.",
    dateSubmitted: "2026-10-06",
    status: "RESOLVED_RESTITUTION",
    statusBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    bypassedLocal: true,
    escalationTarget: "National Health Authority State Grievance Redressal Cell",
    evidenceCount: 1,
    evidenceTypes: ["Photograph of denied slip with handwritten demand"],
    timeline: [
      {
        step: "Complaint Logged Anonymously",
        timestamp: "06 Oct 2026, 11:05",
        detail: "Photo stripped of GPS geolocation and uploaded to cryptographic ledger."
      },
      {
        step: "Automated Escalation to NHA State Director",
        timestamp: "06 Oct 2026, 11:06",
        detail: "Hospital empaneled license flagged with high-severity compliance violation notice."
      },
      {
        step: "Surprise Inspection Conducted",
        timestamp: "08 Oct 2026, 15:00",
        detail: "State Medical Officer raided hospital reception. Superintendent caught running illegal cash fee counter."
      },
      {
        step: "Full Resolution & Sanction Enforced",
        timestamp: "09 Oct 2026, 17:40",
        detail: "Superintendent suspended pending departmental enquiry. Patient admitted 100% cashless, and ₹10,000 compensation disbursed to beneficiary vault."
      }
    ]
  },
  {
    ticketId: "#SD-7301-B",
    category: "Ration & Nutrition Diversion by Fair Price Shop Dealer",
    department: "Civil Supplies & Public Distribution Office",
    district: "Bikaner, Rajasthan",
    bribeAmount: "₹1,200",
    description: "Ration dealer skimming 4 kg foodgrains per family and charging extra cash for subsidized fortified cooking oil.",
    dateSubmitted: "2026-10-01",
    status: "ACTION_ENFORCED",
    statusBadge: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    bypassedLocal: true,
    escalationTarget: "Food & Consumer Protection Vigilance Wing",
    evidenceCount: 3,
    evidenceTypes: ["Weighing scale video snippet", "Receipt comparison", "Neighbor testimonies"],
    timeline: [
      {
        step: "Encrypted Evidence Submitted",
        timestamp: "01 Oct 2026, 18:30",
        detail: "3 digital proofs validated by Samatva pre-checker."
      },
      {
        step: "Escalated to State Enforcement Directorate",
        timestamp: "02 Oct 2026, 10:15",
        detail: "Bypassed local supply inspector who was previously accused of collusion."
      },
      {
        step: "Dealer License Cancelled",
        timestamp: "05 Oct 2026, 14:00",
        detail: "Fair Price Shop license seized. Village Women's Self-Help Group (SHG) assigned fair price depot."
      }
    ]
  }
];
