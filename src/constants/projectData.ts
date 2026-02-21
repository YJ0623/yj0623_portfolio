import { StaticImageData } from "next/image";
import dango_main from '../app/assets/dango_main.png';
import glow_main from '../app/assets/glow_main.jpeg';

export interface ProjectData {
  id: number;
  title: string;
  desc: { ko: string; en: string; ja: string };
  role: string;
  image: StaticImageData;
  tech: string[];
  links: {
    github?: string;
    notion?: string;
    blog?: string;
    figma?: string;
    deploy?: string;
  };
}

export const projectsData: ProjectData[] = [
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
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'zustand'],
    links: {
      deploy: 'https://dango.co.kr/',
      github: 'https://github.com/YJ0623/dango_refactor',
      notion: 'https://www.notion.so/API-2a1d0f82e07c80689ad7c550518bd55f',
      figma: 'https://www.figma.com/design/8SRYLupxiDZ27AIssh2RLR/%EB%8D%B0%EB%AA%A8%EB%8D%B0%EC%9D%B4?node-id=1822-2065&p=f&m=dev',
    },
  },
  {
    id: 2,
    title: 'Glow',
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
      github: 'https://github.com/yookoh-sam/yookohsam_front',
      figma: 'https://figma.com/file/your-file',
    },
  },
];