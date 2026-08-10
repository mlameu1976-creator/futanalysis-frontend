import { ADS_ENABLED } from "../config/ads";

export const CASAS = [
  { nome: "F12.bet",     link: "https://apretailer.com.br/click/6a30b7192bfa8145f3137a09/186103/359243/subaccount", bg: "#F5C518", color: "#000" },
  { nome: "Luva.bet",    link: "https://apretailer.com.br/click/6a31d6f72bfa815a942a087a/183604/359243/subaccount", bg: "#22C55E", color: "#fff" },
  { nome: "HiperBet",    link: "https://apretailer.com.br/click/6a31d6f72bfa815a8e58ec42/186696/359243/subaccount", bg: "#F97316", color: "#fff" },
  { nome: "EstrelaBet",  link: "https://apretailer.com.br/click/6a30b7192bfa8104ba492b7b/182492/359243/subaccount", bg: "#7C3AED", color: "#fff" },
  { nome: "Novibet",     link: "https://apretailer.com.br/click/6a30b71a2bfa81426d34b01d/184804/359243/subaccount", bg: "#3B82F6", color: "#fff" },
  { nome: "Blaze",       link: "https://apretailer.com.br/click/6a30b7192bfa8104b37506aa/184280/359243/subaccount", bg: "#EF4444", color: "#fff" },
  { nome: "Bet7k",       link: "https://apretailer.com.br/click/6a30b7182bfa8104ac35d81d/188826/359243/subaccount", bg: "#0EA5E9", color: "#fff" },
  { nome: "Apostou",     link: "https://apretailer.com.br/click/6a30b7182bfa8104a63445c4/188656/359243/subaccount", bg: "#10B981", color: "#fff" },
  { nome: "Betnacional", link: "https://apretailer.com.br/click/6a30b71a2bfa8104a02e7982/185963/359243/subaccount", bg: "#F59E0B", color: "#000" },
  { nome: "Superbet",    link: "https://apretailer.com.br/click/6a30b71a2bfa8104b37506ab/186718/359243/subaccount", bg: "#EC4899", color: "#fff" },
  { nome: "Lottoland",   link: "https://apretailer.com.br/click/6a30b71a2bfa8145f3137a0b/188212/359243/subaccount", bg: "#1E3A5F", color: "#fff" },
  { nome: "Betnix",      link: "https://apretailer.com.br/click/6a30b71b2bfa81426d34b028/188799/359243/subaccount", bg: "#C0392B", color: "#fff" },
  { nome: "Polymarket",  link: "https://polymarket.com/?via=x0YS9Sb&utm_campaign=BRA93880__", bg: "#0066FF", color: "#fff" },
];

export const BOOKMAKER_MAP = {
  "Betano":       { nome: "Betano",      link: "https://apretailer.com.br/click/6a31d6f72bfa815a942a087a/183604/359243/subaccount", bg: "#22C55E", color: "#fff" },
  "Bet365":       { nome: "F12.bet",     link: "https://apretailer.com.br/click/6a30b7192bfa8145f3137a09/186103/359243/subaccount", bg: "#F5C518", color: "#000" },
  "Superbet":     { nome: "Superbet",    link: "https://apretailer.com.br/click/6a30b71a2bfa8104b37506ab/186718/359243/subaccount", bg: "#EC4899", color: "#fff" },
  "Pinnacle":     { nome: "Novibet",     link: "https://apretailer.com.br/click/6a30b71a2bfa81426d34b01d/184804/359243/subaccount", bg: "#3B82F6", color: "#fff" },
  "Unibet":       { nome: "HiperBet",    link: "https://apretailer.com.br/click/6a31d6f72bfa815a8e58ec42/186696/359243/subaccount", bg: "#F97316", color: "#fff" },
  "10Bet":        { nome: "Bet7k",       link: "https://apretailer.com.br/click/6a30b7182bfa8104ac35d81d/188826/359243/subaccount", bg: "#0EA5E9", color: "#fff" },
  "Betfair":      { nome: "EstrelaBet",  link: "https://apretailer.com.br/click/6a30b7192bfa8104ba492b7b/182492/359243/subaccount", bg: "#7C3AED", color: "#fff" },
  "1xBet":        { nome: "Betnacional", link: "https://apretailer.com.br/click/6a30b71a2bfa8104a02e7982/185963/359243/subaccount", bg: "#F59E0B", color: "#000" },
  "William Hill": { nome: "Apostou",     link: "https://apretailer.com.br/click/6a30b7182bfa8104a63445c4/188656/359243/subaccount", bg: "#10B981", color: "#fff" },
  "Marathonbet":  { nome: "Blaze",       link: "https://apretailer.com.br/click/6a30b7192bfa8104b37506aa/184280/359243/subaccount", bg: "#EF4444", color: "#fff" },
  "Dafabet":      { nome: "Lottoland",   link: "https://apretailer.com.br/click/6a30b71a2bfa8145f3137a0b/188212/359243/subaccount", bg: "#1E3A5F", color: "#fff" },
  "BetVictor":    { nome: "Betnix",      link: "https://apretailer.com.br/click/6a30b71b2bfa81426d34b028/188799/359243/subaccount", bg: "#C0392B", color: "#fff" },
  "SBO":          { nome: "F12.bet",     link: "https://apretailer.com.br/click/6a30b7192bfa8145f3137a09/186103/359243/subaccount", bg: "#F5C518", color: "#000" },
};

export function getCasaByBookmaker(bookmaker, index) {
  if (bookmaker && BOOKMAKER_MAP[bookmaker]) return BOOKMAKER_MAP[bookmaker];
  return CASAS[(index || 0) % CASAS.length];
}

export default function AffiliateCTA({ index = 0, bookmaker = null }) {
  if (!ADS_ENABLED) return null;
  const casa = getCasaByBookmaker(bookmaker, index);
  return (
    <div style={{ marginTop: "0.8rem" }}>
      <a href={casa.link} target="_blank" rel="noopener noreferrer sponsored"
        style={{ display: "block", padding: "0.5rem 0.8rem",
          background: casa.bg, borderRadius: "6px", textAlign: "center",
          fontWeight: 700, fontSize: "0.75rem", color: casa.color,
          textDecoration: "none", letterSpacing: "0.02em" }}>
        Aposte nessa oportunidade na {casa.nome}
      </a>
      <div style={{ marginTop: "0.4rem", padding: "0.4rem 0.5rem",
        background: "#450a0a", borderRadius: "4px", textAlign: "center",
        border: "1px solid #7f1d1d" }}>
        <span style={{ color: "#fecaca", fontWeight: 700, fontSize: "0.7rem",
          letterSpacing: "0.01em", lineHeight: "1.3" }}>
          Ministério da Fazenda adverte: Apostar pode causar dependência
        </span>
      </div>
    </div>
  );
}
