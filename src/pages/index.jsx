import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/opportunities");
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080C10",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#EDF2F7",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎯</div>
        <div style={{ color: "#F5C518", fontSize: "1rem" }}>Carregando FutAnalysis...</div>
      </div>
    </div>
  );
}
