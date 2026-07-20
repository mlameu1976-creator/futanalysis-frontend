// src/pages/nhl.jsx — Hockey no Gelo · Modelo Poisson de Gols
import AffiliateCTA from "../components/AffiliateCTA";
import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";

const NHL_API = "https://futanalysis.com.br/nhl-api";
const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", red: "#E83B3B",
  green: "#2ECC71", blue: "#00B4D8", orange: "#FF8C00",
  purple: "#8B5CF6", text: "#EDF2F7", textMid: "#94A3B8",
  textDim: "#4A5568", font: "'JetBrains Mono', 'Fira Code', monospace",
  accent: "#00B4D8",
};

const MARKET_GROUPS = {
  "Todos":      null,
  "Resultado":  ["HOME_WIN", "AWAY_WIN"],
  "Over 5.5":   ["OVER_5.5"],
  "Under 5.5":  ["UNDER_5.5"],
  "Over 6.5":   ["OVER_6.5"],
  "Under 6.5":  ["UNDER_6.5"],
  "BTTS":       ["BTTS"],
  "Puck Line":  ["PUCK_LINE_H", "PUCK_LINE_A"],
};

function getMarketLabel(market) {
  const map = {
    HOME_WIN:    "Vitória Mandante",
    AWAY_WIN:    "Vitória Visitante",
    "OVER_5.5":  "Over 5.5 Gols",
    "UNDER_5.5": "Under 5.5 Gols",
    "OVER_6.5":    "Over 6.5 Gols",
    "UNDER_6.5":   "Under 6.5 Gols",
    "BTTS":        "Ambas Marcam",
    "PUCK_LINE_H": "Puck Line -1.5 (Casa)",
    "PUCK_LINE_A": "Puck Line -1.5 (Fora)",
  };
  return map[market] || market;
}

function probColor(p) {
  if (p >= 75) return T.green;
  if (p >= 65) return T.yellow;
  if (p >= 55) return T.orange;
  return T.red;
}

function FilterBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "0.35rem 0.9rem", borderRadius: "20px", border: "none",
      cursor: "pointer", fontSize: "0.75rem", fontFamily: T.font,
      background: active ? T.accent : T.surface,
      color: active ? T.bg : T.textMid,
    }}>{label}</button>
  );
}

function ProbBar({ value }) {
  return (
    <div style={{ width: "100%", background: T.border, borderRadius: "4px", height: "4px", overflow: "hidden" }}>
      <div style={{ width: `${Math.min(value, 100)}%`, height: "100%", background: probColor(value), transition: "width 0.5s" }} />
    </div>
  );
}

