import { useCallback, useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
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

const BASE_TITLE = 'AmePhia Systems | Empresa de Desarrollo de Software';
const BASE_DESCRIPTION =
  'AmePhia Systems desarrolla software a medida: plataformas web, apps Android/iOS, ecommerce con pagos online, facturación electrónica, ERP y asesoría tecnológica.';

const PROJECT_META: Record<ProjectId, { title: string; description: string }> = {
  gym: {
    title: 'ERP para Gimnasios',
    description:
      'Plataforma ERP para gimnasios y centros fitness con membresías, cobros, inventario, asistencia y reportes operativos.',
  },
  facturacion: {
    title: 'Facturación Electrónica',
    description:
      'Sistema de facturación electrónica con cumplimiento fiscal, validaciones automáticas y trazabilidad de documentos.',
  },
  pos: {
    title: 'POS y Operación Comercial',
    description:
      'Sistema punto de venta para operaciones comerciales con control de inventario, caja y reportes en tiempo real.',
  },
  nutri: {
    title: 'App de Nutrición y Seguimiento',
    description:
      'Aplicación para seguimiento nutricional con planes, metas y monitoreo de progreso para clientes y profesionales.',
  },
  ecommerce: {
    title: 'Ecommerce con Pagos Online',
    description:
      'Plataforma ecommerce con catálogo, checkout seguro, pasarelas de pago e integración con operaciones comerciales.',
  },
  advisory: {
    title: 'Asesoría Tecnológica',
    description:
      'Servicios de asesoría para startups y empresas: arquitectura, roadmap de producto y optimización de procesos.',
  },
};

const getProjectFromPathname = (pathname: string): ProjectId | null => {
  const normalizedPath = pathname.replace(/\/+$/, '');
  const parts = normalizedPath.split('/').filter(Boolean);

  if (parts.length !== 2) return null;

  const [prefix, projectId] = parts;
  if (prefix !== 'proyecto' && prefix !== 'project') return null;
  if (!isProjectId(projectId)) return null;

  return projectId;
};

const getProjectFromHash = (hash: string): ProjectId | null => {
  const normalizedHash = hash.replace(/^#\/?/, '');
  const [prefix, projectId] = normalizedHash.split('/');

  if (!projectId) return null;
  if (prefix !== 'proyecto' && prefix !== 'project') return null;
  if (!isProjectId(projectId)) return null;

  return projectId;
};

const getProjectFromLocation = (pathname: string, hash: string): ProjectId | null =>
  getProjectFromPathname(pathname) ?? getProjectFromHash(hash);

function App() {
  const [activeProject, setActiveProject] = useState<ProjectId | null>(() =>
    typeof window === 'undefined'
      ? null
      : getProjectFromLocation(window.location.pathname, window.location.hash)
  );

  useEffect(() => {
    const syncProjectFromUrl = () => {
      setActiveProject(getProjectFromLocation(window.location.pathname, window.location.hash));
    };

    const legacyHashProject = getProjectFromHash(window.location.hash);
    if (legacyHashProject) {
      window.history.replaceState(null, '', `/proyecto/${legacyHashProject}${window.location.search}`);
    }

    syncProjectFromUrl();
    window.addEventListener('popstate', syncProjectFromUrl);
    window.addEventListener('hashchange', syncProjectFromUrl);

    return () => {
      window.removeEventListener('popstate', syncProjectFromUrl);
      window.removeEventListener('hashchange', syncProjectFromUrl);
    };
  }, []);

  useEffect(() => {
    const projectMeta = activeProject ? PROJECT_META[activeProject] : null;
    const nextTitle = projectMeta ? `${projectMeta.title} | AmePhia Systems` : BASE_TITLE;
    const nextDescription = projectMeta ? projectMeta.description : BASE_DESCRIPTION;
    const nextCanonical = activeProject
      ? `https://amephia.com/proyecto/${activeProject}`
      : 'https://amephia.com/';

    document.title = nextTitle;

    const titleMeta = document.querySelector('meta[name="title"]');
    if (titleMeta) titleMeta.setAttribute('content', nextTitle);

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) descriptionMeta.setAttribute('content', nextDescription);

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', nextCanonical);
  }, [activeProject]);

  const openProject = useCallback((projectId: ProjectId) => {
    const nextPath = `/proyecto/${projectId}`;
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', `${nextPath}${window.location.search}`);
    }
    setActiveProject(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleProjectLinkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, projectId: ProjectId) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      openProject(projectId);
    },
    [openProject]
  );

  const closeProject = useCallback(() => {
    window.history.pushState(null, '', `/${window.location.search}`);
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

          <section className="mt-12">
            <h2 className="text-sm uppercase tracking-widest text-mutedText/60 mb-3">Páginas de productos</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-mutedText">
              <a
                href="/proyecto/gym"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'gym')}
              >
                ERP para Gimnasios
              </a>
              <a
                href="/proyecto/ecommerce"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'ecommerce')}
              >
                Ecommerce y Pagos Online
              </a>
              <a
                href="/proyecto/facturacion"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'facturacion')}
              >
                Facturación Electrónica
              </a>
              <a
                href="/proyecto/pos"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'pos')}
              >
                Punto de Venta (POS)
              </a>
              <a
                href="/proyecto/nutri"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'nutri')}
              >
                App de Nutrición
              </a>
              <a
                href="/proyecto/advisory"
                className="hover:text-primary transition-colors"
                onClick={(event) => handleProjectLinkClick(event, 'advisory')}
              >
                Servicios de Asesoría
              </a>
            </div>
          </section>
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
