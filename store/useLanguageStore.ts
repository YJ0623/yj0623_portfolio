import { create } from "zustand";

export type Language = 'ko' | 'en' | 'ja';

export const translations = {
  ko: {
    nav: { profile: '프로필', projects: '프로젝트', additional: '기타' },
    hero: { role: '황영준' },
    profile: {
      title: 'Profile',
      about: 'About Me',
      education: '🎓 홍익대학교 컴퓨터공학과 (2021.03 ~ 2026.02)',
      contact: 'Contact',
    },
    projects: { title: 'Projects', viewMore: '상세 정보 보기' },
    additional: {
      title: 'Want to see my creative side?',
      desc: "프론트엔드 개발자는 '보기 좋은 것'에 대해 잘 알고 있어야 한다고 생각합니다.\n개발뿐만 아니라, 미(美)에 관한 제 관점을 공유하고자 합니다.",
      btn: '다른 작업 보러가기',
    },
    footer: '© 2025 Hwang YoungJun. All rights reserved.',
  },
  en: {
    nav: { profile: 'Profile', projects: 'Projects', additional: 'Additional' },
    hero: { role: 'Hwang YoungJun' },
    profile: {
      title: 'Profile',
      about: 'About Me',
      education: '🎓 Hongik Univ. Computer Engineering (Mar 2021 ~ Feb 2026)',
      contact: 'Contact',
    },
    projects: { title: 'Projects', viewMore: 'View more info' },
    additional: {
      title: 'Want to see my creative side?',
      desc: "I believe Frontend Developers should understand 'Aesthetics'.\nI'd like to share my perspective on beauty beyond code.",
      btn: 'See My Other Works',
    },
    footer: '© 2025 Hwang YoungJun. All rights reserved.',
  },
  ja: {
    nav: { profile: 'プロフィール', projects: 'プロジェクト', additional: 'その他' },
    hero: { role: 'フロントエンドエンジニア ファン・ヨンジュン' },
    profile: {
      title: 'Profile',
      about: 'About Me',
      education: '🎓 弘益(ホンイク)大学 コンピュータ工学 (2021.03 ~ 2026.02)',
      contact: 'Contact',
    },
    projects: { title: 'Projects', viewMore: '詳細を見る' },
    additional: {
      title: 'Want to see my creative side?',
      desc: "フロントエンドエンジニアは「美しさ」を理解すべきだと考えています。\n開発だけでなく、美に対する私の視点を共有したいと思います。",
      btn: '他の作品を見る',
    },
    footer: '© 2025 Hwang YoungJun. All rights reserved.',
  },
};

interface LanguageState {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations['ko'];
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: 'ko',
    setLanguage: (lang) => set({ language: lang, t: translations[lang] }),
    t: translations['ko'],
}))