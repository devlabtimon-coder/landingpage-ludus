// Dados 100% fictícios para o ambiente demo de prints.
const { PrismaClient } = require(process.cwd() + '/node_modules/@prisma/client');
const bcrypt = require(process.cwd() + '/node_modules/bcryptjs');
const games = require(process.argv[2]);
const p = new PrismaClient();
const day = 864e5, now = new Date('2026-10-08T14:00:00-03:00').getTime();
const d = (n) => new Date(now + n * day);
const pick = (a, i) => a[i % a.length];

const PEOPLE = [
  ['Ana Clara Sousa', 1620, 'ULTRAGAMER', 34], ['Rafael Mendes', 1180, 'EXPERT', 24], ['Beatriz Lima', 860, 'EXPERT', 19],
  ['Lucas Andrade', 720, 'EXPERT', 17], ['Júlia Ferreira', 540, 'FAMILY', 13], ['Pedro Henrique Rocha', 410, 'FAMILY', 12],
  ['Marina Costa', 330, 'FAMILY', 11], ['Thiago Nascimento', 260, 'STARTER', 8], ['Camila Ribeiro', 190, 'STARTER', 6],
  ['Gabriel Martins', 140, 'STARTER', 5], ['Larissa Gomes', 95, 'STARTER', 4], ['Vinícius Alves', 60, 'STARTER', 3],
  ['Isabela Carvalho', 35, 'STARTER', 2], ['Mateus Oliveira', 20, 'STARTER', 1],
];
const PENDING = ['Lucas Oliveira', 'Mariana Duarte', 'Felipe Andrade', 'Sofia Teixeira', 'Daniel Moraes'];
const lvl = (pts) => (pts >= 1500 ? 5 : pts >= 700 ? 4 : pts >= 300 ? 3 : pts >= 100 ? 2 : 1);
const slug = (n) => n.normalize('NFD').replace(/[^\w ]/g, '').toLowerCase().split(' ').join('.');
const TIERS = { LATAO: [2, 8, 15, 20], BRONZE: [2, 5, 30, 45], PRATA: [3, 4, 60, 90], OURO: [1, 5, 70, 120], DIAMANTE: [1, 4, 90, 150] };
const COMPONENTS = ['Tabuleiro', 'Cartas', 'Marcadores', 'Manual de regras', 'Dados'];

(async () => {
  const hash = await bcrypt.hash('UsuarioDemo#2026', 10);
  const users = [];
  for (const [i, [name, points, cat, total]] of PEOPLE.entries()) {
    users.push(await p.user.create({ data: {
      name, email: `${slug(name)}@exemplo.com`, phone: `+559990000${String(i).padStart(4, '0')}`, senhaHash: hash,
      emailVerified: true, phoneVerified: true, registrationStatus: 'APPROVED', clientCategory: cat,
      totalRentalsCount: total, points, level: lvl(points), createdAt: d(-200 + i * 7),
      documentFile: 'demo/documento.jpg', addressProof: 'demo/comprovante.jpg',
    } }));
  }
  for (const [i, name] of PENDING.entries()) {
    await p.user.create({ data: {
      name, email: `${slug(name)}@exemplo.com`, senhaHash: hash, emailVerified: true,
      registrationStatus: 'PENDING', createdAt: d(-i - 0.3), cpf: `000.000.00${i}-0${i}`,
      address: 'Rua dos Jogadores, 123 · Centro', documentFile: 'demo/documento.jpg',
      addressProof: i % 2 ? null : 'demo/comprovante.jpg', phone: `+559991111${String(i).padStart(4, '0')}`,
    } });
  }

  const copies = {};
  for (const [gi, g] of games.entries()) {
    const [minP, maxP, minT, maxT] = TIERS[g.tier];
    const ratings = 6 + (gi * 7) % 30;
    await p.game.update({ where: { id: g.id }, data: {
      tier: g.tier, minPlayers: minP, maxPlayers: maxP, minTime: minT, maxTime: maxT, minAge: 10,
      rating: [4.9, 4.8, 4.7, 4.6, 4.5, 4.8, 4.4][gi % 7], ratingsCount: ratings,
    } });
    copies[g.id] = [];
    for (let n = 1; n <= (g.tier === 'DIAMANTE' ? 1 : 2 + (gi % 2)); n++) {
      copies[g.id].push(await p.gameCopy.create({ data: { gameId: g.id, number: n, code: `LDS-${String(gi + 1).padStart(3, '0')}-${n}`, condition: 'Bom', isOriginal: n === 1 } }));
    }
    for (const [ci, c] of COMPONENTS.slice(0, 3 + (gi % 3)).entries()) {
      await p.gameComponent.create({ data: { gameId: g.id, name: c, quantity: [1, 110, 40, 1, 5][ci] } });
    }
  }

  // Aluguéis: ativos, atrasados, pendentes, devolvidos e cancelados.
  const plan = [
    ['ACTIVE', -2, 1], ['ACTIVE', -1, 2], ['ACTIVE', -3, 0], ['ACTIVE', -6, -2], ['ACTIVE', -5, -1], ['ACTIVE', -1, 2],
    ['PENDING', 0, 3], ['PENDING', 1, 4], ['PENDING', 0, 3],
    ...Array.from({ length: 22 }, (_, k) => ['RETURNED', -60 + k * 2.5, -57 + k * 2.5]),
    ['CANCELED', -12, -9], ['CANCELED', -20, -17],
  ];
  const usedCopy = new Set();
  for (const [k, [status, s, e]] of plan.entries()) {
    const user = pick(users, k * 5 + 1);
    let g, copy;
    for (let t = 0; t < games.length; t++) {
      g = pick(games, k * 7 + t);
      copy = copies[g.id].find((c) => !(status === 'ACTIVE' || status === 'PENDING') || !usedCopy.has(c.id));
      if (copy) break;
    }
    if (status === 'ACTIVE' || status === 'PENDING') {
      usedCopy.add(copy.id);
      if (status === 'ACTIVE') await p.gameCopy.update({ where: { id: copy.id }, data: { available: false } });
    }
    const game = await p.game.findUnique({ where: { id: g.id } });
    await p.rental.create({ data: {
      userId: user.id, gameId: g.id, copyId: copy.id, startDate: d(s), endDate: d(e), status,
      gameTitleSnapshot: game.title, gameCoverSnapshot: game.cover, copyCodeSnapshot: copy.code, copyNumberSnapshot: copy.number,
    } });
  }

  // Pontos da temporada atual (logs dentro do período).
  for (const [i, u] of users.entries()) {
    let left = PEOPLE[i][1], n = 0;
    while (left > 0) {
      const v = Math.min(left, n % 3 === 2 ? 2 : 5);
      await p.userPointsLog.create({ data: { userId: u.id, points: v, reason: v === 5 ? 'Devolução no prazo' : 'Devolução com atraso', createdAt: d(-30 + (n % 30)) } });
      left -= v; n++;
    }
    for (const [j, g] of games.slice(i % 6, (i % 6) + 3).entries()) {
      await p.gameRating.create({ data: { userId: u.id, gameId: g.id, value: 4 + ((i + j) % 2) } });
    }
  }
  await p.$disconnect();
  console.log('seed ok');
})().catch(async (e) => { console.error(e); await p.$disconnect(); process.exit(1); });
