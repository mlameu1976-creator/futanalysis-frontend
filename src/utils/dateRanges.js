export function getDateRange(period) {
  const today = new Date();

  const format = (d) => d.toISOString().split("T")[0];

  if (period === "today") {
    const d = format(today);
    return { from: d, to: d };
  }

  if (period === "yesterday") {
    const y = new Date(today);
    y.setDate(today.getDate() - 1);
    const d = format(y);
    return { from: d, to: d };
  }

  // últimos 7 dias
  const past = new Date(today);
  past.setDate(today.getDate() - 6);

  return {
    from: format(past),
    to: format(today),
  };
}