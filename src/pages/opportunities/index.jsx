// src/pages/opportunities/index.jsx
// Página central — hub de mercados
import Link from "next/link";
import Head from "next/head";

const T = {
  bg:       "#080C10", surface:  "#0E1419", surfaceHi: "#141B22",
  border:   "#1E2830", yellow:   "#F5C518", red:       "#E83B3B",
  green:    "#2ECC71", blue:     "#3B82F6", purple:    "#8B5CF6",
  orange:   "#FF8C00", text:     "#EDF2F7", textMid:   "#94A3B8",
  textDim:  "#4A5568", font: "'JetBrains Mono', 'Fira Code', monospace",
};

const MARKETS = [
  {
    href:    "/opportunities/live",
    icon:    "🔴",
    label:   "Ao Vivo",
    accent:  "#E83B3B",
    desc:    "Partidas em andamento com oportunidades ajustadas por minuto e placar atual",
    markets: ["OVER 1.5", "OVER 2.5", "UNDER 2.5", "BTTS", "Casa vence", "Fora vence"],
    analysis: "/analises/futebol",
  },
  {
    href:    "/opportunities/football",
    icon:    "⚽",
    label:   "Futebol",
    accent:  T.green,
    desc:    "Gol HT · Over 1.5 · Over 2.5 · Under 2.5 · BTTS · Casa vence · Fora vence",
    markets: ["GOAL_HT", "OVER_1.5", "OVER_2.5", "UNDER_2.5", "BTTS", "HOME_WIN", "AWAY_WIN"],
    analysis: "/analises/futebol",
  },
  {
    href:    "/opportunities/cards",
    icon:    "🟨",
    label:   "Cartões",
    accent:  T.yellow,
    desc:    "Over 3.5 · Over 4.5 · Under 3.5 · Under 4.5 cartões por jogo",
    markets: ["OVER 3.5", "OVER 4.5", "UNDER 3.5", "UNDER 4.5"],
    analysis: "/analises/futebol",
  },
  {
    href:    "/opportunities/corners",
    icon:    "⛳",
    label:   "Escanteios",
    accent:  "#14B8A6",
    desc:    "Over 8.5 · Over 10.5 · Under 8.5 · Under 10.5 escanteios por jogo",
    markets: ["OVER 8.5", "OVER 10.5", "UNDER 8.5", "UNDER 10.5"],
    analysis: "/analises/futebol",
  },
  {
    href:    "/opportunities/shots",
    icon:    "👟",
    label:   "Finalizações",
    accent:  T.blue,
    desc:    "Over/Under de finalizações totais e chutes a gol, com filtro por equipe",
    markets: ["OVER 20.5 SHOTS", "UNDER 20.5 SHOTS", "OVER 6.5 SHOTS ON GOAL", "UNDER 6.5 SHOTS ON GOAL"],
    analysis: "/analises/futebol",
  },
  {
    href:    "/opportunities/players",
    icon:    "👤",
    label:   "Jogadores",
    accent:  T.purple,
    desc:    "Gol · Chute · Chute a gol · Assistência · Cartão · Falta · Defesa · Passes",
    markets: ["MARCAR GOL", "CHUTE", "CHUTE A GOL", "FAZER ASSISTÊNCIA", "LEVAR CARTÃO", "COMETER FALTA", "DEFESA GOLEIRO", "PASSES"],
    analysis: "/analises/futebol",
  },
  {
    href:    "/nba",
    icon:    "🏀",
    label:   "NBA",
    accent:  "#C9082A",
    desc:    "Finals NBA · Resultado · Over/Under · Handicap · Pontos por quarto",
    markets: ["HOME WIN", "AWAY WIN", "OVER 220.5", "UNDER 220.5", "HANDICAP"],
  },
  {
    href:    "/mlb",
    icon:    "⚾",
    label:   "MLB",
    accent:  "#002D72",
    desc:    "Beisebol · Resultado · Over/Under Runs · Modelo Poisson calibrado",
    markets: ["HOME WIN", "AWAY WIN", "OVER 7.5 RUNS", "UNDER 8.5 RUNS", "OVER 9.5 RUNS"],
  },
  {
    href:    "/nfl",
    icon:    "🏈",
    label:   "NFL",
    accent:  "#013369",
    desc:    "Futebol Americano · Resultado · Spread ±3.5 · Over/Under pontos · Temporada 2026",
    markets: ["HOME WIN", "AWAY WIN", "SPREAD -3.5", "OVER 44.5", "UNDER 44.5"],
  },
  {
    href:    "/nhl",
    icon:    "🏒",
    label:   "NHL",
    accent:  "#00B4D8",
    desc:    "Hockey no Gelo · Resultado · Over/Under 5.5 e 6.5 gols · Modelo Poisson · Temporada 2026-27",
    markets: ["HOME WIN", "AWAY WIN", "OVER 5.5", "UNDER 5.5", "OVER 6.5", "UNDER 6.5"],
  },
];

