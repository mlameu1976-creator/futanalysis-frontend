export default function ScoreBadge({ score }) {
  let color = "#dc2626";
  let label = "Ignorar";

  if (score >= 80) {
    color = "#16a34a";
    label = "Forte";
  } else if (score >= 70) {
    color = "#22c55e";
    label = "Boa";
  } else if (score >= 60) {
    color = "#eab308";
    label = "Moderada";
  }

  return (
    <span
      style={{
        backgroundColor: color,
        color: "#fff",
        padding: "4px 10px",
        borderRadius: "6px",
        fontWeight: "bold",
        fontSize: "0.85rem",
      }}
    >
      {score} • {label}
    </span>
  );
}
