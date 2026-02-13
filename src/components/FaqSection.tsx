import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n';

const FaqItem = ({
  question,
  answer,
  isOpen,
  onClick,
  index
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="border-b border-white/10 last:border-b-0"
  >
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left group"
    >
      <span className="text-lg font-medium text-white group-hover:text-primary transition-colors pr-8">
        {question}
      </span>
      <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary border-primary rotate-180' : 'group-hover:border-primary'}`}>
        <svg
          className={`w-4 h-4 transition-colors ${isOpen ? 'text-background' : 'text-white'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-mutedText leading-relaxed">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export const FaqSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { questionKey: 'faq1Question' as const, answerKey: 'faq1Answer' as const },
    { questionKey: 'faq2Question' as const, answerKey: 'faq2Answer' as const },
    { questionKey: 'faq3Question' as const, answerKey: 'faq3Answer' as const },
    { questionKey: 'faq4Question' as const, answerKey: 'faq4Answer' as const },
    { questionKey: 'faq5Question' as const, answerKey: 'faq5Answer' as const },
    { questionKey: 'faq6Question' as const, answerKey: 'faq6Answer' as const },
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
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary mb-4 tracking-tighter">
            {t('faqTitle')}
          </h2>
          <p className="text-lg text-mutedText max-w-2xl mx-auto">
            {t('faqSubtitle')}
          </p>
        </motion.div>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.questionKey}
              question={t(faq.questionKey)}
              answer={t(faq.answerKey)}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
