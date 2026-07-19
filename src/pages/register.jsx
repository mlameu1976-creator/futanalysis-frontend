import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) { setError("Senhas nao conferem"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://futanalysis.com.br/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Erro ao cadastrar");
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("last_activity", Date.now().toString());
      document.cookie = `token=${data.access_token}; path=/; max-age=${60*60*24*7}`;
      router.push("/opportunities");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a, #1e293b)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
      <div style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "400px", border: "1px solid #334155" }}>
        <h1 style={{ color: "#38bdf8", textAlign: "center", marginBottom: "8px" }}>⚽ FutAnalysis</h1>
        <p style={{ color: "white", textAlign: "center", opacity: 0.7, marginBottom: "32px" }}>Criar conta gratis</p>

        {error && <div style={{ background: "#ef444420", border: "1px solid #ef4444", color: "#ef4444", padding: "12px", borderRadius: "8px", marginBottom: "16px" }}>{error}</div>}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "white", display: "block", marginBottom: "8px", fontSize: "14px" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", fontSize: "14px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "white", display: "block", marginBottom: "8px", fontSize: "14px" }}>Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", fontSize: "14px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ color: "white", display: "block", marginBottom: "8px", fontSize: "14px" }}>Confirmar Senha</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "white", fontSize: "14px", boxSizing: "border-box" }}
            />
          </div>
          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>
            {loading ? "Cadastrando..." : "Criar Conta"}
          </button>
        </form>

        <p style={{ color: "white", textAlign: "center", marginTop: "24px", opacity: 0.7, fontSize: "14px" }}>
          Ja tem conta? <Link href="/login" style={{ color: "#38bdf8" }}>Entrar</Link>
        </p>
        <p style={{ textAlign: "center", marginTop: "12px" }}>
          <Link href="/" style={{ color: "#64748b", fontSize: "14px" }}>← Voltar</Link>
        </p>
      </div>
    </div>
  );
}
