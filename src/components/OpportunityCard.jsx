export default function OpportunityCard({ data }) {
  if (!data) return null;

  return (
    <div className="border rounded p-4 shadow bg-white">
      <h3 className="font-semibold mb-2">{data.market}</h3>

      <div className="text-sm space-y-1">
        <p>
          <strong>Match:</strong> {data.match}
        </p>

        <p>
          <strong>Score:</strong> {data.score}
        </p>

        <p>
          <strong>Confiança:</strong> {data.confidence}
        </p>

        <p>
          <strong>Criado em:</strong>{" "}
          {new Date(data.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}