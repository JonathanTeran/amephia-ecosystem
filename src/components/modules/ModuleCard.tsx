import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface ModuleCardProps {
    className?: string; // For grid span
    title: string;
    subtitle?: string; // Tagline or secondary info
    children?: React.ReactNode;
    delay?: number;
    onClick?: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ className, title, subtitle, children, delay = 0, onClick }) => {
    const isInteractive = typeof onClick === 'function';

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isInteractive || !onClick) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            aria-label={isInteractive ? `Open ${title} project` : undefined}
            className={twMerge(
                "group relative bg-surface border border-white/5 hover:border-white/20 transition-colors duration-500 overflow-hidden flex flex-col justify-between p-8 min-h-[300px]",
                isInteractive && "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40",
                className
            )}
        >
            {/* Background Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-sans font-medium tracking-tight text-white mb-1 group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="font-mono text-xs text-mutedText uppercase tracking-wider">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-primary transition-colors duration-300"></div>
            </div>

            {/* Content Visualization (Middle) */}
            <div className="relative z-10 flex-grow py-8 flex items-center justify-center text-white/10 group-hover:text-white/20 transition-colors duration-500">
                {children}
            </div>

            {/* Footer / Status */}
            <div className="relative z-10 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-mutedText uppercase">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 text-primary">Active</span>
                <span className="tracking-widest">ID: {Math.floor(Math.random() * 9000) + 1000}</span>
            </div>
        </motion.div>
    );
};
