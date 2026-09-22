export type OperationId = 'add' | 'subtract' | 'multiply' | 'divide';

export interface OperationInfo {
  id: OperationId;
  name: string;
  symbol: string;
  definition: string;
  analogy: string;
  example: string; // a short worked example shown on the overview card
}

export const OPERATIONS: OperationInfo[] = [
  {
    id: 'add',
    name: 'Addition',
    symbol: '+',
    definition: 'Addition means putting two groups together to find the total.',
    analogy: 'If you have 3 apples and get 2 more, how many apples do you have?',
    example: '3 + 2 = 5',
  },
  {
    id: 'subtract',
    name: 'Subtraction',
    symbol: '−',
    definition: 'Subtraction means taking some away from a group to find what is left.',
    analogy: 'If you have 5 apples and give away 2, how many are left?',
    example: '5 − 2 = 3',
  },
  {
    id: 'multiply',
    name: 'Multiplication',
    symbol: '×',
    definition: 'Multiplication means adding the same number again and again, a set number of times.',
    analogy: 'If 3 friends each have 4 stickers, how many stickers in total?',
    example: '3 × 4 = 12',
  },
  {
    id: 'divide',
    name: 'Division',
    symbol: '÷',
    definition: 'Division means sharing a group equally into smaller groups.',
    analogy: 'If you share 12 candies equally between 4 friends, how many does each get?',
    example: '12 ÷ 4 = 3',
  },
];
