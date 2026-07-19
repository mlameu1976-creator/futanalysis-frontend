export default async function handler(req, res) {
  try {
    const baseStyle = "color:#fff;font-weight:700;font-size:13px;text-decoration:none;padding:8px 16px;border-radius:6px;white-space:nowrap;";
    const links = [
      ["https://www.gambling-affiliation.com/cpc/v=I5ZTD-50RoxAc8tH.lc5XiSnWYaWaNzKh55x2tqcQ24_GA7331V2", "🎰 Jogue no GameSlots", "#9333ea"],
      ["https://www.gambling-affiliation.com/cpc/v=dbwShM4LojkVpfjAg6rRK6sVu0Tnwzc5L-dSHYViymA_GA7331V2&aff_var_1=", "⚽ Aposte na Bet7", "#16a34a"],
      ["https://www.gambling-affiliation.com/cpc/v=GB5jpyyH8LFrQafLJWSNmtLre48LQNbcw8JJxmNMIQk_GA7331V2", "🎲 Casino Bet7", "#dc2626"],
      ["https://www.gambling-affiliation.com/cpc/v=QwhptWzPP7eDGkVjSetHKL0vtJkop4qNHhzZNFb-ufE_GA7331V2", "💳 Pague com PaysafeCard", "#0284c7"],
    ];
    const textLinks = links.map(([href, label, color]) =>
      '<a target="_blank" rel="sponsored noreferrer noopener" href="' + href + '" style="' + baseStyle + 'background:' + color + ';">' + label + '</a>'
    ).join("");
    const html = '<div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;padding:4px 12px;">' + textLinks + '</div>';
    res.status(200).json({ html });
  } catch (err) {
    res.status(500).json({ html: "" });
  }
}
