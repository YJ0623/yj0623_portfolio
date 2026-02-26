import Image from 'next/image';
import visionBoardImage from '../assets/visionBoard_capture.png';
import Link from 'next/link';

export default function SideProjects() {
    return (
        <div className="w-full items-center min-h-screen p-20">
            <div className="w-full grid grid-cols-2 gap-5">
                <div className="relative flex justify-center items-center bg-gray-100 w-100 h-80 border-2 border-gray-400 shadow-xl group">
                    <div className="w-full h-full">
                        <Link
                            href="/side-projects/visionboard"
                            className="w-full h-full"
                        >
                            <Image
                                src={visionBoardImage}
                                alt="vision-board"
                                className="w-full h-full"
                            />
                            {/* 호버 오버레이 */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                                <span className="text-white text-2xl font-bold">
                                    Vision Board
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center items-center">요소</div>
            </div>
        </div>
    );
}
