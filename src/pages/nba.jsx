// src/pages/nba.jsx — v3: padrão MLB/NFL
import AffiliateCTA from "../components/AffiliateCTA";
import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";

const NBA_API = "https://futanalysis.com.br/nba-api";
const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", red: "#E83B3B",
  green: "#2ECC71", blue: "#3B82F6", orange: "#FF8C00",
  purple: "#8B5CF6", text: "#EDF2F7", textMid: "#94A3B8",
  textDim: "#4A5568", font: "'JetBrains Mono', 'Fira Code', monospace",
  nba: "#C9082A",
};

const MARKET_GROUPS = {
  "Todos":     null,
  "Resultado": ["HOME_WIN", "AWAY_WIN"],
  "Over":      null,
  "Under":     null,
  "Handicap":  null,
  "Quarters":  null,
  "Lead Q1":   ["LEAD_Q1_HOME", "LEAD_Q1_AWAY"],
};

function matchGroup(market, group) {
  if (group === "Todos")    return true;
  if (group === "Resultado") return ["HOME_WIN","AWAY_WIN"].includes(market);
  if (group === "Over")      return market.startsWith("OVER");
  if (group === "Under")     return market.startsWith("UNDER");
  if (group === "Handicap")  return market.startsWith("HANDICAP");
  if (group === "Quarters")  return /^Q[1-4]/.test(market);
  if (group === "Lead Q1")   return market.startsWith("LEAD_Q1");
  return true;
}

