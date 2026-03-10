import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if(!query) {
        return NextResponse.json({ error: '검색어가 필요합니다.' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://openapi.naver.com/v1/search/local.json?query=${query}&display=5`, {
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_SEARCH_CLIENT_ID!,
                'X-Naver-Client-Secret': process.env.NAVER_SEARCH_CLIENT_SECRET!,
            },
        });
        const data = await response.json();
        
        // 3. 네이버가 준 결과를 그대로 우리 프론트에 전달!
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: '검색 실패' }, { status: 500 });
    }
}