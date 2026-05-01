import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = "http://127.0.0.1:8000/opportunities";

export default function OpportunityDetailPage() {
  const router = useRouter();
  const { fixture_id } = router.query;
  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    if (!fixture_id) return;

    async function load() {
      const res = await fetch(API_URL);
      const json = await res.json();
      const found = json.data.find(
        (o) => String(o.fixture_id) === String(fixture_id)
      );
      setOpportunity(found || null);
    }

    load();
  }, [fixture_id]);

  if (!opportunity) {
    return (
      <div style={{ padding: 30 }}>
        <p>Carregando ou oportunidade não encontrada.</p>
        <Link href="/opportunities">⬅ Voltar</Link>
      </div>
    );
  }

  const probs = opportunity.probabilities;

  return (
    <div style={{ padding: 30 }}>
      <Link href="/opportunities">⬅ Voltar</Link>

      <h2 style={{ marginTop: 20 }}>
        {opportunity.home_team} x {opportunity.away_team}
      </h2>

      <p><strong>Liga:</strong> {opportunity.league}</p>

      <h3>📊 Probabilidades por Mercado</h3>

      <ul>
        <li>Over 1.5: <strong>{probs.over_1_5}%</strong></li>
        <li>Over 2.5: <strong>{probs.over_2_5}%</strong></li>
        <li>BTTS: <strong>{probs.btts}%</strong></li>
        <li>Gol HT: <strong>{probs.goal_ht}%</strong></li>
        <li>Casa vence: <strong>{probs.home_win}%</strong></li>
        <li>Fora vence: <strong>{probs.away_win}%</strong></li>
      </ul>

      <p style={{ marginTop: 20, color: "#666" }}>
        * Probabilidades calculadas com base nos últimos 5 jogos de cada equipe
      </p>
    </div>
  );
}
