import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';

// 1. S3 클라이언트 세팅 (알바생 명찰 달기)
const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(request: Request) {
    try {
        const { filename, contentType } = await request.json();

        // 2. 파일 이름이 겹치지 않게 고유한 이름으로 변경
        const uniqueFilename = `${Date.now()}-${filename}`;

        // 3. S3에 "나 이 파일 올릴 거니까 자리 마련해둬" 라고 명령서(Command) 작성
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: uniqueFilename,
            ContentType: contentType, // 예: image/jpeg
        });

        // 4. 브라우저가 직접 업로드할 수 있는 일회용 URL 생성 (60초 동안만 유효)
        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

        // 5. 이 URL을 브라우저에게 돌려줌
        return NextResponse.json({
            url: presignedUrl,
            // 이 주소가 최종적으로 이미지가 저장될 영구적인 주소입니다.
            finalImageUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFilename}`,
        });
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        return NextResponse.json({ error: 'Failed to generate URL' }, { status: 500 });
    }
}