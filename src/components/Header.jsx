import Link from "next/link";

export default function Header({ active }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      background: "#0f172a",
      borderBottom: "1px solid #1e293b",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link href="/" style={{ color: "#38bdf8", fontWeight: "800", fontSize: "18px", textDecoration: "none" }}>
          Fut Analysis
        </Link>
        <Link href="/opportunities" style={{
          color: active === "opportunities" ? "#38bdf8" : "#94a3b8",
          textDecoration: "none", fontSize: "14px", fontWeight: active === "opportunities" ? "700" : "400"
        }}>Oportunidades</Link>
        <Link href="/prediction" style={{
          color: active === "prediction" ? "#38bdf8" : "#94a3b8",
          textDecoration: "none", fontSize: "14px", fontWeight: active === "prediction" ? "700" : "400"
        }}>Predicoes</Link>
      </div>
    </div>
  );
}
