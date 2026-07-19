import sys
FILE = "/home/ubuntu/frontend/src/pages/opportunities/index.jsx"
old = '  {\n    href:    "/nfl",\n    icon:    "🏈",\n    label:   "NFL",\n    accent:  "#013369",\n    desc:    "Futebol Americano · Resultado · Spread ±3.5 · Over/Under pontos · Temporada 2026",\n    markets: ["HOME WIN", "AWAY WIN", "SPREAD -3.5", "OVER 44.5", "UNDER 44.5"],\n  },\n];'
new = '  {\n    href:    "/nfl",\n    icon:    "🏈",\n    label:   "NFL",\n    accent:  "#013369",\n    desc:    "Futebol Americano · Resultado · Spread ±3.5 · Over/Under pontos · Temporada 2026",\n    markets: ["HOME WIN", "AWAY WIN", "SPREAD -3.5", "OVER 44.5", "UNDER 44.5"],\n  },\n  {\n    href:    "/nhl",\n    icon:    "🏒",\n    label:   "NHL",\n    accent:  "#00B4D8",\n    desc:    "Hockey no Gelo · Resultado · Over/Under 5.5 e 6.5 gols · Modelo Poisson · Temporada 2026-27",\n    markets: ["HOME WIN", "AWAY WIN", "OVER 5.5", "UNDER 5.5", "OVER 6.5", "UNDER 6.5"],\n  },\n];'
content = open(FILE, encoding="utf-8").read()
if "/nhl" in content:
    print("⏩ NHL já existe")
    sys.exit(0)
if old not in content:
    print("❌ Padrão não encontrado")
    sys.exit(1)
content = content.replace(old, new)
open(FILE, "w", encoding="utf-8").write(content)
print("✅ Card NHL adicionado!")
