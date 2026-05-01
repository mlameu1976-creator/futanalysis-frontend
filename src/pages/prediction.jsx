import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { formatBrazilDate } from "../utils/date";

export default function Prediction() {
  const [predictions, setPredictions] = useState([]);
  const [date, setDate] = useState("today");

  const [market, setMarket] = useState("");
  const [league, setLeague] = useState("");

  useEffect(() => {
    fetchPredictions();
  }, [date, market, league]);

  const fetchPredictions = async () => {
    try {
      let url = `http://localhost:8000/predictions?date=${date}`;

      if (market) url += `&market=${market}`;
      if (league) url += `&league=${league}`;

      const res = await axios.get(url);
      setPredictions(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const leagues = [...new Set(predictions.map((p) => p.league).filter(Boolean))];

  return (
    <div style={{ padding: "20px", color: "white" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>FutAnalysis</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <Link href="/prediction">Prediction</Link>
          <Link href="/opportunities">Opportunities</Link>
        </div>
      </div>

      <h1>Top Predictions</h1>

      {/* FILTROS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        
        <select value={date} onChange={(e) => setDate(e.target.value)}>
          <option value="today">Hoje</option>
          <option value="tomorrow">Amanhã</option>
          <option value="all">Todos</option>
        </select>

        <select value={market} onChange={(e) => setMarket(e.target.value)}>
          <option value="">Todos Mercados</option>
          <option value="OVER_1.5">OVER 1.5</option>
          <option value="OVER_2.5">OVER 2.5</option>
          <option value="UNDER_2.5">UNDER 2.5</option>
          <option value="BTTS">BTTS</option>
          <option value="GOAL_HT">GOAL HT</option>
          <option value="HOME_WIN">CASA VENCE</option>
          <option value="AWAY_WIN">FORA VENCE</option>
        </select>

        <select value={league} onChange={(e) => setLeague(e.target.value)}>
          <option value="">Todas Ligas</option>
          {leagues.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        {predictions.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#1e293b",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            {/* 🔥 DATA + HORA */}
            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              {formatBrazilDate(p.date)}
            </div>

            <div style={{ fontWeight: "bold", marginTop: "5px" }}>
              {p.home} VS {p.away}
            </div>

            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              {p.league}
            </div>

            <div style={{ marginTop: "10px", color: "#38bdf8" }}>
              {p.market}
            </div>

            <div style={{ fontWeight: "bold" }}>
              {p.probability}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}