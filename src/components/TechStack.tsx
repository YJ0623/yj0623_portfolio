"use client";
import { useState } from 'react';
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTypescript, SiTailwindcss, 
  SiMysql, SiCplusplus, SiC, 
  SiNextdotjs,
  SiZedindustries,
  SiVercel
} from 'react-icons/si';

type Category = 'all' | 'frontend' | 'backend';

const techData = [
  // Frontend
  { name: 'HTML5', category: 'frontend', icon: <SiHtml5 className="text-[#E34F26]" /> },
  { name: 'CSS3', category: 'frontend', icon: <SiCss3 className="text-[#1572B6]" /> },
  { name: 'JavaScript', category: 'frontend', icon: <SiJavascript className="text-[#F7DF1E]" /> },
  { name: 'React', category: 'frontend', icon: <SiReact className="text-[#61DAFB]" /> },
  { name: 'TypeScript', category: 'frontend', icon: <SiTypescript className="text-[#3178C6]" /> },
  { name: 'Tailwind CSS', category: 'frontend', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
  { name: 'Next.js', category: 'frontend', icon: <SiNextdotjs className="text-[#000000]" /> },
  { name: 'Vercel', category: 'frontend', icon: <SiVercel className="text-[#000000]" /> },
  // Backend
  { name: 'MySQL', category: 'backend', icon: <SiMysql className="text-[#4479A1]" /> },
  { name: 'C', category: 'backend', icon: <SiC className="text-[#A8B9CC]" /> },
  { name: 'C++', category: 'backend', icon: <SiCplusplus className="text-[#00599C]" /> },
];

export const TechStack = () => {
  const [filter, setFilter] = useState<Category>('all');

  const filteredData = filter === 'all' 
    ? techData 
    : techData.filter(item => item.category === filter);

  return (
    <div className="bg-white/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h3 className="text-2xl font-semibold text-[#BF092F]">Tech Stack</h3>
        
        {/* 필터 버튼 */}
        <div className="flex bg-gray-200/50 p-1 rounded-full text-sm font-medium">
          {['all', 'frontend', 'backend'].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option as Category)}
              className={`px-4 py-2 rounded-full capitalize transition-all duration-300  cursor-pointer ${
                filter === option 
                  ? 'bg-white text-[#BF092F] shadow-sm font-bold' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* 기술 스택 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {filteredData.map((tech) => (
          <div key={tech.name} className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-100 hover:border-[#BF092F]/30 hover:shadow-sm transition group">
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {tech.icon}
            </div>
            <span className="text-sm font-medium text-gray-600">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};