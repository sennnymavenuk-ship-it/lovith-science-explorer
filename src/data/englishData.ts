export interface PartOfSpeech {
  id: string;
  name: string;
  definition: string;
  example: string; // full sentence
  highlighted: string; // the exact word inside `example` to highlight
  color: string; // tailwind text colour class
}

export const PARTS_OF_SPEECH: PartOfSpeech[] = [
  {
    id: 'noun',
    name: 'Noun',
    definition: 'A word that names a person, place, animal or thing.',
    example: 'The dog ran across the field.',
    highlighted: 'dog',
    color: 'text-rose-300',
  },
  {
    id: 'pronoun',
    name: 'Pronoun',
    definition: 'A word used in place of a noun, like he, she, it or they.',
    example: 'Maya was tired, so she went to sleep.',
    highlighted: 'she',
    color: 'text-amber-300',
  },
  {
    id: 'verb',
    name: 'Verb',
    definition: 'A word that shows an action or a state of being.',
    example: 'The children played in the park.',
    highlighted: 'played',
    color: 'text-emerald-300',
  },
  {
    id: 'adjective',
    name: 'Adjective',
    definition: 'A word that describes a noun.',
    example: 'She wore a bright red jacket.',
    highlighted: 'red',
    color: 'text-sky-300',
  },
  {
    id: 'adverb',
    name: 'Adverb',
    definition: 'A word that describes a verb, an adjective, or another adverb, often telling how, when or where.',
    example: 'The turtle moved slowly across the sand.',
    highlighted: 'slowly',
    color: 'text-violet-300',
  },
  {
    id: 'preposition',
    name: 'Preposition',
    definition: 'A word that shows the relationship between a noun and other words, often about place or time.',
    example: 'The cat is sitting under the table.',
    highlighted: 'under',
    color: 'text-cyan-300',
  },
  {
    id: 'conjunction',
    name: 'Conjunction',
    definition: 'A word that joins words, phrases or sentences together.',
    example: 'I wanted to play outside, but it started raining.',
    highlighted: 'but',
    color: 'text-lime-300',
  },
  {
    id: 'interjection',
    name: 'Interjection',
    definition: 'A short word or phrase that shows strong feeling or surprise.',
    example: 'Wow, that rainbow is beautiful!',
    highlighted: 'Wow',
    color: 'text-fuchsia-300',
  },
];

export interface SentenceType {
  id: string;
  name: string;
  purpose: string;
  endsWith: string;
  example: string;
}

export const SENTENCE_TYPES: SentenceType[] = [
  { id: 'declarative', name: 'Declarative (Statement)', purpose: 'Tells us something.', endsWith: '.', example: 'The sun rises in the east.' },
  { id: 'interrogative', name: 'Interrogative (Question)', purpose: 'Asks something.', endsWith: '?', example: 'Where did you keep my pencil?' },
  { id: 'exclamatory', name: 'Exclamatory (Exclamation)', purpose: 'Shows strong feeling.', endsWith: '!', example: "We won the match!" },
  { id: 'imperative', name: 'Imperative (Command)', purpose: 'Gives an instruction or request.', endsWith: '. / !', example: 'Please close the door.' },
];

export interface PunctuationMark {
  symbol: string;
  name: string;
  use: string;
}

export const PUNCTUATION_MARKS: PunctuationMark[] = [
  { symbol: '.', name: 'Full Stop / Period', use: 'Ends a statement.' },
  { symbol: ',', name: 'Comma', use: 'Separates items in a list, or short pauses in a sentence.' },
  { symbol: '?', name: 'Question Mark', use: 'Ends a question.' },
  { symbol: '!', name: 'Exclamation Mark', use: 'Shows strong feeling or surprise.' },
  { symbol: "'", name: 'Apostrophe', use: "Shows a short form (don't) or belonging (Maya's book)." },
  { symbol: '"', name: 'Quotation Marks', use: 'Shows the exact words someone said.' },
];

export interface TenseExample {
  id: 'past' | 'present' | 'future';
  name: string;
  explanation: string;
  example: string;
}

export const TENSES: TenseExample[] = [
  { id: 'past', name: 'Past Tense', explanation: 'Something that already happened.', example: 'I played football yesterday.' },
  { id: 'present', name: 'Present Tense', explanation: 'Something happening now, or a general truth.', example: 'I play football every day.' },
  { id: 'future', name: 'Future Tense', explanation: 'Something that will happen later.', example: 'I will play football tomorrow.' },
];

// Pool for the "Spot the Part of Speech" quiz: a sentence, one highlighted
// word, and which part of speech that word is.
export interface GrammarQuizEntry {
  id: string;
  sentence: string;
  word: string; // the word to ask about (must appear in `sentence`)
  answer: string; // matches a PartOfSpeech id
}

export const GRAMMAR_QUIZ_POOL: GrammarQuizEntry[] = [
  { id: 'q1', sentence: 'The elephant walked slowly to the river.', word: 'elephant', answer: 'noun' },
  { id: 'q2', sentence: 'She quickly finished her homework.', word: 'quickly', answer: 'adverb' },
  { id: 'q3', sentence: 'The tall boy scored a goal.', word: 'tall', answer: 'adjective' },
  { id: 'q4', sentence: 'They laughed at the funny joke.', word: 'laughed', answer: 'verb' },
  { id: 'q5', sentence: 'He forgot his umbrella at home.', word: 'He', answer: 'pronoun' },
  { id: 'q6', sentence: 'I wanted ice cream, but the shop was closed.', word: 'but', answer: 'conjunction' },
  { id: 'q7', sentence: 'Ouch, that really hurt!', word: 'Ouch', answer: 'interjection' },
  { id: 'q8', sentence: 'The cat is hiding under the bed.', word: 'under', answer: 'preposition' },
  { id: 'q9', sentence: 'My little sister loves to sing.', word: 'sister', answer: 'noun' },
  { id: 'q10', sentence: 'The rabbit hopped quietly through the grass.', word: 'quietly', answer: 'adverb' },
  { id: 'q11', sentence: 'We saw a beautiful sunset yesterday.', word: 'beautiful', answer: 'adjective' },
  { id: 'q12', sentence: 'The children built a sandcastle at the beach.', word: 'built', answer: 'verb' },
];
