const QUOTES = [
  { text: 'Perdi jogos valiosos para clientes novos.', color: '#E62325' },
  { text: 'Verifico documentos manualmente por WhatsApp.', color: '#FBBC04' },
  { text: 'Não sei se posso liberar esse jogo para ele.', color: '#31358B' },
];

function QuoteMark({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 40" className="h-8 w-10 shrink-0 sm:h-10 sm:w-12" aria-hidden>
      <path
        d="M0 40V24C0 10 6 2 19 0l2 6C13 9 10 13 10 20h9v20H0Zm27 0V24C27 10 33 2 46 0l2 6c-8 3-11 7-11 14h9v20H27Z"
        fill={color}
      />
    </svg>
  );
}

export function Problem() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <h2 className="text-3xl leading-tight font-black text-ink sm:text-[2.6rem]">
            Você reconhece alguma dessas situações?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-mute">
            Frases que ouvimos de gestores de acervo nas entrevistas com a Homo Ludicus e a Xeque Mate.
          </p>
        </div>

        <ul className="space-y-10 lg:col-span-8 lg:pt-2">
          {QUOTES.map((q, i) => (
            <li key={q.text} className={`flex gap-5 ${i === 1 ? 'lg:pl-16' : i === 2 ? 'lg:pl-32' : ''}`}>
              <QuoteMark color={q.color} />
              <blockquote className="font-display text-[1.7rem] leading-[1.12] font-extrabold text-ink sm:text-[2.3rem]">
                {q.text}
              </blockquote>
            </li>
          ))}
          <li className="border-t-2 border-dashed border-line pt-8 lg:ml-32">
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
              Se o controle do seu acervo ainda passa por caderno, planilha e mensagens, o Ludus foi feito para você.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
