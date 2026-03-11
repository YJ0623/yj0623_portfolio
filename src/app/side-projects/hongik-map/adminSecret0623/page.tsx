/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { supabase } from '@/utils/supabase';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SecretAdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [pendingReviews, setPendingReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const ADMIN_PASSWORD =process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    };

    const fetchPendingReviews = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('status', 'PENDING')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPendingReviews(data || []);
        } catch (error) {
            console.error('불러오기 실패:', error);
            alert('리뷰를 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 로그인 성공 시에만 데이터 불러오기
    useEffect(() => {
        if (isAuthenticated) {
            fetchPendingReviews();
        }
    }, [isAuthenticated]);

    // ✅ 승인 함수: status를 'APPROVED'로 바꿉니다.
    const handleApprove = async (id: number) => {
        if (!confirm('이 리뷰를 지도에 등록(승인)하시겠습니까?')) return;

        try {
            const { error } = await supabase
                .from('reviews')
                .update({ status: 'APPROVED' })
                .eq('id', id);

            if (error) throw error;
            
            // 승인된 리뷰는 리스트에서 즉시 제거 (화면 갱신)
            setPendingReviews((prev) => prev.filter((review) => review.id !== id));
            alert('승인 완료!');
        } catch (error) {
            console.error(error);
            alert('승인 중 오류 발생');
        }
    };

    // 🗑️ 삭제(반려) 함수: DB에서 아예 지워버립니다.
    const handleDelete = async (id: number) => {
        if (!confirm('경고: 이 리뷰를 영구 삭제하시겠습니까?')) return;

        try {
            const { error } = await supabase
                .from('reviews')
                .delete()
                .eq('id', id);

            if (error) throw error;
            
            // 삭제된 리뷰 리스트에서 즉시 제거
            setPendingReviews((prev) => prev.filter((review) => review.id !== id));
            alert('삭제 완료!');
        } catch (error) {
            console.error(error);
            alert('삭제 중 오류 발생');
        }
    };

    // 1️⃣ 로그인 안 된 상태면 비밀번호 입력창 띄우기
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
                    <h1 className="text-xl font-bold mb-4 text-center">관리자 로그인</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호 입력"
                        className="w-full px-4 py-2 border rounded-lg mb-4"
                    />
                    <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-bold">
                        접속하기
                    </button>
                </form>
            </div>
        );
    }

    // 2️⃣ 로그인 성공 시 보이는 백오피스 화면
    return (
        <main className="min-h-screen bg-gray-50 p-4 pb-20">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">대기 중인 리뷰 ({pendingReviews.length}건)</h1>
                <button onClick={fetchPendingReviews} className="px-3 py-1 bg-gray-200 text-sm rounded-lg font-bold">
                    🔄 새로고침
                </button>
            </div>

            {isLoading ? (
                <p className="text-center text-gray-500 py-10">불러오는 중...</p>
            ) : pendingReviews.length === 0 ? (
                <p className="text-center text-gray-500 py-10 bg-white rounded-xl shadow-sm border border-gray-100">
                    모든 리뷰 처리가 완료되었습니다! 🎉
                </p>
            ) : (
                <div className="flex flex-col gap-4">
                    {pendingReviews.map((review) => (
                        <div key={review.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="font-bold text-lg">{review.restaurant_name}</h2>
                                <span className="text-yellow-500 tracking-widest text-sm">
                                    {'★'.repeat(review.rating)}
                                </span>
                            </div>
                            
                            <p className="text-gray-700 text-sm mb-3 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                                {review.content}
                            </p>

                            {/* 사진이 있으면 보여주기 */}
                            {review.image_urls && review.image_urls.length > 0 && (
                                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                    {review.image_urls.map((url: string, idx: number) => (
                                        <div key={idx} className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-gray-200">
                                            <Image src={url} alt="리뷰 사진" fill sizes="80px" className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 액션 버튼 */}
                            <div className="flex gap-2 mt-2">
                                <button 
                                    onClick={() => handleApprove(review.id)}
                                    className="flex-1 bg-green-500 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-green-600 transition"
                                >
                                    ✅ 승인하기
                                </button>
                                <button 
                                    onClick={() => handleDelete(review.id)}
                                    className="flex-1 bg-red-500 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-red-600 transition"
                                >
                                    🗑️ 영구 삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}