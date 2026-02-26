export const CODING_STATS = [
  { platform: 'Programmers', tier: '' , level: 'Lv.2 ~ 3', solved: 120, target: 150, color: 'bg-blue-500', logo: '' },
  { platform: 'LeetCode', tier: '', level: 'Medium', solved: 45, target: 100, color: 'bg-yellow-500', logo: '' },
];

export const MOCK_GITHUB_CONTRIBUTIONS = Array.from({ length: 30 }).map(() => 
  Math.floor(Math.random() * 5)
);