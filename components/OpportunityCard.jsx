import ScoreBadge from "./ScoreBadge";

export default function OpportunityCard({ data }) {
  const combined = data.metrics.combined;

  return (
    <div className="border rounded p-4 shadow bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">
          {data.home_team} x {data.away_team}
        </h3>
        <ScoreBadge score={data.confidence_score} />
      </div>

      <p className="text-sm text-gray-600">{data.league}</p>

      <div className="mt-3 text-sm grid grid-cols-3 gap-2">
        <div>⚽ Média: {combined.avg_goals.toFixed(2)}</div>
        <div>
          📈 Over 2.5: {(combined.over_25_probability * 100).toFixed(0)}%
        </div>
        <div>
          🤝 BTTS: {(combined.btts_probability * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
}
