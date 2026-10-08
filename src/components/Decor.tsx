// Fundo "splash" do app (Sistema-Ludus/src/components/Splash/SplashBackground.tsx):
// pares de círculos quase concêntricos, um grande mais transparente e um menor mais opaco,
// amarelo no canto superior direito e vermelho no inferior esquerdo, com anéis tracejados.
// Valores do app em px a partir de lg; 0,6x no mobile.
export function SplashDecor({ variant = 'hero' }: { variant?: 'hero' | 'cta' }) {
  const hero = variant === 'hero';
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Amarelo: soft 340 / strong 260 */}
      <div className="absolute -top-[84px] -right-[84px] size-[204px] rounded-full bg-[rgba(251,188,4,0.25)] lg:-top-[140px] lg:-right-[140px] lg:size-[340px]" />
      <div className="absolute -top-[54px] -right-[54px] size-[156px] rounded-full bg-[rgba(251,188,4,0.35)] lg:-top-[90px] lg:-right-[90px] lg:size-[260px]" />

      {/* Vermelho: soft 420 / strong 300 */}
      <div
        className={`absolute -left-[108px] size-[252px] rounded-full bg-[rgba(252,9,13,0.25)] lg:-left-[180px] lg:size-[420px] ${
          hero ? 'top-[48%] lg:top-[34%]' : '-bottom-[108px] lg:-bottom-[180px]'
        }`}
      />
      <div
        className={`absolute -left-[72px] size-[180px] rounded-full bg-[rgba(252,9,13,0.3)] lg:-left-[120px] lg:size-[300px] ${
          hero ? 'top-[calc(48%+36px)] lg:top-[calc(34%+60px)]' : '-bottom-[72px] lg:-bottom-[120px]'
        }`}
      />

      {/* Anéis tracejados 260px, borda 3px branca 25% */}
      <div className="absolute top-[36px] -right-[78px] size-[156px] rounded-full border-[3px] border-dashed border-white/25 lg:top-[60px] lg:-right-[130px] lg:size-[260px]" />
      <div
        className={`absolute -left-[78px] size-[156px] rounded-full border-[3px] border-dashed border-white/25 lg:-left-[130px] lg:size-[260px] ${
          hero ? 'top-[26%] lg:top-[14%]' : 'bottom-[60px] lg:bottom-[100px]'
        }`}
      />
    </div>
  );
}
