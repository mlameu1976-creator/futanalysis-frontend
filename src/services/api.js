const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://futanalysis.com.br/api";

export async function getOpportunities() {
  const res = await fetch(`${API_URL}/opportunities`);
  return res.json();
}

export async function getRankings() {
  const res = await fetch(`${API_URL}/opportunities`);
  const data = await res.json();
  const sorted = data.sort((a, b) => b.probability - a.probability);
  return sorted.slice(0, 20);
}
