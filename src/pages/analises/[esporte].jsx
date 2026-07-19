// src/pages/analises/[esporte].jsx — SSR por esporte
import Head from "next/head";
import Link from "next/link";
import { generateMatchAnalysis, groupByMatch, formatDate, formatTime } from "../../lib/analiseText";

const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", green: "#2ECC71",
  orange: "#FF8C00", red: "#E83B3B", text: "#EDF2F7",
  textMid: "#94A3B8", textDim: "#4A5568",
  font: "'JetBrains Mono', 'Fira Code', monospace",
};

const SPORT_META = {
  futebol:  { label: "Futebol",  icon: "⚽", color: T.green,   apiUrl: "http://168.138.150.34:8000/opportunities",                                    sport: "football", href: "/opportunities/football" },
  nba:      { label: "NBA",      icon: "🏀", color: "#C9082A", apiUrl: "http://168.138.150.34:8001/nba/opportunities?min_probability=55&days_ahead=3", sport: "nba",      href: "/nba" },
  mlb:      { label: "MLB",      icon: "⚾", color: "#002D72", apiUrl: "http://168.138.150.34:8001/mlb/opportunities?min_probability=70&days=1",      sport: "mlb",      href: "/mlb" },
  nfl:      { label: "NFL",      icon: "🏈", color: "#013369", apiUrl: "http://168.138.150.34:8001/nfl/opportunities/by-game?min_probability=55&days=7",sport: "nfl",      href: "/nfl" },
  nhl:      { label: "NHL",      icon: "🏒", color: "#00B4D8", apiUrl: "http://168.138.150.34:8001/nhl/opportunities?days_ahead=3",                    sport: "nhl",      href: "/nhl" },
};

const SPORT_DESC = {
  futebol: "Modelo Dixon-Coles com distribuição de Poisson, calibrado com dados históricos de mais de 110 ligas. Mercados analisados: resultado, gols, escanteios, cartões e jogadores.",
  nba:     "Modelo probabilístico com médias de pontuação ofensiva e defensiva dos últimos 20 jogos. Mercados: resultado, over/under, handicap, quarters e lead Q1.",
  mlb:     "Modelo Poisson de runs ajustado por ERA e WHIP dos arremessadores titulares. Mercados: resultado, run line, over/under, F5 e NRFI/YRFI.",
  nfl:     "Modelo Poisson de pontuação com força ofensiva e defensiva da temporada. Mercados: resultado, spread ±3.5 e over/under pontos.",
  nhl:     "Modelo Poisson de gols com lambdas calculados por força de ataque e defesa. Mercados: resultado, over/under 5.5 e 6.5, BTTS e puck line ±1.5.",
};

function probColor(p) {
  if (p >= 75) return T.green;
  if (p >= 65) return T.yellow;
  return T.orange;
}

async function fetchMatches(esporte) {
  const meta = SPORT_META[esporte];
  if (!meta) return [];

  try {
    const res = await fetch(meta.apiUrl);
    if (!res.ok) return [];
    const data = await res.json();

    if (esporte === "futebol") {
      return groupByMatch(Array.isArray(data) ? data : [], "football");
    }
    if (esporte === "nba") {
      return groupByMatch(data.opportunities || [], "nba");
    }
    if (esporte === "nhl") {
      return groupByMatch(data.opportunities || [], "nhl");
    }
    if (esporte === "nfl") {
      return (data.games || []).map(g => ({
        id: g.game_id, home: g.home_team, away: g.away_team,
        league: "NFL", date: g.game_date, sport: esporte,
        markets: (g.markets || []).map(m => ({ market: m.market, probability: m.probability })),
      }));
    }
    if (esporte === "mlb") {
      return groupByMatch(Array.isArray(data) ? data : (data.opportunities || []), "mlb");
    }
  } catch(e) {}
  return [];
}

export async function getServerSideProps({ params }) {
  const esporte = params.esporte?.toLowerCase();
  if (!SPORT_META[esporte]) {
    return { notFound: true };
  }
  const matches = await fetchMatches(esporte);
  const today = new Date().toISOString().slice(0, 10);
  const now2 = new Date();
  const todayStr2 = new Date(now2.getTime() - 3*60*60*1000).toISOString().slice(0,10);
  const tomorrowStr2 = new Date(now2.getTime() + 21*60*60*1000).toISOString().slice(0,10);
  const filteredMatches = matches.filter(m => {
    if (!m.date) return true;
    const d = m.date.slice(0,10);
    return d === todayStr2 || d === tomorrowStr2;
  });
  return { props: { matches: filteredMatches, esporte, today } };
}

