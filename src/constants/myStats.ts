import leetcode_icon from '../app/assets/leetcode_icon.png';
import programmers_icon from '../app/assets/programmers_icon.jpg';

export const CODING_STATS = [
  { platform: 'Programmers', tier: '', level: 'Lv.2 ~ 3', solved: 117, target: 150, color: 'bg-blue-500', logo: programmers_icon },
  { platform: 'LeetCode', tier: '', level: 'Easy ~ Medium', solved: 13, target: 50, color: 'bg-yellow-300', logo: leetcode_icon },
];

export const MOCK_GITHUB_CONTRIBUTIONS = Array.from({ length: 30 }).map(() => 
  Math.floor(Math.random() * 5)
);