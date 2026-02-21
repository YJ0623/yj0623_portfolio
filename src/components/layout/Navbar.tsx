'use client';

import { Language, useLanguageStore } from "@/store/useLanguageStore";
import { useRef, useState } from 'react';
import { BsGlobe } from 'react-icons/bs';

// Navbar
export const Navbar = () => {
    const { language, setLanguage, t } = useLanguageStore(); 
    const [showLangMenu, setShowLangMenu] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <nav className="sticky top-0 left-0 w-full bg-[#EFECE3]/90 backdrop-blur-sm z-50 border-b border-black/5 py-4 px-6 md:px-20 flex justify-between items-center transition-all">
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
            className="flex items-center gap-1 p-2 rounded-full hover:bg-black/5 transition cursor-pointer"
          >
            <BsGlobe className="text-xl text-gray-700" />
            <span className="text-xs font-bold uppercase w-5">{language}</span>
          </button>
          
          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
                {(['ko', 'en', 'ja'] as Language[]).map((langKey) => (
                    <button key={langKey} onClick={() => { setLanguage(langKey); setShowLangMenu(false); }} className={`cursor-pointer px-4 py-3 text-left hover:bg-gray-50 text-sm ${language === langKey ? 'font-bold text-[#BF092F]' : ''}`}>
                        {langKey === 'ko' ? '🇰🇷 한국어' : langKey === 'en' ? '🇺🇸 English' : '🇯🇵 日本語'}
                    </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};