import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import { Globe } from "../components/Globe";
import { StudyDashSim, PanicModeSim, EarningsSim, HowItWorksSection } from "../components/LandingSimulations";
import { TalkToIngen } from "../components/TalkToIngen";
import { WaitlistSection } from "../components/WaitlistSection";
import {
    Zap, Activity, ShieldAlert, Brain, Target,
    ArrowRight, CheckCircle2, Users, BookOpen,
    Calendar, TrendingUp, Network,
} from "lucide-react";
import ingenLogo from "../assets/ingen logo.png";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: {
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { type: "spring", stiffness: 50, damping: 22 }
    },
};

const STAGGER = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────


// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
    const [val, setVal] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started.current) {
                started.current = true;
                let cur = 0;
                const step = to / 60;
                const t = setInterval(() => {
                    cur += step;
                    if (cur >= to) { setVal(to); clearInterval(t); }
                    else setVal(Math.round(cur));
                }, 28);
            }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [to]);

    return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── MOUSE PARALLAX ───────────────────────────────────────────────────────────


// ─── SCROLLING MARQUEE ────────────────────────────────────────────────────────
function Marquee({ items }: { items: string[] }) {
    const doubled = [...items, ...items];
    return (
        <div className="overflow-hidden w-full py-5 border-y border-white/[0.05] relative">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="flex gap-10 whitespace-nowrap w-max"
            >
                {doubled.map((item, i) => (
                    <span key={i} className="microcopy flex items-center gap-10 text-white/25">
                        {item} <span className="text-accent-cyan/40">·</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// ─── LIVE TERMINAL SIM ────────────────────────────────────────────────────────



// ─── ICON BOX ────────────────────────────────────────────────────────────────
function IconBox({ icon, color }: { icon: React.ReactNode; color: string }) {
    return (
        <div className={`w-10 h-10 rounded-xl bg-${color}/10 border border-${color}/20 flex items-center justify-center shrink-0`}>
            {icon}
        </div>
    );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function LandingPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({ target: containerRef });
    const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const universities = ["Boston Uni", "Northeastern", "NYU", "Penn State", "UT Austin", "UC San Diego", "UW Seattle", "Purdue", "Georgia Tech", "Ohio State", "Rutgers", "UBC", "USYD", "UNSW", "UniMelb", "IIT Delhi", "IIT Bombay"];
    const marqueeItems = ["AI Study Manager", "Panic Mode", "Tutor Sync", "Note Marketplace", "Deadline Tracking", "Knowledge Gaps", "Exam Simulation", "Auto-Schedule"];

    return (
        <div ref={containerRef} className="w-full flex flex-col items-center pb-32 overflow-x-hidden">
            {/* ─── NAVBAR / LOGO ────────────────────────────────────────── */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 pointer-events-none">
                <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                            <img src={ingenLogo} alt="Ingen" className="w-8 h-8 object-contain" />
                        </div>
                        <span className="text-lg font-bold tracking-tighter text-white">iNGEN</span>
                    </div>
                </div>
            </nav>

            {/* ────────────────────────── HERO ────────────────────────────── */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-24 overflow-hidden">
                {/* No particle canvas - pure black bg */}

                {/* Ambient light */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent-indigo/10 blur-[140px] rounded-full pointer-events-none z-0" />
                <div className="absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-accent-cyan/6 blur-[100px] rounded-full pointer-events-none z-0" />

                {/* Subtle dot grid */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.025]"
                    style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                <motion.div style={{ y: heroY, opacity: heroOpacity }} initial="hidden" animate="show" variants={STAGGER}
                    className="max-w-4xl mx-auto flex flex-col items-center relative z-10"
                >
                    {/* Status pill */}
                    <motion.div variants={FADE_UP} className="mb-8">
                        <motion.div
                            animate={{ boxShadow: ["0 0 0px rgba(34,211,238,0)", "0 0 24px rgba(34,211,238,0.4)", "0 0 0px rgba(34,211,238,0)"] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            className="inline-flex items-center gap-2.5 bg-black/70 border border-white/[0.08] px-4 py-2 rounded-full backdrop-blur-xl"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                            <span className="font-mono text-[11px] text-white/60 tracking-widest uppercase">Ingen OS · Early Access · Free</span>
                        </motion.div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 variants={FADE_UP} className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.1] mb-6 text-white">
                        Your degree should pay for itself.
                        <br />
                        <span className="bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-violet bg-clip-text text-transparent">
                            Now it can.
                        </span>
                    </motion.h1>

                    <motion.p variants={FADE_UP} className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                        AI that runs your study schedule. Peer tutors who actually aced the unit. A marketplace where you earn while you learn. Startup mentors. Jobs. All in one platform — built against the system, for the students it's failing.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-3 mb-16">
                        <motion.button
                            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(255,255,255,0.15)" }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white text-black font-semibold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 group"
                        >
                            Join the waitlist
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </motion.button>
                    </motion.div>

                    {/* Stat row */}
                    <motion.div variants={FADE_UP} className="flex flex-wrap justify-center gap-10">
                        {[
                            { n: 10000, s: "+", label: "Students using it" },
                            { n: 30, s: "+", label: "Universities" },
                            { n: 94, s: "%", label: "Say it helped them pass" },
                        ].map(({ n, s, label }) => (
                            <div key={label} className="text-center">
                                <p className="text-3xl font-bold text-white mb-0.5">
                                    <Counter to={n} suffix={s} />
                                </p>
                                <p className="text-xs font-mono text-white/30 uppercase tracking-widest">{label}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* ────────────────────── MARQUEE ─────────────────────────────── */}
            <Marquee items={marqueeItems} />

            {/* ──────── MID TUTOR PAIN POINT CALLOUT ──────────────────────── */}
            <section className="w-full py-24 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] bg-accent-amber/4 blur-[120px] rounded-full" />
                </div>
                <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg mb-8 font-mono text-[10px] uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            The problem nobody talks about
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                            You paid $40,000 in tuition.<br />
                            <span className="bg-gradient-to-r from-accent-amber to-red-400 bg-clip-text text-transparent">
                                Your tutor reads off slides.
                            </span>
                        </h2>
                        <p className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
                            Universities hire tutors who've barely passed the unit themselves. Lectures have 500 students.
                            Tutorials go 50 minutes without a single question answered properly.
                            You leave more confused than when you arrived.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                            {[
                                { stat: "83%", label: "of students say their tutorial was unhelpful", col: "text-red-400", bg: "bg-red-500/[0.06] border-red-500/20" },
                                { stat: "500:1", label: "average lecture size at major universities", col: "text-accent-amber", bg: "bg-accent-amber/[0.06] border-accent-amber/20" },
                                { stat: "0 hrs", label: "of personal attention per week, on average", col: "text-accent-violet", bg: "bg-accent-violet/[0.06] border-accent-violet/20" },
                            ].map(s => (
                                <div key={s.stat} className={`${s.bg} border rounded-2xl p-5`}>
                                    <p className={`text-3xl font-bold ${s.col} mb-1`}>{s.stat}</p>
                                    <p className="text-xs text-white/40 leading-snug">{s.label}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-white/30 text-sm mt-8 font-mono">
                            ingen fixes this. Peer tutors who aced the same unit. AI that actually explains it. On demand.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ──────────────── FEATURE 1: AI STUDY MANAGER ───────────────── */}
            <section className="w-full max-w-6xl mx-auto px-4 py-28 relative">
                <div className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={STAGGER}>
                        <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan px-3 py-1.5 rounded-lg mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                            <span className="font-mono text-[10px] uppercase tracking-widest">Feature 01</span>
                        </motion.div>

                        <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-white leading-tight">
                            It knows your<br />schedule. You just study.
                        </motion.h2>

                        <motion.p variants={FADE_UP} className="text-white/50 text-base leading-relaxed mb-8 max-w-md">
                            Connect your Google Calendar, upload your syllabus, and the AI does the rest.
                            It watches your deadlines and sends you nudges at the right time — like a personal assistant you never had.
                        </motion.p>

                        <motion.div variants={STAGGER} className="space-y-3">
                            {[
                                { icon: <Calendar className="w-4 h-4 text-accent-cyan" />, text: "Syncs your timetable, exams, and assignments automatically", color: "accent-cyan" },
                                { icon: <Zap className="w-4 h-4 text-accent-amber" />, text: "Nudges you to start work before it's too late", color: "accent-amber" },
                                { icon: <Activity className="w-4 h-4 text-accent-emerald" />, text: "Tracks how prepared you are for each course in real time", color: "accent-emerald" },
                                { icon: <Target className="w-4 h-4 text-accent-indigo" />, text: "Tells you exactly what to focus on today", color: "accent-indigo" },
                            ].map((item, i) => (
                                <motion.div key={i} variants={FADE_UP}
                                    className="flex items-center gap-3 p-3.5 bg-[#080808] border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-all duration-300"
                                >
                                    <IconBox icon={item.icon} color={item.color} />
                                    <span className="text-sm text-white/70">{item.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, type: "spring" }}
                    >
                        <StudyDashSim />
                    </motion.div>
                </div>
            </section>

            {/* ──────────────── FEATURE 2: PANIC MODE ─────────────────────── */}
            <section className="w-full bg-[#050505] border-y border-white/[0.05] py-28 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-accent-violet/6 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-6xl mx-auto px-4">
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={STAGGER}
                        className="text-center mb-16"
                    >
                        <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg mb-6">
                            <ShieldAlert className="w-3 h-3" />
                            <span className="font-mono text-[10px] uppercase tracking-widest">Feature 02 · Panic Mode</span>
                        </motion.div>
                        <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-white">
                            Exam in 3 days?<br /><span className="text-red-400">We've got you.</span>
                        </motion.h2>
                        <motion.p variants={FADE_UP} className="text-white/50 text-base max-w-xl mx-auto">
                            When your exam is close and you're not ready, one tap triggers Panic Mode.
                            The AI builds you a survival plan that actually fits your schedule.
                        </motion.p>
                    </motion.div>

                    {/* Panic Mode live simulation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative max-w-xl mx-auto w-full"
                    >
                        <PanicModeSim />
                    </motion.div>
                </div>
            </section>

            {/* ──────────── FEATURE 3: TUTORS + NOTES ─────────────────────── */}
            <section className="w-full max-w-6xl mx-auto px-4 py-28 relative">
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-emerald/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Feature 03 live sim */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, type: "spring" }}
                        className="order-2 lg:order-1"
                    >
                        <EarningsSim />
                    </motion.div>

                    {/* Left: Text */}
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={STAGGER}
                        className="order-1 lg:order-2"
                    >
                        <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald px-3 py-1.5 rounded-lg mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                            <span className="font-mono text-[10px] uppercase tracking-widest">Feature 03 · Earn as you go</span>
                        </motion.div>

                        <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-white leading-tight">
                            Get help. Give help.<br />Get paid for both.
                        </motion.h2>

                        <motion.p variants={FADE_UP} className="text-white/50 text-base leading-relaxed mb-8 max-w-md">
                            Tutor a first-year in COMP while a third-year tutors you in MATH. Sell your notes. Buy someone else's. The platform pays you as you go — so you can learn without going broke.
                        </motion.p>

                        <motion.div variants={STAGGER} className="space-y-4">
                            {[
                                { icon: <Users className="w-4 h-4 text-accent-cyan" />, title: "Tutor Marketplace", desc: "Post your Zoom or Meet link. Set your price. Students book you in one tap.", color: "accent-cyan" },
                                { icon: <BookOpen className="w-4 h-4 text-accent-amber" />, title: "Notes Marketplace", desc: "Upload your notes. Students buy them. You're earning while you sleep.", color: "accent-amber" },
                                { icon: <Network className="w-4 h-4 text-accent-violet" />, title: "Startup Mentors & Jobs", desc: "Founders and employers on the platform looking for students like you.", color: "accent-violet" },
                                { icon: <TrendingUp className="w-4 h-4 text-accent-emerald" />, title: "Earn more than you pay", desc: "Many students offset their subscription entirely through tutoring and notes sales.", color: "accent-emerald" },
                            ].map((item, i) => (
                                <motion.div key={i} variants={FADE_UP}
                                    className="flex items-start gap-4 p-4 bg-[#080808] border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-all duration-300"
                                >
                                    <IconBox icon={item.icon} color={item.color} />
                                    <div>
                                        <p className="text-sm font-semibold text-white mb-0.5">{item.title}</p>
                                        <p className="text-sm text-white/40">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ──────────────────── HOW IT WORKS ────────────────────────────── */}
            <HowItWorksSection />

            {/* ──────────────── CIRCULAR ECONOMY SECTION ───────────────────── */}
            <section className="w-full bg-[#030303] border-y border-white/[0.05] py-28 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent-violet/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={STAGGER}
                        className="text-center mb-16"
                    >
                        <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 bg-accent-violet/10 border border-accent-violet/20 text-accent-violet px-3 py-1.5 rounded-lg mb-6">
                            <Zap className="w-3 h-3" />
                            <span className="font-mono text-[10px] uppercase tracking-widest">World's first · Student circular economy</span>
                        </motion.div>
                        <motion.h2 variants={FADE_UP} className="text-4xl md:text-6xl font-bold tracking-tight mb-5 text-white leading-tight">
                            Universities take.<br />
                            <span className="bg-gradient-to-r from-accent-amber to-accent-orange bg-clip-text text-transparent">ingen gives back.</span>
                        </motion.h2>
                        <motion.p variants={FADE_UP} className="text-white/40 max-w-2xl mx-auto text-base leading-relaxed">
                            International and domestic students pay tens of thousands in tuition. Then they pay again for tutors, textbooks, and notes.
                            We built a system where students help each other — and get paid for it.
                        </motion.p>
                    </motion.div>

                    {/* The circular flow */}
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={STAGGER}
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
                    >
                        {[
                            {
                                step: "01",
                                icon: <Brain className="w-5 h-5 text-accent-cyan" />,
                                title: "You learn",
                                desc: "AI manages your schedule. You get tutored by someone who aced the same unit last semester.",
                                color: "accent-cyan",
                                tag: "Pay as you go",
                            },
                            {
                                step: "02",
                                icon: <Users className="w-5 h-5 text-accent-violet" />,
                                title: "You teach",
                                desc: "Tutor first-years in units you've already passed. Set your own rate. Run sessions on Zoom or Meet.",
                                color: "accent-violet",
                                tag: "Earn as you go",
                            },
                            {
                                step: "03",
                                icon: <TrendingUp className="w-5 h-5 text-accent-emerald" />,
                                title: "You grow",
                                desc: "Get mentored by startup founders. Apply to jobs directly through the platform. Graduate with experience.",
                                color: "accent-emerald",
                                tag: "Career pipeline",
                            },
                        ].map((c, i) => (
                            <motion.div key={i} variants={FADE_UP}
                                className="relative bg-[#080808] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.12] transition-all duration-300 group overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-40 h-40 bg-${c.color}/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                                <span className="font-mono text-[10px] text-white/20 tracking-widest mb-4 block">{c.step}</span>
                                <div className={`w-10 h-10 rounded-xl bg-${c.color}/10 border border-${c.color}/20 flex items-center justify-center mb-4`}>
                                    {c.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                                <p className="text-sm text-white/40 leading-relaxed mb-5">{c.desc}</p>
                                <span className={`text-[10px] font-mono uppercase tracking-widest text-${c.color} bg-${c.color}/10 border border-${c.color}/20 px-2.5 py-1 rounded-full`}>
                                    {c.tag}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* The narrative callout */}
                    <motion.div variants={FADE_UP}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto bg-[#080808] border border-white/[0.06] rounded-2xl p-8 relative overflow-hidden"
                    >
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-amber/40 to-transparent" />
                        <p className="text-xl md:text-2xl text-white/80 leading-relaxed text-center font-light">
                            "A student in Year 3 tutors a Year 1. That same student gets tutored by a PhD. They sell their notes.
                            A startup founder mentors them. They graduate with money in their pocket and a job lined up.<br />
                            <span className="text-white font-semibold">That's ingen."
                            </span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ──────────────────── GLOBE SECTION ──────────────────────────── */}
            <section className="w-full bg-black border-y border-white/[0.05] py-24 relative">
                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none" />
                {/* Two-column: Globe left, stats + unis right */}
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    {/* Heading */}
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={STAGGER}
                        className="text-center mb-14"
                    >
                        <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg mb-5">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Used globally</span>
                        </motion.div>
                        <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-white">
                            Students everywhere are using ingen.
                        </motion.h2>
                        <motion.p variants={FADE_UP} className="text-white/40 max-w-md mx-auto text-base">
                            From Sydney to Boston to Mumbai — helping students across 30+ universities.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        {/* Globe — left column, NO mask, NO negative margin */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.88 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="w-full max-w-[620px] mx-auto lg:mx-0 overflow-visible"
                        >
                            <Globe />
                        </motion.div>

                        {/* Right column: stat cards + uni tags */}
                        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={STAGGER}
                            className="space-y-7"
                        >
                            <motion.div variants={FADE_UP} className="grid grid-cols-2 gap-4">
                                {[
                                    { value: "30+", label: "Universities", col: "text-accent-cyan" },
                                    { value: "10K+", label: "Active students", col: "text-accent-emerald" },
                                    { value: "94%", label: "Exam pass rate", col: "text-accent-violet" },
                                    { value: "$15", label: "Per month", col: "text-accent-amber" },
                                ].map(s => (
                                    <div key={s.label} className="bg-[#080808] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.1] transition-all duration-300">
                                        <p className={`text-3xl font-bold mb-1 ${s.col}`}>{s.value}</p>
                                        <p className="text-xs font-mono text-white/30 uppercase tracking-wider">{s.label}</p>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div variants={FADE_UP}>
                                <p className="font-mono text-[10px] uppercase tracking-widest text-white/20 mb-3">Active universities</p>
                                <div className="flex flex-wrap gap-2">
                                    {universities.map((uni) => (
                                        <motion.span
                                            key={uni}
                                            whileHover={{ borderColor: "rgba(34,211,238,0.4)", color: "rgba(34,211,238,0.9)", backgroundColor: "rgba(34,211,238,0.05)" }}
                                            className="text-[11px] font-mono text-white/30 border border-white/[0.06] px-2.5 py-1 rounded-full cursor-default transition-all duration-200"
                                        >
                                            {uni}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ───────────────────── PRICING ───────────────────────────────── */}
            <section className="w-full max-w-5xl mx-auto px-4 py-28 relative">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[300px] bg-accent-violet/4 blur-[120px] pointer-events-none" />

                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={STAGGER}
                    className="relative z-10"
                >
                    <motion.div variants={FADE_UP} className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg mb-6">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Pricing</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                            Less than a coffee a day.
                        </h2>
                        <p className="text-white/40 text-base max-w-sm mx-auto">
                            $15/month. Cancel anytime. Way cheaper than failing a unit.
                        </p>
                    </motion.div>

                    <motion.div variants={FADE_UP} className="max-w-md mx-auto">
                        <div className="bg-[#080808] border border-white/[0.08] rounded-3xl p-8 relative overflow-hidden group hover:border-white/[0.14] transition-all duration-500">
                            <div className="absolute top-0 right-0 w-60 h-60 bg-accent-cyan/4 blur-3xl rounded-full" />
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />

                            {/* Price with psychological breakdown */}
                            <div className="flex items-end gap-1 mb-1 relative z-10">
                                <span className="text-6xl font-bold text-white">$15</span>
                                <span className="text-white/30 text-base mb-2">/month</span>
                            </div>
                            <div className="flex flex-col gap-5 mb-8 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="px-3.5 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md group-hover:border-accent-cyan/30 transition-all duration-500">
                                        <span className="text-xl font-black text-accent-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">$3.75</span>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 ml-2">/ week</span>
                                    </div>

                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(52,211,153,0.1)", "0 0 40px rgba(52,211,153,0.4)", "0 0 20px rgba(52,211,153,0.1)"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="px-4 py-2.5 rounded-2xl bg-accent-emerald/10 border border-accent-emerald/40 backdrop-blur-md relative"
                                    >
                                        <span className="text-2xl font-black text-accent-emerald drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]">50¢</span>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 ml-2">/ day</span>

                                        <div className="absolute -top-3 -right-6 bg-white text-[9px] font-black text-black px-2 py-0.5 rounded-full rotate-12 shadow-2xl border border-black/10 whitespace-nowrap">
                                            YES, REALLY.
                                        </div>
                                    </motion.div>
                                </div>
                                <div className="flex items-center gap-3 opacity-40">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] whitespace-nowrap">Yes, you read that right</span>
                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
                                </div>
                            </div>
                            <p className="text-white/30 text-sm mb-8 relative z-10">Everything included. No hidden fees.</p>

                            <div className="space-y-3 mb-8 relative z-10">
                                {[
                                    "AI study manager with full calendar sync",
                                    "Panic Mode (unlimited activations)",
                                    "Unlimited practice exam generation",
                                    "Access to tutor marketplace",
                                    "Sell your notes on the marketplace",
                                ].map((f, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-4 h-4 rounded-full bg-accent-emerald/15 border border-accent-emerald/30 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-2.5 h-2.5 text-accent-emerald" />
                                        </div>
                                        <span className="text-sm text-white/60">{f}</span>
                                    </div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,255,255,0.12)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full bg-white text-black font-semibold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 group relative z-10"
                            >
                                Join the waitlist
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ──────────────────── TESTIMONIALS ───────────────────────────── */}
            <section className="w-full max-w-6xl mx-auto px-4 pb-24">
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={STAGGER}>
                    <motion.div variants={FADE_UP} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">The system is broken.<br />Students know it.</h2>
                        <p className="text-white/30 text-sm">Real students. Real frustration. This is why we're building ingen.</p>
                    </motion.div>

                    <motion.div variants={STAGGER} className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            {
                                text: "I paid $40k in tuition this year. My tutorial has 200 people in it, the tutor reads off slides, and I've never spoken to a professor one-on-one. The system is a joke.",
                                name: "Alex T.", role: "UNSW · CS · Year 2",
                                seed: "Alex",
                                tag: "😤 Frustrated",
                                tagCol: "text-red-400",
                            },
                            {
                                text: "I'm literally paying $15/hr to be tutored by someone who took the same unit 6 months ago and barely passed. If I could find someone who actually aced it I'd pay double.",
                                name: "Mia K.", role: "Monash · Commerce · Year 3",
                                seed: "Mia",
                                tag: "💸 Over it",
                                tagCol: "text-amber-400",
                            },
                            {
                                text: "ingen sounds like what uni should've been from day one. An AI that actually knows my schedule, peer tutors who passed the unit, and I can make money on the side? Sign me up.",
                                name: "Ryan C.", role: "UQ · Engineering · Year 4",
                                seed: "Ryan",
                                tag: "🙌 Hyped",
                                tagCol: "text-accent-emerald",
                            },
                        ].map((t, i) => (
                            <motion.div key={i} variants={FADE_UP}
                                className="bg-[#080808] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all duration-300 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-accent-indigo/4 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <p className="text-white/60 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden shrink-0">
                                        <img
                                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${t.seed}&backgroundColor=0d1117`}
                                            alt={t.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">{t.name}</p>
                                        <p className="text-xs text-white/30">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>


            {/* ─── TALK TO INGEN ─────────────────────────────────────────────── */}
            <TalkToIngen />

            {/* ─── WAITLIST ──────────────────────────────────────────────────── */}
            <WaitlistSection />

        </div>
    );
}
