export type ContinentId =
  | 'asia'
  | 'africa'
  | 'north-america'
  | 'south-america'
  | 'antarctica'
  | 'europe'
  | 'oceania';

// Every country in the map data, sorted into a continent.
// Countries that stretch over two continents (Russia, Turkey, Kazakhstan,
// Georgia, Armenia, Azerbaijan, Cyprus) are coloured by their larger part or by
// the United Nations grouping, which puts them in Asia.
const COUNTRIES_BY_CONTINENT: Record<ContinentId, string[]> = {
  asia: [
    'Afghanistan', 'Armenia', 'Azerbaijan', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China',
    'Cyprus', 'N. Cyprus', 'Georgia', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan',
    'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Mongolia', 'Myanmar', 'Nepal',
    'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Russia', 'Saudi Arabia',
    'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey',
    'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen',
  ],
  africa: [
    'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Central African Rep.',
    'Chad', 'Congo', "Côte d'Ivoire", 'Dem. Rep. Congo', 'Djibouti', 'Egypt', 'Eq. Guinea', 'Eritrea',
    'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia',
    'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Morocco', 'Mozambique', 'Namibia', 'Niger',
    'Nigeria', 'Rwanda', 'S. Sudan', 'Senegal', 'Sierra Leone', 'Somalia', 'Somaliland', 'South Africa',
    'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'W. Sahara', 'Zambia', 'Zimbabwe', 'eSwatini',
  ],
  europe: [
    'Albania', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herz.', 'Bulgaria', 'Croatia', 'Czechia',
    'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy',
    'Kosovo', 'Latvia', 'Lithuania', 'Luxembourg', 'Macedonia', 'Moldova', 'Montenegro', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Romania', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
    'Switzerland', 'Ukraine', 'United Kingdom',
  ],
  'north-america': [
    'Bahamas', 'Belize', 'Canada', 'Costa Rica', 'Cuba', 'Dominican Rep.', 'El Salvador', 'Greenland',
    'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Nicaragua', 'Panama', 'Puerto Rico',
    'Trinidad and Tobago', 'United States of America',
  ],
  'south-america': [
    'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Falkland Is.', 'Guyana', 'Paraguay',
    'Peru', 'Suriname', 'Uruguay', 'Venezuela',
  ],
  oceania: ['Australia', 'Fiji', 'New Caledonia', 'New Zealand', 'Papua New Guinea', 'Solomon Is.', 'Vanuatu'],
  antarctica: ['Antarctica'],
};

const CONTINENT_BY_COUNTRY = new Map<string, ContinentId>();
for (const [continent, countries] of Object.entries(COUNTRIES_BY_CONTINENT)) {
  for (const country of countries) CONTINENT_BY_COUNTRY.set(country, continent as ContinentId);
}

// Returns null for the few places that belong to no continent (islands far out at sea)
export function continentOf(countryName: string): ContinentId | null {
  return CONTINENT_BY_COUNTRY.get(countryName) ?? null;
}

// Same colours as the size bars in the Continent Explorer
export const GLOBE_COLORS: Record<ContinentId, { fill: string; bright: string }> = {
  asia: { fill: '#fb7185', bright: '#fecdd3' },
  africa: { fill: '#fbbf24', bright: '#fde68a' },
  'north-america': { fill: '#38bdf8', bright: '#bae6fd' },
  'south-america': { fill: '#a3e635', bright: '#d9f99d' },
  antarctica: { fill: '#e2e8f0', bright: '#ffffff' },
  europe: { fill: '#a78bfa', bright: '#ddd6fe' },
  oceania: { fill: '#2dd4bf', bright: '#99f6e4' },
};

export const GLOBE_LABELS: Record<ContinentId, string> = {
  asia: 'Asia',
  africa: 'Africa',
  'north-america': 'North America',
  'south-america': 'South America',
  antarctica: 'Antarctica',
  europe: 'Europe',
  oceania: 'Oceania',
};

// A spot well inside each continent: [longitude, latitude].
// The globe turns to face it, and the name label sits on it.
export const FOCUS_POINTS: Record<ContinentId, [number, number]> = {
  asia: [85, 35],
  africa: [20, 5],
  'north-america': [-100, 45],
  'south-america': [-60, -15],
  antarctica: [0, -85],
  europe: [15, 50],
  oceania: [135, -25],
};

export const CONTINENT_ORDER: ContinentId[] = [
  'asia', 'africa', 'north-america', 'south-america', 'antarctica', 'europe', 'oceania',
];
