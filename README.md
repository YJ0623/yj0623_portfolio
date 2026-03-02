# Front-End Developer Portfolio 

> 인터랙티브 UI와 데이터 시각화, 그리고 프론트엔드 최적화 역량을 보여주기 위한 개인 포트폴리오 웹사이트입니다.

🔗 **[Live Demo 보러가기](www.yj0623-portfolio.com)**

## Project Overview
이 프로젝트는 단순한 이력 소개를 넘어, 프론트엔드 개발자로서의 기술적 고민과 문제 해결 능력을 코드로 증명하기 위해 제작되었습니다. 복잡한 상태 관리, 부드러운 UI 인터랙션, 그리고 Next.js 서버 사이드 기능을 활용한 API 연동에 중점을 두었습니다.

## Tech Stack
- **Framework:** Next.js 14 (App Router), React
- **Language:** TypeScript
- **Styling & Animation:** Tailwind CSS, Framer Motion
- **State Management:** Zustand
- **Libraries:** @dnd-kit/core (Drag & Drop), @aws-sdk/client-s3 (Storage)
- **Deployment:** Vercel

## Key Features & Engineering

### 1. Vision Board: 복잡한 Drag & Drop 이벤트 제어 및 상태 관리
- @dnd-kit를활용하여 이미지 카드들의 좌표와 Z-index를 제어하는 Drag & Drop 인터랙션 구현
- 빈번한 마우스/터치 이벤트로 인한 React의 불필요한 리렌더링을 방지하기 위해 Zustand를 도입하여 상태 관리 최적화
- 백엔드 의존성 없이 클라이언트 단에서 AWS S3 Presigned URL을 발급받아 이미지를 직접 업로드하는 로직 구현

### 2. Developer Dashboard: 데이터 시각화
- GitHub GraphQL API를 연동하여 최근 커밋 내역을 동적인 잔디밭(Contribution Graph) 위젯으로 시각화

### 3. Interactive UI & UX
- 선형 보간(LERP) 알고리즘을 적용한 커스텀 마우스 커서 등, 수학적 계산 기반의 마이크로 인터랙션 구현
- Framer Motion의 순차 실행(staggerChildren)과 스프링 물리 효과를 활용하여 게이미피케이션(Gamification) 요소가 가미된 컴포넌트 설계
