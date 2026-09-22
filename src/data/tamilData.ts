export interface TamilLetter {
  letter: string;
  transliteration: string;
  hint: string; // a simple pronunciation guide in English
}

// 12 vowels (uyir ezhuthukkal)
export const TAMIL_VOWELS: TamilLetter[] = [
  { letter: 'அ', transliteration: 'a', hint: "like 'u' in cup" },
  { letter: 'ஆ', transliteration: 'aa', hint: "like 'a' in father" },
  { letter: 'இ', transliteration: 'i', hint: "like 'i' in sit" },
  { letter: 'ஈ', transliteration: 'ii', hint: "like 'ee' in see" },
  { letter: 'உ', transliteration: 'u', hint: "like 'u' in put" },
  { letter: 'ஊ', transliteration: 'uu', hint: "like 'oo' in pool" },
  { letter: 'எ', transliteration: 'e', hint: "like 'e' in pet" },
  { letter: 'ஏ', transliteration: 'ee', hint: "like 'ay' in day" },
  { letter: 'ஐ', transliteration: 'ai', hint: "like 'i' in kite" },
  { letter: 'ஒ', transliteration: 'o', hint: "like 'o' in pot" },
  { letter: 'ஓ', transliteration: 'oo', hint: "like 'o' in go" },
  { letter: 'ஔ', transliteration: 'au', hint: "like 'ow' in cow" },
];

// 18 consonants (mei ezhuthukkal)
export const TAMIL_CONSONANTS: TamilLetter[] = [
  { letter: 'க்', transliteration: 'k', hint: "like 'k' in kite" },
  { letter: 'ங்', transliteration: 'ng', hint: "like 'ng' in sing" },
  { letter: 'ச்', transliteration: 'ch', hint: "like 'ch' in chip" },
  { letter: 'ஞ்', transliteration: 'ny', hint: "like 'ny' in canyon" },
  { letter: 'ட்', transliteration: 't', hint: "a hard 't', tongue curled back" },
  { letter: 'ண்', transliteration: 'n', hint: "a hard 'n', tongue curled back" },
  { letter: 'த்', transliteration: 'th', hint: "like 'th' in thumb (soft)" },
  { letter: 'ந்', transliteration: 'n', hint: "like 'n' in nice" },
  { letter: 'ப்', transliteration: 'p', hint: "like 'p' in pot" },
  { letter: 'ம்', transliteration: 'm', hint: "like 'm' in mat" },
  { letter: 'ய்', transliteration: 'y', hint: "like 'y' in yes" },
  { letter: 'ர்', transliteration: 'r', hint: "like 'r' in run" },
  { letter: 'ல்', transliteration: 'l', hint: "like 'l' in log" },
  { letter: 'வ்', transliteration: 'v', hint: "like 'v' in van" },
  { letter: 'ழ்', transliteration: 'zh', hint: "a soft rolled sound unique to Tamil" },
  { letter: 'ள்', transliteration: 'l', hint: "a hard 'l', tongue curled back" },
  { letter: 'ற்', transliteration: 'r', hint: "a hard, rolled 'r'" },
  { letter: 'ன்', transliteration: 'n', hint: "like 'n' in run" },
];

export interface TamilNumber {
  digit: number;
  tamil: string;
  transliteration: string;
}

export const TAMIL_NUMBERS: TamilNumber[] = [
  { digit: 1, tamil: 'ஒன்று', transliteration: 'ondru' },
  { digit: 2, tamil: 'இரண்டு', transliteration: 'irandu' },
  { digit: 3, tamil: 'மூன்று', transliteration: 'moondru' },
  { digit: 4, tamil: 'நான்கு', transliteration: 'naanku' },
  { digit: 5, tamil: 'ஐந்து', transliteration: 'aindhu' },
  { digit: 6, tamil: 'ஆறு', transliteration: 'aaru' },
  { digit: 7, tamil: 'ஏழு', transliteration: 'ezhu' },
  { digit: 8, tamil: 'எட்டு', transliteration: 'ettu' },
  { digit: 9, tamil: 'ஒன்பது', transliteration: 'onpathu' },
  { digit: 10, tamil: 'பத்து', transliteration: 'paththu' },
];

export interface TamilWord {
  id: string;
  tamil: string;
  transliteration: string;
  meaning: string;
  emoji: string;
  group: 'family' | 'animals' | 'nature' | 'school';
}

