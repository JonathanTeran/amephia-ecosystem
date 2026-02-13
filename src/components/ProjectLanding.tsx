import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';
import type { ProjectId } from '../projects';
import { trackContactClick, trackEvent, trackLeadGenerated } from '../lib/analytics';

interface ProjectLandingProps {
  projectId: ProjectId;
  onBack: () => void;
}

interface ProjectCopy {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlightsTitle: string;
  highlights: string[];
  deliverablesTitle: string;
  deliverables: string[];
}

const PROJECT_COPY: Record<Language, Record<ProjectId, ProjectCopy>> = {
  en: {
    gym: {
      badge: 'Project Landing',
      title: 'Gym ERP Platform',
      subtitle: 'Management software for gyms and fitness centers',
      description: 'A full operational platform to centralize memberships, billing, invoicing, attendance, inventory, and business analytics.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Member and attendance management',
        'Point of sale and billing control',
        'Electronic invoicing workflows',
        'Dashboards and KPI reporting',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'Web admin panel',
        'Operational modules by role',
        'Automation for recurring tasks',
      ],
    },
    facturacion: {
      badge: 'Project Landing',
      title: 'Electronic Invoicing System',
      subtitle: 'Automated fiscal compliance and digital documents',
      description: 'A robust invoicing service that handles document generation, validations, statuses, and integration with accounting flows.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Automated invoice generation',
        'Compliance validation flows',
        'Delivery status and traceability',
        'API-ready integration layer',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'Invoicing engine',
        'Operations dashboard',
        'Audit and history records',
      ],
    },
    pos: {
      badge: 'Project Landing',
      title: 'POS & Store Operations',
      subtitle: 'Fast counter sales with inventory and cashier control',
      description: 'A fast and intuitive POS interface for in-store sales. Connect barcode scanners and thermal printers, process returns, and turn your device into a powerful cash register.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Fast sales and return workflows',
        'Barcode scanner and thermal printer support',
        'Instant invoicing at checkout',
        'Multi-device and multi-user operation',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'Counter-ready POS interface',
        'Peripheral setup for scanner and thermal printer',
        'Sales, cashier, and inventory dashboard',
      ],
    },
    nutri: {
      badge: 'Project Landing',
      title: 'Nutrition Tracking App',
      subtitle: 'Plans, adherence, and progress monitoring',
      description: 'A nutrition-focused product to manage meal plans, macro objectives, and adherence tracking with clear progress indicators.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Meal plan management',
        'Progress and adherence tracking',
        'Client profile and goal history',
        'Notifications and reminders',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'Web/mobile experience',
        'Plan and metrics modules',
        'Operational follow-up tools',
      ],
    },
    ecommerce: {
      badge: 'Project Landing',
      title: 'Ecommerce & Online Payments',
      subtitle: 'Digital sales platform for products and services',
      description: 'An independent ecommerce solution with secure checkout, payment gateways, order tracking, and conversion-oriented experience.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Catalog and product management',
        'Checkout and payment integrations',
        'Order status and fulfillment flow',
        'Sales and conversion analytics',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'Ecommerce storefront',
        'Backoffice operations panel',
        'Payment integration setup',
      ],
    },
    advisory: {
      badge: 'Project Landing',
      title: 'Advisory Services',
      subtitle: 'Strategy, architecture, and implementation roadmap',
      description: 'Consulting services for startups and established companies to define technical direction, optimize processes, and execute with confidence.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Technology and architecture advisory',
        'Product planning and prioritization',
        'Process optimization initiatives',
        'Execution and scaling guidance',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'Technical assessment report',
        'Roadmap and implementation plan',
        'Follow-up sessions with leadership',
      ],
    },
  },
  es: {
    gym: {
      badge: 'Landing del Proyecto',
      title: 'Plataforma ERP para Gimnasios',
      subtitle: 'Software de gestión para gimnasios y centros fitness',
      description: 'Una plataforma integral para centralizar membresías, cobros, facturación, asistencia, inventarios y analítica del negocio.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Gestión de miembros y asistencia',
        'Punto de venta y control de cobros',
        'Flujos de facturación electrónica',
        'Dashboards y reportes KPI',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Panel administrativo web',
        'Módulos operativos por rol',
        'Automatización de tareas recurrentes',
      ],
    },
    facturacion: {
      badge: 'Landing del Proyecto',
      title: 'Sistema de Facturación Electrónica',
      subtitle: 'Cumplimiento fiscal automatizado y documentos digitales',
      description: 'Un servicio robusto de facturación que gestiona generación de comprobantes, validaciones, estados e integración con flujos contables.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Generación automática de facturas',
        'Flujos de validación de cumplimiento',
        'Trazabilidad y estado de entrega',
        'Capa de integración vía API',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Motor de facturación',
        'Dashboard operativo',
        'Historial y auditoría de documentos',
      ],
    },
    pos: {
      badge: 'Landing del Proyecto',
      title: 'POS y Operación de Tienda',
      subtitle: 'Ventas de mostrador rápidas con control de caja e inventario',
      description: 'Interfaz de venta rápida e intuitiva para operaciones en mostrador. Conecta lectores de código de barras e impresoras térmicas, procesa devoluciones y convierte tu dispositivo en una caja registradora potente.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Flujos rápidos de venta y devoluciones',
        'Compatibilidad con lector de códigos e impresora térmica',
        'Facturación instantánea en caja',
        'Operación multi-dispositivo y multiusuario',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Interfaz POS optimizada para mostrador',
        'Configuración de periféricos (scanner e impresora térmica)',
        'Dashboard de ventas, caja e inventario',
      ],
    },
    nutri: {
      badge: 'Landing del Proyecto',
      title: 'App de Seguimiento Nutricional',
      subtitle: 'Planes, adherencia y monitoreo de progreso',
      description: 'Un producto enfocado en nutrición para gestionar planes alimenticios, objetivos de macros y seguimiento de adherencia con indicadores claros.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Gestión de planes nutricionales',
        'Seguimiento de progreso y adherencia',
        'Perfiles y objetivos por cliente',
        'Notificaciones y recordatorios',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Experiencia web/móvil',
        'Módulos de planes y métricas',
        'Herramientas de seguimiento operativo',
      ],
    },
    ecommerce: {
      badge: 'Landing del Proyecto',
      title: 'Ecommerce y Pagos Online',
      subtitle: 'Plataforma de ventas digitales para productos y servicios',
      description: 'Una solución independiente de ecommerce con checkout seguro, pasarelas de pago, trazabilidad de pedidos y enfoque en conversión.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Gestión de catálogo y productos',
        'Checkout e integración de pagos',
        'Estado de pedidos y cumplimiento',
        'Analítica de ventas y conversión',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Storefront ecommerce',
        'Panel de operación backoffice',
        'Configuración de pasarelas de pago',
      ],
    },
    advisory: {
      badge: 'Landing del Proyecto',
      title: 'Servicios de Asesoría',
      subtitle: 'Estrategia, arquitectura y hoja de ruta de implementación',
      description: 'Asesoría para startups y empresas consolidadas que necesitan dirección técnica, optimización de procesos y ejecución con foco en resultados.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Asesoría tecnológica y de arquitectura',
        'Planeación y priorización de producto',
        'Iniciativas de optimización de procesos',
        'Acompañamiento para ejecución y escala',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Diagnóstico técnico',
        'Roadmap y plan de implementación',
        'Sesiones de seguimiento con liderazgo',
      ],
    },
  },
};

