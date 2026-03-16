import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:3000/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        return;
      }

      const data = await response.json().catch(() => ({}));
      setErrorMsg(data?.error ?? "Something went wrong. Try again.");
      setStatus("error");
    } catch {
      setErrorMsg("Could not reach server. Try again.");
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="tactical-section border-b border-border">
      <div className="tactical-shell">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="tactical-meta mb-5 tactical-accent-cyan">Early access · Limited spots</p>
          <h2 className="tactical-title mb-5">
            Get in early.
            <br />
            Before everyone else.
          </h2>
          <p className="tactical-copy mx-auto mb-10 max-w-2xl">
            Join the waitlist. We&apos;re rolling out to early users first — no spam, just your
            invite when we&apos;re ready.
          </p>

          <div className="tactical-panel tactical-panel-cyan px-6 py-6">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-3 py-4">
                <div className="flex h-12 w-12 items-center justify-center border border-[rgba(52,211,153,0.4)] bg-[rgba(52,211,153,0.12)] text-[var(--accent-emerald)]">
                  <CheckCircle2 className="h-5 w-5 stroke-[2px]" />
                </div>
                <p className="font-display text-4xl uppercase leading-none tracking-[0.03em] tactical-accent-emerald">
                  You&apos;re on the list.
                </p>
                <p className="text-sm leading-6 text-text-secondary">We&apos;ll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="your@email.com"
                  required
                  className="tactical-input flex-1"
                />
                <button type="submit" disabled={status === "loading"} className="tactical-button tactical-button-accent-cyan">
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 stroke-[2px]" />
                      Joining...
                    </>
                  ) : (
                    "Join waitlist"
                  )}
                </button>
              </form>
            )}

            {status === "error" && (
              <div className="mt-4 border border-[rgba(251,146,60,0.22)] bg-[rgba(251,146,60,0.06)] px-4 py-3 text-left">
                <p className="tactical-meta tactical-accent-orange">Request failed</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{errorMsg}</p>
              </div>
            )}

            <p className="tactical-meta mt-6 text-text-secondary">
              No spam. No sharing your data. Just an invite when we launch.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
