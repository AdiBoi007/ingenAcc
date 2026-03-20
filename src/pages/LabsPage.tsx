import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { LandingNav } from "../components/LandingNav";

type CalloutLine = {
  text: string;
  italic?: boolean;
  mono?: boolean;
  accent?: boolean;
};

type LabsFeature = {
  id: string;
  index: string;
  name: string;
  descriptor: string;
  description: string;
  bullets: string[];
  caption: string;
  concept: string;
  accentColor: string;
  calloutBorderColor: string;
  calloutLines: CalloutLine[];
  visualVariant:
    | "cramazon"
    | "painstation"
    | "nerd"
    | "void"
    | "blackmarket"
    | "uniconnect";
  dimmed?: boolean;
  status?: string;
};

const LABS_FEATURES: LabsFeature[] = [
  {
    id: "cramazon-prime",
    index: "∅1",
    name: "CRAMAZON PRIME",
    descriptor: "ACADEMIC COMMAND CENTER",
    description:
      "Your entire semester, mapped. AI syncs your timetable, reads your syllabus, tracks every deadline, scores your readiness per subject, and tells you exactly what to do today. No more \"wait when is that due?\" panic. No more discovering you have three assessments in one week on Sunday night. Cramazon Prime delivers your academic plan before you even know you need it.",
    bullets: [
      "AI-generated week-by-week study plan from your syllabus",
      "Readiness score per subject, updated daily",
      "Deadline alerts before the panic sets in",
      "One dashboard. Every unit. All semester.",
    ],
    caption: "\"FASTER THAN YOUR PROF'S PORTAL. MORE RELIABLE THAN YOUR MEMORY.\"",
    concept:
      "A Superman-type figure carrying Amazon boxes labelled LECTURE SLIDES, PAST PAPERS, and AI STUDY PLAN with a NEW FEATURE badge.",
    accentColor: "#00e5ff",
    calloutBorderColor: "rgba(34, 211, 238, 0.22)",
    calloutLines: [
      { text: "⚡  INGEN DELIVERS.", mono: true, accent: true },
      { text: "Australia Post does not.", italic: true },
    ],
    visualVariant: "cramazon",
  },
  {
    id: "painstation",
    index: "∅2",
    name: "PAINSTATION",
    descriptor: "EXAM SURVIVAL ENGINE",
    description:
      "Exam in 3 days and you've opened the app zero times this semester? Tap Panic Mode. The AI looks at how many hours you have left, which topics are most likely to appear, and what your weak spots are — then builds a timed block-by-block survival plan. Not a vibe. An actual schedule. It won't save your social life. It will save your GPA.",
    bullets: [
      "One-tap Panic Mode activation",
      "AI-generated hour-by-hour rescue plan",
      "Topic prioritisation by exam weight",
      "Practice exam generation mid-plan",
    ],
    caption: "\"THE BOSS FIGHT IS REAL. THE PLAN IS REALER.\"",
    concept:
      "A dark gaming setup with a red screen reading PAINSTATION — EXAM EDITION, plus floating HUD stats for EXAM, READINESS, and PANIC LEVEL.",
    accentColor: "#f0a500",
    calloutBorderColor: "rgba(240, 165, 0, 0.4)",
    calloutLines: [
      { text: "🚨  PANIC MODE HAS BEEN ACTIVATED", mono: true, accent: true },
      { text: "8 study blocks scheduled. 3 days remaining.", mono: true },
      { text: "You will survive. Probably." },
    ],
    visualVariant: "painstation",
  },
  {
    id: "talk-to-a-nerd",
    index: "∅3",
    name: "TALK TO A NERD",
    descriptor: "PEER TUTOR MARKETPLACE",
    description:
      "Not a 45-year-old tutor who memorised the textbook. An actual student who sat the same exam you're about to sit — and passed. Book them for $15-40/hr. Run it on Zoom or Meet. Get explanations that make sense because they were confused about the same stuff 6 months ago. The secret weapon your uni pretends doesn't exist.",
    bullets: [
      "Verified students with confirmed unit completion",
      "Rated by students who booked before you",
      "Book in under 60 seconds",
      "Want to tutor? Set your price and go live today",
    ],
    caption: "\"INSIDER KNOWLEDGE. LEGALLY OBTAINED.\"",
    concept:
      "A Zoom-style tutoring call with a confused student, a tutor wearing an I ACED THIS UNIT badge, and a speech bubble spilling the real exam meta.",
    accentColor: "#a78bfa",
    calloutBorderColor: "rgba(167, 139, 250, 0.38)",
    calloutLines: [
      { text: "🤓  \"I PASSED THIS UNIT LAST SEMESTER\"", mono: true, accent: true },
      { text: "That's the only qualification that matters." },
    ],
    visualVariant: "nerd",
  },
  {
    id: "the-void",
    index: "∅4",
    name: "THE VOID",
    descriptor: "ANONYMOUS STUDENT FORUM",
    description:
      "A place where students say what they actually think. Anonymous usernames, course-tagged posts, zero social anxiety. Vent about your tutor. Find teammates who actually do the work. Commiserate with 400 other people who also didn't start the assignment. The Void is where the real conversation about uni happens — not the one on the faculty Instagram.",
    bullets: [
      "Fully anonymous — no real names, ever",
      "Course-tagged posts so content is relevant to you",
      "Teammate finder for group projects",
      "Meme, vent, ask, connect",
    ],
    caption: "\"EVERY THOUGHT YOU HAD ABOUT UNI. ANONYMOUSLY.\"",
    concept:
      "A black-hole forum scene with anonymous usernames drifting through space beside stressed course posts and group-project cries for help.",
    accentColor: "#555555",
    calloutBorderColor: "rgba(85, 85, 85, 0.28)",
    calloutLines: [
      { text: "🕳️  CURRENT ACTIVITY IN THE VOID", mono: true, accent: true },
      { text: "\"who else has 4 deadlines this week\" — 847 agrees", mono: true },
    ],
    visualVariant: "void",
  },
  {
    id: "blackmarket-gpa",
    index: "∅5",
    name: "BLACKMARKET GPA",
    descriptor: "NOTES & RESOURCE ECONOMY",
    description:
      "Notes, summaries, cheat sheets, and past paper breakdowns — sold by students who already passed the unit. Buy what you need for $5-15. Sell your own notes once you're done. Upload once, earn while you're in your next lecture pretending to pay attention. The student knowledge economy, finally formalised.",
    bullets: [
      "Buy course-specific notes, summaries, and guides",
      "Sell your own — upload once, earn passively",
      "Verified by unit code and university",
      "Rated by students who actually used them",
    ],
    caption: "\"TECHNICALLY LEGAL. EXTREMELY EFFECTIVE.\"",
    concept:
      "A trenchcoat-style alleyway visual where the contraband is a glowing note pack labelled WEEK 1-13 NOTES + PAST PAPERS + CHEAT SHEET with an $8 tag.",
    accentColor: "#f0a500",
    calloutBorderColor: "rgba(240, 165, 0, 0.38)",
    calloutLines: [
      { text: "💰  STUDENT SOLD 47 NOTE PACKS THIS SEMESTER", mono: true, accent: true },
      { text: "Earned $380. Paid for their own subscription", mono: true },
      { text: "12 times over. This is financial literacy." },
    ],
    visualVariant: "blackmarket",
  },
  {
    id: "uniconnect",
    index: "∅6",
    name: "UNICONNECT",
    descriptor: "CAMPUS NETWORK LAYER",
    description:
      "Societies, hackathon teams, study groups, startup co-founders. Filtered by your university, degree, and year. The campus network you never got from orientation week because orientation week is always terrible.",
    bullets: [
      "Society and opportunity discovery by university",
      "Group project and hackathon teammate matching",
      "Signals for people who actually show up",
      "Built for campus relationships that survive after week one",
    ],
    caption: "\"FIND PEOPLE WORTH KNOWING. BEFORE GRADUATION MAKES IT AWKWARD.\"",
    concept:
      "A student-network interface with floating profile cards, connection requests, and badges like ACTUALLY REPLIES TO GROUPCHAT and DOES NOT FREE-RIDE.",
    accentColor: "#333333",
    calloutBorderColor: "rgba(34, 34, 34, 0.9)",
    calloutLines: [
      { text: "🔗  NOT READY YET.", mono: true, accent: true },
      { text: "We're still building it. Unlike your group", mono: true },
      { text: "project partner, we will actually deliver." },
    ],
    visualVariant: "uniconnect",
    dimmed: true,
    status: "[ COMING SOON ]",
  },
];

