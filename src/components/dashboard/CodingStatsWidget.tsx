'use client';

import { motion } from 'framer-motion';
import { CODING_STATS } from '@/src/constants/myStats';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function CodingStatsWidget() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-gray-800">Algorithm Stats</h3>
        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
          EXP 보드
        </span>
      </div>

      <motion.div 
        className="flex flex-col gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {CODING_STATS.map((stat, index) => {
          const percentage = Math.min((stat.solved / stat.target) * 100, 100);

          return (
            <motion.div key={index} variants={itemVariants} className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold ${stat.color}`}>
                    {stat.logo}
                  </div>
                  <span className="font-semibold text-gray-700 text-sm">{stat.platform}</span>
                </div>
                <div className="text-xs font-bold text-gray-800">
                  {stat.tier} <span className="text-gray-400 font-normal ml-1">Tier</span>
                </div>
              </div>

              <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden mt-1">
                <motion.div
                  className={`absolute top-0 left-0 h-full rounded-full ${stat.color}`}
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${percentage}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-gray-500 font-medium">
                <span>{stat.solved} Solved</span>
                <span>Target: {stat.target}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}