const puppeteer = require('puppeteer-core');
const [out] = process.argv.slice(2);
(async () => {
  const login = await (await fetch('http://localhost:3333/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'admin@ludus.demo', senha: 'LudusDemo#2026' }) })).json();
  const browser = await puppeteer.launch({ executablePath: '/bin/google-chrome', headless: 'new', args: ['--hide-scrollbars'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5199/login', { waitUntil: 'networkidle0' });
  await page.evaluate((l) => { localStorage.setItem('token', l.token); localStorage.setItem('user', JSON.stringify(l.user)); }, login);
  for (const route of ['dashboard', 'acervo', 'cadastro', 'emprestimos', 'ranking', 'temporadas']) {
    await page.goto('http://localhost:5199/' + route, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: `${out}/admin-${route}.png` });
    console.log('ok', route);
  }
  await browser.close();
})();
