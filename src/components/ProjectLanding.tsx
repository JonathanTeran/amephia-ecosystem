import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, PhoneCall, Mail } from 'lucide-react';
import { useLanguage } from '../i18n';
import type { Language } from '../i18n';
import type { ProjectId } from '../projects';
import { trackContactClick, trackEvent, trackLeadGenerated } from '../lib/analytics';
import { openEmailClient } from '../lib/emailUtils';
import logo from '../assets/images/amelogo_v3_optimized.webp';

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

// `shielddata` y `education` tienen su propio componente de landing y se rutean
// aparte en App.tsx — nunca pasan por ProjectLanding —, por eso su copy genérico
// es opcional aquí. El acceso `copy[projectId]` ya tiene guard `if (!proj) return null`.
const PROJECT_COPY: Record<Language, Partial<Record<ProjectId, ProjectCopy>>> = {
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
      description: 'A robust invoicing service that handles advanced document signing, real-time SRI transmission, and automated fiscal compliance.',
      highlightsTitle: 'Core Scope',
      highlights: [
        'Automated XML signing (X.509 PKCS#12)',
        'Real-time SRI transmission & authorization',
        'Direct integration with Production & Testing environments',
        'Automated RIDE (PDF) & XML delivery',
      ],
      deliverablesTitle: 'What We Deliver',
      deliverables: [
        'High-performance invoicing engine',
        'Management dashboard with document trace',
        'Digital certificate secure storage',
        'Complete fiscal audit trail',
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
      badge: 'SaaS Product',
      title: 'Ecommerce SaaS Platform',
      subtitle: 'Multi-tenant online store with 22+ integrated modules',
      description: 'Enterprise-grade ecommerce platform with product catalog, secure checkout, payment gateways (Nuvei, PayPhone, Kushki), Kardex inventory with WAC, SRI electronic invoicing, RMA returns, loyalty program, email marketing, B2B quotations, support tickets, and a drag-and-drop homepage builder.',
      highlightsTitle: 'Core Features',
      highlights: [
        'Multi-tenant SaaS with full data isolation',
        'Product variants, bundles, custom attributes & multi-language',
        'Checkout with Nuvei, PayPhone, Kushki & bank transfer',
        'Kardex inventory with weighted average cost (WAC)',
        'SRI electronic invoicing with XAdES digital signature',
        'Returns (RMA), coupons, reviews & loyalty program',
        'CEO dashboard, reports & abandoned cart recovery',
        'REST API with Swagger/OpenAPI documentation',
      ],
      deliverablesTitle: 'What\'s Included',
      deliverables: [
        'Full SaaS platform with Filament admin panel',
        'Responsive storefront with homepage builder (10 section types)',
        'Payment gateway integrations & SRI e-invoicing',
        'Email marketing, support tickets & webhooks',
        '3 plans: Basic ($50), Professional ($100), Enterprise ($150)',
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
    migration: {
      badge: 'SaaS Product',
      title: 'Migration Management SaaS',
      subtitle: 'Multi-tenant platform for immigration facilitators',
      description: 'Complete SaaS platform for immigration consultancies to manage clients, cases, documents, payments, and client portal access.',
      highlightsTitle: 'Core Features',
      highlights: [
        'Multi-tenant architecture with data isolation',
        'Case and client management',
        'Document storage and tracking',
        'Integrated payment processing (Stripe, PayPal)',
        'Client self-service portal',
        'Advanced analytics and reporting',
      ],
      deliverablesTitle: 'What\'s Included',
      deliverables: [
        'Full SaaS platform with admin panel',
        'Client portal with real-time case tracking',
        'Payment integrations and invoicing',
        '14-day free trial and onboarding',
      ],
    },
    'broker-seguro': {
      badge: 'SaaS Product',
      title: 'Insurance Broker Management SaaS',
      subtitle: 'Multi-tenant platform for insurance brokers',
      description: 'Complete SaaS platform for insurance brokers to manage clients, policies, claims with wizard, dynamic forms, client portal, and reports.',
      highlightsTitle: 'Core Features',
      highlights: [
        'Multi-tenant architecture with data isolation',
        'Client and dependent management',
        'Policy lifecycle management',
        'Intelligent claims with 4-step wizard',
        'Dynamic form builder (16 field types)',
        'Client self-service portal',
      ],
      deliverablesTitle: 'What\'s Included',
      deliverables: [
        'Full SaaS platform with admin panel',
        'Client portal with policy & claims tracking',
        'Dynamic form builder for each claim type',
        '96 REST API endpoints',
      ],
    },
    contame: {
      badge: 'Accounting SaaS',
      title: 'ContAme – Accounting Platform',
      subtitle: 'Cloud accounting for businesses and accountants',
      description: 'ContAme is a full-featured accounting platform built for SMEs and accounting professionals. Manage chart of accounts, journal entries, tax compliance, payroll, invoicing, and financial reports — all in one place.',
      highlightsTitle: 'Core Features',
      highlights: [
        'NIIF/IFRS chart of accounts for SMEs',
        'Automated journal entries per transaction',
        'Electronic invoicing with SRI integration',
        'Payroll and employee management',
        'Bank reconciliation and settlements',
        'Multi-company support for accountants',
      ],
      deliverablesTitle: 'What\'s Included',
      deliverables: [
        'Full accounting web platform',
        'Financial reports: P&L, balance sheet, trial balance',
        'Payroll and tax compliance modules',
        'Multi-company dashboard for accounting firms',
      ],
    },
    shielddata: {
      // NOTE: shielddata renders <ShieldDataLanding /> directly from App.tsx.
      // This fallback is only kept for the Record<ProjectId> exhaustiveness check
      // and will not be displayed under normal routing.
      badge: 'Enterprise Compliance SaaS',
      title: 'SHIELDDATA – LOPDP Compliance Platform',
      subtitle: 'AI-powered Ecuadorian data protection compliance',
      description: 'Enterprise compliance platform built natively for Ecuador\'s data protection law (LOPDP). RAT generated with AI, SPDP breach notifications under 72h, public ARCO rights portal, PAdES-signed inspection dossier and ISO 27001 / NIST CSF cyber posture.',
      highlightsTitle: 'Core Features',
      highlights: [
        'AI-assisted RAT and EIPD generation',
        'Public ARCO rights portal',
        'SPDP breach notification under 72h',
        'PAdES-signed inspection mode',
        'ISO 27001 / NIST CSF cyber posture',
        'Multi-tenant with Row-Level Security',
      ],
      deliverablesTitle: 'What\'s Included',
      deliverables: [
        'Full compliance platform with admin panel',
        'Public ARCO portal under your brand',
        'Cron-based compliance monitoring and WhatsApp alerts',
        'Forensic audit log with Merkle hash chain',
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
      description: 'Un servicio robusto de facturación que gestiona firma avanzada de documentos, transmisión en tiempo real al SRI y cumplimiento fiscal automatizado.',
      highlightsTitle: 'Alcance Principal',
      highlights: [
        'Firma electrónica avanzada (X.509 PKCS#12)',
        'Transmisión y autorización SRI en tiempo real',
        'Integración con ambientes de Pruebas y Producción',
        'Generación automática de RIDE (PDF) y XML',
      ],
      deliverablesTitle: 'Qué Entregamos',
      deliverables: [
        'Motor de facturación de alto rendimiento',
        'Dashboard de gestión con trazabilidad',
        'Almacenamiento seguro de certificados digitales',
        'Historial y auditoría fiscal completa',
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
      badge: 'Producto SaaS',
      title: 'Plataforma Ecommerce SaaS',
      subtitle: 'Tienda online multi-tenant con 22+ módulos integrados',
      description: 'Plataforma ecommerce de nivel empresarial con catálogo de productos, checkout seguro, pasarelas de pago (Nuvei, PayPhone, Kushki), inventario Kardex con WAC, facturación electrónica SRI, devoluciones RMA, programa de lealtad, email marketing, cotizaciones B2B, tickets de soporte y constructor de homepage arrastrando secciones.',
      highlightsTitle: 'Funcionalidades Principales',
      highlights: [
        'Multi-tenant SaaS con aislamiento total de datos',
        'Variantes, bundles, atributos dinámicos y multi-idioma',
        'Checkout con Nuvei, PayPhone, Kushki y transferencia bancaria',
        'Inventario Kardex con costo promedio ponderado (WAC)',
        'Facturación electrónica SRI con firma digital XAdES',
        'Devoluciones (RMA), cupones, reseñas y programa de lealtad',
        'Dashboard CEO, reportes y recuperación de carritos abandonados',
        'API REST documentada con Swagger/OpenAPI',
      ],
      deliverablesTitle: 'Qué Incluye',
      deliverables: [
        'Plataforma SaaS completa con panel admin Filament',
        'Storefront responsive con constructor de homepage (10 tipos de sección)',
        'Integración de pasarelas de pago y facturación electrónica SRI',
        'Email marketing, tickets de soporte y webhooks',
        '3 planes: Básico ($50), Profesional ($100), Enterprise ($150)',
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
    migration: {
      badge: 'Producto SaaS',
      title: 'SaaS de Gestión Migratoria',
      subtitle: 'Plataforma multitenancy para facilitadores migratorios',
      description: 'Plataforma SaaS completa para consultoras de inmigración que permite gestionar clientes, casos, documentos, pagos y portal del cliente.',
      highlightsTitle: 'Funcionalidades Principales',
      highlights: [
        'Arquitectura multitenancy con aislamiento de datos',
        'Gestión completa de casos y clientes',
        'Almacenamiento y seguimiento de documentos',
        'Procesamiento de pagos integrado (Stripe, PayPal)',
        'Portal de autoservicio para clientes',
        'Analytics y reportes avanzados',
      ],
      deliverablesTitle: 'Qué Incluye',
      deliverables: [
        'Plataforma SaaS con panel de administración',
        'Portal del cliente con seguimiento en tiempo real',
        'Integraciones de pago y facturación',
        '14 días de prueba gratis y onboarding',
      ],
    },
    'broker-seguro': {
      badge: 'Producto SaaS',
      title: 'Software para Brókers de Seguros',
      subtitle: 'Plataforma multi-tenant para brókers de seguros',
      description: 'Plataforma SaaS completa para brókers de seguros: gestión de clientes, pólizas, reclamos con wizard, formularios dinámicos, portal del cliente y reportes.',
      highlightsTitle: 'Funcionalidades Principales',
      highlights: [
        'Arquitectura multi-tenant con aislamiento de datos',
        'Gestión de clientes y dependientes',
        'Ciclo de vida de pólizas',
        'Reclamos inteligentes con wizard de 4 pasos',
        'Constructor de formularios dinámicos (16 tipos de campo)',
        'Portal de autoservicio para asegurados',
      ],
      deliverablesTitle: 'Qué Incluye',
      deliverables: [
        'Plataforma SaaS con panel de administración',
        'Portal del cliente con seguimiento de pólizas y reclamos',
        'Constructor de formularios para cada tipo de reclamo',
        '96 endpoints REST API',
      ],
    },
    contame: {
      badge: 'SaaS Contable',
      title: 'ContAme – Plataforma Contable',
      subtitle: 'Contabilidad en la nube para empresas y contadores',
      description: 'ContAme es una plataforma contable completa para PYMES y profesionales de la contabilidad. Gestione plan de cuentas, asientos contables, cumplimiento tributario, nómina, facturación y reportes financieros — todo en un solo lugar.',
      highlightsTitle: 'Funcionalidades Principales',
      highlights: [
        'Plan de cuentas NIIF/NIC para PYMES Ecuador',
        'Asientos contables automáticos por transacción',
        'Facturación electrónica integrada con el SRI',
        'Nómina y gestión de empleados',
        'Conciliación bancaria y liquidaciones',
        'Multi-empresa para despachos contables',
      ],
      deliverablesTitle: 'Qué Incluye',
      deliverables: [
        'Plataforma contable web completa',
        'Reportes financieros: P&G, balance, comprobación',
        'Módulos de nómina y cumplimiento tributario',
        'Dashboard multi-empresa para firmas contables',
      ],
    },
    shielddata: {
      // NOTA: shielddata renderiza <ShieldDataLanding /> directamente desde App.tsx.
      // Este fallback es solo para la exhaustividad del Record<ProjectId> y no se
      // muestra bajo el routing normal.
      badge: 'SaaS Compliance Enterprise',
      title: 'SHIELDDATA – Plataforma de Cumplimiento LOPDP',
      subtitle: 'Cumplimiento ecuatoriano de protección de datos con IA',
      description: 'Plataforma enterprise construida nativamente para la Ley de Protección de Datos del Ecuador (LOPDP). RAT generado con IA, notificación de brechas a la SPDP en menos de 72h, portal público para derechos ARCO, expediente de inspección firmado con PAdES y postura de ciberseguridad ISO 27001 / NIST CSF.',
      highlightsTitle: 'Funcionalidades Principales',
      highlights: [
        'Generación asistida con IA del RAT y de las EIPDs',
        'Portal público para derechos ARCO',
        'Notificación de brechas a la SPDP en menos de 72h',
        'Modo Inspección con expediente firmado PAdES',
        'Postura de ciberseguridad ISO 27001 / NIST CSF',
        'Arquitectura multi-tenant con Row-Level Security',
      ],
      deliverablesTitle: 'Qué Incluye',
      deliverables: [
        'Plataforma de cumplimiento completa con panel admin',
        'Portal ARCO público bajo tu marca',
        'Monitoreo cron de cumplimiento + alertas WhatsApp',
        'Audit log forense con cadena de hashes Merkle',
      ],
    },
  },
};


export const ProjectLanding = ({ projectId, onBack }: ProjectLandingProps) => {
  const { language } = useLanguage();
  const copy = PROJECT_COPY[language][projectId];
  // `shielddata` y `education` se renderizan con su propio componente (App.tsx),
  // así que aquí su copy genérico no existe → guard defensivo.
  if (!copy) return null;
  const whatsappNumber = '593986059727';
  const packagistUrl = 'https://packagist.org/packages/amephia/sri-ec';

  const introMessage =
    language === 'es'
      ? `Hola, quiero información del proyecto ${copy.title}.`
      : `Hi, I want more information about the ${copy.title} project.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(introMessage)}`;
  const emailSubject =
    language === 'es'
      ? `Agenda de proyecto: ${copy.title}`
      : `Project consultation: ${copy.title}`;

  const isPackagist = projectId === 'facturacion';
  const ctaLabel = language === 'es' ? 'Solicitar este proyecto' : 'Request this project';
  const secondaryLabel = isPackagist
    ? language === 'es' ? 'Ver en Packagist' : 'View on Packagist'
    : language === 'es' ? 'Agendar asesoría' : 'Book Advisory Call';
  const backLabel = language === 'es' ? 'Volver al inicio' : 'Back to home';

  const handlePrimaryClick = () => {
    const ctx = `project_${projectId}_primary`;
    trackEvent('project_cta_click', { project_id: projectId, cta: 'whatsapp' });
    trackContactClick('whatsapp', ctx);
    trackLeadGenerated('whatsapp', ctx);
  };

  const handleSecondaryClick = () => {
    const ctaType = isPackagist ? 'packagist' : 'email';
    trackEvent('project_cta_click', { project_id: projectId, cta: ctaType });
    if (!isPackagist) {
      const ctx = `project_${projectId}_secondary`;
      trackContactClick('email', ctx);
      trackLeadGenerated('email', ctx);
      openEmailClient(emailSubject);
    }
  };

  return (
    <div className="min-h-screen bg-[#080E1C] text-white font-sans antialiased overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080E1C]/95 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-18 md:h-20 flex items-center justify-between py-4">
          <button onClick={onBack} className="flex items-center gap-3 group">
            <img src={logo} alt="AmePhia" className="h-7 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
          </button>
          <button onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        {/* Fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[5%] w-[700px] h-[700px] rounded-full bg-[#3B82F6]/[0.07] blur-[130px]" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/[0.06] blur-[110px]" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080E1C]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-[#3B82F6]/15 border border-[#3B82F6]/25 rounded-full text-xs font-semibold text-[#60A5FA] uppercase tracking-widest mb-6">
              {copy.badge}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-bold leading-[1.06] tracking-tight text-white mb-6 max-w-4xl">
              {copy.title}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-4 max-w-3xl">
              {copy.subtitle}
            </p>
            <p className="text-base text-slate-500 leading-relaxed max-w-3xl">
              {copy.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handlePrimaryClick}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#6366f1] hover:from-[#2563eb] hover:to-[#4f46e5] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5">
                <PhoneCall className="w-5 h-5" />
                {ctaLabel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={isPackagist ? packagistUrl : '#'}
                target={isPackagist ? '_blank' : undefined}
                rel={isPackagist ? 'noreferrer' : undefined}
                onClick={handleSecondaryClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 hover:border-white/30 text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-200 hover:bg-white/[0.04]">
                <Mail className="w-5 h-5" />
                {secondaryLabel}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Highlights + Deliverables ── */}
      <section className="py-20 bg-[#080E1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Highlights */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-[#0C1220] border border-white/[0.08] rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/25 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#60A5FA]" />
                </span>
                {copy.highlightsTitle}
              </h2>
              <ul className="space-y-4">
                {copy.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Deliverables */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0C1220] border border-white/[0.08] rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#A78BFA]" />
                </span>
                {copy.deliverablesTitle}
              </h2>
              <ul className="space-y-4">
                {copy.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center bg-gradient-to-br from-[#0F172A] via-[#1E1040] to-[#1E1B4B]">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                ¿Listo para empezar con{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] to-[#A78BFA]">
                  {copy.title}
                </span>
                ?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                {language === 'es'
                  ? 'Cuéntanos tu caso. Te respondemos en menos de 24 horas con una propuesta concreta.'
                  : 'Tell us about your case. We respond within 24 hours with a concrete proposal.'}
              </p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handlePrimaryClick}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200">
                {ctaLabel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mobile sticky CTA ── */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={handlePrimaryClick}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#3B82F6] to-[#6366f1] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30">
          <PhoneCall className="w-5 h-5" />
          {ctaLabel}
        </a>
      </div>

    </div>
  );
};
