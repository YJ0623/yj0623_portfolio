import { NavigationBar } from "@/src/components/map/NavigationBar";

export default function HongikMapLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative min-h-screen">
            {children}
            <NavigationBar />
        </div>
    );
}