/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from 'react';
import { TechStack } from '../components/TechStack';
import { useLanguageStore } from '@/store/useLanguageStore';
import { ProjectData, projectsData } from '../constants/projectData';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '../components/layout/Navbar';
import { TypingTitle } from '../components/TypingTitle';
import { ProjectModal } from '../components/ProjectModal';
import { BsLink45Deg } from 'react-icons/bs';

// Main Page Layout
export const MainPage = () => {
    const { t, language } = useLanguageStore(); // Use the language store
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null); // 모달 상태


  return (
    <div className="bg-[#EFECE3] min-h-screen font-sans selection:bg-[#BF092F] selection:text-white">
      <Navbar />
      {/* Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      <section className="h-screen flex flex-col justify-center px-6 md:px-20">
        <h1 className="text-[30px] font-bold mb-5">{t.hero.role}</h1>
        <div className="max-w-4xl min-h-[400px]">
          <TypingTitle />
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <h2 className="text-[40px] font-bold mb-12 border-l-4 border-[#BF092F] pl-4">{t.profile.title}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 text-lg">
            <div className="bg-white/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold mb-4 text-[#BF092F]">{t.profile.about}</h3>
              <ul className="space-y-3 font-medium text-gray-800">
                <li>{t.profile.education}</li>
                <li>📧 hghk0046@gmail.com</li>
                <li>📞 010-6317-4781</li>
              </ul>
            </div>
          </div>
          <TechStack />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <h2 className="text-[40px] font-bold mb-12 border-l-4 border-[#BF092F] pl-4">{t.projects.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div key={project.id} className="bg-white h-[500px] rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300 overflow-hidden group flex flex-col">
              <div className="h-3/5 bg-gray-200 overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2 text-sm md:text-base">
                    {project.desc[language]}
                  </p>
                  <p className="text-gray-400 text-xs mb-4">{project.role}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs font-bold text-[#BF092F] bg-[#BF092F]/10 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer text-center w-full py-2 rounded-lg border border-gray-300 font-bold text-sm text-gray-700 hover:bg-[#BF092F] hover:text-white hover:border-[#BF092F] transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {t.projects.viewMore}
                    <BsLink45Deg size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Section */}
      <section id="additional" className="py-20 px-6 md:px-20 text-center">
        <div className="bg-black text-white rounded-3xl p-12 md:p-20 shadow-xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.additional.title}</h2>
          <p className="text-lg opacity-90 mb-8 whitespace-pre-line">
            {t.additional.desc}
          </p>
          <Link href={"/side-projects"} className='cursor-pointer'>
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
              {t.additional.btn}
          </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        {t.footer}
      </footer>
    </div>
  );
};

export default MainPage;