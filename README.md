# Ludus · Landing page

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção (dist/)
```

## Formulário de contato
Os pedidos de demonstração chegam por e-mail em `CONTACT_EMAIL` (`src/data.ts`), enviados pelo
[FormSubmit](https://formsubmit.co) sem servidor próprio. O e-mail traz nome, loja ou instituição,
WhatsApp e o plano de interesse, quando o visitante veio de um botão da seção de planos.

No **primeiro envio** o FormSubmit manda um e-mail de ativação para esse endereço; é preciso
clicar em confirmar uma vez para os pedidos seguintes chegarem.

Para usar outro destino, defina `VITE_CONTACT_ENDPOINT` com uma URL que aceite `POST` JSON e
responda `{ "success": "true" }`.
