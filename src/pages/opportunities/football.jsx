// src/pages/opportunities/football.jsx
import AffiliateCTA from "../../components/AffiliateCTA";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", red: "#E83B3B",
  green: "#2ECC71", blue: "#3B82F6", orange: "#FF8C00",
  text: "#EDF2F7", textMid: "#94A3B8", textDim: "#4A5568",
  font: "'JetBrains Mono', 'Fira Code', monospace",
};

const FOOTBALL_MARKETS = [
  { key: "all",       label: "Todos"      },
  { key: "GOAL_HT",   label: "Gol HT"    },
  { key: "OVER_1.5",  label: "Over 1.5"  },
  { key: "OVER_2.5",  label: "Over 2.5"  },
  { key: "UNDER_2.5", label: "Under 2.5" },
  { key: "BTTS",      label: "BTTS"      },
  { key: "HOME_WIN",  label: "Casa vence"},
  { key: "AWAY_WIN",  label: "Fora vence"},
  { key: "fouls",     label: "Faltas"    },
];

const MARKET_COLOR = {
  "GOAL_HT":   "#F5C518",
  "OVER_1.5":  "#2ECC71",
  "OVER_2.5":  "#2ECC71",
  "UNDER_2.5": "#3B82F6",
  "BTTS":      "#8B5CF6",
  "HOME_WIN":  "#FF8C00",
  "AWAY_WIN":  "#E83B3B",
  "fouls":     "#14B8A6",
};

function FoulsCard({ item }) {
  const color = "#14B8A6";
  const dateStr = item.match_date
    ? new Date(item.match_date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })
    : "—";
  const conf = item.confidence || 0;
  return (
    <>
      <Head>
        <title>Oportunidades de Futebol — FutAnalysis | Análise Estatística</title>
        <meta name="description" content="Oportunidades de futebol calculadas por modelo estatístico avançado. Mercados de Over/Under, BTTS, resultado e gol no 1º tempo para mais de 110 ligas do mundo." />
        <link rel="canonical" href="https://futanalysis.com.br/opportunities/football" />
      </Head>
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "10px", overflow: "hidden", transition: "border-color 0.2s, transform 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color + "66"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ height: "3px", background: color }} />
      <div style={{ padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.68rem", color: T.textDim, textTransform: "uppercase" }}>{item.league || "—"}</span>
          <span style={{ fontSize: "0.65rem", color, background: color + "18", border: `1px solid ${color}33`, borderRadius: "20px", padding: "2px 8px" }}>{item.recommendation}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
          <div style={{ fontWeight: 700, fontSize: "0.82rem", color: T.text }}>{item.home_team}</div>
          <span style={{ fontSize: "0.7rem", color: T.textDim, textAlign: "center" }}>vs</span>
          <div style={{ fontWeight: 700, fontSize: "0.82rem", color: T.text, textAlign: "right" }}>{item.away_team}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", background: T.surfaceHi, borderRadius: "6px", padding: "0.4rem 0.6rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.72rem", color: T.textMid }}>Média esperada</span>
          <span style={{ fontSize: "0.72rem", color, fontWeight: 700 }}>{item.avg_expected} faltas</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", background: T.surfaceHi, borderRadius: "6px", padding: "0.4rem 0.6rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.65rem", color: T.textDim }}>Casa: {item.home_stats?.avg_all} avg</span>
          <span style={{ fontSize: "0.65rem", color: T.textDim }}>Fora: {item.away_stats?.avg_all} avg</span>
        </div>
        <div style={{ fontSize: "0.68rem", color: T.textDim, marginBottom: "0.6rem" }}>{dateStr}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
          <span style={{ fontSize: "0.72rem", color: T.textMid }}>Confiança</span>
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: probColor(conf) }}>{conf}%</span>
        </div>
        <ProbBar value={conf} />
      </div>
    </div>
    </>
  );
}

function probColor(p) {
  if (p >= 75) return T.green;
  if (p >= 65) return T.yellow;
  if (p >= 55) return T.orange;
  return T.red;
}

function ProbBar({ value }) {
  return (

    <div style={{ width: "100%", background: T.border, borderRadius: "4px", height: "5px", overflow: "hidden" }}>
      <div style={{ width: `${Math.min(value, 100)}%`, height: "100%", background: probColor(value), borderRadius: "4px", transition: "width 0.5s" }} />
    </div>
  );
}

