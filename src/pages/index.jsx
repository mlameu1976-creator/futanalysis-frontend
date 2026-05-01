import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1>FutAnalysis</h1>

      <nav>
        <Link href="/rankings">Rankings</Link>
        <Link href="/opportunities">Opportunities</Link>
        <Link href="/prediction">Prediction</Link>
      </nav>

      <p>Selecione uma opção acima.</p>
    </div>
  );
}
