import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Link2,
  MessageCircle,
  Network,
  ShoppingBag,
  Target,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import ingenLogo from "../assets/ingen logo.png";
import { Globe } from "../components/Globe";
import {
  EarningsSim,
  HowItWorksSection,
  PanicModeSim,
  StudyDashSim,
} from "../components/LandingSimulations";
import { TalkToIngen } from "../components/TalkToIngen";
import { WaitlistSection } from "../components/WaitlistSection";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const STAGGER: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

type InsideModule = {
  index: string;
  icon: LucideIcon;
  iconColor: string;
  name: string;
  descriptor: string;
  description: string;
  status?: string;
  dimmed?: boolean;
};

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  return (
    <span>
      {to.toLocaleString()}
      {suffix}
    </span>
  );
}

function Marquee({ items }: { items: string[] }) {
  return (
    <div className="w-full border-y border-border bg-surface/50">
      <div className="tactical-shell flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-5 text-center">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-6">
            <span className="tactical-meta text-text-secondary">{item}</span>
            {index < items.length - 1 ? <span className="tactical-accent-cyan">•</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function IconBox({ icon, toneClass }: { icon: ReactNode; toneClass: string }) {
  return (
    <div className={`tactical-icon ${toneClass}`}>
      {icon}
    </div>
  );
}

const INSIDE_MODULES: InsideModule[] = [
  {
    index: "∅1",
    icon: BookOpen,
    iconColor: "#00e5ff",
    name: "CRAMAZON PRIME",
    descriptor: "ACADEMIC COMMAND CENTER",
    description:
      "Your semester, mapped. AI tracks every deadline, builds your study plan, scores your readiness, and tells you exactly what to do today.",
  },
  {
    index: "∅2",
    icon: Zap,
    iconColor: "#f0a500",
    name: "PAINSTATION",
    descriptor: "EXAM SURVIVAL ENGINE",
    description:
      "Exam in 3 days and you haven't started? One tap activates Panic Mode. AI builds a timed survival plan that fits your actual schedule.",
  },
  {
    index: "∅3",
    icon: GraduationCap,
    iconColor: "#a78bfa",
    name: "TALK TO A NERD",
    descriptor: "PEER TUTOR MARKETPLACE",
    description:
      "Book a student who aced your exact unit last semester. Real explanations. No reading off slides. Pay only when you need help.",
  },
  {
    index: "∅4",
    icon: MessageCircle,
    iconColor: "#555555",
    name: "THE VOID",
    descriptor: "ANONYMOUS STUDENT FORUM",
    description:
      "Shitpost. Vent. Find teammates for group projects. No real names. No social anxiety. Just students being honest about uni.",
  },
  {
    index: "∅5",
    icon: ShoppingBag,
    iconColor: "#f0a500",
    name: "BLACKMARKET GPA",
    descriptor: "NOTES & RESOURCE ECONOMY",
    description:
      "Buy summaries from students who passed the unit. Sell your own. Upload once, earn while you sleep. The knowledge economy, but make it useful.",
  },
  {
    index: "∅6",
    icon: Link2,
    iconColor: "#333333",
    name: "UNICONNECT",
    descriptor: "CAMPUS NETWORK LAYER",
    description:
      "Find societies, hackathon teammates, campus opportunities, and people worth knowing — all filtered to your uni and degree.",
    status: "COMING SOON",
    dimmed: true,
  },
] as const;

function WhatsInsideSection() {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() =>
    INSIDE_MODULES.map(() => false),
  );

  useEffect(() => {
    const timeouts: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number((entry.target as HTMLDivElement).dataset.index);
          const timeoutId = window.setTimeout(() => {
            setVisibleCards((previous) =>
              previous.map((isVisible, currentIndex) =>
                currentIndex === index ? true : isVisible,
              ),
            );
          }, index * 80);

          timeouts.push(timeoutId);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 },
    );

    const currentCards = cardRefs.current.filter(
      (card): card is HTMLDivElement => card !== null,
    );

    currentCards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  return (
    <section className="features-overview-section">
      <div className="features-overview">
        <div className="mb-12 max-w-4xl">
          <p className="features-overview-label">[ STUDENT TOOLS — V1.0 ]</p>
          <h2 className="features-overview-title">
            EVERYTHING YOUR UNI
            <br />
            DIDN&apos;T BUILD.
          </h2>
          <p className="features-overview-copy">
            Six modules. One OS.
            <br />
            Built for students who are done with fragmented tools.
          </p>
        </div>

        <div className="features-grid">
          {INSIDE_MODULES.map((module, index) => {
            const Icon = module.icon;

            return (
              <div
                key={module.index}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                data-index={index}
                className={`feature-card ${visibleCards[index] ? "visible" : ""} ${
                  module.dimmed ? "feature-card-dim" : ""
                }`}
              >
                <p className="feature-card-index">{module.index}</p>
                <Icon
                  className="feature-card-icon"
                  style={{ color: module.iconColor }}
                  strokeWidth={1.5}
                />
                <h3 className="feature-card-name">{module.name}</h3>
                <p className="feature-card-descriptor">{module.descriptor}</p>
                <p className="feature-card-description">{module.description}</p>
                {module.status ? (
                  <span className="feature-card-status">{module.status}</span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const universities = [
    "Boston Uni",
    "Northeastern",
    "NYU",
    "Penn State",
    "UT Austin",
    "UC San Diego",
    "UW Seattle",
    "Purdue",
    "Georgia Tech",
    "Ohio State",
    "Rutgers",
    "UBC",
    "USYD",
    "UNSW",
    "UniMelb",
    "IIT Delhi",
    "IIT Bombay",
  ];

  const marqueeItems = [
    "AI Study Manager",
    "Panic Mode",
    "Tutor Sync",
    "Note Marketplace",
    "Deadline Tracking",
    "Knowledge Gaps",
    "Exam Simulation",
    "Auto-Schedule",
  ];

  const navItems = [
    { href: "#how-it-works", label: "HOW IT WORKS" },
    { href: "#pricing", label: "PRICING" },
    { href: "#talk-to-aristotle", label: "ARISTOTLE" },
    { href: "#waitlist", label: "EARLY ACCESS" },
  ];

  return (
    <div className="tactical-page">
      <div aria-hidden="true" className="pointer-events-none">
        <div className="tactical-orb tactical-orb-cyan left-[-8rem] top-24 h-[26rem] w-[26rem] opacity-[0.12]" />
        <div className="tactical-orb tactical-orb-violet right-[-10rem] top-[24rem] h-[30rem] w-[30rem] opacity-[0.08]" />
        <div className="tactical-orb tactical-orb-amber left-1/2 top-[68%] h-[28rem] w-[28rem] -translate-x-1/2 opacity-[0.07]" />
      </div>

      <nav className={`landing-nav ${navScrolled ? "landing-nav-scrolled" : ""}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-border bg-surface p-2">
              <img src={ingenLogo} alt="Ingen" className="h-full w-full object-contain" />
            </div>
            <div className="flex items-end gap-2">
              <span className="landing-nav-wordmark">INGEN</span>
              <span className="landing-nav-submark">LABS</span>
            </div>
          </button>

          <div className="hidden items-center gap-3 lg:flex">
            {navItems.map((item, index) => (
              <div key={item.href} className="flex items-center gap-3">
                <a href={item.href} className="landing-nav-link">
                  {item.label}
                </a>
                {index < navItems.length - 1 ? (
                  <span className="landing-nav-separator">·</span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="landing-nav-badge">LABS</span>
            <button
              type="button"
              className="landing-nav-cta"
              onClick={() =>
                document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              JOIN THE WAITLIST
            </button>
          </div>
        </div>
      </nav>

      <section className="relative w-full border-b border-border pb-24 pt-36 md:pb-28 md:pt-40">
        <div className="tactical-shell">
          <motion.div
            initial="hidden"
            animate="show"
            variants={STAGGER}
            className="mx-auto max-w-[68rem] text-center"
          >
            <motion.p variants={FADE_UP} className="tactical-meta mb-6 tactical-accent-cyan">
              [ INGEN LABS — V1.0 ]
            </motion.p>

            <motion.h1 variants={FADE_UP} className="tactical-hero mb-6">
              <span className="block md:whitespace-nowrap">
                Your degree should pay for itself.
              </span>
              <span className="block md:whitespace-nowrap">
                <span className="tactical-hollow tactical-hollow-cyan">Now</span> it can.
              </span>
            </motion.h1>

            <motion.p variants={FADE_UP} className="tactical-copy mx-auto mb-10 max-w-3xl">
              AI that runs your study schedule. Peer tutors who actually aced the unit. A
              marketplace where you earn while you learn. Startup mentors. Jobs. All in one
              platform — built against the system, for the students it&apos;s failing.
            </motion.p>

            <motion.div variants={FADE_UP} className="mb-14 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                className="tactical-button tactical-button-accent-cyan"
                onClick={() =>
                  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Join the waitlist
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>

            <motion.div
              variants={FADE_UP}
              className="mx-auto grid max-w-4xl grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3"
            >
              {[
                { n: 10000, s: "+", label: "Students using it", tone: "tactical-accent-cyan" },
                { n: 30, s: "+", label: "Universities", tone: "tactical-accent-violet" },
                { n: 94, s: "%", label: "Say it helped them pass", tone: "tactical-accent-amber" },
              ].map(({ n, s, label, tone }) => (
                <div key={label} className="bg-surface px-6 py-6">
                  <p className={`font-display text-5xl uppercase leading-none tracking-[0.03em] ${tone}`}>
                    <Counter to={n} suffix={s} />
                  </p>
                  <p className="tactical-meta mt-3 text-text-secondary">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Marquee items={marqueeItems} />

      <section className="tactical-section">
        <div className="tactical-shell">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={STAGGER}
            className="mx-auto max-w-5xl text-center"
          >
            <motion.p variants={FADE_UP} className="tactical-meta mb-5 tactical-chip tactical-chip-orange inline-flex">
              The problem nobody talks about
            </motion.p>
            <motion.h2 variants={FADE_UP} className="tactical-title mb-6">
              You paid $40,000 in tuition.
              <br />
              Your tutor reads off slides.
            </motion.h2>
            <motion.p variants={FADE_UP} className="tactical-copy mx-auto mb-10 max-w-3xl">
              Universities hire tutors who&apos;ve barely passed the unit themselves. Lectures have
              500 students. Tutorials go 50 minutes without a single question answered properly.
              You leave more confused than when you arrived.
            </motion.p>

            <motion.div variants={FADE_UP} className="grid gap-4 md:grid-cols-3">
              {[
                { stat: "83%", label: "of students say their tutorial was unhelpful", tone: "tactical-accent-orange", panel: "tactical-panel-orange" },
                { stat: "500:1", label: "average lecture size at major universities", tone: "tactical-accent-amber", panel: "tactical-panel-amber" },
                { stat: "0 hrs", label: "of personal attention per week, on average", tone: "tactical-accent-violet", panel: "tactical-panel-violet" },
              ].map((item) => (
                <div key={item.stat} className={`tactical-panel ${item.panel} px-6 py-6 text-left`}>
                  <p className={`font-display text-5xl uppercase leading-none tracking-[0.03em] ${item.tone}`}>
                    {item.stat}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-text-secondary">{item.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.p variants={FADE_UP} className="tactical-meta mt-8 tactical-accent-cyan">
              ingen fixes this. Peer tutors who aced the same unit. AI that actually explains it.
              On demand.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <WhatsInsideSection />

      <section className="tactical-section">
        <div className="tactical-shell">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={STAGGER}
            >
              <motion.p variants={FADE_UP} className="tactical-meta mb-5 tactical-accent-cyan">
                Feature 01
              </motion.p>
              <motion.h2 variants={FADE_UP} className="tactical-title mb-5">
                It knows your schedule. You just study.
              </motion.h2>
              <motion.p variants={FADE_UP} className="tactical-copy mb-8 max-w-xl">
                Connect your Google Calendar, upload your syllabus, and the AI does the rest. It
                watches your deadlines and sends you nudges at the right time — like a personal
                assistant you never had.
              </motion.p>

              <motion.div variants={FADE_UP} className="space-y-3">
                {[
                  {
                    icon: <Calendar className="h-4 w-4 stroke-[2px]" />,
                    text: "Syncs your timetable, exams, and assignments automatically",
                    toneClass: "tactical-icon-cyan",
                  },
                  {
                    icon: <Zap className="h-4 w-4 stroke-[2px]" />,
                    text: "Nudges you to start work before it&apos;s too late",
                    toneClass: "tactical-icon-amber",
                  },
                  {
                    icon: <Activity className="h-4 w-4 stroke-[2px]" />,
                    text: "Tracks how prepared you are for each course in real time",
                    toneClass: "tactical-icon-emerald",
                  },
                  {
                    icon: <Target className="h-4 w-4 stroke-[2px]" />,
                    text: "Tells you exactly what to focus on today",
                    toneClass: "tactical-icon-indigo",
                  },
                ].map((item) => (
                  <div key={item.text} className="tactical-panel flex items-center gap-4 px-4 py-4">
                    <IconBox icon={item.icon} toneClass={item.toneClass} />
                    <span className="text-sm leading-6 text-text-secondary">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <StudyDashSim />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="tactical-section">
        <div className="tactical-shell">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={STAGGER}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <motion.p variants={FADE_UP} className="tactical-meta mb-5 tactical-accent-amber">
              Feature 02 · Panic Mode
            </motion.p>
            <motion.h2 variants={FADE_UP} className="tactical-title mb-5">
              Exam in 3 days? We&apos;ve got you.
            </motion.h2>
            <motion.p variants={FADE_UP} className="tactical-copy">
              When your exam is close and you&apos;re not ready, one tap triggers Panic Mode. The AI
              builds you a survival plan that actually fits your schedule.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mx-auto max-w-3xl"
          >
            <PanicModeSim />
          </motion.div>
        </div>
      </section>

      <section className="tactical-section">
        <div className="tactical-shell">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <EarningsSim />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={STAGGER}
              className="order-1 lg:order-2"
            >
              <motion.p variants={FADE_UP} className="tactical-meta mb-5 tactical-accent-emerald">
                Feature 03 · Earn as you go
              </motion.p>
              <motion.h2 variants={FADE_UP} className="tactical-title mb-5">
                Get help. Give help. Get paid for both.
              </motion.h2>
              <motion.p variants={FADE_UP} className="tactical-copy mb-8 max-w-xl">
                Tutor a first-year in COMP while a third-year tutors you in MATH. Sell your notes.
                Buy someone else&apos;s. The platform pays you as you go — so you can learn without
                going broke.
              </motion.p>

              <motion.div variants={FADE_UP} className="space-y-4">
                {[
                  {
                    icon: <Users className="h-4 w-4 stroke-[2px]" />,
                    title: "Tutor Marketplace",
                    desc: "Post your Zoom or Meet link. Set your price. Students book you in one tap.",
                    toneClass: "tactical-icon-cyan",
                  },
                  {
                    icon: <BookOpen className="h-4 w-4 stroke-[2px]" />,
                    title: "Notes Marketplace",
                    desc: "Upload your notes. Students buy them. You&apos;re earning while you sleep.",
                    toneClass: "tactical-icon-amber",
                  },
                  {
                    icon: <Network className="h-4 w-4 stroke-[2px]" />,
                    title: "Startup Mentors & Jobs",
                    desc: "Founders and employers on the platform looking for students like you.",
                    toneClass: "tactical-icon-violet",
                  },
                  {
                    icon: <TrendingUp className="h-4 w-4 stroke-[2px]" />,
                    title: "Earn more than you pay",
                    desc: "Many students offset their subscription entirely through tutoring and notes sales.",
                    toneClass: "tactical-icon-emerald",
                  },
                ].map((item) => (
                  <div key={item.title} className="tactical-panel flex items-start gap-4 px-4 py-4">
                    <IconBox icon={item.icon} toneClass={item.toneClass} />
                    <div>
                      <p className="tactical-meta mb-2 text-text-secondary">{item.title}</p>
                      <p className="text-sm leading-6 text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <HowItWorksSection />

      <section className="tactical-section">
        <div className="tactical-shell">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={STAGGER}
            className="mx-auto mb-12 max-w-4xl text-center"
          >
            <motion.p variants={FADE_UP} className="tactical-meta mb-5 tactical-accent-violet">
              World&apos;s first · Student circular economy
            </motion.p>
            <motion.h2 variants={FADE_UP} className="tactical-title mb-5">
              Universities take. ingen gives back.
            </motion.h2>
            <motion.p variants={FADE_UP} className="tactical-copy mx-auto max-w-3xl">
              International and domestic students pay tens of thousands in tuition. Then they pay
              again for tutors, textbooks, and notes. We built a system where students help each
              other — and get paid for it.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={STAGGER}
            className="mb-8 grid gap-4 md:grid-cols-3"
          >
            {[
              {
                step: "01",
                icon: <Brain className="h-5 w-5 stroke-[2px]" />,
                title: "You learn",
                desc: "AI manages your schedule. You get tutored by someone who aced the same unit last semester.",
                tag: "Pay as you go",
                tone: "tactical-icon-cyan",
                tagTone: "tactical-chip tactical-chip-cyan",
              },
              {
                step: "02",
                icon: <Users className="h-5 w-5 stroke-[2px]" />,
                title: "You teach",
                desc: "Tutor first-years in units you&apos;ve already passed. Set your own rate. Run sessions on Zoom or Meet.",
                tag: "Earn as you go",
                tone: "tactical-icon-violet",
                tagTone: "tactical-chip tactical-chip-violet",
              },
              {
                step: "03",
                icon: <TrendingUp className="h-5 w-5 stroke-[2px]" />,
                title: "You grow",
                desc: "Get mentored by startup founders. Apply to jobs directly through the platform. Graduate with experience.",
                tag: "Career pipeline",
                tone: "tactical-icon-emerald",
                tagTone: "tactical-chip tactical-chip-emerald",
              },
            ].map((item) => (
              <motion.div key={item.step} variants={FADE_UP} className="tactical-panel px-6 py-6">
                <p className="tactical-meta mb-4">{item.step}</p>
                <div className={`tactical-icon mb-4 h-11 w-11 ${item.tone}`}>
                  {item.icon}
                </div>
                <h3 className="font-display text-3xl uppercase tracking-[0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-text-secondary">{item.desc}</p>
                <p className={`${item.tagTone} mt-6`}>{item.tag}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="tactical-panel mx-auto max-w-4xl px-8 py-8 text-center"
          >
            <p className="text-xl leading-9 text-text-secondary md:text-2xl">
              &quot;A student in Year 3 tutors a Year 1. That same student gets tutored by a PhD.
              They sell their notes. A startup founder mentors them. They graduate with money in
              their pocket and a job lined up.
              <br />
              <span className="text-white">That&apos;s ingen.&quot;</span>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="tactical-section">
        <div className="tactical-shell">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={STAGGER}
            className="mx-auto mb-12 max-w-4xl text-center"
          >
            <motion.p variants={FADE_UP} className="tactical-meta mb-5 tactical-accent-cyan">
              Used globally
            </motion.p>
            <motion.h2 variants={FADE_UP} className="tactical-title mb-5">
              Students everywhere are using ingen.
            </motion.h2>
            <motion.p variants={FADE_UP} className="tactical-copy mx-auto max-w-2xl">
              From Sydney to Boston to Mumbai — helping students across 30+ universities.
            </motion.p>
          </motion.div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="tactical-panel p-4"
            >
              <Globe />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={STAGGER}
              className="space-y-6"
            >
              <motion.div variants={FADE_UP} className="grid grid-cols-2 gap-4">
                {[
                  { value: "30+", label: "Universities", tone: "tactical-accent-cyan" },
                  { value: "10K+", label: "Active students", tone: "tactical-accent-emerald" },
                  { value: "94%", label: "Exam pass rate", tone: "tactical-accent-violet" },
                  { value: "$15", label: "Per month", tone: "tactical-accent-amber" },
                ].map((item) => (
                  <div key={item.label} className="tactical-panel px-5 py-5">
                    <p className={`font-display text-4xl uppercase leading-none tracking-[0.03em] ${item.tone}`}>
                      {item.value}
                    </p>
                    <p className="tactical-meta mt-3 text-text-secondary">{item.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={FADE_UP}>
                <p className="tactical-meta mb-3 text-text-secondary">Active universities</p>
                <div className="flex flex-wrap gap-2">
                  {universities.map((uni, index) => (
                    <span
                      key={uni}
                      className={`tactical-chip ${
                        index % 4 === 0
                          ? "tactical-chip-cyan"
                          : index % 4 === 1
                            ? "tactical-chip-violet"
                            : index % 4 === 2
                              ? "tactical-chip-amber"
                              : "tactical-chip-emerald"
                      }`}
                    >
                      {uni}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="pricing" className="tactical-section">
        <div className="tactical-shell">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={STAGGER}
            className="mx-auto max-w-4xl"
          >
            <motion.div variants={FADE_UP} className="mb-10 text-center">
              <p className="tactical-meta mb-5 tactical-accent-amber">Pricing</p>
              <h2 className="tactical-title mb-5">Less than a coffee a day.</h2>
              <p className="tactical-copy mx-auto max-w-lg">
                $15/month. Cancel anytime. Way cheaper than failing a unit.
              </p>
            </motion.div>

            <motion.div variants={FADE_UP} className="tactical-panel mx-auto max-w-2xl px-8 py-8">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
                <div>
                  <p className="font-display text-7xl uppercase leading-none tracking-[0.03em] text-white">
                    <span className="tactical-accent-cyan">$15</span>
                  </p>
                  <p className="tactical-meta mt-3 text-text-secondary">/month</p>
                </div>

                <div className="grid gap-3 text-right sm:text-left">
                  <div className="tactical-chip tactical-chip-violet justify-center sm:justify-start">$3.75 / week</div>
                  <div className="tactical-chip tactical-chip-emerald justify-center sm:justify-start">50¢ / day</div>
                </div>
              </div>

              <p className="tactical-copy mb-8 max-w-xl">Everything included. No hidden fees.</p>

              <div className="mb-8 space-y-3">
                {[
                  "AI study manager with full calendar sync",
                  "Panic Mode (unlimited activations)",
                  "Unlimited practice exam generation",
                  "Access to tutor marketplace",
                  "Sell your notes on the marketplace",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-[2px] border border-border bg-surface-2 text-white">
                      <CheckCircle2 className="h-3 w-3 stroke-[2px] tactical-accent-emerald" />
                    </div>
                    <span className="text-sm leading-6 text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="tactical-button tactical-button-accent-cyan w-full"
                onClick={() =>
                  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Join the waitlist
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="tactical-section pb-24">
        <div className="tactical-shell">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={STAGGER}
          >
            <motion.div variants={FADE_UP} className="mb-10 text-center">
              <p className="tactical-meta mb-5 tactical-accent-orange">The system is broken. Students know it.</p>
              <h2 className="tactical-title mb-5">
                The system is broken.
                <br />
                Students know it.
              </h2>
              <p className="tactical-copy mx-auto max-w-lg">
                Real students. Real frustration. This is why we&apos;re building ingen.
              </p>
            </motion.div>

            <motion.div variants={FADE_UP} className="grid gap-4 md:grid-cols-3">
              {[
                {
                  text: "I paid $40k in tuition this year. My tutorial has 200 people in it, the tutor reads off slides, and I&apos;ve never spoken to a professor one-on-one. The system is a joke.",
                  name: "Alex T.",
                  role: "UNSW · CS · Year 2",
                  seed: "Alex",
                  tone: "tactical-accent-orange",
                },
                {
                  text: "I&apos;m literally paying $15/hr to be tutored by someone who took the same unit 6 months ago and barely passed. If I could find someone who actually aced it I&apos;d pay double.",
                  name: "Mia K.",
                  role: "Monash · Commerce · Year 3",
                  seed: "Mia",
                  tone: "tactical-accent-amber",
                },
                {
                  text: "ingen sounds like what uni should&apos;ve been from day one. An AI that actually knows my schedule, peer tutors who passed the unit, and I can make money on the side? Sign me up.",
                  name: "Ryan C.",
                  role: "UQ · Engineering · Year 4",
                  seed: "Ryan",
                  tone: "tactical-accent-emerald",
                },
              ].map((item) => (
                <div key={item.name} className="tactical-panel flex h-full flex-col px-6 py-6">
                  <p className="flex-1 text-sm leading-7 text-text-secondary">&quot;{item.text}&quot;</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <div className="h-10 w-10 overflow-hidden rounded-[2px] border border-border bg-surface-2">
                      <img
                        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${item.seed}&backgroundColor=0d0d0d`}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className={`tactical-meta ${item.tone}`}>{item.name}</p>
                      <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <TalkToIngen />
      <WaitlistSection />
    </div>
  );
}
