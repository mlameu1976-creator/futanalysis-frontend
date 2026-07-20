// src/pages/nfl.jsx — FutAnalysis NFL
import AffiliateCTA from "../components/AffiliateCTA";
import { useEffect, useState, useMemo, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

const NFL_API = "https://futanalysis.com.br/nfl-api";
const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", red: "#E83B3B",
  green: "#2ECC71", blue: "#3B82F6", orange: "#FF8C00",
  purple: "#8B5CF6", text: "#EDF2F7", textMid: "#94A3B8",
  textDim: "#4A5568", font: "'JetBrains Mono', 'Fira Code', monospace",
  nfl: "#013369",
};

const MARKET_GROUPS = {
  "Todos":    null,
  "Resultado": ["HOME_WIN", "AWAY_WIN"],
  "Spread":   ["SPREAD_H", "SPREAD_A"],
  "Over":     ["OVER 41.5", "OVER 44.5", "OVER 47.5", "OVER 51.5"],
  "Under":    ["UNDER 41.5", "UNDER 44.5", "UNDER 47.5", "UNDER 51.5"],
};

const MARKET_LABEL = {
  HOME_WIN: "Vitória Mandante",
  AWAY_WIN: "Vitória Visitante",
  SPREAD_H: "Spread -3.5 (Casa)",
  SPREAD_A: "Spread -3.5 (Fora)",
};

function probColor(p) {
  if (p >= 75) return T.green;
  if (p >= 65) return T.yellow;
  if (p >= 58) return T.orange;
  return T.red;
}

function FilterBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "0.35rem 0.9rem", borderRadius: "20px", border: "none",
      cursor: "pointer", fontSize: "0.75rem", fontFamily: T.font,
      background: active ? T.yellow : T.surface,
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
    ? new Date(game.game_date + "Z").toLocaleString("pt-BR", {
        day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
        timeZone: "America/Sao_Paulo",
      })
    : "—";

  const topMarket = game.markets[0];
  const groups = [
    { title: "Resultado",       keys: ["HOME_WIN","AWAY_WIN"] },
    { title: "Spread ±3.5 pts", keys: ["SPREAD_H","SPREAD_A"] },
    { title: "Total de Pontos", keys: game.markets.filter(m =>
        m.market.startsWith("OVER") || m.market.startsWith("UNDER")
      ).map(m => m.market) },
  ];

  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", marginBottom: "0.75rem", overflow: "hidden" }}>
      <div onClick={() => setOpen(o => !o)} style={{ padding: "1rem", cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: T.text }}>{game.away_team}</div>
            <div style={{ fontSize: "0.7rem", color: T.textMid }}>@ {game.home_team}</div>
            <div style={{ fontSize: "0.65rem", color: T.textDim, marginTop: "2px" }}>
              {game.venue}{game.neutral_site ? " 🌐 campo neutro" : ""}
            </div>
            {game.week && (
              <div style={{ fontSize: "0.62rem", color: T.textDim, marginTop: "2px" }}>
                Semana {game.week} · Temporada {game.season}
              </div>
            )}
          </div>
          <div style={{ textAlign: "right", minWidth: 80 }}>
            <div style={{ fontSize: "0.65rem", color: T.textDim }}>{date}</div>
            <div style={{ marginTop: "0.5rem" }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: probColor(topMarket.probability) }}>
                {topMarket.probability}%
              </span>
              <div style={{ fontSize: "0.6rem", color: T.textDim }}>
                {MARKET_LABEL[topMarket.market] || topMarket.market}
              </div>
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
                <div style={{ fontSize: "0.6rem", color: T.textDim, letterSpacing: "0.08em",
                  textTransform: "uppercase", marginBottom: "0.4rem" }}>{group.title}</div>
                {items.map((m, i) => (
                  <div key={i} style={{ background: T.surfaceHi, borderRadius: "6px",
                    padding: "0.5rem 0.75rem", marginBottom: "0.4rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between",
                      alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "0.72rem", color: T.textMid }}>
                        {MARKET_LABEL[m.market] || m.market}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {m.detail && <span style={{ fontSize: "0.62rem", color: T.textDim }}>{m.detail}</span>}
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: probColor(m.probability) }}>
                          {m.probability}%
                        </span>
                      </div>
                    </div>
                    <ProbBar value={m.probability} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
      <AffiliateCTA index={index} />
    </div>
  );
}

