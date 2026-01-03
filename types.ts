export enum MasteryLevel {
  Unknown = 'UNKNOWN',
  Basic = 'BASIC',
  Mastered = 'MASTERED',
}

export interface Skill {
  id: number;
  category: string;
  name: string;
  difficulty: string; // "Entry", "Basic", "Advanced", "High"
  difficultyLevel: number; // 1-5 for sorting
  cnLevel: number; // 1-6, corresponding to China Badminton Levels
  checkPoints: string;
  commonMistakes: string;
  videoUrl?: string; // Placeholder for future video integration
}

export type UserProgress = Record<number, MasteryLevel>;

export interface StatSummary {
  total: number;
  mastered: number;
  basic: number;
  unknown: number;
  score: number; // Weighted score
}