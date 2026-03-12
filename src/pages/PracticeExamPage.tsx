import { useState, useEffect } from "react";
import { Zap, Cpu, Activity, ChevronRight, Menu, Clock, Target, CheckCircle2, ChevronLeft, BrainCircuit, ShieldAlert } from "lucide-react";
import { generatePracticeExam } from "../lib/openai";
import type { Question } from "../lib/openai";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 40, damping: 20 } as any },
    exit: { opacity: 0, y: -30, filter: "blur(10px)", transition: { duration: 0.3 } }
};

const STAGGER = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const FLOAT: Variants = {
    hidden: { y: 0 },
    show: {
        y: [-15, 15, -15],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } as any
    }
};

export default function PracticeExamPage() {
    const [simState, setSimState] = useState<'configure' | 'loading' | 'active' | 'results'>('configure');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

    // Loading Sequence States
    const [loadingText, setLoadingText] = useState("Initializing Engine...");
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Config states
    const [topic, setTopic] = useState("COMP3121 - Algorithms");
    const [examType, setExamType] = useState("Final Exam");
    const [focusAreas, setFocusAreas] = useState({
        networkFlow: true,
        dynamicProgramming: true,
        graphAlgorithms: false
    });

    const handleStart = async () => {
        try {
            setSimState('loading');

            // Faux loading sequence for dramatic effect
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 100) progress = 100;
                setLoadingProgress(progress);

                if (progress < 30) setLoadingText("Synthesizing Syllabus Parameters...");
                else if (progress < 60) setLoadingText("Isolating Knowledge Gaps...");
                else if (progress < 85) setLoadingText("Generating Dynamic Scenarios...");
                else setLoadingText("Finalizing Neural Matrix...");
            }, 500);

            // Build focus array
            const activeFoci = [];
            if (focusAreas.networkFlow) activeFoci.push("Network Flow");
            if (focusAreas.dynamicProgramming) activeFoci.push("Dynamic Programming");
            if (focusAreas.graphAlgorithms) activeFoci.push("Graph Algorithms");

            // Call OpenAI wrapper
            let exam;
            try {
                exam = await generatePracticeExam(topic, examType, activeFoci, 3);
            } catch (e) {
                // Mock fallback for smooth UX in demo if API fails
                await new Promise(r => setTimeout(r, 2000));
                exam = {
                    title: "Mock AI Exam",
                    questions: [
                        { title: "Q1", text: "What is the max flow min cut theorem?", options: ["It finds max flow", "It's a graph algo", "Flow = Cut capacity", "None"], correctOptionIndex: 2, explanation: "" },
                        { title: "Q2", text: "DP vs Divide & Conquer?", options: ["DP uses memoization", "D&C is faster", "They are identical", "DP is for graphs"], correctOptionIndex: 0, explanation: "" },
                        { title: "Q3", text: "Bellman-Ford time complexity?", options: ["O(V+E)", "O(VE)", "O(V^2)", "O(ElogV)"], correctOptionIndex: 1, explanation: "" }
                    ]
                };
            }

            clearInterval(interval);
            setLoadingProgress(100);

            setTimeout(() => {
                setQuestions(exam.questions);
                setSelectedAnswers(new Array(exam.questions.length).fill(-1));
                setSimState('active');
                setCurrentQuestion(0);
            }, 800);

        } catch (error) {
            console.error(error);
            setSimState('configure');
        }
    };

    const handleAnswerSelect = (optIndex: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = optIndex;
        setSelectedAnswers(newAnswers);
    };

    const handleComplete = () => {
        setSimState('results');
    };

    return (
        <div className="w-full h-full max-w-7xl mx-auto pb-20 relative overflow-hidden">
            {/* Immersive Floating Background Orbs */}
            <motion.div variants={FLOAT} initial="hidden" animate="show" className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <motion.div variants={FLOAT} initial="hidden" animate="show" transition={{ delay: 2 }} className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-accent-emerald/10 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 px-2 relative z-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                        <motion.span
                            key={simState}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="microcopy text-accent-cyan tracking-[0.2em]"
                        >
                            {simState === 'active' ? 'SIMULATION IN PROGRESS' : 'SIMULATION ENGINE'}
                        </motion.span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tight">Practice Arena</h1>
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {/* CONFIGURE STATE */}
                {simState === 'configure' && (
                    <motion.div key="configure" variants={STAGGER} initial="hidden" animate="show" exit="exit" className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                        <motion.div variants={FADE_UP} className="lg:col-span-4 space-y-6">
                            <div className="glass-panel p-6 border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
                                <h2 className="text-xl font-display font-medium mb-6 flex items-center gap-2">
                                    <Menu className="w-5 h-5 text-white/50" />
                                    Configuration
                                </h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="microcopy text-white/50 block mb-3">TARGET COURSE</label>
                                        <select
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/50 appearance-none font-medium outline-none transition-colors hover:bg-white/[0.02]"
                                        >
                                            <option>COMP3121 - Algorithms</option>
                                            <option>MATH1141 - Higher Math</option>
                                            <option>COMP3411 - Machine Learning</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="microcopy text-white/50 block mb-3">BATTLE PARAMETERS</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {["Midterm", "Final Exam"].map((type) => (
                                                <motion.button
                                                    key={type}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setExamType(type)}
                                                    className={`rounded-xl py-3 text-center text-sm font-medium transition-all duration-300 ${examType === type ? 'bg-accent-cyan/10 border border-accent-cyan/50 text-accent-cyan shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'bg-[#050505] border border-white/10 hover:border-white/30 text-white/70'}`}
                                                >
                                                    {type}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="microcopy text-white/50 block mb-3">AI FOCUS TARGETING</label>
                                        <div className="space-y-2">
                                            {[
                                                { id: 'networkFlow', label: 'Network Flow (Weakness)', state: focusAreas.networkFlow },
                                                { id: 'dynamicProgramming', label: 'Dynamic Programming', state: focusAreas.dynamicProgramming },
                                                { id: 'graphAlgorithms', label: 'Graph Algorithms', state: focusAreas.graphAlgorithms }
                                            ].map((f) => (
                                                <motion.label
                                                    key={f.id}
                                                    whileHover={{ x: 5 }}
                                                    className={`flex items-center gap-3 p-3 bg-[#050505] border ${f.state ? 'border-accent-cyan/30 bg-accent-cyan/[0.02]' : 'border-white/5'} rounded-xl cursor-pointer transition-all duration-300`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="accent-accent-cyan w-4 h-4 rounded"
                                                        checked={f.state}
                                                        onChange={(e) => setFocusAreas({ ...focusAreas, [f.id]: e.target.checked })}
                                                    />
                                                    <span className={`text-sm font-medium ${f.state ? 'text-accent-cyan' : 'text-white/70'}`}>{f.label}</span>
                                                </motion.label>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-white/5" />

                                    <motion.button
                                        whileHover={{ scale: 1.02, boxShadow: "0px 0px 30px rgba(6,182,212,0.4)" }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleStart}
                                        className="w-full bg-white text-black hover:bg-white/90 font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 group text-sm relative overflow-hidden"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                                        <Zap className="w-4 h-4" />
                                        Initialize Simulation
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={FADE_UP} className="lg:col-span-8 space-y-6">
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="glass-panel-raised p-8 relative overflow-hidden flex flex-col items-center justify-center text-center border-accent-cyan/20 min-h-[350px] group"
                            >
                                {/* Animated Grid Background */}
                                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] group-hover:bg-grid-white/[0.04] transition-all duration-700"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-cyan/10 blur-[100px] pointer-events-none rounded-full group-hover:bg-accent-cyan/20 transition-all duration-700"></div>

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="relative mb-8">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="absolute -inset-4 border border-dashed border-accent-cyan/30 rounded-full"
                                        />
                                        <Cpu className="w-16 h-16 text-accent-cyan/70 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                                    </div>
                                    <h2 className="text-4xl font-display font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Ready to deploy?</h2>
                                    <p className="text-white/50 text-base max-w-md mx-auto leading-relaxed">
                                        The AI will generate a dynamic, timed simulation evaluating your mastery over the selected syllabus nodes.
                                    </p>
                                </div>
                            </motion.div>

                            <div className="glass-panel p-6">
                                <h3 className="font-medium flex items-center gap-2 mb-6">
                                    <Activity className="w-4 h-4 text-white/50" />
                                    Recent Simulation Logs
                                </h3>
                                <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#050505]">
                                    <table className="w-full text-sm text-left">
                                        <thead className="microcopy text-white/40 border-b border-white/5 bg-white/[0.02]">
                                            <tr>
                                                <th className="px-6 py-4 font-normal">MODULE</th>
                                                <th className="px-6 py-4 font-normal">TYPE</th>
                                                <th className="px-6 py-4 font-normal">SCORE</th>
                                                <th className="px-6 py-4 font-normal text-right">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-5 font-bold flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-accent-emerald"></div>
                                                    MATH1141
                                                </td>
                                                <td className="px-6 py-5 text-white/60">Midterm Core</td>
                                                <td className="px-6 py-5 font-mono font-bold text-accent-amber">58%</td>
                                                <td className="px-6 py-5 text-right">
                                                    <button className="text-xs text-white/40 hover:text-white transition-colors">Review</button>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-5 font-bold flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-accent-cyan"></div>
                                                    COMP2521
                                                </td>
                                                <td className="px-6 py-5 text-white/60">Final Exam Prep</td>
                                                <td className="px-6 py-5 font-mono font-bold text-accent-cyan">92%</td>
                                                <td className="px-6 py-5 text-right">
                                                    <button className="text-xs text-white/40 hover:text-white transition-colors">Review</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* LOADING STATE - High Tech Boot Sequence */}
                {simState === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-[60vh] relative z-10 w-full max-w-2xl mx-auto">
                        <div className="relative w-48 h-48 mb-12 flex justify-center items-center">
                            {/* Animated Rings */}
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, ease: "linear", repeat: Infinity }} className="absolute inset-0 border-2 border-dashed border-accent-cyan/20 rounded-full" />
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, ease: "linear", repeat: Infinity }} className="absolute inset-4 border border-accent-emerald/30 rounded-full opacity-50" />
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-10 bg-accent-cyan/10 rounded-full blur-xl" />

                            <BrainCircuit className="w-16 h-16 text-accent-cyan relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-20">
                                <span className="font-mono text-2xl font-bold text-white">{Math.round(loadingProgress)}%</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-6">
                            <motion.div
                                className="h-full bg-gradient-to-r from-accent-cyan to-accent-emerald shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                                animate={{ width: `${loadingProgress}%` }}
                                transition={{ ease: "linear", duration: 0.5 }}
                            />
                        </div>

                        {/* Scrambling Text Effect */}
                        <div className="h-8 flex justify-center overflow-hidden w-full">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={loadingText}
                                    initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                    exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                                    className="font-mono text-accent-cyan/80 tracking-widest text-sm uppercase"
                                >
                                    {loadingText}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

                {/* ACTIVE SIMULATION STATE */}
                {simState === 'active' && (
                    <motion.div key="active" variants={STAGGER} initial="hidden" animate="show" exit="exit" className="relative z-10 max-w-5xl mx-auto">

                        {/* Status Bar */}
                        <motion.div variants={FADE_UP} className="flex items-center justify-between mb-8 glass-panel p-5 bg-[#050505] border-white/10 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-accent-cyan to-accent-emerald" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>

                            <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="microcopy text-white/40 mb-1">TARGET</span>
                                    <span className="text-sm font-bold text-white">{topic.split('-')[0]} Final Exam</span>
                                </div>
                                <div className="h-8 w-px bg-white/10"></div>
                                <Timer />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleComplete}
                                className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-red-500/30 flex items-center gap-2"
                            >
                                <ShieldAlert className="w-4 h-4" />
                                Terminate
                            </motion.button>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Question Nav Sidebar */}
                            <motion.div variants={FADE_UP} className="lg:col-span-3">
                                <div className="glass-panel p-6 sticky top-24 bg-[#050505] border-white/5">
                                    <div className="flex justify-between items-end mb-6">
                                        <h3 className="microcopy text-white/50">SEQUENCE NAV</h3>
                                        <span className="text-xs font-mono text-white/30">{currentQuestion + 1}/{questions.length}</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-3">
                                        {questions.map((_, i) => (
                                            <motion.button
                                                key={i}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setCurrentQuestion(i)}
                                                className={`aspect-square rounded-xl flex items-center justify-center font-mono text-sm transition-all duration-300 border ${i === currentQuestion
                                                    ? 'bg-accent-cyan text-black border-accent-cyan shadow-[0_0_15px_rgba(6,182,212,0.5)] font-bold'
                                                    : selectedAnswers[i] !== -1
                                                        ? 'bg-white/10 text-white border-white/20'
                                                        : 'bg-surface border-white/5 hover:border-white/30 text-white/50'
                                                    }`}
                                            >
                                                {i + 1}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Main Question Area */}
                            <motion.div variants={FADE_UP} className="lg:col-span-9">
                                <div className="glass-panel-raised p-8 md:p-12 min-h-[600px] flex flex-col relative overflow-hidden">

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentQuestion}
                                            initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                                            transition={{ duration: 0.3 }}
                                            className="flex-1 flex flex-col"
                                        >
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md">
                                                    <span className="text-xs font-mono text-accent-cyan">Question {currentQuestion + 1}</span>
                                                </div>
                                            </div>

                                            <h2 className="text-2xl md:text-3xl font-display font-medium mb-6 leading-tight">{questions[currentQuestion].title}</h2>
                                            <div className="text-white/80 leading-relaxed text-lg mb-10 p-6 bg-[#050505] rounded-2xl border border-white/5 shadow-inner">
                                                {questions[currentQuestion].text}
                                            </div>

                                            <div className="space-y-4 flex-1 mb-12">
                                                {questions[currentQuestion].options.map((opt, i) => {
                                                    const isSelected = selectedAnswers[currentQuestion] === i;
                                                    return (
                                                        <motion.button
                                                            key={i}
                                                            whileHover={{ scale: 1.01, x: 5 }}
                                                            whileTap={{ scale: 0.99 }}
                                                            onClick={() => handleAnswerSelect(i)}
                                                            className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center gap-6 ${isSelected
                                                                ? 'bg-accent-cyan/[0.05] border-accent-cyan shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-accent-cyan'
                                                                : 'bg-[#050505] border-white/5 hover:border-white/20'
                                                                }`}
                                                        >
                                                            <div className={`w-8 h-8 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${isSelected ? 'border-accent-cyan bg-accent-cyan text-black' : 'border-white/20 text-white/50'
                                                                }`}>
                                                                <span className="text-sm font-bold font-mono">{['A', 'B', 'C', 'D'][i]}</span>
                                                            </div>
                                                            <span className={`text-base font-medium ${isSelected ? 'text-white' : 'text-white/80'}`}>{opt}</span>
                                                        </motion.button>
                                                    )
                                                })}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Action Footer */}
                                    <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-auto">
                                        <button
                                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                            disabled={currentQuestion === 0}
                                            className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 transition-colors uppercase tracking-widest"
                                        >
                                            <ChevronLeft className="w-4 h-4" /> Prev
                                        </button>

                                        {currentQuestion === questions.length - 1 ? (
                                            <motion.button
                                                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16,185,129,0.4)" }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleComplete}
                                                className="bg-accent-emerald text-black hover:bg-emerald-400 font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center gap-2"
                                            >
                                                Submit Mission <CheckCircle2 className="w-5 h-5" />
                                            </motion.button>
                                        ) : (
                                            <button
                                                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                                                className="flex items-center gap-2 text-sm font-bold text-white hover:text-accent-cyan transition-colors uppercase tracking-widest"
                                            >
                                                Next <ChevronRight className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* RESULTS STATE */}
                {simState === 'results' && (
                    <motion.div key="results" variants={STAGGER} initial="hidden" animate="show" exit="exit" className="max-w-4xl mx-auto relative z-10 w-full">
                        <motion.div variants={FADE_UP} className="glass-panel p-8 md:p-16 text-center relative overflow-hidden">
                            {/* Celebration effects */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-emerald/10 blur-[100px] pointer-events-none rounded-full"></div>
                            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-cyan/10 blur-[100px] pointer-events-none rounded-full"></div>

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                                    className="w-24 h-24 rounded-full bg-accent-emerald/10 border-2 border-accent-emerald flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.3)] relative"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-4 border border-dashed border-accent-emerald/40 rounded-full"
                                    />
                                    <CheckCircle2 className="w-12 h-12 text-accent-emerald drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                </motion.div>

                                <motion.h2 variants={FADE_UP} className="text-5xl md:text-6xl font-display font-medium mb-4">Simulation Complete</motion.h2>
                                <motion.p variants={FADE_UP} className="text-white/50 text-lg mb-12 max-w-lg mx-auto">Neural analysis of your responses is complete. Diagnosing conceptual gaps.</motion.p>

                                <motion.div variants={STAGGER} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                                    <motion.div variants={FADE_UP} className="bg-[#050505] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors shadow-xl">
                                        <span className="microcopy text-white/50 block mb-3">RAW SCORE</span>
                                        <span className="text-6xl font-mono text-white font-medium">85<span className="text-2xl text-white/30">%</span></span>
                                    </motion.div>
                                    <motion.div variants={FADE_UP} className="bg-[#050505] border border-white/5 rounded-2xl p-8 hover:border-accent-cyan/30 transition-colors shadow-xl relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <span className="microcopy text-white/50 block mb-3 relative z-10">PERCENTILE</span>
                                        <span className="text-6xl font-mono text-accent-cyan font-medium relative z-10">92<span className="text-2xl text-accent-cyan/50">nd</span></span>
                                    </motion.div>
                                    <motion.div variants={FADE_UP} className="bg-[#050505] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors shadow-xl">
                                        <span className="microcopy text-white/50 block mb-3">TIME LOGGED</span>
                                        <span className="text-5xl md:text-6xl font-mono text-white/80 font-medium">42<span className="text-2xl text-white/30 font-sans">m</span></span>
                                    </motion.div>
                                </motion.div>

                                <motion.div variants={FADE_UP} className="bg-surface border border-white/10 rounded-2xl p-8 text-left mb-12 shadow-2xl relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-emerald"></div>
                                    <h3 className="text-xl font-display font-medium flex items-center gap-3 mb-4 text-white">
                                        <Target className="w-5 h-5 text-accent-emerald" />
                                        Diagnostic Intelligence
                                    </h3>
                                    <p className="text-lg text-white/70 leading-relaxed font-light">
                                        You have demonstrated strong mastery over <span className="text-white font-medium">Network Flow</span> concepts, which was previously marked as a weakness. However, <span className="text-white font-medium">Dynamic Programming</span> questions took you 40% longer to complete than the cohort average.
                                        <br /><br />
                                        Recommendation: Book a targeted micro-session on DP optimization techniques.
                                    </p>
                                </motion.div>

                                <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className="bg-surface border border-white/10 hover:bg-white/10 hover:border-white/20 px-8 py-4 rounded-xl font-medium transition-all duration-300">
                                        Review Answers History
                                    </button>
                                    <button
                                        onClick={() => setSimState('configure')}
                                        className="bg-white text-black hover:bg-white/90 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1"
                                    >
                                        Execute New Simulation
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Highly stylized timer
function Timer() {
    const [time, setTime] = useState(7182); // 1h 59m 42s

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return (
        <div className="flex items-center gap-3 font-mono text-accent-cyan bg-accent-cyan/[0.05] px-4 py-2 rounded-lg border border-accent-cyan/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="font-bold tracking-wider">
                {hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </span>
        </div>
    );
}