function HistoryTab() {
  const [hist, setHist]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod]   = useState("all");

  useEffect(() => {
    setLoading(true);
    fetch(`${NFL_API}/nfl/history?period=${period}`)
      .then(r => r.json())
      .then(d => { setHist(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [period]);

  const roiColor = roi => roi >= 0 ? T.green : T.red;

  return (
    <div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {[["all","Tudo"],["90d","90 dias"],["30d","30 dias"],["7d","7 dias"]].map(([v,l]) => (
          <FilterBtn key={v} label={l} active={period===v} onClick={() => setPeriod(v)} />
        ))}
      </div>
      {loading && <div style={{ color: T.textMid, fontSize: "0.85rem" }}>Carregando...</div>}
      {!loading && hist && hist.total === 0 && (
        <div style={{ color: T.textMid, fontSize: "0.85rem", padding: "2rem",
          textAlign: "center", background: T.surface, borderRadius: "8px" }}>
          Histórico em construção — resultados registrados conforme jogos finalizam.<br/>
          <span style={{ fontSize: "0.75rem", color: T.textDim }}>
            Temporada NFL 2026 começa em setembro/2026.
          </span>
        </div>
      )}
      {!loading && hist && hist.total > 0 && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Total",   value: hist.total },
              { label: "Acertos", value: hist.wins, color: T.green },
              { label: "Taxa",    value: `${hist.win_rate}%`, color: hist.win_rate >= 60 ? T.green : T.yellow },
              { label: "ROI",     value: `${hist.roi}%`, color: roiColor(hist.roi) },
            ].map((s, i) => (
              <div key={i} style={{ background: T.surface, borderRadius: "8px", padding: "0.75rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.6rem", color: T.textDim, marginBottom: "4px" }}>{s.label}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: s.color || T.text }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {Object.entries(hist.by_market).sort((a,b) => b[1].total - a[1].total).map(([market, data]) => (
              <div key={market} style={{ background: T.surface, borderRadius: "6px", padding: "0.75rem 1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "0.78rem", color: T.text }}>{MARKET_LABEL[market] || market}</span>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <span style={{ fontSize: "0.72rem", color: T.textMid }}>{data.wins}/{data.total}</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700,
                      color: data.win_rate >= 60 ? T.green : T.yellow }}>{data.win_rate}%</span>
                    <span style={{ fontSize: "0.72rem", color: roiColor(data.roi) }}>ROI {data.roi}%</span>
                  </div>
                </div>
                <div style={{ width: "100%", background: T.border, borderRadius: "4px", height: "3px" }}>
                  <div style={{ width: `${Math.min(data.win_rate, 100)}%`, height: "100%",
                    background: data.win_rate >= 60 ? T.green : T.yellow, borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export async function getStaticProps() {
  let initialData = [];
  try {
    const res = await fetch(`${NFL_API}/nfl/opportunities/by-game?min_probability=58&days=120`);
    if (res.ok) {
      const data = await res.json();
      initialData = data.games || [];
    }
  } catch (e) {
    console.error("Erro ao buscar oportunidades NFL no getStaticProps:", e.message);
  }
  return { props: { initialData }, revalidate: 300 };
}

export default function NFLPage({ initialData }) {
  const [allGames, setAllGames]       = useState(initialData || []);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [minProb, setMinProb]         = useState(58);
  const [marketGroup, setMarketGroup] = useState("Todos");
  const [dateFilter, setDateFilter]   = useState("todos");
  const [tab, setTab]                 = useState("opps");
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) { isFirstRun.current = false; return; }
    setLoading(true);
    fetch(`${NFL_API}/nfl/opportunities/by-game?min_probability=${minProb}&days=120`)
      .then(r => r.json())
      .then(data => {
        setAllGames(data.games || []);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [minProb]);

  const games = useMemo(() => {
    const now = new Date();
    const toBRT = (d) => new Date(d.getTime() - 3*60*60*1000).toISOString().slice(0,10);
    const todayBRT    = toBRT(now);
    const tomorrowBRT = toBRT(new Date(now.getTime() + 24*60*60*1000));
    const allowedMarkets = MARKET_GROUPS[marketGroup];
    return allGames.map(g => {
      const gDate = g.game_date?.slice(0,10);
      if (dateFilter === "hoje"   && gDate !== todayBRT)    return null;
      if (dateFilter === "amanha" && gDate !== tomorrowBRT) return null;
      const markets = allowedMarkets
        ? g.markets.filter(m => allowedMarkets.includes(m.market))
        : g.markets;
      if (!markets.length) return null;
      return { ...g, markets };
    }).filter(Boolean)
      .sort((a, b) => (b.markets[0]?.probability || 0) - (a.markets[0]?.probability || 0));
  }, [allGames, marketGroup, dateFilter]);

  return (
    <>
      <Head>
        <title>Oportunidades NFL — FutAnalysis | Análise Estatística de Futebol Americano</title>
        <meta name="description" content="Análise NFL com modelo Poisson. Mercados: resultado, spread, over/under pontos. Temporada 2026." />
        <link rel="canonical" href="https://futanalysis.com.br/nfl" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font,
        padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem",
          paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/opportunities" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>
            ← oportunidades
          </Link>
          <Link href="/analises/nfl" style={{ color: T.yellow, textDecoration: "none", fontSize: "0.72rem", background: T.yellow + "18", border: `1px solid ${T.yellow}33`, borderRadius: "20px", padding: "3px 10px" }}>📋 análises nfl →</Link>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: "0 0 0.3rem", fontSize: "1.4rem", fontWeight: 700, color: T.yellow }}>
            🏈 NFL — Futebol Americano
          </h1>
          <p style={{ margin: 0, fontSize: "0.78rem", color: T.textMid }}>
            Modelo Poisson · Pontuação ofensiva/defensiva · Spread · Over/Under · Temporada 2026
          </p>
        </div>

        {/* Aviso pré-temporada */}
        <div style={{ background: "#1a1f2e", border: `1px solid ${T.border}`, borderRadius: "8px",
          padding: "0.75rem 1rem", marginBottom: "1.5rem", fontSize: "0.75rem", color: T.textMid }}>
          ⏳ Temporada 2026 começa em <strong style={{ color: T.yellow }}>setembro/2026</strong>.
          Histórico sendo construído com dados de 2023–2025.
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem",
          borderBottom: `1px solid ${T.border}`, paddingBottom: "0.75rem" }}>
          <FilterBtn label="🎯 Oportunidades" active={tab==="opps"} onClick={() => setTab("opps")} />
          <FilterBtn label="📊 Histórico"     active={tab==="hist"} onClick={() => setTab("hist")} />
        </div>

        {tab === "hist" && <HistoryTab />}

        {tab === "opps" && (
          <>
            <div style={{ marginBottom: "0.75rem" }}>
              <div style={{ fontSize: "0.65rem", color: T.textDim, marginBottom: "0.4rem" }}>PROBABILIDADE MÍNIMA</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {[58,65,70,75].map(p => (
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

            {!loading && !error && (
              <div style={{ fontSize: "0.7rem", color: T.textDim, marginBottom: "1rem" }}>
                {games.length} jogo{games.length !== 1 ? "s" : ""} com oportunidades
              </div>
            )}
            {loading && <div style={{ color: T.textMid, fontSize: "0.85rem" }}>Carregando...</div>}
            {error   && <div style={{ color: T.red,    fontSize: "0.85rem" }}>Erro: {error}</div>}
            {!loading && !error && games.length === 0 && (
              <div style={{ color: T.textMid, fontSize: "0.85rem", textAlign: "center", padding: "3rem" }}>
                Nenhuma oportunidade encontrada.<br/>
                <span style={{ fontSize: "0.75rem", color: T.textDim }}>
                  Os jogos aparecerão aqui quando a temporada começar.
                </span>
              </div>
            )}
            {!loading && !error && games.map((g, i) => <GameCard key={g.game_id} game={g} index={(7 + i) % 10} />)}
          </>
        )}

        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${T.border}`,
          fontSize: "0.65rem", color: T.textDim, textAlign: "center" }}>
          FutAnalysis · futanalysis.sport@gmail.com
        </div>
      </div>
    </>
  );
}
