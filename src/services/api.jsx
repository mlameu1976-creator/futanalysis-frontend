NEXT_PUBLIC_API_URL= "http://127.0.0.1:8000";

export async function getOpportunities() {
  const response = await fetch(`${API_URL}/opportunities`);
  const data = await response.json();
  return data;
}

export async function getRankings() {
  const response = await fetch(`${API_URL}/opportunities`);
  const data = await response.json();

  const sorted = data.sort((a, b) => b.probability - a.probability);

  return sorted.slice(0, 20);
}