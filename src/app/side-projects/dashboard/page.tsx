import CodingStatsWidget from '@/src/components/dashboard/CodingStatsWidget';
import GithubGrassWidget from '@/src/components/dashboard/GithubGrassWidget';

export default function Home() {
    return (
        <div>
            <section className="py-12 px-6 max-w-5xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Developer Dashboard
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        실시간으로 기록되는 저의 성장 지표입니다.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
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
