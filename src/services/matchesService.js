import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export async function fetchMatches(params = {}) {
  const response = await axios.get(`${API_URL}/opportunities`, {
    params,
  });

  // 🔥 EXTRAÇÃO CORRETA DO ARRAY
  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }

  return [];
}