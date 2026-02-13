import { useCallback, useEffect, useState } from 'react';
import { Shell } from './components/layout/Shell';
import { Header } from './components/Header';
import { BentoGrid } from './components/layout/BentoGrid';
import { GymModule } from './components/modules/GymModule';
import { FacturacionModule } from './components/modules/FacturacionModule';
import { SatelliteModule } from './components/modules/SatelliteModule';
import { ProjectLanding } from './components/ProjectLanding';

import { InfoSection } from './components/InfoSection';
import { GymErpSection } from './components/GymErpSection';
import { ProductsSection } from './components/ProductsSection';
import { StatsSection } from './components/StatsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { isProjectId } from './projects';
import type { ProjectId } from './projects';

const getProjectFromHash = (hash: string): ProjectId | null => {
  const normalizedHash = hash.replace(/^#\/?/, '');
  const [prefix, projectId] = normalizedHash.split('/');

  if (!projectId) return null;
  if (prefix !== 'proyecto' && prefix !== 'project') return null;
  if (!isProjectId(projectId)) return null;

  return projectId;
};

function App() {
  const [activeProject, setActiveProject] = useState<ProjectId | null>(() =>
    typeof window === 'undefined' ? null : getProjectFromHash(window.location.hash)
  );

  useEffect(() => {
    const handleHashChange = () => {
      setActiveProject(getProjectFromHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openProject = useCallback((projectId: ProjectId) => {
    const nextHash = `#/proyecto/${projectId}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    setActiveProject(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeProject = useCallback(() => {
    const cleanUrl = `${window.location.pathname}${window.location.search}`;
    window.history.pushState(null, '', cleanUrl);
    setActiveProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Shell>
      {activeProject ? (
        <ProjectLanding projectId={activeProject} onBack={closeProject} />
      ) : (
        <>
          <Header />
          <BentoGrid>
            <GymModule onOpenProject={openProject} />
            <FacturacionModule onOpenProject={openProject} />
            <SatelliteModule title="POS" type="pos" delay={0.3} onOpenProject={openProject} />
            <SatelliteModule title="NUTRI" type="nutri" delay={0.4} onOpenProject={openProject} />
          </BentoGrid>

          <InfoSection />

          <ProductsSection onOpenProject={openProject} />

          <StatsSection />

          <GymErpSection />

          <FaqSection />

          <ContactSection />
        </>
      )}

      {/* Footer / Copyright */}
      <footer className="mt-24 border-t border-white/5 pt-8 flex justify-between items-center text-[10px] text-mutedText/40 font-mono tracking-widest uppercase">
        <span>AmePhia Systems Inc.</span>
        <span>© 2026</span>
      </footer>
    </Shell>
  );
}

export default App;
