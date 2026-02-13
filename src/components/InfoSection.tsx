import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';

const technologies = {
  Frontend: ['React', 'Next.js', 'Angular', 'Astro', 'TypeScript', 'Tailwind CSS', 'Vite'],
  Backend: ['Laravel', 'Node.js', 'Express', 'NestJS', 'Python', 'N8N', 'REST APIs'],
  Mobile: ['Flutter', 'React Native', 'Android (Kotlin)', 'iOS (Swift)'],
  Database: ['MySQL', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Redis'],
  Cloud: ['Docker', 'GitHub Actions', 'Linux', 'Nginx', 'AWS', 'Google Cloud', 'DigitalOcean', 'Hostinger'],
  AI: ['OpenAI', 'Claude', 'Gemini', 'LangChain', 'RAG Systems'],
};

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-white mb-8 tracking-tighter">
    {children}
  </h2>
);

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"
  >
    <h3 className="text-xl font-semibold mb-4 text-primary">{title}</h3>
    <div className="text-mutedText leading-relaxed">
      {children}
    </div>
  </motion.div>
);

export const InfoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 space-y-32">
        {/* Who We Are */}
      <div className="max-w-4xl mx-auto text-center">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
         >
            <SectionHeader>{t('whoWeAre')}</SectionHeader>
            <p className="text-xl text-mutedText leading-relaxed">
                {t('whoWeAreDesc')}
            </p>
         </motion.div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card title={t('mission')}>
          {t('missionDesc')}
        </Card>
        <Card title={t('vision')}>
          {t('visionDesc')}
        </Card>
      </div>

      {/* Technologies */}
      <div className="space-y-12">
        <div className="text-center">
            <SectionHeader>{t('technologies')}</SectionHeader>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(technologies).map(([category, techs], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <h4 className="text-lg font-medium mb-4 text-white/90">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/5 rounded-full text-sm text-mutedText border border-white/5 hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
