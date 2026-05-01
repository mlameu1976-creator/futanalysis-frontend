import { useEffect, useState } from "react";
import "./opportunities.css";

import Link from "next/link"

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Link href="/cards">
        <button>Ver Análise de Cartões</button>
      </Link>

    </div>
  )
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/opportunities/metrics?day=7d")
      .then((r) => r.json())
      .then(setMetrics);

    fetch("http://localhost:8000/opportunities/ranking?day=7d")
      .then((r) => r.json())
      .then((j) => setRanking(j.ranking || []));
  }, []);

  return (
    <div className="opportunities-container">
      <h1>Dashboard – Backtest</h1>

      {metrics && (
        <div className="mini-cards">
          <div className="mini-card">
            <span>Total</span>
            <strong>{metrics.total}</strong>
          </div>
          <div className="mini-card">
            <span>Mercados</span>
            <strong>{Object.keys(metrics.markets).length}</strong>
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
