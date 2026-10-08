import coup from './assets/covers/coup.webp';
import coresComDicas from './assets/covers/cores-com-dicas.webp';
import dixit from './assets/covers/dixit.webp';
import carcassonne from './assets/covers/carcassonne.webp';
import catan from './assets/covers/catan.webp';
import azul from './assets/covers/azul.webp';
import barony from './assets/covers/barony.webp';
import pandemic from './assets/covers/pandemic.webp';
import sevenWonders from './assets/covers/7-wonders.webp';
import forestShuffle from './assets/covers/forest-shuffle.webp';

// Conteúdo da landing. Regras de níveis e pontuação espelham o Sistema-Ludus
// (GuideScreen, RankingComponents) e o Ludus-Web_Admin (SeasonsTabs).

export type TierId = 'latao' | 'bronze' | 'prata' | 'ouro' | 'diamante';
export type CategoryId = 'starter' | 'family' | 'expert' | 'ultragamer';

export const TIERS: {
  id: TierId;
  name: string;
  color: string;
  ink: string;
  desc: string;
  requires: CategoryId;
}[] = [
  { id: 'latao', name: 'Latão', color: '#8B7355', ink: '#FFFFFF', desc: 'Regras simples e partidas rápidas. Ideais para começar.', requires: 'starter' },
  { id: 'bronze', name: 'Bronze', color: '#CD7F32', ink: '#FFFFFF', desc: 'Profundidade moderada, partidas de até 60 minutos.', requires: 'starter' },
  { id: 'prata', name: 'Prata', color: '#9CA3AF', ink: '#1A1A2E', desc: 'Mecânicas complexas e múltiplas fases.', requires: 'family' },
  { id: 'ouro', name: 'Ouro', color: '#FBBC04', ink: '#04096D', desc: 'Estratégia pesada e longa duração.', requires: 'expert' },
  { id: 'diamante', name: 'Diamante', color: '#3B82F6', ink: '#FFFFFF', desc: 'Raros e épicos. O topo do acervo.', requires: 'ultragamer' },
];

export const CATEGORIES: {
  id: CategoryId;
  name: string;
  bg: string;
  ink: string;
  rule: string;
  unlocks: TierId;
}[] = [
  { id: 'starter', name: 'Starter', bg: '#E5E7EB', ink: '#374151', rule: 'Cadastro aprovado', unlocks: 'bronze' },
  { id: 'family', name: 'Family', bg: '#FBBC04', ink: '#04096D', rule: '10 aluguéis sem atraso', unlocks: 'prata' },
  { id: 'expert', name: 'Expert', bg: '#31358B', ink: '#FFFFFF', rule: '10+ aluguéis e avaliações', unlocks: 'ouro' },
  { id: 'ultragamer', name: 'Ultragamer', bg: '#04096D', ink: '#FBBC04', rule: 'Mais 10 aluguéis', unlocks: 'diamante' },
];

export const CATEGORY_ORDER: CategoryId[] = ['starter', 'family', 'expert', 'ultragamer'];

export function canAccess(category: CategoryId, tier: TierId) {
  const needed = TIERS.find((t) => t.id === tier)!.requires;
  return CATEGORY_ORDER.indexOf(category) >= CATEGORY_ORDER.indexOf(needed);
}

// Jogos do acervo real (API Ludus). Latão, Bronze, Prata e Barony seguem o tier
// cadastrado; os demais tiers altos são ilustrativos, pois cada acervo classifica os seus.
export const SHELF: { title: string; tier: TierId; players: string; time: string; cover: string }[] = [
  { title: 'Coup', tier: 'latao', players: '2–10', time: '15 min', cover: coup },
  { title: 'Cores com Dicas', tier: 'latao', players: '3–10', time: '30 min', cover: coresComDicas },
  { title: 'Dixit', tier: 'bronze', players: '3–6', time: '30 min', cover: dixit },
  { title: 'Carcassonne', tier: 'bronze', players: '2–5', time: '45 min', cover: carcassonne },
  { title: 'Catan', tier: 'prata', players: '3–4', time: '90 min', cover: catan },
  { title: 'Azul', tier: 'prata', players: '2–4', time: '45 min', cover: azul },
  { title: 'Barony', tier: 'ouro', players: '2–4', time: '45 min', cover: barony },
  { title: 'Pandemic', tier: 'ouro', players: '2–4', time: '60 min', cover: pandemic },
  { title: '7 Wonders', tier: 'diamante', players: '3–7', time: '30 min', cover: sevenWonders },
  { title: 'Forest Shuffle', tier: 'diamante', players: '2–5', time: '60 min', cover: forestShuffle },
];

export const SEASON_LEVELS = [
  { name: 'Iniciante', points: 0, bg: '#F3F4F6', ink: '#4B5563' },
  { name: 'Explorador', points: 100, bg: '#D1FAE5', ink: '#065F46' },
  { name: 'Estrategista', points: 300, bg: '#DBEAFE', ink: '#1E40AF' },
  { name: 'Campeão', points: 700, bg: '#F3E8FF', ink: '#6B21A8' },
  { name: 'Lenda', points: 1500, bg: '#FEF08A', ink: '#92400E' },
];

export const POINT_RULES = [
  { label: 'Retirada oficial confirmada', value: +5 },
  { label: 'Devolução no prazo', value: +5 },
  { label: 'Devolução com atraso', value: +2 },
  { label: 'Dano ou peça perdida', value: -20 },
];

export const NAV = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#niveis', label: 'Níveis' },
  { href: '#na-pratica', label: 'Na prática' },
  { href: '#planos', label: 'Planos' },
  { href: '#contato', label: 'Contato' },
];

export const CONTACT_EMAIL = 'nara.chaves@ifma.edu.br';
