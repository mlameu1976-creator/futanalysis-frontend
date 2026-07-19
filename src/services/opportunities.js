const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://futanalysis.com.br/api";

export async function getOpportunities() {
  const res = await fetch(`${API_URL}/opportunities`);
  return res.json();
}
