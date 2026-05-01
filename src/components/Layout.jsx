import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  const isActive = (path) =>
    router.pathname === path
      ? {
          background: "#2563eb",
          color: "#fff",
        }
      : {
          color: "#0f172a",
        };

  return (
    <div>
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* BRAND */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#2563eb",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              FA
            </div>
            <strong style={{ fontSize: 18 }}>FutAnalysis</strong>
          </div>

          {/* NAV */}
          <nav style={{ display: "flex", gap: 12 }}>
            <Link
              href="/prediction"
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 500,
                ...isActive("/prediction"),
              }}
            >
              Prediction
            </Link>

            <Link
              href="/opportunities"
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 500,
                ...isActive("/opportunities"),
              }}
            >
              Opportunities
            </Link>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
