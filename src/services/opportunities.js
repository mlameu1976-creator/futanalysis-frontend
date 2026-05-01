NEXT_PUBLIC_API_URL= "http://127.0.0.1:8000";

export async function getOpportunities(market = "all") {
  const endpoint =
    market === "all"
      ? "/opportunities"
      : `/opportunities/${market}`;

  const res = await fetch(`${API_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar oportunidades");
  }

  return res.json();
}
