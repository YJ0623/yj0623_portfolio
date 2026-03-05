import Image from 'next/image';
import visionBoardImage from '../assets/visionBoard_capture.png';
import dashBoardImage from '../assets/dashBoardImage.png';
import Link from 'next/link';

export default function SideProjects() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF1] p-5">
            <Link href="/" className="font-semibold text-2xl">
                ← Back
            </Link>
            <div className="flex items-center">
                <div className="mt-10 grid grid-cols-2 gap-15 mx-auto">
                    <div className="relative flex bg-gray-100 w-100 h-80 border-3 border-white shadow-xl group">
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
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                                    <span className="text-white text-2xl font-bold">
                                        Vision Board
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="relative flex justify-center items-center bg-gray-100 w-100 h-80 border-3 border-white shadow-xl group">
                        <div className="w-full h-full">
                            <Link
                                href="/side-projects/dashboard"
                                className="w-full h-full"
                            >
                                <Image
                                    src={dashBoardImage}
                                    alt="developer-dashboard"
                                    className="w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                                    <span className="text-white text-2xl font-bold">
                                        Developer Dashboard
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex bg-gray-100 w-100 h-80 border-3 border-white shadow-xl group">
                        <div className="w-full h-full">
                            <Link
                                href="/side-projects/magneticbutton"
                                className="w-full h-full"
                            >
                            <div className="flex w-full h-full items-center justify-center">
                                마그네릭
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                                <span className="text-white text-2xl font-bold">
                                    Magnetic Button
                                </span>
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex bg-gray-100 w-100 h-80 border-3 border-white shadow-xl group">
                        <div className="w-full h-full">
                            <div className="flex w-full h-full items-center justify-center">
                                ?
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                                <span className="text-white text-2xl font-bold">
                                    Comming Soon
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
