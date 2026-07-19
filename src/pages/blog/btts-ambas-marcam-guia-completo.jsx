import Link from "next/link";
import Head from "next/head";

const T = {
  bg: "#080C10", surface: "#0E1419", surfaceHi: "#141B22",
  border: "#1E2830", yellow: "#F5C518", red: "#E83B3B",
  green: "#2ECC71", blue: "#3B82F6", text: "#EDF2F7",
  textMid: "#94A3B8", textDim: "#4A5568",
  font: "'JetBrains Mono', 'Fira Code', monospace",
};

const P = ({ children }) => <p style={{ fontSize: "0.85rem", color: T.textMid, lineHeight: 1.9, marginBottom: "1rem" }}>{children}</p>;
const H2 = ({ children }) => <h2 style={{ fontSize: "1rem", fontWeight: 700, color: T.yellow, margin: "1.8rem 0 0.8rem" }}>{children}</h2>;
const H3 = ({ children }) => <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: T.text, margin: "1.2rem 0 0.6rem" }}>{children}</h3>;
const Strong = ({ children }) => <strong style={{ color: T.text }}>{children}</strong>;
const Box = ({ children }) => <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "8px", padding: "1rem 1.2rem", margin: "1rem 0", fontSize: "0.82rem", color: T.textMid, lineHeight: 2 }}>{children}</div>;

