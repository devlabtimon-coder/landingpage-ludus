import { useEffect, useRef, useState } from 'react';
import documentos from '../assets/prints/app-documentos.webp';
import cadastro from '../assets/prints/admin-cadastro.webp';
import jogo from '../assets/prints/app-jogo.webp';
import ranking from '../assets/prints/app-ranking.webp';

const STEPS: { title: string; body: string; img: string; alt: string }[] = [
  {
    title: 'O usuário se cadastra e envia documentos',
    body: 'Pelo app, com e-mail institucional, documento com foto e comprovante de endereço.',
    img: documentos,
    alt: 'Tela de documentação do app Ludus com o envio do documento de identificação',
  },
  {
    title: 'O gestor aprova no painel',
    body: 'Os documentos chegam no Cadastro Pendente. Você confere e aprova ou recusa com um clique.',
    img: cadastro,
    alt: 'Painel Ludus com cadastros aguardando aprovação e documentos anexados',
  },
  {
    title: 'Cada um aluga os jogos do seu nível',
    body: 'O app mostra o acervo inteiro, mas só libera o aluguel dos tiers que a categoria do usuário alcança.',
    img: jogo,
    alt: 'Página do jogo Wingspan no app Ludus, tier Ouro, disponível para aluguel',
  },
  {
    title: 'Cada devolução vale pontos',
    body: 'Devolver no prazo rende pontos na temporada. Dano ou peça perdida tira pontos.',
    img: ranking,
    alt: 'Ranking da temporada no app Ludus com pontos e níveis dos jogadores',
  },
];

export function HowItWorks() {
  const track = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(items.indexOf(e.target as HTMLElement));
        });
      },
      { root: el, threshold: 0.6 },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const el = track.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  return (
    <section id="como-funciona" className="bg-lavender py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl text-3xl leading-tight font-black text-ink sm:text-[2.6rem]">Como o Ludus funciona</h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-mute">
          Do cadastro à devolução, quatro passos que já rodam no app e no painel.
        </p>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute top-6 right-[12%] left-[12%] hidden border-t-[3px] border-dashed border-indigo/30 lg:block"
          />
          <ol
            ref={track}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0"
          >
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex w-[min(84vw,22rem)] shrink-0 snap-start flex-col lg:w-auto">
                <span className="relative z-10 mx-auto flex size-12 items-center justify-center rounded-full bg-navy font-display text-xl font-black text-white shadow-[0_6px_16px_rgba(4,9,109,0.3)] ring-6 ring-lavender">
                  {i + 1}
                </span>
                <div className="mt-5 flex flex-1 flex-col rounded-3xl bg-white p-5 shadow-[0_8px_24px_rgba(4,9,109,0.06)] ring-1 ring-indigo/[0.08]">
                  <h3 className="text-lg leading-tight font-extrabold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-mute">{step.body}</p>
                  <figure className="-mx-5 mt-5 -mb-5 flex flex-1 flex-col justify-end">
                    <div className="aspect-[1170/990] overflow-hidden rounded-b-3xl bg-lavender-2">
                      <img
                        src={step.img}
                        alt={step.alt}
                        loading="lazy"
                        className="size-full object-cover object-top"
                      />
                    </div>
                  </figure>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex justify-center gap-2 lg:hidden">
            {STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para o passo ${i + 1}`}
                aria-current={active === i}
                className={`h-2.5 rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-indigo' : 'w-2.5 bg-indigo/25'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
