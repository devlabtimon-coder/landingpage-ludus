import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import logo from '../assets/logo-full.webp';
import { CONTACT_EMAIL } from '../data';
import { SplashDecor } from './Decor';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Fields = { nome: string; instituicao: string; whatsapp: string };

// Defina VITE_CONTACT_ENDPOINT para receber os leads via POST (JSON).
// Sem endpoint, o formulário abre o e-mail do visitante já preenchido.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (f.nome.trim().length < 2) errors.nome = 'Informe o seu nome.';
  if (f.instituicao.trim().length < 2) errors.instituicao = 'Informe o nome da loja ou instituição.';
  if (f.whatsapp.replace(/\D/g, '').length < 10) errors.whatsapp = 'Informe o WhatsApp com DDD, por exemplo (99) 98765-4321.';
  return errors;
}

export function Contact() {
  const [fields, setFields] = useState<Fields>({ nome: '', instituicao: '', whatsapp: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: key === 'whatsapp' ? maskPhone(value) : value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...fields, origem: 'landing-ludus' }),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        const body = `Nome: ${fields.nome}\nLoja ou instituição: ${fields.instituicao}\nWhatsApp: ${fields.whatsapp}`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Quero conhecer o Ludus')}&body=${encodeURIComponent(body)}`;
      }
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="relative overflow-hidden bg-indigo py-20 text-white sm:py-28">
      <SplashDecor variant="cta" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
        <div className="lg:col-span-6">
          <img src={logo} alt="Ludus, construindo caminhos de ludicidade" width={900} height={389} className="w-56 sm:w-64" />
          <h2 className="mt-10 text-4xl leading-[1.02] font-black sm:text-[3.4rem]">
            Quer ver o Ludus funcionando no seu acervo?
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#D7DBFF]">
            Deixe três dados e a equipe chama você para uma demonstração com o painel e o app.
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-[1.75rem] bg-white p-6 text-ink shadow-[0_-10px_50px_rgba(4,9,109,0.25)] sm:rounded-[2.25rem] sm:p-9">
            {status === 'sent' ? (
              <div role="status" className="py-6 text-center">
                <CheckCircle2 size={48} className="mx-auto text-success" strokeWidth={2} />
                <p className="mt-4 font-display text-2xl font-black">Pedido recebido!</p>
                <p className="mt-2 text-ink-mute">
                  {ENDPOINT
                    ? 'A equipe Ludus vai falar com você pelo WhatsApp informado.'
                    : 'Confira o e-mail que abriu no seu aplicativo e envie a mensagem para concluir.'}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 font-bold text-indigo underline decoration-yellow decoration-2"
                >
                  Enviar outro pedido
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="space-y-5">
                <Field
                  id="nome"
                  label="Nome"
                  autoComplete="name"
                  value={fields.nome}
                  onChange={set('nome')}
                  error={errors.nome}
                />
                <Field
                  id="instituicao"
                  label="Nome da loja ou instituição"
                  autoComplete="organization"
                  value={fields.instituicao}
                  onChange={set('instituicao')}
                  error={errors.instituicao}
                />
                <Field
                  id="whatsapp"
                  label="WhatsApp"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="(99) 98765-4321"
                  value={fields.whatsapp}
                  onChange={set('whatsapp')}
                  error={errors.whatsapp}
                />

                {status === 'error' && (
                  <p role="alert" className="rounded-2xl bg-[#FFE9EA] px-4 py-3 text-sm font-semibold text-danger">
                    Não conseguimos enviar agora. Tente de novo em instantes ou escreva para {CONTACT_EMAIL}.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-yellow font-extrabold text-navy shadow-lg shadow-yellow/30 transition-colors hover:bg-yellow-600 disabled:cursor-wait disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <>
                      <LoaderCircle size={20} className="animate-spin" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      Quero conhecer o Ludus
                      <ArrowRight size={20} strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  onChange,
  ...input
}: {
  id: string;
  label: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  inputMode?: 'numeric' | 'text';
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...input}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-erro` : undefined}
        className={`mt-2 h-14 w-full rounded-2xl border bg-[#FAFBFF] px-4 text-base text-ink transition-[border-color,box-shadow] outline-none placeholder:text-ink-mute/70 focus:border-yellow focus:ring-4 focus:ring-yellow/25 ${
          error ? 'border-danger' : 'border-[#DFE3F2]'
        }`}
      />
      {error && (
        <p id={`${id}-erro`} className="mt-1.5 text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
