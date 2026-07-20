// src/pages/mlb.jsx — v2: pitchers + Run Line + F5 + NRFI/YRFI
import AffiliateCTA from "../components/AffiliateCTA";
import { useEffect, useState, useMemo, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

const MLB_API = "https://futanalysis.com.br/mlb-api";
const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", red: "#E83B3B",
  green: "#2ECC71", blue: "#3B82F6", orange: "#FF8C00",
  purple: "#8B5CF6", text: "#EDF2F7", textMid: "#94A3B8",
  textDim: "#4A5568", font: "'JetBrains Mono', 'Fira Code', monospace",
};

const MARKET_GROUPS = {
  "Todos":      null,
  "Resultado":  ["HOME_WIN", "AWAY_WIN"],
  "Run Line":   ["RUN_LINE_H", "RUN_LINE_A"],
  "Over":       ["OVER 7.5 RUNS", "OVER 8.5 RUNS", "OVER 9.5 RUNS"],
  "Under":      ["UNDER 7.5 RUNS", "UNDER 8.5 RUNS", "UNDER 9.5 RUNS"],
  "F5":         ["F5_OVER", "F5_UNDER"],
  "1º Inning":  ["NRFI", "YRFI"],
};

const MARKET_LABEL = {
  HOME_WIN:    "Vitória Mandante",
  AWAY_WIN:    "Vitória Visitante",
  RUN_LINE_H:  "Run Line -1.5 (Casa)",
  RUN_LINE_A:  "Run Line -1.5 (Fora)",
  F5_OVER:     "F5 Over",
  F5_UNDER:    "F5 Under",
  NRFI:        "NRFI — 1º sem run",
  YRFI:        "YRFI — 1º com run",
};

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

function PitcherRow({ label, name, era, whip }) {
  if (!name) return null;
  const eraColor = era != null ? (era <= 3.0 ? T.green : era <= 4.5 ? T.yellow : T.red) : T.textDim;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.68rem", color: T.textMid }}>
      <span style={{ color: T.textDim, minWidth: 28 }}>{label}</span>
      <span style={{ color: T.text }}>{name}</span>
      {era != null && (
        <span style={{ color: eraColor, fontWeight: 700 }}>ERA {era.toFixed(2)}</span>
      )}
      {whip != null && (
        <span style={{ color: T.textDim }}>WHIP {whip.toFixed(2)}</span>
      )}
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
  const hasPitchers = game.home_pitcher || game.away_pitcher;

  // Agrupar mercados por categoria
  const groups = [
    { title: "Resultado",    keys: ["HOME_WIN","AWAY_WIN"] },
    { title: "Run Line ±1.5",keys: ["RUN_LINE_H","RUN_LINE_A"] },
    { title: "Total de Runs",keys: game.markets.filter(m => m.market.startsWith("OVER") || m.market.startsWith("UNDER")).map(m => m.market) },
    { title: "Primeiros 5",  keys: ["F5_OVER","F5_UNDER"] },
    { title: "1º Inning",    keys: ["NRFI","YRFI"] },
  ];

  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", marginBottom: "0.75rem", overflow: "hidden" }}>
        <AffiliateCTA index={index} />
      {/* Header — sempre visível */}
      <div onClick={() => setOpen(o => !o)} style={{ padding: "1rem", cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: T.text }}>{game.away_team}</div>
            <div style={{ fontSize: "0.7rem", color: T.textMid }}>@ {game.home_team}</div>
            <div style={{ fontSize: "0.65rem", color: T.textDim, marginTop: "2px" }}>{game.venue}</div>
            {hasPitchers && (
              <div style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "2px" }}>
                <PitcherRow label="vs" name={game.away_pitcher} era={game.away_era} whip={game.away_whip} />
                <PitcherRow label="sp" name={game.home_pitcher} era={game.home_era} whip={game.home_whip} />
              </div>
            )}
          </div>
          <div style={{ textAlign: "right", minWidth: 80 }}>
            <div style={{ fontSize: "0.65rem", color: T.textDim }}>{date}</div>
            <div style={{ fontSize: "0.65rem", color: T.textMid, marginTop: "2px" }}>
              {game.home_wins}W-{game.home_losses}L vs {game.away_wins}W-{game.away_losses}L
            </div>
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

      {/* Mercados expandidos */}
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
                {items.map((m, i) => (
                  <div key={i} style={{ background: T.surfaceHi, borderRadius: "6px", padding: "0.5rem 0.75rem", marginBottom: "0.4rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "0.72rem", color: T.textMid }}>
                        {MARKET_LABEL[m.market] || m.market}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {m.detail && (
                          <span style={{ fontSize: "0.62rem", color: T.textDim }}>{m.detail}</span>
                        )}
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
    </div>
  );
}

function HistoryTab() {
  const [hist, setHist]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod]   = useState("all");

  useEffect(() => {
    setLoading(true);
    fetch(`${MLB_API}/mlb/history?period=${period}`)
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
        <div style={{ color: T.textMid, fontSize: "0.85rem", padding: "2rem", textAlign: "center", background: T.surface, borderRadius: "8px" }}>
          Histórico em construção — resultados registrados conforme jogos finalizam.
        </div>
      )}
      {!loading && hist && hist.total > 0 && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Total",   value: hist.total },
              { label: "Acertos", value: hist.wins, color: T.green },
              { label: "Taxa",    value: `${hist.win_rate}%`, color: hist.win_rate >= 60 ? T.green : T.yellow },
              { label: "ROI",     value: `${hist.roi}%`,      color: roiColor(hist.roi) },
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
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: data.win_rate >= 60 ? T.green : T.yellow }}>{data.win_rate}%</span>
                    <span style={{ fontSize: "0.72rem", color: roiColor(data.roi) }}>ROI {data.roi}%</span>
                  </div>
                </div>
                <div style={{ width: "100%", background: T.border, borderRadius: "4px", height: "3px" }}>
                  <div style={{ width: `${Math.min(data.win_rate, 100)}%`, height: "100%", background: data.win_rate >= 60 ? T.green : T.yellow, borderRadius: "4px" }} />
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
    const res = await fetch(`${MLB_API}/mlb/opportunities/by-game?min_probability=55&days=7`);
    if (res.ok) {
      const data = await res.json();
      initialData = (data.games || []).map(g => ({
        ...g,
        markets: (g.markets || []).sort((a, b) => b.probability - a.probability),
      }));
    }
  } catch (e) {
    console.error("Erro ao buscar oportunidades MLB no getStaticProps:", e.message);
  }
  return { props: { initialData }, revalidate: 300 };
}