function getMarketLabel(market) {
  const map = {
    HOME_WIN:      "Vitória Mandante",
    AWAY_WIN:      "Vitória Visitante",
    LEAD_Q1_HOME:  "Lidera 1º Quarto (Casa)",
    LEAD_Q1_AWAY:  "Lidera 1º Quarto (Fora)",
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
      background: active ? T.nba : T.surface,
      color: active ? "#fff" : T.textMid,
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

function GameCard({ item, index = 0 }) {
  const [open, setOpen] = useState(false);
  const date = item.game_date
    ? new Date(item.game_date).toLocaleString("pt-BR", {
        day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
      })
    : "—";
  const topMarket = item.markets[0];

  const groups = [
    { title: "Resultado",   filter: m => ["HOME_WIN","AWAY_WIN"].includes(m.market) },
    { title: "Over/Under",  filter: m => m.market.startsWith("OVER") || m.market.startsWith("UNDER") },
    { title: "Handicap",    filter: m => m.market.startsWith("HANDICAP") },
    { title: "Quarters",    filter: m => /^Q[1-4]/.test(m.market) },
    { title: "1º Quarto",   filter: m => m.market.startsWith("LEAD_Q1") },
  ];

  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", marginBottom: "0.75rem", overflow: "hidden" }}>
      <AffiliateCTA index={index} />
      <div onClick={() => setOpen(o => !o)} style={{ padding: "1rem", cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: T.text }}>{item.away_team}</div>
            <div style={{ fontSize: "0.7rem", color: T.textMid }}>@ {item.home_team}</div>
            <div style={{ display: "flex", gap: "1rem", fontSize: "0.68rem", color: T.textMid, marginTop: "0.4rem", flexWrap: "wrap" }}>
              <span>total esp. <span style={{ color: T.yellow, fontWeight: 700 }}>{item.expected_total}</span></span>
              <span>casa {Math.round(item.home_stats.win_rate * 100)}% vit.</span>
              <span>fora {Math.round(item.away_stats.win_rate * 100)}% vit.</span>
            </div>
          </div>
          <div style={{ textAlign: "right", minWidth: 90 }}>
            <div style={{ fontSize: "0.65rem", color: T.textDim }}>{date}</div>
            <div style={{ marginTop: "0.5rem" }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: probColor(topMarket.probability) }}>
                {topMarket.probability}%
              </span>
              <div style={{ fontSize: "0.6rem", color: T.textDim }}>{getMarketLabel(topMarket.market)}</div>
            </div>
            <div style={{ fontSize: "0.65rem", color: T.textDim, marginTop: "4px" }}>
              {item.markets.length} mercados {open ? "▲" : "▼"}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: `1px solid ${T.border}`, padding: "0.75rem 1rem" }}>
          {groups.map(group => {
            const items = item.markets.filter(group.filter);
            if (!items.length) return null;
            return (
              <div key={group.title} style={{ marginBottom: "0.75rem" }}>
                <div style={{ fontSize: "0.6rem", color: T.textDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  {group.title}
                </div>
                {items.map((m, i) => (
                  <div key={i} style={{ background: T.surfaceHi, borderRadius: "6px", padding: "0.5rem 0.75rem", marginBottom: "0.4rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "0.72rem", color: T.textMid }}>{getMarketLabel(m.market)}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {m.detail && <span style={{ fontSize: "0.62rem", color: T.textDim }}>{m.detail}</span>}
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: probColor(m.probability) }}>{m.probability}%</span>
                      </div>
                    </div>
                    <ProbBar value={m.probability} />
                  </div>
                ))}
              </div>
            );
          })}
          <div style={{ marginTop: "0.5rem", padding: "0.5rem 0.75rem", background: T.surfaceHi, borderRadius: "6px" }}>
            <div style={{ fontSize: "0.6rem", color: T.textDim, textTransform: "uppercase", marginBottom: "0.4rem" }}>Médias por Quarto</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.3rem" }}>
              {[1,2,3,4].map(q => (
                <div key={q} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.58rem", color: T.textDim }}>Q{q}</div>
                  <div style={{ fontSize: "0.7rem", color: T.text }}>
                    {item.home_stats[`avg_q${q}_scored`]} × {item.away_stats[`avg_q${q}_scored`]}
                  </div>
                </div>
              ))}
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

  useEffect(() => {
    setLoading(true);
    fetch(`${NBA_API}/nba/history?period=${period}`)
      .then(r => r.json())
      .then(d => { setHist(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [period]);

  return (
    <div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {[["all","Tudo"],["30d","30 dias"],["7d","7 dias"]].map(([v,l]) => (
          <FilterBtn key={v} label={l} active={period===v} onClick={() => setPeriod(v)} />
        ))}
      </div>
      {loading && <div style={{ color: T.textMid, fontSize: "0.85rem" }}>Carregando...</div>}
      {!loading && (
        <div style={{ color: T.textMid, fontSize: "0.85rem", padding: "2rem", textAlign: "center", background: T.surface, borderRadius: "8px" }}>
          Histórico em construção — resultados registrados conforme temporada 2026-27 avança.<br/>
          <span style={{ fontSize: "0.72rem", color: T.textDim }}>NBA começa em outubro/2026.</span>
        </div>
      )}
    </div>
  );
}

function TeamsTab() {
  const [teams, setTeams]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort]       = useState("win_rate");

  useEffect(() => {
    fetch(`${NBA_API}/nba/teams`)
      .then(r => r.json())
      .then(d => { setTeams(d.teams || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sorted = useMemo(() => {
    return [...teams].sort((a, b) => (b[sort] || 0) - (a[sort] || 0));
  }, [teams, sort]);

  return (
    <div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {[["win_rate","% Vitórias"],["avg_scored","Ataque"],["avg_allowed","Defesa (menor)"],["avg_total","Total pts"]].map(([v,l]) => (
          <FilterBtn key={v} label={l} active={sort===v} onClick={() => setSort(v)} />
        ))}
      </div>
      {loading && <div style={{ color: T.textMid, fontSize: "0.85rem" }}>Carregando...</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {sorted.map((t, i) => (
          <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "6px", padding: "0.75rem 1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.text }}>{t.team}</span>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: t.win_rate >= 0.5 ? T.green : T.red }}>
                {Math.round(t.win_rate * 100)}% vit.
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.3rem" }}>
              {[
                { label: "Ataque",  value: t.avg_scored,  color: T.yellow },
                { label: "Defesa",  value: t.avg_allowed, color: T.red },
                { label: "Total",   value: t.avg_total,   color: T.blue },
                { label: "Jogos",   value: t.games,       color: T.textMid },
              ].map((s, j) => (
                <div key={j} style={{ background: T.surfaceHi, borderRadius: "4px", padding: "0.3rem", textAlign: "center" }}>
                  <div style={{ fontSize: "0.55rem", color: T.textDim }}>{s.label}</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NBAPage() {
  const [allOpps, setAllOpps]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [minProb, setMinProb]         = useState(55);
  const [marketGroup, setMarketGroup] = useState("Todos");
  const [dateFilter, setDateFilter]   = useState("todos");
  const [tab, setTab]                 = useState("opps");

  useEffect(() => {
    setLoading(true);
    fetch(`${NBA_API}/nba/opportunities?min_probability=${minProb}&days_ahead=7`)
      .then(r => r.json())
      .then(d => { setAllOpps(d.opportunities || []); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [minProb]);

  const games = useMemo(() => {
    const now = new Date();
    const toBRT = d => new Date(d.getTime() - 3*60*60*1000).toISOString().slice(0,10);
    const todayBRT    = toBRT(now);
    const tomorrowBRT = toBRT(new Date(now.getTime() + 24*60*60*1000));

    return allOpps.map(item => {
      const gDate = item.game_date?.slice(0,10);
      if (dateFilter === "hoje"   && gDate !== todayBRT)    return null;
      if (dateFilter === "amanha" && gDate !== tomorrowBRT) return null;
      const markets = item.markets.filter(m => matchGroup(m.market, marketGroup));
      if (!markets.length) return null;
      return { ...item, markets };
    }).filter(Boolean)
      .sort((a, b) => (b.markets[0]?.probability || 0) - (a.markets[0]?.probability || 0));
  }, [allOpps, marketGroup, dateFilter]);

  const isOffseason = !loading && allOpps.length === 0;

  return (
    <>
      <Head>
        <title>Oportunidades NBA — FutAnalysis | Análise Estatística de Basquete</title>
        <meta name="description" content="Análise NBA com modelo probabilístico. Resultado, Over/Under, Handicap, Quarters e Lead Q1. Temporada 2026-27." />
        <link rel="canonical" href="https://futanalysis.com.br/nba" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/opportunities" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← oportunidades</Link>
          <Link href="/analises/nba" style={{ color: T.yellow, textDecoration: "none", fontSize: "0.72rem", background: T.yellow + "18", border: `1px solid ${T.yellow}33`, borderRadius: "20px", padding: "3px 10px" }}>📋 análises nba →</Link>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: "0 0 0.3rem", fontSize: "1.4rem", fontWeight: 700, color: T.nba }}>🏀 NBA — Basquete</h1>
          <p style={{ margin: 0, fontSize: "0.78rem", color: T.textMid }}>
            Resultado · Over/Under · Handicap · Quarters · Lead Q1 · Últimos 20 jogos
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: `1px solid ${T.border}`, paddingBottom: "0.75rem", flexWrap: "wrap" }}>
          {[["opps","🎯 Oportunidades"],["hist","📊 Histórico"],["teams","🏆 Times"]].map(([v,l]) => (
            <FilterBtn key={v} label={l} active={tab===v} onClick={() => setTab(v)} />
          ))}
        </div>

        {tab === "hist"  && <HistoryTab />}
        {tab === "teams" && <TeamsTab />}

        {tab === "opps" && (
          <>
            {isOffseason && (
              <div style={{ background: T.surface, border: `1px solid ${T.nba}44`, borderRadius: "8px", padding: "1.25rem 1.5rem", marginBottom: "1.5rem", borderLeft: `3px solid ${T.nba}` }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: T.nba, marginBottom: "0.3rem" }}>🏀 Entre temporadas</div>
                <div style={{ fontSize: "0.78rem", color: T.textMid, lineHeight: 1.7 }}>
                  A temporada NBA 2024-25 foi encerrada. A temporada 2025-26 começa em <b style={{ color: T.text }}>outubro/2026</b> — oportunidades geradas automaticamente quando os jogos forem publicados.
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
                Nenhuma oportunidade com os filtros selecionados.
              </div>
            )}
            {!loading && !error && games.map((g, i) => (
              <GameCard key={g.game_id} item={g} index={(5 + i) % 10} />
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
