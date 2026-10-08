import { Gift, Percent, Ticket } from 'lucide-react';
import { CATEGORIES, POINT_RULES, SEASON_LEVELS, TIERS } from '../data';

export function Levels() {
  return (
    <section id="niveis" className="relative overflow-hidden bg-navy py-20 text-white sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 size-[30rem] rounded-full border-[3px] border-dashed border-white/10" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 size-96 rounded-full bg-white/[0.04]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-3xl text-3xl leading-tight font-black sm:text-[2.6rem]">
          Um sistema de níveis que protege o seu acervo
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[#C9CCF2]">
          Os jogos sobem de tier pela raridade e complexidade. Os usuários sobem de categoria pelo histórico de aluguéis.
          Um só alcança o outro quando a confiança já existe.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-xl font-extrabold">Níveis dos jogos</h3>
            <div className="mt-5 flex h-3 overflow-hidden rounded-full">
              {TIERS.map((t) => (
                <span key={t.id} className="flex-1" style={{ backgroundColor: t.color }} />
              ))}
            </div>
            <ol className="mt-6 divide-y divide-white/10">
              {TIERS.map((t) => (
                <li key={t.id} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5">
                  <span className="flex items-center gap-2.5 font-display text-lg font-extrabold">
                    <span className="size-3 rounded-full" style={{ backgroundColor: t.color }} />
                    {t.name}
                  </span>
                  <span className="text-[15px] leading-snug text-[#C9CCF2]">{t.desc}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-extrabold">Categorias dos usuários</h3>
            <ol className="mt-5 space-y-3">
              {CATEGORIES.map((c, i) => {
                const unlocked = TIERS.slice(0, TIERS.findIndex((t) => t.id === c.unlocks) + 1);
                return (
                  <li key={c.id} className="flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <span
                      className="w-28 shrink-0 rounded-full py-1.5 text-center text-xs font-black tracking-wider uppercase"
                      style={{ backgroundColor: c.bg, color: c.ink, boxShadow: i === 3 ? 'inset 0 0 0 2px #FBBC04' : undefined }}
                    >
                      {c.name}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold">{c.rule}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#C9CCF2]">
                        Aluga:
                        {unlocked.map((t) => (
                          <span key={t.id} className="inline-flex items-center gap-1">
                            <span className="size-2 rounded-full" style={{ backgroundColor: t.color }} />
                            {t.name}
                          </span>
                        ))}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-16 rounded-[var(--radius-sheet)] bg-white p-6 text-ink sm:p-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="text-2xl font-black sm:text-3xl">Temporadas que premiam quem cuida</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-mute">
                Cada temporada tem ranking próprio. Os pontos vêm da retirada confirmada e da devolução em dia, e cada
                nível alcançado libera recompensas que você define.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: Percent, label: 'Cupom percentual' },
                  { icon: Ticket, label: 'Cupom de valor fixo' },
                  { icon: Gift, label: 'Vale-brinde' },
                ].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 rounded-full bg-lavender-2 px-3.5 py-2 text-sm font-bold text-indigo">
                    <Icon size={15} strokeWidth={2.5} />
                    {label}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-line pt-5 text-sm">
                {POINT_RULES.map((r) => (
                  <li key={r.label} className="flex items-baseline justify-between gap-3">
                    <span className="text-ink-soft">{r.label}</span>
                    <span className={`font-black tabular ${r.value > 0 ? 'text-success-ink' : 'text-danger'}`}>
                      {r.value > 0 ? `+${r.value}` : `−${Math.abs(r.value)}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <ol className="relative grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-2 lg:col-span-7 lg:self-center">
              <span aria-hidden className="absolute top-7 right-[10%] left-[10%] hidden border-t-[3px] border-dashed border-indigo/20 sm:block" />
              {SEASON_LEVELS.map((l, i) => (
                <li key={l.name} className="relative flex items-center gap-3 sm:flex-col sm:text-center">
                  <span
                    className="flex size-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-black ring-4 ring-white"
                    style={{ backgroundColor: i === 4 ? '#04096D' : l.bg, color: i === 4 ? '#FBBC04' : l.ink }}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-extrabold">{l.name}</span>
                    <span className="block text-sm text-ink-mute tabular">{l.points === 0 ? 'Início' : `${l.points} pts`}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
