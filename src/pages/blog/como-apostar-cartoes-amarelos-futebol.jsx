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

export default function PostCartoes() {
  return (
    <>
      <Head>
        <title>Como apostar em cartões amarelos no futebol — FutAnalysis</title>
        <meta name="description" content="Guia completo sobre apostas em cartões amarelos no futebol: mercados Over/Under 3.5 e 4.5, fatores que influenciam e como o FutAnalysis calcula as probabilidades." />
        <link rel="canonical" href="https://futanalysis.com.br/blog/como-apostar-cartoes-amarelos-futebol" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "750px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← blog</Link>
          <span style={{ fontSize: "0.65rem", color: T.yellow, background: T.yellow + "18", border: `1px solid ${T.yellow}33`, borderRadius: "20px", padding: "2px 8px" }}>Mercados</span>
        </div>

        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: T.text, marginBottom: "0.5rem", lineHeight: 1.4 }}>
          Como apostar em cartões amarelos no futebol
        </h1>
        <p style={{ fontSize: "0.72rem", color: T.textDim, marginBottom: "2rem" }}>10 de maio de 2026 · 10 min de leitura</p>

        <P>Os mercados de cartões amarelos são uma das categorias de apostas que mais cresceram nos últimos anos. Diferente dos mercados de gols, onde o resultado do jogo frequentemente interfere, os cartões têm uma dinâmica própria fortemente influenciada pelo estilo de jogo dos times, pelo árbitro escalado e pela importância da partida. Neste guia, explicamos tudo sobre como apostar em cartões com base em análise estatística.</P>

        <H2>O que são os mercados de cartões?</H2>
        <P>Nos mercados de cartões, você aposta no total de cartões amarelos (e às vezes vermelhos) exibidos em uma partida. Os mercados mais comuns são:</P>

        <Box>
          <div>• <Strong>Over/Under 3.5 cartões</Strong> — 4+ (Over) ou 3 ou menos (Under)</div>
          <div>• <Strong>Over/Under 4.5 cartões</Strong> — 5+ (Over) ou 4 ou menos (Under)</div>
          <div>• <Strong>Over/Under 5.5 cartões</Strong> — 6+ (Over) ou 5 ou menos (Under)</div>
          <div>• <Strong>Time com mais cartões</Strong> — qual time leva mais amarelos</div>
          <div>• <Strong>Cartão vermelho na partida</Strong> — sim ou não</div>
        </Box>

        <P>No FutAnalysis, cobrimos principalmente os mercados Over/Under 3.5 e Over/Under 4.5, que são os mais líquidos e com mais dados históricos disponíveis.</P>

        <H2>Por que cartões são previsíveis estatisticamente?</H2>
        <P>Ao contrário do que pode parecer, cartões têm padrões estatísticos bastante consistentes. Isso ocorre porque:</P>

        <H3>Times têm estilos de jogo consistentes</H3>
        <P>Times que jogam de forma agressiva, com muitos duelos e pressão alta, naturalmente acumulam mais cartões ao longo da temporada. Times com estilo mais técnico e de posse de bola tendem a cometer menos faltas e receber menos amarelos. Esses padrões se mantêm razoavelmente estáveis ao longo de uma temporada.</P>

        <H3>Árbitros têm perfis distintos</H3>
        <P>Este é um dos fatores mais importantes e frequentemente ignorados. Árbitros têm perfis muito diferentes — alguns são conhecidos por aplicar cartões com facilidade (árbitros "amarelistas"), enquanto outros deixam o jogo rolar mais. Em ligas onde os dados de arbitragem são disponíveis, isso pode ser um diferencial enorme na análise.</P>

        <H3>Rivalidades e confrontos específicos</H3>
        <P>Clássicos e rivalidades históricas tendem a produzir mais cartões, independentemente do momento de cada time. A intensidade emocional do confronto eleva o número de faltas e consequentemente de amarelos.</P>

        <H2>Fatores que aumentam o número de cartões</H2>

        <H3>Jogo disputado e equilibrado</H3>
        <P>Partidas equilibradas, onde nenhum time tem clara vantagem técnica, tendem a ter mais duelos físicos e consequentemente mais cartões. Quando os times são de nível muito diferente, o time inferior frequentemente cede o campo ao superior e comete mais faltas por desespero.</P>

        <H3>Time visitante em desvantagem</H3>
        <P>Times visitantes, especialmente quando estão perdendo, tendem a ser mais agressivos e acumular mais cartões no final das partidas. O desespero por um gol de empate leva a mais faltas táticas e contestações de decisões arbitrais.</P>

        <H3>Partidas decisivas</H3>
        <P>Jogos de mata-mata, finais ou rodadas decisivas de campeonato têm naturalmente maior tensão, o que se traduz em mais faltas e mais cartões. O estresse competitivo eleva a agressividade e a discussão com árbitros.</P>

        <H3>Ligas com arbitragem mais permissiva no início</H3>
        <P>Algumas ligas têm árbitros que deixam o jogo ser mais "quente" nas primeiras rodadas da temporada, aumentando o número de cartões. Com o tempo, os times se adaptam aos critérios dos árbitros e o número pode diminuir.</P>

        <H2>Fatores que reduzem o número de cartões</H2>

        <H3>Time muito superior ao adversário</H3>
        <P>Quando um time dominante enfrenta um adversário bem inferior, o jogo pode se resolver cedo, reduzindo a tensão e consequentemente os cartões. Além disso, times superiores frequentemente optam por controlar o jogo com posse de bola, evitando situações de disputa física.</P>

        <H3>Clima quente extremo</H3>
        <P>Partidas com temperatura muito alta tendem a ser mais lentas, com menos duelos físicos e consequentemente menos cartões. Isso é especialmente relevante em competições de verão ou em países com clima tropical.</P>

        <H3>Árbitro permissivo</H3>
        <P>Como mencionado, árbitros que deixam o jogo rolar e não aplicam cartões por faltas menores podem reduzir significativamente o total de amarelos, mesmo em jogos intensos.</P>

        <H2>Diferenças entre ligas</H2>
        <P>As ligas têm perfis de cartões muito diferentes:</P>

        <Box>
          <div>• <Strong>La Liga (Espanha)</Strong>: média de 4.5-5.0 cartões por jogo — uma das mais amarelas</div>
          <div>• <Strong>Serie A (Itália)</Strong>: 4.0-4.5 cartões — intensa fisicamente</div>
          <div>• <Strong>Brasileirão</Strong>: 4.0-4.8 cartões — ligas sul-americanas tendem a ser mais intensas</div>
          <div>• <Strong>Premier League</Strong>: 3.2-3.8 cartões — árbitros ingleses são mais permissivos</div>
          <div>• <Strong>Bundesliga</Strong>: 3.0-3.5 cartões — uma das ligas com menos cartões</div>
          <div>• <Strong>Ligue 1</Strong>: 3.5-4.0 cartões</div>
        </Box>

        <P>Essas diferenças são fundamentais para definir os thresholds corretos. Um Over 4.5 que seria comum na La Liga pode ser raro na Bundesliga. O FutAnalysis considera o perfil específico de cada liga no cálculo das probabilidades.</P>

        <H2>Como o FutAnalysis calcula probabilidades de cartões</H2>
        <P>Usamos a distribuição de Poisson para modelar o total de cartões, de forma análoga ao modelo de gols. Para cada time, calculamos:</P>

        <Box>
          <div>• Média de cartões amarelos por jogo (como mandante e como visitante)</div>
          <div>• Média de cartões que o adversário recebe contra este time</div>
          <div>• Média da liga como referência (league average)</div>
          <div>• Lambda do confronto = (ataque_cartoes_A × defesa_cartoes_B × media_liga)</div>
        </Box>

        <P>O "ataque de cartões" de um time não é exatamente sobre atacar, mas sobre o estilo de jogo que gera cartões — tanto os que o time recebe quanto os que provoca no adversário. Times que jogam de forma muito física provocam reações nos adversários e "geram" cartões dos dois lados.</P>

        <P>Nosso threshold para exibir oportunidades de cartões é de 68% de probabilidade mínima, mais alto do que para gols (58-60%), porque o mercado de cartões tem mais variância e é mais difícil de prever com precisão.</P>

        <H2>Cartões vermelhos: o curinga do jogo</H2>
        <P>Cartões vermelhos são eventos com muito mais variância do que amarelos. Mesmo times muito disciplinados podem receber vermelho por entrada intempestiva ou disputa de bola mal-feita. Por isso, o FutAnalysis não modela cartões vermelhos diretamente — apenas os incorpora como contexto qualitativo.</P>

        <P>Em jogos ao vivo, um cartão vermelho é um evento que redefine completamente a análise. O time em inferioridade numérica passa a defender em bloco, o que frequentemente reduz o total de cartões subsequentes (menos duelos físicos) mas pode aumentar as faltas táticas.</P>

        <H2>Estratégias práticas para apostas em cartões</H2>

        <H3>Pesquise o árbitro escalado</H3>
        <P>Este é provavelmente o passo mais importante e mais ignorado. Antes de apostar em cartões, verifique a média de cartões por jogo do árbitro escalado para aquela partida. A diferença entre árbitros pode ser de 2-3 cartões por jogo — enorme para um mercado Over/Under 3.5 ou 4.5.</P>

        <H3>Combine com o contexto da partida</H3>
        <P>Clássicos regionais, jogos de mata-mata e partidas com times em situação desesperada (zona de rebaixamento ou lutando pelo título) naturalmente têm mais tensão e mais cartões. Use o contexto para calibrar as probabilidades estatísticas.</P>

        <H3>Acompanhe a forma disciplinar recente</H3>
        <P>Um time que acumulou muitos cartões nas últimas rodadas pode estar em fase de "vigilância" arbitral, com árbitros mais atentos às suas faltas. Inversamente, times que jogaram partidas tranquilas recentemente podem estar em momento de menor pressão disciplinar.</P>

        <div style={{ marginTop: "2rem", padding: "1rem", background: T.surface, borderRadius: "8px", border: `1px solid ${T.border}` }}>
          <P>Acesse nossas <Link href="/opportunities/cards" style={{ color: T.yellow, textDecoration: "none" }}>oportunidades de cartões</Link> para ver os mercados Over/Under calculados para os jogos de hoje. Entenda também como nosso modelo funciona no artigo sobre o <Link href="/blog/como-funciona-modelo-dixon-coles" style={{ color: T.yellow, textDecoration: "none" }}>modelo Dixon-Coles</Link>.</P>
        </div>

        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← Ver todos os artigos</Link>
        </div>
      </div>
    </>
  );
}

