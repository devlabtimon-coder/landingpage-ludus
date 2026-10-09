import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import logo from '../assets/logo-ludus.webp';
import { CONTACT_EMAIL, NAV } from '../data';

export function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-28 text-white lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={logo} alt="Ludus" width={900} height={308} className="w-48" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#C9CCF2]">
              Gestão de acervos de jogos de tabuleiro com aprovação de cadastro, níveis de acesso e temporadas.
              Nascido e em uso no IFMA Campus Timon.
            </p>
          </div>

          <nav aria-label="Rodapé" className="md:col-span-3">
            <h2 className="font-sans text-sm font-black tracking-wider text-yellow uppercase">Navegação</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-[15px] text-[#C9CCF2] transition-colors hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-sans text-sm font-black tracking-wider text-yellow uppercase">Contato</h2>
            <ul className="mt-4 space-y-2.5 text-[15px] text-[#C9CCF2]">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-white">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>IFMA Campus Timon · Timon, MA</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-[#A9ADE0] md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Ludus. Todos os direitos reservados.</p>
          <p className="shrink-0">
            Desenvolvido por <span className="font-bold text-white">Cocaistech</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Barra fixa no mobile (wireframe M6): some quando o formulário está na tela.
export function MobileCta() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const contact = document.getElementById('contato');
    const hero = document.getElementById('inicio');
    if (!contact || !hero) return;
    const visible = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target, e.isIntersecting));
      setHidden(!!visible.get(contact) || !!visible.get(hero));
    });
    io.observe(contact);
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-indigo/10 bg-white/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        hidden ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <a
        href="#contato"
        tabIndex={hidden ? -1 : 0}
        className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-indigo font-extrabold text-white"
      >
        Solicitar demonstração
        <ArrowRight size={18} strokeWidth={2.5} />
      </a>
    </div>
  );
}
