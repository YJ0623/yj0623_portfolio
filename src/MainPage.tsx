import { useEffect, useState } from 'react';
import { TechStack } from './TechStack';
import { BsGlobe, BsGithub, BsPencilSquare, BsLink45Deg } from 'react-icons/bs'; 
import { SiNotion, SiFigma } from 'react-icons/si';
import { IoClose } from 'react-icons/io5';

// 이미지 import (경로는 본인 환경에 맞게 유지)
import dango_main from './assets/dango_main.png';
import glow_main from './assets/glow_main.jpeg';

// --- Types & Data ---
type Language = 'ko' | 'en' | 'ja';

// 번역 데이터 객체
const translations = {
  ko: {
    nav: { profile: '프로필', projects: '프로젝트', additional: '기타' },
    hero: { role: '황영준' },
    profile: {
      title: 'Profile',
      about: 'About Me',
      education: '🎓 홍익대학교 컴퓨터공학과 (21.03 ~ 24.02)',
      contact: 'Contact',
    },
    projects: { title: 'Projects', viewMore: '상세 정보 보기' },
    additional: {
      title: 'Want to see my creative side?',
      desc: "프론트엔드 개발자는 '보기 좋은 것'에 대해 잘 알고 있어야 한다고 생각합니다.\n개발뿐만 아니라, 미(美)에 관한 제 관점을 공유하고자 합니다.",
      btn: '📸 사진 작업물 보러가기',
    },
    footer: '© 2025 Hwang YoungJun. All rights reserved.',
  },
  en: {
    nav: { profile: 'Profile', projects: 'Projects', additional: 'Additional' },
    hero: { role: 'Hwang YoungJun' },
    profile: {
      title: 'Profile',
      about: 'About Me',
      education: '🎓 Hongik Univ. Computer Engineering (Mar 21 ~ Feb 24)',
      contact: 'Contact',
    },
    projects: { title: 'Projects', viewMore: 'View more info' },
    additional: {
      title: 'Want to see my creative side?',
      desc: "I believe Frontend Developers should understand 'Aesthetics'.\nI'd like to share my perspective on beauty beyond code.",
      btn: '📸 See My Photographs',
    },
    footer: '© 2025 Hwang YoungJun. All rights reserved.',
  },
  ja: {
    nav: { profile: 'プロフィール', projects: 'プロジェクト', additional: 'その他' },
    hero: { role: 'フロントエンドエンジニア ファン・ヨンジュン' },
    profile: {
      title: 'Profile',
      about: 'About Me',
      education: '🎓 弘益(ホンイク)大学 コンピュータ工学 (21.03 ~ 24.02)',
      contact: 'Contact',
    },
    projects: { title: 'Projects', viewMore: '詳細を見る' },
    additional: {
      title: 'Want to see my creative side?',
      desc: "フロントエンドエンジニアは「美しさ」を理解すべきだと考えています。\n開発だけでなく、美に対する私の視点を共有したいと思います。",
      btn: '📸 写真ポートフォリオを見る',
    },
    footer: '© 2025 Hwang YoungJun. All rights reserved.',
  },
};

// 프로젝트 데이터 구조화 (모달에 넘겨주기 위함)
interface ProjectData {
  id: number;
  title: string;
  desc: { ko: string; en: string; ja: string };
  role: string;
  image: string;
  tech: string[];
  links: {
    github?: string;
    notion?: string;
    blog?: string;
    figma?: string;
    deploy?: string;
  };
}

