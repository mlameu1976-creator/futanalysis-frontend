// src/pages/analises/hoje.jsx — SSR — indexável pelo Google
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
  football: { label: "Futebol",          icon: "⚽", color: T.green,   href: "/opportunities/football" },
  nba:      { label: "NBA",              icon: "🏀", color: "#C9082A", href: "/nba" },
  mlb:      { label: "MLB",              icon: "⚾", color: "#002D72", href: "/mlb" },
  nfl:      { label: "NFL",              icon: "🏈", color: "#013369", href: "/nfl" },
  nhl:      { label: "NHL",              icon: "🏒", color: "#00B4D8", href: "/nhl" },
};

function probColor(p) {
  if (p >= 75) return T.green;
  if (p >= 65) return T.yellow;
  return T.orange;
}

export async function getServerSideProps() {
  const today = new Date().toISOString().slice(0, 10);
  const allMatches = [];

  const fetchWithTimeout = (url, ms=5000) => {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), ms);
    return fetch(url, { signal: ctrl.signal });
  };

  try {
    // Futebol
    const ftRes = await fetchWithTimeout("http://168.138.150.34:8000/opportunities");
    if (ftRes.ok) {
      const ftData = await ftRes.json();
      const grouped = groupByMatch(ftData, "football");
      allMatches.push(...grouped.slice(0, 15));
    }
  } catch(e) {}

  try {
    // NBA
    const nbaRes = await fetchWithTimeout("http://168.138.150.34:8001/nba/opportunities?min_probability=55&days_ahead=3");
    if (nbaRes.ok) {
      const nbaData = await nbaRes.json();
      const grouped = groupByMatch(nbaData.opportunities || [], "nba");
      allMatches.push(...grouped.slice(0, 5));
    }
  } catch(e) {}

  try {
    // MLB
    const mlbRes = await fetchWithTimeout("http://168.138.150.34:8001/mlb/opportunities?min_probability=70&days=1", 8000);
    if (mlbRes.ok) {
      const mlbData = await mlbRes.json();
      const grouped = groupByMatch(Array.isArray(mlbData) ? mlbData : (mlbData.opportunities || []), "mlb");
      allMatches.push(...grouped.slice(0, 5));
    }
  } catch(e) {}

  try {
    // NHL
    const nhlRes = await fetchWithTimeout("http://168.138.150.34:8001/nhl/opportunities?days_ahead=3");
    if (nhlRes.ok) {
      const nhlData = await nhlRes.json();
      const grouped = groupByMatch(nhlData.opportunities || [], "nhl");
      allMatches.push(...grouped.slice(0, 5));
    }
  } catch(e) {}

  try {
    // NFL
    const nflRes = await fetchWithTimeout("http://168.138.150.34:8001/nfl/opportunities/by-game?min_probability=55&days=7");
    if (nflRes.ok) {
      const nflData = await nflRes.json();
      const games = (nflData.games || []).slice(0, 5).map(g => ({
        id: g.game_id, home: g.home_team, away: g.away_team,
        league: "NFL", date: g.game_date, sport: "nfl",
        markets: (g.markets || []).map(m => ({ market: m.market, probability: m.probability })),
      }));
      allMatches.push(...games);
    }
  } catch(e) {}

  // Filtra apenas jogos de hoje e amanhã (BRT)
  const now = new Date();
  const todayStr = new Date(now.getTime() - 3*60*60*1000).toISOString().slice(0,10);
  const tomorrowStr = new Date(now.getTime() + 21*60*60*1000).toISOString().slice(0,10);
  const filtered = allMatches.filter(m => {
    if (!m.date) return true;
    const d = m.date.slice(0,10);
    return d === todayStr || d === tomorrowStr;
  });
  return { props: { matches: filtered, today } };
}