export const ProjectLanding = ({ projectId, onBack }: ProjectLandingProps) => {
  const { language } = useLanguage();
  const copy = PROJECT_COPY[language][projectId];
  const whatsappNumber = '593986059727';
  const packagistUrl = 'https://packagist.org/packages/amephia/sri-ec';
  const contactEmail = 'info@amephia.com';
  const introMessage =
    language === 'es'
      ? `Hola, quiero información del proyecto ${copy.title}.`
      : `Hi, I want more information about the ${copy.title} project.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(introMessage)}`;
  const emailSubject =
    language === 'es'
      ? `Agenda de proyecto: ${copy.title}`
      : `Project consultation: ${copy.title}`;
  const emailUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}`;
  const secondaryUrl = projectId === 'facturacion' ? packagistUrl : emailUrl;
  const secondaryLabel =
    projectId === 'facturacion'
      ? language === 'es'
        ? 'Ver Paquete en Packagist'
        : 'View Package on Packagist'
      : language === 'es'
        ? 'Agendar Asesoría'
        : 'Book Advisory Call';
  const backLabel = language === 'es' ? 'Volver al Portafolio' : 'Back to Portfolio';
  const ctaLabel = language === 'es' ? 'Solicitar este Proyecto' : 'Request this Project';
  const responseNote =
    language === 'es'
      ? 'Respuesta por WhatsApp en minutos.'
      : 'WhatsApp response in minutes.';
  const handlePrimaryCtaClick = () => {
    const context = `project_${projectId}_primary`;
    trackEvent('project_cta_click', { project_id: projectId, cta: 'whatsapp' });
    trackContactClick('whatsapp', context);
    trackLeadGenerated('whatsapp', context);
  };
  const handleSecondaryCtaClick = () => {
    const ctaType = projectId === 'facturacion' ? 'packagist' : 'email';
    trackEvent('project_cta_click', { project_id: projectId, cta: ctaType });
    if (ctaType === 'email') {
      const context = `project_${projectId}_secondary`;
      trackContactClick('email', context);
      trackLeadGenerated('email', context);
    }
  };

  return (
    <section className="py-16 pb-28 md:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10"
      >
        <button
          onClick={onBack}
          className="mb-8 px-4 py-2 text-xs font-mono uppercase tracking-wider bg-white/5 border border-white/10 rounded-lg hover:border-primary/40 hover:text-primary transition-colors"
        >
          {backLabel}
        </button>
        <span className="block text-xs font-mono uppercase tracking-wider text-primary mb-3">
          {copy.badge}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">{copy.title}</h1>
        <p className="text-lg md:text-xl text-white/80 mb-4">{copy.subtitle}</p>
        <p className="text-base text-mutedText max-w-4xl leading-relaxed">{copy.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">{copy.highlightsTitle}</h2>
          <ul className="space-y-3 text-sm text-mutedText">
            {copy.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">{copy.deliverablesTitle}</h2>
          <ul className="space-y-3 text-sm text-mutedText">
            {copy.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={handlePrimaryCtaClick}
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          {ctaLabel}
        </a>
        <a
          href={secondaryUrl}
          target={projectId === 'facturacion' ? '_blank' : undefined}
          rel={projectId === 'facturacion' ? 'noreferrer' : undefined}
          onClick={handleSecondaryCtaClick}
          className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors"
        >
          {secondaryLabel}
        </a>
        <span className="text-sm text-mutedText">{responseNote}</span>
      </div>

      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={handlePrimaryCtaClick}
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-background font-semibold rounded-xl shadow-[0_8px_24px_rgba(143,168,118,0.35)]"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
};
