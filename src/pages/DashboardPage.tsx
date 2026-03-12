import { Activity, BookOpen, Target, Cpu, AlertTriangle, ChevronRight, BarChart3, TrendingUp, Sparkles, Plus, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 40, damping: 20 } as any }
};

const STAGGER: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const FLOAT: Variants = {
    hidden: { y: 0 },
    show: {
        y: [-20, 20, -20],
        transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } as any
    }
};

const MiniGraph = ({ data, color }: { data: number[], color: string }) => {
    const max = 100;
    const min = Math.max(Math.min(...data) - 10, 0);
    const range = max - min || 1;

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((val - min) / range) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-24 h-6 overflow-visible opacity-80 hidden sm:block">
            <motion.polyline
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                points={points}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
};

const SegmentedBar = ({ percentage, colorClass, glowShadow }: { percentage: number, colorClass: string, glowShadow: string }) => {
    const total = 40;
    const active = Math.round((percentage / 100) * total);

    return (
        <div className="flex gap-[2px] h-[4px] w-full mt-5">
            {[...Array(total)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ delay: 0.1 + (i * 0.01) }}
                    className={`flex-1 rounded-[1px] transition-colors ${i < active ? `${colorClass} ${i >= active - 3 ? glowShadow : ''}` : 'bg-white/5'}`}
                ></motion.div>
            ))}
        </div>
    );
};

