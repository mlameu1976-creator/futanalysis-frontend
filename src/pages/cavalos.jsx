// src/pages/cavalos.jsx
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ADS_ENABLED } from "../config/ads";

const API = "https://futanalysis.com.br/nba-api";
const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", red: "#E83B3B",
  green: "#2ECC71", blue: "#3B82F6", orange: "#FF8C00",
  purple: "#8B5CF6", text: "#EDF2F7", textMid: "#94A3B8",
  textDim: "#4A5568", font: "'JetBrains Mono', 'Fira Code', monospace",
  horse: "#8B4513",
};

function scoreColor(s) {
  if (s >= 85) return T.red;
  if (s >= 75) return T.orange;
  if (s >= 65) return T.yellow;
  return T.textMid;
}

function FormBadge({ form }) {
  if (!form) return null;
  const clean = form.replace(/-/g, "");
  const chars = clean.slice(-6).split("");
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {chars.map((c, i) => {
        const pos = parseInt(c) || 9;
        const color = pos === 1 ? T.green : pos <= 3 ? T.yellow : pos <= 5 ? T.orange : T.red;
        return (
          <span key={i} style={{
            fontSize: "0.65rem", fontWeight: 700, color,
            background: color + "22", border: `1px solid ${color}44`,
            borderRadius: "3px", padding: "1px 4px",
          }}>{c}</span>
        );
      })}
    </div>
  );
}

function RaceCard({ race }) {
  const [expanded, setExpanded] = useState(false);
  const off = race.off_dt ? new Date(race.off_dt) : null;
  const time = off ? off.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }) : race.off_time || "—";
  const dateStr = off ? off.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "America/Sao_Paulo" }) : "—";
  const shown = expanded ? race.candidates : race.candidates.slice(0, 3);

  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "10px", marginBottom: "0.75rem", overflow: "hidden" }}>
      <div style={{ padding: "0.9rem 1rem", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: T.text }}>{race.course}</div>
            <div style={{ fontSize: "0.7rem", color: T.textMid, marginTop: "2px" }}>{race.race_name}</div>
            <div style={{ fontSize: "0.65rem", color: T.textDim, marginTop: "2px" }}>
              {race.distance_f}f · {race.going} · {race.race_class} · {race.type}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: T.yellow }}>{time}</div>
            <div style={{ fontSize: "0.65rem", color: T.textDim }}>{dateStr}</div>
            <div style={{ fontSize: "0.65rem", color: T.textDim }}>{race.field_size} corredores</div>
            <span style={{
              fontSize: "0.6rem", padding: "1px 6px", borderRadius: "10px", marginTop: "4px", display: "inline-block",
              background: race.region === "GB" ? T.blue + "22" : T.purple + "22",
              color: race.region === "GB" ? T.blue : T.purple,
              border: `1px solid ${race.region === "GB" ? T.blue : T.purple}44`,
            }}>{race.region}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "0.5rem 0" }}>
        {shown.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", padding: "0.5rem 1rem", borderBottom: i < shown.length - 1 ? `1px solid ${T.border}33` : "none", gap: "0.75rem" }}>
            <div style={{ minWidth: "20px", fontSize: "0.75rem", color: T.textDim, textAlign: "center" }}>{c.number}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: T.text }}>{c.horse}</div>
              <div style={{ fontSize: "0.65rem", color: T.textDim, marginTop: "2px" }}>
                {c.jockey} · {c.trainer}
                {c.last_run > 0 && <span style={{ marginLeft: "8px", color: c.last_run > 60 ? T.orange : T.textDim }}>última corrida: {c.last_run} dias</span>}
              </div>
              <div style={{ marginTop: "4px" }}>
                <FormBadge form={c.form} />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: scoreColor(c.lay_score) }}>{c.lay_score}%</div>
              <div style={{ fontSize: "0.6rem", color: T.textDim }}>Lay score</div>
            </div>
          </div>
        ))}
      </div>

      {race.candidates.length > 3 && (
        <div style={{ padding: "0.5rem 1rem", borderTop: `1px solid ${T.border}33`, textAlign: "center" }}>
          <button onClick={() => setExpanded(!expanded)} style={{
            background: "none", border: "none", color: T.textMid, cursor: "pointer",
            fontSize: "0.72rem", fontFamily: T.font,
          }}>
            {expanded ? "▲ menos" : `▼ +${race.candidates.length - 3} candidatos`}
          </button>
        </div>
      )}
      <div style={{ padding: "0.4rem 1rem", textAlign: "center", fontSize: "0.6rem", color: "#FF6B6B", fontWeight: 600, borderTop: "1px solid #1E283033" }}>
        Ministério da Fazenda adverte: Apostar pode causar dependência
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  if (!ADS_ENABLED) {
    return { notFound: true };
  }
  return { props: {} };
}