export default function AnalisesEsporte({ matches, esporte, today }) {
  const meta = SPORT_META[esporte];
  const dateLabel = formatDate(today + "T12:00:00");
  const totalMarkets = matches.reduce((s, m) => s + m.markets.length, 0);
  const isOffseason = matches.length === 0;

  return (
    <>
      <Head>
        <title>Análises {meta.label} — Próximos Jogos | FutAnalysis</title>
        <meta name="description" content={`${matches.length} jogos de ${meta.label} analisados em ${dateLabel}. ${SPORT_DESC[esporte]} ${totalMarkets} oportunidades identificadas.`} />
        <link rel="canonical" href={`https://futanalysis.com.br/analises/${esporte}`} />
        <meta property="og:title" content={`Análises ${meta.label} — ${dateLabel}`} />
        <meta property="og:description" content={`${matches.length} jogos analisados · ${totalMarkets} oportunidades`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": `Análises ${meta.label} — Próximos Jogos`,
          "description": `${matches.length} jogos de ${meta.label} analisados. ${SPORT_DESC[esporte]}`,
          "url": `https://futanalysis.com.br/analises/${esporte}`,
          "numberOfItems": matches.length,
          "itemListElement": matches.map((m, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "SportsEvent",
              "name": `${m.home} vs ${m.away}`,
              "startDate": m.date || today,
              "sport": esporte === "futebol" ? "Soccer" : meta.label,
              "homeTeam": { "@type": "SportsTeam", "name": m.home },
              "awayTeam": { "@type": "SportsTeam", "name": m.away },
              "location": { "@type": "Place", "name": m.league || meta.label, "address": { "@type": "PostalAddress", "addressCountry": "BR" } },
              "organizer": { "@type": "Organization", "name": m.league || meta.label },
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "url": `https://futanalysis.com.br/analises/${esporte}#${encodeURIComponent(m.home)}-vs-${encodeURIComponent(m.away)}`,
              "description": m.markets?.[0]?.probability != null ? `Principal oportunidade: ${m.markets[0].market} com ${m.markets[0].probability.toFixed(1)}% de probabilidade` : undefined,
            }
          })),
          "provider": {
            "@type": "Organization",
            "name": "FutAnalysis",
            "url": "https://futanalysis.com.br",
            "description": "Análise estatística esportiva com modelo Poisson"
          }
        })}} />
      </Head>

      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}`, flexWrap: "wrap" }}>
          <Link href="/analises/hoje" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← análises do dia</Link>
          {Object.entries(SPORT_META).filter(([k]) => k !== esporte).map(([k, v]) => (
            <Link key={k} href={`/analises/${k}`} style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>
              {v.icon} {v.label}
            </Link>
          ))}
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ margin: "0 0 0.4rem", fontSize: "1.5rem", fontWeight: 700, color: meta.color }}>
            {meta.icon} Análises {meta.label} — {dateLabel}
          </h1>
          <p style={{ margin: "0 0 0.75rem", fontSize: "0.82rem", color: T.textMid }}>
            {matches.length} jogos analisados · {totalMarkets} oportunidades identificadas
          </p>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.75rem", color: T.textDim, lineHeight: 1.8, background: T.surface, padding: "0.75rem 1rem", borderRadius: "6px", borderLeft: `3px solid ${meta.color}` }}>
            {SPORT_DESC[esporte]}
          </p>
          <p style={{ margin: 0, fontSize: "0.72rem", color: T.textDim }}>
            Ver oportunidades em tempo real: <Link href={meta.href} style={{ color: meta.color }}>{meta.href}</Link>
          </p>
        </div>

        {/* Offseason */}
        {isOffseason && (
          <div style={{ background: T.surface, border: `1px solid ${meta.color}44`, borderRadius: "8px", padding: "1.5rem", borderLeft: `3px solid ${meta.color}`, textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", color: meta.color, fontWeight: 700, marginBottom: "0.5rem" }}>
              Entre temporadas
            </div>
            <div style={{ fontSize: "0.78rem", color: T.textMid, lineHeight: 1.7 }}>
              Nenhum jogo programado no momento. As análises são geradas automaticamente quando os jogos são publicados.
            </div>
          </div>
        )}

        {/* Análises */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {matches.map((match, i) => {
            const analysis = generateMatchAnalysis(match);
            return (
              <article key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "1.25rem", borderLeft: `3px solid ${meta.color}` }}>
                <header style={{ marginBottom: "0.75rem" }}>
                  <h2 style={{ margin: "0 0 0.2rem", fontSize: "1rem", fontWeight: 700, color: T.text }}>
                    {match.home} vs {match.away}
                  </h2>
                  <div style={{ fontSize: "0.65rem", color: T.textDim }}>
                    {match.league}{match.date ? ` · ${formatTime(match.date)}` : ""}
                  </div>
                </header>

                <p style={{ margin: "0 0 0.75rem", fontSize: "0.78rem", color: T.textMid, lineHeight: 1.8 }}>
                  {analysis}
                </p>

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {match.markets.slice(0, 5).map((m, j) => (
                    <span key={j} style={{
                      fontSize: "0.65rem", padding: "3px 10px",
                      background: probColor(m.probability) + "18",
                      color: probColor(m.probability),
                      border: `1px solid ${probColor(m.probability)}33`,
                      borderRadius: "20px",
                    }}>
                      {m.market} · {m.probability.toFixed(1)}%
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
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
