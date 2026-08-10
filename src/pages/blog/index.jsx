import Link from "next/link";
import Head from "next/head";

const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", red: "#E83B3B",
  green: "#2ECC71", blue: "#3B82F6", purple: "#8B5CF6",
  text: "#EDF2F7", textMid: "#94A3B8", textDim: "#4A5568",
  font: "'JetBrains Mono', 'Fira Code', monospace",
};

const POSTS = [
  {
    slug: "como-funciona-modelo-dixon-coles",
    title: "Como funciona o modelo Dixon-Coles no futebol",
    date: "20 de maio de 2026",
    desc: "Entenda como o modelo estatístico Dixon-Coles é usado para calcular probabilidades de gols e resultados em partidas de futebol. Guia completo com exemplos práticos.",
    tag: "Metodologia",
    color: T.yellow,
  },
  {
    slug: "o-que-e-xg-expected-goals",
    title: "O que é xG (Expected Goals) e como interpretar",
    date: "18 de maio de 2026",
    desc: "Expected Goals é uma das métricas mais importantes do futebol moderno. Saiba como ela é calculada, como interpretar os valores e como usá-la na análise de partidas.",
    tag: "Estatísticas",
    color: T.green,
  },
  {
    slug: "como-usar-over-under-futebol",
    title: "Como usar mercados Over/Under no futebol",
    date: "15 de maio de 2026",
    desc: "Os mercados Over/Under são dos mais populares no futebol. Aprenda a analisar estatísticas de gols para identificar as melhores oportunidades em Over 1.5, 2.5 e Under 2.5.",
    tag: "Mercados",
    color: T.blue,
  },
  {
    slug: "btts-ambas-marcam-guia-completo",
    title: "BTTS — Ambas as equipes marcam: guia completo",
    date: "12 de maio de 2026",
    desc: "O mercado BTTS é um dos favoritos entre apostadores. Veja como analisar o potencial ofensivo e defensivo dos times para identificar as melhores oportunidades.",
    tag: "Mercados",
    color: T.purple,
  },
  {
    slug: "como-apostar-cartoes-amarelos-futebol",
    title: "Como apostar em cartões amarelos no futebol",
    date: "10 de maio de 2026",
    desc: "Guia completo sobre mercados de cartões amarelos: Over/Under 3.5 e 4.5, como o árbitro influencia o total, diferenças entre ligas e como usar estatísticas para identificar oportunidades.",
    tag: "Mercados",
    color: T.red,
  },
  {
    slug: "guia-apostas-escanteios-futebol",
    title: "Guia completo de apostas em escanteios no futebol",
    date: "8 de maio de 2026",
    desc: "Aprenda a apostar em escanteios: mercados Over/Under 8.5 e 10.5, fatores que influenciam o total de escanteios por partida e como o modelo Poisson calcula as probabilidades.",
    tag: "Mercados",
    color: T.green,
  },
];

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog — FutAnalysis | Análise Estatística de Futebol</title>
        <meta name="description" content="Artigos sobre análise estatística de futebol, metodologias de probabilidade, mercados e como interpretar dados para tomar melhores decisões." />
        <link rel="canonical" href="https://futanalysis.com.br/blog" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/opportunities" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← oportunidades</Link>
          <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: T.yellow }}>Blog</h1>
        </div>

        <p style={{ fontSize: "0.85rem", color: T.textMid, marginBottom: "2rem", lineHeight: 1.7 }}>
          Artigos sobre análise estatística de futebol, metodologias de probabilidade e como interpretar dados para entender melhor o jogo.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "10px", overflow: "hidden", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = post.color + "66"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ height: "3px", background: post.color }} />
                <div style={{ padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.65rem", color: post.color, background: post.color + "18", border: `1px solid ${post.color}33`, borderRadius: "20px", padding: "2px 8px" }}>{post.tag}</span>
                    <span style={{ fontSize: "0.65rem", color: T.textDim }}>{post.date}</span>
                  </div>
                  <h2 style={{ margin: "0 0 0.5rem", fontSize: "0.95rem", fontWeight: 700, color: T.text }}>{post.title}</h2>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: T.textMid, lineHeight: 1.6 }}>{post.desc}</p>
                  <div style={{ marginTop: "0.8rem", fontSize: "0.72rem", color: post.color }}>Ler artigo →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

              <div style={{ marginTop: "2rem" }}>
        <div style={{ background: "#dc2626", padding: "10px 24px", textAlign: "center", borderRadius: "8px 8px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ background: "#fff", color: "#dc2626", fontWeight: 900, fontSize: "1rem", padding: "3px 10px", borderRadius: "4px" }}>+18</span>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>PROIBIDO PARA MENORES DE 18 ANOS</span>
            <span style={{ color: "#fca5a5", fontSize: "0.8rem" }}>Ministério da Fazenda adverte: Apostar pode causar dependência</span>
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
