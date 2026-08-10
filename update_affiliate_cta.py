path = "/home/ubuntu/frontend/src/components/AffiliateCTA.jsx"

with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

anchor = 'Aposte nessa oportunidade na {casa.nome}'
matches = [i for i, l in enumerate(lines) if anchor in l]

if len(matches) != 1:
    print(f"ABORTADO: encontrei {len(matches)} linhas com a âncora (esperado 1). Nada foi alterado.")
else:
    idx = matches[0]
    # a linha seguinte deve ser o fechamento </a>
    print("Contexto encontrado:")
    for i in range(max(0, idx-2), min(len(lines), idx+4)):
        print(f"{i+1}: {lines[i]}", end="")
