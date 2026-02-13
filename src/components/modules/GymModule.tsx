import { ModuleCard } from './ModuleCard';
import { motion } from 'framer-motion';

export const GymModule = () => {
    return (
        <ModuleCard
            title="GYM"
            subtitle="Access Control / Biometrics"
            className="col-span-1 md:col-span-4 md:row-span-2 bg-[#080808]"
            delay={0.1}
        >
            <div className="relative w-48 h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                {/* Outer Rings */}
                <svg className="absolute inset-0 w-full h-full text-white/5 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                </svg>
                <svg className="absolute inset-0 w-full h-full text-primary/20 animate-[spin_15s_linear_infinite_reverse]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" />
                </svg>

                {/* Core */}
                <div className="relative z-10 w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center bg-surface/50 backdrop-blur-md">
                    <motion.div
                        animate={{ height: ["0%", "100%", "0%"], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-full bg-primary/20 blur-sm"
                    />
                    <div className="w-full h-[1px] bg-primary absolute shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
                    <span className="font-mono text-[10px] text-primary tracking-widest">SCANNING</span>
                </div>
            </div>
        </ModuleCard>
    );
};
