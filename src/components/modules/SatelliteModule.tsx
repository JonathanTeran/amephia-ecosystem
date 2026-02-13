import React from 'react';
import { ModuleCard } from './ModuleCard';
import { motion } from 'framer-motion';
import type { ProjectId } from '../../projects';

interface SatelliteModuleProps {
    title: string;
    type: 'pos' | 'nutri';
    delay?: number;
    onOpenProject?: (projectId: ProjectId) => void;
}

export const SatelliteModule: React.FC<SatelliteModuleProps> = ({ title, type, delay = 0, onOpenProject }) => {
    return (
        <ModuleCard
            title={title}
            subtitle={type === 'pos' ? "Sales / Inventory" : "Meal Plans / Macros"}
            className="col-span-1 md:col-span-4 min-h-[250px]"
            delay={delay}
            onClick={() => onOpenProject?.(type)}
        >
            <div className="w-full flex justify-center items-center">
                {type === 'pos' ? (
                    <div className="flex gap-2 items-end h-24">
                        {[40, 75, 30, 95, 50, 65, 45, 80].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: delay + i * 0.1, ease: 'easeOut' }}
                                className="w-2 bg-white/10 hover:bg-primary/80 transition-colors duration-300 rounded-t-sm"
                            ></motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="64" cy="64" r="60" fill="none" stroke="#333" strokeWidth="4" />
                            <motion.circle
                                cx="64" cy="64" r="60"
                                fill="none"
                                stroke="#8fa876"
                                strokeWidth="4"
                                strokeDasharray="377"
                                initial={{ strokeDashoffset: 377 }}
                                animate={{ strokeDashoffset: 377 * 0.2 }} // 80% filled
                                transition={{ duration: 1.5, delay: delay + 0.5, ease: "easeOut" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-3xl font-sans font-bold text-white">80%</span>
                            <span className="text-[10px] text-accentNutri uppercase tracking-wider">Adherence</span>
                        </div>
                    </div>
                )}
            </div>
        </ModuleCard>
    );
};
