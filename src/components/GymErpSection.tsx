import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';

const FeatureCard = ({
  icon,
  title,
  description,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.45 }}
    className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
  >
    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      {icon}
    </div>
    <h4 className="text-lg font-semibold mb-2 text-white">{title}</h4>
    <p className="text-sm text-mutedText leading-relaxed">{description}</p>
  </motion.div>
);

const PosIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const InvoiceIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const InventoryIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const GymErpSection = () => {
  const { t } = useLanguage();

  const gymFeatures = [
    { icon: <PosIcon />, titleKey: 'posTitle' as const, descKey: 'posDesc' as const },
    { icon: <InvoiceIcon />, titleKey: 'invoicingTitle' as const, descKey: 'invoicingDesc' as const },
    { icon: <InventoryIcon />, titleKey: 'inventoryTitle' as const, descKey: 'inventoryDesc' as const },
    { icon: <AnalyticsIcon />, titleKey: 'analytics' as const, descKey: 'analyticsDesc' as const },
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-mono text-primary uppercase tracking-wider mb-4">
            {t('productSpotlight')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary mb-4 tracking-tighter">
            {t('erpTitle')}
          </h2>
          <p className="text-base md:text-lg text-mutedText max-w-3xl mx-auto">
            {t('erpSubtitle')}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mb-10"
      >
        <p className="text-mutedText leading-relaxed">{t('erpDesc')}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gymFeatures.map((feature, index) => (
          <FeatureCard
            key={feature.titleKey}
            icon={feature.icon}
            title={t(feature.titleKey)}
            description={t(feature.descKey)}
            delay={index * 0.08}
          />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-mutedText/90">{t('erpScopeNote')}</p>
    </section>
  );
};
