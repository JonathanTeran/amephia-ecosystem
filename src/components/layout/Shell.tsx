import React from 'react';
import { CustomCursor } from './CustomCursor';

interface ShellProps {
    children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-background text-white selection:bg-primary/30 font-sans">
            <CustomCursor />
            <div className="noise-overlay" />
            <div className="relative z-10 w-full max-w-[1800px] mx-auto p-8 md:p-12 lg:p-16">
                {children}
            </div>
        </div>
    );
};
