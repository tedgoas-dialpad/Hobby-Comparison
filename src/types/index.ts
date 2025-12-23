export const CRITERIA = [
  'Fits into my schedule',
  'Happens often',
  'Involves the kids',
  'Is cheap',
  'Gives me meaning',
  'Gives me energy',
  'Has positive result'
] as const;

export type Criterion = typeof CRITERIA[number];

export interface Hobby {
  id: string;
  name: string;
  scores: Record<Criterion, number | null>;
  color: string;
}

export const HOBBY_COLORS = [
  '#FF6B6B', // Hot Red
  '#FFD93D', // Vivid Yellow
  '#C4B5FD', // Soft Violet
] as const;
