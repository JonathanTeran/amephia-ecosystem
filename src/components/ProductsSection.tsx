import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';
import type { ProjectId } from '../projects';

const OfferCard = ({
  icon,
  title,
  description,
  delay,
  onClick
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  onClick: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    onClick={onClick}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    }}
    role="button"
    tabIndex={0}
    className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
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

const GymErpIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16M7 4v16m10-16v16" />
  </svg>
);

const AdvisoryIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h3m6 4H6a2 2 0 01-2-2V6a2 2 0 012-2h8.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V18a2 2 0 01-2 2z" />
  </svg>
);

interface ProductsSectionProps {
  onOpenProject?: (projectId: ProjectId) => void;
}

export const ProductsSection = ({ onOpenProject }: ProductsSectionProps) => {
  const { t } = useLanguage();
  const packageUrl = 'https://packagist.org/packages/amephia/sri-ec';

  const offers = [
    { projectId: 'gym' as const, titleKey: 'gymProductTitle' as const, descKey: 'gymProductDesc' as const, icon: <GymErpIcon /> },
    { projectId: 'ecommerce' as const, titleKey: 'ecommerceTitle' as const, descKey: 'ecommerceDesc' as const, icon: <EcommerceIcon /> },
    { projectId: 'advisory' as const, titleKey: 'advisoryTitle' as const, descKey: 'advisoryDesc' as const, icon: <AdvisoryIcon /> },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <OfferCard
            key={offer.titleKey}
            icon={offer.icon}
            title={t(offer.titleKey)}
            description={t(offer.descKey)}
            delay={index * 0.1}
            onClick={() => onOpenProject?.(offer.projectId)}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-10 bg-gradient-to-r from-primary/10 via-white/5 to-primary/10 border border-primary/20 rounded-2xl p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="inline-block text-xs font-mono uppercase tracking-wider text-primary mb-3">
              {t('packageBadge')}
            </span>
            <h3 className="text-2xl font-semibold text-white mb-2">{t('packageTitle')}</h3>
            <p className="text-mutedText max-w-2xl">{t('packageDesc')}</p>
          </div>
          <a
            href={packageUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            {t('packageCta')}
          </a>
        </div>
      </motion.div>
    </section>
  );
};
