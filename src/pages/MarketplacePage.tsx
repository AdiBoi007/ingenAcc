import { ShoppingCart, Star, Search, Filter, BookOpen } from "lucide-react";

export default function MarketplacePage() {
    return (
        <div className="w-full h-full max-w-7xl mx-auto animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 px-2">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
                        <span className="microcopy text-accent-emerald tracking-[0.2em]">KNOWLEDGE ECONOMY</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tight">Marketplace</h1>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white text-black hover:bg-white/90 px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-lg shadow-white/10">
                        <ShoppingCart className="w-4 h-4" />
                        Cart (0)
                    </button>
                </div>
            </div>

            {/* Featured Hero Resource */}
            <div className="glass-panel-raised p-2 mb-10 overflow-hidden group">
                <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5 flex flex-col md:flex-row">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-indigo/10 blur-[100px] pointer-events-none rounded-full"></div>

                    <div className="p-8 md:p-12 flex-1 flex flex-col justify-center relative z-10 w-full md:w-1/2">
                        <span className="px-2 py-1 bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo rounded-md text-[10px] font-mono tracking-widest w-fit mb-4">EXAM SEASON SECRETS #1</span>
                        <h2 className="text-3xl font-display font-medium mb-4 leading-tight">Elite Machine Learning <br /> Survival Pack (COMP3411)</h2>
                        <p className="text-white/50 text-sm mb-8 max-w-md">The definitive guide that helped 240+ students secure an HD last semester. Includes 40 page deeply annotated notes, and 2 mock finals.</p>

                        <div className="flex items-center gap-4">
                            <button className="bg-accent-indigo hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                Acquire for $24
                            </button>
                            <span className="flex items-center gap-1 text-xs font-bold text-accent-amber">
                                <Star className="w-3 h-3 fill-accent-amber text-accent-amber" />
                                5.0 <span className="text-white/40 font-normal font-mono">(94 verified)</span>
                            </span>
                        </div>
                    </div>

                    <div className="hidden md:block w-1/2 relative bg-[url('https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center border-l border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] to-transparent"></div>
                    </div>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for notes, cheatsheets, past papers..."
                        className="w-full bg-surface border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all font-medium"
                    />
                </div>
                <div className="flex gap-4">
                    <select className="bg-surface border border-white/5 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-white/20 appearance-none font-medium text-sm min-w-[160px]">
                        <option>All Types</option>
                        <option>Notes</option>
                        <option>Cheatsheets</option>
                        <option>Mock Exams</option>
                    </select>
                    <button className="bg-surface border border-white/5 hover:bg-white/10 rounded-xl px-4 py-4 flex items-center justify-center transition-colors">
                        <Filter className="w-5 h-5 text-white/50" />
                    </button>
                </div>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "COMP3121 Ultimate Cheatsheet", author: "Kevin Z.", price: "$12", type: "Cheatsheet", rating: "4.9", sales: "142" },
                    { title: "MATH1141 Full Term Notes", author: "Sarah M.", price: "$28", type: "Notes", rating: "5.0", sales: "89" },
                    { title: "ECON1101 Past Paper Analysis", author: "David T.", price: "$15", type: "Exam Prep", rating: "4.8", sales: "210" },
                    { title: "PHYS1121 Lab Manual Guide", author: "Emma S.", price: "$9", type: "Guide", rating: "4.7", sales: "56" },
                ].map((item, i) => (
                    <div key={i} className="glass-panel group hover:border-white/20 transition-all cursor-pointer flex flex-col h-full overflow-hidden">
                        <div className="aspect-[4/3] bg-surface relative border-b border-white/5 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:scale-105 transition-transform duration-500">
                                <BookOpen className="w-8 h-8 text-white/20" />
                            </div>
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] font-mono tracking-widest text-white/80">
                                {item.type}
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="font-bold text-sm mb-1 leading-snug group-hover:text-accent-emerald transition-colors line-clamp-2">{item.title}</h3>
                            <p className="text-xs text-white/40 mb-4">{item.author}</p>

                            <div className="mt-auto flex justify-between items-end">
                                <div className="space-y-1">
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-accent-amber">
                                        <Star className="w-3 h-3 fill-accent-amber text-accent-amber" />
                                        {item.rating} <span className="text-white/40 font-normal font-mono">({item.sales})</span>
                                    </span>
                                </div>
                                <span className="font-mono text-lg font-bold">{item.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <button className="bg-surface border border-white/5 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-xl transition-colors inline-flex items-center gap-2 text-sm">
                    Load More Resources
                </button>
            </div>
        </div>
    );
}
