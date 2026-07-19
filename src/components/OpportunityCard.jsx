const CASAS = [
  {
    nome: "F12.bet",
    emoji: "📊",
    texto: "Gostou da análise? Aposte nessa oportunidade na F12.bet com as melhores odds.",
    cta: "Criar conta na F12.bet",
    link: "https://apretailer.com.br/click/6a30b7192bfa8145f3137a09/186103/359243/subaccount",
    cor: "bg-yellow-400 hover:bg-yellow-500 text-black",
  },
  {
    nome: "HyperBet",
    emoji: "🔥",
    texto: "Aproveite essa oportunidade e aposte agora na HyperBet com bônus de boas-vindas.",
    cta: "Criar conta na HyperBet",
    link: "SEU_LINK_HIPERBET",
    cor: "bg-orange-500 hover:bg-orange-600 text-white",
  },
  {
    nome: "Luva.bet",
    emoji: "⚽",
    texto: "Confira as odds dessa partida na Luva.bet e aposte com as melhores condições.",
    cta: "Criar conta na Luva.bet",
    link: "SEU_LINK_LUVADET",
    cor: "bg-green-600 hover:bg-green-700 text-white",
  },
];

export default function OpportunityCard({ data, index = 0 }) {
  if (!data) return null;
  const casa = CASAS[index % CASAS.length];
  return (
    <div className="border rounded p-4 shadow bg-white">
      <h3 className="font-semibold mb-2">{data.market}</h3>
      <div className="text-sm space-y-1">
        <p><strong>Match:</strong> {data.match}</p>
        <p><strong>Score:</strong> {data.score}</p>
        <p><strong>Confiança:</strong> {data.confidence}</p>
        <p><strong>Criado em:</strong> {new Date(data.created_at).toLocaleString()}</p>
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
        <p className="text-sm text-gray-700 mb-2">{casa.emoji} {casa.texto}</p>
        
          href={casa.link}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`inline-block px-4 py-2 rounded font-semibold text-sm transition-colors ${casa.cor}`}
        >
          👉 {casa.cta}
        </a>
      </div>
    </div>
  );
}