function LabsVisual({ feature }: { feature: LabsFeature }) {
  switch (feature.visualVariant) {
    case "cramazon":
      return (
        <div className="labs-media-panel labs-media-panel-cramazon" data-concept={feature.concept}>
          <span className="labs-media-badge labs-media-badge-alert">NEW FEATURE</span>
          <div className="labs-cramazon-skyline" />
          <div className="labs-cramazon-figure">
            <div className="labs-cramazon-head" />
            <div className="labs-cramazon-body" />
            <div className="labs-cramazon-cape" />
          </div>
          <div className="labs-cramazon-stack">
            {["LECTURE SLIDES", "PAST PAPERS", "AI STUDY PLAN"].map((label) => (
              <div key={label} className="labs-media-box">
                {label}
              </div>
            ))}
          </div>
        </div>
      );

    case "painstation":
      return (
        <div className="labs-media-panel labs-media-panel-painstation" data-concept={feature.concept}>
          <div className="labs-painstation-screen">
            <p className="labs-screen-title">PAINSTATION — EXAM EDITION</p>
            <div className="labs-painstation-hud">
              <span>EXAM: 3 DAYS</span>
              <span>READINESS: 12%</span>
              <span>PANIC LEVEL: MAXIMUM</span>
            </div>
          </div>
          <div className="labs-painstation-desk">
            <div className="labs-painstation-monitor-glow" />
            <div className="labs-painstation-silhouette" />
            <div className="labs-painstation-controller" />
          </div>
        </div>
      );

    case "nerd":
      return (
        <div className="labs-media-panel labs-media-panel-nerd" data-concept={feature.concept}>
          <div className="labs-nerd-badge">HD STUDENT · LAST SEMESTER · YOUR SUBJECT</div>
          <div className="labs-nerd-call">
            <div className="labs-nerd-card">
              <span className="labs-nerd-card-label">YOU</span>
              <div className="labs-nerd-avatar labs-nerd-avatar-user" />
            </div>
            <div className="labs-nerd-card labs-nerd-card-highlight">
              <span className="labs-nerd-card-label">I ACED THIS UNIT</span>
              <div className="labs-nerd-avatar labs-nerd-avatar-tutor" />
            </div>
          </div>
          <div className="labs-nerd-bubble">
            okay so the prof never actually tests chapter 4
          </div>
        </div>
      );

    case "void":
      return (
        <div className="labs-media-panel labs-media-panel-void" data-concept={feature.concept}>
          <div className="labs-void-ring" />
          <div className="labs-void-user labs-void-user-a">void_user_4821</div>
          <div className="labs-void-user labs-void-user-b">notabot_maybe</div>
          <div className="labs-void-user labs-void-user-c">justpassingthrough99</div>
          <div className="labs-void-post labs-void-post-a">
            who else hasn&apos;t started the assignment due tomorrow
          </div>
          <div className="labs-void-post labs-void-post-b">
            need 2 people for BUSS1020 pls actually contribute
          </div>
          <div className="labs-void-post labs-void-post-c">
            the tutor literally read off slides for 50 mins
          </div>
        </div>
      );

    case "blackmarket":
      return (
        <div className="labs-media-panel labs-media-panel-blackmarket" data-concept={feature.concept}>
          <div className="labs-blackmarket-alley" />
          <div className="labs-blackmarket-silhouette" />
          <div className="labs-blackmarket-folder">
            WEEK 1-13 NOTES
            <br />
            + PAST PAPERS
            <br />
            + CHEAT SHEET
          </div>
          <div className="labs-blackmarket-tag">$8.00</div>
        </div>
      );

    case "uniconnect":
      return (
        <div className="labs-media-panel labs-media-panel-uniconnect" data-concept={feature.concept}>
          <div className="labs-uniconnect-grid">
            {[
              "ACTUALLY REPLIES TO GROUPCHAT",
              "TURNS UP TO MEETINGS",
              "DOES NOT FREE-RIDE",
            ].map((badge) => (
              <div key={badge} className="labs-uniconnect-card">
                <div className="labs-uniconnect-avatar" />
                <span className="labs-uniconnect-badge">{badge}</span>
              </div>
            ))}
          </div>
          <div className="labs-uniconnect-links">
            <span />
            <span />
            <span />
          </div>
        </div>
      );
  }

  return null;
}

