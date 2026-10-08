import { ArrowDown, ArrowRight } from 'lucide-react';
import { SplashDecor } from './Decor';
import { Shelf } from './Shelf';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-indigo pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <SplashDecor />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1 className="text-[2.6rem] leading-[0.98] font-black tracking-[-0.02em] text-white sm:text-6xl lg:col-span-8 lg:text-[4.6rem]">
            Gerencie com segurança <span className="text-yellow">quem pode alugar</span> quais jogos do seu acervo.
          </h1>

          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-white/85">
              Aprovação de cadastro com documentos, níveis de acesso ao acervo e temporadas com ranking. Cada jogo
              chega a quem já provou que cuida dele.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow px-6 py-4 font-extrabold text-navy shadow-[0_10px_24px_rgba(4,9,109,0.35)] transition-colors hover:bg-yellow-600"
              >
                Solicitar demonstração
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/70 px-6 py-[14px] font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-indigo"
              >
                Ver como funciona
                <ArrowDown size={18} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>

        <Shelf />
      </div>
    </section>
  );
}
