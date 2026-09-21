export type TopicId = 'home' | 'digestive' | 'solar' | 'living' | 'plants' | 'pollution' | 'social';

export interface QuickTopic {
  id: TopicId;
  title: string;
  tagline: string;
  iconName: string;
  color: string;
  bgLight: string;
  description: string;
}

export interface DigestiveStep {
  id: string;
  number: number;
  name: string;
  organ: string;
  description: string;
  duration: string;
  funFact: string;
  color: string;
}

export interface Planet {
  id: string;
  name: string;
  type: 'Terrestrial' | 'Gas Giant' | 'Ice Giant';
  relativeSize: number; // 1 to 10 visual scale indicator
  distanceFromSun: string; // e.g. "149.6 million km (1 AU)"
  satellites: number;
  funFact: string;
  temperature: string;
  orbitPeriod: string;
  color: string;
  glowColor: string;
}

export interface LivingCharacteristic {
  id: string;
  title: string;
  iconName: string;
  description: string;
  example: string;
}

export interface ComparisonItem {
  id: string;
  name: string;
  category: 'living' | 'non-living';
  iconName: string;
  reason: string;
  funDetail: string;
}

export interface PlantType {
  id: string;
  category: string;
  title: string;
  examples: string[];
  iconName: string;
  uses: string[];
  description: string;
  color: string;
}

export interface PlantPart {
  id: string;
  name: string;
  function: string;
  details: string;
  iconName: string;
}

export interface PollutionCategory {
  id: string;
  name: string;
  iconName: string;
  causes: string[];
  effects: string[];
  tips: { id: string; text: string; impact: string }[];
  color: string;
  bgColor: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: TopicId;
}

export interface Continent {
  id: string;
  name: string;
  emoji: string;
  sizeRank: number;
  areaValue: number; // million km², used to draw the size bars
  people: string;
  countries: string;
  famousPlace: string;
  animals: string;
  funFact: string;
  barColor: string;
  textColor: string;
}

export interface IndiaRegion {
  id: string;
  name: string;
  type: 'State' | 'Union Territory';
  capital: string;
  shapeIds: string[]; // ids of the shapes in the @svg-maps/india package
  small?: boolean; // too small to tap reliably, so it is left out of the game
  note?: string;
}