export const TAMIL_WORDS: TamilWord[] = [
  { id: 'amma', tamil: 'அம்மா', transliteration: 'ammā', meaning: 'Mother', emoji: '👩', group: 'family' },
  { id: 'appa', tamil: 'அப்பா', transliteration: 'appā', meaning: 'Father', emoji: '👨', group: 'family' },
  { id: 'thanneer', tamil: 'தண்ணீர்', transliteration: 'taṇṇīr', meaning: 'Water', emoji: '💧', group: 'nature' },
  { id: 'paal', tamil: 'பால்', transliteration: 'pāl', meaning: 'Milk', emoji: '🥛', group: 'nature' },
  { id: 'puthagam', tamil: 'புத்தகம்', transliteration: 'puttakam', meaning: 'Book', emoji: '📖', group: 'school' },
  { id: 'palli', tamil: 'பள்ளி', transliteration: 'paḷḷi', meaning: 'School', emoji: '🏫', group: 'school' },
  { id: 'naai', tamil: 'நாய்', transliteration: 'nāy', meaning: 'Dog', emoji: '🐕', group: 'animals' },
  { id: 'poonai', tamil: 'பூனை', transliteration: 'pūnai', meaning: 'Cat', emoji: '🐈', group: 'animals' },
  { id: 'sooriyan', tamil: 'சூரியன்', transliteration: 'sūriyaṉ', meaning: 'Sun', emoji: '☀️', group: 'nature' },
  { id: 'nilaa', tamil: 'நிலா', transliteration: 'nilā', meaning: 'Moon', emoji: '🌙', group: 'nature' },
  { id: 'pazham', tamil: 'பழம்', transliteration: 'paḻam', meaning: 'Fruit', emoji: '🍎', group: 'nature' },
  { id: 'veedu', tamil: 'வீடு', transliteration: 'vīṭu', meaning: 'House', emoji: '🏠', group: 'family' },
];

export interface TamilGreeting {
  tamil: string;
  transliteration: string;
  meaning: string;
}

export const TAMIL_GREETINGS: TamilGreeting[] = [
  { tamil: 'வணக்கம்', transliteration: 'Vaṇakkam', meaning: 'Hello / Greetings' },
  { tamil: 'நன்றி', transliteration: 'Naṉṟi', meaning: 'Thank you' },
  { tamil: 'மன்னிக்கவும்', transliteration: 'Maṉṉikkavum', meaning: 'Sorry / Excuse me' },
  { tamil: 'போய் வருகிறேன்', transliteration: 'Pōy varukiṟēṉ', meaning: "Goodbye (literally: 'I'll go and come back')" },
];

export interface TamilColor {
  tamil: string;
  transliteration: string;
  meaning: string;
  hex: string;
}

export const TAMIL_COLORS: TamilColor[] = [
  { tamil: 'சிவப்பு', transliteration: 'sivappu', meaning: 'Red', hex: '#ef4444' },
  { tamil: 'மஞ்சள்', transliteration: 'mañcaḷ', meaning: 'Yellow', hex: '#eab308' },
  { tamil: 'பச்சை', transliteration: 'pacchai', meaning: 'Green', hex: '#22c55e' },
  { tamil: 'நீலம்', transliteration: 'nīlam', meaning: 'Blue', hex: '#3b82f6' },
  { tamil: 'வெள்ளை', transliteration: 'veḷḷai', meaning: 'White', hex: '#f8fafc' },
  { tamil: 'கருப்பு', transliteration: 'karuppu', meaning: 'Black', hex: '#1e293b' },
];

// Pool the "Word Match" game draws its multiple-choice questions from.
// Each entry needs a Tamil word, its English meaning, and an emoji so the
// question can be asked either way (English -> Tamil word).
export interface TamilQuizEntry {
  id: string;
  tamil: string;
  meaning: string;
}

export const TAMIL_QUIZ_POOL: TamilQuizEntry[] = [
  ...TAMIL_WORDS.map((w) => ({ id: w.id, tamil: w.tamil, meaning: w.meaning })),
  ...TAMIL_COLORS.map((c) => ({ id: c.transliteration, tamil: c.tamil, meaning: c.meaning })),
  ...TAMIL_NUMBERS.map((n) => ({ id: `num-${n.digit}`, tamil: n.tamil, meaning: String(n.digit) })),
];
