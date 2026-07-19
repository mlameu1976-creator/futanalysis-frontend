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

export default function Post1() {
  return (
    <>
      <Head>
        <title>Como funciona o modelo Dixon-Coles no futebol — FutAnalysis</title>
        <meta name="description" content="Entenda como o modelo estatístico Dixon-Coles calcula probabilidades de gols e resultados em partidas de futebol, e como ele é aplicado no FutAnalysis." />
        <link rel="canonical" href="https://futanalysis.com.br/blog/como-funciona-modelo-dixon-coles" />
      </Head>
      <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.font, padding: "2rem", maxWidth: "750px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← blog</Link>
          <span style={{ fontSize: "0.65rem", color: T.yellow, background: T.yellow + "18", border: `1px solid ${T.yellow}33`, borderRadius: "20px", padding: "2px 8px" }}>Metodologia</span>
        </div>

        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: T.text, marginBottom: "0.5rem", lineHeight: 1.4 }}>
          Como funciona o modelo Dixon-Coles no futebol
        </h1>
        <p style={{ fontSize: "0.72rem", color: T.textDim, marginBottom: "2rem" }}>20 de maio de 2026 · 12 min de leitura</p>

        <P>O modelo Dixon-Coles é um dos pilares da análise estatística moderna no futebol. Desenvolvido pelos pesquisadores Mark Dixon e Stuart Coles em 1997 e publicado no Journal of the Royal Statistical Society, ele foi criado especificamente para modelar resultados de partidas de futebol de forma mais precisa do que os métodos anteriores. Desde sua publicação, tornou-se referência na indústria de apostas esportivas e em academias de análise quantitativa de esportes ao redor do mundo.</P>

        <P>Neste artigo, explicamos em detalhes como o modelo funciona, quais são suas vantagens em relação a abordagens mais simples, e como o FutAnalysis o aplica para gerar as probabilidades que você vê na plataforma. Se você quer entender a matemática por trás das nossas análises, este é o guia completo.</P>

        <H2>O problema que o modelo resolve</H2>
        <P>Antes do Dixon-Coles, a forma mais simples de prever resultados era usar a distribuição de Poisson independente para os gols do time da casa e do visitante. A distribuição de Poisson é uma ferramenta matemática que modela eventos que ocorrem com uma taxa média conhecida — por exemplo, se um time marca em média 1.5 gols por jogo, o Poisson nos diz a probabilidade de ele marcar 0, 1, 2, 3 ou mais gols em qualquer partida específica.</P>

        <P>No entanto, esse método ignorava uma realidade importante do futebol: <Strong>jogos com poucos gols ocorrem mais frequentemente do que o Poisson puro prevê.</Strong> Especificamente, resultados como 0x0 e 1x0 são mais comuns do que modelos simples sugerem. Dixon e Coles identificaram essa discrepância e criaram um fator de correção específico para placares baixos, tornando o modelo significativamente mais preciso.</P>

        <P>Para ilustrar o problema: suponha que os dois times de uma partida marquem em média 1.2 gols cada. O Poisson independente calcularia uma probabilidade de empate 0x0 de aproximadamente 9%. Mas na realidade, empates sem gols ocorrem com frequência de cerca de 11-12% em ligas como a Premier League. Essa diferença, embora pareça pequena, tem impacto enorme em apostas e análises de longo prazo.</P>

        <H2>A distribuição de Poisson: a base do modelo</H2>
        <P>Para entender o Dixon-Coles, precisamos primeiro entender a distribuição de Poisson. Se um time tem uma taxa esperada de λ (lambda) gols por jogo, a probabilidade de ele marcar exatamente k gols é dada por:</P>

        <Box>
          <div>P(X = k) = (e^(-λ) × λ^k) / k!</div>
          <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: T.textDim }}>Onde e ≈ 2.718 (número de Euler) e k! é o fatorial de k</div>
        </Box>

        <P>Por exemplo, se λ = 1.5, a probabilidade de marcar 0 gols é e^(-1.5) ≈ 22.3%, de marcar 1 gol é 33.5%, de marcar 2 gols é 25.1%, e assim por diante. O modelo básico calcula λ para cada time separadamente e multiplica as probabilidades para obter a probabilidade de cada placar.</P>

        <H2>Como o Dixon-Coles calcula os lambdas</H2>
        <P>O grande avanço do modelo Dixon-Coles está na forma como ele calcula os valores de lambda para cada time em cada partida. Em vez de simplesmente usar a média de gols marcados, o modelo considera quatro parâmetros por time:</P>

        <Box>
          <div>• <Strong>αi (alfa)</Strong> — força de ataque do time i</div>
          <div>• <Strong>βi (beta)</Strong> — força de defesa do time i</div>
          <div>• <Strong>γ (gama)</Strong> — vantagem de jogar em casa (home advantage)</div>
          <div>• <Strong>μ (mu)</Strong> — média de gols da liga</div>
        </Box>

        <P>Com esses parâmetros, os lambdas para uma partida entre o time da casa (h) e o visitante (a) são calculados como:</P>

        <Box>
          <div>• <Strong>λ_casa</Strong> = μ × αh × βa × γ</div>
          <div>• <Strong>λ_visitante</Strong> = μ × αa × βh</div>
        </Box>

        <P>Note que o fator γ (home advantage) só é aplicado ao time da casa. Os parâmetros α e β são estimados por máxima verossimilhança usando o histórico de jogos da liga, e são normalizados de forma que a média dos ataques seja 1.0.</P>

        <H2>O fator de correção para placares baixos</H2>
        <P>Este é o elemento mais inovador do modelo original. Dixon e Coles introduziram uma função de correção ρ (rho) que ajusta as probabilidades de placares muito baixos — especificamente 0x0, 1x0, 0x1 e 1x1. A correção é aplicada da seguinte forma:</P>

        <Box>
          <div>• Para 0x0: P corrigida = P_Poisson × (1 - λh × λa × ρ)</div>
          <div>• Para 1x0: P corrigida = P_Poisson × (1 + λa × ρ)</div>
          <div>• Para 0x1: P corrigida = P_Poisson × (1 + λh × ρ)</div>
          <div>• Para 1x1: P corrigida = P_Poisson × (1 - ρ)</div>
          <div>• Para outros placares: sem correção</div>
        </Box>

        <P>O valor de ρ é estimado junto com os demais parâmetros e tipicamente fica em torno de -0.13, indicando que os empates 0x0 são mais prováveis do que o Poisson puro sugere.</P>

        <H2>O fator mandante no FutAnalysis</H2>
        <P>Um dos diferenciais do modelo é considerar explicitamente a vantagem de jogar em casa. Historicamente, times mandantes marcam em média 15-25% mais gols do que quando jogam fora. O FutAnalysis calcula esse fator individualmente para cada liga, já que ele varia significativamente.</P>

        <P>Ligas sul-americanas como o Brasileirão e a Liga Argentina tendem a ter home advantage maior do que ligas escandinavas ou norte-europeias. Isso ocorre por fatores como altitude (no caso de times bolivianos ou equatorianos), intensidade da torcida e distâncias de viagem. No nosso modelo, cada uma das mais de 40 ligas cobertas tem seu próprio fator γ calculado independentemente.</P>

        <H2>Forma recente com peso exponencial</H2>
        <P>O modelo Dixon-Coles original usa todo o histórico disponível com peso igual para cada jogo. No FutAnalysis, implementamos uma melhoria importante: <Strong>pesos exponenciais para a forma recente</Strong>. Os últimos jogos de cada time recebem peso maior, com um fator de decaimento de 0.85 por jogo anterior.</P>

        <P>Isso significa que o último jogo tem peso 1.0, o penúltimo tem peso 0.85, o anterior tem peso 0.72, e assim por diante. Essa abordagem captura melhor o momento atual dos times — um time que perdeu os últimos 3 jogos está em situação diferente de um que venceu, mesmo que ambos tenham a mesma média histórica de gols.</P>

        <P>Na prática, combinamos os lambdas históricos com os lambdas de forma recente usando um peso híbrido: 65% do peso vai para o histórico longo (até 38 jogos) e 35% para a forma recente (últimos 8 jogos). Essa combinação equilibra estabilidade estatística com sensibilidade ao momento.</P>

        <H2>Head-to-head: o histórico de confrontos diretos</H2>
        <P>Além das forças gerais dos times, o FutAnalysis incorpora o histórico de confrontos diretos (H2H) com um peso de 15-20% na probabilidade final. Isso é especialmente relevante em rivalidades onde um time historicamente domina o outro, independentemente das forças gerais na temporada.</P>

        <P>Por exemplo, alguns times têm dificuldade histórica contra determinados estilos de jogo, independentemente da qualidade atual do elenco. O H2H captura essas nuances que a força geral não consegue refletir.</P>

        <H2>Como aplicamos no FutAnalysis</H2>
        <P>Nossa implementação completa do processo de cálculo segue estas etapas para cada partida:</P>

        <Box>
          <div>1. Busca histórico da liga (até 38 jogos por time)</div>
          <div>2. Calcula força de ataque e defesa com Laplace smoothing (peso 0.25)</div>
          <div>3. Calcula forma recente (últimos 8 jogos, decay 0.85)</div>
          <div>4. Combina histórico longo (65%) com forma recente (35%)</div>
          <div>5. Aplica fator de home advantage específico da liga</div>
          <div>6. Incorpora H2H com peso 15-20%</div>
          <div>7. Calcula probabilidades de todos os placares via Poisson corrigido</div>
          <div>8. Agrega probabilidades por mercado (OVER/UNDER, BTTS, resultado)</div>
          <div>9. Aplica threshold mínimo para exibir como oportunidade</div>
        </Box>

        <H2>Thresholds de probabilidade</H2>
        <P>Nem toda probabilidade calculada se torna uma "oportunidade" no FutAnalysis. Aplicamos thresholds mínimos calibrados com base nos nossos dados históricos de acertos:</P>

        <Box>
          <div>• OVER 1.5 gols: mínimo 58% de probabilidade</div>
          <div>• OVER 2.5 gols: mínimo 60%</div>
          <div>• UNDER 2.5 gols: mínimo 60%</div>
          <div>• BTTS (ambas marcam): mínimo 58%</div>
          <div>• HOME WIN / AWAY WIN: mínimo 68%</div>
          <div>• GOAL HT (gol no 1º tempo): mínimo 60%</div>
        </Box>

        <P>Esses thresholds foram definidos após análise de 266 oportunidades scoradas, buscando o equilíbrio entre volume de oportunidades e taxa de acerto. Um threshold muito baixo gera muitas oportunidades mas com baixa precisão; muito alto gera poucas mas com alta precisão.</P>

        <H2>Resultados do modelo v2</H2>
        <P>A versão atual do nosso modelo (v2, calibrada em maio de 2026) apresenta os seguintes resultados em nossa amostra de jogos analisados:</P>

        <Box>
          <div>• <Strong>OVER 1.5</Strong>: 60.7% de acerto</div>
          <div>• <Strong>HOME WIN</Strong>: 76.0% de acerto (após elevar threshold para 68%)</div>
          <div>• <Strong>OVER 2.5</Strong>: 58.3% de acerto</div>
          <div>• <Strong>BTTS</Strong>: 66.7% de acerto</div>
          <div>• <Strong>UNDER 2.5</Strong>: 80.0% de acerto (amostra pequena)</div>
        </Box>

        <P>Com uma odd simulada de 1.60, o break-even (ponto de equilíbrio) é de 62.5% de acerto. Os mercados de HOME WIN e BTTS estão acima desse patamar, enquanto OVER 1.5 e OVER 2.5 ainda estão próximos do break-even — o que reforça a necessidade de analisar cada oportunidade com contexto adicional.</P>

        <H2>Limitações do modelo</H2>
        <P>Como qualquer modelo estatístico, o Dixon-Coles tem limitações importantes que o usuário deve ter em mente:</P>

        <P><Strong>Não considera lesões:</Strong> Se o artilheiro do time está lesionado, o modelo não sabe disso automaticamente. O histórico de gols inclui jogos com ele em campo, inflando artificialmente a força de ataque do time.</P>

        <P><Strong>Não captura mudanças táticas:</Strong> Uma mudança de treinador ou sistema tático pode alterar completamente o padrão de jogo de um time, mas o modelo leva tempo para refletir isso nos dados.</P>

        <P><Strong>Importância da partida:</Strong> Uma final de campeonato ou um jogo decisivo pelo rebaixamento tem dinâmica diferente de uma rodada intermediária. O modelo trata todos os jogos com o mesmo peso histórico.</P>

        <P><Strong>Condições climáticas:</Strong> Chuva intensa, gramado pesado ou temperatura extrema afetam o número de gols, mas não entram no cálculo.</P>

        <P>Por essas razões, sempre recomendamos usar as probabilidades do FutAnalysis como um dos fatores de análise, complementado com informações atuais sobre os times, e nunca como única base para decisões financeiras.</P>

        <div style={{ marginTop: "2rem", padding: "1rem", background: T.surface, borderRadius: "8px", border: `1px solid ${T.border}` }}>
          <P>Quer ver o modelo em ação? Acesse nossas <Link href="/opportunities/football" style={{ color: T.yellow, textDecoration: "none" }}>oportunidades de futebol</Link> e veja as probabilidades calculadas para os jogos de hoje. Você também pode explorar o <Link href="/blog/o-que-e-xg-expected-goals" style={{ color: T.yellow, textDecoration: "none" }}>guia sobre xG</Link> para entender outra métrica importante da análise de futebol.</P>
        </div>

        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: `1px solid ${T.border}` }}>
          <Link href="/blog" style={{ color: T.textMid, textDecoration: "none", fontSize: "0.78rem" }}>← Ver todos os artigos</Link>
        </div>
      </div>
    </>
  );
}

