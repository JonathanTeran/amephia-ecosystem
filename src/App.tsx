import { Shell } from './components/layout/Shell';
import { Header } from './components/Header';
import { BentoGrid } from './components/layout/BentoGrid';
import { GymModule } from './components/modules/GymModule';
import { FacturacionModule } from './components/modules/FacturacionModule';
import { SatelliteModule } from './components/modules/SatelliteModule';

import { InfoSection } from './components/InfoSection';
import { GymErpSection } from './components/GymErpSection';
import { ContactSection } from './components/ContactSection';

function App() {
  return (
    <Shell>
      <Header />
      <BentoGrid>
        <GymModule />
        <FacturacionModule />
        <SatelliteModule title="POS" type="pos" delay={0.3} />
        <SatelliteModule title="NUTRI" type="nutri" delay={0.4} />
      </BentoGrid>

      <GymErpSection />

      <InfoSection />

      <ContactSection />

      {/* Footer / Copyright */}
      <footer className="mt-24 border-t border-white/5 pt-8 flex justify-between items-center text-[10px] text-mutedText/40 font-mono tracking-widest uppercase">
        <span>AmePhia Systems Inc.</span>
        <span>© 2026</span>
      </footer>
    </Shell>
  );
}

export default App;
