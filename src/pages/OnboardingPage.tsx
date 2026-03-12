import { useState } from "react";
import { ChevronRight, ArrowRight, UserCircle, GraduationCap, Link as LinkIcon, CheckCircle2, Building, UploadCloud, FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<'student' | 'tutor' | null>(null);
    const [university, setUniversity] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [extractedCourses, setExtractedCourses] = useState<string[]>([]);

    const navigate = useNavigate();

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else {
            if (role === 'tutor') {
                navigate('/tutor/dashboard');
            } else {
                navigate('/dashboard');
            }
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-xl mx-auto z-10">
                {/* Progress Indicators */}
                <div className="flex items-center justify-center gap-2 mb-12">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex flex-col items-center gap-2">
                            <div className={`w-12 h-1 rounded-full transition-colors duration-500 ${s === step ? 'bg-accent-cyan' : s < step ? 'bg-white' : 'bg-white/10'
                                }`}></div>
                        </div>
                    ))}
                </div>

                <div className="glass-panel-raised p-8 md:p-12 relative overflow-hidden transition-all duration-500 min-h-[450px] flex flex-col justify-center">

                    {/* Step 1: Welcome / Role Selection */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-display font-medium mb-2">Initialize Profile</h1>
                                <p className="text-sm text-white/50">Select your primary operating mode within the ecosystem.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setRole('student')}
                                    className={`p-6 rounded-2xl border text-left flex flex-col items-center text-center transition-all ${role === 'student' ? 'bg-accent-cyan/10 border-accent-cyan shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-accent-cyan' : 'bg-surface border-white/5 hover:border-white/20 hover:bg-white/5'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${role === 'student' ? 'bg-accent-cyan/20 text-accent-cyan' : 'bg-white/5 text-white/50'}`}>
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold mb-1">Student Mode</h3>
                                    <p className="text-xs text-white/50">Track academics, find resources, schedule sessions.</p>
                                </button>

                                <button
                                    onClick={() => setRole('tutor')}
                                    className={`p-6 rounded-2xl border text-left flex flex-col items-center text-center transition-all ${role === 'tutor' ? 'bg-accent-violet/10 border-accent-violet shadow-[0_0_20px_rgba(139,92,246,0.15)] ring-1 ring-accent-violet' : 'bg-surface border-white/5 hover:border-white/20 hover:bg-white/5'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${role === 'tutor' ? 'bg-accent-violet/20 text-accent-violet' : 'bg-white/5 text-white/50'}`}>
                                        <UserCircle className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold mb-1">Tutor OS</h3>
                                    <p className="text-xs text-white/50">Manage clients, host classes, expand your business.</p>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Connect Institution */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col justify-center h-full">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-display font-medium mb-2">Connect Institution</h1>
                                <p className="text-sm text-white/50">Linking your university enables automatic schedule parsing.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-white/70 block mb-2">SEARCH REGISTRY</label>
                                    <div className="relative">
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                        <input
                                            type="text"
                                            placeholder="e.g. University of New South Wales"
                                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 pl-12 text-white focus:outline-none focus:border-accent-cyan/50 font-medium"
                                            value={university}
                                            onChange={(e) => setUniversity(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button className="w-full p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                                    <LinkIcon className="w-4 h-4 text-white/50" />
                                    Authenticate via Single Sign-On
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Select/Upload Subjects */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col justify-center">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-display font-medium mb-2">Initialize Curriculum</h1>
                                <p className="text-sm text-white/50">Upload your course syllabus or select manually to build your command center.</p>
                            </div>

                            {extractedCourses.length === 0 ? (
                                <div className="space-y-6">
                                    <button
                                        disabled={isUploading}
                                        onClick={() => {
                                            setIsUploading(true);
                                            setTimeout(() => {
                                                setExtractedCourses(['COMP3121 - Algorithms', 'MATH1141 - Higher Math', 'INFS1602 - Information Systems']);
                                                setIsUploading(false);
                                            }, 2500);
                                        }}
                                        className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all group"
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="w-8 h-8 text-accent-cyan animate-spin" />
                                                <span className="text-sm font-medium text-accent-cyan">Extracting Data via AI...</span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-cyan/20 group-hover:text-accent-cyan transition-colors">
                                                    <UploadCloud className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-medium text-white/50 group-hover:text-white transition-colors">Drop Syllabus PDF / Image here</span>
                                            </>
                                        )}
                                    </button>

                                    <div className="flex items-center gap-4">
                                        <div className="h-[1px] flex-1 bg-white/10"></div>
                                        <span className="microcopy text-white/30">OR</span>
                                        <div className="h-[1px] flex-1 bg-white/10"></div>
                                    </div>

                                    <button className="w-full p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                                        <FileText className="w-4 h-4 text-white/50" />
                                        Select Courses Manually
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
                                    <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4 flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-accent-emerald mt-0.5" />
                                        <div>
                                            <p className="text-sm font-bold text-accent-emerald mb-1">Extraction Complete</p>
                                            <p className="text-xs text-emerald-500/70">Successfully parsed 3 courses, 14 assessments, and 42 lecture topics.</p>
                                        </div>
                                    </div>

                                    <div className="bg-black/50 border border-white/5 rounded-xl p-4 max-h-[250px] overflow-y-auto space-y-2">
                                        {extractedCourses.map((sub, i) => (
                                            <label key={i} className="flex items-center gap-3 p-3 bg-surface border border-white/5 rounded-lg cursor-pointer hover:bg-white/5 transition-colors group">
                                                <div className="w-5 h-5 rounded border border-accent-cyan bg-accent-cyan flex items-center justify-center">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                                                </div>
                                                <span className="text-sm font-medium text-white">{sub}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <button className="text-xs text-white/40 hover:text-white mt-4 mx-auto block transition-colors">
                                        + Add Another Course
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 4: Finalize */}
                    {step === 4 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-accent-cyan/10 flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-8 h-8 text-accent-cyan" />
                            </div>
                            <h1 className="text-3xl font-display font-medium mb-3">System Ready</h1>
                            <p className="text-sm text-white/50 max-w-sm mb-8">
                                Your profile is configured. The intelligence engine is now analyzing your curriculum to optimal pathways.
                            </p>
                            <p className="microcopy text-accent-cyan mb-2">ENGAGING MAIN SEQUENCE...</p>
                        </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="mt-8 flex justify-between items-center pt-6 border-t border-white/5">
                        <button
                            onClick={() => setStep(step - 1)}
                            disabled={step === 1}
                            className={`text-sm font-medium transition-colors ${step === 1 ? 'text-transparent pointer-events-none' : 'text-white/40 hover:text-white'}`}
                        >
                            Back
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={step === 1 && !role}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${(step === 1 && !role)
                                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                }`}
                        >
                            {step === 4 ? 'Enter Workspace' : 'Continue'}
                            {step < 4 ? <ChevronRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