function GameCard({ game, index = 0 }) {
  const [open, setOpen] = useState(false);
  const date = game.game_date
    ? new Date(game.game_date + "T12:00:00Z").toLocaleString("pt-BR", {
        day: "2-digit", month: "2-digit", timeZone: "America/Sao_Paulo",
      })
    : "—";
  const topMarket = game.markets[0];
  const groups = [
    { title: "Resultado",  keys: ["HOME_WIN", "AWAY_WIN"] },
    { title: "Total Gols", keys: ["OVER_5.5", "UNDER_5.5", "OVER_6.5", "UNDER_6.5"] },
    { title: "Ambas Marcam", keys: ["BTTS"] },
    { title: "Puck Line ±1.5", keys: ["PUCK_LINE_H", "PUCK_LINE_A"] },
  ];
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", marginBottom: "0.75rem", overflow: "hidden" }}>
      <AffiliateCTA index={index} />
      <div onClick={() => setOpen(o => !o)} style={{ padding: "1rem", cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: T.text }}>{game.away_team}</div>
            <div style={{ fontSize: "0.7rem", color: T.textMid }}>@ {game.home_team}</div>
            {game.venue && <div style={{ fontSize: "0.62rem", color: T.textDim, marginTop: "2px" }}>{game.venue}</div>}
            {topMarket?.home_lambda && (
              <div style={{ display: "flex", gap: "1rem", fontSize: "0.68rem", color: T.textMid, marginTop: "0.4rem" }}>
                <span>λ casa <span style={{ color: T.accent, fontWeight: 700 }}>{topMarket.home_lambda.toFixed(2)}</span></span>
                <span>λ fora <span style={{ color: T.accent, fontWeight: 700 }}>{topMarket.away_lambda.toFixed(2)}</span></span>
                <span>total <span style={{ color: T.yellow, fontWeight: 700 }}>{topMarket.expected_goals.toFixed(2)}</span></span>
              </div>
            )}
          </div>
          <div style={{ textAlign: "right", minWidth: 90 }}>
            <div style={{ fontSize: "0.65rem", color: T.textDim }}>{date}</div>
            <div style={{ marginTop: "0.5rem" }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: probColor(topMarket.probability * 100) }}>
                {(topMarket.probability * 100).toFixed(1)}%
              </span>
              <div style={{ fontSize: "0.6rem", color: T.textDim }}>{getMarketLabel(topMarket.market)}</div>
            </div>
            <div style={{ fontSize: "0.65rem", color: T.textDim, marginTop: "4px" }}>
              {game.markets.length} mercado{game.markets.length !== 1 ? "s" : ""} {open ? "▲" : "▼"}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: `1px solid ${T.border}`, padding: "0.75rem 1rem" }}>
          {groups.map(group => {
            const items = game.markets.filter(m => group.keys.includes(m.market));
            if (!items.length) return null;
            return (
              <div key={group.title} style={{ marginBottom: "0.75rem" }}>
                <div style={{ fontSize: "0.6rem", color: T.textDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  {group.title}
                </div>
                {items.map((m, i) => {
                  const pct = m.probability * 100;
                  return (
                    <div key={i} style={{ background: T.surfaceHi, borderRadius: "6px", padding: "0.5rem 0.75rem", marginBottom: "0.4rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <span style={{ fontSize: "0.72rem", color: T.textMid }}>{getMarketLabel(m.market)}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <span style={{ fontSize: "0.62rem", color: T.textDim }}>
                            odd: {m.implied_odd ?? (1 / m.probability).toFixed(2)}
                          </span>
                          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: probColor(pct) }}>{pct.toFixed(1)}%</span>
                        </div>
                      </div>
                      <ProbBar value={pct} />
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div style={{ marginTop: "0.5rem", padding: "0.5rem 0.75rem", background: T.surfaceHi, borderRadius: "6px" }}>
            <div style={{ fontSize: "0.6rem", color: T.textDim, textTransform: "uppercase", marginBottom: "0.3rem" }}>Parâmetros do Modelo</div>
            <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.68rem", color: T.textMid, flexWrap: "wrap" }}>
              <span>λ casa: <b style={{ color: T.accent }}>{topMarket?.home_lambda?.toFixed(3)}</b></span>
              <span>λ fora: <b style={{ color: T.accent }}>{topMarket?.away_lambda?.toFixed(3)}</b></span>
              <span>Esperado: <b style={{ color: T.yellow }}>{topMarket?.expected_goals?.toFixed(2)}</b></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryTab() {
  const [hist, setHist]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod]   = useState("all");
  const [group, setGroup]     = useState("market");

  useEffect(() => {
    setLoading(true);
    fetch(`${NHL_API}/nhl/history?group=${group}&period=${period}`)
      .then(r => r.json())
      .then(d => { setHist(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [period, group]);

  return (
    <div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        {[["all","Tudo"],["30d","30 dias"],["7d","7 dias"]].map(([v,l]) => (
          <FilterBtn key={v} label={l} active={period===v} onClick={() => setPeriod(v)} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {[["market","Por Mercado"],["confidence","Por Confiança"],["month","Por Mês"]].map(([v,l]) => (
          <FilterBtn key={v} label={l} active={group===v} onClick={() => setGroup(v)} />
        ))}
      </div>
      {loading && <div style={{ color: T.textMid, fontSize: "0.85rem" }}>Carregando...</div>}
      {!loading && hist && (!hist.data || hist.data.length === 0) && (
        <div style={{ color: T.textMid, fontSize: "0.85rem", padding: "2rem", textAlign: "center", background: T.surface, borderRadius: "8px" }}>
          Histórico em construção — resultados registrados conforme jogos finalizam.<br/>
          <span style={{ fontSize: "0.72rem", color: T.textDim }}>A temporada 2026-27 começa em outubro/2026.</span>
        </div>
      )}
      {!loading && hist && hist.data && hist.data.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {hist.data.map((row, i) => (
            <div key={i} style={{ background: T.surface, borderRadius: "6px", padding: "0.75rem 1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <span style={{ fontSize: "0.78rem", color: T.text }}>{getMarketLabel(row.group_key) || row.group_key}</span>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <span style={{ fontSize: "0.72rem", color: T.textMid }}>{row.wins}/{row.total}</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: row.win_rate >= 60 ? T.green : T.yellow }}>{row.win_rate}%</span>
                </div>
              </div>
              <div style={{ width: "100%", background: T.border, borderRadius: "4px", height: "3px" }}>
                <div style={{ width: `${Math.min(row.win_rate, 100)}%`, height: "100%", background: row.win_rate >= 60 ? T.green : T.yellow, borderRadius: "4px" }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  let initialData = [];
  try {
    const res = await fetch(`${NHL_API}/nhl/opportunities?days_ahead=7`);
    if (res.ok) {
      const data = await res.json();
      initialData = data.opportunities || [];
    }
  } catch (e) {
    console.error("Erro ao buscar oportunidades NHL no getStaticProps:", e.message);
  }
  return { props: { initialData }, revalidate: 300 };
}

export default function NHLPage({ initialData }) {
  const [allOpps, setAllOpps]         = useState(initialData || []);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [minProb, setMinProb]         = useState(60);
  const [marketGroup, setMarketGroup] = useState("Todos");
  const [dateFilter, setDateFilter]   = useState("todos");
  const [tab, setTab]                 = useState("opps");
  const [stats, setStats]             = useState(null);

  useEffect(() => {
    fetch(`${NHL_API}/nhl/stats`)
      .then(r => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  // Dado inicial já vem do servidor via getStaticProps (ISR)

  const games = useMemo(() => {
    const now = new Date();
    const toBRT = (d) => new Date(d.getTime() - 3*60*60*1000).toISOString().slice(0,10);
    const todayBRT    = toBRT(now);
    const tomorrowBRT = toBRT(new Date(now.getTime() + 24*60*60*1000));
    const filtered = allOpps.filter(o => {
      if (o.probability * 100 < minProb) return false;
      const allowed = MARKET_GROUPS[marketGroup];
      if (allowed && !allowed.includes(o.market)) return false;
      const gDate = o.game_date?.slice(0,10);
      if (dateFilter === "hoje"   && gDate !== todayBRT)    return false;
      if (dateFilter === "amanha" && gDate !== tomorrowBRT) return false;
      return true;
    });
    const map = {};
    filtered.forEach(o => {
      if (!map[o.game_id]) {
        map[o.game_id] = { game_id: o.game_id, game_date: o.game_date, home_team: o.home_team, away_team: o.away_team, venue: o.venue, markets: [] };
      }
      map[o.game_id].markets.push(o);
    });
    return Object.values(map)
      .map(g => ({ ...g, markets: g.markets.sort((a, b) => b.probability - a.probability) }))
      .sort((a, b) => (b.markets[0]?.probability || 0) - (a.markets[0]?.probability || 0));
  }, [allOpps, minProb, marketGroup]);

  const isOffseason = stats && stats.games_scheduled === 0;

  return (
    <>
      <Head>
        <title>Oportunidades NHL — FutAnalysis | Análise Estatística de Hockey</title>
        <meta name="description" content="Análise NHL com modelo Poisson de gols. Mercados: resultado, over/under 5.5 e 6.5 gols. Temporada 2026-27." />
        <link rel="canonical" href="https://futanalysis.com.br/nhl" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/opportunities" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← oportunidades</Link>
          <Link href="/analises/nhl" style={{ color: T.yellow, textDecoration: "none", fontSize: "0.72rem", background: T.yellow + "18", border: `1px solid ${T.yellow}33`, borderRadius: "20px", padding: "3px 10px" }}>📋 análises nhl →</Link>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: "0 0 0.3rem", fontSize: "1.4rem", fontWeight: 700, color: T.accent }}>🏒 NHL — Hockey no Gelo</h1>
          <p style={{ margin: 0, fontSize: "0.78rem", color: T.textMid }}>Modelo Poisson · Gols por jogo · Over/Under 5.5 e 6.5 · Últimas 5 temporadas</p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: `1px solid ${T.border}`, paddingBottom: "0.75rem" }}>
          <FilterBtn label="🎯 Oportunidades" active={tab==="opps"} onClick={() => setTab("opps")} />
          <FilterBtn label="📊 Histórico"     active={tab==="hist"} onClick={() => setTab("hist")} />
        </div>
        {tab === "hist" && <HistoryTab />}
        {tab === "opps" && (
          <>
            {isOffseason && (
              <div style={{ background: T.surface, border: `1px solid ${T.accent}44`, borderRadius: "8px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", borderLeft: `3px solid ${T.accent}` }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: T.accent, marginBottom: "0.3rem" }}>🏒 Entre temporadas</div>
                <div style={{ fontSize: "0.78rem", color: T.textMid, lineHeight: 1.7 }}>
                  A temporada NHL 2025-26 encerrou em 14/06/2026 com o <b style={{ color: T.text }}>Carolina Hurricanes</b> campeão.
                  A temporada 2026-27 começa em <b style={{ color: T.text }}>outubro/2026</b> — oportunidades geradas automaticamente.
                  Dados de <b style={{ color: T.text }}>{stats?.total_games?.toLocaleString("pt-BR")} jogos</b> históricos carregados.
                </div>
              </div>
            )}
            <div style={{ marginBottom: "0.75rem" }}>
              <div style={{ fontSize: "0.65rem", color: T.textDim, marginBottom: "0.4rem" }}>PROBABILIDADE MÍNIMA</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {[55,60,65,70,75].map(p => (
                  <FilterBtn key={p} label={`${p}%+`} active={minProb===p} onClick={() => setMinProb(p)} />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "0.75rem" }}>
              <div style={{ fontSize: "0.65rem", color: T.textDim, marginBottom: "0.4rem" }}>MERCADO</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {Object.keys(MARKET_GROUPS).map(g => (
                  <FilterBtn key={g} label={g} active={marketGroup===g} onClick={() => setMarketGroup(g)} />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.65rem", color: T.textDim, marginBottom: "0.4rem" }}>DATA</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {[["todos","Todos"],["hoje","Hoje"],["amanha","Amanhã"]].map(([v,l]) => (
                  <FilterBtn key={v} label={l} active={dateFilter===v} onClick={() => setDateFilter(v)} />
                ))}
              </div>
            </div>
            {!loading && !error && !isOffseason && (
              <div style={{ fontSize: "0.7rem", color: T.textDim, marginBottom: "1rem" }}>
                {games.length} jogo{games.length !== 1 ? "s" : ""} com oportunidades
              </div>
            )}
            {loading && <div style={{ color: T.textMid, fontSize: "0.85rem" }}>Carregando...</div>}
            {error   && <div style={{ color: T.red,    fontSize: "0.85rem" }}>Erro: {error}</div>}
            {!loading && !error && !isOffseason && games.length === 0 && (
              <div style={{ color: T.textMid, fontSize: "0.85rem", padding: "2rem", textAlign: "center", background: T.surface, borderRadius: "8px" }}>
                Nenhuma oportunidade no momento.
              </div>
            )}
            {!loading && !error && games.map((g, i) => (
              <GameCard key={g.game_id} game={g} index={(8 + i) % 10} />
            ))}
          </>
        )}
        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${T.border}`, fontSize: "0.65rem", color: T.textDim, textAlign: "center" }}>
          FutAnalysis · futanalysis.sport@gmail.com
        </div>
      </div>
    </>
  );
}