export default function PostBTTS() {
  return (
    <>
      <Head>
        <title>BTTS — Ambas as equipes marcam: guia completo — FutAnalysis</title>
        <meta name="description" content="Guia completo sobre BTTS (ambas marcam) no futebol: como funciona, fatores que influenciam, estratégias de análise e como usar essa métrica em apostas esportivas." />
        <link rel="canonical" href="https://futanalysis.com.br/blog/btts-ambas-marcam-guia-completo" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "750px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← blog</Link>
          <span style={{ fontSize: "0.65rem", color: T.green, background: T.green + "18", border: `1px solid ${T.green}33`, borderRadius: "20px", padding: "2px 8px" }}>Mercados</span>
        </div>

        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: T.text, marginBottom: "0.5rem", lineHeight: 1.4 }}>
          BTTS — Ambas as equipes marcam: guia completo
        </h1>
        <p style={{ fontSize: "0.72rem", color: T.textDim, marginBottom: "2rem" }}>12 de maio de 2026 · 10 min de leitura</p>

        <P>BTTS é a sigla para "Both Teams To Score" — em português, "ambas as equipes marcam". É um dos mercados mais populares em apostas esportivas de futebol, e por boa razão: é simples de entender, fácil de analisar com dados históricos e oferece odds atraentes na maioria dos jogos. Neste guia completo, explicamos tudo o que você precisa saber sobre o mercado BTTS.</P>

        <H2>O que é o mercado BTTS?</H2>
        <P>No mercado BTTS, você aposta se ambos os times marcarão pelo menos um gol cada durante a partida. Há duas opções:</P>

        <Box>
          <div>• <Strong>BTTS Sim</Strong> — ambos os times marcam ao menos 1 gol cada</div>
          <div>• <Strong>BTTS Não</Strong> — pelo menos um dos times não marca (0 gols)</div>
        </Box>

        <P>O resultado final não importa para o BTTS. Uma partida que termina 2x1, 1x1, 3x2 ou qualquer placar onde ambos os times marcaram é BTTS Sim. Partidas que terminam 1x0, 2x0, 0x0 ou qualquer placar com um time sem gol são BTTS Não.</P>

        <P>Isso torna o BTTS especialmente interessante porque você pode estar certo mesmo que seu time favorito perca. Se você apostou BTTS Sim em um jogo que terminou 1x3, você ganhou — mesmo que o resultado não tenha sido o que você queria.</P>

        <H2>Por que o BTTS é tão popular?</H2>
        <H3>Independência do resultado</H3>
        <P>Assim como o Over/Under, o BTTS elimina a necessidade de prever quem vai ganhar. Você foca apenas em se ambos os times têm capacidade ofensiva suficiente para superar a defesa adversária. Isso simplifica a análise consideravelmente.</P>

        <H3>Dados históricos abundantes</H3>
        <P>Com centenas de jogos por semana em ligas ao redor do mundo, há uma quantidade enorme de dados históricos para calcular a taxa de BTTS de cada time, liga e confronto específico. Times que marcam em quase todos os jogos e defesas que quase sempre tomam gol são relativamente previsíveis.</P>

        <H3>Odds atraentes</H3>
        <P>Em confrontos equilibrados, as odds de BTTS Sim costumam ficar entre 1.60 e 1.90, oferecendo um retorno razoável com uma probabilidade relativamente alta de acerto quando bem analisado. O FutAnalysis registra 66.7% de acerto no mercado BTTS em nossa amostra histórica.</P>

        <H2>Fatores que favorecem BTTS Sim</H2>
        <P>Para apostar em BTTS Sim com confiança, procure situações onde:</P>

        <H3>Ambos os times têm defesa fraca</H3>
        <P>Este é o fator mais direto. Se os dois times concedem gols com frequência (digamos, média de 1.5+ gols sofridos por jogo), é altamente provável que ambos marquem. Analise separadamente os gols sofridos como mandante e visitante, já que muitos times têm defesas bem diferentes em casa e fora.</P>

        <H3>Ambos os times têm ataque consistente</H3>
        <P>Times que marcam em 80%+ dos seus jogos são candidatos fortes ao BTTS Sim. Mas mais importante do que a média geral é analisar se o time marca regularmente fora de casa (para o visitante) e se marca bem quando não é favorito (para jogos onde o mandante é muito superior).</P>

        <H3>Histórico de confrontos diretos</H3>
        <P>Alguns pares de times têm padrão consistente de ambos marcarem quando se enfrentam. Isso pode ocorrer por questões táticas, rivalidade, ou simplesmente pelo perfil ofensivo de ambos os times contra o estilo específico do adversário. Verifica o histórico H2H antes de apostar.</P>

        <H3>Motivação de ambos os lados</H3>
        <P>Partidas onde ambos os times precisam da vitória tendem a ser mais abertas. Uma equipe que só precisa de um ponto para se classificar pode adotar postura diferente de quando precisa vencer. A motivação relativa de cada time é um fator qualitativo importante que complementa os dados estatísticos.</P>

        <H2>Fatores que favorecem BTTS Não</H2>
        <P>Por outro lado, apostar em BTTS Não faz mais sentido quando:</P>

        <H3>Um time tem defesa excepcional</H3>
        <P>Times com defesas realmente sólidas — que não tomam gol em 50%+ dos jogos — são candidatos fortes ao BTTS Não. Isso é especialmente verdadeiro quando enfrentam ataques mediocres. A combinação de defesa forte vs ataque fraco é a situação ideal para o BTTS Não.</P>

        <H3>Um time tem ataque muito fraco</H3>
        <P>Se um dos times raramente marca (menos de 0.8 gols por jogo em média), é provável que não consiga furar a defesa adversária. Times em crise de gols, passando por período de baixa forma ou com jogadores chave lesionados são candidatos ao BTTS Não.</P>

        <H3>Confronto muito desequilibrado</H3>
        <P>Quando um time muito superior enfrenta um adversário de nível bem inferior, o time mais fraco frequentemente se fecha na defesa e consegue manter o zero. Claro, isso também pode resultar em vitória por placar elástico do time mais forte — a análise contextual é importante.</P>

        <H2>Como calcular a probabilidade de BTTS</H2>
        <P>A forma mais simples de estimar a probabilidade de BTTS Sim é usar o histórico de cada time separadamente e combinar as probabilidades. Se o time A marca em 70% dos jogos e o time B marca em 65% dos jogos, a probabilidade de ambos marcarem seria aproximadamente 70% × 65% = 45.5%.</P>

        <P>Mas essa abordagem é simplista. O FutAnalysis usa o modelo Dixon-Coles com distribuição de Poisson para calcular a probabilidade de BTTS Sim de forma mais precisa:</P>

        <Box>
          <div>P(BTTS Sim) = 1 - P(time casa não marca) - P(visitante não marca) + P(nenhum marca)</div>
          <div style={{ marginTop: "0.5rem" }}>P(time não marca) = P(0 gols) = e^(-λ) pela distribuição de Poisson</div>
        </Box>

        <P>Por exemplo, se λ_casa = 1.4 e λ_visitante = 1.1:</P>
        <Box>
          <div>P(casa não marca) = e^(-1.4) ≈ 24.7%</div>
          <div>P(visitante não marca) = e^(-1.1) ≈ 33.3%</div>
          <div>P(nenhum marca) = e^(-1.4) × e^(-1.1) ≈ 8.2%</div>
          <div>P(BTTS Sim) = 1 - 0.247 - 0.333 + 0.082 ≈ 50.2%</div>
        </Box>

        <H2>BTTS e o mercado de dupla chance</H2>
        <P>O BTTS pode ser combinado com mercados de dupla chance para criar apostas compostas interessantes. Por exemplo, "BTTS Sim + Dupla Chance 1X" significa que você aposta que ambos marcam E que o mandante não perde. Isso é válido em jogos onde o mandante tem ligeira vantagem mas ambos os times são ofensivos.</P>

        <P>No entanto, apostas combinadas têm odds multiplicadas mas também riscos multiplicados. Use essas combinações com cautela e apenas quando houver base estatística sólida para ambas as condições.</P>

        <H2>BTTS por liga: as diferenças regionais</H2>
        <P>A taxa de BTTS varia significativamente entre ligas:</P>

        <Box>
          <div>• <Strong>Premier League (Inglaterra)</Strong>: ~55-60% de BTTS Sim por temporada</div>
          <div>• <Strong>Bundesliga (Alemanha)</Strong>: ~55-58% — liga com mais gols da Europa</div>
          <div>• <Strong>Serie A (Itália)</Strong>: ~48-52% — historicamente mais defensiva</div>
          <div>• <Strong>La Liga (Espanha)</Strong>: ~50-55%</div>
          <div>• <Strong>Ligue 1 (França)</Strong>: ~48-52%</div>
          <div>• <Strong>Brasileirão</Strong>: ~50-55%</div>
        </Box>

        <P>Essas diferenças refletem as culturas táticas de cada campeonato. Ligas mais ofensivas naturalmente têm mais BTTS Sim, enquanto ligas com tradição defensiva têm taxas menores.</P>

        <H2>Análise de cartões vermelhos e BTTS</H2>
        <P>Um fator frequentemente subestimado é o impacto de cartões vermelhos no BTTS. Se um time leva um vermelho nos primeiros 30 minutos, o time com superioridade numérica geralmente tem facilidade para marcar (BTTS Sim fica mais provável no aspecto do time superior), mas o time em desvantagem pode adotar postura ultradefensiva (BTTS Não fica mais provável no aspecto do time inferior).</P>

        <P>Em apostas ao vivo, um cartão vermelho é um evento que pode mudar completamente a dinâmica do BTTS e deve ser monitorado com atenção.</P>

        <H2>Como o FutAnalysis usa o BTTS</H2>
        <P>No FutAnalysis, exibimos o mercado BTTS Sim quando a probabilidade calculada supera 58%. Com base em nossa amostra histórica de acertos, o BTTS Sim tem 66.7% de taxa de acerto com uma odd simulada de 1.60, o que representa ROI positivo acima do break-even de 62.5%.</P>

        <P>Nosso modelo considera força de ataque e defesa de cada time, forma recente com peso exponencial, histórico de confrontos diretos e home advantage específico da liga para calcular os lambdas de Poisson que alimentam o cálculo do BTTS.</P>

        <div style={{ marginTop: "2rem", padding: "1rem", background: T.surface, borderRadius: "8px", border: `1px solid ${T.border}` }}>
          <P>Veja as oportunidades BTTS calculadas para os jogos de hoje nas nossas <Link href="/opportunities/football" style={{ color: T.yellow, textDecoration: "none" }}>oportunidades de futebol</Link>. Para entender melhor o modelo por trás dos cálculos, leia nosso artigo sobre o <Link href="/blog/como-funciona-modelo-dixon-coles" style={{ color: T.yellow, textDecoration: "none" }}>modelo Dixon-Coles</Link>.</P>
        </div>

        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← Ver todos os artigos</Link>
        </div>
      </div>
    </>
  );
}

