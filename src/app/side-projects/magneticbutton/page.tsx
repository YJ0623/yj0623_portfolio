import BlackholeButton from '@/src/components/ui/BlackholeButton';
import ParticleCanvas from '@/src/components/ui/ParticleCanvas';
import Link from 'next/link';

export default function Page() {
    return (
        <div className="w-full h-full">
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
                <Link href="/" className="font-semibold text-2xl text-white z-15 absolute top-5 left-5">
                    ← Back
                </Link>
                <ParticleCanvas />
                <div className="z-10">
                    <BlackholeButton />
                </div>
            </div>
        </div>
    );
}
