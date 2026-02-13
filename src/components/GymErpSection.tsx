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
    transition={{ delay, duration: 0.5 }}
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

const AccountingIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const InventoryIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const MemberIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ScheduleIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const GymErpSection = () => {
  const { t } = useLanguage();

  const mainFeatures = [
    { icon: <PosIcon />, titleKey: 'posTitle' as const, descKey: 'posDesc' as const },
    { icon: <InvoiceIcon />, titleKey: 'invoicingTitle' as const, descKey: 'invoicingDesc' as const },
    { icon: <AccountingIcon />, titleKey: 'accountingTitle' as const, descKey: 'accountingDesc' as const },
    { icon: <InventoryIcon />, titleKey: 'inventoryTitle' as const, descKey: 'inventoryDesc' as const },
  ];

  const additionalFeatures = [
    { icon: <MemberIcon />, titleKey: 'memberManagement' as const, descKey: 'memberManagementDesc' as const },
    { icon: <ScheduleIcon />, titleKey: 'scheduling' as const, descKey: 'schedulingDesc' as const },
    { icon: <AnalyticsIcon />, titleKey: 'analytics' as const, descKey: 'analyticsDesc' as const },
  ];

  return (
    <section className="py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-mono text-primary uppercase tracking-wider mb-4">
            {t('productSpotlight')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary mb-4 tracking-tighter">
            {t('erpTitle')}
          </h2>
          <p className="text-lg text-mutedText max-w-2xl mx-auto">
            {t('erpSubtitle')}
          </p>
        </motion.div>
      </div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <p className="text-mutedText leading-relaxed text-lg">
          {t('erpDesc')}
        </p>
      </motion.div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {mainFeatures.map((feature, index) => (
          <FeatureCard
            key={feature.titleKey}
            icon={feature.icon}
            title={t(feature.titleKey)}
            description={t(feature.descKey)}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {additionalFeatures.map((feature, index) => (
          <FeatureCard
            key={feature.titleKey}
            icon={feature.icon}
            title={t(feature.titleKey)}
            description={t(feature.descKey)}
            delay={0.4 + index * 0.1}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button className="px-8 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors">
          {t('requestDemo')}
        </button>
        <button className="px-8 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors">
          {t('learnMore')}
        </button>
      </motion.div>
    </section>
  );
};
