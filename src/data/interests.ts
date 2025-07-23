export const interestsList = [
  'football',
  'videoGames', 
  'technology',
  'pcBuilding',
  'running',
  'natureTrekking',
] as const;

export type InterestKey = typeof interestsList[number];