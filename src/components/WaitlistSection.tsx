import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

export function WaitlistSection() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || status === "loading") return;
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("http://localhost:3000/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                const data = await res.json().catch(() => ({}));
                setErrorMsg(data?.error ?? "Something went wrong. Try again.");
                setStatus("error");
            }
        } catch {
            setErrorMsg("Could not reach server. Try again.");
            setStatus("error");
        }
    };

    return (
        <section id="waitlist" className="w-full py-28 bg-[#030303] border-y border-white/[0.05] relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-cyan/6 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan px-3 py-1.5 rounded-lg mb-6 font-mono text-[10px] uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                        Early access · Limited spots
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        Get in early.
                        <br />
                        <span className="bg-gradient-to-r from-accent-cyan to-accent-emerald bg-clip-text text-transparent">
                            Before everyone else.
                        </span>
                    </h2>
                    <p className="text-white/40 text-base mb-10 max-w-md mx-auto">
                        Join the waitlist. We're rolling out to early users first — no spam, just your invite when we're ready.
                    </p>

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center gap-3 text-accent-emerald"
                            >
                                <CheckCircle2 className="w-6 h-6" />
                                <p className="text-lg font-semibold">You're on the list. We'll be in touch.</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={submit}
                                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="flex-1 bg-white/[0.04] border border-white/[0.10] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-accent-cyan/40 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="bg-white text-black font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-white/90 transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                                >
                                    {status === "loading" ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Joining...</>
                                    ) : "Join waitlist →"}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {status === "error" && (
                        <p className="text-red-400 text-sm mt-3">{errorMsg}</p>
                    )}

                    <p className="text-white/25 text-xs font-mono mt-6">
                        No spam. No sharing your data. Just an invite when we launch.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
