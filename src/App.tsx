import { useCallback, useEffect, useState } from 'react';
import { ProjectLanding } from './components/ProjectLanding';
import MigrationSaasLanding from './components/MigrationSaasLanding';
import GymLanding from './components/GymLanding';
import BrokerSeguroLanding from './components/BrokerSeguroLanding';
import EcommerceLanding from './components/EcommerceLanding';
import ShieldDataLanding from './components/ShieldDataLanding';
import EducationLanding from './components/EducationLanding';
import { CompanyLanding } from './components/CompanyLanding';
import { isProjectId } from './projects';
import type { ProjectId } from './projects';
import { trackEvent, trackPageView } from './lib/analytics';

const BASE_TITLE = 'AmePhia Systems | Empresa de Desarrollo de Software';
const BASE_DESCRIPTION =
  'AmePhia Systems desarrolla software a medida: plataformas web, apps Android/iOS, ecommerce con pagos online, facturación electrónica, ERP y asesoría tecnológica.';

interface ProjectSEO {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

const PROJECT_META: Record<ProjectId, ProjectSEO> = {
  gym: {
    title: 'Software para Gimnasios Ecuador — ERP con Facturación SRI, POS e Inventario',
    description:
      'AMEPHIA GYM: sistema de gestión para gimnasios y centros fitness en Ecuador. Membresías, facturación electrónica SRI, punto de venta, inventario, contabilidad NIIF y reportes. Desde $29/mes.',
    keywords:
      'software para gimnasios, ERP gimnasio Ecuador, facturación electrónica gimnasio SRI, sistema de gestión gym, membresías gimnasio, POS gimnasio, software fitness Ecuador, contabilidad NIIF gimnasio, control de asistencia gym',
    ogImage: '/assets/screenshots/dashboard.png',
  },
  facturacion: {
    title: 'Facturación Electrónica SRI Ecuador — Sistema Automatizado',
    description:
      'Sistema de facturación electrónica con cumplimiento fiscal SRI, validaciones automáticas, retenciones, notas de crédito y trazabilidad completa de documentos tributarios.',
    keywords: 'facturación electrónica SRI, facturación Ecuador, sistema facturación electrónica, comprobantes electrónicos SRI',
  },
  pos: {
    title: 'Sistema POS para Negocios — Punto de Venta Rápido',
    description:
      'POS rápido para ventas de mostrador con devoluciones, facturación instantánea, soporte para lectores de códigos e impresoras térmicas.',
    keywords: 'sistema POS Ecuador, punto de venta, software caja registradora, POS facturación electrónica',
  },
  nutri: {
    title: 'App de Nutrición y Seguimiento — Planes Alimenticios',
    description:
      'Aplicación para seguimiento nutricional con planes alimenticios, metas personalizadas y monitoreo de progreso para clientes y profesionales de la salud.',
    keywords: 'app nutrición, seguimiento nutricional, planes alimenticios, software nutricionista',
  },
  ecommerce: {
    title: 'Plataforma Ecommerce SaaS Ecuador — Tienda Online con Facturación SRI, Inventario Kardex y Pagos',
    description:
      'AMEPHIA ECOMMERCE: plataforma SaaS multi-tenant para tiendas online. Catálogo, checkout, pasarelas de pago (Nuvei, PayPhone, Kushki), inventario Kardex con WAC, facturación electrónica SRI, devoluciones RMA, programa de lealtad, email marketing y 22+ módulos. Desde $50/mes.',
    keywords:
      'ecommerce Ecuador, tienda virtual SaaS, plataforma ecommerce, pagos online Ecuador, facturación electrónica SRI ecommerce, inventario Kardex, software tienda online, ecommerce multi-tenant, pasarela de pago Ecuador, sistema de ventas online',
    ogImage: '/assets/screenshots/ecommerce-dashboard.png',
  },
  advisory: {
    title: 'Asesoría Tecnológica para Startups y Empresas',
    description:
      'Servicios de asesoría tecnológica: arquitectura de software, roadmap de producto, optimización de procesos y transformación digital.',
    keywords: 'asesoría tecnológica, consultoría software, transformación digital, arquitectura software',
  },
  migration: {
    title: 'Software de Gestión Migratoria — Plataforma SaaS',
    description:
      'Plataforma SaaS multitenancy para facilitadores migratorios: gestión de casos, clientes, documentos, pagos y portal del cliente.',
    keywords: 'software gestión migratoria, plataforma migración, SaaS migración, gestión casos migratorios',
  },
  'broker-seguro': {
    title: 'Software para Corredores de Seguros Ecuador — Broker Seguro | Pólizas, Renovaciones y Comisiones',
    description:
      'Broker Seguro: sistema para brókers y corredores de seguros. Controla pólizas, vencimientos, renovaciones, reclamos, comisiones y cartera de clientes. Desde $49/mes. Demo gratis.',
    keywords:
      'software para broker de seguros, sistema para corredores de seguros, software broker seguros Ecuador, gestión de pólizas, control de renovaciones, comisiones seguros, sistema correduría de seguros, software intermediario de seguros',
    ogImage: '/assets/screenshots/broker/dashboard.png',
  },
  contame: {
    title: 'ContAme — Plataforma Contable en la Nube para Empresas y Contadores Ecuador',
    description:
      'ContAme: software contable NIIF para PYMES y despachos contables. Plan de cuentas, asientos automáticos, nómina, facturación SRI, conciliación bancaria y reportes financieros. Multi-empresa.',
    keywords:
      'software contable Ecuador, contabilidad NIIF PYMES, sistema contable en la nube, plataforma contabilidad empresas, software para contadores Ecuador, contabilidad multi-empresa, nómina Ecuador, facturación electrónica contabilidad',
  },
  shielddata: {
    title: 'SHIELDDATA — Cumplimiento LOPDP Ecuador con IA | Plataforma Enterprise de Protección de Datos',
    description:
      'SHIELDDATA: plataforma enterprise de cumplimiento de la Ley de Protección de Datos del Ecuador. RAT generado con IA, EIPD, derechos ARCO, notificación de brechas a SPDP en <72h, modo inspección con expediente firmado PAdES, firma electrónica ARCOTEL (PAdES-LTV) y Document Intelligence con IA para generar e importar documentos legales. Demo gratis sin tarjeta.',
    keywords:
      'LOPDP Ecuador, cumplimiento protección de datos Ecuador, SPDP, RAT registro de tratamientos, EIPD evaluación de impacto, derechos ARCO, brechas datos personales, DPO Ecuador, software protección de datos, OneTrust Ecuador, software compliance LOPDP, plataforma cumplimiento SPDP, modo inspección SPDP, ciberseguridad ISO 27001 Ecuador, firma electrónica ARCOTEL, firma PAdES Ecuador, generador de documentos LOPDP con IA',
    ogImage: '/assets/screenshots/shielddata-dashboard.png',
  },
  education: {
    title: 'AmePhia EDU — Sistema escolar MinEduc 2025 con LOEI y LMS nativo | SIS Ecuador',
    description:
      'AmePhia EDU: sistema académico todo-en-uno para instituciones educativas en Ecuador. Cumple Tabla 9 MinEduc 2025 (PI + Examen), LOEI completo (refuerzo, supletorio, mejoramiento), DCE psicopedagógico, conciliación bancaria (Pichincha, Guayaquil, Pacífico), aula virtual LMS, portal del padre PWA, libreta con QR de verificación pública. LOPDP por diseño. Desde $99/mes.',
    keywords:
      'sistema escolar Ecuador, software gestión educativa, SIS Ecuador, MinEduc Tabla 9 2025, LOEI, libreta ministerial, aula virtual LMS Ecuador, conciliación bancaria escolar Pichincha Guayaquil, portal padres PWA, DCE psicopedagógico, refuerzo mejoramiento LOEI, software colegio Ecuador, sistema notas Ecuador, ERP escolar, software fiscomisional, registro acumulativo DCE',
    ogImage: '/assets/screenshots/amephia-edu-dashboard.png',
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
    const nextTitle = projectMeta ? projectMeta.title : BASE_TITLE;
    const nextDescription = projectMeta ? projectMeta.description : BASE_DESCRIPTION;
    const nextCanonical = activeProject
      ? `https://amephia.com/proyecto/${activeProject}`
      : 'https://amephia.com/';
    const nextImage = projectMeta?.ogImage
      ? `https://amephia.com${projectMeta.ogImage}`
      : 'https://amephia.com/og-image.jpg';

    // Helper to set meta content
    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    document.title = nextTitle;

    // Primary meta
    setMeta('meta[name="title"]', nextTitle);
    setMeta('meta[name="description"]', nextDescription);
    if (projectMeta?.keywords) {
      setMeta('meta[name="keywords"]', projectMeta.keywords);
    }

    // Canonical
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', nextCanonical);

    // Open Graph
    setMeta('meta[property="og:title"]', nextTitle);
    setMeta('meta[property="og:description"]', nextDescription);
    setMeta('meta[property="og:url"]', nextCanonical);
    setMeta('meta[property="og:image"]', nextImage);

    // Twitter
    setMeta('meta[property="twitter:title"]', nextTitle);
    setMeta('meta[property="twitter:description"]', nextDescription);
    setMeta('meta[property="twitter:url"]', nextCanonical);
    setMeta('meta[property="twitter:image"]', nextImage);

    // Inject/update JSON-LD for product pages
    const existingLd = document.querySelector('script[data-seo="project"]');
    if (activeProject === 'broker-seguro') {
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Broker Seguro',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: projectMeta?.description,
        url: nextCanonical,
        image: nextImage,
        screenshot: 'https://amephia.com/assets/screenshots/broker/dashboard.png',
        offers: [
          { '@type': 'Offer', name: 'Starter', price: '49', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
          { '@type': 'Offer', name: 'Profesional', price: '99', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
          { '@type': 'Offer', name: 'Enterprise', price: '199', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
        ],
        author: { '@type': 'Organization', name: 'AmePhia Systems Inc.', url: 'https://amephia.com' },
        featureList: 'Gestión de clientes, Pólizas y vencimientos, Alertas de renovación, Reclamos, Comisiones, Portal del cliente, Dashboard, Reportes, Formularios dinámicos, Roles y permisos',
      };
      if (existingLd) {
        existingLd.textContent = JSON.stringify(ld);
      } else {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'project');
        script.textContent = JSON.stringify(ld);
        document.head.appendChild(script);
      }
    } else if (activeProject === 'ecommerce') {
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'AMEPHIA ECOMMERCE',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: projectMeta?.description,
        url: nextCanonical,
        image: nextImage,
        offers: [
          { '@type': 'Offer', name: 'Básico', price: '50', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
          { '@type': 'Offer', name: 'Profesional', price: '100', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
          { '@type': 'Offer', name: 'Enterprise', price: '150', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
        ],
        author: { '@type': 'Organization', name: 'AmePhia Systems Inc.', url: 'https://amephia.com' },
        featureList: 'Catálogo de productos, Checkout y pasarelas de pago, Inventario Kardex, Facturación electrónica SRI, Pedidos y envíos, Devoluciones RMA, Cupones y descuentos, Programa de lealtad, Email marketing, Reseñas, Cotizaciones B2B, Dashboard CEO, API REST, Webhooks, Constructor de homepage, Multi-idioma',
      };
      if (existingLd) {
        existingLd.textContent = JSON.stringify(ld);
      } else {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'project');
        script.textContent = JSON.stringify(ld);
        document.head.appendChild(script);
      }
    } else if (activeProject === 'gym') {
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'AMEPHIA GYM',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: projectMeta?.description,
        url: nextCanonical,
        image: nextImage,
        screenshot: 'https://amephia.com/assets/screenshots/dashboard.png',
        offers: [
          { '@type': 'Offer', name: 'Básico', price: '29', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
          { '@type': 'Offer', name: 'Profesional', price: '59', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
          { '@type': 'Offer', name: 'Enterprise', price: '99', priceCurrency: 'USD', billingIncrement: 'P1M', url: nextCanonical },
        ],
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '47', bestRating: '5' },
        author: { '@type': 'Organization', name: 'AmePhia Systems Inc.', url: 'https://amephia.com' },
        featureList: 'Membresías, Facturación electrónica SRI, POS, Inventario, Contabilidad NIIF, Control de asistencia, Reportes, Multi-rol',
      };
      if (existingLd) {
        existingLd.textContent = JSON.stringify(ld);
      } else {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'project');
        script.textContent = JSON.stringify(ld);
        document.head.appendChild(script);
      }
    } else if (activeProject === 'shielddata') {
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SHIELDDATA',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Compliance Management Software',
        operatingSystem: 'Web',
        description: projectMeta?.description,
        url: nextCanonical,
        image: nextImage,
        screenshot: 'https://amephia.com/assets/screenshots/shielddata-dashboard.png',
        offers: {
          '@type': 'Offer',
          name: 'Demo gratis',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://shieldata.amephia.com/login',
        },
        author: { '@type': 'Organization', name: 'AmePhia Systems Inc.', url: 'https://amephia.com' },
        countryOfOrigin: 'EC',
        inLanguage: 'es-EC',
        featureList:
          'Registro de Actividades de Tratamiento (RAT) generado con IA, Evaluación de Impacto a la Protección de Datos (EIPD), Derechos ARCO con portal público, Notificación de brechas a SPDP en menos de 72h, Modo Inspección con expediente firmado PAdES, Postura de Ciberseguridad ISO 27001 / NIST CSF, Designación y gestión del DPO, Consentimientos digitales con evidencia, Transferencias internacionales de datos, Contratos de encargo (DPA), Audit log con hash chain Merkle, Multi-tenant con Row-Level Security, Firma electrónica ARCOTEL en el navegador (PAdES-B/T/LTV con sello de tiempo y verificación pública), Document Intelligence con IA (generación e importación de documentos legales con OCR), Playbooks sectoriales (Salud, Fintech, Retail, Educación, Sector Público), Soporte opcional GDPR y HIPAA',
      };
      if (existingLd) {
        existingLd.textContent = JSON.stringify(ld);
      } else {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'project');
        script.textContent = JSON.stringify(ld);
        document.head.appendChild(script);
      }
    } else if (existingLd) {
      existingLd.remove();
    }

    const currentPath = `${window.location.pathname}${window.location.search}`;
    trackPageView(currentPath, nextTitle);
  }, [activeProject]);

  const openProject = useCallback((projectId: ProjectId) => {
    const nextPath = `/proyecto/${projectId}`;
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', `${nextPath}${window.location.search}`);
    }
    trackEvent('project_open', { project_id: projectId });
    setActiveProject(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeProject = useCallback(() => {
    window.history.pushState(null, '', `/${window.location.search}`);
    setActiveProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (activeProject === 'migration') {
    return <MigrationSaasLanding />;
  }

  if (activeProject === 'gym') {
    return <GymLanding />;
  }

  if (activeProject === 'broker-seguro') {
    return <BrokerSeguroLanding />;
  }

  if (activeProject === 'ecommerce') {
    return <EcommerceLanding />;
  }

  if (activeProject === 'shielddata') {
    return <ShieldDataLanding />;
  }

  if (activeProject === 'education') {
    return <EducationLanding />;
  }

  if (activeProject) {
    return <ProjectLanding projectId={activeProject} onBack={closeProject} />;
  }

  return <CompanyLanding onOpenProject={openProject} />;
}

export default App;
