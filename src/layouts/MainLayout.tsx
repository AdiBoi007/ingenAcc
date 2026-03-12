import type { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-black text-white relative font-sans">
            {/* Ambient background glows - Soft, slow, minimal */}
            <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-accent-indigo/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

            {/* Floating Sidebar */}
            <Sidebar />

            {/* Top Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="pl-24 md:pl-32 pr-4 md:pr-8 pt-28 md:pt-32 pb-8 min-h-screen relative z-10">
                {children}
            </main>
        </div>
    );
}