function MatchCard({ item, index = 0 }) {
  const color = MARKET_COLOR[item.market] || T.textMid;
  const dateStr = item.match_date
    ? new Date(item.match_date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })
    : "—";

  const posLabel = (pos, played) => pos ? `${pos}º/${played}` : "—";

  return (

    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "10px", overflow: "hidden", transition: "border-color 0.2s, transform 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color + "66"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ height: "3px", background: color }} />
      <div style={{ padding: "1rem" }}>

        {/* Liga + mercado */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.68rem", color: T.textDim, textTransform: "uppercase" }}>{item.league || "—"}</span>
          <span style={{ fontSize: "0.65rem", color, background: color + "18", border: `1px solid ${color}33`, borderRadius: "20px", padding: "2px 8px" }}>{item.market}</span>
        </div>

        {/* Times com posição */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: T.text }}>{item.home_team}</div>
            <div style={{ fontSize: "0.65rem", color: T.textDim }}>{posLabel(item.home_position, item.home_played)}</div>
          </div>
          <span style={{ fontSize: "0.7rem", color: T.textDim, textAlign: "center" }}>vs</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: T.text }}>{item.away_team}</div>
            <div style={{ fontSize: "0.65rem", color: T.textDim }}>{posLabel(item.away_position, item.away_played)}</div>
          </div>
        </div>

        {/* xG */}
        {(item.home_xg || item.away_xg) ? (
          <div style={{ display: "flex", justifyContent: "space-between", background: T.surfaceHi, borderRadius: "6px", padding: "0.4rem 0.6rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.72rem", color: T.green }}>xG: {item.home_xg?.toFixed(2)}</span>
            <span style={{ fontSize: "0.65rem", color: T.textDim }}>expected goals</span>
            <span style={{ fontSize: "0.72rem", color: T.green }}>xG: {item.away_xg?.toFixed(2)}</span>
          </div>
        ) : null}

        {/* Data */}
        <div style={{ fontSize: "0.68rem", color: T.textDim, marginBottom: "0.6rem" }}>{dateStr}</div>

        {/* Probabilidade */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
          <span style={{ fontSize: "0.72rem", color: T.textMid }}>Probabilidade</span>
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: probColor(item.probability) }}>{item.probability?.toFixed(1)}%</span>
        </div>
        <ProbBar value={item.probability || 0} />
        <AffiliateCTA index={index} />
      </div>
    </div>
  );
}

