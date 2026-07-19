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

export default function PostEscanteios() {
  return (
    <>
      <Head>
        <title>Guia completo de apostas em escanteios no futebol — FutAnalysis</title>
        <meta name="description" content="Aprenda a apostar em escanteios no futebol: mercados Over/Under 8.5 e 10.5, fatores que influenciam o número de escanteios e como usar análise estatística." />
        <link rel="canonical" href="https://futanalysis.com.br/blog/guia-apostas-escanteios-futebol" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "750px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← blog</Link>
          <span style={{ fontSize: "0.65rem", color: T.green, background: T.green + "18", border: `1px solid ${T.green}33`, borderRadius: "20px", padding: "2px 8px" }}>Mercados</span>
        </div>

        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: T.text, marginBottom: "0.5rem", lineHeight: 1.4 }}>
          Guia completo de apostas em escanteios no futebol
        </h1>
        <p style={{ fontSize: "0.72rem", color: T.textDim, marginBottom: "2rem" }}>8 de maio de 2026 · 10 min de leitura</p>

        <P>Os mercados de escanteios são uma das apostas mais subestimadas no futebol. Enquanto a maioria dos apostadores foca em gols e resultados, os escanteios oferecem padrões estatísticos consistentes que tornam possível uma análise quantitativa precisa. Neste guia, explicamos como funcionam os mercados de escanteios, quais fatores influenciam o total de escanteios em uma partida e como o FutAnalysis modela essas probabilidades.</P>

        <H2>O que são os mercados de escanteios?</H2>
        <P>Nos mercados de escanteios, você aposta no total de escanteios cobrados na partida (soma dos escanteios dos dois times). Os mercados mais comuns são:</P>

        <Box>
          <div>• <Strong>Over/Under 8.5 escanteios</Strong> — 9+ (Over) ou 8 ou menos (Under)</div>
          <div>• <Strong>Over/Under 9.5 escanteios</Strong> — 10+ (Over) ou 9 ou menos (Under)</div>
          <div>• <Strong>Over/Under 10.5 escanteios</Strong> — 11+ (Over) ou 10 ou menos (Under)</div>
          <div>• <Strong>Escanteios no 1º tempo</Strong> — mercados específicos para o primeiro tempo</div>
          <div>• <Strong>Time com mais escanteios</Strong> — qual time cobra mais escanteios</div>
        </Box>

        <P>No FutAnalysis, cobrimos principalmente Over/Under 8.5 e Over/Under 10.5, que são as linhas com mais liquidez e dados históricos nas ligas que monitoramos.</P>

        <H2>Por que escanteios são previsíveis?</H2>
        <P>Escanteios têm uma característica interessante: eles são um subproduto do estilo de jogo e da qualidade técnica dos times, mas com menor variância do que os gols. Isso porque escanteios ocorrem em frequência muito maior (média de 9-11 por jogo) do que gols (média de 2-3 por jogo), o que reduz a influência do acaso em qualquer partida individual.</P>

        <P>Times que jogam pelo ataque, com cruzamentos frequentes, tendem a gerar mais escanteios — tanto para si (quando o adversário manda para escanteio) quanto para o adversário (quando pressionados recuam e cedem escanteios). Times que jogam na retranca, tentando contra-ataques, geralmente produzem menos escanteios.</P>

        <H2>Fatores que aumentam o total de escanteios</H2>

        <H3>Times que jogam pelo ataque</H3>
        <P>Este é o fator mais direto. Times com estilo ofensivo, que cruzam muito da lateral, criam situações de escanteio tanto quando suas finalizações são defendidas para fora da linha de fundo quanto quando o adversário, pressionado, manda para escanteio para aliviar.</P>

        <H3>Times que jogam com posse de bola no campo adversário</H3>
        <P>Times que dominam territórios, mantendo a bola no campo adversário por longos períodos, naturalmente geram mais situações que levam a escanteios. A defesa adversária, sob pressão constante, frequentemente prefere mandar para escanteio a arriscar um gol em uma saída errada.</P>

        <H3>Partidas onde um time precisa virar o placar</H3>
        <P>Quando um time está perdendo e precisa buscar o empate ou a virada, frequentemente aumenta o número de cruzamentos e bolas alçadas na área, o que gera mais escanteios. Jogos com mais de uma virada de placar tendem a ter número elevado de escanteios.</P>

        <H3>Confrontos entre times de nível similar</H3>
        <P>Quando os dois times têm qualidade parecida, as defesas têm maior dificuldade em interceptar os ataques adversários, optando mais vezes pelo escanteio como saída segura.</P>

        <H2>Fatores que reduzem o total de escanteios</H2>

        <H3>Times muito inferiores que jogam na retranca</H3>
        <P>Quando um time muito inferior enfrenta um time forte, frequentemente adota postura ultradefensiva, com blocos baixos e saídas em contra-ataque. Nessas situações, o time superior pode ter dificuldade para criar escanteios porque o adversário não se aventura no ataque e cede poucos escanteios.</P>

        <H3>Partida com resultado definido cedo</H3>
        <P>Se um time abre 3x0 no primeiro tempo, o ritmo cai significativamente no segundo tempo, com o time vencedor administrando o resultado e o perdedor perdendo a crença na virada. Isso reduz a intensidade e consequentemente o número de escanteios.</P>

        <H3>Campo pesado ou clima adverso</H3>
        <P>Gramado molhado após chuva intensa tende a reduzir o ritmo do jogo e diminuir a precisão dos passes, levando a mais perdas de bola no meio-campo e menos chegadas à área adversária — que é onde os escanteios são gerados.</P>

        <H2>Escanteios por liga: diferenças significativas</H2>
        <P>Assim como nos gols e cartões, as ligas têm perfis de escanteios muito distintos:</P>

        <Box>
          <div>• <Strong>Premier League (Inglaterra)</Strong>: média de 10-11 escanteios por jogo — uma das maiores</div>
          <div>• <Strong>Bundesliga (Alemanha)</Strong>: 9-10 escanteios</div>
          <div>• <Strong>La Liga (Espanha)</Strong>: 9-10 escanteios</div>
          <div>• <Strong>Serie A (Itália)</Strong>: 9-10 escanteios</div>
          <div>• <Strong>Brasileirão</Strong>: 8-9 escanteios — ligas sul-americanas tendem a ter menos</div>
          <div>• <Strong>Ligas escandinavas</Strong>: 8-9 escanteios</div>
        </Box>

        <P>A Premier League tem média mais alta principalmente pelo estilo de jogo direto e físico das equipes inglesas, com muitos cruzamentos e bolas aéreas. Ligas sul-americanas, com mais foco no jogo técnico pelo chão, tendem a ter menos escanteios.</P>

        <H2>Como o FutAnalysis modela escanteios</H2>
        <P>Usamos a distribuição de Poisson para modelar o total de escanteios, da mesma forma que usamos para gols. Para cada time, calculamos:</P>

        <Box>
          <div>• Média de escanteios a favor por jogo (como mandante e visitante)</div>
          <div>• Média de escanteios que o adversário cobra contra este time</div>
          <div>• Média da liga como referência</div>
          <div>• Lambda do confronto combinando as médias de ambos os times</div>
        </Box>

        <P>O modelo considera separadamente os escanteios em casa e fora, já que muitos times têm padrões muito diferentes. Um time que pressiona muito em casa pode ter média de 6-7 escanteios como mandante, mas apenas 3-4 como visitante, quando adota postura mais defensiva.</P>

        <H2>Escanteios no primeiro tempo</H2>
        <P>O mercado de escanteios no primeiro tempo é especialmente interessante porque o primeiro tempo tende a ser mais intenso e aberto do que o segundo em muitos jogos. Times geralmente começam as partidas com mais energia e disposição ofensiva, gerando mais ações de ataque e consequentemente mais escanteios.</P>

        <P>A linha mais comum para escanteios no primeiro tempo é Over/Under 4.5, mas isso varia muito entre ligas. Na Premier League, onde o ritmo é alto desde o início, Over 4.5 no primeiro tempo é relativamente frequente. Em ligas mais lentas para começar, Under 4.5 no primeiro tempo pode ser a escolha mais sólida.</P>

        <H2>Combinando escanteios com outros mercados</H2>
        <P>Os escanteios podem ser combinados com outros mercados para criar análises mais completas:</P>

        <H3>Escanteios + resultado</H3>
        <P>Se você espera que um time domine territorialmente mas tem dúvida sobre o placar, apostar no time com mais escanteios pode ser uma forma de capitalizar sobre o domínio esperado sem precisar prever o resultado exato.</P>

        <H3>Escanteios + Over gols</H3>
        <P>Jogos com muitos escanteios frequentemente também têm mais gols, já que ambos são consequência de um jogo aberto e ofensivo. Essa correlação não é perfeita, mas pode reforçar a confiança em ambos os mercados quando os fatores apontam na mesma direção.</P>

        <H2>Dicas práticas para apostar em escanteios</H2>

        <H3>Analise os últimos 5-10 jogos de cada time</H3>
        <P>A forma recente é muito importante nos escanteios. Um time que mudou de sistema tático recentemente pode ter alterado seu padrão de escanteios de forma que as médias de longo prazo não refletem mais a realidade atual.</P>

        <H3>Verifique o estilo de jogo dos dois times</H3>
        <P>Times que jogam com muitos cruzamentos e jogadores rápidos pelas laterais tendem a gerar mais escanteios. Times que preferem o jogo pelo centro, com passes curtos no meio-campo, geram menos situações de escanteio.</P>

        <H3>Considere a importância do confronto</H3>
        <P>Partidas de alta importância para ambos os times tendem a ser mais abertas e físicas, com mais escanteios. Jogos onde um time já garantiu seu objetivo podem ter intensidade reduzida.</P>

        <div style={{ marginTop: "2rem", padding: "1rem", background: T.surface, borderRadius: "8px", border: `1px solid ${T.border}` }}>
          <P>Veja as oportunidades de escanteios calculadas para os jogos de hoje nas nossas <Link href="/opportunities/corners" style={{ color: T.yellow, textDecoration: "none" }}>oportunidades de escanteios</Link>. Para entender melhor nosso modelo, leia sobre o <Link href="/blog/como-funciona-modelo-dixon-coles" style={{ color: T.yellow, textDecoration: "none" }}>modelo Dixon-Coles</Link> e o <Link href="/blog/o-que-e-xg-expected-goals" style={{ color: T.yellow, textDecoration: "none" }}>xG (gols esperados)</Link>.</P>
        </div>

        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← Ver todos os artigos</Link>
        </div>
      </div>
    </>
  );
}

