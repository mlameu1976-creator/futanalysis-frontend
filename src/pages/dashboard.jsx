import { useEffect, useState } from "react";

import Link from "next/link";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "https://futanalysis.com.br/api";
    fetch(`${API}/opportunities/metrics?day=7d`)
      .then((r) => r.json())
      .then(setMetrics)
      .catch(() => {});

    fetch(`${API}/opportunities/ranking?day=7d`)
      .then((r) => r.json())
      .then((j) => setRanking(j.ranking || []))
      .catch(() => {});
  }, []);

  return (
    <div className="opportunities-container">
      <h1>Dashboard</h1>
      <Link href="/opportunities">
        <button>Ver Oportunidades</button>
      </Link>
      {metrics && (
        <div className="mini-cards">
          <div className="mini-card">
            <span>Total</span>
            <strong>{metrics.total}</strong>
          </div>
        </div>
      )}
      <h2>Ranking de Mercados</h2>
      <div className="mini-cards">
        {ranking.map((m) => (
          <div key={m.market} className="mini-card highlight">
            <span>{m.market}</span>
            <strong>{m.avg_score}</strong>
            <small>{m.avg_confidence}% · {m.count}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
