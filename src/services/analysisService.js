import api from "./api";

export async function getLastGamesAnalysis(team, limit = 5) {
  const response = await api.get("/analysis/last-games", {
    params: { team, limit },
  });
  return response.data;
}
