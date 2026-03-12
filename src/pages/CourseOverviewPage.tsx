import { Cpu, Target, BookOpen, ChevronRight, Zap, Play, FileText, Download } from "lucide-react";

export default function CourseOverviewPage() {
    return (
        <div className="w-full h-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-20">
            {/* Header / Breadcrumbs */}
            <div className="mb-8 px-2">
                <div className="flex items-center gap-2 microcopy text-white/40 mb-4">
                    <span>COURSES</span>
                    <span className="text-white/20">/</span>
                    <span className="text-white">COMP3121</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-1 bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 rounded text-xs font-mono font-bold tracking-widest">
                                92% LIKELY TO HD
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tight">Algorithms & Data Structures</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-surface border border-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm font-medium">
                            <Download className="w-4 h-4 text-white/50" />
                            Syllabus
                        </button>
                        <button className="bg-white text-black hover:bg-white/90 px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-lg">
                            <Zap className="w-4 h-4" />
                            Simulation Exam
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* AI Summary / Diagnostics */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Course Diagnostics Card */}
                    <div className="glass-panel p-8 relative overflow-hidden">
                        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-accent-emerald/10 blur-[80px] pointer-events-none rounded-full"></div>

                        <div className="flex items-center gap-2 mb-6 text-white text-sm font-medium">
                            <Cpu className="w-4 h-4 text-accent-emerald" />
                            Diagnostic Report
                        </div>

                        <p className="text-lg text-white/80 leading-relaxed font-light mb-8 max-w-2xl">
                            You are performing significantly above the cohort average. Your strongest areas are Dynamic Programming and Graph Algorithms. Weakness detected in Network Flow concepts from recent lectures.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-surface border border-white/5 rounded-xl text-center">
                                <span className="microcopy text-white/40 mb-2 block">ATTENDANCE</span>
                                <span className="text-2xl font-mono text-white">100%</span>
                            </div>
                            <div className="p-4 bg-surface border border-white/5 rounded-xl text-center">
                                <span className="microcopy text-white/40 mb-2 block">ASSMT 1</span>
                                <span className="text-2xl font-mono text-accent-emerald">95/100</span>
                            </div>
                            <div className="p-4 bg-surface border border-white/5 rounded-xl text-center">
                                <span className="microcopy text-white/40 mb-2 block">CLASS RANK</span>
                                <span className="text-2xl font-mono text-white">TOP 5%</span>
                            </div>
                            <div className="p-4 bg-accent-amber/10 border border-accent-amber/20 rounded-xl text-center">
                                <span className="microcopy text-accent-amber mb-2 block">NETWORK FLOW</span>
                                <span className="text-2xl font-mono text-accent-amber">56%</span>
                            </div>
                        </div>
                    </div>

                    {/* Lecture Vault */}
                    <div className="glass-panel p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-medium flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-white/50" />
                                Lecture Vault
                            </h3>
                            <button className="text-xs font-mono text-white/40 hover:text-white transition-colors">VIEW ALL</button>
                        </div>

                        <div className="border border-white/5 rounded-xl overflow-hidden bg-surface">
                            <div className="grid grid-cols-12 text-xs font-mono text-white/40 border-b border-white/5 p-4 bg-black/40">
                                <div className="col-span-1">Wk</div>
                                <div className="col-span-6">Topic</div>
                                <div className="col-span-3 text-center">AI Summary</div>
                                <div className="col-span-2 text-right">Action</div>
                            </div>

                            {[
                                { w: "04", topic: "Network Flow & Bipartite Matching", status: "PENDING", color: "text-accent-amber" },
                                { w: "03", topic: "Dynamic Programming (Adv)", status: "GENERATED", color: "text-accent-emerald" },
                                { w: "02", topic: "Divide and Conquer", status: "GENERATED", color: "text-accent-emerald" },
                                { w: "01", topic: "Algorithm Analysis & asymptotic bounds", status: "GENERATED", color: "text-accent-emerald" },
                            ].map((lec, i) => (
                                <div key={i} className="grid grid-cols-12 items-center text-sm border-b border-white/5 p-4 hover:bg-white/5 transition-colors">
                                    <div className="col-span-1 font-mono text-white/50">{lec.w}</div>
                                    <div className="col-span-6 font-medium text-white/90">{lec.topic}</div>
                                    <div className="col-span-3 text-center">
                                        <span className={`microcopy ${lec.color}`}>{lec.status}</span>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 inline-flex items-center justify-center">
                                            {lec.status === "PENDING" ? <Zap className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Action Items */}
                    <div className="glass-panel p-6">
                        <h3 className="font-medium flex items-center gap-2 mb-6">
                            <Target className="w-4 h-4 text-white/50" />
                            Next Actions
                        </h3>
                        <div className="space-y-3">
                            <div className="group flex items-center gap-4 p-3 rounded-xl bg-surface border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
                                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <FileText className="w-4 h-4 text-white/70 group-hover:text-accent-cyan transition-colors" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Assignment 2</h4>
                                    <p className="text-xs text-white/50">Due in 5 days</p>
                                </div>
                            </div>
                            <div className="group flex items-center gap-4 p-3 rounded-xl bg-accent-amber/5 border border-accent-amber/20 hover:border-accent-amber/40 transition-colors cursor-pointer">
                                <div className="w-8 h-8 rounded-lg bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center shrink-0">
                                    <Play className="w-4 h-4 text-accent-amber ml-0.5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-accent-amber">Network Flow Review</h4>
                                    <p className="text-xs text-white/50">Watch Wk4 Lecture Part 2</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resources & Tutors */}
                    <div className="glass-panel p-6">
                        <h3 className="font-medium flex items-center gap-2 mb-6">
                            <BookOpen className="w-4 h-4 text-white/50" />
                            Recommended Resources
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                                <div className="flex gap-3 items-center">
                                    <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`} alt="Tutor" className="w-full h-full object-cover opacity-80" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold group-hover:text-accent-cyan transition-colors">Kevin Z.</p>
                                        <p className="text-xs text-white/50">Top Tutor • 5.0 ★</p>
                                    </div>
                                </div>
                                <button className="microcopy text-white hover:bg-white/10 px-2 py-1 rounded">BOOK</button>
                            </div>

                            <div className="w-full h-px bg-white/5"></div>

                            <div className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                                <div>
                                    <p className="text-sm font-bold group-hover:text-accent-cyan transition-colors">Elite COMP3121 Notes</p>
                                    <p className="text-xs text-white/50">Marketplace • 240 sales</p>
                                </div>
                                <span className="font-mono text-sm font-bold">$12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