const projectsData: ProjectData[] = [
  {
    id: 1,
    title: 'Dango',
    desc: {
      ko: '지류 스탬프를 모바일 웹 환경에서 적립할 수 있는 서비스입니다.',
      en: 'A mobile web service for collecting digital stamps instead of paper ones.',
      ja: '紙のスタンプをモバイルWeb環境で貯めることができるサービスです。',
    },
    role: 'Developed with Backend Developer, Designer, Frontend peer',
    image: dango_main,
    tech: ['React', 'TypeScript'],
    links: {
      deploy: 'https://daango.site',
      github: 'https://github.com/your-repo', // 링크 수정 필요
      notion: 'https://notion.so/your-page',
    },
  },
  {
    id: 2,
    title: 'Glow', // 프로젝트 이름 수정됨 (기존 코드엔 Dango로 되어있었음)
    desc: {
      ko: '교내 미대생들이 전시 공간을 쉽게 확보하고 홍보하며 정보를 얻을 수 있도록 돕는 플랫폼입니다.',
      en: 'A platform helping art students secure exhibition spaces and promote their work.',
      ja: '美大生が展示スペースを簡単に確保し、広報や情報を得られるように支援するプラットフォームです。',
    },
    role: 'Developed with Backend Developer, Designer, Frontend peer',
    image: glow_main,
    tech: ['React'],
    links: {
      deploy: 'https://glowarts.online/',
      github: 'https://github.com/your-repo',
      figma: 'https://figma.com/file/your-file',
    },
  },
];

// --- Components ---

// Typing Component
interface TextChunk {
  text: string;
  className: string;
}

const TypingTitle = () => {
  const content: TextChunk[] = [
    { text: 'A Frontend Developer deeply focused on ', className: 'text-black' },
    { text: 'communication', className: 'text-[#BF092F]' },
    { text: ', ', className: 'text-black' },
    { text: '\n', className: '' },
    { text: 'interaction', className: 'text-[#BF092F]' },
    { text: ', and ', className: 'text-black' },
    { text: 'aesthetics', className: 'text-[#BF092F]' },
    { text: '.', className: 'text-black' },
  ];

  const [displayedContent, setDisplayedContent] = useState<TextChunk[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentChunkIndex >= content.length) return;
    const timeout = setTimeout(() => {
      const currentChunk = content[currentChunkIndex];
      const slicedText = currentChunk.text.slice(0, currentCharIndex + 1);
      setDisplayedContent((prev) => {
        const newContent = [...prev];
        if (newContent[currentChunkIndex]) {
          newContent[currentChunkIndex] = { ...currentChunk, text: slicedText };
        } else {
          newContent.push({ ...currentChunk, text: slicedText });
        }
        return newContent;
      });
      if (currentCharIndex < currentChunk.text.length - 1) {
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        setCurrentChunkIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }, 40);
    return () => clearTimeout(timeout);
  }, [currentChunkIndex, currentCharIndex]);

  return (
    <div className="font-semibold text-[40px] md:text-[60px] leading-tight whitespace-pre-wrap">
      {displayedContent.map((chunk, index) => (
        <span key={index} className={chunk.className}>
          {chunk.text}
        </span>
      ))}
      <span className="animate-pulse ml-1 inline-block w-[4px] h-[50px] md:h-[70px] bg-black align-middle"></span>
    </div>
  );
};

