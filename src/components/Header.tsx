import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';

import logo from '../assets/images/amelogo_v3_optimized.webp';

const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 font-mono text-xs">
            <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded transition-colors ${language === 'en'
                    ? 'bg-primary/20 text-primary'
                    : 'text-mutedText hover:text-white'
                    }`}
            >
                EN
            </button>
            <span className="text-white/20">|</span>
            <button
                onClick={() => setLanguage('es')}
                className={`px-2 py-1 rounded transition-colors ${language === 'es'
                    ? 'bg-primary/20 text-primary'
                    : 'text-mutedText hover:text-white'
                    }`}
            >
                ES
            </button>
        </div>
    );
};

export const Header: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>('');
    const { t } = useLanguage();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        const interval = setInterval(updateTime, 1000);
        updateTime();
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="flex flex-col items-center justify-center mb-32 relative">
            {/* Language Selector - Absolute Top Right */}
            <div className="absolute top-0 right-0">
                <LanguageSelector />
            </div>

            {/* Main Content: Logo & Title */}
            <div className="flex flex-col items-center text-center z-10 mt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    <img
                        src={logo}
                        alt="AmePhia Logo"
                        width={900}
                        height={312}
                        decoding="async"
                        fetchPriority="high"
                        className="w-40 h-auto object-contain mb-8 opacity-90"
                    />
                    <h1 className="text-7xl md:text-9xl font-bold leading-[0.8] tracking-tighter text-white/90">
                        ECOSYSTEM <br />
                        <span className="text-white/20">AMEPHIA</span>
                    </h1>
                </motion.div>

                <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="h-[1px] w-24 bg-white/20"></div>
                    <span className="font-mono text-xs text-mutedText uppercase tracking-widest">v2.4.0-stable</span>
                </div>

                <div className="mt-8 max-w-2xl mx-auto">
                    <p className="font-mono text-sm text-mutedText/80 uppercase tracking-widest leading-relaxed">
                        {t('tagline')}
                    </p>
                </div>
            </div>

            {/* CLI Visualization (Optional/Centered) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-16 w-full max-w-lg bg-surface/30 border border-white/5 p-6 backdrop-blur-sm relative overflow-hidden group rounded-xl"
            >
                <div className="absolute top-0 right-0 p-2 opacity-50">
                    <div className="w-2 h-2 bg-primary animate-pulse rounded-full"></div>
                </div>
                <div className="font-mono text-[10px] md:text-xs text-primary/70 space-y-1 text-left">
                    <p>{'>'} init_sequence --force</p>
                    <p>{'>'} loading_modules: <span className="text-white">[GYM, FACT, POS, NUTRI]</span></p>
                    <p>{'>'} verifying_integrity... <span className="text-green-500">OK</span></p>
                    <div className="h-[1px] w-full bg-white/5 my-2"></div>
                    <div className="flex justify-between text-mutedText">
                        <span>MEM: 402MB</span>
                        <span>CPU: 12%</span>
                        <span>T: {currentTime}</span>
                    </div>
                </div>
                {/* Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[20%] w-full animate-[scan_4s_linear_infinite] pointer-events-none"></div>
            </motion.div>
        </header>
    );
};
