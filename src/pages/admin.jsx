import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }

    fetch("https://futanalysis.com.br/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 403) throw new Error("Acesso negado");
        return res.json();
      })
      .then(setStats)
      .catch(err => setError(err.message));
  }, []);

  if (error) return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "#ef4444" }}>Acesso Negado</h1>
        <p>Voce nao tem permissao para acessar esta pagina.</p>
      </div>
    </div>
  );

  if (!stats) return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
      Carregando...
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", fontFamily: "Inter, sans-serif", padding: "20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h1 style={{ color: "#38bdf8" }}>⚙️ Painel Admin</h1>
          <a href="/" style={{ color: "#64748b", textDecoration: "none" }}>← Voltar</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Usuarios", value: stats.total_users, icon: "👤", color: "#38bdf8" },
            { label: "Jogos", value: stats.total_matches.toLocaleString(), icon: "⚽", color: "#10b981" },
            { label: "Oportunidades", value: stats.total_opportunities.toLocaleString(), icon: "🎯", color: "#f59e0b" },
            { label: "Ligas", value: stats.total_leagues, icon: "🏆", color: "#8b5cf6" },
          ].map((item) => (
            <div key={item.label} style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #334155",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>{item.icon}</div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: item.color }}>{item.value}</div>
              <div style={{ opacity: 0.6, fontSize: "14px", marginTop: "4px" }}>{item.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ marginBottom: "16px" }}>Usuarios Cadastrados</h2>
        <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0f172a" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", opacity: 0.6, fontSize: "13px" }}>ID</th>
                <th style={{ padding: "12px 16px", textAlign: "left", opacity: 0.6, fontSize: "13px" }}>Email</th>
                <th style={{ padding: "12px 16px", textAlign: "left", opacity: 0.6, fontSize: "13px" }}>Cadastro</th>
                <th style={{ padding: "12px 16px", textAlign: "left", opacity: 0.6, fontSize: "13px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.users.map((user) => (
                <tr key={user.id} style={{ borderTop: "1px solid #334155" }}>
                  <td style={{ padding: "12px 16px", opacity: 0.6 }}>{user.id}</td>
                  <td style={{ padding: "12px 16px" }}>
                    {user.email}
                    {user.is_admin && <span style={{ marginLeft: "8px", background: "#38bdf820", color: "#38bdf8", padding: "2px 8px", borderRadius: "4px", fontSize: "11px" }}>ADMIN</span>}
                  </td>
                  <td style={{ padding: "12px 16px", opacity: 0.6, fontSize: "13px" }}>
                    {new Date(user.created_at).toLocaleString("pt-BR")}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      background: user.is_active ? "#10b98120" : "#ef444420",
                      color: user.is_active ? "#10b981" : "#ef4444",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}>{user.is_active ? "Ativo" : "Inativo"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
