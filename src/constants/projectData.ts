import { StaticImageData } from "next/image";
import dango_main from '../app/assets/dango_main.png';
import cork_board from '../app/assets/cork-board.png';
import blackhole from '../app/assets/blackhole_small.png';
import dashboardImage from '../app/assets/dashBoardImage.png';
import hongik_map from '../app/assets/hongik_map.png'

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

export interface SideProjectsData {
  id: number;
  title: string;
  image: StaticImageData;
  link: string;
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
];

export const sideProjectsData: SideProjectsData[] = [
  {
    id: 1,
    title: 'vision_board',
    image: cork_board,
    link: 'https://www.yj0623-portfolio.com/side-projects/visionboard'
  },
  {
    id: 2,
    title: 'blackhole',
    image: blackhole,
    link: 'https://www.yj0623-portfolio.com/side-projects/magneticbutton'
  },
  {
    id: 3,
    title: 'dashboardImage',
    image: dashboardImage,
    link: 'https://www.yj0623-portfolio.com/side-projects/dashboard'
  },
  {
    id: 4,
    title: 'hongikMap',
    image: hongik_map,
    link: 'https://www.yj0623-portfolio.com/side-projects/hongik-map'
  }
]