export default function FootballOpportunities() {
  const [data,         setData]         = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState(null);
  const [market,       setMarket]       = useState("all");
  const [dateFilter,   setDateFilter]   = useState("all");
  const [leagueFilter, setLeagueFilter] = useState("all");
  const [minProb,      setMinProb]      = useState("55");
  const [foulsData,    setFoulsData]    = useState([]);
  const [historyData,  setHistoryData]  = useState(null);
  const [histLoading,  setHistLoading]  = useState(false);
  const [histPeriod,   setHistPeriod]   = useState("all");
  const [activeTab,    setActiveTab]    = useState("opps");

  useEffect(() => { fetchData(); fetchFouls(); }, []);

  async function fetchData() {
    setLoading(true); setError(null);
    try {
      const params = new URLSearchParams({ date: "all", min_probability: minProb, scope: "match", limit: 300 });
      const res = await fetch(`${API}/opportunities?${params}`);
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const json = await res.json();
      setData(Array.isArray(json) ? json : (json.data || []));
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function fetchFouls() {
    try {
      const res = await fetch(`${API}/fouls-opportunities?line=19.5&min_confidence=55&limit=200`);
      if (!res.ok) return;
      const json = await res.json();
      setFoulsData(json.opportunities || []);
    } catch (e) {}
  }

  async function fetchHistory(group, period) {
    setHistLoading(true);
    try {
      const p = period || histPeriod || "all";
      const res = await fetch(`${API}/history?group=gols&period=${p}`);
      const json = await res.json();
      setHistoryData(json);
    } catch(e) {} finally { setHistLoading(false); }
  }
  const today    = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const isFouls = market === "fouls";

  const filtered = isFouls
    ? foulsData.filter(item => {
        const d = item.match_date?.slice(0, 10);
        if (dateFilter === "today"    && d !== today)    return false;
        if (dateFilter === "tomorrow" && d !== tomorrow) return false;
        if (leagueFilter !== "all" && item.league !== leagueFilter) return false;
        return true;
      }).sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    : data.filter(item => {
        const d = item.match_date?.slice(0, 10);
        if (dateFilter === "today"    && d !== today)    return false;
        if (dateFilter === "tomorrow" && d !== tomorrow) return false;
        if (market !== "all" && item.market !== market)  return false;
        if (leagueFilter !== "all" && item.league !== leagueFilter) return false;
        return true;
      }).sort((a, b) => (b.probability || 0) - (a.probability || 0));

  const leagues = [...new Set((isFouls ? foulsData : data).map(o => o.league).filter(Boolean))].sort();

  const inp = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: "6px", color: T.text, padding: "0.45rem 0.7rem", fontSize: "0.78rem", fontFamily: T.font, outline: "none" };
  const btnP = { background: T.green, color: "#000", border: "none", borderRadius: "6px", padding: "0.45rem 1.1rem", fontWeight: 700, fontSize: "0.78rem", fontFamily: T.font, cursor: "pointer" };

  return (

      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
        <Link href="/opportunities" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← oportunidades</Link>
        <Link href="/analises/futebol" style={{ color: T.green, textDecoration: "none", fontSize: "0.72rem", background: T.green + "18", border: `1px solid ${T.green}33`, borderRadius: "20px", padding: "3px 10px" }}>📋 análises futebol →</Link>
        <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: T.green }}>⚽ Futebol</h1>
        <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: T.textMid }}>{filtered.length} oportunidades</span>
      </div>

        {/* Introdução */}
        <div style={{ background: T.surfaceHi, borderRadius: "10px", padding: "1rem 1.2rem", marginBottom: "1.5rem", borderLeft: `3px solid ${T.green}` }}>
          <p style={{ margin: 0, fontSize: "0.78rem", color: T.textMid, lineHeight: 1.7 }}>
            Oportunidades calculadas pelo modelo <strong style={{ color: T.text }}>Dixon-Coles com distribuição de Poisson</strong>, considerando força de ataque e defesa de cada time, forma recente com peso exponencial e histórico de confrontos diretos. Mercados disponíveis: Over/Under 1.5 e 2.5 gols, BTTS, Gol no 1º tempo, Casa vence e Fora vence.
          </p>
        </div>
      {/* Tabs principais */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.2rem", borderBottom: `1px solid ${T.border}`, paddingBottom: "0.8rem" }}>
        {[["opps","⚽ Oportunidades"],["history","📊 Histórico de Acertos"]].map(([tab, label]) => (
          <button key={tab} onClick={() => { setActiveTab(tab); if(tab==="history") fetchHistory(); }} style={{
            background: activeTab===tab ? T.green+"22" : "transparent",
            color: activeTab===tab ? T.green : T.textMid,
            border: `1px solid ${activeTab===tab ? T.green : T.border}`,
            borderRadius: "8px", padding: "0.4rem 1rem",
            fontSize: "0.78rem", fontFamily: T.font, cursor: "pointer",
            fontWeight: activeTab===tab ? 700 : 400,
          }}>{label}</button>
        ))}
      </div>

      {activeTab === "history" && (
        <div>
          {histLoading && <div style={{ color: T.textMid, fontSize: "0.82rem" }}>Carregando histórico…</div>}

      {/* Filtro de período */}
      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.65rem", color: T.textDim, alignSelf: "center", textTransform: "uppercase", marginRight: "0.2rem" }}>Período:</span>
        {[["all","Tudo"],["90d","90 dias"],["30d","30 dias"],["7d","7 dias"]].map(([p, label]) => (
          <button key={p} onClick={() => { setHistPeriod(p); setHistoryData(null); fetchHistory(undefined, p); }} style={{
            background: histPeriod===p ? T.green+"22" : "transparent",
            color: histPeriod===p ? T.green : T.textMid,
            border: `1px solid ${histPeriod===p ? T.green : T.border}`,
            borderRadius: "20px", padding: "0.3rem 0.8rem",
            fontSize: "0.72rem", fontFamily: T.font, cursor: "pointer",
            fontWeight: histPeriod===p ? 700 : 400,
          }}>{label}</button>
        ))}
      </div>
          {historyData && (
            <>
              {/* Resumo geral */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.8rem", marginBottom: "1.5rem" }}>
                {[
                  { label: "Total analisado", value: historyData.resumo.total, color: T.textMid },
                  { label: "Acertos",          value: historyData.resumo.acertos, color: T.green },
                  { label: "Taxa de acerto",   value: `${historyData.resumo.taxa_acerto}%`, color: historyData.resumo.taxa_acerto >= 60 ? T.green : T.yellow },
                  { label: "ROI simulado",     value: `${historyData.resumo.roi_total > 0 ? "+" : ""}${historyData.resumo.roi_total}u`, color: historyData.resumo.roi_total >= 0 ? T.green : T.red },
                ].map(c => (
                  <div key={c.label} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "10px", padding: "1rem", textAlign: "center" }}>
                    <div style={{ fontSize: "0.65rem", color: T.textDim, textTransform: "uppercase", marginBottom: "0.4rem" }}>{c.label}</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 700, color: c.color }}>{c.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: "0.65rem", color: T.textDim, marginBottom: "1rem" }}>
                * ROI simulado com odd fixa 1.60 por oportunidade. Apostas reais podem variar.
              </div>
              {/* Tabela por mercado */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                      {["Mercado","Total","Acertos","Erros","Taxa","ROI (1.60)"].map(h => (
                        <th key={h} style={{ padding: "0.6rem 0.8rem", color: T.textMid, textAlign: h==="Mercado"?"left":"center", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.mercados.map(m => (
                      <tr key={m.market} style={{ borderBottom: `1px solid ${T.border}22` }}
                        onMouseEnter={e => e.currentTarget.style.background = T.surfaceHi}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td style={{ padding: "0.6rem 0.8rem", color: T.text, fontWeight: 600 }}>{m.label || m.market}</td>
                        <td style={{ padding: "0.6rem 0.8rem", color: T.textMid, textAlign: "center" }}>{m.total}</td>
                        <td style={{ padding: "0.6rem 0.8rem", color: T.green, textAlign: "center", fontWeight: 700 }}>{m.acertos}</td>
                        <td style={{ padding: "0.6rem 0.8rem", color: T.red, textAlign: "center" }}>{m.erros}</td>
                        <td style={{ padding: "0.6rem 0.8rem", textAlign: "center" }}>
                          <span style={{ color: m.taxa_acerto >= 60 ? T.green : m.taxa_acerto >= 50 ? T.yellow : T.red, fontWeight: 700 }}>{m.taxa_acerto}%</span>
                        </td>
                        <td style={{ padding: "0.6rem 0.8rem", textAlign: "center" }}>
                          <span style={{ color: m.roi >= 0 ? T.green : T.red, fontWeight: 700 }}>{m.roi >= 0 ? "+" : ""}{m.roi}u</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "opps" && <>
      {/* Filtros de mercado como botões */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
        {FOOTBALL_MARKETS.map(m => (
          <button key={m.key} onClick={() => setMarket(m.key)} style={{
            background: market === m.key ? T.green : T.surface,
            color: market === m.key ? "#000" : T.textMid,
            border: `1px solid ${market === m.key ? T.green : T.border}`,
            borderRadius: "20px", padding: "0.35rem 0.9rem",
            fontSize: "0.75rem", fontFamily: T.font, cursor: "pointer",
            fontWeight: market === m.key ? 700 : 400,
            transition: "all 0.15s",
          }}>{m.label}</button>
        ))}
      </div>

      {/* Filtros secundários */}
      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: "0.62rem", color: T.textMid, marginBottom: "0.25rem", textTransform: "uppercase" }}>Data</div>
          <select style={inp} value={dateFilter} onChange={e => setDateFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="today">Hoje</option>
            <option value="tomorrow">Amanhã</option>
          </select>
        </div>
        <div>
          <div style={{ fontSize: "0.62rem", color: T.textMid, marginBottom: "0.25rem", textTransform: "uppercase" }}>Liga</div>
          <select style={inp} value={leagueFilter} onChange={e => setLeagueFilter(e.target.value)}>
            <option value="all">Todas</option>
            {leagues.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <div style={{ fontSize: "0.62rem", color: T.textMid, marginBottom: "0.25rem", textTransform: "uppercase" }}>Prob. mín.</div>
          <select style={inp} value={minProb} onChange={e => setMinProb(e.target.value)}>
            <option value="50">50%+</option>
            <option value="55">55%+</option>
            <option value="60">60%+</option>
            <option value="70">70%+</option>
          </select>
        </div>
        <button style={btnP} onClick={fetchData}>Atualizar</button>
      </div>

      {error   && <div style={{ color: T.red, fontSize: "0.82rem", marginBottom: "1rem" }}>⚠ {error}</div>}
      {loading && <div style={{ color: T.textMid, fontSize: "0.82rem", marginBottom: "1rem" }}>Carregando…</div>}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: "center", color: T.textMid, padding: "3rem", fontSize: "0.85rem" }}>
          Nenhuma oportunidade encontrada. Tente ajustar os filtros.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
        {filtered.map((item, i) => isFouls
          ? <FoulsCard key={`fouls-${item.match_id}-${i}`} item={item} />
          : <MatchCard key={`${item.match_id}-${item.market}-${i}`} item={item} index={i} />
        )}
      </div>
    </>
    }
    </div>
  );
}
