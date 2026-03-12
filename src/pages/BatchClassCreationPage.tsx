import { ChevronRight, Video, Calendar, Brain } from "lucide-react";

export default function BatchClassCreationPage() {
    return (
        <div className="w-full h-full max-w-5xl mx-auto animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="mb-10 text-center px-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent-violet"></span>
                    <span className="microcopy text-accent-violet tracking-[0.2em]">BATCH CREATOR</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4">Launch a new class</h1>
                <p className="text-white/50 text-sm max-w-lg mx-auto">Design, price, and schedule an intensive review session. We handle the payments, calendar invites, and staging.</p>
            </div>

            {/* Progress Bar */}
            <div className="flex justify-between items-center mb-10 pl-6 rounded-full bg-surface border border-white/5 pr-2 py-2 max-w-2xl mx-auto relative hidden md:flex">
                <div className="flex items-center gap-2 text-accent-violet font-medium text-sm">
                    <span className="w-5 h-5 rounded-full bg-accent-violet text-white text-xs flex items-center justify-center">1</span>
                    Class Details
                </div>
                <div className="h-px w-10 bg-white/10"></div>
                <div className="flex items-center gap-2 text-white/50 font-medium text-sm">
                    <span className="w-5 h-5 rounded-full border border-white/20 text-xs flex items-center justify-center">2</span>
                    Syllabus AI
                </div>
                <div className="h-px w-10 bg-white/10"></div>
                <div className="flex items-center gap-2 text-white/50 font-medium text-sm">
                    <span className="w-5 h-5 rounded-full border border-white/20 text-xs flex items-center justify-center">3</span>
                    Pricing & Launch
                </div>
                <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-xs font-bold transition-colors">Save Draft</button>
            </div>

            {/* Step 1: Form */}
            <div className="glass-panel p-6 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-violet/5 blur-[100px] pointer-events-none rounded-full"></div>

                <div className="relative z-10 space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-sm font-bold block mb-2">Target Course</label>
                            <p className="text-xs text-white/40 mb-3">Which specific university course does this target?</p>
                            <input type="text" placeholder="e.g. COMP3121" className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-violet/50 font-medium" defaultValue="COMP3121" />
                        </div>
                        <div>
                            <label className="text-sm font-bold block mb-2">Class Title</label>
                            <p className="text-xs text-white/40 mb-3">Make it action-oriented and clear.</p>
                            <input type="text" placeholder="e.g. Dynamic Programming Masterclass" className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-violet/50 font-medium" />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold block mb-2">Class Description</label>
                        <p className="text-xs text-white/40 mb-3">What will students walk away capable of doing?</p>
                        <textarea rows={4} placeholder="Describe the intensive session..." className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-violet/50 font-medium resize-none"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
                        <div>
                            <label className="text-sm font-bold block mb-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-white/50" />
                                Date & Time
                            </label>
                            <div className="flex gap-4">
                                <input type="date" className="flex-1 bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-violet/50 font-medium" />
                                <input type="time" className="w-32 bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-violet/50 font-medium" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold block mb-2 flex items-center gap-2">
                                <Video className="w-4 h-4 text-white/50" />
                                Duration
                            </label>
                            <select className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-violet/50 font-medium appearance-none">
                                <option>1.0 Hour</option>
                                <option>1.5 Hours</option>
                                <option>2.0 Hours (Intensive)</option>
                                <option>3.0 Hours (Bootcamp)</option>
                            </select>
                        </div>
                    </div>

                    {/* AI Syllabus Generator Teaser */}
                    <div className="p-6 rounded-2xl bg-[#050505] border border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between mt-8 group cursor-pointer hover:border-accent-violet/30 transition-colors">
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-xl bg-accent-violet/10 flex items-center justify-center shrink-0">
                                <Brain className="w-5 h-5 text-accent-violet" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Generate AI Syllabus</h4>
                                <p className="text-sm text-white/50 max-w-sm">We can generate a high-density, minute-by-minute structure based on your course and duration.</p>
                            </div>
                        </div>
                        <button className="bg-surface border border-white/5 group-hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0">
                            Configure Next
                        </button>
                    </div>

                    <div className="flex justify-end pt-8">
                        <button className="bg-white text-black hover:bg-white/90 font-bold px-8 py-3.5 rounded-xl transition-colors flex items-center gap-2">
                            Continue to Pricing
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
