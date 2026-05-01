export function formatBrazilDate(dateString) {
  if (!dateString) return "";

  // 🔥 FORÇA FORMATO ISO (corrige timezone)
  const isoString = dateString.replace(" ", "T") + "Z";

  const date = new Date(isoString);

  if (isNaN(date)) return "-";

  return date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}