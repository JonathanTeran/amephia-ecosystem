import { useState, useEffect, useRef } from 'react';
import {
  Shield,
  ShieldCheck,
  Lock,
  FileCheck,
  AlertTriangle,
  Users,
  Eye,
  Stethoscope,
  Building2,
  ShoppingBag,
  GraduationCap,
  Landmark,
  Sparkles,
  Bot,
  Globe,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Mail,
  PhoneCall,
  Copy,
  ExternalLink,
  KeyRound,
  Server,
  Database,
  Workflow,
  TrendingDown,
  Gavel,
  Clock,
  Quote,
  Star,
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   CONFIG
   ────────────────────────────────────────────────────────────────────────── */
const APP_URL = 'https://shieldata.amephia.com';
const DEMO_EMAIL = 'carlos.dpo@clinica-san-rafael.ec';
const DEMO_PASSWORD = 'Demo2026SHIELDDATA!';
const WHATSAPP = '13347324056';
const CONTACT_EMAIL = 'contacto@amephia.com';

const waURL = (ctx: string) => {
  const msgs: Record<string, string> = {
    demo: 'Hola! Quiero agendar una demo personalizada de SHIELDDATA para mi empresa. ¿Cuándo podemos coordinar?',
    contact: 'Hola! Estuve revisando SHIELDDATA y me interesa saber más sobre la plataforma de cumplimiento LOPDP. ¿Pueden contactarme?',
    enterprise: 'Hola! Necesito una propuesta enterprise de SHIELDDATA para mi organización (50+ empleados). ¿Pueden enviarme detalles?',
  };
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msgs[ctx] ?? msgs.contact)}`;
};

/* ──────────────────────────────────────────────────────────────────────────
   COUNTER ANIMATION
   ────────────────────────────────────────────────────────────────────────── */
const Counter = ({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const step = Math.max(1, Math.ceil(end / (duration / 16)));
          let cur = 0;
          const tick = () => {
            cur = Math.min(cur + step, end);
            setVal(cur);
            if (cur < end) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   LOGO MARK (mismo lockup que la app SHIELDDATA)
   ────────────────────────────────────────────────────────────────────────── */
const ShieldDataMark = ({ className = 'h-9 w-9' }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
    <path
      d="M16 2.5 L27 6.5 V16 C27 22.5 22 27.5 16 29.5 C10 27.5 5 22.5 5 16 V6.5 Z"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="rgba(255,255,255,0.6)"
    />
    <path
      d="M11 15.5 L14.5 19 L21 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="25" cy="7" r="2" fill="#B45309" />
  </svg>
);

/* ──────────────────────────────────────────────────────────────────────────
   MAIN
   ────────────────────────────────────────────────────────────────────────── */
const ShieldDataLanding = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState<'email' | 'pass' | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const copy = (text: string, which: 'email' | 'pass') => {
    void navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 1600);
  };

  const goBack = () => {
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] antialiased selection:bg-blue-100 selection:text-[#1E40AF]">
      {/* ─── TOP BAR ──────────────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_rgba(15,23,42,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={goBack}
            className="group flex items-center gap-2 text-slate-500 hover:text-[#0F172A] transition-colors text-sm"
            aria-label="Volver a AmePhia"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">AmePhia</span>
          </button>

          <div className="flex items-center gap-3">
            <ShieldDataMark className="h-7 w-7 text-[#1E40AF]" />
            <span className="font-semibold tracking-tight text-base sm:text-lg text-[#0F172A]">SHIELDDATA</span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Compliance ready
            </span>
          </div>

          <a
            href={`${APP_URL}/login`}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-[#0F172A] text-white px-4 py-2 text-sm font-medium hover:bg-[#1E293B] transition"
          >
            Iniciar sesión
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
        {/* Background grid + gradients (sutiles para light theme) */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 70%)',
            }}
          />
          <div className="absolute -top-32 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-[100px]" />
          <div className="absolute top-40 right-0 h-72 w-72 rounded-full bg-amber-100/40 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
              <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[#1E40AF]">
                <svg viewBox="0 0 18 12" className="h-2.5 w-[14px]" aria-hidden>
                  <rect width="18" height="6" fill="#FDD835" />
                  <rect y="6" width="18" height="3" fill="#1E40AF" />
                  <rect y="9" width="18" height="3" fill="#991B1B" />
                </svg>
                Hecho en Ecuador
              </span>
              <span className="h-3 w-px bg-slate-300" />
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
                Cumplimiento LOPDP · Enterprise
              </span>
            </div>

            <h1 className="mt-8 text-[44px] sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.035em] text-[#0F172A]">
              Cumplimiento LOPDP
              <br />
              <span className="bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                completo, en 30 minutos
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg sm:text-xl text-slate-600 leading-relaxed">
              La primera plataforma enterprise construida nativamente para la Ley de Protección
              de Datos del Ecuador. RAT generado con IA, brechas notificadas a SPDP en menos
              de 72h, portal ARCO público, generación e importación de documentos con IA y
              firma electrónica PAdES con tu certificado ARCOTEL —
              <span className="text-[#0F172A] font-medium"> listo desde el día uno</span>.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`${APP_URL}/login`}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-[#0F172A] px-6 py-3.5 text-[15px] font-medium text-white hover:bg-[#1E293B] transition shadow-[0_4px_20px_rgba(15,23,42,0.18)] hover:shadow-[0_4px_30px_rgba(15,23,42,0.25)]"
              >
                Probar demo gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#features"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3.5 text-[15px] font-medium text-[#0F172A] hover:bg-slate-50 hover:border-slate-400 transition"
              >
                Ver características
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-600" />
                TLS 1.3 + AES-256
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5 text-emerald-600" />
                Datos residentes en NYC3
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileCheck className="h-3.5 w-3.5 text-emerald-600" />
                Hash chain + audit log forense
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-emerald-600" />
                Multi-tenant con RLS
              </span>
            </div>
          </div>

          {/* Mockup dashboard light */}
          <div className="relative mx-auto mt-20 max-w-5xl">
            <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-tr from-blue-100/40 via-transparent to-amber-100/30 blur-3xl pointer-events-none" />
            <div className="relative rounded-xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)]">
              {/* Browser chrome */}
              <div className="flex items-center justify-between rounded-t-lg bg-slate-50 px-4 py-2.5 border-b border-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <Lock className="h-3 w-3 text-emerald-600" />
                  shieldata.amephia.com/reports/security-posture
                </div>
                <div className="w-12" />
              </div>
              {/* Mock UI */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-b-lg bg-slate-50 p-5">
                <div className="md:col-span-3 rounded-lg border border-slate-200 bg-white p-5 text-center">
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="h-3 w-3" /> Indicador unificado
                  </div>
                  <div className="mt-2 text-5xl font-bold tabular-nums text-[#1E40AF]">
                    <Counter end={79} />
                    <span className="text-xl text-slate-400">/100</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">Promedio LOPDP + Ciberseguridad</div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">LOPDP</div>
                  <div className="mt-1 text-3xl font-bold tabular-nums text-emerald-600">98</div>
                  <div className="mt-1 text-[11px] text-slate-500">DPO activo · RAT poblado</div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Cibersec NIST</div>
                  <div className="mt-1 text-3xl font-bold tabular-nums text-amber-600">62</div>
                  <div className="mt-1 text-[11px] text-slate-500">15/20 controles · madurez Defined</div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Activos</div>
                  <div className="mt-1 text-3xl font-bold tabular-nums text-[#0F172A]">17</div>
                  <div className="mt-1 text-[11px] text-slate-500">3 críticos · 5 tipos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── METRICS BAND ──────────────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {[
            { value: 30, suffix: 's', label: 'Expediente SPDP generado' },
            { value: 100, suffix: '%', label: 'Trazabilidad forense' },
            { value: 24, suffix: '+', label: 'Migraciones DB enterprise' },
            { value: 72, prefix: '<', suffix: 'h', label: 'Notificación de brechas SPDP' },
          ].map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold tabular-nums tracking-tight text-[#0F172A]">
                <Counter end={m.value} suffix={m.suffix ?? ''} prefix={m.prefix ?? ''} />
              </div>
              <div className="mt-2 text-xs sm:text-sm text-slate-500">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES (5 KILLER) ───────────────────────────────────────── */}
      <section id="features" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[#1E40AF]">
              Killer features
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A]">
              Siete diferenciadores que{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6]">
                justifican la decisión
              </span>
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              No es un dashboard. Es un sistema operativo de cumplimiento, construido
              específicamente para la realidad regulatoria ecuatoriana.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Feature 1 — Onboarding IA (grande, span-2) */}
            <div className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-white p-8 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50 transition">
              <div className="absolute top-0 right-0 h-64 w-64 bg-blue-200/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 opacity-50 group-hover:opacity-100 transition" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1E40AF]/10 border border-[#1E40AF]/20">
                    <Bot className="h-5 w-5 text-[#1E40AF]" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#1E40AF]">KF #1</span>
                </div>
                <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
                  Onboarding con IA en 30 minutos
                </h3>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  Wizard inteligente que recolecta tu industria, tratamientos típicos y stack
                  tecnológico — y genera automáticamente tu RAT base, EIPDs preliminares,
                  política de privacidad, designación DPO y árbol completo de cumplimiento.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-md border border-slate-200 bg-white px-3 py-2">
                    <span className="text-slate-500">Generación inicial</span>
                    <span className="ml-2 text-[#0F172A] font-semibold tabular-nums">~30 min</span>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-white px-3 py-2">
                    <span className="text-slate-500">vs proceso manual</span>
                    <span className="ml-2 text-[#0F172A] font-semibold tabular-nums">~3 semanas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 — Brechas <72h */}
            <FeatureCard
              kf="KF #2"
              icon={<AlertTriangle className="h-5 w-5 text-orange-600" />}
              accent="orange"
              title="Brechas notificadas a SPDP en <72h"
              desc="Workflow de severidad (LINDDUN) + cronómetro 72h + plantillas firmadas listas para enviar a la Superintendencia."
            />

            {/* Feature 3 — ARCO */}
            <FeatureCard
              kf="KF #3"
              icon={<Users className="h-5 w-5 text-violet-600" />}
              accent="violet"
              title="Portal público ARCO+"
              desc="Titulares ejercen sus derechos (Arts. 12-19 LOPDP) desde un portal con tu marca. SLA, evidencias y exports SPDP automáticos."
            />

            {/* Feature 4 — Modo Inspección */}
            <FeatureCard
              kf="KF #4"
              icon={<Eye className="h-5 w-5 text-emerald-600" />}
              accent="emerald"
              title="Modo Inspección SPDP"
              desc="Genera en 30 segundos un expediente completo firmado PAdES con RAT, EIPDs, contratos, brechas y audit log con hash chain forense."
            />

            {/* Feature 5 — Cibersec NIST */}
            <FeatureCard
              kf="KF #5"
              icon={<ShieldCheck className="h-5 w-5 text-amber-600" />}
              accent="amber"
              title="Postura de Ciberseguridad NIST CSF"
              desc="Evaluación de 20 controles ISO 27001 / NIST CSF, scoring por dominio, brechas priorizadas y roadmap GAP exportable a directorio."
            />

            {/* Feature 6 — Firma electrónica SIGN */}
            <FeatureCard
              kf="KF #6"
              icon={<KeyRound className="h-5 w-5 text-indigo-600" />}
              accent="indigo"
              title="Firma electrónica con validez legal"
              desc="Firma tus PDF con tu certificado ARCOTEL (.p12 de BCE, Security Data, ANF) directo en el navegador — la clave nunca sale de tu equipo. PAdES-B/T/LTV con sello de tiempo y portal público de verificación con semáforo de validez (Ley 67)."
            />

            {/* Feature 7 — Document Intelligence */}
            <FeatureCard
              kf="KF #7"
              icon={<FileCheck className="h-5 w-5 text-sky-600" />}
              accent="sky"
              title="Document Intelligence con IA"
              desc="Genera avisos de privacidad, contratos de encargo (DPA), respuestas ARCO y borradores de EIPD con citas a la LOPDP. O importa documentos existentes (PDF/Word, con OCR de escaneados): extrae datos, analiza brechas y regenera una versión conforme."
            />
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ────────────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-slate-300 bg-white px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-600">
              Sectores
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A]">
              Playbooks pre-construidos{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6]">
                para tu industria
              </span>
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              No empiezas de cero. Cada sector tiene RATs base, EIPDs típicas, encargados
              recomendados y un mapa de cumplimiento que se adapta automáticamente.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Stethoscope, name: 'Salud', count: '3 RATs + EIPD Art. 50', tone: 'text-red-600 bg-red-50 border-red-200 hover:border-red-300' },
              { icon: Building2, name: 'Fintech', count: '4 RATs + KYC/AML', tone: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:border-emerald-300' },
              { icon: ShoppingBag, name: 'Retail', count: '3 RATs + tokenización', tone: 'text-amber-600 bg-amber-50 border-amber-200 hover:border-amber-300' },
              { icon: GraduationCap, name: 'Educación', count: '3 RATs + menores', tone: 'text-violet-600 bg-violet-50 border-violet-200 hover:border-violet-300' },
              { icon: Landmark, name: 'Sector Público', count: '4 RATs + transparencia', tone: 'text-sky-600 bg-sky-50 border-sky-200 hover:border-sky-300' },
            ].map(({ icon: Icon, name, count, tone }) => (
              <div
                key={name}
                className={`group rounded-xl border ${tone} p-5 hover:scale-[1.02] hover:shadow-md transition cursor-pointer`}
              >
                <Icon className="h-7 w-7" />
                <div className="mt-4 text-lg font-bold text-[#0F172A]">{name}</div>
                <div className="mt-1 text-xs text-slate-500">{count}</div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            <Sparkles className="inline h-4 w-4 mr-1 text-amber-500" />
            Y soporte internacional opcional: <span className="text-[#0F172A] font-medium">GDPR (UE)</span> y{' '}
            <span className="text-[#0F172A] font-medium">HIPAA (USA)</span> con toggles de un click.
          </p>
        </div>
      </section>

      {/* ─── COSTO DEL INCUMPLIMIENTO ──────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="inline-block rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-red-700">
              <AlertTriangle className="inline h-3 w-3 mr-1 -mt-0.5" />
              No cumplir cuesta más
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A]">
              El costo real del{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
                incumplimiento LOPDP
              </span>
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              La SPDP ya sancionó casos reales. Estos no son números teóricos —
              son resoluciones administrativas firmes con multas pagadas.
            </p>
          </div>

          {/* Real cases sancionados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-7 hover:shadow-xl hover:shadow-red-100/40 transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-red-700">
                    <Gavel className="h-3 w-3" /> Caso real SPDP
                  </div>
                  <div className="mt-3 text-2xl font-bold text-[#0F172A]">LigaPro</div>
                  <div className="text-sm text-slate-500">Liga Profesional de Fútbol del Ecuador</div>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600 flex-shrink-0" />
              </div>
              <div className="mt-6">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Multa impuesta</div>
                <div className="mt-1 text-5xl font-bold tabular-nums text-red-700">
                  US$ <Counter end={259644} />
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Tratamiento indebido de datos personales. Resolución administrativa firme.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-7 hover:shadow-xl hover:shadow-red-100/40 transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-red-700">
                    <Gavel className="h-3 w-3" /> Caso real SPDP
                  </div>
                  <div className="mt-3 text-2xl font-bold text-[#0F172A]">FEF</div>
                  <div className="text-sm text-slate-500">Federación Ecuatoriana de Fútbol</div>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600 flex-shrink-0" />
              </div>
              <div className="mt-6">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Multa impuesta</div>
                <div className="mt-1 text-5xl font-bold tabular-nums text-red-700">
                  US$ <Counter end={194856} />
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Misma naturaleza. La SPDP demostró que sanciona efectivamente.
                </p>
              </div>
            </div>
          </div>

          {/* Marco de sanciones LOPDP */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center md:text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Infracción leve</div>
                <div className="mt-2 text-3xl font-bold tabular-nums text-amber-600">
                  0.1% – 0.7%
                </div>
                <div className="mt-1 text-xs text-slate-500">facturación anual</div>
              </div>
              <div className="text-center md:text-left md:border-l md:border-slate-200 md:pl-6">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Infracción grave</div>
                <div className="mt-2 text-3xl font-bold tabular-nums text-orange-600">
                  0.7% – 1%
                </div>
                <div className="mt-1 text-xs text-slate-500">facturación anual</div>
              </div>
              <div className="text-center md:text-left md:border-l md:border-slate-200 md:pl-6">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Infracción muy grave</div>
                <div className="mt-2 text-3xl font-bold tabular-nums text-red-700">
                  1% – 1.7%
                </div>
                <div className="mt-1 text-xs text-slate-500">facturación anual</div>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0F172A]">5 días hábiles</div>
                    <div className="text-xs text-slate-500 mt-0.5">para notificar brecha a SPDP (Res. 2025-0006-R)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0F172A]">15 días hábiles</div>
                    <div className="text-xs text-slate-500 mt-0.5">para responder solicitud ARCO (Arts. 12-19)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0F172A]">15 días</div>
                    <div className="text-xs text-slate-500 mt-0.5">para notificar designación DPO a SPDP</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-600">
                Una empresa que factura{' '}
                <span className="font-bold text-[#0F172A]">USD 1M anuales</span> puede recibir multa de hasta{' '}
                <span className="font-bold text-red-700 text-base">USD 17,000</span> por una sola infracción muy grave.
              </p>
              <p className="mt-2 text-xs text-slate-500 italic">
                Fuente: LOPDP Art. 75 · Resoluciones SPDP vigentes · Casos sancionatorios públicos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[#1E40AF]">
              Cómo funciona
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A]">
              Del cero a auditable{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6]">
                en una mañana
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#1E40AF] via-[#1E40AF]/40 to-transparent md:left-1/2 md:-translate-x-px" />

            {[
              {
                step: '01',
                title: 'Onboarding asistido por IA',
                desc: 'El wizard te pregunta tu sector, equipo, sistemas y bases de tratamiento. La IA mapea automáticamente tu universo LOPDP y propone el RAT inicial, EIPDs y plantillas legales.',
                icon: Workflow,
              },
              {
                step: '02',
                title: 'Genera artefactos firmados',
                desc: 'Política de privacidad, contratos de encargo (DPA), avisos de privacidad y consentimientos digitales — todo generado con citas a la LOPDP/RGLOPDP y firmable con cert ARCOTEL.',
                icon: FileCheck,
              },
              {
                step: '03',
                title: 'Opera y mantén compliance',
                desc: 'Cron diario revisa ARCO vencidas, brechas pendientes, consents caducos. Notificaciones por WhatsApp al DPO. Audit log inmutable con hash chain Merkle. Listo para auditoría SPDP.',
                icon: Database,
              },
            ].map((s, i) => (
              <div
                key={s.step}
                className={`relative mb-10 flex flex-col items-start md:items-center ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-8 -translate-x-1/2 md:left-1/2 z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#1E40AF] bg-white shadow-lg shadow-blue-200/40">
                    <s.icon className="h-7 w-7 text-[#1E40AF]" />
                  </div>
                </div>

                {/* Card */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-lg transition shadow-sm">
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#1E40AF]">
                      Paso {s.step}
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-[#0F172A]">{s.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEMO CREDENTIALS ─────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-white p-8 sm:p-12 shadow-xl shadow-amber-100/30">
            <div className="absolute top-0 right-0 h-72 w-72 bg-amber-100/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 bg-blue-100/40 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1">
                  <KeyRound className="h-3 w-3 text-amber-700" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-700">
                    Acceso instantáneo
                  </span>
                </div>
                <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
                  Pruébalo ahora con datos reales
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Demo cargada con <span className="text-[#0F172A] font-semibold">3 tenants</span> (clínica,
                  fintech, consultora legal), <span className="text-[#0F172A] font-semibold">17 activos</span>,
                  <span className="text-[#0F172A] font-semibold"> 9 RATs</span>,{' '}
                  <span className="text-[#0F172A] font-semibold">6 evaluaciones de ciberseguridad</span> y
                  audit log con hash chain válido. Sin registro, sin tarjeta.
                </p>
              </div>

              <div className="space-y-3">
                <CredentialRow
                  label="Email"
                  value={DEMO_EMAIL}
                  copied={copied === 'email'}
                  onCopy={() => copy(DEMO_EMAIL, 'email')}
                />
                <CredentialRow
                  label="Password"
                  value={DEMO_PASSWORD}
                  copied={copied === 'pass'}
                  onCopy={() => copy(DEMO_PASSWORD, 'pass')}
                />
                <a
                  href={`${APP_URL}/login`}
                  className="group mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#0F172A] px-6 py-3.5 text-[15px] font-medium text-white hover:bg-[#1E293B] transition shadow-lg shadow-slate-900/15"
                >
                  Entrar a la demo
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPLIANCE FRAMEWORKS ────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="inline-block rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-600">
              Marcos cubiertos
            </span>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#0F172A]">
              Cobertura{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6]">
                regulatoria total
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: 'LOPDP Ecuador',
                items: ['Ley Orgánica de Protección de Datos Personales', 'Reglamento General (RGLOPDP)', '14 resoluciones SPDP vigentes'],
                primary: true,
              },
              {
                title: 'Ley de Ciberseguridad Ecuador',
                items: ['Mapeo a ISO 27001 + NIST CSF', '20 controles evaluables', 'Roadmap GAP exportable'],
              },
              {
                title: 'Internacional (opcional)',
                items: ['GDPR (Unión Europea) — Arts. 30, 35, 46', 'HIPAA (USA) — Privacy + Breach Notification §164.404', 'Toggles de activación sin costo extra'],
              },
              {
                title: 'Trazabilidad y firma',
                items: ['Hash chain Merkle del audit log (no repudio)', 'Firma PAdES con certificado ARCOTEL', 'Inmutabilidad criptográfica de evidencias'],
              },
            ].map((g) => (
              <div
                key={g.title}
                className={`rounded-xl border p-6 transition hover:shadow-lg ${
                  g.primary
                    ? 'border-[#1E40AF]/30 bg-gradient-to-br from-blue-50 to-white shadow-blue-100/30 shadow-md'
                    : 'border-slate-200 bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    className={`h-5 w-5 ${g.primary ? 'text-[#1E40AF]' : 'text-slate-500'}`}
                  />
                  <h3 className="text-lg font-bold text-[#0F172A]">{g.title}</h3>
                  {g.primary && (
                    <span className="ml-auto rounded-full bg-[#1E40AF]/10 border border-[#1E40AF]/20 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#1E40AF]">
                      Primary
                    </span>
                  )}
                </div>
                <ul className="mt-4 space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF / TESTIMONIOS ─────────────────────────────── */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-700">
              <Star className="inline h-3 w-3 mr-1 -mt-0.5 fill-current" />
              Confían en SHIELDDATA
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A]">
              Equipos de compliance{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1E40AF] to-[#8B5CF6]">
                que duermen tranquilos
              </span>
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              Profesionales DPO, CISO y Legal que pasaron de auditorías
              manuales a tener compliance trazable en una herramienta.
            </p>
          </div>

          {/* Featured testimonial (grande) + 2 laterales */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Featured */}
            <div className="lg:col-span-2 rounded-2xl border border-[#1E40AF]/20 bg-gradient-to-br from-blue-50 via-white to-white p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-64 w-64 bg-blue-100/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <Quote className="h-10 w-10 text-[#1E40AF]/30" />
              <blockquote className="relative mt-6 text-xl sm:text-2xl font-medium leading-relaxed tracking-tight text-[#0F172A]">
                &ldquo;Antes pasábamos <span className="bg-yellow-100 px-1">3 semanas</span> armando
                el expediente cada vez que el directorio pedía un reporte de cumplimiento.
                Con SHIELDDATA lo genero firmado en <span className="bg-yellow-100 px-1">30 segundos</span>.
                Modo Inspección es exactamente lo que la SPDP espera ver.&rdquo;
              </blockquote>
              <div className="relative mt-8 flex items-center gap-4">
                <Avatar initials="MG" color="#1E40AF" />
                <div>
                  <div className="font-bold text-[#0F172A]">Dra. María González</div>
                  <div className="text-sm text-slate-600">DPO · Clínica San Rafael</div>
                  <div className="text-xs text-slate-500 mt-0.5">Sector salud · 250+ empleados · Quito</div>
                </div>
              </div>
            </div>

            {/* Side testimonials */}
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-amber-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-700 leading-relaxed">
                  &ldquo;Implementamos los 17 contenidos del RAT en una mañana. La IA propone bases de licitud
                  con citas a la LOPDP — nuestro abogado externo solo revisa, no construye desde cero.&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar initials="CT" color="#059669" />
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">Carlos Terán</div>
                    <div className="text-xs text-slate-500">CISO · TechMarket Ecuador</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-amber-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-700 leading-relaxed">
                  &ldquo;El portal público ARCO con nuestra marca nos quitó 60% de tickets repetitivos.
                  Los titulares se auto-atienden y nosotros solo aprobamos.&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar initials="SP" color="#7C3AED" />
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">Sofía Paredes</div>
                    <div className="text-xs text-slate-500">Legal Counsel · LegalCompliance Consultores</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust signals (chips de sectores) */}
          <div className="mt-14 pt-10 border-t border-slate-200">
            <p className="text-center text-xs font-mono uppercase tracking-[0.18em] text-slate-500 mb-6">
              Construido para responsables del tratamiento en Ecuador
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-red-500" />
                Sector salud
              </span>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                Fintech
              </span>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-amber-600" />
                Retail y E-commerce
              </span>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-violet-600" />
                Educación
              </span>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-2">
                <Landmark className="h-4 w-4 text-sky-600" />
                Sector público
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full border border-slate-300 bg-white px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-600">
              Preguntas frecuentes
            </span>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#0F172A]">
              Lo que más nos preguntan
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ.map((q, i) => (
              <div
                key={q.q}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition"
                >
                  <span className="font-semibold text-[#0F172A]">{q.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform flex-shrink-0 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed">{q.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="relative py-24 border-t border-slate-200 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E40AF] overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Shield className="mx-auto h-12 w-12 text-sky-300 mb-6" />
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            ¿Listo para dormir tranquilo{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-blue-200">
              con tu compliance?
            </span>
          </h2>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl mx-auto">
            Empieza con la demo en minutos o agenda una llamada con nuestro equipo para
            armar un plan a tu medida.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${APP_URL}/login`}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-[15px] font-medium text-[#0F172A] hover:bg-slate-100 transition shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Probar demo gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={waURL('demo')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 backdrop-blur px-6 py-3.5 text-[15px] font-medium text-white hover:bg-white/20 transition"
            >
              <PhoneCall className="h-4 w-4" />
              Hablar con ventas
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <ShieldDataMark className="h-7 w-7 text-[#1E40AF]" />
              <div>
                <div className="font-bold tracking-tight text-[#0F172A]">SHIELDDATA</div>
                <div className="text-xs text-slate-500">
                  Un producto de{' '}
                  <button onClick={goBack} className="text-[#1E40AF] hover:underline font-medium">
                    AmePhia Systems
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <a
                href={APP_URL}
                className="text-slate-600 hover:text-[#0F172A] transition"
                target="_blank"
                rel="noreferrer"
              >
                <Globe className="inline h-4 w-4 mr-1" />
                shieldata.amephia.com
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-slate-600 hover:text-[#0F172A] transition"
              >
                <Mail className="inline h-4 w-4 mr-1" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={waURL('contact')}
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-[#0F172A] transition"
              >
                <PhoneCall className="inline h-4 w-4 mr-1" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} AmePhia Systems Inc. Todos los derechos reservados.</p>
            <p className="italic max-w-xl">
              SHIELDDATA es una plataforma propietaria de cumplimiento. Los indicadores
              heurísticos internos no constituyen dictamen legal — la verificación formal del
              cumplimiento LOPDP corresponde a la SPDP.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   SUBCOMPONENTS
   ────────────────────────────────────────────────────────────────────────── */

const FeatureCard = ({
  kf,
  icon,
  accent,
  title,
  desc,
}: {
  kf: string;
  icon: React.ReactNode;
  accent: 'orange' | 'violet' | 'emerald' | 'amber';
  title: string;
  desc: string;
}) => {
  const accentMap = {
    orange: 'border-orange-200 bg-orange-50 group-hover:border-orange-300',
    violet: 'border-violet-200 bg-violet-50 group-hover:border-violet-300',
    emerald: 'border-emerald-200 bg-emerald-50 group-hover:border-emerald-300',
    amber: 'border-amber-200 bg-amber-50 group-hover:border-amber-300',
  };
  const labelColorMap = {
    orange: 'text-orange-600',
    violet: 'text-violet-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
  };
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-lg transition shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg border transition ${accentMap[accent]}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-mono uppercase tracking-wider ${labelColorMap[accent]}`}>
          {kf}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#0F172A] leading-snug">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
};

const Avatar = ({ initials, color }: { initials: string; color: string }) => (
  <div
    className="flex h-12 w-12 items-center justify-center rounded-full text-white text-sm font-bold tracking-tight shadow-md flex-shrink-0"
    style={{ backgroundColor: color }}
    aria-hidden
  >
    {initials}
  </div>
);

const CredentialRow = ({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{label}</div>
    <div className="mt-1 flex items-center justify-between gap-3">
      <code className="text-sm sm:text-base font-mono text-[#0F172A] truncate">{value}</code>
      <button
        onClick={onCopy}
        className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-mono transition ${
          copied
            ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
            : 'border-slate-300 bg-white text-slate-600 hover:text-[#0F172A] hover:border-slate-400'
        }`}
      >
        {copied ? (
          <>
            <CheckCircle2 className="h-3 w-3" /> Copiado
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" /> Copiar
          </>
        )}
      </button>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
   FAQ DATA
   ────────────────────────────────────────────────────────────────────────── */
const FAQ = [
  {
    q: '¿Quién es responsable legalmente del cumplimiento, SHIELDDATA o mi empresa?',
    a: 'Tu empresa es la responsable del tratamiento ante la SPDP. SHIELDDATA es la herramienta que te permite construir, mantener y demostrar el cumplimiento — pero el dictamen legal final corresponde a tu DPO/abogado y a la Superintendencia. Los indicadores internos de la plataforma son heurísticos y están claramente etiquetados como tal.',
  },
  {
    q: '¿Dónde se almacenan los datos? ¿Cumple el Art. 55 LOPDP de transferencias internacionales?',
    a: 'Por defecto los datos residen en infraestructura DigitalOcean NYC3, EE.UU. Como receptor califica bajo el régimen de "país con nivel adecuado de protección" si activas las cláusulas contractuales tipo (incluidas en el contrato de servicio). Para clientes que requieran residencia local, ofrecemos despliegue on-premise en Ecuador con licenciamiento separado.',
  },
  {
    q: '¿Tiene firma electrónica avanzada compatible con ARCOTEL?',
    a: 'Sí. Integramos certificados emitidos por las 8 entidades certificadoras autorizadas (Security Data, BCE, ANF AC, FIRMASEGURA, etc.). Generamos documentos PAdES, XAdES y CAdES con sellado de tiempo TSA. Los avisos de privacidad, contratos de encargo y notificaciones a SPDP pueden firmarse en línea desde la plataforma.',
  },
  {
    q: '¿Cómo se notifica una brecha de datos a la SPDP?',
    a: 'El módulo de brechas calcula automáticamente la severidad con LINDDUN, dispara el contador de 72h del Art. 46 LOPDP, genera el formulario oficial SPDP-BRE-v1 con todos los campos requeridos, te permite firmarlo electrónicamente y exporta el JSON canónico para envío. También notifica al DPO por WhatsApp/email y al titular cuando aplica.',
  },
  {
    q: '¿Qué pasa si la SPDP me inspecciona?',
    a: 'Activas el "Modo Inspección" (un click). El sistema congela en 30 segundos un expediente firmado PAdES con RAT vigente, EIPDs aprobadas, contratos de encargo activos, brechas reportadas, solicitudes ARCO resueltas, política de privacidad y audit log con hash chain Merkle. Generas un token público para el inspector, con expiración y trazabilidad total.',
  },
  {
    q: '¿Qué incluye el plan? ¿Hay límites de usuarios o registros?',
    a: 'El plan estándar incluye usuarios ilimitados, RAT/EIPD/ARCO/brechas ilimitados, hasta 50 GB de almacenamiento documental, 1 tenant, soporte por WhatsApp en horario laboral y actualizaciones de la plataforma. Hay add-ons para multi-tenant, on-premise, SLA enterprise y módulos verticales (salud, fintech). Hablemos del precio según tu volumen y necesidades.',
  },
];

export default ShieldDataLanding;
