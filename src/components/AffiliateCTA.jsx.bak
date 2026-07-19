const CASAS = [
  { nome: "F12.bet", link: "https://apretailer.com.br/click/6a30b7192bfa8145f3137a09/186103/359243/subaccount", bg: "#F5C518", color: "#000" },
  { nome: "Luva.bet", link: "https://apretailer.com.br/click/6a31d6f72bfa815a942a087a/183604/359243/subaccount", bg: "#22C55E", color: "#fff" },
  { nome: "HiperBet", link: "https://apretailer.com.br/click/6a31d6f72bfa815a8e58ec42/186696/359243/subaccount", bg: "#F97316", color: "#fff" },
  { nome: "EstrelaBet", link: "https://apretailer.com.br/click/6a30b7192bfa8104ba492b7b/182492/359243/subaccount", bg: "#7C3AED", color: "#fff" },
  { nome: "Novibet", link: "https://apretailer.com.br/click/6a30b71a2bfa81426d34b01d/184804/359243/subaccount", bg: "#3B82F6", color: "#fff" },
  { nome: "Blaze", link: "https://apretailer.com.br/click/6a30b7192bfa8104b37506aa/184280/359243/subaccount", bg: "#EF4444", color: "#fff" },
  { nome: "Bet7k", link: "https://apretailer.com.br/click/6a30b7182bfa8104ac35d81d/188826/359243/subaccount", bg: "#0EA5E9", color: "#fff" },
  { nome: "Apostou", link: "https://apretailer.com.br/click/6a30b7182bfa8104a63445c4/188656/359243/subaccount", bg: "#10B981", color: "#fff" },
  { nome: "Betnacional", link: "https://apretailer.com.br/click/6a30b71a2bfa8104a02e7982/185963/359243/subaccount", bg: "#F59E0B", color: "#000" },
  { nome: "Superbet", link: "https://apretailer.com.br/click/6a30b71a2bfa8104b37506ab/186718/359243/subaccount", bg: "#EC4899", color: "#fff" },
  { nome: "Lottoland", link: "https://apretailer.com.br/click/6a30b71a2bfa8145f3137a0b/188212/359243/subaccount", bg: "#1E3A5F", color: "#fff" },
  { nome: "Betnix", link: "https://apretailer.com.br/click/6a30b71b2bfa81426d34b028/188799/359243/subaccount", bg: "#C0392B", color: "#fff" },
  { nome: "Blaze Online", link: "https://apretailer.com.br/click/6a30b7192bfa8104b37506aa/184280/359243/subaccount", bg: "#E74C3C", color: "#fff" },
  { nome: "Polymarket", link: "https://polymarket.com/?via=x0YS9Sb&utm_campaign=BRA93880__", bg: "#0066FF", color: "#fff" },
  { nome: "Polymarket", link: "https://polymarket.com/?via=x0YS9Sb&utm_campaign=BRA93880__", bg: "#0066FF", color: "#fff" },
];

export default function AffiliateCTA({ index = 0 }) {
  const casa = CASAS[index % CASAS.length];
  const style = { display: "block", marginTop: "0.8rem", padding: "0.5rem 0.8rem", background: casa.bg, borderRadius: "6px", textAlign: "center", fontWeight: 700, fontSize: "0.75rem", color: casa.color, textDecoration: "none", letterSpacing: "0.02em" };
  return <a href={casa.link} target="_blank" rel="noopener noreferrer sponsored" style={style}>{`Aposte nessa oportunidade na ${casa.nome}`}</a>;
}
