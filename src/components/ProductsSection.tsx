import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';

const OfferCard = ({
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

const EcommerceIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2m0 0L7 13h10l2-8H5.4zM7 13l-1 5h13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

const AdvisoryIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h3m6 4H6a2 2 0 01-2-2V6a2 2 0 012-2h8.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V18a2 2 0 01-2 2z" />
  </svg>
);

export const ProductsSection = () => {
  const { t } = useLanguage();

  const offers = [
    { titleKey: 'ecommerceTitle' as const, descKey: 'ecommerceDesc' as const, icon: <EcommerceIcon /> },
    { titleKey: 'advisoryTitle' as const, descKey: 'advisoryDesc' as const, icon: <AdvisoryIcon /> },
  ];

  return (
    <section className="py-24">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-mono text-primary uppercase tracking-wider mb-4">
            {t('productsBadge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary mb-4 tracking-tighter">
            {t('productsTitle')}
          </h2>
          <p className="text-lg text-mutedText max-w-3xl mx-auto">
            {t('productsSubtitle')}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer, index) => (
          <OfferCard
            key={offer.titleKey}
            icon={offer.icon}
            title={t(offer.titleKey)}
            description={t(offer.descKey)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};