// Modal Component
const ProjectModal = ({ project, onClose }: { project: ProjectData | null; onClose: () => void }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#EFECE3] p-6 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-2xl font-bold">{project.title} Links</h3>
          <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition">
            <IoClose size={24} />
          </button>
        </div>

        {/* Links List */}
        <div className="p-6 flex flex-col gap-3">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition group">
              <BsGithub size={24} className="group-hover:scale-110 transition" />
              <span className="font-semibold text-lg">GitHub Repository</span>
            </a>
          )}
          {project.links.deploy && (
            <a href={project.links.deploy} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#BF092F] hover:bg-[#BF092F]/5 transition group">
              <BsGlobe size={24} className="text-[#BF092F] group-hover:scale-110 transition" />
              <span className="font-semibold text-lg text-[#BF092F]">Live Demo Site</span>
            </a>
          )}
          {project.links.notion && (
            <a href={project.links.notion} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition group">
              <SiNotion size={24} className="group-hover:scale-110 transition" />
              <span className="font-semibold text-lg">Notion Docs</span>
            </a>
          )}
          {project.links.blog && (
            <a href={project.links.blog} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-green-600 hover:bg-green-50 transition group">
              <BsPencilSquare size={24} className="group-hover:scale-110 transition text-green-600" />
              <span className="font-semibold text-lg">Dev Blog</span>
            </a>
          )}
          {project.links.figma && (
            <a href={project.links.figma} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-purple-600 hover:bg-purple-50 transition group">
              <SiFigma size={24} className="group-hover:scale-110 transition text-purple-600" />
              <span className="font-semibold text-lg">Figma Design</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = ({ lang, setLang, t }: { lang: Language; setLang: (l: Language) => void; t: any }) => {
  const [showLangMenu, setShowLangMenu] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#EFECE3]/90 backdrop-blur-sm z-50 border-b border-black/5 py-4 px-6 md:px-20 flex justify-between items-center transition-all">
      <div className="font-bold text-xl cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        YJ.
      </div>
      
      <div className="flex items-center gap-8">
        <ul className="hidden md:flex gap-8 font-medium text-gray-700">
          <li className="cursor-pointer hover:text-[#BF092F] transition" onClick={() => scrollToSection('profile')}>
            {t.nav.profile}
          </li>
          <li className="cursor-pointer hover:text-[#BF092F] transition" onClick={() => scrollToSection('projects')}>
            {t.nav.projects}
          </li>
          <li className="cursor-pointer hover:text-[#BF092F] transition" onClick={() => scrollToSection('additional')}>
            {t.nav.additional}
          </li>
        </ul>

        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1 p-2 rounded-full hover:bg-black/5 transition"
          >
            <BsGlobe className="text-xl text-gray-700" />
            <span className="text-xs font-bold uppercase w-5">{lang}</span>
          </button>
          
          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
              <button onClick={() => { setLang('ko'); setShowLangMenu(false); }} className={`px-4 py-3 text-left hover:bg-gray-50 text-sm ${lang === 'ko' ? 'font-bold text-[#BF092F]' : ''}`}>🇰🇷 한국어</button>
              <button onClick={() => { setLang('en'); setShowLangMenu(false); }} className={`px-4 py-3 text-left hover:bg-gray-50 text-sm ${lang === 'en' ? 'font-bold text-[#BF092F]' : ''}`}>🇺🇸 English</button>
              <button onClick={() => { setLang('ja'); setShowLangMenu(false); }} className={`px-4 py-3 text-left hover:bg-gray-50 text-sm ${lang === 'ja' ? 'font-bold text-[#BF092F]' : ''}`}>🇯🇵 日本語</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Main Page Layout
export const MainPage = () => {
  const [lang, setLang] = useState<Language>('ko'); // 언어 상태
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null); // 모달 상태
  const t = translations[lang]; // 현재 언어에 맞는 텍스트

  return (
    <div className="bg-[#EFECE3] min-h-screen font-sans selection:bg-[#BF092F] selection:text-white">
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      <section className="h-screen flex flex-col justify-center px-6 md:px-20 pt-20">
        <h1 className="text-[30px] font-bold mb-5">{t.hero.role}</h1>
        <div className="max-w-4xl min-h-[360px]">
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
        <div className="grid md:grid-cols-2 gap-12">
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

      {/* Projects Section (Refactored to map) */}
      <section id="projects" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <h2 className="text-[40px] font-bold mb-12 border-l-4 border-[#BF092F] pl-4">{t.projects.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div key={project.id} className="bg-white h-[500px] rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300 overflow-hidden group flex flex-col">
              <div className="h-3/5 bg-gray-200 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2 text-sm md:text-base">
                    {project.desc[lang]}
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
                    className="text-center w-full py-2 rounded-lg border border-gray-300 font-bold text-sm text-gray-700 hover:bg-[#BF092F] hover:text-white hover:border-[#BF092F] transition-colors duration-200 flex items-center justify-center gap-2"
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
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
            {t.additional.btn}
          </button>
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