import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", red: "#E83B3B",
  green: "#2ECC71", blue: "#3B82F6", orange: "#FF8C00",
  purple: "#8B5CF6", text: "#EDF2F7", textMid: "#94A3B8",
  textDim: "#4A5568", font: "'JetBrains Mono', 'Fira Code', monospace",
};

const CATEGORY_LABELS = {
  gols: "⚽ Gols",
  cartoes: "🟨 Cartões",
  escanteios: "🚩 Escanteios",
  faltas: "🔶 Faltas",
  jogadores: "👤 Jogadores",
  outros: "📊 Outros",
};

const CATEGORY_ORDER = ["gols", "cartoes", "escanteios", "faltas", "jogadores", "outros"];

function probColor(p) {
  if (p >= 80) return T.green;
  if (p >= 65) return T.yellow;
  if (p >= 55) return T.orange;
  return T.textMid;
}

function MarketRow({ m }) {
  const color = probColor(m.probability);
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0.6rem 0.8rem", background: T.surfaceHi, borderRadius: "8px",
      border: `1px solid ${T.border}`, marginBottom: "0.4rem",
    }}>
      <div>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: T.text }}>{m.label}</div>
        {m.stat_label && (
          <div style={{ fontSize: "0.7rem", color: T.textDim, marginTop: "2px" }}>{m.stat_label}</div>
        )}
      </div>
      <div style={{
        fontSize: "0.95rem", fontWeight: 900, color,
        background: color + "18", border: `1px solid ${color}44`,
        borderRadius: "6px", padding: "0.2rem 0.6rem", minWidth: "58px", textAlign: "center",
      }}>
        {m.probability}%
      </div>
    </div>
  );
}

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={handleCopy} style={{
      display: "flex", alignItems: "center", gap: "0.4rem",
      background: copied ? T.green + "22" : T.surfaceHi,
      border: `1px solid ${copied ? T.green : T.border}`,
      color: copied ? T.green : T.text,
      borderRadius: "8px", padding: "0.5rem 1rem", fontSize: "0.8rem",
      fontFamily: T.font, cursor: "pointer", fontWeight: 700,
    }}>
      {copied ? "✓ Link copiado!" : "🔗 Copiar link"}
    </button>
  );
}

export default function MatchAnalysisPage() {
  const router = useRouter();
  const { id, from } = router.query;
  const backHref = from === "live" ? "/opportunities/live" : "/opportunities/football";
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`${API}/match/${id}/opportunities`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setData)
      .catch(() => setError(true));
  }, [id]);

  if (error) {
    return (
      <div style={{ background: T.bg, minHeight: "100vh", padding: "2rem", fontFamily: T.font, color: T.text }}>
        <p>Jogo não encontrado.</p>
        <Link href={backHref} style={{ color: T.blue }}>⬅ Voltar</Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ background: T.bg, minHeight: "100vh", padding: "2rem", fontFamily: T.font, color: T.textMid }}>
        Carregando análise...
      </div>
    );
  }

  const grouped = {};
  for (const m of data.markets) {
    if (!grouped[m.category]) grouped[m.category] = [];
    grouped[m.category].push(m);
  }
  for (const cat in grouped) {
    grouped[cat].sort((a, b) => b.probability - a.probability);
  }

  const pageTitle = `${data.home_team} x ${data.away_team} — Análise Completa | FutAnalysis`;

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: T.font, color: T.text }}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`Análise completa de ${data.home_team} x ${data.away_team}: ${data.total_opportunities ?? data.total} oportunidades em gols, cartões, escanteios, faltas e jogadores.`} />
      </Head>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "1.5rem 1rem" }}>
        <Link href={backHref} style={{ color: T.textMid, fontSize: "0.8rem", textDecoration: "none" }}>
          ← análises futebol
        </Link>

        <div style={{
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: "12px",
          padding: "1.2rem", marginTop: "1rem",
        }}>
          <div style={{ fontSize: "0.7rem", color: T.textDim, textTransform: "uppercase", marginBottom: "0.4rem" }}>
            {data.league}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 900 }}>{data.home_team}</div>
            {data.is_finished ? (
              <div style={{ fontSize: "1.3rem", fontWeight: 900, color: T.yellow }}>
                {data.home_goals} × {data.away_goals}
              </div>
            ) : (
              <div style={{ fontSize: "0.9rem", color: T.textMid }}>
                {data.match_date ? new Date(data.match_date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—"}
              </div>
            )}
            <div style={{ fontSize: "1.1rem", fontWeight: 900, textAlign: "right" }}>{data.away_team}</div>
          </div>

          <CopyLinkButton />
        </div>

        <div style={{ marginTop: "1.2rem" }}>
          {CATEGORY_ORDER.filter(cat => grouped[cat]?.length).map(cat => (
            <div key={cat} style={{ marginBottom: "1.2rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 900, color: T.textMid, marginBottom: "0.5rem", textTransform: "uppercase" }}>
                {CATEGORY_LABELS[cat] || cat}
              </div>
              {grouped[cat].map((m, i) => <MarketRow key={i} m={m} />)}
            </div>
          ))}

          {(data.total_opportunities ?? data.total ?? 0) === 0 && (
            <div style={{ textAlign: "center", padding: "2rem", color: T.textDim }}>
              Nenhuma oportunidade acima do threshold para este jogo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
