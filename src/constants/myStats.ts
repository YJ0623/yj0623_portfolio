export const CODING_STATS = [
  { platform: 'Programmers', level: 'Lv.2 ~ 3', solved: 120, target: 150, color: 'bg-blue-500' },
  { platform: 'LeetCode', level: 'Medium', solved: 45, target: 100, color: 'bg-yellow-500' },
];

export const MOCK_GITHUB_CONTRIBUTIONS = Array.from({ length: 30 }).map(() => 
  Math.floor(Math.random() * 5)
);