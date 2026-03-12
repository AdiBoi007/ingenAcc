import { useState } from "react";
import { Calendar as CalendarIcon, Target, ChevronLeft, ChevronRight, Lock, Brain, Zap, Users, AlertOctagon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function PlannerPage() {
    const [isPanicMode, setIsPanicMode] = useState(false);

    return (
        <div className={`w-full h-full max-w-7xl mx-auto pb-20 relative overflow-hidden transition-colors duration-1000 ${isPanicMode ? 'bg-red-500/[0.02]' : ''}`}>
            {/* Immersive Background Orbs */}
            <motion.div variants={FLOAT} initial="hidden" animate="show" className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-accent-violet/5 rounded-full blur-[120px] pointer-events-none z-0" />
            <motion.div variants={FLOAT} initial="hidden" animate="show" transition={{ delay: 2, duration: 10 } as any} className="absolute bottom-[10%] right-[0%] w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none z-0" />

            <AnimatePresence>
                {isPanicMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-red-500/[0.03] pointer-events-none z-10"
                    >
                        <motion.div
                            animate={{ opacity: [0, 0.2, 0] }}
                            transition={{ duration: 0.1, repeat: Infinity }}
                            className="absolute inset-0 bg-red-500/[0.1]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2 relative z-20">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        {isPanicMode ? (
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="flex items-center gap-3"
                            >
                                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]"></span>
                                <span className="microcopy text-red-500 tracking-[0.2em] font-bold uppercase">PANIC PROTOCOL ENGAGED</span>
                            </motion.div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-accent-violet shadow-[0_0_10px_rgba(139,92,246,0.5)] animate-pulse"></span>
                                <span className="microcopy text-accent-violet tracking-[0.2em] font-bold uppercase tracking-[0.2em]">AI SCHEDULER ACTIVE</span>
                            </div>
                        )}
                    </div>
                    <motion.h1
                        key={isPanicMode ? 'panic' : 'normal'}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-4xl md:text-6xl font-display font-medium tracking-tight ${isPanicMode ? 'text-red-500' : 'text-white'}`}
                    >
                        {isPanicMode ? 'System Under Pressure' : 'Time Control'}
                    </motion.h1>
                </div>
                <div className="flex gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#050505] border border-white/10 hover:border-white/20 px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-sm font-medium"
                    >
                        <Target className="w-4 h-4 text-white/50" />
                        Today
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsPanicMode(!isPanicMode)}
                        className={`px-8 py-4 rounded-xl transition-all flex items-center gap-3 text-sm font-bold shadow-2xl ${isPanicMode
                            ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                            : 'bg-accent-violet text-white hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                            }`}
                    >
                        {isPanicMode ? <AlertOctagon className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                        {isPanicMode ? 'ABORT PANIC MODE' : 'INITIALIZE PANIC MODE'}
                    </motion.button>
                </div>
            </motion.div>

            <motion.div variants={STAGGER} initial="hidden" animate="show" className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-20">

                {/* CALENDAR VIEW (8 cols) */}
                <motion.div variants={FADE_UP} className="xl:col-span-8 space-y-6">
                    <div className={`glass-panel p-8 flex flex-col h-[750px] bg-[#050505] border-white/5 transition-all duration-700 ${isPanicMode ? 'border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.05)]' : 'hover:border-white/10 shadow-2xl'}`}>
                        {/* Calendar Header */}
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-display font-medium flex items-center gap-3">
                                <CalendarIcon className="w-6 h-6 text-white/40" />
                                <span>October <span className="text-white/30 ml-1">2024</span></span>
                            </h2>
                            <div className="flex gap-3">
                                <motion.button whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }} className="p-3 bg-[#050505] border border-white/10 rounded-xl transition-colors">
                                    <ChevronLeft className="w-5 h-5" />
                                </motion.button>
                                <motion.button whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }} className="p-3 bg-[#050505] border border-white/10 rounded-xl transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Calendar Grid Header */}
                        <div className="grid grid-cols-7 gap-6 mb-6 text-center">
                            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                                <span key={day} className="microcopy text-white/20 font-bold tracking-widest">{day}</span>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="flex-1 grid grid-cols-7 gap-4 auto-rows-fr">
                            {[...Array(35)].map((_, i) => {
                                const dayNum = i - 1;
                                const isCurrentMonth = dayNum > 0 && dayNum <= 31;
                                const isToday = dayNum === 15;
                                const hasEvent = [14, 15, 18, 22].includes(dayNum);
                                const hasUrgent = [16, 17].includes(dayNum);

                                const showNormalEvents = !isPanicMode && hasEvent;

                                return (
                                    <motion.div
                                        key={i}
                                        whileHover={isCurrentMonth ? { y: -5, backgroundColor: "rgba(255,255,255,0.03)" } : {}}
                                        className={`rounded-2xl p-3 border transition-all duration-500 flex flex-col items-center justify-start group cursor-crosshair relative overflow-hidden ${isToday ? 'bg-white/5 border-white/20 shadow-lg' :
                                            isCurrentMonth ? 'bg-[#050505] border-white/5 hover:border-white/20' :
                                                'bg-transparent border-transparent opacity-10 pointer-events-none'
                                            } ${isPanicMode && hasUrgent ? 'border-red-500/40 bg-red-500/[0.05] shadow-[0_0_20px_rgba(239,68,68,0.1)]' : ''}`}
                                    >
                                        <span className={`text-sm font-mono mt-1 z-10 ${isToday ? 'text-white font-bold' : isPanicMode && hasUrgent ? 'text-red-500 font-bold' : 'text-white/40'}`}>
                                            {isCurrentMonth ? dayNum : ''}
                                        </span>

                                        <div className="mt-auto mb-2 flex flex-col items-center gap-1.5 w-full z-10 px-1">
                                            {showNormalEvents && (
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex gap-1.5">
                                                    <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                                                    <div className="w-2 h-2 rounded-full bg-accent-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                </motion.div>
                                            )}
                                            {isPanicMode && hasUrgent && (
                                                <motion.div
                                                    animate={{ opacity: [1, 0.4, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                    className="w-full h-1 bg-red-500/50 rounded-full"
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* SIDEBAR PROTOCOLS (4 cols) */}
                <motion.div variants={FADE_UP} className="xl:col-span-4 space-y-8">

                    {/* Efficiency Score */}
                    <div className="glass-panel p-8 bg-[#050505] border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-emerald/5 blur-[50px] pointer-events-none group-hover:bg-accent-emerald/10 transition-all duration-700"></div>
                        <h3 className="text-lg font-display font-medium flex items-center gap-3 mb-8">
                            <Zap className="w-5 h-5 text-accent-emerald" />
                            Temporal Efficiency
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-4xl font-display font-medium text-white">94%</span>
                            <span className="text-xs font-bold text-accent-emerald bg-accent-emerald/10 px-3 py-1 rounded-full uppercase tracking-tighter">OPTIMIZED</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "94%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-accent-emerald shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            />
                        </div>
                    </div>

                    {/* AI Insights Panel */}
                    <div className={`glass-panel p-8 border-white/5 transition-all duration-700 ${isPanicMode ? 'bg-red-500/[0.03] border-red-500/20 shadow-2xl scale-[1.02]' : 'bg-[#050505] shadow-xl'}`}>
                        <h3 className={`text-lg font-display font-medium flex items-center gap-3 mb-8 ${isPanicMode ? 'text-red-500' : 'text-white'}`}>
                            {isPanicMode ? <AlertOctagon className="w-5 h-5" /> : <Brain className="w-5 h-5 text-accent-violet" />}
                            {isPanicMode ? 'Recovery Protocol' : 'Neural Analysis'}
                        </h3>

                        <div className="space-y-6">
                            {isPanicMode ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                                    <p className="text-sm font-medium text-red-100 leading-relaxed">
                                        Critical drift detected in MATH1141. Deploying intensive 4-hour study blocks tonight and tomorrow morning. Aborting non-essential syncs.
                                    </p>
                                    <button className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl text-xs transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                                        EXECUTE RECOVERY PLAN
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                        <p className="text-sm text-white/50 leading-relaxed">
                                            Your academic velocity is peak. However, <span className="text-accent-cyan font-bold">Algorithms Review</span> takes 30% longer than average. I've padded your Thursday block.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-xl bg-accent-violet/10 flex items-center justify-center border border-accent-violet/20 group-hover:scale-110 transition-all">
                                            <Users className="w-5 h-5 text-accent-violet" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Study Group Potential</h4>
                                            <p className="text-xs text-white/40">3 peers active in COMP3121</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Focus Stats */}
                    <div className="flex items-center justify-between px-2">
                        <div className="text-center">
                            <span className="block text-2xl font-display font-medium">12h</span>
                            <span className="microcopy text-white/30 text-[10px] font-bold">PLANNED</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <span className="block text-2xl font-display font-medium">8h</span>
                            <span className="microcopy text-white/30 text-[10px] font-bold">REMAINING</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <span className="block text-2xl font-display font-medium text-accent-cyan">4</span>
                            <span className="microcopy text-white/30 text-[10px] font-bold">TASKS</span>
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        </div>
    );
}
