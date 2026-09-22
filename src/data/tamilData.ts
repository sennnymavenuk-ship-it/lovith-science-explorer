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

// The 13th, special letter: ஆய்த எழுத்து (aytham). It is not one of the 12
// vowels or 18 consonants — a unique character of its own, giving a soft,
// breathy sound. Together, 12 + 18 + 1 + the 216 combined uyirmei letters
// make up all 247 letters of the Tamil script.
export const TAMIL_AYTHAM: TamilLetter = {
  letter: 'ஃ',
  transliteration: 'akh',
  hint: "a short, breathy sound, like a soft 'h' — used in words like எஃகு (steel)",
};

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
  group: 'family' | 'animals' | 'nature' | 'school' | 'body' | 'food';
}

export const TAMIL_WORDS: TamilWord[] = [
  // Family
  { id: 'amma', tamil: 'அம்மா', transliteration: 'ammā', meaning: 'Mother', emoji: '👩', group: 'family' },
  { id: 'appa', tamil: 'அப்பா', transliteration: 'appā', meaning: 'Father', emoji: '👨', group: 'family' },
  { id: 'thaatha', tamil: 'தாத்தா', transliteration: 'tāttā', meaning: 'Grandfather', emoji: '👴', group: 'family' },
  { id: 'paati', tamil: 'பாட்டி', transliteration: 'pāṭṭi', meaning: 'Grandmother', emoji: '👵', group: 'family' },
  { id: 'anna', tamil: 'அண்ணா', transliteration: 'aṇṇā', meaning: 'Elder brother', emoji: '👦', group: 'family' },
  { id: 'akka', tamil: 'அக்கா', transliteration: 'akkā', meaning: 'Elder sister', emoji: '👧', group: 'family' },
  { id: 'veedu', tamil: 'வீடு', transliteration: 'vīṭu', meaning: 'House', emoji: '🏠', group: 'family' },
  // Animals
  { id: 'naai', tamil: 'நாய்', transliteration: 'nāy', meaning: 'Dog', emoji: '🐕', group: 'animals' },
  { id: 'poonai', tamil: 'பூனை', transliteration: 'pūnai', meaning: 'Cat', emoji: '🐈', group: 'animals' },
  { id: 'maadu', tamil: 'மாடு', transliteration: 'māṭu', meaning: 'Cow', emoji: '🐄', group: 'animals' },
  { id: 'kuruvi', tamil: 'குருவி', transliteration: 'kuruvi', meaning: 'Sparrow / small bird', emoji: '🐦', group: 'animals' },
  { id: 'meen', tamil: 'மீன்', transliteration: 'mīṉ', meaning: 'Fish', emoji: '🐟', group: 'animals' },
  { id: 'yaanai', tamil: 'யானை', transliteration: 'yāṉai', meaning: 'Elephant', emoji: '🐘', group: 'animals' },
  // Nature
  { id: 'thanneer', tamil: 'தண்ணீர்', transliteration: 'taṇṇīr', meaning: 'Water', emoji: '💧', group: 'nature' },
  { id: 'sooriyan', tamil: 'சூரியன்', transliteration: 'sūriyaṉ', meaning: 'Sun', emoji: '☀️', group: 'nature' },
  { id: 'nilaa', tamil: 'நிலா', transliteration: 'nilā', meaning: 'Moon', emoji: '🌙', group: 'nature' },
  { id: 'pazham', tamil: 'பழம்', transliteration: 'paḻam', meaning: 'Fruit', emoji: '🍎', group: 'nature' },
  { id: 'malai', tamil: 'மழை', transliteration: 'maḻai', meaning: 'Rain', emoji: '🌧️', group: 'nature' },
  { id: 'maram', tamil: 'மரம்', transliteration: 'maram', meaning: 'Tree', emoji: '🌳', group: 'nature' },
  { id: 'poo', tamil: 'பூ', transliteration: 'pū', meaning: 'Flower', emoji: '🌸', group: 'nature' },
  // School
  { id: 'puthagam', tamil: 'புத்தகம்', transliteration: 'puttakam', meaning: 'Book', emoji: '📖', group: 'school' },
  { id: 'palli', tamil: 'பள்ளி', transliteration: 'paḷḷi', meaning: 'School', emoji: '🏫', group: 'school' },
  { id: 'pena', tamil: 'பேனா', transliteration: 'pēṉā', meaning: 'Pen', emoji: '🖊️', group: 'school' },
  { id: 'aasiriyar', tamil: 'ஆசிரியர்', transliteration: 'āciriyar', meaning: 'Teacher', emoji: '🍎', group: 'school' },
  { id: 'nanban', tamil: 'நண்பன்', transliteration: 'naṇpaṉ', meaning: 'Friend', emoji: '🤝', group: 'school' },
  // Body
  { id: 'kai', tamil: 'கை', transliteration: 'kai', meaning: 'Hand', emoji: '✋', group: 'body' },
  { id: 'kaal', tamil: 'கால்', transliteration: 'kāl', meaning: 'Leg / foot', emoji: '🦵', group: 'body' },
  { id: 'kann', tamil: 'கண்', transliteration: 'kaṇ', meaning: 'Eye', emoji: '👁️', group: 'body' },
  { id: 'mookku', tamil: 'மூக்கு', transliteration: 'mūkku', meaning: 'Nose', emoji: '👃', group: 'body' },
  { id: 'vaai', tamil: 'வாய்', transliteration: 'vāy', meaning: 'Mouth', emoji: '👄', group: 'body' },
  { id: 'thalai', tamil: 'தலை', transliteration: 'talai', meaning: 'Head', emoji: '🗣️', group: 'body' },
  // Food
  { id: 'paal', tamil: 'பால்', transliteration: 'pāl', meaning: 'Milk', emoji: '🥛', group: 'food' },
  { id: 'sooru', tamil: 'சோறு', transliteration: 'cōṟu', meaning: 'Rice / a meal', emoji: '🍚', group: 'food' },
  { id: 'vaazhaipazham', tamil: 'வாழைப்பழம்', transliteration: 'vāḻaippaḻam', meaning: 'Banana', emoji: '🍌', group: 'food' },
  { id: 'thengaai', tamil: 'தேங்காய்', transliteration: 'tēṅkāy', meaning: 'Coconut', emoji: '🥥', group: 'food' },
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

// ---------- Uyirmei letters: every consonant combined with every vowel ----------
// Tamil builds a full syllable by adding a vowel sign to a consonant. Combining
// all 18 consonants with all 12 vowels gives the 216 "uyirmei" (uyir + mei,
// "life + body") letters. We generate them from the base consonants and vowel
// signs below, rather than typing out 216 letters by hand, so every one of
// them is guaranteed to be built the same correct way.
const VOWEL_SIGNS: { sign: string; transliteration: string }[] = [
  { sign: '', transliteration: 'a' }, // the consonant alone already carries the 'a' sound
  { sign: '\u0BBE', transliteration: 'aa' },
  { sign: '\u0BBF', transliteration: 'i' },
  { sign: '\u0BC0', transliteration: 'ii' },
  { sign: '\u0BC1', transliteration: 'u' },
  { sign: '\u0BC2', transliteration: 'uu' },
  { sign: '\u0BC6', transliteration: 'e' },
  { sign: '\u0BC7', transliteration: 'ee' },
  { sign: '\u0BC8', transliteration: 'ai' },
  { sign: '\u0BCA', transliteration: 'o' },
  { sign: '\u0BCB', transliteration: 'oo' },
  { sign: '\u0BCC', transliteration: 'au' },
];

const CONSONANT_BASES: { base: string; transliteration: string }[] = [
  { base: '\u0B95', transliteration: 'k' }, // க
  { base: '\u0B99', transliteration: 'ng' }, // ங
  { base: '\u0B9A', transliteration: 'ch' }, // ச
  { base: '\u0B9E', transliteration: 'ny' }, // ஞ
  { base: '\u0B9F', transliteration: 't' }, // ட
  { base: '\u0BA3', transliteration: 'n' }, // ண
  { base: '\u0BA4', transliteration: 'th' }, // த
  { base: '\u0BA8', transliteration: 'n' }, // ந
  { base: '\u0BAA', transliteration: 'p' }, // ப
  { base: '\u0BAE', transliteration: 'm' }, // ம
  { base: '\u0BAF', transliteration: 'y' }, // ய
  { base: '\u0BB0', transliteration: 'r' }, // ர
  { base: '\u0BB2', transliteration: 'l' }, // ல
  { base: '\u0BB5', transliteration: 'v' }, // வ
  { base: '\u0BB4', transliteration: 'zh' }, // ழ
  { base: '\u0BB3', transliteration: 'l' }, // ள
  { base: '\u0BB1', transliteration: 'r' }, // ற
  { base: '\u0BA9', transliteration: 'n' }, // ன
];

export interface UyirmeiCell {
  letter: string;
  transliteration: string;
}

export interface UyirmeiRow {
  consonantTransliteration: string;
  cells: UyirmeiCell[]; // 12 cells, one per vowel, in the same order as the vowels above
}

// 18 rows x 12 columns = 216 letters
export const UYIRMEI_TABLE: UyirmeiRow[] = CONSONANT_BASES.map((c) => ({
  consonantTransliteration: c.transliteration,
  cells: VOWEL_SIGNS.map((v) => ({
    letter: c.base + v.sign,
    transliteration: c.transliteration + v.transliteration,
  })),
}));

// ---------- Poems ----------
// Two short, traditional pieces, both long out of copyright: a set of lines
// from the Aathichudi (ஆத்திசூடி) by the poet Avvaiyar, a classical Tamil
// text used for centuries to teach children their first morals, and the
// opening of "Chinnanjiru Kiliye" by the poet Bharathiyar (1882-1921).
export interface AathichudiLine {
  tamil: string;
  meaning: string;
}

// The first 12 lines of the Aathichudi are a lovely match for the 12 vowels
// above: each line starts with a word beginning with the next vowel in order.
export const AATHICHUDI_LINES: AathichudiLine[] = [
  { tamil: 'அறம் செய விரும்பு.', meaning: 'Wish to do good.' },
  { tamil: 'ஆறுவது சினம்.', meaning: 'Let your anger cool down.' },
  { tamil: 'இயல்வது கரவேல்.', meaning: "Don't hide what you're able to give." },
  { tamil: 'ஈவது விலக்கேல்.', meaning: "Don't stop someone else from giving." },
  { tamil: 'உடையது விளம்பேல்.', meaning: "Don't boast about what you own." },
  { tamil: 'ஊக்கமது கைவிடேல்.', meaning: 'Never give up your effort.' },
  { tamil: 'எண் எழுத்து இகழேல்.', meaning: "Don't look down on numbers and letters (education)." },
  { tamil: 'ஏற்பது இகழ்ச்சி.', meaning: 'Begging is shameful.' },
  { tamil: 'ஐயம் இட்டு உண்.', meaning: 'Share your food before you eat.' },
  { tamil: 'ஒப்புரவு ஒழுகு.', meaning: 'Live in harmony with others.' },
  { tamil: 'ஓதுவது ஒழியேல்.', meaning: 'Never stop learning.' },
  { tamil: 'ஔவியம் பேசேல்.', meaning: 'Do not speak with envy.' },
];

export interface Poem {
  id: string;
  title: string;
  author: string;
  lines: string[];
  note: string;
}

export const TAMIL_POEMS: Poem[] = [
  {
    id: 'chinnanjiru-kiliye',
    title: 'சின்னஞ்சிறு கிளியே',
    author: 'Mahakavi Bharathiyar (1882-1921)',
    lines: [
      'சின்னஞ்சிறு கிளியே கண்ணம்மா',
      'செல்வக் களஞ்சியமே',
      'என்னைக் கலிதீர்த்தே உலகில்',
      'ஏற்றம் புரிய வந்தாய்!',
    ],
    note: "A father's loving verse to his young daughter: \"You little parrot, Kannamma, my treasure. You washed away my sorrow and came to lift me up in this world.\"",
  },
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

// ---------- Grammar basics ----------
export interface Pronoun {
  tamil: string;
  transliteration: string;
  meaning: string;
}

export const TAMIL_PRONOUNS: Pronoun[] = [
  { tamil: 'நான்', transliteration: 'nāṉ', meaning: 'I' },
  { tamil: 'நீ', transliteration: 'nī', meaning: 'You (to a friend / child)' },
  { tamil: 'நீங்கள்', transliteration: 'nīṅkaḷ', meaning: 'You (polite, or more than one person)' },
  { tamil: 'அவன்', transliteration: 'avaṉ', meaning: 'He' },
  { tamil: 'அவள்', transliteration: 'avaḷ', meaning: 'She' },
  { tamil: 'அது', transliteration: 'atu', meaning: 'It' },
  { tamil: 'நாங்கள் / நாம்', transliteration: 'nāṅkaḷ / nām', meaning: 'We' },
  { tamil: 'அவர்கள்', transliteration: 'avarkaḷ', meaning: 'They' },
];

export interface PluralExample {
  singular: string;
  plural: string;
  meaning: string;
}

// Tamil usually makes a noun plural simply by adding -கள் (-gal) to the end.
export const PLURAL_EXAMPLES: PluralExample[] = [
  { singular: 'பூ', plural: 'பூக்கள்', meaning: 'flower → flowers' },
  { singular: 'நாய்', plural: 'நாய்கள்', meaning: 'dog → dogs' },
  { singular: 'புத்தகம்', plural: 'புத்தகங்கள்', meaning: 'book → books' },
  { singular: 'மரம்', plural: 'மரங்கள்', meaning: 'tree → trees' },
];

export interface CaseMarker {
  marker: string;
  name: string;
  meaning: string;
  exampleTamil: string;
  exampleMeaning: string;
}

// A handful of the most common endings added to a noun to show its role in
// the sentence (Tamil calls these "வேற்றுமை" — case markers).
export const CASE_MARKERS: CaseMarker[] = [
  {
    marker: '-ஐ',
    name: 'Object marker',
    meaning: 'Added to the thing an action is done to.',
    exampleTamil: 'பந்தை உதைத்தேன்.',
    exampleMeaning: '(I) kicked the ball. — பந்து (ball) + ஐ',
  },
  {
    marker: '-க்கு',
    name: "'To / for'",
    meaning: 'Shows who something is given to, or done for.',
    exampleTamil: 'எனக்கு புத்தகம் கொடு.',
    exampleMeaning: 'Give a book to me. — நான் (I) → எனக்கு (to me)',
  },
  {
    marker: '-இல்',
    name: "'In / at'",
    meaning: 'Shows where something is.',
    exampleTamil: 'வீட்டில் இருக்கிறேன்.',
    exampleMeaning: '(I) am at home. — வீடு (house) + இல்',
  },
];

export interface QuestionWord {
  tamil: string;
  transliteration: string;
  meaning: string;
}

export const QUESTION_WORDS: QuestionWord[] = [
  { tamil: 'என்ன', transliteration: 'eṉṉa', meaning: 'What' },
  { tamil: 'யார்', transliteration: 'yār', meaning: 'Who' },
  { tamil: 'எங்கே', transliteration: 'eṅkē', meaning: 'Where' },
  { tamil: 'எப்போது', transliteration: 'eppōtu', meaning: 'When' },
  { tamil: 'ஏன்', transliteration: 'ēṉ', meaning: 'Why' },
  { tamil: 'எப்படி', transliteration: 'eppaṭi', meaning: 'How' },
];

// A simple worked example of Subject + Object + Verb word order, built word by word.
export interface SentenceBuildStep {
  tamil: string;
  role: string;
}

export const SENTENCE_BUILD_EXAMPLE: SentenceBuildStep[] = [
  { tamil: 'நான்', role: 'Subject (who)' },
  { tamil: 'பந்தை', role: 'Object (what)' },
  { tamil: 'உதைத்தேன்', role: 'Verb (action)' },
];

// ---------- Tricky letter pairs ----------
// Three groups of Tamil letters that sound close enough to confuse learners,
// with a rule of thumb and real words to tell them apart.
export interface TrickyExample {
  word: string;
  meaning: string;
  letterUsed: string;
}

export interface TrickyLetterGroup {
  id: string;
  title: string;
  letters: { letter: string; hint: string }[];
  rule: string;
  examples: TrickyExample[];
}

export const TRICKY_LETTER_GROUPS: TrickyLetterGroup[] = [
  {
    id: 'ra',
    title: 'ர and ற — "small ra" and "big ra"',
    letters: [
      { letter: 'ர', hint: 'a soft, single tap of the tongue — the "r" in "run"' },
      { letter: 'ற', hint: 'a harder, rolled sound — often doubled, as in ற்ற' },
    ],
    rule: "ற் (on its own) never ends a Tamil word — a native word never finishes on this hard sound. Beyond that, the two are usually just learned word by word, and swapping them can completely change the meaning!",
    examples: [
      { word: 'கரி', meaning: 'charcoal / elephant', letterUsed: 'ர' },
      { word: 'கறி', meaning: 'curry (a meat or vegetable dish)', letterUsed: 'ற' },
      { word: 'மரம்', meaning: 'tree', letterUsed: 'ர' },
      { word: 'மற்று', meaning: 'and / also', letterUsed: 'ற (doubled: ற்று)' },
      { word: 'வரி', meaning: 'a line, or a tax', letterUsed: 'ர' },
      { word: 'கற்று', meaning: 'learned (past tense of "to learn")', letterUsed: 'ற (doubled: ற்று)' },
    ],
  },
  {
    id: 'na',
    title: 'ந, ன, ண — three "n" sounds',
    letters: [
      { letter: 'ந', hint: 'soft, tongue behind the teeth — like "n" in "name"' },
      { letter: 'ன', hint: 'tongue further back — a rounder "n"' },
      { letter: 'ண', hint: 'tongue curled back (retroflex) — a harder "n"' },
    ],
    rule: 'A simple, reliable rule: ந is the only one of the three that can start a word. ன and ண never appear at the very beginning of a word — only in the middle or at the end.',
    examples: [
      { word: 'நாய்', meaning: 'dog (starts with ந)', letterUsed: 'ந' },
      { word: 'நான்', meaning: 'I (starts with ந)', letterUsed: 'ந' },
      { word: 'நண்பன்', meaning: 'friend — see all three: ந starts it, ண is in the middle, ன ends it!', letterUsed: 'ந + ண + ன' },
      { word: 'மண்', meaning: 'soil / earth (ends with ண்)', letterUsed: 'ண' },
      { word: 'வான்', meaning: 'sky (ends with ன்)', letterUsed: 'ன' },
    ],
  },
  {
    id: 'la',
    title: 'ல், ள், ழ் — three "l" sounds',
    letters: [
      { letter: 'ல்', hint: 'soft, tongue tip near the teeth — like "l" in "leaf"' },
      { letter: 'ள்', hint: 'tongue curled back (retroflex) — a harder "l"' },
      { letter: 'ழ்', hint: 'a unique Tamil sound, tongue curled further back — not found in English' },
    ],
    rule: 'These three don\'t follow one simple rule — the best way is to learn them word by word, the way every Tamil child does.',
    examples: [
      { word: 'கால்', meaning: 'leg / foot', letterUsed: 'ல்' },
      { word: 'கல்', meaning: 'stone', letterUsed: 'ல்' },
      { word: 'பள்ளி', meaning: 'school', letterUsed: 'ள்' },
      { word: 'வெள்ளை', meaning: 'white', letterUsed: 'ள்' },
      { word: 'வாழை', meaning: 'banana', letterUsed: 'ழ்' },
      { word: 'தமிழ்', meaning: 'the Tamil language itself!', letterUsed: 'ழ்' },
    ],
  },
];

// ---------- "Choose the Right Letter" quiz pool ----------
// Each question blanks out one tricky letter in a real word. The options are
// always the letters from that word's tricky group, so the game stays
// focused on one confusable set at a time.
export interface LetterChoiceQuestion {
  id: string;
  wordWithBlank: string; // uses "_" where the letter is missing
  correctLetter: string;
  options: string[];
  answerWord: string;
  meaning: string;
}

export const LETTER_CHOICE_QUIZ_POOL: LetterChoiceQuestion[] = [
  { id: 'lc1', wordWithBlank: 'க_ி', correctLetter: 'ர', options: ['ர', 'ற'], answerWord: 'கரி', meaning: 'charcoal / elephant' },
  { id: 'lc2', wordWithBlank: 'க_ி', correctLetter: 'ற', options: ['ர', 'ற'], answerWord: 'கறி', meaning: 'curry' },
  { id: 'lc3', wordWithBlank: 'ம_ம்', correctLetter: 'ர', options: ['ர', 'ற'], answerWord: 'மரம்', meaning: 'tree' },
  { id: 'lc4', wordWithBlank: 'வ_ி', correctLetter: 'ர', options: ['ர', 'ற'], answerWord: 'வரி', meaning: 'line / tax' },
  { id: 'lc5', wordWithBlank: 'ம_்று', correctLetter: 'ற', options: ['ர', 'ற'], answerWord: 'மற்று', meaning: 'and / also' },
  { id: 'lc6', wordWithBlank: '_ாய்', correctLetter: 'ந', options: ['ந', 'ன', 'ண'], answerWord: 'நாய்', meaning: 'dog' },
  { id: 'lc7', wordWithBlank: '_ான்', correctLetter: 'ந', options: ['ந', 'ன', 'ண'], answerWord: 'நான்', meaning: 'I' },
  { id: 'lc8', wordWithBlank: 'ம_்', correctLetter: 'ண', options: ['ந', 'ன', 'ண'], answerWord: 'மண்', meaning: 'soil / earth' },
  { id: 'lc9', wordWithBlank: 'வா_்', correctLetter: 'ன', options: ['ந', 'ன', 'ண'], answerWord: 'வான்', meaning: 'sky' },
  { id: 'lc10', wordWithBlank: 'நண்ப_்', correctLetter: 'ன', options: ['ந', 'ன', 'ண'], answerWord: 'நண்பன்', meaning: 'friend' },
  { id: 'lc11', wordWithBlank: 'கா_்', correctLetter: 'ல', options: ['ல', 'ள', 'ழ'], answerWord: 'கால்', meaning: 'leg / foot' },
  { id: 'lc12', wordWithBlank: 'க_்', correctLetter: 'ல', options: ['ல', 'ள', 'ழ'], answerWord: 'கல்', meaning: 'stone' },
  { id: 'lc13', wordWithBlank: 'ப_்ளி', correctLetter: 'ள', options: ['ல', 'ள', 'ழ'], answerWord: 'பள்ளி', meaning: 'school' },
  { id: 'lc14', wordWithBlank: 'வெ_்ளை', correctLetter: 'ள', options: ['ல', 'ள', 'ழ'], answerWord: 'வெள்ளை', meaning: 'white' },
  { id: 'lc15', wordWithBlank: 'வா_ை', correctLetter: 'ழ', options: ['ல', 'ள', 'ழ'], answerWord: 'வாழை', meaning: 'banana' },
  { id: 'lc16', wordWithBlank: 'தமி_்', correctLetter: 'ழ', options: ['ல', 'ள', 'ழ'], answerWord: 'தமிழ்', meaning: 'the Tamil language' },
];
