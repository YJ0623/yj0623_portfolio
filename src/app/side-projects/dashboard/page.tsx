import CodingStatsWidget from '@/src/components/dashboard/CodingStatsWidget';
import GithubGrassWidget from '@/src/components/dashboard/GithubGrassWidget';

export default function Home() {
    return (
        <div className='flex mx-auto w-230 h-170 justify-center mt-20 border-3 border-gray-200 shadow-2xl rounded-[20px]'>
            <section className="flex flex-col py-12 px-6">
                <div className="mb-8">
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
            </section>
        </div>
    );
}
