NEXT_PUBLIC_API_URL= "http://127.0.0.1:8000";

export async function getOpportunities() {
  const res = await fetch(`${API_URL}/opportunities`);
  return res.json();
}

export async function getRankings() {
  const res = await fetch(`${API_URL}/opportunities`);
  const data = await res.json();

  // ordenar por probabilidade
  const sorted = data.sort((a, b) => b.probability - a.probability);

  // pegar top 20
  return sorted.slice(0, 20);
}