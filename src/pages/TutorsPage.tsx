import { Search, Star, ShieldCheck, ArrowUpRight, Filter } from "lucide-react";

export default function TutorsPage() {
    return (
        <div className="w-full h-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 px-2">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-white/20"></span>
                        <span className="microcopy text-white/40 tracking-[0.2em]">GLOBAL DIRECTORY</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tight">Tutor Network</h1>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-accent-cyan transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by course (e.g., COMP3121), concept, or tutor name..."
                        className="w-full bg-surface border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all font-medium"
                    />
                </div>
                <div className="flex gap-4">
                    <select className="bg-surface border border-white/5 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white/20 appearance-none font-medium text-sm min-w-[160px]">
                        <option>All Universities</option>
                        <option>UNSW</option>
                        <option>USYD</option>
                    </select>
                    <button className="bg-surface border border-white/5 hover:bg-white/10 rounded-xl px-4 py-4 flex items-center justify-center transition-colors">
                        <Filter className="w-5 h-5 text-white/50" />
                    </button>
                </div>
            </div>

            {/* Featured Section */}
            <div className="mb-10">
                <h3 className="font-medium text-white/50 flex items-center gap-2 mb-6 px-2">
                    <Star className="w-4 h-4" />
                    Top Ranked Available
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Tutor Card 1 */}
                    <div className="glass-panel p-6 group hover:border-accent-cyan/30 transition-all cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/5 blur-[50px] group-hover:bg-accent-cyan/10 transition-colors"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-surface">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin" alt="Kevin" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-accent-cyan transition-colors flex items-center gap-2">
                                        Kevin Zhao
                                        <ShieldCheck className="w-4 h-4 text-accent-cyan" />
                                    </h3>
                                    <span className="microcopy text-white/50">UNSW • 4TH YEAR CS</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="font-mono text-lg font-bold block">$65<span className="text-xs font-normal text-white/40">/hr</span></span>
                                <span className="flex items-center gap-1 text-xs font-bold text-accent-amber mt-1">
                                    <Star className="w-3 h-3 fill-accent-amber text-accent-amber" />
                                    5.0 <span className="text-white/40 font-normal font-mono">(124)</span>
                                </span>
                            </div>
                        </div>

                        <div className="mb-6 space-y-3">
                            <div>
                                <span className="text-xs text-white/40 mb-1 block">SPECIALTIES</span>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono tracking-widest text-white/80">COMP3121</span>
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono tracking-widest text-white/80">COMP2521</span>
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono tracking-widest text-white/80">C++</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-white/20 border border-[#0A0A0A]"></div>
                                <div className="w-6 h-6 rounded-full bg-white/10 border border-[#0A0A0A]"></div>
                                <div className="w-6 h-6 rounded-full bg-white/5 border border-[#0A0A0A] flex items-center justify-center text-[8px] font-mono">+12</div>
                            </div>
                            <span className="text-xs text-white/50">Active Students</span>
                        </div>
                    </div>

                    {/* Tutor Card 2 */}
                    <div className="glass-panel p-6 group hover:border-accent-violet/30 transition-all cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-violet/5 blur-[50px] group-hover:bg-accent-violet/10 transition-colors"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-surface">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-accent-violet transition-colors flex items-center gap-2">
                                        Sarah Miller
                                        <ShieldCheck className="w-4 h-4 text-accent-cyan" />
                                    </h3>
                                    <span className="microcopy text-white/50">USYD • PHD MATH</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="font-mono text-lg font-bold block">$85<span className="text-xs font-normal text-white/40">/hr</span></span>
                                <span className="flex items-center gap-1 text-xs font-bold text-accent-amber mt-1">
                                    <Star className="w-3 h-3 fill-accent-amber text-accent-amber" />
                                    4.9 <span className="text-white/40 font-normal font-mono">(89)</span>
                                </span>
                            </div>
                        </div>

                        <div className="mb-6 space-y-3">
                            <div>
                                <span className="text-xs text-white/40 mb-1 block">SPECIALTIES</span>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono tracking-widest text-white/80">MATH1141</span>
                                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono tracking-widest text-white/80">MATH1231</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                            <button className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-2 rounded-lg text-sm transition-colors border border-white/10">
                                View Availability
                            </button>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="glass-panel p-6 border border-white/5 border-dashed flex flex-col items-center justify-center text-center hover:bg-white/[0.02] transition-colors cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <ArrowUpRight className="w-5 h-5 text-accent-cyan group-hover:text-cyan-400" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Become a Tutor</h3>
                        <p className="text-sm text-white/50 max-w-[200px]">Monetize your high grades and build your own micro-academy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
