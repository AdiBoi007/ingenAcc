import { Link, useLocation } from "react-router-dom";
import ingenLogo from "../assets/ingen logo.png";

export function Navbar() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    if (isAuthPage) return null; // Don't show navbar on dedicated auth pages

    return (
        <nav className="fixed top-0 left-0 right-0 h-20 md:h-24 z-[100] flex items-center justify-center pointer-events-none px-4 md:px-8">
            {/* The actual navbar container */}
            <div className="bg-surface/80 backdrop-blur-2xl border border-white/[0.04] rounded-full px-6 py-3 flex items-center justify-between w-full max-w-7xl pointer-events-auto shadow-2xl mt-4">

                {/* Logo/Brand */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-accent-cyan/50 transition-colors overflow-hidden">
                        <img src={ingenLogo} alt="Ingen" className="w-7 h-7 object-contain" />
                    </div>
                    <span className="font-display font-bold text-lg tracking-tight hidden sm:block">INGEN <span className="text-white/40">OS</span></span>
                </Link>

                {/* Auth CTA Controls */}
                <div className="flex items-center gap-3">
                    <Link to="/login">
                        <button className="text-sm font-mono tracking-widest uppercase text-white/60 hover:text-white px-4 py-2 transition-colors">
                            Log In
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="bg-white text-black hover:bg-white/90 px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span>
                            Initialize
                        </button>
                    </Link>
                </div>

            </div>
        </nav>
    );
}
