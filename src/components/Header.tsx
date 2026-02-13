import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';

import logo from '../assets/images/amelogo.png';

const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 font-mono text-xs">
            <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded transition-colors ${
                    language === 'en'
                        ? 'bg-primary/20 text-primary'
                        : 'text-mutedText hover:text-white'
                }`}
            >
                EN
            </button>
            <span className="text-white/20">|</span>
            <button
                onClick={() => setLanguage('es')}
                className={`px-2 py-1 rounded transition-colors ${
                    language === 'es'
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
        <header className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-32 items-start">
            {/* Left: Manifesto */}
            <div className="col-span-1 md:col-span-5 flex flex-col justify-start relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img
                        src={logo}
                        alt="AmePhia Ecosystem"
                        className="w-full max-w-[400px] h-auto object-contain"
                    />
                </motion.div>
                <div className="mt-8 flex items-center space-x-4">
                    <div className="h-[1px] w-12 bg-white/20"></div>
                    <span className="font-mono text-xs text-mutedText uppercase tracking-widest">v2.4.0-stable</span>
                </div>
            </div>

            {/* Right: CLI Interface / Data Flow */}
            <div className="col-span-1 md:col-span-7 flex flex-col items-start md:items-end pt-2">
                <div className="flex items-center justify-between w-full md:justify-end gap-6 mb-4">
                    <LanguageSelector />
                </div>
                <div className="text-left md:text-right mb-8">
                    <p className="font-mono text-sm text-mutedText/80 uppercase tracking-widest leading-relaxed">
                        {t('tagline').split(' ').slice(0, 3).join(' ')} <br /> {t('tagline').split(' ').slice(3).join(' ')}
                    </p>
                </div>

                {/* Abstract CLI Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-lg bg-surface/30 border border-white/5 p-6 backdrop-blur-sm relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-2 opacity-50">
                        <div className="w-2 h-2 bg-primary animate-pulse rounded-full"></div>
                    </div>
                    <div className="font-mono text-[10px] md:text-xs text-primary/70 space-y-1">
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
            </div>
        </header>
    );
};
