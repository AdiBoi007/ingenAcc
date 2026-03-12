import { Users, DollarSign, Calendar, TrendingUp, Presentation, Plus, ArrowUpRight } from "lucide-react";

export default function TutorDashboardPage() {
    return (
        <div className="w-full h-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 px-2">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
                        <span className="microcopy text-accent-cyan tracking-[0.2em]">TUTOR OS (VERIFIED)</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tight">Business Overview</h1>
                </div>
                <div className="flex gap-3">
                    <button className="bg-surface border border-white/5 hover:bg-white/5 px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm font-medium">
                        <Calendar className="w-4 h-4 text-white/50" />
                        Manage Availability
                    </button>
                    <button className="bg-white text-black hover:bg-white/90 px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-lg shadow-white/10">
                        <Plus className="w-4 h-4" />
                        New Batch Class
                    </button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-accent-emerald/10 flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-accent-emerald" />
                        </div>
                        <span className="microcopy text-white/50">THIS MONTH</span>
                    </div>
                    <div className="text-3xl font-display font-medium mb-1">$4,250<span className="text-lg text-white/30">.00</span></div>
                    <span className="text-xs text-accent-emerald font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +18% vs last month
                    </span>
                </div>
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-accent-cyan" />
                        </div>
                        <span className="microcopy text-white/50">ACTIVE STUDENTS</span>
                    </div>
                    <div className="text-3xl font-display font-medium mb-1">12</div>
                    <span className="text-xs text-white/50 font-medium">Across 3 subjects</span>
                </div>
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                            <Presentation className="w-4 h-4 text-white/70" />
                        </div>
                        <span className="microcopy text-white/50">UPCOMING SESSIONS</span>
                    </div>
                    <div className="text-3xl font-display font-medium mb-1">8</div>
                    <span className="text-xs text-white/50 font-medium">In the next 7 days</span>
                </div>
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-accent-amber/10 flex items-center justify-center">
                            <Star className="w-4 h-4 text-accent-amber" />
                        </div>
                        <span className="microcopy text-white/50">RATING</span>
                    </div>
                    <div className="text-3xl font-display font-medium mb-1">5.0</div>
                    <span className="text-xs text-accent-amber font-medium">Top 5% Instructor</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Active Classes (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="glass-panel p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-display font-medium">Active Batch Classes</h2>
                            <button className="text-sm font-medium text-white/50 hover:text-white transition-colors">View All</button>
                        </div>

                        <div className="space-y-4">
                            {/* Class 1 */}
                            <div className="group border border-white/5 bg-surface rounded-2xl p-6 hover:border-white/10 transition-colors cursor-pointer">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-accent-cyan/10 text-accent-cyan px-2 py-0.5 rounded text-[10px] font-mono tracking-widest font-bold border border-accent-cyan/20">LIVE TONIGHT</span>
                                            <span className="text-sm font-mono text-white/50">19:00 - 21:00</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-1">DSA Mastery Bootcamp (Vol. 4)</h3>
                                        <p className="text-sm text-white/50">COMP3121 Topic Review • 24 Students</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="block text-2xl font-mono font-medium">$480</span>
                                        <span className="text-xs text-accent-emerald font-medium">REVENUE GENERATED</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0A0A0A]"></div>
                                            ))}
                                        </div>
                                        <span className="text-sm text-white/50">+19 more attending</span>
                                    </div>
                                    <button className="bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 hover:bg-accent-cyan hover:text-black font-medium px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
                                        Launch Classroom
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Class 2 */}
                            <div className="group border border-white/5 bg-surface rounded-2xl p-6 hover:border-white/10 transition-colors cursor-pointer">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-white/5 text-white/60 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest border border-white/10">TOMORROW</span>
                                            <span className="text-sm font-mono text-white/50">16:00 - 18:00</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-1">Linear Algebra Crash Course</h3>
                                        <p className="text-sm text-white/50">MATH1141 Pre-exam • 12 Students</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="block text-2xl font-mono font-medium">$240</span>
                                        <span className="text-xs text-white/40 font-medium">Projected Revenue</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right col: Clients & Activity (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass-panel p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-medium flex items-center gap-2">
                                <Users className="w-4 h-4 text-white/50" />
                                Recent 1:1 Clients
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Jason W.", time: "Yesterday, 2 hrs", sub: "COMP2521" },
                                { name: "Amanda L.", time: "Tue, 1.5 hrs", sub: "MATH1231" },
                                { name: "David K.", time: "Mon, 1 hr", sub: "COMP3121" },
                            ].map((c, i) => (
                                <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center overflow-hidden">
                                            <div className="text-sm font-bold">{c.name.charAt(0)}</div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold group-hover:text-accent-cyan transition-colors">{c.name}</p>
                                            <p className="text-xs text-white/50">{c.sub} • {c.time}</p>
                                        </div>
                                    </div>
                                    <button className="text-white/40 hover:text-white transition-colors">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel p-6 bg-accent-amber/5 border-accent-amber/10">
                        <h3 className="font-medium flex items-center gap-2 mb-4 text-accent-amber">
                            Action Required
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-[#050505] border border-white/5 rounded-xl p-4">
                                <p className="text-sm text-white/80 mb-3">You have 3 pending syllabus approvals for "Linear Algebra Crash Course".</p>
                                <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg font-medium transition-colors">
                                    Review Syllabi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Add Star icon for standardizing
import { Star } from "lucide-react";
