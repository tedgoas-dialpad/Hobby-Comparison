export const CRITERIA = [
  'Fits into my schedule',
  'Happens often',
  'Can involve the kids',
  'Is cheap',
  'Gives me meaning',
  'Gives me emotional energy',
  'Has a positive or tangible result',
  'Can scale up or down based on time or energy'
] as const;

export type Criterion = typeof CRITERIA[number];

export interface Hobby {
  id: string;
  name: string;
  scores: Record<Criterion, number | null>;
  color: string;
}

export const HOBBY_COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
] as const;
