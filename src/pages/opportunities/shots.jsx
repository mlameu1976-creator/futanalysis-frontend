// src/pages/opportunities/shots.jsx
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

const GROUPS = [
  { key: "total",    label: "Finalizações", lines: ["20.5", "25.5", "30.5"] },
  { key: "on_goal",  label: "Chutes a Gol", lines: ["6.5", "8.5", "10.5"]  },
];

const SIDES = [
  { key: "all",   label: "Todos" },
  { key: "over",  label: "Over"  },
  { key: "under", label: "Under" },
];

export async function getStaticProps() {
  let initialData = [];
  try {
    const params = new URLSearchParams({ date: "all", min_probability: "55", scope: "shots", limit: 300 });
    const res = await fetch(`${API}/opportunities?${params}`);
    if (res.ok) {
      const json = await res.json();
      initialData = Array.isArray(json) ? json : (json.data || []);
    }
  } catch (e) {
    console.error("Erro ao buscar oportunidades (shots) no getStaticProps:", e.message);
  }
  return { props: { initialData }, revalidate: 300 };
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

function ShotsOppCard({ item, index = 0 }) {
  const isOver  = item.market?.startsWith("OVER");
  const onGoal  = item.market?.includes("SHOTS ON GOAL");
  const color   = onGoal ? (isOver ? T.orange : "#8B5CF6") : (isOver ? T.blue : T.green);
  const dateStr = item.match_date
    ? new Date(item.match_date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })
    : "—";
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "10px", overflow: "hidden", transition: "border-color 0.2s, transform 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color + "66"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ height: "3px", background: color }} />
      <div style={{ padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
          <span style={{ fontSize: "0.68rem", color: T.textDim, textTransform: "uppercase" }}>{item.league || "—"}</span>
          <span style={{ fontSize: "0.65rem", color, background: color + "18", border: `1px solid ${color}33`, borderRadius: "20px", padding: "2px 8px" }}>
            {onGoal ? "🎯" : "👟"} {item.market}
          </span>
        </div>
        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: T.text, marginBottom: "0.2rem" }}>
          {item.home_team} <span style={{ color: T.textDim }}>vs</span> {item.away_team}
        </div>

        {/* Média de chutes por time — evita que um time ofensivo "mascare" o outro */}
        {(item.home_stats || item.away_stats) ? (
          <div style={{ display: "flex", justifyContent: "space-between", background: T.surfaceHi, borderRadius: "6px", padding: "0.4rem 0.6rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.68rem", color: T.textMid }}>
              {item.home_team}: <strong style={{ color }}>{onGoal ? item.home_stats?.avg_sog_for : item.home_stats?.avg_for}</strong>
            </span>
            <span style={{ fontSize: "0.62rem", color: T.textDim }}>{onGoal ? "chutes a gol/jogo" : "chutes/jogo"}</span>
            <span style={{ fontSize: "0.68rem", color: T.textMid }}>
              {item.away_team}: <strong style={{ color }}>{onGoal ? item.away_stats?.avg_sog_for : item.away_stats?.avg_for}</strong>
            </span>
          </div>
        ) : null}

        <div style={{ fontSize: "0.68rem", color: T.textDim, marginBottom: "0.8rem" }}>{dateStr}</div>
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

export default function ShotsOpportunitiesPage({ initialData }) {
  const [allData,      setAllData]      = useState(initialData || []);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState(null);
  const [group,        setGroup]        = useState("total");
  const [side,         setSide]         = useState("all");
  const [line,         setLine]         = useState("all");
  const [teamFilter,   setTeamFilter]   = useState("all");
  const [dateFilter,   setDateFilter]   = useState("all");
  const [leagueFilter, setLeagueFilter] = useState("all");
  const [minProb,      setMinProb]      = useState("55");
  const [historyData,  setHistoryData]  = useState(null);
  const [histLoading,  setHistLoading]  = useState(false);
  const [histPeriod,   setHistPeriod]   = useState("all");
  const [activeTab,    setActiveTab]    = useState("opps");

  // Dado inicial já vem do servidor via getStaticProps (ISR)

  async function fetchData() {
    setLoading(true); setError(null);
    try {
      const params = new URLSearchParams({ date: "all", min_probability: minProb, scope: "shots", limit: 300 });
      const res = await fetch(`${API}/opportunities?${params}`);
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const json = await res.json();
      setAllData(Array.isArray(json) ? json : (json.data || []));
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function fetchHistory(period) {
    setHistLoading(true);
    try {
      const p = period || histPeriod || "all";
      const res = await fetch(`${API}/history?group=chutes&period=${p}`);
      const json = await res.json();
      setHistoryData(json);
    } catch(e) {} finally { setHistLoading(false); }
  }

  const today    = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const activeGroup = GROUPS.find(g => g.key === group);

  // reseta a linha selecionada se ela não existir no grupo atual
  useEffect(() => {
    if (line !== "all" && !activeGroup.lines.includes(line)) setLine("all");
  }, [group]);

  const filtered = allData.filter(item => {
    const d = item.match_date?.slice(0, 10);
    if (dateFilter === "today"    && d !== today)    return false;
    if (dateFilter === "tomorrow" && d !== tomorrow) return false;
    if (leagueFilter !== "all" && item.league !== leagueFilter) return false;
    if (teamFilter   !== "all" && item.home_team !== teamFilter && item.away_team !== teamFilter) return false;

    const onGoal = item.market?.includes("SHOTS ON GOAL");
    if (group === "on_goal" && !onGoal) return false;
    if (group === "total"   &&  onGoal) return false;

    const isOver = item.market?.startsWith("OVER");
    if (side === "over"  && !isOver) return false;
    if (side === "under" &&  isOver) return false;

    if (line !== "all" && !item.market?.includes(` ${line} `)) return false;

    return true;
  }).sort((a, b) => (b.probability || 0) - (a.probability || 0));

  const leagues = [...new Set(allData.map(o => o.league).filter(Boolean))].sort();
  const teams   = [...new Set(allData.flatMap(o => [o.home_team, o.away_team]).filter(Boolean))].sort();

  const inp  = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: "6px", color: T.text, padding: "0.45rem 0.7rem", fontSize: "0.78rem", fontFamily: T.font, outline: "none" };
  const btnP = { background: T.blue, color: "#000", border: "none", borderRadius: "6px", padding: "0.45rem 1.1rem", fontWeight: 700, fontSize: "0.78rem", fontFamily: T.font, cursor: "pointer" };

  return (
    <>
      <Head>
        <title>Oportunidades de Finalizações — FutAnalysis | Análise Estatística</title>
        <meta name="description" content="Oportunidades de chutes e chutes a gol no futebol calculadas por modelo estatístico. Over/Under de finalizações totais e no alvo para as principais ligas do mundo." />
        <link rel="canonical" href="https://futanalysis.com.br/opportunities/shots" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/opportunities" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← oportunidades</Link>
          <Link href="/analises/futebol" style={{ color: T.blue, textDecoration: "none", fontSize: "0.72rem", background: T.blue + "18", border: `1px solid ${T.blue}33`, borderRadius: "20px", padding: "3px 10px" }}>📋 análises futebol →</Link>
          <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: T.blue }}>👟 Finalizações</h1>
          <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: T.textMid }}>{filtered.length} oportunidades</span>
        </div>

        {/* Tabs principais */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.2rem", borderBottom: `1px solid ${T.border}`, paddingBottom: "0.8rem" }}>
          {[["opps","👟 Finalizações"],["history","📊 Histórico de Acertos"]].map(([tab, label]) => (
            <button key={tab} onClick={() => { setActiveTab(tab); if(tab==="history") fetchHistory(); }} style={{
              background: activeTab===tab ? T.blue+"22" : "transparent",
              color: activeTab===tab ? T.blue : T.textMid,
              border: `1px solid ${activeTab===tab ? T.blue : T.border}`,
              borderRadius: "8px", padding: "0.4rem 1rem",
              fontSize: "0.78rem", fontFamily: T.font, cursor: "pointer",
              fontWeight: activeTab===tab ? 700 : 400,
            }}>{label}</button>
          ))}
        </div>

        {activeTab === "history" && (
          <div>
            {histLoading && <div style={{ color: T.textMid, fontSize: "0.82rem" }}>Carregando histórico…</div>}

            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.65rem", color: T.textDim, alignSelf: "center", textTransform: "uppercase", marginRight: "0.2rem" }}>Período:</span>
              {[["all","Tudo"],["90d","90 dias"],["30d","30 dias"],["7d","7 dias"]].map(([p, label]) => (
                <button key={p} onClick={() => { setHistPeriod(p); setHistoryData(null); fetchHistory(p); }} style={{
                  background: histPeriod===p ? T.blue+"22" : "transparent",
                  color: histPeriod===p ? T.blue : T.textMid,
                  border: `1px solid ${histPeriod===p ? T.blue : T.border}`,
                  borderRadius: "20px", padding: "0.3rem 0.8rem",
                  fontSize: "0.72rem", fontFamily: T.font, cursor: "pointer",
                  fontWeight: histPeriod===p ? 700 : 400,
                }}>{label}</button>
              ))}
            </div>

            {historyData && historyData.resumo.total === 0 && (
              <div style={{ background: T.surfaceHi, borderRadius: "10px", padding: "1.5rem", borderLeft: "3px solid #F5C518", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⚙️</div>
                <div style={{ color: T.text, fontWeight: 700, marginBottom: "0.4rem" }}>Histórico em construção</div>
                <div style={{ color: T.textMid, fontSize: "0.78rem" }}>Estamos coletando resultados das partidas recentes. O histórico estará disponível em breve.</div>
              </div>
            )}

            {historyData && historyData.resumo.total > 0 && (
              <>
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

        {/* Introdução */}
        <div style={{ background: T.surfaceHi, borderRadius: "10px", padding: "1rem 1.2rem", marginBottom: "1.5rem", borderLeft: `3px solid ${T.blue}` }}>
          <p style={{ margin: 0, fontSize: "0.78rem", color: T.textMid, lineHeight: 1.7 }}>
            Oportunidades de chutes calculadas com base no <strong style={{ color: T.text }}>histórico dos últimos 15 jogos</strong> de cada time. Mercados: Over/Under de chutes totais (20.5, 25.5, 30.5) e chutes a gol (6.5, 8.5, 10.5) por partida.
          </p>
        </div>

        {/* Toggle de grupo */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {GROUPS.map(g => (
            <button key={g.key} onClick={() => { setGroup(g.key); setLine("all"); }} style={{
              background: group === g.key ? T.blue : T.surface,
              color:      group === g.key ? "#000" : T.textMid,
              border: `1px solid ${group === g.key ? T.blue : T.border}`,
              borderRadius: "8px", padding: "0.5rem 1.2rem",
              fontSize: "0.8rem", fontFamily: T.font, cursor: "pointer",
              fontWeight: group === g.key ? 700 : 400,
            }}>{g.label}</button>
          ))}
        </div>

        {/* Toggle Over/Under */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {SIDES.map(s => (
            <button key={s.key} onClick={() => setSide(s.key)} style={{
              background: side === s.key ? T.green : T.surface,
              color:      side === s.key ? "#000" : T.textMid,
              border: `1px solid ${side === s.key ? T.green : T.border}`,
              borderRadius: "20px", padding: "0.35rem 0.9rem",
              fontSize: "0.75rem", fontFamily: T.font, cursor: "pointer",
              fontWeight: side === s.key ? 700 : 400,
            }}>{s.label}</button>
          ))}
        </div>

        {/* Filtro de linha */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
          <button onClick={() => setLine("all")} style={{
            background: line === "all" ? T.yellow : T.surface,
            color:      line === "all" ? "#000"   : T.textMid,
            border: `1px solid ${line === "all" ? T.yellow : T.border}`,
            borderRadius: "20px", padding: "0.3rem 0.8rem",
            fontSize: "0.72rem", fontFamily: T.font, cursor: "pointer",
            fontWeight: line === "all" ? 700 : 400,
          }}>Todas as linhas</button>
          {activeGroup.lines.map(l => (
            <button key={l} onClick={() => setLine(l)} style={{
              background: line === l ? T.yellow : T.surface,
              color:      line === l ? "#000"   : T.textMid,
              border: `1px solid ${line === l ? T.yellow : T.border}`,
              borderRadius: "20px", padding: "0.3rem 0.8rem",
              fontSize: "0.72rem", fontFamily: T.font, cursor: "pointer",
              fontWeight: line === l ? 700 : 400,
            }}>{l}</button>
          ))}
        </div>

        {/* Filtros secundários */}
        <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.62rem", color: T.textMid, marginBottom: "0.25rem", textTransform: "uppercase" }}>Equipe</div>
            <select style={inp} value={teamFilter} onChange={e => setTeamFilter(e.target.value)}>
              <option value="all">Todas</option>
              {teams.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
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

        {error   && <div style={{ color: T.red,     fontSize: "0.82rem", marginBottom: "1rem" }}>⚠ {error}</div>}
        {loading && <div style={{ color: T.textMid, fontSize: "0.82rem", marginBottom: "1rem" }}>Carregando…</div>}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", color: T.textMid, padding: "3rem", fontSize: "0.85rem" }}>
            Nenhuma oportunidade encontrada. Tente ajustar os filtros.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {filtered.map((item, i) => <ShotsOppCard key={`${item.match_id}-${item.market}-${i}`} item={item} index={(1 + i) % 10} />)}
        </div>
      </>
      }
      </div>
    </>
  );
}
