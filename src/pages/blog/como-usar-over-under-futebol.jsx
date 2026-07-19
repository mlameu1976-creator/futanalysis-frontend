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

export default function PostOverUnder() {
  return (
    <>
      <Head>
        <title>Como usar mercados Over/Under no futebol — FutAnalysis</title>
        <meta name="description" content="Guia completo sobre mercados Over/Under no futebol: como funcionam, estratégias para Over 1.5, Over 2.5, Under 2.5 e como o FutAnalysis calcula as probabilidades." />
        <link rel="canonical" href="https://futanalysis.com.br/blog/como-usar-over-under-futebol" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "750px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← blog</Link>
          <span style={{ fontSize: "0.65rem", color: T.blue, background: T.blue + "18", border: `1px solid ${T.blue}33`, borderRadius: "20px", padding: "2px 8px" }}>Mercados</span>
        </div>

        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: T.text, marginBottom: "0.5rem", lineHeight: 1.4 }}>
          Como usar mercados Over/Under no futebol
        </h1>
        <p style={{ fontSize: "0.72rem", color: T.textDim, marginBottom: "2rem" }}>15 de maio de 2026 · 10 min de leitura</p>

        <P>Os mercados Over/Under são um dos tipos de aposta mais populares no futebol, e por uma boa razão: eles permitem analisar uma partida de forma independente do resultado, focando apenas no volume de gols. Neste guia completo, explicamos como funcionam os principais mercados Over/Under, quais fatores influenciam o total de gols em uma partida, e como o FutAnalysis usa modelos estatísticos para calcular as probabilidades com precisão.</P>

        <H2>O que são mercados Over/Under?</H2>
        <P>Em apostas esportivas, Over/Under (também chamado de "mais/menos" ou "total de gols") é um mercado onde você aposta se o total de gols de uma partida será acima (Over) ou abaixo (Under) de uma linha definida pela casa de apostas.</P>

        <P>Por exemplo, no mercado <Strong>Over/Under 2.5</Strong>, você pode apostar que a partida terá 3 ou mais gols (Over 2.5) ou 2 ou menos gols (Under 2.5). O ".5" elimina a possibilidade de empate na aposta — ou você ganha ou perde.</P>

        <P>Os mercados mais comuns no futebol são:</P>

        <Box>
          <div>• <Strong>Over/Under 1.5</Strong> — 2+ gols (Over) ou 1 ou menos (Under)</div>
          <div>• <Strong>Over/Under 2.5</Strong> — 3+ gols (Over) ou 2 ou menos (Under)</div>
          <div>• <Strong>Over/Under 3.5</Strong> — 4+ gols (Over) ou 3 ou menos (Under)</div>
          <div>• <Strong>Over/Under 4.5</Strong> — 5+ gols (Over) ou 4 ou menos (Under)</div>
        </Box>

        <H2>Por que Over/Under é popular entre apostadores?</H2>
        <P>Existem várias razões pelas quais os mercados Over/Under atraem tanto apostadores iniciantes quanto experientes:</P>

        <H3>Independência do resultado</H3>
        <P>Você não precisa saber quem vai ganhar — apenas quantos gols serão marcados. Isso simplifica a análise e permite focar em variáveis específicas como força ofensiva, fragilidade defensiva e estilo de jogo dos times envolvidos.</P>

        <H3>Alta frequência de dados</H3>
        <P>Com centenas de partidas por semana em ligas ao redor do mundo, há muitos dados históricos disponíveis para análise estatística. Isso torna o Over/Under mais previsível do que mercados como resultado exato ou primeiro a marcar.</P>

        <H3>Odds competitivas</H3>
        <P>Em jogos equilibrados, as odds de Over e Under 2.5 tendem a ficar próximas de 1.90/1.90, o que significa que a casa de apostas espera 50% de probabilidade para cada lado. Com uma análise precisa, é possível encontrar value quando as odds subestimam ou superestimam o potencial ofensivo de um jogo.</P>

        <H2>Fatores que influenciam o total de gols</H2>
        <P>Para apostar bem em Over/Under, é fundamental entender quais fatores determinam quantos gols serão marcados em uma partida:</P>

        <H3>Força ofensiva e defensiva dos times</H3>
        <P>O fator mais óbvio. Times com ataque forte e defesa fraca tendem a participar de jogos com muitos gols. Inversamente, times com defesa sólida e ataque limitado geralmente produzem partidas de poucos gols. O ideal para Over é quando os dois times têm ataque forte; para Under, quando ambos têm defesa forte.</P>

        <H3>Histórico de confrontos diretos</H3>
        <P>Alguns pares de times têm padrões consistentes de muitos ou poucos gols quando se enfrentam. Rivalidades intensas podem resultar em jogos mais truncados do que as médias individuais sugerem, enquanto outros confrontos têm histórico de partidas abertas independentemente das forças do momento.</P>

        <H3>Importância da partida</H3>
        <P>Finais de campeonato, jogos decisivos pelo título ou contra rebaixamento tendem a ser mais fechados. Times jogando por um empate (para se classificar, por exemplo) podem adotar postura defensiva que reduz o total de gols esperado. Isso é especialmente relevante em competições eliminatórias como Copa do Brasil ou Libertadores.</P>

        <H3>Condição de campo e clima</H3>
        <P>Gramado pesado após chuva intensa prejudica o jogo ofensivo e tende a reduzir o ritmo, favorecendo o Under. Temperatura muito alta também pode reduzir a intensidade física, especialmente no segundo tempo. Esses fatores são difíceis de modelar, mas importantes para considerar.</P>

        <H3>Vantagem de jogar em casa</H3>
        <P>Times mandantes marcam mais em média do que quando jogam fora. Em confrontos onde o mandante tem ataque forte contra visitante com defesa fraca, o Over 2.5 se torna estatisticamente mais provável.</P>

        <H3>Momento da temporada</H3>
        <P>No início da temporada, com menos jogos e mais incerteza, é comum encontrar resultados mais voláteis. No final da temporada, times que já garantiram seu objetivo podem poupar jogadores, afetando o desempenho ofensivo.</P>

        <H2>Over 1.5: o mercado de baixo risco</H2>
        <P>O Over 1.5 é o mercado mais simples: basta que pelo menos 2 gols sejam marcados na partida. Em ligas europeias de alto nível, isso acontece em cerca de 75-80% dos jogos. Por isso, as odds costumam ser baixas (em torno de 1.25-1.40).</P>

        <P>Apesar das odds baixas, o Over 1.5 tem seu valor em jogos onde ambos os times têm ataque forte e defesa vulnerável. O FutAnalysis só exibe Over 1.5 quando a probabilidade calculada supera 58%, o que ajuda a filtrar os casos com melhor value relativo.</P>

        <P>O risco principal do Over 1.5 é um jogo ser completamente dominado por uma defesa eficiente ou por uma estratégia ultradefensiva. Isso é raro em jogos entre times de alto nível, mas mais comum em confrontos onde um time tem muito a perder com uma derrota.</P>

        <H2>Over 2.5: o mercado mais equilibrado</H2>
        <P>O Over 2.5 é o coração dos mercados de gols. Ocorre em aproximadamente 50-55% dos jogos nas principais ligas europeias, tornando as odds mais atraentes (geralmente entre 1.70 e 2.10).</P>

        <P>Para o Over 2.5, os principais indicadores são:</P>

        <Box>
          <div>• Ambos os times marcam em média 1.3+ gols por jogo</div>
          <div>• Um dos times tem defesa que concede 1.5+ gols por jogo</div>
          <div>• Partida sem grande importância defensiva para nenhum dos lados</div>
          <div>• Histórico de confrontos diretos com média acima de 2.5 gols</div>
        </Box>

        <H2>Under 2.5: quando a defesa manda</H2>
        <P>O Under 2.5 é para quando você acredita que o jogo será truncado, com no máximo 2 gols. É especialmente útil em confrontos entre times de defesa forte, partidas decisivas onde o empate serve para ambos, ou quando um time forte enfrenta um adversário muito inferior que joga para não tomar gol.</P>

        <P>Uma armadilha comum é apostar Under 2.5 em clássicos e derbies — frequentemente essas partidas têm jogos truncados no primeiro tempo mas explodem no segundo, quando o time perdedor precisa buscar o resultado.</P>

        <H2>Como o FutAnalysis calcula as probabilidades</H2>
        <P>Usamos o modelo Dixon-Coles com distribuição de Poisson para calcular a probabilidade de cada placar possível (0x0, 0x1, 1x0, 1x1, etc.). A partir disso, a probabilidade de Over/Under é calculada somando as probabilidades de todos os placares que atendem à condição.</P>

        <P>Por exemplo, para Over 2.5, somamos as probabilidades de todos os placares com 3 ou mais gols no total: 2x1, 1x2, 3x0, 0x3, 2x2, 3x1, 1x3, e assim por diante até os placares muito improváveis.</P>

        <P>Os thresholds que aplicamos para exibir como oportunidade são:</P>

        <Box>
          <div>• Over 1.5: probabilidade mínima de 58%</div>
          <div>• Over 2.5: probabilidade mínima de 60%</div>
          <div>• Under 2.5: probabilidade mínima de 60%</div>
        </Box>

        <P>Esses valores foram calibrados com base em nossa análise histórica de acertos, buscando equilibrar volume de oportunidades com taxa de precisão.</P>

        <H2>Estratégias práticas para Over/Under</H2>
        <H3>Analisar a liga antes do time</H3>
        <P>Diferentes ligas têm perfis de gols muito distintos. A Bundesliga alemã e a Premier League inglesa tendem a ter mais gols por jogo do que a Serie A italiana ou a Ligue 1 francesa. Começar a análise pelo perfil da liga ajuda a calibrar as expectativas.</P>

        <H3>Combinar com o contexto tático</H3>
        <P>Um time que acabou de trocar de treinador pode ter mudado radicalmente seu estilo de jogo. Um sistema mais defensivo pode não estar refletido ainda nas estatísticas históricas. Fique atento a essas mudanças.</P>

        <H3>Acompanhar ao vivo</H3>
        <P>No mercado ao vivo, as odds de Over/Under se ajustam dinamicamente conforme os gols são marcados. Um jogo que está 0x0 no intervalo mas com muitas chances criadas (alto xG) pode oferecer boa oportunidade para Over 1.5 ao vivo, antes que o primeiro gol reduza as odds.</P>

        <div style={{ marginTop: "2rem", padding: "1rem", background: T.surface, borderRadius: "8px", border: `1px solid ${T.border}` }}>
          <P>Acesse nossas <Link href="/opportunities/football" style={{ color: T.yellow, textDecoration: "none" }}>oportunidades de futebol</Link> para ver os mercados Over/Under com probabilidades calculadas para os jogos de hoje. Entenda também como o <Link href="/blog/como-funciona-modelo-dixon-coles" style={{ color: T.yellow, textDecoration: "none" }}>modelo Dixon-Coles</Link> gera essas probabilidades.</P>
        </div>

        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← Ver todos os artigos</Link>
        </div>
      </div>
    </>
  );
}

