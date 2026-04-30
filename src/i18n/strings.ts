export type Lang = "en" | "bn";

export const strings = {
  en: {
    siteTitle: "NBR Audit Lookup",
    siteTagline: "Check Risk-Based Audit Selection 2023-24",
    nav: { home: "Home", notice: "Notice", about: "About" },
    unofficial: "Unofficial · Community Tool",
    heroTitle: "Find your TIN in the NBR Audit Selection list",
    heroSubtitle:
      "Search 72,341 TINs selected for automated Risk-Based Audit for assessment year 2023-24. Fully client-side. Your input never leaves your device.",
    searchLabel: "Enter your 12-digit TIN",
    searchPlaceholder: "e.g. 123456789012",
    searchBtn: "Check Now",
    clearBtn: "Clear",
    loading: "Loading data…",
    invalidTin: "Please enter a valid 12-digit TIN.",
    foundTitle: "Yes — this TIN is in the audit list",
    foundDesc: "The following TIN was selected by NBR for audit in assessment year 2023-24.",
    notFoundTitle: "Not in the list",
    notFoundDesc:
      "This TIN was not found in the published 2nd-phase audit selection (72,341 entries) for assessment year 2023-24.",
    fields: {
      tin: "TIN",
      zone: "Tax Zone",
      circle: "Circle",
      submission_type: "Submission Type",
      year: "Assessment Year",
    },
    stats: {
      total: "Selected TINs",
      phase: "2nd Phase",
      year: "Assessment Year",
    },
    recent: "Recent searches",
    noticeTitle: "Official NBR Press Release",
    noticeDesc:
      "On 28 April 2026, NBR announced the 2nd-phase automated selection of 72,341 income-tax returns for audit, on top of 15,494 selected in the 1st phase (July 2025).",
    openPdf: "Open Press Release PDF",
    openExcel: "Download Original Excel",
    aboutTitle: "About this tool",
    aboutBody:
      "This is a community-built website that mirrors the publicly released NBR audit-selection list so taxpayers can quickly check whether their TIN is included. We are not affiliated with the National Board of Revenue. All data is sourced from the official NBR website.",
    sources: "Data Sources",
    nbrSite: "NBR Official Website",
    pressRelease: "Press Release PDF",
    excelFile: "Original Excel List",
    footerNote: "Built by the community · Not an official NBR website",
    lastUpdated: "Data dated 28 April 2026",
    privacy: "100% client-side — no tracking, no servers, no data uploaded.",
  },
  bn: {
    siteTitle: "এনবিআর অডিট লুকআপ",
    siteTagline: "ঝুঁকিভিত্তিক অডিট নির্বাচন ২০২৩-২৪",
    nav: { home: "হোম", notice: "প্রজ্ঞাপন", about: "পরিচিতি" },
    unofficial: "অনানুষ্ঠানিক · কমিউনিটি টুল",
    heroTitle: "এনবিআর অডিট তালিকায় আপনার টিআইএন খুঁজুন",
    heroSubtitle:
      "করবর্ষ ২০২৩-২৪ এর জন্য স্বয়ংক্রিয় ঝুঁকিভিত্তিক অডিটের জন্য নির্বাচিত ৭২,৩৪১টি টিআইএন থেকে অনুসন্ধান করুন। সম্পূর্ণ ক্লায়েন্ট-সাইড — আপনার তথ্য কোথাও পাঠানো হয় না।",
    searchLabel: "১২ অঙ্কের টিআইএন নম্বর লিখুন",
    searchPlaceholder: "যেমন ১২৩৪৫৬৭৮৯০১২",
    searchBtn: "এখনই দেখুন",
    clearBtn: "মুছুন",
    loading: "ডেটা লোড হচ্ছে…",
    invalidTin: "অনুগ্রহ করে সঠিক ১২ অঙ্কের টিআইএন লিখুন।",
    foundTitle: "হ্যাঁ — এই টিআইএনটি অডিট তালিকায় আছে",
    foundDesc: "করবর্ষ ২০২৩-২৪ এর জন্য এনবিআর কর্তৃক নির্বাচিত টিআইএন এর বিস্তারিত নিচে দেখানো হলো।",
    notFoundTitle: "তালিকায় নেই",
    notFoundDesc:
      "করবর্ষ ২০২৩-২৪ এর প্রকাশিত ২য় পর্যায়ের অডিট নির্বাচন (৭২,৩৪১টি) তালিকায় এই টিআইএন পাওয়া যায়নি।",
    fields: {
      tin: "টিআইএন",
      zone: "কর অঞ্চল",
      circle: "সার্কেল",
      submission_type: "জমার ধরন",
      year: "করবর্ষ",
    },
    stats: {
      total: "নির্বাচিত টিআইএন",
      phase: "২য় পর্যায়",
      year: "করবর্ষ",
    },
    recent: "সাম্প্রতিক অনুসন্ধান",
    noticeTitle: "এনবিআর-এর সরকারি প্রজ্ঞাপন",
    noticeDesc:
      "২৮ এপ্রিল ২০২৬ তারিখে এনবিআর করবর্ষ ২০২৩-২৪ এর জন্য ২য় পর্যায়ে ৭২,৩৪১টি আয়কর রিটার্ন অডিটের জন্য নির্বাচন করেছে। ১ম পর্যায়ে (জুলাই ২০২৫) আরও ১৫,৪৯৪টি মামলা নির্বাচিত হয়েছিল।",
    openPdf: "প্রজ্ঞাপনের পিডিএফ দেখুন",
    openExcel: "মূল এক্সেল ডাউনলোড করুন",
    aboutTitle: "এই সাইট সম্পর্কে",
    aboutBody:
      "এটি একটি কমিউনিটি-নির্মিত ওয়েবসাইট যা এনবিআর-এর প্রকাশিত অডিট নির্বাচন তালিকা থেকে দ্রুত টিআইএন খুঁজে দেখার সুবিধা দেয়। আমরা জাতীয় রাজস্ব বোর্ডের সাথে সংশ্লিষ্ট নই। সকল তথ্য এনবিআর-এর সরকারি ওয়েবসাইট থেকে সংগৃহীত।",
    sources: "তথ্যসূত্র",
    nbrSite: "এনবিআর সরকারি ওয়েবসাইট",
    pressRelease: "প্রজ্ঞাপনের পিডিএফ",
    excelFile: "মূল এক্সেল তালিকা",
    footerNote: "কমিউনিটি দ্বারা নির্মিত · এটি সরকারি এনবিআর সাইট নয়",
    lastUpdated: "তথ্য তারিখ: ২৮ এপ্রিল ২০২৬",
    privacy: "১০০% ক্লায়েন্ট-সাইড — কোনো ট্র্যাকিং নেই, কোনো সার্ভার নেই।",
  },
} as const;

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export function toBnDigits(n: number | string): string {
  return String(n).replace(/\d/g, (d) => bnDigits[Number(d)]);
}
export function fmtNum(n: number, lang: Lang): string {
  const s = n.toLocaleString("en-US");
  return lang === "bn" ? toBnDigits(s) : s;
}
