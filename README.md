# CocaisTech + Ludus · Landing pages

Duas páginas no mesmo projeto (Vite multi-page):

| Rota | Página | Código |
|---|---|---|
| `/` | CocaisTech | `index.html`, `src/cocais/` |
| `/ludus/` | Projeto Ludus | `ludus/index.html`, `src/` (componentes em `src/components/`) |

A seção e o item de menu "Projeto Ludus" da CocaisTech levam para `/ludus/`, e o crédito no rodapé do Ludus volta para `/`.

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção (dist/)
```

## Formulários de contato
Os dois formulários enviam por e-mail via FormSubmit. Na CocaisTech o destino fica em
`CONTACT_EMAIL` de `src/cocais/App.tsx` (ou `VITE_COCAIS_CONTACT_ENDPOINT`). Os canais diretos
(WhatsApp, e-mail, redes) ficam em `CHANNELS` no mesmo arquivo e só aparecem quando preenchidos.

### Ludus
Os pedidos de demonstração chegam por e-mail em `CONTACT_EMAIL` (`src/data.ts`), enviados pelo
[FormSubmit](https://formsubmit.co) sem servidor próprio. O e-mail traz nome, loja ou instituição,
WhatsApp e o plano de interesse, quando o visitante veio de um botão da seção de planos.

No **primeiro envio** o FormSubmit manda um e-mail de ativação para esse endereço; é preciso
clicar em confirmar uma vez para os pedidos seguintes chegarem.

Para usar outro destino, defina `VITE_CONTACT_ENDPOINT` com uma URL que aceite `POST` JSON e
responda `{ "success": "true" }`.
