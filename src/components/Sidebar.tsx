import { Link, useLocation } from "react-router-dom";
import { Command, CalendarDays, BookOpen, Orbit, Users, ShoppingCart, Settings } from "lucide-react";
import ingenLogo from "../assets/ingen logo.png";

export function Sidebar() {
    const location = useLocation();

    const navItems = [
        { name: "Command Center", icon: Command, path: "/dashboard" },
        { name: "Planner", icon: CalendarDays, path: "/planner" },
        { name: "Courses", icon: BookOpen, path: "/courses" },
        { name: "Practice", icon: Orbit, path: "/practice" },
        { name: "Tutoring", icon: Users, path: "/tutors" },
        { name: "Marketplace", icon: ShoppingCart, path: "/marketplace" },
        { name: "Settings", icon: Settings, path: "/settings" },
    ];

    return (
        <aside className="fixed top-4 bottom-4 left-4 w-16 md:w-20 rounded-full md:rounded-[32px] glass-panel flex flex-col items-center py-6 gap-6 z-50">
            <Link to="/" className="w-10 h-10 md:w-12 md:h-12 rounded-full md:rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 hover:border-accent-cyan/50 hover:bg-white/[0.08] transition-all overflow-hidden">
                <img src={ingenLogo} alt="Ingen" className="w-7 h-7 md:w-8 md:h-8 object-contain" />
            </Link>

            <nav className="flex flex-col gap-4 flex-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (location.pathname !== "/" && item.path !== "/" && location.pathname.startsWith(item.path));
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full md:rounded-2xl flex items-center justify-center transition-all duration-300 border ${isActive
                                ? "bg-white/[0.08] border-white/20 text-white"
                                : "border-transparent text-white/40 hover:text-white hover:bg-white/[0.04]"
                                }`}
                            title={item.name}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-accent-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : ""}`} />
                        </Link>
                    );
                })}
            </nav>

            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden mt-auto">
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse absolute top-1 right-1"></span>
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent-indigo to-accent-cyan blur-[2px] opacity-70"></div>
            </div>
        </aside>
    );
}
