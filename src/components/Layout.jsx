import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/banner")
      .then((res) => res.json())
      .then((data) => {
        console.log("Banner data:", data);
        const container = document.getElementById("banner-afiliado");
        console.log("Container:", container);
        if (data.html && container) {
          container.innerHTML = data.html;
          console.log("Banner injetado!");
        }
      })
      .catch((err) => console.error("Banner erro:", err));
  }, []);
  const isActive = (path) =>
    router.pathname === path
      ? { background: "#2563eb", color: "#fff" }
      : { color: "#0f172a" };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div id="banner-afiliado" style={{ background: "#1a1a2e", textAlign: "center", padding: "8px 0", minHeight: "70px" }}></div>
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
              FA
            </div>
            <strong style={{ fontSize: 18 }}>FutAnalysis</strong>
          </div>
          <nav style={{ display: "flex", gap: 12 }}>
            <Link href="/prediction" style={{ padding: "8px 14px", borderRadius: 8, textDecoration: "none", fontWeight: 500, ...isActive("/prediction") }}>
              Prediction
            </Link>
            <Link href="/opportunities" style={{ padding: "8px 14px", borderRadius: 8, textDecoration: "none", fontWeight: 500, ...isActive("/opportunities") }}>
              Opportunities
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px", flex: 1, width: "100%" }}>
        {children}
      </main>

      <footer style={{ background: "#0f172a", color: "#94a3b8", fontSize: "0.75rem", marginTop: "auto" }}>

        <div style={{ background: "#dc2626", padding: "10px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ background: "#fff", color: "#dc2626", fontWeight: 900, fontSize: "1rem", padding: "3px 10px", borderRadius: "4px", letterSpacing: "0.1em" }}>
              +18
            </span>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>
              PROIBIDO PARA MENORES DE 18 ANOS
            </span>
            <span style={{ color: "#fca5a5", fontSize: "0.8rem" }}>
              Ministério da Fazenda adverte: Apostar pode causar dependência
            </span>
          </div>
        </div>

        <div style={{ background: "#1e293b", borderTop: "1px solid #f59e0b", padding: "16px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Jogo Responsavel
            </span>
            <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>
              Aposte apenas o que pode perder. Defina limites de tempo e valor.
            </span>
            <a href="https://ibjr.org" target="_blank" rel="noopener noreferrer" style={{ color: "#f59e0b", textDecoration: "underline", fontWeight: 600, fontSize: "0.78rem" }}>
              jogueresponsavel.com.br
            </a>
            <a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer" style={{ color: "#f59e0b", textDecoration: "underline", fontWeight: 600, fontSize: "0.78rem" }}>
              gamblingtherapy.org
            </a>
            <span style={{ background: "#ef4444", color: "#fff", fontWeight: 700, fontSize: "0.78rem", padding: "3px 10px", borderRadius: "4px" }}>
              CVV: 188
            </span>
          </div>
        </div>

        <div style={{ background: "#0f172a", padding: "16px 24px", textAlign: "center", borderTop: "1px solid #1e293b" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ margin: "0 0 8px", color: "#64748b", lineHeight: 1.8, fontSize: "0.75rem" }}>
              Em conformidade com as diretrizes do CONAR e dos operadores regulamentados.
              Este site fornece exclusivamente analises estatisticas com fins informativos e
              nao constitui aconselhamento financeiro, incentivo a apostas ou servico de operador de apostas.
              Apostas esportivas sao proibidas para menores de 18 anos.
            </p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap", borderTop: "1px solid #1e293b", paddingTop: 12 }}>
              <span style={{ color: "#475569" }}>2025 FutAnalysis</span>
              <Link href="/privacidade" style={{ color: "#64748b", textDecoration: "underline" }}>Politica de Privacidade</Link>
              <Link href="/termos" style={{ color: "#64748b", textDecoration: "underline" }}>Termos de Uso</Link>
              <Link href="/sobre" style={{ color: "#64748b", textDecoration: "underline" }}>Sobre</Link>
              <a href="mailto:futanalysis.sport@gmail.com" style={{ color: "#64748b", textDecoration: "underline" }}>futanalysis.sport@gmail.com</a>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}
