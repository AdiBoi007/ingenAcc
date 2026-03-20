import { Link, useLocation } from "react-router-dom";

import ingenLogo from "../assets/ingen logo.png";

const NAV_ITEMS = [
  { id: "how-it-works", label: "HOW IT WORKS" },
  { id: "pricing", label: "PRICING" },
  { id: "talk-to-aristotle", label: "ARISTOTLE" },
  { id: "waitlist", label: "EARLY ACCESS" },
] as const;

type LandingNavProps = {
  scrolled?: boolean;
};

export function LandingNav({ scrolled = false }: LandingNavProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollToTarget = (targetId: string) => {
    const target = document.getElementById(targetId);

    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${targetId}`);
  };

  return (
    <nav className={`landing-nav ${scrolled ? "landing-nav-scrolled" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        {isHome ? (
          <button
            type="button"
            className="landing-nav-home flex items-center gap-3"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.replaceState(null, "", "/");
            }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-border bg-surface p-2">
              <img src={ingenLogo} alt="Ingen" className="h-full w-full object-contain" />
            </div>
            <div className="flex items-end gap-2">
              <span className="landing-nav-wordmark">INGEN</span>
              <span className="landing-nav-submark">LABS</span>
            </div>
          </button>
        ) : (
          <Link to="/" className="landing-nav-home flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-border bg-surface p-2">
              <img src={ingenLogo} alt="Ingen" className="h-full w-full object-contain" />
            </div>
            <div className="flex items-end gap-2">
              <span className="landing-nav-wordmark">INGEN</span>
              <span className="landing-nav-submark">LABS</span>
            </div>
          </Link>
        )}

        <div className="hidden items-center gap-3 lg:flex">
          {NAV_ITEMS.map((item, index) => (
            <div key={item.id} className="flex items-center gap-3">
              <Link
                to={`/#${item.id}`}
                className="landing-nav-link"
                onClick={(event) => {
                  if (!isHome) return;

                  event.preventDefault();
                  scrollToTarget(item.id);
                }}
              >
                {item.label}
              </Link>
              {index < NAV_ITEMS.length - 1 ? (
                <span className="landing-nav-separator">·</span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            to="/labs"
            className="landing-nav-badge"
            aria-current={location.pathname === "/labs" ? "page" : undefined}
          >
            LABS
          </Link>
          <Link
            to="/#waitlist"
            className="landing-nav-cta"
            onClick={(event) => {
              if (!isHome) return;

              event.preventDefault();
              scrollToTarget("waitlist");
            }}
          >
            JOIN THE WAITLIST
          </Link>
        </div>
      </div>
    </nav>
  );
}
