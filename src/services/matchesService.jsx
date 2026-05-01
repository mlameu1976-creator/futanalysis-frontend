import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export async function fetchMatches() {
  const response = await axios.get(`${API_URL}/opportunities`);

  if (!Array.isArray(response.data)) {
    console.error("Resposta inesperada:", response.data);
    return [];
  }

  return response.data;
}