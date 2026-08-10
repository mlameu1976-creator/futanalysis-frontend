// src/pages/sobre.jsx
import Link from "next/link";
import Head from "next/head";

const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", red: "#E83B3B",
  green: "#2ECC71", blue: "#3B82F6", purple: "#8B5CF6",
  text: "#EDF2F7", textMid: "#94A3B8", textDim: "#4A5568",
  font: "'JetBrains Mono', 'Fira Code', monospace",
};

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: T.yellow, marginBottom: "1rem", borderBottom: `1px solid ${T.border}`, paddingBottom: "0.5rem" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function P({ children }) {
  return <p style={{ fontSize: "0.85rem", color: T.textMid, lineHeight: 1.8, marginBottom: "0.8rem" }}>{children}</p>;
}

function Card({ icon, title, desc }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "10px", padding: "1.2rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <span style={{ fontSize: "1.5rem" }}>{icon}</span>
      <div>
        <div style={{ fontWeight: 700, fontSize: "0.85rem", color: T.text, marginBottom: "0.3rem" }}>{title}</div>
        <div style={{ fontSize: "0.78rem", color: T.textMid, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

export default function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre o FutAnalysis — Análise Estatística de Futebol</title>
        <meta name="description" content="Conheça o FutAnalysis, plataforma de análise estatística de futebol que usa modelos matemáticos avançados para identificar oportunidades em mais de 110 ligas do mundo." />
        <link rel="canonical" href="https://futanalysis.com.br/sobre" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/opportunities" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← oportunidades</Link>
          <h1 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: T.yellow }}>Sobre o FutAnalysis</h1>
        </div>

        <Section title="O que é o FutAnalysis?">
          <P>O FutAnalysis é uma plataforma de análise estatística de futebol que utiliza modelos matemáticos avançados para identificar oportunidades em mais de 110 ligas ao redor do mundo.</P>
          <P>Nossa missão é transformar dados brutos de partidas em informações claras e acionáveis, ajudando entusiastas do futebol a tomar decisões mais embasadas com base em estatísticas reais.</P>
          <P>O projeto nasceu da combinação entre paixão pelo futebol e expertise em ciência de dados, com o objetivo de democratizar o acesso à análise estatística avançada que antes era restrita a grandes clubes e organizações.</P>
        </Section>

        <Section title="Como funciona nossa metodologia?">
          <P>Nosso modelo de probabilidades é baseado em técnicas estatísticas consolidadas na literatura de análise esportiva:</P>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", margin: "1rem 0" }}>
            <Card icon="📐" title="Modelo Dixon-Coles"
              desc="Adaptação do modelo clássico de Dixon-Coles para cálculo de força de ataque e defesa de cada time, considerando o fator mandante e a média histórica da liga." />
            <Card icon="📊" title="Distribuição de Poisson"
              desc="Usamos a distribuição de Poisson para calcular a probabilidade de diferentes placares, derivando mercados como Over/Under, BTTS e resultado da partida." />
            <Card icon="⚡" title="Forma Recente com Peso Exponencial"
              desc="Jogos mais recentes têm maior peso no cálculo, capturando a forma atual do time com decaimento exponencial (fator 0.85 por jogo anterior)." />
            <Card icon="🔄" title="Lambdas Híbridos"
              desc="Combinamos o histórico longo (55%) com a forma recente (45%) para calcular o lambda esperado de gols, equilibrando consistência histórica com momento atual." />
            <Card icon="📈" title="H2H — Confronto Direto"
              desc="O histórico de confrontos diretos entre os times tem peso de 15-20% nos mercados de resultado, capturando rivalidades e padrões específicos." />
            <Card icon="🎯" title="xG — Expected Goals"
              desc="Para o mercado ao vivo, utilizamos o xG (gols esperados) real da partida como base para recalcular as probabilidades em tempo real." />
          </div>
        </Section>

        <Section title="Mercados cobertos">
          <P>Analisamos os seguintes mercados para cada partida:</P>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", margin: "1rem 0" }}>
            {[
              "⚽ Resultado (Casa vence / Empate / Fora vence)",
              "🎯 Over/Under 1.5, 2.5 gols",
              "🔵 BTTS — Ambas marcam",
              "⏱ Gol no 1º tempo",
              "🟨 Cartões Over/Under 3.5 e 4.5",
              "⛳ Escanteios Over/Under 8.5 e 10.5",
              "🦵 Faltas Over/Under 19.5, 22.5 e 25.5",
              "👤 Oportunidades por jogador",
              "🔴 Mercados ao vivo em tempo real",
              "🏀 NBA — Over/Under e Handicap",
            ].map((m, i) => (
              <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "6px", padding: "0.5rem 0.8rem", fontSize: "0.75rem", color: T.textMid }}>
                {m}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Ligas cobertas">
          <P>Monitoramos mais de 110 ligas ao redor do mundo, incluindo:</P>
          <P><strong style={{ color: T.text }}>Europa:</strong> Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Eredivisie, Primeira Liga, Scottish Premiership, Süper Lig, Pro League Belga e mais 15 ligas europeias.</P>
          <P><strong style={{ color: T.text }}>América do Sul:</strong> Brasileirão Série A e B, Liga Profesional Argentina, Copa Libertadores, Copa Sudamericana, ligas do Chile, Colômbia, Peru, Equador, Uruguai e Venezuela.</P>
          <P><strong style={{ color: T.text }}>Outras:</strong> MLS, Liga MX, J1 League, K League, Saudi Pro League, além de ligas da Finlândia, Islândia, Israel, Bulgária, Egito e Emirados Árabes.</P>
        </Section>

        <Section title="Atualização dos dados">
          <P>Nossa plataforma é atualizada automaticamente todos os dias:</P>
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "1rem", fontSize: "0.78rem", color: T.textMid, lineHeight: 2 }}>
            <div>🕖 <strong style={{ color: T.text }}>07h00 BRT</strong> — Sincronização de partidas futuras e resultados</div>
            <div>🕖 <strong style={{ color: T.text }}>07h15 BRT</strong> — Geração de oportunidades para todas as ligas</div>
            <div>🕗 <strong style={{ color: T.text }}>08h00 BRT</strong> — Envio das top oportunidades no Telegram</div>
            <div>🔴 <strong style={{ color: T.text }}>Ao vivo</strong> — Atualização a cada 60 segundos durante partidas</div>
          </div>
        </Section>

        <Section title="Quem está por trás">
          <P>O FutAnalysis é desenvolvido e mantido por <strong style={{ color: T.text }}>Moacir Lameu Jr.</strong>, responsável por toda a modelagem estatística, o desenvolvimento da plataforma e a infraestrutura que processa os dados diariamente.</P>
          <P>O projeto nasceu da vontade de aplicar ciência de dados e estatística a um assunto que sempre foi tratado de forma intuitiva — a análise de partidas de futebol — trazendo o mesmo rigor metodológico usado em outras áreas quantitativas para o esporte.</P>
          <P>Todo o pipeline, desde a coleta dos dados de partidas até o cálculo das probabilidades exibidas no site, é desenvolvido e operado de forma independente, o que permite ajustar e validar os modelos continuamente com base nos resultados reais observados a cada rodada.</P>
        </Section>
        <Section title="Contato">
          <P>Dúvidas, sugestões ou parcerias? Entre em contato:</P>
          <a href="mailto:futanalysis.sport@gmail.com" style={{ color: T.yellow, textDecoration: "none", fontSize: "0.85rem" }}>
            ✉ futanalysis.sport@gmail.com
          </a>
        </Section>

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
