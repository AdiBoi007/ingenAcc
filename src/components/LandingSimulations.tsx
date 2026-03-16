import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Calendar,
  CheckCircle2,
  Command,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

function WindowDots() {
  return (
    <div className="flex gap-1.5">
      {[0, 1, 2].map((dot) => (
        <div key={dot} className="h-2 w-2 rounded-[2px] bg-border-bright" />
      ))}
    </div>
  );
}

function toPath(data: number[]) {
  const width = 120;
  const height = 40;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  });

  return `M ${points.join(" L ")}`;
}

export function StudyDashSim() {
  const subjects = [
    {
      name: "Cybersecurity",
      ticker: "CYB",
      pct: 88,
      change: "+12.4%",
      tone: "#22d3ee",
      data: [42, 48, 44, 55, 52, 61, 58, 70, 67, 78, 74, 88],
    },
    {
      name: "Macroeconomics",
      ticker: "MCR",
      pct: 61,
      change: "-3.2%",
      tone: "#fbbf24",
      data: [70, 68, 72, 65, 60, 63, 58, 65, 62, 58, 64, 61],
    },
    {
      name: "Data Structures",
      ticker: "DSA",
      pct: 45,
      change: "-8.1%",
      tone: "#a78bfa",
      data: [62, 58, 55, 52, 60, 54, 48, 50, 46, 48, 43, 45],
    },
    {
      name: "Java Programming",
      ticker: "JAV",
      pct: 74,
      change: "+5.7%",
      tone: "#34d399",
      data: [55, 58, 54, 60, 63, 61, 65, 68, 71, 69, 72, 74],
    },
  ];

  return (
    <div className="tactical-window">
      <div className="tactical-window-bar">
        <WindowDots />
        <span className="tactical-meta text-text-secondary">ingen — Subject Portfolio</span>
        <span className="ml-auto tactical-meta tactical-accent-cyan">live</span>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="tactical-meta mb-2 text-text-secondary">Portfolio value</p>
            <p className="font-display text-5xl uppercase leading-none tracking-[0.03em] text-white">
              67<span className="ml-1 text-2xl text-text-secondary">pts</span>
            </p>
          </div>
          <div className="tactical-chip tactical-chip-amber">
            <Zap className="h-3 w-3 stroke-[2px]" />
            2 assets need attention
          </div>
        </div>

        {subjects.map((subject) => (
          <div
            key={subject.ticker}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-border bg-surface-2 px-3 py-3"
          >
            <div className="w-11">
              <p className="tactical-meta" style={{ color: subject.tone }}>{subject.ticker}</p>
              <p className="mt-1 text-[11px] leading-4 text-text-muted">{subject.name}</p>
            </div>

            <svg viewBox="0 0 120 40" className="h-8 w-full" preserveAspectRatio="none">
              <path
                d={toPath(subject.data)}
                fill="none"
                stroke={subject.tone}
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>

            <div className="text-right">
              <p className="font-display text-2xl uppercase leading-none tracking-[0.03em] text-white">
                <span style={{ color: subject.tone }}>{subject.pct}</span>
              </p>
              <p className="tactical-meta mt-1" style={{ color: subject.tone }}>{subject.change}</p>
            </div>
          </div>
        ))}

        <div className="grid gap-3 border-t border-border pt-4">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border border-border bg-surface-2 px-3 py-3">
            <div className="tactical-icon tactical-icon-cyan h-9 w-9">
              <Calendar className="h-4 w-4 stroke-[2px]" />
            </div>
            <div>
              <p className="tactical-meta tactical-accent-cyan">Next block: Macroeconomics</p>
              <p className="mt-1 text-[11px] leading-4 text-text-secondary">
                Tonight · 20:00 → 22:00 · Locked by AI
              </p>
            </div>
            <p className="tactical-meta tactical-accent-cyan">Tonight</p>
          </div>

          <div className="border border-[rgba(167,139,250,0.18)] bg-surface-2 px-4 py-4">
            <p className="tactical-meta mb-2 tactical-accent-violet">AI Nudge</p>
            <p className="text-sm leading-6 text-text-secondary">
              Macroeconomics is dropping. Exam in 6 days. Start tonight?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PanicModeSim() {
  const blockData = [
    { day: "Mon", time: "20:00-23:00", subject: "Cybersecurity Core", color: "var(--accent-cyan)" },
    { day: "Tue", time: "12:00-14:00", subject: "Past exam practice", color: "var(--accent-violet)" },
    { day: "Tue", time: "19:00-22:00", subject: "Weak areas drill", color: "var(--accent-amber)" },
    { day: "Wed", time: "08:00-10:00", subject: "Practice exam #1", color: "var(--accent-violet)" },
    { day: "Wed", time: "20:00-23:00", subject: "Cybersecurity Review", color: "var(--accent-cyan)" },
    { day: "Thu", time: "17:00-20:00", subject: "Practice exam #2", color: "var(--accent-violet)" },
    { day: "Fri", time: "10:00-12:00", subject: "Gaps + corrections", color: "var(--accent-amber)" },
    { day: "Fri", time: "19:00-21:00", subject: "Final review", color: "var(--accent-emerald)" },
  ];

  return (
    <div className="tactical-window border-[rgba(251,191,36,0.2)]">
      <div className="tactical-window-bar">
        <WindowDots />
        <span className="tactical-meta tactical-accent-amber">Panic Mode Active</span>
        <span className="ml-auto tactical-meta text-text-secondary">Exam: 4 days</span>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Hours available", value: "24h" },
            { label: "Study blocks", value: "8" },
            { label: "Predicted score", value: "74%" },
          ].map((item) => (
            <div key={item.label} className="border border-border bg-surface-2 px-4 py-4 text-center">
              <p className="font-display text-4xl uppercase leading-none tracking-[0.03em] text-white">
                <span
                  className={
                    item.label === "Hours available"
                      ? "tactical-accent-cyan"
                      : item.label === "Study blocks"
                        ? "tactical-accent-amber"
                        : "tactical-accent-emerald"
                  }
                >
                  {item.value}
                </span>
              </p>
              <p className="tactical-meta mt-3 text-text-secondary">{item.label}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="tactical-meta mb-3 text-text-secondary">Emergency study schedule</p>
          <div className="space-y-2">
            {blockData.map((block) => (
              <div
                key={block.day + block.time}
                className="grid grid-cols-[6px_1fr_auto] items-center gap-3 border border-border bg-surface-2 px-3 py-3"
              >
                <div className="h-full min-h-10" style={{ backgroundColor: block.color }} />
                <div>
                  <p className="tactical-meta tactical-accent-amber">{block.subject}</p>
                  <p className="mt-1 text-[11px] leading-4 text-text-secondary">
                    {block.day} · {block.time}
                  </p>
                </div>
                <CheckCircle2 className="h-4 w-4 stroke-[2px] tactical-accent-emerald" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EarningsSim() {
  const persona = {
    name: "Priya S.",
    unit: "Cybersecurity → tutors Python Basics",
    role: "Tutor + Student",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Priya&backgroundColor=0d0d0d",
  };

  return (
    <div className="tactical-window border-[rgba(52,211,153,0.2)]">
      <div className="tactical-window-bar">
        <WindowDots />
        <span className="tactical-meta text-text-secondary">ingen — Marketplace</span>
      </div>

      <div className="space-y-4 p-5">
        <div className="border border-border bg-surface-2 px-4 py-5">
          <p className="tactical-meta mb-2 tactical-accent-emerald">Your earnings this month</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="font-display text-6xl uppercase leading-none tracking-[0.03em] text-white">
              <span className="tactical-accent-emerald">$480</span>
              <span className="ml-1 text-2xl text-text-secondary">.00</span>
            </p>
            <div className="tactical-chip tactical-chip-emerald">
              <TrendingUp className="h-3 w-3 stroke-[2px]" />
              More than your subscription
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="border border-border bg-surface-2 px-4 py-4">
            <p className="font-display text-4xl uppercase leading-none tracking-[0.03em] tactical-accent-amber">
              47
            </p>
            <p className="tactical-meta mt-3 text-text-secondary">Notes sold</p>
          </div>
          <div className="border border-border bg-surface-2 px-4 py-4">
            <p className="font-display text-4xl uppercase leading-none tracking-[0.03em] tactical-accent-cyan">
              12
            </p>
            <p className="tactical-meta mt-3 text-text-secondary">Tutor sessions</p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="tactical-meta mb-3 text-text-secondary">Real student on the platform</p>
          <div className="flex items-center gap-3 border border-border bg-surface-2 px-4 py-4">
            <div className="h-12 w-12 overflow-hidden rounded-[2px] border border-border bg-surface">
              <img src={persona.avatarUrl} alt={persona.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="tactical-meta tactical-accent-emerald">{persona.name}</p>
              <p className="mt-1 text-[11px] leading-4 text-text-secondary">{persona.unit}</p>
              <p className="tactical-meta mt-2 tactical-accent-cyan">{persona.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      n: "01",
      icon: <Command className="h-5 w-5 stroke-[2px]" />,
      title: "Connect your uni life",
      desc: "Link Google Calendar, upload your syllabus, add your courses and deadlines. Takes 2 minutes.",
      detail: ["Calendar & timetable sync", "Upload or paste syllabus", "Set target grades per unit"],
      toneClass: "tactical-icon-cyan",
      arrowClass: "tactical-accent-cyan",
    },
    {
      n: "02",
      icon: <Brain className="h-5 w-5 stroke-[2px]" />,
      title: "AI runs your schedule",
      desc: "The AI watches everything and builds you a week-by-week study plan. It nudges you when you drift.",
      detail: ["Smart study blocks auto-scheduled", "Daily nudges via app", "Readiness scores per unit"],
      toneClass: "tactical-icon-violet",
      arrowClass: "tactical-accent-violet",
    },
    {
      n: "03",
      icon: <Users className="h-5 w-5 stroke-[2px]" />,
      title: "Earn on the side",
      desc: "Tutor peers in subjects you&apos;ve aced. Sell your notes. Get mentored by founders. Get hired.",
      detail: ["Set your own tutor rate", "Upload notes once, earn forever", "Apply to jobs in-platform"],
      toneClass: "tactical-icon-emerald",
      arrowClass: "tactical-accent-emerald",
    },
    {
      n: "04",
      icon: <Star className="h-5 w-5 stroke-[2px]" />,
      title: "Graduate ahead",
      desc: "Better grades, actual experience, money in your pocket, and a job you didn&apos;t have to beg for.",
      detail: ["Exit with real work experience", "Network of founders & employers", "Proof of skills through platform"],
      toneClass: "tactical-icon-amber",
      arrowClass: "tactical-accent-amber",
    },
  ];

  return (
    <section id="how-it-works" className="tactical-section">
      <div className="tactical-shell">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="tactical-meta mb-5 tactical-accent-indigo">How it works</p>
          <h2 className="tactical-title mb-5">Four steps. One platform.</h2>
          <p className="tactical-copy">
            Everything works together. The AI, the marketplace, and your career — all in one
            place.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
              className="tactical-panel flex h-full flex-col px-6 py-6"
            >
              <p className="tactical-meta mb-4">{step.n}</p>
              <div className={`tactical-icon mb-4 h-11 w-11 ${step.toneClass}`}>
                {step.icon}
              </div>
              <h3 className="font-display text-3xl uppercase tracking-[0.03em] text-white">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-text-secondary">{step.desc}</p>
              <ul className="mt-6 space-y-2 border-t border-border pt-5">
                {step.detail.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-sm leading-6 text-text-secondary">
                    <ArrowRight className={`mt-1 h-3.5 w-3.5 shrink-0 stroke-[2px] ${step.arrowClass}`} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
