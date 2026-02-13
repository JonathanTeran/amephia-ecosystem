import { useEffect, useState } from 'react';
import { ModuleCard } from './ModuleCard';
import type { ProjectId } from '../../projects';

interface FacturacionModuleProps {
    onOpenProject?: (projectId: ProjectId) => void;
}

export const FacturacionModule = ({ onOpenProject }: FacturacionModuleProps) => {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        const generateLine = () => {
            const id = Math.floor(Math.random() * 9000) + 1000;
            const amount = (Math.random() * 1000).toFixed(2);
            return `<invoice id="${id}" status="signed" amount="${amount}" />`;
        };

        // Initial fill
        setLines(Array.from({ length: 15 }, generateLine));

        const interval = setInterval(() => {
            setLines(prev => [generateLine(), ...prev.slice(0, 14)]);
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <ModuleCard
            title="FACTURACIÓN"
            subtitle="SRI / Automated Compliance"
            className="col-span-1 md:col-span-8 overflow-hidden"
            delay={0.2}
            onClick={() => onOpenProject?.('facturacion')}
        >
            <div className="w-full h-full flex items-center relative">
                <div className="font-mono text-xs text-mutedText/30 space-y-2 w-full">
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            className="transition-all duration-500"
                            style={{ opacity: 1 - i * 0.08 }}
                        >
                            <span className="text-primary/40 mr-2">{i + 1}</span>
                            {line}
                        </div>
                    ))}
                </div>

                {/* Overlay Gradient for Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none"></div>

                {/* Decorative status on right */}
                <div className="absolute top-0 right-0 h-full w-32 border-l border-white/5 p-4 flex flex-col justify-between text-[10px] font-mono text-mutedText/50">
                    <div>
                        <p>QUEUE: 0</p>
                        <p>LATENCY: 12ms</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse self-end mb-8"></div>
                </div>
            </div>
        </ModuleCard>
    );
};