export default function LabsPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const revealRefs = useRef<Array<HTMLElement | null>>([]);
  const [visibleSections, setVisibleSections] = useState<boolean[]>(() =>
    Array.from({ length: LABS_FEATURES.length + 1 }, () => false),
  );

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timeouts: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number((entry.target as HTMLElement).dataset.index);
          const timeoutId = window.setTimeout(() => {
            setVisibleSections((previous) =>
              previous.map((isVisible, currentIndex) =>
                currentIndex === index ? true : isVisible,
              ),
            );
          }, index * 100);

          timeouts.push(timeoutId);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 },
    );

    const currentRefs = revealRefs.current.filter(
      (section): section is HTMLElement => section !== null,
    );

    currentRefs.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  return (
    <div className="tactical-page labs-page">
      <div aria-hidden="true" className="pointer-events-none">
        <div className="tactical-orb tactical-orb-cyan left-[-12rem] top-16 h-[28rem] w-[28rem] opacity-[0.14]" />
        <div className="tactical-orb tactical-orb-violet right-[-12rem] top-[26rem] h-[32rem] w-[32rem] opacity-[0.1]" />
        <div className="tactical-orb tactical-orb-amber left-1/2 top-[72%] h-[30rem] w-[30rem] -translate-x-1/2 opacity-[0.08]" />
      </div>

      <LandingNav scrolled={navScrolled} />

      <section className="relative border-b border-border px-5 pb-24 pt-36 md:px-10 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-[1280px]">
          <p className="labs-hero-tag">[ INGEN LABS — PRODUCT SUITE ]</p>
          <h1 className="labs-hero-title">
            WE BUILT WHAT
            <br />
            YOUR UNI <span className="tactical-hollow">COULDN&apos;T.</span>
          </h1>
          <p className="labs-hero-copy">
            Six tools. One OS.
            <br />
            Designed for students who are cooked, broke, and done pretending uni is fine.
          </p>
        </div>
      </section>

      {LABS_FEATURES.map((feature, index) => {
        const reverseDesktop = index % 2 === 1;

        return (
          <section
            key={feature.id}
            ref={(element) => {
              revealRefs.current[index] = element;
            }}
            data-index={index}
            className={`labs-feature-section labs-reveal ${
              visibleSections[index] ? "labs-reveal-visible" : ""
            } ${feature.dimmed ? "labs-feature-section-dim" : ""}`}
          >
            <div className="labs-feature-shell">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={reverseDesktop ? "lg:order-2" : ""}>
                  <LabsVisual feature={feature} />
                  <p className="labs-feature-caption">{feature.caption}</p>
                </div>

                <div className={reverseDesktop ? "lg:order-1" : ""}>
                  <p className="labs-feature-index">{feature.index}</p>
                  <h2 className="labs-feature-title">{feature.name}</h2>
                  <p className="labs-feature-descriptor">{feature.descriptor}</p>
                  {feature.status ? (
                    <span className="labs-feature-status">{feature.status}</span>
                  ) : null}
                  <p className="labs-feature-description">{feature.description}</p>

                  <div className="labs-feature-list">
                    {feature.bullets.map((bullet) => (
                      <div key={bullet} className="labs-feature-list-item">
                        <span style={{ color: feature.accentColor }}>→</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="labs-callout"
                    style={{ borderColor: feature.calloutBorderColor }}
                  >
                    {feature.calloutLines.map((line) => (
                      <p
                        key={line.text}
                        className={[
                          "labs-callout-line",
                          line.mono ? "labs-callout-line-mono" : "",
                          line.italic ? "labs-callout-line-italic" : "",
                          line.accent ? "labs-callout-line-accent" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={line.accent ? { color: feature.accentColor } : undefined}
                      >
                        {line.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section
        ref={(element) => {
          revealRefs.current[LABS_FEATURES.length] = element;
        }}
        data-index={LABS_FEATURES.length}
        className={`labs-cta-section labs-reveal ${
          visibleSections[LABS_FEATURES.length] ? "labs-reveal-visible" : ""
        }`}
      >
        <div className="labs-feature-shell text-center">
          <h2 className="labs-cta-title">
            SEEN <span className="tactical-hollow">ENOUGH?</span>
          </h2>
          <div className="mt-8 flex flex-col items-center gap-5">
            <Link to="/#waitlist" className="tactical-button tactical-button-accent-cyan">
              JOIN THE WAITLIST
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/" className="labs-back-link">
              BACK TO MAIN SITE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
