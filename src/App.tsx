import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { HowItWorks } from './components/HowItWorks';
import { Levels } from './components/Levels';
import { InPractice } from './components/InPractice';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Footer, MobileCta } from './components/Footer';

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-xl bg-yellow px-4 py-2 font-bold text-navy focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Problem />
        <HowItWorks />
        <Levels />
        <InPractice />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
