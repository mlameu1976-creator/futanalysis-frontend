// src/lib/analiseText.js
// Gera textos descritivos de análise a partir dos dados das oportunidades

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}

export function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });
}

export function marketLabel(market, sport = "football") {
  const unit = { football: "gols", nba: "pontos", mlb: "runs", nfl: "pontos", nhl: "gols" }[sport] || "pontos";
  const map = {
    HOME_WIN: "vitória do mandante", AWAY_WIN: "vitória do visitante",
    BTTS: "ambas as equipes marcam", GOAL_HT: "gol no primeiro tempo",
    "OVER_5.5": "over 5.5 gols", "UNDER_5.5": "under 5.5 gols",
    "OVER_6.5": "over 6.5 gols", "UNDER_6.5": "under 6.5 gols",
    OVER_5_5: "over 5.5 gols", UNDER_5_5: "under 5.5 gols",
    OVER_6_5: "over 6.5 gols", UNDER_6_5: "under 6.5 gols",
    PUCK_LINE_H: "puck line -1.5 (casa)", PUCK_LINE_A: "puck line -1.5 (fora)",
    RUN_LINE_H: "run line -1.5 (casa)", RUN_LINE_A: "run line -1.5 (fora)",
    NRFI: "sem run no 1º inning", YRFI: "run no 1º inning",
    F5_OVER: "over primeiros 5 innings", F5_UNDER: "under primeiros 5 innings",
    SPREAD_H: "spread -3.5 (casa)", SPREAD_A: "spread -3.5 (fora)",
    LEAD_Q1_HOME: "lidera 1º quarto (casa)", LEAD_Q1_AWAY: "lidera 1º quarto (fora)",
  };
  if (map[market]) return map[market];
  const m = market.toLowerCase();
  if (m.startsWith("over_")) return `over ${m.replace("over_","")} ${unit}`;
  if (m.startsWith("under_")) return `under ${m.replace("under_","")} ${unit}`;
  if (m.startsWith("over ")) return `over ${m.replace("over ","")} ${unit}`;
  if (m.startsWith("under ")) return `under ${m.replace("under ","")} ${unit}`;
  if (m.startsWith("handicap")) return m.replace("handicap","handicap");
  if (m.startsWith("q") && m.includes("over")) return m.replace("_"," ") + ` ${unit}`;
  return market.toLowerCase();
}

export function confidenceText(prob) {
  if (prob >= 75) return "alta confiança";
  if (prob >= 65) return "confiança moderada";
  return "confiança relevante";
}

export function generateMatchAnalysis(match) {
  const { home, away, league, markets, sport = 'football' } = match;
  const top = markets.slice(0, 3);
  const topMarket = top[0];
  const prob = topMarket.probability;
  const conf = confidenceText(prob);
  const _sport = sport || 'football';

  const sportContext = {
    football: "pelo modelo Dixon-Coles com distribuição de Poisson, calibrado com dados históricos de confrontos e forma recente",
    nba:      "pelo modelo probabilístico com médias de pontuação ofensiva e defensiva dos últimos 20 jogos",
    mlb:      "pelo modelo Poisson de runs ajustado por ERA e WHIP dos arremessadores titulares",
    nfl:      "pelo modelo Poisson de pontuação com força ofensiva e defensiva da temporada",
    nhl:      "pelo modelo Poisson de gols com lambdas calculados por força de ataque e defesa em casa e fora",
  }[sport] || "pelo modelo estatístico FutAnalysis";

  let text = `${home} recebe ${away} em partida válida pela ${league}. `;
  text += `A análise estatística ${sportContext} aponta ${marketLabel(topMarket.market, _sport)} como principal oportunidade, `;
  text += `com probabilidade de ${prob.toFixed(1)}% — ${conf}. `;

  if (top.length > 1) {
    const others = top.slice(1).map(m => `${marketLabel(m.market, _sport)} (${m.probability.toFixed(1)}%)`).join(" e ");
    text += `Outros mercados identificados: ${others}. `;
  }

  text += `O modelo considera o histórico recente de ambas as equipes e o contexto da competição para gerar estas probabilidades.`;
  return text;
}

export function groupByMatch(opportunities, sport = "football") {
  const map = {};
  for (const o of opportunities) {
    const key = o.game_id || o.match_id || `${o.home_team}-${o.away_team}`;
    if (!map[key]) {
      map[key] = {
        id:       key,
        home:     o.home_team,
        away:     o.away_team,
        league:   o.league || sport.toUpperCase(),
        date:     o.match_date || o.game_date,
        sport,
        markets:  [],
      };
    }
    map[key].markets.push({ market: o.market, probability: o.probability });
  }
  return Object.values(map)
    .map(m => ({ ...m, markets: m.markets.sort((a,b) => b.probability - a.probability) }))
    .sort((a,b) => (b.markets[0]?.probability || 0) - (a.markets[0]?.probability || 0));
}
