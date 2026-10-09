import { useState, type FormEvent, type ReactNode } from 'react';
import logoColor from './assets/logo-h-color.webp';
import logoNegative from './assets/logo-h-negative.webp';
import logoSymbol from './assets/symbol.webp';
import ludusApp from '../assets/prints/app-home.webp';

// Pedidos de contato vão por e-mail via FormSubmit (mesmo serviço da landing do Ludus).
// No primeiro envio o FormSubmit pede confirmação por e-mail ao destinatário.
const CONTACT_EMAIL = 'nara.chaves@ifma.edu.br';
const CONTACT_ENDPOINT =
  (import.meta.env.VITE_COCAIS_CONTACT_ENDPOINT as string | undefined) || `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const LUDUS_URL = '/ludus/';

// Canais diretos da CocaisTech. Os vazios não aparecem na página até receberem o dado real.
const CHANNELS: { icon: IconName; label: string; value: string; href: string }[] = [
  { icon: 'message', label: 'WhatsApp', value: '', href: '' },
  { icon: 'mail', label: 'E-mail', value: '', href: '' },
  { icon: 'social', label: 'Instagram ou LinkedIn', value: '', href: '' },
];

type IconName =
  | 'arrow'
  | 'automation'
  | 'briefcase'
  | 'chart'
  | 'check'
  | 'code'
  | 'education'
  | 'game'
  | 'layers'
  | 'mail'
  | 'menu'
  | 'message'
  | 'palette'
  | 'social'
  | 'tools'
  | 'x';

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  automation: (
    <>
      <path d="M20 7h-7m7 0-3-3m3 3-3 3M4 17h7m-7 0 3 3m-3-3 3-3" />
      <path d="M14.5 14.5a4 4 0 0 1-5-5" />
    </>
  ),
  briefcase: (
    <>
      <path d="M9 7V5h6v2M4 8h16v11H4z" />
      <path d="M4 12c4 2 12 2 16 0M10 12h4" />
    </>
  ),
  chart: <path d="M4 19V9m6 10V5m6 14v-7m4 7H2" />,
  check: <path d="m5 12 4 4L19 6" />,
  code: <path d="m8 9-3 3 3 3m8-6 3 3-3 3m-3-9-2 12" />,
  education: (
    <>
      <path d="m3 10 9-5 9 5-9 5-9-5Z" />
      <path d="M7 12.5V17c3 2 7 2 10 0v-4.5M21 10v6" />
    </>
  ),
  game: (
    <>
      <path d="M8 8h8a5 5 0 0 1 4.6 6.9l-.5 1.2a2.5 2.5 0 0 1-4 1l-1.3-1.1H9.2l-1.3 1.1a2.5 2.5 0 0 1-4-1l-.5-1.2A5 5 0 0 1 8 8Z" />
      <path d="M7 12h4m-2-2v4m7-2h.01m2 2h.01" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  mail: (
    <>
      <rect height="14" rx="2" width="18" x="3" y="5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  message: (
    <>
      <path d="M20 11.5a8 8 0 0 1-12.8 6.4L3 19l1.1-4.1A8 8 0 1 1 20 11.5Z" />
      <path d="M8 11.5h.01m4-.01h.01m4 .01h.01" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 0-4H12a1.5 1.5 0 0 1 0-3h2a7 7 0 0 0-2-11Z" />
      <path d="M7.5 10h.01M10 6.5h.01M15 7h.01M17 11h.01" />
    </>
  ),
  social: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="m8.2 10.8 7.6-3.6m-7.6 6 7.6 3.6" />
    </>
  ),
  tools: (
    <>
      <path d="M14 6a4 4 0 0 0-5 5L3.5 16.5a2.1 2.1 0 0 0 3 3L12 14a4 4 0 0 0 5-5l-2.5 2.5-2-2L14 6Z" />
      <path d="m15 15 5 5" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {iconPaths[name]}
      </g>
    </svg>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  kind?: 'primary' | 'outline' | 'ludus' | 'dark';
  type?: 'button' | 'submit';
  disabled?: boolean;
};

function Button({ children, href, kind = 'primary', type = 'button', disabled }: ButtonProps) {
  const className = `button button--${kind}`;
  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }
  return (
    <button className={className} type={type} disabled={disabled}>
      {children}
    </button>
  );
}

const solutions: { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'code',
    title: 'Sistemas web e mobile',
    description: 'Aplicativos multiplataforma e interfaces administrativas pensados para quem usa e para quem gerencia.',
  },
  {
    icon: 'automation',
    title: 'Automação de processos',
    description: 'Substituímos planilhas e registros físicos por fluxos digitais confiáveis, com histórico e métricas.',
  },
  {
    icon: 'education',
    title: 'Plataformas educacionais',
    description: 'Soluções que aproximam tecnologia, ludicidade e aprendizagem em instituições de ensino.',
  },
  {
    icon: 'chart',
    title: 'Gestão e relatórios',
    description: 'Dashboards e indicadores que ajudam a decidir com base em dados, não em achismos.',
  },
  {
    icon: 'layers',
    title: 'Integração com APIs',
    description: 'Autenticação, notificações e bases de dados externas conectadas ao seu sistema.',
  },
  {
    icon: 'palette',
    title: 'Design de interfaces',
    description: 'Protótipos navegáveis e identidade visual consistente, validados antes de programar.',
  },
];

const differences = [
  ['Soluções sob medida', 'Nada de pacote pronto: construímos a partir da sua realidade.'],
  ['Metodologia ágil', 'Entregas em ciclos curtos, com validação contínua junto aos usuários.'],
  ['Tecnologia moderna', 'React, TypeScript, Node.js e PostgreSQL, com código limpo e documentado.'],
  ['Foco em experiência', 'Interfaces intuitivas, responsivas e acessíveis.'],
];

const steps = [
  ['01', 'Escuta', 'Entendemos o processo atual e os objetivos.'],
  ['02', 'Protótipo', 'Você enxerga e valida a solução antes da codificação.'],
  ['03', 'Desenvolvimento', 'Entregas incrementais com acompanhamento.'],
  ['04', 'Evolução', 'Testes com usuários reais e melhoria contínua.'],
];

const ludusFeatures = [
  'Catálogo com busca e filtros por jogadores, categoria e disponibilidade',
  'Reservas, empréstimos, histórico e notificações',
  'Ranking, cupons e progressão de categorias: Starter, Family, Expert e Ultragamer',
  'Gestão de acervo, usuários, relatórios, temporadas e mecânicas de jogos',
];

// 43 jogos: contagem do acervo publicado na API do Ludus em outubro de 2026.
const stats: [string, string, string?][] = [
  ['43', 'jogos no acervo'],
  ['5', 'tiers de jogos', 'Latão a Diamante'],
  ['4', 'categorias de usuários'],
  ['2', 'plataformas', 'app e web'],
];

const NAV = [
  { href: '#solucoes', label: 'Soluções' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#contato', label: 'Contato' },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav aria-label="Navegação principal" className="container nav">
        <a aria-label="CocaisTech, início" className="logo" href="#inicio" onClick={closeMenu}>
          <img alt="CocaisTech" src={logoColor} width={1200} height={265} />
        </a>
        <button
          aria-controls="main-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          className="menu-toggle"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          <Icon name={isOpen ? 'x' : 'menu'} size={26} />
        </button>
        <ul className={isOpen ? 'nav-menu is-open' : 'nav-menu'} id="main-menu">
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a className="nav-ludus" href="#ludus" onClick={closeMenu}>
              Projeto Ludus
            </a>
          </li>
          <li>
            <a className="nav-hire" href="#contrate" onClick={closeMenu}>
              Nos contrate
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? 'section-heading section-heading--center' : 'section-heading'}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

type Status = 'idle' | 'sending' | 'sent' | 'error';
const INTERESTS = [
  'Sistema web ou mobile',
  'Automação de processos',
  'Plataforma educacional',
  'Conhecer o Projeto Ludus',
  'Solicitar orçamento',
  'Outro assunto',
];

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get('nome') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const mensagem = String(data.get('mensagem') ?? '').trim();
    const nextErrors: Record<string, string> = {};
    if (!nome) nextErrors.nome = 'Informe seu nome.';
    if (!email) nextErrors.email = 'Informe seu e-mail.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Informe um e-mail válido, como voce@email.com.';
    if (!mensagem) nextErrors.mensagem = 'Conte um pouco sobre o projeto.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus('sending');
    try {
      const interesse = String(data.get('interesse'));
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Nome: nome,
          'E-mail': email,
          Interesse: interesse,
          Mensagem: mensagem,
          _replyto: email,
          _subject: `Contato pelo site da CocaisTech: ${interesse}`,
          _template: 'table',
          _honey: String(data.get('_honey') ?? ''),
        }),
      });
      const result = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || String(result.success) !== 'true') throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div aria-live="polite" className="form-success" role="status">
        <span className="success-icon">
          <Icon name="check" size={18} />
        </span>
        <div>
          Mensagem enviada! Entraremos em contato em breve.
          <button type="button" className="form-again" onClick={() => setStatus('idle')}>
            Enviar outra mensagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="nome">Nome</label>
        <input
          aria-describedby={errors.nome ? 'nome-error' : undefined}
          aria-invalid={Boolean(errors.nome)}
          autoComplete="name"
          id="nome"
          name="nome"
          placeholder="Seu nome"
          type="text"
        />
        {errors.nome && (
          <span className="field-error" id="nome-error">
            {errors.nome}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          id="email"
          name="email"
          placeholder="voce@email.com"
          type="email"
        />
        {errors.email && (
          <span className="field-error" id="email-error">
            {errors.email}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="interesse">Interesse</label>
        <select defaultValue={INTERESTS[0]} id="interesse" name="interesse">
          {INTERESTS.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
          aria-invalid={Boolean(errors.mensagem)}
          id="mensagem"
          name="mensagem"
          placeholder="Conte um pouco sobre o seu projeto"
        />
        {errors.mensagem && (
          <span className="field-error" id="mensagem-error">
            {errors.mensagem}
          </span>
        )}
      </div>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="honey" />
      {status === 'error' && (
        <p role="alert" className="form-error">
          Não conseguimos enviar agora. Tente de novo em instantes ou escreva para{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}
      <Button kind="dark" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
      </Button>
    </form>
  );
}

export default function App() {
  const channels = CHANNELS.filter((c) => c.value);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="inicio">
        <section className="hero" id="conteudo">
          <div className="hero-glow" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="hero-badge">Startup de tecnologia e inovação</span>
              <h1>
                Sua ideia merece tecnologia que <em>funciona de verdade.</em>
              </h1>
              <p>
                A CocaisTech cria sistemas web e mobile, automações e plataformas digitais sob medida, transformando
                processos manuais em experiências rápidas, organizadas e envolventes.
              </p>
              <div className="hero-actions">
                <Button href="#contato">Quero tirar meu projeto do papel</Button>
                <Button href="#ludus" kind="outline">
                  Conhecer o Projeto Ludus <Icon name="arrow" size={18} />
                </Button>
              </div>
              <a className="hero-hire-link" href="#contrate">
                Nos contrate <Icon name="arrow" size={17} />
              </a>
            </div>
            <aside className="delivery-card">
              <h2>O que entregamos</h2>
              {(
                [
                  ['code', 'Apps e sistemas', 'Web, mobile e painéis administrativos'],
                  ['automation', 'Automação', 'Menos retrabalho, mais controle'],
                  ['game', 'Gamificação', 'Engajamento com ranking, pontos e cupons'],
                ] as [IconName, string, string][]
              ).map(([icon, title, text]) => (
                <div className="delivery-item" key={title}>
                  <div className="delivery-icon">
                    <Icon name={icon} size={21} />
                  </div>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="section solutions" id="solucoes">
          <div className="container">
            <SectionHeading
              centered
              description="Cada projeto começa na escuta e termina em um produto pronto para o uso real."
              eyebrow="Soluções"
              title="Tecnologia sob medida para cada desafio"
            />
            <div className="solutions-grid">
              {solutions.map((s) => (
                <article className="solution-card" key={s.title}>
                  <div className="solution-icon">
                    <Icon name={s.icon} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section differences" id="diferenciais">
          <div className="container differences-grid">
            <div>
              <SectionHeading eyebrow="Por que a CocaisTech" title="Agilidade de startup, rigor de engenharia." />
              <div className="difference-list">
                {differences.map(([title, text]) => (
                  <div className="difference-item" key={title}>
                    <span className="check-circle">
                      <Icon name="check" size={16} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div aria-label="Nossa metodologia" className="method-card" role="group">
              {steps.map(([number, title, text]) => (
                <div className="method-step" key={number}>
                  <b>{number}</b>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section ludus" id="ludus">
          <div className="ludus-orb" />
          <div className="container ludus-grid">
            <div>
              <div className="made-by">
                <img alt="" src={logoSymbol} width={160} height={178} />
                <span>Desenvolvido pela CocaisTech</span>
              </div>
              <SectionHeading
                description="Sistema de aluguel de jogos de tabuleiro do Projeto de Ensino Ludus, no IFMA Campus Timon. Um aplicativo mobile para a comunidade acadêmica e uma interface web para a gestão do acervo, substituindo registros manuais por um processo digital, organizado e envolvente."
                eyebrow="Projeto em destaque"
                title="Ludus: o acervo de jogos do IFMA na palma da mão"
              />
              <div className="chips">
                {['IFMA Campus Timon', 'App mobile', 'Painel web administrativo', 'Gamificação'].map((chip) => (
                  <span className="chip" key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
              <ul className="ludus-features">
                {ludusFeatures.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={17} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a className="button button--ludus" href={LUDUS_URL}>
                Conhecer o Ludus <Icon name="arrow" size={18} />
              </a>
            </div>
            <div className="ludus-visual">
              <figure className="ludus-phone">
                <img
                  src={ludusApp}
                  alt="Tela inicial do app Ludus com o desempenho na temporada e jogos sugeridos"
                  width={660}
                  height={1428}
                />
              </figure>
            </div>
          </div>
          <div className="container">
            <div className="stats-grid">
              {stats.map(([number, label, detail]) => (
                <article className="stat-card" key={label}>
                  <strong>{number}</strong>
                  <span>{label}</span>
                  {detail && <small>{detail}</small>}
                </article>
              ))}
            </div>
            <p className="stack">React Native + Expo · Node.js + Express · PostgreSQL + Prisma</p>
          </div>
        </section>

        <section className="section hire" id="contrate">
          <div className="container">
            <SectionHeading
              centered
              description="Conte o que você precisa e receba uma proposta alinhada ao seu contexto, sem pacote pronto e sem compromisso."
              eyebrow="Nos contrate"
              title="Tem um desafio? Vamos transformá-lo em solução."
            />
            <div className="hire-cards">
              {(
                [
                  {
                    icon: 'briefcase',
                    title: 'Projeto sob medida',
                    description:
                      'Do levantamento de requisitos à entrega do sistema web ou mobile, com acompanhamento em cada etapa.',
                  },
                  {
                    icon: 'palette',
                    title: 'Protótipo e consultoria',
                    description:
                      'Validação da ideia com protótipo navegável e orientação técnica antes de investir no desenvolvimento.',
                  },
                  {
                    icon: 'tools',
                    title: 'Manutenção e evolução',
                    description: 'Suporte, correções e novas funcionalidades para sistemas que já estão em uso.',
                  },
                ] as { icon: IconName; title: string; description: string }[]
              ).map((item) => (
                <article className="hire-card" key={item.title}>
                  <div className="solution-icon">
                    <Icon name={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href="#contato">
                    Solicitar proposta <Icon name="arrow" size={16} />
                  </a>
                </article>
              ))}
            </div>
            <div aria-label="Como contratar" className="hire-steps" role="group">
              {[
                ['01', 'Conte sua ideia', 'Fale sobre o problema, o público e os objetivos.'],
                ['02', 'Receba a proposta', 'Retornamos com escopo, etapas e estimativa.'],
                ['03', 'Comece o projeto', 'Aprovado o escopo, iniciamos com entregas incrementais.'],
              ].map(([number, title, description]) => (
                <div className="hire-step" key={number}>
                  <b>{number}</b>
                  <div>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={channels.length ? 'hire-cta' : 'hire-cta hire-cta--solo'}>
              <div>
                <h3>Pronto para começar?</h3>
                <p>Compartilhe seu desafio para construirmos a melhor solução juntos.</p>
                <Button href="#contato">Solicitar orçamento</Button>
              </div>
              {channels.length > 0 && (
                <ul className="channels">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <span className="channel-icon">
                        <Icon name={c.icon} size={20} />
                      </span>
                      <div>
                        <small>{c.label}</small>
                        <a href={c.href}>
                          <strong>{c.value}</strong>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <section className="section cta">
          <div className="container">
            <div className="cta-card">
              <h2>Pronto para levar seu projeto ao próximo nível?</h2>
              <p>Conte o seu desafio. Vamos desenhar juntos a solução digital certa para o seu contexto.</p>
              <div className="cta-actions">
                <Button href="#contato">Falar com a CocaisTech</Button>
                <Button href="#ludus" kind="outline">
                  Ver o Projeto Ludus
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact" id="contato">
          <div className="container">
            <SectionHeading
              centered
              description="Preencha o formulário e retornaremos o mais breve possível."
              eyebrow="Contato"
              title="Vamos conversar?"
            />
            <div className="contact-card">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-inner">
          <div className="footer-brand">
            <img alt="CocaisTech" src={logoNegative} width={1200} height={265} />
            <p>© {new Date().getFullYear()} CocaisTech. Todos os direitos reservados.</p>
          </div>
          <nav aria-label="Links do rodapé">
            <a href="#solucoes">Soluções</a>
            <a href={LUDUS_URL}>Projeto Ludus</a>
            <a href="#contato">Contato</a>
            <a href="#contrate">Nos contrate</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
