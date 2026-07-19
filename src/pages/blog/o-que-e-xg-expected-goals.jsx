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

export default function PostXG() {
  return (
    <>
      <Head>
        <title>O que é xG (Expected Goals) e como interpretar — FutAnalysis</title>
        <meta name="description" content="Aprenda o que é xG (gols esperados), como é calculado, como interpretar os valores e como usar essa métrica para analisar partidas de futebol." />
        <link rel="canonical" href="https://futanalysis.com.br/blog/o-que-e-xg-expected-goals" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "750px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← blog</Link>
          <span style={{ fontSize: "0.65rem", color: T.green, background: T.green + "18", border: `1px solid ${T.green}33`, borderRadius: "20px", padding: "2px 8px" }}>Métricas</span>
        </div>

        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: T.text, marginBottom: "0.5rem", lineHeight: 1.4 }}>
          O que é xG (Expected Goals) e como interpretar
        </h1>
        <p style={{ fontSize: "0.72rem", color: T.textDim, marginBottom: "2rem" }}>18 de maio de 2026 · 11 min de leitura</p>

        <P>Se você acompanha análises de futebol, já deve ter se deparado com o termo xG ou "gols esperados". Essa métrica revolucionou a forma como analistas, treinadores e apostadores avaliam partidas de futebol — indo muito além do simples placar final. Neste guia completo, explicamos o que é xG, como ele é calculado, como interpretar os valores e por que essa métrica se tornou tão importante na análise moderna do esporte.</P>

        <H2>O que significa xG?</H2>
        <P>xG é a abreviação de "Expected Goals" (gols esperados em inglês). É uma métrica que mede a <Strong>qualidade das chances de gol criadas</Strong> em uma partida, atribuindo a cada finalização uma probabilidade de resultar em gol com base em características históricas de chutes similares.</P>

        <P>Em outras palavras, se um atacante chuta de dentro da pequena área, com o goleiro fora do posicionamento, esse chute tem um xG alto — digamos 0.85, significando que chutes nessa posição resultam em gol 85% das vezes historicamente. Já um chute de fora da área, de ângulo fechado, pode ter xG de apenas 0.03.</P>

        <P>O xG total de um time em uma partida é a soma dos xG de todas as suas finalizações. Se um time acumulou 2.3 xG, isso significa que, com aquelas chances criadas, seria esperado que marcasse em torno de 2.3 gols em média.</P>

        <H2>Como o xG é calculado?</H2>
        <P>O cálculo do xG usa modelos de machine learning treinados em bancos de dados com centenas de milhares de finalizações históricas. Para cada chute, o modelo considera diversas variáveis:</P>

        <Box>
          <div>• <Strong>Distância ao gol:</Strong> chutes mais próximos têm xG mais alto</div>
          <div>• <Strong>Ângulo do chute:</Strong> chutes centrais têm mais chance que os laterais</div>
          <div>• <Strong>Parte do corpo:</Strong> cabeceios têm xG menor que chutes com o pé</div>
          <div>• <Strong>Assistência recebida:</Strong> cruzamentos vs passes em profundidade</div>
          <div>• <Strong>Situação do jogo:</Strong> bola rolando vs parada (escanteio, falta)</div>
          <div>• <Strong>Pressão do defensor:</Strong> chute pressionado vs livre</div>
          <div>• <Strong>Fase do jogo:</Strong> contra-ataque vs jogo elaborado</div>
        </Box>

        <P>Diferentes provedores de dados (Opta, StatsBomb, Understat) usam modelos ligeiramente diferentes, por isso você pode ver variações nos valores de xG dependendo da fonte. Mas todos seguem o mesmo princípio básico: comparar cada finalização com o histórico de chutes em condições similares.</P>

        <H2>Como interpretar os valores de xG</H2>
        <H3>xG por finalização</H3>
        <P>Um xG individual vai de 0 (praticamente impossível marcar) a 1 (quase certeza de gol). Na prática, a maioria das finalizações tem xG entre 0.03 e 0.30, com apenas as grandes chances — geralmente em situações de um contra um ou cabeceios de longas distâncias — chegando a valores acima de 0.50.</P>

        <Box>
          <div>• xG {'<'} 0.05 — chance de baixa qualidade (chute de fora da área, ângulo fechado)</div>
          <div>• xG 0.05 a 0.15 — chance média (dentro da área, mas sem posição ideal)</div>
          <div>• xG 0.15 a 0.35 — boa chance (posição favorável dentro da área)</div>
          <div>• xG 0.35 a 0.60 — grande chance (mano a mano, área pequena)</div>
          <div>• xG {'>'} 0.60 — chance claríssima (praticamente impossível não marcar)</div>
        </Box>

        <H3>xG total da partida</H3>
        <P>O xG total acumulado ao longo de uma partida indica o desempenho geral de cada time em termos de criação de oportunidades. Comparar o xG com o placar real é muito revelador:</P>

        <P><Strong>Time venceu com xG inferior:</Strong> venceu "acima do esperado", possivelmente por eficiência do atacante ou ineficiência do adversário. Tende a ser menos consistente a longo prazo.</P>

        <P><Strong>Time perdeu com xG superior:</Strong> perdeu "abaixo do esperado", criou chances mas não as aproveitou. Indica que o resultado pode não refletir o desempenho real.</P>

        <P><Strong>xG muito baixo para ambos:</Strong> partida com poucas chances criadas, resultado pode ter sido mais influenciado por erros do que por qualidade coletiva.</P>

        <H2>xG ao vivo: como o FutAnalysis usa durante as partidas</H2>
        <P>No mercado ao vivo, o xG acumulado durante a partida é uma das variáveis que alimentam nosso índice de perigo. Um time que criou 1.2 xG no primeiro tempo mas ainda está perdendo por 0x1 está em situação diferente de um time que criou apenas 0.3 xG e também está perdendo.</P>

        <P>O conceito de "xG represado" é especialmente útil: se um time criou muitas chances de qualidade sem converter, a pressão tende a continuar e as chances de empate ou virada aumentam. Isso alimenta diretamente os alertas do nosso bot de Telegram, que notifica quando times estão em situação de alta pressão.</P>

        <H2>xG vs Gols reais: entendendo a variância</H2>
        <P>Uma das confusões mais comuns é esperar que o xG preveja o placar exato. Ele não faz isso — e não é esse o objetivo. O xG mede o valor esperado em termos de probabilidade, mas futebol tem altíssima variância.</P>

        <P>Imagine que um time cria uma chance com xG de 0.30 (30% de chance de gol). Se o atacante marcar, isso não significa que o modelo "errou" — ele estava dizendo que havia 30% de probabilidade. Se o atacante errar, também não significa erro — havia 70% de chance disso acontecer.</P>

        <P>Em uma amostra pequena (uma partida), qualquer coisa pode acontecer. Em uma amostra grande (uma temporada inteira, 38+ rodadas), os gols marcados pelos times tendem a convergir para o xG acumulado. Times que marcam consistentemente muito acima do xG ao longo de uma temporada geralmente têm um atacante excepcional ou estão aproveitando uma sequência de sorte que tende a se normalizar.</P>

        <H2>Como usar xG para análise de apostas</H2>
        <P>O xG é uma ferramenta poderosa para identificar value em apostas, especialmente quando combinado com outros indicadores. Veja algumas aplicações práticas:</P>

        <H3>Identificar times "sortudos" ou "azarados"</H3>
        <P>Se um time está em boa fase no campeonato mas com xG consistentemente abaixo do placar (marcando mais do que o esperado), pode estar em período de "sorte" que tende a se reverter. O oposto — time com resultados ruins mas xG positivo — pode ser oportunidade para apostar na recuperação.</P>

        <H3>Avaliar goleiros e atacantes</H3>
        <P>xGOT (Expected Goals on Target) e post-shot xG permitem comparar a performance de goleiros e atacantes em relação à média. Um goleiro que concede menos gols do que o xG contra sugere que está performando acima da média, enquanto um atacante com gols muito acima do xG pode estar em sequência que não se sustenta.</P>

        <H3>Combinação com o modelo Dixon-Coles</H3>
        <P>No FutAnalysis, usamos o xG ao vivo como complemento ao Dixon-Coles, que usa dados históricos. O Dixon-Coles é mais estável para previsões pré-jogo, enquanto o xG ao vivo é mais responsivo às dinâmicas da partida em andamento. Juntos, eles formam uma visão mais completa.</P>

        <H2>Limitações do xG</H2>
        <P>Como toda métrica, o xG tem suas limitações importantes:</P>

        <P><Strong>Não captura qualidade individual:</Strong> Um chute de Messi ou Cristiano Ronaldo tem xG calculado igual ao de qualquer outro jogador na mesma posição, mas na prática eles convertem em taxas muito superiores à média. Jogadores de elite criam "xG extra" por habilidade individual que o modelo não consegue capturar.</P>

        <P><Strong>Dependente da fonte de dados:</Strong> Como mencionado, diferentes provedores geram valores diferentes. Comparar xG de fontes distintas pode ser enganoso.</P>

        <P><Strong>Não considera sequências de jogo:</Strong> Um gol marcado após 15 passes e triangulações pode ter o mesmo xG de um gol em contra-ataque de 3 toques, mas as situações são muito diferentes em termos de padrão de jogo.</P>

        <P><Strong>Amostra pequena:</Strong> Em uma partida, o xG tem grande margem de erro. Só em amostras de muitos jogos o indicador se torna estatisticamente robusto.</P>

        <H2>xG em outras modalidades</H2>
        <P>O conceito de "gols esperados" se expandiu para outras modalidades. No hóquei no gelo, usa-se o xG de forma similar. No basquete, métricas análogas avaliam a qualidade dos arremessos. No futebol americano, o Expected Points Added (EPA) segue o mesmo raciocínio probabilístico.</P>

        <P>No baseball, que também analisamos no FutAnalysis, métricas similares como Expected Runs e Exit Velocity combinadas com Launch Angle servem para avaliar a qualidade das rebatidas de forma análoga ao xG no futebol.</P>

        <div style={{ marginTop: "2rem", padding: "1rem", background: T.surface, borderRadius: "8px", border: `1px solid ${T.border}` }}>
          <P>Agora que você entende o xG, confira como ele se integra ao nosso <Link href="/blog/como-funciona-modelo-dixon-coles" style={{ color: T.yellow, textDecoration: "none" }}>modelo Dixon-Coles</Link> para gerar as oportunidades. Acesse também nossas <Link href="/opportunities/live" style={{ color: T.yellow, textDecoration: "none" }}>oportunidades ao vivo</Link> onde o xG é atualizado em tempo real durante as partidas.</P>
        </div>

        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← Ver todos os artigos</Link>
        </div>
      </div>
    </>
  );
}

