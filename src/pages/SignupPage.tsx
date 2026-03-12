import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Command, ChevronRight } from "lucide-react";
import { AuthLayout } from "../layouts/AuthLayout";

export default function SignupPage() {
    const [role, setRole] = useState<"student" | "tutor">("student");
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    name: `${firstName} ${lastName}`.trim(),
                    role: role.toUpperCase()
                })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("ingen_token", data.token);
                localStorage.setItem("ingen_user", JSON.stringify(data.user));
                navigate("/onboarding");
            } else {
                alert(data.error || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            alert("Backend access error. Check if the server is running on port 3000.");
        }
    };

    return (
        <AuthLayout
            title="System Initialization"
            subtitle="Create a new profile to access the Ingen Academic OS."
        >
            <div className="glass-panel p-8 w-full border-white/[0.08]">
                <div className="md:hidden flex items-center justify-center gap-2 mb-8">
                    <Command className="w-5 h-5 text-accent-cyan" />
                    <span className="font-display font-medium text-lg tracking-tight">INGEN</span>
                </div>

                {/* Role Toggle */}
                <div className="flex bg-black/50 p-1 rounded-xl mb-8 border border-white/10">
                    <button
                        type="button"
                        onClick={() => setRole("student")}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === "student"
                            ? "bg-white/10 text-white shadow-lg"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        Student
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("tutor")}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === "tutor"
                            ? "bg-white/10 text-white shadow-lg"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        Tutor
                    </button>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="microcopy block mb-2">Given Name</label>
                            <input
                                type="text"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-emerald/50 focus:ring-1 focus:ring-accent-emerald/50 transition-all text-sm"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="microcopy block mb-2">Surname</label>
                            <input
                                type="text"
                                placeholder="Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-emerald/50 focus:ring-1 focus:ring-accent-emerald/50 transition-all text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="microcopy block mb-2">Identity (Email)</label>
                        <input
                            type="email"
                            placeholder="operator@ingen.os"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-emerald/50 focus:ring-1 focus:ring-accent-emerald/50 transition-all font-mono text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="microcopy block mb-2">Secure Passkey</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-emerald/50 focus:ring-1 focus:ring-accent-emerald/50 transition-all font-mono text-sm tracking-widest"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black hover:bg-white/90 font-bold py-3.5 rounded-xl transition-colors mt-6 flex justify-center items-center gap-2 group"
                    >
                        Create Profile
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-white/50">
                    Already have clearance? <Link to="/login" className="text-white hover:text-accent-emerald transition-colors">Log In here.</Link>
                </div>
            </div>
        </AuthLayout>
    );
}
