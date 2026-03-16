import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { AristotleAvatar } from "./AristotleAvatar";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are aristotle - the AI built INTO the ingen platform for students. You are NOT a general assistant. You are a product expert and you are here to sell ingen hard while being completely honest about what it does.

ABOUT INGEN:
- ingen is an all-in-one student platform with: AI academic management, a peer-to-peer tutoring marketplace, a notes marketplace, startup mentorship, and job placements.
- The AI connects to the student's Google Calendar, analyses their syllabus and deadlines, tracks their readiness scores per subject in real time, and auto-schedules study blocks around their life.
- Panic Mode: if a student has an exam in days and hasn't prepared, the AI detects this and builds an emergency study plan hour by hour.
- Peer tutors on ingen ACED the same unit at the same uni - not random tutors, students who actually passed it with flying colours.
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
- If someone seems skeptical, lean into it - address the doubt head on.`;

export function TalkToIngen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey. I'm aristotle — your AI study partner. Ask me anything about how ingen works, what you can earn, or how the AI helps you study. Go.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesViewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const viewport = messagesViewportRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages, userMsg],
          max_tokens: 200,
          temperature: 0.8,
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content ?? "Something went wrong. Try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Make sure you're connected and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  return (
    <section id="talk-to-aristotle" className="tactical-section">
      <div className="tactical-shell">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-10 text-center">
            <p className="tactical-meta mb-5 tactical-accent-violet">aristotle · AI</p>
            <h2 className="tactical-title mb-5">
              Talk to aristotle.
              <br />
              See if it&apos;s a fit.
            </h2>
            <p className="tactical-copy mx-auto max-w-2xl">
              Ask aristotle anything — how the AI works, what you can earn, how panic mode saves
              you. Real answers, no sales pitch.
            </p>
          </div>

          <div className="tactical-window border-[rgba(167,139,250,0.2)]">
            <div className="tactical-window-bar">
              <AristotleAvatar size={34} speaking={loading} />
              <div>
                <p className="tactical-meta tactical-accent-violet">aristotle</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-text-secondary">
                  {loading ? "processing" : "online · ready to help"}
                </p>
              </div>
              <div className="ml-auto flex gap-1.5">
                {[0, 1, 2].map((dot) => (
                  <div key={dot} className="h-2 w-2 rounded-[2px] bg-border-bright" />
                ))}
              </div>
            </div>

            <div ref={messagesViewportRef} className="h-[26rem] overflow-y-auto">
              <div className="space-y-4 p-5">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="mt-0.5 shrink-0">
                        <AristotleAvatar size={28} speaking={loading && index === messages.length - 1} />
                      </div>
                    )}

                    <div
                      className={`max-w-[78%] border px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "border-white bg-white text-black"
                          : "border-[rgba(167,139,250,0.18)] bg-[rgba(167,139,250,0.08)] text-text-secondary"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-3">
                    <AristotleAvatar size={28} speaking={true} />
                    <div className="border border-[rgba(167,139,250,0.18)] bg-[rgba(167,139,250,0.08)] px-4 py-3">
                      <p className="tactical-meta tactical-accent-violet">processing</p>
                    </div>
                  </div>
                )}

              </div>
            </div>

            <div className="border-t border-border p-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything... e.g. 'How much can I earn tutoring?'"
                  disabled={loading}
                  className="tactical-input flex-1 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="tactical-button tactical-button-accent-violet min-w-[7rem] disabled:border-border disabled:bg-transparent disabled:text-text-muted disabled:hover:bg-transparent disabled:hover:text-text-muted"
                >
                  Send
                  <ArrowUp className="h-4 w-4 stroke-[2px]" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[
              "How is this different from ChatGPT?",
              "How much can I earn tutoring?",
              "What is panic mode?",
              "Does the AI actually work?",
            ].map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => {
                  setInput(question);
                  inputRef.current?.focus();
                }}
                className="tactical-chip tactical-chip-violet transition-colors hover:border-[rgba(167,139,250,0.5)] hover:text-[var(--accent-violet)]"
              >
                {question}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