export default function AnalisesHoje({ matches, today }) {
  const dateLabel = formatDate(today + "T12:00:00");
  const totalMarkets = matches.reduce((s, m) => s + m.markets.length, 0);

  const bySport = {};
  for (const m of matches) {
    if (!bySport[m.sport]) bySport[m.sport] = [];
    bySport[m.sport].push(m);
  }

  return (
    <>
      <Head>
        <title>Análises de Apostas Esportivas — Próximos Jogos | FutAnalysis</title>
        <meta name="description" content={`${matches.length} jogos analisados hoje em futebol, NBA, MLB, NFL e NHL. Probabilidades calculadas por modelo estatístico Poisson. Oportunidades identificadas: ${totalMarkets} mercados.`} />
        <link rel="canonical" href="https://futanalysis.com.br/analises/hoje" />
        <meta property="og:title" content={`Análises Esportivas — ${dateLabel}`} />
        <meta property="og:description" content={`${matches.length} jogos analisados com modelo Poisson. ${totalMarkets} oportunidades identificadas.`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": `Análises Esportivas — ${dateLabel}`,
          "description": `${matches.length} jogos analisados com modelo Poisson. ${totalMarkets} oportunidades identificadas.`,
          "url": "https://futanalysis.com.br/analises/hoje",
          "numberOfItems": matches.length,
          "itemListElement": matches.map((m, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "SportsEvent",
              "name": `${m.home} vs ${m.away}`,
              "startDate": m.date || today,
              "sport": m.sport === "football" ? "Soccer" : m.sport?.toUpperCase(),
              "homeTeam": { "@type": "SportsTeam", "name": m.home },
              "awayTeam": { "@type": "SportsTeam", "name": m.away },
              "location": { "@type": "Place", "name": m.league || "A definir", "address": { "@type": "PostalAddress", "addressCountry": "BR" } },
              "organizer": { "@type": "Organization", "name": m.league },
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "url": `https://futanalysis.com.br/analises/${m.sport === "football" ? "futebol" : m.sport}#${encodeURIComponent(m.home)}-vs-${encodeURIComponent(m.away)}`,
              "description": m.markets?.[0] ? `Principal oportunidade: ${m.markets[0].market} com ${m.markets[0].probability.toFixed(1)}% de probabilidade` : undefined,
            }
          }))
        })}} />
      </Head>

      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/opportunities" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← oportunidades</Link>
          <Link href="/analises/futebol" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>⚽ Futebol</Link>
          <Link href="/analises/nba"     style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>🏀 NBA</Link>
          <Link href="/analises/nhl"     style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>🏒 NHL</Link>
          <Link href="/analises/mlb"     style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>⚾ MLB</Link>
          <Link href="/analises/nfl"     style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>🏈 NFL</Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ margin: "0 0 0.4rem", fontSize: "1.5rem", fontWeight: 700, color: T.yellow }}>
            🎯 Análises do Dia
          </h1>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.82rem", color: T.textMid }}>
            {dateLabel} · {matches.length} jogos analisados · {totalMarkets} oportunidades identificadas
          </p>
          <p style={{ margin: 0, fontSize: "0.75rem", color: T.textDim, lineHeight: 1.7 }}>
            Probabilidades calculadas por modelo estatístico Poisson com dados históricos de cada esporte.
            As oportunidades são identificadas quando a probabilidade modelada supera o limiar de confiança calibrado.
          </p>
        </div>

        {/* Por esporte */}
        {Object.entries(bySport).map(([sport, sportMatches]) => {
          const meta = SPORT_META[sport] || { label: sport, icon: "🏆", color: T.yellow, href: "/" };
          return (
            <div key={sport} style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: "1.2rem" }}>{meta.icon}</span>
                <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: meta.color }}>{meta.label}</h2>
                <span style={{ fontSize: "0.7rem", color: T.textDim }}>{sportMatches.length} jogos</span>
                <Link href={meta.href} style={{ marginLeft: "auto", fontSize: "0.7rem", color: meta.color, textDecoration: "none" }}>
                  ver oportunidades →
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {sportMatches.map((match, i) => {
                  const analysis = generateMatchAnalysis(match);
                  const topMarket = match.markets[0];
                  return (
                    <article key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "1.25rem", borderLeft: `3px solid ${meta.color}` }}>
                      <header style={{ marginBottom: "0.75rem" }}>
                        <h3 style={{ margin: "0 0 0.2rem", fontSize: "1rem", fontWeight: 700, color: T.text }}>
                          {match.home} vs {match.away}
                        </h3>
                        <div style={{ fontSize: "0.65rem", color: T.textDim }}>
                          {match.league}{match.date ? ` · ${formatTime(match.date)}` : ""}
                        </div>
                      </header>

                      <p style={{ margin: "0 0 0.75rem", fontSize: "0.78rem", color: T.textMid, lineHeight: 1.8 }}>
                        {analysis}
                      </p>

                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {match.markets.slice(0, 4).map((m, j) => (
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
            </div>
          );
        })}

        {matches.length === 0 && (
          <div style={{ textAlign: "center", color: T.textMid, padding: "3rem", background: T.surface, borderRadius: "8px" }}>
            Nenhuma análise disponível no momento. Volte mais tarde.
          </div>
        )}

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
