import { IndiaRegion } from '../types';

// India: 28 states and 8 Union Territories.
// The map package draws Ladakh together with Jammu and Kashmir, and draws
// Dadra and Nagar Haveli and Daman and Diu as two pieces, so we describe them
// the way the map draws them.
export const INDIA_REGIONS: IndiaRegion[] = [
  { id: 'an', name: 'Andaman and Nicobar Islands', type: 'Union Territory', capital: 'Sri Vijaya Puram', shapeIds: ['an'], small: true, note: 'A chain of islands in the Bay of Bengal. Its capital used to be called Port Blair and was renamed Sri Vijaya Puram in 2024.' },
  { id: 'ap', name: 'Andhra Pradesh', type: 'State', capital: 'Amaravati', shapeIds: ['ap'] },
  { id: 'ar', name: 'Arunachal Pradesh', type: 'State', capital: 'Itanagar', shapeIds: ['ar'] },
  { id: 'as', name: 'Assam', type: 'State', capital: 'Dispur', shapeIds: ['as'] },
  { id: 'br', name: 'Bihar', type: 'State', capital: 'Patna', shapeIds: ['br'] },
  { id: 'ch', name: 'Chandigarh', type: 'Union Territory', capital: 'Chandigarh', shapeIds: ['ch'], small: true, note: 'Chandigarh is also the capital of Punjab and Haryana.' },
  { id: 'ct', name: 'Chhattisgarh', type: 'State', capital: 'Raipur', shapeIds: ['ct'] },
  { id: 'dnhdd', name: 'Dadra and Nagar Haveli and Daman and Diu', type: 'Union Territory', capital: 'Daman', shapeIds: ['dn', 'dd'], small: true, note: 'These two Union Territories joined together in 2020. The map still draws them as two tiny pieces.' },
  { id: 'dl', name: 'Delhi', type: 'Union Territory', capital: 'New Delhi', shapeIds: ['dl'], small: true, note: 'New Delhi is also the capital of India.' },
  { id: 'ga', name: 'Goa', type: 'State', capital: 'Panaji', shapeIds: ['ga'], small: true, note: 'Goa is the smallest state in India by area.' },
  { id: 'gj', name: 'Gujarat', type: 'State', capital: 'Gandhinagar', shapeIds: ['gj'] },
  { id: 'hr', name: 'Haryana', type: 'State', capital: 'Chandigarh', shapeIds: ['hr'] },
  { id: 'hp', name: 'Himachal Pradesh', type: 'State', capital: 'Shimla', shapeIds: ['hp'] },
  { id: 'jk', name: 'Jammu and Kashmir', type: 'Union Territory', capital: 'Srinagar (summer) and Jammu (winter)', shapeIds: ['jk'], note: 'On this map, Ladakh is drawn together with Jammu and Kashmir. Since 2019 they are two separate Union Territories. The capital of Ladakh is Leh.' },
  { id: 'jh', name: 'Jharkhand', type: 'State', capital: 'Ranchi', shapeIds: ['jh'] },
  { id: 'ka', name: 'Karnataka', type: 'State', capital: 'Bengaluru', shapeIds: ['ka'] },
  { id: 'kl', name: 'Kerala', type: 'State', capital: 'Thiruvananthapuram', shapeIds: ['kl'] },
  { id: 'ld', name: 'Lakshadweep', type: 'Union Territory', capital: 'Kavaratti', shapeIds: ['ld'], small: true, note: 'A group of tiny islands in the Arabian Sea. Look for the small orange dots off the west coast.' },
  { id: 'mp', name: 'Madhya Pradesh', type: 'State', capital: 'Bhopal', shapeIds: ['mp'] },
  { id: 'mh', name: 'Maharashtra', type: 'State', capital: 'Mumbai', shapeIds: ['mh'] },
  { id: 'mn', name: 'Manipur', type: 'State', capital: 'Imphal', shapeIds: ['mn'], small: true },
  { id: 'ml', name: 'Meghalaya', type: 'State', capital: 'Shillong', shapeIds: ['ml'] },
  { id: 'mz', name: 'Mizoram', type: 'State', capital: 'Aizawl', shapeIds: ['mz'] },
  { id: 'nl', name: 'Nagaland', type: 'State', capital: 'Kohima', shapeIds: ['nl'], small: true },
  { id: 'or', name: 'Odisha', type: 'State', capital: 'Bhubaneswar', shapeIds: ['or'] },
  { id: 'py', name: 'Puducherry', type: 'Union Territory', capital: 'Puducherry', shapeIds: ['py'], small: true, note: 'Puducherry is made of four small pockets of land: Puducherry, Karaikal, Mahé and Yanam.' },
  { id: 'pb', name: 'Punjab', type: 'State', capital: 'Chandigarh', shapeIds: ['pb'] },
  { id: 'rj', name: 'Rajasthan', type: 'State', capital: 'Jaipur', shapeIds: ['rj'] },
  { id: 'sk', name: 'Sikkim', type: 'State', capital: 'Gangtok', shapeIds: ['sk'], small: true },
  { id: 'tn', name: 'Tamil Nadu', type: 'State', capital: 'Chennai', shapeIds: ['tn'] },
  { id: 'tg', name: 'Telangana', type: 'State', capital: 'Hyderabad', shapeIds: ['tg'] },
  { id: 'tr', name: 'Tripura', type: 'State', capital: 'Agartala', shapeIds: ['tr'], small: true },
  { id: 'up', name: 'Uttar Pradesh', type: 'State', capital: 'Lucknow', shapeIds: ['up'] },
  { id: 'ut', name: 'Uttarakhand', type: 'State', capital: 'Dehradun', shapeIds: ['ut'] },
  { id: 'wb', name: 'West Bengal', type: 'State', capital: 'Kolkata', shapeIds: ['wb'] },
];