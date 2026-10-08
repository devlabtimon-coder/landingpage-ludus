import { useState } from 'react';
import { Check, Plus } from 'lucide-react';

type Plan = {
  name: string;
  price: string;
  period?: string;
  audience: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: 'Peão',
    price: 'Gratuito',
    audience: 'Para quem está começando',
    features: [
      'Até 30 jogos cadastrados',
      'Até 2 administradores',
      'Aprovação de cadastro com documentos',
      'Tiers Latão e Bronze ativos',
      'Controle de aluguéis e devoluções',
      'App Ludus para os seus usuários',
    ],
    cta: 'Começar grátis',
  },
  {
    name: 'Mestre',
    price: 'R$ 59',
    period: '/mês',
    audience: 'Para lojas, escolas e espaços com fluxo ativo',
    features: [
      'Jogos ilimitados',
      'Até 15 administradores',
      'Todos os tiers e categorias de usuário',
      'Temporadas com ranking e cupons de recompensa',
      'Importação de jogos via BGG e Ludopedia',
      'Dashboard com métricas do acervo',
      'Histórico completo por usuário',
    ],
    cta: 'Assinar Mestre',
    featured: true,
  },
  {
    name: 'Lendário',
    price: 'R$ 99',
    period: '/mês',
    audience: 'Para instituições e grandes acervos',
    features: [
      'Tudo do plano Mestre',
      'Administradores ilimitados',
      'Relatórios exportáveis em PDF',
      'Logs de auditoria',
      'Controle de manutenção e checklist de componentes',
      'Onboarding personalizado',
    ],
    cta: 'Falar com a equipe',
  },
];

const FAQS = [
  {
    q: 'Posso cancelar a qualquer momento?',
    a: 'Sim. Você pode cancelar o plano quando quiser, sem multa nem taxa adicional.',
  },
  {
    q: 'Como os meus usuários acessam o acervo?',
    a: 'Pelo aplicativo Ludus no celular. Lá eles se cadastram, enviam os documentos, consultam o catálogo e acompanham os próprios aluguéis. A equipe gestora usa o painel web.',
  },
  {
    q: 'Preciso cadastrar cada jogo à mão?',
    a: 'Não. O painel importa os dados dos jogos a partir do BoardGameGeek e da Ludopedia, e você só completa exemplares, componentes e o tier de cada um.',
  },
];

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="planos" className="bg-lavender py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl leading-tight font-black text-ink sm:text-[2.6rem]">Escolha o nível certo para o seu acervo</h2>
          <p className="mt-4 text-lg text-ink-mute">Mensalidade fixa. Sem percentual sobre os seus aluguéis.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-[1.75rem] p-7 sm:p-8 ${
                plan.featured
                  ? 'bg-indigo text-white shadow-[0_24px_48px_rgba(49,53,139,0.35)] lg:-my-4 lg:py-12'
                  : 'bg-white text-ink ring-1 ring-indigo/10'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-7 rounded-full bg-yellow px-3.5 py-1.5 text-xs font-black tracking-wider text-navy uppercase">
                  Recomendado
                </span>
              )}
              <h3 className="text-2xl font-black">Plano {plan.name}</h3>
              <p className={`mt-1 text-[15px] ${plan.featured ? 'text-[#D7DBFF]' : 'text-ink-mute'}`}>{plan.audience}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className={`font-display text-5xl font-black tabular ${plan.featured ? 'text-yellow' : 'text-indigo'}`}>
                  {plan.price}
                </span>
                {plan.period && <span className={plan.featured ? 'text-[#D7DBFF]' : 'text-ink-mute'}>{plan.period}</span>}
              </p>

              <ul className={`mt-7 flex-1 space-y-3 border-t pt-7 ${plan.featured ? 'border-white/15' : 'border-line'}`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                        plan.featured ? 'bg-yellow text-navy' : 'bg-lavender-3 text-indigo'
                      }`}
                    >
                      <Check size={12} strokeWidth={3.5} />
                    </span>
                    <span className={`text-[15px] leading-snug ${plan.featured ? 'text-white' : 'text-ink-soft'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className={`mt-8 flex h-14 items-center justify-center rounded-2xl font-extrabold transition-colors ${
                  plan.featured
                    ? 'bg-yellow text-navy hover:bg-yellow-600'
                    : 'border-2 border-indigo text-indigo hover:bg-indigo hover:text-white'
                }`}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          <h3 className="text-2xl font-black text-ink">Perguntas frequentes</h3>
          <div className="mt-6 divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-indigo/10">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <h4>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold text-ink transition-colors hover:bg-lavender"
                    >
                      {f.q}
                      <Plus
                        size={22}
                        strokeWidth={2.5}
                        className={`shrink-0 text-red transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                      />
                    </button>
                  </h4>
                  <div id={`faq-${i}`} hidden={!open} className="px-6 pb-5 text-[16px] leading-relaxed text-ink-mute">
                    {f.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
