const puppeteer = require('puppeteer-core');
const [out, gameId] = process.argv.slice(2);
(async () => {
  const login = await (await fetch('http://localhost:3333/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'lucas.andrade@exemplo.com', senha: 'UsuarioDemo#2026' }) })).json();
  if (!login.token) { console.log(JSON.stringify(login)); process.exit(1); }
  const browser = await puppeteer.launch({ executablePath: '/bin/google-chrome', headless: 'new', args: ['--hide-scrollbars'] });
  const page = await browser.newPage();
  page.on('pageerror', (e) => console.log('pageerror', e.message.slice(0, 200)));
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:8099/', { waitUntil: 'networkidle0', timeout: 120000 });
  await page.evaluate((l) => { localStorage.setItem('token', l.token); localStorage.setItem('user', JSON.stringify(l.user)); }, login);
  for (const route of ['home', 'ranking', 'wallet', 'profile/documents', `game/${gameId}`, 'rentals']) {
    await page.goto('http://localhost:8099/' + route, { waitUntil: 'networkidle0', timeout: 120000 });
    await new Promise((r) => setTimeout(r, 2500));
    await page.screenshot({ path: `${out}/app-${route.split('/').join('-').slice(0,20)}.png` });
    console.log('ok', route, page.url());
  }
  await browser.close();
})();
