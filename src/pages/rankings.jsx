import { useEffect, useState } from "react";
import { getRankings } from "../services/api";

export default function Rankings() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getRankings().then(setData);
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>📊 Ranking Diário de Oportunidades</h1>

      {data.map((item, i) => (
        <div key={i} style={{
          borderBottom: "1px solid #e5e7eb",
          padding: "12px 0"
        }}>
          <strong>
            #{i + 1} {item.home_team} x {item.away_team}
          </strong>
          <div>Score: {item.confidence_score}</div>
        </div>
      ))}
    </div>
  );
}
