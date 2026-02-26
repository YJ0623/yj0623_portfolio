// src/components/GithubGrassWidget.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const getGrassColor = (level: number) => {
  switch (level) {
    case 1: return 'bg-emerald-200';
    case 2: return 'bg-emerald-400';
    case 3: return 'bg-emerald-600';
    case 4: return 'bg-emerald-800';
    default: return 'bg-gray-100';
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.015 } },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0, scale: 0.2 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 15 } },
};

export default function GithubGrassWidget() {
  const [contributions, setContributions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const res = await fetch('/api/github');
        const data = await res.json();
        setContributions(data.levels);
      } catch (error) {
        console.error('Failed to fetch github data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGithubData();
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">GitHub Contributions</h3>
        <span className="text-xs text-gray-400 font-medium">Last 105 days</span>
      </div>
      
      {/* 로딩 중일 때는 회색 스켈레톤, 완료되면 애니메이션 잔디 렌더링 */}
      {isLoading ? (
        <div className="grid grid-rows-7 grid-flow-col gap-[3px] animate-pulse">
          {Array.from({ length: 105 }).map((_, i) => (
             <div key={i} className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] bg-gray-100" />
          ))}
        </div>
      ) : (
        <motion.div 
          className="grid grid-rows-7 grid-flow-col gap-[3px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {contributions.map((level, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] ${getGrassColor(level)}`}
            />
          ))}
        </motion.div>
      )}

      {/* 범례는 이전과 동일 */}
      <div className="mt-4 flex items-center justify-end gap-1 text-[10px] text-gray-500">
        <span>Less</span>
        <div className="w-2.5 h-2.5 rounded-[2px] bg-gray-100" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-200" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-800" />
        <span>More</span>
      </div>
    </div>
  );
}