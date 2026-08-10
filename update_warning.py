import os

OLD = "O jogo pode causar dependencia - jogue com responsabilidade"
NEW = "Ministério da Fazenda adverte: Apostar pode causar dependência"

files = [
    "/home/ubuntu/frontend/src/pages/blog/index.jsx",
    "/home/ubuntu/frontend/src/pages/opportunities/index.jsx",
    "/home/ubuntu/frontend/src/pages/privacidade.jsx",
    "/home/ubuntu/frontend/src/pages/sobre.jsx",
    "/home/ubuntu/frontend/src/pages/termos.jsx",
    "/home/ubuntu/frontend/src/pages/analises/hoje.jsx",
    "/home/ubuntu/frontend/src/pages/analises/[esporte].jsx",
    "/home/ubuntu/frontend/src/components/Layout.jsx",
]

for path in files:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    count = content.count(OLD)
    if count != 1:
        print(f"PULADO (ocorrências={count}, esperado=1): {path}")
        continue

    # backup antes de escrever
    with open(path + ".bak2", "w", encoding="utf-8") as f:
        f.write(content)

    new_content = content.replace(OLD, NEW)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"OK: {path}")

print("Concluído.")