export default function MLBPage({ initialData }) {
  const [allGames, setAllGames]       = useState(initialData || []);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [minProb, setMinProb]         = useState(55);
  const [marketGroup, setMarketGroup] = useState("Todos");
  const [dateFilter, setDateFilter]   = useState("todos");
  const [tab, setTab]                 = useState("opps");
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) { isFirstRun.current = false; return; }
    setLoading(true);
    fetch(`${MLB_API}/mlb/opportunities/by-game?min_probability=${minProb}&days=7`)
      .then(r => r.json())
      .then(data => {
        const games = (data.games || []).map(g => ({
          ...g,
          markets: (g.markets || []).sort((a, b) => b.probability - a.probability),
        }));
        setAllGames(games);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [minProb]);

  const games = useMemo(() => {
    const now         = new Date();
    // Datas em horário de Brasília (UTC-3)
    const toBRT = (d) => {
      const dt = new Date(d.getTime() - 3 * 60 * 60 * 1000);
      return dt.toISOString().slice(0,10);
    };
    const todayBRT    = toBRT(now);
    const tomorrowBRT = toBRT(new Date(now.getTime() + 24 * 60 * 60 * 1000));
    const allowedMarkets = MARKET_GROUPS[marketGroup];

    return allGames.map(g => {
      // game_date vem em UTC — converter para BRT para comparar
      const gDate = toBRT(new Date(g.game_date + "Z"));
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
        <title>Oportunidades MLB — FutAnalysis | Análise Estatística de Beisebol</title>
        <meta name="description" content="Análise MLB com modelo Poisson ajustado por ERA/WHIP. Mercados: resultado, run line, F5, NRFI/YRFI." />
        <link rel="canonical" href="https://futanalysis.com.br/mlb" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/opportunities" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← oportunidades</Link>
          <Link href="/analises/mlb" style={{ color: T.yellow, textDecoration: "none", fontSize: "0.72rem", background: T.yellow + "18", border: `1px solid ${T.yellow}33`, borderRadius: "20px", padding: "3px 10px" }}>📋 análises mlb →</Link>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: "0 0 0.3rem", fontSize: "1.4rem", fontWeight: 700, color: T.yellow }}>⚾ MLB — Beisebol</h1>
          <p style={{ margin: 0, fontSize: "0.78rem", color: T.textMid }}>
            Modelo Poisson · ERA/WHIP · Run Line · F5 · NRFI/YRFI · Últimos 60 jogos
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: `1px solid ${T.border}`, paddingBottom: "0.75rem" }}>
          <FilterBtn label="🎯 Oportunidades" active={tab==="opps"} onClick={() => setTab("opps")} />
          <FilterBtn label="📊 Histórico"     active={tab==="hist"} onClick={() => setTab("hist")} />
        </div>

        {tab === "hist" && <HistoryTab />}

        {tab === "opps" && (
          <>
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

            {!loading && !error && (
              <div style={{ fontSize: "0.7rem", color: T.textDim, marginBottom: "1rem" }}>
                {games.length} jogo{games.length !== 1 ? "s" : ""} com oportunidades
              </div>
            )}
            {loading && <div style={{ color: T.textMid, fontSize: "0.85rem" }}>Carregando...</div>}
            {error   && <div style={{ color: T.red,    fontSize: "0.85rem" }}>Erro: {error}</div>}
            {!loading && !error && games.length === 0 && (
              <div style={{ color: T.textMid, fontSize: "0.85rem" }}>Nenhuma oportunidade encontrada.</div>
            )}
            {!loading && !error && games.map((g, i) => <GameCard key={g.game_id} game={g} index={(6 + i) % 10} />)}
          </>
        )}

        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${T.border}`, fontSize: "0.65rem", color: T.textDim, textAlign: "center" }}>
          FutAnalysis · futanalysis.sport@gmail.com
        </div>
      </div>
    </>
  );
}
