import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo-ludus.webp';
import { NAV } from '../data';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? 'bg-indigo shadow-[0_8px_24px_rgba(4,9,109,0.25)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="shrink-0" aria-label="Ludus, voltar ao início">
          <img src={logo} alt="Ludus" width={900} height={308} className="h-10 w-auto sm:h-12" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] font-semibold text-white/85 decoration-yellow decoration-2 transition-colors hover:text-white hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="hidden rounded-2xl bg-yellow px-5 py-3 text-[15px] font-extrabold text-navy shadow-[0_6px_16px_rgba(251,188,4,0.3)] transition-colors hover:bg-yellow-600 lg:inline-flex"
        >
          Fale com a equipe
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-11 items-center justify-center rounded-2xl bg-white/10 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Principal" className="border-t border-white/10 px-4 pb-6 pt-2 lg:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/10 py-4 text-lg font-semibold text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-5 flex justify-center rounded-2xl bg-yellow px-5 py-4 font-extrabold text-navy"
          >
            Fale com a equipe
          </a>
        </nav>
      )}
    </header>
  );
}
