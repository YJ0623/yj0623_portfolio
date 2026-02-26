import CodingStatsWidget from '@/src/components/dashboard/CodingStatsWidget';
import GithubGrassWidget from '@/src/components/dashboard/GithubGrassWidget';
import Link from 'next/link';

export default function DashBoard() {
    return (
        <div className="min-h-screen bg-[#EFECE3] p-5">
            <Link href="/side-projects" className="font-semibold text-2xl">
                ← Back
            </Link>
            <div className="flex mx-auto justify-center">
                <div className="flex flex-col justify-center items-center w-230 h-170 border-3 border-gray-200 shadow-2xl rounded-[20px] mt-20 bg-white">
                    <div className="mb-15">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Developer Dashboard
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            실시간으로 기록되는 저의 성장 지표입니다.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-start mt-10 gap-10">
                        <div className="flex-1">
                            <GithubGrassWidget />
                        </div>
                        <div className="flex-1">
                            <CodingStatsWidget />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
