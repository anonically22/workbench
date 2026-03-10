import { Outlet, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Grid, Github, ArrowUpRight, Terminal } from 'lucide-react';
import PegboardAnimation from './PegboardAnimation';

export default function Layout() {
    const location = useLocation();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen text-slate-900 selection:bg-primary/20 flex flex-col">
            <div className="max-w-[1200px] mx-auto px-4 md:px-6 w-full flex-grow flex flex-col pt-8">

                {/* Global Header */}
                <header className="mb-12 border-b-4 border-black pb-8 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="bg-accent w-10 h-10 border-2 border-black flex items-center justify-center text-white brutalist-shadow-sm">
                            <Grid size={20} strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-3xl uppercase tracking-[0.2em] text-black mt-1">WORKBENCH</span>
                    </Link>

                    {/* Code/Design Animation Element */}
                    {location.pathname === '/' && (
                        <div className="hidden sm:block">
                            <PegboardAnimation />
                        </div>
                    )}
                </header>

                <main className="flex-grow">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Brutalist Technical Footer */}
            {/* Brutalist Technical Footer */}
            <footer className="bg-white text-black py-16 mt-20 border-t-8 border-black font-sans">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b-4 border-black pb-16">

                        {/* Brand Column */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-black">
                                <div className="border-2 border-black p-1 bg-accent/10 flex items-center justify-center">
                                    <Grid size={24} strokeWidth={2.5} className="text-accent" />
                                </div>
                                <span className="font-bold text-2xl uppercase tracking-[0.3em]">WORKBENCH</span>
                            </div>
                            <p className="text-sm font-bold leading-relaxed uppercase opacity-80 max-w-[250px] tracking-widest">
                                Synthesizing code and aesthetics to build digital products that feel as good as they work.
                            </p>
                        </div>

                        {/* Developer Auth */}
                        <div className="space-y-6">
                            <h4 className="text-base font-bold uppercase tracking-[0.3em]">DEVELOPER AUTH</h4>
                            <div className="flex flex-col gap-4 text-sm font-bold tracking-[0.2em] uppercase">
                                <a href="https://github.com/anonically22/workbench" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                                    <Github size={18} strokeWidth={2.5} className="opacity-70" />
                                    GITHUB REPO
                                </a>
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="space-y-6">
                            <h4 className="text-base font-bold uppercase tracking-[0.3em]">TOOL STATUS</h4>
                            <div className="bg-white border-2 border-black p-4 flex items-center gap-3 brutalist-shadow-sm">
                                <span className="w-3 h-3 rounded-none bg-blue-500 animate-pulse border-2 border-black"></span>
                                <span className="text-sm font-bold tracking-[0.2em] uppercase text-black">ALL TOOLS WORKING</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-bold uppercase tracking-[0.2em]">
                        <div>
                            © 2026 CRAFTED WITH <span className="text-red-500 mx-1">♥</span> BY ANONICAL22
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full md:w-auto">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-black rounded-none"></span>
                                BUILD VERSION v0.5
                            </span>
                            <span className="w-px h-4 bg-black/20"></span>
                            <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-accent transition-colors">
                                TOP
                                <ArrowUpRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
