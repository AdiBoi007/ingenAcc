import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { AristotleAvatar } from "./AristotleAvatar";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const SYSTEM_PROMPT = `You are aristotle — the AI built INTO the ingen platform for students. You are NOT a general assistant. You are a product expert and you are here to sell ingen hard while being completely honest about what it does.

ABOUT INGEN:
- ingen is an all-in-one student platform with: AI academic management, a peer-to-peer tutoring marketplace, a notes marketplace, startup mentorship, and job placements.
- The AI connects to the student's Google Calendar, analyses their syllabus and deadlines, tracks their readiness scores per subject in real time, and auto-schedules study blocks around their life.
- Panic Mode: if a student has an exam in days and hasn't prepared, the AI detects this and builds an emergency study plan hour by hour.
- Peer tutors on ingen ACED the same unit at the same uni — not random tutors, students who actually passed it with flying colours.
- Students earn money on the platform by tutoring or selling their notes. The platform pays for itself.
- ingen is NOT generic. It knows your specific subjects, your specific uni, your specific schedule.

WHEN ASKED "How is this different from ChatGPT?":
Say something like: "ChatGPT gives generic advice to anyone. ingen is connected to YOUR calendar, YOUR syllabus, YOUR deadlines. It knows you have Cybersecurity on Thursday, that you haven't studied in 3 days, and that your exam is in 6 days. It then blocks time in your actual calendar tonight and tomorrow. ChatGPT can't do that. And ChatGPT can't connect you to a peer tutor who got 90 in the same unit last semester, or pay you $40/hour for tutoring someone else. ingen is a whole operating system for your degree."

TONE & RULES:
- Be punchy, direct, confident. No fluff. No corporate speak.
- Max 3-4 sentences per reply unless they ask for detail.
- You are allowed to be blunt about how broken the university system is.
- Never say "great question". Never be sycophantic.
- Always bring it back to a specific ingen feature.
- If someone seems skeptical, lean into it — address the doubt head on.`;


export function TalkToIngen() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hey. I'm aristotle — your AI study partner. Ask me anything about how ingen works, what you can earn, or how the AI helps you study. Go.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const send = async () => {
        const text = input.trim();
        if (!text || loading) return;
        setInput("");
        setExpanded(true);

        const userMsg: Message = { role: "user", content: text };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);

        try {
            const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        ...messages,
                        userMsg,
                    ],
                    max_tokens: 200,
                    temperature: 0.8,
                }),
            });

            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content ?? "Something went wrong. Try again.";
            setMessages(prev => [...prev, { role: "assistant", content: reply }]);
        } catch {
            setMessages(prev => [...prev, { role: "assistant", content: "Network error. Make sure you're connected and try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <section className="w-full py-28 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent-violet/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 bg-accent-violet/10 border border-accent-violet/20 text-accent-violet px-3 py-1.5 rounded-lg mb-6 font-mono text-[10px] uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-pulse" />
                        aristotle · AI
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        Talk to aristotle.<br />
                        <span className="text-accent-violet">See if it's a fit.</span>
                    </h2>
                    <p className="text-white/40 text-base max-w-lg mx-auto">
                        Ask aristotle anything — how the AI works, what you can earn, how panic mode saves you. Real answers, no sales pitch.
                    </p>
                </motion.div>

                {/* Chat window */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#080808] border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Titlebar */}
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-[#060606]">
                        <AristotleAvatar size={36} speaking={loading} />
                        <div>
                            <p className="text-sm font-semibold text-white">aristotle</p>
                            <p className="text-[10px] font-mono text-accent-violet">
                                {loading ? "typing..." : "online · ready to help"}
                            </p>
                        </div>
                        <div className="ml-auto flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        className="overflow-y-auto transition-all duration-500"
                        style={{ maxHeight: expanded ? "380px" : "220px" }}
                    >
                        <div className="p-5 space-y-4">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    {m.role === "assistant" && (
                                        <div className="shrink-0 mt-0.5">
                                            <AristotleAvatar size={28} speaking={loading && i === messages.length - 1} />
                                        </div>
                                    )}
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user"
                                        ? "bg-accent-violet/20 border border-accent-violet/30 text-white"
                                        : "bg-white/[0.04] border border-white/[0.07] text-white/80"
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex gap-3 justify-start">
                                    <AristotleAvatar size={28} speaking={true} />
                                    <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl px-4 py-3 flex gap-1.5 items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-3 p-4 border-t border-white/[0.06]">
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder="Ask anything... e.g. 'How much can I earn tutoring?'"
                            disabled={loading}
                            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-accent-violet/40 transition-colors disabled:opacity-50"
                        />
                        <button
                            onClick={send}
                            disabled={!input.trim() || loading}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${!input.trim() || loading
                                ? "bg-white/10 text-white/20"
                                : "bg-white text-black hover:scale-105 active:scale-95"
                                }`}
                        >
                            <ArrowUp className="w-5 h-5 stroke-[2.5px]" />
                        </button>
                    </div>
                </motion.div>

                {/* Suggested prompts */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 mt-4 justify-center"
                >
                    {[
                        "How is this different from ChatGPT?",
                        "How much can I earn tutoring?",
                        "What is panic mode?",
                        "Does the AI actually work?",
                    ].map(q => (
                        <button
                            key={q}
                            onClick={() => { setInput(q); inputRef.current?.focus(); }}
                            className="text-[11px] font-mono text-white/40 border border-white/[0.07] px-3 py-1.5 rounded-full hover:border-accent-violet/40 hover:text-white/70 transition-all"
                        >
                            {q}
                        </button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
