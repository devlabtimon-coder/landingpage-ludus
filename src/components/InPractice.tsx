import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Download,
  Gamepad2,
  LayoutGrid,
  Search,
  Trophy,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';
import adminDashboard from '../assets/prints/admin-dashboard.webp';
import appHome from '../assets/prints/app-home.webp';

const ADMIN_FEATURES = [
  { icon: LayoutGrid, text: 'Dashboard com aluguéis ativos, atrasos e aprovações pendentes' },
  { icon: UserPlus, text: 'Cadastro pendente com análise dos documentos enviados' },
  { icon: Gamepad2, text: 'Acervo com exemplares, componentes e tier de cada jogo' },
  { icon: Download, text: 'Importação dos dados dos jogos via BGG e Ludopedia' },
  { icon: ClipboardCheck, text: 'Devolução com checklist de componentes e controle de manutenção' },
  { icon: BarChart3, text: 'Relatórios em PDF e logs de auditoria' },
];

const APP_FEATURES = [
  { icon: Search, text: 'Catálogo com filtros por jogadores, duração, tier e mecânica' },
  { icon: CalendarDays, text: 'Calendário de disponibilidade e aviso quando o jogo volta' },
  { icon: BookOpen, text: 'Vídeo de como jogar e Guia Ludus de mecânicas' },
  { icon: Trophy, text: 'Ranking da temporada e carteira de prêmios' },
];

export function InPractice() {
  return (
    <section id="na-pratica" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="text-3xl leading-tight font-black text-ink sm:text-[2.6rem] lg:col-span-7">
            Um painel para quem cuida do acervo. Um app para quem joga.
          </h2>
          <p className="text-lg text-ink-mute lg:col-span-5">
            O gestor administra tudo pelo navegador. Alunos, sócios ou clientes alugam pelo celular, e os dois lados
            enxergam as mesmas regras.
          </p>
        </div>

        <div className="relative mt-14 sm:pb-0">
          <AdminMock />
          <PhoneMock />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <FeatureList title="No painel do gestor" items={ADMIN_FEATURES} />
          <FeatureList title="No app do usuário" items={APP_FEATURES} />
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#contato"
            className="inline-flex items-center justify-center rounded-2xl bg-indigo px-7 py-4 font-extrabold text-white shadow-[0_10px_22px_rgba(49,53,139,0.25)] transition-colors hover:bg-indigo-600"
          >
            Solicitar acesso à demonstração
          </a>
        </div>
      </div>
    </section>
  );
}

function FeatureList({ title, items }: { title: string; items: { icon: LucideIcon; text: string }[] }) {
  return (
    <div>
      <h3 className="text-xl font-extrabold text-ink">{title}</h3>
      <ul className="mt-5 space-y-3.5">
        {items.map(({ icon: Icon, text }, i) => (
          <li key={text} className="flex items-start gap-3.5">
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: ['#EEF0FF', '#FFE9EA', '#FFF9E6'][i % 3],
                color: ['#31358B', '#E62325', '#9A6B00'][i % 3],
              }}
            >
              <Icon size={18} strokeWidth={2.25} />
            </span>
            <span className="pt-1.5 text-[16px] leading-snug text-ink-soft">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdminMock() {
  return (
    <figure className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_60px_rgba(4,9,109,0.16)] ring-1 ring-indigo/10 sm:mr-28 lg:mr-56">
      <div aria-hidden className="flex items-center gap-2 border-b border-line bg-lavender px-4 py-3">
        <span className="size-3 rounded-full bg-red" />
        <span className="size-3 rounded-full bg-yellow" />
        <span className="size-3 rounded-full bg-indigo" />
        <span className="ml-3 hidden h-6 max-w-xs flex-1 rounded-full bg-white px-3 text-[11px] leading-6 text-ink-mute sm:block">
          Painel Ludus · Visão geral
        </span>
      </div>
      <img
        src={adminDashboard}
        alt="Painel administrativo do Ludus: jogos totais, aluguéis ativos, aprovações pendentes, usuários ativos e aluguéis recentes"
        width={1800}
        height={1038}
        loading="lazy"
        className="block h-auto w-full"
      />
    </figure>
  );
}

function PhoneMock() {
  return (
    <figure className="relative mx-auto -mt-4 w-[13rem] rounded-[2.2rem] bg-[#0B0D2E] p-2 shadow-[0_30px_60px_rgba(4,9,109,0.35)] sm:absolute sm:right-0 sm:-bottom-10 sm:mx-0 sm:mt-0 sm:w-[15rem] lg:w-[16.5rem]">
      <img
        src={appHome}
        alt="Tela inicial do app Ludus com o desempenho na temporada e jogos sugeridos"
        width={660}
        height={1428}
        loading="lazy"
        className="block h-auto w-full rounded-[1.8rem]"
      />
    </figure>
  );
}
