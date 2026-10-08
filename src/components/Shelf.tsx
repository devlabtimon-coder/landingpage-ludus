import { useRef, useState } from 'react';
import { Clock, Lock, Users } from 'lucide-react';
import { CATEGORIES, CATEGORY_ORDER, SHELF, TIERS, canAccess, type CategoryId, type TierId } from '../data';

// A estante interativa: escolher a categoria do usuário destrava os tiers do acervo.
export function Shelf() {
  const [category, setCategory] = useState<CategoryId>('starter');
  const previous = useRef<CategoryId>('starter');

  const select = (next: CategoryId) => {
    previous.current = category;
    setCategory(next);
  };

  const unlockedCount = SHELF.filter((g) => canAccess(category, g.tier)).length;
  const current = CATEGORIES.find((c) => c.id === category)!;
  const nextCategory = CATEGORIES[CATEGORY_ORDER.indexOf(category) + 1];

  return (
    <div className="relative mt-12 rounded-[var(--radius-sheet)] bg-white px-4 pt-6 pb-8 shadow-[0_24px_60px_rgba(4,9,109,0.35)] sm:mt-16 sm:px-8 sm:pt-8 lg:mt-20">
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-2xl font-extrabold text-ink sm:text-[1.75rem]">Experimente: quem está pedindo o jogo?</h2>
          <p className="mt-1 text-[15px] text-ink-mute">
            Troque a categoria do usuário e veja o acervo se abrir. É assim que o Ludus decide o que cada pessoa pode
            alugar.
          </p>
        </div>

        <div role="radiogroup" aria-label="Categoria do usuário" className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = c.id === category;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => select(c.id)}
                className={`rounded-full px-4 py-2.5 text-sm font-black tracking-wide uppercase transition-[background-color,color,box-shadow] duration-200 ${
                  active ? 'shadow-[0_6px_14px_rgba(4,9,109,0.22)]' : 'bg-lavender-2 text-indigo hover:bg-lavender-3'
                }`}
                style={active ? { backgroundColor: c.bg, color: c.ink } : undefined}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="no-scrollbar -mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
        {TIERS.map((tier) => (
          <TierColumn
            key={tier.id}
            tierId={tier.id}
            category={category}
            justUnlocked={canAccess(category, tier.id) && !canAccess(previous.current, tier.id)}
          />
        ))}
      </div>

      <div
        aria-live="polite"
        className="mt-6 flex flex-col gap-2 border-t border-line pt-5 text-[15px] sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-ink-soft">
          <span className="font-black text-ink tabular">{unlockedCount} de {SHELF.length}</span> jogos liberados para um
          usuário <span className="font-bold text-ink">{current.name}</span>.
        </p>
        <p className="text-ink-mute">
          {nextCategory ? (
            <>
              Próxima categoria: <span className="font-bold text-indigo">{nextCategory.name}</span> ·{' '}
              {nextCategory.rule.toLowerCase()}
            </>
          ) : (
            <>Acervo completo, inclusive os jogos Diamante.</>
          )}
          <span className="ml-2 text-xs text-ink-mute/80">Jogos do acervo real; tiers ilustrativos.</span>
        </p>
      </div>
    </div>
  );
}

function TierColumn({ tierId, category, justUnlocked }: { tierId: TierId; category: CategoryId; justUnlocked: boolean }) {
  const tier = TIERS.find((t) => t.id === tierId)!;
  const open = canAccess(category, tierId);
  const requires = CATEGORIES.find((c) => c.id === tier.requires)!;
  const games = SHELF.filter((g) => g.tier === tierId);
  const tierIndex = TIERS.indexOf(tier);

  return (
    <div className="w-[min(76vw,17rem)] shrink-0 snap-start rounded-3xl bg-lavender p-3 lg:w-auto">
      <div className="flex items-center justify-between px-1 pb-3">
        <span className="flex items-center gap-2 text-sm font-black tracking-wider text-ink uppercase">
          <span className="size-3.5 rounded-full ring-2 ring-white" style={{ backgroundColor: tier.color }} />
          {tier.name}
        </span>
        {!open && (
          <span className="flex items-center gap-1 text-[11px] font-bold text-ink-mute">
            <Lock size={12} strokeWidth={2.5} />
            {requires.name}+
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-1">
        {games.map((g, i) => (
          <article
            key={`${g.title}-${justUnlocked ? category : 'static'}`}
            className={`relative flex flex-col overflow-hidden rounded-2xl bg-white transition-[filter,opacity] duration-500 lg:flex-row lg:items-center lg:gap-3 lg:p-2 ${
              open ? 'shadow-[0_6px_14px_rgba(4,9,109,0.12)]' : 'opacity-60 grayscale'
            } ${justUnlocked ? 'unlock-pop' : ''}`}
            style={justUnlocked ? { animationDelay: `${tierIndex * 40 + i * 70}ms` } : undefined}
            aria-label={`${g.title}, tier ${tier.name}, ${open ? 'liberado' : `requer categoria ${requires.name}`}`}
          >
            <img
              src={g.cover}
              alt=""
              width={360}
              height={360}
              loading="lazy"
              className="aspect-square w-full shrink-0 object-cover lg:size-16 lg:rounded-xl"
            />
            <div className="min-w-0 p-2.5 lg:p-0 lg:pr-1">
              <h3 className="truncate text-[14px] leading-tight font-extrabold text-ink">{g.title}</h3>
              <p className="mt-1 flex items-center gap-2.5 text-[11px] font-semibold text-ink-soft">
                <span className="flex items-center gap-1">
                  <Users size={11} strokeWidth={2.5} />
                  {g.players}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} strokeWidth={2.5} />
                  {g.time}
                </span>
              </p>
            </div>
            {!open && (
              <span className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-white text-ink shadow-md lg:top-1/2 lg:right-auto lg:left-[26px] lg:-translate-y-1/2">
                <Lock size={14} strokeWidth={2.5} />
              </span>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
