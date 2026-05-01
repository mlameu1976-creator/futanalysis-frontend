export default function FutureMatchCard({ match }) {
  return (
    <div className="border rounded p-4 shadow bg-white">
      <div className="text-sm text-gray-500 mb-1">
        {match.league_name}
      </div>

      <div className="font-semibold">
        {match.home_team} vs {match.away_team}
      </div>

      <div className="text-sm text-gray-600 mt-2">
        Data: {match.match_date}
      </div>

      <div className="text-xs mt-2 px-2 py-1 inline-block rounded bg-blue-100 text-blue-700">
        {match.status}
      </div>
    </div>
  );
}