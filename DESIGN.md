# Ludus · Design da landing

Sistema visual extraído do app (Sistema-Ludus) e do painel (Ludus-Web_Admin). Tokens em `src/index.css` (`@theme`).

## Cores
| Papel | Hex | Origem |
|---|---|---|
| Índigo (campo principal, botões primários) | `#31358B` | fundo do app, botão "Logar" |
| Navy (seções profundas, rodapé) | `#04096D` | ranking/wallet do app, cards escuros do admin |
| Vermelho (acento) | `#E62325` | "U" vermelho do logo, badges |
| Amarelo (CTA sobre índigo, destaque) | `#FBBC04` | aba ativa do app, "+ Novo Aluguel" |
| Texto sobre amarelo claro | `#9A6B00` | pílula de pontos |
| Superfícies | `#F7F8FF` `#F0F2FF` `#EEF0FF` | sheets e pílulas do app |
| Texto | `#1A1A2E` / `#4B4F6B` / `#5F6380` | (o `#8B8EA1` do app reprova contraste em corpo; escurecido) |
| Sucesso / erro | `#2FA84F` (texto `#1F7A39`) / `#B3193A` | status de aluguel, LudusAlert |

Tiers: Latão `#8B7355`, Bronze `#CD7F32`, Prata `#9CA3AF`, Ouro `#FBBC04`, Diamante `#3B82F6`.
Categorias (badges do app): Starter `#E5E7EB/#374151`, Family `#FBBC04/#04096D`, Expert `#31358B/#FFF`, Ultragamer `#04096D/#FBBC04`.

## Tipografia
- Display: **Saira** 800/900 (ecoa o slogan do logo, pesos pesados como os 900 do app).
- Texto: **Figtree** variável.
- Self-hosted via `@fontsource`.

## Forma
- Sheet branca com raio superior de 32px sobre o índigo (assinatura do app), cards 24–28px, botões/inputs 16px, pílulas 999px.
- Fundo "splash": círculos translúcidos brancos, amarelos e vermelhos + anéis tracejados de 3px.
- Linhas tracejadas como "caminhos" entre passos.
- Ícones: lucide (mesma família do admin).

## Movimento
Um único momento autoral: o destravar dos jogos na estante do hero (`unlock-pop`). Respeita `prefers-reduced-motion`.