export default function CavalosPage() {
  const [races, setRaces]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [region, setRegion]   = useState("all");
  const [minScore, setMinScore] = useState(65);
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/horses/opportunities?region=${region}&min_score=${minScore}`)
      .then(r => r.json())
      .then(d => { setRaces(d.races || []); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [region, minScore]);

  return (
    <>
      <Head>
        <title>Corridas de Cavalos — Lay Opportunities — FutAnalysis</title>
        <meta name="description" content="Análise estatística de corridas de cavalos UK, IRE e FR. Candidatos ao Lay baseados em form, rating oficial e histórico recente." />
        <link rel="canonical" href="https://futanalysis.com.br/cavalos" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/opportunities" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← oportunidades</Link>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: "0 0 0.3rem", fontSize: "1.4rem", fontWeight: 700, color: T.yellow }}>🐎 Corridas de Cavalos — Lay</h1>
          <p style={{ margin: 0, fontSize: "0.78rem", color: T.textMid }}>Candidatos ao Lay · Form recente · Rating oficial · Dias parado</p>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ fontSize: "0.65rem", color: T.textDim, marginBottom: "0.4rem" }}>REGIÃO</div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[["all","Todas"],["gb","🇬🇧 GB"],["ire","🇮🇪 IRE"],["fr","🇫🇷 FR"]].map(([v,l]) => (
              <button key={v} onClick={() => setRegion(v)} style={{
                padding: "0.35rem 0.9rem", borderRadius: "20px", border: "none",
                cursor: "pointer", fontSize: "0.75rem", fontFamily: T.font,
                background: region === v ? T.yellow : T.surface,
                color: region === v ? T.bg : T.textMid,
              }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.65rem", color: T.textDim, marginBottom: "0.4rem" }}>SCORE MÍNIMO DE LAY</div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[65, 70, 75, 80, 85].map(s => (
              <button key={s} onClick={() => setMinScore(s)} style={{
                padding: "0.35rem 0.9rem", borderRadius: "20px", border: "none",
                cursor: "pointer", fontSize: "0.75rem", fontFamily: T.font,
                background: minScore === s ? T.yellow : T.surface,
                color: minScore === s ? T.bg : T.textMid,
              }}>{s}%+</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.65rem", color: T.textDim, marginBottom: "0.4rem" }}>DATA</div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[["all","Todas"],["hoje","Hoje"],["amanha","Amanhã"]].map(([v,l]) => (
              <button key={v} onClick={() => setDateFilter(v)} style={{
                padding: "0.35rem 0.9rem", borderRadius: "20px", border: "none",
                cursor: "pointer", fontSize: "0.75rem", fontFamily: T.font,
                background: dateFilter === v ? T.yellow : T.surface,
                color: dateFilter === v ? T.bg : T.textMid,
              }}>{l}</button>
            ))}
          </div>
        </div>
        {loading && <div style={{ color: T.textMid, fontSize: "0.85rem" }}>Carregando corridas...</div>}
        {error   && <div style={{ color: T.red,    fontSize: "0.85rem" }}>Erro: {error}</div>}
        {!loading && !error && races.length === 0 && (
          <div style={{ color: T.textMid, fontSize: "0.85rem", textAlign: "center", padding: "2rem", background: T.surface, borderRadius: "8px" }}>
            Nenhuma corrida encontrada para os filtros selecionados.
          </div>
        )}
        {!loading && races.filter(r => {
          if (dateFilter === "all") return true;
          const rDate = new Date(r.off_dt);
          const now = new Date();
          const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString().slice(0,10);
          const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()+1)).toISOString().slice(0,10);
          const rDateStr = rDate.toISOString().slice(0,10);
          if (dateFilter === "hoje" && rDateStr !== today) return false;
          if (dateFilter === "amanha" && rDateStr !== tomorrow) return false;
          return true;
        }).map(r => <RaceCard key={r.race_id} race={r} />)}

        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${T.border}`, fontSize: "0.65rem", color: T.textDim }}>
          <div style={{ marginBottom: "0.5rem", color: T.textMid }}>📖 Como interpretar o Lay Score:</div>
          <div>• <strong style={{ color: T.red }}>85%+</strong> — forte candidato ao Lay (form muito ruim + parado há muito tempo)</div>
          <div>• <strong style={{ color: T.orange }}>75-84%</strong> — bom candidato ao Lay</div>
          <div>• <strong style={{ color: T.yellow }}>65-74%</strong> — candidato moderado</div>
          <div style={{ marginTop: "0.5rem", color: T.textDim }}>⚠️ Análise estatística informativa. Não constitui recomendação de aposta.</div>
        </div>
      </div>
    </>
  );
}
