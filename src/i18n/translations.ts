export const translations = {
  en: {
    // Header
    tagline: 'Software architecture for the modern enterprise',

    // Info Section
    whoWeAre: 'Who We Are',
    whoWeAreDesc: 'We are a forward-thinking technology company dedicated to building robust and scalable ecosystems. Our team combines deep industry knowledge with cutting-edge technical expertise to deliver solutions that drive real business value.',
    mission: 'Mission',
    missionDesc: 'To empower businesses with intelligent, scalable, and user-centric software solutions that streamline operations and unlock new opportunities for growth.',
    vision: 'Vision',
    visionDesc: 'To be the leading architect of digital ecosystems, setting the standard for innovation, reliability, and user experience in the enterprise software landscape.',
    technologies: 'Technologies We Use',

    // ERP Section
    erpTitle: 'GYM ERP System',
    erpSubtitle: 'Complete management solution for fitness centers',
    erpDesc: 'Our comprehensive ERP solution designed specifically for gyms and fitness centers. Manage all aspects of your business from a single, powerful platform.',

    // ERP Features
    posTitle: 'Point of Sale',
    posDesc: 'Fast and intuitive POS system for selling memberships, products, and services. Accept multiple payment methods and manage transactions seamlessly.',

    invoicingTitle: 'Electronic Invoicing',
    invoicingDesc: 'Fully compliant electronic invoicing system. Generate, send, and manage invoices automatically with tax compliance built-in.',

    accountingTitle: 'Accounting',
    accountingDesc: 'Complete financial management with real-time reports, expense tracking, cash flow analysis, and integration with your existing accounting systems.',

    inventoryTitle: 'Inventory',
    inventoryDesc: 'Track products, supplements, and equipment. Automatic alerts for low stock, supplier management, and detailed movement history.',

    // Additional features
    memberManagement: 'Member Management',
    memberManagementDesc: 'Complete member profiles, attendance tracking, membership plans, and automated renewal reminders.',

    scheduling: 'Class Scheduling',
    schedulingDesc: 'Manage classes, trainers, and room bookings. Online reservations and capacity control.',

    analytics: 'Analytics & Reports',
    analyticsDesc: 'Real-time dashboards, KPIs, revenue reports, and member analytics to make data-driven decisions.',

    // CTA
    learnMore: 'Learn More',
    contactUs: 'Contact Us',
    requestDemo: 'Request Demo',
  },
  es: {
    // Header
    tagline: 'Arquitectura de software para la empresa moderna',

    // Info Section
    whoWeAre: 'Quiénes Somos',
    whoWeAreDesc: 'Somos una empresa de tecnología con visión de futuro dedicada a construir ecosistemas robustos y escalables. Nuestro equipo combina un profundo conocimiento de la industria con experiencia técnica de vanguardia para entregar soluciones que generan valor real para los negocios.',
    mission: 'Misión',
    missionDesc: 'Empoderar a las empresas con soluciones de software inteligentes, escalables y centradas en el usuario que optimicen las operaciones y desbloqueen nuevas oportunidades de crecimiento.',
    vision: 'Visión',
    visionDesc: 'Ser el arquitecto líder de ecosistemas digitales, estableciendo el estándar de innovación, confiabilidad y experiencia de usuario en el panorama del software empresarial.',
    technologies: 'Tecnologías que Utilizamos',

    // ERP Section
    erpTitle: 'Sistema ERP para Gimnasios',
    erpSubtitle: 'Solución completa de gestión para centros fitness',
    erpDesc: 'Nuestra solución ERP integral diseñada específicamente para gimnasios y centros fitness. Administra todos los aspectos de tu negocio desde una única y potente plataforma.',

    // ERP Features
    posTitle: 'Punto de Venta',
    posDesc: 'Sistema POS rápido e intuitivo para vender membresías, productos y servicios. Acepta múltiples métodos de pago y gestiona transacciones sin problemas.',

    invoicingTitle: 'Facturación Electrónica',
    invoicingDesc: 'Sistema de facturación electrónica totalmente compatible. Genera, envía y administra facturas automáticamente con cumplimiento fiscal integrado.',

    accountingTitle: 'Contabilidad',
    accountingDesc: 'Gestión financiera completa con reportes en tiempo real, seguimiento de gastos, análisis de flujo de caja e integración con tus sistemas contables existentes.',

    inventoryTitle: 'Inventarios',
    inventoryDesc: 'Controla productos, suplementos y equipamiento. Alertas automáticas de stock bajo, gestión de proveedores e historial detallado de movimientos.',

    // Additional features
    memberManagement: 'Gestión de Miembros',
    memberManagementDesc: 'Perfiles completos de miembros, control de asistencia, planes de membresía y recordatorios automáticos de renovación.',

    scheduling: 'Programación de Clases',
    schedulingDesc: 'Administra clases, entrenadores y reservas de salas. Reservaciones en línea y control de capacidad.',

    analytics: 'Análisis y Reportes',
    analyticsDesc: 'Dashboards en tiempo real, KPIs, reportes de ingresos y análisis de miembros para tomar decisiones basadas en datos.',

    // CTA
    learnMore: 'Más Información',
    contactUs: 'Contáctanos',
    requestDemo: 'Solicitar Demo',
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
