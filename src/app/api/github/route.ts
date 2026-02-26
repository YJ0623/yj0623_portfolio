/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/github/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 86400 } 
    });

    const data = await response.json();
    const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
    
    // 1. 모든 날짜를 1차원 배열로 펼침
    const allDays = weeks.flatMap((week: any) => week.contributionDays);
    
    // 2. 최근 105일(15주 x 7일) 데이터만 자르기
    const recentDays = allDays.slice(-105);
    
    // 3. 커밋 개수를 0~4 레벨로 변환 (잔디 색상용)
    const levels = recentDays.map((day: any) => {
      const count = day.contributionCount;
      if (count === 0) return 0;
      if (count <= 2) return 1;
      if (count <= 5) return 2;
      if (count <= 9) return 3;
      return 4;
    });

    return NextResponse.json({ levels });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json({ levels: Array(105).fill(0) }, { status: 500 });
  }
}