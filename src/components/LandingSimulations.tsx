import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain, Zap, Calendar, TrendingUp, Users,
    Command, CheckCircle2, ArrowRight, Star,
} from "lucide-react";

// ─── SUBJECT PORTFOLIO (STOCK CHART) SIM ─────────────────────────────────────
export function StudyDashSim() {
    const subjects = [
        {
            name: "Cybersecurity",
            ticker: "CYB",
            pct: 88,
            change: "+12.4%",
            up: true,
            color: "#22d3ee",
            data: [42, 48, 44, 55, 52, 61, 58, 70, 67, 78, 74, 88],
        },
        {
            name: "Macroeconomics",
            ticker: "MCR",
            pct: 61,
            change: "-3.2%",
            up: false,
            color: "#fbbf24",
            data: [70, 68, 72, 65, 60, 63, 58, 65, 62, 58, 64, 61],
        },
        {
            name: "Data Structures",
            ticker: "DSA",
            pct: 45,
            change: "-8.1%",
            up: false,
            color: "#a78bfa",
            data: [62, 58, 55, 52, 60, 54, 48, 50, 46, 48, 43, 45],
        },
        {
            name: "Java Programming",
            ticker: "JAV",
            pct: 74,
            change: "+5.7%",
            up: true,
            color: "#34d399",
            data: [55, 58, 54, 60, 63, 61, 65, 68, 71, 69, 72, 74],
        },
    ];

    const [visible, setVisible] = useState(false);
    const [nudge, setNudge] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setVisible(true);
                setTimeout(() => setNudge(true), 2800);
            }
        }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const toPath = (data: number[]) => {
        const W = 120, H = 40;
        const min = Math.min(...data);
        const max = Math.max(...data);
        const pts = data.map((v, i) => {
            const x = (i / (data.length - 1)) * W;
            const y = H - ((v - min) / (max - min || 1)) * H;
            return `${x},${y}`;
        });
        return {
            line: `M ${pts.join(" L ")}`,
            area: `M ${pts.join(" L ")} L ${W},${H} L 0,${H} Z`,
        };
    };

    return (
        <div ref={ref} className="bg-black border border-white/[0.08] rounded-2xl overflow-hidden">
            {/* Titlebar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#060606]">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs font-mono text-white/25 ml-2">ingen — Subject Portfolio</span>
                <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Live</span>
                </div>
            </div>

            <div className="p-5 space-y-3">
                {/* Portfolio header */}
                <div className="flex items-end justify-between mb-1">
                    <div>
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-0.5">Portfolio value</p>
                        <p className="text-3xl font-bold text-white">67<span className="text-lg text-white/40">pts</span></p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-lg">
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span className="text-xs font-mono text-amber-400">2 assets need attention</span>
                    </div>
                </div>

                {/* Subject stock rows */}
                {subjects.map((s) => {
                    const { line, area } = toPath(s.data);
                    return (
                        <div key={s.ticker} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl hover:border-white/[0.1] transition-all duration-300">
                            <div className="w-10 shrink-0">
                                <p className="text-[10px] font-mono font-bold text-white/70">{s.ticker}</p>
                                <p className="text-[9px] text-white/25 truncate">{s.name}</p>
                            </div>
                            <div className="flex-1">
                                <svg viewBox="0 0 120 40" className="w-full h-8" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id={`grad-${s.ticker}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={s.color} stopOpacity="0.25" />
                                            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <motion.path
                                        d={area}
                                        fill={`url(#grad-${s.ticker})`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: visible ? 1 : 0 }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                    />
                                    <motion.path
                                        d={line}
                                        fill="none"
                                        stroke={s.color}
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: visible ? 1 : 0 }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                    />
                                    {visible && (
                                        <motion.circle
                                            cx="120"
                                            cy={40 - ((s.data[11] - Math.min(...s.data)) / (Math.max(...s.data) - Math.min(...s.data) || 1)) * 40}
                                            r="2.5"
                                            fill={s.color}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 1.2 }}
                                        />
                                    )}
                                </svg>
                            </div>
                            <div className="text-right shrink-0 w-14">
                                <p className="text-sm font-bold text-white">{s.pct}</p>
                                <p className={`text-[10px] font-mono ${s.up ? "text-accent-emerald" : "text-red-400"}`}>{s.change}</p>
                            </div>
                        </div>
                    );
                })}

                {/* Next session */}
                <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-accent-cyan" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-white">Next block: Macroeconomics</p>
                        <p className="text-[10px] text-white/30 font-mono">Tonight · 20:00 → 22:00 · Locked by AI</p>
                    </div>
                    <div className="text-[10px] font-mono text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-1 rounded-full">TONIGHT</div>
                </div>

                {/* AI Nudge — inline, no overlap */}
                <AnimatePresence>
                    {nudge && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            className="flex items-start gap-2.5 p-3 bg-accent-violet/[0.07] border border-accent-violet/25 rounded-xl"
                        >
                            <Brain className="w-3.5 h-3.5 text-accent-violet shrink-0 mt-0.5" />
                            <p className="text-[11px] text-white/60 leading-relaxed">
                                <span className="text-white font-semibold">AI Nudge:</span> Macroeconomics is dropping. Exam in 6 days. Start tonight?
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── PANIC MODE SIM ───────────────────────────────────────────────────────────
export function PanicModeSim() {
    const [phase, setPhase] = useState(0);
    const [blocks, setBlocks] = useState<number[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started.current) {
                started.current = true;
                setTimeout(() => setPhase(1), 400);
                setTimeout(() => setPhase(2), 1800);
                [0, 1, 2, 3, 4, 5, 6, 7].forEach((i) => setTimeout(() => setBlocks(b => [...b, i]), 2200 + i * 280));
                setTimeout(() => setPhase(3), 4600);
            }
        }, { threshold: 0.4 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const blockData = [
        { day: "Mon", time: "20:00–23:00", subject: "Cybersecurity Core", col: "bg-accent-cyan" },
        { day: "Tue", time: "12:00–14:00", subject: "Past exam practice", col: "bg-accent-cyan" },
        { day: "Tue", time: "19:00–22:00", subject: "Weak areas drill", col: "bg-accent-amber" },
        { day: "Wed", time: "08:00–10:00", subject: "Practice exam #1", col: "bg-accent-violet" },
        { day: "Wed", time: "20:00–23:00", subject: "Cybersecurity Review", col: "bg-accent-cyan" },
        { day: "Thu", time: "17:00–20:00", subject: "Practice exam #2", col: "bg-accent-violet" },
        { day: "Fri", time: "10:00–12:00", subject: "Gaps + corrections", col: "bg-accent-amber" },
        { day: "Fri", time: "19:00–21:00", subject: "Final review", col: "bg-accent-emerald" },
    ];

    return (
        <div ref={ref} className={`rounded-2xl overflow-hidden border transition-all duration-700 ${phase >= 1 ? "border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.15)]" : "border-white/[0.08]"} bg-black`}>
            <div className={`px-5 py-4 border-b transition-all duration-700 ${phase >= 1 ? "border-red-500/20 bg-red-500/[0.04]" : "border-white/[0.06] bg-[#060606]"}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <motion.div
                            animate={phase >= 1 ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}}
                            transition={{ duration: 0.8, repeat: phase >= 1 && phase < 3 ? Infinity : 0 }}
                            className={`w-2 h-2 rounded-full ${phase >= 1 ? "bg-red-500" : "bg-white/20"}`}
                        />
                        <span className={`text-xs font-mono font-bold uppercase tracking-widest ${phase >= 1 ? "text-red-400" : "text-white/30"}`}>
                            {phase === 0 ? "Ingen OS · Normal Mode" : phase === 1 ? "⚡ Activating Panic Mode..." : phase === 2 ? "Building your plan..." : "✓ Panic Mode Active"}
                        </span>
                    </div>
                    <div className="text-[10px] font-mono text-white/30">Exam: <span className={phase >= 1 ? "text-red-400 font-bold" : "text-white/30"}>4 days</span></div>
                </div>
            </div>

            <div className="p-5">
                <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                        { label: "Hours available", val: phase >= 2 ? "24h" : "--", col: "text-accent-cyan" },
                        { label: "Study blocks", val: phase >= 3 ? "8" : phase >= 2 ? "..." : "--", col: "text-accent-amber" },
                        { label: "Predicted score", val: phase >= 3 ? "74%" : "--", col: "text-accent-emerald" },
                    ].map(s => (
                        <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
                            <p className={`text-xl font-bold ${s.col}`}>{s.val}</p>
                            <p className="text-[9px] font-mono text-white/25 uppercase tracking-wider mt-0.5">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">Emergency study schedule</p>
                    <div className="space-y-2">
                        <AnimatePresence>
                            {blockData.filter((_, i) => blocks.includes(i)).map((b) => (
                                <motion.div
                                    key={b.day + b.time}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3 p-2.5 bg-white/[0.03] border border-white/[0.05] rounded-lg"
                                >
                                    <div className={`w-1 h-full min-h-[2rem] rounded-full ${b.col}`} />
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-white">{b.subject}</p>
                                        <p className="text-[10px] font-mono text-white/30">{b.day} · {b.time}</p>
                                    </div>
                                    {phase === 3 && <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {phase < 2 && (
                            <div className="text-center py-4 text-white/20 text-xs font-mono">Waiting for activation...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── EARNINGS SIM ─────────────────────────────────────────────────────────────
export function EarningsSim() {
    const [earnings, setEarnings] = useState(0);
    const [notesSold, setNotesSold] = useState(0);
    const [sessions, setSessions] = useState(0);
    const [persona, setPersona] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    const personas = [
        { name: "Priya S.", unit: "Cybersecurity → tutors Python Basics", role: "Tutor + Student", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Priya&backgroundColor=0d1117", col: "from-accent-cyan/20 to-accent-violet/20" },
        { name: "James K.", unit: "Sells Economics notes → buys Java sessions", role: "Notes seller", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=James&backgroundColor=0d1117", col: "from-accent-amber/20 to-accent-orange/20" },
        { name: "Liu W.", unit: "Mentored by founder → got internship", role: "Career track", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liu&backgroundColor=0d1117", col: "from-accent-emerald/20 to-accent-cyan/20" },
    ];

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started.current) {
                started.current = true;
                const earningsT = setInterval(() => setEarnings(v => { if (v >= 480) { clearInterval(earningsT); return 480; } return v + 8; }), 40);
                const notesT = setInterval(() => setNotesSold(v => { if (v >= 47) { clearInterval(notesT); return 47; } return v + 1; }), 120);
                const sessionsT = setInterval(() => setSessions(v => { if (v >= 12) { clearInterval(sessionsT); return 12; } return v + 1; }), 200);
                const personaT = setInterval(() => setPersona(p => (p + 1) % 3), 3000);
                return () => { clearInterval(earningsT); clearInterval(notesT); clearInterval(sessionsT); clearInterval(personaT); };
            }
        }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const p = personas[persona];

    return (
        <div ref={ref} className="bg-black border border-white/[0.08] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#060606]">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs font-mono text-white/25 ml-2">ingen — Marketplace</span>
            </div>

            <div className="p-5 space-y-4">
                <div className="flex items-end justify-between p-4 bg-accent-emerald/[0.04] border border-accent-emerald/20 rounded-xl">
                    <div>
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Your earnings this month</p>
                        <p className="text-4xl font-bold text-accent-emerald">${earnings}<span className="text-lg text-accent-emerald/50">.00</span></p>
                    </div>
                    <div className="flex items-center gap-1.5 text-accent-emerald text-xs font-mono">
                        <TrendingUp className="w-3.5 h-3.5" />
                        More than your subscription
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                        <p className="text-2xl font-bold text-accent-amber">{notesSold}</p>
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mt-0.5">Notes sold</p>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                        <p className="text-2xl font-bold text-accent-cyan">{sessions}</p>
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mt-0.5">Tutor sessions</p>
                    </div>
                </div>

                <div className="border-t border-white/[0.05] pt-4">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-3">Real student on the platform</p>
                    <AnimatePresence mode="wait">
                        <motion.div key={persona}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl"
                        >
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${p.col} border border-white/10 overflow-hidden shrink-0`}>
                                <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">{p.name}</p>
                                <p className="text-[11px] text-white/40 leading-snug">{p.unit}</p>
                                <p className="text-[10px] font-mono text-accent-emerald mt-0.5 uppercase tracking-wider">{p.role}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// ─── HOW IT WORKS SECTION ────────────────────────────────────────────────────
export function HowItWorksSection() {
    const steps = [
        {
            n: "01", icon: <Command className="w-5 h-5 text-accent-cyan" />,
            title: "Connect your uni life",
            desc: "Link Google Calendar, upload your syllabus, add your courses and deadlines. Takes 2 minutes.",
            detail: ["Calendar & timetable sync", "Upload or paste syllabus", "Set target grades per unit"],
            col: "accent-cyan",
        },
        {
            n: "02", icon: <Brain className="w-5 h-5 text-accent-violet" />,
            title: "AI runs your schedule",
            desc: "The AI watches everything and builds you a week-by-week study plan. It nudges you when you drift.",
            detail: ["Smart study blocks auto-scheduled", "Daily nudges via app", "Readiness scores per unit"],
            col: "accent-violet",
        },
        {
            n: "03", icon: <Users className="w-5 h-5 text-accent-emerald" />,
            title: "Earn on the side",
            desc: "Tutor peers in subjects you've aced. Sell your notes. Get mentored by founders. Get hired.",
            detail: ["Set your own tutor rate", "Upload notes once, earn forever", "Apply to jobs in-platform"],
            col: "accent-emerald",
        },
        {
            n: "04", icon: <Star className="w-5 h-5 text-accent-amber" />,
            title: "Graduate ahead",
            desc: "Better grades, actual experience, money in your pocket, and a job you didn't have to beg for.",
            detail: ["Exit with real work experience", "Network of founders & employers", "Proof of skills through platform"],
            col: "accent-amber",
        },
    ];

    return (
        <section className="w-full bg-[#020202] border-y border-white/[0.05] py-28 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
                style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg mb-5">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">How it works</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        Four steps.<br />One platform.
                    </h2>
                    <p className="text-white/40 max-w-md mx-auto text-base">Everything works together. The AI, the marketplace, and your career — all in one place.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {steps.map((s, i) => (
                        <motion.div
                            key={s.n}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ delay: i * 0.12, type: "spring", stiffness: 50 }}
                            className="relative bg-[#080808] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.14] transition-all duration-300 group overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-${s.col}/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                            <span className="font-mono text-[10px] text-white/20 tracking-widest mb-5 block">{s.n}</span>
                            <div className={`w-10 h-10 rounded-xl bg-${s.col}/10 border border-${s.col}/20 flex items-center justify-center mb-4`}>{s.icon}</div>
                            <h3 className="text-base font-bold text-white mb-2 leading-snug">{s.title}</h3>
                            <p className="text-sm text-white/40 leading-relaxed mb-5">{s.desc}</p>
                            <ul className="space-y-1.5">
                                {s.detail.map(d => (
                                    <li key={d} className="flex items-center gap-2 text-[11px] text-white/35">
                                        <div className={`w-1 h-1 rounded-full bg-${s.col} shrink-0`} />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                            {i < 3 && (
                                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-[#080808] border border-white/[0.08] rounded-full items-center justify-center">
                                    <ArrowRight className="w-3 h-3 text-white/30" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
