import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Performance() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/internal/performance")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return <div style={{ padding: 20 }}>Carregando performance...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Performance Geral</h1>

      <p>Total Picks: {data.total_picks}</p>
      <p>Wins: {data.wins}</p>
      <p>Losses: {data.losses}</p>
      <p>Accuracy: {data.accuracy}%</p>
      <p>ROI: {data.roi}%</p>

      {/* 🔥 EQUITY CURVE */}
      <h2 style={{ marginTop: 40 }}>Evolução do Bankroll</h2>

      {data.equity_curve && data.equity_curve.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.equity_curve}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="bankroll"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Sem histórico suficiente para gráfico.</p>
      )}

      <h2 style={{ marginTop: 40 }}>ROI por Mercado</h2>

      {data.markets && data.markets.length > 0 ? (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd" }}>Mercado</th>
              <th style={{ border: "1px solid #ddd" }}>Total</th>
              <th style={{ border: "1px solid #ddd" }}>Wins</th>
              <th style={{ border: "1px solid #ddd" }}>ROI</th>
            </tr>
          </thead>
          <tbody>
            {data.markets.map((m, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd" }}>{m.market}</td>
                <td style={{ border: "1px solid #ddd" }}>{m.total}</td>
                <td style={{ border: "1px solid #ddd" }}>{m.wins}</td>
                <td style={{ border: "1px solid #ddd" }}>{m.roi}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum mercado avaliado ainda.</p>
      )}
    </div>
  );
}