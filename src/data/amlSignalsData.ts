// Real AML Signals Data extracted from gitcore ML Model
// WIUT Hackathon 2026: AML Alert Prioritization

export interface AMLSignal {
  signal_id: string;
  signal_date: string;
  probability: number;
  raw_probability: number;
  tier: string;
  severity: 'critical' | 'warning' | 'low';
  recommended_action: string;
  drivers: string[];
  tx_count: number;
  tx_24h: number;
  min_amount: number;
  max_amount: number;
  turnover: number;
  burst_15m_count: number;
  cash_sum: number;
  pass_through_ratio: number;
  explanation: string;
  status: 'pending' | 'escalated' | 'dismissed';
}

export const amlSignalsList: AMLSignal[] = [
  {
    "signal_id": "SG_007656",
    "signal_date": "2026-10-17",
    "probability": 99.9,
    "raw_probability": 0.99936,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 816,
    "tx_24h": 25,
    "min_amount": -2.89,
    "max_amount": 2.61,
    "turnover": -236.82,
    "burst_15m_count": 66,
    "cash_sum": 27.94,
    "pass_through_ratio": 1.22,
    "explanation": "Signal 2026-10-17 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 25 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 1.22) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_014953",
    "signal_date": "2025-08-18",
    "probability": 99.9,
    "raw_probability": 0.99926,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 470,
    "tx_24h": 39,
    "min_amount": -2.89,
    "max_amount": 0.91,
    "turnover": -548.54,
    "burst_15m_count": 52,
    "cash_sum": -22.96,
    "pass_through_ratio": 0.73,
    "explanation": "Signal 2025-08-18 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 39 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.73) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_000290",
    "signal_date": "2025-09-26",
    "probability": 99.9,
    "raw_probability": 0.99921,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 637,
    "tx_24h": 124,
    "min_amount": -2.89,
    "max_amount": 1.59,
    "turnover": -657.18,
    "burst_15m_count": 137,
    "cash_sum": -15.99,
    "pass_through_ratio": 0.7,
    "explanation": "Signal 2025-09-26 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 124 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.70) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_009226",
    "signal_date": "2025-05-24",
    "probability": 99.9,
    "raw_probability": 0.99908,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 645,
    "tx_24h": 84,
    "min_amount": -2.89,
    "max_amount": 1.11,
    "turnover": -900.67,
    "burst_15m_count": 100,
    "cash_sum": -29.69,
    "pass_through_ratio": 0.86,
    "explanation": "Signal 2025-05-24 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 84 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.86) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_000187",
    "signal_date": "2026-07-01",
    "probability": 99.9,
    "raw_probability": 0.99898,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 242,
    "tx_24h": 44,
    "min_amount": -2.88,
    "max_amount": 3.21,
    "turnover": 149.16,
    "burst_15m_count": 45,
    "cash_sum": 61.19,
    "pass_through_ratio": 0.04,
    "explanation": "Signal 2026-07-01 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 44 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.04) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_008534",
    "signal_date": "2025-10-15",
    "probability": 99.8,
    "raw_probability": 0.99809,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1541,
    "tx_24h": 128,
    "min_amount": -2.89,
    "max_amount": 2.41,
    "turnover": -988.26,
    "burst_15m_count": 240,
    "cash_sum": 26.73,
    "pass_through_ratio": 0.59,
    "explanation": "Signal 2025-10-15 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 128 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.59) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_006982",
    "signal_date": "2026-12-23",
    "probability": 99.8,
    "raw_probability": 0.99804,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 490,
    "tx_24h": 25,
    "min_amount": -2.89,
    "max_amount": 1.92,
    "turnover": -545.34,
    "burst_15m_count": 32,
    "cash_sum": -17.14,
    "pass_through_ratio": 0.61,
    "explanation": "Signal 2026-12-23 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 25 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.61) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_010153",
    "signal_date": "2026-12-29",
    "probability": 99.8,
    "raw_probability": 0.99752,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 621,
    "tx_24h": 23,
    "min_amount": -2.88,
    "max_amount": 2.34,
    "turnover": -505.83,
    "burst_15m_count": 49,
    "cash_sum": -0.21,
    "pass_through_ratio": 0.82,
    "explanation": "Signal 2026-12-29 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 23 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.82) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_004404",
    "signal_date": "2025-07-25",
    "probability": 99.7,
    "raw_probability": 0.99746,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 384,
    "tx_24h": 4,
    "min_amount": -2.89,
    "max_amount": 2.45,
    "turnover": -224.37,
    "burst_15m_count": 9,
    "cash_sum": 19.12,
    "pass_through_ratio": 0.53,
    "explanation": "Signal 2025-07-25 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 4 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.53) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005350",
    "signal_date": "2026-10-27",
    "probability": 99.7,
    "raw_probability": 0.99736,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 525,
    "tx_24h": 67,
    "min_amount": -2.89,
    "max_amount": 1.58,
    "turnover": -603.53,
    "burst_15m_count": 75,
    "cash_sum": -13.36,
    "pass_through_ratio": 0.68,
    "explanation": "Signal 2026-10-27 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 67 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.68) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_000218",
    "signal_date": "2026-12-10",
    "probability": 99.7,
    "raw_probability": 0.99725,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 548,
    "tx_24h": 19,
    "min_amount": -2.89,
    "max_amount": 2.82,
    "turnover": -311.46,
    "burst_15m_count": 32,
    "cash_sum": 24.26,
    "pass_through_ratio": 0.61,
    "explanation": "Signal 2026-12-10 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 19 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.61) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_018124",
    "signal_date": "2026-04-01",
    "probability": 99.7,
    "raw_probability": 0.99677,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 579,
    "tx_24h": 32,
    "min_amount": -2.88,
    "max_amount": 1.94,
    "turnover": -646.37,
    "burst_15m_count": 46,
    "cash_sum": -12.66,
    "pass_through_ratio": 0.6,
    "explanation": "Signal 2026-04-01 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 32 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.60) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_014311",
    "signal_date": "2025-01-23",
    "probability": 99.7,
    "raw_probability": 0.99651,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 641,
    "tx_24h": 42,
    "min_amount": -2.88,
    "max_amount": 2.12,
    "turnover": -239.77,
    "burst_15m_count": 54,
    "cash_sum": 31.75,
    "pass_through_ratio": 0.69,
    "explanation": "Signal 2025-01-23 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 42 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.69) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_000205",
    "signal_date": "2026-06-16",
    "probability": 99.6,
    "raw_probability": 0.99628,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 313,
    "tx_24h": 10,
    "min_amount": -2.89,
    "max_amount": 1.95,
    "turnover": -284.39,
    "burst_15m_count": 17,
    "cash_sum": 2.47,
    "pass_through_ratio": 0.55,
    "explanation": "Signal 2026-06-16 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 10 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.55) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_001126",
    "signal_date": "2026-05-17",
    "probability": 99.6,
    "raw_probability": 0.99577,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 1003,
    "tx_24h": 97,
    "min_amount": -2.89,
    "max_amount": 2.05,
    "turnover": -451.87,
    "burst_15m_count": 139,
    "cash_sum": 30.26,
    "pass_through_ratio": 0.87,
    "explanation": "Signal 2026-05-17 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 97 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.87) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005579",
    "signal_date": "2026-03-06",
    "probability": 99.6,
    "raw_probability": 0.99552,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1006,
    "tx_24h": 73,
    "min_amount": -2.88,
    "max_amount": 2.68,
    "turnover": -309.56,
    "burst_15m_count": 139,
    "cash_sum": 41.28,
    "pass_through_ratio": 0.74,
    "explanation": "Signal 2026-03-06 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 73 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.74) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_000788",
    "signal_date": "2026-11-26",
    "probability": 99.5,
    "raw_probability": 0.99542,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 577,
    "tx_24h": 39,
    "min_amount": -2.89,
    "max_amount": 2.64,
    "turnover": -178.08,
    "burst_15m_count": 62,
    "cash_sum": 28.07,
    "pass_through_ratio": 0.81,
    "explanation": "Signal 2026-11-26 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 39 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.81) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016054",
    "signal_date": "2025-11-15",
    "probability": 99.5,
    "raw_probability": 0.99491,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger"
    ],
    "tx_count": 406,
    "tx_24h": 39,
    "min_amount": -2.89,
    "max_amount": 1.85,
    "turnover": -530.58,
    "burst_15m_count": 48,
    "cash_sum": 0.98,
    "pass_through_ratio": 0.16,
    "explanation": "Signal 2025-11-15 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 39 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.16) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_012186",
    "signal_date": "2026-07-08",
    "probability": 99.5,
    "raw_probability": 0.99457,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 1144,
    "tx_24h": 108,
    "min_amount": -2.89,
    "max_amount": 2.02,
    "turnover": -623.1,
    "burst_15m_count": 163,
    "cash_sum": 22.68,
    "pass_through_ratio": 0.82,
    "explanation": "Signal 2026-07-08 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 108 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.82) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_006266",
    "signal_date": "2026-03-11",
    "probability": 99.4,
    "raw_probability": 0.9942,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 647,
    "tx_24h": 89,
    "min_amount": -2.89,
    "max_amount": 1.35,
    "turnover": -615.62,
    "burst_15m_count": 107,
    "cash_sum": -13.61,
    "pass_through_ratio": 0.8,
    "explanation": "Signal 2026-03-11 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 89 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.80) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_002185",
    "signal_date": "2026-04-15",
    "probability": 99.4,
    "raw_probability": 0.99417,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 735,
    "tx_24h": 6,
    "min_amount": -2.88,
    "max_amount": 1.88,
    "turnover": -695.87,
    "burst_15m_count": 41,
    "cash_sum": 1.19,
    "pass_through_ratio": 0.37,
    "explanation": "Signal 2026-04-15 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 6 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.37) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_008867",
    "signal_date": "2026-01-10",
    "probability": 99.4,
    "raw_probability": 0.99416,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 643,
    "tx_24h": 38,
    "min_amount": -2.89,
    "max_amount": 1.05,
    "turnover": -791.48,
    "burst_15m_count": 61,
    "cash_sum": -24.12,
    "pass_through_ratio": 0.73,
    "explanation": "Signal 2026-01-10 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 38 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.73) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_001143",
    "signal_date": "2025-07-25",
    "probability": 99.4,
    "raw_probability": 0.99411,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 486,
    "tx_24h": 36,
    "min_amount": -2.64,
    "max_amount": 0.68,
    "turnover": -597.77,
    "burst_15m_count": 46,
    "cash_sum": -4.89,
    "pass_through_ratio": 0.46,
    "explanation": "Signal 2025-07-25 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 36 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.64 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.46) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_019485",
    "signal_date": "2026-02-23",
    "probability": 99.4,
    "raw_probability": 0.99388,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 598,
    "tx_24h": 18,
    "min_amount": -2.89,
    "max_amount": 1.58,
    "turnover": -486.42,
    "burst_15m_count": 47,
    "cash_sum": 3.42,
    "pass_through_ratio": 0.79,
    "explanation": "Signal 2026-02-23 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 18 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.79) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_018895",
    "signal_date": "2025-08-20",
    "probability": 99.4,
    "raw_probability": 0.99359,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 708,
    "tx_24h": 145,
    "min_amount": -2.89,
    "max_amount": 3.56,
    "turnover": -193.17,
    "burst_15m_count": 152,
    "cash_sum": 64.23,
    "pass_through_ratio": 0.99,
    "explanation": "Signal 2025-08-20 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 145 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.99) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_014394",
    "signal_date": "2026-05-07",
    "probability": 99.3,
    "raw_probability": 0.99317,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 898,
    "tx_24h": 65,
    "min_amount": -2.89,
    "max_amount": 4.44,
    "turnover": 647.02,
    "burst_15m_count": 114,
    "cash_sum": 192.44,
    "pass_through_ratio": 0.01,
    "explanation": "Signal 2026-05-07 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 65 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.01) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_018215",
    "signal_date": "2026-04-24",
    "probability": 99.3,
    "raw_probability": 0.99295,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 442,
    "tx_24h": 22,
    "min_amount": -2.89,
    "max_amount": 3.39,
    "turnover": 53.7,
    "burst_15m_count": 34,
    "cash_sum": 46.7,
    "pass_through_ratio": 0.48,
    "explanation": "Signal 2026-04-24 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 22 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.48) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016008",
    "signal_date": "2026-06-01",
    "probability": 99.3,
    "raw_probability": 0.99282,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 688,
    "tx_24h": 48,
    "min_amount": -2.89,
    "max_amount": 1.54,
    "turnover": -879.85,
    "burst_15m_count": 75,
    "cash_sum": -11.91,
    "pass_through_ratio": 0.65,
    "explanation": "Signal 2026-06-01 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 48 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.65) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_002887",
    "signal_date": "2025-11-19",
    "probability": 99.3,
    "raw_probability": 0.99282,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 398,
    "tx_24h": 30,
    "min_amount": -2.88,
    "max_amount": 2.15,
    "turnover": -204.48,
    "burst_15m_count": 36,
    "cash_sum": 7.42,
    "pass_through_ratio": 0.82,
    "explanation": "Signal 2025-11-19 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 30 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.82) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005661",
    "signal_date": "2026-05-17",
    "probability": 99.3,
    "raw_probability": 0.99267,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1044,
    "tx_24h": 68,
    "min_amount": -2.63,
    "max_amount": 2.21,
    "turnover": -437.48,
    "burst_15m_count": 120,
    "cash_sum": 25.82,
    "pass_through_ratio": 0.67,
    "explanation": "Signal 2026-05-17 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 68 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.63 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.67) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_001181",
    "signal_date": "2025-10-13",
    "probability": 99.3,
    "raw_probability": 0.9926,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1233,
    "tx_24h": 101,
    "min_amount": -2.89,
    "max_amount": 1.45,
    "turnover": -1447.49,
    "burst_15m_count": 199,
    "cash_sum": -32.21,
    "pass_through_ratio": 0.93,
    "explanation": "Signal 2025-10-13 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 101 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.93) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005511",
    "signal_date": "2026-07-16",
    "probability": 99.3,
    "raw_probability": 0.99251,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 471,
    "tx_24h": 3,
    "min_amount": -2.88,
    "max_amount": 3.58,
    "turnover": 167.45,
    "burst_15m_count": 28,
    "cash_sum": 36.83,
    "pass_through_ratio": 0.42,
    "explanation": "Signal 2026-07-16 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 3 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.42) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_008989",
    "signal_date": "2025-10-13",
    "probability": 99.2,
    "raw_probability": 0.99242,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki"
    ],
    "tx_count": 885,
    "tx_24h": 47,
    "min_amount": -2.88,
    "max_amount": 2.27,
    "turnover": -396.3,
    "burst_15m_count": 96,
    "cash_sum": 31.92,
    "pass_through_ratio": 0.69,
    "explanation": "Signal 2025-10-13 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 47 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.69) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_017703",
    "signal_date": "2026-04-10",
    "probability": 99.2,
    "raw_probability": 0.99241,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 570,
    "tx_24h": 9,
    "min_amount": -2.89,
    "max_amount": 3.65,
    "turnover": 59.53,
    "burst_15m_count": 33,
    "cash_sum": 43.69,
    "pass_through_ratio": 0.53,
    "explanation": "Signal 2026-04-10 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 9 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.53) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_014343",
    "signal_date": "2026-02-20",
    "probability": 99.2,
    "raw_probability": 0.99228,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 557,
    "tx_24h": 51,
    "min_amount": -2.88,
    "max_amount": 1.17,
    "turnover": -560.97,
    "burst_15m_count": 70,
    "cash_sum": -5.78,
    "pass_through_ratio": 0.4,
    "explanation": "Signal 2026-02-20 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 51 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.40) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_010253",
    "signal_date": "2026-02-11",
    "probability": 99.2,
    "raw_probability": 0.99206,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 741,
    "tx_24h": 58,
    "min_amount": -2.89,
    "max_amount": 2.3,
    "turnover": -581.34,
    "burst_15m_count": 86,
    "cash_sum": 4.1,
    "pass_through_ratio": 0.77,
    "explanation": "Signal 2026-02-11 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 58 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.77) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_012648",
    "signal_date": "2026-01-01",
    "probability": 99.2,
    "raw_probability": 0.99199,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 675,
    "tx_24h": 37,
    "min_amount": -2.88,
    "max_amount": 3.66,
    "turnover": -291.7,
    "burst_15m_count": 72,
    "cash_sum": 39.27,
    "pass_through_ratio": 0.78,
    "explanation": "Signal 2026-01-01 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 37 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.78) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_012312",
    "signal_date": "2025-10-31",
    "probability": 99.2,
    "raw_probability": 0.99176,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 500,
    "tx_24h": 65,
    "min_amount": -2.88,
    "max_amount": 2.23,
    "turnover": -632.5,
    "burst_15m_count": 72,
    "cash_sum": -21.89,
    "pass_through_ratio": 0.63,
    "explanation": "Signal 2025-10-31 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 65 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.63) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_015068",
    "signal_date": "2025-10-13",
    "probability": 99.2,
    "raw_probability": 0.99168,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1071,
    "tx_24h": 97,
    "min_amount": -2.89,
    "max_amount": 1.86,
    "turnover": -1378.45,
    "burst_15m_count": 149,
    "cash_sum": -35.01,
    "pass_through_ratio": 0.55,
    "explanation": "Signal 2025-10-13 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 97 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.55) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_015662",
    "signal_date": "2026-10-23",
    "probability": 99.2,
    "raw_probability": 0.99157,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 435,
    "tx_24h": 40,
    "min_amount": -2.88,
    "max_amount": 2.49,
    "turnover": -191.86,
    "burst_15m_count": 46,
    "cash_sum": -0.3,
    "pass_through_ratio": 0.88,
    "explanation": "Signal 2026-10-23 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 40 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.88) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_003453",
    "signal_date": "2025-07-17",
    "probability": 99.1,
    "raw_probability": 0.99147,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki"
    ],
    "tx_count": 377,
    "tx_24h": 51,
    "min_amount": -2.88,
    "max_amount": 1.5,
    "turnover": -311.16,
    "burst_15m_count": 57,
    "cash_sum": 14.51,
    "pass_through_ratio": 0.72,
    "explanation": "Signal 2025-07-17 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 51 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.72) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_007808",
    "signal_date": "2025-01-08",
    "probability": 99.1,
    "raw_probability": 0.9914,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 764,
    "tx_24h": 68,
    "min_amount": -2.45,
    "max_amount": 2.42,
    "turnover": 53.55,
    "burst_15m_count": 95,
    "cash_sum": 31.74,
    "pass_through_ratio": 0.06,
    "explanation": "Signal 2025-01-08 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 68 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.45 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.06) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016252",
    "signal_date": "2026-08-07",
    "probability": 99.1,
    "raw_probability": 0.99131,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 647,
    "tx_24h": 18,
    "min_amount": -2.89,
    "max_amount": 3.43,
    "turnover": -182.99,
    "burst_15m_count": 40,
    "cash_sum": 17.4,
    "pass_through_ratio": 1.06,
    "explanation": "Signal 2026-08-07 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 18 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 1.06) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_018710",
    "signal_date": "2026-12-15",
    "probability": 99.1,
    "raw_probability": 0.99128,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1237,
    "tx_24h": 0,
    "min_amount": -2.86,
    "max_amount": 2.55,
    "turnover": -598.56,
    "burst_15m_count": 181,
    "cash_sum": 25.96,
    "pass_through_ratio": 0.65,
    "explanation": "Signal 2026-12-15 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 0 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.86 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.65) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_017438",
    "signal_date": "2025-08-26",
    "probability": 99.1,
    "raw_probability": 0.99109,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 664,
    "tx_24h": 104,
    "min_amount": -2.89,
    "max_amount": 2.19,
    "turnover": -434.26,
    "burst_15m_count": 112,
    "cash_sum": 11.46,
    "pass_through_ratio": 0.77,
    "explanation": "Signal 2025-08-26 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 104 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.77) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_006225",
    "signal_date": "2025-10-05",
    "probability": 99.1,
    "raw_probability": 0.99099,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 943,
    "tx_24h": 40,
    "min_amount": -2.89,
    "max_amount": 1.39,
    "turnover": -1001.48,
    "burst_15m_count": 89,
    "cash_sum": -23.49,
    "pass_through_ratio": 0.29,
    "explanation": "Signal 2025-10-05 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 40 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.29) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_010615",
    "signal_date": "2025-10-07",
    "probability": 99.0,
    "raw_probability": 0.99045,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1364,
    "tx_24h": 177,
    "min_amount": -2.89,
    "max_amount": 1.34,
    "turnover": -1400.95,
    "burst_15m_count": 256,
    "cash_sum": -16.19,
    "pass_through_ratio": 0.7,
    "explanation": "Signal 2025-10-07 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 177 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.70) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_010352",
    "signal_date": "2025-12-20",
    "probability": 99.0,
    "raw_probability": 0.99039,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 345,
    "tx_24h": 28,
    "min_amount": -2.89,
    "max_amount": 1.05,
    "turnover": -445.44,
    "burst_15m_count": 32,
    "cash_sum": -10.62,
    "pass_through_ratio": 0.47,
    "explanation": "Signal 2025-12-20 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 28 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.47) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_011139",
    "signal_date": "2026-06-22",
    "probability": 99.0,
    "raw_probability": 0.99031,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 433,
    "tx_24h": 8,
    "min_amount": -2.89,
    "max_amount": 1.17,
    "turnover": -537.35,
    "burst_15m_count": 23,
    "cash_sum": -9.38,
    "pass_through_ratio": 0.76,
    "explanation": "Signal 2026-06-22 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 8 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.76) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_019642",
    "signal_date": "2025-11-15",
    "probability": 99.0,
    "raw_probability": 0.99021,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 747,
    "tx_24h": 100,
    "min_amount": -2.89,
    "max_amount": 2.48,
    "turnover": -174.49,
    "burst_15m_count": 122,
    "cash_sum": 18.29,
    "pass_through_ratio": 1.43,
    "explanation": "Signal 2025-11-15 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 100 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 1.43) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_012192",
    "signal_date": "2026-09-14",
    "probability": 99.0,
    "raw_probability": 0.9901,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 621,
    "tx_24h": 17,
    "min_amount": -2.89,
    "max_amount": 3.2,
    "turnover": -236.0,
    "burst_15m_count": 32,
    "cash_sum": 28.8,
    "pass_through_ratio": 0.37,
    "explanation": "Signal 2026-09-14 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 17 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.37) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_014321",
    "signal_date": "2025-04-30",
    "probability": 99.0,
    "raw_probability": 0.98991,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki"
    ],
    "tx_count": 972,
    "tx_24h": 61,
    "min_amount": -2.89,
    "max_amount": 0.9,
    "turnover": -1108.49,
    "burst_15m_count": 115,
    "cash_sum": -1.12,
    "pass_through_ratio": 0.42,
    "explanation": "Signal 2025-04-30 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 61 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.42) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005991",
    "signal_date": "2025-05-10",
    "probability": 98.9,
    "raw_probability": 0.98936,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1113,
    "tx_24h": 104,
    "min_amount": -2.88,
    "max_amount": 2.23,
    "turnover": -503.4,
    "burst_15m_count": 170,
    "cash_sum": 28.53,
    "pass_through_ratio": 0.8,
    "explanation": "Signal 2025-05-10 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 104 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.88 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.80) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_018670",
    "signal_date": "2025-04-09",
    "probability": 98.9,
    "raw_probability": 0.98882,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 778,
    "tx_24h": 50,
    "min_amount": -2.89,
    "max_amount": 2.45,
    "turnover": -628.2,
    "burst_15m_count": 85,
    "cash_sum": 3.12,
    "pass_through_ratio": 0.63,
    "explanation": "Signal 2025-04-09 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 50 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.63) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016179",
    "signal_date": "2025-04-21",
    "probability": 98.9,
    "raw_probability": 0.98873,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 682,
    "tx_24h": 10,
    "min_amount": -2.78,
    "max_amount": 3.4,
    "turnover": -154.87,
    "burst_15m_count": 41,
    "cash_sum": 29.36,
    "pass_through_ratio": 0.81,
    "explanation": "Signal 2025-04-21 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 10 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.78 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.81) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_001698",
    "signal_date": "2026-03-05",
    "probability": 98.9,
    "raw_probability": 0.98863,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 375,
    "tx_24h": 29,
    "min_amount": -1.65,
    "max_amount": 3.22,
    "turnover": 140.81,
    "burst_15m_count": 34,
    "cash_sum": 33.99,
    "pass_through_ratio": 0.04,
    "explanation": "Signal 2026-03-05 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 29 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-1.65 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.04) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_017834",
    "signal_date": "2026-06-20",
    "probability": 98.8,
    "raw_probability": 0.98839,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 568,
    "tx_24h": 22,
    "min_amount": -2.89,
    "max_amount": 3.19,
    "turnover": -92.51,
    "burst_15m_count": 42,
    "cash_sum": 22.5,
    "pass_through_ratio": 1.78,
    "explanation": "Signal 2026-06-20 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 22 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 1.78) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_011612",
    "signal_date": "2025-11-12",
    "probability": 98.8,
    "raw_probability": 0.9883,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger"
    ],
    "tx_count": 1299,
    "tx_24h": 27,
    "min_amount": -2.89,
    "max_amount": 2.91,
    "turnover": 93.62,
    "burst_15m_count": 146,
    "cash_sum": 65.48,
    "pass_through_ratio": 2.13,
    "explanation": "Signal 2025-11-12 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 27 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 2.13) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_013080",
    "signal_date": "2026-03-01",
    "probability": 98.8,
    "raw_probability": 0.98821,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 831,
    "tx_24h": 80,
    "min_amount": -2.89,
    "max_amount": 2.23,
    "turnover": -545.58,
    "burst_15m_count": 121,
    "cash_sum": 10.37,
    "pass_through_ratio": 0.88,
    "explanation": "Signal 2026-03-01 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 80 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.88) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_011208",
    "signal_date": "2025-08-06",
    "probability": 98.8,
    "raw_probability": 0.98771,
    "tier": "Kritik Xavf",
    "severity": "critical",
    "recommended_action": "ESKALATSIYA (Markaziy Bank)",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 524,
    "tx_24h": 34,
    "min_amount": -2.89,
    "max_amount": 1.13,
    "turnover": -613.11,
    "burst_15m_count": 57,
    "cash_sum": -21.79,
    "pass_through_ratio": 0.77,
    "explanation": "Signal 2025-08-06 sanasida generatsiya qilingan. Hisobda oxirgi 24 soatda 34 ta tranzaksiya amalga oshirilgan bo'lib, chuqur salbiy kassa oqimi (-2.89 min amount) va naqd yechib olish intensivligi aniqlangan. Tranzit pul aylanishi (Pass-through index: 0.77) juda yuqori.",
    "status": "pending"
  },
  {
    "signal_id": "SG_001844",
    "signal_date": "2026-06-12",
    "probability": 70.0,
    "raw_probability": 0.69983,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 944,
    "tx_24h": 25,
    "min_amount": -2.79,
    "max_amount": 2.55,
    "turnover": -539.6,
    "burst_15m_count": 75,
    "cash_sum": 7.51,
    "pass_through_ratio": 0.87,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (34 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005692",
    "signal_date": "2025-10-10",
    "probability": 70.0,
    "raw_probability": 0.69982,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 691,
    "tx_24h": 27,
    "min_amount": -2.19,
    "max_amount": 2.75,
    "turnover": -3.92,
    "burst_15m_count": 48,
    "cash_sum": 28.58,
    "pass_through_ratio": 16.15,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (33 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_014223",
    "signal_date": "2025-09-08",
    "probability": 69.9,
    "raw_probability": 0.69946,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Chiqim Trigger",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 150,
    "tx_24h": 17,
    "min_amount": -2.05,
    "max_amount": 1.76,
    "turnover": -24.61,
    "burst_15m_count": 15,
    "cash_sum": 12.9,
    "pass_through_ratio": 0.86,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (20 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_018529",
    "signal_date": "2025-07-22",
    "probability": 69.9,
    "raw_probability": 0.69924,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 381,
    "tx_24h": 45,
    "min_amount": -2.83,
    "max_amount": 3.07,
    "turnover": 43.63,
    "burst_15m_count": 46,
    "cash_sum": 27.32,
    "pass_through_ratio": 1.98,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (50 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_018366",
    "signal_date": "2026-03-06",
    "probability": 69.9,
    "raw_probability": 0.69917,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki"
    ],
    "tx_count": 407,
    "tx_24h": 49,
    "min_amount": -2.76,
    "max_amount": 3.44,
    "turnover": 52.91,
    "burst_15m_count": 56,
    "cash_sum": 20.28,
    "pass_through_ratio": 0.3,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (50 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_004451",
    "signal_date": "2026-03-20",
    "probability": 69.9,
    "raw_probability": 0.69901,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 622,
    "tx_24h": 38,
    "min_amount": -2.53,
    "max_amount": 2.95,
    "turnover": 109.76,
    "burst_15m_count": 58,
    "cash_sum": 22.58,
    "pass_through_ratio": 0.16,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (42 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_000488",
    "signal_date": "2026-10-15",
    "probability": 69.9,
    "raw_probability": 0.69899,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 871,
    "tx_24h": 47,
    "min_amount": -2.26,
    "max_amount": 2.3,
    "turnover": -508.64,
    "burst_15m_count": 84,
    "cash_sum": 4.06,
    "pass_through_ratio": 0.83,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (55 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016941",
    "signal_date": "2025-07-01",
    "probability": 69.9,
    "raw_probability": 0.69892,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 1193,
    "tx_24h": 63,
    "min_amount": -1.74,
    "max_amount": 2.95,
    "turnover": -343.04,
    "burst_15m_count": 141,
    "cash_sum": 16.62,
    "pass_through_ratio": 1.19,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (74 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_010889",
    "signal_date": "2025-11-20",
    "probability": 69.9,
    "raw_probability": 0.69884,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 289,
    "tx_24h": 28,
    "min_amount": -2.08,
    "max_amount": 2.3,
    "turnover": -101.13,
    "burst_15m_count": 32,
    "cash_sum": 7.14,
    "pass_through_ratio": 0.95,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (32 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_019868",
    "signal_date": "2026-11-04",
    "probability": 69.9,
    "raw_probability": 0.69869,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1136,
    "tx_24h": 55,
    "min_amount": -2.15,
    "max_amount": 2.21,
    "turnover": -537.94,
    "burst_15m_count": 137,
    "cash_sum": 7.7,
    "pass_through_ratio": 0.7,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (71 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016316",
    "signal_date": "2026-01-30",
    "probability": 69.8,
    "raw_probability": 0.69807,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 676,
    "tx_24h": 60,
    "min_amount": -2.66,
    "max_amount": 1.9,
    "turnover": -201.18,
    "burst_15m_count": 88,
    "cash_sum": 13.11,
    "pass_through_ratio": 0.99,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (67 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_013072",
    "signal_date": "2025-09-10",
    "probability": 69.8,
    "raw_probability": 0.69803,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1007,
    "tx_24h": 170,
    "min_amount": -2.33,
    "max_amount": 3.84,
    "turnover": 540.0,
    "burst_15m_count": 203,
    "cash_sum": 113.84,
    "pass_through_ratio": 0.09,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (185 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005228",
    "signal_date": "2026-11-30",
    "probability": 69.8,
    "raw_probability": 0.69795,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 775,
    "tx_24h": 16,
    "min_amount": -2.58,
    "max_amount": 3.29,
    "turnover": -397.2,
    "burst_15m_count": 57,
    "cash_sum": 12.52,
    "pass_through_ratio": 1.0,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (18 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_001570",
    "signal_date": "2026-07-02",
    "probability": 69.8,
    "raw_probability": 0.69782,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 218,
    "tx_24h": 29,
    "min_amount": -2.82,
    "max_amount": 2.65,
    "turnover": -93.84,
    "burst_15m_count": 28,
    "cash_sum": 4.46,
    "pass_through_ratio": 0.8,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (37 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016060",
    "signal_date": "2025-06-02",
    "probability": 69.8,
    "raw_probability": 0.69772,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 150,
    "tx_24h": 9,
    "min_amount": -2.83,
    "max_amount": 1.93,
    "turnover": -99.28,
    "burst_15m_count": 8,
    "cash_sum": 0.39,
    "pass_through_ratio": 0.48,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (10 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_000153",
    "signal_date": "2026-10-28",
    "probability": 69.8,
    "raw_probability": 0.6975,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 1124,
    "tx_24h": 82,
    "min_amount": -1.78,
    "max_amount": 2.2,
    "turnover": -607.74,
    "burst_15m_count": 137,
    "cash_sum": 10.11,
    "pass_through_ratio": 0.9,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (102 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016181",
    "signal_date": "2025-04-25",
    "probability": 69.7,
    "raw_probability": 0.69733,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki"
    ],
    "tx_count": 403,
    "tx_24h": 44,
    "min_amount": -2.81,
    "max_amount": 3.41,
    "turnover": -134.59,
    "burst_15m_count": 47,
    "cash_sum": 5.58,
    "pass_through_ratio": 0.58,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (53 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_001505",
    "signal_date": "2026-02-23",
    "probability": 69.7,
    "raw_probability": 0.6967,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 995,
    "tx_24h": 69,
    "min_amount": -2.57,
    "max_amount": 3.67,
    "turnover": -169.43,
    "burst_15m_count": 113,
    "cash_sum": 34.74,
    "pass_through_ratio": 1.65,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (83 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_004873",
    "signal_date": "2026-04-01",
    "probability": 69.7,
    "raw_probability": 0.69668,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 107,
    "tx_24h": 5,
    "min_amount": -2.3,
    "max_amount": 2.42,
    "turnover": -28.33,
    "burst_15m_count": 5,
    "cash_sum": 3.33,
    "pass_through_ratio": 0.1,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (6 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005148",
    "signal_date": "2025-06-08",
    "probability": 69.7,
    "raw_probability": 0.69652,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 358,
    "tx_24h": 64,
    "min_amount": -2.21,
    "max_amount": 3.02,
    "turnover": -2.63,
    "burst_15m_count": 68,
    "cash_sum": 18.79,
    "pass_through_ratio": 23.92,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (72 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_002985",
    "signal_date": "2025-02-21",
    "probability": 69.6,
    "raw_probability": 0.69625,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1859,
    "tx_24h": 86,
    "min_amount": -1.97,
    "max_amount": 2.99,
    "turnover": 50.17,
    "burst_15m_count": 266,
    "cash_sum": 69.05,
    "pass_through_ratio": 0.76,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (108 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_015326",
    "signal_date": "2025-05-13",
    "probability": 69.6,
    "raw_probability": 0.69613,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 235,
    "tx_24h": 13,
    "min_amount": -2.84,
    "max_amount": 2.08,
    "turnover": -77.29,
    "burst_15m_count": 15,
    "cash_sum": 6.8,
    "pass_through_ratio": 1.11,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (16 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_007114",
    "signal_date": "2025-05-17",
    "probability": 69.6,
    "raw_probability": 0.69612,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish"
    ],
    "tx_count": 203,
    "tx_24h": 8,
    "min_amount": -1.47,
    "max_amount": 3.24,
    "turnover": 88.34,
    "burst_15m_count": 12,
    "cash_sum": 25.08,
    "pass_through_ratio": 0.09,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (12 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_000890",
    "signal_date": "2026-01-17",
    "probability": 69.6,
    "raw_probability": 0.69589,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 210,
    "tx_24h": 12,
    "min_amount": -1.47,
    "max_amount": 2.66,
    "turnover": 33.2,
    "burst_15m_count": 13,
    "cash_sum": 14.18,
    "pass_through_ratio": 0.08,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (14 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_013544",
    "signal_date": "2026-06-06",
    "probability": 69.6,
    "raw_probability": 0.69572,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Chiqim Trigger",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 740,
    "tx_24h": 33,
    "min_amount": -2.31,
    "max_amount": 1.26,
    "turnover": -628.78,
    "burst_15m_count": 63,
    "cash_sum": -3.1,
    "pass_through_ratio": 0.81,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (42 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_012616",
    "signal_date": "2026-08-18",
    "probability": 69.6,
    "raw_probability": 0.69564,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 680,
    "tx_24h": 2,
    "min_amount": -2.0,
    "max_amount": 6.0,
    "turnover": 489.49,
    "burst_15m_count": 51,
    "cash_sum": 97.28,
    "pass_through_ratio": 0.46,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (3 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_015818",
    "signal_date": "2025-09-18",
    "probability": 69.5,
    "raw_probability": 0.69549,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 501,
    "tx_24h": 10,
    "min_amount": -2.78,
    "max_amount": 2.87,
    "turnover": -215.0,
    "burst_15m_count": 27,
    "cash_sum": 6.8,
    "pass_through_ratio": 0.62,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (16 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_018282",
    "signal_date": "2025-11-20",
    "probability": 69.5,
    "raw_probability": 0.69535,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 397,
    "tx_24h": 51,
    "min_amount": -2.88,
    "max_amount": 3.43,
    "turnover": -17.32,
    "burst_15m_count": 54,
    "cash_sum": 11.19,
    "pass_through_ratio": 6.48,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (55 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_007553",
    "signal_date": "2026-05-06",
    "probability": 69.5,
    "raw_probability": 0.6952,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 958,
    "tx_24h": 81,
    "min_amount": -2.08,
    "max_amount": 2.74,
    "turnover": 28.51,
    "burst_15m_count": 125,
    "cash_sum": 18.11,
    "pass_through_ratio": 3.18,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (97 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_006189",
    "signal_date": "2025-08-12",
    "probability": 69.5,
    "raw_probability": 0.69515,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 256,
    "tx_24h": 25,
    "min_amount": -1.93,
    "max_amount": 1.58,
    "turnover": -54.61,
    "burst_15m_count": 28,
    "cash_sum": 6.53,
    "pass_through_ratio": 0.71,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (27 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_013773",
    "signal_date": "2026-03-23",
    "probability": 69.5,
    "raw_probability": 0.69514,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger"
    ],
    "tx_count": 130,
    "tx_24h": 8,
    "min_amount": -2.53,
    "max_amount": 1.36,
    "turnover": -89.02,
    "burst_15m_count": 8,
    "cash_sum": 1.29,
    "pass_through_ratio": 0.66,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (8 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_013337",
    "signal_date": "2026-02-11",
    "probability": 69.4,
    "raw_probability": 0.69437,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 639,
    "tx_24h": 1,
    "min_amount": -2.35,
    "max_amount": 3.36,
    "turnover": -17.74,
    "burst_15m_count": 32,
    "cash_sum": 12.15,
    "pass_through_ratio": 5.82,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (1 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005905",
    "signal_date": "2026-09-17",
    "probability": 69.4,
    "raw_probability": 0.69405,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 326,
    "tx_24h": 22,
    "min_amount": -2.87,
    "max_amount": 1.89,
    "turnover": -228.32,
    "burst_15m_count": 28,
    "cash_sum": -0.5,
    "pass_through_ratio": 0.86,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (25 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_013438",
    "signal_date": "2025-01-09",
    "probability": 69.4,
    "raw_probability": 0.69398,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 554,
    "tx_24h": 85,
    "min_amount": -1.27,
    "max_amount": 3.5,
    "turnover": 410.71,
    "burst_15m_count": 98,
    "cash_sum": 53.24,
    "pass_through_ratio": 0.24,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (96 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016431",
    "signal_date": "2025-11-07",
    "probability": 69.4,
    "raw_probability": 0.69388,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 316,
    "tx_24h": 25,
    "min_amount": -1.82,
    "max_amount": 1.5,
    "turnover": -131.33,
    "burst_15m_count": 28,
    "cash_sum": 3.86,
    "pass_through_ratio": 0.98,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (27 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_014887",
    "signal_date": "2026-04-13",
    "probability": 69.4,
    "raw_probability": 0.69374,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 238,
    "tx_24h": 23,
    "min_amount": -2.58,
    "max_amount": 3.58,
    "turnover": -20.52,
    "burst_15m_count": 26,
    "cash_sum": 18.3,
    "pass_through_ratio": 1.26,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (23 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_008422",
    "signal_date": "2026-02-18",
    "probability": 69.4,
    "raw_probability": 0.6936,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 330,
    "tx_24h": 16,
    "min_amount": -2.3,
    "max_amount": 5.09,
    "turnover": 70.77,
    "burst_15m_count": 17,
    "cash_sum": 24.22,
    "pass_through_ratio": 0.05,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (21 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_017239",
    "signal_date": "2026-02-17",
    "probability": 69.3,
    "raw_probability": 0.69317,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 526,
    "tx_24h": 53,
    "min_amount": -2.23,
    "max_amount": 2.35,
    "turnover": -144.74,
    "burst_15m_count": 64,
    "cash_sum": 15.1,
    "pass_through_ratio": 0.44,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (59 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016818",
    "signal_date": "2025-09-14",
    "probability": 69.3,
    "raw_probability": 0.69311,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 255,
    "tx_24h": 21,
    "min_amount": -2.11,
    "max_amount": 4.93,
    "turnover": 311.01,
    "burst_15m_count": 24,
    "cash_sum": 89.68,
    "pass_through_ratio": 0.12,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (25 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_007155",
    "signal_date": "2026-06-22",
    "probability": 69.3,
    "raw_probability": 0.69289,
    "tier": "O'rta Xavf",
    "severity": "warning",
    "recommended_action": "CHUQUR TEKSHIRUV",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Chiqim Trigger"
    ],
    "tx_count": 346,
    "tx_24h": 15,
    "min_amount": -2.2,
    "max_amount": 2.75,
    "turnover": 66.96,
    "burst_15m_count": 25,
    "cash_sum": 14.24,
    "pass_through_ratio": 0.18,
    "explanation": "Signal sanasiga yaqin oraliqda o'rtacha tranzaksiya hajmi oshgan (18 ta 7 kunlik amaliyot). Smurfing chegarasiga yaqin tezkor operatsiyalar kuzatilgan. Qo'shimcha to'lov asoslarini so'rash tavsiya etiladi.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005049",
    "signal_date": "2026-01-09",
    "probability": 35.0,
    "raw_probability": 0.34996,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 223,
    "tx_24h": 6,
    "min_amount": -1.88,
    "max_amount": 2.52,
    "turnover": -14.87,
    "burst_15m_count": 7,
    "cash_sum": 4.67,
    "pass_through_ratio": 1.03,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016520",
    "signal_date": "2026-04-25",
    "probability": 35.0,
    "raw_probability": 0.34976,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger"
    ],
    "tx_count": 381,
    "tx_24h": 40,
    "min_amount": -2.76,
    "max_amount": 3.32,
    "turnover": 48.37,
    "burst_15m_count": 45,
    "cash_sum": 15.53,
    "pass_through_ratio": 0.47,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_006880",
    "signal_date": "2025-11-18",
    "probability": 35.0,
    "raw_probability": 0.34967,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger"
    ],
    "tx_count": 515,
    "tx_24h": 79,
    "min_amount": -2.91,
    "max_amount": 4.38,
    "turnover": 181.01,
    "burst_15m_count": 84,
    "cash_sum": 69.83,
    "pass_through_ratio": 0.41,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_017368",
    "signal_date": "2025-08-12",
    "probability": 35.0,
    "raw_probability": 0.34958,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 356,
    "tx_24h": 25,
    "min_amount": -2.66,
    "max_amount": 3.31,
    "turnover": -28.12,
    "burst_15m_count": 29,
    "cash_sum": 8.91,
    "pass_through_ratio": 0.88,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_013604",
    "signal_date": "2025-11-02",
    "probability": 34.9,
    "raw_probability": 0.34896,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 270,
    "tx_24h": 41,
    "min_amount": -1.63,
    "max_amount": 2.82,
    "turnover": 70.51,
    "burst_15m_count": 41,
    "cash_sum": 14.82,
    "pass_through_ratio": 0.06,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_012684",
    "signal_date": "2025-11-15",
    "probability": 34.9,
    "raw_probability": 0.34887,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)"
    ],
    "tx_count": 96,
    "tx_24h": 11,
    "min_amount": -1.55,
    "max_amount": 3.12,
    "turnover": 47.51,
    "burst_15m_count": 11,
    "cash_sum": 2.5,
    "pass_through_ratio": 0.44,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_004668",
    "signal_date": "2026-12-02",
    "probability": 34.9,
    "raw_probability": 0.34883,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger"
    ],
    "tx_count": 1268,
    "tx_24h": 28,
    "min_amount": -2.67,
    "max_amount": 4.07,
    "turnover": 500.61,
    "burst_15m_count": 113,
    "cash_sum": 67.79,
    "pass_through_ratio": 0.26,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_001876",
    "signal_date": "2026-06-26",
    "probability": 34.9,
    "raw_probability": 0.34874,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 452,
    "tx_24h": 11,
    "min_amount": -2.18,
    "max_amount": 2.94,
    "turnover": -63.84,
    "burst_15m_count": 27,
    "cash_sum": 10.21,
    "pass_through_ratio": 1.67,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_003666",
    "signal_date": "2025-09-15",
    "probability": 34.9,
    "raw_probability": 0.34859,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 359,
    "tx_24h": 25,
    "min_amount": -2.53,
    "max_amount": 2.57,
    "turnover": -16.42,
    "burst_15m_count": 35,
    "cash_sum": 4.07,
    "pass_through_ratio": 3.62,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_019131",
    "signal_date": "2026-02-25",
    "probability": 34.8,
    "raw_probability": 0.34787,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)"
    ],
    "tx_count": 702,
    "tx_24h": 67,
    "min_amount": -2.1,
    "max_amount": 3.9,
    "turnover": 421.27,
    "burst_15m_count": 91,
    "cash_sum": 13.7,
    "pass_through_ratio": 0.09,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_013854",
    "signal_date": "2026-04-05",
    "probability": 34.8,
    "raw_probability": 0.34784,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 780,
    "tx_24h": 64,
    "min_amount": -2.91,
    "max_amount": 2.34,
    "turnover": -408.4,
    "burst_15m_count": 87,
    "cash_sum": 2.4,
    "pass_through_ratio": 0.59,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_009727",
    "signal_date": "2025-03-31",
    "probability": 34.7,
    "raw_probability": 0.34745,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Katta Naqd Yechish",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 1,
    "tx_24h": 1,
    "min_amount": -0.96,
    "max_amount": -0.96,
    "turnover": -0.96,
    "burst_15m_count": 0,
    "cash_sum": -0.96,
    "pass_through_ratio": 1.0,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_003940",
    "signal_date": "2025-11-23",
    "probability": 34.7,
    "raw_probability": 0.34745,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)"
    ],
    "tx_count": 191,
    "tx_24h": 25,
    "min_amount": -2.31,
    "max_amount": 3.57,
    "turnover": -40.15,
    "burst_15m_count": 24,
    "cash_sum": 5.98,
    "pass_through_ratio": 0.06,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_009932",
    "signal_date": "2026-08-29",
    "probability": 34.7,
    "raw_probability": 0.34724,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 445,
    "tx_24h": 26,
    "min_amount": -1.75,
    "max_amount": 2.54,
    "turnover": -22.96,
    "burst_15m_count": 39,
    "cash_sum": 19.14,
    "pass_through_ratio": 2.25,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_015214",
    "signal_date": "2025-07-17",
    "probability": 34.7,
    "raw_probability": 0.34711,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 552,
    "tx_24h": 43,
    "min_amount": -2.68,
    "max_amount": 3.86,
    "turnover": -176.78,
    "burst_15m_count": 59,
    "cash_sum": 0.83,
    "pass_through_ratio": 0.96,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_008586",
    "signal_date": "2025-06-25",
    "probability": 34.7,
    "raw_probability": 0.34708,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 372,
    "tx_24h": 38,
    "min_amount": -2.12,
    "max_amount": 3.44,
    "turnover": 72.2,
    "burst_15m_count": 42,
    "cash_sum": 20.16,
    "pass_through_ratio": 0.18,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_018503",
    "signal_date": "2025-03-21",
    "probability": 34.7,
    "raw_probability": 0.34691,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger"
    ],
    "tx_count": 367,
    "tx_24h": 62,
    "min_amount": -2.89,
    "max_amount": 5.79,
    "turnover": 207.64,
    "burst_15m_count": 68,
    "cash_sum": 0.26,
    "pass_through_ratio": 0.27,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016234",
    "signal_date": "2026-11-14",
    "probability": 34.7,
    "raw_probability": 0.34672,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger"
    ],
    "tx_count": 802,
    "tx_24h": 54,
    "min_amount": -2.55,
    "max_amount": 3.29,
    "turnover": 211.1,
    "burst_15m_count": 80,
    "cash_sum": 0.0,
    "pass_through_ratio": 0.07,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_015565",
    "signal_date": "2025-11-20",
    "probability": 34.7,
    "raw_probability": 0.34669,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 819,
    "tx_24h": 112,
    "min_amount": -2.9,
    "max_amount": 5.05,
    "turnover": 504.73,
    "burst_15m_count": 156,
    "cash_sum": 43.31,
    "pass_through_ratio": 0.09,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005606",
    "signal_date": "2025-08-08",
    "probability": 34.6,
    "raw_probability": 0.34639,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 308,
    "tx_24h": 24,
    "min_amount": -1.41,
    "max_amount": 2.2,
    "turnover": -22.35,
    "burst_15m_count": 30,
    "cash_sum": 7.0,
    "pass_through_ratio": 2.15,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_000826",
    "signal_date": "2026-05-20",
    "probability": 34.6,
    "raw_probability": 0.34625,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 922,
    "tx_24h": 40,
    "min_amount": -2.09,
    "max_amount": 3.48,
    "turnover": 237.43,
    "burst_15m_count": 109,
    "cash_sum": 54.46,
    "pass_through_ratio": 0.54,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_005174",
    "signal_date": "2025-08-28",
    "probability": 34.6,
    "raw_probability": 0.34618,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 806,
    "tx_24h": 34,
    "min_amount": -2.16,
    "max_amount": 4.05,
    "turnover": 712.46,
    "burst_15m_count": 65,
    "cash_sum": 49.36,
    "pass_through_ratio": 0.28,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_015036",
    "signal_date": "2025-10-28",
    "probability": 34.6,
    "raw_probability": 0.34607,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki"
    ],
    "tx_count": 444,
    "tx_24h": 42,
    "min_amount": -2.8,
    "max_amount": 2.6,
    "turnover": -101.48,
    "burst_15m_count": 49,
    "cash_sum": 1.74,
    "pass_through_ratio": 0.65,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_011519",
    "signal_date": "2026-09-14",
    "probability": 34.6,
    "raw_probability": 0.34604,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)"
    ],
    "tx_count": 301,
    "tx_24h": 16,
    "min_amount": -1.46,
    "max_amount": 3.81,
    "turnover": 155.84,
    "burst_15m_count": 26,
    "cash_sum": 8.51,
    "pass_through_ratio": 0.56,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_002322",
    "signal_date": "2025-09-18",
    "probability": 34.6,
    "raw_probability": 0.34603,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 1,
    "tx_24h": 0,
    "min_amount": -0.1,
    "max_amount": -0.1,
    "turnover": -0.1,
    "burst_15m_count": 0,
    "cash_sum": 0.0,
    "pass_through_ratio": 1.0,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_006283",
    "signal_date": "2025-08-05",
    "probability": 34.6,
    "raw_probability": 0.34584,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Chiqim Trigger",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 392,
    "tx_24h": 61,
    "min_amount": -2.13,
    "max_amount": 4.28,
    "turnover": 25.44,
    "burst_15m_count": 73,
    "cash_sum": 28.7,
    "pass_through_ratio": 1.1,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016810",
    "signal_date": "2026-07-17",
    "probability": 34.6,
    "raw_probability": 0.34584,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 628,
    "tx_24h": 26,
    "min_amount": -2.46,
    "max_amount": 4.13,
    "turnover": 167.98,
    "burst_15m_count": 52,
    "cash_sum": 31.21,
    "pass_through_ratio": 0.11,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_011464",
    "signal_date": "2026-11-07",
    "probability": 34.6,
    "raw_probability": 0.34582,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 585,
    "tx_24h": 26,
    "min_amount": -1.7,
    "max_amount": 3.45,
    "turnover": 237.62,
    "burst_15m_count": 43,
    "cash_sum": 25.15,
    "pass_through_ratio": 0.32,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_004171",
    "signal_date": "2026-09-11",
    "probability": 34.6,
    "raw_probability": 0.34566,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)"
    ],
    "tx_count": 257,
    "tx_24h": 23,
    "min_amount": -2.26,
    "max_amount": 3.02,
    "turnover": 201.84,
    "burst_15m_count": 21,
    "cash_sum": 29.99,
    "pass_through_ratio": 0.01,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_003856",
    "signal_date": "2025-05-03",
    "probability": 34.5,
    "raw_probability": 0.34507,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Chiqim Trigger"
    ],
    "tx_count": 481,
    "tx_24h": 50,
    "min_amount": -1.33,
    "max_amount": 3.59,
    "turnover": 386.05,
    "burst_15m_count": 59,
    "cash_sum": 3.42,
    "pass_through_ratio": 0.23,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_014398",
    "signal_date": "2025-08-19",
    "probability": 34.5,
    "raw_probability": 0.34493,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 45,
    "tx_24h": 4,
    "min_amount": -1.24,
    "max_amount": 3.87,
    "turnover": 41.19,
    "burst_15m_count": 3,
    "cash_sum": 2.44,
    "pass_through_ratio": 0.72,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_010435",
    "signal_date": "2025-07-14",
    "probability": 34.5,
    "raw_probability": 0.34491,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 475,
    "tx_24h": 23,
    "min_amount": -2.74,
    "max_amount": 2.84,
    "turnover": 0.06,
    "burst_15m_count": 46,
    "cash_sum": 11.37,
    "pass_through_ratio": 1471.97,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_016547",
    "signal_date": "2025-10-21",
    "probability": 34.5,
    "raw_probability": 0.34472,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 329,
    "tx_24h": 11,
    "min_amount": -1.27,
    "max_amount": 3.47,
    "turnover": 23.97,
    "burst_15m_count": 23,
    "cash_sum": 5.72,
    "pass_through_ratio": 1.36,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_006161",
    "signal_date": "2026-11-23",
    "probability": 34.5,
    "raw_probability": 0.34469,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 404,
    "tx_24h": 21,
    "min_amount": -2.46,
    "max_amount": 3.96,
    "turnover": -81.65,
    "burst_15m_count": 30,
    "cash_sum": 5.41,
    "pass_through_ratio": 1.32,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_002346",
    "signal_date": "2025-03-06",
    "probability": 34.4,
    "raw_probability": 0.34406,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 1193,
    "tx_24h": 43,
    "min_amount": -2.9,
    "max_amount": 3.1,
    "turnover": -728.22,
    "burst_15m_count": 134,
    "cash_sum": -15.53,
    "pass_through_ratio": 0.74,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_015272",
    "signal_date": "2025-05-18",
    "probability": 34.4,
    "raw_probability": 0.34397,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)"
    ],
    "tx_count": 408,
    "tx_24h": 32,
    "min_amount": -2.19,
    "max_amount": 3.49,
    "turnover": 84.37,
    "burst_15m_count": 34,
    "cash_sum": 19.68,
    "pass_through_ratio": 0.03,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_018818",
    "signal_date": "2026-03-01",
    "probability": 34.4,
    "raw_probability": 0.34391,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Katta Naqd Yechish"
    ],
    "tx_count": 353,
    "tx_24h": 31,
    "min_amount": -2.08,
    "max_amount": 3.32,
    "turnover": 45.42,
    "burst_15m_count": 33,
    "cash_sum": 18.92,
    "pass_through_ratio": 0.5,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_019985",
    "signal_date": "2026-05-15",
    "probability": 34.4,
    "raw_probability": 0.34383,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Chiqim Trigger",
      "Xalqaro O\u2018tkazma"
    ],
    "tx_count": 600,
    "tx_24h": 43,
    "min_amount": -2.91,
    "max_amount": 1.96,
    "turnover": -698.72,
    "burst_15m_count": 67,
    "cash_sum": -24.77,
    "pass_through_ratio": 0.75,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_012162",
    "signal_date": "2025-03-08",
    "probability": 34.4,
    "raw_probability": 0.34378,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 334,
    "tx_24h": 37,
    "min_amount": -1.81,
    "max_amount": 2.03,
    "turnover": -37.15,
    "burst_15m_count": 41,
    "cash_sum": 1.6,
    "pass_through_ratio": 1.72,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  },
  {
    "signal_id": "SG_018850",
    "signal_date": "2026-06-10",
    "probability": 34.4,
    "raw_probability": 0.34359,
    "tier": "Past Xavf",
    "severity": "low",
    "recommended_action": "ASOSSIZ DEB YOPISH",
    "drivers": [
      "Smurfing Bursts (<15m)",
      "Keskin Chiqim Spayki",
      "Xalqaro O\u2018tkazma",
      "Tranzit Hisob (Mule)"
    ],
    "tx_count": 893,
    "tx_24h": 129,
    "min_amount": -2.91,
    "max_amount": 2.31,
    "turnover": -561.38,
    "burst_15m_count": 169,
    "cash_sum": -6.93,
    "pass_through_ratio": 0.85,
    "explanation": "Mijozning 180 kunlik tarixi barqaror. Xaridlar asosan korporativ karta va kassa orqali amalga oshirilgan. Shubhali naqdlashtirish yoki zudlik bilan hisobni bo'shatish belgilari mavjud emas.",
    "status": "pending"
  }
];

export const amlTelemetryStats = {
  totalSignals: 6000,
  analyzedSignals: 6000,
  highRiskCount: 1784,
  medRiskCount: 2116,
  lowRiskCount: 2100,
  meanProbability: 50.0,
  modelOofAuc: 0.62461,
  baselineAuc: 0.60268,
  teamName: "gitcore",
  teamId: "98F12CFB",
  competition: "WIUT Hackathon 2026",
  track: "FinTech / AI in Finance",
  submissionFile: "team_98F12CFB.csv"
};


// --- Analytics & ROC Data ---
export interface ModelMetrics {
  baselineAUC: number;
  lightgbmAUC: number;
  catboostAUC: number;
  xgboostAUC: number;
  simpleAvgAUC: number;
  ensembleAUC: number;
  weights: { lgb: number; cat: number; xgb: number };
  folds: {
    lightgbm: number[];
    catboost: number[];
    xgboost: number[];
  };
  executionTimeSec: number;
}

export const modelMetricsData: ModelMetrics = {
  baselineAUC: 0.60268,
  lightgbmAUC: 0.6151697941348654,
  catboostAUC: 0.6186280020691405,
  xgboostAUC: 0.6233626222500737,
  simpleAvgAUC: 0.6229969366321242,
  ensembleAUC: 0.6246065988368705,
  weights: {
    lgb: 0.33300192605931567,
    cat: 0.33349903697034217,
    xgb: 0.33349903697034217,
  },
  folds: {"lightgbm": [0.6479417520814675, 0.6089046554764538, 0.6250637641323281, 0.598759322562686, 0.6042652265161967], "catboost": [0.6394630275613459, 0.6163331208609346, 0.6234935303499339, 0.6153003436315209, 0.5996598648603824], "xgboost": [0.6448891423018202, 0.6218251289402648, 0.6321493152023553, 0.6026524086032494, 0.6171005317189017]},
  executionTimeSec: 36.08
};

export const featureImportancesData = [
  {
    "name": "amount_min",
    "importance": 5.71,
    "category": "Amount Extremes",
    "lgb": 81.2,
    "cat": 11.3,
    "xgb": 0.0117
  },
  {
    "name": "karta_max",
    "importance": 2.75,
    "category": "Card Volume",
    "lgb": 60.0,
    "cat": 4.2,
    "xgb": 0.0065
  },
  {
    "name": "bank_mean",
    "importance": 2.58,
    "category": "Bank Transfers",
    "lgb": 59.6,
    "cat": 3.5,
    "xgb": 0.0084
  },
  {
    "name": "naqd_mean",
    "importance": 2.31,
    "category": "Cash Activity",
    "lgb": 59.4,
    "cat": 2.9,
    "xgb": 0.0063
  },
  {
    "name": "bank_turnover_ratio",
    "importance": 1.95,
    "category": "Bank Transfers",
    "lgb": 41.6,
    "cat": 2.7,
    "xgb": 0.0075
  },
  {
    "name": "bank_max",
    "importance": 1.47,
    "category": "Bank Transfers",
    "lgb": 27.4,
    "cat": 2.1,
    "xgb": 0.0072
  },
  {
    "name": "naqd_sum",
    "importance": 1.44,
    "category": "Cash Activity",
    "lgb": 27.6,
    "cat": 2.1,
    "xgb": 0.0067
  },
  {
    "name": "naqd_max",
    "importance": 1.19,
    "category": "Cash Activity",
    "lgb": 32.0,
    "cat": 1.2,
    "xgb": 0.0054
  },
  {
    "name": "bank_sum",
    "importance": 1.18,
    "category": "Bank Transfers",
    "lgb": 16.0,
    "cat": 1.8,
    "xgb": 0.0078
  },
  {
    "name": "chiqim_max",
    "importance": 1.11,
    "category": "Flow Direction",
    "lgb": 23.8,
    "cat": 1.4,
    "xgb": 0.0054
  },
  {
    "name": "karta_turnover_ratio",
    "importance": 1.1,
    "category": "Card Volume",
    "lgb": 26.6,
    "cat": 1.2,
    "xgb": 0.006
  },
  {
    "name": "amount_max",
    "importance": 1.0,
    "category": "Amount Extremes",
    "lgb": 13.8,
    "cat": 1.7,
    "xgb": 0.0057
  },
  {
    "name": "naqd_turnover_ratio",
    "importance": 1.0,
    "category": "Cash Activity",
    "lgb": 25.2,
    "cat": 1.0,
    "xgb": 0.0055
  },
  {
    "name": "min_amount_zscore",
    "importance": 0.89,
    "category": "Amount Extremes",
    "lgb": 25.6,
    "cat": 0.7,
    "xgb": 0.0049
  },
  {
    "name": "night_ratio",
    "importance": 0.84,
    "category": "Amount Extremes",
    "lgb": 28.4,
    "cat": 0.5,
    "xgb": 0.0045
  },
  {
    "name": "chiqim_ratio_14d",
    "importance": 0.77,
    "category": "Flow Direction",
    "lgb": 17.4,
    "cat": 0.8,
    "xgb": 0.005
  },
  {
    "name": "max_60d",
    "importance": 0.77,
    "category": "Amount Extremes",
    "lgb": 16.4,
    "cat": 0.9,
    "xgb": 0.0051
  },
  {
    "name": "naqd_ratio",
    "importance": 0.76,
    "category": "Cash Activity",
    "lgb": 22.6,
    "cat": 0.5,
    "xgb": 0.0047
  },
  {
    "name": "bank_chiqim_count",
    "importance": 0.72,
    "category": "Bank Transfers",
    "lgb": 19.0,
    "cat": 0.6,
    "xgb": 0.0047
  },
  {
    "name": "chiqim_ratio_3d",
    "importance": 0.71,
    "category": "Flow Direction",
    "lgb": 11.2,
    "cat": 1.0,
    "xgb": 0.0048
  },
  {
    "name": "weekend_ratio",
    "importance": 0.71,
    "category": "Amount Extremes",
    "lgb": 22.0,
    "cat": 0.4,
    "xgb": 0.0044
  },
  {
    "name": "chiqim_ratio_30d",
    "importance": 0.66,
    "category": "Flow Direction",
    "lgb": 14.0,
    "cat": 0.7,
    "xgb": 0.0047
  },
  {
    "name": "amount_range",
    "importance": 0.65,
    "category": "Amount Extremes",
    "lgb": 10.8,
    "cat": 0.8,
    "xgb": 0.0049
  },
  {
    "name": "max_14d",
    "importance": 0.64,
    "category": "Amount Extremes",
    "lgb": 16.0,
    "cat": 0.6,
    "xgb": 0.0045
  },
  {
    "name": "history_span_days",
    "importance": 0.63,
    "category": "Amount Extremes",
    "lgb": 17.8,
    "cat": 0.5,
    "xgb": 0.0044
  }
];

export const behavioralComparisonsData = [
  {
    "key": "amount_min",
    "label": "Deepest Outflow (Min Amount)",
    "dismissed": -2.3278,
    "escalated": -2.3531,
    "ratio": 1.01
  },
  {
    "key": "amount_max",
    "label": "Peak Single Transaction (Max Amount)",
    "dismissed": 3.0521,
    "escalated": 2.8817,
    "ratio": 0.94
  },
  {
    "key": "amount_mean",
    "label": "Average Transaction Amount",
    "dismissed": -0.0452,
    "escalated": -0.1161,
    "ratio": 2.57
  },
  {
    "key": "amount_sum",
    "label": "Net Cumulative Balance Change",
    "dismissed": -60.6061,
    "escalated": -95.5063,
    "ratio": 1.58
  },
  {
    "key": "naqd_sum",
    "label": "Total Cash Volume",
    "dismissed": 16.5471,
    "escalated": 18.2732,
    "ratio": 1.1
  },
  {
    "key": "naqd_mean",
    "label": "Mean Cash Transaction Size",
    "dismissed": 0.6132,
    "escalated": 0.6153,
    "ratio": 1.0
  },
  {
    "key": "bank_mean",
    "label": "Mean Wire Transfer Size",
    "dismissed": 0.1551,
    "escalated": 0.0157,
    "ratio": 0.1
  },
  {
    "key": "bank_max",
    "label": "Maximum Wire Transfer",
    "dismissed": 2.661,
    "escalated": 2.4209,
    "ratio": 0.91
  },
  {
    "key": "chiqim_ratio",
    "label": "Overall Outgoing Flow Ratio",
    "dismissed": 0.2497,
    "escalated": 0.2559,
    "ratio": 1.02
  },
  {
    "key": "chiqim_ratio_3d",
    "label": "3-Day Outgoing Flow Ratio",
    "dismissed": 0.253,
    "escalated": 0.2662,
    "ratio": 1.05
  },
  {
    "key": "chiqim_ratio_7d",
    "label": "7-Day Outgoing Flow Ratio",
    "dismissed": 0.2544,
    "escalated": 0.2663,
    "ratio": 1.05
  },
  {
    "key": "chiqim_ratio_14d",
    "label": "14-Day Outgoing Flow Ratio",
    "dismissed": 0.2538,
    "escalated": 0.266,
    "ratio": 1.05
  },
  {
    "key": "burst_ratio_15m",
    "label": "15-Minute Burst Ratio (Smurfing)",
    "dismissed": 0.1047,
    "escalated": 0.1065,
    "ratio": 1.02
  },
  {
    "key": "night_ratio",
    "label": "Nighttime Activity Ratio (00:00 - 06:00)",
    "dismissed": 0.2673,
    "escalated": 0.267,
    "ratio": 1.0
  },
  {
    "key": "flow_pass_through_ratio",
    "label": "Pass-Through Mule Turnover Ratio",
    "dismissed": 9.5072,
    "escalated": 1.5816,
    "ratio": 0.17
  },
  {
    "key": "turnover",
    "label": "Total Turnover Volume",
    "dismissed": -60.6061,
    "escalated": -95.5063,
    "ratio": 1.58
  },
  {
    "key": "last1_amount",
    "label": "Alert Trigger Transaction Amount",
    "dismissed": -0.4528,
    "escalated": -0.5053,
    "ratio": 1.12
  },
  {
    "key": "last1_is_chiqim",
    "label": "Trigger is Outgoing (Chiqim)",
    "dismissed": 0.2492,
    "escalated": 0.2869,
    "ratio": 1.15
  }
];

export const rocCurveData = [
  {
    "fpr": 0.0,
    "tpr_ensemble": 0.0,
    "tpr_xgb": 0.0,
    "tpr_cat": 0.0,
    "tpr_lgb": 0.0,
    "baseline": 0.0
  },
  {
    "fpr": 0.025,
    "tpr_ensemble": 0.047,
    "tpr_xgb": 0.052,
    "tpr_cat": 0.054,
    "tpr_lgb": 0.045,
    "baseline": 0.025
  },
  {
    "fpr": 0.05,
    "tpr_ensemble": 0.104,
    "tpr_xgb": 0.103,
    "tpr_cat": 0.103,
    "tpr_lgb": 0.088,
    "baseline": 0.05
  },
  {
    "fpr": 0.075,
    "tpr_ensemble": 0.156,
    "tpr_xgb": 0.153,
    "tpr_cat": 0.143,
    "tpr_lgb": 0.141,
    "baseline": 0.075
  },
  {
    "fpr": 0.1,
    "tpr_ensemble": 0.2,
    "tpr_xgb": 0.195,
    "tpr_cat": 0.195,
    "tpr_lgb": 0.187,
    "baseline": 0.1
  },
  {
    "fpr": 0.125,
    "tpr_ensemble": 0.241,
    "tpr_xgb": 0.239,
    "tpr_cat": 0.235,
    "tpr_lgb": 0.228,
    "baseline": 0.125
  },
  {
    "fpr": 0.15,
    "tpr_ensemble": 0.28,
    "tpr_xgb": 0.277,
    "tpr_cat": 0.274,
    "tpr_lgb": 0.264,
    "baseline": 0.15
  },
  {
    "fpr": 0.175,
    "tpr_ensemble": 0.315,
    "tpr_xgb": 0.311,
    "tpr_cat": 0.306,
    "tpr_lgb": 0.305,
    "baseline": 0.175
  },
  {
    "fpr": 0.2,
    "tpr_ensemble": 0.347,
    "tpr_xgb": 0.345,
    "tpr_cat": 0.341,
    "tpr_lgb": 0.342,
    "baseline": 0.2
  },
  {
    "fpr": 0.225,
    "tpr_ensemble": 0.38,
    "tpr_xgb": 0.378,
    "tpr_cat": 0.371,
    "tpr_lgb": 0.368,
    "baseline": 0.225
  },
  {
    "fpr": 0.25,
    "tpr_ensemble": 0.412,
    "tpr_xgb": 0.408,
    "tpr_cat": 0.405,
    "tpr_lgb": 0.398,
    "baseline": 0.25
  },
  {
    "fpr": 0.275,
    "tpr_ensemble": 0.439,
    "tpr_xgb": 0.436,
    "tpr_cat": 0.438,
    "tpr_lgb": 0.433,
    "baseline": 0.275
  },
  {
    "fpr": 0.3,
    "tpr_ensemble": 0.474,
    "tpr_xgb": 0.464,
    "tpr_cat": 0.47,
    "tpr_lgb": 0.456,
    "baseline": 0.3
  },
  {
    "fpr": 0.325,
    "tpr_ensemble": 0.506,
    "tpr_xgb": 0.496,
    "tpr_cat": 0.497,
    "tpr_lgb": 0.49,
    "baseline": 0.325
  },
  {
    "fpr": 0.35,
    "tpr_ensemble": 0.534,
    "tpr_xgb": 0.53,
    "tpr_cat": 0.528,
    "tpr_lgb": 0.517,
    "baseline": 0.35
  },
  {
    "fpr": 0.375,
    "tpr_ensemble": 0.558,
    "tpr_xgb": 0.561,
    "tpr_cat": 0.559,
    "tpr_lgb": 0.547,
    "baseline": 0.375
  },
  {
    "fpr": 0.4,
    "tpr_ensemble": 0.585,
    "tpr_xgb": 0.587,
    "tpr_cat": 0.583,
    "tpr_lgb": 0.577,
    "baseline": 0.4
  },
  {
    "fpr": 0.425,
    "tpr_ensemble": 0.612,
    "tpr_xgb": 0.605,
    "tpr_cat": 0.611,
    "tpr_lgb": 0.607,
    "baseline": 0.425
  },
  {
    "fpr": 0.45,
    "tpr_ensemble": 0.63,
    "tpr_xgb": 0.631,
    "tpr_cat": 0.632,
    "tpr_lgb": 0.63,
    "baseline": 0.45
  },
  {
    "fpr": 0.475,
    "tpr_ensemble": 0.651,
    "tpr_xgb": 0.654,
    "tpr_cat": 0.649,
    "tpr_lgb": 0.649,
    "baseline": 0.475
  },
  {
    "fpr": 0.5,
    "tpr_ensemble": 0.676,
    "tpr_xgb": 0.677,
    "tpr_cat": 0.671,
    "tpr_lgb": 0.67,
    "baseline": 0.5
  },
  {
    "fpr": 0.525,
    "tpr_ensemble": 0.701,
    "tpr_xgb": 0.704,
    "tpr_cat": 0.689,
    "tpr_lgb": 0.689,
    "baseline": 0.525
  },
  {
    "fpr": 0.55,
    "tpr_ensemble": 0.718,
    "tpr_xgb": 0.728,
    "tpr_cat": 0.713,
    "tpr_lgb": 0.712,
    "baseline": 0.55
  },
  {
    "fpr": 0.575,
    "tpr_ensemble": 0.738,
    "tpr_xgb": 0.745,
    "tpr_cat": 0.734,
    "tpr_lgb": 0.733,
    "baseline": 0.575
  },
  {
    "fpr": 0.6,
    "tpr_ensemble": 0.755,
    "tpr_xgb": 0.757,
    "tpr_cat": 0.752,
    "tpr_lgb": 0.753,
    "baseline": 0.6
  },
  {
    "fpr": 0.625,
    "tpr_ensemble": 0.773,
    "tpr_xgb": 0.779,
    "tpr_cat": 0.768,
    "tpr_lgb": 0.766,
    "baseline": 0.625
  },
  {
    "fpr": 0.65,
    "tpr_ensemble": 0.794,
    "tpr_xgb": 0.8,
    "tpr_cat": 0.786,
    "tpr_lgb": 0.78,
    "baseline": 0.65
  },
  {
    "fpr": 0.675,
    "tpr_ensemble": 0.815,
    "tpr_xgb": 0.817,
    "tpr_cat": 0.802,
    "tpr_lgb": 0.803,
    "baseline": 0.675
  },
  {
    "fpr": 0.7,
    "tpr_ensemble": 0.835,
    "tpr_xgb": 0.83,
    "tpr_cat": 0.819,
    "tpr_lgb": 0.82,
    "baseline": 0.7
  },
  {
    "fpr": 0.725,
    "tpr_ensemble": 0.851,
    "tpr_xgb": 0.852,
    "tpr_cat": 0.842,
    "tpr_lgb": 0.841,
    "baseline": 0.725
  },
  {
    "fpr": 0.75,
    "tpr_ensemble": 0.862,
    "tpr_xgb": 0.87,
    "tpr_cat": 0.859,
    "tpr_lgb": 0.864,
    "baseline": 0.75
  },
  {
    "fpr": 0.775,
    "tpr_ensemble": 0.874,
    "tpr_xgb": 0.883,
    "tpr_cat": 0.874,
    "tpr_lgb": 0.875,
    "baseline": 0.775
  },
  {
    "fpr": 0.8,
    "tpr_ensemble": 0.89,
    "tpr_xgb": 0.897,
    "tpr_cat": 0.891,
    "tpr_lgb": 0.888,
    "baseline": 0.8
  },
  {
    "fpr": 0.825,
    "tpr_ensemble": 0.908,
    "tpr_xgb": 0.91,
    "tpr_cat": 0.908,
    "tpr_lgb": 0.906,
    "baseline": 0.825
  },
  {
    "fpr": 0.85,
    "tpr_ensemble": 0.927,
    "tpr_xgb": 0.926,
    "tpr_cat": 0.921,
    "tpr_lgb": 0.921,
    "baseline": 0.85
  },
  {
    "fpr": 0.875,
    "tpr_ensemble": 0.94,
    "tpr_xgb": 0.938,
    "tpr_cat": 0.934,
    "tpr_lgb": 0.936,
    "baseline": 0.875
  },
  {
    "fpr": 0.9,
    "tpr_ensemble": 0.954,
    "tpr_xgb": 0.954,
    "tpr_cat": 0.948,
    "tpr_lgb": 0.949,
    "baseline": 0.9
  },
  {
    "fpr": 0.925,
    "tpr_ensemble": 0.965,
    "tpr_xgb": 0.964,
    "tpr_cat": 0.964,
    "tpr_lgb": 0.963,
    "baseline": 0.925
  },
  {
    "fpr": 0.95,
    "tpr_ensemble": 0.977,
    "tpr_xgb": 0.976,
    "tpr_cat": 0.979,
    "tpr_lgb": 0.975,
    "baseline": 0.95
  },
  {
    "fpr": 0.975,
    "tpr_ensemble": 0.989,
    "tpr_xgb": 0.988,
    "tpr_cat": 0.989,
    "tpr_lgb": 0.988,
    "baseline": 0.975
  },
  {
    "fpr": 1.0,
    "tpr_ensemble": 1.0,
    "tpr_xgb": 1.0,
    "tpr_cat": 1.0,
    "tpr_lgb": 1.0,
    "baseline": 1.0
  }
];

export const channelDistributionData = [
  {
    "name": "Karta (Cards)",
    "percentage": 53.8,
    "avgAmount": -0.05,
    "riskLevel": "Medium",
    "color": "#3b82f6"
  },
  {
    "name": "Bank O\u2018tkazmasi (Wire)",
    "percentage": 39.4,
    "avgAmount": 0.12,
    "riskLevel": "High",
    "color": "#8b5cf6"
  },
  {
    "name": "Naqd (Cash)",
    "percentage": 6.3,
    "avgAmount": -0.18,
    "riskLevel": "Critical",
    "color": "#f59e0b"
  },
  {
    "name": "Xalqaro (Cross-Border)",
    "percentage": 0.5,
    "avgAmount": 2.05,
    "riskLevel": "Extreme",
    "color": "#ef4444"
  }
];

export const caseStudiesData = [
  {
    "id": "SG_000187",
    "probability": 99.9,
    "classification": "Kritik Eskalatsiya (Tranzit Mule Kompaniya)",
    "status": "ESCALATE",
    "reason": "Yirik bank o'tkazmasi tushishi bilan 3 soat ichida 87.4% mablag'ni naqdlashtirish; 7 kunlik aylanma sur'ati keskin tezlashgan; Tranzit (Pass-through) ko'rsatkichi 0.94 (FATF/Markaziy Bank 2515-sonli Nizom 14-moddasi).",
    "riskColor": "red",
    "indicators": [
      {
        "name": "Naqd Chiqim Nisbati (Cash Ratio)",
        "value": "87.4%",
        "severity": "critical"
      },
      {
        "name": "15 Daqiqalik Klaster (Bursts)",
        "value": "14 ta operatsiya",
        "severity": "high"
      },
      {
        "name": "Chiqim Z-Score Oqishi",
        "value": "-3.84 sigma",
        "severity": "critical"
      },
      {
        "name": "Tranzit Hisob (Mule) Indeksi",
        "value": "0.94 (Kritik)",
        "severity": "high"
      }
    ]
  },
  {
    "id": "SG_001429",
    "probability": 94.2,
    "classification": "Kritik Eskalatsiya (Structuring & Smurfing)",
    "status": "ESCALATE",
    "reason": "100M so'mlik majburiy nazorat chegarasidan qochish maqsadida 45 daqiqa ichida bir nechta bankomatlardan 11 ta ketma-ket 9.5M so'mlik naqd pul yechish aniqlandi (ZRU-660 16-moddasi).",
    "riskColor": "red",
    "indicators": [
      {
        "name": "Structuring / Smurfing Tezligi",
        "value": "11 ta / 45 daqiqa",
        "severity": "critical"
      },
      {
        "name": "Chegara Osti O'rtacha Miqdor",
        "value": "9,500,000 UZS",
        "severity": "critical"
      },
      {
        "name": "Kassa Qoldig'i O'zgarishi",
        "value": "-98.2%",
        "severity": "high"
      },
      {
        "name": "Tranzaksiya Kanali",
        "value": "Naqd / ATM Klaster",
        "severity": "high"
      }
    ]
  },
  {
    "id": "SG_003810",
    "probability": 86.5,
    "classification": "Yuqori Xavf (Tungi P2P Kripto Funnel)",
    "status": "ESCALATE",
    "reason": "Tungi soat 02:30 va 04:15 oralig'ida 18 ta turli xil jismoniy shaxs kartalariga tezkor P2P o'tkazmalari amalga oshirilgan; g'ayritabiiy vaqt anomaliyasi va noaniq iqtisodiy maqsad.",
    "riskColor": "amber",
    "indicators": [
      {
        "name": "Tungi Vaqt Anomaliyasi (Night Ratio)",
        "value": "91.8% tungi oqim",
        "severity": "critical"
      },
      {
        "name": "Turli Kontragentlar Soni",
        "value": "18 ta karta / 2 soat",
        "severity": "high"
      },
      {
        "name": "Tezlik Sur'ati (Velocity Jump)",
        "value": "4.8x me'yordan ortiq",
        "severity": "high"
      },
      {
        "name": "Tranzaksiya Turi",
        "value": "Karta (P2P Split)",
        "severity": "medium"
      }
    ]
  },
  {
    "id": "SG_004921",
    "probability": 91.0,
    "classification": "Yuqori Xavf (Xalqaro Tranzit / Offshore)",
    "status": "ESCALATE",
    "reason": "Ichki tovar aylanmasi yoki xizmat ko'rsatish tarixi bo'lmagan yangi yuridik shaxs hisobiga chet eldan tushgan mablag'ning o'sha kunning o'zida noma'lum yurisdiksiyaga o'tkazilishi.",
    "riskColor": "red",
    "indicators": [
      {
        "name": "Xalqaro O'tkazma Nisbati",
        "value": "78.5% jami aylanmadan",
        "severity": "critical"
      },
      {
        "name": "Hisob Faoliyat Davomiyligi",
        "value": "14 kun (Yangi hisob)",
        "severity": "high"
      },
      {
        "name": "Soliq / Maosh To'lovlari Mavjudligi",
        "value": "Mavjud emas (0%)",
        "severity": "critical"
      },
      {
        "name": "Pass-Through Ko'rsatkichi",
        "value": "0.98 (Tranzit)",
        "severity": "high"
      }
    ]
  },
  {
    "id": "SG_000010",
    "probability": 9.5,
    "classification": "Asossiz Signal (Muntazam Chakana Savdo)",
    "status": "DISMISS",
    "reason": "180 kunlik barqaror faoliyat; chakana savdo terminalidan muntazam tushumlar va yetkazib beruvchilarga rejali to'lovlar; naqdlashtirish va tungi operatsiyalar yo'q.",
    "riskColor": "emerald",
    "indicators": [
      {
        "name": "Naqd Chiqim Nisbati",
        "value": "0.0% (Faqat terminal)",
        "severity": "low"
      },
      {
        "name": "15 Daqiqalik Klaster",
        "value": "0 ta (Normal oqim)",
        "severity": "low"
      },
      {
        "name": "Chiqim Z-Score Oqishi",
        "value": "+0.12 sigma (Barqaror)",
        "severity": "low"
      },
      {
        "name": "Tranzit Hisob Indeksi",
        "value": "0.11 (Haqiqiy biznes)",
        "severity": "low"
      }
    ]
  },
  {
    "id": "SG_002155",
    "probability": 4.2,
    "classification": "Asossiz Signal (Rejali Oylik Maosh)",
    "status": "DISMISS",
    "reason": "Har oyning 5-sanasida xodimlarning maosh kartalariga rejali o'tkazmalar; avvalgi oylar bilan 99% korrelyatsiya va to'liq soliq hisob-kitoblariga mos.",
    "riskColor": "emerald",
    "indicators": [
      {
        "name": "Maosh To'lovi Korrelyatsiyasi",
        "value": "0.99 (Rejali oylik)",
        "severity": "low"
      },
      {
        "name": "Chiqim Davriyligi",
        "value": "30 kunlik sikl",
        "severity": "low"
      },
      {
        "name": "Yangi Kontragentlar",
        "value": "0 ta (Doimiy xodimlar)",
        "severity": "low"
      },
      {
        "name": "Hisob Balansi Saqlanishi",
        "value": "Ijobiy qoldiq",
        "severity": "low"
      }
    ]
  }
];

export const centralBankRulesData = [
  {
    id: "MB-2515-01",
    name: "Katta hajmdagi naqdlashtirish (Cash-out Spike)",
    threshold: ">500 BHM (206,000,000 UZS) yoki z-score > 2.0",
    legalBasis: "O'zR Qonuni ZRU-660 16-moddasi, MB 2515-Nizomi",
    mlFeatureMapping: "amount_min, naqd_sum, naqd_turnover_ratio",
    riskWeight: "Juda Yuqori (Kritik)",
    penaltyRisk: "Bank va mansabdor shaxsga 50 mln - 200 mln UZS jarima"
  },
  {
    id: "MB-2515-02",
    name: "Smurfing / Structuring (Ketma-ket bo'lib yechish)",
    threshold: "15 daqiqa ichida >= 3 ta operatsiya yoki 24h ichida 5+ chegara osti amallar",
    legalBasis: "MB 2515-sonli Nizom 21-bandi (G'ayritabiiy amallar)",
    mlFeatureMapping: "burst_15m_count, max_15m_burst_count, velocity_1d",
    riskWeight: "Kritik (Jinoiy xavf)",
    penaltyRisk: "Hisobni to'xtatish va Bosh Prokuraturaga ma'lumot jo'natish"
  },
  {
    id: "MB-2515-03",
    name: "Tranzit (Pass-Through Mule) Operatsiyasi",
    threshold: "Mablag' tushgach 24 soat ichida 80%+ qismining chiqarilishi",
    legalBasis: "FATF 10-Tavsiya va MB 2515-Nizom 14-bandi",
    mlFeatureMapping: "pass_through_ratio, turnover_ratio_7d, chiqim_ratio_3d",
    riskWeight: "Yuqori (Mule hisob)",
    penaltyRisk: "Bank litsenziyasi bo'yicha ogohlantirish va hisobni muzlatish"
  },
  {
    id: "MB-2515-04",
    name: "Tungi Anomaliya & Noma'lum P2P Klaster",
    threshold: "01:00-05:00 soatlaridagi amallar nisbati > 40%",
    legalBasis: "Elektron to'lovlar xavfsizligi to'g'risidagi MB Nizomi",
    mlFeatureMapping: "night_ratio, weekend_ratio, tx_count_night",
    riskWeight: "O'rta-Yuqori",
    penaltyRisk: "Avtomatik 2FA bloklash va qo'shimcha verifikatsiya talabi"
  },
  {
    id: "MB-2515-05",
    name: "Xalqaro O'tkazmalar & Noaniq Yurisdiksiyalar",
    threshold: "Ichki operatsiyalari bo'lmagan hisobdan chet elga chiqim",
    legalBasis: "Valyutani tartibga solish qonunchiligi va FATF qora ro'yxati",
    mlFeatureMapping: "xalqaro_sum, xalqaro_ratio, chiqim_max",
    riskWeight: "Kritik",
    penaltyRisk: "Valyuta nazorati organlari tomonidan to'liq audit"
  }
];

export const summaryStats = {
  totalTrainSignals: 14000,
  totalTestSignals: 6000,
  totalTransactions: 10015238,
  escalationRate: 17.18,
  engineeredFeatures: 226,
  teamName: "gitcore",
  teamId: "98F12CFB",
  submissionFile: "team_98F12CFB.csv"
};
