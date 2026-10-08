# Prints reais da landing

Os prints de `src/assets/prints/` saem do sistema real (Backend-Ludus, Ludus-Web_Admin e
Sistema-Ludus) rodando contra um **banco demo isolado com dados fictícios**. Produção não é tocada.

1. Banco demo: `docker run -d --name ludus-demo-db -e POSTGRES_USER=demo -e POSTGRES_PASSWORD=demo -e POSTGRES_DB=ludusdemo -p 5434:5432 postgres:16`
2. No Backend-Ludus: `source demo.env && npx prisma migrate deploy`, criar o admin
   `admin@ludus.demo` e subir `npx ts-node-dev --transpile-only src/server.ts` (porta 3333).
   O `demo.env` desliga crons, e-mail, SMS, push e Sentry.
3. Jogos pelo fluxo real da Ludopedia: `python3 import_games.py <token> games.json`;
   depois `node seed.cjs games.json` (usuários, exemplares, aluguéis e pontos fictícios).
   Crie a temporada em `POST /admin/seasons` e reaplique os pontos (criar temporada zera os pontos).
4. Admin: `VITE_API_URL=http://localhost:3333 VITE_IFMA_MODE=false npx vite --port 5199`, depois `node admin.cjs <saida>`.
5. App: copie o Sistema-Ludus para fora do repositório, sem o `.env`, e coloque nele este
   `metro.config.js` e a pasta `web-shims/` (troca SecureStore, mapa e player do YouTube no navegador).
   Gere `npx expo export --platform web` com `EXPO_PUBLIC_API_URL=http://localhost:3333`, sirva com
   `python3 spa.py <dist>` (porta 8099) e rode `node app.cjs <saida> <id-do-jogo>`.

`admin.cjs` e `app.cjs` usam `puppeteer-core` com o Chrome instalado.
