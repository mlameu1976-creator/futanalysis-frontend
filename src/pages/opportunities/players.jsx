// src/pages/opportunities/players.jsx
import AffiliateCTA from "../../components/AffiliateCTA";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", red: "#E83B3B",
  green: "#2ECC71", blue: "#3B82F6", orange: "#FF8C00",
  purple: "#8B5CF6", text: "#EDF2F7", textMid: "#94A3B8", textDim: "#4A5568",
  font: "'JetBrains Mono', 'Fira Code', monospace",
};

const PLAYER_MARKETS = [
  { key: "all",               label: "Todos"       },
  { key: "MARCAR GOL",        label: "Marcar Gol"  },
  { key: "CHUTE A GOL",       label: "Chute a Gol" },
  { key: "CHUTE",             label: "Chute"       },
  { key: "FAZER ASSISTÊNCIA", label: "Assistência" },
  { key: "LEVAR CARTÃO",      label: "Cartão"      },
  { key: "COMETER FALTA",     label: "Falta"       },
  { key: "DEFESA GOLEIRO",    label: "Defesa"      },
  { key: "PASSES",            label: "Passes"      },
];

const MARKET_COLOR = {
  "MARCAR GOL":        "#2ECC71",
  "CHUTE A GOL":       "#2ECC71",
  "CHUTE":             "#3B82F6",
  "FAZER ASSISTÊNCIA": "#3B82F6",
  "LEVAR CARTÃO":      "#F5C518",
  "COMETER FALTA":     "#FF8C00",
  "DEFESA GOLEIRO":    "#8B5CF6",
  "PASSES":            "#94A3B8",
};

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

function PlayerCard({ item, index = 0 }) {
  const color = MARKET_COLOR[item.market] || T.purple;
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
          <span style={{ fontSize: "0.65rem", color, background: color + "18", border: `1px solid ${color}33`, borderRadius: "20px", padding: "2px 8px" }}>{item.market}</span>
        </div>
        <div style={{ fontWeight: 700, fontSize: "0.82rem", color: T.text, marginBottom: "0.3rem" }}>
          {item.home_team} <span style={{ color: T.textDim }}>vs</span> {item.away_team}
        </div>
        <div style={{ fontSize: "0.78rem", color: T.purple, marginBottom: "0.2rem", fontWeight: 600 }}>
          👤 {item.player_name}
          <span style={{ color: T.textDim, fontWeight: 400 }}> · {item.team}</span>
        </div>
        {item.position && <div style={{ fontSize: "0.65rem", color: T.textDim, marginBottom: "0.2rem" }}>{item.position}</div>}
        <div style={{ fontSize: "0.68rem", color: T.textDim, marginBottom: "0.6rem" }}>{dateStr}</div>
        {item.stat_label && <div style={{ fontSize: "0.7rem", color, marginBottom: "0.6rem" }}>📊 {item.stat_label}</div>}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
          <span style={{ fontSize: "0.72rem", color: T.textMid }}>Confiança</span>
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: probColor(item.confidence) }}>{item.confidence?.toFixed(1)}%</span>
        </div>
        <ProbBar value={item.confidence || 0} />
        <AffiliateCTA index={index} bookmaker={item.bookmaker} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const API_INTERNAL = process.env.API_INTERNAL_URL || "http://localhost:8000";
  let initialData = [];
  try {
    const params = new URLSearchParams({ min_confidence: "55", limit: 1000 });
    const res = await fetch(`${API_INTERNAL}/player-opportunities?${params}`);
    if (res.ok) {
      const json = await res.json();
      initialData = json.opportunities || [];
    }
  } catch (e) {
    console.error("Erro ao buscar oportunidades de jogadores no getStaticProps:", e.message);
  }
  return { props: { initialData }, revalidate: 300 };
}

export default function PlayersOpportunities({ initialData }) {
  const [allData,      setAllData]      = useState(initialData || []);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState(null);
  const [market,       setMarket]       = useState("all");
  const [dateFilter,   setDateFilter]   = useState("all");
  const [leagueFilter, setLeagueFilter] = useState("all");
  const [minConf,      setMinConf]      = useState("55");

  // Dado inicial já vem do servidor via getStaticProps (ISR)

  // busca todos de uma vez, filtra localmente
  async function fetchData() {
    setLoading(true); setError(null);
    try {
      const params = new URLSearchParams({ min_confidence: minConf, limit: 1000 });
      const res = await fetch(`${API_INTERNAL}/player-opportunities?${params}`);
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const json = await res.json();
      setAllData(json.opportunities || []);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  const today    = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  // filtro 100% local
  const filtered = allData.filter(item => {
    const d = item.match_date?.slice(0, 10);
    if (dateFilter === "today"    && d !== today)    return false;
    if (dateFilter === "tomorrow" && d !== tomorrow) return false;
    if (market !== "all" && item.market !== market)  return false;
    if (leagueFilter !== "all" && item.league !== leagueFilter) return false;
    return true;
  }).sort((a, b) => (b.confidence || 0) - (a.confidence || 0));

  const leagues = [...new Set(allData.map(o => o.league).filter(Boolean))].sort();

  const inp = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: "6px", color: T.text, padding: "0.45rem 0.7rem", fontSize: "0.78rem", fontFamily: T.font, outline: "none" };
  const btnP = { background: T.purple, color: "#fff", border: "none", borderRadius: "6px", padding: "0.45rem 1.1rem", fontWeight: 700, fontSize: "0.78rem", fontFamily: T.font, cursor: "pointer" };

  return (
    <>
      <Head>
        <title>Oportunidades por Jogador — FutAnalysis | Cartões por Atleta</title>
        <meta name="description" content="Identifique jogadores com alto risco de cartão em cada partida. Análise estatística de cartões por atleta baseada no histórico da temporada para as principais ligas do mundo." />
        <link rel="canonical" href="https://futanalysis.com.br/opportunities/players" />
      </Head>
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
        <Link href="/opportunities" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← oportunidades</Link>
        <Link href="/analises/futebol" style={{ color: T.green, textDecoration: "none", fontSize: "0.72rem", background: T.green + "18", border: `1px solid ${T.green}33`, borderRadius: "20px", padding: "3px 10px" }}>📋 análises futebol →</Link>
        <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: T.purple }}>👤 Jogadores</h1>
        <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: T.textMid }}>{filtered.length} oportunidades</span>
      </div>

      {/* Botões de mercado — filtro local */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
        {PLAYER_MARKETS.map(m => (
          <button key={m.key} onClick={() => setMarket(m.key)} style={{
            background: market === m.key ? T.purple : T.surface,
            color:      market === m.key ? "#fff"   : T.textMid,
            border: `1px solid ${market === m.key ? T.purple : T.border}`,
            borderRadius: "20px", padding: "0.35rem 0.9rem",
            fontSize: "0.75rem", fontFamily: T.font, cursor: "pointer",
            fontWeight: market === m.key ? 700 : 400, transition: "all 0.15s",
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
          <div style={{ fontSize: "0.62rem", color: T.textMid, marginBottom: "0.25rem", textTransform: "uppercase" }}>Confiança mín.</div>
          <select style={inp} value={minConf} onChange={e => setMinConf(e.target.value)}>
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
        {filtered.map((item, i) => <PlayerCard key={`${item.player_id}-${item.market}-${i}`} item={item} index={(3 + i) % 10} />)}
      </div>
    </div>
    </>
  );
}
