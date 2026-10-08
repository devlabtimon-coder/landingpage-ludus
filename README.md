# Ludus · Landing page

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção (dist/)
```

## Formulário de contato
Defina `VITE_CONTACT_ENDPOINT` (por exemplo em `.env`) com uma URL que aceite `POST` JSON
`{ nome, instituicao, whatsapp, origem }`. Sem essa variável, o envio abre o e-mail do
visitante já preenchido para o endereço em `src/data.ts` (`CONTACT_EMAIL`).
