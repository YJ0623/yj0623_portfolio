import Image from 'next/image';
import visionBoardImage from '../assets/visionBoard_capture.png';
import dashBoardImage from '../assets/dashBoardImage.png';
import magneticButtonImage from '../assets/blackhole.png';
import Link from 'next/link';

export default function SideProjects() {
    const projects = [
        {
            id: 'visionboard',
            title: 'Vision Board',
            href: '/side-projects/visionboard',
            image: visionBoardImage,
        },
        {
            id: 'dashboard',
            title: 'Developer Dashboard',
            href: '/side-projects/dashboard',
            image: dashBoardImage,
        },
        {
            id: 'magneticbutton',
            title: 'Magnetic Button',
            href: '/side-projects/magneticbutton',
            image: magneticButtonImage,
        },
        {
            id: 'hongik-map',
            title: 'Hongik Map',
            href: '/side-projects/hongik-map',
            image: magneticButtonImage, // 수정해야 함
        },
    ];

    return (
        <div className="w-full min-h-screen bg-[#FFFBF1] p-5">
            <Link href="/" className="font-semibold text-2xl">
                ← Back
            </Link>
            <div className="flex items-center">
                <div className="mt-10 grid grid-cols-2 gap-15 mx-auto">
                    {projects.map((project) => (
                        <Link
                        key={project.id}
                        href={project.href}
                        className='group relative flex bg-gray-100 w-100 h-80 border-3 border-white shadow-xl'
                        >
                            <Image
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="text-2xl font-bold text-white">
                                {project.title}
                            </span>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
