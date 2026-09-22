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

// ---------- Word Problems ----------
// Each problem pairs a real photo with a short story, so the numbers being
// added, subtracted, multiplied or divided are tied to something a child can
// picture. Photos are from Unsplash (see the credit line where this is used).
export interface WordProblem {
  id: string;
  image: { url: string; alt: string; credit: string; creditUrl: string };
  operation: OperationId;
  story: string;
  answer: number;
  options: number[];
}

export const WORD_PROBLEMS: WordProblem[] = [
  {
    id: 'apples',
    image: {
      url: 'https://images.unsplash.com/photo-1610397962076-02407a169a5b?auto=format&fit=crop&q=80&w=800',
      alt: 'A pile of red and green apples',
      credit: 'James Yarema',
      creditUrl: 'https://unsplash.com/photos/P2X7NDx_GP0',
    },
    operation: 'add',
    story: 'Mia has 4 red apples and 3 green apples. How many apples does she have in total?',
    answer: 7,
    options: [5, 6, 7, 8],
  },
  {
    id: 'balloons',
    image: {
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
      alt: 'Colourful balloons floating close together',
      credit: 'Adi Goldstein',
      creditUrl: 'https://unsplash.com/photos/Hli3R6LKibo',
    },
    operation: 'add',
    story: 'There are 6 balloons at the party already. Dad brings 5 more. How many balloons are there now?',
    answer: 11,
    options: [9, 10, 11, 12],
  },
  {
    id: 'stickers',
    image: {
      url: 'https://images.unsplash.com/photo-1621252756235-7f37e5e5125e?auto=format&fit=crop&q=80&w=800',
      alt: 'An assortment of colourful stickers',
      credit: 'Jon Tyson',
      creditUrl: 'https://unsplash.com/photos/rW854PQU3ts',
    },
    operation: 'add',
    story: 'Priya has 23 stickers in her book. Her friend gives her 15 more. How many stickers does she have now?',
    answer: 38,
    options: [33, 35, 38, 40],
  },
  {
    id: 'cookies',
    image: {
      url: 'https://images.unsplash.com/photo-1589431683447-2c0abd8d99e2?auto=format&fit=crop&q=80&w=800',
      alt: 'Chocolate chip cookies on a plate',
      credit: 'Lindsey Savage',
      creditUrl: 'https://unsplash.com/photos/8DWN4Gui9Yk',
    },
    operation: 'subtract',
    story: 'There are 10 cookies on a plate. The children eat 4 of them. How many cookies are left?',
    answer: 6,
    options: [4, 5, 6, 7],
  },
  {
    id: 'birds',
    image: {
      url: 'https://images.unsplash.com/photo-1707117197080-c232d42fa98a?auto=format&fit=crop&q=80&w=800',
      alt: 'Two birds sitting on a wire against a blue sky',
      credit: 'Sandeep',
      creditUrl: 'https://unsplash.com/photos/HLdEPHc4LvY',
    },
    operation: 'subtract',
    story: '12 birds are sitting on a wire. 5 of them fly away. How many birds are left on the wire?',
    answer: 7,
    options: [6, 7, 8, 17],
  },
  {
    id: 'books',
    image: {
      url: 'https://images.unsplash.com/photo-1728583764656-8e7b05ecc891?auto=format&fit=crop&q=80&w=800',
      alt: 'A stack of books on a wooden table',
      credit: 'Kolby Milton',
      creditUrl: 'https://unsplash.com/photos/VbqndExxLJU',
    },
    operation: 'subtract',
    story: 'A library shelf has 45 books. Students borrow 18 of them. How many books are left on the shelf?',
    answer: 27,
    options: [23, 27, 29, 33],
  },
  {
    id: 'flowerpots',
    image: {
      url: 'https://images.unsplash.com/photo-1652544686730-b752801d2cd6?auto=format&fit=crop&q=80&w=800',
      alt: 'Rows of flower pots on the ground',
      credit: 'Vishwanth Pindiboina',
      creditUrl: 'https://unsplash.com/photos/MGEuluicWRM',
    },
    operation: 'multiply',
    story: 'There are 4 flower pots on the balcony. Each pot has 3 flowers. How many flowers are there in total?',
    answer: 12,
    options: [7, 10, 12, 16],
  },
  {
    id: 'pencils',
    image: {
      url: 'https://images.unsplash.com/photo-1610137443853-060547517c66?auto=format&fit=crop&q=80&w=800',
      alt: 'Blue, green and yellow coloured pencils',
      credit: 'Lucas George Wendt',
      creditUrl: 'https://unsplash.com/photos/ZSV6k4O_Zwk',
    },
    operation: 'multiply',
    story: 'Each box holds 6 coloured pencils. There are 5 boxes. How many pencils are there in total?',
    answer: 30,
    options: [11, 25, 30, 35],
  },
  {
    id: 'candy',
    image: {
      url: 'https://images.unsplash.com/photo-1687499466474-df90c4d7a54a?auto=format&fit=crop&q=80&w=800',
      alt: 'Colourful lollipops in a glass jar',
      credit: 'Christine Tan',
      creditUrl: 'https://unsplash.com/photos/yxieo9QaLEk',
    },
    operation: 'divide',
    story: 'There are 20 lollipops in a jar. They are shared equally among 4 friends. How many lollipops does each friend get?',
    answer: 5,
    options: [4, 5, 6, 8],
  },
  {
    id: 'eggs',
    image: {
      url: 'https://images.unsplash.com/photo-1647814268100-66878ccd4666?auto=format&fit=crop&q=80&w=800',
      alt: 'A basket filled with eggs',
      credit: 'Thalia Ruiz',
      creditUrl: 'https://unsplash.com/photos/5z6Dh51huaI',
    },
    operation: 'divide',
    story: 'A farmer has 48 eggs. She packs them equally into 6 baskets. How many eggs go in each basket?',
    answer: 8,
    options: [6, 7, 8, 9],
  },
];
