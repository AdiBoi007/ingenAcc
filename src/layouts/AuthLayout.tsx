import { Link } from "react-router-dom";
import { Command } from "lucide-react";

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-black text-white relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-accent-indigo/10 blur-[120px] rounded-[100%] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-accent-cyan/10 blur-[120px] rounded-[100%] pointer-events-none z-0"></div>

            {/* Left side - Branding (Hidden on mobile) */}
            <div className="hidden md:flex flex-col justify-between w-1/2 p-12 border-r border-white/5 relative z-10 bg-surface/80 backdrop-blur-3xl">
                <div>
                    <Link to="/" className="flex items-center gap-3 w-fit group">
                        <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-accent-cyan/50 transition-colors">
                            <Command className="w-6 h-6 text-white group-hover:text-accent-cyan transition-colors" />
                        </div>
                        <span className="font-display font-medium text-2xl tracking-tight">INGEN <span className="text-white/40">OS</span></span>
                    </Link>
                </div>

                <div className="max-w-md">
                    <span className="microcopy text-accent-cyan mb-4 block">SYSTEM ACCESS</span>
                    <h1 className="text-5xl font-display font-medium tracking-tight mb-6">{title}</h1>
                    <p className="text-white/60 text-lg">{subtitle}</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-2xl flex-1 backdrop-blur-md">
                        <span className="microcopy text-accent-emerald block mb-2">TELEMETRY</span>
                        <span className="font-mono text-sm block">System Online</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-2xl flex-1 backdrop-blur-md">
                        <span className="microcopy text-accent-amber block mb-2">NETWORK</span>
                        <span className="font-mono text-sm block">12ms Latency</span>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 relative z-10">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