export default function DashboardPage() {
    return (
        <div className="w-full h-full max-w-7xl mx-auto pb-20 relative overflow-hidden">
            {/* Background Orbs */}
            <motion.div variants={FLOAT} initial="hidden" animate="show" className="absolute top-[5%] right-[5%] w-[500px] h-[500px] bg-accent-indigo/5 rounded-full blur-[120px] pointer-events-none z-0" />
            <motion.div variants={FLOAT} initial="hidden" animate="show" transition={{ delay: 2, duration: 10 }} className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* Header / Top Bar */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2 relative z-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                        <span className="microcopy text-accent-emerald tracking-[0.2em] font-bold">SYSTEM ONLINE & SYNCED</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tight">Command Center</h1>
                </div>
                <div className="flex gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#050505] border border-white/10 hover:border-white/20 px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-sm font-medium"
                    >
                        <Plus className="w-4 h-4 text-white/50" />
                        Add Task
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black hover:bg-white/90 px-8 py-3 rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        <Sparkles className="w-4 h-4" />
                        Ask AI
                    </motion.button>
                </div>
            </motion.div>

            {/* Main Grid Architecture */}
            <motion.div variants={STAGGER} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                {/* LEFT/CENTER STACK (8 cols) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* HERO: Academic Readiness Engine */}
                    <motion.div variants={FADE_UP} className="glass-panel-raised p-1 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-indigo/10 blur-[100px] group-hover:bg-accent-indigo/20 transition-all duration-1000 pointer-events-none rounded-full"></div>
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]"></div>

                        <div className="bg-[#050505]/90 backdrop-blur-xl w-full h-full rounded-[20px] p-8 lg:p-10 border border-white/5 relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                                <div>
                                    <h2 className="text-3xl font-display font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Academic Readiness Engine</h2>
                                    <p className="text-white/40 text-base max-w-md">Quantum analysis of your semester trajectory and knowledge distribution.</p>
                                </div>
                                <div className="text-right">
                                    <span className="microcopy text-white/40 block mb-2 font-bold tracking-widest">AGGREGATE READINESS</span>
                                    <div className="text-5xl font-display font-medium text-accent-cyan drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">84<span className="text-2xl text-white/30">/100</span></div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Course Cards with entrance animations */}
                                {[
                                    { icon: Activity, color: "accent-emerald", name: "Algorithms & Data Structures", code: "COMP3121", score: 92, data: [65, 70, 75, 82, 88, 92] },
                                    { icon: AlertTriangle, color: "accent-amber", name: "Higher Linear Algebra", code: "MATH1141", score: 58, data: [80, 75, 65, 60, 58, 58], warning: "LOW READINESS" },
                                    { icon: BookOpen, color: "white", name: "Machine Learning Foundations", code: "COMP3411", score: 81, data: [70, 72, 75, 78, 80, 81] }
                                ].map((course, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                                        className="p-6 rounded-2xl bg-[#050505] border border-white/5 hover:border-white/20 transition-all duration-500 group/card"
                                    >
                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2">
                                            <div className="flex items-center gap-5 w-full">
                                                <div className={`w-12 h-12 rounded-xl bg-${course.color}/10 border border-${course.color}/20 flex items-center justify-center transition-transform group-hover/card:scale-110 duration-500`}>
                                                    <course.icon className={`w-6 h-6 text-${course.color === 'white' ? 'white/70' : course.color}`} />
                                                </div>
                                                <div>
                                                    <span className="font-bold text-lg block text-white/90 group-hover/card:text-white transition-colors">{course.name}</span>
                                                    <span className="text-xs text-white/40 font-mono tracking-[0.2em] mt-1 block uppercase">{course.code}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
                                                {course.warning && (
                                                    <span className="microcopy text-accent-amber font-bold animate-pulse whitespace-nowrap">{course.warning}</span>
                                                )}
                                                <MiniGraph data={course.data} color={`text-${course.color === 'white' ? 'white/70' : course.color}`} />
                                                <div className="text-right w-16">
                                                    <span className={`font-mono text-2xl font-bold text-${course.color === 'white' ? 'white' : course.color} block`}>{course.score}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <SegmentedBar
                                            percentage={course.score}
                                            colorClass={`bg-${course.color === 'white' ? 'white/70' : course.color}`}
                                            glowShadow={`shadow-[0_0_15px_rgba(${course.color === 'accent-emerald' ? '16,185,129' : course.color === 'accent-amber' ? '245,158,11' : '255,255,255'},0.6)] ${course.warning ? 'animate-pulse' : ''}`}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.05)" }}
                                whileTap={{ scale: 0.99 }}
                                className="w-full mt-10 bg-[#050505] border border-white/10 hover:border-white/30 text-white font-bold py-4 rounded-2xl transition-all text-sm flex justify-center items-center gap-3 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                                View Detailed Academic Intelligence
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Split Row: Deadlines & AI Plan */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Upcoming Deadlines */}
                        <motion.div variants={FADE_UP} className="glass-panel p-8 flex flex-col h-full bg-[#050505] border-white/5 hover:border-white/10 transition-all duration-500 shadow-xl">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-display font-medium flex items-center gap-3">
                                    <Target className="w-5 h-5 text-white/40" />
                                    Critical Timeline
                                </h3>
                            </div>

                            <div className="space-y-4 flex-1">
                                {[
                                    { label: "TMRW", color: "accent-amber", title: "Linear Algebra Quiz 4", sub: "MATH1141 • Covers Eigenvectors" },
                                    { label: "OCT 14", color: "accent-cyan", title: "ML Assignment 1", sub: "COMP3411 • 15% of Grade" }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.03)" }}
                                        className="group flex items-start gap-4 p-4 rounded-2xl transition-all border border-transparent hover:border-white/5 cursor-pointer"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl bg-${item.color === 'accent-cyan' ? 'accent-cyan/10' : 'accent-amber/10'} border border-${item.color === 'accent-cyan' ? 'accent-cyan/20' : 'accent-amber/20'} flex flex-col items-center justify-center shrink-0`}>
                                            <span className={`text-[10px] font-bold text-${item.color === 'accent-cyan' ? 'accent-cyan' : 'accent-amber'} text-center leading-tight`}>{item.label}</span>
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="font-bold text-base text-white/90 group-hover:text-white transition-colors">{item.title}</h4>
                                            <p className="text-sm text-white/40 mt-1 font-medium">{item.sub}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* AI Active Plan */}
                        <motion.div variants={FADE_UP} className="glass-panel p-8 flex flex-col h-full bg-accent-violet/[0.03] border-accent-violet/10 relative overflow-hidden transition-all duration-500 hover:border-accent-violet/30 shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-violet/10 blur-[80px] pointer-events-none"></div>
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <h3 className="text-xl font-display font-medium flex items-center gap-3 text-white">
                                    <Cpu className="w-5 h-5 text-accent-violet drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                                    Neural Protocol
                                </h3>
                            </div>

                            <div className="relative z-10 flex-1 flex flex-col">
                                <p className="text-base text-white/60 leading-relaxed mb-8">
                                    Syllabus drift detected in MATH1141. I've restructured your evening to prioritize Eigenvector mastery before the quiz.
                                </p>

                                <div className="bg-[#050505]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 mt-auto">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-lg text-white">Intensive Session</span>
                                        <span className="microcopy text-accent-violet font-bold bg-accent-violet/10 px-3 py-1 rounded-full flex items-center gap-2">
                                            <Clock className="w-3 h-3" />
                                            19h00
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/40 mb-6 font-medium">Focus: Eigenvectors & Orthogonality</p>
                                    <motion.button
                                        whileHover={{ scale: 1.02, backgroundColor: "rgb(139, 92, 246)" }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-accent-violet text-white font-bold py-4 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                                    >
                                        Initialize Protocol
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* RIGHT STACK (4 cols) */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Immediate Actions / Attention Required */}
                    <motion.div variants={FADE_UP} className="glass-panel p-8 border-accent-amber/20 bg-accent-amber/[0.03] hover:border-accent-amber/40 transition-all duration-500 shadow-xl">
                        <h3 className="text-lg font-display font-medium text-accent-amber flex items-center gap-3 mb-6">
                            <AlertTriangle className="w-5 h-5" />
                            System Alerts
                        </h3>
                        <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                            <p className="text-base text-white/80 mb-6 leading-relaxed">
                                Missed <span className="text-white font-bold underline decoration-accent-amber/30 text-lg">2 lectures</span> for COMP3121. Semantic indexing pending.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-3 rounded-xl transition-all"
                            >
                                Reconstruct Knowledge
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Resource Economy Component */}
                    <motion.div variants={FADE_UP} className="glass-panel p-8 bg-[#050505] border-white/5 hover:border-white/10 transition-all duration-500 shadow-xl relative overflow-hidden group">
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent-emerald/5 blur-[60px] pointer-events-none group-hover:bg-accent-emerald/10 transition-all duration-1000"></div>
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-lg font-display font-medium flex items-center gap-3">
                                <BarChart3 className="w-5 h-5 text-white/40" />
                                Resource Economy
                            </h3>
                            <span className="microcopy text-accent-emerald font-bold bg-accent-emerald/10 px-3 py-1 rounded-full tracking-tighter">LICENSED SELLER</span>
                        </div>

                        <div className="mb-8">
                            <span className="text-5xl font-display font-medium text-white">$480<span className="text-2xl text-white/30">.00</span></span>
                            <div className="flex items-center gap-2 mt-3 p-2 bg-accent-emerald/5 w-fit rounded-lg border border-accent-emerald/10">
                                <TrendingUp className="w-4 h-4 text-accent-emerald" />
                                <span className="text-sm font-bold text-accent-emerald">+12% velocity</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { item: "COMP3121 Notes", price: "+$120", color: "text-white" },
                                { item: "MATH1141 Guide", price: "+$45", color: "text-white/80" },
                                { item: "ML Foundations", price: "+$25", color: "text-white/60" }
                            ].map((row, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 5 }}
                                    className="flex justify-between items-center py-3 border-b border-white/5 last:border-0"
                                >
                                    <span className={`text-base font-medium ${row.color}`}>{row.item}</span>
                                    <span className="font-mono text-base font-bold text-accent-cyan">{row.price}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Upcoming Tutoring */}
                    <motion.div variants={FADE_UP} className="glass-panel p-8 bg-[#050505] border-white/5 hover:border-accent-cyan/20 transition-all duration-500 shadow-xl">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-lg font-display font-medium flex items-center gap-3">
                                <Users className="w-5 h-5 text-white/40" />
                                Sync Sessions
                            </h3>
                            <button className="microcopy text-white/40 hover:text-white transition-colors font-bold tracking-widest">HISTORY</button>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="bg-[#050505] border border-accent-cyan/20 rounded-2xl p-6 relative overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.05)]"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-accent-cyan shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                            <div className="flex justify-between items-center mb-4 pl-4">
                                <span className="text-[10px] font-bold font-mono text-accent-cyan tracking-[0.2em] bg-accent-cyan/10 px-3 py-1 rounded-full uppercase">DEPLOYING IN 2H</span>
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#050505] bg-gradient-to-tr from-white/10 to-transparent flex items-center justify-center text-[10px] font-bold text-white/40`}>
                                            <Users className="w-3 h-3" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <h4 className="font-bold text-xl pl-4 text-white">DSA Mastery Vol. 4</h4>
                            <p className="text-sm text-white/50 pl-4 mt-2 font-medium">Lead Sync • Kevin Zhao</p>
                        </motion.div>
                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
}
