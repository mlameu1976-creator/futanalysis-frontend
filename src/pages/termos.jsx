// src/pages/termos.jsx
import Link from "next/link";
import Head from "next/head";
const T = { bg:"#080C10",surface:"#0E1419",border:"#1E2830",yellow:"#F5C518",text:"#EDF2F7",textMid:"#94A3B8",textDim:"#4A5568",font:"'JetBrains Mono',monospace" };
const sections = [
  {t:"1. Aceitação dos Termos",p:"Ao acessar o FutAnalysis (futanalysis.com.br), você concorda com estes Termos de Uso."},
  {t:"2. Sobre o Serviço",p:"A FutAnalysis é uma plataforma de análise estatística de futebol com caráter exclusivamente informativo e educacional."},
  {t:"3. Responsabilidade sobre Apostas",p:"⚠️ A FutAnalysis NÃO é uma casa de apostas e NÃO incentiva apostas. As análises são ferramentas estatísticas informativas. Qualquer decisão de apostar é de exclusiva responsabilidade do usuário. Apenas maiores de 18 anos."},
  {t:"4. Precisão das Informações",p:"As análises são baseadas em modelos estatísticos. Não garantimos precisão total. Resultados passados não garantem resultados futuros."},
  {t:"5. Limitação de Responsabilidade",p:"A FutAnalysis não se responsabiliza por perdas financeiras decorrentes do uso das informações do site."},
  {t:"6. Jogo Responsável",p:"Se você tem problemas com jogos de azar, procure ajuda: www.jogosresponsaveis.org.br ou ligue 0800 722 0522 (SENAD)."},
  {t:"7. Contato",p:"Dúvidas: futanalysis.sport@gmail.com"},
];
export default function Termos() {
  return (
    <>
      <Head>
        <title>Termos de Uso — FutAnalysis</title>
        <meta name="description" content="Termos de uso da plataforma FutAnalysis. Análise estatística de futebol e NBA com caráter exclusivamente informativo e educacional." />
        <link rel="canonical" href="https://futanalysis.com.br/termos" />
      </Head>
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:T.font,padding:"2rem",maxWidth:"800px",margin:"0 auto"}}>
      <div style={{marginBottom:"2rem",paddingBottom:"1rem",borderBottom:`1px solid ${T.border}`}}>
        <Link href="/" style={{color:T.textMid,textDecoration:"none",fontSize:"0.78rem"}}>← início</Link>
        <h1 style={{margin:"0.5rem 0 0",fontSize:"1.4rem",fontWeight:700,color:T.yellow}}>Termos de Uso</h1>
        <p style={{margin:"0.3rem 0 0",fontSize:"0.75rem",color:T.textDim}}>Última atualização: maio de 2026</p>
      </div>
      {sections.map(({t,p})=>(
        <div key={t} style={{marginBottom:"1.5rem"}}>
          <h2 style={{fontSize:"1rem",fontWeight:700,color:T.yellow,marginBottom:"0.5rem"}}>{t}</h2>
          <p style={{fontSize:"0.82rem",color:T.textMid,lineHeight:1.8,margin:0}}>{p}</p>
        </div>
      ))}
            <div style={{ marginTop: "2rem" }}>
        <div style={{ background: "#dc2626", padding: "10px 24px", textAlign: "center", borderRadius: "8px 8px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ background: "#fff", color: "#dc2626", fontWeight: 900, fontSize: "1rem", padding: "3px 10px", borderRadius: "4px" }}>+18</span>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>PROIBIDO PARA MENORES DE 18 ANOS</span>
            <span style={{ color: "#fca5a5", fontSize: "0.8rem" }}>O jogo pode causar dependencia - jogue com responsabilidade</span>
          </div>
        </div>
        <div style={{ background: "#1e293b", padding: "12px 24px", textAlign: "center", borderTop: "1px solid #f59e0b" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "0.78rem" }}>Jogo Responsavel</span>
            <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Aposte apenas o que pode perder. Defina limites de tempo e valor.</span>
            <a href="https://ibjr.org" target="_blank" rel="noopener noreferrer" style={{ color: "#f59e0b", textDecoration: "underline", fontSize: "0.75rem" }}>ibjr.org - Jogo Responsavel</a>
            <a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer" style={{ color: "#f59e0b", textDecoration: "underline", fontSize: "0.75rem" }}>gamblingtherapy.org</a>
            <span style={{ background: "#ef4444", color: "#fff", fontWeight: 700, fontSize: "0.75rem", padding: "2px 8px", borderRadius: "4px" }}>CVV: 188</span>
          </div>
        </div>
        <div style={{ background: "#0f172a", padding: "14px 24px", textAlign: "center", borderTop: "1px solid #1e293b", borderRadius: "0 0 8px 8px" }}>
          <p style={{ margin: "0 0 8px", color: "#64748b", fontSize: "0.7rem", lineHeight: 1.8 }}>
            Em conformidade com as diretrizes do CONAR e dos operadores regulamentados.
            Este site fornece exclusivamente analises estatisticas com fins informativos e nao constitui aconselhamento financeiro ou incentivo a apostas.
            Apostas esportivas sao proibidas para menores de 18 anos.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.65rem", color: "#475569" }}>FutAnalysis © 2025-2026</span>
            <a href="/sobre" style={{ fontSize: "0.65rem", color: "#64748b", textDecoration: "none" }}>Sobre</a>
            <a href="/blog" style={{ fontSize: "0.65rem", color: "#64748b", textDecoration: "none" }}>Blog</a>
            <a href="/privacidade" style={{ fontSize: "0.65rem", color: "#64748b", textDecoration: "none" }}>Politica de Privacidade</a>
            <a href="/termos" style={{ fontSize: "0.65rem", color: "#64748b", textDecoration: "none" }}>Termos de Uso</a>
            <a href="mailto:futanalysis.sport@gmail.com" style={{ fontSize: "0.65rem", color: "#64748b", textDecoration: "none" }}>futanalysis.sport@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