function MarketCard({ m }) {
  return (
    <div style={{ position: "relative" }}>
      <Link href={m.href} style={{ textDecoration: "none", display: "block" }}>
        <div
          style={{
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: "14px", overflow: "hidden",
            transition: "border-color 0.2s, transform 0.2s", cursor: "pointer",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = m.accent + "88"; e.currentTarget.style.transform = "translateY(-3px)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <div style={{ height: "4px", background: m.accent }} />
          <div style={{ padding: "1.8rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
              <span style={{ fontSize: "2rem" }}>{m.icon}</span>
              <span style={{ fontSize: "1.2rem", fontWeight: 700, color: m.accent }}>{m.label}</span>
            </div>
            <p style={{ margin: "0 0 1.2rem", fontSize: "0.78rem", color: T.textMid, lineHeight: 1.7 }}>
              {m.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {m.markets.map(mk => (
                <span key={mk} style={{
                  fontSize: "0.65rem", padding: "2px 8px",
                  background: m.accent + "18", color: m.accent,
                  border: `1px solid ${m.accent}33`, borderRadius: "20px",
                }}>{mk}</span>
              ))}
            </div>
          </div>
          <div style={{
            padding: "0.8rem 1.8rem",
            borderTop: `1px solid ${T.border}`,
            fontSize: "0.75rem", color: m.accent,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span>Ver oportunidades →</span>
          </div>
        </div>
      </Link>
      {m.analysis && (
        <Link href={m.analysis} style={{
          position: "absolute", bottom: "0.8rem", right: "1.8rem",
          fontSize: "0.65rem", color: m.accent,
          background: m.accent + "18", border: `1px solid ${m.accent}33`,
          borderRadius: "20px", padding: "2px 10px", textDecoration: "none",
          zIndex: 10,
        }}>
          📋 análises
        </Link>
      )}
    </div>
  );
}

export default function OpportunitiesHub() {
  return (
    <>
    <Head>
      <title>Oportunidades de Apostas em Futebol e NBA | FutAnalysis</title>
      <meta name="description" content="Análise estatística de oportunidades em futebol e NBA. Mercados de gols, cartões, escanteios, jogadores e ao vivo com modelo Dixon-Coles calibrado." />
      <link rel="canonical" href="https://futanalysis.com.br/opportunities" />
    </Head>
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2.5rem", paddingBottom: "1.2rem", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.3rem" }}>
  
        </div>
        <h1 style={{ margin: "0.5rem 0 0.3rem", fontSize: "1.5rem", fontWeight: 700, color: T.yellow }}>
          🎯 Oportunidades
        </h1>
        <p style={{ margin: 0, fontSize: "0.8rem", color: T.textMid }}>
          Selecione um mercado para ver as oportunidades identificadas
        </p>
        <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href="/analises/hoje" style={{ fontSize: "0.72rem", color: T.yellow, textDecoration: "none", background: T.yellow + "18", border: `1px solid ${T.yellow}33`, borderRadius: "20px", padding: "3px 10px" }}>
            📋 Análises de hoje →
          </Link>
          {["futebol","nba","mlb","nfl","nhl"].map(s => (
            <Link key={s} href={`/analises/${s}`} style={{ fontSize: "0.72rem", color: T.textMid, textDecoration: "none", background: T.surface, border: `1px solid ${T.border}`, borderRadius: "20px", padding: "3px 10px" }}>
              análises {s}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
        {MARKETS.map(m => <MarketCard key={m.href} m={m} />)}
      </div>

      {/* FAQ */}
      <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: `1px solid ${T.border}` }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: T.yellow, marginBottom: "1.5rem", textAlign: "center" }}>
          Perguntas Frequentes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", maxWidth: "700px", margin: "0 auto" }}>
          {[
            {
              q: "Como são calculadas as probabilidades?",
              a: "Usamos o modelo Dixon-Coles com distribuição de Poisson, considerando força de ataque e defesa de cada time, histórico de confrontos diretos e forma recente com peso exponencial."
            },
            {
              q: "Com que frequência os dados são atualizados?",
              a: "As oportunidades são geradas diariamente às 7h15 BRT. O mercado ao vivo é atualizado a cada 60 segundos durante as partidas."
            },
            {
              q: "Quantas ligas são cobertas?",
              a: "Monitoramos mais de 110 ligas ao redor do mundo, incluindo as principais ligas europeias, sul-americanas, norte-americanas e asiáticas."
            },
            {
              q: "O que significa a probabilidade exibida?",
              a: "A probabilidade indica a chance estimada de um determinado evento ocorrer na partida, baseada em dados históricos e estatísticas dos times."
            },
            {
              q: "Como receber as dicas pelo Telegram?",
              a: "Siga nosso canal @futanalysis_dicas no Telegram para receber as melhores oportunidades do dia todas as manhãs."
            },
          ].map((faq, i) => (
            <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "1rem 1.2rem" }}>
              <div style={{ fontWeight: 700, fontSize: "0.82rem", color: T.text, marginBottom: "0.4rem" }}>
                {faq.q}
              </div>
              <div style={{ fontSize: "0.78rem", color: T.textMid, lineHeight: 1.7 }}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <div style={{ background: "#dc2626", padding: "10px 24px", textAlign: "center", borderRadius: "8px 8px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ background: "#fff", color: "#dc2626", fontWeight: 900, fontSize: "1rem", padding: "3px 10px", borderRadius: "4px" }}>+18</span>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>PROIBIDO PARA MENORES DE 18 ANOS</span>
            <span style={{ color: "#fca5a5", fontSize: "0.8rem" }}>O jogo pode causar dependencia - jogue com responsabilidade</span>
          </div>
        </div>
        <div style={{ background: "#1e293b", padding: "12px 24px", textAlign: "center", borderTop: "1px solid #f59e0b" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "0.78rem" }}>Jogo Responsavel</span>
            <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Aposte apenas o que pode perder. Defina limites de tempo e valor.</span>
            <a href="https://ibjr.org" target="_blank" rel="noopener noreferrer" style={{ color: "#f59e0b", textDecoration: "underline", fontSize: "0.75rem" }}>ibjr.org - Jogo Responsavel</a>
            <a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer" style={{ color: "#f59e0b", textDecoration: "underline", fontSize: "0.75rem" }}>gamblingtherapy.org</a>
            <span style={{ background: "#ef4444", color: "#fff", fontWeight: 700, fontSize: "0.75rem", padding: "2px 8px", borderRadius: "4px" }}>CVV: 188</span>
          </div>
        </div>
        <div style={{ background: "#0f172a", padding: "14px 24px", textAlign: "center", borderTop: "1px solid #1e293b", borderRadius: "0 0 8px 8px" }}>
          <p style={{ margin: "0 0 8px", color: "#64748b", fontSize: "0.7rem", lineHeight: 1.8 }}>
            Em conformidade com as diretrizes do CONAR e dos operadores regulamentados.
            Este site fornece exclusivamente analises estatisticas com fins informativos e nao constitui aconselhamento financeiro ou incentivo a apostas.
            Apostas esportivas sao proibidas para menores de 18 anos.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.65rem", color: "#475569" }}>FutAnalysis © 2025-2026</span>
            <a href="/sobre" style={{ fontSize: "0.65rem", color: "#64748b", textDecoration: "none" }}>Sobre</a>
            <a href="/blog" style={{ fontSize: "0.65rem", color: "#64748b", textDecoration: "none" }}>Blog</a>
            <a href="/privacidade" style={{ fontSize: "0.65rem", color: "#64748b", textDecoration: "none" }}>Politica de Privacidade</a>
            <a href="/termos" style={{ fontSize: "0.65rem", color: "#64748b", textDecoration: "none" }}>Termos de Uso</a>
            <a href="mailto:futanalysis.sport@gmail.com" style={{ fontSize: "0.65rem", color: "#64748b", textDecoration: "none" }}>futanalysis.sport@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
