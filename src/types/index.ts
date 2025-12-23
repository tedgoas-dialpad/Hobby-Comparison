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
  '#4A90E2', // Blue
  '#4CAF50', // Green
] as const;
